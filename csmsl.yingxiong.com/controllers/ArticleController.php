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
   private static $type=[431=>'zx',432=>'xw',433=>'gg',434=>'gl',435=>'hd'];
    //列表页
    public function actionList()
    {
        $advert= $this->getRecommend('article_av');
        $data['data']  = $this->articleList([],4);
        $data['type']  =self::$type[Cms::getGetValue('id')];
        $data['top_thumb'] =$this->getRecommend('p_w_article');
        $data['advert']=isset($advert[0])?$advert[0]:'';
        $data['style']='article';
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('list.html', $data, Cms::getGetValue('id',\Yii::$app->params['ZUIXIN']));
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
        $data['style']='article';
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }
    public function actionTest($type = '', $id = '')
    {
        if (!$type) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }
}
