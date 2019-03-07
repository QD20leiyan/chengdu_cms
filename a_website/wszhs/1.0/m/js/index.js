var yy_url1='/commonMethod/ajax-yuyue.html';//预约
var yy_url2='/commonMethod/ajax-yuyue-verify.html';//预约验证码
//60s倒计时验证
var countdown = 60;

function sendemail() {
	var obj = $(".i_code");
	settime(obj);
};
function page_djs(obj) {
  if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("剩余(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000);
}
function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("剩余(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
//图片验证码
var imgMarkIndex2=0;
function load_captcha2(){
  imgMarkIndex2++;
  var imgUrl2 = "/commonMethod/captcha.html?refresh=" + imgMarkIndex2;
  $.get(imgUrl2, {}, function(data) {
    $(".captcha2 img").attr("src",data.url);
  }, 'json');
}
$(".captcha2").click(function(){
  load_captcha2();
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
$(function() {
	var srf = $("meta[name='csrf-token']").attr("content");
	load_captcha2();
	 //点击筛选类型
    $(".type_ul li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
	//预约获取验证码
  $(".g_code").click(function (){
    var type = $(".type_ul li.active").attr("data-type");
    var phone = $(".phone").val();
    var img_code = $(".t_yzm").val();
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
    $.post(yy_url2,{
      "phone": phone,
      'type': type,
      "captcha": img_code,
      "cms_csrf": srf
    },function (data){
      if(data.status == 0){
        $(".g_code").css("pointer-events","none");
        page_djs($(".g_code"),function(){
        $(".g_code").css("pointer-events","auto");
        });
        console.log(1);
      } else {
        alert(data.msg);
        load_captcha2();
      }
    },"json");
  });
  //预约请求
  $(".l_yuyue").click(function (){
    fgw_yy_wap();
    var type = $(".type_ul li.active").attr("data-type");
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
    $.post(yy_url1,{
      'phone': phone,
      'type': type,
      'yzm': yzm,
      "cms_csrf": srf
    },function (data){
      if(data.status == 0){
        fgw_yy_wap_success();
        alert(data.msg);
        $(".yuyue").hide();
        $(".co_username2").val("");
        $(".co_codenum2").val("");
      } else {
        alert(data.msg);
      }
    },"json")
  });
  $(".down_btn,.enter").click(function(){
  $(".yuyue").show();
})
	
	//点击关闭弹窗
	$(".close").click(function() {
		$(this).parent().parent().hide();
		move();
	});
	//点击弹出地址弹窗
	$(".t_dizhi").click(function() {
		$(".success").hide();
		$(".dizhi").show();
		stop();
	});
	//点击确定关闭弹窗
	$(".c_sure").click(function() {
		$(".my_price").hide();
	});
	$(".p_sure").click(function() {
		$(".tip").hide();
	});
	var clickNum = true;
	$(".t_weixin").click(function (){
		if(clickNum){
			$('.f_weixin').show();
			clickNum = false;
		} else {
			$('.f_weixin').hide();
			clickNum = true;
		}
	});
	 // var clickNumber2 = 0;
  //   $('.enter').click(function () {
  //       if(clickNumber2 % 2 == 0) {
  //       $('.down_list').slideDown(500);
  //       }else{
  //       $('.down_list').slideUp(500);
  //       }
  //       clickNumber2++;
  //   })
  //   $(".fade").click(function(){
  //       $('.down_list').slideUp(500);
  //       clickNumber2=0;
  //   });
  //   $(".news-list li").on("click", function() {
  //       var index = $(this).index();
  //       $(this).addClass("active").siblings().removeClass("active");
  //       $(".news-info li.info").eq(index).addClass("active").siblings().removeClass("active");
  //   });
})