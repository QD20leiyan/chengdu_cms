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
use common\models\cd\CddzzUserModel;
use common\models\GameSubscribe;
use common\models\Gift;
use common\models\GiftCode;
use common\models\Stat;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{

    public function actionCover()
    {
        $data['kv'] = $this->getRecommend('kv');
        $data['kv'] = $data['kv'][0];
        $data['user_all']=CommonController::actionCount();
        $data['captcha_img'] = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
//        $invite_code = Cms::getGetValue('invite_code', '');
//        Cms::setSession('invite_code', $invite_code);
        return $this->renderPartial('cover.html', $data);
    }

    public function actionIndex()
    {
        if (key_exists('name', $_GET) && key_exists('p', $_GET)) {//游戏内分享
            header('location:/yxnfx');
            exit;
        }
        $user_all=CommonController::actionCount();
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'commonMethod/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $invite_code = Cms::getGetValue('invite_code');
        if ($invite_code) {
            Cms::setSession('invite_code', $invite_code);
        }

        $video=$this->getRecommend('kv',1);
        //首页轮播
        $banner=$this->getRecommend('Banner');
        //新闻
        $xw=self::data_($this->getContentArr(\Yii::$app->params['XINWEN'],5));
        //公告
        $gg=self::data_($this->getContentArr(\Yii::$app->params['GONGGAO'],5));
        //资讯
        $zx=self::data_($this->getContentArr(\Yii::$app->params['ZHIXUN'],5));
        //活动
        $hd=self::data_($this->getContentArr(\Yii::$app->params['HUODONG'],5));
        $data=[
            'video'=>isset($video[0])?$video[0]:'',
            'banner'=>$banner,
            'zx'=>$zx,
            'xw'=>$xw,
            'gg'=>$gg,
            'hd'=>$hd,
            'captcha_img'=>$captcha_img,
            'user_all'=>$user_all,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('index.html',$data);
    }

    public function actionTest($name = '', $id = '')
    {
        if (!$name) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$name;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }

    public function actionError()
    {
        return $this->render('error');
    }

    private function data_($arr){
        $data=[];
        if(isset($arr)){
            foreach ($arr as $key=>$value){
                $re['title']=$value['title'];
                $re['created_at']=date('m/d',$value['created_at']);
                $re['linkUrl']=$value['linkUrl'];
                $re['wapLinkUrl']=$value['wapLinkUrl'];
                $data[]=$re;
            }
        }
        return $data;
    }


    /************************** 吃豆抽奖 ***************************/

    const GIFT = [63,64,65,66,67,68,69,70,71,72,73,74,75];
    const GIFT_id = [63=>1,64=>2,65=>3,66=>4,67=>5,68=>6,69=>7,70=>8,71=>9,72=>10,73=>11,74=>12,75=>13];
    //登录发送验证码
    public function actionAjaxLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::YUYUE, '您正在进行《吃豆大作战》预约登录，请于1小时内输入');
        $this->ajaxOutPut($res);
    }
    /**
     * 登录
     */
    public function actionAjaxLogin()
    {
        $phone = Cms::getPostValue('phone');
        $res = Cms::checkVerify(Cms::YUYUE);
        if ($res['status'] == 0) {
            Cms::setSession('login_cd_phone', $phone);
            $user = CddzzUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
            if (!$user) {
                $user = new CddzzUserModel();
                $user->phone = (string)$phone;
                $user->me_invite_code = Cms::generateStr();
                $user->created_at = time();
                $user->updated_at = time();
                $user->save();
            }
            $msg = $user->attributes;
            $msg['share_url'] = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
            $msg['count'] = $msg['invite_num'] - $msg['invite_count'];

            $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
                [':phone' => Cms::getSession('login_cd_phone'), ':website_id' => $this->website_id])->one();
            $msg['is_yuyue'] = $exist_phone ? 1 : 0;

            if ($msg['draw_time'] < strtotime(date('Y-m-d').' 00:00:00')) {
                $msg['today_draw_count'] = 0;
            }

            $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
        }
        $this->ajaxOutPut($res);
    }

    /**
     * 抽奖判断用户是否登录
     */
    public function actionAjaxGetUser()
    {
        $this->_checkLogin();
        $user = CddzzUserModel::find()->where(['phone' => Cms::getSession('login_cd_phone')])->one();
        $count = $user['invite_num'] - $user['invite_count'];
        $share_url = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;
        $data = $user->getAttributes();
        $data['status'] = 0;
        $data['msg'] = '';
        $data['count'] = $count;
        $data['share_url'] = $share_url;

        $exist_phone = GameSubscribe::find()->where('phone=:phone and website_id=:website_id',
            [':phone' => Cms::getSession('login_cd_phone'), ':website_id' => $this->website_id])->one();
        $data['is_yuyue'] = $exist_phone ? 1 : 0;

        if ($data['draw_time'] < strtotime(date('Y-m-d').' 00:00:00')) {
            $data['today_draw_count'] = 0;
        }
        $this->ajaxOutPut($data);
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('login_cd_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['login_cd_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * Cover页预约
     */
    public function actionAjaxYuyue()
    {
        $this->_checkLogin();
        $id=77;
        $phone = Cms::getSession('login_cd_phone');
        $type = Cms::getPostValue('type','android');
        $_POST['phone'] = $phone;
        $_POST['type'] = $type;
//        $invite_code = Cms::getSession('invite_code');
        $invite_code = Cms::getPostValue('invite_code');
        $_POST['scene'] = Cms::YUYUE_SCENE_OLD;
        $valid = 1; //邀请码有效
        if ($invite_code) {
            $model = CddzzUserModel::find()->where('me_invite_code = :invite_code and phone != :phone', [':invite_code' => $invite_code, ':phone' => $phone])->one();
            if (!$model) {
                $valid = 0;
            }
        }
        $invite_model = CddzzUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
        if (!$invite_model) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '用户不存在，请重新登录！']);
        }
        $res = Cms::yuyue(Cms::IS_NO_YZM, Cms::YUYUE_SCENE_OLD, Cms::IS_UNIQUE_PHONE);

        if ($res['status'] == 0) {  //如果是有邀请码的用户预约
            if($invite_code && $valid == 1) {
                if ($invite_model) {
                    $invite_model->other_invite_code = (string)$invite_code;
                    $invite_model->updated_at = time();
                    $invite_model->save();
                }
                $model->invite_num = $model->invite_num + 1;  //邀请码的用户邀请人数+1
                $model->save();
            }
          $res=Cms::getGiftNoYzm($phone,$id,1);
        }

        $this->ajaxOutPut($res);
    }

    /**
     * 检测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('login_cd_phone');
        if (!$phone) {
            $this->ajaxOutPut(['status' => 2, 'msg' => '请登录！']);
        }
    }

    /**
     * 获取邀请的地址
     * @return string
     */
    private function _getInviteUrl()
    {
        if (YII_DEV) {
            return "http://cd.dev.yingxiong.com/site/cover.html?";
        } else if (YII_DEMO) {
            return "http://cd.demo.yingxiong.com/site/cover.html?";
        } else {
            return "http://cd.yingxiong.com/site/cover.html?";
        }

    }

    /**
     * 中奖记录
     */
    public function actionAjaxLotteryLog()
    {
        $gift = GiftCode::find()->where(['in', 'gift_id', self::GIFT])->andWhere(['status' => 1])->with('gift')->orderBy('updated_at desc')->limit(100)->asArray()->all();
        $data = [];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['phone'] = substr_replace($v['phone'], '****', 3, 4);
                $tmp['name'] = $v['gift']['name'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'data' => $data]);
    }

    /**
     * 用户中奖记录
     */
    public function actionAjaxLotteryMeLog()
    {
        $this->_checkLogin();
        $phone = Cms::getSession('login_cd_phone');
        $gift = GiftCode::find()->where('phone = :phone', [':phone' => $phone])->with('gift')->andWhere(['in', 'gift_id', self::GIFT])->asArray()->all();
        $data = [];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['name'] = $v['gift']['name'];
                $tmp['code'] = $v['code'];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }

    /**
     * 保存收货地址
     */
    public function actionAjaxSaveAddress()
    {
        $this->_checkLogin();
        $name = Cms::getPostValue('name');
        $code = Cms::getPostValue('code');
        $address = Cms::getPostValue('address');
        $tel = Cms::getPostValue('tel');
        if (!$name || !$code || !$address || !$tel) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '填写的信息有误，不能为空']);
        }
        $user = CddzzUserModel::find()->where(['phone' => Cms::getSession('login_cd_phone')])->one();
        $_POST['tel'] = (string)$_POST['tel'];
        $_POST['code'] = (string)$_POST['code'];
        $_POST['CddzzUserModel'] = $_POST;
        if ($user->load(Cms::getPostValue()) && $user->save()) {
            $this->ajaxOutPut(['status' => 0]);
        } else {
            $this->ajaxOutPut(['status' => -1, 'msg' => $user->getErrors()]);
        }
    }

    /**
     * 抽奖
     */
    public function actionAjaxLottery()
    {
        $this->_checkLogin();
        $prize_arr = [  //概率
            1 => [
                63 => 10000,
                64 => 10000,
                65 => 10000,
                0 => 10000
            ],
            2 => [
                66 => 2000,
                67 => 2000,
                68 => 1000,
//                69 => 5000,
//                70 => 5000,
                0 => 2000
            ],
            3 => [
                71 => 5000,
                72 => 4000,
                73 => 3000,
                74 => 100,//实物
                75 => 50,
                0 => 5000
            ],
        ];

        $node = Cms::getPostValue('node');
        if (!$node || !in_array($node, [1, 2, 3])) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '奖池序号错误！']);
        }
        $user = CddzzUserModel::find()->where(['phone' => Cms::getSession('login_cd_phone')])->one();
        $share_url = $this->_getInviteUrl() . 'invite_code=' . $user->me_invite_code;

        if ($user->invite_count >= 400) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您开奖次数达到上限！']);
        } else if ($user->today_draw_count >= 10 && $user->draw_time > strtotime(date('Y-m-d', strtotime("-1 day")).' 23:59:59')) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您今日开奖次数达到上限！']);
        } else if ($user->draw_time < strtotime(date('Y-m-d', strtotime("-1 day"))." 23:59:59")) {
            $user->today_draw_count = 0;
            $user->save();
        }

        $count = $user->invite_num - $user->invite_count;
        if ($user->invite_num <= 0 || $count <= 0) {    //如果抽奖次数为0，则提示邀请好友
            $this->ajaxOutPut(['status' => 1, 'share_url' => $share_url]);
        }

        if ($user->invite_num == 1 || $node == 1) {    //抽第一个奖池
            if ($node == 2 || $node == 3) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您没有达到开启该奖池的要求！']);
            }

            if ($user->lottery_node_1 == 1) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您已经开启该奖池，请开启其他奖池！']);
            }

            $id = self::_getRand($prize_arr[1]);
            if ($id == 0) {
                $res = ['status' => 0, 'id' => 0, 'is_repeat' => 1, 'msg' => '谢谢参与！'];
            } else {
                $res = Cms::getGiftNoYzm(Cms::getSession('login_cd_phone'), $id, Cms::GIFT_IS_REPEAT);
            }
        } else if ($user->invite_num == 2) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '对不起，您没有达到开启该奖池的要求！']);
        } else {
            if ($node == 2) {   //抽第二个奖池
                //京东卷为抽取完的情况下必须中京东卷
                $jd_arr=[69 => 5000, 70 => 5000];
                $id=self::_getRand($jd_arr);
                if($id){
                    $id=self::single(Cms::getSession('login_cd_phone'),$jd_arr,$id);
                    if($id==0){//京东卷已经领取过了
                        $id = self::_getRand($prize_arr[2]);
                        $id = self::single(Cms::getSession('login_cd_phone'),$prize_arr[2],$id);
                    }
                    $res = Cms::getGiftNoYzm(Cms::getSession('login_cd_phone'), $id, Cms::GIFT_IS_REPEAT);
                    if($res['status']==-1){
                        if ($id == 0) {
                            $res = ['status' => 0, 'id' => 0, 'is_repeat' => 1, 'msg' => '谢谢参与！'];
                        } else {
                            $res = Cms::getGiftNoYzm(Cms::getSession('login_cd_phone'), $id, Cms::GIFT_IS_REPEAT);
                        }
                    }
                }
            } else if ($node == 3) {    //抽第三个奖池
                //京东卷为抽取完的情况下必须中京东卷
//                $id=75;
//                $res = Cms::getGiftNoYzm(Cms::getSession('login_cd_phone'), $id, Cms::GIFT_IS_REPEAT);
//                if($res['status']==-1){
                    $id = self::_getRand($prize_arr[3]);
                    if ($id == 0) {
                        $res = ['status' => 0, 'id' => 0, 'is_repeat' => 1, 'msg' => '谢谢参与！'];
                    } else if ($id ==74) {    //实物
                        $res = ['status' => 0, 'id' => $id, 'is_repeat' => 0, 'msg' => '谢谢参与！', 'shiwu' => 1];
                    } else {
                        $res = Cms::getGiftNoYzm(Cms::getSession('login_cd_phone'), $id, Cms::GIFT_IS_REPEAT);
                    }
//                }
            }
        }

        $user->invite_count = $user->invite_count+1;
        $user->today_draw_count = $user->today_draw_count+1;
        $user->draw_time = time();

        if ($user->invite_num == 1 || $node == 1) { //1号奖池
            $user->lottery_node_1 = 1;
        }

        if (key_exists('shiwu' , $res)) {
            $count = CddzzUserModel::find()->where(['like', 'gift_ids', ','.$id.','])->count();
            if ($id==74 && $count >= 80) {
                $res['is_repeat'] = 1;
            } else {
                $gift_ids = trim($user->gift_ids, ',');
                $id_arr = explode(',', $gift_ids);
                if (!in_array($res['id'], $id_arr)) {
                    if (!$user->gift_ids) {
                        $user->gift_ids = ','.$id.',';
                    } else {
                        $user->gift_ids = $user->gift_ids.$id.',';
                    }
                } else {
                    $res['is_repeat'] = 1;
                }
            }
        }

        $user->save();

        if (($res['status'] == 0 && $res['is_repeat'] == 1) || $res['status'] != 0) {    //重复领取，获取领取失败，则自动跳转为谢谢参与
            $this->ajaxOutPut(['status' => 0, 'msg' => '谢谢参与！', 'id' =>0, 'gift_code' => '', 'gift_name' => '', 'user' => $user->getAttributes() ]);
        }
        $gift = Gift::findOne($id);
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'id' => self::GIFT_id[$id], 'gift_code' => $res['msg'], 'gift_name' => $gift['name'], 'user' => $user->getAttributes()]);
    }

    //每天中礼包码不能重复
    public function single($phone,$gifts,$gift_id){
        $id=0;
        $model=GiftCode::find()->where('phone=:phone and gift_id=:gift_id', array(':phone' => $phone, ':gift_id' => $gift_id))->orderBy(['created_at'=>SORT_DESC])->one();
        if($model){//有领取记录
            if($model->updated_at>strtotime(date('Y-m-d'))){//未领取过
                  $id=$gift_id;
            }else{
                unset($gifts[$gift_id]);//排除掉已中的礼包码
                foreach ($gifts as $key=>$value){
                   $id=self::single($phone,$gifts,$key);
                }
            }
        }else{
            $id=$gift_id;
        }
        return $id;
    }

    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private function _getRand($proArr) {
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
     * 获取预约人数
     */
    public function actionAjaxGetNum()
    {
        $count = Stat::find()->where(['name' => 'csmsl_total', 'website_id' => BaseActiveRecord::getWebsiteId()])->one();
        $this->ajaxOutPut(['status' => 0, 'msg' => $count['count']]);
    }

    public function actionMyTest(){
        //预约
        $this->actionAjaxYuyue();
        //获取验证码
//        $_POST['phone']='15181808256';
//        $this->actionAjaxLoginVerify();
        //登录
//        $_POST['phone']='15181808256';
//        $_POST['yzm']='348977';
//        $this->actionAjaxLogin();
        //抽奖
//        $_POST['node']=2;
//        $this->actionAjaxLottery();
         exit;


    }


}
