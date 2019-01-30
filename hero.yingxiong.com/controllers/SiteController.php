<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\HeroWpzzModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\DrawController;
use common\components\PcController;
use common\components\UserDataController;
use common\helpers\Utils;
use common\models\Category;
use common\models\Gift;
use common\models\GiftActivityModel;
use common\models\GiftCode;
use common\models\hero\HeroEwmActLog;
use common\models\hero\HeroUser;
use common\models\hero\HeroUserGoldModel;
use common\models\Stat;
use function GuzzleHttp\Psr7\str;
use yii\captcha\Captcha;
use yii\helpers\Json;
use app\models\CaWpzzUser;
use app\models\CaWpzzGift;
use common\components\phpexcel\Excel;
use yii\web\User;

class SiteController extends PcController
{
    const DRAW_JX = 1;  //继续翻牌
    const DRAW_JJ = 2;  //拒绝翻牌
    const DRAW_XZ = 0;  //选择是否拒绝翻牌

    public function actionCover()
    {
        $user_all = CommonController::actionCount();
        $captcha_img = Captcha::widget(['name' => 'captcha-img', 'captchaAction' => 'site/captcha', 'imageOptions' => ['id' => 'captcha-img', 'title' => '换一个', 'style' => 'cursor:pointer;'], 'template' => '{image}']);

        $data = [
            'num' => $user_all,
        ];

        $user_code = Cms::getGetValue('code');   //微信扫描二维码
        if ($user_code) {
            $model = HeroUser::find()->where('me_invite_code = :invite_code', [':invite_code' => $user_code])->one();
            if ($model) {
                $start_time = strtotime(date('Y-m-d') . ' 00:00:00');
                if ($model->updated_at < $start_time || $model->count == 0) {
                    $model->count = 1;  //如果是当天第一次邀请人则计数为1
                    $model->num = $model->num + 2;    //翻牌次数+2
                    $model->updated_at = time();
                } else if ($model->count == 1) { //每天分享达到2次以上，则翻牌次数不增加
                    $model->count = $model->count + 1;    //每天的邀请人数+1
                    $model->num = $model->num + 1;    //翻牌次数+1
                }
                $model->save();
            }

            Cms::setSession('invite_code', $user_code);
        }
        $data['kv_video'] = $this->getRecommend('kv_video', 1);    //首页推荐视频
        $data['kv_video'] = $data['kv_video'][0]['url'];
        $data['captcha_img'] = $captcha_img;
        return $this->renderPartial('cover.html', $data);
    }

    /**
     * 点击分享增加翻牌次数
     */
    public function actionAjaxAddDraw()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_phone');
        $model = HeroUser::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($model) {
            $start_time = strtotime(date('Y-m-d') . ' 00:00:00');
            if ($model->updated_at < $start_time || $model->count == 0) {
                $model->count = 1;  //如果是当天第一次邀请人则计数为1
                $model->num = $model->num + 2;    //翻牌次数+2
                $model->updated_at = time();
            } else if ($model->count == 1) { //每天分享达到2次以上，则翻牌次数不增加
                $model->count = $model->count + 1;    //每天的邀请人数+1
                $model->num = $model->num + 1;    //翻牌次数+1
            }
            $model->save();
            $this->ajaxOutPut(['status' => 0, 'msg' => $model->num]);
        }
        $this->ajaxOutPut(['status' => -1, 'msg' => '用户不存在，请重新登录！']);
    }

    /**
     * 判断用户是否登录
     */
    public function actionAjaxGetUser()
    {
        if (Cms::getSession('login_phone')) {
            $type = Cms::getPostValue('type', 1);//1 翻牌礼包 2 金币礼包
            if ($type == 1) {
                $user = HeroUser::find()->where('phone = :phone', [':phone' => Cms::getSession('login_phone')])->asArray()->one();
                $user['share_url'] = $this->_getInviteUrl() . 'code=' . $user['me_invite_code'];
                unset($user['me_invite_code']);
                unset($user['other_invite_code']);
            } else {
                $user = HeroUserGoldModel::find()->where(['user_phone' => Cms::getSession('login_phone')])->asArray()->one();
            }
            $this->ajaxOutPut(['status' => 0, 'msg' => $user]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '没有登录！']);
        }
    }

    /**
     **登录发送验证码
     */
    public function actionAjaxLoginVerify()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type', 1);
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $user = HeroUserGoldModel::find()->where(['user_phone' => $phone])->one();
        if ($user) {
            $this->ajaxOutPut(['status' => 101, 'msg' => $user->code]);
        }

        if ($type == 1) {
            $msg = '您正在进行《代号英雄》预约活动登录，请于1小时内输入';
        } else {
            $msg = '您正在进行《代号英雄》领礼包验证，请于1小时内输入';
        }
        $res = Cms::verify($phone, Cms::SM_LOGIN, $msg);
        $this->ajaxOutPut($res);
    }

    /**
     * 登录
     */
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_phone', $phone);
            $user = HeroUser::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new HeroUser();
                $user->phone = (string)$phone;
                $user->me_invite_code = mt_rand(10000000, 99999999);
