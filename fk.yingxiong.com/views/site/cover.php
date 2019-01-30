<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>方块大冒险_官方网站_分享欢乐必备闯关手游</title>
    <meta name="keywords" content="方块大冒险官网, 方块大冒险手游, 方块大冒险官方下载, 方块大冒险礼包, 方块大冒险福利,方块大冒险安装包, 手游，动作，预约，闯关，休闲手游，横版过关，最萌的游戏，Ｑ版手游,最适合女生玩的手游,魔性,可爱,搞笑游戏,多人合作,多人竞速，竞速闯关，闯关战斗,闯关冒险，英雄互娱" />
    <meta name="description" content="《方块大冒险》官网，提供方块大冒险官方下载、礼包、新闻、攻略、视频。
方块大冒险以“跳跃”为核心玩法，萌趣的方块场景，搭配各种脑洞大开的道具机关，可多人合作竞速，亦可离线畅玩数百关，有关卡秒变H 5黑科技和DIY关卡功能，亦有实时语音，外观收集及成就达成，海量玩法任意搭配，好玩到根本停不下来！
2017年最适合与小伙伴分享的冒险闯关手游，想要领取游戏福利的小伙伴，快上方块大冒险官网下载开启你的疯狂蹦蹦蹦之旅！"/>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/public/pcReset.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/pc/css/index.css">
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/";
        }
    </script>
</head>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js"></script>
<div class="i_box">
    <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_bimg1.jpg">
    <div class="i_logo">
        <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_logo.png">
    </div>
    <div class="i_p">
        <img class="i_p_img1" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_img1.png">
        <img class="i_p_img2" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_img2.png">
    </div>
    <div class="i_play js_video_play" data-url="uu=58546ec681&vu=5098929ca5">
        <img class="i_y_img1" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_p1.png">
        <img class="i_y_img2" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_p2.png">
        <img class="i_y_img3" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_p3.png">
    </div>
    <div class="i_down">
        <a class="i_d_a1 js_down_ios" target="_blank" href="javascript:alert('敬请期待！')"></a>
        <a class="i_d_a2 js_down_andriod" target="_blank" href="javascript:alert('敬请期待！')"></a>
        <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_img3.png">
    </div>
    <div class="i_wx">
        <img class="i_w_bimg" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_wx.png">
        <img class="i_w_ewm" src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_ewm.jpg">
    </div>
    <div class="i_wb">
        <a target="_blank" href="http://weibo.com/u/6126895954"></a>
        <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_wb.png">
    </div>
    <div class="i_tb">
        <img src="<?php echo STATIC_DOMAIN ?>2.0/pc/images/i_tb.png">
        <a target="_blank" href="http://tieba.baidu.com/f?ie=utf-8&kw=%E6%96%B9%E5%9D%97%E5%A4%A7%E5%86%92%E9%99%A9&fr=search&red_tag=r1196398468"></a>
    </div>
</div>
<!--这是视频播放弹窗-->
<!--<div class="v_play">-->
<!--    <div id="my_video" class="my_video">-->
<!--        <embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="640" height="358" align="middle" allowscriptaccess="always" flashvars="" type="application/x-shockwave-flash">-->
<!--        <label class="v_close"></label>-->
<!--    </div>-->
<!--</div>-->

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js"></script>
</body>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/public/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
    $(".i_play").click(function () {
//        var rel = 'uu=58546ec681&vu=5098929ca5&amp;auto_play=1&amp;gpcflag=1&amp;width=570&amp;height=300';
//        $('#my_video embed').attr('flashvars', rel);
//        $(".v_play").css({
//            display: "block"
//        });
    });
    $(".v_close").click(function () {
        $('#my_video embed').attr('flashvars', '');
        $(".v_play").css({
            display: "none"
        });
    });
</script>
</html>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
