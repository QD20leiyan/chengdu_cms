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


class VideoController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_MEDIA]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

}
