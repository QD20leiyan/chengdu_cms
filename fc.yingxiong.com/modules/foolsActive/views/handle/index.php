<?php
/**
 * Created by PhpStorm.
 * User: thinkpad
 * Date: 2017/3/31
 * Time: 11:05
 */
?>
<!DOCTYPE html>
<html style="font-size:18.75px">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <meta name="format-detection" content="telephone=no,email=no,adress=no">
    <script src="<?php echo STATIC_DOMAIN ?>yurenjie/js/jquery.fittext.js"></script>
    <script src="<?php echo STATIC_DOMAIN ?>yurenjie/js/echarts.js"></script>
    <script src="<?php echo STATIC_DOMAIN ?>yurenjie/js/jquery-1.11.2.min.js"></script>
    <link href="<?php echo STATIC_DOMAIN ?>yurenjie/css/style.css" rel="stylesheet" />
    <!-- 引入 ECharts 文件 -->
</head>

<body>
<div class="start-bg">
    <div class="public">
        <div class="title"><img src="<?php echo STATIC_DOMAIN ?>yurenjie/images/title-bg.png" /></div>
        <form method="post">
        <div class="title-bg">
            <div class="inp"><input type="text" name='username' placeholder="请输入你的姓名"></div>
            <button type="submit" class="start"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN ?>yurenjie/images/start-btn.png" /></a>                   </button>
        </div>
        </form>
    </div>
</div>
<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->

</body>
</html>
<script>
    $().ready(function(){
        $('html').fitText(2);
        $('#submit').click(function(){
            var name=$('input[name="username"]').val();
            if(name){return true}else{
                alert('请输入名字哦');
                return false;
            };

        })

    })
    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
</script>

<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '<?php echo $appid?>', // 必填，公众号的唯一标识
        timestamp: <?php echo $time?>, // 必填，生成签名的时间戳
        nonceStr: '<?php echo $notice?>', // 必填，生成签名的随机串
        signature: '<?php echo $signature?>',// 必填，签名，见附录1
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });
    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

        wx.onMenuShareTimeline({
            title: '<?php echo $shareTitle?>', // 分享标题
            link: '<?php echo $url?>', // 分享链接，该链接域名需在JS安全域名中进行登记
            imgUrl: '<?php echo STATIC_DOMAIN ?>yurenjie/images/share_icon.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: ' <?php echo $shareTitle?>', // 分享标题
            desc: '<?php echo $shareDesc?>', // 分享描述
            link: '<?php echo $url?>', // 分享链接，该链接域名需在JS安全域名中进行登记
            imgUrl: '<?php echo STATIC_DOMAIN ?>yurenjie/images/share_icon.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: '<?php echo $shareTitle?>', // 分享标题
            desc: '<?php echo $shareDesc?>', // 分享描述
            link: '<?php echo $url?>', // 分享链接
            imgUrl: '<?php echo STATIC_DOMAIN ?>yurenjie/images/share_icon.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });wx.onMenuShareQQ({
            title: '<?php echo $shareTitle?>', // 分享标题
            desc: '<?php echo $shareDesc?>', // 分享描述
            link: '<?php echo $url?>', // 分享链接
            imgUrl: '<?php echo STATIC_DOMAIN ?>yurenjie/images/share_icon.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
</script>