<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2019/1/28 0028
 * Time: 10:37
 */

namespace app\controllers\ca;

use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\h5\H5UserCenterData;

class SpController extends H5BaseController
{
    CONST TOTAL_NUM = 3;    // 总共抽奖次数
    CONST LOCK_KEY = 'ca_sp';

    public $userData = [
        'use_num' => 0,
        'gift_log' => [

        ],
    ];

    public $giftIdsPrize = [
        490 => ['id' => 490, 'prize' => '神圣骑士', 'v' => 5, 'num' => 0],
        491 => ['id' => 491, 'prize' => '2019新年AWP（永久）+狙击枪弹匣（7天）+强化点*88W', 'v' => 50, 'num' => 0],
        492 => ['id' => 492, 'prize' => '2017新年极光（永久）+机枪弹匣（7天）+强化点*88W', 'v' => 50, 'num' => 0],
        493 => ['id' => 493, 'prize' => '新年雪人背包（14天）+雪花挂饰', 'v' => 100, 'num' => 0],
        494 => ['id' => 494, 'prize' => '新年雪人背包（7天）+疾风骑士碎片*1', 'v' => 100, 'num' => 0],
        495 => ['id' => 495, 'prize' => '强化点10W+荣誉5000', 'v' => 100, 'num' => 0],
        496 => ['id' => 496, 'prize' => '强化点*8W', 'v' => 265, 'num' => 0],
        0 => ['id' => 0, 'prize' => '谢谢参与', 'v' => 330, 'num' => 0],
    ];

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        $this->_checkLogin();
        $userData = $this->_getH5Data();
        $userData = array_merge($this->userData, $userData);
        $userData['residue_num'] = $this->_getResidueNum($userData);
        $this->echoJson(0, '', $userData);
    }

    private function _checkLogin()
    {
        if (!$this->h5Id || !$this->user) {
            $this->echoJson(7201);
        }
    }

    /**
     * 剩余抽奖次数
     * @param $userData
     * @return int
     */
    private function _getResidueNum($userData)
    {
        $userData['use_num'] = isset($userData['use_num']) ? $userData['use_num'] : 0;
        $residueNum = self::TOTAL_NUM - $userData['use_num'];
        return $residueNum;
    }

    /**
     * 抽奖
     */
    public function actionLottery()
    {
        $this->_checkLogin();
        $userData = $this->_getH5Data();
        $residueNum = $this->_getResidueNum($userData);
        if ($residueNum <= 0) {
            $this->echoJson(7202);
        }
        Cms::checkLock($this->websiteId, self::LOCK_KEY, $this->wxInfo['openid']);
        $giftIdsPrize = $this->giftIdsPrize;
        if (isset($userData['gift_log']) && !empty($userData['gift_log'])) {
            foreach ($userData['gift_log'] as $k => $v) {
                if (isset($giftIdsPrize[$k])) {
                    unset($giftIdsPrize[$k]);
                }
            }
        }
        $giftId = Cms::getPrizeId($giftIdsPrize);
        $code = '';
        if ($giftId) {
            list($code, $giftCodeLogId) = GiftCode::getGiftCodeByOpenId($this->websiteId, $this->h5Id, $giftId, $this->wxInfo['openid'], true);
            if (!$code) {
                $giftId = 0;
            } else {
                $userData['gift_log'][$giftId] = [
                    'gift_id' => $giftId,
                    'prize' => $this->giftIdsPrize[$giftId]['prize'],
                    'code' => $code,
                    'created_at' => date('Y-m-d H:i:s'),
                ];
            }
        }
        $userData['use_num'] = isset($userData['use_num']) ? $userData['use_num'] + 1 : 1;
        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $userData);
        Cms::clearLock($this->websiteId, self::LOCK_KEY, $this->wxInfo['openid']);
        $data  = [
            'residue_num' => $this->_getResidueNum($userData),
            'gift_id' => $giftId,
            'code' => $code,
        ];
        $this->echoJson(0, '', $data);
    }

}