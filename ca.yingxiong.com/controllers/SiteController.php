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
use common\models\ButtonClick;
use common\models\ButtonClickNum;
use common\models\ca\CaGiftCodeModel;
use common\models\ca\CaLotteryUserModel;
use common\models\GiftCode;
use common\models\UserCenter;
use yii\captcha\Captcha;
use yii\helpers\Json;
use common\components\phpexcel\Excel;

class SiteController extends PcController
{
    const SESSION_RELATION = 'relation_phone';

    public function actionCover()
    {
        return $this->renderPartial('cover.html');

        return $this->renderPartial('/page/anniversary1.html');

        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        return $this->renderPartial('/page/legend.html', ['captcha_img'=> $captcha_img]);
    }

    public function actionIndex()
    {
        $data = [];
        $data['kv_video'] = $this->getRecommend('kv_video',1);    //KV—视频
        $data['kv_video'] = $data['kv_video'][0];
        $data['activity'] = $this->getRecommend('activity');    //精彩活动
        $data['banner'] = $this->getRecommend('banner');    //banner
        $data['zx'] = $this->getContentArr('319', 6);   //最新
        $data['xw'] = $this->getContentArr('320', 6);   //新闻
        $data['gg'] = $this->getContentArr('321', 6);   //公告
        $data['hd'] = $this->getContentArr('322', 6);   //活动
        $data['gl'] = $this->getContentArr('323', 6);   //攻略

        $data['role'] = $this->getRecommend('new_game_role');    //角色专题
        $data['gun'] = $this->getRecommend('new_gun_all');    //明枪管
        $data['map'] = $this->getRecommend('new_map_view');    //地图

        $data['video_zx'] = $this->getContentArr('329', 6);   //视频中心-最新
        $data['video_gf'] = $this->getContentArr('330', 6);   //官方视频
        $data['video_zb'] = $this->getContentArr('331', 6);   //直播
        $data['video_ss'] = $this->getContentArr('332', 6);   //赛事
        $data['video_wq'] = $this->getContentArr('333', 6);   //武器
        $data['video_xs'] = $this->getContentArr('334', 6);   //新手

        $data['gl_zx'] = $this->getContentArr('324', 6);   //攻略中心-最新
        $data['gl_wq'] = $this->getContentArr('325', 6);   //武器
        $data['gl_pvp'] = $this->getContentArr('326', 6);   //PVP
        $data['gl_pve'] = $this->getContentArr('327', 6);   //PVE
        $data['gl_xs'] = $this->getContentArr('328', 6);   //新手

        $data['video_gl_zx'] = $this->getContentArr('335', 6);   //视频攻略-最新
        $data['video_gl_wq'] = $this->getContentArr('336', 6);   //武器
        $data['video_gl_pvp'] = $this->getContentArr('337', 6);   //PVP
        $data['video_gl_pve'] = $this->getContentArr('338', 6);   //PVE
        $data['video_gl_xs'] = $this->getContentArr('339', 6);   //新手

        $data['match_act'] = $this->getRecommend('match_act');    //赛事活动


//        $data['player_mx'] = $data['video_gl_xs'] = $this->getContentArr('359', 10);   //新手;    //	大神玩家-明星玩家
//        $data['player_xs'] = $data['video_gl_xs'] = $this->getContentArr('358', 10);   //新手;    //大神玩家-职业选手
//        $data['jj_jf'] = $data['video_gl_xs'] = $this->getContentArr('361', 10);    //竞技排行-积分

        $data['player_mx']  = $this->getContentArr('359', 10);   //新手;    //	大神玩家-明星玩家
        $data['player_xs'] = $this->getContentArr('358', 10);   //新手;    //大神玩家-职业选手
        $data['jj_jf']  = $this->getContentArr('361', 10);    //竞技排行-积分
        $data['tougao'] = $this->getRecommend('tougao');    //投稿
        $data['tougao'] = $data['tougao'][0];
        return $this->renderPartial('index.html', $data);
    }

