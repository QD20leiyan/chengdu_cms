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
use common\models\Content;
use yii\web\BadRequestHttpException;


class PageController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $error = 0;
        $data='';
        if (!isset($_GET['id'])){
            $error = 1;
        } else {
            if(is_numeric($_GET['id'])){
                $data=Content::find()->where(['id'=>$_GET['id']])->with('page')->asArray()->one();
            }else{
                $data=Content::find()->where(['url_alias'=>$_GET['id']])->with('page')->asArray()->one();
            }
        }
        if ($error == 1) {
            throw new BadRequestHttpException();
        }
        $view = '@app/views/page/'.$_GET['id'].'.html';
       return  $this->renderPartial($view, $data);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

}
