<?php

namespace app\controllers\tk;

use common\Cms;
use common\components\H5BaseController;
use common\components\HomeController;
use common\models\h5\H5UserCenter;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/8/14
 * Time: 11:13
 */
class YuyueController extends H5BaseController
{
    public function actionIndex()
    {
        $h5Id = Cms::getSession('h5_id');
        if (!$h5Id) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请刷新页面重试！']);
        }
        $phone = Cms::getPostValue('phone');
        $scene = Cms::getPostValue('scene');
        if (!Cms::checkPhone($phone)) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '手机号不正确！']);
        }
        if (!is_numeric($scene) || !in_array($scene, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) {
            $this->ajaxOutPut(['status' => -1, 'msg' => 'scene 参数不正确！']);
        }

        $user = H5UserCenter::getUserInfo($h5Id, $phone, '', $scene);
        if ($user) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '您已经预约，请勿重复预约！']);
        }
        H5UserCenter::addUser($h5Id, $phone, '', $scene);
        $this->ajaxOutPut(['status' => 0, 'msg' => '成功']);
    }
}