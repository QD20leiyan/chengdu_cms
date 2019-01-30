<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\CommonMethod;
use common\components\PcController;
use common\models\Category;
use common\models\CategoryType;
use common\models\Content;
use common\models\ContentPost;
use Yii;
use yii\data\Pagination;
use yii\grid\GridView;
use yii\widgets\LinkPager;


class ArticleController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $data  = $this->articleList();
        return $this->renderPartial('index.html', $data, Cms::getGetValue('id'));
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail(1);
        $data['content']['nextLink'] = isset($data['content']['nextLink']) ? $data['content']['nextLink'] : '';
        return $this->renderPartial('detail.html', $data, 0, Cms::getGetValue('id'));
    }


    /**
     *
     * 文章列表页面
     *
     *
     */
    public function actionList(){
        //文章列表
        $array = [
            'category_type_id'=>CategoryType::TYPE_POST,
            'category_id'   => Yii::$app->params['new_category_id'],
        ];
        $dataProvider=$this->getPageList(Content::class, $array);
        return $this->render('list',array('dataProvider'=>$dataProvider),Yii::$app->params['new_category_id']);
    }

    //产品中心
    public function actionProduct(){

        $data = [];
        //获取banner
        $data['banner'] = CommonMethod::getPosition('product_banner');
        //获取文章
        $data['games_list'] = $this->getContentArr(Yii::$app->params['game_category_id'],100);//
        foreach($data['games_list'] as $key=>$value){
            if($value['summary']) {
                $temp = $this->parse_config_attr($value['summary']);
                if(isset($temp['tag'])) $data['games_list'][$key]['tag'] = $temp['tag'];
                if(isset($temp['modal_pic'])) $data['games_list'][$key]['modal_pic'] = $temp['modal_pic'];
                if(isset($temp['ewm_title'])) $data['games_list'][$key]['ewm_title'] = $temp['ewm_title'];
            }
        }
       return $this->render('product',$data,Yii::$app->params['game_category_id']);
    }


    // 分析枚举类型配置值 格式 a[#]名称1,b[#]名称2
    private function parse_config_attr($string) {
        $array = preg_split('/[\r\n]+/', trim($string, "\r\n"));
        if(strpos($string,'[#]')){
            $value  =   array();
            foreach ($array as $val) {
                if (strstr($val, '[#]')) {
                    list($k, $v) = explode('[#]', $val);
                    $value[$k] = $v;
                }
            }
        }else{
            $value  =   $array;
        }
        return $value;
    }


//    /**
//     *
//     * 文章详细页面
//     *
//     */
//    public function actionDetail()
//    {
//        //获取火爆推荐
//        $tuijian= $banner = CommonMethod::getPosition('tuijian');
//
//        $id = Cms::getGetValue('id');
//        $model=Content::find()->where(['id'=>$id])->one();
//        $modelcontent=ContentPost::find()->where(['content_id'=>$id])->one();
//        if(empty($modelcontent))$content='';else  $content=$modelcontent->body;
//       return $this->render('detail',array(
//            'model'=>$model,'content'=>$content,'tuijian'=>$tuijian
//        ),0,$id);
//    }
}
