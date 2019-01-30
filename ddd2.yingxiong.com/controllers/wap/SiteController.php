<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\components\HomeController;
use common\models\Category;
use common\Cms;
use common\models\Content;
use yii\helpers\Json;
use yii\web\Controller;
use yii\helpers\Url;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {
        return $this->redirect(['index']);
//        return $this->render('cover');
    }

    public function actionIndex()
    {
        $banner = $this->getRecommend('news_banner');
        $zuixin = self::getContent(35, 5);    //最新
        $xinwen = self::getContent(38, 5);    //新闻
        $gonggao = self::getContent(39, 5);    //公告
        $huodong = self::getContent(36, 5);    //活动
        $gonglue = self::getContent(37, 5);    //攻略
        $activity = $this->getRecommend('activity', 2); //热门活动

        $gameTese = $this->getRecommend('gameTese'); //游戏特色

        $gameVideo = self::getContent(40, 4);    //游戏视频
//        $wanFaVideo = self::getContent(52, 4);    //玩法攻略
//        $xinShouVideo = self::getContent(53, 4);    //新手教程
//        $saiShiVideo = self::getContent(54, 4);    //精彩赛事

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
//            'wanFaVideo' => $wanFaVideo->models,
//            'xinShouVideo' => $xinShouVideo->models,
//            'saiShiVideo' => $saiShiVideo->models,
            'gameVideoCategory' => $gameVideoCategory,
        ]);
    }

    /**
     * 新闻列表页面
     * @return string
     */
    public function actionNews()
    {
        $categoryId = Cms::getGetValue('cid', 38);
        $cid = $categoryId;
        return $this->render('news_list', [
            'cid' => $categoryId,
        ], $categoryId);
    }

    /**
     * 新闻列表
     * @return string
     */
    public function actionAjaxNews()
    {
        $content = new Content();
        $categoryId = Cms::getGetValue('cid');
        $cidArr = [1 => 35, 2 => 38, 3 => 36, 4 => 39, 5 => 37];
        if (key_exists($categoryId, $cidArr)) {
            $categoryId = $cidArr[$categoryId];
        }
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        $pageCount = ceil($list['page']->totalCount/9);
        $page = Cms::getGetValue('page');
        if ($page > $pageCount) {
            echo Json::encode(array('status' => 0, 'msg' => []));
            exit;
        }
        foreach ($list['data'] as $k => $v) {
            $list['data'][$k]['created_at'] = date('m/d', $list['data'][$k]['created_at']);

            $id = $v['old_id'] ? $v['old_id'] : $v['id'];
            $category = Category::findOne($v['category_id']);
            $url = Cms::getUrl('wap/detail',array('aid'=>$id,'add_time'=>$v['created_at'],'cat_dir'=>$category['url_alias'],"#"=>"detail"));
            $list['data'][$k]['url'] = $url;
        }
        echo Json::encode(array('status' => 0, 'msg' => $list['data']));
        exit;
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
//        pr($content, 1);
        return $this->render('detail', [
            'data' => $content,
        ], 0, $aid);

    }

    public function actionError()
    {
        return $this->render('error');
    }

    //落地页
    public function actionReveal(){
        return $this->renderPartial('reveal.html');
    }

}
