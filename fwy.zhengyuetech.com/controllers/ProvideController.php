<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/22/022
 * Time: 16:00
 */

namespace app\controllers;


use common\components\ApiCommonSign;
use common\components\Utils;
use common\models\ApiLog;
use yii\helpers\Json;
use yii\web\Controller;

class ProvideController extends Controller
{
   public static function provide($category,$item){
       if(YII_DEV){
           $url='http://service.dev.yingxiong.com';//测试地址
       }elseif(YII_DEMO){
           $url='http://api-hsdk.yingxiong.com';//测试地址
       }else{
           $url='http://api-hsdk.yingxiong.com';//正式地址
       }
       //data加密
       $data=[
           "gameid"=>26,
           "serverid"=>$category['serverid'],
           "roleid"=>$category['roleid'],
           "mailTitle"=>'蘑菇小姐姐的感谢信',
           "mailContent"=>'亲爱的玩家朋友，我是蘑菇小姐姐，感谢您预约《明日决胜！》手游，收下您的预约福利,一起来探索缤纷的世界！',
           "origin"=>100005,
           "itemInfo"=>$item,
       ];
       $protoData = $data;
       $data=ApiCommonSign::encryptSign($data);

       //sign值
       $key='e0ff07a91254401eb89a3aa42b8c5eb5';
       $time=time();
       $sign=md5('data='.$data.'&timestamp='.$time.'&'.$key);

       $request=[
           'data'=>$data,
           'timestamp'=>$time,
           'sign'=>$sign,
       ];
       $user_service_url = $url.'/yxsdk/sendprize.lg';
       $result = Utils::sendHttpRequest($user_service_url, $request, 'POST');
       @ApiLog::addLog(78, $user_service_url, Json::encode($protoData), Json::encode($result));
       $count = json_decode($result['content'], true);
       return $count;
   }
}