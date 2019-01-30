<?php

namespace app\controllers\ca;

use app\models\H5CaNewSeasonModel;
use app\models\H5CaNewSeasonShareModel;
use common\Cms;
use common\components\H5BaseController;
use common\helpers\Utils;
use common\models\GiftCode;
use yii\helpers\Json;

include_once "wxBizDataCrypt.php";

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/3/9
 * Time: 10:47
 */
class NewSeasonController extends H5BaseController
{

    private static $grade_id = [
        1 => ['id' => 92,'name'=>'传奇', 'scale' => 5],
        2 => ['id' => 93,'name'=>'大师', 'scale' => 4],
        3 => ['id' => 94,'name'=>'钻石', 'scale' => 4],
        4 => ['id' => 95,'name'=>'白金', 'scale' => 3],
        5 => ['id' => 96,'name'=>'黄金', 'scale' => 3],
        6 => ['id' => 97,'name'=>'白银', 'scale' => 2],
        7 => ['id' => 98,'name'=>'青铜', 'scale' => 1]];
    private static $gift_ids=[92,93,94,95,96,97,98,99];

    //初始通过CODE来获取openid
    public function actionAjaxOpenid(){
         $code=Cms::getPostValue('code');
         if ($code) {
             $appid = 'wxbf80d386f7f55dd8';
             $secret = 'b15e6d140ac16c4bb0042482e4958852';
             $get_token_url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appid . '&secret=' . $secret . '&grant_type=authorization_code&js_code=' . $code;

             $result=Utils::sendHttpRequest($get_token_url,[],'GET');
             $result = json_decode($result['content'], true);
             echo  json_encode($result);exit;

//             $ch = curl_init();
//             curl_setopt($ch, CURLOPT_URL, $get_token_url);
//             curl_setopt($ch, CURLOPT_HEADER, 0);
//             curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//             curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
//             $res = curl_exec($ch);
//             curl_close($ch);
//             //解析json
//             $user_obj = json_decode($res, true);
//             if ($user_obj) {
//                 //第二步:根据全局access_token和openid查询用户信息
////                 $get_user_info_url = "https://api.weixin.qq.com/sns/userinfo?access_token=".$user_obj['access_token']."&openid=".$user_obj['openid']."&lang=zh_CN";
////                 $ch = curl_init();
////                 curl_setopt($ch, CURLOPT_URL, $get_user_info_url);
////                 curl_setopt($ch, CURLOPT_HEADER, 0);
////                 curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
////                 curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
////                 $res = curl_exec($ch);
////                 curl_close($ch);
//                 //解析json
//                 $user_info = json_decode($res, true);
//
//                 echo  json_encode($user_obj);exit;
//             }
         }else{
             echo Json::encode(['msg'=>'code is null']);exit;
         }
     }

    public function actionIndex()
    {
        $openid = Cms::getPostValue('openid');
        $user = H5CaNewSeasonModel::find()->where(['openid' => $openid])->one();
        if (!$user) {
            $user = new H5CaNewSeasonModel();
            $user->openid = $openid;
            $user->lottery_num = 2;
            $user->lottery_count = 8;
            $user->login_at = time();
        }
        //每天赠送两次点亮机会
        if ($user->login_at < strtotime(date('Y-m-d'))) {
            $user->lottery_num = 2;
            $user->lottery_count = 8;
            $user->login_at = time();
        }
        //每天召唤好友次数从0开始
        if ($user->share_at < strtotime(date('Y-m-d'))) {
            $user->share_num = 0;
            $user->open_gid = '';
            $user->share_at = time();
        }
        //领取的礼包
        $gifts_code=GiftCode::find()->select('gift_id')->where(['openid'=>$openid])->asArray()->all();
        $is_gift_arr=[];
        $gift_code=[];
        if($gifts_code){
           foreach ($gifts_code as $key=>$value) {
               $gift_code[]=$value['gift_id'];
           }
            foreach (self::$grade_id as $k=>$v){
                if(in_array($v['id'],$gift_code)){
                    $is_gift_arr[$k]=true;
                }else{
                    $is_gift_arr[$k]=false;
                }
            }
        }
        $user->save();
        $data = [
            'openid' => $openid,
            'is_full' => $user->is_full,
            'lottery' => $user->lottery_num,
            'count' => $user->lottery_count,
            'share' => $user->share_num,
            'is_gift_arr' => $is_gift_arr,
            'grade' => unserialize($user->grade),
        ];
        $this->ajaxOutPut($data);

    }

