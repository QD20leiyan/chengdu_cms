<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\HomeController;
use common\components\WapController;
use common\models\cc\CcCandidateModel;
use common\models\cc\CcEnlistModel;
use common\models\cc\CcUserVoteModel;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;
use common\helpers\Utils;
use common\models\VerifyCode;
use yii\captcha\Captcha;
use yii\helpers\Json;

class SiteController extends WapController
{
    public $enableCsrfValidation=false;
    public function actionCover()
    {
        $data=[
            'video'=>$this->getContentDetail(416),
            'language'=>Cms::getSession('language'),
        ];
        return $this->render('cover.html',$data);
    }

    public function actionIndex()
    {
        if($_SERVER['HTTP_HOST']=='rts.yingxiong.com'){
            $data=[
                'video'=>$this->getContentDetail(416),
                'language'=>Cms::getSession('language'),
            ];
            return $this->render('cover.html',$data);
        }
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);


        if (Cms::getSession('language') == 'zh_cn') {
            $banner = $this->getRecommend('banner');    //首页banner

            $video=$this->getContentDetail(416);
//            $zhanzheng = $this->getContentArr(57, 4);    //战争学院

            //攻略
            $FAQ = $this->getContentArr(\Yii::$app->params['FAQ_GL'], 5);    //FAQ问答
            $trgs = $this->getContentArr(\Yii::$app->params['TRGS_GL'], 5);    //同人故事
            $xsgl = $this->getContentArr(\Yii::$app->params['XSGL_GL'], 5);    //新手攻略
            $jjgl = $this->getContentArr(\Yii::$app->params['JJGL_GL'], 5);    //进阶攻略
            //新闻
            $remen = $this->getContentArr(\Yii::$app->params['REMEN'], 5);    //热门;
            $xinwen = $this->getContentArr(\Yii::$app->params['XINWEN'], 5);    //新闻;
            $gonggao =$this->getContentArr(\Yii::$app->params['GONGGAO'],5);    //公告
            $huodong =$this->getContentArr(\Yii::$app->params['HUODONG'],5);    //活动
            $meiti=$this->getContentArr(\Yii::$app->params['MEITI'],5); //媒体

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
            $data = [
                'xsgl'=>$xsgl,
                'jjgl'=>$jjgl,
                'trgs'=>$trgs,
                'FAQ'=>$FAQ,
                'remen'=>$remen,
                'xinwen'=>$xinwen,
                'gonggao'=>$gonggao,
                'huodong'=>$huodong,
                'meiti'=>$meiti,
                'banner'=>$banner,

//            'r_tribe'=>$r_tribe,
//            's_tribe'=>$s_tribe,
//            'y_tribe'=>$y_tribe,

                'video_new'=>$video_new,
                'video_off'=>$video_off,
                'video_player'=>$video_player,
                'captcha_img'=>$captcha_img,

                'video'=>$video,
                'language'=>Cms::getSession('language'),
                'tag'=>1,//方便前端识别页面
                'style'=>'site/index',
            ];
            return $this->renderPartial('index.html', $data);
        } else {
            $banner = $this->getRecommend('banner_en');    //首页banner
            $video = $this->getContentArr(126, 1);    //首页视频

            $FAQ = $this->getContentArr(90, 4);    //FAQ问答
            $zhanzheng = $this->getContentArr(91, 4);    //战争学院

            $xinwen = $this->getContentArr(92, 2,'sort');    //新闻
            $gonggao =$this->getContentArr(116,1);    //公告
            $huodong =$this->getContentArr(317,1);    //活动

            // $phyle = $this->getRecommend('phyle_en');    //种族
            $data = [
                //'banner' => $banner,
                'video' => $video,
                'FAQ' => $FAQ,
                'zhanzheng' => $zhanzheng,
                'xinwen' => $xinwen,
                'banner' =>  $banner,
                'gonggao'=>$gonggao,
                'captcha_img'=>$captcha_img,
                'language'=>Cms::getSession('language'),
                //'phyle' => $phyle,
            ];

            return $this->renderPartial('index_en.html', $data);
        }
    }

    public function actionError()
    {
        return $this->render('error');
    }


    //前端数据查看
    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type1', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }
    /**主播展示**/
    public function actionVote(){
        //当前月月人气排行榜
        $model=CcCandidateModel::begin_end(array(),10);
//        随机6位主播
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
                if(count($ids)<=12){
                    shuffle($ids);//打乱
                    $arr = array_slice($ids, 0, 6);//初次随机6个
                }else{
                    $vote_id=\Yii::$app->session['ids'];
                    //去掉相同的主播ID
//              $ids=array_diff($ids,$_POST['vote']);
                    $ids=array_diff($ids,$vote_id);
                    //剩余的打乱
                    shuffle($ids);
                    //取出6个
                    $arr=array_slice($ids,0,6);
                }
                \Yii::$app->session['ids']=$arr;
                $status=1;
            }
            echo json_encode(['status'=>$status,'vote'=>CcCandidateModel::CandidateInfo($arr)]);exit;
        }else {
            shuffle($ids);//打乱
            $arr = array_slice($ids, 0, 6);//初次随机6个
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
                        echo json_encode(['status'=>-1,'msg'=>'每天最多为三位主播投票']);exit;
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

}
