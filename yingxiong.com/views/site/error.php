<?php
//
///* @var $this yii\web\View */
///* @var $name string */
///* @var $message string */
///* @var $exception Exception */
//
//use yii\helpers\Html;
//
//$this->title = $name;
//?>
<html>
<head>
    <meta charset="UTF-8">
    <title>404</title>
    <meta name="author" content="">
    <meta name="copyright" content="">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <link type="text/css" rel="stylesheet" href="http://cdnstatic.yingxiong.com/common/404/css/style.css">
    <link type="text/css" rel="stylesheet" href="http://cdnstatic.yingxiong.com/yingxiong/2.0/css/style.css">
    <script src="http://cdnstatic.yingxiong.com/common/404/js/jquery-1.11.2.min.js"></script>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/site/errorWap";
        }
    </script>
</head>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js"></script>
<div class="main">
    <div class="main_content">
        <i></i>
        <img class="wrong" src="http://cdnstatic.yingxiong.com/common/404/images/404.png" title="" alt="" />
        <p>啊哦！您要找的页面躲起来了......</p>
        <a href="/">返回首页</a>
    </div>
</div>
<div class="HERO-copyRight">
    <div class="HERO-copyRight-wrap h-cb">
        <a class="hero-logo" href="http://www.yingxiong.com"></a>
        <div class="HERO-copyRight-footer">
            <p>
                <a href="<?= \yii\helpers\Url::to(['site/about']);?>">公司简介</a>-<a target="_blank" href="http://kf.yingxiong.com/">客户服务</a>-
                <a href="<?= \yii\helpers\Url::to(['site/about']);?>">联系我们</a>-
                <a href="<?= \yii\helpers\Url::to(['site/join']);?>">加入我们</a>
                <!--                -<a href="javascript:void(0)">家长监护</a>-->
            </p>
            <p>英雄互娱版权所有 &copy;2015-2018中国网络游戏版权保护联盟举报中心</p>
            <p>COPYRIGHT&copy;2015 &ndash; 2018 . ALL RIGHTS RESERVED.&nbsp;京ICP备15026730号-2</p>
            <p><i style="width:19px;height:19px;top: 5px;position: relative;background:url('http://cdnstatic.yingxiong.com/common/images/wwwdzbq.png') no-repeat;background-size:100% 100%;display: block;float: left;"></i>《网络文化经营许可证》<a href="http://img02.yingxiong.com/M00/00/1D/CsggAlYqD3GEGHRYAAAAAF5auqs487.jpg" target="_blank">京网文[2015]0629-259号</a></p>
            <p>北京卓越晨星科技有限公司</p>
        </div>
    </div>
</div>

</body>
</html>
