<?php
/**
 * Created by PhpStorm.
 * User: thinkpad
 * Date: 2017/4/6
 * Time: 16:40
 */

use yii\helpers\Url;

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/public.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/dhjl.css" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery-3.2.0.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery.fittext.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/dhjl.js"></script>
    <script>
        //yxhy2016
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?3ad2b20caaa89bc9c22e9c483d2b64c5";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>

<body>
<div class="box">
    <div class="top">
        <div class="top_1">
            <a class="store" href="<?php echo Url::to('/game/handle/shop')?>">我的商城</a><span>积分：<?php echo $info->score?></span>
           <!-- <a class="price" href="<?php /*echo Url::to('/game/handle/log')*/?>">我的奖励</a>
            <a class="back" href="<?php /*echo Url::to('/game/handle/logout')*/?>">退出</a>-->
            <a class="price" href="<?php echo Url::to('/game/handle/log')?>">我的奖励</a>
        </div>
    </div>
    <div class="content">
        <h3>兑换记录</h3>
        <?php foreach ($log as $l){?>
        <p><?php echo $l['created_at'].$l['desc']?></p>
        <?php }?>

    </div>
<!--    <img class="logo_1" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/game_logo.png" title="" alt="" />
    <img class="logo_2" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/contact_logo.png" title="" alt="" />-->
</div>

<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '<?php echo $appid?>', // 必填，公众号的唯一标识
        timestamp: <?php echo $shareTime?>, // 必填，生成签名的时间戳
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
            link: '<?php echo $shareUrl?>', // 分享链接，该链接域名需在JS安全域名中进行登记
            imgUrl: '<?php echo STATIC_DOMAIN ?>kangshifu/images/share.jpg', // 分享图标
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
            link: '<?php echo $shareUrl?>', // 分享链接，该链接域名需在JS安全域名中进行登记
            imgUrl: '<?php echo STATIC_DOMAIN ?>kangshifu/images/share.jpg', // 分享图标
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
            link: '<?php echo $shareUrl?>', // 分享链接
            imgUrl: '<?php echo STATIC_DOMAIN ?>kangshifu/images/share.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });wx.onMenuShareQQ({
            title: '<?php echo $shareTitle?>', // 分享标题
            desc: '<?php echo $shareDesc?>', // 分享描述
            link: '<?php echo $shareUrl?>', // 分享链接
            imgUrl: '<?php echo STATIC_DOMAIN ?>kangshifu/images/share.jpg', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
</script>
</body>
</html>

