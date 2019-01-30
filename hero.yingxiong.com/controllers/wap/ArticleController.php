<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\PcController;
use common\components\WapController;
use common\models\Content;
use Yii;
use yii\helpers\Json;


class ArticleController extends WapController
{

    //新闻列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id');
        $top_thumb = $this->_getThumb($id);
        return $this->renderPartial('index.html', ['id' => $id, 'top_thumb' => $top_thumb], $id);
    }

    /**
     * ajax 获取列表
     */
    public function actionAjaxGetList()
    {
        $data = $this->ajaxGetList();
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        echo Json::encode($data);
        exit;
    }


    //新闻详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
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
