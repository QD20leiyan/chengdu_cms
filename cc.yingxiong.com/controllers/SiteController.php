<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\helpers\Utils;
use common\models\cc\CcCandidateModel;
use common\models\cc\CcEnlistModel;
use common\models\cc\CcUserGold;
use common\models\cc\CcUserVoteModel;
use common\models\Content;
use common\models\ContentPost;
use common\models\GiftCode;
use common\models\VerifyCode;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends PcController
{
    public static $serverHost = 'http://yx.sdksrv.com/sdksrv';
    public static $login="/c1/extra/auth/lgn.lg";//新的登陆接口 可账号 别名 手机号 邮箱 登陆
    public static $client_id = "n5zr61zbimwqfcse8agp";
    public $enableCsrfValidation=false;

    public function actionCover()
    {
        $data=[
        'video'=>$this->getContentDetail(416),
        'language'=>Cms::getSession('language'),
    ];
        return $this->renderPartial('cover.html',$data);
    }

    public function actionIndex()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        if (Cms::getSession('language') == 'zh_cn') {
            $qqzl=$this->getContentArr(\Yii::$app->params['QQZL'], 5);    //全球战力
            $hzmt=$this->getRecommend('coop_partner');
            $video=$this->getContentDetail(416);
            $zhanzheng = $this->getContentArr(57, 4);  //战争学院

            $banner = $this->getRecommend('banner');//首页轮播图
            //攻略
            $FAQ = $this->getContentArr(\Yii::$app->params['FAQ_GL'], 7);    //FAQ问答
            $trgs = $this->getContentArr(\Yii::$app->params['TRGS_GL'], 7);    //同人故事
            $xsgl = $this->getContentArr(\Yii::$app->params['XSGL_GL'], 7);    //新手攻略
            $jjgl = $this->getContentArr(\Yii::$app->params['JJGL_GL'], 7);    //进阶攻略
            //新闻
            $remen = $this->getContentArr(\Yii::$app->params['REMEN'], 6);    //热门;
            $xinwen = $this->getContentArr(\Yii::$app->params['XINWEN'], 6);    //新闻;
            $gonggao =$this->getContentArr(\Yii::$app->params['GONGGAO'],6);    //公告
            $huodong =$this->getContentArr(\Yii::$app->params['HUODONG'],6);    //活动
            $meiti=$this->getContentArr(\Yii::$app->params['MEITI'],6); //媒体
            $tjgl=$this->getContentArr(\Yii::$app->params['XSGL_GL'],3,'is_recommend');
            //种族
//            $r_tribe=$this->getContentArr(341,1); //人族
//            $s_tribe=$this->getContentArr(342,1);//神族
//            $y_tribe=$this->getContentArr(343,1);//妖族

            //视频
            $video_new=$this->getContentArr(\Yii::$app->params['VIDEO_NEW'],4);//最新
            $video_off=$this->getContentArr(\Yii::$app->params['VIDEO_OFF'],4);//官方
            $video_player=$this->getContentArr(\Yii::$app->params['VIDEO_PLAYER'],4);//玩家
            //$pic = $this->getRecommend('index_pic');    //新闻图片
//            $phyle = $this->getRecommend('phyle');    //种族
        } else {
            $xsgl='';
            $tjgl='';
            $jjgl='';
            $trgs='';
            $FAQ='';
            $remen='';
            $xinwen='';
            $gonggao='';
            $huodong='';
            $meiti='';
            $qqzl='';
            $hzmt='';
            $video_new='';
            $video_off='';
            $video_player='';

            $banner = $this->getRecommend('banner_en');    //首页banner
            $video = $this->getContentArr(126, 2);    //首页视频

            $FAQ = $this->getContentArr(90, 4);    //FAQ问答
            $zhanzheng = $this->getContentArr(91, 4);    //战争学院

            $xinwen = $this->getContentArr(92, 2,'sort');    //新闻
            $gonggao =$this->getContentArr(116,1);    //公告
            $huodong =$this->getContentArr(317,1);    //活动

           // $phyle = $this->getRecommend('phyle_en');    //种族
        }
        $data = [
            'xsgl'=>$xsgl,
            'tjgl'=>$tjgl,
            'jjgl'=>$jjgl,
            'trgs'=>$trgs,
            'FAQ'=>$FAQ,
            'remen'=>$remen,
            'xinwen'=>$xinwen,
            'gonggao'=>$gonggao,
            'huodong'=>$huodong,
            'meiti'=>$meiti,
            'qqzl'=>$qqzl,
            'hzmt'=>$hzmt,

//            'r_tribe'=>$r_tribe,
//            's_tribe'=>$s_tribe,
//            'y_tribe'=>$y_tribe,

            'video_new'=>$video_new,
            'video_off'=>$video_off,
            'video_player'=>$video_player,

            'video'=>$video,
            'zhanzheng'=>$zhanzheng,
            'banner'=>$banner,
            'captcha_img'=>$captcha_img,
            'language'=>Cms::getSession('language'),
            'tag'=>1,//方便前端识别页面
            'style'=>'site/index',
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        if(Cms::getSession('language') == 'zh_cn'){
            return $this->renderPartial('index.html', $data);
        }else{
            return $this->renderPartial('index_en.html', $data);
        }
    }

    /**
     * 远程登陆20160520添加
     * @param $username
     * @param $password
     * @return array
     */
    public function actionAjaxLogin()
{
    $username = Cms::getPostValue('username');
    $password = Cms::getPostValue('password');
    if (!$username) {
        echo Json::encode(['status' => -1, 'msg' => '用户名不能为空！']);exit;
    }

    if (!$password) {
        echo Json::encode(['status' => -1, 'msg' => '密码不能为空！']);exit;
    }
    $apiUrl = self::$serverHost . self::$login;
    $paramList = array();
    $paramList['loginName'] = $username;
    $paramList['password'] = $password;
    $paramList['client_id'] = self::$client_id;
    $paramList['response_type'] = 'code';
    $paramList['redirect_uri'] = '1';
    $paramList['market'] = 'AND';
    ksort($paramList);

    $requestData = Utils::sendHttpRequest($apiUrl,$paramList,'POST',null,3);
    if($requestData['info']['http_code'] != 200){
        echo Json::encode(array('status'=> -1, 'msg'=>'验证服务器无响应'));exit;
    }


    $returnArray = json_decode($requestData['content'],true);
    if(isset($returnArray['codes'])&&$returnArray['codes']==0){
        $loginName = isset($returnArray['username']) ? $returnArray['username'] : $username;
        Cms::setSession('loginName', $loginName);
        $msg = [
            'code'=>isset($returnArray['code']) ? $returnArray['code'] : '',
            'alias'=>isset($returnArray['alias']) ? $returnArray['alias'] : '',
            'phone'=>isset($returnArray['tel']) ? $returnArray['tel'] : '',
            'email'=>isset($returnArray['email']) ? $returnArray['email'] : '',
            'sdkuserid' => isset($returnArray['sdkuserid']) ? $returnArray['sdkuserid'] : '',
            'username'=> isset($returnArray['username']) ? $returnArray['username'] :$username,
            'idCard'=> isset($returnArray['idCard']) ? $returnArray['idCard'] : '',
            'realName'=> isset($returnArray['realName']) ? $returnArray['realName'] : '',
        ];
        echo Json::encode(array('status'=>0, 'msg' => $msg));exit;
    }

    if((isset($returnArray['codes']) && $returnArray['codes'] == 1) || (isset($returnArray['codes'][0]) && $returnArray['codes'][0] == 3)){
        echo Json::encode(array('status'=>-1,'msg'=>'用户名不存在'));exit;
    }

    if((isset($returnArray['codes']) && $returnArray['codes'] == 2) || (isset($returnArray['codes'][0]) && $returnArray['codes'][0] == 3) ){
        echo Json::encode(array('status'=>false,'msg'=>'密码错误'));exit;
    }
    echo Json::encode(array('status'=>false,'msg'=>'服务器错误'));exit;
}

    public function actionAjaxLogout()
    {
        Cms::setSession('loginName', '');
        echo Json::encode(['status' => 0]);
    }

    /**
     * 切换语言
     */
    public function actionAjaxChangeLanguage()
    {

        $language = Cms::getGetValue('language', 'zh_cn');
        Cms::setSession('language',$language);
        echo Json::encode(['status' => 0,'msg'=>Cms::getSession('language')]);
    }

    /**
     * 用户协议
     * @return string
     */
    public function actionProtocol()
    {
        return $this->renderPartial('protocol.html');
    }

    public function actionError()
    {
        return $this->render('error');
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

    /**主播展示**/
    public function actionVote(){
        //当前月月人气排行榜
        $model=CcCandidateModel::begin_end(array(),10);
//        随机15位主播
        $all_ids=CcCandidateModel::begin_end();
        $ids=[];
        if($all_ids){
            foreach ($all_ids as $k=>$v){
                $id=$v['id'];
                $ids[]=$id;
            }
        }
        if(\Yii::$app->request->isPost){
            $status=-1;
            $arr=array();
            //传一个已经主播ID数组
//          if(isset($_POST['vote']) && $_POST['status']){
          if($_POST['status']){
              if(count($ids)<=30){
                  shuffle($ids);//打乱
                  $arr = array_slice($ids, 0, 15);//初次随机15个
              }else{
                  $vote_id=\Yii::$app->session['ids'];
                  //去掉相同的主播ID
//              $ids=array_diff($ids,$_POST['vote']);
                  $ids=array_diff($ids,$vote_id);
                  //剩余的打乱
                  shuffle($ids);
                  //取出15个
                  $arr=array_slice($ids,0,15);
              }
              \Yii::$app->session['ids']=$arr;
              $status=1;
          }
          echo json_encode(['status'=>$status,'vote'=>CcCandidateModel::CandidateInfo($arr)]);exit;
        }else {
            shuffle($ids);//打乱
            $arr = array_slice($ids, 0, 15);//初次随机15个
            //存入session 中
            \Yii::$app->session['ids'] = $arr;
            $data = [
                'rank' => $model,
                'vote' => CcCandidateModel::CandidateInfo($arr),
                'language'=>Cms::getSession('language'),
            ];
            return $this->renderPartial('vote.html', $data);
        }
    }
    /**
     * 点击投票ajax 并遵守规则
     */
    public function actionVoteAjax(){
        //获取主播的 id
        if(\Yii::$app->request->isPost){
            //被投票主播及投票用户
            if(isset($_POST['u_id']) && isset($_POST['user'])){
               $user=CcUserVoteModel::find()->where(['phone'=>$_POST['user']])->one();
               $candi=CcCandidateModel::find()->where(['id'=>$_POST['u_id']])->one();
               if($user && $candi){
                   $login_time=date('d',$user->login_time);
                   $created_at=date('d',$user->created_at);
                   //每天的投票清空
                   if($login_time!==$created_at){
                       $user->candidate_id='';
                       $user->save();
                   }

                   if($user->candidate_id==null){//暂未投票的情况
                        $user->candidate_id=$_POST['u_id'].',';
                        $user->created_at=time();
                   }else if(count(explode(',',$user->candidate_id))<=3){//投过票但是没满3票
                       $user->candidate_id=$user->candidate_id.$_POST['u_id'].',';
                       $user->created_at=time();
                   }else{
                       echo json_encode(['status'=>-1,'msg'=>'每月最多为三位主播投票']);exit;
                   }
                   $candi->popValue=$candi->popValue+1;
                   $candi->save();
                   $user->save();
                   echo json_encode(['status'=>1,'msg'=>'投票成功','num'=>$candi->popValue]);exit;
               }else{
                   echo json_encode(['status'=>'101','msg'=>'未登录，请重新登录!']);exit;
               }
            }else{
                echo json_encode(['status'=>'102','msg'=>'请求参数缺失!']);exit;
            }
        }else{
            echo json_encode(['status'=>'103','msg'=>'请求失败!']);exit;
        }

    }

    /**********************主播报名****************************/
    public function actionEnlist(){
        $language=Cms::getSession('language');
        if(\Yii::$app->request->isAjax){
            $phone = Cms::getPostValue('zbphone');
            $code = Cms::getPostValue('yzm');
            $type = Cms::getPostValue('type',5);
            $isNoYzm = Cms::getPostValue('is_no_yzm');  //不需要验证验证码
            if(!Cms::checkPhone($phone))
            {
                $rez = array('status'=>-1, 'msg'=>'手机号错误，请重新填写');
                echo Json::encode($rez);
                exit;
            }
            $checkCode = VerifyCode::find()->where('phone=:phone and website_id=:website_id and type=:type and verify=:verify and status=1',
                [':phone' => $phone, ':website_id' => $this->website_id, ':type' => $type,':verify' => $code])->one();
            if ((!$code || !$checkCode) && !$isNoYzm) {
                $rez = array('status'=>-1, 'msg'=>'验证码不正确');
                echo Json::encode($rez);
                exit;
            }
            if (($checkCode['created_at'] < strtotime("-1 hours")) && !$isNoYzm) {
                $rez = array('status'=>-1, 'msg'=>'验证码已过期');
                echo Json::encode($rez);
                exit;
            }
            $model=CcEnlistModel::find()->where(['captain_phone'=>$phone])->one();
            if($model){
                echo json_encode(['status'=>-1,'msg'=>'此手机号码已报名！']);
                exit;
            }else {
                $enlist = new CcEnlistModel();
                $enlist->captain_name = Cms::getPostValue('zbname');
                $enlist->captain_phone = $phone;
                $enlist->captain_id = Cms::getPostValue('zbid');
                $enlist->team_one_name = Cms::getPostValue('dyonename');
                $enlist->team_one_id = Cms::getPostValue('dyoneid');
                $enlist->team_two_name = Cms::getPostValue('dytwoname');
                $enlist->team_two_id = Cms::getPostValue('dytwoid');
                $enlist->telecast_name = Cms::getPostValue('zbptname');
                $enlist->telecast_id = Cms::getPostValue('zbptid');
                $enlist->save();
                echo json_encode(['status' => 1, 'msg' => '报名成功']);
                exit;
            }
        }else{
            return $this->renderPartial('enlist.html',['language'=>$language]);
        }
    }

    /************************礼包码领取*****************/
    /***
     * 礼包码领取
     ***/
    public function actionAjaxGold()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type','android');
        $res = Cms::checkVerify(Cms::GIFT);
        if($res['status']==0) {
            $gift_id = 76;//安卓礼包码
            $code = GiftCode::find()->where(['status' => 0, 'gift_id' => $gift_id])->one();
            if (!$code) {
                $this->ajaxOutPut(['status' => -1, 'msg' => '礼包码已领完，请稍后再试！']);
            }
            $user = CcUserGold::find()->where(['user_phone' => $phone])->one();
            if ($user) {
                $this->ajaxOutPut(['status' => 0, 'msg' => $user->code]);
            }
            $user = new CcUserGold();
            $user->user_phone = "$phone";
            $res = Cms::getGiftNoYzm($phone, $gift_id, Cms::GIFT_IS_REPEAT);
            if ($res['status'] == 0) {
                $user->code = $res['msg'];
                $user->type = $type;
                $user->created_at = time();
                if($user->save()){
                    $this->ajaxOutPut(['status' => 0, 'msg' => $user->code]);
                }else{
                    pr($user->getErrors(),1);
                }
            }
        }else{
            $this->ajaxOutPut(['status' => $res['status'], 'msg' => $res['msg']]);
        }
    }

    /**
     **领礼包发送验证码
     */
    public function actionAjaxLoginVerify()
    {
        $phone = Cms::getPostValue('phone');
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }
        $user = CcUserGold::find()->where(['user_phone' => $phone])->one();
        if ($user) {
            $this->ajaxOutPut(['status' => 101, 'msg' => $user->code]);
        }
        $msg='您正在进行《战争艺术：赤潮》礼包领取验证，请于1小时内输入';
        $res = Cms::verify($phone, Cms::GIFT,$msg );
        $this->ajaxOutPut($res);
    }

    public function actionMyTest()
    {

//        /*****登录发送验证码*************/
//        $_POST['phone'] = 15181808256;
//        $this->actionAjaxLoginVerify();
//
//        exit;
        /******领礼包********/
//        $_POST['phone'] = 15181808256;
//        $_POST['yzm'] = 718997;
//        $this->actionAjaxGold();
//        exit;
    }

}
