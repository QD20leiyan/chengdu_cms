<?php

namespace app\controllers\wjyx;

use common\Cms;
use common\components\Api;
use common\components\H5BaseController;
use common\models\GiftPropModel;
use common\models\h5\H5UserCenterData;
use common\models\wjyx\H5WjyxLotteryRoleidLog;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/9/20 0020
 * Time: 17:56
 */

class LotteryController extends H5BaseController
{
    public $data = [
        'giftIds' => [1, 2, 3, 4],  // 已经获取的礼包
        'giftLog' => [
            2 => [  // 礼包id
                'data' => '2018-08-01 00:00:00',
                'type' => 1,
                'serverId' => 2,
                'roleId' => 3,
                'giftId' => 1,
            ],

        ],
    ];

    public $giftIdsPrize = [
        16 => ['id' => 16, 'prize' => '游戏金币*1888', 'v' => 700],
        17 => ['id' => 17, 'prize' => '游戏钻石*188', 'v' => 600],
        18 => ['id' => 18, 'prize' => '雷震子*7', 'v' => 500],
        19 => ['id' => 19, 'prize' => '游戏金币*3888', 'v' => 400],
        20 => ['id' => 20, 'prize' => '磁力魔王*3', 'v' => 300],
        21 => ['id' => 21, 'prize' => '运筹帷幄*3', 'v' => 200],
        22 => ['id' => 22, 'prize' => '游戏钻石*388', 'v' => 100],
    ];

    /**
     * 登录
     */
    public function actionLogin()
    {
        $type = Cms::getPostValue('type');
        $serverId = Cms::getPostValue('serverId');
        $roleId = Cms::getPostValue('roleId');
        if (!$type || !in_array($type, [1, 2])) {
            $this->echoJson(5001);
        }
        if (!$serverId) {
            $this->echoJson(5002);
        }
        if (!$roleId) {
            $this->echoJson(5003);
        }
        $res = Api::userdata($this->websiteId, Api::$gameids['wjyx'], $roleId, $serverId);

        if ($res['code'] != 0) {
            $this->echoJson(1001, $res['msg']);
        }
        $roleName = $res['data'] && isset($res['data']['rolename']) ? $res['data']['rolename'] : '';
        Cms::setSession('lotteryType', $type);
        Cms::setSession('lotteryServerId', $serverId);
        Cms::setSession('lotteryRoleId', $roleId);
        $userData = $this->_getH5Data();
        $userData['isTodayGet'] = $this->_isTodayGet($userData);
        $userData['roleName'] = $roleName;
        $this->echoJson(0, '', $userData);
    }

    /**
     * 当天是否抽奖
     * @param $userData
     * @return bool
     */
    private function _isTodayGet($userData)
    {
        $isTodayGet = false;
        if (isset($userData['giftLog']) && !empty($userData['giftLog'])) {
            foreach ($userData['giftLog'] as $v) {
                if (date('Y-m-d', strtotime($v['date'])) == date('Y-m-d')) {
                    $isTodayGet = true;
                }
            }
        }
        return $isTodayGet;
    }

    /**
     * 领奖
     */
    public function actionLottery()
    {
        $startTime = strtotime('2018-09-29 00:00:00');
        $endTime = strtotime('2018-10-06 23:59:59');
        if (YII_DEMO || YII_DEV) {
        } elseif (time() < $startTime || time() > $endTime) {
            $this->echoJson(5007);
        }

        $this->_checkLogin();
        $lotteryType = Cms::getSession('lotteryType');
        $lotteryServerId = Cms::getSession('lotteryServerId');
        $lotteryRoleId = Cms::getSession('lotteryRoleId');

        $h5Data = $this->_getH5Data();

        $isTodayGet = $this->_isTodayGet($h5Data);
        if ($isTodayGet) {  // 当天已经抽奖
            $this->echoJson(5008);
        }

        // 已经完成抽奖
        if (isset($h5Data['giftIds']) && count($h5Data['giftIds']) >= 7) {
            $this->echoJson(5005);
        }

        if (isset($h5Data['giftIds']) && !empty($h5Data['giftIds'])) {
            foreach ($h5Data['giftIds'] as $id) {
                unset($this->giftIdsPrize[$id]);
            }
        }

        $check = H5WjyxLotteryRoleidLog::setCache($this->website_id, $lotteryRoleId, $this->user['id']);
        if (!$check) {
            $this->echoJson(5009);
        }

        $giftId = Cms::getPrizeId($this->giftIdsPrize);

        $item=[];
        $prop = GiftPropModel::getAllProp($this->websiteId);
        foreach ($prop as $k){
            if($k['id'] == $giftId && $k['prop_id']) {
                $re['propid'] = $k['prop_id'];
                $re['pronum'] = $k['prop_num'];
                $re['dateline'] = $k['end_time'];
                $item[] = $re;
            }
        }

        $lockKey = 'wjyx:get_prop';
        $lock = Cms::checkLock($this->website_id, $lockKey, $lotteryRoleId);
        if (!$lock) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '操作频繁，请稍后再试']);
        }

        // todo 缺文案
        $mailTitle = '【公众号幸运大转盘献礼】';
        $mailContent = '亲爱的司令官，这是你在公众号幸运大转盘中所获得的奖励：【'.$this->giftIdsPrize[$giftId]['prize'].'】，请查收！记得在测试期间每日参与公众号幸运转盘活动，更有机会获得多种橙卡哦！';
        $res = Api::sendprize($this->websiteId, Api::$gameids['wjyx'], $lotteryRoleId, $lotteryServerId, $item, $mailTitle, $mailContent);

        if($res['code'] == 0){
            $h5Data['giftIds'][] = $giftId;
            $h5Data['giftLog'][$giftId] = [
                'date' => date('Y-m-d H:i:s'),
                'type' => $lotteryType,
                'serverId' => $lotteryServerId,
                'roleId' => $lotteryRoleId,
                'giftId' => $giftId,
            ];
            H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $h5Data);
            Cms::clearLock($this->website_id, $lockKey, $lotteryRoleId);
            $this->echoJson(0, '', ['giftId' => $giftId]);
        } else {
            Cms::clearLock($this->website_id, $lockKey, $lotteryRoleId);
            $this->echoJson(5006);
        }
    }

    private function _checkLogin()
    {
        if (!Cms::getSession('lotteryRoleId')) {
            $this->echoJson(5004);
        }
    }

    public function actionLogout()
    {
        Cms::setSession('lotteryRoleId', '');
        $this->echoJson(0);
    }
}