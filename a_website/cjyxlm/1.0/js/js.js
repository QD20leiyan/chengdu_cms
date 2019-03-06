var imgMarkIndex = 1;
var init_url = '/commonMethod/ajax-website.html?id=92';//Ô¤Ô¼ÈËÊý
var fgw_pc='';
var fgw_pc_ios='';
var fgw_pc_android='';
var fgw_pc_tap='';
var fgw_pc_hy='';
var fgw_pc_ios1='';
var fgw_pc_android1='';
var fgw_pc_tap1='';
var fgw_pc_hy1='';
$(function() {
	$.get(init_url, {}, function(data) {
		if(data.status == 0) {
			fgw_name=data.channel;
            fgw_pc_android=data.channel+"_android";
            fgw_pc_ios=data.channel+"_ios";
            fgw_pc_tap=data.channel+"_tap";
            fgw_pc_hy=data.channel+"_hy";
            fgw_pc_android1="."+data.channel+"_android";
            fgw_pc_ios1="."+data.channel+"_ios";
            fgw_pc_tap1="."+data.channel+"_tap";
            fgw_pc_hy1="."+data.channel+"_hy";
			if(data.flag==1){
				$('.channel_name').css('display','block');
				$('.channel_tap_name').css('display','none');
				$('.no_channel').css('display','none');
				$(".stat_pc_android").addClass(fgw_pc_android);
                    $(".stat_pc_ios").addClass(fgw_pc_ios);
                    $(".stat_pc_tap").addClass(fgw_pc_tap);
                    $(".stat_pc_hy").addClass(fgw_pc_hy);
                    $(fgw_pc_android1).removeClass('stat_pc_android');
                    $(fgw_pc_ios1).removeClass('stat_pc_ios');
                    $(fgw_pc_tap1).removeClass('stat_pc_tap');
                    $(fgw_pc_hy1).removeClass('stat_pc_hy');
                    $("body").on("click",fgw_pc_android1,function(){HLog.event(fgw_pc_android)});
                    $("body").on("click",fgw_pc_ios1,function(){HLog.event(fgw_pc_ios)});
                    $("body").on("click",fgw_pc_tap1,function(){HLog.event(fgw_pc_tap)});
                    $("body").on("click",fgw_pc_hy1,function(){HLog.event(fgw_pc_hy)});
			}else if(data.flag==2){
				$('.channel_tap_name').css('display','block');
				$('.channel_name').css('display','none');
				$('.no_channel').css('display','none');
				$(".stat_pc_android").addClass(fgw_pc_android);
                    $(".stat_pc_ios").addClass(fgw_pc_ios);
                    $(".stat_pc_tap").addClass(fgw_pc_tap);
                    $(".stat_pc_hy").addClass(fgw_pc_hy);
                    $(fgw_pc_android1).removeClass('stat_pc_android');
                    $(fgw_pc_ios1).removeClass('stat_pc_ios');
                    $(fgw_pc_tap1).removeClass('stat_pc_tap');
                    $(fgw_pc_hy1).removeClass('stat_pc_hy');
                    $("body").on("click",fgw_pc_android1,function(){HLog.event(fgw_pc_android)});
                    $("body").on("click",fgw_pc_ios1,function(){HLog.event(fgw_pc_ios)});
                    $("body").on("click",fgw_pc_tap1,function(){HLog.event(fgw_pc_tap)});
                    $("body").on("click",fgw_pc_hy1,function(){HLog.event(fgw_pc_hy)});
			}
			var and_xz = $(".stat_pc_android").length; 
                var ios_xz = $(".stat_pc_ios").length; 
                var tap_xz = $(".stat_pc_tap").length; 
                var hy_xz = $(".stat_pc_hy").length; 
                if(and_xz > 0) {
                $('.stat_pc_android').click(function(){HLog.event('stat_pc_android')});
                }
                if(ios_xz>0){
                    $('.stat_pc_ios').click(function(){HLog.event('stat_pc_ios')});
                }
                if(tap_xz>0){
                    $('.stat_pc_tap').click(function(){HLog.event('stat_pc_tap')});
                }
                if(hy_xz>0){
                    $('.stat_pc_hy').click(function(){HLog.event('stat_pc_hy')});
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
	var $_window = $(window);
	var $main_visual = $('.b');
	var itemLi = $main_visual.find('.b1');
	var visualWidth = $main_visual.width();
	// $(window).scroll(function(){
	// 	var $t = $(this).scrollTop();
	// 	if($t > 0){
	// 		$(".nav").css({"top":"0"});
	// 		$(".nav").css({"zIndex":"98"});
	// 	}else{
	// 		$(".nav").css({"top":"42px"});
	// 		$(".nav").css({"zIndex":"9999999"});
	// 	}
	// });
	$(".s_ul li:nth-child(1)").hover(function (){
		$(".fl_wx").stop().fadeIn();
	},function (){
		$(".fl_wx").stop().fadeOut();
	});
	var mySwiper = new Swiper(".left_banner", {
		autoplay: 3000,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        autoplayDisableOnInteraction : false,
		loop: true,
	});
	 var mySwiper = new Swiper('.bottom_banner', {
		loop: true,
		autoplay: 3500,
		slideToClickedSlide:true,
		autoplayDisableOnInteraction : false,
		pagination: '.swiper-pagination1',
		effect: 'coverflow',
		slidesPerView: 3,
		centeredSlides: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		coverflow: {
			rotate: 50,
			stretch: -250,
			depth: 700,
			modifier: 1,
			slideShadows: false
		},
		observer: true,
		observeParents: true,
	});
	var mySwiper01 = new Swiper('.h_banner', {
		loop: true,
//		autoplay: 3500,
		autoplayDisableOnInteraction : false,
		pagination: '.swiper-pagination2',
		paginationClickable :true,
		effect : 'fade',
		fade: {
		  crossFade: true,
		},
		observer: true,
		observeParents: true,
	});
	$(".top_ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".right_con ul").eq(index).addClass("active").siblings().removeClass("active");
	});
});