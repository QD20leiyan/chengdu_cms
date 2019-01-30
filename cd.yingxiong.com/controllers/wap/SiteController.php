<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use app\controllers\CommonController;
use common\Cms;
use common\components\BaseActiveRecord;
use common\components\HomeController;
use common\models\cd\CdPvModel;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;

use yii\captcha\Captcha;
use yii\web\Controller;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {

        //做一个流量统计
        if(Cms::getSession('channel_name')=='pv'){
            $user_ip=Cms::getClientIp();
            $cd_pv=CdPvModel::find()->where(['user_ip'=>$user_ip])->one();
            if(!$cd_pv){
                $cd_pv=new CdPvModel();
                $cd_pv->user_ip=$user_ip;
                $cd_pv->website_id=BaseActiveRecord::getWebsiteId();
                $cd_pv->pv_num=1;
                $cd_pv->created_at=time();
            }else{
                $cd_pv->pv_num=$cd_pv->pv_num+1;
                $cd_pv->created_at=time();
            }
            $cd_pv->save();
            Cms::setSession('channel_name','wapgw');
        }

        $data['kv'] = $this->getRecommend('kv');
        $data['kv'] = $data['kv'][0];
        $data['user_all']=CommonController::actionCount();
        $data['captcha_img'] = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $invite_code = Cms::getGetValue('invite_code', '');
        Cms::setSession('invite_code', $invite_code);
        return $this->renderPartial('cover.html',$data);
    }

    public function actionIndex()
    {
        $user_all=CommonController::actionCount();
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $invite_code = Cms::getGetValue('invite_code');
        if ($invite_code) {
            Cms::setSession('invite_code', $invite_code);
        }

        $video=$this->getRecommend('kv',1);
        //首页轮播
        $banner=$this->getRecommend('Banner');
        //新闻
        $xw=self::data_($this->getContentArr(\Yii::$app->params['XINWEN'],5));
        //公告
        $gg=self::data_($this->getContentArr(\Yii::$app->params['GONGGAO'],5));
        //资讯
        $zx=self::data_($this->getContentArr(\Yii::$app->params['ZHIXUN'],5));
        //活动
        $hd=self::data_($this->getContentArr(\Yii::$app->params['HUODONG'],5));
        $data=[
            'video'=>isset($video[0])?$video[0]:'',
            'banner'=>$banner,
            'zx'=>$zx,
            'xw'=>$xw,
            'gg'=>$gg,
            'hd'=>$hd,
            'captcha_img'=>$captcha_img,
            'user_all'=>$user_all,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        if(Cms::getSession('channel_name')=='pv'){
           header('location:m/cover.html');
        }
        return $this->renderPartial('index.html',$data);
    }

    private function data_($arr){
        $data=[];
        if(isset($arr)){
            foreach ($arr as $key=>$value){
                $re['title']=$value['title'];
                $re['created_at']=date('m/d',$value['created_at']);
                $re['linkUrl']=$value['linkUrl'];
                $re['wapLinkUrl']=$value['wapLinkUrl'];
                $data[]=$re;
            }
        }
        return $data;
    }

    public function actionTest($name = '', $id = '')
    {
        if (!$name) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$name;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
