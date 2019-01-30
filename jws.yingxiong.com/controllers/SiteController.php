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
use common\models\jws\JwsMrtNum;
use common\models\jws\JwsMrtServer;
use common\models\jws\JwsTeam;

class SiteController extends PcController
{
    public function actionCover()
    {
//        //首页和cover页视频
        $cover_video = $this->getRecommend('cover_video');
        //图文推荐
//        $imageText = $this->getRecommend('index_j_banner');

        $data=[
            'cover_video'=>$cover_video,
//            'style'=>'index',
//            'imageText'=>$imageText,
            ];
        return $this->renderPartial('cover_year.html',$data);
//        return $this->renderPartial('cover.html');
    }

    //增加一个统计入口
    public function actionExtend(){
        return $this->actionIndex();
    }

    public function actionIndex()
    {
        //获取banner
        $banner=$this->getRecommend('banner');
        //合作伙伴
        $partner= $this->getRecommend('partner');
        //首页视频
        $video = $this->getContentArr(\Yii::$app->params['VIDEO'],4);

        //首页和cover页视频
        $cover_video = $this->getRecommend('cover_video');


        //图文推荐
        $imageText = $this->getRecommend('index_j_banner');


//        //solgan图片
//        $solgan= $this->getRecommend('solgan');
//        //首页礼包图片图片
//        $gift_image= $this->getRecommend('gift_image');

        /**
         * 新闻
         */
        //最新
        $zx = $this->getContentArr(\Yii::$app->params['ZONGHE'],6);
        //新闻
        $xw = $this->getContentArr(\Yii::$app->params['XINWEN'],6);
        //公告
        $gg = $this->getContentArr(\Yii::$app->params['GONGGAO'],6);
        //活动
        $hd = $this->getContentArr(\Yii::$app->params['HUODONG'],6);
        //攻略
        $gl = $this->getContentArr(\Yii::$app->params['GONGLUE'],6);

        //角色数据
        $roles=[];
        $role_all=$this->getContentArr(\Yii::$app->params['JUESE'],5);
//        pr($role_all,1);
        if($role_all) {
            foreach ($role_all as $key => $value) {
                $skill=$this->parse_jws_attr($value['summary']);//技能
                $info=$this->parse_jws_attr(strip_tags($value['content_message']),1);//详情
                $role['id']=$value['id'];
                $role['title']=$value['title'];
                $role['created_at']=$value['created_at'];
                $role['redirect_url']=$value['thumb'];
                $role['info']=$info;
                $role['skill']=$skill;
                $roles[]=$role;
            }
        }

////pr($partner,1);
//        //首页广告位
//        $ad = $this->getRecommend('ad');
//
//
//        //媒体
//        $mt = $this->getContentArr(\Yii::$app->params['MEITI'],6);
//
//        //影画
//        $yh = $this->getContentArr(\Yii::$app->params['YINGHUA'],4);
////风云
//        $fy = $this->getContentArr(\Yii::$app->params['FENGYUN'],6);
//
//        //首页team
//        $team = $this->getContentArr(\Yii::$app->params['TEAM'],5);
//
//        //角色
//        $js = $this->getContentArr(\Yii::$app->params['JUESE'],3);
//       return $this->render('index',array(
//            'banner'=>$banner,
//            'cover_video'=>$cover_video,
//            'zx'=>$zx,
//            'xw'=>$xw,
//            'gg'=>$gg,
//            'hd'=>$hd,
//            'gl'=>$gl,
//            'mt'=>$mt,
//            'partner'=>$partner,
//            'team'=>$team,
//            'js'=>$js,
//            'ad'=>$ad,
//            'solgan'=>$solgan,
//            'gift_image'=>$gift_image,
//            'yh'=>$yh,
//            'imageText'=>$imageText,
//            'fy'=>$fy,
//            'nid'=>1
//        ));

        $data=array(
            'style'=>'index',
            'banner'=>$banner,
            'cover_video'=>$cover_video,
            'video'=>$video,
            'roles'=>$roles,
            'zx'=>$zx,
            'xw'=>$xw,
            'gg'=>$gg,
            'hd'=>$hd,
            'gl'=>$gl,
            'partner'=>$partner,
            'imageText'=>$imageText,
        );
//        pr($data,1);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('index.html',$data);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**
     * 名人堂
     * @return string
     */
    public function actionMrt()
    {
        $data['team'] = JwsTeam::getAll(1, 1);
        $data['num'] = JwsMrtNum::getData();
        $data['servers'] = JwsMrtServer::getServer(1);
        return $this->renderPartial('mrt.html', $data);
    }

    public function actionGetMrt()
    {
        $num = Cms::getPostValue('num', 1);
        $servers = JwsMrtServer::getServer($num);
        $serverId = Cms::getPostValue('server_id', 0);
        if (!$serverId) {
            foreach ($servers as $k => $v) {
                $serverId = $k;
                break;
            }
        }
        $data = JwsTeam::getAll($num, $serverId);
        $this->ajaxOutPut(['status' => 0, 'msg' => $data, 'servers' => $servers]);
    }

    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }



}
