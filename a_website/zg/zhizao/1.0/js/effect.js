
var html = '<span class="jiathis_txt">分享到：</span>'+
    '<a class="jiathis_button_qzone">QQ空间</a>'+
    '<a class="jiathis_button_tsina">新浪微博</a>'+
    '<a class="jiathis_button_tqq">腾讯微博</a>'+
    '<a class="jiathis_button_weixin">微信</a>';
$(function(){
	//解决页面第一屏动画效果
	$(".box1-imgone").animate({top:0},"5000",showimgtwo);
	function showimgtwo(){
         $(".box1-imgtwo").animate({opacity:1},"slow").fadeIn("500");
	}
    $(".box1-content-right").animate({right:50},"slow").fadeIn("5000");
	//当导航条的固定
	var navcount=0; //顶部变小动画只执行一次
	$(window).scroll(function(){
		var scrTop=$(document).scrollTop();
    //解决页面第二屏动画效果
    if(scrTop >800){
    	       setTimeout(function ()
    			{
    			   $("#scroll-box2-img").animate({bottom:0},"slow").fadeIn("5000");
    			}, 100);
    	         setTimeout(function ()
    			{
    			    $(".hand-VR-content").animate({left:0},"slow").fadeIn("1000");
    			}, 200);
    	      
    	} 
    //解决页面第三屏动画效果
    if (scrTop >1600) { 
           $("#scroll-box3").animate({left:250},"slow").fadeIn("5000");
    } 
}); 
    var count=0;
    //箭头的显示
	$(".head-slider").hover(function(){
		count++;
		if(count==1){
			return;
		}else{
				  	 $(".pres").stop().animate({
			    			"left": "0"
			    		}, 500);
				  $(".nexts").stop().animate({
			    			"right": "0px"
			    		}, 500)
		}

        	  	
	},function(){
           	  	 $(".pres").stop().animate({
               			"left": "-40px"
               		}, 500);
           	  $(".nexts").stop().animate({
               			"right": "-40px"
               		}, 500)
	})

		//首页banner2的效果动画
	    $(".h-vedio-box").hover(function() {
	    	    $(".h-vedio-box .yinying-bg").fadeOut("slow");
	    		$(".h-vedio-box-title").stop().animate({
	    			"top": "20px"
	    		}, 500)
	    	}, function() {
	    		 $(".h-vedio-box .yinying-bg").fadeIn("slow");
	    		$(".h-vedio-box-title").stop().animate({
	    			"top": "70px"
	    		}, 500)
	    	})
	    	$(".h-vedio-box").hover(function() {
	    		$(".bg_red").stop().animate({
	    			"top": "0%"
	    		}, 1000)
	    	}, function() {
	    		$(".bg_red").stop().animate({
	    			"top": "100%"
	    		}, 1000)
	    	})

	    	$(".h-vedio-box").hover(function() {
	    		$(".text_intro").stop().animate({
	    			"margin-top": "40px"
	    		}, 500)
	    	}, function() {
	    		$(".text_intro").stop().animate({
	    			"margin-top": "0"
	    		}, 500)
	    	})

	    	$(".h-game-box").hover(function() {
	    		$(".new_game").stop().animate({
	    			"top": "20px"
	    		}, 500)
	    	}, function() {
	    		$(".new_game").stop().animate({
	    			"top": "70px"
	    		}, 500)
	    	})

	    	$(".h-game-box").hover(function() {
	    		$(".h-game-box .yinying-bg").fadeOut("slow");
	    		$(".new_down").stop().animate({
	    			"margin-top": "40px"
	    		}, 500)
	    	}, function() {
	    		$(".h-game-box .yinying-bg").fadeIn("slow");
	    		$(".new_down").stop().animate({
	    			"margin-top": "0"
	    		}, 500)
	    	})
	    	
	    	$(".h-game-box").hover(function (){
	    		$(".bg_down").stop().animate({
	    			"top": "0%"
	    		},1000)
	    	},function (){
	    		$(".bg_down").stop().animate({
	    			"top": "100%"
	    		},1000)
	    	})
	
	//二级导航的显示隐藏
	$(".yingjian-zhizao").mouseover(function(){
		$("#hardworkNav-2").show();
	});
	$(".hardworkNav").mouseover(function(){
		$("#hardworkNav-2").show();
	});
	$(".hardworkNav").mouseleave(function(){
		$("#hardworkNav-2").hide();
	});

	$(".yingjian-zhizao").mouseleave(function(){
		$("#hardworkNav-2").hide();
	});
     //首页轮播
	// $(".head-slider").slider({interTime:5000,delayTime:5000});
	// $(".h-year-tab").tab_switch();
	// $(".h-honor-tab").tab_sajax();
	// $(".h-contact-tab").tab_switch();
	// $(".h-teams-list").tab_spic();
	// $(".h-devels-tab").kaTab();
	// $(".h-welfare-tab").joi_slider();
    
    //游戏列表样式切换
      $(".pn-nav li").each(function(index){
      	  $(this).click(function(){ 
      	  $(".pn-nav li a").removeClass("active");
      	  $(".pn-nav li a").eq(index).addClass("active");
      	})
      	});	
	//新闻筛选切换
	$("#news-content-ul li").each(function(index){
		  $(this).click(function(){ 
		  $("#news-content-ul li").removeClass("on-active");
		  $("#news-content-ul li").eq(index).addClass("on-active");
		})
		});
    //筛选条件切换样式
    $(".news-page ul li a").each(function(index){
		  $(this).click(function(){ 
		  $(".news-page ul li a").removeClass("page-onactive");
		  $(".news-page ul li a").eq(index).addClass("page-onactive");
		})
		});
    //视频条件切换
    $("#vedio-ul li a").each(function(index){
		  $(this).click(function(){ 
		  $("#vedio-ul li").removeClass("on-active");
		  $("#vedio-ul li").eq(index).addClass("on-active");
		})
		});
    //视频点击播放
    $('.item-content-imgbox').click(function(){
        article_id = $(this).attr('data-id');
        jiathis_config = {
            url: local_url+"?article_id="+article_id,
        }
	
        // $('#js-jiathis').hide();
        // $('#js-jiathis').html(html);
        // jQuery.getScript("http://v3.jiathis.com/code/jia.js", function(){
         //    setTimeout(function(){
         //        $('#js-jiathis').show();
         //    },100)
		// });
		var url=$(this).attr('data-url');
		var title = $(this).attr('data-title');
         $('#default-player').hide();
         $("#vedios-player").show();
		 $('.js_current_title').html(title);
		 $('#vedios-player').html('<embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="1280" height="720" align="middle" allowscriptaccess="always"flashvars="'+url+'&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash">');
		// $(this).find('embed').attr('flashvars',url);
        //动画效果，平滑滚动回到顶部
       $("body").animate({ scrollTop: 80 });

     });
    $('#pause-box').click(function(){
         $('#default-player').hide();
         $("#vedios-player").show();
         var link_url = $(this).attr('data-url');
         myVideo(link_url)
      });
	// function resultImg(_num){
	// 	var resulturl1=[];
	// 	var resulturl = $(".h-photos-tab .slideBox").eq(_num).find(".sliderBoxImg img");
	// 	$(".h-photos-tab .slideBox").eq(_num).find(".sliderBoxImg img").each(function(){
	// 		resulturl1.push($(this).attr("src"));
	// 	});
	// 	var sBHtml = '<div class="sliderBoxImgs"><ul class="bd">';
	// 	for(var i in resulturl1){
	// 		sBHtml += '<li><img src="'+resulturl1[i]+'" alt=""></li>';
	// 	}
	// 		sBHtml+='</ul><div class="hdhd"><i class="botBtn-1"></i><ul class="hd"></ul><i class="botBtn-2"></i></div></div>';
	// 	$(".h-photos-tab .slideBox").eq(_num).append(sBHtml);
	// 	$($(".h-photos-tab .slideBox").eq(_num)).slide( { mainCell:"ul.bd",titCell:".hdhd ul", effect:"leftLoop",autoPlay:true,autoPage:true,startFun:function(i,c,s){var aa = c*29+38;s.find(".hdhd").width(aa);}});
	// 	var mLeft = $(".h-photos-tab .slideBox").eq(_num).find(".hdhd").width()/2;
	// 	$(".h-photos-tab .slideBox").eq(_num).find(".hdhd").css("margin-left","-"+mLeft+"px");
	// }

 //    $(".h-photos-tab .parBd span").click(function(){
	//     var sBHtmlnum = $(this).index();
	//     $(".h-photos-tab .slideBox").eq(sBHtmlnum).find(".sliderBoxImgs").remove().end().siblings().find(".sliderBoxImgs").remove();
	//     resultImg(sBHtmlnum);
	// 	$(this).addClass("on").siblings().removeClass("on");
	//     $(".h-photos-tab .slideBox").eq(sBHtmlnum).css("z-index","2");
	// });
	// $(".h-photos-tab .parBd span").eq(0).trigger('click');
	//resultImg(0);

	// $url = window.location.href;
	// var $uarr = $url.split("#");
	// if($("html").find("."+$uarr[1]+"").length){
	// 	$("html, body").animate({ scrollTop: $("."+$uarr[1]).offset().top-120+"px" });
	// }



	
});
$("#submit1").click(formValidate);
function formValidate() {
		 // 判断用户名
		 var u_name=$.trim($('input[name="username"]').val()),
		     u_phone=$.trim($('input[name="phone"]').val()),
             u_county=$.trim($('input[name="county"]').val()),
		     u_companyname=$.trim($('input[name="company"]').val());
		     if(u_phone.length!=0){
		     var RegExp = /[a-zA-Z\u4e00-\u9fa5]/;
		         console.log(RegExp.test(u_phone));
		         if(RegExp.test(u_phone)){ 
					alert("不是正确的手机号或座机号"); 
					return false;
				}
		     }else{
		     	alert("手机号不能为空"); 
				return false;
		     }
		     
		 if(u_name.length == 0) {
			alert("姓名不能为空");
			$('input[name="username"]').focus();
			return false;
		 }
		 if (u_county.length == 0) {
             alert("地区不能为空");
             $('input[name="county"]').focus();
             return false;
		 }
		 // if(u_phone.length!=0){
		 // 	console.log(u_phone);
		 // 	 if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(u_phone))){ 
			// 	alert("不是完整的11位手机号或者正确的手机号前七位"); 
			// 	return false;
		 // 	}

		 // }
		 if(u_companyname.length==0){
		 	alert("公司名不能为空");
			$('input[name="username"]').focus();
			return false;
		 }
		 return true;		 
}