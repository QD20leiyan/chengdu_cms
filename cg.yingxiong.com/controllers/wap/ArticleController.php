<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\PcController;
use common\components\WapController;
use common\models\Content;
use Yii;


class ArticleController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $data['category_id'] = Cms::getGetValue('id', Cms::getAppParam('ZHUAN_TI'));  //新闻动态
        $_GET['id'] = $data['category_id'];
        $data['data']  = $this->ajaxGetList(4);
        return $this->renderPartial('index.html',$data, $data['category_id']);
    }

    /**
     * ajax 获取列表
     */
    public function actionAjaxGetList()
    {
        $_GET['id'] = Cms::getGetValue('id', Cms::getAppParam('ZHUAN_TI'));  //新闻动态
        $data = $this->ajaxGetList(4);
        $this->ajaxOutPut($data);
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        return $this->renderPartial('detail.html',$data, 0, Cms::getGetValue('id'));
    }

}
