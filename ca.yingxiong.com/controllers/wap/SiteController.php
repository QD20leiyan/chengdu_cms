<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\BaseActiveRecord;
use common\components\WapController;
use common\models\ButtonClick;
use common\models\ButtonClickNum;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;

use common\models\Gift;
use common\models\GiftCode;
use yii\captcha\Captcha;
use yii\web\Controller;

class SiteController extends WapController
{

    public function actionCover()
    {
        return $this->renderPartial('cover.html');

        return $this->renderPartial('/wap/page/anniversary1.html');
//        //特色玩法
//        $ts_play=$this->getRecommend('new_game_camp');
//        $video=$this->getRecommend('kv_video',1);
//        $play_img=array();
//        if($ts_play){
//            foreach ($ts_play as $k=>$kv){
//                $re['img']=$kv['thumb'];
//                $re['title']=$kv['title'];
//                $re['url']=$kv['url'];
//                $play_img[]=$re;
//            }
//        }
//        $data=array(
//            'video'=>isset($video[0])?$video[0]:'',
//            'play_img'=>$play_img
//        );
//        return $this->renderPartial('cover.html',$data);
//        return $this->renderPartial('/wap/page/legend.html');
        return $this->renderPartial('/wap/site/anniversary.html');
//        Header("HTTP/1.1 301 Moved Permanently");
//        Header("Location: http://".$_SERVER['HTTP_HOST']."/m/contest.html");
//        return $this->render('cover');
    }

    public function actionIndex()
    {
        $data = [];
        $data['kv_video'] = $this->getRecommend('kv_video');    //KV—视频
        $data['kv_video'] = $data['kv_video'][0];
        $data['activity'] = $this->getRecommend('activity');    //精彩活动
        $data['banner'] = $this->getRecommend('banner');    //banner
        $data['zx'] = $this->getContentArr('319', 6);   //最新
        $data['xw'] = $this->getContentArr('320', 6);   //新闻
        $data['gg'] = $this->getContentArr('321', 6);   //公告
        $data['hd'] = $this->getContentArr('322', 6);   //活动
        $data['gl'] = $this->getContentArr('323', 6);   //攻略

        $data['role'] = $this->getRecommend('new_game_role');    //角色专题
        $data['gun'] = $this->getRecommend('new_gun_all');    //明枪馆
        $data['map'] = $this->getRecommend('new_map_view');    //地图

        $data['video_zx'] = $this->getContentArr('329', 6);   //视频中心-最新
        $data['video_gf'] = $this->getContentArr('330', 6);   //官方视频
        $data['video_zb'] = $this->getContentArr('331', 6);   //直播
        $data['video_ss'] = $this->getContentArr('332', 6);   //赛事
        $data['video_wq'] = $this->getContentArr('333', 6);   //武器
        $data['video_xs'] = $this->getContentArr('334', 6);   //新手

        $data['match_act'] = $this->getRecommend('match_act');    //赛事活动
//        $data['player_mx'] = $data['video_gl_xs'] = $this->getContentArr('359', 10);   //新手;    //	大神玩家-明星玩家
//        $data['player_xs'] = $data['video_gl_xs'] = $this->getContentArr('358', 10);   //新手;    //大神玩家-职业选手
//
//        $data['wqgj'] = $data['video_gl_xs'] = $this->getContentArr('362', 10);    //wap-往期冠军

        $data['player_mx'] = $this->getContentArr('359', 10);   //新手;    //	大神玩家-明星玩家
        $data['player_xs']  = $this->getContentArr('358', 10);   //新手;    //大神玩家-职业选手

        $data['wqgj']  = $this->getContentArr('362', 10);    //wap-往期冠军
        $data['qytg'] = $this->getRecommend('tougao');    //枪友投稿
        if ($data['qytg']) {
            $data['qytg'] = $data['qytg'][0];
        }


        return $this->renderPartial('index.html', $data);
    }

    /**
     *攻略中心
     * @return string
     */
    public function actionGlzx()
    {
        $data['banner'] = $this->getRecommend('banner');    //banner
        $data['gl_zx'] = $this->getContentArr('324', 6);   //攻略中心-最新
        $data['gl_wq'] = $this->getContentArr('325', 6);   //武器
        $data['gl_pvp'] = $this->getContentArr('326', 6);   //PVP
        $data['gl_pve'] = $this->getContentArr('327', 6);   //PVE
        $data['gl_xs'] = $this->getContentArr('328', 6);   //新手

        $data['video_gl_zx'] = $this->getContentArr('335', 4);   //视频攻略-最新
        $data['video_gl_wq'] = $this->getContentArr('336', 4);   //武器
        $data['video_gl_pvp'] = $this->getContentArr('337', 4);   //PVP
        $data['video_gl_pve'] = $this->getContentArr('338', 4);   //PVE
        $data['video_gl_xs'] = $this->getContentArr('339', 4);   //新手

        return $this->renderPartial('glzx.html', $data);
    }

    public function actionError()
    {
        return $this->render('error');
    }
    /**
     * 抽奖cover页
     * @return string
     */
    public function actionLottery()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $video=$this->getRecommend('kv_video');    //KV—视频
        return $this->renderPartial('lottery.html', ['captcha_img' => $captcha_img,'video'=>isset($video[0])?$video[0]:'']);
    }
    /**
     * 记录用户操作按钮的次数
     ***/
    public function actionAjaxClick(){
        $type=Cms::getPostValue('type',1);//1 pc  2 wap
        $button_id=Cms::getPostValue('id');
        $button=ButtonClick::find()->where(['id'=>$button_id])->one();
        if($button){
            $button_click=new ButtonClickNum();
            $button_click->website_id=BaseActiveRecord::getWebsiteId();
            $button_click->button_id=$button_id;
            $button_click->user_ip=Cms::getClientIp();
            $button_click->type=$type;
            $button_click->c_num=1;
            $button_click->created_at=time();
            if($button_click->save()) {
                $this->ajaxOutPut(['status'=>0,'msg'=>'success']);
            }
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'网络错误，请稍后再试！']);
    }
    /*********************************************************《全民枪战2》古墓丽影合作活动*****************************************************/

    public function actionActivity(){
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $video = $this->getRecommend('kv_video',1);    //KV—视频
        $arr=[51,52,53,54];
        $day=date('Y-m-d');
        $jewel_num=GiftCode::find()->where(['in','gift_id',$arr])->andWhere(['status'=>1])->andWhere(['between','updated_at',$day,$day.' 23:59:59'])->count();
        $jewel_num=10000-$jewel_num;
        $img=$this->getRecommend('gm_activity_img');
        $data=[
            'captcha_img'=>$captcha_img,
            'video'=>$video,
            'jewel_num'=>$jewel_num,
            'img'=>$img,
        ];
      return $this->renderPartial('activity.html',$data);
    }
    /**
     * 预约/登录功能
     */
    public function actionAjaxActivityLoginVerify()
    {
        $captcha = Cms::getPostValue('captcha');
        $res = $this->createAction('captcha')->validate($captcha, false);
        if (!$res) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '图片验证码输入错误']);
        }

        $phone = Cms::getPostValue('phone');
        $res = Cms::verify($phone, Cms::SM_LOGIN, '您正在进行《全民枪战2》预约活动验证，请于1小时内输入');
        $this->ajaxOutPut($res);
    }

    public function actionAnniversary()
    {
        return $this->renderPartial('anniversary.html');
    }
}
