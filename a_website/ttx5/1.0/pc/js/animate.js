$(function () {
            var tab_main = $('#tab_main');
            var list = $('#list');
            var buttons = $('#buttons span');
            var prev = $('#prev');
            var next = $('#next');
            var index = 1;
            var len = 4;
            var interval = 3000;
            var timer;
            function animate (offset) {
                var left = parseInt(list.css('left')) + offset;
                if (offset>0) {
                    offset = '+=' + offset;
                }
                else {
                    offset = '-=' + Math.abs(offset);
                }
                list.animate({'left': offset}, 300, function () {
                    if(left > -451){
                        list.css('left', -451 * len);
                    }
                    if(left < (-451 * len)) {
                        list.css('left', -451);
                    }
                });
                
            }
            function showButton() {
                buttons.eq(index-1).addClass('on').siblings().removeClass('on');
            }
            function play() {
                timer = setTimeout(function () {
                    next.trigger('click');
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }
            next.bind('click', function () {
                /*if (list.is(':animated')) {
                    return;
                }*/
                if (index == 4) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-451);
                showButton();
            });
            prev.bind('click', function () {
                /*if (list.is(':animated')) {
                    return;
                }*/
                if (index == 1) {
                    index = 4;
                }
                else {
                    index -= 1;
                }
                animate(451);
                showButton();
            });
            buttons.each(function () {
                 $(this).bind('click', function () {
                     if (list.is(':animated') || $(this).attr('class')=='on') {
                         return;
                     }
                     var myIndex = parseInt($(this).attr('index'));
                     var offset = -451 * (myIndex - index);

                     animate(offset);
                     index = myIndex;
                     showButton();
                 })
            });
            tab_main.hover(stop, play);

            play();
    		$('.gift a').on('click',function(){
    			$(".gift_box").toggle();
    		})      
    $(".video").click(function(){
 		$("#video_mask").show();
 	})
 	$("#close").click(function(){
 		$("#video_mask").hide();
 	})   
 	$(".bot_btn01hover").mouseover(function(){
 		
 	})
 	//subject页面上下效果
 var sHeight = $(".sv_main").height();
			var cov_length = $(".sv_main ul li").length;
			var index = 0;
			var picTimer;			
			//上一页按钮 
			$(".sub_up").click(function() {
				index -= 1;
				if (index == -1) {
					index = cov_length - 3;
				}
				showPics(index);
			});
			//下一页按钮 
			$(".sub_down").click(function() {
				index += 1;
				if (index == cov_length-2) {
					index = 0;
				}
				showPics(index);
			}); 
			$(".sv_maintent").css("height", sHeight * (cov_length));			
			$(".sv_main").hover(function() {
				clearInterval(picTimer);
			}, function() {
				picTimer = setInterval(function() {
					showPics(index);
					index++;
					if (index == cov_length-2) {
						index = 0;
					}
				}, 2000);
			}).trigger("mouseleave");
			function showPics(index) {
				var nowLeft = -index * sHeight/5; 
				$(".sv_main ul").stop(true, false).animate({
					"top": nowLeft
				}, 300);			
			}
});
