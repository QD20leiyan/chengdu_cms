<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;

use common\Cms;
use common\components\PcController;

class ArticleController extends PcController
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
        $data['content'] = $this->articleDetail(1);
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }

}
