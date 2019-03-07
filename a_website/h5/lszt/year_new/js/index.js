var dm_url = "/lszt/oldplayer/get-sign-log.html" + h5_jk_url; //弹幕
var login_url = "/lszt/oldplayer/sign.html" + h5_jk_url; //确认签到
var lb_url = '/lszt/oldplayer/get-gift.html' + h5_jk_url; //获取礼包
var clickTap = false;

//兑换码
function code() {
	$.ajax({
		type: 'POST',
		url: lb_url,
		data: {},
		success: function(data) {
			var data = JSON.parse(data);
			if(data.status == 0) {}
			$(".code_bg p").text(data.msg);
		},
		error: function() {
			alert("网络请求错误，请刷新页面");
			$(".c_put").text("网络请求错误，请刷新页面");
		}
	});
}
$(".play").click(function() {
	if(clickTap) {
		$("#audio")[0].play();
		$(this).addClass("active");
		clickTap = false;
	} else {
		$("#audio")[0].pause();
		$(this).removeClass("active");
		clickTap = true;
	}

});
//弹幕
function danmu() {
	$.ajax({
		type: 'POST',
		url: dm_url,
		data: {},
		success: function(data) {
			var data = JSON.parse(data);
			if(data.status == 0 && data.msg.data.length > 0) {
				var strArr = new Array();
				for(i = 0; i < data.msg.data.length; i++) {
					var dm_li = data.msg.data[i].data.name + ":" + data.msg.data[i].data.year + "年征途玩家！" + data.msg.data[i].data.content;
					strArr.push(dm_li);
				}
				var colorArr = ['#fff', '#50f200', '#ffae00', '#00ccff', '#ff0018', '#fff', '#50f200', '#ffae00', '#00ccff', '#ff0018'];
				var toparr = [0, 0.6, 1.2, 1.8, 2.4];

				function danmufun() {
					var topindex = Math.floor(toparr.length * Math.random());
					var span = $('<span style="top:' + toparr[topindex] + 'rem;color:' + colorArr[Math.floor(colorArr.length * Math.random())] + ';">' + strArr[Math.floor(strArr.length * Math.random())] + '</span>');
					toparr.splice(topindex, 1);
					span.appendTo(".danmu").animate({
						left: -span.width() + "px"
					}, 10000, 'linear', function() {
						toparr.push(parseFloat($(this).css('top')) / parseFloat($('html').css('fontSize')));
						$(this).remove();
					});
					setTimeout(function() {
						danmufun();
					}, 1500 + Math.random() * 1000);
				}
				danmufun();
			} else {
				$(".danmu").hide();
			}
		},
		error: function() {
			alert("网络请求错误，请刷新页面");
			$(".danmu").hide();
		}
	});
}
//canvas视频
function childFun() {
	var childImg = document.createElement("img");
	var childDom = document.getElementById("child");
	childImg.src = $(childDom).attr("data-src");
	var child = childDom.getContext("2d");
	var x = 0;

	function drawChild() {
		x += 640;
		if(childImg.width != 0 && x >= childImg.width) {
			x = 0;
			var t = setInterval(function() {
				if(childImg.complete) {
					$(".loading").addClass("hidden");
					$("body,html").addClass("no_auto").removeClass("has_auto");
					clearInterval(t);
					drawChild();
				}
			}, 100);
			return;
		}
		child.clearRect(0, 0, childDom.width, childDom.height);
		child.beginPath();
		child.save();
		//9个参数
		//1元素节点
		//2切割的起始X坐标
		//3切割的起始的Y坐标
		//4切割宽度
		//5切割高度
		//6切割好的图片的定位X坐标
		//7切割好的图片的定位Y坐标
		//8显示切割图片的宽度
		//9显示切割图片的高度
		child.drawImage(childImg, x, 0, 640, 360, 0, 0, childDom.width, childDom.height);
		child.closePath();
		child.stroke();
		child.restore();
		setTimeout(drawChild, 200);
	}
	var t = setInterval(function() {
		if(childImg.complete) {
			clearInterval(t);
			drawChild();
		}
	}, 100);
}
//选择按钮
var li_click = "";
$(".age").click(function() {
	var li_click = $(this).parent().find(".t_ul");
	$(this).parent().find(".t_ul").slideDown();
	$(".t_ul2").slideUp();
});
$(".word").click(function() {
	var li_click = $(this).parent().find(".t_ul");
	$(this).parent().find(".t_ul").slideDown();
	$(".t_ul1").slideUp();
});
$(".t_ul1 li").click(function() {
	var text1 = $(this).text();
	var year1 = $(this).data("num");
	var g_year1 = $(this).data("id");
	$(this).addClass("active").siblings().removeClass("active");
	$(".age.l_put").val(text1);
	$(".age.l_put").attr("data-num", year1);
	$(".age.l_put").attr("data-id", g_year1);
	$(".t_ul1").slideUp();

})
$(".t_ul2 li").click(function() {
	var text2 = $(this).text();
	$(this).addClass("active").siblings().removeClass("active");
	$(".word.l_put").val(text2);
	$(".t_ul2").slideUp();
})
//确认签到
$(".sure").click(function() {
	var name = $(".name").val();
	var year = $(".age").data("num");
	var g_year = $(".age").data("id");
	var content = $(".word").val();
	if(name == "" || name == undefined) {
		alert("请输入您的《征途》昵称哦~");
		return;
	}
	if(year == "" || year == undefined) {
		alert("请选择您的《征途》年龄哦~");
		return;
	}
	if(content == "" || content == undefined) {
		alert("请选择您中意的签到语哦~");
		return;
	}

	$.ajax({
		type: 'POST',
		url: login_url,
		data: {
			"name": name,
			"year": year,
			"content": content,
		},
		success: function(data) {
			var data = JSON.parse(data);
			if(data.status == 0) {
				$(".g_name").text(name);
				$(".g_num").text(g_year + "年征途情");
				$(".qdy").text(content);
				code();
				$(".js_load").show();
				$(".kv").hide();
				$(".second").show();
				$("#k_video")[0].pause();
				$("#audio")[0].pause();
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
					canvas: canvas2
				}).then(function(canvas) {
					$(".js_load").hide();
					$("#z_img").attr("src", canvas.toDataURL("data:image/png"));
				});
			}
		},
		error: function() {
			alert("网络请求错误，请刷新页面");
		}
	})
});
var u = navigator.userAgent,
	app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isAndroid) {
	$("body,html").addClass("has_auto");
	setTimeout(function() {
		childFun();
	}, 100);
}
$(".v_play").click(function() {
	if(isAndroid) {
		$(".canvasbox").hide();
		$("#k_video").show();
		$("#k_video")[0].play();
		$("#audio")[0].pause();
		$(".play").removeClass("active");
	}
})
window.onload = function() {
	$(".loading").hide();
	$(".kv").show();
	if(isIOS) {
		$(".canvasbox").hide();
		$("#audio")[0].pause();
		$(".play").removeClass("active");
	}
};
$(function() {
	danmu();
});