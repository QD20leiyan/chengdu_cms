<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/19/019
 * Time: 11:18
 */

namespace app\controllers;


use common\Cms;
use common\models\GameSubscribe;
use common\models\sm\SmDirectModel;
use common\models\sm\SmEnlistModel;
use common\models\sm\SmUserVoteModel;
use common\models\VerifyCode;
use common\widgets\commonMethod\CommonMethodController;
use yii\helpers\Json;

class VerifyController extends CommonMethodController
{
    //获取验证码
    public function actionGetVerify(){
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type', 4);  //发送验证码类型
        if ($type == 4) {
            if(time()<strtotime('2018-3-1 23:59:59')){
                $status=-1;
                $msg='投票活动还未开始！';
                echo Json::encode(['status'=>$status,'msg'=>$msg]);exit;
            }elseif(time()>=strtotime('2018-3-5 23:59:59')){
                $status=-1;
                $msg='投票活动已结束！';
                echo Json::encode(['status'=>$status,'msg'=>$msg]);exit;
            }else{
                $msg = '主播投票验证';
            }
        } else {
            $msg = '主播报名验证';
        }
        if (!$phone || !Cms::checkPhone($phone)) {
            echo Json::encode(['status' => -1, 'msg' => '手机号格式不正确！']);
            exit;
        }
        $result = $this->verify($phone, $type, $msg);
        echo Json::encode($result);
        exit;
    }
    //验证登录
    public function actionVote()
    {
        $phone=Cms::getPostValue('phone');
        $code=Cms::getPostValue('yzm');
        $type=Cms::getPostValue('type',4);
        if(!Cms::checkPhone($phone)){
            $rez = array('status'=>-1, 'msg'=>'手机号码格式不正确');
            echo Json::encode($rez);
            exit;
        }
        $checkCode = VerifyCode::find()->where('phone=:phone and website_id=:website_id and type=:type and verify=:verify and status=1',
            [':phone' => $phone, ':website_id' => $this->website_id,':type' => $type,':verify' => $code])->one();
        if (!$code || !$checkCode) {
            $rez = array('status'=>-1, 'msg'=>'验证码不正确');
            echo Json::encode($rez);
            exit;
        }
        if ($checkCode['created_at'] < strtotime("-1 hours")) {
            $rez = array('status'=>-1, 'msg'=>'验证码已过期');
            echo Json::encode($rez);
            exit;
        }
//        \Yii::$app->session['user']=$phone;

        if($type==4) {
            $model = SmUserVoteModel::find()->where(['phone' => $phone])->one();
            if ($model) {
                echo Json::encode(['status' => 0, 'msg' => $phone, 'is_poll' => $model->candidate_id]);
                exit;
            } else {
                echo Json::encode(['status' => 0, 'msg' => $phone, 'is_poll' => '']);
                exit;
            }
        }else{
            $model = SmEnlistModel::find()->where(['phone' => $phone])->one();
            if($model){
                echo Json::encode(['status' => -1, 'msg' =>'该手机号码已报名']);
                exit;
            }else{
                echo Json::encode(['status' => 0, 'msg' => '成功']);exit;
            }
        }

    }
    //投票功能
    public function actionPoll(){
        if(time()<strtotime('2018-3-1 23:59:59')){
            $status=-1;
            $msg='投票活动还未开始！';
            echo Json::encode(['status'=>$status,'msg'=>$msg]);exit;
        }elseif(time()>=strtotime('2018-3-5 23:59:59')){
            $status=-1;
            $msg='投票活动已结束！';
            echo Json::encode(['status'=>$status,'msg'=>$msg]);exit;
        }else {
            if (isset(\Yii::$app->session['user']) && \Yii::$app->session['user']) {
                $user_phone = \Yii::$app->session['user'];
                $vote_id = Cms::getPostValue('id');
                $status = -1;
                $msg = '投票失败，请稍后重试！';
                if (!Cms::checkPhone($user_phone)) {
                    $status = 101;
                    $msg = '手机号码格式不正确';
                    echo Json::encode(['status' => $status, 'msg' => $msg]);
                    exit;
                }
                $user_model = SmUserVoteModel::find()->where(['phone' => $user_phone, 'website_id' => $this->website_id])->one();
                if ($user_model) {
                    $status = 202;
                    $msg = '每位用户限定只能投一票！';
                    echo Json::encode(['status' => $status, 'msg' => $msg]);
                    exit;
                }
                $direct = SmDirectModel::find()->where(['id' => $vote_id])->one();
                $user_model = new SmUserVoteModel();
                $user_model->website_id = $this->website_id;
                $user_model->phone = $user_phone;
                $user_model->candidate_id = $vote_id;
                $user_model->created_at = time();
                $direct->poll += 1;
                if ($user_model->save() && $direct->save()) {
                    $status = 0;
                    $msg = '投票成功！';
                    echo Json::encode(['status' => $status, 'msg' => $msg]);
                    exit;
                }
                echo Json::encode(['status' => $status, 'msg' => $msg]);
                exit;
            } else {
                $status = 404;
                $msg = '用户未登录';
                echo Json::encode(['status' => $status, 'msg' => $msg]);
                exit;
            }
        }

    }

