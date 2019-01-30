<?php

namespace app\controllers\lzsg;

use common\components\H5BaseController;
use common\Cms;
use common\models\h5\H5UserCenter;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/9/10
 * Time: 13:50
 */
class YuyueController extends H5BaseController
{
    /**
     * 预约
     */
    public function actionIndex()
    {
        $phone = Cms::getPostValue('phone');
        if (!Cms::checkPhone($phone)) {
            $this->echoJson(3001);
        }

        $user = H5UserCenter::getUserInfo($this->h5Id, $phone);
        if ($user) {
            $this->echoJson(3002);
        }
        H5UserCenter::addUser($this->h5Id, $phone);
        $this->echoJson(0);
    }
}