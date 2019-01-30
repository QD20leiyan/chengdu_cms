<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/11/8 0008
 * Time: 17:57
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\models\GiftCode;
use common\models\UserCenter;
use common\models\UserCenterData;

class SpecialController extends  PcController
{
    const SESSION_LOGIN = 'match_phone';
    const GIFT_YC = 408;
    const GIFT_GJ = 409;
    const GJ_TEAM = 0;

    const OPEN = true; // 冠军礼包开启
    const GJ_ID = 3;    // 冠军 id

    public $userData = [
        'giftYc' => 0,
        'giftGj' => 0,
    ];

    public $team = [
        1 => '非酋躺赢队',
        2 => '心之远航',
        3 => '天降正义',
        4 => '毁灭打击',
    ];

    public function actionMatch()
    {
        return $this->renderPartial('match.html');
    }

    /**
     *
     */
    public function actionGetUserInfo()
    {
        $phone = $this->_checkLogin();
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $data = UserCenterData::getUserData($this->website_id, $user['id']);

        $this->echoJson(0, '', $data);
    }

    /**
     * 登录
     */
    public function actionLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(0);    //验证验证码是否正确
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->echoJson(1006);
        }
        if ($res['status'] != 0) {
            $this->echoJson(-1, $res['msg']);
        }
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        if (!$user) {
            $user = UserCenter::addUser($this->website_id, $phone);
        }
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        Cms::setSession(self::SESSION_LOGIN, $phone);

        // todo 活动结束 获取冠军
        $this->_getGjGift($phone, $user['id'], $userData);
        $this->echoJson(0, '', $userData);
    }

    /**
     * 注销
     */
    public function actionLogout()
    {
        Cms::setSession(self::SESSION_LOGIN, '');
        $this->echoJson(0);
    }

    /*
     * 预测
     */
    public function actionYc()
    {
        if (time() > strtotime('2018-11-17 23:59:59')) {
            $this->echoJson(1001);
        }
        $teamId = Cms::getPostValue('teamId');
        if (!$teamId || !key_exists($teamId, $this->team)) {
            $this->echoJson(1003);
        }
        $phone = $this->_checkLogin();
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        if (isset($userData['giftYc']) && $userData['giftYc']) {
            $this->echoJson(1002);
        }
        Cms::checkLock($this->website_id, 'match_yc', $phone);
        list($code, $giftCodeLogId) = GiftCode::getGiftCodeByPhone($this->website_id, self::GIFT_YC, $phone, true);
        if (!$code) {
            $this->echoJson(1004);
        }
        $userData['teamId'] = $teamId;
        $userData['giftYc'] = $code;
        UserCenterData::setData($this->website_id, $user['id'], $userData);
        Cms::clearLock($this->website_id, 'match_yc', $phone);
        $this->echoJson(0, '', $userData);
    }

    /**
     * 获取冠军礼包
     * @param $phone
     * @param $userId
     * @param $userData
     * @return bool
     */
    private function _getGjGift($phone, $userId, &$userData)
    {
        if (!self::OPEN) {
            return false;
        }
        if (!isset($userData['teamId']) || ($userData['teamId'] != self::GJ_ID)) {
            return false;
        }
        if (isset($userData['giftGj']) && $userData['giftGj']) {
            return false;
        }
        Cms::checkLock($this->website_id, 'match_gj', $phone);
        list($code, $giftCodeLogId) = GiftCode::getGiftCodeByPhone($this->website_id, self::GIFT_GJ, $phone, true);
        if (!$code) {
            $this->echoJson(1005);
        }
        $userData['giftGj'] = $code;
        UserCenterData::setData($this->website_id, $userId, $userData);
        Cms::clearLock($this->website_id, 'match_gj', $phone);
        return true;
    }


    /**
     * 注销
     * @return mixed
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession(self::SESSION_LOGIN);
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请先登录']);
        }
        return $phone;
    }
}