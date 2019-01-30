<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
    <title><?= $GLOBALS['seo_title']?></title>
    <meta name="keywords" content="<?= $GLOBALS['seo_key']?>">
    <meta name="description" content="<?= $GLOBALS['seo_desc']?>">
    <?= Html::csrfMetaTags() ?>
    <meta name="baidu-site-verification" content="1KAsD7HCls" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/m/common/css/common.min.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/m/common/css/swiper.3.1.7.min.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>3.0/m/css/index.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>3.0/m/css/news_data.css?<?php echo time();?>" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/m/common/js/jquery-1.11.2.min.js"></script>
    <script type="text/javascript">
        document.addEventListener('plusready', function() {
            //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"

        });
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cd3c5f317e3f5ced9e323d594c3eb7b3";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script>
        (function(doc, win) {
            var docEl = doc.documentElement,
                // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function() {
                    //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
                    var clientWidth = docEl.clientWidth;
                    if(!clientWidth) return;
                    docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
                };

            recalc();
            //判断是否支持监听事件 ，不支持则停止
            if(!doc.addEventListener) return;
            //注册翻转事件
            win.addEventListener(resizeEvt, recalc, false);

        })(document, window);
    </script>
</head>