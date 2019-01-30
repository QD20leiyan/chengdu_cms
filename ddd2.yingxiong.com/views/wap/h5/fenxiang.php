<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/6/15
 * Time: 17:59
 */

use yii\helpers\Url;

?>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js?<?= VERSION?>"></script>
<script>
    document.write('<script src="http://game.yingxiong.com/common/cawx/dddwxjs.php?url=' +encodeURIComponent(location.href)+'"><\/script>');
</script>
<script>
    $(function(){
        // initForm();
        var share = {
            imgUrl      : 'http://cdnstatic.yingxiong.com/ddd/h5/1.0/images/80.jpg',
            shareTitle  :'遇见《弹弹岛2》，是我的小确幸',
            descContent : '为什么我一个不沉迷游戏的人会迷恋弹弹岛2？答案都在这里',
            lineLink    : 'http://ddd2.yingxiong.com/wap/h5/index.html'
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
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ]
        });
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                    $.get('<?php echo Url::to(['wap/h5/ajax-share'])?>', '', function(data){});
                }
            });
            wx.onMenuShareTimeline({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                    $.get('<?php echo Url::to(['wap/h5/ajax-share'])?>', '', function(data){});
                },
            });
        })



    });
</script>
