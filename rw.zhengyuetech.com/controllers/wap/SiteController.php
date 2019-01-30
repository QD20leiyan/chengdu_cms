<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\components\WapController;

class SiteController extends WapController
{

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
