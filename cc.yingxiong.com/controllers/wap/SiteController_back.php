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
use common\models\cc\CcUserVoteModel;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;
use common\helpers\Utils;
use yii\helpers\Json;

class SiteController extends WapController
{

    public function actionCover()
    {
        return $this->render('cover');
    }

    public function actionIndex()
    {
//        $banner=$this->getRecommend('banner',2);//首页轮播图

        if (Cms::getSession('language') == 'zh_cn') {
            // $banner = $this->getRecommend('banner');    //首页banner
            $video = $this->getContentArr(55, 1);    //首页视频
            $FAQ = $this->getContentArr(56, 4);    //FAQ问答
            $zhanzheng = $this->getContentArr(57, 4);    //战争学院
            $xinwen = $this->getContentArr(63, 4,'sort');    //新闻;
            $gonggao =$this->getContentArr(115,1);    //公告

            //$pic = $this->getRecommend('index_pic');    //新闻图片
            //$phyle = $this->getRecommend('phyle');    //种族
        } else {
            //$banner = $this->getRecommend('banner_en');    //首页banner
            $video = $this->getContentArr(126, 1);    //首页视频
            $FAQ = $this->getContentArr(90, 4);    //FAQ问答
            $zhanzheng = $this->getContentArr(91, 4);    //战争学院
            $xinwen = $this->getContentArr(92, 4,'sort');    //新闻
            $gonggao =$this->getContentArr(116,1);    //公告

            // $phyle = $this->getRecommend('phyle_en');    //种族
        }
        $data = [
            //'banner' => $banner,
            'video' => $video,
            'FAQ' => $FAQ,
            'zhanzheng' => $zhanzheng,
            'xinwen' => $xinwen,
//            'banner' =>  $banner,
            'gonggao'=>$gonggao,
            'language'=>Cms::getSession('language'),
            //'phyle' => $phyle,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('index.html', $data);
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

}
