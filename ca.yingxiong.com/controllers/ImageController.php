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
use common\models\Content;


class ImageController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $data['category_id'] = Cms::getGetValue('id', 354);  //新闻动态
        $_GET['id'] = $data['category_id'];
        $data['data']  = $this->articleList([], 100);
        //ajax加载更多
//        if (Cms::isAjax()) {
//            $this->ajaxOutPut(['status' => 0, 'msg' => $data['data']]);
//        }
        $data['count_2017'] = Content::find()->where(['category_id' => 354])->count();
        $data['count_2016'] = Content::find()->where(['category_id' => 353])->count();
        $data['count_2015'] = Content::find()->where(['category_id' => 352])->count();
        $data['count_2014'] = Content::find()->where(['category_id' => 351])->count();
        return $this->renderPartial('index.html', $data, $data['category_id']);
    }
}
