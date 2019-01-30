<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/qmqz/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/qmqz/');
    define('VERSION', time());
}else {
    define('STATIC_DOMAIN','//cdnstatic.yingxiong.com/qmqz/');
    define('VERSION', '1.0.8');
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

                //新闻
                'info/list_<id:\d+>_<page:\d+>' => 'article/index',
                'm/info/list_<id:\d+>_<page:\d+>' => 'wap/article/index',

                //版本纪念馆
                'image/list_<id:\d+>_<page:\d+>' => 'image/index',
                'm/image/list_<id:\d+>_<page:\d+>' => 'wap/image/index',

                //详情
                'info/\w+/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/info/\w+/\d+/\d+/<id:\d+>' => 'wap/article/detail',
                'info/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/info/\d+/\d+/<id:\d+>' => 'wap/article/detail',

                //视频
                'video/list_<id:\d+>_<page:\d+>' => 'video/index',
                'm/video/list_<id:\d+>_<page:\d+>' => 'wap/video/index',

                //视频详情
                'video/\d+/\d+/<id:\d+>' => 'article/detail',
                'm/video/\d+/\d+/<id:\d+>' => 'wap/video/detail',

                'm/cover'=>'wap/site/cover',
                'm/index'=>'wap/site/index',
                'activity'=>'/site/activity',
                'm/activity'=>'wap/site/activity',
                'm/anniversary' => 'wap/site/anniversary',
                'index'=>'site/index',
                'cover'=>'site/cover',

                '/contest'=>'article/contest',
                'm/contest'=>'wap/article/contest',

                '/lottery'=>'site/lottery',
                'm/lottery'=>'wap/site/lottery',


                '<name:ywc_pc|cwc_pc|jpc_pc|ppc_pc|tyc_pc|sj1_pc|sj2_pc|sj3_pc|sj4_pc|pz_pc>'=>'site/index',
                '<name:ywc_wap|cwc_wap|jpc_wap|ppc_wap|tyc_wap|sj1_wap|sj2_wap|sj3_wap|sj4_wap|pz_wap>'=>'wap/site/index',
                '<name:cjkb_wap|bdtbzb_wap|bdtbkp_wap|jrttkp_wap|kgkp_wap|shht_wap|sm_wap|smywc_wap|smcwc_wap|smjpc_wap|smppc_wap|smtyc_wap|smsjc_wap|smpz_wap>'=>'wap/site/index',
                '<name:wywk_pc|qmqz_cjpc|qmqz_cjpc1|qmqz_cjpc2|qmqz_cjpc3|qmqz_cjpc4|qmqz_cjpc5|qmqz_cjpc6|qmqz_cjpc7|qmqz_cjpc8|qmqz_cjpc9|qmqz_cjpc10>' => 'site/index',
                '<name:qmqz_cjwap|qmqz_fstcs1|qmqz_fstcs2|qmqz_fstcs3|qmqz_fstcs4|qmqz_fstcs5|qmqz_fstcs6|qmqz_fstcs7|qmqz_fstcs8|qmqz_fstcs9|qmqz_fstcs10|qmqz_cjwap1|qmqz_cjwap2|qmqz_cjwap3|qmqz_cjwap4|qmqz_cjwap5|qmqz_cjwap6|qmqz_cjwap7|qmqz_cjwap8|qmqz_cjwap9|qmqz_cjwap10>' => 'wap/site/index',
                //'<name:fstyl_pc|fstyl_wap|fstjp_pc|fstjp_wap|fstzb_pc|fstzb_wap>'=>'special/sinaCover',
                '<name:fstyl_pc|fstjp_pc|fstzb_pc>'=>'site/cover20160711',
                '<name:fstyl_wap|fstjp_wap|fstzb_wap|qmqz_fstcs1|qmqz_fstcs2|qmqz_fstcs3|qmqz_fstcs4|qmqz_fstcs5|qmqz_fstcs6|qmqz_fstcs7|qmqz_fstcs8|qmqz_fstcs9|qmqz_fstcs10>'=>'wap/cover20160711',
                '<name:fztg_wap>'=>'wap/coverfz',
                '<name:qmcz_ppcpc>'=>'site/index',
                '<name:qmcz_ppcwap>'=>'wap/site/index',
                '<name:yshen1|yshen2|yshen3|yshen4|yshen5>'=>'site/index',
                '<name:hldx>'=>'wap/site/index',
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