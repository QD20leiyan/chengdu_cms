<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\ZhsUserModel;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\PcController;
use common\models\GameSubscribe;
use yii\captcha\Captcha;

class SiteController extends PcController
{
    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('cover.html',['captcha_img' => $captcha_img]);
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**************************************************************抽奖**************************************************************/

    protected static $prize_arr = [  //概率
        1 =>['name'=>'参与礼包','v'=>1190] ,
        2 => ['name'=>'188元冲刺礼包','v'=>7],
        3 => ['name'=>'328元豪华礼包','v'=>3],
        4 => ['name'=>'谢谢参与','v'=>8800]
    ];
    /**
     * 获取用户信息
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        $phone=Cms::getSession('login_zhs_phone');
        //用户游戏中是否领取礼包
        $user = ZhsUserModel::find()->where(['phone'=>$phone])->asArray()->one();
        $user['is_yuyue']= $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => $phone, ':website_id' => BaseActiveRecord::getWebsiteId()])->count();
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
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《我是召唤师》预约登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    //登录、邀请
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $invite_code = Cms::getPostValue('invite_code');
        $res = Cms::checkVerify(Cms::SM_LOGIN);
        if ($res['status'] == 0) {
            Cms::setSession('login_zhs_phone', $phone);
            $user = ZhsUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new ZhsUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr(6);
                $user->created_at = time();
                $user->updated_at = time();
                $user->draw_time = time();
                $user->draw_num  = 1;
                $user->save();
                $msg = $user->attributes;
            }else {
                //每天最多增加抽经机会清零
                if ($user->draw_time<strtotime(date('Y-m-d'))) {
                     $user->today_draw_count = 0;
                }
                $user->draw_time = time();
                $user->save();
                $msg = $user->attributes;
            }
            //预约
            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => $phone, ':website_id' => $this->website_id])->one();
            if (!$exist_phone) {
                $res_=self::yuyue($phone, $invite_code);
                if($res_['status']==0){
                    $msg['is_yuyue']= 1;
                }
            }else{
                $msg['is_yuyue']= 1;
            }
            $msg['gift_ids'] = array_filter(explode(',',$user->gift_ids));//中奖ID
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_zhs_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_zhs_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        $this->ajaxOutPut(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * 预约功能
     */
    protected function yuyue($phone, $invite_code)
    {
        $_POST['phone'] = $phone;
        $_POST['scene'] = Cms::YUYUE_SCENE_NEW;
        $_POST['type'] = 'android';
        $invite_model = ZhsUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if ($invite_code) {//有邀请码
            $model_other = ZhsUserModel::find()->where('me_invite_code = :invite_code', [':invite_code' => $invite_code])->one();
            if (!$model_other && $invite_code == $invite_model['me_invite_code']) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '无效的邀请码！']);
            }
            $invite_model->other_invite_code = (string)$invite_code;
            $model_other->updated_at = time();
            $model_other->invite_num = $model_other->invite_num + 1;  //邀请人+1
            $model_other->draw_num = $model_other->draw_num + 1;  //邀请人+1
            $model_other->save();
            $invite_model->save();
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_NEW, Cms::IS_UNIQUE_PHONE);
        return $res;
    }

    //转盘及礼包
    public function actionAjaxDraw()
    {
        if(time()<=strtotime(date('2018-6-15'))){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动还未开始！']);
        }elseif(time()>=strtotime(date('2018-7-12 18:00:00'))){
            $this->ajaxOutPut(['status' => -1, 'msg' => '活动已结束']);
        }else {
            $this->_checkLogin();
            $phone = Cms::getSession('login_zhs_phone');
            $model = ZhsUserModel::find()->where(['phone' => $phone])->one();
            $gift_id=[];
            $gift_name=[];
            foreach (self::$prize_arr as $k=>$v){
                $gift_id[$k]=$v['v'];
                $gift_name[$k]=$v['name'];
            }

            if ($model->draw_num > 0) {
                $id=self::_getRand($gift_id);
                if (!$model->gift_ids) {
                    $model->gift_ids = ',' . $id . ',';
                } else {
                    $model->gift_ids = $model->gift_ids . $id . ',';
                }
                if ($model->today_draw_count >= 10) {
                    $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖次数已超限！']);
                }
                $model->draw_num = $model->draw_num - 1;
                $model->draw_count = $model->draw_count + 1;
                $model->today_draw_count = $model->today_draw_count + 1;
                $model->draw_time = time();
                $model->save();
                $res=$model->attributes;
                $res['draw_count'] = $model->draw_num;//抽奖剩余次数
                $res['gift_id'] = $id;
                $res['gift_namae'] = $gift_name[$id];
                $this->ajaxOutPut(['status' => 0, 'msg' => $res]);
                }
            }
            $this->ajaxOutPut(['status' => -1, 'msg' => '暂无抽奖机会！']);
    }

    /**
     * 抽奖分享
     */
    public function actionAjaxShare()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_zhs_phone');
        $user = ZhsUserModel::find()->where(['phone' => $phone])->one();
        if ($user->share_time < strtotime(date('Y-m-d'))) {
            $user->draw_num = $user->draw_num+1;
        }
        $user->share_time = time();
        $user->updated_at = time();
        $user->save();
        $this->ajaxOutPut(['status' => 0, 'msg' => 'success', 'draw_num' => $user->draw_num]);
    }

    //我的转盘礼包
    public function actionAjaxMyCode()
    {
        $this->_checkLogin();

        $gift_name=[];
        foreach (self::$prize_arr as $k=>$v){
            $gift_name[$k]=$v['name'];
        }

        $phone = Cms::getSession('login_zhs_phone');
        $user = ZhsUserModel::find()->where(['phone' => $phone])->one();
        $data = [];
        if ($user->gift_ids) {
            $my_draw_id = array_filter(explode(',', $user->gift_ids));
            foreach ($my_draw_id as $en_k => $en_v) {
                if($en_v==4) continue;
                $re['name'] =$gift_name[$en_v];
                $re['id'] = $en_v;
                $data[] = $re;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }

    //填写收货地址
    public function actionAjaxAddress()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_zhs_phone');
        $model = ZhsUserModel::find()->where(['phone' => $phone])->one();
        $name = Cms::getPostValue('name');
        $code = Cms::getPostValue('code');
        $address = Cms::getPostValue('address');
        $tel = Cms::getPostValue('tel');
//        $file = trie_filter_load('words.dic');
//        $search_name = trie_filter_search_all($file, $name);  // 一次把所有的敏感词都检测出来
//        $search_address = trie_filter_search_all($file, $address);  // 一次把所有的敏感词都检测出来
//        if (!empty($search_name)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货姓名含有敏感词，请重新编辑！']);
//        }
//        if (!empty($search_address)) {
//            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址含有敏感词，请重新编辑！']);
//        }
        if (empty($name) || empty($address) || empty($tel)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请完善收货信息']);
        }
        $model->name = $name;
        $model->code = $code;
        $model->address = $address;
        $model->tel = $tel;
        if ($model->save()) {
            $this->ajaxOutPut(['status' => 0, 'msg' => '收货地址完善成功！']);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => '收货地址添加失败！']);
        }
    }

    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private function _getRand($proArr)
    {
        $result = '';

        //概率数组的总概率精度
        $proSum = array_sum($proArr);

        //概率数组循环
        foreach ($proArr as $key => $proCur) {
            $randNum = mt_rand(1, $proSum);
            if ($randNum <= $proCur) {
                $result = $key;
                break;
            } else {
                $proSum -= $proCur;
            }
        }
        unset ($proArr);
        return $result;
    }

    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_zhs_phone');
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
            return "http://zhs.dev.yingxiong.com/cover.html?";
        } else if (YII_DEMO) {
            return "http://zhs.demo.yingxiong.com/cover.html?";
        } else {
            return "http://zhs.yingxiong.com/cover.html?";
        }

    }

    public function actionTes()
    {

//        $_POST['phone']=15181808256;
//        $this->actionAjaxLoginVerify();

//        $_POST['phone']=15181808256;
//        $_POST['yzm']=635913;
//        $this->actionAjaxLogin();
//        $this->actionAjaxDraw();
//        $this->actionAjaxGetUser();
//        $this->actionAjaxMyCode();
        $this->actionAjaxShare();

//        $_POST['name']='测试';
//        $_POST['code']='455561';
//        $_POST['address']='成都';
//        $_POST['tel']='0281545';
//        $this->actionAjaxAddress();
//        $this->actionAjaxGetUser();
        exit;
    }

}
