<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/12/6 0006
 * Time: 17:51
 */

namespace app\controllers\tk;


use common\Cms;
use common\components\H5BaseController;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

class BdController extends H5BaseController
{
    /**
     * 正确答案
     * @var array
     */
    public $rightAnswer = [
        0 => 'A',
        1 => 'D',
        2 => 'D',
        3 => 'A',
        4 => 'D',
    ];
    public function actionIndex()
    {
        $answers = Cms::getPostValue('answers');
        $name = Cms::getPostValue('name');
        $phone = Cms::getPostValue('phone');
        $user = H5UserCenter::getUserInfo($this->h5Id, $phone);
        if ($user) {
            $this->echoJson(8011);
        }
        if (!$answers || count($answers) != 5) {
            $this->echoJson(8010);
        }
        $check = Cms::checkFilterWords($name);
        if ($check['status'] != 0) {
            $this->echoJson(1, '敏感词为：'.implode('，', $check['data']));
        }
        if (!$name) {
            $this->echoJson(8012);
        }
        if (mb_strlen($name) > 10) {
            $this->echoJson(8013);
        }
        if (!Cms::checkPhone($phone)) {
            $this->echoJson(8014);
        }
        $rightNum = 0;
        foreach ($answers as $k => $v) {
            if ($v == $this->rightAnswer[$k]) {
                $rightNum++;
            }
        }
        $data = [
            'answers' => $answers,
            'rightNum' => $rightNum,
            'name' => $name,
        ];
        $user = H5UserCenter::addUser($this->h5Id, $phone);
        H5UserCenterData::addData($this->h5Id, $user['id'], $data);
        $this->echoJson(0, '', ['rightNum' => $rightNum]);
    }
}