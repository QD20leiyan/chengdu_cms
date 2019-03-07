

$(function(){
	
	var t={
		swiper:function(){
			new Swiper(".view-swiper",{direction: 'vertical',loop: false});
			new Swiper('.swiper-banner', {visibilityFullFit : true,loop:true,pagination : '.swiper-banner .swiper-pagination',paginationBulletRender: function (index, className) {return '<span class="' + className + '"><em>' + (index + 1) + '</em></span>';}});
		},
		//ajax数据
		getArt:function(t){
			console.log(t),
			$.ajax({
				url:t,
				dataType:"json",
				type:"get",
				success:function(t){
					$("#news_scroll_2 .art-tit h1").html(t.art_tit),
					$("#news_scroll_2 .art-tit .art-time").html(t.art_time),
					$("#news_scroll_2 .art-con").html(t.art_con);
				},
				error:function(){}
			})
		},
		//第二页ajax
		newsList:function(){
			var r = $(".news-list-txt .news-list-tit"),s = $("#news-box"),l = $(".news-list-tat .news-list-tit"),c = $(".news-list-tat"),h = $(".news-list-txt");
			var eee = new Swiper("#news_scroll_1",{scrollbar:"#news_scroll_1 .swiper-scrollbar-1",direction: 'vertical',slidesPerView: 'auto',mousewheelControl: true,freeMode: true});
			var ee = new Swiper("#news_scroll_2",{scrollbar:"#news_scroll_2 .swiper-scrollbar-2",direction: 'vertical',slidesPerView: 'auto',mousewheelControl: true,freeMode: true});
			r.on("touchstart",function(){$("#news_scroll_1 .swiper-wrapper").removeAttr('style'),h.removeClass("extend")});
			l.on("touchstart",function(){$("#news_scroll_2 .swiper-wrapper").removeAttr('style'),c.removeClass("extend")});
			$('a[action="link"]').bind("click",function(){var e=$(this).data("link");e&&""!=e&&($("#news_scroll_2").show(),c.addClass("extend"),t.getArt(e))})
		    $("#news_scroll_2").get(0).addEventListener("touchmove",function(){ee.onResize()});
		    $("#news_scroll_1").get(0).addEventListener("touchmove",function(){eee.onResize()})
		},
		//弹出框
		newsBox:function(){
			$("span.common-vedio-btn").on("click",function(){
				var rel = $(this).attr('data-id');
				if(rel){
					$("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
				}

				$("#video_tck").show();
			});
			$("#video_tck #close").on("click",function(){
				$("#video_tck").hide();
			})
			$(".app-test").on("click",function(){
				$(".box-box").show();
			});
			$(".con-sub").on("click",function(){
				var phone = $('#phone').val();
				var type = $('.yzr-equipment .on').attr('data-id');
				var man = $('.yzr-producers .on').attr('data-id');
				if($.trim(phone) == ''){
					alert('手机号不能为空');
					return false;
				}else{
					//验证手机
					var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
					if(!reg.test($.trim(phone)))
					{
						alert("手机号码格式不对！");
						return false;
					}
					if(phone.length != 11){
						alert("手机号格式不对！");
						return false;
					}
					$.post(
						'/site/yuyue',
						{
							phone:phone,
							type:type,
							man:man
						},
						function(msg){
							if(msg == 1){
								alert('预约成功');
							}else if(msg == 0){
								alert('预约失败');
							}else if(msg == 2){
								alert('该手机号码已存在，请勿重复预约');
							}
						}
					);
				}
				
			});
			$(".ios-role .close").on("click",function(){
				$(".ios-role").hide();
			});
			$(".box-box .close").on("click",function(){
				$(".box-box").hide();
			});
			$("p.yzr-equipment a").each(function(){
				var $this = $(this);
				$this.on("click",function(){
					$this.addClass("on").siblings().removeClass("on");
					$(".yzrEquipment").val($(this).data("index"));
				})
			});
			$("p.yzr-producers a").each(function(){
				var $this = $(this);
				$this.on("click",function(){
					$this.addClass("on").siblings().removeClass("on");
					$(".yzrProducers").val($(this).data("index"));
				})
			});
			$(".con-sub").on("click",function(){
				var $iphone = $(".yzriphone").val();
				var $yzrEquipment = $(".yzrEquipment").val();
				var $yzrProducers = $(".yzrProducers").val();
				if($iphone.match(/^1[34578]\d{9}$/) && $yzrEquipment && $yzrProducers){}else{return false;}
				$.ajax({
					type:"POST",
					url:"",
					data:{iphone:$iphone,yzrEquipment:$yzrEquipment,yzrProducers:$yzrProducers},
					dataType:"JSON",
					success:function(data){
						if(data){
							$(".box-box").hide();
							$(".yzriphone").val("")&&$("p.yzr-equipment a").removeClass("on")&&$("p.yzr-producers a").removeClass("on")
						}else{
							
						}
					}
				})
			})
		},
		init:function(){
			me=this,
            me.swiper(),
			me.newsBox(),
			me.newsList()
		}
	}
	t.init();
});
window.onload=function(){
	$('#loading').animate({'opacity':0},1000,function(){
		$(this).remove();
		$(".common-footer").addClass("common-footer-ani");
	});
}


var $Height = document.body.clientHeight;//屏幕高度
var $banner = $(".swiper-banner").height();
var $footer = $(".common-footer").height();
var $laslisttit = $(".lat-news-tit").height();
var $newslisttit = $(".news-list-tit").height();
var $laslist = $Height-$banner-$footer;
var $newsboxH = $Height-$footer-$newslisttit-parseInt($("#news_scroll_1").css('marginLeft'))*2;
var $newsboxH1 = $Height-$footer-$newslisttit;
var $newsboxH2 = $Height-$footer;
var $laslisttxt = $Height-$banner-$footer-$laslisttit-$laslisttit/2;
$("#news_scroll_1,#news_scroll_2").css("height",$newsboxH);
$(".common-list-a,.news-list-txt,.news-list-tat").css("height",$newsboxH2);
$(".lat-news").css("height",$laslist);
$(".lat-news .lat-news-txt").css("height",$laslisttxt);
$(".lat-news-tit a.more").on("click",function(){
	$("#news_scroll_1").show(),$(".news-list-txt").addClass("extend");
});
