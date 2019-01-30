<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use Yii;
use common\Cms;
use yii\widgets\LinkPager;


class VideoController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $data=$this->_list();
        $data['type']='gonglue';
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        if(Cms::getSession('language') == 'zh_cn'){
            return $this->renderPartial('index.html', $data,$data['categoryId']);
        }else{
            return $this->renderPartial('index_en.html', $data,$data['category_id']);
        }

    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail], 0, $id);
    }


    public function _list()
    {
        $type=Cms::getGetValue('type');
        if(Cms::getSession('language') == 'zh_cn'){//中文
            $banner = $this->getRecommend('video_banner');    //首页banner
            switch ($type){
                case 'zxsp' ://最新视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_NEW']);
                    break;
                case 'gfsp' ://官方视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_OFF']);
                    break;
                case 'wjsp' ://玩家视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_PLAYER']);
                    break;
                default:
                    exit('该网页找不到');
            }
        }
       if(Cms::getSession('language') == 'zh_cn'){
           $right_list = $this->getContentArr(\Yii::$app->params['XINWEN'], 5);    //新手攻略
           $stype=$this->actionStype($categoryId);
           $content = new Content();
           $category_ids = self::getChildren($categoryId);
           $list = $content->getContentLists($category_ids, 12);
           if(!empty($list['data'])){
               $page = LinkPager::widget([
                   'pagination' => $list['page'],
                   'hideOnSinglePage' => false,
                   'firstPageLabel' => '首页',
                   'lastPageLabel' => '尾页',
                   'options' => ['class' => 'page'],
                   'nextPageLabel' => '下一页',
                   'prevPageLabel' => '上一页',
                   'maxButtonCount' => 7
               ]);
               $data = [
                   'data' => $list['data'],
                   'page' => $page,
                   'language'=>Cms::getSession('language'),
                   'style'=>$stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
                   'tag'=>1,//方便前端识别页面
                   'version'=>VERSION
               ];
           }else{
               $data=[
                   'language'=> Cms::getSession('language'),
                   'style'=> $stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
                   'tag'=> 1,//方便前端识别页面
                   'data' => [],
                   'version'=>VERSION
               ];
           }

           $data['categoryId'] = $categoryId;
           $data['banner']=$banner;
           $data['right_list'] = $right_list;
        }else{
           $banner = $this->getRecommend('video_banner');    //首页banner
           $xuanchuan = $this->getContentArr(128);    //官方宣传
           $jingcai = $this->getContentArr(129);    //精彩赛事
           $remen = $this->getContentArr(130);    //热门英雄
           $jieshuo = $this->getContentArr(131);    //解说视频
           $category_id = 127;
           $data = [
               'banner' => $banner,
               'xuanchuan' => $xuanchuan,
               'jingcai' => $jingcai,
               'hot' => $remen,
               'jieshuo' => $jieshuo,
               'category_id' => $category_id,
               'language'=>Cms::getSession('language'),
               'style'=>'video',//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
               'tag'=>1,//方便前端识别页面
           ];
       }
        return $data;
    }
    private function actionStype($categoryId){
        if($categoryId == 59 || $categoryId == 128){
            $stype='gfsp';
        }elseif ($categoryId == 62|| $categoryId == 131){
            $stype='wjsp';
        }elseif ($categoryId == 58){
            $stype='zxsp';
        }
        return $stype;
    }
    public function actionAjaxList()
    {
        $data = $this->_list();
        $html = $this->renderPartial('ajax_list.html', $data);
        $this->ajaxOutPut(['status' => 0, 'msg' => $html]);
    }


    public function actionTest($type1 = '', $type = '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }

    }


}
