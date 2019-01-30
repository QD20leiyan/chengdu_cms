<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\components\WapController;
use yii\captcha\Captcha;

class SiteController extends WapController
{

    public function actionCover()
    {
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        return $this->renderPartial('cover.html',['captcha_img' => $captcha_img]);
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
