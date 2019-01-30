<?php
if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/sjsgz/');
} else if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/sjsgz/');
} else {
    define('STATIC_DOMAIN','http://cdnstatic.yingxiong.com/sjsgz/');
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
                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',
                'index'=>'site/index',
                'wap/index' => 'wap/site/index',
                'ppcpc|stpc|tbttpc' => 'site/index',
                'ppcwap|stwap|tbttwap' => 'wap/site/index',
                'uc1|uc2|uc3|uc4|uc5|uc6|uc7|uc8|uc9|uc10' => 'wap/site/yingxiao',

                //新闻
                '<route1:\w+>/list_<id:\d+>_<page:\d+>' => 'article/index',
                'm/<route1:\w+>/list_<id:\d+>_<page:\d+' => 'wap/article/index',
                '\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',

                //视频
                'v/\w+/list_<id:\d+>_<page:\d+>' => 'video/index',
                'v/\w+/list_<id:\d+>_<page:\d+>' => 'wap/video/index',

                //单页面
                'p/<id:\w+>' => 'page/index',
                'm/p/<id:\w+>' => 'page/index',
            ],
        ],
        'view' => [
            'class' => 'common\components\BaseView',
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