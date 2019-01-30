<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/8/29
 * Time: 11:07
 */

namespace app\controllers;


use common\components\PcController;

class SpecialController extends PcController
{
    public function actionFullMoon()
    {
        return $this->renderPartial('full_moon.html');
    }


}