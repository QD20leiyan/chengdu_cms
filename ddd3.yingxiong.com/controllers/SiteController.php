<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\Ddd3UserModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\DrawController;
use common\components\PcController;
use common\models\GameSubscribe;
use common\models\GiftActivityModel;
use common\models\GiftCode;
use yii\captcha\Captcha;

class SiteController extends PcController
{
    public function actionCover()
    {

        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('index.html',['captcha_img' => $captcha_img]);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    //登录发送验证码
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《弹弹岛3》抽奖活动登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    //用户信息
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        $phone= Cms::getSession('login_ddd3_phone');
        //用户游戏中是否领取礼包
        $user = Ddd3UserModel::find()->where('phone = :phone', [':phone' =>$phone])->asArray()->one();
        $user['is_yuyue']= $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => $phone, ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
        $user['share_url'] = $this->_getInviteUrl().'invite_code='.$user['me_invite_code'];
        $this->ajaxOutPut(['status' => 0, 'msg' => $user]);
    }

    //登录
    public function actionAjaxLogin(){
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_ddd3_phone', $phone);
            $user = Ddd3UserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if(!$user){
                $user = new Ddd3UserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->invite_img = Cms::qrcodeImg($this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code);
                $user->created_at = time();
                $user->login_at = time();
                $user->invite_count = 1;
                $user->save();
                $msg = $user->attributes;
            }else{
                $msg = $user->attributes;
            }
            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => Cms::getSession('login_ddd3_phone'), ':website_id' => $this->website_id])->one();
            $msg['is_yuyue'] =0;
            //是否已预约
            if($exist_phone){
                $msg['is_yuyue'] =1;
            }
            //每天登录送一次抽奖机会
            if($user->login_at<strtotime(date('Y-m-d'))){
                $user->invite_count=$user->invite_count+1;
            }

            $user->login_at = time();
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    //注销登录
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_ddd3_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['lottery_ca_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' =>$status, 'msg' => $msg]);
    }

    //预约
    public function actionAjaxYuyue(){
        $this->_checkLogin();
        $phone = Cms::getSession('login_ddd3_phone');
        $_POST['phone'] = $phone;
        $invite_code = Cms::getPostValue('invite_code');
        $invite_model = Ddd3UserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($invite_code) {
            $model = Ddd3UserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
           //自己的邀请码及没有的
            if (!$model || $invite_code == $invite_model['me_invite_code']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            $invite_model->other_invite_code = (string)$invite_code;
           //邀请成功这邀请人增加抽奖机会
            if($invite_model->save()){
                //每天的邀请时间清空
                if($model->invite_at<strtotime(date('Y-m-d'))) {
                    $model->today_invite_count=0;
                    $model->invite_at=time();//邀请人数
                }
                //邀请每天最多加两次抽奖机会
                if($model->today_invite_count<2){
                    $model->today_invite_count=$model->today_invite_count+1;
                    $model->invite_count = $model->invite_count + 1;  //邀请人抽奖次数增加
                    $model->invite_at=time();
                }
                $model->invite_num = $model->invite_num + 1;  //邀请人数+1
                $model->save();
            }
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);
        $this->ajaxOutPut($res);
    }

    //抽奖
    public function actionAjaxDraw(){
        $this->_checkLogin();
        $phone = Cms::getSession('login_ddd3_phone');
        $model=Ddd3UserModel::find()->where(['phone'=>$phone])->one();
        if($model->invite_count<=0){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'暂无抽奖机会！']);
        }
        // 108=60 109-10

        $del=[];

        //京东购物卡5 60张
        $jd_five=GiftCode::find()->where(['gift_id'=>108])->andWhere(['not',['phone'=>null]])->count();
        //京东购物卡20 10张
        $jd_six=GiftCode::find()->where(['gift_id'=>109])->andWhere(['not',['phone'=>null]])->count();
        if($jd_five>=60){
            $del[]=108;
        }
        if($jd_six>=10){
            $del[]=109;
        }
        $gift_id=1;
        $res=DrawController::Draw($phone,$gift_id,Cms::GIFT_IS_REPEAT,$del);
        if($res['status']==0 && $res['is_repeat']==0){
            $model->invite_count = $model->invite_count - 1;
            $model->save();
            $res['invite_count'] = $model->invite_count;//抽奖剩余次数
            $this->ajaxOutPut($res);
        }else{
            $this->ajaxOutPut($res);
        }
        $res['invite_count'] = $model->invite_count;//抽奖剩余次数
        $this->ajaxOutPut($res);
    }

    //用户中奖记录
    public function actionAjaxMyCode()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_ddd3_phone');
        $gift = GiftCode::find()->where(['in', 'gift_id', [104,105,106,107,108,109,110]])->andWhere(['phone'=>$phone])->andWhere(['status' => 1])->with('gift')->orderBy('updated_at desc')->limit(100)->asArray()->all();
        $data = [];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['code'] =$v['code'];
                $tmp['name'] = $v['gift']['name'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }
    //用户中奖记录
    public function actionAjaxCode()
    {
        $gift = GiftCode::find()->where(['in', 'gift_id', [104,105,106,107,108,109,110]])->andWhere(['status' => 1])->with('gift')->orderBy('updated_at desc')->limit(100)->asArray()->all();
        $data = [];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['phone'] = substr_replace($v['phone'], '****', 3,4);
                $tmp['name'] = $v['gift']['name'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $data]);
    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_ddd3_phone');
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
            return "http://ddd3.dev.yingxiong.com/index.html?";
        } else if (YII_DEMO) {
            return "http://ddd3.demo.yingxiong.com/index.html?";
        } else {
            return "http://ddd3.yingxiong.com/inde.html?";
        }

    }


    public function actionTes(){
        $_POST['phone']=15181808256;
        $_POST['yzm']=495123;

        //发送验证码
//        $this->actionAjaxLoginVerify();
        //登录
//        $this->actionAjaxLogin();
//        $this->actionAjaxGetUser();
        //抽奖
         $this->actionAjaxDraw();
//         $this->actionAjaxCode();
//        $_POST['type']='ios';
//        $_POST['email']='386705484@qq.com';
//        $this->actionAjaxYuyue();
        exit;
    }

}
