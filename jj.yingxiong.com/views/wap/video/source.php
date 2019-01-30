<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<meta name="keywords" content="">
		<meta name="description" content="">
	</head>
	<body>
	<script id="autoJs<?php echo $vu?>" type="text/javascript">
		var cc="<?php echo $uu;?>";
		var bb="<?php echo $vu?>";
		var pNode=document.getElementById("autoJs"+bb+"").parentNode,pt,pb,dWidth = pNode.clientWidth,pHeight = pNode.clientHeight,dHeight = ReCallHeight(pHeight, dWidth,pNode);function ReCallHeight(h, w,a) {try{pt = window.getComputedStyle(a,null).paddingTop;pb = window.getComputedStyle(a,null).paddingBottom;}catch(e){pt = a.currentStyle.paddingTop;pb = a.currentStyle.paddingBottom;}h = h- parseInt(pt)- parseInt(pb);if(h && (typeof h == "number") && h==h && h>0){return h;}else{var ua = navigator.userAgent.toLowerCase();var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),isAndroid = ua.match(/(Android)\s+([\d.]+)/),isMobile = isIphone || isAndroid;if(isMobile){return w*9/16;}else{return (w*9/16)+36;}}}
		var letvcloud_player_conf =  {"uu":""+cc+"","vu":""+bb+"","auto_play":1,"gpcflag":1,"width": dWidth,"height": dHeight};
	</script>
	<script type="text/javascript" src="http://yuntv.letv.com/bcloud.js"></script>
</body>
</html>