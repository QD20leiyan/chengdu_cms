//bShare.addEntry({
//	title: "亲爱的小伙伴们,我邀请您一起来《风物语》的世界里玩耍！现在预约即可享受海量礼包！",
//	url: "",
//	summary: "   ",
//	pic: ""
//});
var today_draw_count = 0;
$(function() {
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
		var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
		if(result != null) {
			return decodeURIComponent(result[2]);
		} else {
			return null;
		}
	}
	//判断是否是在微信内部浏览器打开
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	if(isWeiXin()) {
		console.log(" 是来自微信内置浏览器");
		$(".weixin_stop").show();
	} else {
		$(".weixin_stop").hide();
	};
	//微信内部打开出现引导分享
	$(".weixin_stop").click(function (){
		$(".weixin_open").show();
	});
	$(".weixin_open").click(function (){
		$(this).hide();
	});
	var person = {
		isLogin: false,
		type: "ios",
		friend_invite_code: getQueryString('invite_code'),
		cms_csrf: $("meta[name='csrf-token']").attr("content")
	};
	var countdown = 60;

	function sendemail() {
		var obj = $(".g_code");
		settime(obj);
	}
	//  $('body').click(function (e) {
	//      if(e.target == $('.ruleBtn')[0]){
	//          $('.ruleBox').show(500);
	//          return;
	//      }
	//      $('.ruleBox').hide(500);
	//  });
	$(".ruleBtn").click(function() {
		$(".ruleBox").show(500);
		$(".f_mask").show();
	});
	$(".f_mask").click(function() {
		$(".ruleBox").hide(500);
		$(this).hide();
	})
	$('.yueGiftBox1').mouseenter(function(e) {
//		$("html,body").animate({
//			scrollTop: 700
//		}, 500);
		$('.giftDialog1').show(300);
	})
	$('.yueGiftBox1').mouseleave(function(e) {
		$('.giftDialog1').hide(300);
	})
	$('.yueGiftBox2').mouseenter(function(e) {
//		$("html,body").animate({
//			scrollTop: 700
//		}, 500);
		$('.giftDialog2').show(300);
	})
	$('.yueGiftBox2').mouseleave(function(e) {
		$('.giftDialog2').hide(300);
	})
	$('.yueGiftBox3').mouseenter(function(e) {
//		$("html,body").animate({
//			scrollTop: 700
//		}, 500);
		$('.giftDialog3').show(300);
	})
	$('.yueGiftBox3').mouseleave(function(e) {
		$('.giftDialog3').hide(300);
	})
	$('.yueGiftBox4').mouseenter(function(e) {
//		$("html,body").animate({
//			scrollTop: 700
//		}, 500);
		$('.giftDialog4').show(300);
	})
	$('.yueGiftBox4').mouseleave(function(e) {
		$('.giftDialog4').hide(300);
	})
	$('.yueGiftBox5').mouseenter(function(e) {
//		$("html,body").animate({
//			scrollTop: 700
//		}, 500);
		$('.giftDialog5').show(300);
	})
	$('.yueGiftBox5').mouseleave(function(e) {
		$('.giftDialog5').hide(300);
	})
	$('.giftInfo').mouseenter(function() {
//		$("html,body").animate({
//			scrollTop: 1200
//		}, 500);
		$(this).children('.yaoGiftBox').show(500);
	})
	$('.giftInfo').mouseleave(function() {
		$(this).children('.yaoGiftBox').hide(500);
	})
	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 5000,
		effect: 'coverflow',
		slidesPerView: 3,
		centeredSlides: true,
		loop: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		coverflow: {
			rotate: 5,
			stretch: -80,
			depth: 150,
			modifier: 1,
		}
	});
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
					$('.materialGift').show();