    public function actionError()
    {
        return $this->render('error');
    }



/***************************************抽奖页面******************************/
    /**
     * 抽奖cover页
     * @return string
     */
    public function actionLottery()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $video=$this->getRecommend('kv_video');    //KV—视频
        return $this->renderPartial('lottery.html', ['captcha_img' => $captcha_img,'video'=>isset($video[0])?$video[0]:'']);
    }

    //登录发送验证码
    public function actionAjaxLotteryLoginVerify()
    {
        if(time()<strtotime('2018-3-5')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动还未开始！']);
        }elseif(time()>=strtotime('2018-3-11 23:59:59')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动已结束！']);
        }else {
            $captcha = Cms::getPostValue('captcha');
            $res = $this->createAction('captcha')->validate($captcha, false);
            if (!$res) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
            }

            $phone = Cms::getPostValue('phone');
            $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《全民枪战》抽奖活动登录，请于1小时内输入');
            $this->ajaxOutPut($res);
        }
    }

    /**
     * 抽奖登录及每天登录赠送一次抽奖机会
     */
    public function actionAjaxLotteryLogin()
    {
        if(time()<strtotime('2018-3-5')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动还未开始！']);
        }elseif(time()>=strtotime('2018-3-11 23:59:59')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动已结束！']);
        }else {
            $phone = Cms::getPostValue('phone');
            $res = Cms::checkVerify(Cms::SM_LOGIN);
            if ($res['status'] == 0) {
                Cms::setSession('lottery_ca_phone', $phone);
                $user = CaLotteryUserModel::find()->where('phone = :phone', [':phone' => $phone])->one();
                if (!$user) {
                    $user = new CaLotteryUserModel();
                    $user->phone = (string)$phone;
                    $user->login_time = time();
                    $user->lottery_count = 1;
                    $user->created_at = time();
                } else {
                    if ($user->login_time < strtotime(date('Y-m-d'))) {
                        $user->lottery_count = $user->lottery_count + 1;  //每天第一次登录增加抽奖次数
                    }
                    $user->login_time = time();
                }
                $user->updated_at = time();
                $user->save();
                $msg = $user->attributes;
                $this->ajaxOutPut(['status' => 0, 'msg' => $msg]);
            }
            $this->ajaxOutPut($res);
        }
    }

    /**
     * 注销登录
     */
    public function actionAjaxLoginOut(){
        $session = \Yii::$app->session;
        $session->remove('lottery_ca_phone');
        $status=-1;
        $msg='注销失败!';
        if(!isset(\Yii::$app->session['lottery_ca_phone'])) {
            $status='0';
            $msg='注销成功!';
        }
        echo Json::encode(['status' => $status, 'msg' =>$msg]);
    }

    /**
     * 每天分享赠送一次机会
     */
    public function actionAjaxLotteryShare()
    {
        $user = $this->_checkAjaxLotteryLogin();
        if ($user['share_time'] < strtotime(date('Y-m-d'))) {
            $user->share_count = $user->share_count+1;
            $user->lottery_count = $user->lottery_count+1;
        } else {
            $this->ajaxOutPut(['status' => 0, 'msg' => '', 'lottery_count' => $user->lottery_count]);
        }
        $user->share_time = time();
        $user->updated_at = time();
        $user->save();
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'lottery_count' => $user->lottery_count]);
    }

    /**
     * 抽奖判断用户是否登录
     */
    public function actionAjaxLotteryGetUser()
    {
        $user = $this->_checkAjaxLotteryLogin();
        $this->ajaxOutPut(['status' => 0, 'msg' => '', 'phone' => $user['phone'], 'lottery_count' => $user['lottery_count']]);
    }

    /**
     * 检查是否登录
     * @return array|null|\yii\db\ActiveRecord
     */
    private function _checkAjaxLotteryLogin()
    {
        $lottery_phone = Cms::getSession('lottery_ca_phone');
        if (!$lottery_phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '登陆超时，请重新登录！']);
        }

        $user = CaLotteryUserModel::find()->where('phone = :phone', [':phone' => $lottery_phone])->one();
        if (!$user) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '登陆超时，请重新登录！']);
        }
        return $user;
    }

    /**
     * 通过次数获取礼包箱
     * @param $lottery_num
     * @return array
     */
    private function _getGl($lottery_num)
    {
        $res = [];
        if($lottery_num==0 || $lottery_num==3 || $lottery_num==6 ||$lottery_num==9 || $lottery_num==12){
            $res['gift']='A';
        }else if($lottery_num==1 || $lottery_num==4 || $lottery_num==7 ||$lottery_num==10 || $lottery_num==13){
            $res['gift']='B';
        }else{
            $res['gift']='C';
        }
        return $res;
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
     * 中奖记录
     */
    public function actionAjaxLotteryLog()
    {
        $gift = CaGiftCodeModel::find()->andWhere(['status' => 1])->with('gift')->orderBy('updated_at desc')->limit(100)->asArray()->all();
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
     * 用户中奖记录
     */
    public function actionAjaxLotteryMeLog()
    {
        $this->_checkAjaxLotteryLogin();
        $phone = Cms::getSession('lottery_ca_phone');
        $gift = CaGiftCodeModel::find()->where('phone = :phone', [':phone' => $phone])->with('gift')->asArray()->all();
        $data = [];
        $lottery_gift = [17 => 1, 18 => 2, 19=> 3, 20 => 4, 21 => 5, 22 => 7, 23 => 8];
        if ($gift) {
            foreach ($gift as $v) {
                $tmp = [];
                $tmp['name'] = $v['gift']['name'];
                $tmp['code'] = $v['code'];
                $tmp['gift_id'] = $lottery_gift[$v['gift_id']];
                $data[] = $tmp;
            }
        }
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }


    /**
     * 抽奖
     */
    public function actionAjaxLottery()
    {
        if(time()<strtotime('2018-3-5')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动还未开始！']);
        }elseif(time()>=strtotime('2018-3-11 23:59:59')){
            $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖活动已结束！']);
        }else {
            //奖品列表与数据库ID对应
            $lottery_gift = [1 => 17, 2 => 18, 3 => 19, 4 => 20, 5 => 21, 7 => 22, 8 => 23];
            $prize_arr = [
                'A' => [
                    'value' => [
                        ['id' => 1, 'prize' => '开学乐享礼包', 'v' => 50000, 'min' => 0],
                        ['id' => 2, 'prize' => '小恐龙显示礼包', 'v' => 30000, 'min' => 0],
                        ['id' => 3, 'prize' => '黑骑士碎片礼包', 'v' => 10000, 'min' => 6],
                        ['id' => 6, 'prize' => '谢谢参与', 'v' => 60000, 'min' => 0],
                    ],
                ],
                'B' => [
                    'value' => [
                        ['id' => 4, 'prize' => '开学钻石大礼包', 'v' => 30000, 'min' => 0],
                        ['id' => 6, 'prize' => '谢谢参与', 'v' => 40000, 'min' => 0],
                    ],
                ],
                'C' => [
                    'value' => [
                        ['id' => 5, 'prize' => '温莎代金券', 'v' => 40000, 'min' => 2],
                        ['id' => 7, 'prize' => '邪骑士碎片礼包', 'v' => 30000, 'min' => 2],
                        ['id' => 8, 'prize' => '永久混沌恶魔', 'v' => 100, 'min' => 8],
                        ['id' => 6, 'prize' => '谢谢参与', 'v' => 30000, 'min' => 0],
                    ],
                ],
            ];
            $lottery_phone = Cms::getSession('lottery_ca_phone');
            $user = $this->_checkAjaxLotteryLogin();
            if ($user['lottery_count'] <= 0) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '抽奖机会已经用完！']);
            }
            $gailv = $this->_getGl($user['lottery_num']);//根据抽过的次数来判断用户需要去那个包
            $jp_arr = $prize_arr[$gailv['gift']]['value'];
            $jp_val_arr = [];
            foreach ($jp_arr as $k => $v) {
                if ($user['lottery_num'] >= $v['min']) {
                    $jp_val_arr[$v['id']] = $v['v'];//根据抽奖的次数增加中奖的记录会会越来越大
                }
            }
            $id = $this->_getRand($jp_val_arr);
            if ($id == 8) { //如果中奖永久混沌恶魔,并且没有，则自动变为温莎代金券
                $gift_code_count = CaGiftCodeModel::find()->where(['gift_id' => $lottery_gift[$id]])->andWhere(['status' => 0])->count();
                if ($gift_code_count <= 0) {
                    $id = 5;
                }
            }
            if ($id == 5) {//如果中奖温莎代金券,并且没有，则自动变为开学钻石大礼包
                $gift_code_count = CaGiftCodeModel::find()->where(['gift_id' => $lottery_gift[$id]])->andWhere(['status' => 0])->count();
                if ($gift_code_count <= 0) {
                    $id = 4;
                }
            }
            if ($id != 6) { //谢谢参与不用领取礼包
                $exist_phone = CaGiftCodeModel::find()
                    ->where('phone=:phone and gift_id=:gift_id', array(':phone' => $lottery_phone, ':gift_id' => $lottery_gift[$id]))
                    ->one();
                if ($exist_phone) {
                    unset($jp_val_arr[$id]);
                    $id = $this->_getRand($jp_val_arr);
                }
                if($id==6){
                    $this->ajaxOutPut(['status' => 0, 'msg' => '', 'id' => $id, 'code' => '', 'count' => $user->lottery_count]);
                }
                if ($id == 8) { //如果中奖永久混沌恶魔,并且没有，则自动变为温莎代金券
                    $gift_code_count = CaGiftCodeModel::find()->where(['gift_id' => $lottery_gift[$id]])->andWhere(['status' => 0])->count();
                    if ($gift_code_count <= 0) {
                        $id = 5;
                    }
                }
                if ($id == 5) {//如果中奖温莎代金券,并且没有，则自动变为开学钻石大礼包
                    $gift_code_count = CaGiftCodeModel::find()->where(['gift_id' => $lottery_gift[$id]])->andWhere(['status' => 0])->count();
                    if ($gift_code_count <= 0) {
                        $id = 4;
                    }
                }

                $res = $this->getGiftNoYzm($lottery_phone, $lottery_gift[$id]);
                if ($res['status'] != 0 ) {
                    $res['id'] = $id;
                    $this->ajaxOutPut($res);
                }
            } else {
                $res['msg'] = '';
            }
            $user->lottery_count = $user->lottery_count - 1;
            $user->lottery_num = $user->lottery_num + 1;
            $user->save();

            $this->ajaxOutPut(['status' => 0, 'msg' => '', 'id' => $id, 'code' => $res['msg'], 'count' => $user->lottery_count]);
        }
    }

   /**
     * 获取礼包码 不需要验证码
     * @param $phone
     * @param $gift_id
     * @return mixed
     */
    public function getGiftNoYzm($phone, $gift_id)
{
    $res = array('status' => -1);
    $gift = CaGiftCodeModel::find()->where(['status' => 0, 'gift_id' => $gift_id])->orderBy(['id' => SORT_ASC])->one();
    if (!$gift) {
        $res['msg'] = '很遗憾，礼包码已经全部领取完！';
    } else {
        $gift->phone = (string)$phone;
        $gift->created_at = date('Y-m-d H:i:s');
        $gift->updated_at = date('Y-m-d H:i:s');
        $gift->status = 1;
        if ($gift->save()) {
            $res['status'] = 0;
            $res['msg'] = $gift->code;
        } else {
            $res['msg'] = '领取失败， 请重新领取！';
        }
    }

    return $res;
}

    /**
     * 记录用户操作按钮的次数
     ***/
    public function actionAjaxClick(){
       $this->_checkAjaxLotteryLogin();
       $type=Cms::getPostValue('type',1);//1 pc  2 wap
       $button_id=Cms::getPostValue('id');
       $button=ButtonClick::find()->where(['id'=>$button_id])->one();
       if($button){
          $button_click=new ButtonClickNum();
          $button_click->website_id=BaseActiveRecord::getWebsiteId();
          $button_click->button_id=$button_id;
          $button_click->user_phone=Cms::getSession('lottery_ca_phone');
          $button_click->user_ip=Cms::getClientIp();
          $button_click->type=$type;
          $button_click->c_num=1;
          $button_click->created_at=time();
          if($button_click->save()) {
              $this->ajaxOutPut(['status'=>0,'msg'=>'success']);
          }
       }
       $this->ajaxOutPut(['status'=>-1,'msg'=>'网络错误，请稍后再试！']);
    }


    /*********************************************************《全民枪战2》古墓丽影合作活动*****************************************************/

    public function actionActivity(){
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $video = $this->getRecommend('kv_video',1);    //KV—视频
        $arr=[51,52,53,54];
        $day=date('Y-m-d');
        $jewel_num=GiftCode::find()->where(['in','gift_id',$arr])->andWhere(['status'=>1])->andWhere(['between','updated_at',$day,$day.' 23:59:59'])->count();
        $jewel_num=10000-$jewel_num;
        $img=$this->getRecommend('gm_activity_img');
        $data=[
            'captcha_img'=>$captcha_img,
            'video'=>isset($video[0])?$video[0]:'',
            'jewel_num'=>$jewel_num,
            'img'=>$img,
        ];
      return  $this->renderPartial('activity.html',$data);
    }
    /**
     * 预约/登录功能
     */
    public function actionAjaxActivityLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《全民枪战2》预约活动验证，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    /**
     * 游戏账号关联手机号
     */
    public function actionRelationPhone()
    {
        $zh = Cms::getPostValue('zh');
        $phone = Cms::getPostValue('phone');
        $yzm = Cms::getPostValue('yzm');
        if (!$zh || mb_strlen($zh) > 50) {
            $this->echoJson(5);
        }
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->echoJson(2);
        }
        $check = Cms::checkVerify(Cms::YUYUE_SCENE_OLD);
        if ($check['status'] != 0) {
            $this->echoJson(3, $check['msg']);
        }
        $user = UserCenter::getUserByPhone($this->website_id, $phone);
        if ($user) {
            if ($zh != $user['email']) {
                $this->echoJson(4, '', ['zh' => $user['email']]);
            }
            Cms::setSession(self::SESSION_RELATION, $phone);
            $this->echoJson(0);
        }
        UserCenter::addUser($this->website_id, $phone, $zh, 0, [], '', UserCenter::EMAIL_KEY_IS_NOT_MUST);
        Cms::setSession(self::SESSION_RELATION, $phone);
        $this->echoJson(0);
    }

    /**
     * 获取用户信息
     */
    public function actionGetUserInfoRelation()
    {
        $phone = Cms::getSession(self::SESSION_RELATION);
        if (!$phone) {
            $this->echoJson(1);
        }
        $user = UserCenter::getUserByPhone($this->website_id, $phone);
        $this->echoJson(0, '', $user);
    }

    /**
     * 注销
     */
    public function actionLogoutRelation()
    {
        Cms::setSession(self::SESSION_RELATION, '');
        $this->echoJson(0);
    }

    public function actionMyTest($type = '', $id = '')
    {
        /******抽奖中奖列表********/
//        $this->actionAjaxLotteryLog();
//        exit;
//
//        /*******抽奖分享获得抽奖次数***********/
//        $this->actionAjaxLotteryShare();
//        exit;

        /*******抽奖登录*********/
//        $_POST['phone'] = 15181808256;
//        $_POST['yzm'] = 289129;
//        $this->actionAjaxLotteryLogin();
//        exit;

        /******登录发送验证码***************/
//        $_POST['phone'] = 15181808256;
//        $this->actionAjaxLotteryLoginVerify();
//        exit;

        /******抽奖*************/
//Cms::setSession('lottery_ca_phone','15181808256');
        $this->actionActivity();
        exit;

    }


}








