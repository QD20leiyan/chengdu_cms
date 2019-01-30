<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\components\HomeController;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;

use yii\web\Controller;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {
        $videos = $this->getRecommend('video_cover', 1); //Cover视频
        $video=array();
        if(isset($videos[0]))$video=$videos[0];
        return $this->renderPartial('cover.html',['video'=>$video]);
    }

    public function actionIndex()
    {
        $data = array();
        $video = $this->getRecommend('video', 1); //推荐视频
        $data['video'] = $video[0];
        $data['banner'] = $this->getRecommend('index_banner');  //轮播图
        $data['zx'] = $this->getContentArr(194, 6);    //最新
        $data['xw'] = $this->getContentArr(199, 6);    //新闻
        $data['gg'] = $this->getContentArr(198, 6);    //公告
        $data['hd'] = $this->getContentArr(197, 6);    //活动
        $data['gl'] = $this->getContentArr(196, 6);    //攻略

        $data['dt'] = $this->getContentArr(200, 50);    //地图介绍
        $data['sc'] = $this->getContentArr(201, 50);    //赛车介绍

        $data['dress'] = $this->getRecommend('dress');  //精美服饰

        $data['zxVideo'] = $this->getContentArr(202, 6);    //最新视频
        $data['tjVideo'] = $this->getContentArr(203, 6);    //推荐视频
        $data['jxVideo'] = $this->getContentArr(204, 6);    //教学视频
        $data['qwVideo'] = $this->getContentArr(205, 6);    //趣味视频
        $data['gfVideo'] = $this->getContentArr(206, 6);    //官方视频
        $data['zbVideo'] = $this->getContentArr(207, 6);    //热门直播

        $data['anchor'] = $this->getRecommend('anchor', 1);  //每周星主播
        $data['anchor'] = $data['anchor'][0];
        $data['activity'] = $this->getRecommend('activity', 3);  //右侧活动图

        $data['top3'] = $this->getRecommend('top3', 3);  //巅峰车神
        $data['top10'] = $this->getRecommend('top10', 10);  //车队排行10
        $data['yugao'] = $this->getRecommend('yugao', 3);  //直播预告
        $data['girl'] = $this->getRecommend('girl', 3);  //飞车girl

        $data['zxZq'] = $this->getContentArr(208, 5);    //玩家专区-最新
        $data['xwZq'] = $this->getContentArr(209, 5);    //玩家专区-新闻
        $data['ggZq'] = $this->getContentArr(210, 5);    //玩家专区-公告
        $data['hdZq'] = $this->getContentArr(211, 5);    //玩家专区-活动
        $data['ssZq'] = $this->getContentArr(212, 5);    //玩家专区-赛事
        $data['glZq'] = $this->getContentArr(213, 5);    //玩家专区-攻略
//pr($data, 1);
        return $this->renderPartial('index.html', $data);
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
