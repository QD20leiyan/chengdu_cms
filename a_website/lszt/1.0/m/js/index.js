var verify_url='/common/get-login-verify.html';//登录发送验证码
var login_url1='/site/login.html';//登录
var login_url='/site/get-user-info.html';//判断用户是否登录
var out_url='/site/logout.html';//注销登录
var yy_url='/site/yuyue.html';//预约
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var is_yybtn=0;
//var is_type=1;
var is_focus=0;//input获取事件焦点
var djs_timer=null;
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
        if(is_yuyue==1){
          //$(".check_ward").addClass("hidden");
          $(".yy_code,.yy_pw").removeClass("hidden");
          $(".order_box .order").addClass("hidden");
        }
      }else{}
    }
  });
}
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_tips_login .co_input input').val("");
  $(".co_error").removeClass("co_err_show");
  $("body,html").removeClass("no_auto");
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
$(".index_order").click(function(){
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
//if(type_id==1){
//  var type="ios";
//}else if(type_id==2){
//  var type="android";
//}
  $.post(yy_url,{ "type":"android","cms_csrf":srf },function(data){
    if(data.status == 0){
      is_yuyue=1;
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .co_tips_title").addClass("co_tips_cgtitle").removeClass("co_tips_altitle");
      $(".co_tips_success .tips_al").addClass("hidden");

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











var is_type=0;
//左导航标记
$(window).scroll(function() {
  var scroll = $(this).scrollTop() + document.documentElement.clientHeight/2;
  var zyh=$(".zy_box").height();
  var zyoffset=$(".zy_box").offset();
  if(scroll >= zyoffset.top && scroll < zyoffset.top + zyh) {
    if(is_type==0){
      is_type=1;
      $(".zy_box .left .sm_img span.sm1").addClass("active");
      $(".zy_box .left .big_img span:eq(0)").removeClass("hidden");
    }
  }
});
//初始化
$(function(){
  //判断用户是否登录
  is_login();
  //swiper
  var swiper01 = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination1',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:3000,
    loop:true
  });
  var swiper03 = new Swiper('.swiper-container3', {
    prevButton:'.swiper-button-prev3',
    nextButton:'.swiper-button-next3',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    //autoplay:3000,
    loop:true
  });
  var swiper07 = new Swiper('.swiper-container7', {
    slidesPerView:1,
    effect : 'fade',
    fade: {
      crossFade: true,
    },
    prevButton:'.swiper-button-prev7',
    nextButton:'.swiper-button-next7',
  });
  //新闻对应内容显示
  $(".news_box .hd ul li").click(function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
  });
  //职业角色显示
  var e = 0, t = $(".zy_box .left .big_img span"),i=$(".zy_box .right .right_info");
  $(".zy_box .left .sm_img").find("span").click(function () {
    $(this).addClass("active").siblings().removeClass("active"),
        e = $(this).index(),
        t.eq(e).removeClass("hidden").siblings().addClass("hidden");
    i.eq(e).removeClass("hidden").siblings().addClass("hidden");
  });
  //职业系列内容显示
  $(".zy_box .right .x_info .type span").click(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(this).closest(".x_info").find(".type_txt p").addClass("hidden");
    $(this).closest(".x_info").find(".type_txt p").eq(index).removeClass("hidden")
  });
  //职业技能内容显示
  $(".zy_box .right .jn_info .jn_img").hover(function(){
    var index=$(this).index();
    //$(this).addClass("active").siblings().removeClass("active");
    $(this).find(".sub").stop().fadeIn();
  }, function() {
    $(this).find(".sub").stop().fadeOut();
  });
  //视频中心内容切换
  $(".video_box .video_type span").click(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".video_box .video_info ").eq(index).removeClass("hidden").siblings(".video_box .video_info").addClass("hidden");
  });
  //玩家互动内容切换
  $(".player_box .play_type span").click(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".player_box .pl_info  ").eq(index).removeClass("hidden").siblings(".player_box .pl_info ").addClass("hidden");
    swiper03.update();
  });
  //视频中心大图弹窗
  $(".video_box .video_info.img1 .img_box").on("click", function() {
    var index=$(this).index();
    $(".b_img").stop().fadeIn();
    swiper07.update();
    swiper07.slideTo(index);
  });
  //点击关闭头像弹窗
  $(".i_close").click(function() {
    $(".b_img").stop().fadeOut();
  });
  //微信二维码
  $(".weixin_btn").click(function(){
    $(".wechat").removeClass("hidden");
  });
  $(".wechat").click(function(){
    $(".wechat").addClass("hidden");
  });
  //音乐播放
  $(".video_box .video_info.img3 .img_box").click(function(){
    var _this=$(this);
    var audio=document.getElementById('music1');
    var audio_src=_this.attr("data-url");
    if($("#music1").attr("src")!=audio_src){
      $("#music1").attr("src",audio_src);
      audio.pause();
      $(".video_box .video_info .img_box .play").removeClass("pause");
    }
    if(_this.find(".play").hasClass("pause")){
      audio.pause();
      _this.find(".play").removeClass("pause");
    }else{
      audio.play();
      _this.find(".play").addClass("pause");
    }
  });
  //滚动位置判断
  function showani(){
    $(".ani:not(.show-ani)").each(function(i,n){
      var offset=$(n).offset();
      var scrollY=window.pageYOffset || document.documentElement.scrollTop;
      if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/2){
        $(n).addClass("show-ani");
      }
    })
  }
  $(window).scroll(function(e){
    showani();
  });
  showani();


  //预约
});


