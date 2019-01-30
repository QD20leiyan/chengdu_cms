<?php
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');
defined('YII_DEMO') or define('YII_DEMO', false);
defined('YII_DEV') or define('YII_DEV', true);

require(__DIR__ . '/../../../vendor/autoload.php');
require(__DIR__ . '/../../../vendor/yiisoft/yii2/Yii.php');
require(__DIR__ . '/../../../common/config/bootstrap.php');



/**
 * 树状打印数据所有元素
 *
 * @access public
 * @param array $array
 */
function print_rr($array = array()) {
    echo "<div align=\"left\">";
    echo "<pre>";
    print_r($array);
    echo "</pre>";
    echo "</div>";
}

function pr($array = array(),$exit = false,$dump=false){
    if($dump){
        var_dump($array);
    }else{
        print_rr($array);
    }
    if($exit){
        exit;
    }
}

$config = yii\helpers\ArrayHelper::merge(
    require(__DIR__ . '/../../../common/config/main.php'),
    require(__DIR__ . '/../config/main.php')
);
(new yii\web\Application($config))->run();
