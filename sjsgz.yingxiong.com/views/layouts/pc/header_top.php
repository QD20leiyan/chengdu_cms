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
    <meta charset="UTF-8">
    <title><?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>" >
    <meta name="Description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>" >
    <?= Html::csrfMetaTags() ?>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/css/style.css">
    <link rel="shortcut icon" href="/pic_01.png" />
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m";
        }
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

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js"></script>