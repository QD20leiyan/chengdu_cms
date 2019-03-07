var init_url = '/commonMethod/ajax-website.html?id=49';
var fgw_wap_down='';
var fgw_wap_tap='';
var fgw_wap_hy='';
var fgw_wap_down1='';
var fgw_wap_tap1='';
var fgw_wap_hy1='';
var wap_xz = $(".stat_wap_down").length; 
var wap_tap_xz = $(".stat_wap_tap").length; 
var wap_hy_xz = $(".stat_wap_hy").length; 
var wap_cover_xz = $(".stat_cover_wap_down").length; 
var wap_cover_tap_xz = $(".stat_cover_wap_tap").length; 
var wap_cover_hy_xz = $(".stat_cover_wap_hy").length; 
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
					$(".tap").hide();

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
                        if(wap_cover_xz > 0) {
                         $('.stat_cover_wap_down').click(function(){HLog.event('stat_cover_wap_down')});
                        }
                        if(wap_cover_tap_xz>0){
                            $('.stat_cover_wap_tap').click(function(){HLog.event('stat_cover_wap_tap')});
                        }
                        if(wap_cover_hy_xz>0){
                            $('.stat_cover_wap_hy').click(function(){HLog.event('stat_cover_wap_hy')});
                        }
				if(data.msg.logo_img !=undefined) $('#logo_img').attr('src',data.msg.logo_img);
				if(data.msg.icon_img !=undefined) $('head').append('<link href="'+data.msg.icon_img+'" rel="SHORTCUT ICON">');
				if(data.msg.site_name !=undefined)    $('#site_name').text(data.msg.site_name);
				if(data.msg.title !=undefined)    $('#title').text(data.msg.title);
				if(data.msg.sub_title !=undefined)    $('#sub_title').text(data.msg.sub_title);
				if(data.msg.wx_img !=undefined)   $('#wx_img').attr('src',data.msg.wx_img);
				if(data.msg.wb_img !=undefined)   $('#wb_img').attr('src',data.msg.wb_img);
				if(data.msg.tb_img !=undefined)   $('#tb_img').attr('src',data.msg.tb_img);
				if(data.msg.wb_url !=undefined)   $('#wb_url').text(data.msg.wb_url);
				if(data.msg.tb_url !=undefined)   $('#tb_url').text(data.msg.tb_url);

				// $('head').append(data.msg.web_count);
				$('meta[name="csrf-token"]').attr('content',data.csrf);

				if(data.msg.top_banner_status == 1 && data.msg.top_banner_img) {
					$('#top_middle_img').show();
					if(data.msg.top_banner_img !=undefined)  $('#top_middle_img').attr('src', data.msg.top_banner_img);
					if(data.msg.top_banner_url !=undefined) $('.middle_big_img').attr('href', data.msg.top_banner_url);
					if(data.msg.top_banner_big_img !=undefined) $('.middle_big_img img').attr('src', data.msg.top_banner_big_img);
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

