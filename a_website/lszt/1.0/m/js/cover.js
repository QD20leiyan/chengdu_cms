var num_url = '/common/get-yuyue-count.html';//预约人数
var verify_url='/common/get-login-verify.html';//登录发送验证码
var login_url1='/site/login.html';//登录
var login_url='/site/get-user-info.html';//判断用户是否登录
var out_url='/site/logout.html';//注销登录
var yy_url='/site/yuyue.html';//预约
var get_url='/site/choose.html';//称号领取
var srf = $('meta[name="csrf-token"]').attr('content');
var invite_code="";
var is_yuyue=0;
var is_yybtn=0;
//var is_type=1;
var is_choose=0;
var is_focus=0;//input获取事件焦点
var djs_timer=null;
// 设备类型判断
function change(){
  var u = navigator.userAgent,
      app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  var url = window.location.href;
  var  url_id=window.location.href.split('cover')[1];
  console.log(url_id);
//   if(isIOS) {
//     $(".header_a .download ").removeClass("js_wap_down");
//     $(".header_a .download").attr("href", "javascript:yx_showTips('抱歉,iOS暂时还未上架，请使用安卓设备下载体验');");
//   }
  if(isAndroid) {
        if(url_id==2 || url_id=="2.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover2-P34445A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }else if(url_id==3 || url_id=="3.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover3-P34446A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }else if(url_id==4 || url_id=="4.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover4-P34447A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==5 || url_id=="5.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover5-P34448A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==6 || url_id=="6.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover6-P34449A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==7 || url_id=="7.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover7-P34450A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==8 || url_id=="8.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover8-P34451A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==9 || url_id=="9.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover9-P34452A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==10 || url_id=="10.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover10-P34453A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==11 || url_id=="11.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover11-P34454A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==12 || url_id=="12.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover12-P34455A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==13 || url_id=="13.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover13-P34456A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==14 || url_id=="14.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover14-P34457A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==15 || url_id=="15.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover15-P34458A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==16 || url_id=="16.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover16-P34459A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==17 || url_id=="17.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover17-P34460A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==18 || url_id=="18.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover18-P34461A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==19 || url_id=="19.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover19-P34462A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==20 || url_id=="20.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover20-P34463A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==21 || url_id=="21.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover21-P34464A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==22 || url_id=="22.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover22-P34465A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==23 || url_id=="23.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover23-P34466A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==24 || url_id=="24.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover24-P34467A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==25 || url_id=="25.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover25-P34468A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==26 || url_id=="26.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover26-P34469A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==27 || url_id=="27.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover27-P34470A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==28 || url_id=="28.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover28-P34471A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==29 || url_id=="29.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover29-P34472A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==30 || url_id=="30.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover30-P34473A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==31 || url_id=="31.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover31-P34474A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==32 || url_id=="32.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover32-P34475A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==33 || url_id=="33.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover33-P34476A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==34 || url_id=="34.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover34-P34477A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==35 || url_id=="35.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover35-P34478A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==36 || url_id=="36.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover36-P34479A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else if(url_id==37 || url_id=="37.html"){
            $(".header_a .download").attr("href","http://cdn.yingxiong.com/lszt/lszt-cover37-P34480A-0820.apk");
            $(".header_a .download").removeClass("js_wap_down");
        }
        else{
            $(".header_a .download").attr("href","javascript:;");
            $(".header_a .download").addClass("js_wap_down");
        }
  }
}
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
  imgMarkIndex++;
  var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
  $.get(imgUrl, {}, function(data) {
    $(".co_captcha").html(data.msg);
    $(".co_imgtxt").addClass("hidden");
  }, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
  load_captcha();
  is_focus=2;
});
$(".co_imgtxt").click(function(){
  var my_phone = $(".co_username").val();
  if(my_phone == "" || my_phone == undefined) {
    showErr(0, "手机号码不能为空哦");
    return;
  }else if(my_phone.length != 11){
    showErr(0, "手机号码不正确哦");
    return;
  }hideErr(0);
  load_captcha();
});
//图片验证码焦点获取显示验证码
$(".co_input input").focus(function(){
    is_focus++;
    console.log(is_focus);
    if(is_focus==1){
        load_captcha();
    }
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
//登录请求
function get_login(){
  var my_phone = $(".co_username").val();
  var co_codenum1 =  $(".co_codenum1").val();
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
    'url':login_url1,
    'data':{'phone':my_phone,'yzm':co_codenum1,"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $("body,html").removeClass("no_auto");
        $(".co_tips_login").addClass("hidden");
        $(".co_before").addClass("hidden");
        $(".co_after").removeClass("hidden");
        $('.co_tips_login .co_input input').val("");
        $('.user_phone').text(data.msg.phone);
        $(".copy_link1").attr("data-clipboard-text",data.msg.data.gift_code);
        $(".my_yycode").text(data.msg.data.gift_code);
        $(".yy_pw span").text(data.msg.data.yuyue_num);
        is_yuyue=data.msg.data.is_yuyue;
        is_choose=data.msg.data.is_choose;
        if(is_choose==1){
            $(".my_chcode").text(data.msg.data.new_player_gift_code);
            //$(".co_tips_ts .new_code span").text(data.msg.data.new_player_gift_code);
            $(".copy_link2").attr("data-clipboard-text",data.msg.data.new_player_gift_code);
        }else if(is_choose==2){
            $(".my_chcode").text(data.msg.data.old_player_gift_code);
            //$(".co_tips_ts .new_code span").text(data.msg.data.old_player_gift_code);
            $(".copy_link2").attr("data-clipboard-text",data.msg.data.old_player_gift_code);
        }
        if(is_yybtn==1){//预约按钮
          if(is_yuyue==1){//已预约
            $(".co_tips_login").addClass("hidden");
            $(".co_tips_success").removeClass("hidden");
            $(".co_tips_success .co_tips_title").addClass("co_tips_altitle").removeClass("co_tips_cgtitle");
            $(".co_tips_success .tips_al").removeClass("hidden");
            $(".co_tips_success .tips_al").text("您已完成预约，请勿重复预约");
            //$(".check_ward").addClass("hidden");
            $(".yy_code,.yy_pw").removeClass("hidden");
            $(".order_box .order").addClass("hidden");
          }else{
            $(".co_tips_login").addClass("hidden");
            $(".co_tips_type").removeClass("hidden");
          }
        }else{//登陆按钮
          if(is_yuyue==1){
            $(".co_tips_login").addClass("hidden");
            alert("登陆成功");
            //$(".check_ward").addClass("hidden");
            $(".yy_code,.yy_pw").removeClass("hidden");
            $(".order_box .order").addClass("hidden");
          }else{
            $(".co_tips_login").addClass("hidden");
            $(".co_tips_type").removeClass("hidden");
          }
        }
      }else{
        showErr(2, data.msg);
        load_captcha();
        //alert(data.msg);
      }
    }
  });
}
//获取url中的参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) return unescape(r[2]);
  return null;
}
//预约人数
function ordernum() {
  $.ajax({
    'url':num_url,
    'data':{'name': 'lszt_total',"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        if(data.msg == 'null' || data.msg == null||data.msg =="") {
          $(".i_main .order_box .num>span").text("0");
        }else{
          var num = data.msg+"";
          $(".num>span").text("0");
          for(var i=0;i<num.length;i++){
            $('.num>span').eq(6-i).text(num.substr(num.length-i-1,1));
          }
        }
      }else{}
    }
  });
}
//判断用户是否登录
function is_login(){
  $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $(".co_tips_login").addClass("hidden");
        $(".co_before").addClass("hidden");
        $(".co_after").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $(".copy_link1").attr("data-clipboard-text",data.msg.data.gift_code);
        $(".my_yycode").text(data.msg.data.gift_code);
        $(".yy_pw span").text(data.msg.data.yuyue_num);
        is_yuyue=data.msg.data.is_yuyue;
        is_choose=data.msg.data.is_choose;
        if(is_choose==1){
           $(".my_chcode").text(data.msg.data.new_player_gift_code);
           //$(".co_tips_ts .new_code span").text(data.msg.data.new_player_gift_code);
           $(".copy_link2").attr("data-clipboard-text",data.msg.data.new_player_gift_code);
        }else if(is_choose==2){
           $(".my_chcode").text(data.msg.data.old_player_gift_code);
           //$(".co_tips_ts .new_code span").text(data.msg.data.old_player_gift_code);
           $(".copy_link2").attr("data-clipboard-text",data.msg.data.old_player_gift_code);
        }
        if(is_yuyue==1){
          //$(".check_ward").addClass("hidden");
          $(".yy_code,.yy_pw").removeClass("hidden");
          $(".order_box .order").addClass("hidden");
        }
      }else{}
    }
  });
}
//初始化
$(function(){
  change();
  //获取分享链接中的邀请码
  invite_code=getUrlParam('invite_code');
  console.log(invite_code);
  //swiper
  var swiper01 = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination1',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:3000,
    loop:true
  });

  var swiper02 = new Swiper('.swiper-container2',{
    pagination: '.swiper-pagination2',
    paginationClickable: true,
//        autoplayDisableOnInteraction : false,
    effect : 'fade',
    fade: {
      crossFade: true,
    },
    slidesPerView: 1,
    loop:true,
    prevButton:'.swiper-button-prev2',
    nextButton:'.swiper-button-next2',
  });
  //判断用户是否登录
  is_login();
  ordernum();
  setInterval(function() {
    ordernum();
  }, 60000);
});
//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
  var index=$(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_tips_login .co_input input').val("");
  $(".co_error").removeClass("co_err_show");
  $("body,html").removeClass("no_auto");
});
$(".co_tips_think").click(function(){
  $(".co_tips").addClass("hidden");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
  $(".co_tips_login").removeClass("hidden");
  $(".co_tips_login .co_tips_title").addClass("co_tips_logintitle").removeClass("co_tips_yytitle");
  $(".co_tips_login .co_tips_btn").addClass("co_tips_loginbtn").removeClass("co_tips_yybtn");
  $("body,html").addClass("no_auto");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
  var my_phone = $(this).closest(".co_tips_login").find(".co_username").val();
  var captcha =  $(this).closest(".co_tips_login").find(".captcha").val();
  if(my_phone == "" || my_phone == undefined) {
    showErr(0, "手机号码不能为空哦");
    return;
  }else if(my_phone.length != 11){
    showErr(0, "手机号码不正确哦");
    return;
  }
  hideErr(0);
  if(captcha == "" || captcha == undefined) {
    showErr(1, "验证码不能为空哦");
    return;
  }
  hideErr(1);
  $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
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
//点击登陆或者点击预约
$(".co_tips_login .co_tips_btn").click(function(){
  if($(this).hasClass("co_tips_yybtn")){
    is_yybtn=1;
    get_login();
  }else{
    is_yybtn=0;
    get_login();
  }
});
//预约
$(".order").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_login .co_tips_title").removeClass("co_tips_logintitle").addClass("co_tips_yytitle");
    $(".co_tips_login .co_tips_btn").removeClass("co_tips_loginbtn").addClass("co_tips_yybtn");
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
  }else{
    //登录之后
    if(is_yuyue==1){
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .co_tips_title").addClass("co_tips_altitle").removeClass("co_tips_cgtitle");
      $(".co_tips_success .tips_al").removeClass("hidden");
      $(".co_tips_success .tips_al").text("您已完成预约，请勿重复预约");
    }else{
      $(".co_tips_type").removeClass("hidden");
    }
  }
});
//手机类型选择
$(".rdo").click(function(){
  $(this).addClass("on").siblings().removeClass("on");
});
//立即预约请求
$(".co_tips_type .co_tips_yybtn").click(function(){
  var type_id=$(".rdo.on").attr("data-id");
  fgw_yy_wap();
//if(type_id==1){
//  var type="ios";
//}else if(type_id==2){
//  var type="android";
//}
  $.post(yy_url,{ "type":"android","cms_csrf":srf },function(data){
    if(data.status == 0){
      fgw_yy_wap_success();
      is_yuyue=1;
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .co_tips_title").addClass("co_tips_cgtitle").removeClass("co_tips_altitle");
      $(".co_tips_success .tips_al").addClass("hidden");
      ordernum();
      $(".my_yycode").text(data.data.gift_code);
      $(".copy_link1").attr("data-clipboard-text",data.data.gift_code);
      //$(".my_chcode").text(data.data.new_player_gift_code);
      ////$(".co_tips_ts .new_code span").text(data.data.new_player_gift_code);
      //$(".copy_link2").attr("data-clipboard-text",data.data.new_player_gift_code);
      $(".yy_pw span").text(data.data.yuyue_num);
      //$(".check_ward").addClass("hidden");
      $(".yy_code,.yy_pw").removeClass("hidden");
      $(".order_box .order").addClass("hidden");
    }else{
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_ts1").removeClass("hidden");
      $(".co_tips_ts1 .success_ts").text(data.msg);
    }
  }, 'json');
});
//我的礼包
//$(".check_ward").click(function(){
//  if($(".co_after.hidden").length>0){
//    $(".co_tips_login").removeClass("hidden");
//    $("body,html").addClass("no_auto");
//  }else{
//    if(is_yuyue==0){
//      $(".co_tips_ts1").removeClass("hidden");
//      $(".co_tips_ts1 .success_ts").text("您还没有礼包，请预约获得礼包 ");
//    }
//  }
//});
//注销登录
$(".logout").click(function(){
  $.ajax({
    'url':out_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        alert("注销成功");
        $(".co_before").removeClass("hidden");
        $(".co_after").addClass("hidden");
        $('.user_phone').text("");
        $(".copy_link1,.copy_link2").attr("data-clipboard-text","");
        is_yuyue=0;
        $(".co_codebtn1").html("获取验证码");
        $(".co_codebtn1").css("pointer-events","auto");
        //$(".check_ward").removeClass("hidden");
        $(".yy_code").addClass("hidden");
        $(".order_box .order").removeClass("hidden");
        $(".yy_pw").addClass("hidden");
          if(djs_timer){
              clearInterval(djs_timer);
          }
      }else{
        alert(data.msg);
      }
    }
  });
});
//复制
new Clipboard('.copy');
$(".copy").click(function() {
  alert("已复制");
});
//称号领取弹框显示
$(".xlb_btn").click(function(){
    if($(".co_after.hidden").length>0){
        $(".co_tips_login").removeClass("hidden");
        $("body,html").addClass("no_auto");
    }else{
        if(is_choose==0){
            is_choose=2;
            $(".co_tips_ch").removeClass("hidden");
        }else{
            $(".co_tips_ts").removeClass("hidden");
        }
        console.log(is_choose)
    }
});
$(".co_tips_ch .co_tips_close").click(function(){
  is_choose=0;
});
//称号选择
$(".co_tips.co_tips_ch .co_con .ch_img").click(function(){
    var type=$(this).data("type");
    $(this).addClass("active").siblings().removeClass("active");
    if(type==2){//大哥带你飞
        is_choose=2;
    }else{//萌新求照顾
        is_choose=1;
    }
    console.log(is_choose)
});
//称号确认
$(".co_tips_ch .co_tips_getbtn").click(function(){
    $.ajax({
        'url':get_url,
        'data':{'type':is_choose,"cms_csrf":srf},
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                if(is_choose==1){
                    $(".my_chcode").text(data.new_player_gift_code);
                    //$(".co_tips_ts .new_code span").text(data.new_player_gift_code);
                    $(".copy_link2").attr("data-clipboard-text",data.new_player_gift_code);
                    $(".co_tips_ch").addClass("hidden");
                    $(".co_tips_ts").removeClass("hidden");
                }else if(is_choose==2){
                    $(".my_chcode").text(data.old_player_gift_code);
                    //$(".co_tips_ts .new_code span").text(data.old_player_gift_code);
                    $(".copy_link2").attr("data-clipboard-text",data.old_player_gift_code);
                    $(".co_tips_ch").addClass("hidden");
                    $(".co_tips_ts").removeClass("hidden");
                }
            }
        }
        ,error:function(){
            alert("网络请求失败，请重新刷新页面");
        }
    });
});
//美女切换
$(".girl_list>span").on("click" , function (){
    $(".b_img .b_cimg").css("width","16rem");
    var img = $(this).attr("data-src");
    $(".z_img").attr("src",img);
    $(".b_img").stop().fadeIn();
});
$(".b_img").click(function() {
    $(this).stop().fadeOut();
    setTimeout(function(){
        $(".z_img").attr("src","");
    },500);
});
//每日福利按钮
$(".mr_btn").on("click" , function (){
    $(".b_img .b_cimg").css("width","18rem");
    var mr_img = $(".mr_gift").attr("src");
    $(".z_img").attr("src",mr_img);
    $(".b_img").stop().fadeIn();
});
//微信二维码
$(".weixin_btn").click(function(){
    $(".wechat").removeClass("hidden");
});
$(".wechat").click(function(){
    $(".wechat").addClass("hidden");
});