//					var temp = '<tr><td>大转盘礼包</td><td>' + txt + '</td><td style="color:#a2c437">待领取</td></tr>';
//					$('.prise').find('tbody').append(temp);
				}
				if(num == 1) {
					$('.giftName2').text(txt);
					$('.nullGift').show();
					stop();
//					var temp = '<tr><td>大转盘礼包</td><td>' + txt + '</td><td style="color:#a2c437">待领取</td></tr>';
//					$('.prise').find('tbody').append(temp);
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
			$('.command').show();
			stop();
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
								rotateFn(271, 315, '皇冠长耳兔*1', 0);
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
				}, "json")
			} else {
				alert("今日抽奖次数已达到上限");
			}
		} else {
			alert('抽奖次数不足');
		}
	});

	function stop() {
		$("html,body").css({
			"overflow": "hidden",
			"width": "100%",
			"height": "100%"
		});
	};

	function move() {
		$("html,body").css({
			"overflow": "visible",
			"width": "100%",
			"height": "auto"
		});
	};

	function settime(obj) { //发送验证码倒计时
		if(countdown == 0) {
			obj.attr('disabled', false);
			obj.val("获取验证码");
			// obj.text("获取验证码");
			countdown = 60;
			return;
		} else {
			obj.attr('disabled', true);
			obj.val("重新发送(" + countdown + ")");
			// obj.text("重新发送(" + countdown + ")");
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
	$('.seeMyGift').click(function() {
		if(!person.isLogin) {
			$('.command').show();
			stop();
			return;
		}
		$('.price').show();
	})
	//点击立即预约
	$('.juxing').click(function() {
		if(!person.isLogin) {
			$('.command').show();
			stop();
			return;
		}
		if(person.is_yuyue != 1 && person.is_yuyue != '1') {
			$('.login_yy').show();
			stop();
			return;
		}
		$('.dialog').show();
	})
	//点击立即预约
	$('.loginBtn').click(function() {
		if(!person.isLogin) {
			$('.command').show();
			stop();
			return;
		}
		if(person.is_yuyue != 1 && person.is_yuyue != '1') {
			$('.login_yy').show();
			stop();
			return;
		}
		$('.dialog').show();
	})
	$(".close").click(function() {
		$(this).parent().parent().hide();
		move();
	});
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
					$('.c_price').find('.tab_ul2').html(null).append(html);
					if(person.data[10] == 4){
						$(".tab_ul2 li[data-id = '10']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[11] == 4){
						$(".tab_ul2 li[data-id = '11']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[12] == 4){
						$(".tab_ul2 li[data-id = '12']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[13] == 4){
						$(".tab_ul2 li[data-id = '13']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[14] == 4){
						$(".tab_ul2 li[data-id = '14']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[15] == 4){
						$(".tab_ul2 li[data-id = '15']").find(".second_span").text("已领取至游戏");
					}
					if(person.data[16] == 4){
						$(".tab_ul2 li[data-id = '16']").find(".second_span").text("已领取至游戏");
					}
					$('.dialog-prise').find('h4').text(person.phone);
					if(person.friend_invite_code) {
						$('.put_yqm').text(person.friend_invite_code);
					}
					$('.four_p').find('.four_phone').text(person.phone);
					$('.four_p').find('.four_yao').text(person.invite_num);
					$('.four_p').find('.four_chance').text(person.invite_count);
					$('.four_p').show();
					if(person.invite_num == 1) {
						$(".shareImage li:nth-child(1)").addClass("active");
					}
					if(person.invite_num == 2) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
					}
					if(person.invite_num == 3) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
					}
					if(person.invite_num == 4) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
					}
					if(person.invite_num == 5) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
						$(".shareImage li:nth-child(5)").addClass("active");
					}
					if(person.invite_num == 6) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
						$(".shareImage li:nth-child(5)").addClass("active");
						$(".shareImage li:nth-child(6)").addClass("active");
					}
					if(person.invite_num == 7) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
						$(".shareImage li:nth-child(5)").addClass("active");
						$(".shareImage li:nth-child(6)").addClass("active");
						$(".shareImage li:nth-child(7)").addClass("active");
					}
					if(person.invite_num == 8) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
						$(".shareImage li:nth-child(5)").addClass("active");
						$(".shareImage li:nth-child(6)").addClass("active");
						$(".shareImage li:nth-child(7)").addClass("active");
						$(".shareImage li:nth-child(8)").addClass("active");
					}
					if(person.invite_num == 9) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
						$(".shareImage li:nth-child(5)").addClass("active");
						$(".shareImage li:nth-child(6)").addClass("active");
						$(".shareImage li:nth-child(7)").addClass("active");
						$(".shareImage li:nth-child(8)").addClass("active");
						$(".shareImage li:nth-child(9)").addClass("active");
					}
					if(person.invite_num == 10) {
						$(".shareImage li:nth-child(1)").addClass("active");
						$(".shareImage li:nth-child(2)").addClass("active");
						$(".shareImage li:nth-child(3)").addClass("active");
						$(".shareImage li:nth-child(4)").addClass("active");
						$(".shareImage li:nth-child(5)").addClass("active");
						$(".shareImage li:nth-child(6)").addClass("active");
						$(".shareImage li:nth-child(7)").addClass("active");
						$(".shareImage li:nth-child(8)").addClass("active");
						$(".shareImage li:nth-child(9)").addClass("active");
						$(".shareImage li:nth-child(10)").addClass("active");
					}
					if(person.data[1] == 1) {
						$(".giftInfo[data-index = '1']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '1']").find('.shareGift-get').hide();
						$(".giftInfo[data-index = '1']").find('.shareGift-getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(3)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[1] == 2) {
						$(".giftInfo[data-index = '1']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '1']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '1']").find('.shareGift-get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(3)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[1] == 3) {
						$(".giftInfo[data-index = '1']").find('.shareGift-get').hide();
						$(".giftInfo[data-index = '1']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '1']").find('.shareGift-noReach').show();
					}
					if(person.data[2] == 1) {
						$(".giftInfo[data-index = '2']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '2']").find('.shareGift-get').hide();
						$(".giftInfo[data-index = '2']").find('.shareGift-getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(4)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[2] == 2) {
						$(".giftInfo[data-index = '2']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '2']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '2']").find('.shareGift-get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(4)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[2] == 3) {
						$(".giftInfo[data-index = '2']").find('.shareGift-noReach').show();
						$(".giftInfo[data-index = '2']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '2']").find('.shareGift-get').hide();
					}
					if(person.data[3] == 1) {
						$(".giftInfo[data-index = '3']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '3']").find('.shareGift-get').hide();
						$(".giftInfo[data-index = '3']").find('.shareGift-getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(5)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[3] == 2) {
						$(".giftInfo[data-index = '3']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '3']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '3']").find('.shareGift-get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(5)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[3] == 3) {
						$(".giftInfo[data-index = '3']").find('.shareGift-noReach').show();
						$(".giftInfo[data-index = '3']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '3']").find('.shareGift-get').hide();
					}
					if(person.data[4] == 1) {
						$(".giftInfo[data-index = '4']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '4']").find('.shareGift-get').hide();
						$(".giftInfo[data-index = '4']").find('.shareGift-getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(6)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[4] == 2) {
						$(".giftInfo[data-index = '4']").find('.shareGift-noReach').hide();
						$(".giftInfo[data-index = '4']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '4']").find('.shareGift-get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(6)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[4] == 3) {
						$(".giftInfo[data-index = '4']").find('.shareGift-noReach').show();
						$(".giftInfo[data-index = '4']").find('.shareGift-getSuccess').hide();
						$(".giftInfo[data-index = '4']").find('.shareGift-get').hide();
					}
					if(person.is_yuyue == 1 || person.is_yuyue == '1') {
						$('.price').find('.tab_ul1').find('li:nth-child(2)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[17] == 4){
						$('.price').find('.tab_ul1').find('li:nth-child(2)').find('span:last-child').text('已领取至游戏').css('color', '#a2c437');
					}
					if(person.data[5] == 1) {
						$('.giftDialog1').find('.noReach').hide();
						$('.giftDialog1').find('.get').hide();
						$('.giftDialog1').find('.getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(7)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[5] == 2) {
						$('.giftDialog1').find('.noReach').hide();
						$('.giftDialog1').find('.getSuccess').hide();
						$('.giftDialog1').find('.get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(7)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[5] == 3) {
						$('.giftDialog1').find('.getSuccess').hide();
						$('.giftDialog1').find('.get').hide();
						$('.giftDialog1').find('.noReach').show();
					}
					if(person.data[6] == 1) {
						$('.giftDialog2').find('.noReach').hide();
						$('.giftDialog2').find('.get').hide();
						$('.giftDialog2').find('.getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(8)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[6] == 2) {
						$('.giftDialog2').find('.noReach').hide();
						$('.giftDialog2').find('.getSuccess').hide();
						$('.giftDialog2').find('.get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(8)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[6] == 3) {
						$('.giftDialog2').find('.getSuccess').hide();
						$('.giftDialog2').find('.get').hide();
						$('.giftDialog2').find('.noReach').show();
					}
					if(person.data[7] == 1) {
						$('.giftDialog3').find('.noReach').hide();
						$('.giftDialog3').find('.get').hide();
						$('.giftDialog3').find('.getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(9)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[7] == 2) {
						$('.giftDialog3').find('.noReach').hide();
						$('.giftDialog3').find('.getSuccess').hide();
						$('.giftDialog3').find('.get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(9)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[7] == 3) {
						$('.giftDialog3').find('.getSuccess').hide();
						$('.giftDialog3').find('.get').hide();
						$('.giftDialog3').find('.noReach').show();
					}
					if(person.data[8] == 1) {
						$('.giftDialog4').find('.noReach').hide();
						$('.giftDialog4').find('.get').hide();
						$('.giftDialog4').find('.getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(10)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[8] == 2) {
						$('.giftDialog4').find('.noReach').hide();
						$('.giftDialog4').find('.getSuccess').hide();
						$('.giftDialog4').find('.get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(10)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[8] == 3) {
						$('.giftDialog4').find('.getSuccess').hide();
						$('.giftDialog4').find('.get').hide();
						$('.giftDialog4').find('.noReach').show();
					}
					if(person.data[9] == 1) {
						$('.giftDialog5').find('.noReach').hide();
						$('.giftDialog5').find('.get').hide();
						$('.giftDialog5').find('.getSuccess').show();
						$('.price').find('.tab_ul1').find('li:nth-child(11)').find('span:last-child').text('可领取至游戏').css('color', '#a2c437');
					}
					if(person.data[9] == 2) {
						$('.giftDialog5').find('.noReach').hide();
						$('.giftDialog5').find('.getSuccess').hide();
						$('.giftDialog5').find('.get').show();
						$('.price').find('.tab_ul1').find('li:nth-child(11)').find('span:last-child').text('待领取').css('color', '#ffc600');
					}
					if(person.data[9] == 3) {
						$('.giftDialog5').find('.getSuccess').hide();
						$('.giftDialog5').find('.get').hide();
						$('.giftDialog5').find('.noReach').show();
					}
					$('.loginBtn').hide();
					$('.loginEd').show();
					$('.loginEd').find('.phoneNum').find('span').text(person.phone);
					$('.loginEd').find('.yaoCode').find('span').text(person.me_invite_code);
					$('.loginEd').find('.yaoSuccess').find('span').text(person.invite_num);
					$('.denglu_p').find('span').text(person.phone);
					$('.yqm').find('span').text(person.me_invite_code);
					$('.yqr').find('span').text(person.invite_num);
					$('.chance').text(person.invite_count);
					$('.yq_num').text(person.me_invite_code);
					$('.h_code').attr('src', person.invite_img)
					$('.h_yqm').text(person.me_invite_code);
					$(".c_price").find("h4").text(person.phone);
				} else {
					person.isLogin = false;
				}
			}, 'json');
	}

	isLogin();

	//点击验证
	$('.g_code').click(function() {
		var phone = $('.phone').val();
		var img_code = $('.pic_code').val();
		$('.err').css("visibility", "hidden");
		if(phone == '' || phone == undefined) {
			$('.phone').prev().text("请输入手机号/邮箱/用户名");
			$('.phone').prev().css("visibility", "visible");
			return;
		} else if(phone.length != 11) {
			$('.phone').prev().text("请输入11位手机号");
			$('.phone').prev().css("visibility", "visible");
			return;
		} else if(img_code == '' || img_code == undefined) {
			$('.pic_code').prev().css("visibility", "visible");
			return;
		}
		$.post("/site/ajax-login-verify.html", {
			"phone": phone,
			"captcha": img_code,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				sendemail();
				$('.wrong').css("visibility", "hidden");
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
	$('.j_sure').click(function() {
		var phone = $('.phone').val();
		var img_code = $('.pic_code').val();
		var code = $('.i_code').val();
		var str = /^1\d{10}$/;
		$('.err').css("visibility", "hidden");
		if(phone == '' || phone == undefined) {
			$('.phone').prev().text("请输入手机号/邮箱/用户名");
			$('.phone').prev().css("visibility", "visible");
			return;
		}
		if(!phone.match(str) || phone == undefined) {
			$('#phone-err').text("请检查您输入的手机号是否正确");
			$('#phone-err').css("visibility", "visible");
			return;
		}
		if(img_code == '' || img_code == undefined) {
			$('.pic_code').parent().prev().css("visibility", "visible");
			return;
		}
		if(code == '' || code == undefined) {
			$('.i_code').parent().prev().css("visibility", "visible");
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
				sendemail();
				$('.wrong').css("visibility", "hidden");
				isLogin();
				if(data.msg.is_yuyue == 1 || data.msg.is_yuyue == '1') {
					$('.command').hide();
					move();
				} else {
					$('.command').hide();
					var code = getUrlParam("code");
					if(code) {
						$(".put_yqm").val(code);
					}
					$('.login_yy').show();
					stop();
				}
			} else {
				tupian();
				alert(data.msg);
			}
		}, "json");
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
	//预约
	//点击选择设备类型
	$(".yy_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//点击选择是否有邀请码
	$(".con_ul li").on("click", function() {
		$(this).addClass("active").siblings().removeClass("active");
		if($(".con_ul li:nth-child(2)").hasClass("active")){
			$(".put_yqm").css("visibility","hidden");
		} else {
			$(".put_yqm").css("visibility","visible");
		}
	});
	$('.friend-btn').click(function() {
		var type = $(".yy_ul li.active").attr("data-type");
		var yqm = $(".put_yqm").val();
		if($(".con_ul li:nth-child(1)").hasClass("active")) {
			if(yqm.length != 6 || yqm == undefined) {
				alert("请输入正确的6位邀请码!");
				return;
			}
		}
		$.post("/site/ajax-yuyue.html", {
			"phone": person.phone,
			"type": type,
			"invite_code": yqm,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				$('.giftName').text('预约礼包');
				$('.login_yy').hide();
				$('.materialGift').show();
				$('prise').find('tbody').find('tr:nth-child(1)').find('td:last-child').text('已领取');
				$('prise').find('tbody').find('tr:nth-child(1)').find('td:last-child').css('color', '#a2c42b');
			} else {
				alert(data.msg);
			}
			$('.price').find('tbody').find('tr:nth-child(1)').find('td:last-child').text('已领取');
			$('.price').find('tbody').find('tr:nth-child(1)').find('td:last-child').css('color', '#a2c42b');
		}, "json")
	})
	$('.materialGift').find('.clickBtn').click(function() {
		$('.materialGift').hide();
		isLogin();
		move();
	})
	//实物礼品地址
	$('.c_queren').find('.tijiao').click(function() {
		var address = $('.nullGift').find('.address').val();
		var phoneNum = $('.nullGift').find('.phoneNum').val();
		var name = $('.nullGift').find('.name').val();
		$.post("/site/ajax-address.html", {
			"name": name,
			"tel": phoneNum,
			"address": address,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				$('.nullGift').hide();
				move();
				alert('收货地址完善成功');
			} else {
				alert(data.msg);
			}
		}, "json")
	})
	//分享
	$('.shareBtn').click(function() {
		if(!person.isLogin) {
			$('.command').show();
			stop();
			return;
		}
		$('.f_invite').show();
	})
	$('.lj_order').click(function() {
		if(!person.isLogin) {
			$('.command').show();
			stop();
			return;
		}
		$('.dialog').hide();
		$('.f_invite').show();
	})

	//领取奖励
	function getGiftYao(id) {
		if(!person.isLogin) {
			$('.command').show();
			stop();
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
				// $('.prise').find('tbody').append(t);
				// stop();
			} else {
				alert(data.msg);
			}
		}, "json")
	}

	function getGiftYue(id) {
		if(!person.isLogin) {
			$('.command').show();
			stop();
			return;
		}
		$.post("/site/order-code", {
			"num": id,
			"cms_csrf": person.cms_csrf
		}, function(data) {
			if(data.status == 0) {
				isLogin();
				// var t = '';
				// switch(id){
				//     case 5:t = t5;break;
				//     case 6:t = t6;break;
				//     case 7:t = t7;break;
				//     case 8:t = t8;break;
				//     case 9:t = t9;break;
				// }
				// $('.prise').find('tbody').append(t);
			} else {
				alert(data.msg);
			}
		}, "json")
	}
	$(".giftInfo[data-index = '1']").find('.shareGift-get').click(function() {
		getGiftYao(1);
	})
	$(".giftInfo[data-index = '2']").find('.shareGift-get').click(function() {
		getGiftYao(2);
	})
	$(".giftInfo[data-index = '3']").find('.shareGift-get').click(function() {
		getGiftYao(3);
	})
	$(".giftInfo[data-index = '4']").find('.shareGift-get').click(function() {
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
	})
	//一键领取到游戏
	$('.allIn').click(function() {
		$.post("/site/ajax-prop",{},function (data){
			if(data.status == 0){
				$(".price").hide();
				$(".lq_success").show();
			} else {
				$(".price").hide();
				$(".lq_fail").show();
			}
		},"json");
	});
	$(".lq_success .success_close").click(function (){
		location.reload();
	})
	//实物地址弹窗二次确认
	$(".s_close").click(function (){
		$(".nullGift").hide();
		$(".q_delete").show();
		move();
	});
	$(".fangqi").click(function (){
		$(".q_delete").hide();
	});
	$(".fou").click(function (){
		$(".q_delete").hide()
		$(".nullGift").show();
		stop();
	});
	$('.nullGift').find('.clickBtn').click(function() {
		$('.nullGift').hide();
		$('.c_queren').show();
		move();
	});
	$(".xiugai").click(function (){
		$(".c_queren").hide();
		$(".nullGift").show();
		stop();
	});
})