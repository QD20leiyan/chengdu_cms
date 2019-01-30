<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\components\PcController;
use common\components\WapController;
use common\models\Content;
use Yii;


class ArticleController extends WapController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

}
