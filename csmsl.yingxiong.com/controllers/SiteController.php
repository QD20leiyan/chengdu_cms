<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;

use common\Cms;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\models\csmsl\CsmslUser;
use common\models\GameSubscribe;
use common\models\Gift;
use common\models\GiftCode;
use common\models\Stat;
use function GuzzleHttp\Psr7\str;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    const GIFT = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

    public function actionCover()
    {
        $data['captcha_img'] = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
//        $invite_code = Cms::getGetValue('invite_code');
//        Cms::setSession('invite_code', $invite_code);
        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        $data['video'] = isset($video[0])?$video[0]:'';
        return $this->renderPartial('cover.html', $data);
    }

    public function actionIndex()
    {
        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        //特色玩法
        $play=$this->getRecommend('esp_play');
        //首页轮播
        $banner=$this->getRecommend('p_w_index');
        //最新新闻
        $zx=$this->getContentArr(\Yii::$app->params['ZUIXIN'],3);
        //新闻
        $xw=$this->getContentArr(\Yii::$app->params['XINWEN'],3);
        //公告
        $gg=$this->getContentArr(\Yii::$app->params['GONGGAO'],3);
        //攻略
        $gl=$this->getContentArr(\Yii::$app->params['GONGLUE'],3);
        //活动
        $hd=$this->getContentArr(\Yii::$app->params['HUODONG'],3);
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $data=[
            'video'=>isset($video[0])?$video[0]:'',
            'play'=>$play,
            'banner'=>$banner,
            'zx'=>$zx,
            'xw'=>$xw,
            'gg'=>$gg,
            'gl'=>$gl,
            'hd'=>$hd,
            'captcha_img' => $captcha_img,
            'style'=>'index'
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }

        return $this->renderPartial('index.html',$data);
    }

    /**
     * 抽奖判断用户是否登录
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        $user = CsmslUser::find()->where(['phone' => Cms::getSession('login_phone')])->one();
        $count = $user['invite_num'] - $user['invite_count'];
        $share_url = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
        $data = $user->getAttributes();
        $data['status'] = 0;
        $data['msg'] = '';
        $data['count'] = $count;
        $data['share_url'] = $share_url;

        $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => Cms::getSession('login_phone'), ':website_id' => $this->website_id])->one();
        $data['is_yuyue'] = $exist_phone ? 1 : 0;

        if ($data['draw_time'] < strtotime(date('Y-m-d').' 00:00:00')) {
            $data['today_draw_count'] = 0;
        }
        $this->ajaxOutPut($data);
    }

    //登录发送验证码
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::YUYUE, '您正在进行《超杀默示录》预约登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    /**
     * 登录
     */
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::YUYUE);
        if ($res['status'] == 0) {
            Cms::setSession('login_phone', $phone);
            $user = CsmslUser::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new CsmslUser();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr();
                $user->created_at = time();
                $user->updated_at = time();
                $user->save();
            }
            $msg = $user->attributes;
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $msg['count'] = $msg['invite_num'] - $msg['invite_count'];

            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => Cms::getSession('login_phone'), ':website_id' => $this->website_id])->one();
            $msg['is_yuyue'] = $exist_phone ? 1 : 0;

            if ($msg['draw_time'] < strtotime(date('Y-m-d').' 00:00:00')) {
                $msg['today_draw_count'] = 0;
            }

            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_phone');
        $_POST['phone'] = $phone;
        $invite_code = Cms::getPostValue('invite_code');
