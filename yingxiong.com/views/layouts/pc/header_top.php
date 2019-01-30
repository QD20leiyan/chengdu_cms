<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;
AppAsset::register($this);
?>
<!doctype html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="UTF-8">
    <title><?= $GLOBALS['seo_title']?></title>
    <meta content="<?= $GLOBALS['seo_key']?>" name="Keywords">
    <meta content="<?= $GLOBALS['seo_desc']?>" name="Description">
    <meta name="baidu-site-verification" content="0DmfEocN4Z" />
    <link rel="SHORTCUT ICON" href="<?= STATIC_DOMAIN ?>2.0/favico.ico">
    <meta name="author" content="">
    <meta name="copyright" content="">
    <meta name="designer" content="miss wangling">
    <meta name="front-end technicist" content="caojing zhoulin liuhui">

    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/";
        }
    </script>
    <link type="text/css" rel="stylesheet" href="<?= STATIC_DOMAIN; ?>2.0/css/style.css?<?=VERSION?>">
    <script src="<?= STATIC_DOMAIN; ?>2.0/common/js/jquery-1.11.2.min.js?<?=VERSION?>"></script>
    <meta name="baidu-site-verification" content="LyzlP8o3w7" />
    <link rel="stylesheet" href="<?= STATIC_DOMAIN; ?>2.0/font/css/css.css?<?=VERSION?>" />
    <script type='text/javascript' src='<?= STATIC_DOMAIN; ?>2.0/font/js/modernizr.min.js?<?=VERSION?>'></script>
    <script type='text/javascript'>
        /* <![CDATA[ */
        var CSSettings = {"pluginPath": "http://cdnstatic.yingxiong.com/yingxiong/2.0/font"};
        /* ]]> */
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?744fc26928ce00373c1f19768d018dce";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

    <script type='text/javascript' src='<?php echo STATIC_DOMAIN; ?>2.0/font/js/cute.slider.js?<?=VERSION?>'></script>
    <script type='text/javascript' src='<?php echo STATIC_DOMAIN; ?>2.0/font/js/cute.transitions.all.js?<?=VERSION?>'></script>
</head>
