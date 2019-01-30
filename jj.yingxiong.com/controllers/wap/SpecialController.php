<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/8/29
 * Time: 11:07
 */

namespace app\controllers\wap;


use common\components\WapController;

class SpecialController extends WapController
{
    public function actionFullMoon()
    {
        return $this->renderPartial('full_moon.html');
    }
}