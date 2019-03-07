var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var yy_url1='/commonMethod/ajax-yuyue.html';//预约
var yy_url2='/commonMethod/ajax-yuyue-verify.html';//预约验证码
var srf = $('meta[name="csrf-token"]').attr('content');
var today_draw_count=0;
var phone_type=0; //0--ios  1--and
var invite_code="";
//手机类型判断
var u = navigator.userAgent,
    app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isIOS) {
  phone_type=0;
}else{
  phone_type=1;
}
var imgMarkIndex2=0;
function load_captcha2(){
  imgMarkIndex2++;
  var imgUrl2 = "/commonMethod/captcha.html?refresh=" + imgMarkIndex2;
  $.get(imgUrl2, {}, function(data) {
    $(".co_captcha2 img").attr("src",data.url);
  }, 'json');
}
//图片验证码刷新
$(".co_captcha1").click(function(){
  load_captcha();
});
$(".co_captcha2").click(function(){
  load_captcha2();
});
 //点击筛选类型
    $(".type_ul li").click(function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
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
  console.log(2);
}
//错误提示显示
function showErr(index, text) {
  $(".co_error").eq(index).addClass("co_err_show").html(text);
  $(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
  $(".co_error").eq(index).removeClass("co_err_show");
}
$(".down_btn").click(function(){
  $(".co_tips_yuyue").removeClass("hidden");
})
//预约获取验证码
  $(".co_codebtn2").click(function (){
    var type = $(".type_ul li.active").attr("data-type");
    var phone = $(".co_username2").val();
    var img_code = $(".captcha2").val();
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
        $(".co_codebtn2").css("pointer-events","none");
        page_djs($(".co_codebtn2"),function(){
        $(".co_codebtn2").css("pointer-events","auto");
        });
        console.log(1);
      } else {
        alert(data.msg);
        load_captcha2();
      }
    },"json");
  });
  //预约请求
  $(".co_tips_yybtn").click(function (){
    fgw_yy_pc();
    var type = $(".type_ul li.active").attr("data-type");
    var phone = $(".co_username2").val();
    var yzm = $(".co_codenum2").val();
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
        fgw_yy_pc_success();
        alert(data.msg);
        $(".co_tips_yuyue").addClass("hidden");
        $(".co_username2").val("");
        $(".captcha2").val("");
        $(".co_codenum2").val("");
      } else {
        alert(data.msg);
      }
    },"json")
  });
//初始化
$(function(){
  swiper02 = new Swiper('.swiper-container2',{
    loop:true,
    autoplay: 3000,
    pagination: '.swiper-pagination2',
    effect : 'coverflow',
    slidesPerView: 3,
    paginationClickable: true,
    centeredSlides: false,
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    coverflow: {
      rotate: 60,
      stretch:40,
      depth:200,
      modifier:1,
      slideShadows : false
    },
    autoplayDisableOnInteraction: false
  });
  load_captcha2();
});
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_tips_login .co_input input').val("");
  $(".co_error").removeClass("co_err_show");
  $("body,html").removeClass("no_auto");
});
$(".co_tips_surebtn").click(function(){
  $(".co_tips").addClass("hidden");
});
 $(".top_ul li").on("click", function() {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".right_con ul").eq(index).addClass("active").siblings().removeClass("active");
    });
 $(".return_top").click(function(){
      $("html,body").animate({
			scrollTop: 0
		}, 500);
 });

