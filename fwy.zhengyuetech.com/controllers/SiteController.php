<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\Api;
use common\components\ApiCommonSign;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\helpers\Utils;
use common\models\fwy\FwyTapStat;
use common\models\fwy\FwyUserModel;
use common\models\GameSubscribe;
use common\models\GiftCode;
use common\models\GiftPropModel;
use common\models\Stat;
use common\models\UserCenter;
use common\models\UserCenterData;
use common\models\YuyueStatModel;
use phpDocumentor\Reflection\Types\Self_;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    const GIFT_ID_NEW = 348;
    const SESSION_LOGIN_THIRD = 'thirdInfo';    // 第三方登陆 session 名
    const SESSION_LOGIN_PHONE = 'login_phone';  // 登陆手机号

    /**
     * 新cover页 用户信息 2018-08-08
     * game_gift_id 游戏中领取的ID
     * @var array
     */
    public $userData = ['is_yuyue' => 0, 'gift_code' => '', 'game_gift_id' => []];
    public $yuyueNumGifts = [
        5 => 5000,
        6 => 10000,
        7 => 50000,
        8 => 100000,
        9 => 500000,
    ];

    const YUYUE_NUM_STATUS_IS_GET = 1; // 预约人数礼包已经领取到游戏
    const YUYUE_NUM_STATUS_NO_GET = 2;  // 预约人数礼包未领取到游戏
    const YUYUE_NUM_STATUS_UNFINISHED = 3;  // 预约人数礼包未达标

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionCover1()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('cover1.html',['captcha_img'=>$captcha_img]);
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }
    /**************cover 抽奖页*****************/

    public static  $arr=[
        'A'=>[1,2,3,4],//邀请人礼包
        'B'=>[5,6,7,8,9,17],//预约人数礼包 17 为预约礼包
        'D'=>[10,11,12,13,14,15,16],//抽奖礼包及实物
    ];
    public static  $prize_arr = [
            ['id' => 10, 'name' => '银币*1000000', 'v' => 5000,'gift_id'=>88],
            ['id' => 11, 'name' => '金币*100', 'v' => 1500,'gift_id'=>102],
            ['id' => 12, 'name' => 'S侠客碎片*10', 'v' => 2000,'gift_id'=>89],
            ['id' => 13, 'name' => '金币*500', 'v' => 1000,'gift_id'=>101],
            ['id' => 14, 'name' => '皇冠长耳兔*1', 'v' => 200,'gift_id'=>345],//实物
            ['id' => 15, 'name' => '100元京东卡', 'v' => 150,'gift_id'=>344],//实物
            ['id' => 16, 'name' => '随机服装包', 'v' => 150,'gift_id'=>90],
            ];
    /**
     * 获取用户信息
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        //用户游戏中是否领取礼包
        $user = FwyUserModel::find()->where('phone = :phone', [':phone' => Cms::getSession('login_fwy_phone')])->asArray()->one();
        $user['is_yuyue']= $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => Cms::getSession('login_fwy_phone'), ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
        if($user['gift_code_id']){
            $gift_code_id=trim($user['gift_code_id'],',');
            $user['gift_code_id']=explode(',',$gift_code_id);//查看礼包
        }
        if($user['gift_ids']){
            foreach (self::$prize_arr as $k => $v) {
                $gift_id[$v['gift_id']] = $v['id'];
            }
            $gift_ids=explode(',',trim($user['gift_ids'],','));
            $gift_ids_data=[];
            foreach ($gift_ids as $k){
                if (isset($gift_id[$k])) {
                    $re[]=$gift_id[$k];
                    $gift_ids_data=$re;
                }
            }
            $user['gift_ids']=$gift_ids_data;
        }
        $user['share_url'] = $this->_getInviteUrl().'code='.$user['me_invite_code'];
        $user['invite_code'] = Cms::getSession('invite_code');
        $user['data']=self::MyCode();
        if (!$user['invite_img']) {
            $userModel = FwyUserModel::findOne($user['id']);
            $img = Cms::qrcodeImg($this->_getInviteUrl() . 'code=' . $user['me_invite_code']);
            $userModel->invite_img = $img;
            $userModel->save();
            $user['invite_img'] = $img;
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $user]);
    }
    /**
     * 登陆发送验证码
     */
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误!']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在登陆《明日决胜！》官方网站账户。欢迎来到《明日决胜！》的奇幻世界，小伙伴们在这里等你到来哦！');
        $this->ajaxOutPut($res);
    }
    /**
     * 登陆
     */
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_fwy_phone', $phone);
            $user = FwyUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new FwyUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'code=' . $user->me_invite_code);
                $user->created_at = time();
                $user->save();
                $msg = $user->attributes;
            }
            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => Cms::getSession('login_fwy_phone'), ':website_id' => $this->website_id])->one();
            $msg['is_yuyue'] =0;
            if($user->created_at<strtotime(date('2018-5-24'))) {
                $user->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'code=' . $user->me_invite_code);
            }
            //是否已预约
            if($exist_phone){
                $model=FwyUserModel::find()->where(['phone'=>$phone])->andWhere(['like', 'gift_code_id', ',17,'])->one();
                if (!$model) {
                    if (!$user->gift_code_id) {
                        $user->gift_code_id = ',17,';
                    } else {
                        $user->gift_code_id = $user->gift_code_id . '17,';
                    }
                }
                $user->updated_at = time();
                $user->save();
                $msg = $user->attributes;
                $msg['is_yuyue'] =1;
            }
            $msg['data']=self::MyCode();
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_fwy_phone');
        $_POST['phone'] = $phone;
        $invite_code = Cms::getPostValue('invite_code');
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        $invite_model = FwyUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($invite_code) {//有邀请码
            $model = FwyUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
            if (!$model) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            //不能为自己的邀请码
            if ($invite_model && ($invite_code == $invite_model['me_invite_code'])) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            $invite_model->other_invite_code = (string)$invite_code;
            $invite_model->save();
//            $model->invite_count = $model->invite_count + 1;  //被用户抽奖+1
            $model->invite_num = $model->invite_num + 1;  //被用户邀请人数+1
            $model->save();
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);
        if($res['status']==0){
            if($invite_model->gift_code_id){
                $invite_model->gift_code_id = ',17,';
            } else {
                $invite_model->gift_code_id = $invite_model->gift_code_id.'17,';
            }
            $invite_model->invite_count = $invite_model->invite_count + 1;
            $invite_model->save();
        }
        $this->ajaxOutPut($res);
    }

    //邀请人数对应礼包
    public function actionInviteCode(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_fwy_phone');
        $gift_num=Cms::getPostValue('num');//前端礼包的序号
        $res=self::is_gift($gift_num,$phone);
        $this->ajaxOutPut($res);
    }

    //预约人数领礼包
    public function actionOrderCode(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_fwy_phone');
        $gift_num=Cms::getPostValue('num');//前端礼包的序号
        $res=self::is_gift($gift_num,$phone);
        $this->ajaxOutPut($res);
    }

    //抽奖
    public function actionAjaxDraw(){
        $this->_checkLogin();
        $phone = Cms::getSession('login_fwy_phone');
        $model = FwyUserModel::find()->where(['phone' => $phone])->one();
        if( $model->today_draw_count>=5){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'抽奖次数已超限！']);
        }
        if ($model->invite_count >0) {
            $arr = [];
            $name = [];
            $gift_id = [];
            foreach (self::$prize_arr as $k => $v) {
                $arr[$v['id']] = $v['v'];
                $name[$v['id']] = $v['name'];
                $gift_id[$v['id']] = $v['gift_id'];
                $award[$v['gift_id']] =$v['id'] ;
            }
            //去掉抽中的ID
            $is_gift=array_filter(array_merge(explode(',',$model->gift_ids)));
            foreach ($is_gift as $v){
                unset($award[$v]);
            }
            if(!$award){
                $this->ajaxOutPut(['status'=>-1,'msg'=>'抽奖次数异常！']);
            }
            //重新组装抽奖的二维码
            foreach ($award as $k){
                $arr_[$k]=$arr[$k];
            }

            $sw_count_one = FwyUserModel::find()->where(['like', 'gift_ids', ',345,'])->count();
            $sw_count_two = FwyUserModel::find()->where(['like', 'gift_ids', ',344,'])->count();
            if($sw_count_one>=20){
                unset($arr_[14]);
            }
            if($sw_count_two>=8){
                unset($arr_[15]);
            }
            $id = self::_getRand($arr_);
            if ($id==14 || $id==15) {    //实物
                $res = ['status' => 0, 'gift_id' => $id, 'is_repeat' => 0, 'msg' => '谢谢参与！', 'shiwu' => 1];
            }  else {
//                $gift_true_id=$gift_id[$id];
                $res = ['status' => 0, 'gift_id' => $id, 'is_repeat' => 0, 'msg' => '转盘成功', 'shiwu' => 0];
//                $res = Cms::getGiftNoYzm($phone, $gift_true_id, Cms::GIFT_IS_REPEAT);
            }
            //存放到数据库中
            $gift_true_id=$gift_id[$id];
            $gift_ids = trim($model->gift_ids, ',');
            $id_arr = explode(',', $gift_ids);//抽中的奖品ID
            if (!in_array($gift_true_id, $id_arr)) {
                if (!$model->gift_ids) {
                    $model->gift_ids = ','.$gift_true_id.',';
                } else {
                    $model->gift_ids = $model->gift_ids.$gift_true_id.',';
                }
            } else {
                $res['is_repeat'] = 1;
            }
            if($res['status']==0 && $res['is_repeat']==0){
                $model->today_draw_count = $model->today_draw_count + 1;
                $model->invite_count = $model->invite_count - 1;
                $model->draw_time = time();
                $model->save();
//                $gift_code['status'] = $res['status'];
                $res['is_address'] = 0;
                if (($id == 14||$id == 15) && (!empty($model->name) || !empty($model->address) || !empty($model->tel))) {//是否完善了收货地址 0 未完善 1 已完善
                    $gift_code['is_address'] = 1;
                }
//                else{
//                    $gift_code['code']=$res['msg'];
//                }
//                $gift_code['gift_id'] =$id;
                $res['invite_count'] = $model->invite_count;//抽奖剩余次数
                $this->ajaxOutPut($res);
            }else{
                $this->ajaxOutPut($res);
            }

        }
        $this->ajaxOutPut(['status' => -1, 'msg' => '暂无抽奖机会！']);

    }

    //查看我的礼包
    public function MyCode(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_fwy_phone');
        $user=FwyUserModel::find()->where(['phone'=>$phone])->asArray()->one();
        $gift_code_id=array_filter(explode(',',trim($user['gift_code_id'])));
        $gift_code_sw=array_filter(explode(',',trim($user['gift_ids'])));
        $game_gift_id=array_filter(explode(',',trim($user['game_gift_id'])));
        $status=[1,2,3,4];//1待领取  2已达标 3未达标 4 已领取
        $data=[];
        $gift_id=[];
        foreach (self::$prize_arr as $k => $v) {
            $gift_id[$v['id']] = $v['gift_id'];
        }
        foreach (self::$arr['A'] as $key){
            if(in_array($key,$game_gift_id)){
                $data[$key]=$status[3];
            } elseif(in_array($key,$gift_code_id)){
                $data[$key]=$status[0];
            }else{
                $invite_num=$user['invite_num'];//邀请人数 $key 对应礼包序号
                if($invite_num>=10  && $key==4){
                    $data[$key]=$status[1];
                }elseif($invite_num>=5 && $key==3){
                    $data[$key]=$status[1];
                }elseif($invite_num>=3 && $key==2){
                    $data[$key]=$status[1];
                }elseif($invite_num>=1 && $key==1){
                    $data[$key]=$status[1];
                }else{
                    $data[$key]=$status[2];
                }
            }
        }
        foreach (self::$arr['B'] as $key){
            if(in_array($key,$game_gift_id)){
                $data[$key]=$status[3];
            } elseif(in_array($key,$gift_code_id)){
                $data[$key]=$status[0];
            }else{
                //预约的人数
                $count = Stat::find()->where(['name' => 'fwy_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->asArray()->one();
                if($count['count']>=500000&& $key==9){
                    $data[$key]=$status[1];
                }elseif($count['count']>=100000&& $key==8){
                    $data[$key]=$status[1];
                }elseif($count['count']>=50000&& $key==7){
                    $data[$key]=$status[1];
                }elseif($count['count']>=10000&& $key==6){
                    $data[$key]=$status[1];
                }elseif($count['count']>=5000&& $key==5){
                    $data[$key]=$status[1];
                }else{
                    $data[$key]=$status[2];
                }
            }
        }
        foreach (self::$arr['D'] as $key){
            $key_id=$gift_id[$key];
            if(in_array($key,$game_gift_id)){
                $data[$key]=$status[3];
            } elseif(in_array($key_id,$gift_code_sw)){
                $data[$key]=$status[0];
            }else{
                $data[$key]=$status[2];
            }
        }
        return $data;
    }


    //存储 用户点击的邀请人数 预约人数礼包
    public function is_gift($id,$phone){
        $model=FwyUserModel::find()->where(['phone'=>$phone])->andWhere(['like', 'gift_code_id', ','.$id.','])->one();
        if($model){
          $res=['status'=>-1,'msg'=>'已领取过！'];
        }else{
            $model=FwyUserModel::find()->where(['phone'=>$phone])->one();
            if(in_array($id,self::$arr['A'])){
                $model->invite_count=$model->invite_count+1;
            }
            $gift_id = trim($model->gift_code_id, ',');
            $id_arr = explode(',', $gift_id);
            if (!in_array($id, $id_arr)) {
                if (!$model->gift_code_id) {
                    $model->gift_code_id = ','.$id.',';
                } else {
                    $model->gift_code_id = $model->gift_code_id.$id.',';
                }
            }else{
                $model->gift_code_id = ','.$id.',';
            }
            $model->save();
            $res=['status'=>0,'msg'=>'成功','is_repeat'=>0];
        }
        return $res;
    }


    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private function _getRand($proArr) {
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
     * 监测登陆
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_fwy_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登陆！']);
        }
    }

    /**
     * 注销登陆
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_fwy_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_fwy_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://fwy.dev.yingxiong.com/m?";
        } else if (YII_DEMO) {
            return "http://fwy.demo.yingxiong.com/m?";
        } else {
            return "http://mrjs.zhengyuetech.com/m?";
        }

    }

    /**
     * 填写收货地址
     **/
    public function actionAjaxAddress(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_fwy_phone');
        $model=FwyUserModel::find()->where(['phone'=>$phone])->one();
        $name=Cms::getPostValue('name');
        $code=Cms::getPostValue('code');
        $address=Cms::getPostValue('address');
        $tel=Cms::getPostValue('tel');
        $file = trie_filter_load('words.dic');
        $search_name = trie_filter_search_all($file, $name);  // 一次把所有的敏感词都检测出来
        $search_address = trie_filter_search_all($file, $address);  // 一次把所有的敏感词都检测出来
        if (!empty($search_name)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '收货姓名含有敏感词，请重新编辑！']);
        }
        if (!empty($search_address)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址含有敏感词，请重新编辑！']);
        }
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
     * 旧 cover 页中的接口，已经废弃
     * 一键领取接口游戏中接口
     */
    public function actionAjaxProp(){
        $item_gift=[1=>1,2=>2,3=>3,4=>4,5=>5,6=>6,7=>7,8=>8,9=>9,11=>10,12=>11,13=>12,14=>13,15=>16,];//道具id对应的礼包id
        $phone=Cms::getSession('login_fwy_phone');
        $user=FwyUserModel::find()->where(['phone'=>$phone])->one();
        //预约
        $is_yuyue=GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => $phone, ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
        $gift_code_=array_filter(explode(',',$user['gift_code_id']));//用户待领取ID(非转盘礼包)
        $gift_code_sw=array_filter(explode(',',$user['gift_ids']));//转盘礼包(非转换的礼包ID)
        $draw_gift_code=array_filter(explode(',',$user['game_gift_id']));//已经在游戏中领取的礼包ID
        $gift_code=[];
        $gift_prop_=[];//道具ID组
        if($gift_code_sw) {
            if (in_array('91',$gift_code_sw) || in_array('100',$gift_code_sw))$gift_code_sw=array_diff($gift_code_sw,[91,100]);//移除实物
            foreach (self::$prize_arr as $k => $v) {
                if (in_array($v['gift_id'], $gift_code_sw)) {
                    $gift_code[] = $v['id'];
                }
            }
        }
        //所有的礼包ID
        $gift_codes=array_merge($gift_code_,$gift_code);

        foreach ($item_gift as $i_k=>$i_v){
             if(in_array($i_v,$gift_codes)){
                $gift_prop_[]=$i_k;
             }
        }
        $gift_prop_=array_merge(array_diff($gift_prop_,$draw_gift_code),array_diff($draw_gift_code,$gift_prop_));
        $gift_prop=GiftPropModel::findAll(['website_id'=>$this->website_id]);//后台配置的道具数据
        $item=[];
        //预约对应的道具礼包
        if($is_yuyue){
            $gift_prop_=array_merge($gift_prop_,[10]);
        }

        foreach ($gift_prop as $k){
            if(in_array($k->id,$gift_prop_)) {
                if($k->prop_id) {
                    $re['propid'] = $k->prop_id;
                    $re['pronum'] = $k->prop_num;
                    $re['dateline'] = $k->end_time;
                    $item[] = $re;
                }
            }
        }
        //通过手机号码获取用户在游戏中的基本信息
        $user_info_url='http://sdk-api.zhengyuetech.com/sdksrv/c1/extra/query/phone.lg';
        $data=['tel'=>$phone];
        $result=Utils::sendHttpRequest($user_info_url,$data,'POST');
        $count = json_decode($result['content'], true);
        if($count['codes']==0) {
            //数据库中查询
            $user_id =$count['uid'];
            $dbName = 'db_fwy';
            $category = \Yii::$app->$dbName->createCommand('select `roleid`,`serverid`,`gamechannel` from createrole where `username`='.$user_id.' and `gamechannel` = 75 and `registertime`>"2018-09-06"' )->queryOne();
            if ($category) {
                $data=ProvideController::provide($category,$item); //给用户邮箱发送礼包
                if($data['code']==0){
                     $user->game_gift_id=implode(",",$gift_codes);
                     $user->save();
                    $this->ajaxOutPut(['status'=>0,'msg'=>'发送礼包到游戏邮箱中成功！']);
                }else{
                    $this->ajaxOutPut(['status'=>-1,'msg'=>'发送失败！']);
                }
            }else{
                $this->ajaxOutPut(['status'=>-1,'msg'=>'该手机号码未绑定游戏账户，请前去登陆游戏绑定手机号码吧！']);
            }
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'该手机号码未绑定游戏账户，请前去登陆游戏绑定手机号码吧！']);
        }
    }


    /**
 * 分享窗口
 */
    public function actionAjaxShare(){
//        $this->_checkLogin();
        $phone=Cms::getSession('login_fwy_phone');
        $invite=FwyUserModel::find()->select('invite_img')->where(['phone'=>$phone])->asArray()->one();
        if($invite) {
            $invite_img=$invite['invite_img'];
        }else {
            $invite_img = '';
        }
        return $this->renderPartial('ajax_share.html',['invite_img'=>$invite_img]);
    }

    //测试接口数据
    public function actionMyTest(){
        $res = ApiCommonSign::decryptSign('e3JnYW1laWliOjI2LCgwdGVtSW5mbyI6WysicHJvcGQkIjoiMzJpNDYiLCJwcm9udW0iOjEsImRhdGVsaW5lIjowfSx7InByb3BpZCI6IjM4MDQ3IiwicHJvbnVtIjoxLCJkYXRlbGluZSI6MH0seyJwcm9waWQiOiIzODA0OCIsInByb251bSI6MSwiZGF0ZWxpbmUiOjB9LHsicHJvcGlkIjoiMzgwNDkiLCJwcm9udW0iOjEsImRhdGVsaW5lIjowfV0sIm1haWxDb250ZW50IjoiXHU0ZWIyXHU3MjMxXHU3Njg0XHU3M2E5XHU1YmI2XHU2NzBiXHU1M2NiXHVmZjBjXHU2MjExXHU2NjJmXHU4NjExXHU4M2M3XHU1YzBmXHU1OWQwXHU1OWQwXHVmZjBjXHU2MTFmXHU4YzIyXHU2MGE4XHU5ODg0XHU3ZWE2XHUzMDBhXHU2NjBlXHU2NWU1XHU1MWIzXHU4MGRjXHVmZjAxXHUzMDBiXHU2MjRiXHU2ZTM4XHVmZjBjXHU2NTM2XHU0ZTBiXHU2MGE4XHU3Njg0XHU5ODg0XHU3ZWE2XHU3OThmXHU1MjI5LFx1NGUwMFx1OGQ3N1x1Njc2NVx1NjNhMlx1N2QyMlx1N2YyNFx1N2ViN1x1NzY4NFx1NGUxNlx1NzU0Y1x1ZmYwMSIsIm1haWxUaXRsZSI6Ilx1ODYxMVx1ODNjN1x1NWMwZlx1NTlkMFx1NTlkMFx1NzY4NFx1NjExZlx1OGMyMlx1NGZlMSIsIm9yaWdpbiI6MTAwMDA1LCJyb2xlaWQiOiI3OTc0NTEiLCJzZXJ2ZXJpZCI6IjEifQ');
        pr($res, 1);

        $phone=13917296180;
        //通过手机号码获取用户在游戏中的基本信息
        $user_info_url='http://sdk-api.zhengyuetech.com/sdksrv/c1/extra/query/phone.lg';
        $data=['tel'=>$phone];
        $result=Utils::sendHttpRequest($user_info_url,$data,'POST');
        $count = json_decode($result['content'], true);

        //数据库中查询

        $re['propid'] = 3;
        $re['pronum'] = 1;
        $re['dateline'] = time();

        $item[]=$re;
        $user_id =38;
        $dbName = 'db_fwy';
//        echo 'select `roleid`,`serverid`,`gamechannel` from createrole where `username`='.$user_id.' and `registertime`>"2018-09-06"';exit;
        $category = \Yii::$app->$dbName->createCommand('select `roleid`,`serverid`,`gamechannel` from createrole where `username`='.$user_id.' and `gamechannel` = 75 and `registertime`>"2018-09-06"' )->queryOne();
        pr($category);
        $category = ['serverid' => 1, 'roleid' => 380531];
        if ($category) {
            $data=ProvideController::provide($category,$item); //给用户邮箱发送礼包
            pr($data,1);
        }

//       $_POST['phone']='15181808256';
//       $this->actionAjaxLoginVerify();
//        $_POST['phone']='15181808256';
//        $_POST['yzm']=282592;
//      $this->actionAjaxLogin();

//        $_POST['phone']='15181808256';
//        $_POST['type']='ios';
//        $this->actionAjaxYuyue();
//        $_POST['phone']='15181808256';
//        $_POST['num']=1;
//        $this->actionAjaxGetUser();
//    $this->actionAjaxProp();
//    $this->actionAjaxDraw();

        //注销
//        $this->actionAjaxLoginOut();
        exit;
    }

    /**********************新 cover 页**********************************************/

    /**
     * 新cover登陆
     */
    public function actionLoginNew()
    {
        $phone = Cms::getPostValue('phone');
        $channelName = Cms::getSession('channel_name');
        $res = Cms::loginProcess($this->website_id, $phone, $this->userData, 'login_phone', Cms::YUYUE_SCENE_OLD, $channelName);
        if ($res['status'] == 0) {
            $this->_setGiftIdStatus($res['msg']['data']);
        }
        if ($res['msg'] && isset($res['msg']['openid']) && $res['msg']['openid']) {
            $info = [
                'username' => $res['msg']['username'],
                'thirdNickName' => $res['msg']['nickname'],
                'access_token' => $res['msg']['access_token'],
                'avatar' => $res['msg']['avatar'],
                'openid' => $res['msg']['openid'],
            ];
            Cms::setSession(Cms::SESSION_LOGIN_THIRD, $info);
            Cms::setSession(Cms::SESSION_LOGIN_METHOD, $res['msg']['method']);
        } else {
            Cms::setSession(Cms::SESSION_LOGIN_METHOD, 'phone');
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 新cover注销登陆
     */
    public function actionLogoutNew()
    {
        $res = Cms::loginProcessLogout();
        Cms::setSession(Cms::SESSION_LOGIN_METHOD, '');
        Cms::setSession(self::SESSION_LOGIN_THIRD, '');
        $this->ajaxOutPut($res);
    }

    /**
     * 获取用户信息
     * @return array
     */
    public function actionGetUserInfoNew()
    {
        $channelName = Cms::getSession('channel_name');
        if (!Cms::getSession(Cms::SESSION_LOGIN_METHOD)){
            $res = ['status' => -1, 'msg' => '请登陆！'];
        } elseif (Cms::getSession(Cms::SESSION_LOGIN_METHOD) == 'phone') {
            $res = Cms::loginProcessGetUserInfo($this->website_id, $this->userData, 'login_phone', '', $channelName);
        } else {    // 第三方登陆
            $res = $this->_getThirdLoginInfo();
        }

        $res['is_show_captcha'] = Cms::existsCaptchaUuidLog($this->website_id);
        if ($res['status'] == 0) {
            $this->_setGiftIdStatus($res['msg']['data']);
        }
        list($qqLoginUrl, $wechatLoginUrl) = $this->_getThirdLoginUrl();
        $res['qqLoginUrl'] = $qqLoginUrl;
        $res['wechatLoginUrl'] = $wechatLoginUrl;
        $res['loginMethod'] = Cms::getSession(Cms::SESSION_LOGIN_METHOD);
        $this->ajaxOutPut($res);
    }

    /**
     * 预约人数礼包状态
     * @param $data
     */
    private function _setGiftIdStatus(&$data)
    {
        $data['game_gift_id'] = isset($data['game_gift_id']) ? $data['game_gift_id'] : [];

        $yuyueNumGiftStatus = [];
        $yuyue = YuyueStatModel::getYuyue($this->website_id, 'fwy_total');
        foreach ($this->yuyueNumGifts as $k => $v) {
            // 预约人数小于预约礼包领取条件
            if ($yuyue['count'] < $v) {
                $yuyueNumGiftStatus[$k] = self::YUYUE_NUM_STATUS_UNFINISHED;
            } elseif (in_array($k, $data['game_gift_id'])) {    // 已经领取到游戏
                $yuyueNumGiftStatus[$k] = self::YUYUE_NUM_STATUS_IS_GET;
            } else {    // 未领取到游戏
                $yuyueNumGiftStatus[$k] = self::YUYUE_NUM_STATUS_NO_GET;
            }
        }
        $data['gift_id_status'] = $yuyueNumGiftStatus;
    }

    /**
     * 新cover 预约获取礼包 并且旧cover抽奖次数+1
     */
    public function actionYuyueNew()
    {
        $channelName = Cms::getSession('channel_name');
        if (Cms::getSession(Cms::SESSION_LOGIN_METHOD) == 'phone') {
            $res = Cms::loginProcessYuyue($this->website_id, self::GIFT_ID_NEW, 'login_phone', Cms::YUYUE_SCENE_OLD, $channelName);
        } else {    // 第三方预约
            $res = $this->_thirdYuyue(self::GIFT_ID_NEW);
        }

        $this->ajaxOutPut($res);
    }

    /**
     * 新 cover 页，预约人数达标礼包领取
     */
//    public function actionGetYuyueNumGiftNew()
//    {
//        $checkLogin = Cms::loginProcessCheckLogin();
//        if ($checkLogin['status'] != 0) {
//            $this->ajaxOutPut($checkLogin);
//        }
//        $giftId = Cms::getPostValue('gift_id');
//        if (!$giftId) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '礼包序号不能为空']);
//        }
//        if (!key_exists($giftId, $this->yuyueNumGifts)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '礼包序号不存在']);
//        }
//        $yuyue = YuyueStatModel::getYuyue($this->website_id, 'fwy_total');
//        if ($yuyue['count'] < $this->yuyueNumGifts[$giftId]) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '还未达到领取条件']);
//        }
//        $loginPhone = Cms::getSession('login_phone');
//
//        $user = UserCenter::getUserInfo($this->website_id, $loginPhone);
//        $userData = UserCenterData::getData($this->website_id, $user['id']);
//        $data = $userData['data'];
//
//        if (!isset($data['gift_code_id'])) {
//            $data['gift_code_id'] = [];
//        } elseif (in_array($giftId, $data['gift_code_id'])) {   // 重复领取
//            $this->ajaxOutPut(['status' => 0, 'msg' => '已经领取，请勿重复领取']);
//        }
//        $data['gift_code_id'][] = $giftId;
//        UserCenterData::setData($this->website_id, $user['id'], $data);
//        $this->ajaxOutPut(['status' => 0, 'msg' => '领取成功']);
//    }

    /**
     * 一键领取接口游戏中接口
     */
    public function actionGetPropNew(){
        $checkLogin = Cms::loginProcessCheckLogin();
        if ($checkLogin['status'] != 0) {
            $this->ajaxOutPut($checkLogin);
        }

        $itemGift = [5 => 5, 6 => 6, 7 => 7, 8 => 8, 9 => 9];//道具id对应的礼包id

        $phone = Cms::getSession('login_phone');
        $user = UserCenter::getUserInfo($this->website_id, $phone);
        $userData = UserCenterData::getData($this->website_id, $user['id']);
        $data = $userData['data'];

        $this->_setGiftIdStatus($data);
        //用户待领取ID
        $giftCodes = [];
        if ($data['gift_id_status'] && !empty($data['gift_id_status'])) {
            foreach ($data['gift_id_status'] as $k => $v) {
                if ($v == self::YUYUE_NUM_STATUS_NO_GET) {
                    $giftCodes[] = $k;
                }
            }
        }

        if (empty($giftCodes)) {
            $this->ajaxOutPut(['status' => -2, 'msg' => '已经全部领取到游戏，请勿重复领取']);
        }

        $data['game_gift_id'] = isset($data['game_gift_id']) ? $data['game_gift_id'] : [];

        //已经领取到游戏中的礼包ID
        $gameGiftId = array_filter($data['game_gift_id']);

        $giftProp_ = []; //道具ID组

        foreach ($itemGift as $k => $v){
            if(in_array($v, $giftCodes)){
                $giftProp_[] = $k;
            }
        }
//        pr($giftProp_, 1);

        $giftProp_ = array_diff($giftProp_, $gameGiftId);
        $giftProp = GiftPropModel::findAll(['website_id'=>$this->website_id]);//后台配置的道具数据
        $item=[];

        foreach ($giftProp as $k){
            if(in_array($k->id, $giftProp_)) {
                if($k->prop_id) {
                    $re['propid'] = $k->prop_id;
                    $re['pronum'] = $k->prop_num;
                    $re['dateline'] = $k->end_time;
                    $item[] = $re;
                }
            }
        }

        //通过手机号码获取用户在游戏中的基本信息
        $userInfoUrl = 'http://sdk-api.zhengyuetech.com/sdksrv/c1/extra/query/phone.lg';
        $params = ['tel' => $phone];
        $result = Utils::sendHttpRequest($userInfoUrl, $params, 'POST');
        $count = json_decode($result['content'], true);

        // todo 测试
//        $count['codes'] = 0;
//        $count['uid'] = 111;
        // end

        if($count['codes']==0) {
            //数据库中查询
            $uid = $count['uid'];
            $dbName = 'db_fwy';
            $category = \Yii::$app->$dbName->createCommand('select `roleid`,`serverid`,`gamechannel` from createrole where `username`='.$uid.' and `gamechannel` = 75 and `registertime`>"2018-09-06"' )->queryOne();

            // todo 测试 start
//            $category = 1;
            // end

            if ($category) {
                $lockKey = 'cover_get_prop';
                $lock = Cms::checkLock($this->website_id, $lockKey, $phone);
                if (!$lock) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '操作频繁，请稍后再试']);
                }
                $res = ProvideController::provide($category,$item); //给用户邮箱发送礼包

                // todo 测试 start
//                $res['code'] = 0;
                //end

                if($res['code'] == 0){
                    // 更新已经领取到游戏中的礼包
                    $data['game_gift_id'] = array_merge($data['game_gift_id'], $giftCodes);
                    UserCenterData::setData($this->website_id, $user['id'], $data);
                    Cms::clearLock($this->website_id, $lockKey, $phone);
                    $this->ajaxOutPut(['status'=>0,'msg'=>'发送礼包到游戏邮箱中成功！']);
                }else{
                    Cms::clearLock($this->website_id, $lockKey, $phone);
                    $this->ajaxOutPut(['status'=>-1,'msg'=>'发送失败！']);
                }
            }else{
                $this->ajaxOutPut(['status'=>-1,'msg'=>'该手机号码未绑定游戏账户，请前去登陆游戏绑定手机号码吧！']);
            }
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'该手机号码未绑定游戏账户，请前去登陆游戏绑定手机号码吧！']);
        }
    }

    /**
     * tap 渠道 统计
     */
    public function actionTapStat()
    {
        $ip = Cms::getClientIp();
        $type = Cms::getClientType();
        $type = $type ? $type : 1;
        FwyTapStat::addLog($ip, $type);
        header("Location:https://www.taptap.com/app/52292");
    }

    /**
     * 导出
     */
    public function actionExportTapStat()
    {
        $secret = Cms::getGetValue('secret');
        if (!$secret || $secret != 'zroKfDkj') {
            echo '非法操作';exit;
        }
        $data = FwyTapStat::getLog();
        foreach ($data as &$v) {
            $v['type'] = $v['type'] == 1 ? 'ios' : 'android';
            $v['created_at'] = date('Y-m-d H:i:s', $v['created_at']);
        }
        $header = array('Ip', '设备', '时间');
        $fields = ['ip', 'type', 'created_at'];
        $filename = 'tap统计';
        Cms::export($header, $data, $fields, $filename);
    }

    /**********第三方 qq wechat 登陆 start*************/
    /**
     * qq 登陆
     */
    public function actionQqLogin()
    {
        Cms::setSession(Cms::SESSION_LOGIN_METHOD, 'qq');
        $res = $this->_thirdLogin();
    }

    /**
     * 微信登陆
     */
    public function actionWechatLogin()
    {
        Cms::setSession(Cms::SESSION_LOGIN_METHOD, 'wechat');
        $res = $this->_thirdLogin();
    }

    /**
     * 第三方登陆获取登陆信息
     * @return array
     */
    private function _getThirdLoginInfo()
    {
        $info = Cms::getSession(self::SESSION_LOGIN_THIRD);
        if (!$info || !isset($info['openid']) || !$info['openid']) {
            return ['status' => -1, 'msg' => '请登陆'];
        }
        $res = $this->_checkThirdInfo($info);
        $res['name'] = $info['thirdNickName'];
        $res['access_token'] = $info['access_token'];
        return $res;
    }

    /**
     * 第三方登陆
     * @return array
     */
    private function _thirdLogin()
    {
        $info = json_decode($_GET['userinfo'], true);
        if (!$info || !isset($info['openid']) || !$info['openid']) {
            return ['status' => -1, 'msg' => '授权失败'];
        }
        Cms::setSession(self::SESSION_LOGIN_THIRD, $info);
        header('Location:/');
    }

    /**
     * 获取信息
     * @param $info
     * @return array
     */
    private function _checkThirdInfo($info)
    {
        $user = UserCenter::getUserInfo($this->website_id, '', '', '', true, $info['openid']);
        if ($user) {
            // 未绑定手机
            if (!$user['phone']) {
                return ['status' => 1, 'msg' => '请先绑定手机'];
            }
            // 直接登陆成功
            $user['data'] = UserCenterData::getUserData($this->website_id, $user['id']);
            //如果是分官网
            if ($this->channelName) {
                $channelKey = 'is_yuyue_'.$this->channelName;
                $user['data']['is_yuyue'] = isset($user['data'][$channelKey]) ? $user['data'][$channelKey] : 0;
            }
            $user['data'] = array_merge($this->userData, $user['data']);
            Cms::setSession(self::SESSION_LOGIN_PHONE, $user['phone']);
            return ['status' => 0, 'msg' => $user];
        } else {    // 新用户先绑定手机
            return ['status' => 1, 'msg' => '请先绑定手机'];
        }
    }

    /**
     * 绑定手机号
     */
    public function actionBindPhone()
    {
        $this->_bindPhone();
    }

    /**
     * 换绑
     */
    public function actionChangeBindPhone()
    {
        $this->_bindPhone(true);
    }

    public function _bindPhone($changeBind = false)
    {
        $info = Cms::getSession(self::SESSION_LOGIN_THIRD);
        if (!$info || !isset($info['openid']) || !$info['openid']) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '授权失败']);
        }

        $phone = Cms::getPostValue('phone');
        $res = Cms::bindPhone($this->website_id, $phone, $changeBind);
        if ($res['status'] != 0) {
            $this->ajaxOutPut($res);
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => '绑定成功']);
    }

    /**
     * 第三方登陆预约
     * @param $giftId
     * @return array
     */
    private function _thirdYuyue($giftId)
    {
        $info = Cms::getSession(self::SESSION_LOGIN_THIRD);
        if (!$info || !isset($info['openid']) || !$info['openid']) {
            return ['status' => -1, 'msg' => '请登陆'];
        }
        if (!$giftId) {
            return ['status' => -1, 'msg' => '参数错误'];
        }

        $res = $this->_checkThirdInfo($info);
        if ($res['status'] != 0) {
            return $res;
        }

        $data = $res['msg']['data'];
        $phone = $res['msg']['phone'];
        $userId = $res['msg']['id'];
        if (isset($data['is_yuyue']) && $data['is_yuyue']) {
            return ['status' => -1, 'msg' => '您已经预约，请勿重复预约'];
        }
        $_POST['phone'] = $phone;
        $res = Cms::yuyue(1, Cms::YUYUE_SCENE_OLD, 0, $this->channelName);
        if ($res['status'] == 0) {
            $res = GiftCode::getUserGiftCode($this->website_id, $giftId, $phone);
            if ($this->channelName) {
                $channelKey = 'is_yuyue_'.$this->channelName;
                $data[$channelKey] = 1;
            } else {
                $data['is_yuyue'] = 1;
            }

            if (!$res) {
                UserCenterData::setData($this->website_id, $userId, $data);
                return ['status' => 1, 'msg' => '礼包码已经领取完'];
            } else {
                $data['gift_code'] = $res;
            }
            UserCenterData::setData($this->website_id, $userId, $data);
            return ['status' => 0, 'msg' => $res];
        }
        if (isset($res['is_repeat']) && $res['is_repeat'] == Cms::GIFT_CODE_REPEAT) {
            if ($this->channelName) {
                $channelKey = 'is_yuyue_'.$this->channelName;
                $data[$channelKey] = 1;
            } else {
                $data['is_yuyue'] = 1;
            }
            UserCenterData::setData($this->website_id, $userId, $data);
        }
        return $res;
    }

    public function actionUnbindTest()
    {
        // todo 测试 解绑手机
        $accessToken = Cms::getGetValue('accessToken');
        $pass = Cms::getGetValue('pass');
        if (!$accessToken) {
            $this->ajaxOutPut(['status' => -1, 'msg' => 'token 不能为空']);
        }
        if ($pass != 'hezn23an') {
            $this->ajaxOutPut(['status' => -1, 'msg' => '非法操作']);
        }
        $res = Api::unbindPhone($this->website_id, $accessToken);
        $this->ajaxOutPut($res);
    }

    private function _getThirdLoginUrl()
    {
        if (isset($_SERVER['REQUEST_SCHEME']) && $_SERVER['REQUEST_SCHEME'] == 'https') {
            $scheme = 'https';
        } else {
            $scheme = 'http';
        }
        if (YII_DEV) {
            $qqUrl = 'http://pass.zhengyuetech.com/site/waplogin?type=qq&callback='.$scheme.'://fwy.dev.yingxiong.com/site/qq-login.html';
            $wechatUrl = 'http://pass.zhengyuetech.com/site/waplogin?type=wechat&callback='.$scheme.'://fwy.dev.yingxiong.com/site/qq-login.html';
        } elseif (YII_DEMO) {
            $qqUrl = 'http://pass.zhengyuetech.com/site/waplogin?type=qq&callback='.$scheme.'://fwy.demo.zhengyuetech.com/site/qq-login.html';
            $wechatUrl = 'http://pass.zhengyuetech.com/site/waplogin?type=wechat&callback='.$scheme.'://fwy.demo.zhengyuetech.com/site/qq-login.html';
        } else {
            $qqUrl = 'http://pass.zhengyuetech.com/site/waplogin?type=qq&callback='.$scheme.'://mrjs.zhengyuetech.com/site/qq-login.html';
            $wechatUrl = 'http://pass.zhengyuetech.com/site/waplogin?type=wechat&callback='.$scheme.'://mrjs.zhengyuetech.com/site/qq-login.html';
        }
        return [$qqUrl, $wechatUrl];
    }

    /**********第三方 qq wechat 登陆 end*************/
}

