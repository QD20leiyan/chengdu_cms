<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\components\HomeController;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;

use yii\web\Controller;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {
        return $this->render('cover');
    }

    public function actionIndex()
    {
        $banner = $this->getRecommend('index_video');

        return $this->render('index', [
            'banner' => $banner,
        ]);
    }

    /**
     * 营销
     * @return string
     */
    public function actionYingxiao()
    {
        $banner = $this->getRecommend('index_video');

        return $this->render('yingxiao', [
            'banner' => $banner,
        ]);
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
