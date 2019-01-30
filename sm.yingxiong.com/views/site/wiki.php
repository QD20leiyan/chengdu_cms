<?php
?>
 <meta charset="utf-8"/>
 <meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<body>
	<script type="text/javascript" src="http://cdnstatic.yingxiong.com/czymf/4.0/js/jquery-1.11.2.min.js?1.0.4"></script>
<script type="text/javascript" src="//cdnstatic.yingxiong.com/head/js/topbar.js?1.0.4"></script>
	<link rel="stylesheet" href="http://cdnstatic.yingxiong.com/czymf/4.0/css/common.css?1.0.4" />
		<link rel="stylesheet" href="http://cdnstatic.yingxiong.com/czymf/4.0/css/index.css?1.0.4" />
			<script data-fixed="true">
			if((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
				location.href = "http://czymf.wiki.yingxiong.com?from=gw";
			}
		</script>
<style>
body,html{
margin:0;
padding:0;
overflow-x:hidden;
height:100%;
}
a {
    text-decoration: none;
}
</style>
<iframe src="http://czymf.wiki.yingxiong.com?from=gw" frameborder="0" style="width:100%;" id='content' ></iframe>
</body>
<script>
$('iframe').css('height',($(window).height()-42)+'px'); 
$('content').load(function(){
    $("#content").contents().find('.qq-login-msg,.login-phone-msg').hide(); 
    console.log('contents',$("#content").contents());
})
</script>

