<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;

use common\components\PcController;
use common\Cms;

class SiteController extends PcController
{
    public function actionCover()
    {
        $indexVideo = $this->getRecommend('index_video', 1);
        $data['indexVideo'] = $indexVideo[0];

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
//        pr($data, 1);
        return $this->renderPartial('cover.html', $data);
    }

    public function actionIndex()
    {
        return $this->actionCover();
//        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
