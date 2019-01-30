<?php

namespace app\controllers\wpys;

use common\Cms;
use common\components\H5BaseController;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/9/17 0017
 * Time: 11:33
 */

class ZqController extends H5BaseController
{
    const SESSION_LOGIN = 'zq_name';

    public $data = [
        'option' => [1 => 'A'],
        'answer' => 'dsfsd',
        'time' => '',
    ];



    public function actionIndex()
    {
        $this->_checkLogin();
        $option = Cms::getPostValue('option');
        $answer = Cms::getPostValue('answer');

        $name = Cms::getSession(self::SESSION_LOGIN);
        if (!$option || !is_array($option) || empty($option)) {
            $this->echoJson(4001);
        }
        if (!$answer) {
            $this->echoJson(4002);
        }

        $data[] = [
            'option' => $option,
            'answer' => $answer,
            'time' => time(),
            'name' => $name,
        ];
        $user = H5UserCenter::addUser($this->h5Id, '', time().'_'.rand(1, 10000));
        H5UserCenterData::addData($this->h5Id, $user['id'], $data);
        $this->echoJson(0);
    }

    public function actionCheckName()
    {
        $name = Cms::getPostValue('name');
        if (!$name) {
            $this->echoJson(4003);
        }
        if (mb_strlen($name) > 8) {
            $this->echoJson(4006);
        }
        $name = Cms::filterEmoji($name);
        $checkFilter = Cms::checkFilterWords($name);
        if ($checkFilter['status'] != 0) {
            $this->echoJson(4004, $checkFilter['msg'].', 敏感词为：'.implode(',', $checkFilter['data']));
        }

        Cms::setSession('zq_name', $name);
        $this->echoJson(0);
    }

    private function _checkLogin()
    {
        if (!Cms::getSession(self::SESSION_LOGIN)) {
            $this->echoJson(4005);
        }
    }
}