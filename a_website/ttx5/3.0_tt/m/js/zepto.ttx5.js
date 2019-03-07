function unitPicBox(sid,width,height){
			var cW=document.querySelector("body").clientWidth;
			var tH=height/width*cW;
			$("."+sid).height(tH);
			var liW = cW *1;
			$(".activity_ul img").width(liW); //轮播图大小
			$(".activity_ul li").width(cW);
		}
		unitPicBox("activity_ul",640,427);
		TouchSlide({ 
					slideCell:"#activityRoll",
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
			
			//	视频播放弹层	
			$("#mkv7-vedio").on('touchstart',function(){
				$("#videocon").show();
			});
			$(".closevideo").on('touchstart',function(){
				$("#videocon").hide();
			});
			$(".btn_down").click(function(){
				$(".main01_nav").toggle();
			})
			$(".wclose").click(function(){
				$(".main01_nav").hide();
			})
			$(".week_close").on('touchstart',function(){
				$(".weekcon").hide();
				 $("table tbody").html('');
			});
		})