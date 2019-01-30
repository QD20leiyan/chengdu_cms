<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\components\CommonMethod;
use common\models\Content;
use yii\data\ActiveDataProvider;

class SiteController extends PcController
{
    public function actionCover()
    {
        return $this->render('cover');
    }

    /**
     * 首页
     * @return string
     */
    public function actionIndex()
    {

//        //获取banner
//        $banner = CommonMethod::getPosition('banner');
//        //首页中间左侧推荐位
//        $index_recommend = CommonMethod::getPosition('index_recommend');
//        //新闻动态文章列表
//        $news=$this->getContentArr(\Yii::$app->params['new_category_id'],6,'created_at');
//        //商务合作
//        $cooperation =CommonMethod::getPosition('cooperation');
//        //获取合作媒体
//        return  $this->render('index',array(
//            'banner'=>$banner,
//            'index_recommend'=>$index_recommend,
//            'news'=>$news,
//            'cooperation'=>$cooperation,
//        ));

        return $this->renderPartial('index.html');
    }

    //产品
    public function actionProduct(){
        $data = [];
        //获取banner
        $data['id'] = "product";
        $data['banner'] = CommonMethod::getPosition('product_banner');
        //获取文章
        $data['games_list'] = $this->getContentArr(\Yii::$app->params['game_category_id'],100);//
        foreach($data['games_list'] as $key=>$value){
            if ($value['status'] != 1) {
                unset($data['games_list'][$key]);
                continue;
            }
            if($value['summary']) {
                $temp = $this->parse_config_attr($value['summary']);
                if(isset($temp['tag'])) $data['games_list'][$key]['tag'] = $temp['tag'];
                if(isset($temp['modal_pic'])) $data['games_list'][$key]['modal_pic'] = $temp['modal_pic'];
                if(isset($temp['ewm_title'])) $data['games_list'][$key]['ewm_title'] = $temp['ewm_title'];
                if(isset($temp['type'])) $data['games_list'][$key]['type'] = $temp['type'];// 类型
                if(isset($temp['grade'])) $data['games_list'][$key]['grade'] = $temp['grade'];//评分
                if(isset($temp['small_title'])) $data['games_list'][$key]['small_title'] = $temp['small_title'];//简短标题

                if(isset($temp['game_desc'])) $data['games_list'][$key]['game_desc'] = $temp['game_desc'];//描述
                if(isset($temp['game_desc_color'])) $data['games_list'][$key]['game_desc_color'] = $temp['game_desc_color'];//描述颜色
                if(isset($temp['ewm_download'])) $data['games_list'][$key]['ewm_download'] = $temp['ewm_download'];//二维码-下载
                if(isset($temp['ewm_gzh'])) $data['games_list'][$key]['ewm_gzh'] = $temp['ewm_gzh'];//二维码-公众号
            }
        }
        return $this->renderPartial('product.html',$data);
    }

    // 分析枚举类型配置值 格式 a[#]名称1,b[#]名称2
    private function parse_config_attr($string) {
        $array = preg_split('/[\r\n]+/', trim($string, "\r\n"));
        if(strpos($string,'[#]')){
            $value  =   array();
            foreach ($array as $val) {
                if (strstr($val, '[#]')) {
                    list($k, $v) = explode('[#]', $val);
                    $value[$k]   = $v;
                }
            }
        }else{
            $value  =   $array;
        }
        return $value;
    }

    /**
     *
     * 关于我们，公司介绍页面
     *
     */
    public function actionAbout(){
        $this->layout = 'pc/main_about.php';
        $gsjj = $this->getContentArr(\Yii::$app->params['gsjj_category_id'],2);//公司简介
        $gsfz = $this->getContentArr(\Yii::$app->params['gsfz_category_id'],5);//公司发展
        $gsry = $this->getContentArr(\Yii::$app->params['gsry_category_id'],4);//公司荣誉
        $gsgg = $this->getContentArr(\Yii::$app->params['gsgg_category_id'],20);//公司高管
        return $this->render('about',array(
            'gsjj'=>$gsjj,
            'gsfz'=>$gsfz,
            'gsry'=>$gsry,
            'gsgg'=>$gsgg
        ),261);
    }

    /**
     * 加入我们页面
     */
    public function actionJoin()
    {

        $fldy = $this->getContentArr(\Yii::$app->params['fldy_category_id']);//福利待遇
        $gzhj = $this->getContentArr(\Yii::$app->params['gzhj_category_id']);//英雄风采-工作环境
        $yghd = $this->getContentArr(\Yii::$app->params['yghd_category_id']);//英雄风采-员工活动
        $jrfl = $this->getContentArr(\Yii::$app->params['jrfl_category_id']);//英雄风采-节日福利

        $ygfz = $this->getContentArr(\Yii::$app->params['ygfz_category_id']);//员工发展
        $cxy = $this->getContentArr(\Yii::$app->params['cxy_category_id']);//招聘岗位-程序猿
        $sjs = $this->getContentArr(\Yii::$app->params['sjs_category_id']);//招聘岗位-设计狮
        $cpw = $this->getContentArr(\Yii::$app->params['cpw_category_id']);//招聘岗位-产品汪
        $znm = $this->getContentArr(\Yii::$app->params['znm_category_id']);//招聘岗位-职能喵
        $sct = $this->getContentArr(\Yii::$app->params['sct_category_id']);//招聘岗位-市场兔

       return $this->render('join',array(
            'fldy'=>$fldy,
            'gzhj'=>$gzhj,
            'yghd'=>$yghd,
            'jrfl'=>$jrfl,
            'ygfz'=>$ygfz,
            'cxy'=>$cxy,
            'sjs'=>$sjs,
            'cpw'=>$cpw,
            'znm'=>$znm,
            'sct'=>$sct,
        ),229);
    }
    public function actionError()
    {
        $this->layout = false;
        return $this->render('error');
    }
    //
    public function actionFairy(){
        $this->layout = false;
        return $this->render('fairy');
    }


}
