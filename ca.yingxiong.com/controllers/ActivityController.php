<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/8/008
 * Time: 11:35
 */

namespace app\controllers;


use common\Cms;
use common\components\HomeController;
use common\models\ca\CaActivityUserModel;
use common\models\Gift;
use common\models\GiftCode;
use function GuzzleHttp\Psr7\str;
use yii\captcha\Captcha;

class ActivityController extends  HomeController
{
    public static  $arr=['a'=>[1,9], 'b'=>[4,2], 'c'=>[3,7], 'd'=>[5,10], 'e'=>[6,8]];//卡牌翻牌

    /**
     * 抽奖登录及每天登录赠送一次抽奖机会
     */
    public function actionAjaxActivityLogin()
    {
        $msg=[];
//        if(time()>=strtotime('2018-3-20 23:59:59')){
//            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动已结束！']);
//        }else {
            $code=Cms::getPostValue('code');
            $phone = Cms::getPostValue('phone');
            $res = Cms::checkVerify(Cms::SM_LOGIN);
            $user = CaActivityUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if ($res['status'] == 0) {
                Cms::setSession('activity_ca_phone', $phone);
                //是否有/无效的邀请码
                if ($code) {
                    $model = CaActivityUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $code])->one();
                    if (!$model) {
                        $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
                    }
                    if ($user && ($code == $user['me_invite_code'])) {
                        $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
                    }
                    $model->invite_num=$model->invite_num+1;
                    self::_getAddNum($model->phone,1);//增加翻牌次数
                    $model->save();
                }
                //是否已预约（登录及预约）
                if (!$user) {
                    $user = new CaActivityUserModel();
                    $user->phone = (string)$phone;
                    $user->login_time = time();
                    $user->me_invite_code=mt_rand(10000000,99999999);
//                    $user->invite_img= Cms::qrcodeImg($this->_getInviteUrl().'code='.$user->me_invite_code);
                    $user->invite_url= $this->_getInviteUrl().'code='.$user->me_invite_code;
                    $user->activity_count = 3;//初始翻牌次数
                    $user->add_num = 3;
                    $user->yuyue_time=time();
                    $user->add_time=time();
                    $user->created_at = time();
                    //发放钻石礼包
                    if (time() <= strtotime('2018-3-20 23:59:59')) {
                        $is_jewel=self::_getJewel($user->phone);
                        if($is_jewel['status']==0){
                            $msg['gift_name']=$is_jewel['gift_name'];
                            $msg['gift_code']=$is_jewel['msg'];
                        }
                    }
                } else {
                    if ($user->login_time < strtotime(date('Y-m-d'))) {
                        self::_getAddNum($phone,3); //增加翻牌次数
                    }
                    $user->login_time = time();
                }
                $user->save();
                $this->ajaxOutPut(['status' => 0, 'msg' =>$msg]);
            }
            $this->ajaxOutPut($res);
