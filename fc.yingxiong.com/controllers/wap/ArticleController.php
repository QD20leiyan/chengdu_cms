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
use yii\helpers\Json;


class ArticleController extends WapController
{

    //新闻列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id');
        return $this->renderPartial('index.html', ['id' => $id], $id);
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


    //新闻详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }


}
