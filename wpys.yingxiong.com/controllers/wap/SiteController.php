<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\models\GameSubscribe;
use yii\helpers\Json;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    { //游戏特色
        $banner=$this->getRecommend('game_play');
        return $this->renderPartial('cover.html',['banner'=>$banner]);
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
