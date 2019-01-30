<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?= $this->getSeo('title');?></title>
    <meta name="Keywords" content="<?=$this->getSeo('key');?>">
    <meta  name="Description" content="<?=$this->getSeo('desc');?>">
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
<!--[if lt IE 7]>
<div style="position:absolute;left:0;top:0;width:100%;height:50px;background:rgb(255,255,233);color:rgb(30,84,148);border-bottom:1px solid rgb(230,230,198);text-align:center;line-height:50px;font-size:12px;">您使用的浏览器版本过低，可能会影响到您浏览本网页，建议您升级您的浏览器。</div>
<![endif]-->


