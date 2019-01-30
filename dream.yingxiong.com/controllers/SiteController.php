<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\models\dream\DreamInviteModel;
use common\models\GameSubscribe;
use common\models\Stat;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        //特色玩法
        $play=$this->getRecommend('esp_play');
        $data=array(
            'video'=>$video,
            'play'=>$play,
            'captcha_img'=>$captcha_img,
        );
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('cover.html',$data);
    }

    public function actionIndex()
    {
//       return $this->actionCover();
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /****************login****************/
    /**
     * 判断用户是否登录
     */
    public function actionAjaxGetUser()
    {
        if (Cms::getSession('login_phone')) {
            $invite = DreamInviteModel::find()->select(['user_phone', 'invite_num','me_invite_code', 'invite_img', 'invite_num','chance_num','walk_num'])->where('user_phone = :phone', [':phone' => Cms::getSession('login_phone')])->asArray()->one();
            $is_yuyue=Cms::checkYuyue(Cms::getSession('login_phone'),'ios','',1);
            $invite['share_url'] = $this->_getInviteUrl().'code='.$invite['me_invite_code'];
            $invite['invite_code'] = Cms::getSession('invite_code');
            $invite['is_yuyue']=$is_yuyue['status'];
            $this->ajaxOutPut(['status' => 0, 'msg' => $invite]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '没有登录！']);
        }
    }
    /**
     * 登录发送验证码
     */
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }

        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《风之岛》预约登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }
    /**
     * 登录
     */
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_phone', $phone);
            $invite = DreamInviteModel::find()->where('user_phone = :phone', [':phone' => $phone])->one();
            if (!$invite) {
                $invite = new DreamInviteModel();
                $invite->user_phone=(string)$phone;
                $invite->me_invite_code=mt_rand(10000000,99999999);
                $invite->invite_img= Cms::qrcodeImg($this->_getInviteUrl().'code='.$invite->me_invite_code);
                $invite->created_at = time();
                $invite->updated_at = time();
                $invite->walk_num = 1;
                $invite->chance_num=$invite->chance_num+1;
                $invite->save();
            }
            //判断是否为当天首次登陆
            if($invite){
                $start_time = strtotime(date('Y-m-d').' 00:00:00');
                if($invite->updated_at < $start_time){
                    $invite->chance_num=$invite->chance_num+1;
                    $invite->updated_at = time();
                    $invite->save();
                }
            }
            $msg = $invite->attributes;
            $is_yuyue=Cms::checkYuyue($phone,'ios','',1);
            $msg['invite_code'] = Cms::getSession('invite_code');
            $msg['is_yuyue']=$is_yuyue['status'];
            $msg['share_url'] = $this->_getInviteUrl().'code='.$invite->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }
    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' => $msg]);
    }

    /**************预约**************/
    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
//        if(time()>=strtotime('2018-02-29 23:59:59')){
//            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束！']);
//        }else {
            $phone = Cms::getSession('login_phone');
            $_POST['phone'] = $phone;
            $invite_code = Cms::getPostValue('invite_code');
            $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
            $invite_model = DreamInviteModel::find()->where('user_phone = :phone', [':phone' => $phone])->one();
            if ($invite_code) {
                $model = DreamInviteModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
                if (!$model) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
                }
                if ($invite_model && ($invite_code == $invite_model['me_invite_code'])) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
                }
            }

            $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);

            if($res['status']==0){
                if ($invite_model && $invite_code) {//如果是有邀请码的用户预约
                    $invite_model->other_invite_code = (string)$invite_code;
                    $invite_model->updated_at = time();
                    $model->invite_num = $model->invite_num + 1;  //邀请码的用户邀请人数+1
                    $model->chance_num = $model->chance_num + 1;  //成功邀请的用户+1
                    $model->save();
                }
                $invite_model->chance_num = $invite_model->chance_num+1;
                $invite_model->save();
            }
            $this->ajaxOutPut($res);
//        }
    }


    /**
     * 接收摇色子的数字
     */
    public function actionWalk(){
        $this->_checkLogin();
        $status=-1;
        $msg='次数不够。';
        $phone = Cms::getSession('login_phone');
        $num = Cms::getPostValue('num');
        $model=DreamInviteModel::find()->where(['user_phone'=>$phone])->one();
        if($model && $model->chance_num>0){
            $model->walk_num=$model->walk_num+$num;
            $model->chance_num=$model->chance_num-1;//次数减
            $model->save();
            $status=0;
            $msg=$model->walk_num;
        }
        $this->ajaxOutPut(['status' => $status, 'msg' => $msg]);
    }

    public function actionAjaxShare(){
        $phone=Cms::getSession('login_phone');
        if (!$phone) {
            header('location:/');
            exit;
        }
         $dream=DreamInviteModel::find()->select(['invite_img'])->where(['user_phone'=>$phone])->asArray()->one();
        if (!$dream) {
            header('location:/');
            exit;
        }
        return $this->renderPartial('ajax_share.html', $dream);
    }

    /**
     * 获取预约人数
     */
    public function actionAjaxGetNum()
    {
        $count = Stat::find()->where(['name' => 'fzd_subscribe_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->one();
        $this->ajaxOutPut(['status' => 0, 'msg' => $count['count']]);
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://dream.dev.yingxiong.com/m?";
        } else if (YII_DEMO) {
            return "http://dream.demo.yingxiong.com/m?";
        } else {
            return "http://dream.yingxiong.com/m?";
        }

    }
    /**
     * 登录状态
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }

    public function actionMyTest()
    {
        /*****登录发送验证码*************/
//        $_POST['phone'] = 15181808256;
//        $this->actionAjaxLoginVerify();exit;
        /******登录*************/
        $_POST['phone'] = 15181808256;
        $_POST['yzm'] = 740118;
        $this->actionAjaxLogin();exit;
          /******获取用户********/
//        $_POST['num']=2;
//        $this->actionWalk();exit;
        /******注销登录**********/
//        $this->actionAjaxLoginOut();exit;
        /***********获取预约人数*************/
//        $this->actionAjaxGetNum();exit;
        /***********获取用户信息*************/
        $this->actionAjaxGetUser();exit;
    }

    public function actionTest($type = '', $id = '')
    {
        if (!$type) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }


}
