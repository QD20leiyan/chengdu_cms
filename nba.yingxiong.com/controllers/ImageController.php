<?php
/**
 * 图片页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;


class ImageController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $data  = $this->articleList();
        return $this->renderPartial('index.html', $data, Cms::getGetValue('id'));
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }

}
