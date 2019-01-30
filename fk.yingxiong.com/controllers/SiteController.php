<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;

class SiteController extends PcController
{
    public function actionCover()
    {
        return $this->renderPartial('cover');
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
