<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/19/019
 * Time: 15:23
 */

namespace app\controllers;


use common\Cms;
use common\widgets\commonMethod\CommonMethodController;

class CommonController extends CommonMethodController
{
    static function actionCount(){
        $changeTime = 3600;
        $rand = 1389;
        $timePath = '../runtime/time.txt';
        $currentTime = time();
        if($currentTime>=strtotime('2018-3-31 23:59:59')){
            file_put_contents($timePath, 702154);
        }elseif($currentTime>strtotime('2018-3-13')){
            $rand =890;
        }elseif($currentTime==strtotime('2018-3-13')){
            file_put_contents($timePath, 305154);
        }else{
            if (!file_exists($timePath)) {
                file_put_contents($timePath, 100548);
            }
        }
        $count = intval(file_get_contents($timePath));
        $modifTime = filemtime($timePath);
        if ($currentTime - $modifTime >= $changeTime) {
            $count += $rand;
            file_put_contents($timePath, $count);
        }
        if(Cms::isAjax()){
            echo json_encode($count);exit;
        }
        return $count;
    }

}