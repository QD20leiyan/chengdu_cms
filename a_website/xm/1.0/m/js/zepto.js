function unitPicBox(sid,width,height){
			var cW=document.querySelector("body").clientWidth;
			var tH=height/width*cW;
			$("."+sid).height(tH);
			var liW = cW *1;
			$(".image_ul img").width(liW); //轮播图大小
			$(".image_ul li").width(cW);
		}
		unitPicBox("image_ul",640,375);
		TouchSlide({ 
					slideCell:"#Roll",
					titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
					mainCell:".bd ul", 
					effect:"leftLoop", 
					autoPage:true,//自动分页
					autoPlay:true //自动播放
				});

		$(function(){
		
			$(".closepage").on('touchstart',function(){
				
				$(".pagecon").remove();
			});
			$(".btn_share").on('touchstart',function(){
				if($(".m_share2").hasClass('fh')){
					$(".m_share2").removeClass('fh');
				}else{
					$(".m_share2").addClass('fh');
				}
			});
			$(".link01").on('touchstart',function(){
				$(".main01_nav").show();
			});
			$(".closevideo").on('touchstart',function(){
				$("#videocon").hide();
			});
			$(".wclose").on('touchstart',function(){
		 		$(this).parent(".main01_nav").hide();
		 	})
			$(".nav_slide").on('touchstart',function(){
		 		$(this).next(".nav_slides").slideToggle();
		 	})
			$(".ico_wx").on('touchstart',function(){
		 		$(".wx_ewm").toggle();
		 	})
		})