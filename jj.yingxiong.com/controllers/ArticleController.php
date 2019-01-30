<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use common\Cms;


class ArticleController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_POST]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    /**
     * 详情页
     * @return string
     */
    public function actionDetail()
    {
        $navTitle = '新闻资讯';

        $id = Cms::getGetValue('id');
        $content = $this->getContentDetail($id);
        if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        return $this->render('@app/views/site/details', [
            'data' => $content,
            'navTitle' => $navTitle,
        ]);
    }

}
