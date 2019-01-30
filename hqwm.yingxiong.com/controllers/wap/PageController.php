<?php
/**
 * 单页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;

class PageController extends WapController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_PAGE]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

}
