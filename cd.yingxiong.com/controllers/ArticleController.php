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

    //列表页
    public function actionIndex()
    {
        $data = $this->_list();
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            $data = $this->_list();
            pr($data, 1);
        }
        return $this->renderPartial('index.html', $data, $data['categoryId']);
//        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_POST]);
//        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    public function actionAjaxList()
    {
        $data = $this->_list();
        $html = $this->renderPartial('ajax_list.html', $data);
        $this->ajaxOutPut(['status' => 0, 'msg' => $html]);
    }

    public function _list()
    {
        $type=Cms::getGetValue('type','all');
            switch ($type){
                case 'xinwen' ://热门
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                    break;
                case 'gonggao' ://新闻
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                    break;
                case 'zhixun' ://公告
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZHIXUN']);
                    break;
                case 'huodong' ://活动
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                    break;
                default:
                    $categoryId = null;
            }
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 9);
        $page='';
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
//                'style'=>$stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
                'tag'=>1,//方便前端识别页面
                'version'=>VERSION,
                'type'=>$type,
            ];
        }else{
            $data=[
                'language'=> Cms::getSession('language'),
                'page' => $page,
//                'style'=> $stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
                'tag'=> 1,//方便前端识别页面
                'data' => [],
                'version'=>VERSION,
                'type'=>$type,
            ];
        }
        $data['categoryId'] = $categoryId;
        return $data;
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        $data['detail']=$detail;
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('detail.html',$data,'',$id);
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


}
