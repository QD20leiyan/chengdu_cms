<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;

use common\Cms;
use common\components\PcController;

class ArticleController extends PcController
{

    //新闻列表页
    public function actionIndex()
    {
        $data['data']  = $this->articleList();
        $data['activity'] = $this->getRecommend('activity', 3);  //右侧活动图
        $prePage = Cms::getGetValue('page')-1;
        $nextPage = Cms::getGetValue('page')+1;
        if ($prePage <= 0) {
            $prePage = 1;
        }

        if ($nextPage >= $data['data']['totalPage']) {
            $nextPage = $data['data']['totalPage'];
        }
        $data['preLink'] = '/info/list_'.Cms::getGetValue('id').'_'.$prePage.'.html';
        $data['nextLink'] = '/info/list_'.Cms::getGetValue('id').'_'.$nextPage.'.html';
        return $this->renderPartial('index.html', $data, Cms::getGetValue('id', 194));
    }

    //新闻详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        if ($data['content'] && $data['content']['category_type_id'] != 'post') {
            echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        }
        $data['activity'] = $this->getRecommend('activity', 3);  //右侧活动图
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }



}





