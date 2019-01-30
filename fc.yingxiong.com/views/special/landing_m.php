<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS):$this->web_keywords?>" >
    <meta name="Description" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION):$this->web_description?>" >
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/common/css/common.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/swiper.3.1.7.min.css">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/m/css/css.css" rel="stylesheet"/>
</head>
<body>
<header class="landing_h">
		<a href="javascript:;" class="landing_logo"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/landing_logo.png" alt=""></a>
		<a href="javascript:;" class="landing_load wap_down"></a>
	</header>
	<section class="landing_page1"></section>
	<section class="landing_page2"></section>
	<section class="landing_page3"></section>
	<section class="landing_page4">
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide">
		        	<a href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/landing_lb_img.jpg" alt="" ></a>					
		        </div>
		        <div class="swiper-slide">
		        	<a href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/landing_lb_img.jpg" alt="" ></a>		     
		        </div>
		        <div class="swiper-slide">
		        	<a href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/landing_lb_img.jpg" alt="" ></a>		        
		        </div>
		        <div class="swiper-slide">
		        	<a href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/landing_lb_img.jpg" alt="" ></a>			        
		        </div>	
		        <div class="swiper-slide">
		        	<a href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/landing_lb_img.jpg" alt="" ></a>			        
		        </div>	        				       
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination">
		    	<span></span>
		    	<span></span>
		    	<span></span>
		    	<span></span>
		    	<span></span>
		    </div>					    
		    <!-- 如果需要导航按钮 -->
		    <!-- <div class="swiper-button-prev"></div>
		    <div class="swiper-button-next"></div>		 -->			    
		    <!-- 如果需要滚动条 -->
		    <!--  <div class="swiper-scrollbar"></div> -->
		</div>
	</section>
	<script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
	<script src="<?php echo STATIC_DOMAIN ?>2.0/m/js/jquery.fittext.js"></script>
	<script src="<?php echo STATIC_DOMAIN ?>2.0//common/js/swiper.3.1.7.min.js"></script>
	<script>
		$('html').fitText(2);
		var mySwiper = new Swiper ('.swiper-container', {  
		    loop: true,
		    // autoplay: 5000,
		    // // 如果需要分页器
		    pagination: '.swiper-pagination',    
			speed:500,
			paginationClickable :true,
		    // // 如果需要前进后退按钮
		    // // 如果需要滚动条
		    // scrollbar: '.swiper-scrollbar',
	 	 });
	</script>

<script>
$().ready(function(){
 if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {//移动端
                //给页面下载链接赋值
                if ((/iphone|ipad/i.test(navigator.userAgent.toLowerCase()))) {
                    $(".wap_down").attr('href', 'http://downurl.yingxiong.com/ios/fc_pcgw.html');
                }else{
                    $(".wap_down").attr('href', 'http://cdn.yingxiong.com/fc/fc-am-20170313.apk');
                }
}
})

</script>
</body>
</html>
