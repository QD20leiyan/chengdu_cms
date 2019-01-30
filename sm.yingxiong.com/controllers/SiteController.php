<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\SmFashionModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\helpers\Utils;
use common\models\GameSubscribe;
use common\models\GiftCode;
use common\models\GiftCodeAddress;
use common\models\GiftCodeLog;
use common\models\sm\SmInvite;
use common\models\sm\SmLotteryUser;
use common\models\Stat;
use common\models\VerifyCode;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    const GROUP_NAME = 'cover_lottery';

    public $prizeArr = [
        0 => ['id' => 0, 'prize' => '谢谢惠顾', 'v' => 800000, 'num' => 1000000, 'gift' => ''],
        371 => ['id' => 371, 'prize' => '黑蚀龙*1', 'v' => 1, 'num' => 1, 'gift' => ''],
        372 => ['id' => 372, 'prize' => '蒸汽石*20', 'v' => 200, 'num' => 500, 'gift' => ''],
        373 => ['id' => 373, 'prize' => '巧克力蛋糕*5', 'v' => 350000, 'num' => 60000, 'gift' => ''],
        374 => ['id' => 374, 'prize' => 'CONWOOD合作款箱包1个', 'v' => 5, 'num' => 6, 'gift' => ''],
        375 => ['id' => 375, 'prize' => '限量款贴纸1套', 'v' => 100, 'num' => 300, 'gift' => ''],
        376 => ['id' => 376, 'prize' => '限量款笔记本1个', 'v' => 10, 'num' => 10, 'gift' => ''],
        377 => ['id' => 377, 'prize' => '限量款玩偶1个', 'v' => 10, 'num' => 10, 'gift' => ''],
    ];

    public $giftCodeIds = [371, 372, 373]; // 虚拟礼包
    public $giftIds = [371, 372, 373, 374, 375, 376, 377];


    public function actionCover()
    {
//        header("Location:/");

        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $invite_code = Cms::getGetValue('invite_code');
        if ($invite_code) {
            Cms::setSession('invite_code', $invite_code);
        }
        return $this->renderPartial('cover.html', ['captcha_img' => $captcha_img]);
    }

    /**
     * cover 页转到这个活动页上
     * @return false|string
     * @throws \Exception
     */
    public function actionAct()
    {
        echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $invite_code = Cms::getGetValue('invite_code');
        if ($invite_code) {
            Cms::setSession('invite_code', $invite_code);
        }
        return $this->renderPartial('cover.html', ['captcha_img' => $captcha_img]);
    }

    public function actionIndex()
    {
        $data['banners'] = $this->getRecommend('banner');
        $data['video'] = $this->getRecommend('video');

        $count = Stat::find()->where(['name' => 'subscribe_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->one();
        $data['count'] = $count['count'];

        $data['zuixin'] = $this->getContentArr(64, 5);    //最新
        $data['xinwen'] = $this->getContentArr(65, 5);    //新闻
        $data['gonggao'] = $this->getContentArr(66, 5);    //公告
        $data['huodong'] = $this->getContentArr(67, 5);    //活动
        $data['gonglue'] = $this->getContentArr(68, 5);    //攻略

        //游戏图鉴
        $data['wq'] = self::parse_army_arr(550,4);  //武器
        $data['fj'] = self::parse_army_arr(551,4);  //防具
        $data['fs'] = self::parse_army_arr(552,4);   //服饰
        $data['ss'] = self::parse_army_arr(553,4);   //设施
        $data['dj'] = self::parse_army_arr(554,4);    //道具
        $data['jz'] = self::parse_army_arr(555,4);    //建筑

//        $data['yx_tj'] = $yx_tj;
        $data['zhubo_lunbo'] = $this->getContentArr(380, 3);

        $data_ids = [];
        $data_ids = self::getChildren(117, $data_ids);
        $data_ids = self::getChildren(118, $data_ids);
        $data_ids = self::getChildren(119, $data_ids);
        $data_ids = self::getChildren(120, $data_ids);
        $data_ids = self::getChildren(121, $data_ids);
        $data['data'] = $this->getContentArr($data_ids, 4);
        $raiders_ids = [];
        $raiders_ids = self::getChildren(132, $raiders_ids);
        $raiders_ids = self::getChildren(135, $raiders_ids);
        $raiders_ids = self::getChildren(138, $raiders_ids);
        $raiders_ids = self::getChildren(139, $raiders_ids);
        $raiders_ids = self::getChildren(140, $raiders_ids);
        $data['raiders'] = $this->getContentArr($raiders_ids, 4);

        $data['exhibition'] = $this->getRecommend('exhibition', 100);   //作品展示
        $data['play'] = $this->getRecommend('play');   //特色玩法

        $data['ych_sp'] = $this->getContentArr(658, 8);
        $data['ych_jzt'] = $this->getContentArr(657, 8);
        $data['ych_trh'] = $this->getContentArr(656, 8);
        if (!empty($data['ych_jzt'])) {
            foreach ($data['ych_jzt'] as &$v) {
                if (isset($v['content_message'])) {
                    $v['images'] = Cms::getBodyImgs($v['content_message']);
                } else {
                    $v['images'] = [];
                }
            }
        }

        if (!empty($data['ych_trh'])) {
            foreach ($data['ych_trh'] as &$v) {
                if (isset($v['content_message'])) {
                    $v['images'] = Cms::getBodyImgs($v['content_message']);
                } else {
                    $v['images'] = [];
                }
            }
        }

//        $zhubo_lunbo = $this->getRecommend('zhubo_lunbo');
        $cate_arr = [64 => '最新', 65 => '新闻', 66 => '公告', 67 => '活动', 68 => '攻略'];

        return $this->renderPartial('index.html', $data);

        return $this->render('index', [
            'banners' => $banners,
            'video' => $video,
            'count' => $count,
            'zuixin' => $zuixin->models,
            'xinwen' => $xinwen->models,
            'gonggao' => $gonggao->models,
            'huodong' => $huodong->models,
            'gonglue' => $gonglue->models,
            'zhubo_lunbo' => $zhubo_lunbo,
            'cate_arr' => $cate_arr,
        ]);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    public function actionSubscribe()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type', 'ios');
        $email = Cms::getPostValue('email','');
        $scene = Cms::getPostValue('scene', 0);

        if (!Cms::checkPhone($phone)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '手机号码不正确！']);
        }
//        if (!Cms::checkEmail($email)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '邮箱不正确不正确！']);
//        }
        $subscribe = GameSubscribe::find()->where(['website_id' => $this->website_id, 'phone' => $phone])->asArray()->one();

        if ($subscribe) {
            echo Json::encode(['status' => -1, 'msg' => '你已经预约']);
            exit;
        }

        $model = new GameSubscribe();
        $model->phone = $phone;
        $model->type = $type;
        $model->email = $email;
        $model->website_id = BaseActiveRecord::getWebsiteId();
        $model->created_at = time();
        $model->scene = $scene;
        $model->save();
        echo Json::encode(['status' => 0]);
        exit;
    }

    //创造与魔法单页面
    public function actionConduct(){
        return $this->renderPartial('conduct.html');
    }

    /**
     * 获取预约人数
     */
    public function actionAjaxGetNum()
    {
        $count = Stat::find()->where(['name' => 'subscribe_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->one();
        $this->ajaxOutPut(['status' => 0, 'msg' => $count['count']]);
    }

    /**
     * 判断用户是否登录
     */
    public function actionAjaxGetUser()
    {
        if (Cms::getSession('login_phone')) {
            $invite = SmInvite::find()->select(['user_phone', 'me_invite_code', 'invite_img', 'invite_num'])->where('user_phone = :phone', [':phone' => Cms::getSession('login_phone')])->asArray()->one();
            $invite['share_url'] = $this->_getInviteUrl().'code='.$invite['me_invite_code'];
            $invite['invite_code'] = Cms::getSession('invite_code');
            $this->ajaxOutPut(['status' => 0, 'msg' => $invite]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '没有登录！']);
        }
    }

    //登录发送验证码
    public function actionAjaxLoginVerify()
    {
        if(time()>=date('2018-02-07 23:59:59')){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'活动已结束']);
        }else {
            $captcha = Cms::getPostValue('captcha');
            $res = $this->createAction('captcha')->validate($captcha, false);
            if (!$res) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
            }

            $phone = Cms::getPostValue('phone');
            $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《创造与魔法》预约登录，请于1小时内输入');
            $this->ajaxOutPut($res);
        }
    }

    /**
     * 登录
     */
    public function actionAjaxLogin()
    {
        if(time()>=date('2018-02-07 23:59:59')){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'活动已结束']);
        }else {
            $phone = Cms::getPostValue('phone');
            $res = Cms::checkVerify(Cms::SM_LOGIN);
            if ($res['status'] == 0) {
                Cms::setSession('login_phone', $phone);
                $invite = SmInvite::find()->where('user_phone = :phone', [':phone' => $phone])->one();
                if (!$invite) {
                    $invite = new SmInvite();
                    $invite->user_phone = (string)$phone;
                    $invite->me_invite_code = mt_rand(10000000, 99999999);
                    $invite->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'code=' . $invite->me_invite_code);
                    $invite->created_at = time();
                    $invite->updated_at = time();
                    $invite->save();
                }
                if ($invite->created_at <= 1516697095) {
                    $invite->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'code=' . $invite->me_invite_code);
                    $invite->save();
                }
                $msg = $invite->attributes;
                $msg['invite_code'] = Cms::getSession('invite_code');
                $msg['share_url'] = $this->_getInviteUrl() . 'code=' . $invite->me_invite_code;
                $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
            }
            $this->ajaxOutPut($res);
        }
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('lottery_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['lottery_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' =>$msg]);
    }

    //预约发送验证码
    public function actionAjaxYuyueVerify()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type');
        $res = Cms::checkYuyue($phone, $type, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);    //验证预约状态
        if ($res['status'] != 0) {
            $this->ajaxOutPut($res);
        }
        $res = Cms::verify($phone, Cms::YUYUE); //发送验证码
        $this->ajaxOutPut($res);
    }

    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        if(time()>=strtotime('2018-02-03 23:59:59')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束！']);
        }else {
            $phone = Cms::getSession('login_phone');
            $_POST['phone'] = $phone;
            $invite_code = Cms::getPostValue('invite_code');
            $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
            if ($invite_code) {
                $model = SmInvite::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
                if (!$model) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
                }
                $invite_model = SmInvite::find()->where('user_phone = :phone', [':phone' => $phone])->one();
                if ($invite_model && ($invite_code == $invite_model['me_invite_code'])) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
                }
            }

            $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);

            if ($res['status'] == 0 && $invite_code) {  //如果是有邀请码的用户预约
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
    }

    /**
     * 微信分享应到页面
     * @return string
     */
    public function actionWxShare()
    {
        $phone = Cms::getSession('login_phone');
        if (!$phone) {
            header('location:/');
            exit;
        }
        $invite = SmInvite::find()->select(['invite_img'])->where('user_phone = :phone', [':phone' => $phone])->asArray()->one();
        if (!$invite) {
            header('location:/');
            exit;
        }

        return $this->renderPartial('wx_share.html', $invite);
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://sm.dev.yingxiong.com/wap/site/cover.html?";
        } else if (YII_DEMO) {
            return "http://sm.demo.yingxiong.com/wap/site/cover.html?";
        } else {
            return "http://sm.yingxiong.com/wap/site/cover.html?";
        }

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
    }

    /**
     * 抽奖cover页
     * @return false|string
     * @throws \Exception
     */
    public function actionLotteryCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('lottery_cover.html', ['captcha_img' => $captcha_img]);
    }

    /**
     * 抽奖判断用户是否登录
     */
    public function actionAjaxLotteryGetUser()
    {
        $user = $this->_checkAjaxLotteryLogin();
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'phone' => $user['phone'], 'lottery_count' => $user['lottery_count']]);
    }

    //登录发送验证码
    public function actionAjaxLotteryLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }

        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《创造与魔法》抽奖活动登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    /**
     * 抽奖登录
     */
    public function actionAjaxLotteryLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            if (!Cms::checkLock($this->website_id, 'lottery-login', $phone)) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '操作频繁']);
            }
            Cms::setSession('lottery_phone', $phone);
            $user = SmLotteryUser::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new SmLotteryUser();
                $user->phone=(string)$phone;
                $user->login_time = time();
                $user->lottery_count = 1;
                $user->created_at = time();
            } else {
                if ($user->updated_at < strtotime('2018-09-26 14:00:00')) {
                    $user->lottery_num = 0;
                    $user->lottery_count = 0;
                    $user->share_count = 0;
                    $user->share_time = time();
                }
                if ($user->login_time < strtotime(date('Y-m-d'))) {
                    $user->lottery_count = $user->lottery_count+1;  //每天第一次登录增加抽奖次数
                }
                $user->login_time = time();
            }
            $user->updated_at = time();
            $user->save();
            $msg = $user->attributes;
            Cms::clearLock($this->website_id, 'lottery-login', $phone);
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }


    /**
     * 抽奖
     */
    public function actionAjaxLottery()
    {
        if(time()>=strtotime('2018-10-06 23:59:59')){//抽奖活动结束
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动已结束!']);
        }else {
            //奖品列表与数据库ID对应
            $lottery_gift = [1 => 8, 2 => 9, 3 => 10, 4 => 11, 5 => 12, 7 => 14, 8 => 15];
            //1-4:90,10,0;  5-20:45:55,0;   20+:10,89,1
//            $prize_arr = [
//                'A' => [
//                    'value' => [
//                        ['id' => 6, 'prize' => '谢谢参与', 'v' => 60000],
//                        ['id' => 7, 'prize' => '红菇大虾*5', 'v' => 20000],
//                        ['id' => 4, 'prize' => '银矿*10', 'v' => 20000],
//
//                    ],
//                    'v' => 900000,
//                ],
//                'B' => [
//                    'value' => [
//                        ['id' => 1, 'prize' => '饿了么专属红包*1', 'v' => 20000],
//                        ['id' => 8, 'prize' => '爱奇艺会员折扣券*1', 'v' => 10000],
//                        ['id' => 5, 'prize' => '烤牛排*30', 'v' => 20000],
//                    ],
//                    'v' => 100000,
//                ],
//                'C' => [
//                    'value' => [
//                        ['id' => 3, 'prize' => '独角兽*1', 'v' => 1],
//                        ['id' => 2, 'prize' => '《马戏之王》电影票*1', 'v' => 200],
//                    ],
//                    'v' => 0,
//                ],
//            ];

            $lottery_phone = Cms::getSession('lottery_phone');
            $user = $this->_checkAjaxLotteryLogin();

            // 判断用户领取的实体礼包是否已经填写收货地址
            list($giftId, $giftCodeLogId) = $this->_checkAddress($lottery_phone);
            if ($giftCodeLogId) {
                $this->ajaxOutPut(['status' => -2, 'msg' => '您还有实体礼包未填写收货信息', 'giftCodeLogId' => $giftCodeLogId, 'giftId' => $giftId]);
            }

            if ($user['lottery_count'] <= 0) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖机会已经用完！']);
            }

            $glArr = [];
            foreach ($this->prizeArr as $v) {
                $glArr[$v['id']] = $v['v'];
            }
            $id = Cms::getProbRand($glArr);

            $code = $giftCodeLogId = '';

            if ($id != 0) {
                $count = GiftCodeLog::getGiftCountLogCount($this->website_id, $id);
                if ($count >= $this->prizeArr[$id]['num']) {
                    $id = 0;
                } else {
                    $isCode = in_array($id, $this->giftCodeIds) ? true : false;
                    list($code, $giftCodeLogId) = GiftCode::getGiftCodeOrEntity($this->website_id, $id, $lottery_phone, '', $isCode, 0, false, $this->prizeArr[$id]['prize'], self::GROUP_NAME);
                }
            }

            if (!$code) {
                $id = 0;
            }
            $user->lottery_count = $user->lottery_count - 1;
            $user->lottery_num = $user->lottery_num + 1;
            $user->save();

            $this->ajaxOutPut(['status' => 0, 'msg' => '', 'id' => $id, 'code' => $code, 'count' => $user->lottery_count, 'giftCodeLogId' => $giftCodeLogId]);
        }

    }

    /**
     * 检查实体是否有设置地址，若没有，则返回实体log id
     * @param $phone
     * @return array
     */
    private function _checkAddress($phone)
    {
        $logs = GiftCodeLog::getLogGroupUser($this->website_id, $this->giftIds, 0, $phone, '');
        $giftCodeLogId = $giftId = 0;
        if ($logs && !empty($logs)) {
            foreach ($logs as $v) {
                if (in_array($v['gift_id'], $this->giftCodeIds)) {
                    continue;
                }
                $address = GiftCodeAddress::getOne($this->website_id, $v['id']);
                if (!$address) {
                    $giftId = $v['gift_id'];
                    $giftCodeLogId = $v['id'];
                    break;
                }
            }
        }
        return [$giftId, $giftCodeLogId];
    }

    /**
     * 保存收货地址
     */
    public function actionSaveAddress()
    {
        $phone = Cms::getSession('lottery_phone');
        $this->_checkAjaxLotteryLogin();
        $giftCodeLogId = Cms::getPostValue('id');
        $addressName = Cms::getPostValue('name');
        $addressPhone = Cms::getPostValue('phone');
        $address = Cms::getPostValue('address');
        if (!$giftCodeLogId) {
            $this->ajaxOutPut(['status' => -1, 'msg' => 'id 不存在']);
        }
        if (!$addressName || mb_strlen($addressName) > 10) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '姓名不正确']);
        }
        if (!$addressPhone || !Cms::checkPhone($addressPhone)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '手机号不正确']);
        }
        if (!$address || mb_strlen($address) >= 100) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '地址不正确']);
        }
        $addressName = Cms::filterEmoji($addressName);
        $address = Cms::filterEmoji($address);
        $logs = GiftCodeLog::getLogGroupUser($this->website_id, $this->giftIds, 0, $phone, '');
        $bool = false;
        if ($logs && !empty($logs)) {
            foreach ($logs as $log) {
                if ($giftCodeLogId == $log['id']) {
                    $bool = true;
                    break;
                }
            }
        }
        if (!$bool) {
            $this->ajaxOutPut(['status' => -1, 'msg' => 'id 不正确']);
        }

        GiftCodeAddress::addLog($this->website_id, $giftCodeLogId, $addressName, $addressPhone, $address);
        $this->ajaxOutPut(['status' => 0, 'msg' => '']);
    }

    /**
     * 检查是否登录
     * @return array|null|\yii\db\ActiveRecord
     */
    private function _checkAjaxLotteryLogin()
    {
        $lottery_phone = Cms::getSession('lottery_phone');
        if (!$lottery_phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '登陆超时，请重新登录！']);
        }

        $user = SmLotteryUser::find()->where('phone = :phone', [':phone' => $lottery_phone])->one();
        if (!$user) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '登陆超时，请重新登录！']);
        }
        return $user;
    }

    /**
     * 获取概率
     * @param $lottery_num
     * @return array
     */
    private function _getGl($lottery_num)
    {
        $res = [];
        if ($lottery_num > 15) {
            $res['lottery_a'] = 1000000;
            $res['lottery_b'] = 899999;
            $res['lottery_c'] = 1;
        } else if ($lottery_num > 5) {
            $res['lottery_a'] = 450000;
            $res['lottery_b'] = 550000;
            $res['lottery_c'] = 0;
        } else {
            $res['lottery_a'] = 900000;
            $res['lottery_b'] = 100000;
            $res['lottery_c'] = 0;
        }
        return $res;
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
     * 抽奖分享
     */
    public function actionAjaxLotteryShare()
    {
        $user = $this->_checkAjaxLotteryLogin();
        if ($user['share_time'] < strtotime(date('Y-m-d'))) {
            $user->share_count = 1;
            $user->lottery_count = $user->lottery_count+1;
        } else if ($user['share_count'] < 3) {//获得5次机会改为2次机会 2018-09-25 新版抽奖
            $user->share_count = $user->share_count+1;
            $user->lottery_count = $user->lottery_count+1;
        } else {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，每天分享最多只能获得5次抽奖机会！']);
            $this->ajaxOutPut(['status' => 0, 'msg' => '', 'lottery_count' => $user->lottery_count]);
        }
        $user->share_time = time();
        $user->updated_at = time();
        $user->save();
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'lottery_count' => $user->lottery_count]);
    }

    /**
     * 中奖记录
     */
    public function actionAjaxLotteryLog()
    {
        $res = GiftCode::getGiftCodeLogGroup($this->website_id, self::GROUP_NAME);
        $data = [];
        if ($res && !empty($res)) {
            foreach ($res as $v) {
                $tmp = [];
                $tmp['phone'] = substr_replace($v['phone'], '****', 3,4);
                $tmp['name'] = $this->prizeArr[$v['gift_id']]['prize'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $data]);
    }

    /**
     * 翻牌奖励记录
     */
    public function actionAjaxLotteryMeLog()
    {
        $this->_checkAjaxLotteryLogin();
        $phone = Cms::getSession('lottery_phone');

        $res = GiftCodeLog::getLogGroupUser($this->website_id, $this->giftIds, 0, $phone);
        $data = [];
        if ($res && !empty($res)) {
            foreach ($res as $v) {
                if (in_array($v['gift_id'], $this->giftIds)) {
                    $tmp = [];
                    $tmp['name'] = $this->prizeArr[$v['gift_id']]['prize'];
                    $tmp['code'] = $v['code'];
                    $tmp['gift_id'] = $v['gift_id'];
                    $data[] = $tmp;
                }
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }


    protected function parse_army_arr($id,$num){
        $contents=$this->getContentArr($id,100);
        $data = [];
        if($contents) {
            foreach ($contents as $k) {
                if ($k['summary']) {
                    $body = strip_tags($k['summary'], ",;\r\n");
                    $peg_start = "/";
                    for ($i = 0; $i < $num; $i++) {
                        $peg_start .= '\[(\w+)\](.*)';
                    }
                    $peg = $peg_start . '/i';
                    preg_match($peg, $body, $result);
                    unset($result[0]);
                    foreach ($result as $key => $value) {
                        if ($key % 2 !== 0) {
                            $k[$result[$key]] = $result[$key + 1];
                        }
                    }
                    $k['img_one']=isset($k['img_one'])?trim($k['img_one']):'';
                    $k['img_two']=isset($k['img_two'])?trim($k['img_two']):'';
                    $k['img_three']=isset($k['img_three'])?trim($k['img_three']):'';
                    $k['img_four']=isset($k['img_four'])?trim($k['img_four']):'';
                    $data[]=$k;
                }
            }
        }
        return $data;
    }


    /************************************************创造与魔法小创君Cover************************************************************/

    //服务器列表地址
   protected static $service_url='http://iminterfaceapi.xs-servers.com/api/DistrictServiceList';
    //用户信息
   protected static $user_url='http://iminterfaceapi.xs-servers.com/api/RoleDataQuery';

   public function actionServiceList(){
       $list=[];
       $content = Utils::sendHttpRequest(self::$service_url,'','POST');
       $content = json_decode($content['content'], true);
       if($content){
           $list=$content['GameServer'];
       }
      $this->ajaxOutPut(['status'=>0,'msg'=>$list]);
   }

    //新老用户信息
    public function actionAjaxGetCjUser(){
        $phone_1=Cms::getSession('login_sm_cj_phone_1');
        $phone_2=Cms::getSession('login_sm_cj_phone_2');
        $phone_3=Cms::getSession('login_sm_cj_phone_3');
        $user_1=$phone_1?SmFashionModel::find()->where(['phone'=>$phone_1])->asArray()->one():null;
        $user_2=$phone_2?SmFashionModel::find()->where(['phone'=>$phone_2])->asArray()->one():null;
        $user_3=$phone_3?SmFashionModel::find()->where(['phone'=>$phone_3])->asArray()->one():null;
        if($user_3){
            $patch=array_filter(explode(',',$user_3['patch']));;
            sort($patch);
            $user['share_url']=self::_InviteUrl().'invite_code='.$user_3['me_invite_code'];
            $user['patch']=$patch;
            $user['invite_num']=count(array_filter(explode(',',$user_3['other_invite_code'])));
            $user_3=array_merge($user_3,$user);
        }
        $user=[
            1=>$user_1,
            2=>$user_2,
            3=>$user_3,
        ];
        $this->ajaxOutPut(['status'=>0,'msg'=>$user]);
    }

    //新老用户获取验证码
    public function actionAjaxLoginCjVerify(){
        $type=Cms::getPostValue('type');// 1 新用户 2 老用户 3 求助的好友
        $phone = Cms::getPostValue('phone');
        $service_id=Cms::getPostValue('service_id');// 大厅id 40002
        $role_name=Cms::getPostValue('role_name');// 角色昵称 落霞孤鹜水长天
        $role_id=Cms::getPostValue('role_id');// 角色昵称 落霞孤鹜水长天

        if($service_id && $role_name) {
            $user = SmFashionModel::find()->where(['account_id' => $service_id])->andWhere(['user_name' => $role_name])->one();
            if ($user && $user->phone != $phone) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '该角色已绑定手机号码，请更换手机号码登录！']);
            }
        }
        if($type==3){
         /*   $user_=SmFashionModel::find()->where(['phone'=>$phone])->one();
            if($user_ && $user_->user_status!=$type){
                $this->ajaxOutPut(['status'=>-1,'msg'=>'该手机号码已绑定其他用户，请重新输入手机号码！']);
            }*/
            $captcha = Cms::getPostValue('captcha');
            $check = Cms::captchaIsShow($this->website_id, $captcha, $phone);
            if ($check['status'] != 0) {
                $this->ajaxOutPut($check);
            }
            $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《创造与魔法》活动登录，请于1小时内输入');
            $this->ajaxOutPut($res);
        }else {
            //验证用户的账户及区服
            $category = [
                'serverid' => $service_id,
                'rolename' =>$role_name ,
                'roleid' =>$role_id ,
            ];
            $content = Utils::sendHttpRequest(self::$user_url,$category,'POST');
            $content = json_decode($content['content'], true);
            if (isset($content['Code']) && $content['Code'] == 0) {
                $role=$content['Role'][0];
                $LastLoginTime=$role['LastLoginTime'];
                $CreateTime=$role['CreateTime'];   //测试使用

                if(!isset($content['Role'][0])){
                    $this->ajaxOutPut(['status'=>-1,'msg'=>'该账户暂无信息！']);
                }
//                $user_type=self::_getUserType($LastLoginTime,$CreateTime);
//                if($user_type!=$type){
//                   $this->ajaxOutPut(['status'=>-1,'msg'=>'该账户不符合该活动！']);
//                }
                if ($type == 2) {
                    $check = $this->_checkOld($LastLoginTime);
                    if(!$check){
                        $this->ajaxOutPut(['status'=>-1,'msg'=>'该账户不符合该活动！']);
                    }
                }
                $captcha = Cms::getPostValue('captcha');
                $check = Cms::captchaIsShow($this->website_id, $captcha, $phone);
                if ($check['status'] != 0) {
                    $this->ajaxOutPut($check);
                }
                $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《创造与魔法》活动登录，请于1小时内输入');
                $this->ajaxOutPut($res);
            } else {
                $this->ajaxOutPut(['status' => -1, 'msg' => '角色信息有误！']);
            }
        }
    }

    //新老用户登录
    public function actionAjaxLoginCj(){
        $msg_=[];
        $type=Cms::getPostValue('type');// 1 新用户 2 老用户 3 求助的好友
        $phone = Cms::getPostValue('phone');
        $service_id=Cms::getPostValue('service_id');// 大厅id 40002
        $role_name=Cms::getPostValue('role_name');// 角色昵称 落霞孤鹜水长天
        $role_id=Cms::getPostValue('role_id');// 角色昵称 落霞孤鹜水长天

        $invite_code=Cms::getPostValue('invite_code');// 邀请码

        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            $user = SmFashionModel::find()->where(['phone'=>$phone])->one();
            if(!$user) {
                $user = new SmFashionModel();
                $user->me_invite_code = Cms::generateStr(6);
                $user->created_at = time();
                $user->user_status=$type;
            }

            if ($type != 3) {
                //验证用户的账户及区服
                $category = [
                    'serverid' => $service_id,
                    'rolename' => $role_name,
                    'roleid' => $role_id,
                ];
                $content = Utils::sendHttpRequest(self::$user_url, $category, 'POST');
                $content = json_decode($content['content'], true);
                if (isset($content['Code']) && $content['Code'] == 0) {
                    $role = $content['Role'][0];
                    $LastLoginTime = $role['LastLoginTime'];
                    $CreateTime = $role['CreateTime'];
//                    $user_type = self::_getUserType($LastLoginTime,$CreateTime);
//                    if ($user_type != $type) {
//                        $this->ajaxOutPut(['status' => -1, 'msg' => '该账户不符合该活动！']);
//                    }
                    if ($type == 2) {
                        $check = $this->_checkOld($LastLoginTime);
                        if(!$check){
                            $this->ajaxOutPut(['status'=>-1,'msg'=>'该账户不符合该活动！']);
                        }
                    }
                    $user->account_id = $service_id;
                    $user->user_name = $role_name;
                    $user->register_at = $LastLoginTime;
                    $user->created_at = time();
                    $user->user_status=$type;
                }
            }

            $patch=array_filter(explode(',',$user->patch));;
            sort($patch);
            $msg_['share_url']=self::_InviteUrl().'invite_code='.$user->me_invite_code;
            $msg_['patch']=$patch;
            $msg_['invite_num']=count(array_filter(explode(',',$user->other_invite_code)));
            $user->phone=$phone;
            if($user->save()){
                $msg=$user->attributes;
                $msg=array_merge($msg,$msg_);
                Cms::setSession('login_sm_cj_phone_'.$type, $phone);
                Cms::setSession('login_sm_cj_type', $type);
                //活动二邀请好友
                if($invite_code){
                    self::invite($user,$invite_code);
                }
                $this->ajaxOutPut(['status'=>0,'msg'=>$msg]);
            }else{
                $this->ajaxOutPut(['status'=>-1,'msg'=>'登录失败']);
            }
        }else{
            $this->ajaxOutPut($res);
        }
    }

    //领取礼包
    public function actionAjaxGetGift(){
        $type=Cms::getPostValue('type');// 1 新用户 2 老用户 3 求助的好友
        $phone=Cms::getSession('login_sm_cj_phone_'.$type);// 用户名
        $user=SmFashionModel::find()->where(['phone'=>$phone])->one();
        if (time() > strtotime(date('2018-12-11 23:59:59'))) {
            $this->ajaxOutPut(['status'=>-1,'msg'=>'活动已经结束']);
        }

        if(!$user || ($user && $user->user_status!=$type && $type!=3)){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'请领取对应的礼包']);
        }
        if($type==1){
            $gift_id=320;
        }elseif($type==2){
            $gift_id=411;
        }else{
            $invite_num=count(array_filter(explode(',',$user->other_invite_code)));
            if($invite_num<6){
                $this->ajaxOutPut(['status'=>-1,'msg'=>'邀请人数不够哦！']);
            }
            $gift_id=412;
        }
        list($code, $giftCodeLogId) = GiftCode::getGiftCodeByPhone($this->website_id, $gift_id, $phone, true);
