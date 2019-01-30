<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/jjmlz/');
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/jjmlz/');
} else {
    define('STATIC_DOMAIN','http://cdnstatic.yingxiong.com/jjmlz/');
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
                '/\w+/\d+/\d+/<id:\d+>' => 'site/details',
                'm/\w+/\d+/\d+/<id:\d+>' => 'wap/site/details',

                //精彩画面
                'image/list_<id:\d+>_<page:\d+>' => 'image/list',
                'image/list_<id:\d+>_<page:\d+>' => 'image/list',
                'm/image/list_<id:\d+>_<page:\d+>' => 'wap/image/list',

                //新闻
                'm/<route1:\w+>/list_<id:\d+>_<page:\d+>' => 'wap/site/news',
                '<route1:\w+>/<route2:\w+>/list_<cid:\d+>_<page:\d+>' => 'site/news',
                '<route1:\w+>/list_<cid:\d+>_<page:\d+>' => 'site/news',

                'm/cover'=>'wap/site/cover',
                'm/index'=>'wap/site/index',
                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',
                'wap/index' => 'wap/site/index',
                'index'=>'site/index',
                'lwj0705' => 'site/index',



            ],
        ],
        'view' => [
            'class' => 'common\components\BaseView',
            'renderers' => [
                'html' => [
                    'class' => 'yii\smarty\ViewRenderer',
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