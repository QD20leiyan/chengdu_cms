<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\HomeController;
use common\models\Content;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;

use yii\helpers\Json;
use yii\helpers\Url;
use yii\web\Controller;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        $banners = $this->getRecommend('banner');
        $xinshou = $this->getContentArr(27);    //新手介绍
        $fuben = $this->getContentArr(28);  //副本介绍
        $tese = $this->getContentArr(29);   //特色玩法

        $zuixin = $this->getContentArr(31, 5, 'created_at');   //最新新闻
        $xinwen = $this->getContentArr(32, 5, 'created_at');   //新闻
        $gonggao = $this->getContentArr(33, 5, 'created_at');   //公告新闻
        $gongnue = $this->getContentArr(34, 5, 'created_at');   //公告攻略

        $martial = self::getRecommend('martial');   //职业
//pr($zuixin, 1);
        return $this->render('index', [
            'banners' => $banners,
            'xinshou' => $xinshou,
            'fuben' => $fuben,
            'tese' => $tese,
            'martial' => $martial,
            'zuixin' => $zuixin,
            'xinwen' => $xinwen,
            'gonggao' => $gonggao,
            'gongnue' => $gongnue,
        ]);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**
     * 新闻列表
     * @return string
     */
    public function actionNews()
    {
        $content = new Content();
        $arr = [31 => 'zuixin', 32 => 'xinwen', 33 => 'gonggao'];
        $category_id = Cms::getGetValue('id', 31);

        $_GET['type'] = $arr[$category_id];
        $category_ids = self::getChildren($category_id);
        $list = $content->getContentLists($category_ids, 9);
        $page = Cms::getGetValue('page');
        if (Cms::isAjax()) {
            $pageCount = ceil($list['page']->totalCount/9);

            if ($page > $pageCount) {
                echo Json::encode(array('status' => 0, 'msg' => []));
                exit;
            }
            foreach ($list['data'] as $k => $v) {
                $list['data'][$k]['created_at'] = date('m/d', $list['data'][$k]['created_at']);
                $list['data'][$k]['url'] = Url::to(['m/site/details', 'id' => $v['id']]);
            }
            echo Json::encode(array('status' => 0, 'msg' => $list['data']));
            exit;
        } else {

        }

        return $this->render('news', [
            'data' => $list['data'],
            'page' => $list['page'],
            'type' => $arr[$category_id],
        ]);

    }

    /**
     * 详情页
     * @return string
     */
    public function actionDetails()
    {
        $navTitle = '新闻资讯';
        $type = Cms::getGetValue('type');
        if ($type == 'xinshou') {
            $navTitle = '新手介绍';
        } else if ($type == 'fuben') {
            $navTitle = '副本介绍';
        } else if ($type == 'tese') {
            $navTitle = '特色玩法';
        }
        $id = Cms::getGetValue('id');
        $content = $this->getContentDetail($id);
        if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        return $this->render('details', [
            'data' => $content,
            'navTitle' => $navTitle,
        ]);
    }

}
