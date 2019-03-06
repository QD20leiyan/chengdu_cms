var today_draw_count = 0;
$(function() {
	var mySwiper = new Swiper(".l_banner", {
		loop: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
	});
	//判断是否是微信打开浏览器
	function is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	}

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
		var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
		if(result != null) {
			return decodeURIComponent(result[2]);
		} else {
			return null;
		}
	}
	var person = {
		isLogin: false,
		type: "ios",
		friend_invite_code: getQueryString('invite_code'),
		cms_csrf: $("meta[name='csrf-token']").attr("content")
	};
	var countdown = 60;

	function sendemail() {
		var obj = $("#getMarkBtn");
		settime(obj);
	}
	$('.close').click(function() {
		$(this).parent('.dialog').parent('.mask').hide();
	})
	$('.yueGiftBox1').mouseenter(function(e) {
		//  	$("html,body").animate({
		//          scrollTop: 700
		//      }, 500);
		$('.giftDialog1').stop().show(300);
	})
	$('.yueGiftBox1').mouseleave(function(e) {
		$('.giftDialog1').stop().hide(300);
	})
	$('.yueGiftBox2').mouseenter(function(e) {
		//  	$("html,body").animate({
		//          scrollTop: 700
		//      }, 500);
		$('.giftDialog2').stop().show(300);
	})
	$('.yueGiftBox2').mouseleave(function(e) {
		$('.giftDialog2').stop().hide(300);
	})
	$('.yueGiftBox3').mouseenter(function(e) {
		//  	$("html,body").animate({
		//          scrollTop: 700
		//      }, 500);
		$('.giftDialog3').stop().show(300);
	})
	$('.yueGiftBox3').mouseleave(function(e) {
		$('.giftDialog3').stop().hide(300);
	})
	$('.yueGiftBox4').mouseenter(function(e) {
		//  	$("html,body").animate({
		//          scrollTop: 700
		//      }, 500);
		$('.giftDialog4').stop().show(300);
	})
	$('.yueGiftBox4').mouseleave(function(e) {
		$('.giftDialog4').stop().hide(300);
	})
	$('.yueGiftBox5').mouseenter(function(e) {
		//  	$("html,body").animate({
		//          scrollTop: 700
		//      }, 500);
		$('.giftDialog5').stop().show(300);
	})
	$('.yueGiftBox5').mouseleave(function(e) {
		$('.giftDialog5').stop().hide(300);
	})
	$('.zhaohuBox').mouseenter(function() {
		//  	$("html,body").animate({
		//          scrollTop: 1200
		//      }, 500);
		$(this).children('.yaoGiftBox').stop().show(300);
	})
	$('.zhaohuBox').mouseleave(function() {
		$(this).children('.yaoGiftBox').stop().hide(300);
	})
	$('body').click(function(e) {
		if(e.target == $('.guize').find('img')[0]) {
			$('.guize_rule').toggle(500);
			return;
		}
		$('.guize_rule').hide(500);
	})
	$('.float ul').find('li').click(function() {
		var parent = $(this).parent();
		if($(this).attr('data-index') == 1) {
			$("html,body").animate({
				scrollTop: 0
			}, 500);
		} else if($(this).attr('data-index') == 2) {
			$("html,body").animate({
				scrollTop: 900
			}, 500);
		} else if($(this).attr('data-index') == 3) {
			$("html,body").animate({
				scrollTop: 1900
			}, 500);
		} else if($(this).attr('data-index') == 4) {
			$("html,body").animate({
				scrollTop: 2800
			}, 500);
		} else {
			$("html,body").animate({
				scrollTop: 3800
			}, 500);
		}
	})
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if(scroll < 900) {
			$('.float ul').find('li').removeClass('active');
			$('.float ul').find("li[data-index='1']").addClass('active');
		} else if(scroll >= 900 && scroll < 1900) {
			$('.float ul').find('li').removeClass('active');
			$('.float ul').find("li[data-index='2']").addClass('active');
		} else if(scroll >= 1900 && scroll < 2800) {
			$('.float ul').find('li').removeClass('active');
			$('.float ul').find("li[data-index='3']").addClass('active');
		} else if(scroll >= 2800 && scroll < 3800) {
			$('.float ul').find('li').removeClass('active');
			$('.float ul').find("li[data-index='4']").addClass('active');
		} else {
			$('.float ul').find('li').removeClass('active');
			$('.float ul').find("li[data-index='5']").addClass('active');
		}

		if(scroll > 0) {
			$(".cont1").css({
				top: "0",
				position: 'fixed',
				zIndex: "999"
			});
			$("#Hero-bar").css({
				zIndex: "98"
			});
		} else {
			$(".cont1").css({
				position: 'relative',
				zIndex: "9"
			});
			$("#Hero-bar").css({
				zIndex: "9999999"
			});
		}
	})
	var rotateTimeOut = function() {
		$('#rotate').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	var bRotate = false;
	var rotateFn = function(awards, angles, txt, num) {
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 1777.5,
			duration: 3000,
			callback: function() {
				person.invite_count--;
				if(num == 0) {
					$('.giftName').text(txt);
					$('.mask').show();
					$('.dialog').hide();
					$('.dialog-materialGift').show();
//					var temp = '<tr><td>转盘:' + txt + '</td><td style="color: rgb(162, 196, 55);">可领取至游戏</td></tr>';
//					$('.dialog-prise').find('tbody').append(temp);
				}
				if(num == 1) {
					$('.giftName2').text(txt);
					$('.mask').show();
					$('.dialog').hide();
					$('.dialog-nullGift').show();
				}
				$('.chance').text(person.invite_count);
				$('.four_p').find('.four_chance').text(person.invite_count);

				bRotate = !bRotate;
			}
		})
	};
	$('.pointer').click(function() {
		if(bRotate) return;
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-information').show();
			return;
		}
		if(person.invite_count > 0) {
			if(today_draw_count <= 5) {
				$.get("/site/ajax-draw.html", {}, function(data) {
					if(data.status == 0) {
						var item = data.gift_id;
						switch(item) {
							case 11:
								rotateFn(1, 45, '金币100', 0);
								break;
							case 10:
								rotateFn(136, 180, '银币1000000', 0);
								break;
							case 14:
								rotateFn(271, 315, '皇冠长耳兔*1', 1);
								break;
							case 16:
								rotateFn(181, 225, '随机时装礼包', 0);
								break;
							case 15:
								rotateFn(91, 135, '100元京东卡', 0);
								break;
							case 12:
								rotateFn(316, 360, 'S侠客碎片*10', 0);
								break;
							case 13:
								rotateFn(226, 270, '金币500', 0);
								break;
						}
					} else {
						alert(data.msg);
						return;
					}
				}, "json");
			} else {
				alert("今日抽奖次数已达到上限");
			}
		} else {
			alert('抽奖次数不足');
		}
	});

	function settime(obj) { //发送验证码倒计时
		if(countdown == 0) {
			obj.attr('disabled', false);
			obj.text("获取验证码");
			countdown = 60;
			return;
		} else {
			obj.attr('disabled', true);
			obj.text("重新发送(" + countdown + ")");
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	};

	//图片验证码
	function tupian() {
		$.get("/site/captcha.html?refresh=1", {}, function(data) {
			$("#captcha-img").attr("src", data.url);
		}, 'json');
	};
	//点击更新图片验证码
	$("#captcha-img").click(function() {
		tupian();
	});
	//登录
	$('.b_denglu').click(function() {
		$('.mask').show();
		$('.dialog').hide();
		$('.dialog-information').show();
	})
	var giftNum = [{
			"id": "10",
			"name": "银币*1000000"
		},
		{
			"id": "11",
			"name": "金币*100"
		},
		{
			"id": "12",
			"name": "S侠客碎片*10"
		},
		{
			"id": "13",
			"name": "金币*500"
		},
		{
			"id": "14",
			"name": "皇冠长耳兔*1"
		},
		{
			"id": "15",
			"name": "100元京东卡"
		},
		{
			"id": "16",
			"name": "随机时装礼包"
		}
	];

	function isLogin() {
		var params = {};
		$.get("/site/ajax-get-user.html",
			function(data) {
				if(data.status == 0) {
					person.isLogin = true;
					person.phone = data.msg.phone; //手机号
					person.me_invite_code = data.msg.me_invite_code; //邀请码
					person.invite_img = data.msg.invite_img; //邀请二维码
					person.share_url = data.msg.share_url; //邀请地址
					person.invite_code = data.msg.invite_code;
					person.invite_num = data.msg.invite_num; //邀请人数
					person.is_yuyue = data.msg.is_yuyue; //是否预约
					person.invite_count = data.msg.invite_count; //抽奖次数
					person.gift_code_id = data.msg.gift_code_id; //已领取的礼包序号
					person.data = data.msg.data; //已领取的礼包序号
					person.today_draw_count = data.msg.today_draw_count;
					bShare.addEntry.url = person.share_url;
					today_draw_count = person.today_draw_count;
					var giftId = data.msg.gift_ids;
					var newArray = [];
					for(var s in giftId) {
						for(var x in giftNum) {
							if(giftId[s] == giftNum[x].id) {
								newArray.push(giftNum[x]);
							}
						}
					}
					var html = "";
					for(var k = 0; k < newArray.length; k++) {
						html += '<li data-id = '+ newArray[k].id+'><span>转盘:' + newArray[k].name + '</span><span style="color: rgb(162, 196, 55);" class="second_span">可领取至游戏</span></li>';
					}
					$(".dialog-prise").find('.table_ul1').html(null).append(html);
					if(person.data[10] == 4){
						$(".table_ul1 li[data-id = '10']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[11] == 4){
						$(".table_ul1 li[data-id = '11']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[12] == 4){
						$(".table_ul1 li[data-id = '12']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[13] == 4){
						$(".table_ul1 li[data-id = '13']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[14] == 4){
						$(".table_ul1 li[data-id = '14']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[15] == 4){
						$(".table_ul1 li[data-id = '15']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[16] == 4){
						$(".table_ul1 li[data-id = '16']").find(".second_span").text("已领取至游戏");
					}
					$('.dialog-prise').find('h4').text(person.phone);
					
					if(person.invite_num == 1) {
						$(".h_person li:nth-child(1)").addClass("active");
					}
					if(person.invite_num == 2) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
					}
					if(person.invite_num == 3) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
					}
					if(person.invite_num == 4) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
					}
					if(person.invite_num == 5) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
						$(".h_person li:nth-child(5)").addClass("active");
					}
					if(person.invite_num == 6) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
						$(".h_person li:nth-child(5)").addClass("active");
						$(".h_person li:nth-child(6)").addClass("active");
					}
					if(person.invite_num == 7) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
						$(".h_person li:nth-child(5)").addClass("active");
						$(".h_person li:nth-child(6)").addClass("active");
						$(".h_person li:nth-child(7)").addClass("active");
					}
					if(person.invite_num == 8) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
						$(".h_person li:nth-child(5)").addClass("active");
						$(".h_person li:nth-child(6)").addClass("active");
						$(".h_person li:nth-child(7)").addClass("active");
						$(".h_person li:nth-child(8)").addClass("active");
					}
					if(person.invite_num == 9) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
						$(".h_person li:nth-child(5)").addClass("active");
						$(".h_person li:nth-child(6)").addClass("active");
						$(".h_person li:nth-child(7)").addClass("active");
						$(".h_person li:nth-child(8)").addClass("active");
						$(".h_person li:nth-child(9)").addClass("active");
					}
					if(person.invite_num == 10) {
						$(".h_person li:nth-child(1)").addClass("active");
						$(".h_person li:nth-child(2)").addClass("active");
						$(".h_person li:nth-child(3)").addClass("active");
						$(".h_person li:nth-child(4)").addClass("active");
						$(".h_person li:nth-child(5)").addClass("active");
						$(".h_person li:nth-child(6)").addClass("active");
						$(".h_person li:nth-child(7)").addClass("active");
						$(".h_person li:nth-child(8)").addClass("active");
						$(".h_person li:nth-child(9)").addClass("active");
						$(".h_person li:nth-child(10)").addClass("active");
					}
					
					if(person.friend_invite_code) {
						$('.friend-checkBox').find('input').text(person.friend_invite_code);
					}
					$('.four_p').find('.four_phone').text(person.phone);
					$('.four_p').find('.four_yao').text(person.invite_num);
					$('.four_p').find('.four_chance').text(person.invite_count);
					$('.four_p').show();
					if(person.data[1] == 1) {
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(3)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[1] == 2) {
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(2)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(3)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[1] == 3) {
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(1)').show();
					}
					if(person.data[1] == 4) {
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(3)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[2] == 1) {
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(4)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[2] == 2) {
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(2)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(4)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[2] == 3) {
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(1)').show();
					}
					if(person.data[2] == 4) {
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(4)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[3] == 1) {
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(5)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[3] == 2) {
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(2)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(5)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[3] == 3) {
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(1)').show();
					}
					if(person.data[3] == 4) {
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(5)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[4] == 1) {
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(6)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[4] == 2) {
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(2)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(6)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[4] == 3) {
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(3)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(1)').show();
					}
					if(person.data[4] == 4) {
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(1)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(2)').hide();
						$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(3)').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(6)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.is_yuyue == 1 || person.is_yuyue == '1') {
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(2)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[17] == 4){
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(2)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[5] == 1) {
						$('.giftDialog1').find('.noReach').hide();
						$('.giftDialog1').find('.get').hide();
						$('.giftDialog1').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(7)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[5] == 2) {
						$('.giftDialog1').find('.noReach').hide();
						$('.giftDialog1').find('.getSuccess').hide();
						$('.giftDialog1').find('.get').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(7)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[5] == 3) {
						$('.giftDialog1').find('.getSuccess').hide();
						$('.giftDialog1').find('.get').hide();
						$('.giftDialog1').find('.noReach').show();
					}
					if(person.data[5] == 4) {
						$('.giftDialog1').find('.noReach').hide();
						$('.giftDialog1').find('.get').hide();
						$('.giftDialog1').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(7)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[6] == 1) {
						$('.giftDialog2').find('.noReach').hide();
						$('.giftDialog2').find('.get').hide();
						$('.giftDialog2').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(8)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[6] == 2) {
						$('.giftDialog2').find('.noReach').hide();
						$('.giftDialog2').find('.getSuccess').hide();
						$('.giftDialog2').find('.get').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(8)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[6] == 3) {
						$('.giftDialog2').find('.getSuccess').hide();
						$('.giftDialog2').find('.get').hide();
						$('.giftDialog2').find('.noReach').show();
					}
					if(person.data[6] == 4) {
						$('.giftDialog2').find('.noReach').hide();
						$('.giftDialog2').find('.get').hide();
						$('.giftDialog2').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(8)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[7] == 1) {
						$('.giftDialog3').find('.noReach').hide();
						$('.giftDialog3').find('.get').hide();
						$('.giftDialog3').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(9)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[7] == 2) {
						$('.giftDialog3').find('.noReach').hide();
						$('.giftDialog3').find('.getSuccess').hide();
						$('.giftDialog3').find('.get').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(9)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[7] == 3) {
						$('.giftDialog3').find('.getSuccess').hide();
						$('.giftDialog3').find('.get').hide();
						$('.giftDialog3').find('.noReach').show();
					}
					if(person.data[7] == 4) {
						$('.giftDialog3').find('.noReach').hide();
						$('.giftDialog3').find('.get').hide();
						$('.giftDialog3').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(9)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[8] == 1) {
						$('.giftDialog4').find('.noReach').hide();
						$('.giftDialog4').find('.get').hide();
						$('.giftDialog4').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(10)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[8] == 2) {
						$('.giftDialog4').find('.noReach').hide();
						$('.giftDialog4').find('.getSuccess').hide();
						$('.giftDialog4').find('.get').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(10)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[8] == 3) {
						$('.giftDialog4').find('.getSuccess').hide();
						$('.giftDialog4').find('.get').hide();
						$('.giftDialog4').find('.noReach').show();
					}
					if(person.data[8] == 4) {
						$('.giftDialog4').find('.noReach').hide();
						$('.giftDialog4').find('.get').hide();
						$('.giftDialog4').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(10)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[9] == 1) {
						$('.giftDialog5').find('.noReach').hide();
						$('.giftDialog5').find('.get').hide();
						$('.giftDialog5').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(11)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[9] == 2) {
						$('.giftDialog5').find('.noReach').hide();
						$('.giftDialog5').find('.getSuccess').hide();
						$('.giftDialog5').find('.get').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(11)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[9] == 3) {
						$('.giftDialog5').find('.getSuccess').hide();
						$('.giftDialog5').find('.get').hide();
						$('.giftDialog5').find('.noReach').show();
					}
					if(person.data[9] == 4) {
						$('.giftDialog5').find('.noReach').hide();
						$('.giftDialog5').find('.get').hide();
						$('.giftDialog5').find('.getSuccess').show();
						$('.dialog-prise').find('.table_ul2').find('li:nth-child(11)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
	
					$('.b_denglu').removeClass('active');
					$('.a_denglu').addClass('active');
					$('.denglu_p').find('span').text(person.phone);
					$('.yqm').find('span').text(person.me_invite_code);
					$('.yqr').find('span').text(person.invite_num);
					$('.chance').text(person.invite_count);
					$('.dialog-success').find('h4').find('span').text(person.me_invite_code);
					$('.dialog-yue').find('.shareCode').find('.myCode').attr('src', person.invite_img)
					$('.dialog-yue').find('.shareCode').find('.yaoNum').text(person.me_invite_code);
					return 1;
				} else {
					person.isLogin = false;
				}
			}, 'json');
	}

	isLogin();
	//点击验证
	$('#getMarkBtn').click(function() {
		var phone = $('#phone').val();
		var img_code = $('#img-code').val();
		var code = $('#code').val();
		var yaoNum = $('#yaoNum').val();
		$('.err').css("visibility", "hidden");
		if(phone == '' || phone == undefined) {
			$('#phone-err').text("请输入手机号/邮箱/用户名");
			$('#phone-err').css("visibility", "visible");
			return;
		} else if(phone.length != 11) {
			$('#phone-err').text("请输入11位手机号");
			$('#phone-err').css("visibility", "visible");
			return;
		} else if(img_code == '' || img_code == undefined) {
			$('#img-code-err').css("visibility", "visible");
			return;
		}
		$.post("/site/ajax-login-verify.html", {
			"phone": phone,
			"captcha": img_code,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
				$('.err').css("visibility", "hidden");
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	})
	//获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	//点击登录
	$('.information-btn').click(function() {
		var phone = $('#phone').val();
		var img_code = $('#img-code').val();
		var code = $('#code').val();
		var str = /^1\d{10}$/;
		$('.err').css("visibility", "hidden");
		if(phone == '' || phone == undefined) {
			$('#phone-err').text("请输入手机号/邮箱/用户名");
			$('#phone-err').css("visibility", "visible");
			return;
		}
		if(!phone.match(str)) {
			$('#phone-err').text("请检查您输入的手机号是否正确");
			$('#phone-err').css("visibility", "visible");
			return;
		}
		if(img_code == '' || img_code == undefined) {
			$('#img-code-err').css("visibility", "visible");
			return;
		}
		if(code == '' || code == undefined) {
			$('#code-err').css("visibility", "visible");
			return;
		}
		$.post("/site/ajax-login.html", {
			"phone": phone,
			"yzm": code,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				today_draw_count = data.msg.today_draw_count;
				console.log(today_draw_count);
				$('.err').css("visibility", "hidden");
				isLogin();
				if(data.msg.is_yuyue == 1 || data.msg.is_yuyue == '1') {
					$('.dialog').hide();
					$('.mask').hide();
				} else {
					$('.dialog').hide();
					var code = getUrlParam("code");
					if(code) {
						$("#friend-input").val(code);
					}
					$('.dialog-type').show();
				}
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
	})
	//预约
	$('#type').find('p').click(function() {
		$('#type').find('p').removeClass('active');
		$(this).addClass('active');
		if($(this).attr('data-index') == 1) {
			person.type = 'ios';
		} else {
			person.type = 'android';
		}
	})
	//点击注销登录
	$(".zhuxiao").click(function() {
		$.post('/site/ajax-login-out.html', {
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				location.reload();
			} else {
				alert(data.msg);
			}
		}, 'json');
	});
	$('#friend-checkBox').find('p').click(function() {
		$('#friend-checkBox').find('p').removeClass('active');
		$(this).addClass('active');
		if($("#friend-checkBox p[data-index = '4']").hasClass("active")) {
			$("#friend-input").css("visibility", "hidden");
		} else {
			$("#friend-input").css("visibility", "visible");
		}
	})
	$('.friend-btn').click(function() {
		var input = $('#friend-input').val();
		if($(".checkBox p[data-index = '3']").hasClass("active")) {
			if(input.length != 6 || input == undefined) {
				alert("请输入正确的6位邀请码!");
				return;
			}
		}
		$.post("/site/ajax-yuyue.html", {
			"phone": person.phone,
			"type": person.type,
			"invite_code": input,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				$('.giftName').text('预约礼包:' + data.msg);
				$('.mask').show();
				$('.dialog').hide();
				$('.dialog-materialGift').show();
			} else {
				alert(data.msg);
			}
			// $('.dialog-prise').find('tbody').find('tr:nth-child(1)').find('td:last-child').text('已领取');
			// $('.dialog-prise').find('tbody').find('tr:nth-child(1)').find('td:last-child').css('color','#a2c42b');
		}, "json")
	})
	$('.dialog-materialGift').find('.clickBtn').click(function() {
		$('.mask').hide();
		$('.dialog').hide();
		isLogin();
	})
	//实物礼品地址
	$('.queren').find('.tijiao').click(function() {
		var address = $('.dialog-nullGift').find('.address').val();
		var phoneNum = $('.dialog-nullGift').find('.phoneNum').val();
		var name = $('.dialog-nullGift').find('.name').val();
		$.post("/site/ajax-address.html", {
			"name": name,
			"tel": phoneNum,
			"address": address,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				$('.mask').hide();
				$('.dialog').hide();
				alert('收货地址完善成功');
			} else {
				alert(data.msg);
			}
		}, "json")
	})
	$('.yy').click(function() {
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-information').show();
			return;
		}
		if(person.is_yuyue == 1 || person.is_yuyue == '1') {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-success').show();
			return;
		}
		$('.mask').show();
		$('.dialog').hide();
		$('.dialog-type').show();
	})
	//查看我的礼包
	$('.check_gift').click(function() {
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-information').show();
			return;
		}
		$('.mask').show();
		$('.dialog').hide();
		$('.dialog-prise').show();
	})
	//分享
	$('.share_haoyou').click(function() {
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-information').show();
			return;
		}
		$('.mask').show();
		$('.dialog').hide();
		$('.dialog-yue').show();
	})
	$('.lj_order').click(function() {
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-yue').show();
			return;
		}
		$('.mask').show();
		$('.dialog').hide();
		$('.dialog-yue').show();
	})
	//领取奖励
	function getGiftYao(id) {
		var t2 = '<tr><td>5000人预约礼包</td><td>随机染色剂+初级神兽之魂5+初级强化石3+银币50000</td><td style="color:#ffc600">待领取</td></tr>';
		var t3 = '<tr><td>10000人预约礼包</td><td>随机脸饰包+初级神兽之魂10+宠物强化石5+银币100000</td><td style="color:#ffc600">待领取</td></tr>';
		var t4 = '<tr><td>50000人预约礼包</td><td>随机染色剂+初级宠物秘籍1+初级神兽之魂10+银币50000</td><td style="color:#ffc600">待领取</td></tr>';
		var t5 = '<tr><td>100000人预约礼包</td><td>S级侠客碎片50+初级神兽之魂15+藏宝图3+银币100000</td><td style="color:#ffc600">待领取</td></tr>';
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-information').show();
			return;
		}
		$.post("/site/invite-code", {
			"num": id,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				// var t = '';
				// switch(id){
				//     case 1:t = t1;break;
				//     case 2:t = t2;break;
				//     case 3:t = t3;break;
				//     case 4:t = t4;break;
				// }
				// $('.dialog-prise').find('tbody').append(t);
			} else {
				alert(data.msg);
			}
		}, "json")
	}

	function getGiftYue(id) {
		if(!person.isLogin) {
			$('.mask').show();
			$('.dialog').hide();
			$('.dialog-information').show();
			return;
		}
		$.post("/site/order-code", {
			"num": id,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				//              var t = '';
				//              switch(id){
				//                  case 5:t = t5;break;
				//                  case 6:t = t6;break;
				//                  case 7:t = t7;break;
				//                  case 8:t = t8;break;
				//                  case 9:t = t9;break;
				//              }
				//              $('.dialog-prise').find('tbody').append(t);
			} else {
				alert(data.msg);
			}
		}, "json")
	}
	$('.zhaohu').find('.zhaohuBox:nth-child(1)').find('.btn_z').find('img:nth-child(2)').click(function() {
		getGiftYao(1);
	})
	$('.zhaohu').find('.zhaohuBox:nth-child(2)').find('.btn_z').find('img:nth-child(2)').click(function() {
		getGiftYao(2);
	})
	$('.zhaohu').find('.zhaohuBox:nth-child(3)').find('.btn_z').find('img:nth-child(2)').click(function() {
		getGiftYao(3);
	})
	$('.zhaohu').find('.zhaohuBox:nth-child(4)').find('.btn_z').find('img:nth-child(2)').click(function() {
		getGiftYao(4);
	})
	$('.giftDialog1').find('.get').click(function() {
		getGiftYue(5);
	})
	$('.giftDialog2').find('.get').click(function() {
		getGiftYue(6);
	})
	$('.giftDialog3').find('.get').click(function() {
		getGiftYue(7);
	})
	$('.giftDialog4').find('.get').click(function() {
		getGiftYue(8);
	})
	$('.giftDialog5').find('.get').click(function() {
		getGiftYue(9);
	});
	//一键领取功能
	$('.allIn').click(function() {
		$.post("/site/ajax-prop" , {},function (data){
			if(data.status == 0){
				$(".dialog-prise").hide();
				$(".mask").show();
				$(".f_success").show();
			} else {
				$(".dialog-prise").hide();
				$(".mask").show();
				$(".f_fail").show();
			}
		},"json");
	});
	//点击关闭弹窗刷新页面
	$(".success_close").click(function (){
		$(".mask").hide();
		$(".f_success").hide();
		location.reload();
	});
	//新增窗口关闭
	$(".queren_close").click(function() {
		$(".mask").hide();
		$(".queren").hide();
	});
	$(".delete_close").click(function() {
		$(".mask").hide();
		$(".delete").hide();
	});
	//实物弹窗关闭出现确认弹窗
	$(".s_close").click(function (){
		$(this).parent('.dialog').hide();
		$(".delete").show();
	});
	$(".fangqi").click(function (){
		$(".mask").hide();
		$(".delete").hide();
	});
	$(".fou").click(function (){
		$(".delete").hide();
		$(".dialog-nullGift").show();
	});
	$(".fanhui").click(function (){
		$(".queren").hide();
		$(".dialog-nullGift").show();
	});
	$('.dialog-nullGift').find('.clickBtn').click(function() {
		$(".dialog-nullGift").hide();
		$('.queren').show();
	})
})