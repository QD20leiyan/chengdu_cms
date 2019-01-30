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

use yii\captcha\Captcha;
use yii\web\Controller;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        //特色玩法
        $play=$this->getRecommend('wap_esp_play');
        $data=array(
            'video'=>$video,
            'play'=>$play,
            'captcha_img'=>$captcha_img,
        );
        return $this->renderPartial('cover.html',$data);
    }

    public function actionIndex()
    {
//        return $this->actionCover();
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
