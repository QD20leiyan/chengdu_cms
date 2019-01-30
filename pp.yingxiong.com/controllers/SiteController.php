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

class SiteController extends PcController
{
    const GIFT_YUYUE = 410;
    const SCENE_YUYUE = 0;

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }

    public function actionYuyue()
    {
        $phone = Cms::getPostValue('phone');
        $type = Cms::getPostValue('type');
        $yzm = Cms::getPostValue('yzm');
        $res = Cms::yuyueAndGetGift($this->website_id, $phone, $type, self::GIFT_YUYUE, self::SCENE_YUYUE);
        if ($res['status'] != 0) {
            $this->echoJson($res['status'], $res['msg']);
        }
        $this->echoJson(0, '', $res['data']);
    }
}
