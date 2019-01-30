<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><?= $this->getSeo('title');?></title>
    <meta  name="Keywords" content="<?= $this->getSeo('key');?>">
    <meta  name="Description" content="<?= $this->getSeo('desc');?>">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="stylesheet" href="<?php echo STATIC_DOM;?>2.0/common/css/common.css?<?=VERSION?>">
    <link href="<?php echo STATIC_DOM;?>2.0/css/css.css" rel="stylesheet"/>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/";
        }
    </script>

    <link rel="shortcut icon" href="<?php echo STATIC_DOM;?>4.0/common/images/favicon.ico?<?=VERSION?>" />

    <script src="<?php echo STATIC_DOM;?>2.0/common/js/jquery-1.11.2.min.js?<?=VERSION?>"></script>
    <meta name="baidu-site-verification" content="HeETSFqgwl" />
</head>




