<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\PcController;
use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;
use Yii;
use yii\helpers\Json;


class VideoController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $type=Cms::getGetValue('type');
        if(Cms::getSession('language') == 'zh_cn'){//中文
            $banner = $this->getRecommend('wap_video_banner');    //首页banner
            switch ($type){
                case 'zxsp' ://最新视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_NEW']);
                    break;
                case 'gfsp' ://官方视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_OFF']);
                    break;
                case 'wjsp' ://玩家视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_PLAYER']);
                    break;
                default:
                    exit('该网页找不到');
            }
            $list = self::ajaxGetNews($categoryId,6);
            $data=[
                'data'=> isset($list['msg'])?$list['msg']:'',
                'banner'=> $banner,
                'type'=> $type,
            ];
            return $this->render('index.html',['data'=>$data,'language'=>Cms::getSession('language')], $categoryId);
        }else{
            $banner = $this->getRecommend('video_banner');    //首页banner
            $xuanchuan = $this->getContentArr(128);    //官方宣传
            $jingcai = $this->getContentArr(129);    //精彩赛事
            $remen = $this->getContentArr(130);    //热门英雄
            $jieshuo = $this->getContentArr(131);    //解说视频
            $category_id = 127;
            $data = [
                'banner' => $banner,
                'xuanchuan' => $xuanchuan,
                'jingcai' => $jingcai,
                'hot' => $remen,
                'jieshuo' => $jieshuo,
                'language'=>Cms::getSession('language'),
            ];
            return $this->render('index_en.html', $data, $category_id);
        }

        //数据测试
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->render('index.html',['data'=>$data,'language'=>Cms::getSession('language')], $categoryId);
    }
    //列表ajax
    public function actionAjaxList(){
        $type=Cms::getGetValue('type');
        if(Cms::getSession('language') == 'zh_cn'){//中文
            switch ($type){
                case 'zxsp' ://最新视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_NEW']);
                    break;
                case 'gfsp' ://官方视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_OFF']);
                    break;
                case 'wjsp' ://玩家视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_PLAYER']);
                    break;
                default:
                    exit('该网页找不到');
            }
        }else{
            switch ($type){
                case 'zxsp' ://最新视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_NEW']);
                    break;
                case 'gfsp' ://官方视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_OFF']);
                    break;
                case 'wjsp' ://玩家视频
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['VIDEO_PLAYER']);
                    break;
                default:
                    exit('该网页找不到');
            }
        }
        $data = self::ajaxGetNews($categoryId,6);
        echo Json::encode($data);
        exit;
    }


    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail], 0, $id);
    }
    //前端者数据查看
    public function actionTest($type1 = '', $id = '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }

}
