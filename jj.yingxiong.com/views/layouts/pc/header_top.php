<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<!doctype html>
<html>
<head>
    <title><?= $this->getSeo('title'); ?></title>
    <meta charset="utf-8" />
    <meta name="keywords" content="<?= $this->getSeo('key');?>">
    <meta name="description" content="<?= $this->getSeo('desc');?>">
    <?= Html::csrfMetaTags() ?>
<!--    --><?php //$this->head() ?>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/reset.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/swiper-3.4.0.min.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/index.css" />
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/wap/site/index.html";
        }
    </script>

    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?68ba586af42f0f3ceb0d9422e1e38255";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script src="<?php echo STATIC_DOMAIN ?>1.0/js/jquery-1.11.2.min.js"></script>
    <meta name="baidu-site-verification" content="H66qSQdMzC" />
</head>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js"></script>