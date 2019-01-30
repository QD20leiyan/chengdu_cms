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
use common\models\CategoryType;
use common\models\Content;
use Yii;


class ArticleController extends PcController
{

    //新闻列表页
    public function actionIndex()
    {
        $data['data']  = $this->articleList();
        $data['style']='article';
        $categoryId = Cms::getGetValue('id');  //新闻动态
        $data['top_thumb'] = $this->_getThumb($categoryId);
        return $this->renderPartial('index.html', $data, Cms::getGetValue('id', 419));
    }

    //新闻详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        $data['style']='article';
        if ($data['content'] && !empty($data['content'])) {
            $data['content']['top_thumb'] = $this->_getThumb($data['content']['category_id']);
        } else {
            $data['content']['top_thumb'] = '';
        }
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }

    private function _getThumb($category_id)
    {
        $top_thumb = '';
        $tmp_arr = [419 => 'article_zx', 420 => 'article_hd', 421 => 'article_xw', 422 => 'article_gg', 423 => 'article_gl'];
        if (key_exists($category_id, $tmp_arr)) {
            $top_thumb = $this->getRecommend($tmp_arr[$category_id], 1);
            $top_thumb = $top_thumb ? $top_thumb[0]['thumb'] : '';
        }
        return $top_thumb;
    }
}
