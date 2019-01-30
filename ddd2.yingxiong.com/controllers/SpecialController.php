<?php
/**
 * 夏目的专题页面
 * 
 * @author Administrator
 *
 */

namespace app\controllers;

use common\Cms;
use common\components\PcController;
use common\components\Utils;
use common\models\ddd2\Ddd2Corps;
use common\models\ddd2\Ddd2CorpsVote;
use common\models\ddd2\Ddd2GameInfo;
use common\models\ddd2\Ddd2GameServer;
use common\models\ddd2\Ddd2Zhufu;
use yii\helpers\Json;

class SpecialController extends PcController
{

    //英雄联赛进行中的状态
    private $matchStatus = array(1 => 32, 2 => 16, 3 => 8, 4 => 4, 5 => 2, 6 => 1);
    
    //每轮比赛支持的最大投票数
    const maxSupport = array(32 => 4, 16 => 2, 8 => 1, 4 => 1, 2 => 1);
    const match32 = 1;
    const match16 = 2;
    const match8 = 3;
    const match4 = 4;
    const match2 = 5;
    const match1 = 6;

    //明星主播
    public function actionCompere()
    {

        //直播
        $compere_live_vedio = $this->getRecommend('compere_live_vedio');
        //四个按钮链接
        $link = $this->getRecommend('link');
        //录播
        $compere_vedio = $this->getRecommend('compere_vedio');
        //推荐明星主播
        $compere = $this->getRecommend('compere');
        //合作伙伴
        $zb_partner  = $this->getRecommend('zb_partner');
        return $this->renderPartial('compere',array(
            'compere'=>$compere,
            'compere_live_vedio' => $compere_live_vedio,
            'compere_vedio'=>$compere_vedio,
            'zb_partner'=>$zb_partner,
            'link'=>$link
        ));
    }
    //返利页面
    public function actionDown_fl()
    {
        return $this->renderPartial('down_fl',array());
    }

    public function actionLove(){
        return $this->renderPartial('love', []);
    }

    public function actionLove_m(){
        return $this->renderPartial('love_m',array());
    }
    
    //2-14情人节-pc
    public function actionLoveBH()
    {
        return $this->renderPartial('loveBH',array());
    }
    
    //2-14情人节-wap
    public function actionLoveBH_m()
    {
        return $this->renderPartial('loveBH_m',array());
    }
    
