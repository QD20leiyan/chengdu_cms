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
        //kv视频
        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        //首页轮播
        $banner=$this->getRecommend('banner');
        $data=[
            'banner'=>$banner,
            'video'=>$video
        ];
//        pr($data,1);
        return $this->renderPartial('cover.html',['data'=>$data]);
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
