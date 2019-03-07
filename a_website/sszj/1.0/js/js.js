var imgMarkIndex = 1;
var srf = $('meta[name="csrf-token"]').attr('content');
var countdown = 60;
function load_captcha() {
	imgMarkIndex++;
	var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
	$.get(imgUrl, {}, function(data) {
		$(".captcha img").attr("src", data.url);
	}, 'json');
};
//倒计时
function sendemail() {
	var obj = $(".g_code");
	settime(obj);
};

function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("重新发送(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
$(function() {
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
	$(".s_ul li:nth-child(1)").hover(function (){
		$(".fl_wx").stop().fadeIn();
	},function (){
		$(".fl_wx").stop().fadeOut();
	});
	var mySwiper = new Swiper(".left_banner", {
		loop: true,
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
		paginationClickable: true,
	});
	var mySwiper = new Swiper(".right_banner", {
		loop: true,
		autoplay: 5000,
		autoplayDisableOnInteraction: false,
		//			pagination : '.swiper-pagination',
		//			paginationClickable :true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
	});
	$(".top_ul li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".right_con ul").eq(index).addClass("active").siblings().removeClass("active");
	});
	//获取预约人数
	getNum();
	load_captcha();
	getNumber();
	function getNum() {
		$.post(n_url, {
			"name":"ssp_total",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0){
				$(".left_num .c_num").html(data.msg);
			}
		}, "json")
	};
	function getNumber() {
		$.post(n_url, {
			"name":"cxp_total",
			"cms_csrf": srf
		}, function(data) {
			if(data.status == 0){
				$(".rihgt_num .c_num").html(data.msg);
			}
		}, "json")
	};
	//图片验证码刷新
	$(".captcha").click(function() {
		load_captcha();
	});
	//关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
	});
	//点击弹出弹窗
	$(".k_btn").click(function() {
		$(".login").show();
	});
	//点击筛选类型
	$(".type_ul li").click(function() {
		$(this).addClass("active").siblings().removeClass("active");
	});
	//手机获取验证码
	$(".g_code").click(function (){
		var type = $(".type_ul2 li.active").attr("data-type");
		var school = $(".type_ul1 li.active").attr("data-school");
		var phone = $(".phone").val();
		var img_code = $(".img_code").val();
		if(phone == "" || phone == undefined){
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11 ){
			alert("手机号不正确");
			return;
		}
		if(img_code == "" || img_code == undefined){
			alert("请输入图形验证码");
			return;
		}
		$.post("/commonMethod/ajax-yuyue-verify.html",{
			"phone": phone,
			'type': type,
			"captcha": img_code,
			"cms_csrf": srf
		},function (data){
			if(data.status == 0){
				sendemail();
			} else {
				load_captcha()
				alert(data.msg);
			}
		},"json");
	});
	//预约提交请求
	$(".send_yy").click(function (){
		fgw_yy_pc();
		var type = $(".type_ul2 li.active").attr("data-type");
		var school = $(".type_ul1 li.active").attr("data-school");
		var phone = $(".phone").val();
		var yzm = $(".yzm").val();
		if(phone == "" || phone == undefined){
			alert("手机号不能为空");
			return;
		}
		if(phone.length != 11 ){
			alert("手机号不正确");
			return;
		}
		if(yzm == "" || yzm == undefined){
			alert("请输入验证码");
			return;
		}
		$.post("/site/ajax-yuyue.html",{
			'phone': phone,
			'type': type,
			'school': school,
			'yzm': yzm,
			"cms_csrf": srf
		},function (data){
			if(data.status == 0){
				fgw_yy_pc_success();
				$(".phone").val("");
				$(".img_code").val("");
				$(".yzm").val("");
				$(".login").hide();
				$(".success").show();
			} else {
				alert(data.msg);
			}
		},"json")
	});
});