//        $invite_code = Cms::getSession('invite_code');
        $_POST['scene'] = Cms::YUYUE_SCENE_OLD;
        $valid = 1; //邀请码有效
        if ($invite_code) {
            $model = CsmslUser::find()->where('me_invite_code = :invite_code and phone != :phone', [':invite_code' => $invite_code, ':phone' => $phone])->one();
            if (!$model) {
                $valid = 0;
            }
        }
        $invite_model = CsmslUser::find()->where('phone = :phone', [':phone' => $phone])->one();
        if (!$invite_model) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '用户不存在，请重新登录！']);
        }

        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_OLD, Cms::IS_UNIQUE_PHONE);

        if ($res['status'] == 0 && $invite_code && $valid == 1) {  //如果是有邀请码的用户预约
            if ($invite_model) {
                $invite_model->other_invite_code = (string)$invite_code;
                $invite_model->updated_at = time();
                $invite_model->save();
            }
            $model->invite_num = $model->invite_num + 1;  //邀请码的用户邀请人数+1
            $model->save();
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 检测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => 2, 'msg' => '请登录！']);
        }
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    private function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://csmsl.dev.yingxiong.com/site/cover.html?";
        } else if (YII_DEMO) {
            return "http://csmsl.demo.yingxiong.com/site/cover.html?";
        } else {
            return "http://csmsl.yingxiong.com/site/cover.html?";
        }

    }

    /**
     * 中奖记录
     */
    public function actionAjaxLotteryLog()
    {
        $gift = GiftCode::find()->where(['in', 'gift_id', self::GIFT])->andWhere(['status' => 1])->with('gift')->orderBy('updated_at desc')->limit(100)->asArray()->all();
        $data = [];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['phone'] = substr_replace($v['phone'], '****', 3, 4);
                $tmp['name'] = $v['gift']['name'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $data]);
    }

    /**
     * 用户中奖记录
     */
    public function actionAjaxLotteryMeLog()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_phone');
        $gift = GiftCode::find()->where('phone = :phone', [':phone' => $phone])->with('gift')->andWhere(['in', 'gift_id', self::GIFT])->asArray()->all();
        $data = [];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['name'] = $v['gift']['name'];
                $tmp['code'] = $v['code'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }

    /**
     * 保存收货地址
     */
    public function actionAjaxSaveAddress()
    {
        $this->_checkLogin();
        $name = Cms::getPostValue('name');
        $code = Cms::getPostValue('code');
        $address = Cms::getPostValue('address');
        $tel = Cms::getPostValue('tel');
        if (!$name || !$code || !$address || !$tel) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '填写的信息有误，不能为空']);
        }
        $user = CsmslUser::find()->where(['phone' => Cms::getSession('login_phone')])->one();
        $_POST['tel'] = (string)$_POST['tel'];
        $_POST['code'] = (string)$_POST['code'];
        $_POST['CsmslUser'] = $_POST;
        if ($user->load(Cms::getPostValue()) && $user->save()) {
            $this->ajaxOutPut(['status' => 0]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => $user->getErrors()]);
        }
    }

    /**
     * 抽奖
     */
    public function actionAjaxLottery()
    {
        $this->_checkLogin();
        $prize_arr = [  //概率
            1 => [
                25 => 3300,
                26 => 3300,
                27 => 3400
            ],
            2 => [
                28 => 1000,
                29 => 1000,
                30 => 1000,
                31 => 1000,
                32 => 1000,
                33 => 1000,
                34 => 900,
                35 => 900,
                36 => 900,
                37 => 100,  //实物 10
                38 => 200,  //实物 40
                0 => 1000
            ],

            3 => [
                40 => 1000,
                41 => 1000,
                42 => 1000,
                43 => 1000,
                44 => 1000,
                45 => 1000,
                46 => 900,
                47 => 900,
                48 => 900,
                49 => 200,  //实物 40
                50 => 100,  //实物 10
                0 => 1000
            ],
        ];

        $node = Cms::getPostValue('node');
        if (!$node || !in_array($node, [1, 2, 3])) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '奖池序号错误！']);
        }
        $user = CsmslUser::find()->where(['phone' => Cms::getSession('login_phone')])->one();
        $share_url = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;

        if ($user->invite_count >= 400) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您开奖次数达到上限！']);
        } else if ($user->today_draw_count >= 10 && $user->draw_time > strtotime(date('Y-m-d', strtotime("-1 day")).' 23:59:59')) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您今日开奖次数达到上限！']);
        } else if ($user->draw_time < strtotime(date('Y-m-d', strtotime("-1 day"))." 23:59:59")) {
            $user->today_draw_count = 0;
            $user->save();
        }

        $count = $user->invite_num - $user->invite_count;
        if ($user->invite_num <= 0 || $count <= 0) {    //如果抽奖次数为0，则提示邀请好友
            $this->ajaxOutPut(['status' => 1, 'share_url' => $share_url]);
        }

        if ($user->invite_num == 1 || $node == 1) {    //抽第一个奖池
            if ($node == 2 || $node == 3) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您没有达到开启该奖池的要求！']);
            }

            if ($user->lottery_node_1 == 1) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您已经开启该奖池，请开启其他奖池！']);
            }

            $id = self::_getRand($prize_arr[1]);
            if ($id == 0) {
                $res = ['status' => 0, 'id' => 0, 'is_repeat' => 1, 'msg' => '谢谢参与！'];
            } else {
                $res = Cms::getGiftNoYzm(Cms::getSession('login_phone'), $id, Cms::GIFT_NO_REPEAT);
            }
        } else if ($user->invite_num == 2) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您没有达到开启该奖池的要求！']);
        } else {
            if ($node == 2) {   //抽第二个奖池
                $id = self::_getRand($prize_arr[2]);
                if ($id == 0) {
                    $res = ['status' => 0, 'id' => 0, 'is_repeat' => 1, 'msg' => '谢谢参与！'];
                } else if ($id == 37 || $id == 38) {    //实物
                    $res = ['status' => 0, 'id' => $id, 'is_repeat' => 0, 'msg' => '谢谢参与！', 'shiwu' => 1];
                }  else {
                    $res = Cms::getGiftNoYzm(Cms::getSession('login_phone'), $id, Cms::GIFT_NO_REPEAT);
                }

            } else if ($node == 3) {    //抽第三个奖池
                $id = self::_getRand($prize_arr[3]);
                if ($id == 0) {
                    $res = ['status' => 0, 'id' => 0, 'is_repeat' => 1, 'msg' => '谢谢参与！'];
                } else if ($id == 49 || $id == 50) {    //实物
                    $res = ['status' => 0, 'id' => $id, 'is_repeat' => 0, 'msg' => '谢谢参与！', 'shiwu' => 1];
                } else {
                    $res = Cms::getGiftNoYzm(Cms::getSession('login_phone'), $id, Cms::GIFT_NO_REPEAT);
                }

            }
        }

        $user->invite_count = $user->invite_count+1;
        $user->today_draw_count = $user->today_draw_count+1;
        $user->draw_time = time();

        if ($user->invite_num == 1 || $node == 1) { //1号奖池
            $user->lottery_node_1 = 1;
        }

        if (key_exists('shiwu' , $res)) {
            $count = CsmslUser::find()->where(['like', 'gift_ids', ','.$id.','])->count();
            if ((in_array($id, [37, 50]) && $count >= 10) || (in_array($id, [38, 49]) && $count >= 40)) {
                $res['is_repeat'] = 1;
            } else {
                $gift_ids = trim($user->gift_ids, ',');
                $id_arr = explode(',', $gift_ids);
                if (!in_array($res['id'], $id_arr)) {
                    if (!$user->gift_ids) {
                        $user->gift_ids = ','.$id.',';
                    } else {
                        $user->gift_ids = $user->gift_ids.$id.',';
                    }
                } else {
                    $res['is_repeat'] = 1;
                }
            }
        }

        $user->save();

        if (($res['status'] == 0 && $res['is_repeat'] == 1) || $res['status'] != 0) {    //重复领取，获取领取失败，则自动跳转为谢谢参与
            $this->ajaxOutPut(['status' => 0, 'msg' => '谢谢参与！', 'id' => 0, 'gift_code' => '', 'gift_name' => '', 'user' => $user->getAttributes() ]);
        }
        $gift = Gift::findOne($id);
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'id' => $id, 'gift_code' => $res['msg'], 'gift_name' => $gift['name'], 'user' => $user->getAttributes()]);
    }

    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private function _getRand($proArr) {
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
     * 获取预约人数
     */
    public function actionAjaxGetNum()
    {
        $count = Stat::find()->where(['name' => 'csmsl_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->one();
        $this->ajaxOutPut(['status' => 0, 'msg' => $count['count']]);
    }

    /***首页预约***/
    public function actionAjaxIndexYy(){
        $yuyue=Cms::yuyue();
        $this->ajaxOutPut($yuyue);
    }

    public function actionTest($type = '', $id = '')
    {
        if (!$type) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }

    public function actionMyTest()
    {
        /********抽奖************/
//        $_POST['node'] = 2;
//        $this->actionAjaxLottery();
//
//        exit;
        /*******保存收货地址***********/
//        $_POST['name'] = '似懂非懂';
//        $_POST['code'] = '0000';
//        $_POST['tel'] = 15802859011;
//        $_POST['address'] = 'aaaaaaaa';

//        $this->actionAjaxSaveAddress();
//        exit;
        /******预约***********/
//        $_POST['type'] = 'ios';
//        $_POST['phone'] = 15802859010;

//        $this->actionAjaxYuyue();
//
//        exit;
        /******预约*********/
//        $_POST['yzm'] = 290777;
//        $_POST['phone'] = 15181808256;
//        $_POST['type'] = 'android';
//        $this->actionAjaxIndexYy();
//
//        exit;
        /*******登录发送验证码*******************/
//        $_POST['captcha'] = 1323;
//        $_POST['phone'] = 15181808256;
//        $this->actionAjaxLoginVerify();
//
//        exit;
        /********判断用户是否登录*********/
//        $this->actionAjaxGetUser();
//        exit;

        /******登录*****/
//        $_POST['phone'] = 15802859010;
//        $_POST['yzm'] = 722839;
//        $this->actionAjaxLogin();

    }
}
