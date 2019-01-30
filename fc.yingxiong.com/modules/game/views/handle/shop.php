<?php

use yii\helpers\Html;
use yii\helpers\Url;

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/public.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/price.css" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery-3.2.0.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery.fittext.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/price.js"></script>
    <script type="text/javascript">
        document.addEventListener('plusready', function() {
            //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"

        });
    </script>
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
    <?php echo Html::csrfMetaTags();?>
</head>

<body>
<div class="box">
    <div class="top">
        <div class="top_1">
            <a class="store" href="<?php echo Url::to('/game/handle/main')?>">首页</a><span>积分：<font id="score"><?php echo $info->score?></font></span>
           <!-- <a class="price" href="<?php /*echo Url::to('/game/handle/log')*/?>">我的奖励</a>
            <a class="back" href="<?php /*echo Url::to('/game/handle/logout')*/?>">退出</a>-->
            <a class="price" href="<?php echo Url::to('/game/handle/log')?>">我的奖励</a>
        </div>
    </div>
    <a style="display: block;" href="javascript:;" class="js_exchange" data-id="chemi">
        <img class="price01" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/price1.jpg" title="" alt="" />
        <span class="duihuan01">兑换积分<?php echo $exchange['chemi']?></span>
    </a>
    <a style="display: block;" href="javascript:;" class="js_exchange" data-id="guanjun">
        <img class="price02" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/price2.jpg" title="" alt="" />
        <span class="duihuan02">兑换积分<?php echo $exchange['guanjun']?></span>
    </a>
    <p class="jifen">CDkey兑换积分和抽奖机会</p>
    <div class="txt_code">
        <input class="fl" type="text" placeholder="请输入CDkey" id="cd_key"/>
        <a class="fl" href="javascript:;" style="display: block;" id="button_cd_key">
            <img class="dh" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/gift_btn.png" title="" alt="" />
        </a>
    </div>
    <div id="lottery">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr class="first_line">
                <td class="lottery-unit lottery-unit-0"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo1.jpg">
                    <div class="mask"></div>
                </td>
                <td class="lottery-unit lottery-unit-1"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo2.png">
                    <div class="mask"></div>
                </td>
                <td class="lottery-unit lottery-unit-2 last"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo3.jpg">
                    <div class="mask"></div>
                </td>
            </tr>
            <tr class="second_line">
                <td class="lottery-unit lottery-unit-7"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo4.jpg">
                    <div class="mask"></div>
                </td>
                <td class="aaaa">
                    <a href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo5.png"><span>今日还可抽<font id="today_count"><?php echo $count?></font>次</span></a>
                </td>
                <td class="lottery-unit lottery-unit-3 last"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo6.jpg">
                    <div class="mask"></div>
                </td>
            </tr>
            <tr class="third_line">
                <td class="lottery-unit lottery-unit-6"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo7.jpg">
                    <div class="mask"></div>
                </td>
                <td class="lottery-unit lottery-unit-5"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo8.jpg">
                    <div class="mask"></div>
                </td>
                <td class="lottery-unit lottery-unit-4 last"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/logo9.jpg">
                    <div class="mask"></div>
                </td>
            </tr>
        </table>
        <p class="txt_price">
            抽奖次数<span id="total_count"><?php echo $total_count?></span>次
        </p>
    </div>
    <!--弹出框-->
    <div class="txt_put">
        <div class="price_name">
            <img class="close" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/close.png" title="" alt="" />
            <p id="dialog">您已获得<span>“我的礼包I”,</span>请到<i>“我的奖励”查看!</i></p>
        </div>
        <div class="include"></div>
    </div>

    <img class="logo_1" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/game_logo.png" title="" alt="" />
    <img class="logo_2" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/contact_logo.png" title="" alt="" />
</div>
<script>
    var csrf = $('meta[name="csrf-token"]').attr('content');
    $().ready(function(){
        var today_count = <?php echo $count?>;
        var total_count = <?php echo $total_count?>;
        $('.js_exchange').click(function(){
            var id= $(this).attr('data-id');
            var csrf = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                type: "POST",
                url: "<?php echo Url::to('/game/handle/exchange')?>",
                data: "id=" + id+"&cms_csrf="+csrf,
                dataType: "json",
                success: function (data) {
                    $('#dialog').html(data.msg);
                    $('#score').html(data.data.score);
                    $(".txt_put").css('display', "block");
                }
            });
        });
        $('#button_cd_key').click(function(){
            var key= $('#cd_key').val();
            var csrf = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                type: "POST",
                url: "<?php echo Url::to('/game/handle/cd-key')?>",
                data: "key=" + key+"&cms_csrf="+csrf,
                dataType: "json",
                success: function (data) {
                    $('#dialog').html(data.msg);
                    if(data.status==1){
                        total_count=data.data.total_count;
                        today_count = data.data.today_count;
                        $('#score').html(data.data.score);
                       $('#today_count').html(data.data.today_count);
                        $('#total_count').html(data.data.total_count);
                    }
                    $(".txt_put").css('display', "block");
                }
            });
        });
        $("#lottery a").click(function() {
            if(total_count<=0){
                $('#dialog').html('暂时没有抽奖次数，请通过cdkey兑换获得吧');
                $(".txt_put").css('display', "block");
                return false;
            }
            if(today_count<=0){
                $('#dialog').html('今日抽奖次数已达上线');
                $(".txt_put").css('display', "block");
                return false;
            }
            today_count--;
            total_count--;
            if(click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                return false;
            } else {
                lottery.speed = 100;
                lottery.prize=-1;
                roll(); //转圈过程不响应click事件，会将click置为false
                click = true; //一次抽奖完成后，设置click为true，可继续抽奖
                $.ajax({
                    type: "POST",
                    url: "<?php echo Url::to('/game/handle/lottery')?>",
                    data: "phone=" + <?php echo $info->phone?>+"&cms_csrf="+csrf,
                    dataType: "json",
                    success: function (data) {
                        if(data.status==1){
                            var today_count = parseInt($('#today_count').html());
                            today_count -=1;
                            today_count=today_count>0?today_count:0;
                            $('#today_count').html(today_count);
                            var total_count = parseInt($('#total_count').html());
                            total_count -=1;
                            total_count=total_count>0?total_count:0;
                            $('#total_count').html(total_count);
                            var prize = data.data.prize;
                            lottery.prize=prize;
                            $('#dialog').html(data.msg);
                        }

                    }
                });
                lottery.stop=function(index){
                    $(".txt_put").css('display', "block");
                }
                return false;
            }


        });
    })
</script>

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
