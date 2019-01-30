<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\PcController;
use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;
use Yii;


class VideoController extends WapController
{
    //列表页
    public function actionIndex()
    {
        //首页视频
        $video = $this->getContentArr(Yii::$app->params['VIDEO']);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($video, 1);
        }
        return $this->renderPartial('index.html', ['data'=>$video],Yii::$app->params['VIDEO']);
    }

    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }

}
