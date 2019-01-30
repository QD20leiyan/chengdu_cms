<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;

class SiteController extends PcController
{
    public function actionCover()
    {
        return $this->render('cover');
    }

    public function actionIndex()
    {
        $data['category_id'] = Cms::getGetValue('id', Cms::getAppParam('H5'));  //新闻动态
        $_GET['id'] = $data['category_id'];
        $data['data']  = $this->articleList([], 10);
        return $this->renderPartial('index.html', $data, $data['category_id']);
    }

    /**
     * ajax 获取列表
     */
    public function actionAjaxGetList()
    {
        $_GET['id'] = Cms::getGetValue('id', Cms::getAppParam('H5'));  //新闻动态
        $data = $this->ajaxGetList(10);
        $this->ajaxOutPut($data);
    }

    public function actionAbout()
    {
        return $this->renderPartial('about.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
