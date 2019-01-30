<?php

use yii\helpers\Html;
use yii\helpers\Url;

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>周年616，弹射666</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no">
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/public.css?<?= VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/index.css?<?= VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/animate.min.css?<?= VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/swiper.min.css?<?= VERSION?>" rel="stylesheet" />
    <?php echo Html::csrfMetaTags();?>
</head>
<body>
<section>
    <article class="mask">
        <form class="form">
            <select id="serverName">
                <option>请选择区服</option>
                <?php foreach($server as $v){?>
                    <option value="<?php echo $v['serverName']?>"><?php echo $v['serverName']?></option>
                <?php }?>
            </select>

            <input id="username" type="text" name="" placeholder="请输入游戏昵称" >

            <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/login.png" id="login">
            <div id="close"></div>
        </form>
    </article>
</section>
<div class="wrap">
    <section class="swiper-container">
        <section class="swiper-wrapper">
            <section class="swiper-slide page1">
                <aside class="logo ani" swiper-animate-effect="fadeInDown"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/logo.png"></aside>
                <button class="btn-01 ani" swiper-animate-effect="fadeInLeft"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/btn_01.png"></button>
            </section>
        </section>
    </section>
</div>
<div id="orientLayer" class="mod-orient-layer">
    <div class="mod-orient-layer__content"> <i class="icon mod-orient-layer__icon-orient"></i>
        <div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>
    </div>
</div>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/jquery-1.7.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/jquery+fittext+touchslider.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/swiper.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/swiper.animate.min.js?<?= VERSION?>"></script>
<script>
    var mySwiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        pagination: '.swiper-pagination',
        mousewheelControl : true,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper);
        },
        onTransitionEnd: function(swiper){
            swiperAnimate(swiper);
        }
    });
    $(".btn-01").click(function(){
        $(".mask").show();
    })
    $("#close").click(function(){
        $(".mask").hide();
    })
</script>
<script>
    $(function(){
        $('#login').click(login);
    })
    function login()
    {
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        var username = $('#username').val();
        var serverName = $('#serverName').val();
        if (!username) {
            alert('游戏名不能为空！');
            return;
        }
        if (!serverName) {
            alert('服务器名不能为空！');
            return;
        }
        $.post('<?php echo Url::to(['wap/h5/login'])?>', {username:username, serverName:serverName, cms_csrf:_csrf}, function(data){
            if (data.status != 0) {
                alert(data.msg);
            } else {
                window.location = "<?php echo Url::to(['wap/h5/main'])?>";
            }
        }, 'json');
    }
</script>
</body>
</html>
<?php echo $this->render('@app/views/wap/h5/fenxiang.php');?>
