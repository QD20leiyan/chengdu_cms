//页面埋点
function dfzj_shanben_md(name) {
	HLog.push(name);
}
function dfzj_shanben_sy() {
	var num = 0;
	var timer = setInterval(function() {
		if(!window.HLog) {
			num++;
			if(num >= 10) {
				clearInterval(timer);
			}
		} else {
			HLog.push("dfzj_shanben_page1");
			clearInterval(timer);
		}
	}, 500);
}
//分享助力
function refresh() {
	var random = Math.floor((Math.random() * 10000) + 1);
	var url = decodeURI(window.location.href);
	if(url.indexOf('?') < 0) {
		url = url + "?random" + random;
	} else {
		url = url.substr(0, url.indexOf('?random')) + "?random" + random;
	}
	window.location.href = url;
}
$("#weiguan").click(function() {
	HLog.event("dfzj_shanben_wg");
	$(".share_bg").show();
});
$(".share_bg").click(function() {
	HLog.event("dfzj_shanben_fx");
	$(".share_bg").hide();
});
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
//再来一次
$("#one_more").click(function() {
	HLog.event("dfzj_shanben_jx");
	window.location.href = "http://h5.yingxiong.com/index/dfzj/shanben.html";
	return false;
});
var countdown = 10;
var _time = $("#djs").text();

function sendemail() {
	var obj = $("#djs");
	settime(obj);
};
$(".goon").click(function() {
	HLog.event("dfzj_shanben_go");
});

