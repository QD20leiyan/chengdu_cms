<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\HqwmUserModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\DrawController;
use common\components\PcController;
use common\models\GameSubscribe;
use common\models\Gift;
use common\models\GiftActivityModel;
use common\models\GiftCode;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('cover.html',['captcha_img' => $captcha_img]);
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**************************************************************抽奖**************************************************************/

    protected static $prize_arr = [  //概率
        'A' => [
            2 => 6000,
            5 => 3500,
            7 => 500
        ],
        'B' => [
            5 => 6000,
            6 => 3500,
            8 => 500
        ],
        'C' => [
            2 => 4000,
            6 => 5000,
            7 => 500,
            8 => 500
        ]
    ];
    /**
     * 获取用户信息
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        $phone=Cms::getSession('login_hqwm_phone');
        //用户游戏中是否领取礼包
        $user = HqwmUserModel::find()->where('phone = :phone', [':phone' => $phone])->asArray()->one();
        $user['is_yuyue']= $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => $phone, ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
        $user['is_enlist']=0;
        if($user['enlist_time']>=strtotime(date('Y-m-d')) && $user['enlist_time']<=strtotime(date('Y-m-d').' 23:59:59') ){
            $user['is_enlist']=1;
        }
        $user['gift_code_id']=count(array_filter(explode(',',$user['gift_code_id'])));
        $user['share_url'] = $this->_getInviteUrl().'invite_code='.$user['me_invite_code'];
        $this->ajaxOutPut(['status' => 0, 'msg' => $user]);
    }


    //登录获取验证码
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误!']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《火器文明》预约登录，仅限安卓设备预约/下载，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    //登录、邀请
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $invite_code = Cms::getPostValue('invite_code');
//        $yy_but = Cms::getPostValue('is_yy');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            $code = '';
            Cms::setSession('login_hqwm_phone', $phone);
            $user = HqwmUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new HqwmUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'code=' . $user->me_invite_code);
                $user->created_at = time();
                $user->updated_at = time();
                $user->draw_count = 1;
                $user->save();
                $msg = $user->attributes;
            } else {
                //每天最多增加抽经机会3次
                if ($user->today_invite_count < 3 && $user->updated_at >= strtotime(date('Y-m-d'))) {
                    $user->today_invite_count = 0;
                    $user->updated_at = time();
                }
                $user->save();
                $msg = $user->attributes;
            }
            //预约
            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => $phone, ':website_id' => $this->website_id])->one();
            if (!$exist_phone) {
                $yy_code = self::yuyue($phone, $invite_code);
                if ($yy_code['status'] == 0) $code = $yy_code['code'];
            } else {
//                if ($yy_but) {
                    if ($user->invite_code_id) {
                        $is_code = GiftCode::find()->where(['gift_id' => $user->invite_code_id, 'phone' => $phone])->asArray()->one();
                        if ($is_code) $code = $is_code['code'];
                    }
//                }
            }
            //判断当天是否签到 is_enlist
            $msg['is_enlist']=0;
           if($user->enlist_time>=strtotime(date('Y-m-d')) && $user->enlist_time<=strtotime(date('Y-m-d').' 23:59:59') ){
              $msg['is_enlist']=1;
           }
            $msg['is_yuyue']= $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => $phone, ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
            $msg['gift_code_id']=count(array_filter(explode(',',$msg['gift_code_id'])));
            $msg['gift_code'] = $code;
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_hqwm_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_hqwm_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * 预约功能
     */
    protected function yuyue($phone, $invite_code)
    {
        $_POST['phone'] = $phone;
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        $_POST['type'] = 'android';
        $invite_model = HqwmUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($invite_code) {//有邀请码
            $model_other = HqwmUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
            if (!$model_other && $invite_code == $invite_model['me_invite_code']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            $invite_model->other_invite_code = (string)$invite_code;

            //每天最多增加抽经机会3次
            if ($model_other->today_invite_count < 3 && $model_other->updated_at >= strtotime(date('Y-m-d'))) {
                $model_other->draw_count = $model_other->draw_count + 1;  //邀请人抽奖+1
            }
            $model_other->updated_at = time();
            $model_other->invite_num = $model_other->invite_num + 1;  //邀请人+1
            $model_other->save();
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);
        if ($res['status'] == 0) {
            $yy_code = DrawController::Draw($phone, 4);
            if ($yy_code['status'] == 0) {
                $res['code'] = $yy_code['msg'];
                $invite_model->invite_code_id = $yy_code['gift_id'];
            }
            $invite_model->save();
        }
        return $res;
    }

    //预约及礼包
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_hqwm_phone');
        $user = HqwmUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        $msg = [];
        $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
        if ($user->invite_code_id) {
            $is_code = GiftCode::find()->where(['gift_id' => $user->invite_code_id, 'phone' => $phone])->asArray()->one();
            if ($is_code) $msg['code'] = $is_code['code'];
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
    }

    //转盘及礼包
    public function actionAjaxDraw()
    {
        if(time()<=strtotime(date('2018-6-15'))){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动还未开始！']);
        }elseif(time()>=strtotime(date('2018-7-12 18:00:00'))){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束']);
        }else {
            $this->_checkLogin();
            $phone = Cms::getSession('login_hqwm_phone');
            $model = HqwmUserModel::find()->where(['phone' => $phone])->one();

            $is_del = array_filter(explode(',', $model->gift_ids));
            if ($model->draw_count > 0) {
                //从什么时候开始 算天数 2018-6-14
                $startdate = '2018-6-15';
                $enddate = date('Y-m-d');
                $day_num = floor((strtotime($enddate) - strtotime($startdate)) / 86400);
                $day_num = $day_num + 1;
                //礼包库 p-a 2 p-b 5  p-c 6 g-a 7 g-b 8
                //根据抽奖次数来判断抽取那个奖惩
                if (in_array($day_num, [2, 5, 8, 11, 14, 17, 20])) { //b奖池
                    $arr = self::arr_int(self::$prize_arr['B'], $is_del);
                    $id = self::_getRand($arr);
                } elseif (in_array($day_num, [3, 6, 9, 12, 15, 18, 21])) { //c 奖池
                    $arr = self::arr_int(self::$prize_arr['C'], $is_del);
                    $id = self::_getRand($arr);
                } else {  //a 奖池
                    $arr = self::arr_int(self::$prize_arr['A'], $is_del);
                    $id = self::_getRand($arr);
                }
                $res = DrawController::Draw($phone, $id, Cms::GIFT_NO_REPEAT, $is_del);
                if ($res['status'] == 0 && $res['is_repeat'] == 0) {
                    if (!$model->gift_ids) {
                        $model->gift_ids = ',' . $res['gift_id'] . ',';
                    } else {
                        $model->gift_ids = $model->gift_ids . $res['gift_id'] . ',';
                    }
                    if ($model->today_draw_count >= 3 && $model->draw_time>strtotime(date('Y-m-d'))) {
                        $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖次数已超限！']);
                    }else{
                        $model->today_draw_count = 0;
                    }
                    $model->draw_count = $model->draw_count - 1;
                    $model->draw_num = $model->draw_num + 1;
                    $model->today_draw_count = $model->today_draw_count + 1;
                    $model->draw_time = time();
                    $model->save();
                    $res['draw_count'] = $model->draw_count;//抽奖剩余次数
                    $res['gift_id'] = $id;
                    $this->ajaxOutPut($res);
                } else {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '很遗憾，礼包码已经全部领取完！']);
//                    $this->ajaxOutPut($res);
                }
            }
            $this->ajaxOutPut(['status' => -1, 'msg' => '暂无抽奖机会！']);
        }

    }

    //排重
    public function arr_int($arr,$is_del){
        foreach ($arr as $k=>$v){
            $re=[];
            $gift_=GiftActivityModel::findOne($k);
            $gift_words=unserialize($gift_->gift_awards);
            if($gift_words) {
                foreach ($gift_words as $key => $value) {
                    $re[] = $value['gift'];
                }
            }
            if($re==array_intersect($re,$is_del)){
                unset($arr[$k]);
            }
        }
        return $arr;
    }

    //签到及礼包
    public function actionAjaxEnlist()
    {
        if(time()<=strtotime(date('2018-6-15'))){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动还未开始！']);
        }elseif(time()>=strtotime(date('2018-7-14 23:59:59'))){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束']);
        }else {
            $this->_checkLogin();
            $phone = Cms::getSession('login_hqwm_phone');
            $user = HqwmUserModel::find()->where(['phone' => $phone])->one();
            $gift = GiftActivityModel::findOne(3);
            $arr = [];
            if ($gift) {
                $gift_words = unserialize($gift->gift_awards);
                if ($gift_words) {
                    foreach ($gift_words as $k => $v) {
                        $arr[$k] = $v['gift'];
                    }
                }
            }
            $status = -1;
            $msg = '今天已签到';

            if ($user->enlist_time < strtotime(date('Y-m-d'))) {
                if ($user->gift_code_id) {//非第一天签到
                    $key_ = count(array_filter(explode(',', $user->gift_code_id)));
                    $user->gift_code_id = $user->gift_code_id . ($key_ + 1) . ',';
                    $key = $key_ + 1;
                } else {//第一天签到
                    $user->gift_code_id = ',1,';
                    $key = 1;
                }
                $user->enlist_time = time();
                $user->save();
                //得到对应的礼包
                if (!isset($arr[$key])) {
                    $status = 0;
                    $msg = '';
                } else {
                    $ent_code = GiftCode::find()->where(['gift_id' => $arr[$key], 'status' => 0])->one();
                    if ($ent_code) {
                        $ent_code->phone = (string)$phone;
                        $ent_code->status = 1;
                        $ent_code->updated_at = date('Y-m-d H:i:s', time());
                        $ent_code->save();
                        $msg = $ent_code->code;
                        $status = 0;
                    } else {
                        $status = -1;
                        $msg = '礼包为空！';
                    }
                }
            }
            $this->ajaxOutPut(['status' => $status, 'msg' => $msg]);
        }
    }

    //我的转盘礼包、签到礼包

    public function actionAjaxMyCode()
    {
//        $this->_checkLogin();
        $phone = Cms::getSession('login_hqwm_phone');
        $user = HqwmUserModel::find()->where(['phone' => $phone])->one();
        $type = Cms::getPostValue('type',3); // 1 签到礼包 2 转盘礼包 3所有的中奖名单
        if ($type == 1) {
            $gift = GiftActivityModel::findOne(3);
            $arr = [];
            if ($gift) {
                $gift_words = unserialize($gift->gift_awards);
                if($gift_words) {
                    foreach ($gift_words as $k => $v) {
                        $arr[$k] = $v['gift'];
                    }
                }
                $data = [];
                if ($user->gift_code_id) {
                    $my_ent_id = array_filter(explode(',', $user->gift_code_id));
                    foreach ($my_ent_id as $en_k => $en_v) {
                        if(!isset($arr[$en_v]))continue;
                        $my_code_ = GiftCode::find()->select(['code'])->where(['gift_id' => $arr[$en_v]])->asArray()->one();
                        $re['name'] = '第' . $en_k . '天签到';
                        $re['code'] = $my_code_['code'];
                        $data[] = $re;
                    }
                }
                $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
            }
        }elseif($type==2){
            $data = [];
            if ($user->gift_ids) {
                $my_draw_id = array_filter(explode(',', $user->gift_ids));
                foreach ($my_draw_id as $en_k => $en_v) {
                    $gift_name=self::Gift_Code_Id($en_v);
                    $my_code_ = GiftCode::find()->with('gift')->where(['gift_id' => $en_v])->asArray()->one();
                    $re['name'] =$gift_name;
                    $re['code'] = $my_code_['code'];
                    $data[] = $re;
                }
            }
            $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
        }else{
            $data=[];
            $hqwm_user=HqwmUserModel::find()->orderBy(['draw_time'=>SORT_DESC])->limit(30)->all();
            foreach ($hqwm_user as $k=>$v){
                if($k<=30) {
                    if ($v->gift_ids) {
                        $my_draw_id = array_filter(explode(',', $v->gift_ids));
                        foreach ($my_draw_id as $en_k => $en_v) {
                            $my_code_ = GiftCode::find()->with('gift')->where(['gift_id' => $en_v])->andWhere(['phone' => $v->phone])->asArray()->one();
                            $re['name'] = self::Gift_Code_Id($en_v);
                            $re['phone'] = substr_replace($my_code_['phone'], '****', 3, 4);
                            $data[] = $re;
                        }
                    }
                }
            }
            $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
        }
    }

    //填写收货地址
    public function actionAjaxAddress()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_hqwm_phone');
        $model = HqwmUserModel::find()->where(['phone' => $phone])->one();
        $name = Cms::getPostValue('name');
        $code = Cms::getPostValue('code');
        $address = Cms::getPostValue('address');
        $tel = Cms::getPostValue('tel');
