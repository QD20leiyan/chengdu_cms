$(function() {
	var mySwiper = new Swiper('.banner', {
		loop: true,
		simulateTouch: false,
		autoplay: 3000,
		pagination: '.swiper-pagination',
		paginationClickable: true,
	});
	$(".t_title li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".m_c ul").eq(index).addClass("active").siblings().removeClass("active");
	});
	$(".s_ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab_new ul").eq(index).addClass("active").siblings().removeClass("active");
	});
	$('.float_btn').click(function() {
		$('body').toggleClass('op');
		var img = $(this).attr("src");
		if(this.src.search("11.png") != -1) {
			this.src = "http://dev.static.yingxiong.com/czymf/2.0/images/22.png";
		} else {
			this.src = "http://dev.static.yingxiong.com/czymf/2.0/images/11.png";
		}
	});
	var $_window = $(window);
        var $main_visual = $('.b');
        var itemLi = $main_visual.find('.b1');
        var visualWidth = $main_visual.width();
        $main_visual.mousemove(function(e) {
            var cursorX = e.clientX - $main_visual.offset().left;
            var cursorY = e.clientY - $main_visual.offset().top;
            var i = 0.5;
            $(this).find('.b1').each(function() {
                var item_width = $(this).width();
                var wrapperWidth = $_window.width();
                var wrapperHeight = (wrapperWidth - 0) / 1.26;
                var centerX = wrapperWidth / 2;
                var centerY = wrapperHeight / 2;
                var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
                var newTop = (cursorY - centerY) * (i) / 30 * (-1);
                $(this).css({
                    'transform': 'translate3d(' + newLeft + 'px,' + newTop + 'px, 0)'
                });
                i = i * 2;
            });
        });
	$(".kun img").hover(function() {
		$(".ent-max").show();
	}, function() {
		$(".ent-max").hide();
	});
	$(".del").click(function() {
		$(".ent-max").hide();
	});
	$("#yuyue,.ios").on("click", function(e) {
		e.stopPropagation();
		$(".yxyy_tk").show();
		$(".yxyy_con").show();
	});
	$(".yxyy_con_close").on("click", function(e) {
		e.stopPropagation();
		$(".yxyy_tk").hide();
		$(".yxyy_con").hide();
		$(".yxyy_con_in_phone input").val("");
	})
	$(".yxyy_con_in_btn").on("click", function(e) {
		e.stopPropagation();
		var phone = $(".yxyy_con_in_phone input").val();
		var phoneLen = phone.length;
		var email = $(".yxyy_con_in_email input").val();
		var emailLen = email.length;
		if(phoneLen != 11) {
			alert("请输入正确的手机号码");
		} else {
			var cms_csrf = $('meta[name="csrf-token"]').attr('content');
			var type = "ios";
			$.post('/site/subscribe.html', {
				phone: phone,
				email: email,
				cms_csrf: cms_csrf,
				type: type
			}, function(data) {
				if(data.status == 0) {
					alert("预约成功");
					$(".yxyy_tk").hide();
					$(".yxyy_con").hide();
					$(".yxyy_con_in_phone input").val("");
					$(".yxyy_con_in_email input").val("");
				} else if(data.status == -1) {
					alert(data.msg);
				}
			}, 'JSON');
		}
	});
	var mySwiper1 = new Swiper('.m_banner', {
		loop: true,
		autoplay: 4000,
		simulateTouch: false,
		paginationClickable: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		pagination: '.swiper-pagination1',
	});
	$(".v_r_ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".v_m_l li").eq(index).addClass("active").siblings().removeClass("active");
	});
	textNumber();
	setInterval(textNumber, 2000);

	function textNumber() {
		$.get("/site/ajax-get-num.html", function(data) {
			var str = String(data.msg);
			console.log(typeof(str));
			var newStr = "";
			var count = 0; 
			if(str.indexOf(".") == -1) {   
				for(var i = str.length - 1; i >= 0; i--) { 
					if(count % 3 == 0 && count != 0) {   
						newStr = str.charAt(i) + "," + newStr; 
					} else {   
						newStr = str.charAt(i) + newStr; 
					} 
					count++;   
				}   
				str = newStr; //自动补小数点后两位		   
			} else {   
				for(var i = str.indexOf(".") - 1; i >= 0; i--) { 
					if(count % 3 == 0 && count != 0) {   
						newStr = str.charAt(i) + "," + newStr; 
					} else {   
						newStr = str.charAt(i) + newStr; //逐个字符相接起来					 
					} 
					count++;   
				}   
				str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);   
			}
			$(".number").text(str);
		}, "json");
	}
	getLi();
	var len = $(".v_ul li").length,
		index = 0;

	function interVal() {
		if(index < len) {
			$(".v_ul li").eq(index).addClass("active").siblings().removeClass("active");
			$(".v_r_ul li").eq(index).addClass("active").siblings().removeClass("active");
			index++
		} else {
			index = 0;
		}
	};
	var timer = setInterval(interVal, 3000);
	$(".v_r_ul li").on("click", function() {
		clearInterval(timer);
		var abc = $(this).index();
		index = abc;
		abc++;
	});
	$(".v_r_ul").mouseout(function() {
		clearInterval(timer);
		timer = setInterval(interVal, 1500);
	});

	function getLi() {
		$(".v_b_ul li").each(function(index, con) {
			if(($(this).index() + 1) % 5 == 0 && $(this).index() > 0) {
				$(this).addClass("active");
			}
		})
	}
});
(function() {

	function G(s) {
		return document.getElementById(s);
	}

	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	}

	function Animate(obj, json) {
		if(obj.timer) {
			clearInterval(obj.timer);
		}
		obj.timer = setInterval(function() {
			for(var attr in json) {
				var iCur = parseInt(getStyle(obj, attr));
				iCur = iCur ? iCur : 0;
				var iSpeed = (json[attr] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				obj.style[attr] = iCur + iSpeed + 'px';
				if(iCur == json[attr]) {
					clearInterval(obj.timer);
				}
			}
		}, 30);
	}

	var oPic = G("picBox");
	var oList = G("listBox");

	var oPrev = G("prev");
	var oNext = G("next");
	var oPrev_mod = G("prev_mod");
	var oNext_mod = G("next_mod");

	var oPicLi = oPic.getElementsByTagName("li");
	var oListLi = oList.getElementsByTagName("li");
	var len1 = oPicLi.length;
	var len2 = oListLi.length;

	var oPicUl = oPic.getElementsByTagName("ul")[0];
	var oListUl = oList.getElementsByTagName("ul")[0];
	var w1 = oPicLi[0].offsetWidth;
	var w2 = oListLi[0].offsetWidth;

	oPicUl.style.width = w1 * len1 + "px";
	oListUl.style.width = w2 * len2 + 220 + "px";

	var index = 0;

	var num = 4;
	var num2 = Math.ceil(num / 2);

	function Change() {

		Animate(oPicUl, {
			left: -index * w1
		});

		if(index < num2) {
			Animate(oListUl, {
				left: 0
			});
		} else if(index + num2 <= len2) {
			Animate(oListUl, {
				left: -(index - num2 + 1) * w2
			});
		} else {
			Animate(oListUl, {
				left: -(len2 - num) * w2
			});
		}

		for(var i = 0; i < len2; i++) {
			oListLi[i].className = "";
			if(i == index) {
				oListLi[i].className = "on";
			}
		}
	}

	oNext_mod.onclick = function() {
		index++;
		index = index == len2 ? 0 : index;
		index = index == len2 ? oNext_mod.className = "active" : oNext_mod.className = "";
		Change();
	}

	oPrev_mod.onclick = function() {
		index--;
		index = index == -1 ? len2 - 1 : index;
		Change();
	}

	for(var i = 0; i < len2; i++) {
		oListLi[i].index = i;
		oListLi[i].onclick = function() {
			index = this.index;
			Change();
		}
	}
})()