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
use common\components\CommonMethod;
use common\components\Utils;
use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;
use common\models\ContentPost;
use yii\data\ActiveDataProvider;

class SiteController extends WapController
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
        $wapHomeBanner = CommonMethod::getPosition('wap_home_banner'); //首页banner
        $news=$this->getContentArr(\Yii::$app->params['new_category_id'],6,'created_at');//新闻
        $newTuijian = CommonMethod::getPositionPage('wap_new_tuijian', 2); //推荐
        $hotgame=$this->getContentArr(\Yii::$app->params['game_category_id'],4);
        foreach ($hotgame as $key => $value) {
            if ($value['summary']) {
                $temp = $this->parse_config_attr($value['summary']);
                if (Utils::checkIos()) {
                    $hotgame[$key]['down_url'] = isset($temp['download_ios']) ? $temp['download_ios'] : '';
                } else {
                    $hotgame[$key]['down_url'] = isset($temp['download_android']) ? $temp['download_android'] : '';
                }
            }
        }
       return $this->render('index', array(
                'wapHomeBanner' => $wapHomeBanner,
                'news' => $news,
                'newtuijian' => $newTuijian,
                'hotGame' => $hotgame
            )
        );
//        return $this->renderPartial('index.html');
    }

    /**
     *
     * 关于我们，公司介绍页面
     *
     */
    public function actionAbout(){
        $gsjj = $this->getContentArr(\Yii::$app->params['gsjj_category_id'], 4); //公司简介
        $gsfz = $this->getContentArr(\Yii::$app->params['gsfz_category_id'], 4); //公司发展
        //$gsry = $this->getArticles(49, 5); //公司荣誉
        //$gsgg = $this->getArticles(33, 20); //公司高管
        //rsort($gsfz);
        $develop = [];
        foreach ($gsfz as $g) {
            $time = mb_substr($g['title'], -4);
            $new = strip_tags($g['content_message']);
            $pattern = '/\s|&nbsp;/'; //去除空白
            $new = preg_replace($pattern, '', $new);
            $newList = explode($time . '-', $new);
            foreach ($newList as $nl) {
                if ($nl) {
                    $develop[$time][] = array(
                        'time' => sprintf('%s-%s', $time, mb_substr($nl, 0, 5), 'utf-8'),
                        'content' => mb_substr($nl, 5, -1, 'utf-8')
                    );
                }
            }
        }
        krsort($develop);
        $years = array_keys($develop);
      return  $this->render('about', array(
            'gsjj' => $gsjj,
            'gsfz' => $develop,
            'years' => $years,
            //'gsry' => $gsry,
            //'gsgg' => $gsgg
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
      return  $this->render('into',array(
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


    /**
     * 新闻中心
     */
    public function actionNews() {
       $wapHomeBanner = CommonMethod::getPosition('wap_new_banner'); //新闻页顶部bannner
       return $this->render('news', [ 'wapHomeBanner' => $wapHomeBanner],\Yii::$app->params['new_category_id']);
    }
    /**
     * ajax异步加载新闻列表、
     * @param type $page 页码
     */
    public function actionGetnews() {
//        $page = Cms::getGetValue('page',1);
//        //文章列表
        $array = [
            'category_type_id'=>CategoryType::TYPE_POST,
            'category_id'   => \Yii::$app->params['new_category_id'],
        ];
        $dataProvider=$this->getContentArr(\Yii::$app->params['new_category_id'],10,'created_at');//新闻
//        $dataProvider=$this->getPageList(Content::class, $array,10);
//        $totalCount = $dataProvider->getTotalCount();
//        $totalPages = ceil($totalCount / 10);
//        if ($page > $totalPages) {
//            echo 'over';
//            exit();
//        }
//        $newslist = $dataProvider->getModels();
//        pr($dataProvider,1);
//        if ($dataProvider) {
        if (!$dataProvider || empty($dataProvider)) {
            echo '';exit;
        } else {
            return $this->renderPartial('newspage', array('newslist' => $dataProvider),\Yii::$app->params['new_category_id']);
        }

//        } else {
//            echo 'over';
//            exit;
//        }
    }

    /**
     * 新闻详情
     */
    public function actionDetail() {
        $id = Cms::getGetValue('id');
        $model=Content::find()->where(['id'=>$id])->one();
        if (!$model) {
            $model = Content::find()->where(['old_id' => $id])->one();
            if ($model) {
                $id = $model['id'];
            }
        }

        if (!$model) {
            echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        }

        $modelcontent=ContentPost::find()->where(['content_id'=>$id])->one();
        if(empty($modelcontent))$content='';else  $content=$modelcontent->body;

        return  $this->render('newsinfo', array(
                'model'=>$model,'content'=>$content
            ),0,$id);
    }


    /**
     * 产品中心
     */
    public function actionProduct() {
       return $this->render('product',array(),\Yii::$app->params['game_category_id']);
    }

    /**
     * ajax异步加载游戏列表
     * @param type $cogtype 类型
     * @param type $page 页码
     * @return type
     */
    public function actionGetgame() {
        $cogtype=Cms::getGetValue('c','all');
        $page=Cms::getGetValue('page','1');
        $pageSize =\Yii::$app->params['pageSize'];
        $array = [
            'category_type_id'=>CategoryType::TYPE_POST,
            'category_id'   => \Yii::$app->params['game_category_id'],
        ];
        $vague=[];
        if ($cogtype !== 'all') {
            $vague['summary']='tag[#]' . $cogtype;
        }
        $dataProvider=$this->getPageList(Content::class, $array,10,$vague);
        $totalCount = $dataProvider->getTotalCount();
        $totalPages = ceil($totalCount / $pageSize);
        if ($page > $totalPages) {
            echo 'over';
            exit();
        }
        $gamelist = $dataProvider->getModels();
        if ($gamelist) {
            foreach ($gamelist as $key => $value) {
                if ($value['status'] != 1) {
                    unset($gamelist[$key]);
                    continue;
                }
                $gamelist[$key] = $value->attributes; //转成数组
                if ($value['summary']) {
                    $temp = $this->parse_config_attr($value['summary']);
                    if (isset($temp['tag'])) {
                        $gamelist[$key]['tag'] = $temp['tag'];
                    }
                    if (Utils::checkIos()) {
                        $gamelist[$key]['down_url'] = isset($temp['download_ios']) ? $temp['download_ios'] : '';
                    } else {
                        $gamelist[$key]['down_url'] = isset($temp['download_android']) ? $temp['download_android'] : '';
                    }
                }
            }
            return $this->renderPartial('productpage', array('gamelist' => $gamelist));
        } else {
            $gamelist = [];
            echo 'over';
            exit();
        }
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
    //联系我们
    public function actionContact() {
       return $this->render('contact');
    }
    //精灵奖
    public function actionFairy(){
        $this->layout = false;
        return $this->render('fairy');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
