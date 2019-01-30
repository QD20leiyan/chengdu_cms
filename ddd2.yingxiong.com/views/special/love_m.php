
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<title>弹弹岛2-情人节</title>
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/m/css/style.css?<?= VERSION?>">
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?e896a013f613cc56bef66f4d4f67c5ff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>
<body>
	<section class="Valentine_page1 Valentine_sjjy_page1">
		<a href="index.html" class="Valentine_logo"><img src="<?php echo STATIC_DOMAIN?>2.0/m/images/Valentine_logo.png?<?= VERSION?>" alt=""></a>
		<a href="http://ddd2.yingxiong.com/" class="Valentine_back"><img src="<?php echo STATIC_DOMAIN?>2.0/common/images/Valentine_back.png?<?= VERSION?>" alt=""></a>
		<a href="javascript:;" class="Valentine_load wap_down"><img src="<?php echo STATIC_DOMAIN?>2.0/m/images/Valentine_load.png?<?= VERSION?>" alt=""></a>
	</section>
	<section class="Valentine_page2">
		<div class="Valentine_video Valentine_sjjy_video">
			<i class="video_i js_video_play" data-url="uu=58546ec681&vu=a9cf3e4add"></i>
		</div>
	</section>
	<footer class="new-footer">
		<p class="m-f-footer">
			<a href="http://kf.yingxiong.com/Mobile/checkOption?Gid=73">客服中心</a>
			<a href="http://gamer.yingxiong.com/index.php?m=Mobile&fid=9&md5=8e5ad6e88099674d422432f143ffffa2">游戏中心</a>
			<span>
				<img src="<?php echo STATIC_DOMAIN?>2.0/m/images/Valentine_tel.png?<?= VERSION?>" alt="">
				<i>400-939-3333</i>
			</span>
			<div class="clear"></div>
		</p>
		<p class="m-s-footer">COPY RIGHT  @2015-2016 ALL RIGHTS RESERVED</p>
		<p class="m-t-footer"><span>英雄互娱版权所有</span></p>
	</footer>
	<div id="Valentine_video_mask">
	    <div id="Valentine_player5">
	        <div id="Valentine_close"></div>
	        <iframe border=0 marginWidth=0 frameSpacing=0 marginHeight=0 src="" frameBorder=0 noResize scrolling="no" width=100% height=100% vspale="0" id="iframe_btn" name="iframe_btn"></iframe>
	    </div>
	</div>
    <div style="display:none">
        <script>
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?e896a013f613cc56bef66f4d4f67c5ff";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
        </script>
        <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258207346'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1258207346%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
    </div>
	<script src="<?php echo STATIC_DOMAIN?>2.0/m/js/jquery+fittext+touchslider.js?<?= VERSION?>"></script>
	<script>
//		$(".video_i").click(function(){
//			var rel = $(this).attr('rel');
//			if(rel){
//				$("#iframe_btn").attr("src","/videoMobile/video-source.html?"+rel);
//				$("#Valentine_video_mask").show();
//				//兼容安卓延时获取iframe子元素高度来
//	            setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
//			}else{
//				alert('暂无视频，敬请期待');
//				return false;
//			}
//		});
		$("#Valentine_close,#Valentine_video_mask").click(function(){
		    $("#Valentine_video_mask").hide();
			setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
		});
		$("#Valentine_player5").click(function(e){
			e.stopPropagation();
		});
	</script>
<script>
$().ready(function(){
 if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {//移动端
                //给页面下载链接赋值
                if ((/iphone|ipad/i.test(navigator.userAgent.toLowerCase()))) {
                    $(".wap_down").attr('href', 'https://lnk0.com/lApwZh');
                }else{
                    $(".wap_down").attr('href', 'http://cdn.yingxiong.com/ddd2/ddd2-shij-P32620A-0120.apk');
                }
}
})

</script>
</body>
</html>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
<script src="//cdnstatic.yingxiong.com/footer/js/footer.js"></script>
	