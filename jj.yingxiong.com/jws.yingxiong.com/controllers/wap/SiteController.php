<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\components\WapController;
use common\models\Content;
use common\Cms;

use yii\web\Controller;

class SiteController extends WapController
{
    public function actionCover()
    {
        //首页和cover页视频
        $cover_video = $this->getRecommend('cover_video');
        //图文推荐
//        $imageText = $this->getRecommend('index_j_banner');

        $data=[
            'cover_video'=>$cover_video,
//            'style'=>'index',
//            'imageText'=>$imageText,
        ];
        return $this->renderPartial('cover_year.html',$data);
//        return $this->renderPartial('cover.html');
    }
    //增加一个统计入口
    public function actionExtend(){
        return $this->actionIndex();
    }

    /**
     *
     * 首页
     *
     */
    public function actionIndex()
    {
        //首页cover页视频
        $cover_video = $this->getRecommend('cover_video');
        //wap端banner轮播
        $wap_banner = $this->getRecommend('wap_banner');
        //首页视频
        $video = $this->getContentArr(\Yii::$app->params['VIDEO'],4);
        //最新
        $zx = $this->getContentArr(\Yii::$app->params['ZONGHE'],6);
        //新闻
        $xw = $this->getContentArr(\Yii::$app->params['XINWEN'],6);
        //公告
        $gg = $this->getContentArr(\Yii::$app->params['GONGGAO'],6);
        //活动
        $hd = $this->getContentArr(\Yii::$app->params['HUODONG'],6);
//角色数据
        $roles=[];
        $role_all=$this->getContentArr(\Yii::$app->params['JUESE'],4);
//        pr($role_all,1);
        if($role_all) {
            foreach ($role_all as $key => $value) {
                $info=$this->parse_jws_attr(strip_tags($value['content_message']),1);//技能
                $role['title']=$value['title'];
                $role['created_at']=$value['created_at'];
                $role['redirect_url']=$value['thumb'];
                $role['info']=$info;
                $roles[]=$role;
            }
        }
        $data=array(
            'banner'=>$wap_banner,
            'cover_video'=>$cover_video,
            'video'=>$video,
            'roles'=>$roles,
            'zx'=>$zx,
            'xw'=>$xw,
            'gg'=>$gg,
            'hd'=>$hd,
        );
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('index.html',$data);


//        //wap端solgan
//        $solgan_wap = $this->getRecommend('solgan_wap');
//        //首页礼包图片图片
//        $gift_image= $this->getRecommend('gift_image');
////图文推荐
//        $imageText = $this->getRecommend('image_text');
//
//        //最新
//        $news['zx'] = $this->getContentArr(\Yii::$app->params['ZONGHE'],6);
//        //新闻
//        $news['xw'] = $this->getContentArr(\Yii::$app->params['XINWEN'],6);
//        //公告
//        $news['gg'] = $this->getContentArr(\Yii::$app->params['GONGGAO'],6);
//        //活动
//        $news['hd'] = $this->getContentArr(\Yii::$app->params['HUODONG'],6);
//        //攻略
//        $news['gl'] = $this->getContentArr(\Yii::$app->params['GONGLUE'],6);
//
//        //媒体
//        $news['mt']  = $this->getContentArr(\Yii::$app->params['MEITI'],6);
//
//        //风云
//        $news['fy']  = $this->getContentArr(\Yii::$app->params['FENGYUN'],6);
//
//       return $this->renderPartial('index',array(
//            'wap_banner'=>$wap_banner,
//            'cover_video'=>$cover_video,
//            'news'=>$news,
//            'solgan_wap'=>$solgan_wap,
//            'gift_image'=>$gift_image,
//            'imageText'=>$imageText
//        ));
    }


    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }






















    /**
     *
     * 列表页面
     *
     */
    public function actionList()
    {
        $cid = Cms::getGetValue('cid');
//        $model = CategoryModel::model()->findByPk($cid);
//        $cat = CategoryModel::model()->findByPk((int)$cid);
        $content=new Content();
        $category_ids = self::getChildren($cid);
        $list=$content->getContentLists($category_ids,11);
        pr($list,1);
//        //首页礼包图片图片
        $gift_image= $this->getRecommend('gift_image');
//        //ajax请求
//        if(Yii::app()->request->isAjaxRequest) {
//            $begin = Yii::app()->request->getParam('begin');
//            $cid = Yii::app()->request->getParam('cid');
//            $information = $this->getArticles($cid,$size=1000);
//            $information = $information->getData();
//            $information = array_slice($information,$begin, 8);
//            if(empty($information)){
//                echo CJSON::encode(0);
//            }else{
//                foreach($information as $v){
//                    $v['pub_time'] = date('Y-m-d',$v['pub_time']);
//                }
//                echo CJSON::encode($information);
//            }
//        }
        $dataProvider = $this->getArticles($cid);
//        $data = $dataProvider->getData();
//        $count = count($data);
//        $this->renderPartial('list', array(
//            'articleData' => $dataProvider,
//            'cat' => $cat,
//            'model' => $model,
//            'cid'=>$cid,
//            'count'=>$count,
//            'gift_image'=>$gift_image
//        ));
    }

//    public function actionError()
//    {
//        return $this->render('error');
//    }


}