//        }
    }
    /**
     翻牌功能
     **/
    public  function actionAjaxActivityDraw()
    {
        if (time() > strtotime('2018-3-27 23:59:59')) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '翻牌活动已结束！']);
        } else {
            $this->_checkLogin();
            $phone = Cms::getSession('activity_ca_phone');
            $num = Cms::getPostValue('num');
            $is_arr = explode(',', $num);
            $pair = false;
            $is_lottery = false;
            $model = CaActivityUserModel::find()->where(['phone' => $phone])->one();
            if (count($is_arr) == 2) {
                if ($model->activity_count <= 0) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '翻牌机会已用完']);
                }
                //是否全部配对成功
                if (strlen($model->activity_str) < 10) {
                    foreach (self::$arr as $key => $value) {
                        Cms::setSession('activity_ca_draw', '');
                        if (array_intersect($value, $is_arr) == $value) {//配对成功
                            $model->activity_str = strpos("$model->activity_str", "$key") !== false ? $model->activity_str : $model->activity_str . ',' . $key;
                            if (strlen($model->activity_str) == 10) {
                                $model->lottery_num = 3;
                                $is_lottery = true;
                            }
                            $model->save();
                            $pair = true;
                        }
                    }
                }
            } else {
                self::_getDrawSession($num);
            }
            if ($model->activity_count > 0) {
                $model->activity_count = $model->activity_count == 1 ? $model->activity_count - 1 : $model->activity_count - 1;
                $model->activity_num = $model->activity_count == 1 ? $model->activity_num + 1 : $model->activity_num + 1;
            }
            $model->save();
            $this->ajaxOutPut(['status' => 0, 'msg' => ['is_pair' => $pair, 'activity_count' => $model->activity_count, 'is_lottery' => $is_lottery]]);
        }
    }
    /**
     * 分享加次数
     */
    public function actionAjaxShareAdd(){
        $this->_checkLogin();
        $phone=Cms::getSession('activity_ca_phone');
        $model=CaActivityUserModel::find()->where(['phone'=>$phone])->one();
        $model->share_time=time();
        $model->save();
        $request=self::_getAddNum($phone,1);
        $this->ajaxOutPut($request);
    }
    /***
     抽奖
     *********/
    public function actionAjaxActivity(){
        $this->_checkLogin();
        if (time() > strtotime('2018-3-31 23:59:59')) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动已结束！']);
        } else {
            $phone = Cms::getSession('activity_ca_phone');
            $model = CaActivityUserModel::find()->where(['phone' => $phone])->one();
            if ($model->lottery_num >= 0 && !empty($model->lottery_num)) {
                $prize_arr = [
                    '3' => [
                        ['id' => 55, 'name' => '护甲套装', 'v' => 6000],
                        ['id' => 56, 'name' => '生化套装', 'v' => 5000],
                        ['id' => 61, 'name' => '电影票', 'v' => 4000],
                        ['id' => 62, 'name' => '古墓周边', 'v' => 5]
                    ],
                    '2' => [
                        ['id' => 55, 'name' => '护甲套装', 'v' => 6000],
                        ['id' => 62, 'name' => '古墓周边', 'v' => 10],
                        ['id' => 56, 'name' => '生化套装', 'v' => 5000],
                        ['id' => 60, 'name' => '幸运钻石', 'v' => 2000],
                    ],
                    '1' => [
                        ['id' => 58, 'name' => '幸运碎片套装', 'v' => 500],
                        ['id' => 60, 'name' => '幸运钻石', 'v' => 1000],
                        ['id' => 57, 'name' => '冰雪北极熊', 'v' => 500],
                        ['id' => 55, 'name' => '护甲套装', 'v' => 6000],
                        ['id' => 56, 'name' => '生化套装', 'v' => 5000]
                    ],
                ];
                $false_arr = [55 => 1, 56 => 2, 57 => 3, 58 => 4, 60 => 5, 61 => 6, 62 => 7];
                $jp_val_arr = [];
                $arr = [];
                $ids = [];
                foreach ($prize_arr[$model->lottery_num] as $k => $v) {
                    $arr[$v['id']] = $v['name'];
                    $ids[] = $v['id'];
                    $jp_val_arr[$v['id']] = $v['v'];//根据抽奖的次数增加中奖的记录会会越来越大
                }
                $id = self::_getRand($jp_val_arr, $ids);
                $gift_code = Cms::getGiftNoYzm($phone, $id, 0);
                if ($gift_code['status'] == 0) {
                    $model->lottery_num = $model->lottery_num - 1;
                    $model->save();
                    $gift_code['is_address'] = 0;
                    if ($id == 62 && (!empty($model->name) || !empty($model->address) || !empty($model->tel))) {//是否完善了收货地址 0 未完善 1 已完善
                        $gift_code['is_address'] = 1;
                    }
                    if ($id == 62) {
                        $gift_code['msg'] = 'gmzb';
                    }
                    $gift_code['name'] = $arr[$id];
                    $gift_code['gift_id'] = $false_arr[$id];
                    $gift_code['lottery_num'] = $model->lottery_num;
                }
                $this->ajaxOutPut($gift_code);
            }
            $this->ajaxOutPut(['status' => -1, 'msg' => '暂无抽奖机会！']);
        }
    }
    /**
     * 填写收货地址
     **/
    public function actionAjaxAddress(){
        $this->_checkLogin();
        $phone=Cms::getSession('activity_ca_phone');
        $model=CaActivityUserModel::find()->where(['phone'=>$phone])->one();
        $name=Cms::getPostValue('name');
        $code=Cms::getPostValue('code');
        $address=Cms::getPostValue('address');
        $tel=Cms::getPostValue('tel');
//        $file = trie_filter_load('words.dic');
//        $search_name = trie_filter_search_all($file, $name);  // 一次把所有的敏感词都检测出来
//        $search_address = trie_filter_search_all($file, $address);  // 一次把所有的敏感词都检测出来
//        if (!empty($search_name)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货姓名含有敏感词，请重新编辑！']);
//        }
//        if (!empty($search_address)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址含有敏感词，请重新编辑！']);
//        }
        if(empty($name) || empty($address) || empty($tel)){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'请完善收货信息']);
        }
        $model->name=$name;
        $model->code=$code;
        $model->address=$address;
        $model->tel=$tel;
        if($model->save()){
            $this->ajaxOutPut(['status'=>0,'msg'=>'收货地址完善成功！']);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'收货地址添加失败！']);
        }
    }
    /**
     * 我的奖品
     **/
    public function actionAjaxGetMyGift(){
        $type=Cms::getPostValue('type',1);
        $arr=['1'=>[51,52,53,54,55],'2'=>[56,57,58,60,61,62]];
        $arr=$arr[$type];
        $this->_checkLogin();
        $phone=Cms::getSession('activity_ca_phone');
        $model=CaActivityUserModel::find()->where(['phone'=>$phone])->one();
        $data=[];
        $data['is_address']=0;
        $data['data']=[];
        if(!empty($model->name) && !empty($model->address) && !empty($model->tel)){//是否完善了收货地址 0 未完善 1 已完善
            $data['is_address']=1;
        }
        $activity_gift=GiftCode::find()->where(['phone'=>$phone])->with('gift')
            ->andWhere(['status'=>1])
            ->andWhere(['in','gift_id',$arr])
            ->orderBy('updated_at desc')
            ->asArray()->all();
        if(!empty($activity_gift)) {
            foreach ($activity_gift as $key => $value) {
                $tmp = [];
                if($value['id']==62){
                    $value['gift']['name']='古墓周边';
                }
                $tmp['name']=$value['gift']['name'];
                $tmp['code']=$value['code'];
                $data['data'][] = $tmp;
            }
        }
        $this->ajaxOutPut(['status'=>0,'msg'=>$data]);
    }
    /**
     * 所有中奖奖品
     **/
    public function actionAjaxGetGift(){

        $name=['幸运碎片套装','冰雪北极熊','电影票','冰雪北极熊','冰雪北极熊'];
        $phone=['151****8256','138****8546','151****8584','139****2476','187****8215'];
//        $this->_checkLogin();
        $arr=[55,56,57,58,60,61,62];
        $data=[];
        $activity_gift=GiftCode::find()->with('gift')
            ->andWhere(['in','gift_id',$arr])
            ->andWhere(['status'=>1])
            ->orderBy('updated_at desc')->asArray()->all();
        if(!empty($activity_gift)) {
            foreach ($activity_gift as $key => $value) {
                $tmp = [];
                if($value['id']==62){
                    $value['gift']['name']='古墓周边';
                }
                $tmp['name']=$value['gift']['name'];
                $tmp['phone']=substr_replace($value['phone'], '****', 3,4);;
                $data[] = $tmp;
            }
        }
        if(empty($data)){
            foreach ($name as $key=>$value){
                $tem_=[];
                $tem_['name']=$value;
                $tem_['phone']=$phone[$key];
                $data[] = $tem_;
            }
        }
        $this->ajaxOutPut(['status'=>0,'msg'=>$data]);
    }
    /**
     * 登录用户获取信息
     */
    public function actionAjaxGetUser(){
      $this->_checkLogin();
      $phone=Cms::getSession('activity_ca_phone');
      $model=CaActivityUserModel::find()->where(['phone'=>$phone])->asArray()->one();
      if(!$model){
          $this->actionAjaxLoginOut();
      }
      $is_address=0;
      if(!empty($model['name']) && !empty($model['address'] && !empty($model['tel']))){
          $is_address=1;
       }
       if(Cms::getSession('activity_ca_draw')){
          $is_save=Cms::getSession('activity_ca_draw');
       }else{
           $is_save='';
       };
      $data=[
         'phone'=>$model['phone'],
         'me_invite_code'=>$model['me_invite_code'],
         'invite_img'=>$model['invite_img'],
         'invite_url'=>$model['invite_url'],
         'invite_num'=>$model['invite_num'],//邀请人数
         'other_invite_code'=>$model['other_invite_code'],//他人邀请码
         'activity_num'=>$model['activity_num'],//翻牌次数
         'activity_count'=>$model['activity_count'],//翻牌剩余次数
         'activity_str'=>self::_getActivity($model['activity_str']),//翻牌剩余次数
         'is_activity'=>strlen($model['activity_str'])==10?1:0,//翻牌剩余次数
         'lottery_num'=>$model['lottery_num'],//抽奖剩余次数
         'is_address'=>$is_address,//是否完善了收货地址 0 未完善 1 已完善
         'name'=>$model['name'],//收货人
         'is_save'=>$is_save,//预存储的翻牌序号
         'code'=>$model['code'],//邮编
         'address'=>$model['address'],//详情地址
         'tel'=>$model['tel'],//电话号码
      ];
       $this->ajaxOutPut(['status'=>0,'msg'=>$data]);
    }
    /***
     * 我要召唤
     ***/
     public function actionAjaxGetCall(){
         $this->_checkLogin();
         if (time() > strtotime('2018-3-20 23:59:59')) {
             $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束！']);
         }else{
             $phone = Cms::getSession('activity_ca_phone');
             $is_jewel = self::_getJewel($phone);
             $this->ajaxOutPut($is_jewel);
         }
     }
    
    //注销登录
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('activity_ca_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['activity_ca_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' => $msg]);
    }
    //翻牌记录预存储
    public static  function _getDrawSession($str){
        if(Cms::getSession('activity_ca_draw')){
            $session = \Yii::$app->session;
            $session->remove('activity_ca_draw');
        }
        Cms::setSession('activity_ca_draw',$str);
    }
    static function _getActivity($str){
        $arr=[];
        if($str){
            $arr_=explode(',',$str);
            foreach ($arr_ as $key=>$value){
                if(empty($value))continue;
                $act=self::$arr[$value];
                $arr=array_merge($arr,$act);
            }
        }
        return $arr;
    }
    //登录状态
    private function _checkLogin()
    {
        $phone = Cms::getSession('activity_ca_phone');
        $model=CaActivityUserModel::find()->where(['phone'=>$phone])->one();
        if (!$phone || !$model) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }
    //获取邀请的地址
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://ca.dev.yingxiong.com/activity?";
        } else if (YII_DEMO) {
            return "http://ca.demo.yingxiong.com/activity?";
        } else {
            return "http://ca.yingxiong.com/activity?";
        }

    }
    //发放随机钻石礼包
    public static function _getJewel($phone){
        $prize_arr = [
                ['id' => 51, 'name' => '21钻石', 'v' => 5000],
                ['id' => 52, 'name' => '51钻石', 'v' => 2000],
                ['id' => 53, 'name' => '101钻石', 'v' => 900],
                ['id' => 54, 'name' => '3001钻石', 'v' => 100]];
        $jp_val_arr = [];
        $arr = [];
        $name=[];
        foreach ($prize_arr as $k => $v) {
            $arr[]=$v['id'];
            $name[$v['id']]=$v['name'];
            $jp_val_arr[$v['id']] = $v['v'];//根据抽奖的次数增加中奖的记录会会越来越大
        }
        $id=self::_getRand($jp_val_arr);
        $day=date('Y-m-d');
        $start_time=$day.' 20:30:00';//正式是20点半
        $ent_time=$day.' 21:30:00';
        if(time()>strtotime($start_time) && time()<strtotime($ent_time)){
            if($id==54){
                $gift_code_count=GiftCode::find()->where(['gift_id'=>$id])->andWhere(['status' => 0])->count();
                if($gift_code_count<=0){
                    $id=53;
                }
            }
            if($id==53){
                $gift_code_count=GiftCode::find()->where(['gift_id'=>$id])->andWhere(['status' => 0])->count();
                if($gift_code_count<=0){
                    $id=52;
                }
            }
            if($id==52){
                $gift_code_count=GiftCode::find()->where(['gift_id'=>$id])->andWhere(['status' => 0])->count();
                if($gift_code_count<=0){
                    $id=51;
                }
            }
            //每天发放礼包在1万个内
            $day_all=GiftCode::find()->where(['in','gift_id',$arr])->andWhere(['status'=>1])->andWhere(['between','updated_at',$day,$day.' 23:59:59'])->count();
            if($day_all>=10000){
                return ['status'=>101,'msg'=>'啊哦~今日礼包已被抢光，请明日再来！'];
            }
            //领取过不能重复领取
            $is_gift=GiftCode::find()->where(['phone'=>$phone])->andWhere(['in','gift_id',$arr])->andWhere(['status'=>1])->one();
            if($is_gift){
               return ['status'=>102,'msg'=>'您已经领取过预售基金，请勿重复领取！'];
            }
            $gift_code=Cms::getGiftNoYzm($phone,$id,1);
            $gift_code['gift_name']=$name[$id];
            return $gift_code;
        }else{
            return ['status'=>103,'msg'=>'亲，请在20:30-21:30之间来抽取预售基金哦~'];
        }
    }
    //获取随机数
    public static function _getRand($proArr,$arr='') {
        $phone=Cms::getSession('activity_ca_phone');
        if($arr) {
            $is_gift = GiftCode::find()->select(['gift_id'])->where(['in', 'gift_id', $arr])->andWhere(['phone' => $phone])->andWhere(['status' => 1])->asArray()->all();
            foreach ($is_gift as $key => $value) {
                if (isset($proArr[$value['gift_id']])) {
                    unset($proArr[$value['gift_id']]);
                }
            }
        }
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
        $gift_code_count=GiftCode::find()->where(['gift_id'=>$result])->andWhere(['status' => 0])->count();
        if($gift_code_count==0){
            unset($proArr[$result]);
            if(count($proArr)>0) {
                $result = self::_getRand($proArr);
            }
        }else {
            unset($proArr);
        }
        return $result;

    }
    //每天最多增加5次机会
    public static function _getAddNum($phone,$num){
      $model=CaActivityUserModel::find()->where(['phone'=>$phone])->one();
      if($model->add_time< strtotime(date('Y-m-d'))){//第二天
          $model->add_num=$num;
          $model->activity_count=$model->activity_count+$num;
      }else{//当天
        if(($model->add_num+$num)<5){
            $model->add_num=$model->add_num+$num;
            $model->activity_count=$model->activity_count+$num;
        }else {
            $model->activity_count = 5 - $model->add_num + $model->activity_count;
            $model->add_num = 5;
        }
      }
         $model->add_time=time();
         if($model->save()){
            return ['status'=>0,'msg'=>$model->activity_count];
         }else{
            return ['status'=>-1,'msg'=>'error'];
         }
    }
    public function actionMyTest($type = '', $id = '')
    {

        /******登录发送验证码***************/
//        $_POST['phone'] = 15181808256;
//        $this->actionAjaxActivityLoginVerify();
//        exit;

        /*******抽奖登录*********/
//        $_POST['phone'] = 15181808256;
//        $_POST['yzm'] = 699276;
//        $this->actionAjaxActivityLogin();
//        exit;


        /***************翻牌*************/

        $this->actionAjaxActivityDraw();
//      $this->actionAjaxGetUser();
      exit;
        /***************分享*************/
//      $this->actionAjaxShareAdd();
//      exit;
        /***************抽奖*************/
//      $this->actionAjaxActivity();
//      exit;
        /***************收货地址*************/
//       $_POST['name'] = '温霜';
//       $_POST['tel'] = 15181808256;
//       $_POST['address'] = '四川省-成都市';
//       $_POST['code'] = 6666;
//       $this->actionAjaxAddress();
//       exit;
//        $this->actionAjaxGetUser();
//        exit;


    }

}