<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\BaseActiveRecord;
use common\components\PcController;
use common\Cms;
use common\components\SmsUtils;
use common\models\Content;
use common\models\Stat;
use common\models\VerifyCode;
use common\models\Website;
use common\widgets\commonMethod\CommonMethodController;
use yii\data\Pagination;
use yii\helpers\Json;
use yii\widgets\LinkPager;
use common\models\GiftCode;

class SiteController extends PcController
{
    public function actionBefore($action)
    {
        //设置游戏名
//        $_GET['channel_name'] = 'jjmlz';
        return parent::beforeAction($action);
    }

    public function actionCover()
    {
//        header('Location:/special/full-moon.html');
//        return $this->renderPartial('cover');

        return $this->renderPartial('cover');
    }

    public function actionIndex()
    {
        $banners = $this->getRecommend('banner');
        $xinshou = self::getContent(27);    //新手介绍
        $fuben = self::getContent(28);  //副本介绍
        $tese = self::getContent(29);   //特色玩法

        $zuixin = self::getContent(31, 8, 'created_at');   //最新新闻
        $xinwen = self::getContent(32, 8, 'created_at');   //新闻
        $gonggao = self::getContent(33, 8, 'created_at');   //公告新闻
        $gongnue = self::getContent(34, 8, 'created_at');   //公告攻略

        $szYl = $this->getContentArr(104, 1);   //时装展示-月轮
        $szLf = $this->getContentArr(105, 1);   //时装展示-呤风
        $szJz = $this->getContentArr(106, 1);   //时装展示-剑宗
        $rwYl = $this->getContentArr(108, 1);   //人物翅膀-月轮
        $rwLf = $this->getContentArr(109, 1);   //人物翅膀-呤风
        $rwJz = $this->getContentArr(110, 1);   //人物翅膀-剑宗
        $boss = $this->getContentArr(111);   //BOSS展示区

        $jietu = $this->getContentArr(112, 1);   //游戏截图
        $bizi = $this->getContentArr(113, 1);   //壁纸下载
        $countBoss = count($boss);

        $martial = self::getRecommend('martial');   //职业
//pr($boss, 1);
        return $this->render('index', [
            'banners' => $banners,
            'xinshou' => $xinshou->models,
            'fuben' => $fuben->models,
            'tese' => $tese->models,
            'martial' => $martial,
            'zuixin' => $zuixin->models,
            'xinwen' => $xinwen->models,
            'gonggao' => $gonggao->models,
            'gongnue' => $gongnue->models,
            'szYl' => $szYl,
            'szLf' => $szLf,
            'szJz' => $szJz,
            'rwYl' => $rwYl,
            'rwLf' => $rwLf,
            'rwJz' => $rwJz,
            'boss' => $boss,
            'countBoss' => $countBoss,
            'jietu' => $jietu,
            'bizi' => $bizi,

        ]);
    }

    public function actionError()
    {
        return $this->render('error');
    }

    /**
     * 新闻列表
     * @return string
     */
    public function actionNews()
    {
        $content = new Content();
//        $type = Cms::getGetValue('type');
//        if ($type == 'xinwen') {
//            $category_id = 32;
//        } else if ($type == 'gonggao') {
//            $category_id = 33;
//        } else {
//            $category_id = 31;
//            $type = 'zuixin';
//        }
//        $_GET['type'] = $type;
        $category_id = Cms::getGetValue('cid', 31);
        $category_ids = self::getChildren($category_id);
        $list = $content->getContentLists($category_ids, 9);
//pr($list, 1);
        return $this->render('news', [
            'data' => $list['data'],
            'page' => $list['page'],
//            'type' => $type,
            'cid' => $category_id
        ]);

    }

    /**
     * 详情页
     * @return string
     */
    public function actionDetails()
    {
        $navTitle = '新闻资讯';

        $id = Cms::getGetValue('id');
        $content = $this->getContentDetail($id);
        if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        return $this->render('details', [
            'data' => $content,
            'navTitle' => $navTitle,
        ]);
    }

//    public function actionTest(){
//        $this->actionNews();
//        exit;
//        $data = self::getArticles(27);
//        pr($data);
//        exit;
//        $this->actionTest();
//        exit;


//        $url = 'http://47.90.92.226:8080/qzh5/celebration.do?m=userinfoAnniversary&serverId=1001&roleId=1000341522';
//        $return = file_get_contents($url);
//        $arr = json_decode($return,true);
//        pr($arr);
//    }

    /**
     *异步获取内容详情
     */
    public function actionAjaxContentInfo()
    {
        $id = Cms::getGetValue('id');
        $content = Content::find()->where(['id' => $id])->asArray()->one();

        echo Json::encode(['status' => 0, 'msg' => $content]);
    }

    /**
     * 获取九剑下载人数
     * @return mixed
     */
    static function getJjDownloadNum()
    {
        $stat = Stat::find()->where(['website_id' => 25, 'name' => 'download_num'])->asArray()->one();
        return $stat['num'];
    }

    public function actionGetVerify()
    {
        $phone = Cms::getGetValue('phone');
        $type = Cms::getGetValue('type', 3);  //发送验证码类型，礼包

        $exist_phone = GiftCode::find()->where(['phone'=>$phone, 'gift_id' => 4])->one();
        if($exist_phone){
            $rez = array('status'=>1,'msg'=>$exist_phone['code']);
            echo Json::encode($rez);
            exit;
        }
        $result = Cms::verify($phone, $type);
        echo Json::encode($result);
        exit;
    }

    public function actionGetGift()
    {
        $phone = Cms::getGetValue('phone');
        $verify = Cms::getGetValue('verify');
        $type = Cms::getGetValue('type', 3);  //发送验证码类型，礼包
        if (!Cms::checkPhone($phone)) {
            return ['status' => 0, 'msg' => '手机号格式错误！'];
        }

        $result = Cms::getGift($phone, $verify, $type, 4);
        echo Json::encode($result);
        exit;
    }


}
