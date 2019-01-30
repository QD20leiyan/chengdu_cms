<?php

use common\Cms;
use common\widgets\videoPlay\VideoPlayWidget;
use yii\helpers\Url;

?>

<!doctype html>
<html>
<head>
    <title><?php  echo $this->getSeo('title'); ?></title>
    <meta name="keywords" content="<?php  echo $this->getSeo('key'); ?>">
    <meta name="description" content="<?php  echo $this->getSeo('desc'); ?>">
    <meta charset="utf-8" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/reset.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/index.css" />
    <style>
        .erweima{
            left: 73%;
        }
    </style>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/site/index.html";
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
<div class="bg b">
    <div class="b1">
        <span class="b2"></span>
    </div>
    <video src="<?php echo STATIC_DOMAIN ?>1.0/mp3/maintheme1.mp3?11" controls="controls" autoplay loop class="video_v">
        您的浏览器不支持 video 标签。
    </video>
    <img src="<?php echo STATIC_DOMAIN ?>1.0/images/logo.png" class="logo"/>
    <div class="i-video js_video_play" data-url="http://video.yingxiong.com/hd/55388ea0edfe4b23aeb1e14005d7939d.mp4">
        <i class="i-video-icon1"></i>
    </div>
    <div class="btn">
        <i><b></b><img class="js_jump_img" src="<?php echo STATIC_DOMAIN ?>1.0/images/jump_mlz_pcgw.png" /></i>
        <i>
            <a target="_blank" class="js_down_ios" href="javascript:alert('敬请期待！');"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/iphone.png" /></a>
            <a target="_blank" class="js_down_andriod" ><img src="<?php echo STATIC_DOMAIN ?>1.0/images/android.png" /></a>
            <a target="_blank" class="js_tap" href="http://l.taptap.com/8v5o3IDV"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/j_tap.png" /></a>
        </i>
        <i><a href="<?php echo Url::to(['site/index']); ?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/get.png" /></a></i>
        <i><a target="_blank" href="http://weibo.com/6261950549"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/img11.png" /></a></i>
        <i><a href="#"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/img22.png" />
                <span class="erweima"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/erweima1.png" /></span>
            </a>
        </i>
        <i><a target="_blank" href="https://tieba.baidu.com/f?kw=%E4%B9%9D%E5%89%91%E9%AD%94%E9%BE%99%E4%BC%A0&fr=wwwt"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/img33.png" /></a></i>
    </div>

    <?php echo $this->render('@app/views/layouts/pc/float.php') ?>
    <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php') ?>
</div>

<script src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>
</body>
</html>