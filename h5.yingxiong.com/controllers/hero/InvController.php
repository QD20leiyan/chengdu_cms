<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/8/21
 * Time: 14:26
 */

namespace app\controllers\hero;


use common\Cms;
use common\components\H5BaseController;
use common\models\GiftCode;
use common\models\GiftCodeLog;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

class InvController extends H5BaseController
{
    public $userData = [
        'pt_id' => [],  //拼图ID
        'help_user' => [],  //帮助的用户
        'gift_id' => '',    //礼包Id
        'gift_code' => '',  //礼包码,
        'cdn_img' => '',  //微信头像cdn地址
        'share_time' => 0,  //分享更新时间
        'light_end_time' => 0,    //拼图结束时间
    ];

    public $ptId = [1, 2, 3, 4, 5, 6];

    public $prizeArr = [
        351 => ['id' => 351, 'prize' => 'moto', 'v' => 500, 'num' => 10, 'gift' => ''],
        352 => ['id' => 352, 'prize' => 'Basilisk巴塞利斯蛇 RGB幻彩 有线游戏鼠标 5G电竞鼠标 黑色 吃鸡蛇 绝地求生鼠标', 'v' => 300, 'num' => 10, 'gift' => ''],
        353 => ['id' => 353, 'prize' => '帽子', 'v' => 3000, 'num' => 100, 'gift' => ''],
        354 => ['id' => 354, 'prize' => '项链', 'v' => 3000, 'num' => 100, 'gift' => ''],
        355 => ['id' => 355, 'prize' => '单肩包', 'v' => 3000, 'num' => 100, 'gift' => ''],

        356 => ['id' => 356, 'prize' => '王牌周边体恤', 'v' => 300, 'num' => 10, 'gift' => ''], //游戏周边
        357 => ['id' => 357, 'prize' => '王牌周边空投', 'v' => 300, 'num' => 10, 'gift' => ''], //游戏周边

        358 => ['id' => 358, 'prize' => 'DRACONITE优惠卷（无门槛—20）', 'v' => 1030000, 'gift' => '【优惠券】，复制此淘口令€zdceb1fDuwe€后打开手机淘宝领取专享优惠券', 'num' => 100000],
        359 => ['id' => 359, 'prize' => '初弎优惠卷（无门槛—20）', 'v' => 1030000, 'gift' => '【优惠券】，复制此淘口令€xrl0b1fFj2W€后打开手机淘宝领取专享优惠券', 'num' => 100000],
        360 => ['id' => 360, 'prize' => 'coexistence优惠卷（无门槛—20）', 'v' => 1030000, 'gift' => '【优惠券】，复制此淘口令€lwzLb1fFBc5€后打开手机淘宝领取专享优惠券', 'num' => 100000],

        361 => ['id' => 361, 'prize' => '王牌战争礼包码', 'v' => 3445000, 'num' => 0, 'gift' => ''],    //虚拟

        362 => ['id' => 362, 'prize' => '汉堡王-5优惠卷k37', 'v' => 3445000, 'num' => 0, 'gift' => ''],
        363 => ['id' => 363, 'prize' => '汉堡王-5优惠卷k38', 'v' => 0, 'num' => 0, 'gift' => ''], // 优惠券两个礼包公用一个概率，然后从中随机获取一个优惠券
    ];

    public $giftIdSt = [351, 352, 353, 354, 355, 356, 357]; //实体礼包 Id

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        $inviteCode = Cms::getPostValue('invite_code');
        $data = [];
        $data['wxInfo'] = $this->wxInfo;

        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        $userData = $userData ? $userData['data'] : [];
        $data['receName'] = isset($userData['receName']) ? $userData['receName'] : '';
        $data['recePhone'] = isset($userData['recePhone']) ? $userData['recePhone'] : '';
        $data['receAddress'] = isset($userData['receAddress']) ? $userData['receAddress'] : '';
        $data['receAddress'] = isset($userData['receAddress']) ? $userData['receAddress'] : '';
        $data['receAddress'] = isset($userData['receAddress']) ? $userData['receAddress'] : '';
        $data['pt_id'] = isset($userData['pt_id']) ? $userData['pt_id'] : [];
        $data['gift_id'] = isset($userData['gift_id']) ? $userData['gift_id'] : '';
        $data['gift_code'] = isset($userData['gift_code']) ? $userData['gift_code'] : '';
        $data['cdn_img'] = isset($userData['cdn_img']) ? $userData['cdn_img'] : '';

