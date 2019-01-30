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


class VideoController extends WapController
{

    //列表页
    public function actionIndex()
    {
        if(Cms::getSession('language') == 'zh_cn'){
        $banner = $this->getRecommend('video_banner');    //首页banner
        $xuanchuan = $this->getContentArr(59);    //官方宣传
        $jingcai = $this->getContentArr(60);    //精彩赛事
        $remen = $this->getContentArr(61);    //热门英雄
        $jieshuo = $this->getContentArr(62);    //解说视频
        $category_id = 58;
    }else{
        $banner = $this->getRecommend('video_banner');    //首页banner
        $xuanchuan = $this->getContentArr(128);    //官方宣传
        $jingcai = $this->getContentArr(129);    //精彩赛事
        $remen = $this->getContentArr(130);    //热门英雄
        $jieshuo = $this->getContentArr(131);    //解说视频
        $category_id = 127;
    }

        $data = [
            'banner' => $banner,
            'xuanchuan' => $xuanchuan,
            'jingcai' => $jingcai,
            'hot' => $remen,
            'jieshuo' => $jieshuo,
            'language'=>Cms::getSession('language'),
        ];
        //数据测试
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->render('index.html', $data, $category_id);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail], 0, $id);
    }
    //前端者数据查看
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