//        $res=Cms::getGiftNoYzm($phone,$gift_id);
        if($code){
            if ($giftCodeLogId != 1) {
                $user->gift_ids = $user->gift_ids . ',' . $gift_id;
                $user->save();
            }

            $this->ajaxOutPut(['status'=>0,'msg'=>$code]);
        }else{
            $this->ajaxOutPut(['status' => -1, 'msg' => '礼包码已经领取完毕']);
        }
    }

    /**
     * 注销登录
     */
    public function actionAjaxCjLogout()
    {
        $type=Cms::getPostValue('type');
        $session = \Yii::$app->session;
        $session->remove('login_sm_cj_phone_'.$type);
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_sm_cj_phone_'.$type])) {
            $status='0';
            $msg='注销成功!';
        }
       $this->ajaxOutPut(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    public function _InviteUrl()
    {
        if (YII_DEV) {
            return "http://sm.dev.yingxiong.com/cover.html?";
        } else if (YII_DEMO) {
            return "http://sm.yingxiong.com/cover.html?";
        } else {
            return "http://sm.yingxiong.com/cover.html?";
        }

    }

    //是否为新老玩家
    protected static function _getUserType($login_time,$create_time){
        $old_time=strtotime(date('2018-7-1'));
        $new_time=strtotime(date('2018-7-13'));
        if($login_time<=$old_time){
            $flag=2;
        } elseif($create_time>=$new_time){
            $flag=1;
        }else{
            $flag=3;
        }
        return $flag;
    }


    /**
     * 老用户是否达到活动条件
     * @param $loginTime
     * @return bool
     */
    protected function _checkOld($loginTime)
    {
        $time = strtotime(date('2018-11-20'));
        if ($loginTime > $time) {
            return false;
        }
        return true;
    }

    /**
     * 邀请功能
     */
    protected function invite($user, $invite_code)
    {

        $patch_arr=[1,2,3,4,5,6];
        $model_other = SmFashionModel::find()->where(['me_invite_code'=>$invite_code])->one();//邀请的用户
        if (!$model_other || ($user && $invite_code == $user->me_invite_code)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
        }
        $is_invite = SmFashionModel::find()->where(['me_invite_code'=>$invite_code])->andWhere(['like','other_invite_code',','.$user->me_invite_code])->one();//判断邀请用户是否已经被邀请过

        if(!$is_invite) {
            if ($model_other->patch) {
                $is_patch_arr = array_filter(explode(',', $model_other->patch));
                $patch = array_diff($patch_arr, $is_patch_arr);
                if (!$patch || empty($patch)) {
                    $patch = '';
                } else {
                    $patch = $patch[array_rand($patch, 1)];
                }

            } else {
                $patch = $patch_arr[array_rand($patch_arr, 1)];
            }
            $model_other->other_invite_code = $model_other->other_invite_code . ',' . $user->me_invite_code;
            if ($patch) {
                $model_other->patch = $model_other->patch . ',' . $patch;
            }

            $model_other->save();
        }
    }

    public function actionExport()
    {
        $key = Cms::getGetValue('key');
        if (!$key || $key != 'w0prx23d') {
            echo 'key 不正确';exit;
        }
        $data = GiftCodeLog::find()->select(['l.phone', 'l.gift_id', 'l.created_at', 'l.code', 'a.address_phone', 'a.address_name', 'a.address'])
            ->alias('l')->where(['in', 'gift_id', $this->giftIds])->leftJoin(GiftCodeAddress::tableName(). ' as a', 'l.id = a.gift_code_log_id')->asArray()->all();
        if (!$data || empty($data)) {
            echo '暂无数据'; exit;
        }
        foreach ($data as &$v) {
            $v['giftName'] = $this->prizeArr[$v['gift_id']]['prize'];
            $v['created_at'] = date('Y-m-d H:i:s', $v['created_at']);
        }
        $header = array('手机号', '礼包名字',  '收件人姓名', '收件人电话', '收件人地址', '获取时间');
        $fields = ['phone', 'giftName',  'address_name', 'address_phone', 'address', 'created_at'];
        $filename = '创造与魔法礼包领取-'.time();
        Cms::export($header, $data, $fields, $filename);
    }

 public function actionGl_wiki(){
        return   $this->renderPartial('wiki');
        }


    public function actionMyTest()
    {
//        $category = [
//            'serverid' => 115,
//            'rolename' =>'哈哈嘻嘻 ' ,
//        ];
//        $content = Utils::sendHttpRequest(self::$user_url,$category,'POST');
//        $content = json_decode($content['content'], true);
//pr($content,1);
        $_POST['type']=2;
        $_POST['service_id']=115;
        $_POST['role_name']='二货蛋';
        $_POST['phone']=15181808256;
//        $_POST['phone']=13568344662;
        $_POST['yzm']=825777;
//        $this->actionAjaxLoginCjVerify();
        $this->actionAjaxLoginCj();
//        $this->actionAjaxGetGift();
//        $this->actionAjaxGetCjUser();
//        $this->actionServiceList();
//        $this->actionAjaxGetCjUser();
//        $_POST['type']=2;
//        $this->actionAjaxCjLogout();
        exit;


    }
}
