<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/czymf/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/czymf/');
    define('VERSION', time());
} else {
    define('STATIC_DOMAIN','http://cdnstatic.yingxiong.com/czymf/');
    define('VERSION', '1.0.4');
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
                // 油菜花
                'ych/list_<id:\d+>_<page:\d+>' => 'ych/index',
                'm/ych/list_<id:\d+>_<page:\d+>' => 'wap/ych/index',
                'ych/activity/<id:\d+>' => 'ych/activity-detail',
                'm/ych/activity/<id:\d+>' => 'wap/ych/activity-detail',
                'm/ych/activity/<id:\d+>' => 'wap/ych/activity-detail',

                //游戏资料
                'article/data/<id:\d+>' => 'article/data',
                'wap/article/data/<id:\d+>' => 'wap/article/data',
                'info/data/\d+/\d+/<id:\d+>' => 'article/data-detail',
                'info/raiders/\d+/\d+/<id:\d+>' => 'article/raiders-detail',

                //游戏攻略
                'info/raiders/list_<id:\d+>_<page:\d>' => 'article/raiders',
                'm/info/raiders/list_<id:\d+>_<page:\d>' => 'wap/article/raiders',
                'm/info/data/\d+/\d+/<id:\d+>' => 'wap/article/data-detail',
                'm/info/raiders/\d+/\d+/<id:\d+>' => 'wap/article/raiders-detail',
                'm/gl_wiki' => 'wap/site/gl_wiki',
                'gl_wiki' => 'site/gl_wiki',

                'cover'=>'site/cover',
                'm/cover'=>'wap/site/cover',
                'm/index'=>'wap/site/index',
                'm/vote'=>'wap/article/vote',
                'order'=>'article/order',
                'm/order'=>'wap/article/order',

                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',
                'index'=>'site/index',

                '\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                //新闻
                '<route1:\w+>/list_<cid:\d+>_<page:\d+>' => 'article/index',
                '<route1:\w+>/\w+/list_<cid:\d+>_<page:\d+>' => 'article/index',

                'm/<route1:\w+\/\w+>/list_<cid:\d+>_<page:\d+>' => 'wap/article/index',

                //以上规则都没有匹配到，默认到新闻详情
                'm/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',
                '<name:pppc|stpc|jpcpc|tycpc|pzpc>'=>'site/index',
                '<name:ppwap|stwap|jpcwap|tycwap|pzwap>'=>'wap/site/index',
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