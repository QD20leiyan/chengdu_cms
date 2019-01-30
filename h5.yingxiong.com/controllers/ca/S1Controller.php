<?php

namespace app\controllers\ca;

use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/8/13
 * Time: 11:14
 */
class S1Controller extends H5BaseController
{
    public $h5Id;
    public $userData = ['gift_code' => ''];
    public $giftId = 350;

    public function beforeAction($action)
    {
        $this->h5Id = Cms::getSession('h5_id');
        return parent::beforeAction($action);
    }

    /**
     * 获取礼包码
     */
    public function actionGetGift()
    {
        $this->_check();

        $phone = Cms::getPostValue('phone');
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->ajaxOutPut(['status' => 0, 'msg' => '手机号不正确！']);
        }
        $res = Cms::checkVerify(0);    //验证验证码是否正确
        if ($res['status'] != 0) {
            $this->ajaxOutPut($res);
        }

        list($code, $isRepeat) = GiftCode::getUserGiftCodeIsGet($this->website_id, $this->giftId, $phone, '');
        if ($code) {
            $this->userData['gift_code'] = $code;
        }

        $user = H5UserCenter::getUserInfo($this->h5Id, $phone);
        if (!$user) {
            $user = H5UserCenter::addUser($this->h5Id, $phone);
            H5UserCenterData::addData($this->h5Id, $user['id'], $this->userData);
        } else {
            H5UserCenterData::setUserInfo($this->h5Id, $user['id'], $this->userData);
        }

        if (!$code) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '礼包码已经领取完', 'isRepeat' => $isRepeat]);
        } else {
            $this->ajaxOutPut(['status' => 0, 'msg' => $code, 'isRepeat' => $isRepeat]);
        }


    }

    private function _check()
    {
        if (!$this->h5Id) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请重新登录']);
        }
    }
}