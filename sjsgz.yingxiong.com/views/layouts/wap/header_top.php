<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title><?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
        <meta name="Keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>" >
        <meta name="Description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>" >
        <?= Html::csrfMetaTags() ?>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/m/css/common.css">
        <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/m/css/index.css">
        <link rel="shortcut icon" href="/pic_01.png" />
        <script>
            (function (doc, win) {
                var docEl = doc.documentElement,
                    // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
                    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                    recalc = function () {
                        //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        docEl.style.fontSize = 16*(clientWidth / 320) + 'px';
                    };

                recalc();
                //判断是否支持监听事件 ，不支持则停止
                if (!doc.addEventListener) return;
                //注册翻转事件
                win.addEventListener(resizeEvt, recalc, false);

            })(document, window);
        </script>
        <script>
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?411b1276d7dca0165621765ea39c5cbf";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        </script>

    </head>
<body>

