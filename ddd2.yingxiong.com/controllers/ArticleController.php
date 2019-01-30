<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use common\Cms;


class ArticleController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_POST]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    /**新闻详情
     * @return string
     */
    public function actionDetail()
    {
        $aid = Cms::getGetValue('id');

        $content = $this->getContentDetail($aid);
        if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        $activity = $this->getRecommend('activity', 3); //热门活动
        return $this->render('@app/views/site/detail', [
            'data' => $content,
            'activity' => $activity,
        ]);

    }

}
