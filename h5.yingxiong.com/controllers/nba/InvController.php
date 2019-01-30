<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/11/19 0019
 * Time: 13:55
 */

namespace app\controllers\nba;


use common\components\H5BaseController;

class InvController extends H5BaseController
{
    public function actionIndex()
    {
        $this->echoJson(0);
    }
}