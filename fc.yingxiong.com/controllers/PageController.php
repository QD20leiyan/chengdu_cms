<?php
/**
 * 单页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Category;
use common\models\Content;
use Yii;


class PageController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $fileCacheKey = $this->pageCache->getIndexPageCacheKey(__METHOD__);
        $fileCacheData= $this->pageCache->getIndexPageCacheData($fileCacheKey);

        if (!$fileCacheData) {
            $fileCacheData = $this->_index();
            $this->pageCache->setIndexPageCache($fileCacheKey, $fileCacheData);
        }
        
        return $fileCacheData;
    }

    //详情页
    public function actionDetail($id)
    {
        $fileCacheKey = $this->pageCache->getDetailPageCacheKey(__METHOD__);
        $fileCacheData= $this->pageCache->getDetailPageCacheData($fileCacheKey);

        if (!$fileCacheData) {
            $fileCacheData = $this->_detail($id);
            $this->pageCache->setDetailPageCache($fileCacheKey, $fileCacheData);
        }

        return $fileCacheData;
    }


    private function _index(){
        $array = [
            'category_type_id'=>CategoryType::TYPE_PAGE
        ];

        $categoryId = Yii::$app->request->get('category_id');
        $categoryInfo = [];
        if ($categoryId) {
            //进入分类页
            $array['category_id']   = $categoryId;
            $categoryInfo   = Category::findOne($categoryId);
        }

        //获取分类默认布局
        $layout = $this->_getIndexLayout($categoryInfo);
        $this->_setLayout($layout);
        
        //获取分类默认模板
        $view = $this->_getIndexView($categoryInfo);

        $dataProvider = $this->getPageList(Content::class, $array);

        return $this->render($view, ['dataProvider'=>$dataProvider]);
    }


    private function _detail($id){
        //获取数据
        $detail = $this->getContentDetail($id);

        //获取详情页布局(布局权重，详情页布局>分类布局>默认布局)
        $layout = $this->_getDetailLayout($detail);
        $this->_setLayout($layout);

        //获取详情页模板(权重同上)
        $view   = $this->_getDetailView($detail);

        return $this->render($view,['detail'=>$detail]);
    }

}
