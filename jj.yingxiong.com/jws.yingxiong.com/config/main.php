<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/ifsg/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/ifsg/');
    define('VERSION', time());
}else {
    define('STATIC_DOMAIN','//cdnstatic.yingxiong.com/ifsg/');
    define('VERSION', '1.0.14');
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
                //新闻列表页
                'info/<type:\w+>/list_<page:\d+>' => 'article/list',
                'm/info/<type:\w+>/list_<page:\d+>' => 'wap/article/list',
                //详情页
                '/<type:\w+>/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/<type:\w+>/\d+/\d+/<id:\d+>' => 'wap/article/detail',

                'role' => 'article/role',
                'm/role' => 'wap/article/role',

                'hero' => 'article/hero-list',
                'm/hero' => 'wap/article/hero-list',

                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',
                'index'=>'site/index',

                'm/<route1:\w+>/list_<cid:\d+>_<page:\d+>' => 'wap/site/list',
                'm/<route1:\w+>/\w+/list_<cid:\d+>_<page:\d+>' => 'wap/site/list',
                'm/\w+/\w+/\d+/\d+/<aid:\d+>' => 'wap/site/detail',
                'm/\w+/\d+/\d+/<aid:\d+>' => 'wap/site/detail',

//                '\w+/\w+/\d+/\d+/<aid:\d+>' => 'article/detail',
//                '\w+/\d+/\d+/<aid:\d+>' => 'article/detail',

//                '<route1:\w+>/list_<cid:\d+>_<page:\d+>' => 'article/list',
//                '<route1:\w+\/\w+>/list_<cid:\d+>_<page:\d+>' => 'article/list',


//                'index'=>'site/index',
//                'm/index' => 'wap/site/index',
                'm' => 'wap/site/index',
                'sem' => 'site/cover',
                'm/list' => 'wap/site/list',
                'feature' => 'special/feature',
                'm/special' => 'wap/special',
                'm/article/aid/<id:\d+>' => 'wap/detail',
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
                '<name:17173>'=>'wap/site/index',
                '<name:sina>'=>'wap/site/index',
                '<name:u9>'=>'wap/site/index',
                '<name:dwbs>'=>'wap/site/index',
                '<name:mfw>'=>'wap/site/index',
                '<name:yxd>'=>'wap/site/index',
                '<name:rwt>'=>'wap/site/index',
                '<name:duow>'=>'wap/site/index',
                '<name:18183>'=>'wap/site/index',
                '<name:chw>'=>'wap/site/index',
                '<name:kdbs>'=>'wap/site/index',
                '<name:mtty>'=>'wap/site/index',
                '<name:mtby1>'=>'wap/site/index',
                '<name:mtby2>'=>'wap/site/index',
                '<name:wspc|zsgpc>'=>'site/index',
                '<name:wswap|zsgwap>'=>'wap/site/index',
                '<name:wswap|fzad>'=>'wap/site/index',
                '<name:jwsbd>'=>'site/index',
                '<name:jwsbd3>'=>'site/index',
                '<name:jwsbd5>'=>'site/index',
                '<name:jwsbd7>'=>'site/index',
                '<name:jwsbd9>'=>'site/index',
                '<name:jwsbd11>'=>'site/index',
                '<name:jwsbd13>'=>'site/index',
                '<name:jwsbd15>'=>'site/index',
                '<name:jwsbd17>'=>'site/index',
                '<name:jwsyx|jwsyx2|jwsyx3|jwsyx4|jwsyx5|jwsyx6>'=>'wap/site/index',
                '<name:tt1|tt2|tt3|tt4|tt5|tt6|tt7|tt8|tt9|tt10>'=>'wap/site/index',

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