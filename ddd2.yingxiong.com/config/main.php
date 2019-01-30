<?php
if (YII_DEV) {
    define('STATIC_DOMAIN','http://static.dev.yingxiong.com/ddd/');
    define('VERSION', time());
} else if (YII_DEMO) {
    define('STATIC_DOMAIN','http://dev.static.yingxiong.com/dev/ddd/');
    define('VERSION', time());
}else {
    define('STATIC_DOMAIN', '//cdnstatic.yingxiong.com/ddd/');
    define('VERSION', '1.0.1');
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
//                'm/<controller:\w+>/<action:\w+>'=>'wap/<controller>/<action>',
//                'index'=>'site/index',


                'm/<route1:\w+>/list_<cid:\d+>_<page:\d+>' => 'wap/site/news',
                'm/\w+/\w+/\d+/\d+/<aid:\d+>' => 'wap/site/detail',
                'm/\w+/\d+/\d+/<aid:\d+>' => 'wap/site/detail',

                //视频
                'video/list_<cid:\d+>_<page:\d+>' => 'video/list',

                //新闻
                '<route1:\w+>/<rout2:\w+>/list_<cid:\d+>_<page:\d+>' => 'site/news',
                '<route1:\w+>/list_<cid:\d+>_<page:\d+>' => 'site/news',


                //落地页
                'reveal'=>'site/reveal',
                'm/reveal'=>'wap/site/reveal',

                '\w+/\w+/\d+/\d+/<aid:\d+>' => 'site/detail',
                '\w+/\d+/\d+/<aid:\d+>' => 'site/detail',



                //专题
                'special/loveBH' => 'special/love-b-h',
                'special/loveBH_m' => 'special/love-b-h_m',

                'wap/ggtg' => 'wap/special/ggtg',
                'wap/ggtg2' => 'wap/special/ggtg2',
                'wap/ggtg3' => 'wap/special/ggtg3',
                'wap/ggtg4' => 'wap/special/ggtg4',

                //联赛
                'wap/liansai' => 'wap/special/liansai',


                'index'=>'site/index',
                'm/index' => 'wap/index',
                'm' => 'wap/cover',
                'sem' => 'site/index',
                'm/list' => 'wap/list',
                'm/article/aid/<id:\d+>' => 'wap/detail',

//                '<name:lxc_pc>'=>'site/index',
//                '<name:lxc_wap>'=>'wap/site/index',
//                '<name:cwc_pc>'=>'site/index',
//                '<name:cwc_wap>'=>'wap/site/index',
//                '<name:jpc_pc>'=>'site/index',
//                '<name:jpc_wap>'=>'wap/site/index',
//                '<name:ppc_pc>'=>'site/index',
//                '<name:ppc_wap>'=>'wap/site/index',
//                '<name:tyc_pc>'=>'site/index',
//                '<name:tyc_wap>'=>'wap/site/index',
//                '<name:sjc1_pc>'=>'site/index',
//                '<name:sjc1_wap>'=>'wap/site/index',
//                '<name:sjc2_pc>'=>'site/index',
//                '<name:sjc2_wap>'=>'wap/site/index',
//                '<name:sjc3_pc>'=>'site/index',
//                '<name:sjc3_wap>'=>'wap/site/index',
//                '<name:sjc4_pc>'=>'site/index',
//                '<name:sjc4_wap>'=>'wap/site/index',
//                '<name:pz_pc>'=>'site/index',
//                '<name:pz_wap>'=>'wap/site/index',
//                '<name:rqc_pc|lxc_pc|mxc_pc|jdc_pc>'=>'site/index',
//                '<name:rqc_wap|lxc_wap|mxc_wap|jdc_wap>'=>'wap/site/index',
//                '<controller:yshen16|yshen17|yshen18|yshen19|yshen20|yshen21|yshen22|yshen23|yshen24|yshen25|ysjm12|ysjm13|ysjm14|ysjm25|yshen1|yshen2|yshen3|yshen4|yshen5|yshen6|yshen7|yshen8|yshen9|yshen10|yshen11|yshen12|yshen13|yshen14|yshen15|ysjm1|ysjm2|ysjm3|ysjm4|ysjm5|ysjm6|ysjm7|ysjm8|ysjm9|ysjm10|ysjm11|ysjm15|ysjm16|ysjm17|ysjm18|ysjm19|ysjm20|ysjm21|ysjm22|ysjm23|ysjm24>.html'=>'wap/site/index',

                '<controller:(ysjm1|ysjm2|ysjm3|ysjm4|ysjm5|ysjm6|ysjm7|ysjm8|ysjm9|ysjm10|ysjm11|ysjm12|ysjm13|ysjm14|ysjm15|ysjm16|ysjm17|ysjm18|ysjm19|ysjm20)>' => 'wap/site/index',
		
                  '<controller:(pz_pc|dddbd|dddbd3|dddbd5|dddbd8|dddbd10|dddbd12|dddbd14|bdtb|feed)>' => 'site/index',
//                '<controller:(ysjm1)>.html' => 'wap/site/index',

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