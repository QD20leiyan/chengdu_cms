<?php

namespace app\controllers\ca;
use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\GiftCodeLog;
use common\models\h5\H5UserCenterData;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/9/7
 * Time: 14:34
 */
class FouryearController extends H5BaseController
{
    public $h5Data = [
        'lottery_num' => 0, // 已经抽奖多少次
        'gift_ids' => [],   // 中奖 id
        'gift_logs' => [],   // 获奖 log
    ];

    public $giftIdsPrize = [
        364 => ['id' => 364, 'prize' => '虚空恶魔', 'v' => 2000, 'num' => 1000],
        365 => ['id' => 365, 'prize' => '强化点', 'v' => 1000, 'num' => 500],
        366 => ['id' => 366, 'prize' => '钻石', 'v' => 1000, 'num' => 200],
        367 => ['id' => 367, 'prize' => '飞将', 'v' => 500, 'num' => 1],
        368 => ['id' => 368, 'prize' => '涂鸦', 'v' => 1000, 'num' => 500],
        369 => ['id' => 369, 'prize' => '克里斯', 'v' => 2000, 'num' => 1000],
        370 => ['id' => 370, 'prize' => '谢谢参与', 'v' => 2500, 'num' => 1000],
    ];

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        $h5Data = $this->_getH5Data();
        $h5Data['lottery_num'] = !isset($h5Data['lottery_num']) ? 0 : $h5Data['lottery_num'];
        $this->echoJson(0, '', $h5Data);
    }

    /**
     * 抽奖
     */
    public function actionLottery()
    {
        $h5Data = $this->_getH5Data();
        if (isset($h5Data['lottery_num']) && $h5Data['lottery_num'] >= 3) {
            $this->echoJson(2001);
        }
//        pr($h5Data, 1);
        if (isset($h5Data['gift_ids']) && !empty($h5Data['gift_ids'])) {
            foreach ($h5Data['gift_ids'] as $id) {
                unset($this->giftIdsPrize[$id]);
            }
        }

        $giftId = Cms::getPrizeId($this->giftIdsPrize);
        $count = GiftCodeLog::getGiftCountLogCount($this->website_id, $giftId);
        if ($count >= $this->giftIdsPrize[$giftId]['num']) {
            $giftId = 370;
        }

        $res = '';
        if ($giftId != 370) {
            $res = GiftCode::getUserGiftCode($this->website_id, $giftId, '', $this->wxInfo['openid']);

            if (!isset($h5Data['gift_logs'])) {
                $h5Data['gift_logs'] = [];
            }

            // 礼包 领取 log
            $logs = [
                'gift_id' => $giftId,
                'code' => $res,
                'time' => time(),
            ];
            array_unshift($h5Data['gift_logs'], $logs);

            // 中奖 gift_ids
            if (!isset($h5Data['gift_ids'])) {
                $h5Data['gift_ids'] = [];
            }
            $h5Data['gift_ids'][] = $giftId;
        }

        // 已抽奖次数增加
        $h5Data['lottery_num'] = isset($h5Data['lottery_num']) ? $h5Data['lottery_num'] + 1 : 1;

        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $h5Data);

        $this->echoJson(0, '', ['code' => $res, 'gift_id' => $giftId]);
    }

    /**
     * 获取礼包领取记录
     */
    public function actionGetGiftLog()
    {
        $h5Data = $this->_getH5Data();
        if (!isset($h5Data['gift_logs']) || empty($h5Data['gift_logs'])) {
            $this->echoJson(0, '', []);
        }
        $logs = [];
        foreach ($h5Data['gift_logs'] as $v) {
            $v['created_at'] = date('Y-m-d', $v['time']);
            $logs[] = $v;
        }
        $this->echoJson(0, '', ['logs' => $logs]);
    }

    /**
     * 检查敏感词
     */
    public function actionCheckName()
    {
        $name = Cms::getPostValue('name');
        if (!$name) {
            $this->echoJson(2003);
        }
        $res = Cms::checkFilterWords($name);
        if ($res['status'] == 0) {
            $this->echoJson(0);
        } else {
            $this->echoJson(2002, $res['msg'].'敏感词为：'.implode(',', $res['data']));
        }
    }
}