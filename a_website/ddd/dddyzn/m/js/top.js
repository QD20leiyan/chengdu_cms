(function(){
	var topNav ='<div class="top_H"></div><div class="d_top"><div class="d_t_cover"></div><div class="d_t_con"><div><img src="http://dev.static.yingxiong.com/ddd/dddyzn/m/images/pic_01(2).png"></div><div><p>弹弹岛2</p><p>指尖弹射 燃魂竞技</p></div><div><div class="d_t_con_loadBtn"><a style="color: #000000" class="js_wap_down" href="javascript:;">立即下载</a></div></div><div><div class="d_t_con_drop" data="0"><span class="d_t_t"></span><span class="d_t_m"></span><span class="d_t_b"></span></div></div></div></div><div class="d_top_nav"><ul><li class="top_active">首 页</li><li>英雄联赛</li><li>新闻资讯</li><li>活动中心</li><li>弹弹攻略</li><li>官方社区</li></ul></div><div class="d_top_cover"></div>';

	
	$("body").append(topNav);

	function getParam(paramName) {  
	    paramValue = "", isFound = !1;  
	    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {  
	        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
	        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++  
	    }  
	    return paramValue == "" && (paramValue = null), paramValue  
	};
	function windowHidden(){
  		$("html,body").css({
		   	"overflow":"hidden",
		   	"width":"100%",
		   	"height":"100%"
		});
  	};
  	function windowScroll(){
  		$("html,body").css({
		   	"overflow":"visible",
		   	"width":"100%",
		   	"height":"auto"
		});
  	}; 
  /*	function documentNoScroll(){
  		$(document).on('touchmove', function(e){
		 	e.preventDefault();
		});
  	};
  	function documentScroll(){
  		$(document).on('touchmove', function(e){
		 	//e.preventDefault();
		 	return false;
		});
  	}*/

	var a = getParam("current") || 0;
	$(".d_top_nav ul li").removeClass("top_active");
	$(".d_top_nav ul li").eq(a).addClass("top_active");
	console.log(a);
	$(".d_t_con_drop").on("click", function(e){
		e.stopPropagation();
		if($(this).attr("data")=="0"){
			$(".d_t_t").addClass("d_t_t_tran");
			$(".d_t_m").addClass("d_t_m_tran");
			$(".d_t_b").addClass("d_t_b_tran");	

			$(this).attr("src","./images/pic_15.png").attr("data","1");
			$(".d_top_nav").slideDown();
			$(".d_top_cover").show();
			windowHidden();
			//documentNoScroll();
		}else{
			$(".d_t_t").removeClass("d_t_t_tran");
			$(".d_t_m").removeClass("d_t_m_tran");
			$(".d_t_b").removeClass("d_t_b_tran");	


			$(this).attr("src","./images/pic_02.png").attr("data","0");
			$(".d_top_nav").slideUp();
			$(".d_top_cover").hide();
			windowScroll();
			//documentScroll()
		}
	});

	$(".d_top_cover,.d_t_con").on("click",function(e){
		e.stopPropagation();
		$(".d_t_t").removeClass("d_t_t_tran");
		$(".d_t_m").removeClass("d_t_m_tran");
		$(".d_t_b").removeClass("d_t_b_tran");	

		$(".d_t_con_drop").attr("src","./images/pic_02.png").attr("data","0");
		$(".d_top_nav").slideUp();
		$(".d_top_cover").hide();
		windowScroll();
			//documentScroll()
	});
	return 0;
	// $(".d_t_con_loadBtn").on("click", function(e){
	// 	e.stopPropagation();
	// 	$(".d_t_t").removeClass("d_t_t_tran");
	// 	$(".d_t_m").removeClass("d_t_m_tran");
	// 	$(".d_t_b").removeClass("d_t_b_tran");	

		
	// 	$(".d_t_con_drop").attr("src","./images/pic_02.png").attr("data","0");
	// 	$(".d_top_nav").slideUp();
	// 	$(".d_top_cover").hide();
	// 	windowScroll();
	// 	//documentScroll()
	// 	alert("敬请期待");
	// })


	$(".d_top_nav ul li").eq(0).on("click",function(e){
		e.stopPropagation();  //首页
		location.href="index2.html?current=0";
	});
	$(".d_top_nav ul li").eq(1).on("click",function(e){
		e.stopPropagation();
		alert("敬请期待");
	});
	$(".d_top_nav ul li").eq(2).on("click",function(e){
		e.stopPropagation();
		location.href="news_lists.html?current=2";
		
	});
	$(".d_top_nav ul li").eq(3).on("click",function(e){
		e.stopPropagation();
		alert("敬请期待");
	})
	$(".d_top_nav ul li").eq(4).on("click",function(e){
		e.stopPropagation();
		alert("敬请期待");
	})
	$(".d_top_nav ul li").eq(5).on("click",function(e){
		e.stopPropagation();
		alert("敬请期待");
	});

})();