<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;


class VideoController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $params = [];
        $title = Cms::getGetValue('title');
        if ($title) {
            $params['title'] = $title;
        }
        $data['category_id'] = Cms::getGetValue('id', 329);  //新闻动态
        $_GET['id'] = $data['category_id'];
        $data['data']  = $this->articleList($params);

        $data['title'] = $title;
        if (Cms::isAjax()) {
            $this->ajaxOutPut($data);
        }
        $data['lunbo'] = $this->getRecommend('video_banner');
        return $this->renderPartial('index.html', $data, $data['category_id']);
    }


}
