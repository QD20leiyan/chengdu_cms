<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/6/13
 * Time: 11:58
 */

namespace app\controllers\wap;

use common\helpers\Utils;
use common\models\ddd2\Ddd2Corps;
use common\models\ddd2\Ddd2CorpsVote;
use common\models\ddd2\Ddd2GameInfo;
use common\models\ddd2\Ddd2GameServer;
use common\models\ddd2\Ddd2Zhufu;
use yii\helpers\Json;

class SpecialController extends \common\components\WapController
{
    /**
     * 广告推广
     *
     */
    public function actionGgtg()
    {
        return $this->renderPartial('ggtg');
    }

    /**
     * 广告推广
     *
     */
    public function actionGgtg2()
    {
        return $this->renderPartial('ggtg2');
    }

    /**
     * 广告推广
     *
     */
    public function actionGgtg3()
    {
        return $this->renderPartial('ggtg3');
    }
    /**
     * 广告推广
     *
     */
    public function actionGgtg4()
    {
        return $this->renderPartial('ggtg4');
    }

    public function actionLiansai()
    {
        //获取英雄联赛新闻左边图片
        $liansai=$this->getRecommend('liansai');

        //获取英雄联赛活动图片
        $liansaiAct=$this->getRecommend('liansai_act');

        //获取英雄联赛新闻
        $news = self::getContent(39, 4);//综合

        //游戏视频
        $gameVideo = self::getContent(51);

        //获取联赛信息
        $matchInfo = Ddd2GameInfo::findOne(1);

        //获取区服信息
        $gameServer = Ddd2GameServer::find()->all();

        //获取战队信息
        $corps = Ddd2Corps::find()->asArray()->all();
        $corps_32 = $corps;
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

        $dataPosition1 = array();
        $dataPosition2 = array();
        $dataPosition3 = array();
        $dataPosition4 = array();
        for ($i=0; $i<32; $i++) {
            $dataPosition1[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
        }

        for ($i=0; $i<16; $i++) {
            $dataPosition2[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
        }
        for ($i=0; $i<2; $i++) {
            $dataPosition3[$i] = array('id' => 0, 'name' => '', 'vote_num' => 0);
        }
        $dataPosition4[0] = array('id' => 0, 'name' => '', 'vote_num' => 0);
        if ($matchInfo['status'] == 1) {
            $dataPosition1 = $corps_32;
        } else if ($matchInfo['status'] == 2) {
            foreach ($corps_16 as $k=>$v) {
                $dataPosition1[$k] = $v;
            }
        } else if ($matchInfo['status'] == 3) {
            foreach ($corps_8 as $k=>$v) {
                $dataPosition1[$k] = $v;
            }
        } else if ($matchInfo['status'] == 4) {
            foreach ($corps_4 as $k=>$v) {
                $dataPosition2[$k] = $v;
            }
        } else if ($matchInfo['status'] == 5) {
            foreach ($corps_2 as $k=>$v) {
                $dataPosition3[$k] = $v;
            }
        } else if ($matchInfo['status'] == 6) {
            $dataPosition4 = $corps_1;
        }


        return $this->renderPartial('liansai', array(
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
            'dataPosition1' => $dataPosition1,
            'dataPosition2' => $dataPosition2,
            'dataPosition3' => $dataPosition3,
            'dataPosition4' => $dataPosition4,
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
        //获取联赛信息
        $matchInfo = Ddd2GameInfo::findOne(1);
        $maxTime = date('Y-m-d', $matchInfo['match_time'])." 19:59";
        $minTime = date('Y-m-d', $matchInfo['match_time'])." 00:00";
//        if (time() > strtotime($maxTime) || time() < strtotime($minTime)) {
//            echo Json::encode(array('status' => 0, 'msg' => '当前时间不支持投票，请在比赛当天19:59之前进行投票'));
//            exit;
//        }
        $model = new Ddd2CorpsVote();
        $result = $model->voteCorps();
        echo Json::encode($result);
        exit;
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

    //爱之公寓
    public function actionLovegy()
    {
        return $this->renderPartial('lovegy.html');
    }
}