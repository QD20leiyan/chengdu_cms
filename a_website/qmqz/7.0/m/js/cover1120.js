        var login_url='/site/get-user-info-relation.html';//判断用户是否登录
		var login_url1='/site/relation-phone.html';//登录预约
		var verify_url='/common/get-login-verify.html';//登录发送验证码
		var out_url='/site/logout-relation.html';//注销登录
		var srf = $('meta[name="csrf-token"]').attr('content');
		var is_focus=0;//input获取事件焦点
		var num_url="/common/get-yuyue-count.html"//登录预约人数
		//图片验证码刷新
		var imgMarkIndex=1;
		var yy_num_peo="";
		var newNumber=0;
		function load_captcha(){
			imgMarkIndex++;
			var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
			$.get(imgUrl, {}, function(data) {
				$(".co_captcha").html(data.msg);
			}, 'json');
		}
		//图片验证码刷新
		$(".co_captcha").click(function(){
			load_captcha();
			is_focus=2;
		});
		// 点击登录
		$(".login_u").click(function(){
			fgw_yy_wap();
			$(".tc_login").addClass("active");

		})
		$(".sure_login").click(function(){
			get_login();
		})
		$(".sure_info").click(function(){
			$(".tc_info").removeClass("active");
		})
		$(".co_imgtxt").click(function(){
			var my_phone = $(".co_username").val();
			var my_gameid = $(".co_gameid").val();
			if(my_gameid == "" || my_gameid == undefined) {
				alert("游戏账号不能为空哦");
				return;
			}
			if(my_phone == "" || my_phone == undefined) {
				alert("手机号码不能为空哦");
				return;
			}else if(my_phone.length != 11){
				alert("手机号码不正确哦");
				return;
			}
			load_captcha();
		});
		//注销登录
		$(".username a").click(function(){
			$.ajax({
				'url':out_url,
				'data':{},
				'type':'GET',
				'dataType':'Json',
				success:function(data){
					if(data.status==0){
						$(".tc_info p").html("注销成功");
						$(".tc_info").addClass("active");
						$(".username").removeClass("active");
						$(".login_u").addClass("active");
					}else{
						$(".tc_info p").html(data.msg);
						$(".tc_info").addClass("active");
					}
				}
			});
		});
		//登录获取验证码
		$(".co_codebtn1").click(function(){
			var my_phone = $(".co_username").val();
			var my_gameid = $(".co_gameid").val();
			var captcha =  $(".captcha").val();
			if(my_gameid == "" || my_gameid == undefined) {
				alert("游戏账号不能为空哦");
				return;
			}
			if(my_phone == "" || my_phone == undefined) {
				alert("手机号码不能为空哦");
				return;
			}else if(my_phone.length != 11){
				alert("手机号码不正确哦");
				return;
			}
			if(captcha == "" || captcha == undefined) {
				alert("验证码不能为空哦");
				return;
			}
			$.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
				if(data.status == 0){
					$(".co_codebtn1").css("pointer-events","none");
					page_djs($(".co_codebtn1"),function(){
						$(".co_codebtn1").css("pointer-events","auto");
					});
				}else{
					$(".tc_info p").html(data.msg);
					$(".tc_info").addClass("active");
					load_captcha();
				}
			}, 'json');
		});
		//图片验证码焦点获取显示验证码
		$(".inp-box input").focus(function(){
			is_focus++;
			if(is_focus==1){
				load_captcha();
			}
		});
		//倒计时
		function page_djs(ele, callback) {
			var time = 60;
			if(ele) {
				ele.html("60s");
			}
			djs_timer = setInterval(function() {
				time--;
				ele.html((time<=0?0:time) + "s");
				if(time == 0) {
					clearInterval(djs_timer);
					ele.html("获取验证码");
					if(callback) {
						callback();
					}
				}
			}, 1000);
		}
		//处理预约人数
		function getPercent(number) {
			var percent = parseFloat((parseInt(number) / 1000).toFixed(2));
			percent = percent > 100 ? 94 : percent;
			return percent;
		};
		function getPercent2(number) {
			var percent2 = parseFloat((parseInt(number) / 1000).toFixed(2));
			percent2 = percent2 > 100 ? 100 : percent2;
			return percent2;
		};
		function num_tot() {
			newNumber = parseInt(yy_num_peo);
			var num_yy=getPercent2(newNumber);
			$('.jdt').css({
				'width': getPercent(newNumber) + '%'
			});
			$(".jdt_box p span").html(num_yy);
	    }
		//登录请求
		function get_login(){
			var my_phone = $(".co_username").val();
			var co_codenum1 =  $(".co_codenum1").val();
			var my_gameid = $(".co_gameid").val();
			if(my_gameid == "" || my_gameid == undefined) {
				alert("游戏账号不能为空哦");
				return;
			}
			if(my_phone == "" || my_phone == undefined) {
				alert("手机号码不能为空哦");
				return;
			}else if(my_phone.length != 11){
				alert("手机号码不正确哦");
				return;
			}
			if(co_codenum1 == "" || co_codenum1 == undefined) {
				alert("验证码不能为空哦");
				return;
			}
			$.ajax({
				'url':login_url1,
				'data':{'phone':my_phone,'yzm':co_codenum1,'zh':my_gameid,"cms_csrf":srf },
				'type':'POST',
				'dataType':'Json',
				success:function(data){
					if(data.status==0){
						fgw_yy_wap_success();
						$(".tc_login").removeClass("active");
						$(".tc_info p").html(data.msg);
						$(".tc_info").addClass("active");
						$(".username span").html(my_phone);
						$(".login_u").removeClass("active");
						$(".username").addClass("active");
					}else if(data.status==4){
						$(".tc_login").removeClass("active");
						$(".tc_info p").html(data.msg);
						$(".tc_info").addClass("active");
						$(".username span").html(my_phone);
						$(".login_u").removeClass("active");
						$(".username").addClass("active");
					}
					else{
						$(".tc_login").removeClass("active");
						$(".tc_info p").html(data.msg);
						$(".tc_info").addClass("active");
					}
				}
			});
		}
		//判断用户是否登录
		function is_login(){
			$.ajax({
				'url':login_url,
				'data':{},
				'type':'GET',
				'dataType':'Json',
				success:function(data){
					if(data.status==0){
						$(".username span").html(my_phone);
						$(".login_u").removeClass("active");
						$(".username").addClass("active");
					}
				}
			});
		}
		function ajaxInit() {
			$.post(num_url, {
				'name': 'ca_total',
				"cms_csrf":srf
			}, function(data) {
					if(data.msg == 'null' || data.msg == null) {
						data.msg = 0;
					}
				   yy_num_peo=String(data.msg);
				   num_tot();
				
			}, "json");
		};
		 $(".part2 .gift_box li").click(function(){
	   		var index=$(this).index();
	   		$(this).addClass("active").siblings().removeClass("active");
	   		$(".select_con .info").eq(index).addClass("active").siblings(".select_con .info").removeClass("active");
	       });
		 $(function(){
		 	wap_cover();
		 	is_login();
		    ajaxInit();
		  var swiper2= new Swiper('.swiper-container2',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination21',
                paginationClickable: true,
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                autoplay:3000,
                autoplayDisableOnInteraction : false,
                speed:800,
                slideToClickedSlide: true,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
		  $(".close").click(function(){
		  	$(this).parent().parent().removeClass("active");
		  })

		 })