    //ajax点亮操作
    public function actionAjaxDl()
    {
        echo Json::encode(['status' => -1, 'msg' => '活动已结束，请关注公众号（quanminqiangzhan）了解更多福利活动']);exit;
        $openid = Cms::getPostValue('openid');
        $user = H5CaNewSeasonModel::find()->where(['openid' => $openid])->one();
        //点亮所有的人数
        $count=H5CaNewSeasonModel::find()->where(['is_full'=>1])->count();
        $gift_code='';
        $status=0;
        $count_num=0;
        if ($user->lottery_num <= 8 && $user->lottery_num > 0) {
            $rand=self::grade_rand($user->grade);
            $key = $rand['data'];//点亮的哪一个
            //已经全部点亮或者执行点亮最后一次的操作
            if($rand['is_full']) {
                $status=1;
                $user->is_full = 1;
                //特殊的荣誉奖并送礼包
                if ($count <= 500 || self::special_num($count+1)) {
                    $re = self::auto_code($openid);
                    if ($re['status'] == 0) {//领礼包成功
                        $gift_code = $re['msg'];//礼包码
                        $count_num=$count+1;
                    }
                }else {
                    $count_num = $count+1;
                }
            }
            $user->lottery_num = $user->lottery_num - 1;
            $user->grade = $rand['grade'];
        } else {
            echo Json::encode(['status' => -1, 'msg' => '机会暂无！']);
            exit;
        }
        $user->save();
        echo Json::encode(['status' => $status, 'msg' => '成功', 'lottery_num' => $user->lottery_num,'count'=>$count_num,'code'=>$key,'gift_code'=>$gift_code]);
        exit;
    }


    //分享增加次数
    public function actionAjaxShareNum()
    {
        echo Json::encode(['status' => -1, 'msg' => '活动已结束，请关注公众号（quanminqiangzhan）了解更多福利活动']);exit;
        $appid = 'wxbf80d386f7f55dd8';
        $openid = Cms::getPostValue('openid');
        $sessionKey = Cms::getPostValue('session_key');
        $encryptedData = Cms::getPostValue('encryptedData');
        $iv=Cms::getPostValue('iv');

        $pc = new \WXBizDataCrypt($appid,$sessionKey);
        $errCode = $pc->decryptData($encryptedData, $iv, $data );
        $open_gid='';
        if ($errCode == 0) {
            $data=json_decode($data);
           $open_gid=$data->openGId;
        }else{
            echo Json::encode(['status' => -1, 'msg' => '无法识别该分享是否为群！']);
        }
        $user = H5CaNewSeasonModel::find()->where(['openid' => $openid])->one();
        //每天召唤好友次数从0开始
        if ($user->share_at < strtotime(date('Y-m-d'))) {
            $user->share_num = 0;
            $user->open_gid = '';
        }
        $is_share = H5CaNewSeasonModel::find()->where(['openid' => $openid])->andWhere(['like','open_gid',$open_gid.','])->one();
        if($is_share){
            echo Json::encode(['status' => 0, 'msg' => '特别提示：需要转发到不同微信群才可以喔~', 'count' => $user->lottery_count, 'lottery_num' => $user->lottery_num, 'share_num' => $user->share_num]);
        }else {
            //每天召唤好友次数从0开始
            if ($user->share_num >= 3) {
                echo Json::encode(['status' => 0, 'msg' => '今天召唤次数已达上限~明天再来吧', 'count' => $user->lottery_count, 'lottery_num' => $user->lottery_num, 'share_num' => $user->share_num]);
            } else {
                //记录用户分享的群及分享次数
                $save_share=new H5CaNewSeasonShareModel();
                $save_share->openid=$openid;
                $save_share->open_gid=$open_gid;
                $save_share->share_at=time();
                $save_share->save();

                $user->share_at = time();
                $user->lottery_num = $user->lottery_num + 2;
                $user->share_num = $user->share_num + 1;
                $user->share_at = time();
                $user->open_gid = $user->open_gid . $open_gid . ',';
                $user->save();
                echo Json::encode(['status' => 0, 'msg' => '分享成功啦~', 'count' => $user->lottery_count, 'lottery_num' => $user->lottery_num, 'share_num' => $user->share_num]);
            }
        }
    }

    // ajax点击领取礼包

