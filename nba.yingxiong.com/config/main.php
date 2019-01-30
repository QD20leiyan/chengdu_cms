<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/nba/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/nba/');
    define('VERSION', time());
} else {
    define('STATIC_DOMAIN','//cdnstatic.yingxiong.com/nba/');
    define('VERSION', '1.0.0');
}

$params = require(__DIR__ . '/params.php');
$config = [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'app\controllers',
   // 'defaultRoute' => 'site/index',
    'bootstrap' => ['log'],
    'language' =>'zh-CN',
    'controllerMap' => [
        // declares "account" controller using a class name
        'downloadLink' => 'common\widgets\downloadLink\DownloadLinkController',

    ],
    'components' => [
        'request' => [
            'csrfParam' => 'cms_csrf',
            'cookieValidationKey' => 'j08gfIkrnrFTitr460qqgni9euhAIbvt',
            'enableCsrfValidation' => true,
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                'db' => [
                    'class' => 'backend\components\DbLog',
                    'levels' => ['info'],
                    'categories' => ['yii\db\Command::*'],
                ],
                'file' => [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['trace', 'error'],
                    'categories' => ['yii\*'],
                ],
                //日志错误邮件发送
                /*    'from'=>[
                        'class' => 'yii\log\EmailTarget',
                        'levels' => ['error'],
                        'categories' => ['yii\*'],
                        'message' => [
                            'from' => ['service@yingxiong.com'],
                            'to' => ['503186749@qq.com'],
                            'subject' => 'cms后台错误日志',
                        ],
                    ],*/

            ],
        ],
        'errorHandler' => [
            'errorAction' => '/commonMethod/error',
        ],
        'urlManager' => [
            'class'=>'common\components\UrlManager',
            //'enableStrictParsing'=>true,
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'suffix' => '.html',
            'rules' => [
                'm/cover'=>'wap/site/cover',
                'm/index'=>'wap/site/index',
//                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',  //注释掉了 这个2.0中已经用不到了
                'index'=>'site/index',
                'cover'=>'site/cover',

                //视频
                'video/list_<id:\d+>_<page:\d+>' => 'video/index',
                'm/video/list_<id:\d+>_<page:\d+>' => 'wap/video/index',

                //新闻
                '<route1:\w+>/list_<id:\d+>_<page:\d+>' => 'article/index',//变量修改会影响其他地方，慎重修改HomeController.php 429行
                'm/<route1:\w+>/list_<id:\d+>_<page:\d+>' => 'wap/article/index',
                '\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                '\w+/\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',
                'm/\w+/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',

                //单页面
                'p/<id:\w+>' => 'page/index',
                'm/p/<id:\w+>' => 'wap/page/index',


                '<name:ywc_pc>'=>'site/index',
                '<name:ywc_wap>'=>'wap/site/index',
                '<name:cwc_pc>'=>'site/index',
                '<name:cwc_wap>'=>'wap/site/index',
                '<name:jpc_pc>'=>'site/index',
                '<name:jpc_wap>'=>'wap/site/index',
                '<name:ppc_pc>'=>'site/index',
                '<name:ppc_wap>'=>'wap/site/index',
                '<name:tyc_pc>'=>'site/index',
                '<name:tyc_wap>'=>'wap/site/index',
                '<name:sjc_pc>'=>'site/index',
                '<name:sjc_wap>'=>'wap/site/index',
                '<name:sj1_pc>'=>'site/index',
                '<name:sj1_wap>'=>'wap/site/index',
                '<name:sj2_pc>'=>'site/index',
                '<name:sj2_wap>'=>'wap/site/index',
                '<name:sj3_pc>'=>'site/index',
                '<name:sj3_wap>'=>'wap/site/index',
                '<name:sj4_pc>'=>'site/index',
                '<name:sj4_wap>'=>'wap/site/index',
                '<name:pc_pz>'=>'site/index',
                '<name:wap_pz>'=>'wap/site/index',


                '<name:tyc_pc>'=>'site/index',
                '<name:tyc_wap>'=>'wap/site/index',
                '<name:jpc_pc>'=>'site/index',
                '<name:jpc_wap>'=>'wap/site/index',
                '<name:yx_gw>'=>'site/index',
                '<name:pc_pz>'=>'site/index',
                '<name:wap_pz>'=>'wap/site/index',
                '<name:pc_test>'=>'site/index',
                '<name:wappz>'=>'wap/site/index',
                '<name:pcpz>'=>'site/index',

                '<name:gjcpc>'=>'site/index',
                '<name:gjcwap>'=>'wap/site/index',
                '<name:jpcpc>'=>'site/index',
                '<name:jpcwap>'=>'wap/site/index',
                '<name:stpc>'=>'site/index',
                '<name:stwap>'=>'wap/site/index',
                '<name:tycpc>'=>'site/index',
                '<name:tycwap>'=>'wap/site/index',

                '<name:tykp|tysqxxl|tysqbp>'=>'wap/site/index',
                '<name:kp|dtxxl|bzxxl|wbzf|appd>'=>'wap/site/index',
                '<name:nbapdtl|txwtl|tyjux|tydib|htt>'=>'site/index',
                '<name:fst1|fst2|fst3|fst4|fst5|fst6|fst7|fst8|fst9|fst10|sp1|sp2>'=>'wap/site/index',

                '<name:zbkp|zbxx>'=>'wap/site/index',
                '<name:zbpc>'=>'site/reserve',
                '<name:t>'=>'site/index',
                '<name:m\/t>'=>'wap/site/index',

                '<name:tt1|tt2|tt3|tt4|tt5|tt6|tt7|tt8|tt9|tt10|uc1|uc2|uc3|uc4|uc5|uc6|uc7|uc8|uc9|uc10>' => 'wap/site/index',
            ],
        ],
        'view' => [
            'class' => 'common\components\BaseView',
            'renderers' => [
                'html' => [
                    'class' => 'common\components\smarty\ViewRender',
                    'cachePath' => '@runtime/Smarty/cache',
                ],
            ],
        ],
    ],
    'params'=>$params
];
if (YII_DEBUG) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];
    $config['modules']['gii'] = [
        'class'=>'yii\gii\Module',
        'allowedIPs'=> ['*.*.*.*','127.0.0.1','::1']
    ];
}
return $config;