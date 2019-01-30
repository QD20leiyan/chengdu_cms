<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;

use common\Cms;
use common\components\PcController;

class VideoController extends PcController
{

    //视频列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id');
        if (!$id) {
            $_GET['id'] = 202;
        }
        $data['data'] = $this->articleList();
        $data['activity'] = $this->getRecommend('activity', 3);  //右侧活动图
        return $this->renderPartial('index.html', $data, Cms::getGetValue('id', 194));
    }



}
