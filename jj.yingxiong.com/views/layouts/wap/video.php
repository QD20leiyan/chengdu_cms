<?php

use yii\helpers\Url;

?>

<div class="main_gb1"><img class="main_gb1_img" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_10.png"></div>
<img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_06.png" class="main_play video-menu js_video_play" data-url="http://video.yingxiong.com/hd/55388ea0edfe4b23aeb1e14005d7939d.mp4">
<img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_24.png" class="main_flower">

<script>
    $(function(){
        //视频播放
//        $('.video-menu').on('click',function(e){
//            var rel = $(this).attr('data-url');
//            if(rel){
//                $("#iframe_btn").attr("src","<?php //echo Url::to(['wap/video/video-source']) ?>//?"+rel);
//            }
//            $("#video_tck").show();
//            $("#mask").show();
//        })
//        $("#close").click(function(){
//            $("#mask").hide();
//        });
    })
</script>

<!-- 弹框 -->
<div id="mask"></div>
<!--<div id="video_tck">-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <iframe border=0 marginWidth=0 frameSpacing=0 marginHeight=0 src="" frameBorder=0 noResize scrolling="no" width=100% height=100% vspale="0" id="iframe_btn"></iframe>-->
<!--    </div>-->
<!--</div>-->
<div class="top_H"></div>
<p class="home"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/home.png" ></p>

<div class="package">
    <a href="javascript:"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/close.png" class="close"></a>
    <form class="form">
        <input type="tel" name="" id="name" placeholder="输入手机号">
        <input type="tel" name="" id="verify" placeholder="验证码"><input type="button" name="" class="yzm send_verify" id="verify" value="发送">
        <button class="yuyue get_gift" type="button">立即领取</button>
    </form>
</div>
<div class="tips">
    <div class="tips-box">
        <p id="gift_msg">验证码已发送到手机请注意查收短信</p>
        <span class="ture">确&nbsp;定</span>
    </div>
</div>

<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>

<script>

    $(function(){
        $('.send_verify').click(sendVerify);
        $('.get_gift').click(getGift);
        $('.ios_gift').click(function () {
            $("#mask,.package").show();
        });

        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
//            $(".hd_loadBtn").click(function(){
//
//                $("#mask,.package").show();
//            })
        } else if (/android/.test(ua)) {
            // alert("android");
        }
    })

    function sendVerify()
    {
        var phone = $('#name').val();
        if(!phone.match(/^1[345789]\d{9}$/)){
            alert("请输入正确的手机号！");
            return false;
        }
        $.get('<?php echo Url::to(['/site/get-verify'])?>',{ "phone":phone},function(data){
            if (data.status == 0) {
                $(".tips").show();
                $('#gift_msg').text('验证码已发送到手机请注意查收短信');
                settime($('.send_verify'));
            }else if (data.status == 1) {
                $('#gift_msg').html("您已经领取礼包码：<br/><b>"+data.msg+'</b>');
                $(".tips").show();
                $("#mask,.package").hide();
            } else {
                alert(data.msg);
            }
        }, 'json')
    }

    function getGift()
    {
        var phone = $('#name').val();
        var verify = $('#verify').val();
        if(!phone.match(/^1[345789]\d{9}$/)){
            alert("请输入正确的手机号！");
            return false;
        }
        if(verify ==" " && isNaN(verify)){
            alert("请输入正确的验证码");
            return false;
        }

        $.get('<?php echo Url::to(['/site/get-gift'])?>',{ "phone":phone, verify:verify},function(data){
            if (data.status != 0) {
                alert(data.msg);
            }else{
                $(".tips").show();
                $('#gift_msg').html("您礼包码：<br/><b>"+data.msg+'</b>');
                $("#mask,.package").hide();
            }
        }, 'json')
    }
</script>