        $data['inviteUser'] = [];
        if ($inviteCode) {
            $inviteUser = H5UserCenter::getUserInfo($this->h5Id, '', $inviteCode);
            if ($inviteUser) {
                $inviteUserData = H5UserCenterData::getData($this->h5Id, $inviteUser['id']);
                $data['inviteUser'] = $inviteUserData['data'];

                // 如果 24 小时已经过期，则清空数据
                $this->_clearInvalidData($inviteUser['id'], $data['inviteUser']);
            }
        } else {
            // 如果 24 小时已经过期，则清空数据
            $this->_clearInvalidData($this->user['id'], $userData);
            $data['help_user'] = $userData['help_user'];
            $data['pt_id'] = $userData['pt_id'];
            $data['invalid_time'] = $userData['invalid_time'];
        }

        // 活动已经结束
        if (time() > strtotime('2018-10-31 23:59:59')) {
            $data['is_invalid'] = 1;
        } else {
            $data['is_invalid'] = 0;
        }

        $this->echoJson(0, '', $data);
    }

    // 如果 24 小时已经过期，则清空数据
    private function _clearInvalidData($h5UserId, &$data)
    {
        if (!isset($data['light_end_time']) || $data['light_end_time'] < time()) {
            // 清空 24 小时以内的拼图数据
            if (!isset($data['invalid_time']) || !$data['invalid_time']) {
                $data['help_user'] = [];
                $data['pt_id'] = [];
                $data['invalid_time'] = 1;
                H5UserCenterData::setUserInfo($this->h5Id, $h5UserId, $data);
            }
        }
    }

    /**
     * 点亮拼图
     */
    public function actionLight()
    {
        $inviteCode = Cms::getPostValue('invite_code');
        if (!$inviteCode) {
            $this->echoJson(1001);
        }
        $inviteUser = H5UserCenter::getUserInfo($this->h5Id, '', $inviteCode);
        if (!$inviteUser) {
            $this->echoJson(1002);
        }
        if ($inviteUser['id'] == $this->user['id']) {
            $this->echoJson(1014);
        }

        $inviteUserData = H5UserCenterData::getData($this->h5Id, $inviteUser['id']);
        $inviteUserData = $inviteUserData['data'];
        $inviteUserData['pt_id'] = isset($inviteUserData['pt_id']) ? $inviteUserData['pt_id'] : [];
        $inviteUserData['help_user'] = isset($inviteUserData['help_user']) ? $inviteUserData['help_user'] : [];

        if (in_array($this->wxInfo['openid'], $inviteUserData['help_user'])) {
            $this->echoJson(1003);
        }
        if (count($inviteUserData['pt_id']) == 6) {
            $this->echoJson(1004);
        }

        // 如果 24 小时已经过期，则清空数据
        $this->_clearInvalidData($inviteUser['id'], $inviteUserData);

        $diff = array_diff($this->ptId, $inviteUserData['pt_id']);
        if (empty($diff)) {
            $this->echoJson(1005);
        }
        $ptId = $diff[array_rand($diff, 1)];
        $inviteUserData['pt_id'][] = $ptId;
        $inviteUserData['help_user'][] = $this->wxInfo['openid'];
        H5UserCenterData::setUserInfo($this->h5Id, $inviteUser['id'], $inviteUserData);
        $this->echoJson(0, '', ['pt_id' => $ptId]);
    }

    /**
     * 获取礼包，在微信分享时候已经获取了礼包，则这里不需要再执行获取礼包操作
     */
    public function actionGetGift()
    {
        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        if (!$userData) {
            $this->echoJson(1006);
        }
        $userData = $userData['data'];

        // 判断点亮图片数量
        if (!isset($userData['pt_id']) || count($userData['pt_id']) != 6) {
            $this->echoJson(1007);
        }

        if (isset($userData['gift_id']) && $userData['gift_id']) {
            $this->echoJson(0, '', ['gift_id' => $userData['gift_id'], 'gift_code' => $userData['gift_code']]);
        } else {
            $this->echoJson(1018);
        }
    }


    /**
     * 保存收货地址
     */
    public function actionSaveAddress()
    {
        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        if (!$userData) {
            $this->echoJson(1009);
        }
        $userData = $userData['data'];

        if (!isset($userData['gift_id']) || !$userData['gift_id']) {
            $this->echoJson(1010);
        }

        // 如果不是实体则不需要填写地址
        if (!in_array($userData['gift_id'], $this->giftIdSt)) {
            $this->echoJson(1016);
        }

        //是否已经全部点亮图片
        if (!isset($userData['pt_id']) || count($userData['pt_id']) != 6) {
            $this->echoJson(1007);
        }

        $receName = Cms::getPostValue('name');
        $recePhone = Cms::getPostValue('phone');
        $receAddress = Cms::getPostValue('address');
        if (!$receName || mb_strlen($receName) > 10) {
            $this->echoJson(1011);
        }
        if (!$recePhone || !Cms::checkPhone($recePhone)) {
            $this->echoJson(1012);
        }
        if (!$receAddress || mb_strlen($receAddress) > 50) {
            $this->echoJson(1013);
        }
        $userData['receName'] = Cms::filterEmoji($receName);
        $userData['recePhone'] = $recePhone;
        $userData['receAddress'] = Cms::filterEmoji($receAddress);
        if (!isset($userData['address'])) {
            $userData['address'] = [];
        }
        $userData['address'][$userData['gift_log_id']] = [
            'receName' => $receName,
            'recePhone' => $recePhone,
            'receAddress' => $receAddress,
        ];
        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $userData);
        $this->echoJson(0);
    }

    /**
     * 获取微信 cdn 图片地址
     */
    public function actionGetWxImg()
    {
        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        $userData = $userData ? $userData['data'] : [];
        if (empty($userData)) { //没有微信信息截图失败
            $this->echoJson(1015);
        }
        if (isset($userData['cdn_img']) && $userData['cdn_img']) {
            $this->echoJson(0, '', $userData['cdn_img']);
        }
        $img = $userData['headimgurl'];
        $cdnImg = Cms::uploadImg($img);
        $userData['cdn_img'] = $cdnImg;
        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $userData);
        $this->echoJson(0, '', ['cdn_img' => $cdnImg]);
    }

    /**
     * 分享时回调修改分享时间
     */
    public function actionShareCallback()
    {
        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        $userData = $userData ? $userData['data'] : [];

        // 如果时间到 24 小时，数据清空，重新领取礼包
        if (!isset($userData['light_end_time']) || $userData['light_end_time'] < time() || !isset($userData['gift_id']) || !$userData['gift_id']) {
            $this->_setLightTimeAndData($this->h5Id, $this->user['id'], $userData);
            //领取礼包
            list($status, $msg, $data) = $this->_getGift();
            $data['is_new_gift'] = 1;
        } else {
            $status = 0;
            $msg = '';
            $data = ['gift_id' => $userData['gift_id'], 'code' => isset($userData['gift_code']) ? $userData['gift_code'] : ''];
            $data['is_new_gift'] = 0;
        }
        $this->echoJson($status, $msg, $data);
    }

    /**
     * 领取礼包
     * @return array
     */
    private function _getGift()
    {
        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        if (!$userData) {
            return [1006, '', []];
        }
        $userData = $userData['data'];

        if (isset($userData['gift_id']) && $userData['gift_id']) {
            return [1008, '', ['gift_id' => $userData['gift_id'], 'gift_code' => $userData['gift_code']]];
        }

        $probArr = [];
        foreach ($this->prizeArr as $v) {
            $probArr[$v['id']] = $v['v'];
        }
        $id = Cms::getProbRand($probArr);

        if ($id == 361) {   //礼包码, 领取不需要入 log，因为可以重复领取
            $res = GiftCode::getGiftCode($this->website_id, 361, '', $this->wxInfo['openid'], false, true, $this->h5Id);
        } else {
            $num = $this->prizeArr[$id]['num'];
            // 获取礼包已经领取的数量
            $count = GiftCodeLog::getGiftCountLogCount($this->website_id, $id);
            if ($count >= $num && $id != 362 && $id != 363) {   //如果领取数大于配置数，则默认为礼包码，汉堡王数量无限
                $id = 361;
                $res = GiftCode::getGiftCode($this->website_id, 361, '', $this->wxInfo['openid'], false, true, $this->h5Id);
            } else {
                // 如果是中优惠券，则 362,365 随机中一个
                if ($id == 362 || $id == 363) {
                    $id = rand(362, 363);
                }

                // 因为可以重复领取，则不需要入 redis
                $giftLog = GiftCode::addGiftCodeLog($this->website_id, $id, 0, '', $this->wxInfo['openid'], "实物", false);
                // 设置礼包总共获取数量
                GiftCodeLog::setGiftCountLogCount($this->website_id, $id);
                GiftCodeLog::addLogGroupUserCache($this->website_id, $giftLog, $this->h5Id, '', $this->wxInfo['openid']);
                $res = $this->prizeArr[$id]['gift'];
            }
        }
        $userData['gift_id'] = $id;
        $userData['gift_code'] = $res;
        $userData['gift_log_id'] = 0;

        // 实体
        if (in_array($id, $this->giftIdSt)) {
            $userData['gift_log_id'] = $giftLog['id'];
        }
        H5UserCenterData::setUserInfo($this->h5Id, $this->user['id'], $userData);

        return [0, '', ['gift_id' => $id, 'code' => $res]];
    }

    /**
     * 设置点亮时间和数据
     * @param $h5Id
     * @param $h5UserCenterId
     * @param $userData
     */
    private function _setLightTimeAndData($h5Id, $h5UserCenterId, &$userData)
    {
        $userData['light_end_time'] = time() + 3600 * 24;
        $userData['help_user'] = [];
        $userData['gift_id'] = '';
        $userData['gift_code'] = '';
        $userData['pt_id'] = [];
        $userData['receName'] = '';
        $userData['recePhone'] = '';
        $userData['receAddress'] = '';
        $userData['invalid_time'] = 0;

        H5UserCenterData::setUserInfo($h5Id, $h5UserCenterId, $userData);
    }

    /**
     * 获取礼包领取记录
     */
    public function actionGetGiftLog()
    {
        $giftIds = $this->_getGiftIds();
        $data = GiftCodeLog::getLogGroupUser($this->website_id, $giftIds, $this->h5Id, '', $this->wxInfo['openid']);
        $userData = H5UserCenterData::getData($this->h5Id, $this->user['id']);
        if (!$userData) {
            $this->echoJson(1019);
        }

        $userData = $userData['data'];
        foreach ($data as &$v) {
            $v['created_at'] = date('Y-m-d', $v['created_at']);
            if (in_array($v['gift_id'], $this->giftIdSt)) {
                if ( isset($userData['address']) && key_exists($v['id'], $userData['address'])) {
                    $v['status'] = 2;
                } else {
                    if (isset($userData['gift_id']) && isset($v['gift_id']) && $v['id'] == $userData['gift_log_id']) {
                        $v['status'] = 1;   // 进行中
                    } else {
                        $v['status'] = 3;   // 实体已经过期
                    }
                }

            } else {
                $v['status'] = 2;   // 已经领取
            }
        }
        $this->echoJson(0, '', $data);
    }

    public function _getGiftIds()
    {
        $giftIds = [];
        foreach ($this->prizeArr as $k => $v) {
            $giftIds[] = $k;
        }
        return $giftIds;
    }

    public function actionExport()
    {
        $giftIds = $this->_getGiftIds();
        $users = H5UserCenter::find()->where(['h5_id' => 16])->asArray()->all();
        $allData = [];
        foreach ($users as $user) {
            $data = GiftCodeLog::getLogGroupUser($this->website_id, $giftIds, 16, '', $user['openid']);
            $userData = H5UserCenterData::getData(16, $user['id']);
            $userData = $userData['data'];
            foreach ($data as &$v) {
                $tmp = [];
                if (in_array($v['gift_id'], $this->giftIdSt)) {
                    if ( isset($userData['address']) && key_exists($v['id'], $userData['address'])) {
                        $v['status'] = 2;
                        $tmp['receName'] = $userData['address'][$v['id']]['receName'];
                        $tmp['recePhone'] = $userData['address'][$v['id']]['recePhone'];
                        $tmp['receAddress'] = $userData['address'][$v['id']]['receAddress'];
                        $tmp['status'] = '实体领取成功';
                    } else {
                        $tmp['receName'] = '';
                        $tmp['recePhone'] = '';
                        $tmp['receAddress'] = '';

                        if (isset($userData['gift_id']) && isset($v['gift_id']) && $v['id'] == $userData['gift_log_id']) {
                            $v['status'] = 1;   // 进行中
                            $tmp['status'] = '实体正在进行中';
                        } else {
                            $v['status'] = 3;   // 实体已经过期
                            $tmp['status'] = '实体已经过期';
                        }
                    }

                } else {
                    $tmp['receName'] = '';
                    $tmp['recePhone'] = '';
                    $tmp['receAddress'] = '';
                    $tmp['status'] = '领取成功';
                    $v['status'] = 2;   // 已经领取
                }

                $tmp['nickname'] = Cms::filterEmoji($userData['nickname']);
                $tmp['giftName'] = $this->prizeArr[$v['gift_id']]['prize'];
                $tmp['gift_code'] = $v['code'];
                $tmp['created_at'] = date('Y-m-d H:i:s', $v['created_at']);
                $allData[] = $tmp;
            }
        }
        $header = array('微信名', '礼包名', '礼包码', '领取状态', '收件人姓名', '收件人电话', '收件人地址', '获取时间');
        $fields = ['nickname', 'giftName', 'gift_code', 'status', 'receName', 'recePhone', 'receAddress', 'created_at'];
        $filename = '代号英雄礼包领取-'.time();
        $this->_export($header, $allData, $fields, $filename);
    }

    public function actionClearData()
    {
        $this->renderPartial('clrear-data.html');
    }
}