//        $file = trie_filter_load('words.dic');
//        $search_name = trie_filter_search_all($file, $name);  // 一次把所有的敏感词都检测出来
//        $search_address = trie_filter_search_all($file, $address);  // 一次把所有的敏感词都检测出来
//        if (!empty($search_name)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货姓名含有敏感词，请重新编辑！']);
//        }
//        if (!empty($search_address)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址含有敏感词，请重新编辑！']);
//        }
        if (empty($name) || empty($address) || empty($tel)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请完善收货信息']);
        }
        $model->name = $name;
        $model->code = $code;
        $model->address = $address;
        $model->tel = $tel;
        if ($model->save()) {
            $this->ajaxOutPut(['status' => 0, 'msg' => '收货地址完善成功！']);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址添加失败！']);
        }
    }


    //礼包ID 的主分类

    public function Gift_Code_Id($gift_id){
       //所有的礼包库
        $gift=GiftActivityModel::find()->where(['website_id'=>$this->website_id])->andWhere(['like','gift_awards','"'.$gift_id.'"'])->asArray()->one();
        $name='';
        if($gift['activity_name']){
            $name=$gift['activity_name'];
       }
       return $name;

    }
    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private function _getRand($proArr)
    {
        $result = '';

        //概率数组的总概率精度
        $proSum = array_sum($proArr);

        //概率数组循环
        foreach ($proArr as $key => $proCur) {
            $randNum = mt_rand(1, $proSum);
            if ($randNum <= $proCur) {
                $result = $key;
                break;
            } else {
                $proSum -= $proCur;
            }
        }
        unset ($proArr);
        return $result;
    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_hqwm_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }


    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://hqwm.dev.yingxiong.com/cover.html?";
        } else if (YII_DEMO) {
            return "http://hqwm.demo.yingxiong.com/cover.html?";
        } else {
            return "http://hqwm.yingxiong.com/cover.html?";
        }

    }

    public function actionTes()
    {

//        $_POST['phone']=15181808256;
//        $this->actionAjaxLoginVerify();

//        $_POST['phone']=15181808256;
//        $_POST['yzm']=552389;
//        $_POST['is_yy']=1;
//        $this->actionAjaxLogin();
//        $this->actionAjaxYuyue();
//        $this->actionAjaxDraw();
//        $this->actionAjaxEnlist();
        $_POST['type']=2;
        $this->actionAjaxMyCode();

//        $_POST['name']='测试';
//        $_POST['code']='455561';
//        $_POST['address']='成都';
//        $_POST['tel']='0281545';
//        $this->actionAjaxAddress();
        $this->actionAjaxGetUser();
        exit;
    }

}
