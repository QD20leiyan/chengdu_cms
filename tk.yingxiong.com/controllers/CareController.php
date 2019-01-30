<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/12/24 0024
 * Time: 14:52
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;

class CareController extends PcController
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
        $data  = $this->articleList();
        return $this->renderPartial('news.html', $data, Cms::getGetValue('id'));
    }

    /**
     * 视频列表
     * @return false|mixed|string
     */
    public function actionVideo()
    {
        $data  = $this->articleList();
        return $this->renderPartial('video.html', $data, Cms::getGetValue('id'));
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }
}