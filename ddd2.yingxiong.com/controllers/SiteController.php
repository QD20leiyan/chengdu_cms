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
use common\models\Category;
use common\models\Content;
use yii\widgets\LinkPager;

class SiteController extends PcController
{
    public function actionCover()
    {
//        return $this->redirect(['/special/one-years']);
        return $this->render('cover');
    }

    public function actionIndex()
    {
        $banner = $this->getRecommend('news_banner');
        $zuixin = self::getContent(35, 5);    //最新
        $xinwen = self::getContent(38, 5);    //新闻
        $gonggao = self::getContent(39, 5);    //公告
        $huodong = self::getContent(36, 5);    //活动
        $gonglue = self::getContent(37, 5);    //攻略
        $activity = $this->getRecommend('activity'); //热门活动

        $gameTese = $this->getRecommend('gameTese'); //游戏特色

        $gameVideo = self::getContent(40, 5);    //游戏视频
        $gameVideoCategory = Category::findOne(40); //获取分类
//        pr($gameVideoCategory, 1);
        return $this->render('index', [
            'banner' => $banner,
            'zuixin' => $zuixin->models,
            'xinwen' => $xinwen->models,
            'gonggao' => $gonggao->models,
            'huodong' => $huodong->models,
            'gonglue' => $gonglue->models,
            'activity' => $activity,
            'gameTese' => $gameTese,
            'gameVideo' => $gameVideo->models,
            'gameVideoCategory' => $gameVideoCategory,
        ]);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**
     * 新闻列表页面
     * @return string
     */
    public function actionNews()
    {
        $categoryId = Cms::getGetValue('cid');
        $cid = $categoryId;
//        return $this->render('news_list', [
//            'category_id' => $categoryId,
//        ]);
        $cidArr = [1 => 35, 2 => 38, 3 => 36, 4 => 39, 5 => 37];
        if (key_exists($categoryId, $cidArr)) {
            $categoryId = $cidArr[$categoryId];
        }
        $category = Category::find()->where(['id' => $categoryId, 'website_id' => $this->website_id])->one();
        if (!$category) {
            echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        }

        $content = new Content();
        $type = Cms::getGetValue('type');
        $_GET['type'] = $type;
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        $activity = $this->getRecommend('activity', 3); //热门活动
        return $this->render('news_list', [
            'data' => $list['data'],
            'page' => $list['page'],
            'type' => $type,
            'cid' => $cid,
            'activity' => $activity,
            'nowPage' => Cms::getGetValue('page', 1)
        ], $categoryId);
    }

    /**
     * 新闻列表
     * @return string
     */
    public function actionAjaxNews()
    {
        $content = new Content();
        $type = Cms::getGetValue('type');
        if ($type == 'xinwen') {
            $category_id = 35;
        } else if ($type == 'gonggao') {
            $category_id = 33;
        } else {
            $category_id = 35;
            $type = 'zuixin';
        }
        $_GET['type'] = $type;
        $category_ids = self::getChildren($category_id);
        $list = $content->getContentLists($category_ids, 11);
        $page = LinkPager::widget([
            'pagination' => $list['page'],
            'hideOnSinglePage' => false,
            'firstPageLabel' => '首页',
            'lastPageLabel' => '尾页',
            'options' => ['class' => 'page'],
            'nextPageLabel' => false,
            'prevPageLabel' => false,
        ]);
//pr($list, 1);

        echo json_encode(array('status' => 0, 'msg' => $list['data'], 'page' => $page));

    }

    /**新闻详情
     * @return string
     */
    public function actionDetail()
    {
        $aid = Cms::getGetValue('aid');

        $content = $this->getContentDetail($aid);
        if ($content && !key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        $activity = $this->getRecommend('activity', 3); //热门活动
        return $this->render('detail', [
            'data' => $content,
            'activity' => $activity,
        ], 0, $aid);

    }

    //落地页
    public function actionReveal(){
        return $this->renderPartial('reveal.html');
    }
}
