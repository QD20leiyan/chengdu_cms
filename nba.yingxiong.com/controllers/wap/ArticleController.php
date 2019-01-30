<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\Cms;
use common\components\WapController;

class ArticleController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id');
        return $this->renderPartial('index.html', ['id' => $id], $id);
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail(1);
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }

}
