function unitPicBox(sid,width,height){
			var cW=document.querySelector("body").clientWidth;
			var tH=height/width*cW;
			$("."+sid).height(tH);
			var liW = cW *1;
			$(".activity_ul img").width(liW); //轮播图大小
			$(".activity_ul li").width(cW);
		}
		//unitPicBox("activity_ul",600,386);
		TouchSlide({ 
					slideCell:"#activityRoll",
					titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
					mainCell:".bd ul", 
					effect:"leftLoop", 
					autoPage:true,//自动分页
					autoPlay:true, //自动播放
					endFun:function(i,c){
						$(".video_play_btn").attr('rel',$(".bd img").eq(i).attr('rel'));
                        $(".video_play_btn").attr('data-url',$(".bd img").eq(i).attr('rel'));
					}
				});

