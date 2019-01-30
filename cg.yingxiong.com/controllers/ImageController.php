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
use Yii;


class ImageController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $data['data'] = $this->getContentArr('366', 12);

        $this->renderPartial('index.html');
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

}
