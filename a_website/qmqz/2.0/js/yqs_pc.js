//图片轮播    
$.fn.tab_lb=function(){
	return this.each(function(){
		var $con=$(this);//包裹按钮和轮播的图片元素
		var sWidth = $con.width();
		var cov_length = $con.find("ul li").length;
		var index = 0;
		var picTimer;



			$(this).find(".yqs_leftnext span").mouseover(function(){
				var s_index=$(this).index();//获取当前划过元素的index值
				//alert(index);
				showPics(s_index);
			index = s_index;
			}).eq(0).trigger("mouseover");



		$(".pre").click(function() {
			index -= 1;
			if (index == -1) {
				index = cov_length - 1;
			}
			showPics(index);
		});
		$(".next").click(function() {
			index += 1;
			if (index == cov_length) {
				index = 0;
			}
			showPics(index);
		});
		$con.find("ul").css("width", sWidth * (cov_length));
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
			var nowLeft = -index * sWidth;
			$con.find("ul").stop(true, false).animate({
				"left": nowLeft
			}, 300);
		    $con.find(".buttons span").removeClass("on").eq(index).addClass("on"); 	
		     $con.find(".yqs_leftnext span").removeClass("on").eq(index).addClass("on"); 			
		}
	})
}
		jQuery.fn.floatadv = function(loaded) {
			var obj = this;
			body_height = parseInt($(window).height());
			block_height = parseInt(obj.height());	
			top_position = parseInt((body_height) -100 + $(window).scrollTop());
			if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };	
			if(!loaded) {
				obj.css({'position': 'absolute'});
				obj.css({ 'top': top_position });
				$(window).bind('resize', function() { 
					obj.floatadv(!loaded);
				});
				$(window).bind('scroll', function() { 
					obj.floatadv(!loaded);
				});
			} else {
				obj.stop();
				obj.css({'position': 'absolute'});
				obj.animate({ 'top': top_position }, 300, 'linear');
			}
		}
		//图片轮播    
$.fn.img_lb1=function(){
	return this.each(function(){
		var $con=$(this);//包裹按钮和轮播的图片元素
		var sWidth = $con.width();
		var cov_length = $con.find("ul li").length;
		var index = 0;
		var picTimer;
		var btn = "<div class='yqs_buttons'>";
		for (var i = 0; i < cov_length; i++) {
			if(i==0){
				btn+="<span class='on'></span>";
			}else{
				btn+="<span></span>";
			}
		}
		$con.append(btn);
		$con.find(".yqs_buttons span").mouseover(function() {
			index = $con.find(".yqs_buttons span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseover");
		$(".pre").click(function() {
			index -= 1;
			if (index == -1) {
				index = cov_length - 1;
			}
			showPics(index);
		});
		$(".next").click(function() {
			index += 1;
			if (index == cov_length) {
				index = 0;
			}
			showPics(index);
		});
		$con.find("ul").css("width", sWidth * (cov_length));
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
			var nowLeft = -index * sWidth;
			$con.find("ul").stop(true, false).animate({
				"left": nowLeft
			}, 300);
		    $con.find(".yqs_buttons span").removeClass("on").eq(index).addClass("on"); 				
		}
	})
}
$(function(){

			$(".yqs_main02_4").tab_lb();
			$(".yqs_con01").img_lb1();
			$("#yqstop").floatadv();
			//返回顶部
			 	var offset = 300,
					offset_opacity = 1200,
					scroll_top_duration = 700,
					$back_to_top = $('.yqstop');
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


		})	

		