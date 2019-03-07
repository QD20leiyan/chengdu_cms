var verify_url='/commonMethod/ajax-yuyue-verify.html';//预约发送验证码
var yy_url='/commonMethod/ajax-yuyue.html';//预约
var srf = $('meta[name="csrf-token"]').attr('content');
var type="";
var id="";
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
  imgMarkIndex++;
  var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
  $.get(imgUrl, {}, function(data) {
    $(".co_captcha img").attr("src",data.url);
  }, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
  load_captcha();
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
//邮箱格式
function isEmail(email) {
      var reg = /^[^@]+@[^@]+\.[^@]+$/;
    var temp = reg.test(email);
    return temp;
  }
//初始化
$(function(){
  //图片验证码获取
  load_captcha();
  var swiper01 = new Swiper('.swiper-container', {
     pagination: '.swiper-pagination',
     paginationClickable: true,
     autoplayDisableOnInteraction : false,
     prevButton:'.swiper-button-prev',
     nextButton:'.swiper-button-next',
     autoplay:4000,
     loop:true
  });
  //顶部位置
//$(window).scroll(function(){
//  var $t = $(this).scrollTop();
//  if($t > 0){
//    $(".menu").css({"top":"0"});
//    $("#Hero-bar").css({"zIndex":"98"});
//  }else{
//    $(".menu").css({"top":"42px"});
//    $("#Hero-bar").css({"zIndex":"9999999"});
//  }
//});
});
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_input input').val("");
  $(".co_error").removeClass("co_err_show");
});
//预约弹框显示
$(".yy_btn").click(function(){
  id=$(this).attr("data-id");
  if(id==1){
    type="ios";
    $(".put_email").show();
    $(".co_tips_title").removeClass("active");
  }else if(id==2){
    type="android";
    $(".put_email").hide();
    $(".co_tips_title").addClass("active");
  }
  $(".co_tips_login").removeClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
  var my_phone = $(".co_username").val();
  var email = $(".email").val();
  var captcha = $(".captcha").val();
  console.log(id);
  if(id==2){
    type="android";
  }
  if(id==1){
    type="ios";
    if(email == "" || email == undefined || !isEmail(email)) {
        showErr(0, "请输入邮箱~");
        return;
      }
  }
  if(my_phone == "" || my_phone == undefined) {
    showErr(1, "手机号码不能为空哦");
    return;
  }else if(my_phone.length != 11){
    showErr(1, "手机号码不正确哦");
    return;
  }
  hideErr(1);
  if(captcha == "" || captcha == undefined) {
    showErr(2, "验证码不能为空哦");
    return;
  }
  hideErr(2);
  $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"email":email,"type":type,"cms_csrf":srf },function(data){
    if(data.status == 0){
      $(".co_codebtn1").css("pointer-events","none");
      page_djs($(".co_codebtn1"),function(){
        $(".co_codebtn1").css("pointer-events","auto");
      });
    }else{
      alert(data.msg);
      load_captcha();
    }
  }, 'json');
});
//点击预约
$(".co_tips_yybtn").click(function(){
  fgw_yy_pc();
  var my_phone = $(".co_username").val();
  var co_codenum1=$('.co_codenum1').val();
  var email = $(".email").val();
  console.log(id);
  if(id==2){
    type="android";
  }
  if(id==1){
    type="ios";
    if(email == "" || email == undefined || !isEmail(email)) {
        showErr(0, "请输入邮箱~");
        return;
      }
  }
  if(my_phone == "" || my_phone == undefined) {
    showErr(0, "手机号码不能为空哦");
    return;
  }else if(my_phone.length != 11){
    showErr(0, "手机号码不正确哦");
    return;
  }
  hideErr(0);
  if(co_codenum1 == "" || co_codenum1 == undefined) {
    showErr(2, "验证码不能为空哦");
    return;
  }
  hideErr(2);
  $.ajax({
    'url':yy_url,
    'data':{'phone':my_phone,'yzm':co_codenum1,"type":type,"email":email,"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        fgw_yy_pc_success();
        alert("预约成功");
        $(".co_tips_login").addClass("hidden");
      }else{
        showErr(2, data.msg);
        load_captcha();
      }
    }
  });
});
//返回顶部
$(".go_top").click(function(){
  var a;
  function back(){
    a=setInterval(go_top,5);
  }
  function go_top(){
    if(window.scrollY<=0){
      clearInterval(a);
    }else{
      scrollTo(0,window.scrollY-30);
    }
  }
  back();
});
