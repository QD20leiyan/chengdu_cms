<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><?= $this->getSeo('title');?></title>
    <meta  name="Keywords" content="<?= $this->getSeo('key');?>">
    <meta  name="Description" content="<?= $this->getSeo('desc');?>">
    <link rel="shortcut icon" href="<?php echo STATIC_DOM;?>2.0/images/favicon.ico?<?=VERSION?>" />
    <script src="<?php echo STATIC_DOM;?>3.0/common/js/jquery-1.11.2.min.js?<?=VERSION?>"></script>
    <link rel="stylesheet" href="<?php echo STATIC_DOM;?>4.0/common/css/common.css?<?=VERSION?>">

    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/";
        }
    </script>
    <meta name="baidu-site-verification" content="HeETSFqgwl" />
</head>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js?<?= VERSION?>"></script>