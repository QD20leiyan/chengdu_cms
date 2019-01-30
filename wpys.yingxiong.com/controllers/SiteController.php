<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\cache\PublicCache;
use common\Cms;
use common\components\PcController;
use common\models\GameSubscribe;
use common\models\GiftCode;
use common\models\UserCenter;
use common\models\UserCenterData;
use common\models\YuyueStatModel;
use yii\db\Query;
use yii\helpers\Json;

class SiteController extends PcController
{
    const SESSION_LOGIN = 'login_phone';
    const SCENE_YUYUE = 2;

    const GIFT_YUYUE = 396;
    const GIFT_INV_1 = 397;
    const GIFT_INV_5 = 398;
    const GIFT_INV_10 = 399;
    const GIFT_INV_30 = 400;
    const GIFT_INV_50 = 401;
    const GIFT_INV_100 = 402;   // 这个当成是实体，没有礼包码
    const GIFT_ROLE_HUANGXIAOYAN = 403;
    const GIFT_ROLE_YEYAN = 404;
    const GIFT_ROLE_XIMIAO = 404;
    const GIFT_ROLE_CHEYONGTAI = 405;
    const GIFT_ROLE_XIMENGUANREN = 406;

    public $userData = [
        'giftCodeYuyue' => 0,
        'role' => '',
    ];

    public $roles = ['huangxiaoyan', 'yeyan', 'ximiao', 'cheyongtai', 'ximenguanren'];

    public $giftRole = [
        'huangxiaoyan' => self::GIFT_ROLE_HUANGXIAOYAN,
        'yeyan' => self::GIFT_ROLE_YEYAN,
        'ximiao' => self::GIFT_ROLE_XIMIAO,
        'cheyongtai' => self::GIFT_ROLE_CHEYONGTAI,
        'ximenguanren' => self::GIFT_ROLE_XIMENGUANREN,
    ];

    public $giftInv = [
        1 => self::GIFT_INV_1,
        5 => self::GIFT_INV_5,
        10 => self::GIFT_INV_10,
        30 => self::GIFT_INV_30,
        50 => self::GIFT_INV_50,
        100 => self::GIFT_INV_100,
    ];

//    public $invGift = [
//        1 =>
//    ];

    public function actionCover()
    {
        //游戏特色
        $banner=$this->getRecommend('game_play');
        return $this->renderPartial('cover.html',['banner'=>$banner]);
    }

    //预约方法
    public function actionSavephone()
    {
        $phone = Cms::getPostValue('phone');
        $type =Cms::getPostValue('type', 'ios');
        $scene =Cms::getPostValue('scene', 0);
        if (Cms::checkPhone($phone)) {
            $is_get = GameSubscribe::find()->where(['phone'=>$phone,'website_id'=>$this->website_id,'scene'=>$scene])->one();
            if(!$is_get){
                $model = new GameSubscribe();
                if ($model) {
                    $model->phone = $phone;
                    $model->type = $type;
                    $model->scene = $scene;
                    $model->created_at = time();
                    $model->website_id = $this->website_id;
                    if($model->save() > 0){
                        $rez = array('status'=>1,'msg'=>'预约成功');
                    }else{
                        $rez = array('status'=>0,'msg'=>'预约失败');
                    }
                }else{
                    $rez = array('status'=>-1,'msg'=>'未知错误');
                }
            }else{
                $rez = array('status'=>-3,'msg'=>'已经预约过了');
            }
        }else{
            $rez = array('status'=>-2,'msg'=>'手机号码错误');
        }
        echo Json::encode($rez);
    }
    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**
     * 登录&预约
     * @return array
     */
    public function actionLogin()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type');
        $codes = Cms::getPostValue('code');

