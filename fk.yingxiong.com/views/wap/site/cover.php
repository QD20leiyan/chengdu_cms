<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>方块大冒险_官方网站_分享欢乐必备闯关手游</title>
    <meta name="keywords" content="方块大冒险官网, 方块大冒险手游, 方块大冒险官方下载, 方块大冒险礼包, 方块大冒险福利,方块大冒险安装包, 手游，动作，预约，闯关，休闲手游，横版过关，最萌的游戏，Ｑ版手游,最适合女生玩的手游,魔性,可爱,搞笑游戏,多人合作,多人竞速，竞速闯关，闯关战斗,闯关冒险，英雄互娱">
    <meta name="description" content="《方块大冒险》官网，提供方块大冒险官方下载、礼包、新闻、攻略、视频。方块大冒险以“跳跃”为核心玩法，萌趣的方块场景，搭配各种脑洞大开的道具机关，可多人合作竞速，亦可离线畅玩数百关，有关卡秒变H 5黑科技和DIY关卡功能，亦有实时语音，外观收集及成就达成，海量玩法任意搭配，好玩到根本停不下来！2017年最适合与小伙伴分享的冒险闯关手游，想要领取游戏福利的小伙伴，快上方块大冒险官网下载开启你的疯狂蹦蹦蹦之旅！">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">

    <script type="text/javascript">
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
    </script>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/public/wapReset.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/wap/css/index.css">
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/public/jquery-1.11.2.min.js"></script>
</head>
<body>
<header class="f_down">
    <img src="<?php echo STATIC_DOMAIN ?>2.0/wap/images/w_person.png" alt="">
    <section>
        <h1>方块大冒险</h1>
        <p>充满惊喜的欢乐制造机</p>
    </section>
    <a class="js_wap_down" href="javascript:alert('敬请期待！')">下载游戏</a>
</header>
<section class="f_content">
    <a href="javascript:" class="f_gzh"></a>
    <a href="http://weibo.com/u/6126895954" class="f_wb"></a>
    <section class="f_play js_video_play" data-url="uu=58546ec681&vu=5098929ca5">
        <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_p2.png" alt="">
        <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_p3.png" alt="">
    </section>
</section>
<!--这是微信二维码-->
<section id="f_wx_cover" class="f_wx_cover cover_hide">
    <img src="http://cdnstatic.yingxiong.com/fkdmx/2.0/wap/images/i_ewm.jpg" alt="微信公众号">
</section>
<!--这是视频播放弹窗-->
<!--<section id="page_cover" class="page_cover cover_hide">-->
<!--    <section class="v_play">-->
<!--        <iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src="http://ca.yingxiong.com/video/videosource.html?uu=58546ec681&vu=ad109c0986" frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn"></iframe>-->
<!--        <label id="v_close"></label>-->
<!--    </section>-->
<!--</section>-->

<!--<div id="video_tck" style="display: none">-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src="http://ca.yingxiong.com/video/videosource.html?uu=58546ec681&vu=ad109c0986" frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn"></iframe>-->
<!--    </div>-->
<!--</div>-->
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>
</body>

<script type="text/javascript">
    $(document).ready(function () {
        $(".f_play").on("touchend",function () {
            var vedio_url = "http://ca.yingxiong.com/video/videosource.html";
            var uuid = $(this).attr("data-uid");
            var url = vedio_url + '?' + uuid;
//            $("#page_cover").find("iframe").attr({src:url});
            $("#page_cover").attr("class","page_cover");
        });
        $("#v_close").on("touchend",function () {
            $("#page_cover").find("iframe").attr({src:''});
            $("#page_cover").attr("class","page_cover cover_hide");
        });
        $(".f_gzh").on("touchend",function () {
            $("#f_wx_cover").attr("class","f_wx_cover");
        });
        $("#f_wx_cover").on("touchend",function () {
            $(this).attr("class","f_wx_cover cover_hide");
        });
    })


//    var vedio_url = "http://ca.yingxiong.com/video/videosource.html";
//    $(".video_box").click(function(){
//        var uuid = $(this).attr("data-uid");
//        var url = vedio_url + '?' + uuid;
//        $("#video_tck").find('#player5').find("iframe").attr({src:url});
//        $("#video_tck").show();
//        $(".mask4").show();
//    });
//
//    $("#video_tck #close").click(function(){
//        $("#video_tck").hide();
//        $(".mask4").hide();
//    })
</script>
</html>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>