function settime(obj) {
	if(countdown == 0) {
		obj.text("10″");
		countdown = 10;
		return;
	} else {
		obj.text(countdown + "″");
		$("#jdt").css("width", countdown * 1.59375 + "rem");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
var clickTap = false;
var cont = $("#hand");
var contW = $("#hand").width();
var contH = $("#hand").height();
var startX, startY, sX, sY, moveX, moveY;
var winW = $(window).width();
var winH = $(window).height();
var _width = $(window).width() / 2;
var _height = $(window).height() / 2;
var num = 0;
var clickTime = 2;
var clickNumber = 0;
var music = false;
var audio1 = document.getElementById("bgMusic");
var audio2 = document.getElementById("bg_music");
var audio3 = document.getElementById("papa");

function audioAutoPlay1() {
	audio1.play();
	audio1.volume = .5;
	document.addEventListener("WeixinJSBridgeReady", function() {
		audio1.play();
		audio1.volume = .5;
		setTimeout(function() {
			audio1.volume += .1;
		}, 1200);
	}, false);
}

function audioAutoPlay2() {
	audio2.play();
	audio2.volume = .5;
	document.addEventListener("WeixinJSBridgeReady", function() {
		audio2.play();
		audio2.volume = .5;
		setTimeout(function() {
			audio2.volume += .1;
		}, 1200);
	}, false);
}

function audioAutoPlay3() {
	audio3.play();
	audio3.volume = .5;
	document.addEventListener("WeixinJSBridgeReady", function() {
		audio3.play();
		audio3.volume = .5;
		setTimeout(function() {
			audio3.volume += .1;
		}, 1200);
	}, false);
}
window.onload = function() {
	$(".js_load").hide();
	setTimeout(function() {
		audio2.pause();
		audio3.pause();
	}, 500);
}
$(function() {
	audioAutoPlay1();
	audioAutoPlay2();
	audioAutoPlay3();
	dfzj_shanben_sy();
	$("#bgMusic").attr("src", alt + "images/music.mp3");
	$("#papa").attr("src", alt + "images/bazhang.mp3");
	$("#bg_music").attr("src", alt + "images/b_music.mp3");
	var mySwiper = new Swiper(".swiper-container", {
		direction: 'vertical',
		onSlideChangeEnd: function() {
			if(mySwiper.activeIndex == 0) {
				
			} else if(mySwiper.activeIndex == 1) {
				dfzj_shanben_md("dfzj_shanben_page2")
			} else if(mySwiper.activeIndex == 2) {
				dfzj_shanben_md("dfzj_shanben_page3")
				mySwiper.destroy(true);
				$(".sanjiao").hide();
			}
		},
	});
	cont.on({ //绑定事件
		touchstart: function(e) {
			startX = e.originalEvent.targetTouches[0].pageX; //获取点击点的X坐标    
			startY = e.originalEvent.targetTouches[0].pageY; //获取点击点的Y坐标
			//console.log("startX="+startX+"************startY="+startY);
			sX = $(this).offset().left; //相对于当前窗口X轴的偏移量
			sY = $(this).offset().top; //相对于当前窗口Y轴的偏移量
			//console.log("sX="+sX+"***************sY="+sY);
			leftX = startX - sX; //鼠标所能移动的最左端是当前鼠标距div左边距的位置
			rightX = winW - contW + leftX; //鼠标所能移动的最右端是当前窗口距离减去鼠标距div最右端位置
			topY = startY - sY; //鼠标所能移动最上端是当前鼠标距div上边距的位置
			bottomY = winH - contH + topY; //鼠标所能移动最下端是当前窗口距离减去鼠标距div最下端位置
			HLog.event("dfzj_shanben_hand");
		},
		touchmove: function(e) {
			e.preventDefault();
			moveX = e.originalEvent.targetTouches[0].pageX; //移动过程中X轴的坐标
			moveY = e.originalEvent.targetTouches[0].pageY; //移动过程中Y轴的坐标
			//console.log("moveX="+moveX+"************moveY="+moveY);
			if(moveX < leftX) {
				moveX = leftX;
			}
			if(moveX > rightX) {
				moveX = rightX;
			}
			if(moveY < topY) {
				moveY = topY;
			}
			if(moveY > bottomY) {
				moveY = bottomY;
			}
			$(this).css({
				"left": moveX + sX - startX,
				"top": moveY + sY - startY,
			});
			if(moveX < _width && moveY < _height) {
				clickTime = 0;
			} else if(moveX > _width && moveY < _height) {
				clickTime = 1;
			}
			if(clickTime == 1) {
				if(num == 1) {
					$("#papa")[0].play();
					audio3.play();
					$("#four").attr("src", alt + "images/four_two.jpg");
					$(".bazhang").css("left", "9.5rem");
					clickNumber += 1;
					num = 0;
				}
			} else if(clickTime == 0) {
				if(num == 0) {
					$("#papa")[0].play();
					audio3.play();
					$("#four").attr("src", alt + "images/four_one.jpg");
					$(".bazhang").css("left", "2.5rem");
					clickNumber += 1;
					num = 1;
				}
			}
			if(!clickTap) {
				sendemail();
				$("#bgMusic")[0].pause();
				audio1.pause();
				$("#bg_music")[0].play();
				audio2.play();
				$(".play_music").removeClass("active");
				setTimeout(function() {
					$(".four").addClass("hidden");
					$(".five").removeClass("hidden");
					$(".sanjiao").show();
					$("#papa").remove();
					$("#bgMusic").remove();
					dfzj_shanben_md("dfzj_shanben_page5")
					music = false;
				}, 10000);
				clickTap = true;
			}
			$(".play_cishu").show();
			$("#play_time").text(clickNumber);
			$(".bazhang span").text(clickNumber);
			$(".bazhang01 span").text(clickNumber);
			$(".han_p").hide();
			$(".time_jdt").show();
			$(".bazhang").show();
		},
	});
});
document.body.addEventListener('touchmove', function(e) {
	e.preventDefault();
})
$(".img_one").click(function() {
	HLog.event("dfzj_shanben_ren");
	dfzj_shanben_md("dfzj_shanben_page3")
	$(".three").addClass("hidden");
	$(".three_one").removeClass("hidden");
	$(".one").addClass("hidden");
	$(".two").addClass("hidden");
	$(".swiper-wrapper").css("transform", "translate3d(0,0,0)");
});
$(".img_two").click(function() {
	HLog.event("dfzj_shanben_bren");
	dfzj_shanben_md("dfzj_shanben_page4");
	$(".three").addClass("hidden");
	$(".four").removeClass("hidden");
	$(".swiper-wrapper").css("transform", "translate3d(0,0,0)");
	$(".one").addClass("hidden");
	$(".two").addClass("hidden");
});
$(".give_up").click(function() {
	HLog.event("dfzj_shanben_pin");
	dfzj_shanben_md("dfzj_shanben_page4");
	$(".three_one").addClass("hidden");
	$(".four").removeClass("hidden");
});
$(".five").on("touchstart", function() {
	HLog.event("dfzj_shanben_tc");
	$(".tc").show();
});
$(".sure").click(function() {
	HLog.event("dfzj_shanben_sure");
	dfzj_shanben_md("dfzj_shanben_page6");
	var name = $(".name").val();
	if(name == "" || name == undefined) {
		alert("请输入您的大名哦~");
		return;
	}
	if(name.length > 6) {
		alert("姓名不能超过6个字哦~");
		return;
	}
	$(".t_name").text(name);
	$(".js_load").show();
	$(".tc").remove();
	$(".five").addClass("hidden");
	$(".six").removeClass("hidden");
	setTimeout(function() {
		var canvas2 = document.createElement("canvas");
		let _canvas = document.querySelector('#jp_img');
		var w = parseInt(window.getComputedStyle(_canvas).width);
		var h = parseInt(window.getComputedStyle(_canvas).height);
		canvas2.width = w * 4;
		canvas2.height = h * 4;
		canvas2.style.width = w + "px";
		canvas2.style.height = h + "px";
		var context = canvas2.getContext("2d");
		context.scale(4, 4);
		html2canvas(_canvas, {
			windowWidth: document.body.scrollWidth,
			windowHeight: document.body.scrollHeight,
			useCORS: true,
			canvas: canvas2
		}).then(function(canvas) {
			$(".js_load").hide();
			$("#z_img").attr("src", canvas.toDataURL("data:image/png"));
			$("#jp_img").hide();
			$(".sanjiao").hide();
		});
	}, 1000)

});