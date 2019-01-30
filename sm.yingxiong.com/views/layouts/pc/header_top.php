<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title><?= $GLOBALS['seo_title']?></title>
    <meta name="keywords" content="<?= $GLOBALS['seo_key']?>">
    <meta name="description" content="<?= $GLOBALS['seo_desc']?>">
    <?= Html::csrfMetaTags() ?>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>3.0/css/common.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>3.0/css/index.css">
	<link rel="shortcut icon" href="<?= $GLOBALS['global']['icon_img']?>" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/js/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/js/jquery.SuperSlide.2.1.1.js"></script>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m"+window.location.pathname+window.location.search;
        }
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

    <meta name="baidu-site-verification" content="1KAsD7HCls" />
</head>
<body>
<script type="text/javascript" src="http://static.dev.yingxiong.com/head/js/topbar.js"></script>