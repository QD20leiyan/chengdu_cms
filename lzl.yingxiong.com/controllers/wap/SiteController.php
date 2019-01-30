<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
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

    public function actionIndex(){

        $video=$this->getContentArr(\Yii::$app->params['VIDEO_COVER'],1);
        //特色玩法
        $play=$this->getRecommend('esp_play');
        //首页轮播
        $banner=$this->getRecommend('p_w_index');
        //最新新闻
        $zx=$this->getContentArr(\Yii::$app->params['ZUIXIN'],3);
        //新闻
        $xw=$this->getContentArr(\Yii::$app->params['XINWEN'],3);
        //攻略
        $gl=$this->getContentArr(\Yii::$app->params['GONGLUE'],3);

        $data=[
            'video'=>isset($video[0])?$video[0]:'',
            'play'=>$play,
            'banner'=>$banner,
            'zx'=>$zx,
            'xw'=>$xw,
            'gl'=>$gl,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('index.html',$data);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    public function actionTest($type = '', $id = '')
    {
        if (!$type) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }


}
