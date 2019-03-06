var init_url = '/commonMethod/ajax-website.html?id=92';//预约人数
var fgw_wap_down='';
var fgw_wap_tap='';
var fgw_wap_hy='';
var fgw_wap_down1='';
var fgw_wap_tap1='';
var fgw_wap_hy1='';
var wap_xz = $(".stat_wap_down").length; 
var wap_tap_xz = $(".stat_wap_tap").length; 
var wap_hy_xz = $(".stat_wap_hy").length; 
$(function() {
	$.get(init_url, {}, function(data) {
			if(data.status == 0) {
				 fgw_wap_down=data.channel+"_wap_down";
                    fgw_wap_tap=data.channel+"_tap";
                    fgw_wap_hy=data.channel+"_hy";
                    fgw_wap_down1="."+data.channel+"_wap_down";
                    fgw_wap_tap1="."+data.channel+"_tap";
                    fgw_wap_hy1="."+data.channel+"_hy";
				if(data.flag==1){
					$('.channel_name').css('display','block');
					$('.channel_tap_name').css('display','none');
					$('.no_channel').css('display','none');
					 $(".stat_wap_down").addClass(fgw_wap_down);
                        $(".stat_wap_tap").addClass(fgw_wap_tap);
                        $(".stat_wap_hy").addClass(fgw_wap_hy);
                        $(fgw_wap_down1).removeClass('stat_wap_down');
                        $(fgw_wap_tap1).removeClass('fgw_wap_tap');
                        $(fgw_wap_hy1).removeClass('fgw_wap_hy');
                        $("body").on("click",fgw_wap_down1,function(){HLog.event(fgw_wap_down)});
                        $("body").on("click",fgw_wap_tap1,function(){HLog.event(fgw_wap_tap)});
                        $("body").on("click",fgw_wap_hy1,function(){HLog.event(fgw_wap_hy)});
				}else if(data.flag==2){
					$('.channel_tap_name').css('display','block');
					$('.channel_name').css('display','none');
					$('.no_channel').css('display','none');
					 $(".stat_wap_down").addClass(fgw_wap_down);
                        $(".stat_wap_tap").addClass(fgw_wap_tap);
                        $(".stat_wap_hy").addClass(fgw_wap_hy);
                        $(fgw_wap_down1).removeClass('stat_wap_down');
                        $(fgw_wap_tap1).removeClass('fgw_wap_tap');
                        $(fgw_wap_hy1).removeClass('fgw_wap_hy');
                        $("body").on("click",fgw_wap_down1,function(){HLog.event(fgw_wap_down)});
                        $("body").on("click",fgw_wap_tap1,function(){HLog.event(fgw_wap_tap)});
                        $("body").on("click",fgw_wap_hy1,function(){HLog.event(fgw_wap_hy)});
				}
				if(wap_xz > 0) {
                         $('.stat_wap_down').click(function(){HLog.event('stat_wap_down')});
                        }
                        if(wap_tap_xz>0){
                            $('.stat_wap_tap').click(function(){HLog.event('stat_wap_tap')});
                        }
                        if(wap_hy_xz>0){
                            $('.stat_wap_hy').click(function(){HLog.event('stat_wap_hy')});
                        }
				if(data.msg.logo_img != '') $('#logo_img').attr('src',data.msg.logo_img);
				if(data.msg.icon_img != '') $('head').append('<link href="'+data.msg.icon_img+'" rel="SHORTCUT ICON">');
				if(data.msg.site_name != '')    $('#site_name').text(data.msg.site_name);
				if(data.msg.title != '')    $('#title').text(data.msg.title);
				if(data.msg.sub_title != '')    $('#sub_title').text(data.msg.sub_title);
				if(data.msg.wx_img != '')   $('#wx_img').attr('src',data.msg.wx_img);
				if(data.msg.wb_img != '')   $('#wb_img').attr('src',data.msg.wb_img);
				if(data.msg.tb_img != '')   $('#tb_img').attr('src',data.msg.tb_img);
				if(data.msg.wb_url != '')   $('#wb_url').text(data.msg.wb_url);
				if(data.msg.tb_url != '')   $('#tb_url').text(data.msg.tb_url);

				// $('head').append(data.msg.web_count);
				$('meta[name="csrf-token"]').attr('content',data.csrf);

				if(data.msg.top_banner_status == 1 && data.msg.top_banner_img) {
					$('#top_middle_img').show();
					$('#top_middle_img').attr('src', data.msg.top_banner_img);
					$('.middle_big_img').attr('href', data.msg.top_banner_url);
					$('.middle_big_img img').attr('src', data.msg.top_banner_big_img);
					$("#top_banner_a").mouseover(function() {
						$(this).hide();
						$(".middle_big_img").show();
					});
					$(".middle_big_img").mouseout(function() {
						$(this).hide();
						$("#top_banner_a").show();
					})

					// $.get('//cc.yingxiong.com/commonMethod/ajax-banner-pv.html', {
					//     id: website
					// }, function() {});
				} else {
					$('#top_middle_img').hide();
				}
			} else {
				$('#top_middle_img').hide();
			}
		}, 'json');
});
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