//轮播图渐隐效果
$.fn.img_fade=function(){
	return this.each(function(){
		var timer;
		var index=0;
		var $img_fade=$(this);
		var len=$img_fade.find("ul li").length;
		var btn="<div class='buttons'>";
		for( var i=0;i<len;i++){
			if(i==0){
				btn+="<span class='on'></span>";
			}else{
				btn+="<span></span>";
			}			
		}
		$img_fade.append(btn);
		function autoPlay(){
		  if(index==len-1){
				index=0;
			}else{
				index++;
			}
		$(".buttons span").eq(index).addClass("on").siblings().removeClass("on");
		$img_fade.find("ul li").eq(index).fadeIn(500).siblings().hide();
		}
		$(".buttons span").mouseover(function(){
			var myindex=$(this).index();
			$img_fade.find("ul li").eq(myindex).fadeIn(500).siblings().hide();
			$(this).addClass("on").siblings().removeClass("on");
			index=myindex;
		})
		$img_fade.mouseover(function(){
			clearTimeout(timer);
		})
		$img_fade.mouseout(function(){
			timer=setInterval(autoPlay,3000);
		})
		timer=setInterval(autoPlay,3000);		
	  })
	}
