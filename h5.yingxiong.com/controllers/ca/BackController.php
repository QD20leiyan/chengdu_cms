<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2019/1/23 0023
 * Time: 17:24
 */

namespace app\controllers\ca;

use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;
use common\models\UserCenter;

class BackController extends H5BaseController
{
    CONST TOTAL_NUM = 3;
    CONST SESSION_LOGIN = 'ca_back_login_phone';

    public $userData = [
        'total_num' => self::TOTAL_NUM,    // 总共可抽奖次数
        'gift_log' => [

        ],  // 中奖记录
    ];

    public $giftIdsPrize = [
        453 => ['id' => 453, 'prize' => '貂蝉（永久）+强化点*88W', 'v' => 5, 'num' => 3],
        454 => ['id' => 454, 'prize' => '诸葛亮（永久）+强化点*88W', 'v' => 5, 'num' => 3],
        455 => ['id' => 455, 'prize' => '深渊恶魔碎片*3', 'v' => 0, 'num' => 2000],
        456 => ['id' => 456, 'prize' => '深渊恶魔（3天）+步枪弹匣（3天）+黑暗骑士碎片*3', 'v' => 150, 'num' => 3000],
        457 => ['id' => 457, 'prize' => '诸葛亮（3天）+狙击枪弹匣（3天）+疾风骑士碎片*3', 'v' => 150, 'num' => 3000],
        458 => ['id' => 458, 'prize' => '貂蝉（3天）+手枪弹匣（3天）+惩戒骑士碎片*3', 'v' => 150, 'num' => 3000],
        0 => ['id' => 0, 'prize' => '谢谢参与', 'v' => 400, 'num' => 0],
    ];

    /**
     * 登录
     */
    public function actionLogin()
    {
        $phone = Cms::getPostValue('phone');
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->echoJson(7020);
        }

        $check = Cms::checkVerify(1);
        if ($check['status'] != 0) {
            $this->echoJson(7021);
        }

        $user = H5UserCenter::getUserInfo($this->h5Id, $phone);
        $this->user = $user;
        if (!$user) {
            $user = H5UserCenter::addUser($this->h5Id, $phone);
            $userData = $this->userData;
            H5UserCenterData::addData($this->h5Id, $user['id'], $userData);
        } else {
            $userData = $this->_getH5Data();
        }

        $userData['phone'] = $phone;
        $userData['residue_num'] = $this->_getResidueNum($userData);
        Cms::setSession(self::SESSION_LOGIN, $phone);
        $this->echoJson(0, '', $userData);
    }

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        list($user, $userData) = $this->_checkLogin();

        $userData['phone'] = $user['phone'];
        $userData['residue_num'] = $this->_getResidueNum($userData);
        $this->echoJson(0, '', $userData);
    }

    public function actionLogout()
    {
        Cms::setSession(self::SESSION_LOGIN, '');
        $this->echoJson(0);
    }

    /**
     * 获取剩余抽奖次数
     * @param $userData
     * @return int
     */
    private function _getResidueNum($userData)
    {
        $userData['consume_num'] = isset($userData['consume_num']) ? $userData['consume_num'] : 0;
        $residueNum = $userData['total_num'] - $userData['consume_num'];
        return $residueNum;
    }

    private function _checkLogin()
    {
        $phone = Cms::getSession(self::SESSION_LOGIN);
        if (!$phone) {
            $this->echoJson(7022);
        }
        $user = H5UserCenter::getUserInfo($this->h5Id, $phone);
        if (!$user) {
            $this->echoJson(7022);
        }
        $this->user = $user;
        $userData = $this->_getH5Data();
        return [$user, $userData];
    }

    /**
     * 抽奖
     */
    public function actionLottery()
    {
        list($user, $userData) = $this->_checkLogin();
        $residueNum = $this->_getResidueNum($userData);
        if ($residueNum <= 0) {
            $this->echoJson(7023);
        }
        $giftId = Cms::getPrizeId($this->giftIdsPrize);
        if (isset($userData['gift_log']) && key_exists($giftId, $userData['gift_log'])) {
            $giftId = 0;
        }

        $code = '';
        if ($giftId) {
            list($code, $giftCodeLogId) = GiftCode::getGiftCodeByPhone($this->website_id, $giftId, $user['phone'], true);

            if ($code) {
                $userData['gift_log'][$giftId] = [
                    'gift_id' => $giftId,
                    'prize' => $this->giftIdsPrize[$giftId]['prize'],
                    'code' => $code,
                    'time' => date('Y-m-d H:i:s'),
                ];
            } else {
                $giftId = 0;
            }
        }

        $userData['consume_num'] = isset($userData['consume_num']) ? $userData['consume_num'] : 0;
        $userData['consume_num'] = $userData['consume_num'] + 1;
        H5UserCenterData::setUserInfo($this->h5Id, $user['id'], $userData);

        $this->echoJson(0, '', ['gift_id' => $giftId, 'code' => $code]);
    }

}