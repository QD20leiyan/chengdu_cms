/*--------------------------------------------------赤潮页面----------------------------------------------------*/
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
/*--------------------------------------------------赤潮主播报名页面----------------------------------------------------*/
var verify_url ='/commonMethod/vote-verify';
var sign_url ='/site/enlist';

//错误提示显示
function showErr(index, text) {
	$(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
	$(".err").eq(index).removeClass("err_show");
}

//下拉框内容选择
$(".sign_list h1").click(function(){
	$(".sign_list ul").toggleClass("show");
});
$(".sign_list ul li").click(function() {
	var html = $(this).find("span").html();
	$(".sign_list ul li").removeClass("active");
	$(this).addClass("active");
	$(this).parent().removeClass("show");
	$(".sign_list h1").attr("checked", "true");
	$(".zbptname").html(html);
	if(html=='其他'){
		$(".other").show().focus();
	}else{
		$(".other").hide();
	}
});

//发送验证码
$(".send_code").click(function(){
	var zbphone = $(".zbphone").val();
	if(zbphone == "" || zbphone == undefined) {
		showErr(4, "请输入手机号");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(zbphone))) {
		showErr(4, "请输入正确的手机号码");
		return;
	}
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(verify_url,{ "phone":zbphone,"type":5,"cms_csrf":srf},function(data){
		if(data.status == 0){
			hideErr(4);
			page_djs($(".send_code"),function(){

			});
		}else{
			alert(data.msg);
		}
	}, 'json');
});

//确认提交
$(".order_btn").click(function(){
	var zbname = $(".zbname").val();
	var zbid = $(".zbid").val();
	var dyonename = $(".dyonename").val();
	var dyoneid = $(".dyoneid").val();
	var dytwoname = $(".dytwoname").val();
	var dytwoid = $(".dytwoid").val();
	var zbptname = $(".zbptname").html();
	zbptname=zbptname=='其他'?$(".other").val()||"其他":zbptname;//判断如果选择的其他则取输入的内容
	var zbptid = $(".zbptid").val();
	var zbphone = $(".zbphone").val();
	var yzm = $(".yzm").val();

	if(zbname == "" || zbname == undefined) {
		showErr(0, "请输入主播昵称");
		return;
	}if(zbid == "" || zbid == undefined) {
		showErr(0, "请输入主播ID");
		return;
	}
	hideErr(0);
	if(dyonename == "" || dyonename == undefined) {
		showErr(1, "请输入队员1昵称");
		return;
	}if(dyoneid == "" || dyoneid == undefined) {
		showErr(1, "请输入队员1ID");
		return;
	}
	hideErr(1);
	if(dytwoname == "" || dytwoname == undefined) {
		showErr(2, "请输入队员2昵称");
		return;
	}if(dytwoid == "" || dytwoid == undefined) {
		showErr(2, "请输入队员2ID");
		return;
	}
	hideErr(2);
	if(zbptname == "选择直播平台") {
		showErr(3, "请选择直播房间");
		return;
	}if(zbptid == "" || zbptid == undefined) {
		showErr(3, "请输入直播房间号");
		return;
	}
	hideErr(3);
	if(zbphone == "" || zbphone == undefined) {
		showErr(4, "请输入手机号");
		return;
	}if(!(/^1[34578]\d{9}$/.test(zbphone))) {
		showErr(4, "请输入正确的手机号码");
		return;
	}
	hideErr(4);
	if(yzm == "" || yzm == undefined) {
		showErr(5, "请输入验证码");
		return;
	}
	hideErr(5);
	var srf = $('meta[name="csrf-token"]').attr('content');
	$.post(sign_url,{ "zbname":zbname,"zbid":zbid,"zbphone":zbphone,"dyonename":dyonename,
		"dyoneid":dyoneid,"dytwoname":dytwoname,"dytwoid":dytwoid,"zbptname":zbptname,
		"zbptid":zbptid,"yzm":yzm, "cms_csrf":srf },function(data){
		if(data.status == 1){
			$(".apply_tips").removeClass("hidden");
			//alert(data.msg);
		}else{
			alert(data.msg);
		}
	}, 'json');
});

$(".apply_close").click(function(){
	$(".apply_tips").addClass("hidden");
});

