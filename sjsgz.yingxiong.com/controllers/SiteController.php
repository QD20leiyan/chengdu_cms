<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;

class SiteController extends PcController
{
    public function actionCover()
    {
        return $this->render('cover');
    }

    public function actionIndex()
    {
        $video = $this->getRecommend('index_video', 1); //首页视频
        $banner = $this->getRecommend('index_banner', 10);  //首页轮播图
        $zonghe = $this->getContentArr(69, 8);  //综合
        $xinwen = $this->getContentArr(70, 8);  //新闻
        $gonggao = $this->getContentArr(71, 8);  //公告
        $huodong = $this->getContentArr(72, 8);  //活动
        $gonglue = $this->getContentArr(74, 2, 'sort');  //攻略

        $jietu = $this->getContentArr(73, 100); //截图

        $partner = $this->getRecommend('partner', 10);  //合作媒体
//pr($banner, 1);
        return $this->render('index', [
            'video' => $video,
            'banner' => $banner,
            'zonghe' => $zonghe,
            'xinwen' => $xinwen,
            'gonggao' => $gonggao,
            'huodong' => $huodong,
            'gonglue' => $gonglue,
            'jietu' => $jietu,
            'partner' => $partner,
        ]);
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
