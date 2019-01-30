<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\HomeController;
use common\models\GameModels\File;
use common\models\GameModels\Recommend;
use common\models\GameModels\RecommendDetail;
use common\models\GameModels\Column;

use common\models\GameSubscribe;
use yii\captcha\Captcha;
use yii\web\Controller;

class SiteController extends \common\components\WapController
{

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $invite_code = Cms::getGetValue('invite_code');
        if ($invite_code) {
            Cms::setSession('invite_code', $invite_code);
        }
        return $this->renderPartial('cover.html', ['captcha_img' => $captcha_img]);
    }

    public function actionAct()
    {
        echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $invite_code = Cms::getGetValue('invite_code');
        if ($invite_code) {
            Cms::setSession('invite_code', $invite_code);
        }
        return $this->renderPartial('cover.html', ['captcha_img' => $captcha_img]);
    }

    public function actionIndex()
    {
        $data['banners'] = $this->getRecommend('banner');
        $data['video'] = $this->getRecommend('video');

        $data['zuixin'] = $this->getContentArr(64, 5);    //最新
        $data['xinwen'] = $this->getContentArr(65, 5);    //新闻
        $data['gonggao'] = $this->getContentArr(66, 5);    //公告
        $data['huodong'] = $this->getContentArr(67, 5);    //活动
        $data['gonglue'] = $this->getContentArr(68, 5);    //攻略

        //游戏图鉴
        $data['wq'] = self::parse_army_arr(550,4);  //武器
        $data['fj'] = self::parse_army_arr(551,4);  //防具
        $data['fs'] = self::parse_army_arr(552,4);   //服饰
        $data['ss'] = self::parse_army_arr(553,4);   //设施
        $data['dj'] = self::parse_army_arr(554,4);    //道具
        $data['jz'] = self::parse_army_arr(555,4);    //建筑


        $data['zhubo_lunbo'] = $this->getContentArr(380, 3);

        $data_ids = [];
        $data_ids = self::getChildren(117, $data_ids);
        $data_ids = self::getChildren(118, $data_ids);
        $data_ids = self::getChildren(119, $data_ids);
        $data_ids = self::getChildren(120, $data_ids);
        $data_ids = self::getChildren(121, $data_ids);
        $data['data'] = $this->getContentArr($data_ids, 4);

        $raiders_ids = [];
        $raiders_ids = self::getChildren(132, $raiders_ids);
        $raiders_ids = self::getChildren(135, $raiders_ids);
        $raiders_ids = self::getChildren(138, $raiders_ids);
        $raiders_ids = self::getChildren(139, $raiders_ids);
        $raiders_ids = self::getChildren(140, $raiders_ids);
        $data['raiders'] = $this->getContentArr($raiders_ids, 4);

        $data['exhibition'] = $this->getRecommend('exhibition', 100);   //作品展示
        $data['play'] = $this->getRecommend('play_wap');   //特色玩法
//        $zhubo_lunbo = $this->getRecommend('zhubo_lunbo');
        $cate_arr = [64 => '最新', 65 => '新闻', 66 => '公告', 67 => '活动', 68 => '攻略'];


        $data['ych_sp'] = $this->getContentArr(658, 4);
        $data['ych_jzt'] = $this->getContentArr(657, 4);
        $data['ych_trh'] = $this->getContentArr(656, 4);
        if (!empty($data['ych_jzt'])) {
            foreach ($data['ych_jzt'] as &$v) {
                if (isset($v['content_message'])) {
                    $v['images'] = Cms::getBodyImgs($v['content_message']);
                } else {
                    $v['images'] = [];
                }
            }
        }

        if (!empty($data['ych_trh'])) {
            foreach ($data['ych_trh'] as &$v) {
                if (isset($v['content_message'])) {
                    $v['images'] = Cms::getBodyImgs($v['content_message']);
                } else {
                    $v['images'] = [];
                }
            }
        }
        return $this->renderPartial('index.html', $data);
    }

    //营销预约
    public function actionYxYuyue()
    {
        return $this->renderPartial('yx_yuyue.html');
    }

    /**
     * 抽奖cover页
     * @return string
     */
    public function actionLotteryCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('lottery_cover.html', ['captcha_img' => $captcha_img]);
    }
    protected function parse_army_arr($id,$num){
        $contents=$this->getContentArr($id,100);
        $data = [];
        if($contents) {
            foreach ($contents as $k) {
                if ($k['summary']) {
                    $body = strip_tags($k['summary'], ",;\r\n");
                    $peg_start = "/";
                    for ($i = 0; $i < $num; $i++) {
                        $peg_start .= '\[(\w+)\](.*)';
                    }
                    $peg = $peg_start . '/i';
                    preg_match($peg, $body, $result);
                    unset($result[0]);
                    foreach ($result as $key => $value) {
                        if ($key % 2 !== 0) {
                            $k[$result[$key]] = $result[$key + 1];
                        }
                    }
                    $data[]=$k;
                }
            }
        }
        return $data;
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
