<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/yqlfc/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/yqlfc/');
    define('VERSION', time());
} else {
    define('STATIC_DOMAIN','http://cdnstatic.yingxiong.com/yqlfc/');
    define('VERSION', '1.0.10');
}

$params = require(__DIR__ . '/params.php');
$config = [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'app\controllers',
   // 'defaultRoute' => 'site/index',
    'bootstrap' => ['log'],
    'language' =>'zh-CN',

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
                'game' => 'game/handle/index',

                //新闻
                'info/list_<id:\d+>_<page:\d+>' => 'article/index',
                'm/info/list_<id:\d+>_<page:\d+>' => 'wap/article/index',
                '\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',

                //视频
                'video/list_<id:\d+>_<page:\d+>' => 'video/index',
                'm/video/list_<id:\d+>_<page:\d+>' => 'wap/video/index',

                'm/cover'=>'wap/site/cover',
                'm/index'=>'wap/site/index',
                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',
                'index'=>'site/index',

                '<name:ywc_pc>'=>'site/index',
                '<name:ywc_wap>'=>'wap/site/index',
                '<name:cwc_pc>'=>'site/index',
                '<name:cwc_wap>'=>'wap/site/index',
                '<name:jpc_pc>'=>'site/index',
                '<name:jpc_wap>'=>'wap/site/index',
                '<name:ppc_pc>'=>'site/index',
               # '<name:ppc_wap>'=>'wap/yingxiao',
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
                '<name:ppc_pc|jpc_pc|tyc_pc|lxc_pc|tbpf|tbtt|tbfdpc|pc_pz>'=>'site/index',
                '<name:ppc_wap|jpc_wap|tyc_wap|lxc_wap|wap_pz|tbfdwap>'=>'wap/site/index',

                //贴吧大黄蜂
                'tt_dhf|pf_dhf|fdpc_dhf' => 'special/dhf',
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
    'modules' => [
        'gift' => [
            'class' => 'app\modules\gift\gift',
        ],
        'game' => [
            'class' => 'app\modules\game\game',
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
