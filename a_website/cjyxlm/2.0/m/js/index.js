
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
// 设备类型判断
function change(){
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isIOS) {
		$(".lj_yyue1").hide();
		$(".lj_yyue2").show();
		$(".down_list li a.download").hide();
		$(".down_list li").css("margin-top","0");
	}
	if(isAndroid) {
		$(".lj_yyue1").show();
		$(".lj_yyue2").hide();
		$(".down_list li a.download").show();
	}
}
//导航变化
$(function() {
var clickNumber = 0;
var clickNumber2 = 0;
	$(".h_nav,.h_nav2").on("click", function(e) {
		$(".down_list").slideUp(400);
		e.stopPropagation();
		if(clickNumber % 2 == 0) {
			$(".d_t_t").addClass("d_t_t_tran");
			$(".d_t_m").addClass("d_t_m_tran");
			$(".d_t_b").addClass("d_t_b_tran");
			$(".header_nav").stop().slideDown();
		} else {
			$(".d_t_t").removeClass("d_t_t_tran");
			$(".d_t_m").removeClass("d_t_m_tran");
			$(".d_t_b").removeClass("d_t_b_tran");
			$(".header_nav").stop().slideUp();
		}
		clickNumber++;
		clickNumber2 = 0;
	});
	$(".header_nav li,.fade,.header_nav").click(function() {
		$(".d_t_t").removeClass("d_t_t_tran");
		$(".d_t_m").removeClass("d_t_m_tran");
		$(".d_t_b").removeClass("d_t_b_tran");
		$(".header_nav").stop().slideUp();
		clickNumber = 0;
	})
	$(".news-list li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".news-info li.info").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	change();
	//游戏下载判断
	$(".top_yyue").click(function(e){
		change();
		$(".header_nav").stop().slideUp();
		$(".d_t_t").removeClass("d_t_t_tran");
			$(".d_t_m").removeClass("d_t_m_tran");
			$(".d_t_b").removeClass("d_t_b_tran");
		e.stopPropagation();
		if(clickNumber2 % 2 == 0) {
		$(".down_list").slideDown(400);
		} else {
			$(".down_list").slideUp(400);
		}
		clickNumber2++;
		clickNumber=0;
	})
	$(".down_list li,.fade").click(function() {
		$(".down_list").slideUp(400);
		clickNumber2=0;
	})
})