    public function actionAjaxGiftCode(){
        $openid=Cms::getPostValue('openid');
        $num=Cms::getPostValue('num');
        $code_id=self::$grade_id[$num]['id'];
        $user = H5CaNewSeasonModel::find()->where(['openid' => $openid])->one();
        if(isset(unserialize($user->grade)[$num]) && unserialize($user->grade)[$num]!=self::$grade_id[$num]['scale']){
            echo Json::encode(['status'=>-1,'msg'=>'您还未达到该段位！']);exit;
        }
        //判断是否领取过
        $is_receive=GiftCode::find()->where(['gift_id'=>$code_id,'openid'=>$openid,'status'=>1])->one();
        if($is_receive){
            echo Json::encode(['status'=>0,'msg'=>$is_receive->code]);exit;
        }
        $gift_code=GiftCode::find()->where(['gift_id'=>$code_id,'status'=>0])->one();
        if(!$gift_code){
            echo Json::encode(['status'=>-1,'msg'=>'该礼包已经被领完！']);exit;
        }
        $gift_code->openid = $openid;
        $gift_code->updated_at = date('Y-m-d H:i:s');
        $gift_code->created_at = date('Y-m-d H:i:s');
        $gift_code->status = 1;
        $code = $gift_code->code;
        if ($gift_code->save()) {
            echo Json::encode(['status'=>0,'msg'=>$code]);exit;
        }
    }

    //查看我的礼包
    public function actionAjaxMyCode(){
        $openid=Cms::getPostValue('openid');
        $gifts=GiftCode::find()->select(['gift_id','code'])->where(['openid'=>$openid])->andWhere(['in','gift_id',self::$gift_ids])->orderBy(['updated_at'=>SORT_DESC])->asArray()->all();
        $data=[];
        $dw_gift_id=[];
        foreach (self::$grade_id as $k=>$v){
            $dw_gift_id[$v['id']]=$v['name'];
        }
        $dw_gift_id[99 ]='荣誉奖';
        if($gifts){
            foreach ($gifts as $key=>$value){
                $name=$dw_gift_id[$value['gift_id']];
                $code=$value['code'];
                $data[]=[
                    'name'=>$name,
                    'code'=>$code,
                ];
            };
        }
        echo $this->ajaxOutPut(['data'=>$data]);exit;
    }




    //是否为特殊数字
    static function special_num($num){
        $flag=false;
        if($num>500){
            $count=strlen($num);
            $num_='';
            for ($i=0;$i<$count;$i++){
                $num_.='1';
            }
            if($num/9==$num_){
                $flag=true;
            }elseif($num/6==$num_){
                $flag=true;
            }elseif($num/2==$num_){
                $flag=true;
            }elseif($num/1==$num_){
                $flag=true;
            }
        }
        return $flag;
    }

    //段位数据的处理
    static function grade_rand($str)
    {
        $is_grade = unserialize($str);//已经点亮的段位
        $is_full = false;
        $grades = self::$grade_id;
        foreach ($grades as $key => $value) {
            if (isset($is_grade[$key]) && $is_grade[$key] == $value['scale']) {
                unset($grades[$key]);
            }
        }
        $data=[];
        if ($grades) {
            $arr_k = array_rand($grades);//得到需要增加星数的key
            $data[$arr_k] = 1;
            if ($is_grade) {
                if (array_key_exists($arr_k, $is_grade)) {
                    $is_grade[$arr_k] = $is_grade[$arr_k] + 1;
                    $data[$arr_k] = $is_grade[$arr_k];
                    if(count($grades)==1 && ($grades[$arr_k]['scale']==$is_grade[$arr_k])){//点亮最后一次就全部点亮的情况
                        $is_full=true;
                    }
                } else {
                    $is_grade[$arr_k] = 1;
                }
            } else {
                $is_grade[$arr_k] = 1;
            }
        }else{
            $is_full = true;
        }
        $info=['data' => $data, 'grade' => serialize($is_grade), 'is_full' => $is_full];
        return $info;
    }

    // 自动领取礼包
    static function auto_code($openid){
        $code_id=99;
        $gift_code=GiftCode::find()->where(['gift_id'=>$code_id,'status'=>0])->one();
        $is_receive=GiftCode::find()->where(['gift_id'=>$code_id,'openid'=>$openid])->one();
        if(!$gift_code || $is_receive){
            $status=-1;
            $msg='暂无该礼包或您已领取该礼包！';
        }else {
            $gift_code->openid = $openid;
            $gift_code->updated_at = date('Y-m-d H:i:s');
            $gift_code->created_at = date('Y-m-d H:i:s');
            $gift_code->status = 1;
            $code = $gift_code->code;
            $gift_code->save();
            $status = 0;
            $msg = $code;
        }
        return ['status'=>$status,'msg'=>$msg];
    }

    public function actionTes()
    {

//        $this->actionTe();
//        exit;
//
//
//        $_POST['num'] = 1;
//        $this->actionAjaxGiftCode();
//        exit;

    }

}