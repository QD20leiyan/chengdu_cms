<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use Yii;
use common\Cms;


class VideoController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_MEDIA]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

    /**
     * 新闻列表页面
     * @return string
     */
    public function actionList()
    {
        $categoryId = Cms::getGetValue('cid', 40);
//        echo $categoryId;exit;
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 9);
        $activity = $this->getRecommend('activity', 3); //热门活动
//        pr($list, 1);
        return $this->render('list', [
            'data' => $list['data'],
            'page' => $list['page'],
            'cid' => $categoryId,
            'activity' => $activity,
            'nowPage' => Cms::getGetValue('page', 1),
        ], $categoryId);
    }

}
