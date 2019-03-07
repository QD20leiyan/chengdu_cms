(function($){
	$.fn.animateProgress = function(progress, duration, callback) {
		return this.each(function() {
			$(this).animate({
				height: progress + '%'
			}, {
				duration: duration,
				easing: 'swing',
				step: function(progress){
					$(".openLoading p").html(Math.round(progress)+"%");
				},
				complete: function(scope, i, elem) {
					if (callback) {
						callback.call(this, i, elem );
					};
				}
			});
		});
	};
})(jQuery);


$(function(){
	//附加时间
	var additionalTime = 0;
	$('.kj').click(function(){
		additionalTime= additionalTime-500;
		console.log(additionalTime);
	})
	
	
	//发消息声音
	var send_audio =document.getElementById('send_audio');
	// $('#loadPlay').animateProgress(100, 1200, function() {});
	window.onload = function () {
		// var numberbtn=$('.cover_bottom i');
		// FastClick.attach(numberbtn);
		///////////////////////////////////////////
		$('.cover_bottom i').click(function(){
		var resultNum= $(this).html();
		var flagStr = '';
		$('.cover_tit i').each(function(index, element) {
            if($(this).html()==''){
				$(this).html(resultNum);
				return false;
			}
        });
		
		$('.cover_tit i').each(function(index, element) {
			flagStr+=$(this).html();
        });
		
		if(flagStr=='0419'){
			setTimeout(function(){
				$('.openLoading').hide();
				$('#p-chat').show();
				chatList();
				$('.cover').hide();
			},500);
		}
	})
	
	$('.num_last').click(function(){
		for(var i=3;i>=0;i--){
			if($('.cover_tit i').eq(i).html()!=''){
				$('.cover_tit i').eq(i).html('');
				return false;
			}
		}
	})
	
	//////////////////////////////////
	
		$('#loadPlay').animateProgress(100, 300, function() {
			var yy_audio =document.getElementById('yy_audio');
			yy_audio.play(); 
			document.addEventListener("WeixinJSBridgeReady", function () {  
			          yy_audio.play(); 
			   }, false);  
			   document.addEventListener('YixinJSBridgeReady', function() {  
			      yy_audio.play();  
			   }, false); 
			$('.openLoading .icon_yao_up').addClass('yao_up');
			$('.openLoading .icon_yao_down').addClass('yao_down');
			setTimeout(function(){
				$('.openLoading').hide();
				 // yy_audio.pause();
			},1200);
		});
	};

	$('#p-quan .user img,#p-chat .list li.user > img').attr('src',userPhoto);
	$('#p-quan .user span').html(userName);
	
	function chatList(){
		var l = $('#p-chat .list li').size();
		var i=0,t=null;
		function f(){
			var curr = $('#p-chat .list li').eq(i);
			if(i<l){
				
				$('#p-chat .scroll').scrollTop($('#p-chat .scroll')[0].scrollHeight);
				i++;
				t = setTimeout(function(){f()},curr.attr('delay')*1000 + additionalTime || 3000 + additionalTime);
				send_audio.play();
				document.addEventListener("WeixinJSBridgeReady", function () {
					send_audio.play();
				}, false);
				if(curr.attr('class')!='user' && curr.attr('tip')!='na'){
					//send_audio.currentTime=0.2;
					//send_audio.play();
					curr.show();
					$('#p-chat .scroll').scrollTop($('#p-chat .scroll')[0].scrollHeight);
					$('.bar s').hide()
				}else if(curr.attr('class')=='user'){
					$('.bar').css({'background':'url(images/chat_bar2.jpg)','background-size': '100% auto'});
					clearInterval(t);
					$('.bar input').val(curr.attr('cont'));
					$('.bar s').show()
					$('.bar').bind('click',function(){
						$('.bar').css({'background':'url(images/chat_bar.jpg)','background-size': '100% auto'});
						$('.bar input').val('');
						$('.bar').unbind('click');
						$('.bar s').hide();
						//重新启动
						/////////
						curr.show();
						
						$('#p-chat .scroll').scrollTop($('#p-chat .scroll')[0].scrollHeight);
						t = setTimeout(function(){f()},curr.attr('delay')*1000 + additionalTime || 3000 + additionalTime);
						////////////////
					})
				}
			}
			if(i>=l){
				clearInterval(t);
			}
		}
		f();
		//var t = setInterval(function(){f()},200);
	}

	function chatList2(){
		var l = $('#p-chat .list li').size();
		var i=$('#p-chat .list li').size()-4,t=null;
		function f(){
			if(i<l){
				var curr = $('#p-chat .list li').eq(i);
				if(curr.attr('class')!='user' && curr.attr('tip')!='na'){
					send_audio.currentTime=0.2;
					send_audio.play();
				}
				
				curr.show();
				$('#p-chat .scroll').scrollTop($('#p-chat .scroll')[0].scrollHeight);
				i++;
				t = setTimeout(function(){f()},curr.attr('delay')*1000 + additionalTime || 2000 + additionalTime);
			}
			if(i>=l){
				clearInterval(t);
			}
		}
		f();
		
	}
	
	function quanList(){
		var quan_id=0,flag = false;var l = $('#p-quan .list li').size(),timer=timer1=timer2=null;
		function quanAnm(){
			var curr = $('#p-quan .list li').eq(quan_id);
			if( quan_id > l-1){
				$('body,html').animate({scrollTop: $(document).height()}, 500);
				$('.joincomment').show();
				return false;
			}else{
				clearTimeout(timer)
				$('body,html').animate({scrollTop:curr.offset().top-40},500,function(){
					var key = curr.attr('class');
					if(key=='list1'){
						setTimeout(function(){
							curr.find('.zan').show();
						},500)
					}else if(key=='list2'){
						setTimeout(function(){ 
							//curr.find('.photo>img').addClass('anZoomIn');
						}, 1000); 
						setTimeout(function(){ 
							//curr.find('.photo>img').removeClass('anZoomIn');
							(function (){
								var num = 1,timers=null;
								function go(){
									timers = setInterval(function(){
										if(num==21){
											clearInterval(timers);
											return false;
										}else{
											num++;	
										}
									},130)
								}
								go();
							})();
							setTimeout(function(){
								document.getElementById('audio-1').play();
							},2450);
							setTimeout(function(){
								
								$('.p-quan-glass').addClass('sinkIn');
								setTimeout(function(){
									$('.p-quan-glass').removeClass('sinkIn');
									setTimeout(function(){
										curr.find('.zan').show();
										delayList(curr.find('.comment-list p'),curr.find('.comment-list p').size(),1000);
									},1000);
								},2000);
							},2730);
						}, 1000); 
					}else{
						if(key=='list3'){
							setTimeout(function(){
								curr.find('.zan').show();
								delayList(curr.find('.comment-list p'),curr.find('.comment-list p').size(),1500);
							},500)
						}else{
							setTimeout(function(){
								curr.find('.zan').show();
								delayList(curr.find('.comment-list p'),curr.find('.comment-list p').size(),1000);
								$('body,html').animate({scrollTop: $(document).height()}, 500);
							},500)
							if(key=='list6'){
								$('body,html').animate({scrollTop: $(document).height()}, 500);
							}else if(key=='list4'){
								$('.wx_info s').show();	
							}
						}
						
					}
					timer = setTimeout(function(){
						console.log(quan_id);
						quan_id +=1 ;
						quanAnm();
					},curr.attr('delay')*1000 || 3000);
				});
			}
		}
		quanAnm()
	}
	
	function delayList(obj,num,dtime){
		obj.parent().show();
		for(var s=0;s<num;s++){
			(function(s){
				setTimeout(function(){
					obj.eq(s).show();
					console.log(111)
				},s*dtime+dtime);
			})(s)
		}
	}

	//弹出框
	function prompt_show(ele){
		$('<div class="prompt_bg"></div>').appendTo($("body"));
		$(ele).fadeIn();
	}
	//关闭弹出框
	function prompt_hide(ele){
		$('.prompt_bg').remove();
		$(ele).fadeOut();
	}

	$('.redpacket').on('click',function(){
		prompt_show('#prompt_red_envelopes');
	});
	$('.close').on('click',function(){
		var id = $(this).closest('.prompt').attr('id');
		prompt_hide('#'+id);
	});

	$('#prompt_red_envelopes .btn').on('click',function(){
		$(this).parent().hide();
		$('.prompt_bg').remove();
		$('#see_red_envelopes').fadeIn();
	});

	$('#see_red_envelopes .close').on('click',function(){
		chatList2();
	});
	
	//弹框二维码
	$('.btnShowm').on('click',function(){
		prompt_show('#prompt_red_envelopes_ewm');
	});
	
	$('.joincomment').on('click',function(){
		$('.pop_mask').show()	
		$('.pop').show();
	})
	$('.close_pop').on('click',function(){
		$('.pop_mask').hide()	
		$('.pop').hide()	
	})
})