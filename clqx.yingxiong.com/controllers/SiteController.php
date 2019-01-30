<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\ClqxUserModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\models\GameSubscribe;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('cover.html',[ 'captcha_img'=>$captcha_img]);
    }

    public function actionIndex()
    {
        $data['role'] = $this->getContentArr(714, 100);
        if ($data['role'] && !empty($data['role'])) {
            foreach ($data['role'] as &$v) {
                $v['sub'] = $this->parse_jws_attr($v['summary']);
            }
        }
        return $this->renderPartial('index.html', $data);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    //登录获取验证码
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《苍蓝前线》预约登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }
    //登录
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_clqx_phone', $phone);
            $user = ClqxUserModel::find()->where(['phone'=>$phone])->one();
            if(!$user){
                $user=new ClqxUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->login_at = time();
                $user->created_at = time();
                $user->save();
                $msg = $user->attributes;
            }else{
                $msg = $user->attributes;
            }
            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => $phone, ':website_id' => $this->website_id])->one();
            $msg['is_yuyue'] =0;
            if($exist_phone){
                $msg['is_yuyue'] =1;
            }
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
    }
    /**
     * 获取用户信息
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        //用户游戏中是否领取礼包
        $user = ClqxUserModel::find()->where('phone = :phone', [':phone' => Cms::getSession('login_clqx_phone')])->asArray()->one();
        $user['is_yuyue']= $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => Cms::getSession('login_clqx_phone'), ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
        $user['share_url'] = $this->_getInviteUrl().'invite_code='.$user['me_invite_code'];
        $this->ajaxOutPut(['status' => 0, 'msg' => $user]);
    }

    //预约及邀请人
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_clqx_phone');
        $_POST['phone'] = $phone;
        $invite_code = Cms::getPostValue('invite_code');
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        $invite_model = ClqxUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($invite_code) {//有邀请码
            $model = ClqxUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
            if (!$model || $invite_code == $invite_model['me_invite_code']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            $invite_model->other_invite_code = (string)$invite_code;
            $invite_model->save();
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);
        $this->ajaxOutPut($res);
    }


    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://clqx.dev.yingxiong.com?";
        } else if (YII_DEMO) {
            return "http://clqx.demo.yingxiong.com?";
        } else {
            return "http://clqx.zhengyuetech.com?";
        }

    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_clqx_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_clqx_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_clqx_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' =>$msg]);
    }

    public function actionTes(){
//        $_POST['phone']=15181808256;
//        $this->actionAjaxVerify();

//        $_POST['phone']=15181808256;
//        $_POST['yzm']=679830;
//        $this->actionAjaxLogin();
//        $_POST['invite_code']='GEXGSsg';
//        $_POST['type']='android';
//        $this->actionAjaxYuyue();
        $this->actionAjaxGetUser();
        exit;
    }



}