    public function actionIndex()
    {
        //获取英雄联赛新闻左边图片
        $liansai=$this->getRecommend('liansai');

        //获取英雄联赛活动图片
        $liansaiAct=$this->getRecommend('liansai_act');
        
        //获取英雄联赛新闻
        $news = self::getContent(39, 4);//综合

        //游戏视频
        $gameVideo = self::getContent(51);
        
//pr($gameVideo->getData(), 1);
        //获取联赛信息
        $matchInfo = Ddd2GameInfo::findOne(1);
//    pr($matchInfo, 1);
        //获取区服信息
        $gameServer = Ddd2GameServer::find()->all();
        //获取战队信息
        $corps = Ddd2Corps::find()->asArray()->all();
        $corps_32 = $corps;
//        pr($corps_32, 1);
        $corps_16 = array();
        $corps_8 = array();
        $corps_4 = array();
        $corps_2 = array();
        $corps_1 = array();

        foreach ($corps as $v) {
            if ($v['rank_16']) {
                $corps_16[] = $v;
            }
            if ($v['rank_8']) {
                $corps_8[] = $v;
            }
            if ($v['rank_4']) {
                $corps_4[] = $v;
            }
            if ($v['rank_2']) {
                $corps_2[] = $v;
            }
            if ($v['first']) {
                $corps_1[] = $v;
            }
        }
//        if (empty($corps_16)) {
            for ($i=0; $i<16; $i++) {
                if (!isset($corps_16[$i])) {
                    $corps_16[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
                }

                if (!isset($corps_8[$i])) {
                    $corps_8[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
                }

                if (!isset($corps_4[$i])) {
                    $corps_4[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
                }

                if (!isset($corps_2[$i])) {
                    $corps_2[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
                }
            }
//        }
//        if (empty($corps_8)) {
//            for ($i=0; $i<16; $i++) {
//                $corps_8[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
//            }
//        }
//
//        if (empty($corps_4)) {
//            for ($i=0; $i<16; $i++) {
//                $corps_4[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
//            }
//        }
//
//        if (empty($corps_2)) {
//            for ($i=0; $i<16; $i++) {
//                $corps_2[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
//            }
//        }


        if (empty($corps_1)) {
            $corps_1 = array(array('name' => '', 'vote_num' => 0));
        }
        return $this->renderPartial('index', array(
            'corps_32' => $corps_32,
            'corps_16' => $corps_16,
            'corps_8' => $corps_8,
            'corps_4' => $corps_4,
            'corps_2' => $corps_2,
            'corps_1' => $corps_1,
            'liansai' => $liansai,
            'liansaiAct' => $liansaiAct,
            'news' => $news->models,
            'gameVideo' =>$gameVideo->models,
            'matchInfo' => $matchInfo,
            'gameServer' => $gameServer,
        ), 315);
    }
    
    //得到验证码
    public function actionGetVerify()
    {
        $model = new Ddd2CorpsVote();
        $result = $model->getVerify();
        echo Json::encode($result);
        exit;
    }
    
    /**
     * 执行投票
     * @return type
     */
    public function actionVote()
    {
        $model = new Ddd2CorpsVote();
        //获取联赛信息
        $matchInfo = Ddd2GameInfo::findOne(1);
        $maxTime = date('Y-m-d', $matchInfo['match_time'])." 19:59";
        $minTime = date('Y-m-d', $matchInfo['match_time'])." 00:00";
        if (time() > strtotime($maxTime) || time() < strtotime($minTime)) {
            echo Json::encode(array('status' => 0, 'msg' => '当前时间不支持投票，请在比赛当天19:59之前进行投票'));
            exit;
        }
        
        $result = $model->voteCorps();
        echo Json::encode($result);
        exit;
    }
    
    
    public function actionVideoList()
    {
        //游戏视频
        $list = self::getContent(51, 100);
        return $this->renderPartial('video_list', array(
            'list' => $list->models,
        ));
    }

    /**
     * 一周年
     * @return string
     */
    public function actionOneYears()
    {
        $result = Utils::sendHttpRequest('http://119.29.7.131:8111/GetServerListServlet', array(), 'GET');
        $result = json_decode($result['content'], true);
        if ($result['returnCode'] != 1) {
            $server = array();
        } else {
            $server = $result['data'];
        }
        $zhufu = Ddd2Zhufu::find()->orderBy(['id' => SORT_DESC])->limit(100)->asArray()->all();
        return $this->renderPartial('one_years', [
            'server' => $server,
            'zhufu' => $zhufu,
        ]);
    }

    /**
     * 发送祝福语
     */
    public function actionSendZhufu()
    {
        $content = Cms::getPostValue('content');
        $serverName = Cms::getPostValue('serverName');
        $username = Cms::getPostValue('username');
        $ip = Cms::getClientIp();
        if (!$content) {
            echo Json::encode(['status' => -1, 'msg' => '请先编辑祝福语哦~~！']);
            exit;
        }
        if (!$username) {
            echo Json::encode(['status' => -1, 'msg' => '昵称不能为空！']);
            exit;
        }
        if (mb_strlen($content) > 60) {
            echo Json::encode(['status' => -1, 'msg' => '内容太长！']);
            exit;
        }
        if (mb_strlen($username) > 8) {
            echo Json::encode(['status' => -1, 'msg' => '昵称不能超过8个字符！']);
            exit;
        }
        $file = trie_filter_load('words.dic');
        $arr = trie_filter_search_all($file, $content);  // 一次把所有的敏感词都检测出来
        $newContent = $content;

        if (!empty($arr)) {
            echo Json::encode(['status' => -1, 'msg' => '祝福语中含有敏感词汇无法发送，请重新编辑！']);
            exit;

//            foreach ($arr as $k => $v) {
//                $str =  substr($content, $v[0], $v[1]);
//
//                $newContent = str_replace($str, '***', $newContent);
//            }
        }
        $count = Ddd2Zhufu::find()
            ->where(['ip' => $ip])
            ->andWhere(['between', 'created_at', strtotime(date('Y-m-d').' 00:00:00'), strtotime(date('Y-m-d').' 23:59:59')])
            ->count();
        if ($count >= 3) {
            echo Json::encode(['status' => -1, 'msg' => '每个IP每天最多只能发送3天祝福！']);
            exit;
        }

        $model = new Ddd2Zhufu();
        $model->server_name = $serverName;
        $model->username = $username;
        $model->content = $newContent;
        $model->created_at = time();
        $model->ip = $ip;
        $model->save();
        if (!empty($model->getErrors())) {
            echo Json::encode(array('status' => -1, 'msg' => '发送失败！'));
            exit;
        }
        echo Json::encode(['status' => 0]);
    }

    /**
     * 获取祝福内容
     */
    public function actionAjaxZhufu()
    {
        $zhufu = Ddd2Zhufu::find()->orderBy(['id' => SORT_DESC])->limit(100)->asArray()->all();
        echo Json::encode(['status' => 0, 'msg' => $zhufu]);
    }

    //爱之公寓
    public function actionLovegy()
    {
        return $this->renderPartial('lovegy.html');
    }

//    public function actionTest()
//    {
//        $corps = CorpsModel::model()->with('con')->findAll();
////        foreach ($corps as $v) {
////            pr($v->con->name);
////        }
//        pr($corps->getAttributes(), 1);
//
//        exit;
//
//        /*****************发送验证码******************************/
//        $_POST['phone'] = 13510596862;
//        $this->actionGetVerify();
//        exit;
//
//        /**************测试投票******************************/
//        $_POST['server_id'] = 1;
//        $_POST['corps_id'] = 2;
//        $_POST['phone'] = 13510596862;
//        $_POST['yzm'] = 1234;
//        $_POST['name'] = 'zsds';
//        $_POST['match_status'] = 1;
//        $this->actionVote();
//        exit;
//    }
}
