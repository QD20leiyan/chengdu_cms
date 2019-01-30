<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/12/24 0024
 * Time: 14:52
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\PcController;
use common\components\WapController;

class CareController extends WapController
{
    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    /**
     * 新闻列表
     * @return false|mixed|string
     */
    public function actionNews()
    {
        $id = Cms::getGetValue('id');
        return $this->renderPartial('news.html', ['id' => $id], $id);
    }

    /**
     * 视频列表
     * @return false|mixed|string
     */
    public function actionVideo()
    {
        $id = Cms::getGetValue('id');
        return $this->renderPartial('video.html', ['id' => $id], $id);
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }
}