        if (!$phone || !Cms::checkPhone($phone)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '手机号不正确']);
        }

        $res = Cms::checkVerify(self::SCENE_YUYUE);    //验证验证码是否正确
        if ($res['status'] != 0) {
            $this->ajaxOutPut($res);
        }

        $user = UserCenter::getUserInfo($this->website_id, $phone);
        // 如果用户没有则开始预约， 否则为正常登录
        if (!$user) {
            if (time() >= strtotime('2019-01-15 12:00:00')) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束']);
            }
            $res = $this->_yuyue($this->website_id, $phone, $type, $codes, $this->channelName);
            if ($res['status'] != 0) {
                $this->ajaxOutPut($res);
            }
            $user = $res['user'];
            $userData = $res['userData'];
            $msg = '预约成功';
        } else {
            $userData = UserCenterData::getUserData($this->website_id, $user['id']);
            if (!isset($userData['giftCodeYuyue']) || !$userData['giftCodeYuyue']) {
                // 获取预约礼包
                list($code, $giftCodeLogId) = GiftCode::getGiftCodeOrEntity($this->website_id, self::GIFT_YUYUE, $phone, '', true, 0, true);
                $userData = UserCenterData::getUserData($this->website_id, $user['id']);
                if ($code) {
                    $userData['giftCodeYuyue'] = $code;
                    UserCenterData::setData($this->website_id, $user['id'], $userData);
                }
            }
            $msg = '登录成功';
        }

        Cms::setSession(self::SESSION_LOGIN, $phone);
        $user['data'] = $userData;
        $data = $this->_getUserInfo($this->website_id, $user['id'], $user['me_invite_code'], $phone, $user);
        $this->ajaxOutPut(['status' => 0, 'msg' => $msg, 'data' => $data]);
    }

    private function _yuyue($websiteId, $phone, $type, $codes, $channelName)
    {
        if (!$type || !in_array($type, ['ios', 'android'])) {
            return ['status' => -1, 'msg' => '选择平台错误'];
        }
        $inviteUser = '';
        if ($codes) {
            list($code, $invitePhone) = $this->_parseCode($codes);
            if (!$code) {
                return ['status' => -1, 'msg' => '邀请码不正确'];
            }

            $inviteUser = UserCenter::getUserInfo($this->website_id, $invitePhone);
            if (!$inviteUser) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '邀请码不正确']);
            }
            if ($inviteUser['me_invite_code'] != $code) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '邀请码不正确']);
            }
        }

        $res = Cms::yuyuePhone($websiteId, $phone, $type, self::SCENE_YUYUE, '', Cms::IS_NO_YZM, Cms::IS_UNIQUE, $channelName, false);
        if ($res['status'] != 0) {
            if (!isset($res['is_repeat'])) {
                return $res;
            }
        }
        $meInviteCode = time().rand(1000, 9999);

        if ($inviteUser) {  // 如果有邀请码
            $user = UserCenter::addUser($websiteId, $phone, '', '', ['me_invite_code' => $meInviteCode, 'other_invite_code' => $code]);
            $this->_addInvCache($websiteId, $phone, $code, $inviteUser);
        } else {
            $user = UserCenter::addUser($websiteId, $phone, '', '', ['me_invite_code' => $meInviteCode]);
        }

        // 获取预约礼包
        list($code, $giftCodeLogId) = GiftCode::getGiftCodeOrEntity($this->website_id, self::GIFT_YUYUE, $phone, '', true, 0, true);
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        if ($code) {
            $userData['giftCodeYuyue'] = $code;
            UserCenterData::setData($this->website_id, $user['id'], $userData);
        }
        return ['status' => 0, 'user' => $user, 'userData' => $userData];
    }

    /**
     * 增加邀请 缓存
     * @param $websiteId
     * @param $phone
     * @param $code
     * @param $inviteUser
     * @return bool
     */
    private function _addInvCache($websiteId, $phone, $code, $inviteUser)
    {
        $cache = new PublicCache($websiteId);
        if ($cache->existWpys($inviteUser['id'])) {
            $cache->setWpys($inviteUser['id'], $phone, ['created_at' => time(), 'phone' => $phone]);
        } else {
            $data = UserCenter::find()->where(['website_id' => $websiteId, 'other_invite_code' => $inviteUser['me_invite_code']])->asArray()->all();
            foreach ($data as $v) {
                $cache->setWpys($inviteUser['id'], $v['phone'], ['created_at' => $v['created_at'], 'phone' => $v['phone']]);
            }
        }
        return true;
    }

    private function _getInvCache($websiteId, $userId, $code)
    {
        $cache = new PublicCache($websiteId);
        $logs = $cache->getAllWpys($userId);
        if (!$logs || empty($logs)) {
            $data = UserCenter::find()->where(['website_id' => $websiteId, 'other_invite_code' => $code])->asArray()->all();
            foreach ($data as $v) {
                $cache->setWpys($userId, $v['phone'], ['created_at' => $v['created_at'], 'phone' => $v['phone']]);
                $logs[$v['phone']] = ['created_at' => $v['created_at'], 'phone' => $v['phone']];
            }

        }
        return $logs;
    }


    private function _checkLogin()
    {
        $phone = Cms::getSession(self::SESSION_LOGIN);
        if (!$phone) {
            $yuyueTotal = YuyueStatModel::getYuyue($this->website_id, 'wpys_total');
            $huangxiaoyanTotal = YuyueStatModel::getYuyue($this->website_id, 'huangxiaoyan_total');
            $yeyanTotal = YuyueStatModel::getYuyue($this->website_id, 'yeyan_total');
            $xishaTotal = YuyueStatModel::getYuyue($this->website_id, 'xisha_total');
            $cheyongtaiTotal = YuyueStatModel::getYuyue($this->website_id, 'cheyongtai_total');
            $ximenguanrenTotal = YuyueStatModel::getYuyue($this->website_id, 'ximenguanren_total');

            $data['yuyueTotal'] = $yuyueTotal['count'];
            $data['huangxiaoyanTotal'] = $huangxiaoyanTotal['count'];
            $data['yeyanTotal'] = $yeyanTotal['count'];
            $data['xishaTotal'] = $xishaTotal['count'];
            $data['cheyongtaiTotal'] = $cheyongtaiTotal['count'];
            $data['ximenguanrenTotal'] = $ximenguanrenTotal['count'];
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！', 'data' => $data]);
        }
        return true;
    }

    /**
     * 解析邀请码
     * @param $codes
     * @return array
     */
    private function _parseCode($codes)
    {
        $codes = base64_decode($codes);
        $codes = @json_decode($codes, true);
        if (empty($codes) || !isset($codes['code']) || !isset($codes['invitePhone']) || !$codes['invitePhone'] || !Cms::checkPhone($codes['invitePhone'])) {
            return [0, ''];
        }
        $code = $codes['code'];
        $invitePhone = $codes['invitePhone'];
        return [$code, $invitePhone];
    }

    /**
     * 获取邀请码
     * @param $code
     * @param $phone
     * @return array
     */
    private function _getInviteCode($code, $phone)
    {
        $codes = [
            'code' => $code,
            'invitePhone' => $phone,
        ];
        $codes = base64_encode(json_encode($codes));
        $inviteUrl = $this->_getInviteUrl().'code='.$codes;
        return [$codes, $inviteUrl];
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    private function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://wpys.dev.yingxiong.com/cover.html?";
        } else if (YII_DEMO) {
            return "http://wpys.demo.yingxiong.com/cover.html?";
        } else {
            return "http://wpys.yingxiong.com/cover.html?";
        }
    }

    /**
     * 获取用户信息
     */
    public function actionGetUserInfo()
    {
        $this->_checkLogin();
        $phone = Cms::getSession(self::SESSION_LOGIN);
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        if (!$user) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录']);
        }
        $data = $user;
        $data['data'] = $userData;
        $data = $this->_getUserInfo($this->website_id, $user['id'], $user['me_invite_code'], $phone, $data);
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $data]);
    }

    private function _getUserInfo($websiteId, $userId, $meInviteCode, $phone, $data)
    {
        // 邀请log
        $invLogs = $this->_getInvCache($websiteId, $userId, $meInviteCode);
        $data['countInv'] = count($invLogs);

        // 获取邀请码
        list($data['code'], $data['inviteUrl']) = $this->_getInviteCode($meInviteCode, $phone);

        $yuyueTotal = YuyueStatModel::getYuyue($this->website_id, 'wpys_total');
        $huangxiaoyanTotal = YuyueStatModel::getYuyue($this->website_id, 'huangxiaoyan_total');
        $yeyanTotal = YuyueStatModel::getYuyue($this->website_id, 'yeyan_total');
        $xishaTotal = YuyueStatModel::getYuyue($this->website_id, 'xisha_total');
        $cheyongtaiTotal = YuyueStatModel::getYuyue($this->website_id, 'cheyongtai_total');
        $ximenguanrenTotal = YuyueStatModel::getYuyue($this->website_id, 'ximenguanren_total');

        $data['yuyueTotal'] = $yuyueTotal['count'];
        $data['huangxiaoyanTotal'] = $huangxiaoyanTotal['count'];
        $data['yeyanTotal'] = $yeyanTotal['count'];
        $data['xishaTotal'] = $xishaTotal['count'];
        $data['cheyongtaiTotal'] = $cheyongtaiTotal['count'];
        $data['ximenguanrenTotal'] = $ximenguanrenTotal['count'];
        return $data;
    }

    /**
     * 投票
     */
    public function actionVote()
    {
        $this->_checkLogin();
        $role = Cms::getPostValue('role');
        if (!$role || !in_array($role, $this->roles)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '选择角色错误']);
        }
        $phone = Cms::getSession(self::SESSION_LOGIN);
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        if ($userData && isset($userData['role']) && $userData['role']) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '您已经选择角色，请勿重复选择']);
        }
        $userData['role'] = $role;
        UserCenterData::setData($this->website_id, $user['id'], $userData);
        $this->ajaxOutPut(['status' => 0, 'msg' => '']);
    }

    /**
     * 获取邀请礼包
     */
    public function actionGetInvGift()
    {
        $this->_checkLogin();
        $phone = Cms::getSession(self::SESSION_LOGIN);
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        $inv = $this->_getInvCache($this->website_id, $user['id'], $user['me_invite_code']);
        $count = count($inv);

        $invNums = [1, 5, 10, 30, 50];

        foreach ($invNums as $v) {
            if ($count >= $v && (!$userData || !isset($userData['giftCodeInv'.$v]) || !$userData['giftCodeInv'.$v])) {
                list($code, $giftCodeLogId) = GiftCode::getGiftCodeOrEntity($this->website_id, $this->giftInv[$v], $phone, '', true, 0, true);
                if ($code) {
                    $userData['giftCodeInv'.$v] = $code;
                }
            }
        }

        if ($count >= 100 && (!$userData || !isset($userData['giftCodeInv100']) || !$userData['giftCodeInv100'])) {
            list($code, $giftCodeLogId) = GiftCode::getGiftCodeOrEntity($this->website_id, self::GIFT_INV_100, $phone, '', false, 0, true);
            if ($code) {
                $userData['giftCodeInv100'] = $code;
            }
        }
        UserCenterData::setData($this->website_id, $user['id'], $userData);
        if (isset($userData['giftCodeInv100']) && $userData['giftCodeInv100']) {
            $userData['giftCodeInv100'] = '公测当日短信发放';
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $userData]);
    }

    /**
     * 获取投票礼包
     */
    public function actionGetRoleGift()
    {
        $this->_checkLogin();
        $phone = Cms::getSession(self::SESSION_LOGIN);
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $userData = UserCenterData::getUserData($this->website_id, $user['id']);
        if (!$userData || !isset($userData['role']) || !$userData['role']) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请先投票']);
        }

        $totalVote =  YuyueStatModel::getYuyue($this->website_id, $userData['role'].'_total');

        if ($totalVote['count'] < 50000) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '还未达到领取条件']);
        }

        if (isset($userData['giftCodeRole']) && $userData['giftCodeRole']) {
            $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $userData['giftCodeRole']]);
        }

        $giftId = $this->giftRole[$userData['role']];
        if (!$giftId) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '礼包异常']);
        }

        list($code, $giftCodeLogId) = GiftCode::getGiftCodeOrEntity($this->website_id, $giftId, $phone, '', true, 0, true);
        if ($code) {
            $userData['giftCodeRole'] = $code;
            UserCenterData::setData($this->website_id, $user['id'], $userData);
            $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $code]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '礼包码已经领取完']);
        }

    }

    public function actionLogout()
    {
        Cms::setSession(self::SESSION_LOGIN, '');
        $this->ajaxOutPut(['status' => 0, 'msg' => '']);
    }

    public function actionExport()
    {
        $secret = Cms::getGetValue('secret');
        if ($secret != 'wpys.yingxiong.com') {
            echo '非法操作!';exit;
        }
        $users = UserCenter::find()->where(['website_id' => $this->website_id])->asArray()->all();
        $subscribes = GameSubscribe::find()->indexBy('phone')->where(['website_id' => $this->website_id, 'scene' => 2])->asArray()->all();

        $subQuery = (new Query())->from(UserCenterData::tableName())->where(['website_id' => $this->website_id])->orderBy('id DESC');
        $userDatas = (new Query())->from(['s' => $subQuery])->indexBy('user_center_id')->groupBy('user_center_id')->all();

        $invCount = UserCenter::find()->select(['other_invite_code', 'count(*) as count'])->indexBy('other_invite_code')->where(['website_id' => $this->website_id])->groupBy(['other_invite_code'])->asArray()->all();
        $data = [];
        foreach ($users as $user) {
//            $userData = UserCenterData::getUserData($this->website_id, $user['id']);
//            $countInv = $this->_getInvCache($this->website_id, $user['id'], $user['me_invite_code']);
            if (isset($userDatas[$user['id']])) {
                $userData = json_decode($userDatas[$user['id']]['data'], true);
            } else {
                continue;
            }

            $userData['countInv'] = isset($invCount[$user['me_invite_code']]) ? $invCount[$user['me_invite_code']]['count'] : 0;
            $userData['phone'] = $user['phone'];
            $userData['createdAt'] = date('Y-m-d H:i:s', $user['created_at']);
            $userData['channel'] = isset($subscribes[$user['phone']]) &&  $subscribes[$user['phone']]['channel'] ? $subscribes[$user['phone']]['channel'] : '官网包';
            $userData['role'] = isset($userData['role']) ? $userData['role'] : '';

            $userData['giftCodeYuyue'] = isset($userData['giftCodeYuyue']) ? $userData['giftCodeYuyue'] : '';

            $userData['giftCodeInv1'] = isset($userData['giftCodeInv1']) ? $userData['giftCodeInv1'] : '';
            $userData['giftCodeInv5'] = isset($userData['giftCodeInv5']) ? $userData['giftCodeInv5'] : '';
            $userData['giftCodeInv10'] = isset($userData['giftCodeInv10']) ? $userData['giftCodeInv10'] : '';
            $userData['giftCodeInv30'] = isset($userData['giftCodeInv30']) ? $userData['giftCodeInv30'] : '';
            $userData['giftCodeInv50'] = isset($userData['giftCodeInv50']) ? $userData['giftCodeInv50'] : '';
            $userData['giftCodeInv100'] = isset($userData['giftCodeInv100']) ? $userData['giftCodeInv100'] : '';

            $userData['giftCodeRole'] = isset($userData['giftCodeRole']) ? $userData['giftCodeRole'] : '';
            $data[] = $userData;
        }
        $header = array('手机号', '邀请人数',  '预约渠道', '选择角色', '获取时间');
        $fields = ['phone', 'countInv',  'channel', 'role', 'createdAt'];
        $filename = 'wpys预约活动用户数据-'.time();
        Cms::export($header, $data, $fields, $filename);
    }
}
