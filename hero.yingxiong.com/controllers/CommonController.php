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
        $currentTime = time();
        if($currentTime>=1517673600){
            $count=1000858;
        }else {
            $changeTime = 3;
            $rand = mt_rand(1, 3);
            $timePath = '../runtime/time.txt';
            if (!file_exists($timePath)) {
                file_put_contents($timePath, 343860);
            }
            $count = intval(file_get_contents($timePath));
            $modifTime = filemtime($timePath);
            if ($currentTime - $modifTime >= $changeTime) {
                $count += $rand;
                file_put_contents($timePath, $count);
            }
        }
        if(Cms::isAjax()){
            echo json_encode($count);exit;
        }
        return $count;
    }

}