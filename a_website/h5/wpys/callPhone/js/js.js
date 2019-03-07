var timer, timer1 = null;
var leftNum = 100;
var aircraft = 0;
var loadingTxt = 15;

function md_sp() {
	var num = 0;
	var timer = setInterval(function() {
		if(!window.HLog) {
			num++;
			if(num >= 10) {
				clearInterval(timer);
			}
		} else {
			HLog.push("wpys_phone_start");
			clearInterval(timer);
		}
	}, 500);
}
var audio1 = document.getElementById("bgMusic");

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
$(function() {
	audioAutoPlay1();
	md_sp();
	timer = setInterval(function() {
		loadingTxt++;
		$("#loading-txt").html(loadingTxt + "%")
		if(loadingTxt == 100) {
			clearInterval(timer);
			$(".loading").hide();
			$(".page_one").show();
		}
	}, 100);

	timer1 = setInterval(function() {
		aircraft++;
		$(".l_person").css("marginLeft", aircraft + "%");
		if(aircraft == 55) {
			$(".hotdog").hide();
			clearInterval(timer1);
		}
	}, 150)
	$(".take").click(function() {
		HLog.event("wpys_phone_take");
		$(".page_one img").hide();
		$(".take").hide();
		$("#video_one")[0].play();
		$("#video").css("z-index" , "10");
		$("#video_one").css({"margin-top" : "-2rem","z-index" : "10"});
//		$(".page_one").hide();
//		$("#video_one").show();
		$("#bgMusic").remove();
	});
	video_one.onended = function() {
		$(".page_one").hide();
		$(".page_two").show();
		$(".page_two img").css("margin-top" , "-1.5rem");
		
	};
	$("#btn").click(function() {
		HLog.event("wpys_phone_gua");
		$(".page_two img").hide();
		$("#btn").hide();
		$("#video1").css("z-index" , "10");
		$("#video_two").css({"margin-top" : "-2rem","z-index" : "10"});
		$("#video_two")[0].play();
	});
	video_two.onended = function() {
		$(".page_two").hide();
		$(".page_three").show();
//		$(".page_three").css("margin-top" , "-2rem");
	};
	$("#share_btn").click(function() {
		HLog.event("wpys_phone_share");
		$(".share_img").show();
	});
	$(".share a:nth-child(1)").click(function() {
		HLog.event("wpys_phone_enter");
	});
	$(".share_img").click(function() {
		$(this).hide();
	});
})