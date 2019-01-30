<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/11/16 0016
 * Time: 10:25
 */

namespace app\controllers\tk;


use common\Cms;
use common\components\H5BaseController;
use common\models\tk\H5TkOld;

class OldController extends H5BaseController
{
    public function actionIndex()
    {
        $type = Cms::getPostValue('type', '');
        $phone = Cms::getPostValue('phone', '');
        $name = Cms::getPostValue('name', '');
//        $money = Cms::getPostValue('money', '');
        $time = Cms::getPostValue('time', '');
        $city = Cms::getPostValue('city', '');
        if (!$type || !in_array($type, ['sk', 'sy', 'sj'])) {
            $this->echoJson(8001);
        }
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->echoJson(8002);
        }
        if (!$name) {
            $this->echoJson(8003);
        } else {
            $name = Cms::filterEmoji($name);
            if (!$name || mb_strlen($name) > 6) {
                $this->echoJson(8004);
            }
            $res = Cms::checkFilterWords($name);
            if ($res['status'] != 0) {
                $this->echoJson(1, $res['msg'].'敏感词为：'.implode('，', $res['data']));
            }
        }

        if ($type == 'sk') {
//            if (!$money || !is_numeric($money) || $money < 0) {
//                $this->echoJson(8005);
//            }
        } elseif ($type == 'sj') {
            if (!$time || !is_numeric($time) || $time < 0) {
                $this->echoJson(8006);
            }
            $city = Cms::filterEmoji($city);
            if (!$city || mb_strlen($city) > 50) {
                $this->echoJson(8007);
            }
        }
        H5TkOld::add($type, $phone, $name, 0, $time, $city);
        $this->echoJson(0);
    }
}