
$(function(){
	//当导航条的固定
	$(window).scroll(function(){
    if($(window).scrollTop()>100){
    	$(".topLogo").hide();
    	$(".sales-tel,.language").hide();
    	$("#topBar").addClass("h-fix");
    	$(".topBox,.topBar,.topSlide,.on,.navbar").css({"height":"50"});
        $(".topBoxlist").css({"height":"50","float":"left"});
        $(".suspend-height").addClass("suspend");  
    }
    else{
        $(".topLogo").show();
        $(".sales-tel,.language").show();
        $("#topBar").removeClass("h-fix");
        $(".topBox,.topBar,.topSlide,.on,.navbar").css({"height":"100"});
        $(".topBoxlist").css({"height":"100","float":"right"});
        $(".suspend-height").removeClass("suspend");
    }
}); var count=0;
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
	$(".head-slider").slider({interTime:5000,delayTime:5000});
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
		var url=$(this).attr('data-url');
		var title = $(this).attr('data-title');
         $('#default-player').hide();
         $("#vedios-player").show();
		 $('.js_current_title').html(title);
		 $(this).find('embed').attr('flashvars',url);
        //动画效果，平滑滚动回到顶部
       $("body").animate({ scrollTop: 80 });

     });
    $('#pause-box').click(function(){
         $('#default-player').hide();
         $("#vedios-player").show();
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



	// var _NavAy = [];
	// $(".menuNav.on a[data-scroll-nav]").each(function(e,i){
	// 	var s=$(i),
	// 	r=s.attr("data-scroll-nav");
	// 	a=$("[data-scroll-index="+r+"]"),
	// 	c=a.offset().top,
	// 	l=c+a.outerHeight();
	// 	_NavAy.push({s:r,t:c,b:l,i:s,el:a}),
	// 	s.on("click",function(e){
	// 		var $n = $(e.target).attr("data-scroll-nav"),
	// 		$a=$("[data-scroll-index="+$n+"]"),
	// 		$c=$a.offset().top-100;
	// 		n = $(window).scrollTop();
	// 		$("html,body").stop().animate({ scrollTop:$c+"px" },300);
	// 		$(e.target).addClass("active").siblings().removeClass("active");
	// 	})
	// });

	// $(window).on("scroll",function(){
	// 	e=$(window).scrollTop()-100;
	// 	h=$(window).height();
	// 	for(var i in _NavAy){
	// 		var a=parseInt(i);
	// 		if((_NavAy[a].t-h/2)<e){
	// 			var ab = a;
	// 		}
	// 	}
	// 	$("html,body").is(":animated")?"":$("[data-scroll-nav='"+ab+"']").addClass("active").siblings().removeClass("active");
	// }).scroll();

	
});
 // 验证函数
	 function formValidate() {
		 // 判断用户名
		 var u_name=$.trim($('input[name="username"]').val()),
		     u_phone=$.trim($('input[name="phone"]').val()),
		     u_companyname=$.trim($('input[name="company"]').val());
		 if(u_name.length == 0) {
			alert("姓名不能为空");
			$('input[name="username"]').focus();
			return false;
		 }
		 if(u_phone.length!=0){
		 	 if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(u_phone))){ 
				alert("不是完整的11位手机号或者正确的手机号前七位"); 
				return false;
		 	}

		 }
		 if(u_companyname.length==0){
		 	alert("公司名不能为空");
			$('input[name="username"]').focus();
			return false;
		 }
		 return true;		 
}