////称号选择
//$(".i_main .new_old .xlb_link>span").click(function(){
//  var type=$(this).data("type");
//  if(type==2){//大哥带你飞
//    location.href="http://h5.yingxiong.com/index/lszt/oldplayer.html";//大哥带你飞
//  }else{//萌新求照顾
//    if($(".co_after.hidden").length>0){
//      $(".co_tips_login").removeClass("hidden");
//      $("body,html").addClass("no_auto");
//    }else{
//      if(is_choose==0){
//        $(".co_tips_ch").removeClass("hidden");
//        if(type==2){
//          is_choose=2;
//          $(".co_tips_ch .tips_txt .name").text("大哥带你飞");
//        }else{
//          is_choose=1;
//          $(".co_tips_ch .tips_txt .name").text("萌新求照顾");
//        }
//        is_type = type;
//      }else{
//        if(is_choose==1){
//          $(".co_tips_ts .tips_txt").text('您已经领取过"萌新求照顾"称号');
//          $(".co_tips_ts .new_code,.co_tips_ts .co_tips_copybtn").removeClass("hidden");
//          $(".co_tips_ts .co_tips_go,.co_tips_ts .wechat").addClass("hidden");
//        }else{
//          $(".co_tips_ts .tips_txt").text('关注“绿色征途手游”微信公众号领取老玩家专属礼包');
//          $(".co_tips_ts .new_code,.co_tips_ts .co_tips_copybtn").addClass("hidden");
//          $(".co_tips_ts .co_tips_go").attr("href","http://h5.yingxiong.com/index/lszt/oldplayer.html");
//          $(".co_tips_ts .co_tips_go,.co_tips_ts .wechat").removeClass("hidden");
//        }
//        $(".co_tips_ts").removeClass("hidden");
//      }
//    }
//  }
//});
////确认前往活动页
//$(".co_tips_ch .co_tips_go").click(function(){
//  $.ajax({
//    'url':get_url,
//    'data':{'type':is_type,"cms_csrf":srf},
//    'type':'POST',
//    'dataType':'Json',
//    success:function(data){
//      if(data.status==0){
//        if(is_choose==2){
//          location.href="http://h5.yingxiong.com/index/lszt/oldplayer.html";//大哥带你飞
//        }else if(is_choose==1){
//          $(".co_tips_ch").addClass("hidden");
//          $(".co_tips_ts").removeClass("hidden");
//          $(".co_tips_ts .tips_txt").text("恭喜您领取“萌新求照顾”称号");
//          $(".co_tips_ts .new_code span").text(data.new_player_gift_code);
//          $(".co_tips_ts .co_tips_copybtn").attr("data-clipboard-text",data.new_player_gift_code);
//          $(".co_tips_ts .new_code,.co_tips_ts .co_tips_copybtn").removeClass("hidden");
//          $(".co_tips_ts .co_tips_go,.co_tips_ts .wechat").addClass("hidden");
//        }
//      }
//    }
//    ,error:function(){
//      alert("网络请求失败，请重新刷新页面");
//    }
//  });
//});
//$(".co_tips_think,.co_tips_ch .co_tips_close").click(function(){
//  is_choose=0;
//});
