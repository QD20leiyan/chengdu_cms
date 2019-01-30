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
    private static $type=[431=>'zx',432=>'xw',433=>'gg',434=>'gl',435=>'hd'];
    //列表页
    public function actionList()
    {

        $id = Cms::getGetValue('id');
        $top_thumb =$this->getRecommend('p_w_article');
        return $this->renderPartial('list.html', ['id' => $id, 'top_thumb' => $top_thumb], $id);
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        if ($data['content'] && !empty($data['content'])) {
            $data['type']  =self::$type[$data['content']['category_id']];
            $data['top_thumb'] = $this->getRecommend('p_w_article');
            $advert= $this->getRecommend('article_av');
            $data['advert']=isset($advert[0])?$advert[0]:'';
        } else {
            $data['top_thumb'] = '';
            $data['advert'] = '';
            $data['type'] = '';
        }
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }

        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }
    //ajax获取列表
    public function actionAjaxList(){
        $data = $this->ajaxGetList(9);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        echo Json::encode($data);
        exit;
    }

}
