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

    public function actionIndex()
    {
        $data['category_id'] = Cms::getGetValue('id', Cms::getAppParam('ZHUAN_TI'));  //新闻动态
        $_GET['id'] = $data['category_id'];
        $data['data']  = $this->articleList([], 10);
        return $this->renderPartial('index.html', $data, $data['category_id']);
    }

    /**
     * ajax 获取列表
     */
    public function actionAjaxGetList()
    {
        $_GET['id'] = Cms::getGetValue('id', Cms::getAppParam('ZHUAN_TI'));  //活动专题
        $data = $this->ajaxGetList(10);
        $this->ajaxOutPut($data);
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        return $this->renderPartial('detail.html',$data, 0, Cms::getGetValue('id'));
    }

}
