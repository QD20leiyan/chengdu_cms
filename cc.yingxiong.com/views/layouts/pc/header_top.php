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
    <title>
        <?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?>
    </title>
    <meta name="Keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>" >
    <meta name="Description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>" >
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <link href="<?php echo STATIC_DOMAIN?>2.0/public/reset.css?{$smarty.const.VERSION}" rel="stylesheet">
    <link href="<?php echo STATIC_DOMAIN?>2.0/public/public.css?{$smarty.const.VERSION}" rel="stylesheet">
<!--    <script data-fixed="true">-->
<!--        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {-->
<!--            location.href = "/m"+window.location.pathname+window.location.search;-->
<!--        }-->
<!--    </script>-->
    <script src="<?php echo STATIC_DOMAIN ?>2.0/public/jquery-1.7.1.min.js?<?= VERSION?>" type="text/javascript"></script>
</head>
<body>
<div class="y_head">
    <div>
        <img src="<?php echo STATIC_DOMAIN?>2.0/images/y_logo_03.jpg?{$smarty.const.VERSION}?<?= VERSION?>" alt="" class="y_logo">
        <p>一切以玩家乐趣为依归</p>
        <div>
            <a class="y_user" href="http://i.yingxiong.com/" target="_blank">帐号中心</a>
            <a class="y_kf" href="http://kf.yingxiong.com/" target="_blank">客服中心</a>
            <label class="active">中文</label>
            <label >EN</label>
        </div>
    </div>
</div>