    //答题完后将其用户手机号码存入session
    public function actionOpenVote(){
        $phone=Cms::getPostValue('phone');
        $type=Cms::getPostValue('type',4);
        $status=-1;
        $msg='error';
        $checkCode = VerifyCode::find()->where('phone=:phone and website_id=:website_id and type=:type and status=1',
            [':phone' => $phone, ':website_id' => $this->website_id,':type' => $type])->one();
        if($checkCode){
            Cms::setSession('user',$phone);
            $status=0;
            $msg='success';
        }
        echo Json::encode(['status'=>$status,'msg'=>$msg]);exit;
    }


    /*******************************/


    /**********************创造与魔法主播报名活动********************/
    public function actionEnlist(){
        if(\Yii::$app->request->isAjax){
            $data=array(
                'name'=>Cms::getPostValue('zbmc','yinxiong'),//主播名称
                'phone'=>Cms::getPostValue('phone','yinxiong'),//手机号码
                'terrace'=>Cms::getPostValue('zbpt','yinxiong'),//主播平台
                'six'=>Cms::getPostValue('zbxb','yinxiong'),//主播性别
                'telecast_id'=>Cms::getPostValue('fjhm','yinxiong'),//主播房间ID
                'region'=>Cms::getPostValue('yxqf','yinxiong'),//区服
                'role_name'=>Cms::getPostValue('jsmc','yinxiong'),//角色名字
                'qq'=>Cms::getPostValue('qq','yinxiong'),//qq
            );
            if(in_array('yinxiong',$data)){
                echo Json::encode(['status'=>-1,'msg'=>'报名信息必须填完']);exit;
            }
            $data['name'] = Cms::filterEmoji($data['name']);
            $data['role_name'] = Cms::filterEmoji($data['role_name']);

            $model=new SmEnlistModel();
            $model->name=$data['name'];
            $model->phone=$data['phone'];
            $model->terrace=$data['terrace'];
            $model->six=$data['six'];
            $model->telecast_id=$data['telecast_id'];
            $model->region=$data['region'];
            $model->role_name=$data['role_name'];
            $model->qq=$data['qq'];
            $model->created_at=time();
            if($model->save()){
                echo Json::encode(['status'=>0,'msg'=>'报名成功!']);exit;
            }else{
                echo Json::encode(['status'=>-1,'msg'=>'报名失败!']);exit;
            }
        }
        echo Json::encode(['status'=>-1,'msg'=>'请求参数错误!']);exit;
    }


    static function parse_skill_arr($content,$flag='') {
        $data=[];
        if($content){
            $re=$content['summary'];
            $peg = '/\[time](.*)\[info](.*)\[rules](.*)/iu';
            preg_match($peg,$re,$result);
            $time='';
            $info='';
            $rules='';
            if(isset($result[1]) && !empty($result[1])){
                $time=$result[1];
            }
            if(isset($result[2])&& !empty($result[2])){
                $info=$result[2];
            }
            if(isset($result[3])&& !empty($result[3])){
                $rules=$result[3];
            }
            $data=[
                'time'=>$time,
                'info'=>$info,
                'rules'=>$rules,
            ];
        }
        return $data;
    }

}