//                $user->invite_img= Cms::qrcodeImg($this->_getInviteUrl().'code='.$user->me_invite_code);
                $user->created_at = time();
                $user->save();
            }
            $msg = $user->attributes;
            $msg['share_url'] = $this->_getInviteUrl() . 'code=' . $user['me_invite_code'];
            unset($msg['me_invite_code']);
            unset($msg['other_invite_code']);

            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://hero.dev.yingxiong.com/wap/site/cover.html?";
        } else if (YII_DEMO) {
            return "http://hero.demo.yingxiong.com/wap/site/cover.html?";
        } else {
            return "http://hero.yingxiong.com/wap/site/cover.html?";
        }

    }

    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_phone');
        $_POST['phone'] = $phone;
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_OLD);
        $this->ajaxOutPut($res);
    }

    /**
     * 翻牌
     */
    public function actionAjaxDraw()
    {
        $this->_checkLogin();
        if (time() >= strtotime('2018-02-01')) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束！']);
        } else {
            $gift_id_1 = 6;
            $gift_id_2 = 7;
            $node = Cms::getPostValue('node');  //编号
            $empty_node_1 = 0;
            $empty_node_2 = 0;
            $phone = Cms::getSession('login_phone');
            $user = HeroUser::find()->where('phone = :phone', [':phone' => $phone])->one();
            $status = 0;
            $is_zhongjiang_1 = 0;   //是否已经翻开第二张牌
            $date = date('Y-m-d');
            if ($date < '2018-01-15' && !YII_DEV) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '该活动暂未开启，敬请期待！']);
            }
            if ($date > '2018-02-01') {
                $this->ajaxOutPut(['status' => -1, 'msg' => '该活动已经结束！']);
            }

            if ($node == $user['node_1'] || $node == $user['node_1'] || $node == $user['empty_node_1'] || $node == $user['empty_node_2']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '该牌您已经翻开，请勿重复翻！']);
            }

            if (!in_array($node, [1, 2, 3, 4])) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '牌张数错误']);
            }
            if ($user['draw_zs'] >= 4) {
                $this->ajaxOutPut(['status' => 3, 'msg' => '您已经全部翻开，请勿重复！']);
            } else if ($user['num'] <= 0) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '翻牌次数已经用完']);
            } else if ($user['draw_zs'] == 2 && $user['is_jx_draw'] != self::DRAW_JX) {  //如果翻牌张数为2
                if ($user['is_jx_draw'] == self::DRAW_XZ) {
                    $this->ajaxOutPut(['status' => 2, 'msg' => '请选择是否继续翻牌']);
                } else if ($user['is_jx_draw'] == self::DRAW_JJ) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '您已经拒绝翻牌，不能再翻牌']);
                }
            } else {
                $gl = rand(1, 10);  //概率
                //翻开：1:60%
                if ($user->draw_count == 0) {
                    if ($gl >= 6) {
                        $user->draw_zs = 1;  //翻开；翻牌张数+1;
                        $empty_node_1 = $node;
                    } else {
                        $status = 1;
                    }
                }

                if ($user->draw_count == 1) {

                    if ($gl >= 7 && $user->draw_zs == 0) {  //概率为70，并且一张牌都没有翻开
                        $user->draw_zs = 1; //此时翻开1张牌
                        $empty_node_1 = $node;
                    } else if ($gl >= 6 && $user->draw_zs == 1) {
                        $user->draw_zs = 2; //此时翻开2张牌
                        $is_zhongjiang_1 = 1;
                    } else {
                        $status = 1;
                    }
                }

                if ($user->draw_count == 2) {   //第三次翻牌
                    if ($user->draw_zs == 0) {  //一张牌都没有翻开
                        $user->draw_zs = 1; //此时必定翻开第一张牌
                        $empty_node_1 = $node;
                    } else if ($gl >= 6 && $user->draw_zs == 1) {    //如果概率达到，并且只翻开了1张牌
                        $user->draw_zs = 2; //此时翻开第2张牌
                        $is_zhongjiang_1 = 1;
                    } else {
                        $status = 1;
                    }
                }
                //前面最多只翻开2张牌

                if ($user->draw_count == 3) {   //第四次翻牌
                    if ($user->draw_zs == 1) {  //只翻开了1张
                        $user->draw_zs = 2;     //此时必定翻开2张
                        $is_zhongjiang_1 = 1;
                    } else if ($gl >= 6 && $user->draw_zs == 2) {   //如果概率达到，并且只翻开了2张牌
                        $user->draw_zs = 3; //此时翻开第3张
                        $empty_node_2 = $node;
                    } else {
                        $status = 1;
                    }
                }

                if ($user->draw_count == 4) {   //第5次翻牌
                    if ($user->draw_zs == 2) {  //如果只翻开了2张牌
                        $user->draw_zs = 3; //此时必定翻开第3张
                        $empty_node_2 = $node;
                    } else {
                        $status = 1;
                    }
                }

                if ($user->draw_count == 5) {
                    $user->draw_zs = 4;
                    $user->node_2 = $node;
                    $res = Cms::getGiftNoYzm($phone, $gift_id_2);   //发放激活码1
                    if ($res['status'] == 0) {
                        $gift_code = $res['msg'];
                    } else {
                        $this->ajaxOutPut(['status' => 1, 'msg' => '奖励已发完，请联系客服！']);
                    }
                }

                $gift_code = '';
                if ($is_zhongjiang_1 == 1) {
                    $user->node_1 = $node;
                    $res = Cms::getGiftNoYzm($phone, $gift_id_1);   //发放激活码1
                    if ($res['status'] == 0) {
                        $gift_code = $res['msg'];
                    } else {
                        $this->ajaxOutPut(['status' => 1, 'msg' => '奖励已发完，请联系客服！']);
                    }
                }
                if ($empty_node_1 > 0) {
                    $user->empty_node_1 = $empty_node_1;
                }
                if ($empty_node_2 > 0) {
                    $user->empty_node_2 = $empty_node_2;
                }

                $user->num = $user->num - 1;  //总共的翻牌次数-1
                $user->draw_count = $user->draw_count + 1;    //已经翻牌次数+1
                $user->save();
                $this->ajaxOutPut(['status' => $status, 'num' => $user->num, 'draw_count' => $user->draw_count, 'draw_zs' => $user->draw_zs, 'gift_code' => $gift_code]);
            }
        }
    }

    /**
     * 继续翻牌
     */
    public function actionAjaxJxDraw()
    {
        $this->_checkLogin();
        if (time() >= strtotime('2018-02-01')) {//2月1日翻拍活动结束
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束！']);
        } else {
            $phone = Cms::getSession('login_phone');
            $user = HeroUser::find()->where('phone = :phone', [':phone' => $phone])->one();
            $user->draw_count = $user->draw_count + 1;
            $user->is_jx_draw = self::DRAW_JX;
            $user->save();
            $this->ajaxOutPut(['status' => 0]);
        }
    }

    /**
     * 拒绝翻牌
     */
    public function actionAjaxJjDraw()
    {
        $this->_checkLogin();
        if (time() >= strtotime('2018-02-01')) {//2月1日翻拍活动结束
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束！']);
        } else {
            $phone = Cms::getSession('login_phone');
            $user = HeroUser::find()->where('phone = :phone', [':phone' => $phone])->one();
            $user->is_jx_draw = self::DRAW_JJ;
            $user->save();
        }
        $this->ajaxOutPut(['status' => 0]);
    }

    /**
     * 翻牌奖励记录
     */
    public function actionAjaxDrawLog()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_phone');
        $gift = GiftCode::find()->where('phone = :phone', [':phone' => $phone])->andWhere(['in', 'gift_id', [6, 7]])->asArray()->all();
        $data = [];
        if ($gift && !empty($gift)) {
            foreach ($gift as $k => &$v) {
                $model = Gift::find()->where(['id' => $v['gift_id']])->one();
                $v['name'] = $model['name'];
                if ($v['gift_id'] == 7) {
                    $data[0] = $v;
                    continue;
                } else {
                    $data[0] = $v;
                }
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }

    /**
     * 注销登录
     */
    public function actionAjaxLogout()
    {
        Cms::setSession('login_phone', '');
        $this->ajaxOutPut(['status' => 0]);
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut()
    {
        $session = \Yii::$app->session;
        $session->remove('login_phone');
        $status = -1;
        $msg = '注销失败!';
        if (!isset(\Yii::$app->session['login_phone'])) {
            $status = '0';
            $msg = '注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' => $msg]);
    }

    /**
     * 获取预约人数
     */
    public function actionAjaxGetYuyueNum()
    {
        $count = Stat::find()->where(['name' => 'hero_subscribe_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->one();
        $this->ajaxOutPut(['status' => 0, 'msg' => $count['count']]);
    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
        $user = HeroUser::find()->where('phone = :phone', [':phone' => $phone])->one();
        if (!$user) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '该用户不存在，请重新登录！']);
        }
    }


    /******
     * 金币礼包码
     ********/
    public function actionAjaxGold()
    {
//        $this->_checkLogin();
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            $gift_id = 16;//金币礼包的ID
            $code = GiftCode::find()->where(['status' => 0, 'gift_id' => $gift_id])->one();
            if (!$code) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '礼包码已领完，请稍后再试！']);
            }
            $user = HeroUserGoldModel::find()->where(['user_phone' => $phone])->one();
            if ($user) {
                $this->ajaxOutPut(['status' => 0, 'msg' => $user->code]);
            }
            $user = new HeroUserGoldModel();
            $user->user_phone = "$phone";
            $res = Cms::getGiftNoYzm($phone, $gift_id, Cms::GIFT_IS_REPEAT);
            if ($res['status'] == 0) {
                $user->code = $res['msg'];
                $user->type = $type;
                $user->created_at = time();
                if ($user->save()) {
                    $this->ajaxOutPut(['status' => 0, 'msg' => $user->code]);
                } else {
                    pr($user->getErrors(), 1);
                }
            }
        } else {
            $this->ajaxOutPut(['status' => $res['status'], 'msg' => $res['msg']]);
        }
    }

    public function actionIndex()
    {

        $data = array();
        $data['zx'] = $this->getContentArr(419, 6);    //最新
        $data['xw'] = $this->getContentArr(421, 6);    //新闻
        $data['gg'] = $this->getContentArr(422, 6);    //公告
        $data['hd'] = $this->getContentArr(420, 6);    //活动
        $data['gl'] = $this->getContentArr(423, 6);    //攻略

        $data['wanfa'] = $this->getRecommend('wanfa', 10);
        $data['kv_video'] = $this->getRecommend('kv_video', 1);    //首页推荐视频
        $data['kv_video'] = $data['kv_video'][0]['url'];
        $data['captcha_img'] = Captcha::widget(['name' => 'captcha-img', 'captchaAction' => 'commonMethod/captcha', 'imageOptions' => ['id' => 'captcha-img', 'title' => '换一个', 'style' => 'cursor:pointer;'], 'template' => '{image}']);
        $data['style'] = 'index';
        $data['arms'] = self::_getArms();
        return $this->renderPartial('index.html', $data);
    }

    //武器展示数据
    public function _getArms()
    {
        $type = [];
        $ids = array_unique(self::getChildren(447));
        foreach ($ids as $key => $value) {
            $model = Category::find()->where(['id' => $value])->one();
            $va['title'] = ($value == 447) ? '所有武器' : $model->name;
            $va['id'] = $model->id;
            $type[] = $va;
        }
        $data_info = $this->getContentArr(447);    //最新
        $data = [];
        if ($data_info) {
            foreach ($data_info as $key => $value) {
                $va['title'] = $value['title'];
                $va['sub_title'] = $value['sub_title'];
                $va['summary'] = $value['summary'];
                $va['content'] = ArmsController::parse_skill_arr(($value['content_message']));
                $data[] = $va;
            }
        }
        $info = [
            'type' => $type,
            'data' => $data,
        ];
        return $info;
    }


    public function actionError()
    {
        return $this->render('error');
    }

    public function actionMyTest()
    {
        /******翻牌********/
//        $_POST['node'] = 1;
//        $this->actionAjaxDraw();
//        exit;
//
//        /*****分享增加翻牌次数*********/
//        $this->actionAjaxAddDraw();
//        exit;

        /******预约发送验证码*********/
//        $_POST['phone'] = '15802859010';
//        $_POST['type'] = 'ios';
//        $this->actionAjaxYuyueVerify();
//        exit;
        /*******预约**********/
//        $_POST['type'] = 'android';
//        $this->actionAjaxYuyue();
//        exit;
//        $_POST['phone'] = 15181808256;
//        $_POST['type']=2;
//        $this->actionAjaxLoginVerify();exit;
        /******登录*************/
//        $_POST['phone'] = 15181808256;
//        $_POST['yzm'] = 481500;
//        $this->actionAjaxLogin();exit;
//        exit;
//        /*****登录发送验证码*************/
//        $_POST['phone'] = 15802859010;
//        $this->actionAjaxLoginVerify();
//
//        exit;
//        $this->actionAjaxGold();
//        $this->actionAjaxLoginOut();
        /******获取用户********/
//        $_POST['type']=2;
//        $this->actionAjaxGetUser();
    }



    /********************************************************************* 《全民枪战》王牌战争-预约公测 BEGIN *****************************************************************/
    /**
     * 获取用户信息
     */
    public function actionUserinfo()
    {
        $leftDay = $leftHour = 0;
        $betaTime = strtotime(CaWpzzUser::PUBLIC_BETA_TIME);
        $intv = $betaTime - time();
        if ($intv > 0) {
            $leftDay = floor($intv / 86400) > 0 ? floor($intv / 86400) : 0;
            $leftHour = floor(($intv % 86400) / 3600) + 1;
        }


        $gift = [];
        $result = ['status' => -1, 'msg' => '未登录', 'gift' => $gift, 'left_day' => $leftDay, 'left_hour' => $leftHour, 'phone' => ''];

        $phone = Cms::getSession('wpzz_phone');
        if (!$phone) {
            $this->ajaxOutPut($result);
        } else {
            $userGift = CaWpzzGift::find()->where(['phone' => $phone])->asArray()->one();
            if ($userGift) {
                $gift = $this->_formatGift($userGift);
            }
            $this->ajaxOutPut(['status' => 0, 'msg' => '已登录', 'gift' => $gift, 'left_day' => $leftDay, 'left_hour' => $leftHour, 'phone' => $phone]);
        }
    }

    /**
     * 登陆注册接口
     * 没账号自动注册
     */
    public function actionLogin()
    {
        $phone = Cms::getPostValue('phone', Cms::getGetValue('phone'));

        $res = Cms::checkVerify(8);
        if ($res['status'] == 0) {
            //注册或者登陆
            $loginRe = CaWpzzUser::login($phone);
            if (!$loginRe) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '登陆失败']);
            }
            Cms::setSession('wpzz_phone', $phone);
        }
        $this->ajaxOutPut($res);
    }


    /**
     * 获取验证码
     */
    public function actionGetcode()
    {
        $phone = Cms::getPostValue('phone', Cms::getGetValue('phone'));

        $captcha = Cms::getPostValue('captcha', Cms::getGetValue('captcha'));
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图形验证码错误']);
        }

        $res = Cms::verify($phone, 8, '您正在进行《王牌战争》分享活动，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    /**
     * 获取礼包
     */
    public function actionGift()
    {
        $phone = Cms::getSession('wpzz_phone');
        if (empty($phone)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '未登录']);
        }

        $existGift = CaWpzzGift::find()->where(['phone' => $phone])->asArray()->one();
        if ($existGift) {
            $this->ajaxOutPut(['status' => -2, 'msg' => '您已经领取过奖励啦']);
        }

        $gift = $this->_randGift();
        if (empty($gift)) {
            $this->ajaxOutPut(['status' => -3, 'msg' => '礼包码已发完']);
        }

        $data = [
            'status' => CaWpzzGift::STATUS_USED,
            'phone' => $phone,
            'send_at' => time()
        ];
        $where = ['id' => $gift['id'], 'status' => CaWpzzGift::STATUS_UNUSED];
        CaWpzzGift::updateAll($data, $where);

        $this->ajaxOutPut(['status' => 0, 'msg' => 'success', 'gift' => $this->_formatGift($gift)]);
    }


    /**
     * 注销
     */
    public function actionLogout()
    {
        Cms::setSession('wpzz_phone', NULL);
        $this->ajaxOutPut(['status' => 0, 'msg' => 'success',]);
    }


    private function _formatGift($giftObj)
    {
        $gift = [
            'code' => $giftObj['code'],
            'type' => $giftObj['type'],
        ];
        switch ($giftObj['type']) {
            case 0:
                $giftName = '金币*2888';
                $giftIcon = 'xxx';
                break;
            case 1:
                $giftName = '钻石*288';
                $giftIcon = 'xxx';
                break;

            default:
                $giftName = '金币*2888';
                $giftIcon = 'xxx';
                break;
        }

        $gift['name'] = $giftName;
        $gift['icon'] = $giftIcon;

        return $gift;
    }

    private function _randGift()
    {
        $giftArr = [CaWpzzGift::TYPE_GOLD, CaWpzzGift::TYPE_DIAMOND];
        $type = array_rand($giftArr);

        $gift = CaWpzzGift::find()->where(['type' => $type, 'status' => CaWpzzGift::STATUS_UNUSED])->asArray()->one();

        if (empty($gift)) {
            foreach ($giftArr as $giftType) {
                if ($giftType != $type) {
                    $type = $giftType;
                    break;
                }
            }
            $gift = CaWpzzGift::find()->where(['type' => $type, 'status' => CaWpzzGift::STATUS_UNUSED])->asArray()->one();
        }

        return $gift;
    }

    public function actionImport()
    {
        $file = '/Users/zhangxiong/Downloads/288diamond.xlsx';

        $excel = new Excel();
        $data = $excel->read($file);

        if (!$data) {
            echo "can't read file : " . $file . "\r\n";
            exit;
        }

        $data = $data['data'];

        $tmpValue = [];
        $insertValue = [];
        foreach ($data as $key => $value) {
            $tmpValue[] = [
                $value['0'], 1, 0, 0
            ];
            $normalKey = $key + 1;
            if ($normalKey % 1000 == 0) {
                $insertValue[] = $tmpValue;
                $tmpValue = [];
            }
        }

        if (!empty($tmpValue)) {
            $insertValue[] = $tmpValue;
        }

        $this->_insert($insertValue);
        echo 'ok';
    }

    private function _insert($insertValue)
    {
        if (empty($insertValue)) {
            return TRUE;
        }

        foreach ($insertValue as $key => $value) {
            if (empty($value)) {
                break;
            }

            $tableName = 'cms_ca_wpzz_gift_copy';

            $insertKey = ['code', 'type', 'status', 'send_at'];

            \Yii::$app->get('db')->createCommand()->batchInsert($tableName, $insertKey, $value)->execute();
        }


    }


    //导数据
    public function actionExpWpzz()
    {
        //导出时间
        $list = [];
        $all_data = CaWpzzGift::find()->asArray()->all();
        if ($all_data) {
            foreach ($all_data as $key=>$value) {
                $re['id']=$key+1;
                $re['code']=$value['code'];
                $re['phone']=$value['phone'];
                $re['type']=$value['type']==1?'钻石':'金币';
                $re['status']=$value['status']==1?'已领取':'未领取';
                $re['send_at']=$value['status']==1?date('Y-m-d H:i:s',$value['send_at']):'';
                $list[]=$re;
            }
        }
        if (!$list) {
            $this->ajaxOutPut(['暂未任何用户竞猜！']);
        }
        $filename = '王牌战争' . date('Y-m-d') . '礼包数据';
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=" . $filename . ".xls");
        header('Cache-Control: max-age=0');

        $strexport = "序号\t礼包码\t手机号码\t礼包类型\t是否领取\t领取时间\r";
        foreach ($list as $row) {
            $strexport .= $row['id'] . "\t";
            $strexport .= $row['code'] . "\t";
            $strexport .= $row['phone'] . "\t";
            $strexport .= $row['type'] . "\t";
            $strexport .= $row['status'] . "\t";
            $strexport .= $row['send_at'] . "\r";
        }
        $strexport = iconv('UTF-8', "GBK//TRANSLIT", $strexport);
        exit($strexport);
    }



    /********************************************************************* 《全民枪战》王牌战争-预约公测 END *****************************************************************/




    /********************************************************************* 《全民枪战》王牌战争-新老用户回归 START *****************************************************************/



    //新老用户获取信息
    public function actionAjaxWpzzUser(){
        $phone=Cms::getSession('login_wpzz_phone');
        $user=HeroWpzzModel::find()->where(['phone'=>$phone])->asArray()->one();
        if(!$user){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录']);
        }
        $codes='';
        if($user['user_status']!=3) {
            if ($user['user_status'] == 1) {
                $code[] = self::_getInviteCode($phone, 324);
                $code[] = self::_getInviteCode($phone, 341);
            } else {
                $code[] = self::_getInviteCode($phone, 325);
                $code[] = self::_getInviteCode($phone, 342);
            }
            if($code) {
                foreach ($code as $v) {
                    if ($v['status'] == 0) {
                        $codes .= $v['msg'] . ',';
                    }
                }
            }
        }
        $user['login_code']=$codes;


        unset($user['id']);
        unset($user['invite_at']);
        $user['share_url']=self::_InviteUrl().'invite_code='.$user['me_invite_code'];
        $this->ajaxOutPut(['status'=>0,'msg'=>$user]);
    }


    //新老用户获取验证码
    public function actionAjaxLoginWpzzVerify(){
        $type=Cms::getPostValue('type',1);// 1 是否为角色登录 3 求助的好友
        $phone = Cms::getPostValue('phone');
        $user_id=Cms::getPostValue('user_id');// 角色id 40002
        $user_name=Cms::getPostValue('user_name');// 角色昵称 落霞孤鹜水长天

        if($user_id && $user_name){
            $user=HeroWpzzModel::find()->where(['user_id'=>$user_id])->andWhere(['user_name'=>$user_name])->one();
            if($user &&$user->phone!==$phone) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '该用户已绑定手机号码，请重新输入手机号码！']);
            }
        }
        if($type==3){
            $captcha = Cms::getPostValue('captcha');
            $res = $this->createAction('captcha')->validate($captcha, false);
            if (!$res) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
            }
            $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《王牌战争》活动登录，请于1小时内输入');
            $res['type'] =$type;
            $this->ajaxOutPut($res);
        }else {
            //验证用户的账户及区服
            $category = [
                'gameid' => 21,
                'serverid' => 51,
                'rolename' =>$user_name ,
                'roleid' =>$user_id ^ 0x55555555 ,
            ];
            $content = UserDataController::provide($category);
            if (isset($content['code']) && $content['code'] == 0) {

                if(!isset($content['data'])){
                    $this->ajaxOutPut(['status'=>-1,'msg'=>'该账户暂无信息！']);
                }
                $captcha = Cms::getPostValue('captcha');
                $res = $this->createAction('captcha')->validate($captcha, false);
                if (!$res) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
                }
                $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《王牌战争》活动登录，请于1小时内输入');
                $this->ajaxOutPut($res);
            } else {
                $this->ajaxOutPut(['status' => -1, 'msg' => '角色信息有误！']);
            }
        }
    }

    //新老用户登录
    public function actionAjaxLoginWpzz(){
        $msg_=[];
        $type=Cms::getPostValue('type');// 1新老用户 3 求助的好友
        $phone = Cms::getPostValue('phone');
        $user_id=Cms::getPostValue('user_id');// 大厅id 40002
        $user_name=Cms::getPostValue('user_name');// 角色昵称 落霞孤鹜水长天

        $invite_code=Cms::getPostValue('invite_code');// 邀请码
        $is_login=0;
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            $user = HeroWpzzModel::find()->where(['phone'=>$phone])->one();
            if(!$user) {
                $user = new HeroWpzzModel();
                $user->me_invite_code=Cms::generateStr(6);
                $user->lb_num=1;
                $user->login_at=time();
                $user->created_at=time();
                $user->user_status=3;
                if($type!=3) {
                    //验证用户的账户及区服
                    $category = [
                        'gameid' => 21,
                        'serverid' => 51,
                        'rolename' =>$user_name ,
                        'roleid' =>$user_id ^ 0x55555555 ,
                    ];
                    $content = UserDataController::provide($category);
                    if (isset($content['code']) && $content['code'] == 0) {
                        $role=$content['data'];
                        $register_time=$role['register_time'];
                        $user_type=self::_getUserType($register_time);
                        $user->user_status=$user_type;
                        $user->user_id=$user_id;
                        $user->user_name=$user_name;
                        $user->register_at=$register_time;
                        $user->created_at=time();
                    }
                }
                $user->phone=$phone;
                $user->login_at=time();
                $is_login=1;
            }
            //每天首次登陆 抽奖次数清零
            if($user->login_at<strtotime(date('Y-m-d'))){
                $user->draw_num=0;
            }
            $msg_['share_url']=self::_InviteUrl().'invite_code='.$user->me_invite_code;
            $msg_['invite_num']=count(array_filter(explode(',',$user->other_invite_code)));
            $msg=$user->attributes;
            $user_type=$user->user_status;
            $msg=array_merge($msg,$msg_);
            $msg['is_login']=$is_login;
            if($user->save()){
                if($invite_code && $is_login==1){
                    self::invite($user->me_invite_code,$invite_code);
                }
                //新老用户登录礼包
                if($type!=3){
                    $code=[];
                    if($user_type==1){
                        $code[]=self::_getLoginCode($user,$phone,341);
                        $code[]=self::_getLoginCode($user,$phone,324);
                    }else{
                        $code[]=self::_getLoginCode($user,$phone,325);
                        $code[]=self::_getLoginCode($user,$phone,342);
                    }
                    $codes='';
                    if($code){
                        foreach ($code as $v){
                            if($v['status']==0){
                                $codes.=$v['msg'].',';
                            }
                        }
                    }
                    $msg['login_code']=$codes;
                }
                Cms::setSession('login_wpzz_phone', $phone);
                Cms::setSession('login_wpzz_type', $user->user_status);
                $this->ajaxOutPut(['status'=>0,'msg'=>$msg]);
            }
        }else{
            $this->ajaxOutPut($res);
        }
    }

    //新老用户邀请领礼包 1 2 人对应的礼包
    public function actionAjaxInviteGift(){
        $type=Cms::getPostValue('type');
        $phone=Cms::getSession('login_wpzz_phone');
        $user_status=Cms::getSession('login_wpzz_type');

        $user=HeroWpzzModel::find()->where(['phone'=>$phone])->one();
        if($user && $user_status!=$type){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'该礼包与您的身份不符！']);
        }
        $invite_code=[
            1=>[
                1=>326,
                2=>327,
            ],
            2=>[
                1=>328,
                2=>329,
            ]
        ];
        $code=[];
        $codes=[];
        if($user->invite_num) {
            if ($user->invite_num >= 2) {
                $code[]=self::_getInviteCode($phone,$invite_code[$type][1],1);
                $code[]=self::_getInviteCode($phone,$invite_code[$type][2],2);
            } elseif ($user->invite_num >= 1) {
                $code[]=self::_getInviteCode($phone,$invite_code[$type][1],1);
            }
            foreach ($code as $value){
                if($value['status']==0){
                    $codes[$value['num']]=$value['msg'];
                }
            }
        }
        $this->ajaxOutPut(['status'=>0,'msg'=>$codes]);
    }

    //投入奶币及转换为次数
    public function actionAjaxLbToNum(){
        $phone=Cms::getSession('login_wpzz_phone');
        $user=HeroWpzzModel::find()->where(['phone'=>$phone])->one();
        if($user->lb_num>1){
           //2枚奶币=1次 4枚奶币=3次  8枚奶币=6次  12枚奶币=9次
            if($user->lb_num%4==0){
                $user->draw_num=$user->draw_num+($user->lb_num/4)*3;
                $user->lb_num=0;
            }else{
                if($user->lb_num>4){
                    $int=intval($user->lb_num/4);
                    $num=$int*3;
                    $int_=$user->lb_num-$int*4;
                    $int=intval($int_/2);
                    $num=$num+$int;
                    if($int_==2){
                        $user->lb_num=0;
                    }else{
                        $user->lb_num=1;
                    }
                    $user->draw_num=$user->draw_num+$num;
                }else{
                    $int=intval($user->lb_num/2);
                    $int_=$user->lb_num-$int*2;
                    if($int_==0){
                        $user->lb_num=0;
                    }else{
                        $user->lb_num=1;
                    }
                    $user->draw_num=$user->draw_num+1;
                }
            }
            $user->save();
            $this->ajaxOutPut(['status'=>0,'msg'=>'success','draw_num'=>$user->draw_num,'lb_num'=>$user->lb_num]);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'奶币数额不够！']);

    }

    protected static $shiwu_arr=[330,331,332,340];

    //抽奖
    public function actionAjaxLbDraw(){
        $phone=Cms::getSession('login_wpzz_phone');
        $user=HeroWpzzModel::find()->where(['phone'=>$phone])->one();
        if($user->draw_num>0){
            $del_gift_ids=array_filter(explode(',',$user->gift_code_ids));
            $res=self::_gift_code($phone,11,$del_gift_ids);
            if($res['status']==0 && $res['is_shiwu']==2 ){//谢谢参与
                $user->draw_num= $user->draw_num-1;
            }elseif($res['status']==0 && $res['is_shiwu']==0 ){//有礼包
                $user->draw_num= $user->draw_num-1;
                $user->gift_code_ids= $user->gift_code_ids.','.$res['gift_id'];
            }elseif($res['status']==0 && $res['is_shiwu']==1){//实物处理
                $user->draw_num= $user->draw_num-1;
                $user->gift_code_ids= $user->gift_code_ids.','.$res['gift_id'];
            }else{
                $this->ajaxOutPut($res);
            }
            $user->save();
            $this->ajaxOutPut(['status'=>0,'msg'=>$res,'draw_num'=>$user->draw_num]);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'暂无抽奖机会']);
    }

    //填写收货地址
    public function actionAjaxAddress()
    {
        $phone = Cms::getSession('login_wpzz_phone');
        $model = HeroWpzzModel::find()->where(['phone' => $phone])->one();
        $name = Cms::getPostValue('name');
        $code = Cms::getPostValue('code');
        $address = Cms::getPostValue('address');
        $tel = Cms::getPostValue('tel');
//        $file = trie_filter_load('words.dic');
//        $search_name = trie_filter_search_all($file, $name);  // 一次把所有的敏感词都检测出来
//        $search_address = trie_filter_search_all($file, $address);  // 一次把所有的敏感词都检测出来
//        if (!empty($search_name)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货姓名含有敏感词，请重新编辑！']);
//        }
//        if (!empty($search_address)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址含有敏感词，请重新编辑！']);
//        }
        if (empty($name) || empty($address) || empty($tel)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请完善收货信息']);
        }
        $model->name = $name;
        $model->code = $code;
        $model->address = $address;
        $model->tel = $tel;
        if ($model->save()) {
            $this->ajaxOutPut(['status' => 0, 'msg' => '收货地址完善成功！']);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址添加失败！']);
        }
    }

