<?php

namespace app\controllers\ca;

use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\GiftCodeLog;
use common\models\h5\H5InvUsersLog;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/11/27 0027
 * Time: 11:38
 */

class KingController extends H5BaseController
{
    public $giftIdsPrize = [
        413 => ['id' => 413, 'prize' => '感恩节手枪', 'v' => 5, 'num' => 5000000],
        414 => ['id' => 414, 'prize' => '黑暗骑士碎片', 'v' => 13, 'num' => 103000000],
        415 => ['id' => 415, 'prize' => '强化点', 'v' => 24, 'num' => 200000000],
        416 => ['id' => 416, 'prize' => '射手座头像', 'v' => 1, 'num' => 1000000],
        417 => ['id' => 417, 'prize' => '钻石', 'v' => 16, 'num' => 16000000],
        418 => ['id' => 418, 'prize' => '英雄之心', 'v' => 1, 'num' => 1000000],
        0 => ['id' => 0, 'prize' => '谢谢参与', 'v' => 40, 'num' => 100000000],
    ];

    public $data = [
        'lotteryTotalNum' => 0, // 可抽奖次数
        'lotteryUseNum' => 0,   // 已经使用的次数
        'giftLog' => [],
    ];

    /**
     * 抽奖
     */
    public function actionLottery()
    {
        $h5Data = $this->_getH5Data();
        if (isset($h5Data['lotteryUseNum']) && $h5Data['lotteryUseNum'] >= $h5Data['lotteryTotalNum']) {
            $this->echoJson(2004);
        }
        Cms::checkLock($this->website_id, 'h5_ca_king', $this->wxInfo['openid']);

        if (isset($h5Data['giftLog']) && !empty($h5Data['giftLog'])) {
            foreach ($h5Data['giftLog'] as $v) {
                if (isset($this->giftIdsPrize[$v['giftId']])) {
                    unset($this->giftIdsPrize[$v['giftId']]);
                }
            }
        }

        $giftId = Cms::getPrizeId($this->giftIdsPrize);
        $count = GiftCodeLog::getGiftCountLogCount($this->website_id, $giftId);
        $code = '';
        if ($count >= $this->giftIdsPrize[$giftId]['num']) {
            $giftId = 0;
        } else {
            list($code, $giftCodeLogId) = GiftCode::getGiftCodeByOpenId($this->websiteId, $this->h5Id, $giftId, $this->wxInfo['openid'], true);
            if (!$code) {
                $giftId = 0;
            }
        }
        if (!isset($h5Data['lotteryUseNum'])) {
            $h5Data['lotteryUseNum'] = 1;
        } else {
            $h5Data['lotteryUseNum'] = $h5Data['lotteryUseNum'] + 1;
        }
        $h5Data['giftLog'][] = [
            'giftId' => $giftId,
            'giftCode' => $code,
            'time' => date('Y-m-d'),
        ];
        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $h5Data);
        Cms::clearLock($this->website_id, 'h5_ca_king', $this->user['openid']);
        $this->echoJson(0, '', ['giftId' => $giftId, 'giftCode' => $code]);
    }

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        $inviteCode = Cms::getPostValue('invite_code');
        if ($inviteCode) {
            // 验证邀请码是否正确
            $invUser = $this->_checkInviteUser($inviteCode);
            if (!$invUser) {
                $this->echoJson(2005);
            } else {
                $data = H5UserCenterData::getData($this->h5Id, $invUser['id']);
                $data = $data['data'];
                $h5Data = [
                    'nickname' => $data['nickname'],
                    'headimgurl' => $data['headimgurl'],
                    'invLog' => isset($data['invLog']) ? $data['invLog'] : [],
                ];
                $h5Data['invLog'] = H5InvUsersLog::getUsers($this->h5Id, $invUser['id']);
            }
        } else {
            $h5Data = $this->_getH5Data();
            $invLog = H5InvUsersLog::getUsers($this->h5Id, $this->user['id']);
            // 总共可抽奖次数增加，没达到助力3个人就增加 1 次，封顶 总共 6 次
            $plus = floor(count($invLog) / 3);
            $plus = $plus >= 3 ? 3 : $plus;
            if (!isset($h5Data['lotteryTotalNum']) || $h5Data['lotteryTotalNum'] <= 0) {
                $h5Data['lotteryTotalNum'] = 3;
            } else {
                $h5Data['lotteryTotalNum'] = 3 + $plus;
            }
            H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $h5Data);

            $h5Data['lotteryUseNum'] = isset($h5Data['lotteryUseNum']) ? $h5Data['lotteryUseNum'] : 0;
            $h5Data['invLog'] = $invLog;
        }
        if (isset($h5Data['giftLog'])) {
            $tmp = [];
            foreach ($h5Data['giftLog'] as $k => $v) {
                if ($v['giftId'] > 0 && in_array($v['giftId'], $tmp)) {
                    unset($h5Data['giftLog'][$k]);
                } else {
                    $tmp[] = $v['giftId'];
                }
            }
        }
        $this->echoJson(0, '', $h5Data);
    }

    /**
     * 为他助力
     */
    public function actionHelp()
    {
        $inviteCode = Cms::getPostValue('invite_code');
        if (!$inviteCode) {
            $this->echoJson('2006');
        }

        if ($inviteCode == $this->wxInfo['openid']) {
            $this->echoJson('2007');
        }

        // 验证邀请码是否正确
        $invUser = $this->_checkInviteUser($inviteCode);
        $invUserId = $invUser['id'];
        $invUsersLog = H5InvUsersLog::getUsers($this->h5Id, $invUserId);
        if ($invUsersLog && key_exists($this->user['id'], $invUsersLog)) {
            $this->echoJson('2008');
        }

        H5InvUsersLog::addLog($this->h5Id, $invUserId, $this->user['id'], $this->_getH5Data());
        $this->echoJson(0);
    }

    /**
     * 验证邀请码是否正确
     * @param $inviteCode
     * @return array|mixed|null|string|\yii\db\ActiveRecord
     */
    private function _checkInviteUser($inviteCode)
    {
        $invUser = H5UserCenter::getUserInfo($this->h5Id, '', $inviteCode);
        if (!$invUser) {
            $this->echoJson('6009');
        }
        return $invUser;
    }
}