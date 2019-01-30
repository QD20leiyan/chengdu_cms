<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/dfzj/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/dfzj/');
    define('VERSION', time());
} else {
    define('STATIC_DOMAIN','http://cdnstatic.yingxiong.com/dfzj/');
    define('VERSION', '1.0.2');
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

                'index'=>'site/index',
                'cover'=>'site/cover',
                'special/match_m' => 'wap/special/match',

                //视频
                'video/list_<id:\d+>_<page:\d+>' => 'video/index',
                'm/video/list_<id:\d+>_<page:\d+>' => 'wap/video/index',

                //新闻
                '<route1:\w+>/list_<id:\d+>_<page:\d+>' => 'article/index',//变量修改会影响其他地方，慎重修改HomeController.php 429行
                'm/<route1:\w+>/list_<id:\d+>_<page:\d+>' => 'wap/article/index',
                '\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',

                //单页面
                'p/<id:\w+>' => 'page/index',
                'm/p/<id:\w+>' => 'wap/page/index',

                '<name:ywc_pc|cwc_pc|jpc_pc|ppc_pc|tyc_pc|sjc_pc|sj1_pc|sj2_pc|sj3_pc|sj4_pc|pc_pz|\w+_pc|tbttpc>'=>'site/cover',
                '<name:ywc_wap|cwc_wap|jpc_wap|ppc_wap|tyc_wap|sjc_wap|sj1_wap|sj2_wap|sj3_wap|sj4_wap|wap_pz|\w+_wap|jsyh|dwhd|tbttpc>'=>'wap/site/index',
                '<name:rdtt|rdxt|xykc|wkdb|wkslt|173zt|ymzt|youj|dwlb|wywk>'=>'site/cover',
                '<name:fstdy|fsttg|fstjp|fstcs|fstzb|fstyyj>'=>'wap/site/index',

                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',  //注释掉了 这个2.0中已经用不到了
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