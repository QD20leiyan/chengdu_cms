<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use Yii;
use yii\widgets\LinkPager;


class ArticleController extends PcController
{
    /**
     * 文章列表页面
     */
    public function actionList()
    {
        $data = $this->_list();
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            $data = $this->_list();
            pr($data, 1);
        }
        return $this->renderPartial('list.html', $data,$data['categoryId']);

    }




    public function actionAjaxList()
    {
        $data = $this->_list();
        $html = $this->renderPartial('ajax_list.html', $data);
        $this->ajaxOutPut(['status' => 0, 'msg' => $html]);
    }

    //详情页
    public function actionDetail()
    {
        $id  =Cms::getGetValue('id');
        $data=$this->getContentDetail($id);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('detail.html',['data'=>$data,'style'=>'yxzx'],'',$id);
    }

    public function _list()
    {
        $type=Cms::getGetValue('type');
        switch ($type){
            case 'zx' ://最新
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZONGHE']);
                break;
            case 'xw' ://新闻
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                break;
            case 'gg' ://公告
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                break;
            case 'hd' ://活动
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                break;
            case 'gl' ://媒体
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGLUE']);
                break;
            case 'fy' ://无双风云
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['FENGYUN']);
                break;
            default:
                $categoryId =null;
        }
//        pr($categoryId,1);
        $banner = $this->getRecommend('zixun_banner');    //资讯banner
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 10);
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
                'banner' => $banner,
                'page' => $page,
                'language'=>Cms::getSession('language'),
                'tag'=>1,//方便前端识别页面
                'version'=>VERSION,
                'type'=>$type,
            ];
        }else{
            $data=[
                'language'=> Cms::getSession('language'),
                'tag'=> 1,//方便前端识别页面
                'data' => [],
                'version'=>VERSION,
                'type'=>$type,
                'banner' => $banner,
            ];
        }
        $data['style'] = 'yxzx';
        $data['categoryId'] = $categoryId;
        return $data;
    }


    /**角色
     * @param string $type1
     * @param string $id
     */
    public function actionRole(){
        //角色数据
        $role_info=[];
        $role_all=$this->getContentArr(\Yii::$app->params['JUESE'],100);
        if($role_all) {
            foreach ($role_all as $key => $value) {
                $skill=$this->parse_jws_attr($value['summary']);//技能
                $info=$this->parse_jws_attr(strip_tags($value['content_message']),1);//详情
                $role['id']=$value['id'];
                $role['title']=$value['title'];
                $role['created_at']=$value['created_at'];
                $role['redirect_url']=$value['thumb'];
                $role['info']=$info;
                $role['skill']=$skill;
                $role_info[]=$role;
            }
        }
        $data=array(
            'data'=>$role_info,
            'style'=>'wjjs',
        );
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('roles.html',$data,\Yii::$app->params['JUESE']);
    }

    //将军殿
    public function actionHeroList(){

        $categoryId = \Yii::$app->params['JANGJUN'];
        $list = self::ajaxGetNews($categoryId, 11);
        $lists = array();
        if (isset($list['msg'])) {
            foreach ($list['msg'] as $key => $value) {
                $array =explode('[#]', trim($value['summary']));
//                pr($value,1);
                $arr = array(
                    'frame' =>$key==0?1:2,
                    'title' => $value['title'],
                    'sub_title' => $value['sub_title'],
                    'thumb' => $value['thumb'],
                    'time' => $value['created_at'],
                    'canal' => isset($array[0])?$array[0]:'',
                    'enounce' => isset($array[1])?$array[1]:'',
                );
                $lists[] = $arr;
            }
        }
        $data['style']='jjd';
        $data['data'] = $lists;
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('hero.html',$data,$categoryId);
    }

    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }


//    public function actionList(){
//        //文章列表
//        $cid=Cms::getGetValue('cid');
//        $content = new Content();
//        $category_ids = self::getChildren($cid);
//        $list=$content->getContentLists($category_ids,11);
//        if(!empty($list['data'])){
//            $page = LinkPager::widget([
//                'pagination' => $list['page'],
//                'hideOnSinglePage' => false,
//                'firstPageLabel' => '首页',
//                'lastPageLabel' => '尾页',
//                'options' => ['class' => 'page'],
//                'nextPageLabel' => '下一页',
//                'prevPageLabel' => '上一页',
//                'maxButtonCount' => 7
//            ]);
//            $data = [
//                'data' => $list['data'],
//                'page' => $page,
//            ];
//        }else{
//            $data=[
//                'data' => [],
//                'page' =>'',
//            ];
//        }
//       return $this->renderPartial('list',array(
//            'data'=>$data,
//            'cid'=>$cid,
//        ),$cid);
//    }
//    /**
//     * 军事列表页
//     */
//    public function actionJs_list(){
//        //视频专区
//        $spzq = $this->getArticles(7,1);
//        $this->renderPartial('js_list',array(
//            'spzq'=>$spzq
//        ));
//    }
//
//    //英雄列表页
//    public function actionHero_list()
//    {
//       return $this->renderPartial('hero_list');
//    }
//
//    //影画列表页
//    public function actionYh_list()
//    {
//        //影画
//        $yh = $this->getArticles(7,4);
//        $this->renderPartial('yh_list',array(
//            'yh'=>$yh
//        ));
//    }
//
//    //将军殿
//    public function actionJjd(){
//        $articles=$this->getContentArr(\Yii::$app->params['JANGJUN'],100);
////pr($articles,1);
//      return  $this->renderPartial('jjd',array('data'=>$articles));
//    }

}
