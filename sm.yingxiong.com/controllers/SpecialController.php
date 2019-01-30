<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/8/24
 * Time: 11:25
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\models\sm\SmDati;
use common\models\sm\SmDatiPage;
use common\models\sm\SmDatiUser;
use common\models\sm\SmKunPlan;
use common\models\VerifyCode;
use common\widgets\commonMethod\CommonMethodController;

class SpecialController extends PcController
{
    /**
     * 鲲计划
     * @return string
     */
    public function actionKunPlan()
    {
        return $this->renderPartial('kun_plan.html');
    }

    /**
     * 保存加入鲲计划的名单
     */
    public function actionAjaxSaveKunUser()
    {
        $name = Cms::getPostValue('name');
        $phone = Cms::getPostValue('phone');
        $qq = Cms::getPostValue('qq');
        $weixin = Cms::getPostValue('weixin');
        $email = Cms::getPostValue('email');
        $address = Cms::getPostValue('address');
        $mod = Cms::getPostValue('mod');
        $sifu = Cms::getPostValue('sifu');
        $res = ['status' => -1];
        if (!$name) {
            $res['msg'] = '名字不能为空！';
            $this->ajaxOutPut($res);
        }

        if (!$phone || !Cms::checkPhone($phone)) {
            $res['msg'] = '手机号不正确！';
            $this->ajaxOutPut($res);
        }

        if ($qq && !is_numeric($qq)) {
            $res['msg'] = 'QQ格式不正确！';
            $this->ajaxOutPut($res);
        }

        if ($email && !Cms::checkEmail($email)) {
            $res['msg'] = '邮箱格式不正确！';
            $this->ajaxOutPut($res);
        }

        $kun = SmKunPlan::find()->where('phone=:phone', [':phone' => $phone])->one();
        if ($kun) {
            $res['msg'] = '该手机号码已经加入鲲计划！';
            $this->ajaxOutPut($res);
        }
        $kun = new SmKunPlan();
        $kun->name = $name.'';
        $kun->phone = $phone;
        $kun->qq = $qq;
        $kun->weixin = $weixin;
        $kun->email = $email;
        $kun->address = $address;
        $kun->mod = $mod;
        $kun->sifu = $sifu;
        $kun->created_at = date('Y-m-d H:i:s');
        $kun->save();
        $res['status'] = 0;
        $this->ajaxOutPut($res);
    }


    /**
     * 答题页
     */
    public function actionDati()
    {
        return $this->renderPartial('dati.html');
    }

    public function actionAjaxVerify()
    {
        $phone = Cms::getPostValue('phone');
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '手机号码不正确！']);
        }
        $user = SmDatiUser::findOne(['phone' => $phone]);
        if ($user) {
            $this->ajaxOutPut(['status' => 1, 'msg' => '您已经全部答对成功！', 'id' => $user->id]);
        }

        $res = Cms::verify($phone, 3);
        $this->ajaxOutPut($res);
    }

    /**
     * 答题登录
     */
    public function actionAjaxDatiLogin()
    {
        $phone = Cms::getPostValue('phone');
        $code = Cms::getPostValue('yzm');
        $checkCode = VerifyCode::find()->where('phone=:phone and website_id=:website_id and type=3 and verify=:verify',
            [':phone' => $phone, ':website_id' => $this->website_id, ':verify' => $code])->one();
        if (!$code || !$checkCode) {
            $rez = array('status'=>-1, 'msg'=>'验证码不正确');
            $this->ajaxOutPut($rez);
        }
        Cms::setSession('dati_phone', $phone);

        $user = SmDatiUser::findOne(['phone' => $phone]);
        if ($user) {
            $this->ajaxOutPut(['status' => 1, 'msg' => '您已经全部答对成功！', 'id' => $user->id]);
        }
        $this->ajaxOutPut(['status' => 0]);
    }

    /**
     * 答题页试卷
     */
    public function actionDatiPage()
    {
        return $this->renderPartial('dati_page.html');
    }

    public function actionAjaxDatiSave()
    {
        if (!Cms::getSession('dati_phone')) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请先登录！']);
        }
        $user = SmDatiUser::findOne(['phone' => Cms::getSession('dati_phone')]);
        if ($user) {
            $this->ajaxOutPut(['status' => 0, 'msg' => $user->rank, 'id' => $user->id]);
        }
        $answer = ['C', 'D', 'B', 'A', 'D', 'A', 'D', 'A', 'C', 'B'];
        $data = Cms::getPostValue('data');
//        if (!$data || !is_array($data) || !empty($data)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '答案参数错误！']);
//        }

        $error_arr = [];
        foreach ($answer as $k => $v) {
            if (!$data[$k] || $v != $data[$k]) {
                $error_arr[] = $k;
            }
        }
        //如果有错题
        if (count($error_arr) != 0) {
            $this->ajaxOutPut(['status' => 1, 'msg' => $error_arr]);
        }
        $model = SmDati::find()->one();
        $model->count = $model->count + 1;
        $model->save();

        $rank = $model->count;
        $user = new SmDatiUser();
        $user->phone = Cms::getSession('dati_phone').'';
        $user->rank = $rank;
        $user->save();
        $this->ajaxOutPut(['status' => 0, 'msg' => $rank, 'id' => $user->id]);
    }

    /**
     * 分享页
     * @return string
     */
    public function actionDatiShare()
    {
        $id = Cms::getGetValue('id');
        if (!$id && !Cms::getSession('dati_phone')) {
            header('Location:/special/dati.html');
            exit;
        }
        $user = SmDatiUser::findOne($id);
        return $this->renderPartial('dati_share.html', ['rank' => $user->rank, 'id' => $user->id]);

    }

    public function actionMytest()
    {
//        Cms::setSession('dati_phone', 13510596862);
        $_POST['data'] = ['C', 'D', 'B', 'A', 'D', 'A', 'D', 'A', 'C', 'B'];
        $this->actionAjaxDatiSave();
//        $_POST['name'] = 1;
//        $_POST['phone'] = 13510596862;
//        $this->actionAjaxSaveKunUser();
    }

    /**
     * 主播
     * @return string
     */
    public function actionZhubo()
    {
        $data['act'] = $this->getContentArr('368', 4);
        $data['cs'] = $this->getContentArr('370', 500);
        $data['hy'] = $this->getContentArr('371', 500);
        $data['dj'] = $this->getContentArr('372', 500);
        $data['qt'] = $this->getContentArr('373', 500);
        $data['yp'] = $this->getContentArr('485', 500);
        $data['lunbo'] = $this->getContentArr(380, 4);
        return $this->renderPartial('zhubo.html', $data, 69);
    }

    public function actionKun()
    {
        return $this->renderPartial('kun.html');
    }
}