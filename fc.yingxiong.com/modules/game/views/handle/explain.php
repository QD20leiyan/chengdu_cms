<?php

use yii\helpers\Url;

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title></title>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/public.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/explain.css" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery-3.2.0.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery.fittext.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/explain.js"></script>
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
</head>

<body>
<div class="box">
    <img class="explain" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/explain.png" title="" alt="" />
    <a href="javascript:;"><img class="login_btn" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/login_btn.png" title="" alt="" /></a>
    <img class="logo_1" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/game_logo.png" title="" alt="" />
    <img class="logo_2" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/contact_logo.png" title="" alt="" />
    <div class="denglu_put">
        <div class="mask">
            <img class="close" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/close.png" title="" alt="" />
            <div class="txt_phone">
                <span>手机号:</span><input class="tel fr" id="phone" type="text" placeholder="输入手机号" />
            </div>
            <div class="check_code">
                <span>验证码:</span><input class="code fr" type="text" id="code" placeholder="输入验证码" />
            </div>
            <div class="put_code">
                <button id="get_code" class="get_code">发送验证码</button>
            </div>
            <a style="display: block;" href="javascript:void(0)" id="login"><img class="denglu" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/denglu.jpg" title="" alt="" /></a>
        </div>
        <div class="include"></div>
    </div>

    <div class="wrong_put">
        <div class="wrong_tel">
            <img class="close" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/close.png" title="" alt="" />
            <p>您输入的手机号不正确</p>
            <a href="javascript:;"><img class="sure" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/sure.jpg" title="" alt="" /></a>
        </div>
        <div class="include"></div>
    </div>
</div>

<script>
    $().ready(function(){
        var mobileObj = $("#phone");
        /*获取手机验证码*/
        $('#get_code').click(function () {
            if (checkMobile(mobileObj)) {
                var timer=null;
                var n=120;
                /*$(this).css("backgroundColor","#666");*/
                $(this).attr("disabled","disabled");
                timer = setInterval(function(){
                    n--;
                    $("#get_code").html(n+'s后重试');
                    if(n==0){
                        clearInterval(timer);
                        n=300;
                        $("#get_code").html('发送验证码');
                        /*$("#get_code").css("backgroundColor","#2867da");*/
                        $("#get_code").removeAttr("disabled");
                    }
                },1000);

                $.ajax({
                    type: "POST",
                    url: "<?php echo Url::to('/game/handle/getVerify')?>",
                    data: "phone=" +mobileObj.val(),
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 1) {
                            alert("验证码已发送到手机，请注意查收短信");
                        } else if (data.status == 2) {
                            alert("不能重复提交短信！");
                        } else if (data.status == 3) {
                            alert("超过了发送短信次数！");
                        }else if (data.status == -1) {
                            alert("超过了发送短信次数！");
                        }else {
                            alert("短信发送失败,请重试！");
                        }
                        return true;
                    }
                })
            }
        })
        $("#login").click(function() {
            var mobile = mobileObj.val();
            var code = $('#code').val();
            if(checkMobile(mobileObj)) {
                if (!code) {
                    alert("请输入验证码！");
                    return false;
                } else {
                    $.ajax({
                        type: "POST",
                        url: "<?php echo Url::to('/game/handle/explain')?>",
                        data: "phone=" + mobile + "&verifycode=" + code,
                        dataType: "json",
                        success: function (data) {
                            if(data.status == 1){
                                window.location.href='<?php echo Url::to('/game/handle/main')?>';
                            }else{
                                alert(data.msg);
                            }
                        }
                    });
                }
            }
        })
    });
    function checkMobile(mobileObj){
        var mobile = mobileObj.val();
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
        if (mobile.length == 0) {
            alert('请输入手机号码！');
            mobileObj.focus();
            return false;
        } else if (mobile.length != 11) {
            alert('请输入正确的手机号码！');
            mobileObj.focus();
            return false;
        } else if (!myreg.test(mobile)) {
            alert('请输入正确的手机号码！');
            mobileObj.focus();
            return false;
        }
        return true;
    }
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