<?php

namespace app\controllers;

use common\Cms;
use common\components\PcController;
use common\models\Content;
use common\models\fc\FcLiveSms;
use common\models\fc\FcVote;
use common\models\VerifyCode;
use yii\helpers\Json;
use common\components\Utils;

/**
 * 夏目的专题页面
 *
 * @author Administrator
 *
 */
class SpecialController extends PcController {

    //判断是否为手机 OR PC端
    private $isMobile = false;

    public function beforeAction($action){

        if (parent::beforeAction($action)) {

            $this->isMobile = Cms::checkmobile();
        }
        return true;
    }

    public function actionFeature()
    {
        $this->render('feature');
    }


    /**
     * 单独专题页面
     *
     */
    public function actionActive(){
        $hid = Yii::app()->request->getParam('hid','');
        $uid = Yii::app()->session['wishuid'];

        $flag = !empty($uid) && $uid > 0 ? true : false;

        if($this->isMobile){
            $size = 6;

            $criteria = new CDbCriteria;
            $criteria->order='created_time desc';
            $dataProvider=new CActiveDataProvider('NewyearWishModel',array(
                'criteria'=>$criteria,
                'pagination'=>array('pageSize'=>$size,'pageVar'=>'page')
            ));

            $this->renderPartial($hid.'_m',array('loginFlag'=>$flag,'wishdata'=>$dataProvider));
        }else{

            $size = 8;

            $criteria = new CDbCriteria;
            $criteria->order='created_time desc';
            $dataProvider=new CActiveDataProvider('NewyearWishModel',array(
                'criteria'=>$criteria,
                'pagination'=>array('pageSize'=>$size,'pageVar'=>'page')
            ));

            $this->renderPartial($hid,array('loginFlag'=>$flag,'wishdata'=>$dataProvider));
        }
    }

    //125-pc
    public function actionAct125()
    {

        //赛道展示
        $sdzs = $this->getContentArr(179);
        //挑战资讯
        $tzzx = $this->getContentArr(178, 4);
        //挑战轮播
        $tzlb = $this->getContentArr(177);
        //精彩视频
        $jcsp = $this->getContentArr(176, 8);
        //名人堂
        $mrt = $this->getContentArr(175);
        //游戏直播
        $yxzb = $this->getContentArr(174);

        return $this->renderPartial('act125',array(
            'sdzs'=>$sdzs,
            'tzzx'=>$tzzx,
            'tzlb'=>$tzlb,
            'jcsp'=>$jcsp,
            'mrt'=>$mrt,
            'yxzb'=>$yxzb,
        ));
    }
    //125-wap
    public function actionAct125_m()
    {
        //赛道展示
        $sdzs = $this->getContentArr(179);
        //挑战资讯
        $tzzx = $this->getContentArr(178, 4);
        //挑战轮播
        $tzlb = $this->getContentArr(177);
        //精彩视频
        $jcsp = $this->getContentArr(176, 8);
        //名人堂
        $mrt = $this->getContentArr(175);
        //游戏直播
        $yxzb = $this->getContentArr(174);

        return $this->renderPartial('act125_m',array(
            'sdzs'=>$sdzs,
            'tzzx'=>$tzzx,
            'tzlb'=>$tzlb,
            'jcsp'=>$jcsp,
            'mrt'=>$mrt,
            'yxzb'=>$yxzb,
        ));
    }
    //下载落地页
    public function actionDownload_m()
    {
        return $this->renderPartial('download_m');
    }
    //下载落地页2
    public function actionDownload2_m()
    {
        return $this->renderPartial('download2_m');
    }
    public function actionLanding_m(){
        return $this->renderPartial('landing_m');
    }
    public function actionWechat(){
        return $this->renderPartial('wechat');
    }
    public function actionKangshifu(){
        $this->redirect('/game');
    }
    public function actionQiaqia(){
        return $this->renderPartial('qiaqia');
    }

    public function actionMatch()
    {
        $video = $this->getContentArr(181);//赛事视频
        $servers = $this->getContentArr(171);//服务器
        if($this->isMobile){
            $view = 'match_m';
        } else {
            $view = 'match';
        }
        return $this->renderPartial($view, [
            'video' => $video,
            'servers' => $servers,
        ], 314);
    }

    //保存手机号方法
    public function actionSavePhone()
    {
        $phone = Cms::getPostValue('phone');
        $yzm = Cms::getPostValue('yzm');

        if(!Utils::checkPhone($phone))
        {
            $rez = array('status'=>-1, 'msg'=>'手机号错误，请重新填写');
            echo Json::encode($rez);
            exit;
        }
        $exist_phone = FcLiveSms::find()->where('phone=:phone', array(':phone' => $phone))->one();
        if($exist_phone){
            $rez = array('status'=>-2,'msg'=>'您已经预约过了，请勿重复预约');
            echo Json::encode($rez);
            exit;
        }

        $checkCode = VerifyCode::find()->where('phone=:phone AND verify=:yzm', array(':phone' => $phone, ':yzm' => $yzm))->one();
        if (!$checkCode) {
            $rez = array('status'=>-3,'msg'=>'验证码不正确');
            echo Json::encode($rez);
            exit;
        }

        $live = new FcLiveSms();
        $time = date('Y-m-d H:i:s',time());
        $live->phone = $phone;
        $live->add_time = $time;
        if($live->save() > 0){
            $rez = array('status'=>1, 'msg'=>'预约成功');
            echo Json::encode($rez);
            exit;
        }else{
            $rez = array('status'=>0, 'msg'=>'预约失败，请重新预约');
            echo Json::encode($rez);
            exit;
        }
    }

    /**
     * 执行投票
     */
    public function actionVote()
    {
//        if (time() > strtotime('2017-05-30 10:00:00')) {
//            $rez = array('status'=>-1, 'msg'=>'投票时间已经停止');
//            echo Json::encode($rez);
//            exit;
//        }
        $phone = Cms::getPostValue('phone');
        $serverId = Cms::getPostValue('server_id');
        $yzm = Cms::getPostValue('yzm');

        if(!Utils::checkPhone($phone))
        {
            $rez = ['status'=>-1, 'msg'=>'手机号错误，请重新填写'];
            echo Json::encode($rez);
            exit;
        }

        $checkCode = VerifyCode::find()->where('phone=:phone AND verify=:yzm', array(':phone' => $phone, ':yzm' => $yzm))->one();
        if (!$checkCode) {
            $rez = array('status'=>-3,'msg'=>'验证码不正确');
            echo Json::encode($rez);
            exit;
        }

        //验证用户是否已经投票
        $voteModel = new FcVote();

        $is_vote = FcVote::find()->where('phone=:phone', array(':phone' => $phone))->one();
        if ($is_vote) {
            $res = array('status'=>-1,'msg'=>'您已经投票，每个手机只能投票一个服务器');
            echo Json::encode($res);exit;
        }

        $server = Content::find()->where('id=:id', array(':id' => $serverId))->one();
        $serverName = $server['title'];
        $voteModel->created_at = time();
        $voteModel->server_id = $serverId;
        $voteModel->server_name = $serverName;
        $voteModel->phone = $phone;
        $voteModel->save();

        $server->view_count += 1;
        $server->save();

        echo Json::encode(array('status' => 1, 'msg' => $server->view_count));
        exit;
    }

    //大黄蜂专题
    public function actionDhf()
    {
        return $this->renderPartial('dhf.html', ['date' => date('Y-m-d')]);
    }

}
