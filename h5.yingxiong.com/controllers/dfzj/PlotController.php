<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/12/4 0004
 * Time: 15:48
 */

namespace app\controllers\dfzj;


use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

class PlotController extends H5BaseController
{
    const INV_NUM_MAX = 2;

    public $giftIds = [
        'sg' => 419,
        'zx' => 420,
        'qd' => 421,
        'mh' => 422,
        'xs' => 423,
        'bh' => 424,
        'yw' => 425,
        'fx' => 426,
        'zb' => 427,
    ];

    public $giftIdZj = 428;
    public $types = ['sg', 'zx', 'qd', 'mh', 'xs', 'bh', 'yw', 'fx', 'zb'];

    public $data = [
        'giftLog' => [  // 礼包 log
            'sg' => 1,
        ],

        'useNum' => 0,
        'time' => 0, // 参加时间
        'invAcceptTime' => 0, //邀请接受 时间
        'invUserLog' => [

        ],
        'helpUser' => 0,    // 帮助别人的微信号 只能总共帮助一次
    ];

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        $data = $this->_getH5Data();
        $data['num'] = $this->_getNum($data);
        $this->echoJson(0, '', $data);
    }

    /**
     * 获取礼包
     */
    public function actionGetGift()
    {
        $type = Cms::getPostValue('type');
        $inviteCode = Cms::getPostValue('invite_code');

        if (!$type || !in_array($type, $this->types)) {
            $this->echoJson(6024);
        }
        Cms::checkLock($this->websiteId, 'h5_dfzj_plot', $this->wxInfo['openid']);
        $data = $this->_getH5Data();

        if (isset($data['giftLog']) && isset($data['giftLog'][$type]) && $data['giftLog'][$type]) {
            // 如果已经解锁，则依然会扣次数
            $data['time'] = time();
            $data['useNum'] = isset($data['useNum']) ? $data['useNum'] + 1 : 1;
            H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $data);
            $this->echoJson(0, '', ['code' => $data['giftLog'][$type]]);
        }

        $num =  $this->_getNum($data);
        if ($num <= 0) {
            $this->echoJson(6025);
        }

        $giftId = $this->giftIds[$type];
        list($code, $giftCodeLogId) = GiftCode::getGiftCodeByOpenId($this->websiteId, $this->h5Id, $giftId, $this->wxInfo['openid'], true);

        $data['time'] = time();
        $data['useNum'] = isset($data['useNum']) ? $data['useNum'] + 1 : 1;
        if ($code) {
            $data['giftLog'][$type] = $code;
            H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $data);
        }

        if ($inviteCode) {
            $invUser = H5UserCenter::getUserInfo($this->h5Id, '', $inviteCode);
            if ($invUser) {
                $invUserData = H5UserCenterData::getData($this->h5Id, $invUser['id']);
                $invUserData = $invUserData['data'];
                // 如果接受邀请的时间小于天时间，则情况邀请log
                if (isset($invUserData['invAcceptTime']) && $invUserData['invAcceptTime'] < strtotime(date('Y-m-d'))) {
                    $invUserData['invUserLog'] = [];
                }

                // 总共只能帮助一次
                if (!isset($data['helpUser']) || !$data['helpUser']) {
                    if (!isset($invUserData['invUserLog']) || !in_array($this->wxInfo['openid'], $invUserData['invUserLog'])) {
                        $invUserData['invUserLog'][] = $this->wxInfo['openid'];
                        $invUserData['invAcceptTime'] = time();
                        H5UserCenterData::setUserInfo($this->h5Id, $invUser['id'], $invUserData);

                        $data['helpUser'] = $inviteCode;
                        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $data);
                    }
                }

            }
        }
        Cms::clearLock($this->websiteId, 'h5_dfzj_plot', $this->wxInfo['openid']);
        $this->echoJson(0, '', ['code' => $code]);
    }

    /**
     *
     * @param $data
     * @return int
     */
    private function _getNum(&$data)
    {
        $num = 1;
        $bool = false;
        if (!isset($data['time']) || (isset($data['time']) && $data['time'] < strtotime(date('Y-m-d')))) {
            if (isset($data['useNum']) && $data['useNum'] > 0) {
                $bool = true;
                $data['useNum'] = 0;
            }
        }

        if (isset($data['invAcceptTime']) && $data['invAcceptTime'] > strtotime(date('Y-m-d'))) {
            $count = isset($data['invUserLog']) ? count($data['invUserLog']) : 0;
            $num = $num + ($count > self::INV_NUM_MAX ? self::INV_NUM_MAX : $count);
        } elseif (isset($data['invAcceptTime']) && $data['invAcceptTime'] < strtotime(date('Y-m-d')) && isset($data['invUserLog']) && count($data['invUserLog']) > 0) {
            $data['invUserLog'] = [];
            $bool = true;
        }
        if ($bool) {
            H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $data);
        }
        $num = $num - (isset($data['useNum']) ? $data['useNum'] : 0);
        return $num;
    }

    /**
     * 获取终极礼包
     */
    public function actionGetGiftZj()
    {
        $data = $this->_getH5Data();
        if (!isset($data['giftLog']) || count($data['giftLog']) < count($this->giftIds)) {
            $this->echoJson(6026);
        } elseif (isset($data['giftZj']) && $data['giftZj']) {
            $this->echoJson(6027, '', $data['giftZj']);
        }

        list($code, $giftCodeLogId) = GiftCode::getGiftCodeByOpenId($this->websiteId, $this->h5Id, $this->giftIdZj, $this->wxInfo['openid'], true);
        if ($code) {
            $data['giftZj'] = $code;
            H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $data);
            $this->echoJson(0, '', $code);
        }
        $this->echoJson(6028);
    }
}