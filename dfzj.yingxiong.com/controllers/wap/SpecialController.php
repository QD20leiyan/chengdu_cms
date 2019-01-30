<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/11/12 0012
 * Time: 12:03
 */

namespace app\controllers\wap;


use common\components\WapController;

class SpecialController extends WapController
{
    public function actionMatch()
    {
        return $this->renderPartial('match.html');
    }
}