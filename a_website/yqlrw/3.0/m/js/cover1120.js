var srf = $('meta[name="csrf-token"]').attr('content');
var verify_url='/common/get-login-verify.html';//登录发送验证码
var yy_url='/api-act/login.html';//预约
var lottery_url='/api-act/lottery.html';//抽奖
var gift_url='/api-act/get-gift-logs.html';//转盘中奖记录
var login_url='/api-act/get-user-info.html';//判断用户是否登录
var is_lottery=false;
var is_login=false;
var is_show=true;
var baseurl="";
var prize={
  '450':{name:"爱奇艺会员",img:"c_ngift1.png"}
  ,'451':{name:"10元京东卡",img:"c_ngift4.png"}
  ,'452':{name:"萌兔饼干棒(永久手持)",img:"c_ngift5.png"}
  ,'0':{name:"谢谢参与"}
}

//手机类型判断
var u = navigator.userAgent,
    app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
$(window).scroll(function() {
  var scroll = $(this).scrollTop();
  if(scroll < 700) {
    $(".float").removeClass("active");
    $('.float ul').find('li').removeClass('active');
    $('.float ul').find("li[data-index='1']").addClass('active');
  } else if(scroll >= 700 && scroll < 1500) {
    $(".float").removeClass("active");
    $('.float ul').find('li').removeClass('active');
    $('.float ul').find("li[data-index='2']").addClass('active');
  } else if(scroll >= 1500 && scroll < 2500) {
    $(".float").removeClass("active");
    $('.float ul').find('li').removeClass('active');
    $('.float ul').find("li[data-index='3']").addClass('active');
  } else if(scroll >= 2500) {
    $(".float").addClass("active");
  }
});
//判断用户是否登录
function is_login1(){
  $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        is_login=true;//登陆状态
        if(data.data.user_data.is_lottery==true){
          is_lottery=true;
        }else{
          is_lottery=false;
        }

        if(data.data.user_data.gift_id==450){//爱奇艺会员
          is_show=true;
          $(".m_tc2 .c_message1").removeClass("hidden");
          $(".m_tc2 .c_message2,.m_tc2 .c_message3").addClass("hidden");
          $(".m_tc2 .gift_code").text(data.data.user_data.gift_code);
          $(".m_tc2 .copy1").attr("data-clipboard-text",data.data.user_data.gift_code);
        }else if(data.data.user_data.gift_id==451){//10元京东卡
          is_show=true;
          $(".m_tc2 .c_message2").removeClass("hidden");
          $(".m_tc2 .c_message1,.m_tc2 .c_message3").addClass("hidden");
          $(".m_tc2 .jd_code1").text(data.data.user_data.gift_code);
          $(".m_tc2 .jd_code2 b").text(data.data.user_data.pwd);
          $(".m_tc2 .copy2").attr("data-clipboard-text",data.data.user_data.gift_code);
          $(".m_tc2 .copy3").attr("data-clipboard-text",data.data.user_data.pwd);
        }else if(data.data.user_data.gift_id==452){//萌兔饼干棒（永久手持）
          is_show=true;
          $(".m_tc2 .c_message3").removeClass("hidden");
          $(".m_tc2 .c_message2,.m_tc2 .c_message1").addClass("hidden");
        }else if(data.data.user_data.gift_id==0){//谢谢参与
          is_show=false;
        }

      }else{
        is_login=false;//登陆状态
      }
    }
  });
}
//初始化
window.onload = function() {
  $(".loading").hide();
  $("html,body").addClass("no_auto");
};
$(function(){
  //获取图片基础地址
  baseurl=$(".i_main").data("src");
  wap_cover();
  yx_getcaptcha(".captcha",".tc")
  //swiper
  var mySwiper01 = new Swiper('.s_banner', {
    effect: "coverflow",
    speed: 1500,
    prevButton: ".swiper-button-prev",
    nextButton: ".swiper-button-next",
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loopAdditionalSlides: 2,
    centeredSlides: !0,
    slidesPerView: 3,
    loop: !0,
    observer: !0,
    observeParents: !0,
    slideToClickedSlide: !0,
    simulateTouch: false,
    autoplayDisableOnInteraction: false,
    coverflow: {
      rotate: 0,
      stretch: -50,
      depth: 500,
      modifier: 1,
      slideShadows: false
    },
  });
  //判断用户是否登录
  is_login1();
});
//弹框关闭
$(".close,.sure").click(function() {
  $(".gg_tc").hide();
  //$(".co_error").removeClass("co_err_show");
});
//预约弹框显示
$(".yuyue").click(function() {
  if(is_login==true){
    $(".m_tc3").show();
    $(".m_tc3 .inf_tit").text("已预约");
    $(".m_tc3 .inf_tit1").text("您已经预约，请不要重复预约");
  }else{
    $(".tc").show();
  }
});
//登录获取验证码
$(".g_code").click(function() {
  var phone = $(".phone").val();
  var t_yzm = $(".t_yzm").val();
  if(phone == "" || phone == undefined) {
    alert("请输入手机号");
    return;
  }
  if(phone.length != 11) {
    alert("手机号有误");
    return;
  }
  //if(t_yzm == "" || t_yzm == undefined) {
  //    alert("请输入图片验证码");
  //    return;
  //}
  $.post(verify_url, {"phone": phone, "captcha": t_yzm, "cms_csrf": srf}, function(data) {
    if(data.status == 0) {
      $(".g_code").css("pointer-events","none");
      page_djs($(".g_code"),function(){
        $(".g_code").css("pointer-events","auto");
      });
    } else if(data.status == -2){
      alert(data.msg);
      $(".tupian").css("display" , "block");
      $(".captcha").trigger("click");
    } else {
      $(".captcha").trigger("click");
      alert(data.msg);
    }
  }, "json");
});
//手机类型选择
$(".select_ul li").click(function() {
  $(this).addClass("active").siblings().removeClass("active");
});
//立即预约请求
$(".yy").click(function() {
  var phone = $(".phone").val();
  var yzm = $(".yzm").val();
  var type = $(".select_ul li.active").attr("data-type");
  if(phone == "" || phone == undefined) {
    alert("请输入手机号");
    return;
  }
  if(phone.length != 11) {
    alert("手机号有误");
    return;
  }
  if(yzm == "" || yzm == undefined) {
    alert("请输入验证码");
    return;
  }
  $.post(yy_url, {"phone": phone, "yzm": yzm, "cms_csrf": srf, "type": type}, function(data) {
    if(data.status == 0) {
      is_login=true;//登陆状态
      if(data.data.is_new_user==true){
        //新用户
        $(".tc").hide();
        $(".m_tc1 .t_phone").text(phone);
        $(".m_tc1").show();
      }else if(data.data.is_new_user==false){
        //老用户
        alert("登陆成功");
        $(".tc").hide();
      }

      if(data.data.is_lottery==true){
        is_lottery=true;
      }else{
        is_lottery=false;
      }

      if(data.data.gift_id==450){//爱奇艺会员
        is_show=true;
        $(".m_tc2 .c_message1").removeClass("hidden");
        $(".m_tc2 .c_message2,.m_tc2 .c_message3").addClass("hidden");
        $(".m_tc2 .gift_code").text(data.data.gift_code);
        $(".m_tc2 .copy1").attr("data-clipboard-text",data.data.gift_code);
      }else if(data.data.gift_id==451){//10元京东卡
        is_show=true;
        $(".m_tc2 .c_message2").removeClass("hidden");
        $(".m_tc2 .c_message1,.m_tc2 .c_message3").addClass("hidden");
        $(".m_tc2 .jd_code1").text(data.data.gift_code);
        $(".m_tc2 .jd_code2 b").text(data.data.pwd);
        $(".m_tc2 .copy2").attr("data-clipboard-text",data.data.gift_code);
        $(".m_tc2 .copy3").attr("data-clipboard-text",data.data.pwd);
      }else if(data.data.gift_id==452){//萌兔饼干棒（永久手持）
        is_show=true;
        $(".m_tc2 .c_message3").removeClass("hidden");
        $(".m_tc2 .c_message2,.m_tc2 .c_message1").addClass("hidden");
      }else if(data.data.gift_id==0){//谢谢参与
        is_show=false;
      }

    } else {
      $(".captcha").trigger("click");
      alert(data.msg);
    }
  }, "json");
});
//复制
new Clipboard('.copy');
$(".copy").click(function() {
  alert("已复制");
});
//微信二维码
$(".x_weixin").click(function() {
  $(".wechat").removeClass("hidden");
});
$(".wechat").click(function() {
  $(this).addClass("hidden");
});
//抽奖
var rotateTimeOut = function (){
  $('.wheelcanvas').rotate({
    angle:0,
    animateTo:2205,
    duration:8000,
    callback:function (){
      alert('网络超时，请检查您的网络设置！');
    }
  });
};
var rotateconf={
  bRotate:false,
  gifts:["爱奇艺会员","谢谢参与","VIVO NEX 双屏版","萌兔饼干棒(永久手持)","10元京东卡","谢谢参与","OPPO R17 Pro","懒喵喵枕(永久背饰)"]
}
//旋转转盘 item:奖品位置; txt：提示语,code是礼包码;
var rotateFn = function (item){
  var angles = item * (360 /8);
  console.log(angles);
  $('.wheelcanvas').stopRotate();
  $('.wheelcanvas').rotate({
    angle:0,
    animateTo:angles+1800,
    duration:8000,
    callback:function (){
      if(item==1||item==5){
        $(".m_tc3").show();
        $(".m_tc3 .inf_tit").text("谢谢参与");
        $(".m_tc3 .inf_tit1").text("没事~下一个大奖就是你的！");
      }else{
        //中奖弹窗显示
        $(".m_tc2").show();
      }
      rotateconf.bRotate = !rotateconf.bRotate;
    }
  });
};
$('.pointer').click(function (){
  if(is_login==true){
    if(is_lottery==false){
      if(rotateconf.bRotate) return;
      rotateconf.bRotate = !rotateconf.bRotate;
      rotateTimeOut();
      ////模拟ajax
      //setTimeout(function(){
      //    //获取随机数模拟抽奖结果(奖品个数范围内)
      //    var item =2;
      //    rotateFn(item, rotateconf.gifts[item],"ABDE23JGGEI");
      //},1000);
      $.ajax({
        'url':lottery_url,
        'data':{},
        'type':'POST',
        'dataType':'Json',
        success:function(data){
          if(data.status==0){
            is_lottery=true;
            var item="";
            if(data.data.gift_id==450){//爱奇艺会员
              item=0;
              $(".m_tc2 .c_message1").removeClass("hidden");
              $(".m_tc2 .c_message2,.m_tc2 .c_message3").addClass("hidden");
              $(".m_tc2 .gift_code").text(data.data.code);
              $(".m_tc2 .copy1").attr("data-clipboard-text",data.data.code);
            }else if(data.data.gift_id==451){//10元京东卡
              item=4;
              $(".m_tc2 .c_message2").removeClass("hidden");
              $(".m_tc2 .c_message1,.m_tc2 .c_message3").addClass("hidden");
              $(".m_tc2 .jd_code1").text(data.data.code);
              $(".m_tc2 .jd_code2 b").text(data.data.pwd);
              $(".m_tc2 .copy2").attr("data-clipboard-text",data.data.code);
              $(".m_tc2 .copy3").attr("data-clipboard-text",data.data.pwd);
            }else if(data.data.gift_id==452){//萌兔饼干棒（永久手持）
              item=3;
              $(".m_tc2 .c_message3").removeClass("hidden");
              $(".m_tc2 .c_message2,.m_tc2 .c_message1").addClass("hidden");
            }else if(data.data.gift_id==0){//谢谢参与
              item=1;
            }
            rotateFn(item);
          }else{
            rotateconf.bRotate = !rotateconf.bRotate;
            $('.wheelcanvas').stopRotate();
            rotateFn(1);
            alert(data.msg);
          }
        },
        error:function(){
          rotateconf.bRotate = !rotateconf.bRotate;
          $('.wheelcanvas').stopRotate();
          rotateFn(1);
        }
      });
    }else{
      if(is_show==true){
        alert("已经抽过奖了哦~");
        $(".m_tc2").show();
      }else{
        $(".m_tc3").show();
        $(".m_tc3 .inf_tit").text("谢谢参与");
        $(".m_tc3 .inf_tit1").text("已经抽过奖了哦");
      }
    }
  }else{
    $(".tc").show();//登陆预约弹窗
  }
});