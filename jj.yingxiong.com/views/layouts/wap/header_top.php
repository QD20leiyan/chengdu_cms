<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <title><?= $this->getSeo('title')?></title>
    <meta name="keywords" content="<?= $this->getSeo('key')?>">
    <meta name="description" content="<?= $this->getSeo('desc')?>">
    <?= Html::csrfMetaTags() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/common.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/index.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/swiper-3.3.1.min.css">
    <script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/jquery-1.11.2.min.js"></script>

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
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?68ba586af42f0f3ceb0d9422e1e38255";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        })();
    </script>
    <meta name="baidu-site-verification" content="H66qSQdMzC" />
</head>
<body>