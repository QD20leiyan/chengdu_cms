<?php
/**
 * 图片页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use common\Cms;


class ImageController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_IMAGE]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }


    public function actionList()
    {
        $content = new Content();

        $category_id = Cms::getGetValue('id', 102);
        $category_ids = self::getChildren($category_id);
        $list = $content->getContentLists($category_ids, 9);

        return $this->render('list', [
            'data' => $list['data'],
            'page' => $list['page'],
//            'type' => $type,
            'id' => $category_id
        ]);
    }
}
