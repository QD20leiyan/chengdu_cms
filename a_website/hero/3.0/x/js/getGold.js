var arm_url='/arms/ajax-get-arms.html';
var srf = $('meta[name="csrf-token"]').attr('content');


// ==================================================这里是领取金币JS===================================================
var pageGold = {
	type: "ios",
	imgMarkIndex: 1,
	cms_csrf: $('meta[name="csrf-token"]').attr('content'),
	getMarkIng: false,
	getGoldIng: false,
};
//点击领取金币礼包
$(".top_lb").click(function() {
	showGoldTc(0);
});
$(".tc_close").click(function() {
	closeGoldTc();
});
$(".tc1_type p").click(function() {
	$(".tc1_type p").removeClass("active");
	$(this).addClass("active");
	pageGold.type = $(this).attr("type");
});
//刷新图形验证码
$(".tc1_img_mark_box").click(function() {
	pageGold.imgMarkIndex++;
	getImgMark();
});
//点击获取验证码
$(".userMark1Box button").click(function() {
	var self = $(this);
	if(pageGold.getMarkIng) {
		return;
	}
	if(checkUserPhone() != true)
		return;
	if(checkImgMark() != true)
		return;

	pageGold.getMarkIng = true;

	$.post("/site/ajax-login-verify.html", {
		"phone": $(".userPhone").val(),
		"type": 2,
		"captcha": $(".userMark2").val(),
		"cms_csrf": pageGold.cms_csrf
	}, function(data) {
		console.log(data);
		pageGold.getMarkIng = false;
		var data = JSON.parse(data);
		if(data.status==101){
            $(".page_gold_code").html(data.msg);
            showGoldTc(1);
		} else if(data.status == 0) {
			countdownTime(self, 60, function() {
				self.html("获取验证码");
			})
		} else {
			showGoldErr(2, data.msg);
		}
	});
});

//点击领取金币
$(".tc1_sign").click(function() {
	var self = $(this);
	if(pageGold.getGoldIng) {
		return;
	}
	if(checkUserPhone() != true)
		return;
	if(checkMark() != true)
		return;

	pageGold.getGoldIng = true;

	$.post("/site/ajax-gold.html", {
		"phone": $(".userPhone").val(),
		"yzm": $(".userMark1").val(),
		"type": pageGold.type,
		"cms_csrf": pageGold.cms_csrf
	}, function(data) {
		pageGold.getGoldIng = false;
		var data = JSON.parse(data);
		console.log(data);

		if(data.status == 0) {
			$(".page_gold_code").html(data.msg);
			showGoldTc(1);
		} else {
			showGoldErr(2, data.msg);
		}

	});
});

$("#tc2_copy_btn").click(function() {
	new Clipboard("#tc2_copy_btn");
});
//获取图形验证码
function getImgMark() {
	$.get("/site/captcha.html?refresh=" + pageGold.imgMarkIndex, {}, function(data) {
		console.log(data);
		$(".tc1_img_mark").attr("src", data.url);
	});
}
getImgMark();

//显示金币弹窗
function showGoldTc(index) {
	$(".l_tc > div").removeClass("tc_show").eq(index).addClass("tc_show");
	$(".l_tc").addClass("l_tc_show");
}
//关闭金币弹窗
function closeGoldTc() {
	$(".l_tc").removeClass("l_tc_show");
}
//显示错误信息
function showGoldErr(index, text) {
	$(".tc1_err").eq(index).html(text).addClass("tc1_err_show");
}
//去掉错误显示
function closeGoldErr(index) {
	$(".tc1_err").eq(index).removeClass("tc1_err_show");
}
//判断手机号码
function checkUserPhone() {
	var userPhone = $(".userPhone").val();
	if(userPhone == "" || userPhone == undefined || userPhone == null) {
		showGoldErr(0, "请输入手机号码");
		return;
	}
	if(userPhone.length != 11) {
		showGoldErr(0, "请输入正确的手机号码");
		return;
	}
	closeGoldErr(0);
	return true;
}
//判断验证码
function checkMark() {
	var userMark1 = $(".userMark1").val();
	if(userMark1 == "" || userMark1 == undefined || userMark1 == null) {
		showGoldErr(2, "请输入手机验证码");
		return;
	}
	closeGoldErr(2);
	return true;
}
//判断图形验证码
function checkImgMark() {
	var userMark2 = $(".userMark2").val();
	if(userMark2 == "" || userMark2 == undefined || userMark2 == null) {
		showGoldErr(1, "请输入图形验证码");
		return;
	}
	closeGoldErr(1);
	return true;
}
//倒计时
function countdownTime(ele, time, callBack) {
	var markBtn = ele;
	var time = parseInt(time);
	markBtn.html(time + "s");
	var timer = setInterval(function() {
		time = time - 1;
		if(time == 0) {
			markBtn.html("获取验证码");
			clearInterval(timer);
			if(callBack) {
				callBack()
			}
			return;
		}
		markBtn.html(time + "s");
	}, 1000);
}

//武器大分类切换
$(".cont_wq .w_label_box>span").click(function(){
	$(".w_imgbox>img").attr("src","");
	$(this).addClass("active").siblings().removeClass("active");
	var id=$(this).attr("data-id");
	$.post(arm_url,{ "id":id,"cms_csrf":srf },function(data){
		$("#swiper3 .swiper-wrapper").empty();
		arms=data;
		var result = '';
		for(var i = 0; i < data.length; i++) {
			result += "<div class='swiper-slide"+(i==0?" active":"")+"'><div class='w_sm_gun' data-index='"+i+"'><img src="+data[i].content.pc_small_img+"></div></div>";
			if(i==0){
				$(".w_imgbox>img").attr("src",data[i].content.pc_big_img);
				$(".cont_wq .w_slide .w_txtbox .w_bigtitle").text(data[i].title);
				if(data[i].sub_title){
					$(".cont_wq .w_slide .w_txtbox .w_subtitle").text(data[i].sub_title).show();
				}else{
					$(".cont_wq .w_slide .w_txtbox .w_subtitle").hide();
				}
				$(".cont_wq .w_slide .w_txtbox .w_sign_box").empty();
				for(var j = 0 in data[i].content.label) {
					$(".cont_wq .w_slide .w_txtbox .w_sign_box").append("<span>"+data[i].content.label[j]+"</span>");
				}
				$(".cont_wq .w_slide .w_txtbox .w_info").text(data[i].summary);
				var wq_barnumarr=(data[i].content.attribute||"").split(",");

				$(".w_blue").percircle({
					text:"射速",
					percent:wq_barnumarr[0]||"0",
					progressBarColor: "#3C6DEA"
				});
				$(".w_red").percircle({
					text:"伤害",
					percent: wq_barnumarr[1]||"0",
					progressBarColor: "#E80303"
				});
				$(".w_yellow").percircle({
					text:"弹夹",
					percent: wq_barnumarr[2]||"0",
					progressBarColor: "#F5A119"
				});
			}
		}
		$("#swiper3  .swiper-wrapper").append(result);

		swiper3.update();

	}, 'json');
});
$(".cont_wq .w_label_box>span.active").trigger("click");