//    我的礼包
    public function actionAjaxMyCode(){
        $data=[];
        $type=Cms::getPostValue('type',3);//1 用户礼包  2转盘礼包 3 转盘的礼包所有
        $phone = Cms::getSession('login_wpzz_phone');
        $user = HeroWpzzModel::find()->where(['phone' => $phone])->asArray()->one();
        if($type==1){
             if($user['gift_ids']){
                 $gift_ids=array_filter(explode(',',$user['gift_ids']));
                 foreach ($gift_ids as $v){
                     $gift_ = GiftCode::find()->with('gift')->where(['gift_id' => $v])->andWhere(['phone' => $phone])->asArray()->one();
                    $re['msg']=$gift_['gift']['name'];
                    $re['code']=$gift_['code'];
                    $re['gift_id']=$v;
                    $data[]=$re;
                 }
             }
            $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
        }elseif($type==2){
            if($user['gift_code_ids']){
               $gift_code_ids=array_filter(explode(',',$user['gift_code_ids']));
               foreach ($gift_code_ids as $v){
                   $is_shiwu=0;
                   if(in_array($v,self::$shiwu_arr)){
                       $is_shiwu=1;
                       $gift_=Gift::findOne($v);
                       $re['name']=$gift_->name;
                       $re['code']='';
                       $re['gift_id']=$v;

                   }else {
                       $gift_ = GiftCode::find()->with('gift')->where(['gift_id' => $v])->andWhere(['phone' => $phone])->asArray()->one();
                       $re['name'] = $gift_['gift']['name'];
                       $re['code'] = $gift_['code'];
                       $re['gift_id'] = $v;
                   }
                   $re['is_shiwu']=$is_shiwu;
                   $data[]=$re;
               }
            }
            $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
        }else{
            $hero_user=HeroWpzzModel::find()->where(['NOT',['gift_code_ids'=>null]])->orderBy(['login_at'=>SORT_DESC])->limit(30)->all();
            foreach ($hero_user as $k=>$v){
                if ($v->gift_code_ids) {
                    $my_draw_id = array_filter(explode(',', $v->gift_code_ids));
                    foreach ($my_draw_id as $en_k => $en_v) {
                        if(in_array($en_v,self::$shiwu_arr)){
                            $gift_=Gift::findOne($en_v);
                            $re['name'] = $gift_->name;
                            $re['phone'] = substr_replace($v->phone, '****', 3, 4);
                        }else{
                            $my_code_ = GiftCode::find()->with('gift')->where(['gift_id' => $en_v])->andWhere(['phone' => $v->phone])->asArray()->one();
                            $re['name'] = $my_code_['gift']['name'];
                            $re['phone'] = substr_replace($my_code_['phone'], '****', 3, 4);
                        }
                        $data[] = $re;
                    }
                }
            }
            $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
        }
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginWpzzOut(){
        $session = \Yii::$app->session;
        $session->remove('login_wpzz_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_wpzz_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' =>$msg]);
    }


    //领礼包
    private static function _gift_code($phone,$gift_id,$is_del=[]){
        $gift=GiftActivityModel::findOne($gift_id);
        $prize_arr=['320'=>6666];
        //排除谢谢参与
        if(in_array('320',$is_del)){
            unset($prize_arr['320']);
        }
        $arr=[];
        if($gift){
            $gift_words=unserialize($gift->gift_awards);
            if($gift_words) {
                foreach ($gift_words as $k) {
                    if ($is_del && in_array($k['gift'], $is_del)) continue;
                    $re['odds'] = $k['odds'];
                    $re['is_entity'] = $k['is_entity'];
                    $re['num'] = $k['num'];
                    $prize_arr[$k['gift']] = $k['odds'];
                    $arr[$k['gift']] = $re;
                }
            }
        }
        $id=self::_getRand($prize_arr);
        if(isset($arr[$id]['is_entity']) && $arr[$id]['is_entity']==1){
            $res=['status'=>0,'is_shiwu'=>1,'gift_id'=>$id,'msg'=>'','num'=>$arr[$id]['num']];
        }elseif($id==320) {
            $res=['status'=>0,'is_shiwu'=>2,'gift_id'=>$id,'msg'=>'谢谢参与'];
        }else{
            $gift = GiftCode::find()->where(['status' => 0, 'gift_id' => $id])->orderBy(['id' => SORT_ASC])->one();
            if (!$gift) {
                $res['status'] = -1;
                $res['msg'] = '很遗憾，礼包码已经全部领取完！';
            } else {
                $gift->phone = (string)$phone;
                $gift->updated_at = date('Y-m-d H:i:s');
                $gift->status = 1;
                if ($gift->save()) {
                    $res['status'] = 0;
                    $res['is_shiwu'] = 0;
                    $res['gift_id'] = $id;
                    $res['msg'] = $gift->code;
                } else {
                    $res['status'] = -1;
                    $res['msg'] = '领取失败， 请重新领取！';
                }
            }
        }
        return $res;
    }


    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private static function _getRand($proArr) {
        $result = '';
        //概率数组的总概率精度
        $proSum = array_sum($proArr);
        //概率数组循环
        foreach ($proArr as $key => $proCur) {
            $randNum = mt_rand(1, $proSum);
            if ($randNum <= $proCur) {
                $result = $key;
                break;
            } else {
                $proSum -= $proCur;
            }
        }
        unset ($proArr);
        return $result;
    }

    /**
     * 邀请功能
     */
    protected function invite($me_invite_code, $invite_code)
    {

        $model_other = HeroWpzzModel::find()->where(['me_invite_code'=>$invite_code])->one();//邀请的用户
        if (!$model_other) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
        }
        $is_invite = HeroWpzzModel::find()->where(['me_invite_code'=>$invite_code])->andWhere(['like','other_invite_code',','.$me_invite_code])->one();//判断邀请用户是否已经被邀请过
        if(!$is_invite) {
            //每天邀请人数清零
            if($model_other->invite_at<strtotime(date('Y-m-d'))){
                $model_other->today_invite_num=0;
                $model_other->invite_at=time();
            }
            //每天最多邀请11个人
            if($model_other->today_invite_num<11){
                $model_other->other_invite_code = $model_other->other_invite_code . ',' . $me_invite_code;
                $model_other->today_invite_num=$model_other->today_invite_num+1;
                $model_other->lb_num=$model_other->lb_num+1;
                $model_other->invite_at=time();
            }
            $model_other->invite_num=$model_other->invite_num+1;
            $model_other->save();
        }
    }
    /**
     * 获取邀请的地址
     * @return string
     */
    public function _InviteUrl()
    {
        if (YII_DEV) {
            return "http://hero.dev.yingxiong.com/cover.html?";
        } else if (YII_DEMO) {
            return "http://hero.demo.yingxiong.com/cover.html?";
        } else {
            return "http://hero.yingxiong.com/cover.html?";
        }

    }
    //是否为新老玩家
    protected static function _getUserType($time){
        $old_time=strtotime(date('2018-7-5'));
        if($time<=$old_time){
            $flag=2;
        } else{
            $flag=1;
        }
        return $flag;
    }
    //邀请人数送礼包、登录送礼包
    protected static function _getInviteCode($phone,$gift_id,$num=0){
        $user=HeroWpzzModel::find()->where(['phone'=>$phone])->one();
        $res=Cms::getGiftNoYzm($phone,$gift_id);
        if($res['status']==0){
            if($res['is_repeat']==0) {
                $user->gift_ids = $user->gift_ids . ',' . $gift_id;
                $user->save();
            }
        }else{
            $res['status']=-1;
            $res['msg']='很遗憾，礼包码已经全部领取完！';
        }
        $res['num']=$num;
        return $res;

    }
    //邀请人数送礼包、登录送礼包
    protected static function _getLoginCode($user,$phone,$gift_id){
        $res=Cms::getGiftNoYzm($phone,$gift_id);
        if($res['status']==0){
            if($res['is_repeat']==0) {
                $user->gift_ids = $user->gift_ids . ',' . $gift_id;
                $user->save();
            }
        }else{
            $res['status']=-1;
            $res['msg']='很遗憾，礼包码已经全部领取完！';
        }
        return $res;

    }

    /**
     * wap端 二维码扫描记录信息
     */
    public function actionAjaxEwmLog()
    {
        $type = Cms::getClientType();
        $ip = Cms::getClientIp();
        if ($type == 0) {
            $this->ajaxOutPut(['status' => -1, 'msg' => 'pc端不统计']);
        }
        HeroEwmActLog::addLog($ip, $type);
        $this->ajaxOutPut(['status' => 0, 'msg' => '成功']);
    }

    public function actionTes(){
        $category = [
            'gameid' => 21,
            'serverid' => 51,
            'rolename' =>'' ,
//            'roleid' =>1863731 ,
//            'roleid' =>149928605030 ,
            'roleid' =>118813529446 ^ 0x55555555,
        ];
        $content = UserDataController::provide($category);
//        $role=$content['data'];
//        $register_time=$role['register_time'];
//        $user_type=self::_getUserType($register_time);
       pr($content,1);




//        $_POST['user_id']=149202247731;
//        $_POST['user_name']='葬爱骨少';
//        $_POST['type']=3;
////        $_POST['invite_code']='MTkvzB';
//        $_POST['phone']=15181808256;
//        $_POST['yzm']=305142;

//        $this->actionAjaxLoginWpzzVerify();
//        $this->actionAjaxLoginWpzz();
//        $this->actionAjaxInviteGift();
//        $this->actionAjaxLbToNum();
//        $this->actionAjaxLbDraw();
//        $this->actionAjaxMyCode();
//        $this->actionAjaxWpzzUser();
//        $this->actionAjaxLoginWpzzOut();
        exit;
    }

    /********************************************************************* 《全民枪战》王牌战争-新老用户回归 END *****************************************************************/




}
