<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\Cms;
use common\components\WapController;
use yii\helpers\Json;

class VideoController extends WapController
{

    //视频列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id', 203);
        return $this->renderPartial('index.html', ['id' => $id], 203);
    }

    /**
     * ajax 获取列表
     */
    public function actionAjaxGetList()
    {
        $data = $this->ajaxGetList();
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        echo Json::encode($data);
        exit;
    }
}
