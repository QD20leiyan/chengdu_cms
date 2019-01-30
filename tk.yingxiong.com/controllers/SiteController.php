<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\TkUserModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\models\GameSubscribe;
use common\models\tk\TkTyiEwmLog;
use yii\captcha\Captcha;

class SiteController extends PcController
{
    public $sessionLoginName;

    public function beforeAction($action, $isNoLayout = 0)
    {
        if (parent::beforeAction($action, $isNoLayout)) {
            if ($this->channelName) {
                $this->sessionLoginName = 'login_tk_phone'.$this->channelName;
            } else {
                $this->sessionLoginName = 'login_tk_phone';
            }
            return true;
        }
    }

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


    /**
     * 获取用户信息
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        $phone=Cms::getSession($this->sessionLoginName);
        //用户游戏中是否领取礼包
        $user = TkUserModel::find()->where('phone = :phone', [':phone' => $phone])->asArray()->one();

        $subscribe = $this->_getSubscribe($phone);
        $user['is_yuyue'] = $subscribe ? 1 : 0;
        $user['share_url'] = $this->_getInviteUrl().'invite_code='.$user['me_invite_code'];
        $this->ajaxOutPut(['status' => 0, 'msg' => $user]);
    }

    //登录获取验证码
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误!']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《巅峰坦克：装甲战歌》活动登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    //登录、邀请
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession($this->sessionLoginName, $phone);
            $user = TkUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new TkUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->created_at = time();
                $user->save();
            }
            $msg = $user->attributes;
            //预约
            $is_yy=0;
            $subscribe = $this->_getSubscribe($phone);
            if ($subscribe) {
               $is_yy=1;
            }
            $msg['is_yuyue']= $is_yy;
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    //预约接口
    public function actionAjaxYyue(){
        $phone=Cms::getSession($this->sessionLoginName);
        $type = Cms::getPostValue('type');
        $invite_code = Cms::getPostValue('invite_code');
        $res = self::yuyue($phone, $invite_code,$type);
        $this->ajaxOutPut($res);
    }


    //竞猜冠军
    public function actionAjaxGuess(){

        if(time()>strtotime(date('2018-7-15 21:00:00'))){
            $this->ajaxOutPut(['status'=>-1,'竞猜活动已截止了！']);
        }
        $this->_checkLogin();
        $phone=Cms::getSession($this->sessionLoginName);
        $guess=Cms::getPostValue('guess');
        if(!$guess){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'请选择您的冠军队伍！']);
        }
        $user=TkUserModel::find()->where(['phone'=>$phone])->one();
        if(!$user->guess_name){
          $user->guess_name=$guess;
          $user->guess_at=time();
          $user->save();
          $this->ajaxOutPut(['status'=>0,'msg'=>$guess]);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'您已竞猜过了！']);
        }
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove($this->sessionLoginName);
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session[$this->sessionLoginName])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' =>$msg]);
    }
    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession($this->sessionLoginName);
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }


    /**
     * 预约功能
     */
    protected function yuyue($phone, $invite_code,$type)
    {
        $_POST['phone'] = $phone;
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        $_POST['type'] = $type;
        $invite_model = TkUserModel::find()->where('phone = :phone', [':phone' => $phone])->one(); //被邀请人
        if ($invite_code) {//有邀请码
            $model_other = TkUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one(); //邀请人
            if (!$model_other || $invite_code == $invite_model['me_invite_code']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            if(strpos($model_other->other_invite_code,$invite_code)==false) {
                $model_other->other_invite_code = $model_other->other_invite_code . ',' . $invite_model->me_invite_code;
                $model_other->invite_num = $model_other->invite_num + 1;
                $model_other->invite_at = time();
                $model_other->save();
            }
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_OLD, Cms::IS_UNIQUE_PHONE, $this->channelName);
        return $res;
    }

    //导数据
    public function actionExpWorld(){
        $list=[];
        $start_time=strtotime(date('Y-m-d',strtotime('-1 day')));
        $end_time=strtotime(date('Y-m-d 23:59:59',strtotime('-1 day')));

        $users  = TkUserModel::find()->where(['>', 'invite_at', $start_time])->asArray()->all();
        $subscribeUsers = GameSubscribe::find()->where(['between', 'created_at', $start_time, $end_time])->asArray()->all();
        if (empty($subscribeUsers)) {
            $this->ajaxOutPut([date('Y-m-d',strtotime('-1 day')).'：当天暂未任何用户去邀请！']);
        }

        $subscribeUserArr = [];
        foreach ($subscribeUsers as $v) {
            $subscribeUserArr[$v['phone']] = $v;
        }

        $codeArr = [];
        if (!empty($users)) {
            foreach ($users as $v) {
                $tmp = explode(',', $v['other_invite_code']);
                $tmp = array_unique($tmp);
                if (!empty($tmp)) {
                    foreach ($tmp as $code) {
                        if ($code) {
                            $codeArr[] = $code;
                        }
                    }
                }
            }
        }

        $newUsers = TkUserModel::find()->where(['in', 'me_invite_code', $codeArr])->asArray()->all();
        if (empty($newUsers)) {
            $this->ajaxOutPut([date('Y-m-d',strtotime('-1 day')).'：当天暂未任何用户去邀请！']);
        }
        $userCodeArr = [];
        foreach ($newUsers as $v) {
            $userCodeArr[$v['me_invite_code']] = $v;
        }

        foreach ($users as $v) {
            $tmp = explode(',', $v['other_invite_code']);
            $tmp = array_unique($tmp);
            if (empty($tmp)) {
                continue;
            }
            $invite_num = 0;
            foreach ($tmp as $code) {
                if (key_exists($code, $userCodeArr) && key_exists($userCodeArr[$code]['phone'], $subscribeUserArr)) {
                    ++$invite_num;
                }
            }
            if ($invite_num >= 1) {
                $re = [];
                $re['phone'] = $v['phone'];
                $re['invite_num'] = $invite_num;
                $re['guess_name'] = $v['guess_name'];
                $re['guess_at'] = date('Y-m-d H:i:s',$v['guess_at']);
                $re['invite_at'] = date('Y-m-d H:i:s',$v['invite_at']);
                $list[] = $re;
            }
        }
        if(!$list){
            $this->ajaxOutPut([date('Y-m-d',strtotime('-1 day')).'：当天暂未任何用户去邀请！']);
        }
        $filename='巅峰坦克.装甲战歌'.date('Y-m-d',strtotime('-1 day')).'用户邀请数据';
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=".$filename.".xls");
        header('Cache-Control: max-age=0');

        $strexport="用户名\t邀请人数\t竞猜冠军球队\t竞猜时间\t最后一次邀请时间\r";
        foreach ($list as $row){
            $strexport.=$row['phone']."\t";
            $strexport.=$row['invite_num']."\t";
            $strexport.=$row['guess_name']."\t";
            $strexport.=$row['guess_at']."\t";
            $strexport.=$row['invite_at']."\r";
        }
        $strexport=iconv('UTF-8',"GBK//TRANSLIT",$strexport);
        exit($strexport);
    }




    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://tk.dev.yingxiong.com/site/cover.html?";
        } else if (YII_DEMO) {
            return "http://tk.yingxiong.com/site/cover.html?";
        } else {
            return "http://tk.yingxiong.com/site/cover.html?";
        }

    }

    /**
     * 获取图形验证码
     */
    public function actionAjaxGetCaptcha()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $this->ajaxOutPut(['status' => 0, 'msg' => $captcha_img]);
    }

    private function _getSubscribe($phone)
    {
        $subscribe = GameSubscribe::getUserByPhone($this->website_id, $phone, Cms::YUYUE_SCENE_OLD, '', $this->channelName);
        if ($subscribe['status'] != 1) {
            $this->ajaxOutPut($subscribe);
        }
        return $subscribe['msg'];
    }

    /**
     * tyi 分官网 二维码扫描统计
     */
    public function actionTyiEwmLog()
    {
        $type = Cms::getClientType();
        $ip = Cms::getClientIp();
        $type = $type ? $type : 1;
        TkTyiEwmLog::addLog($ip, $type);
        header('Location:/part/tyi.html');
    }

    public function actionTes(){

//        $_POST['phone']=15181808256;
//        $_POST['yzm']=110876;
//        $_POST['type']='ios';
//        $_POST['invite_code']='3dYs79';
        $_POST['guess']='比利时';
//        $this->actionAjaxLoginVerify();
//        $this->actionAjaxGetUser();exit;
//        $this->actionAjaxLogin();exit;
        $this->actionAjaxGuess();exit;

    }
}
