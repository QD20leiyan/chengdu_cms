<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $this->seo_title;?></title>
    <meta name="Keywords" content="<?php echo $this->seo_key;?>" >
    <meta name="Description" content="<?php echo $this->seo_des;?>" >
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/common.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/swiper-3.3.1.min.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/index.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <script>
        (function (doc, win) {
            var docEl = doc.documentElement,
                // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 16*(clientWidth / 320) + 'px';
                };

            recalc();
            //判断是否支持监听事件 ，不支持则停止
            if (!doc.addEventListener) return;
            //注册翻转事件
            win.addEventListener(resizeEvt, recalc, false);

        })(document, window);
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?bce4ef36b7d104da80d9ff2c4dfbbb52";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>
<body>
<div class="header">
    <div class="h_bg"></div>
    <div class="h_con">
        <div class="h_logo"></div>
        <div class="h_name">
            <h3>全民御史</h3>
            <p>正版授权MMO动作手游</p>
        </div>
        <button class="h_order">立即预约</button>
    </div>
</div>
<div class="wp_con">
    <img class="wp_bg" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/wap_bg.png">
    <img class="wp_mask" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/wap_mask.png">
    <?php foreach($video as $k=>$v){ ?>
        <?php if($k == 0){ ?>
            <img rel="<?php echo $v['link_url'] ?>" class="wp_play" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/play.png">
        <?php } ?>
    <?php } ?>
    <div class="swiper-container wp_swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/1.png"></div>
            <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/2.png"></div>
            <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/3.png"></div>
        </div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>

    <div class="swiper-container wp_swiper_b">
        <div class="swiper-wrapper">
            <?php foreach ($cover_banner as $k => $v) { ?>
                <div class="swiper-slide">
                    <a href="<?php echo $v['link_url'] ?>">
                        <img src="<?php echo $v['image_url'] ?>" title="" alt="" />
                    </a></div>
            <?php } ?>
        </div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev b_button_prev"></div>
        <div class="swiper-button-next b_button_next"></div>
    </div>
    <div class="b_visible_prev b_prev"></div>
    <div class="b_visible_next b_next"></div>
</div>
<div class="order_betro">

</div>
<div class="order_b_bg">
    <img class="order_b_ibg" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/5.png" alt="">
    <img class="order_b_close" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/close.png" alt="">
    <div class="order_b_form">
        <p>预约后我们会在游戏上线第一时间通知您!</p>
        <div class="order_b_f_input">
            <div><input class="order_phone" id="phone" type="text" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')"></div>
            <div><button><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/6.png" alt=""></button></div>
        </div>
    </div>
</div>
<div class="video">
    <div class="video_close"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/c.png"></div>
    <div class="video_box"></div>
</div>
<div class="mask"></div>

<div class="tck_yue">
    <a href="javascript:" class="close"></a>
    <img class="fl" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/ewm_gzh.jpg" alt="ewm">
    <div class="text fr">
        <p>恭喜预约成功！</p>
        <p>更多详情尽请关注《全民御使》手游官方微信公众号！</p>
        <p>有机会优先获得测试资格哦！</p>
    </div>
</div>
<div id="video_tck">
    <div id="player5">
        <div id="close"></div>
        <iframe border=0 marginWidth=0 frameSpacing=0 marginHeight=0 src="" frameBorder=0 noResize scrolling="no" width=100% height=100% vspale="0" id="iframe_btn"></iframe>
    </div>
</div>
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/jquery-1.11.2.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/swiper-3.3.1.jquery.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/js.js"></script>
<script>
    if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {//移动端
        //给页面下载链接赋值
        if ((/iphone|ipad/i.test(navigator.userAgent.toLowerCase()))) {
            var type = 'ios';
        }else{
            var type = 'android';
        }
    }
    $(function(){
        $(".wp_play").click(function(){
            $("#mask").show();
            $("#video_tck").show();
            var link_url = $(this).attr('rel');
            if(link_url){
                $("#iframe_btn").attr("src","/video/videosource.html?"+link_url);
            }
        })
        $(".close,#close").click(function(){
            $(".tck_yue").hide();
            $("#iframe_btn").attr("src",'');
            $("#video_tck").hide();
            $(".mask").hide();
        })
    })
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay:2700,
        speed:300,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplayDisableOnInteraction:false
    });
    function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
    function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    };
    $(".h_order").on("click",function(e){
        e.stopPropagation();
        $(".order_phone").val("")
        $(".order_betro").show();
        $(".order_b_bg").show();
        windowHidden();
    })
    $(".order_b_f_input button").on("click",function(e){
        e.stopPropagation();
        if($(".order_phone").val().length!=11){
            alert("请输入正确的电话号码");
            return false;
        }else{
            var phone = $('#phone').val();
            $.post('/site/savephone', {phone:phone, type:type}, function(data){
                    if(data.status == 1){
                        $(".mask").show();
                        $(".tck_yue").show();

                        $(".order_betro").hide();
                        $(".order_b_bg").hide();
                        $(".close").on("click",function(e){
                            e.stopPropagation();
                            $(".mask").hide();
                            $(".tck_yue").hide();
                            windowScroll();
                        })
                    }else{
                        alert(data.msg);
                        return false;
                    }
            }, 'JSON');
        }
    });
    $(".order_b_close").on("click",function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".order_b_bg").hide();
        windowScroll()
    });
//    $(".wp_play").on("click", function(e){
//        e.stopPropagation();
//        $(".order_betro").show();
//        $(".video").show();
//        windowHidden()
//    });
    $(".video_close img").on("click", function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".video").hide();
        windowScroll()
    })
    function changeBtn(str){
        $(".h_order").text(str);
    };

    changeBtn("立即预约");

</script>

</body>
</html>