<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\RwUserModel;
use backend\controllers\YyStartController;
use common\Cms;
use common\components\PcController;
use common\models\GameSubscribe;
use common\models\VerifyCode;
use common\models\YuyueStatModel;
use yii\captcha\Captcha;

class SiteController extends PcController
{
    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('cover.html',['captcha_img'=>$captcha_img]);
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }

    public function actionExcel(){
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=add.xls");
        $data=VerifyCode::find()->select('id,phone,website_id,created_at')->where(['website_id'=>52])->andWhere(['status'=>0])->andWhere(['between', 'created_at',strtotime('2017-12-3 18:00'), strtotime('2017-12-4 9:30')])->all();
        if($data){
            foreach($data as $key=>$value){
                echo $value->id."\t";
                echo $value->phone."\t";
                echo $value->website_id."\t\n";
            }
        }
    }

    public function actionExcel_(){
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=all.xls");
        $data=VerifyCode::find()->select('id,phone,website_id,created_at')->where(['website_id'=>52])->andWhere(['status'=>0])->andWhere(['<','created_at',time()])->all();
        if($data){
            foreach($data as $key=>$value){
                echo $value->id."\t";
                echo $value->phone."\t";
                echo $value->website_id."\t\n";
            }
        }
    }


    /***********************************************************cover*************************************************/
    protected static $gift_code=[
        1,//预约礼包
        2,//50000人预约
        3,//10000人预约
        4,//200000人预约
        5,//500000人预约
        6,//分享1次
        7,//分享5次
        8,//分享10次
        9,//分享15次
        10,//邀请2人
        11,//邀请4人
        12,//邀请6人
        13,//1级材料宝箱
        14,//2级材料宝箱
        15,//钻石*588
        16,//绑钻*88
        17,//金币*888
        18,//金币*88
    ];
    public static  $prize_arr = [
        ['id' => 13, 'name' => '1级材料宝箱', 'v' => 800],
        ['id' => 14, 'name' => '2级材料宝箱', 'v' => 200],
        ['id' => 15, 'name' => '钻石*588', 'v' => 100],//特定了个数的
        ['id' => 16, 'name' => '绑钻*88', 'v' => 400],
        ['id' => 17, 'name' => '金币*888', 'v' => 800],
        ['id' => 18, 'name' => '金币*88', 'v' => 1800],
        ['id' => 19, 'name' => '抱枕', 'v' => 100],//实物
        ['id' => 20, 'name' => '腾讯视频会员卡', 'v' => 100],//实物
        ['id' => 21, 'name' => '再接再厉', 'v' => 5700],
    ];
    public static  $arr=[
        'A'=>[10,11,12],//邀请人礼包
        'B'=>[2,3,4,5],//预约人数礼包 17 为预约礼包
        'C'=>[6,7,8,9],//分享次数
        'D'=>[13,14,15,16,17,18,19,20],//抽奖礼包及实物
    ];


    //登录获取验证码接口
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误!']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《一起来热舞》预约活动登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    //登录接口
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_rw_phone', $phone);
            $user = RwUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new RwUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code);
                $user->created_at = time();
                $user->updated_at = time();
                $user->save();
            }
            $msg = $user->attributes;
            $scene=1;//预约首发环境
            $data=self::_myCode();
            $msg['data']=$data;
            $msg['is_yuyue']= $exist_phone = GameSubscribe::find()->where(['phone'=>$phone,'website_id'=>$this->website_id,'scene'=>$scene])->count();
            $msg['gift_code_id']=array_filter(explode(',',$msg['gift_code_id']));
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $yuyue = GameSubscribe::getUserByPhone($this->website_id, $phone, Cms::YUYUE_SCENE_NEW);
            $msg['is_yuyue'] = $yuyue['status'] == 1 && !empty($yuyue['msg']) ? 1 : 0;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }
    //用户信息接口
    public function actionAjaxGetUser(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $user=RwUserModel::find()->where(['phone'=>$phone])->asArray()->one();
        if($user) {
            unset($user['id']);
            $data=self::_myCode();
            $user['data']=$data;
            $user['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user['me_invite_code'];
            $user['data']=$data;

            $yuyue = GameSubscribe::getUserByPhone($this->website_id, $phone, Cms::YUYUE_SCENE_NEW);
            $user['is_yuyue'] = $yuyue['status'] == 1 && !empty($yuyue['msg']) ? 1 : 0;
            $this->ajaxOutPut(['status'=>0,'msg'=>$user]);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录!']);
    }
    //预约接口
    public function actionAjaxYyue(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $invite_code=Cms::getPostValue('invite_code');
        $user=RwUserModel::find()->where(['phone'=>$phone])->one();
        if($user){
            $gift_code_id=$user->gift_code_id;
           $res=self::_yuyue($phone,$invite_code);
           if($res['status']==0){
               if(strpos($gift_code_id,'1,')===false){
                   $user->gift_code_id = $user->gift_code_id.'1,';
               }
               $user->save();
           }
            $this->ajaxOutPut($res);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录']);
    }
    //分享接口
    public function actionAjaxShare(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $user=RwUserModel::find()->where(['phone'=>$phone])->one();
        if($user){
            if($user->share_time<=strtotime(date('Y-m-d'))){
                $user->share_time=time();
                $user->share_num=$user->share_num+1;
            }
            $user->save();
            $this->ajaxOutPut(['status'=>0,'msg'=>$user->share_num]);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录']);

    }

    //转盘抽奖接口
    public function actionAjaxDraw(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $user=RwUserModel::find()->where(['phone'=>$phone])->one();
        if($user){
            if($user->draw_num<=0){
                $this->ajaxOutPut(['status'=>-1,'msg'=>'暂无抽奖机会']);
            }
            $pro=[];
            $arr=[];
            foreach (self::$prize_arr as $k=>$v){
                $pro[$v['id']]=$v['v'];
                $arr[$v['id']]=$v['name'];
            }
            //实物个数超限的去掉 19=80 20=150 15=100
            $bz_num=RwUserModel::find()->where(['like','gift_ids','19,'])->andWhere(['>=','draw_time',date('Y-m')])->count();
            $txk_num=RwUserModel::find()->where(['like','gift_ids','20,'])->andWhere(['>=','draw_time',date('Y-m')])->count();
            //每个月抽中的数据量
            $zs_num=RwUserModel::find()->where(['like','gift_ids','15,'])->andWhere(['>=','draw_time_zs',date('Y-m')])->count();

            if($bz_num>=80 || strpos($user->gift_ids,'19,')!==false){
                unset($pro[19]);
            }
            if($txk_num>=150 || strpos($user->gift_ids,'20,')!==false){
                unset($pro[20]);
            }
            if($zs_num>=150){
                unset($pro[15]);
            }
            $id=self::_getRand($pro);
            if($id!=21){
                if($id==19 || $id==20){
                    if(strpos($user->gift_ids,"$id,")===false){
                        $user->gift_ids = $user->gift_ids."$id,";
                    }
                }elseif($id==15){
                    if (strpos($user->gift_code_id, "$id,") === false) {
                        $user->gift_code_id = $user->gift_code_id . "$id,";
                        $user->draw_time_zs = time();
                    }
                }else {
                     $user->gift_code_id = $user->gift_code_id . "$id,";
                }
            }
            $user->draw_num=$user->draw_num-1;
            $user->draw_count=$user->draw_count+1;
            $user->today_draw_count=$user->today_draw_count+1;
            $user->draw_time=time();
            $user->save();
            $this->ajaxOutPut(['status'=>0,'msg'=>'success','draw_num'=>$user->draw_num,'gift_id'=>$id]);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'网络错误，检查到您未登录！']);

    }

    //所有领取礼包
    public function actionAjaxReceive(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $type=Cms::getPostValue('type',3);//1 预约人数 2 邀请人数 3 分享次数
        $key=Cms::getPostValue('key');//人数对应礼包ID 10 11 12
        $user=RwUserModel::find()->where(['phone'=>$phone])->one();
        if($user){
            $gift_code_id=$user->gift_code_id;
            if($type==1){
                $count=YuyueStatModel::find()->select(['count'])->where(['name'=>'rw_total'])->asArray()->one();
                $count=$count['count'];
                if($count>=500000 && $key==5){
                    if(strpos($gift_code_id,'5,')===false){
                        $user->gift_code_id = $user->gift_code_id.'5,';
                    }
                }elseif($count>=200000 && $key==4){
                    if(strpos($gift_code_id,'4,')===false){
                        $user->gift_code_id = $user->gift_code_id.'4,';
                    }

                }elseif($count>=100000 && $key==3){
                    if(strpos($gift_code_id,'3,')===false){
                        $user->gift_code_id = $user->gift_code_id.'3,';
                    }
                }elseif($count>=50000 && $key==2){
                    if(strpos($gift_code_id,'2,')===false){
                        $user->gift_code_id = $user->gift_code_id.'2,';
                    }
                }else{
                    $this->ajaxOutPut(['status'=>-1,'msg'=>'请选择可领取的礼包！']);
                }

            }elseif($type==2) {
                $invite_num=$user->invite_num;
                if($invite_num>=6 && $key==12){
                    if(strpos($gift_code_id,'12,')===false){
                        $user->gift_code_id = $user->gift_code_id.'12,';
                    }
                }elseif($invite_num>=4 && $key==11){
                    if(strpos($gift_code_id,'11,')===false){
                        $user->gift_code_id = $user->gift_code_id.'11,';
                    }

                }elseif($invite_num>=2 && $key==10){
                    if(strpos($gift_code_id,'10,')===false){
                        $user->gift_code_id = $user->gift_code_id.'10,';
                    }
                }else{
                    $this->ajaxOutPut(['status'=>-1,'msg'=>'未达标或者请选择正确的礼包']);
                }
            }else{
              $share_num=$user->share_num;
              if($share_num>=15 && $key==9){
                  if(strpos($gift_code_id,'9,')===false){
                      $user->gift_code_id = $user->gift_code_id.'9,';
                  }
              } elseif($share_num>=10 && $key==8)  {
                  if(strpos($gift_code_id,'8,')===false){
                      $user->gift_code_id = $user->gift_code_id.'8,';
                  }
              }elseif($share_num>=5 && $key==7)  {
                  if(strpos($gift_code_id,'7,')===false){
                      $user->gift_code_id = $user->gift_code_id.'7,';
                  }
              }elseif($share_num>=1 && $key==6)  {
                  if(strpos($gift_code_id,'6,')===false){
                      $user->gift_code_id = $user->gift_code_id.'6,';
                  }
              }else{
                  $this->ajaxOutPut(['status'=>-1,'msg'=>'未达标或者请选择正确的礼包']);
              }
            }
            $user->save();
            $this->ajaxOutPut(['status'=>0,'msg'=>'领取成功!']);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录!']);


    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_rw_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_rw_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' =>$msg]);
    }

    //查看我的礼包
    public function _myCode(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $user=RwUserModel::find()->where(['phone'=>$phone])->asArray()->one();
        $gift_code_id=array_filter(explode(',',trim($user['gift_code_id'])));
        $gift_code_sw=array_filter(explode(',',trim($user['gift_ids'])));
        $status=[1,2,3,4];//1待领取  2已达标 3未达标 4 已领取
        $data=[];
        $is_yuyue=GameSubscribe::find()->where(['phone'=>$phone,'website_id'=>$this->website_id,'scene'=>1])->count();
        if($is_yuyue){
            $data[1]=4;
        }
        //预约人数
        $count=YuyueStatModel::find()->select(['count'])->where(['name'=>'rw_total'])->asArray()->one();
        $count=$count['count'];
        foreach (self::$arr['B'] as $key){
            if(in_array($key,$gift_code_id)){
                $data[$key]=$status[3];
            }else{
                if($count>=500000  && $key==5){
                    $data[$key]=$status[0];
                }elseif($count>=200000 && $key==4){
                    $data[$key]=$status[0];
                }elseif($count>=100000 && $key==3){
                    $data[$key]=$status[0];
                }elseif($count>=50000 && $key==2){
                    $data[$key]=$status[0];
                }else{
                    $data[$key]=$status[2];
                }
            }
        }
        //分享
        foreach (self::$arr['C'] as $key){
            if(in_array($key,$gift_code_id)){
                $data[$key]=$status[3];
            }else{
                $share_num=$user['share_num'];//邀请人数 $key 对应礼包序号
                if($share_num>=15  && $key==9){
                    $data[$key]=$status[0];
                }elseif($share_num>=10 && $key==8){
                    $data[$key]=$status[0];
                }elseif($share_num>=5 && $key==7){
                    $data[$key]=$status[0];
                }elseif($share_num>=1 && $key==6){
                    $data[$key]=$status[0];
                }else{
                    $data[$key]=$status[2];
                }
            }
        }
        //邀请
        foreach (self::$arr['A'] as $key){
            if(in_array($key,$gift_code_id)){
                $data[$key]=$status[3];
            }else{
                $invite_num=$user['invite_num'];//邀请人数 $key 对应礼包序号
                if($invite_num>=6  && $key==12){
                    $data[$key]=$status[0];
                }elseif($invite_num>=4 && $key==11){
                    $data[$key]=$status[0];
                }elseif($invite_num>=2 && $key==10){
                    $data[$key]=$status[0];
                }else{
                    $data[$key]=$status[2];
                }
            }
        }
        //转盘
        foreach (self::$arr['D'] as $key){
            if(in_array($key,$gift_code_id) || in_array($key,$gift_code_sw)){
                $data[$key]=$status[3];
            }else{
                $data[$key]=$status[2];
            }
        }
        return $data;
    }

    /**
     * 填写收货地址
     **/
    public function actionAjaxAddress(){
        $this->_checkLogin();
        $phone=Cms::getSession('login_rw_phone');
        $model=RwUserModel::find()->where(['phone'=>$phone])->one();
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


    //查看我的礼包
    public function actionAjaxCode(){
//        $this->_checkLogin();
        $arr=self::$prize_arr;
        $data=[];
        $gift_code_=[];
        foreach ($arr as $a_v){
           $gift_code_[$a_v['id']]=$a_v['name'];
        }
        $user=RwUserModel::find()->where(['like','gift_code_id','18,'])->orderBy(['draw_time'=>SORT_DESC])->asArray()->limit(30)->all();
        if($user){
            foreach ($user as $value){
               $gift_code=array_filter(explode(',',$value['gift_code_id']));
               if($gift_code){
                   foreach ($gift_code as $code){
                         if($code>12){
                            $re['gift_id']=$code;
                            $re['phone']=substr_replace($value['phone'],'****',3,4);
                            $re['name']=$gift_code_[$code];
                             $data[]=$re;
                         }
                   }
               }
            }
            $this->ajaxOutPut(['status'=>0,'msg'=>$data]);
        }
        $this->ajaxOutPut(['status'=>0,'msg'=> []]);

    }

    /**
     * 预约功能
     */
    protected function _yuyue($phone, $invite_code)
    {
        $_POST['phone'] = $phone;
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        $_POST['type'] = Cms::getPostValue('type');
        $invite_model = RwUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($invite_code) {//有邀请码
            $model_other = RwUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
            if (!$model_other && $invite_code == $invite_model['me_invite_code']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            //每天最多增加抽经机会3次
            if ($model_other->today_invite_count < 6 && $model_other->updated_at >= strtotime(date('Y-m-d'))) {
                $model_other->draw_num = $model_other->draw_num + 1;  //邀请人抽奖+1
            }
            $model_other->other_invite_code = $model_other->other_invite_code .','.$invite_model->me_invite_code;
            $model_other->updated_at = time();
            $model_other->invite_num = $model_other->invite_num + 1;  //邀请人+1
            $model_other->save();
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);
        if ($res['status'] == 0) {
            //每天最多增加抽经机会3次
            $invite_model->draw_num = $invite_model->draw_num + 1;  //邀请人抽奖+1
//            if ($invite_model->today_invite_count < 6 && $invite_model->updated_at >= strtotime(date('Y-m-d'))) {
//                $invite_model->draw_num = $invite_model->draw_num + 1;  //邀请人抽奖+1
//            }
            $invite_model->save();
        }
        return $res;
    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_rw_phone');
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
            return "http://rw.dev.yingxiong.com/cover.html?";
        } else if (YII_DEMO) {
            return "http://rw.demo.yingxiong.com/cover.html?";
        } else {
            return "http://rw.yingxiong.com/cover.html?";
        }

    }

    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private static function _getRand($proArr) {
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

    //测试接口
    public function actionTes(){
        $_POST['phone']=15181808256;
        $_POST['yzm']=730340;
        $_POST['type']='ios';
        $_POST['type']=2;
        $_POST['key']=11;

//        $this->actionAjaxLoginVerify();
        $this->actionAjaxLogin();
//        $this->actionAjaxYyue();

//        $this->actionAjaxShare();
//        $this->actionAjaxReceive();
//        $this->actionAjaxDraw();
//        $this->actionAjaxGetUser();
        $this->actionAjaxCode();



    exit;
    }
}
