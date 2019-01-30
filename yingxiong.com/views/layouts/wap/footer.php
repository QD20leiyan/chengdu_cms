<!--<!--<footer class="i_foot" id="i_foot">-->
<!--<!--    <ul>-->
<!--<!--        <li><a href="http://kf.yingxiong.com">客服中心</a></li>-->
<!--<!--        <li><a href="http://bbs.yingxiong.com:">游戏社区</a></li>-->
<!--<!--        <li><a href="/m/contact">联系我们</a></li>-->
<!--<!--        <li class="no_border"><a href="http://m.i.yingxiong.com/login/index">账号中心</a></li>-->
<!--<!--    </ul>-->
<!--<!--    <p>COPYRIGHT&copy;2015 &ndash; 2019 . ALL RIGHTS RESERVED</p>-->
<!--<!--    <p>英雄互娱版权所有</p>-->
<!--<!--</footer>-->
<!--<script type="text/javascript" src="--><?php //echo STATIC_DOMAIN; ?><!--wap1.0/public/jquery-1.7.1.min.js?--><?//=VERSION?><!--"></script>-->
<!--<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>-->


<footer class="i_foot" id="i_foot">
    <ul>
        <li><a href="http://kf.yingxiong.com">客服中心</a></li>
        <li><a href="http://bbs.yingxiong.com:">游戏社区</a></li>
        <li><a href="<?= \yii\helpers\Url::to(['/m/contact'])?>">联系我们</a></li>
        <li class="no_border"><a href="http://m.i.yingxiong.com/login/index">账号中心</a></li>
    </ul>
    <p>COPYRIGHT&copy;2015 &ndash; 2019 . ALL RIGHTS RESERVED</p>
    <p>英雄互娱版权所有</p>
</footer>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/jquery-1.7.1.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
    document.write('<script src="http://game.yingxiong.com/common/yxwx/yxwxjs.php?url=' +encodeURIComponent(location.href)+'"><\/script>');
</script>
<script type="text/javascript">
    $(function(){
        var share = {
            imgUrl      : 'http://cdnstatic.yingxiong.com/yingxiong/wap1.0/images/share.png',
            title  :'英雄互娱-互联网体育',
            desc : '打造全方位的移动电竞娱乐方式，开创全民互动娱乐新时代',
            link    : wx_conf.url,
        };
        wx.config({
            debug     : false,
            appId     : wx_conf.appId,
            timestamp : wx_conf.timestamp,
            nonceStr  : wx_conf.nonceStr,
            signature : wx_conf.signature,
            jsApiList : [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ]
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage(share);//分享给好友
            wx.onMenuShareTimeline(share);//分享到朋友圈
            wx.onMenuShareQQ(share);//分享给手机QQ
        });
    });
</script>



