<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2019/1/16 0016
 * Time: 15:10
 */

namespace app\controllers;


use common\Cms;
use common\components\HomeController;
use common\models\GiftCode;
use common\models\UserCenter;
use common\models\UserCenterData;

class ApiActController extends HomeController
{
    CONST SCENE_YUYUE = 2;  // 预约场景
    CONST SESSION_LOGIN_PHONE = 'rw_login_phone';   // 登录 session
    CONST GIFT_GROUP = 'rw_cover_lottery_logs';  // 抽奖 领取记录

    public $userData = [
        'is_lottery' => false,  // 是否抽奖
        'gift_id' => '',
    ];

    public $jd = [
        'JDV12550001922000021' => 'C358-19AA-EB4A-B61C',
        'JDV12550001922000022' => '585B-B676-B25B-09CC',
        'JDV12550001922000023' => '29F7-5446-B6E5-CB38',
        'JDV12550001922000024' => 'F40C-47C1-9EE6-64A9',
        'JDV12550001922000025' => '6744-67C8-D543-AAC7',
        'JDV12550001922000026' => 'A0E9-BC09-6326-CB88',
        'JDV12550001922000027' => '11E0-8BEE-3398-D80C',
        'JDV12550001922000028' => '3ED8-1CC6-AC34-3F6C',
        'JDV12550001922000029' => '3014-53F0-9EA3-DE57',
        'JDV12550001922000030' => '592A-7129-79EE-88DD',
    ];

    public $giftPrize = [
        450 => ['id' => 450, 'prize' => '爱奇艺会员', 'v' => 1, 'num' => 10],
        451 => ['id' => 451, 'prize' => '10元京东卡', 'v' => 1, 'num' => 10],
        452 => ['id' => 452, 'prize' => '萌兔饼干棒（永久手持）', 'v' => 10, 'num' => 0],
        0 => ['id' => 0, 'prize' => '谢谢参与', 'v' => 88, 'num' => 0],
    ];

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        list($user, $userData) = $this->_checkLogin();

        if (isset($userData['gift_id']) && $userData['gift_id'] == 451) {
            $userData['pwd'] = $this->jd[$userData['gift_code']];
        }
        $data['user'] = $user;
        $data['user_data'] = $userData;
        $this->echoJson(0, '', $data);
    }

    public function actionGetGiftLogs()
    {
        $logs = GiftCode::getGiftCodeLogGroup($this->website_id, self::GIFT_GROUP);
        if ($logs) {
            foreach ($logs as &$v) {
                unset($v['openid']);
                unset($v['code']);
                $v['phone'] = substr_replace($v['phone'], '****', 3, 4);
            }
        }
        $logs[] = ['phone' => '187****1282', 'gift_id' => 450];
        $logs[] = ['phone' => '177****8041', 'gift_id' => 451];
        $logs[] = ['phone' => '199****7890', 'gift_id' => 452];
        $this->echoJson(0, '', $logs);
    }

    /**
     * 登录&预约
     */
    public function actionLogin()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type');
        $yzm = Cms::getPostValue('yzm');
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->echoJson();
            $this->ajaxOutPut(['status' => -1, 'msg' => '手机号不正确']);
        }
        if (!$type && !in_array($type, ['ios', 'android'])) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '设备类型不正确']);
        }

        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $isNewUser = false;
        if (!$user) {
            $res = Cms::yuyuePhone($this->website_id, $phone, $type, self::SCENE_YUYUE, '', Cms::IS_NEED_YZM, Cms::IS_UNIQUE);
            if ($res['status'] == -1) {
                if (isset($res['is_repeat']) && $res['is_repeat'] == 1) {
                } else {
                    $this->echoJson(12, $res['msg']);
                }
            }
            $isNewUser = true;
            $user = UserCenter::addUser($this->website_id, $phone);
            $userData = $this->userData;
            UserCenterData::addData($this->website_id, $user['id'], $userData);

        } else {
            $check = Cms::checkVerify(1);
            if ($check['status'] != 0) {
                $this->echoJson(12, $check['msg']);
            }
            $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        }
        $userData['is_new_user'] = $isNewUser;
        Cms::setSession(self::SESSION_LOGIN_PHONE, $phone);
        if (isset($userData['gift_id']) && $userData['gift_id'] == 451) {
            $userData['pwd'] = $this->jd[$userData['gift_code']];
        }
        $this->echoJson(0, '', $userData);
    }

    /**
     * 抽奖
     */
    public function actionLottery()
    {
        list($user, $userData) = $this->_checkLogin();
        if ($userData['is_lottery']) {
            $this->echoJson(13, '', $userData['gift_code']);
        }
        $giftId = Cms::getPrizeId($this->giftPrize);
        $data = [
            'code' => 0,
            'pwd' => '',
        ];
        if ($giftId != 0) {
            list($code, $giftCodeLogId) = GiftCode::getGiftCodeByPhone($this->website_id, $giftId, $user['phone'], true, $this->giftPrize[$giftId]['num'], self::GIFT_GROUP);
            $userData['is_lottery'] = true;

            if ($code) {
                if ($giftId == 451) {
                    $data['pwd'] = $this->jd[$code];
                }
                $data['code'] = $code;
            } else {
                $giftId = 0;
            }

            $userData['gift_code'] = $code;
        } else {
            $userData['gift_code'] = '';
        }
        $data['gift_id'] = $giftId;
        $userData['gift_id'] = $giftId;
        UserCenterData::setData($this->website_id, $user['id'], $userData);
        $this->echoJson(0, '', $data);
    }

    /**
     * 检查登录
     * @return array
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession(self::SESSION_LOGIN_PHONE);
        if (!$phone) {
            $this->echoJson(1);
        }
        $user = UserCenter::getUserInfo($this->website_id, $phone);

        if (!$user) {
            $this->echoJson(1);
        }
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        return [$user, $userData];
    }
}