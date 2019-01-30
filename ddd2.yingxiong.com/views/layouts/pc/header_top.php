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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= $GLOBALS['seo_title']?></title>
    <meta name="Keywords" content="<?= $GLOBALS['seo_key']?>" >
    <meta name="Description" content="<?= $GLOBALS['seo_desc']?>" >
    <link rel="shortcut icon" href="<?= isset($GLOBALS)?$GLOBALS['global']['icon_img']:'';?>" rel="stylesheet">
    <link href="<?php echo STATIC_DOMAIN ?>3.0/common/css/common.css?<?= VERSION?>" rel="stylesheet">
    <link href="<?php echo STATIC_DOMAIN ?>3.0/common/css/yx.css?<?= VERSION?>" rel="stylesheet">
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m";
        }
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?e896a013f613cc56bef66f4d4f67c5ff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js?<?= VERSION?>"></script>