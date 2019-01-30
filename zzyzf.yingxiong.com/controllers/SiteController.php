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
use common\models\GameSubscribe;
use common\models\Stat;
use common\models\zzyzf\ZzyzfInviteModel;
use yii\captcha\Captcha;

class SiteController extends PcController
{
    public function actionCover()
    {
        //kv视频
        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        //首页轮播
        $banner=$this->getRecommend('banner');
        $data=[
            'banner'=>$banner,
            'video'=>$video
        ];
//        pr($data,1);
        return $this->renderPartial('cover.html',['data'=>$data]);
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
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

        $phone = Cms::getPostValue('phone','15181808256');
        $res = Cms::verify($phone, Cms::ZZYZF_LOGIN, '您正在进行《战争与征服》预约登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    /**
     * 登录
     */
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
//        $captcha = Cms::getPostValue('captcha');
//        $res = $this->createAction('captcha')->validate($captcha, false);
//        if (!$res) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
//        }
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_phone', $phone);
            $invite = ZzyzfInviteModel::find()->where('user_phone = :phone', [':phone' => $phone])->one();
            if (!$invite) {
                $invite = new ZzyzfInviteModel();
                $invite->user_phone=(string)$phone;
                $invite->me_invite_code=mt_rand(10000000,99999999);
                $invite->invite_img= Cms::qrcodeImg($this->_getInviteUrl().'code='.$invite->me_invite_code);
                $invite->created_at = time();
                $invite->updated_at = time();
                $invite->save();
            }
            $msg = $invite->attributes;
            $msg['invite_code'] = Cms::getSession('invite_code');
            $msg['share_url'] = $this->_getInviteUrl().'code='.$invite->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 判断用户是否登录
     */
    public function actionAjaxGetUser()
    {
        if (Cms::getSession('login_phone')) {
            $invite = ZzyzfInviteModel::find()->select(['user_phone', 'me_invite_code', 'invite_img', 'invite_num'])->where('user_phone = :phone', [':phone' => Cms::getSession('login_phone')])->asArray()->one();
            $invite['share_url'] = $this->_getInviteUrl().'code='.$invite['me_invite_code'];
            $invite['invite_code'] = Cms::getSession('invite_code');
            $this->ajaxOutPut(['status' => 0, 'msg' => $invite]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '没有登录！']);
        }
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    public function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://zzyzf.dev.yingxiong.com/m?";
        } else if (YII_DEMO) {
            return "http://zzyzf.demo.yingxiong.com/m?";
        } else {
            return "http://zzyzf.yingxiong.com/m?";
        }

    }
    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_phone');//登录的手机号码
        $_POST['phone'] = $phone;
        $invite_code = Cms::getPostValue('invite_code');//邀请码（不一定存在）
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        if ($invite_code) {
            $model = ZzyzfInviteModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
            if (!$model) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            $invite_model = ZzyzfInviteModel::find()->where('user_phone = :phone', [':phone' => $phone])->one();
            if ($invite_model && ($invite_code == $invite_model['me_invite_code'])) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);

        if ($res['status'] == 0 && $invite_code) {  //如果是有邀请码的用户预约
            if ($invite_model) {
                $invite_model->other_invite_code = (string)$invite_code;
                $invite_model->updated_at = time();
                $invite_model->save();
            }
            $model->invite_num = $model->invite_num+1;  //邀请码的用户邀请人数+1
            $model->save();
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }

    /**
     * 获取预约人数
     */
    public function actionAjaxGetNum()
    {
        $count = GameSubscribe::find()->where(['website_id'=>BaseActiveRecord::getWebsiteId(),'scene'=>1])->count();
        $this->ajaxOutPut(['status' => 0, 'msg' => $count]);
    }


}
