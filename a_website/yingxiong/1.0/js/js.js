$(function(){
//更多游戏下拉            
	$(".more_game").click(function(){
		$(".more_games").slideToggle();
	})
	$(".game_slide").mouseleave(function(){
		$(".more_games").slideUp();
	})
	$(".in_tab").tab_switch();
    $(".in_btn").click(function(){
    	var text=$(this).find("a").text();
    	if(text=='点击查看更多'){
    		$(this).parent().find(".in_article_more").slideDown()
    		.parents(".in_list").siblings().find(".in_article_more")
    		.slideUp().end().find(".in_btn a").text("点击查看更多");
    		$(this).find("a").text('收起');   		
    	}else{
    		$(this).parent().find(".in_article_more").slideUp();
    		$(this).find("a").text('点击查看更多');
    	}
    })
    
    $(".h_tips").mouseover(function(){
    	$(this).find("p").show()
    })
    $(".h_tips").mouseout(function(){
    	$(this).find("p").hide()
    })
//	$(".pro_left ul li a").click(function(){
//		$(this).find("span").addClass("active").parents().siblings().find("span").removeClass("active");
//	})
	$(".pro_rtop").img_lb();
//	$(".banner").img_lb();
		var $con=$(".banner");
		var cov_length = $con.find("ul li").length;
		var left=1/cov_length*100+'%';
		var index = 0;
		var picTimer;
		var btn = "<div class='buttons'>";
		for (var i = 0; i < cov_length; i++) {
			if(i==0){
				btn+="<span class='on'></span>";
			}else{
				btn+="<span></span>";
			}
		}
		$con.append(btn);
		$con.find(".buttons span").mouseover(function() {
			index = $con.find(".buttons span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseover");
		$(".pres").click(function() {
			index -= 1;
			if (index == -1) {
				index = cov_length - 1;
			}
			showPics(index);
		});
		$(".nexts").click(function() {
			index += 1;
			if (index == cov_length) {
				index = 0;
			}
			showPics(index);
		});
		$con.find("ul").css("width", 100 * (cov_length)+'%');
		$con.find("li").css("width",left);
		$con.hover(function() {
			clearInterval(picTimer);
		}, function() {
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if (index == cov_length) {
					index = 0;
				}
			}, 3000);
		}).trigger("mouseleave");
		function showPics(index) { 
			var nowLeft = -index * 100+'%';
			$con.find("ul").stop(true, false).animate({
				"margin-left": nowLeft
			}, 300);
		    $con.find(".buttons span").removeClass("on").eq(index).addClass("on"); 				
		}
		lrFixFooter(".bottom");	
		function lrFixFooter(obj){
			var footer = $(obj),doc = $(document);
			function fixFooter(){
				if(doc.height()-4 <= $(window).height()){
					footer.css({
						width:"100%",
						position:"absolute",
						left:0,
						bottom:0	
					})
				}else{
					footer.css({
						position:"static"
					})
				}
			}
			fixFooter();
			$(window).on('resize.footer', function(){
				fixFooter();
			})
			$(window).on('scroll.footer',function(){
				fixFooter();
			})	
		}
		//返回顶部
 	var offset = 300,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.cd-top');
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 
		 	}, scroll_top_duration
		);
	});
	$(".h_left ul .js_c .js_a").click(function(){
		if($(this).next('.sub-menu').is(':visible')){
			$(this).addClass('dot');
			$(this).next('.sub-menu').slideUp();	
		}else{
			$(this).next('.sub-menu').slideDown();
			$(this).removeClass('dot');	
		}
	});
	function init(){
           var top,left;
           $(".scroll-box").css({"position":"static"}).prependTo($(".sub"));
           top = $(".scroll-box").offset().top;
           left = $(".scroll-box").offset().left;
           var topTo = $(window).scrollTop();
           if((topTo+20) >= top){
               $(".scroll-box").css({"top":"20px","left":left+"px","position":"fixed"});
           }else{
               $(".scroll-box").css({"top":0,"left":left+"px","position":"static"});
           }
		   var maxindex=parseInt($(window).height()/39);
		   var size=$(".siteNav li").size();
           $(".e_right").find("a[flag='position']").each(function(){
               var _a = $(this);
               var _atop = _a.offset().top;
               var _name;
			   var _index;
               if((topTo+$(window).height()/3) >= _atop){
                   _index=_a.parent().index();
				   if(_index>maxindex-13&&size>maxindex+2) $(".scroll-box").css("top",(_index-maxindex+13)*-39+20+"px");
				   else $(".scroll-box").css("top","20px");
				   _name = _a.attr("name");
                   $(".siteNav").find("a[href='#"+_name+"']").parent().addClass("cur").siblings().removeClass("cur");
               }
               if(topTo == 0){
                   $(".siteNav").find("li[flag='all']").addClass("cur").siblings().removeClass("cur");
               }
           });
       }
       init();
       $(window).resize(function(){
           init();
       });
       $(window).scroll(function(){
           init();
       });
       $(".siteNav").find("a").click(function(){
           $(this).parent().addClass("cur").siblings().removeClass("cur");
       });
})
