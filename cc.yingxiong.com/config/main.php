<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/cc/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/cc/');
    define('VERSION', time());
}else {
    define('STATIC_DOMAIN','//cdnstatic.yingxiong.com/cc/');
    define('VERSION', '1.0.30');
}
$params = require(__DIR__ . '/params.php');
$config = [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'app\controllers',
   // 'defaultRoute' => 'site/index',
    'bootstrap' => ['log'],
    'language' =>'zh_cn',
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
                //新闻/faq/战争学院  列表页
                'info/<type:\w+>/list_<page:\d+>' => 'article/index',
                'm/info/<type:\w+>/list_<page:\d+>' => 'wap/article/index',

                //视频 列表页
                'video/<type:\w+>/list_<page:\d+>' => 'video/index',
                'm/video/<type:\w+>/list_<page:\d+>' => 'wap/video/index',

                //兵种列表
                'armydetail/<type:\w+>/<id:\d+>' => 'article/army-detail',
                'm/armydetail/<type:\w+>/<id:\d+>' => 'wap/article/army-detail',
                'datum'=>'article/datum',
                'm/datum'=>'wap/article/datum',
                'army'=>'article/army',
                'm/army'=>'wap/article/army',
                'rune'=>'article/rune',
                'm/rune'=>'wap/article/rune',
                //详情页
                'info/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/info/\d+/\d+/<id:\d+>' => 'wap/article/detail',



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