var login_url='/yy/get-user-info.html';//判断用户是否登录
var verify_url='/common/get-login-verify.html';//登录发送验证码
var out_url='/site/logout.html';//注销登录
var yy_url='/yy/yuyue.html';//预约//登录
var  num_url='/common/get-yuyue-count.html';//预约人数
var yq_dc_url="/yy/get-invite-gift.html";//邀请人数达到条件领取礼包
var yy_dc_url="/yy/get-yuyue-gift.html";//预约人数达到条件领取礼包
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var is_yybtn=0;
var is_choose = 0;
var isNumber=0;
var nums = 0;
//二级菜单下拉框
var clickNumber = 1;
var clickNumber2 = 0;
$(".header_a .type").click(function(e) {
  e.stopPropagation();
  if(clickNumber % 2 !== 0) {
    $(this).parent().siblings(".nav-content").slideDown();
    $(this).addClass("type1");
    $('.down_list').slideUp(500);
  } else {
    $(this).parent().siblings(".nav-content").slideUp();
    $(this).removeClass("type1");
    $('.down_list').slideUp(500);
  }
  clickNumber++;
  clickNumber2=0;
});
$(document).click(function(e){
  if($(e.target).closest(".nav-content").length==0&&clickNumber % 2 == 0){
    $(".nav-content").slideUp();
    $(".header_a .type").removeClass("type1");
    $('.down_list').slideUp(500);
    clickNumber++;
    clickNumber2=0;
  }
});
//处理预约人数
  function getPercent(number) {
    var percent = parseFloat((parseInt(number) /500).toFixed(2));
    percent = percent > 100 ? 100 : percent;
    return percent;

  };
//判断用户是否登录
function is_login(){
  $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $(".co_before").addClass("hidden");
        $(".co_after").removeClass("hidden");
        $(".co_after .user_phone").html(data.data.phone);
        $(".co_tips_yq .my_url").html(data.data.shareUrl);
        if(data.data.inviteUser.length > 0 && data.data.inviteUser.length < 2) {
          is_choose = false;
        } else if(data.data.inviteUser.length >= 2) {
          is_choose = true;
        }
        for(var i = 0; i < data.data.inviteUser.length; i++) {
          $(".yq_get .peo").eq(i).addClass("active");
          $(".yq_get .peo").eq(i).find("i").html(data.data.inviteUser[i]);
        };
        if(data.data.giftCodeLog.yuyue != "") {
        var html = "";
        html += '<li><span>官网预约礼包</span>' +
          '<span id="tc13_copyTextz">' + data.data.giftCodeLog.yuyue + '</span>' +
          '<span>2018/10/15—11/30</span>' +
          '<a class="copy" id="tc13_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc13_copyTextz" href="javascript:;"></a>' +
          '</li>';
        $(".check_ul").append(html);
        //初始化复制分享链接
        new Clipboard('#tc13_copyBtnz');
      }
      if(data.data.giftCodeLog.invite != "") {
        var html = "";
        html += '<li><div class="gift_li">' +
            '<span>玩家助力礼包</span>' +
            '<span id="tc14_copyTextz">' + data.data.giftCodeLog.invite+ '</span>' +
            '<span>2018/10/15—11/30</span></div>' +
            '<a class="copy" id="tc14_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc14_copyTextz" href="javascript:;"></a>' +
            '</li>';
        $(".check_ul").append(html);
        //初始化复制分享链接
        new Clipboard('#tc14_copyBtnz');
      }
      }else{
         $(".co_before").removeClass("hidden");
        $(".co_after").addClass("hidden");
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
//预约人数
function ordernum() {
  $.ajax({
    'url':num_url,
    'data':{'name': 'nba_total',"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        isNumber = data.msg;
        nums = data.msg;
        if(data.msg == 'null' || data.msg == null||data.msg =="") {
          $(".i_main .order_box .yy_box .num>span").text("");
          $(".i_main .order_box .yy_box .num>span.num7").text("0");
        }else{
          var num = data.msg+"";
          var peo_num = data.msg;
           $('.yy_progress_box .color').css({
            'height': getPercent(peo_num) + '%'
          });
          if(peo_num >= 10000){
            $(".yy_progress_box .row1").addClass("active");
          }
          if(peo_num >= 20000){
            $(".yy_progress_box .row2").addClass("active");
          }
          if(peo_num >= 30000){
            $(".yy_progress_box .row3").addClass("active");
          }
          if(peo_num >= 40000){
            $(".yy_progress_box .row4").addClass("active");
          }
          if(peo_num >= 50000){
            $(".yy_progress_box .row5").addClass("active");
          }
          $(".num>span").text("0");
          // for(var i=0;i<num.length;i++){
          //   $('.num>span').eq(6-i).text(num.substr(num.length-i-1,1));
          // }
        }
      }else{}
    }
  });
}
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
  //imgMarkIndex++;
  var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
  $.get(imgUrl, {}, function(data) {
    $(".tupian").html(data.msg);
    $(".tupian img").show();
  }, 'json');
}
//图片验证码刷新
$(".tupian").click(function(){
load_captcha();
});
$(function(){
  var swiper02 = new Swiper('.swiper-container2',{
    pagination: '.swiper-pagination2',
    paginationClickable: true,
    effect : 'coverflow',
    slidesPerView: 3,
    centeredSlides: false,
    prevButton:'.swiper-button-prev2',
    nextButton:'.swiper-button-next2',
    loop:true,
    coverflow: {
      rotate:40,
      stretch:0,
      depth:50,
      modifier:1,
      slideShadows : false
    }
  });
  ordernum();
  is_login();
  //点击预约
  $(".order_btn").click(function(){
    if($(".co_after.hidden").length>0){
      //登录之前
      $(".tc_yuyue").show();
    }else{
       //登录之后
      alert("您已经预约过了哦~");
    }
  })
  //点击登录
  $(".co_loginbtn").click(function(){
    $(".tc_login").show();
  })
  //关闭弹窗
  $(".close").click(function(){
    $(this).parent().parent().hide();
  })
  //登录获取验证码
$(".g_code1").click(function(){
  var my_phone = $(".phone1").val();
  var captcha =  $(".code1").val();
  if(my_phone == "" || my_phone == undefined) {
    alert("手机号码不能为空哦");
    return;
  }else if(my_phone.length != 11){
    alert("手机号码不正确哦");
    return;
  }
  if(captcha == "" || captcha == undefined) {
    alert("验证码不能为空哦");
    return;
  }
  $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
    if(data.status == 0){
      $(".g_code1").css("pointer-events","none");
      page_djs($(".g_code1"),function(){
        $(".g_code1").css("pointer-events","auto");
      });
    }else{
      alert(data.msg);
      load_captcha();
    }
  }, 'json');
});
  //预约获取验证码
$(".g_code2").click(function(){
  var my_phone2 = $(".phone2").val();
  var captcha2 =  $(".code2").val();
  if(my_phone2 == "" || my_phone2 == undefined) {
    alert("手机号码不能为空哦");
    return;
  }else if(my_phone2.length != 11){
    alert("手机号码不正确哦");
    return;
  }
  if(captcha2 == "" || captcha2 == undefined) {
    alert("验证码不能为空哦");
    return;
  }
  $.post(verify_url,{ "phone":my_phone2,"captcha":captcha2,"cms_csrf":srf },function(data){
    if(data.status == 0){
      $(".g_code2").css("pointer-events","none");
      page_djs($(".g_code2"),function(){
        $(".g_code2").css("pointer-events","auto");
      });
    }else{
      alert(data.msg);
      load_captcha();
    }
  }, 'json');
});
//登录请求
$(".login_sure").click(function(){
  fgw_yy_wap();
  var my_phone1 = $(".phone1").val();
  var co_codenum1 =  $(".i_code1").val();
  $.post(yy_url,{'phone':my_phone1,'yzm':co_codenum1,"cms_csrf":srf },function(data){
    if(data.status == 0){
      is_yuyue=1;
      $(".tc_login").hide();
      $(".co_before").addClass("hidden");
      $(".co_after").removeClass("hidden");
      $(".co_after .user_phone").html(my_phone1);
      $(".co_tips_yq .my_url").html(data.data.shareUrl);
      alert("登陆成功");
      is_login();
      fgw_yy_wap_success();
    }else if(data.status == 1){
      alert("登陆成功");
      is_yuyue=1;
      $(".tc_login").hide();
      $(".co_before").addClass("hidden");
      $(".co_after").removeClass("hidden");
      $(".co_after .user_phone").html(my_phone1);
      is_login();
      $(".co_tips_yq .my_url").html(data.data.shareUrl);
    }else{
      alert(data.msg);
      is_yuyue=0;
    }
  }, 'json');
});
//立即预约请求
$(".yy_sure").click(function(){
   fgw_yy_wap();
  var my_phone2 = $(".phone2").val();
  var co_codenum2 =  $(".i_code2").val();
  $.post(yy_url,{'phone':my_phone2,'yzm':co_codenum2,"cms_csrf":srf },function(data){
    if(data.status == 0){
      $(".tc_yuyue").hide();
      alert("预约成功");
      is_login();
      $(".co_before").addClass("hidden");
      $(".co_after").removeClass("hidden");
      $(".co_after .user_phone").html(my_phone2);
      $(".co_tips_yq .my_url").html(data.data.shareUrl);
      alert(data.msg);
      fgw_yy_wap_success();
    }else if(data.status == 1){
      alert("预约成功");
      is_yuyue=1;
      $(".tc_yuyue").hide();
      is_login();
      $(".co_before").addClass("hidden");
      $(".co_after").removeClass("hidden");
      $(".co_after .user_phone").html(my_phone2);
      $(".co_tips_yq .my_url").html(data.data.shareUrl);
    }else{
      alert(data.msg);
      is_login();
    }
  }, 'json');
});

//点击我的礼包
$(".ward_btn,.libao_sure2,.libao_sure").click(function (){
  if($(".co_after.hidden").length>0){
      //登录之前
      $(".tc_login").show();
    }else{
      if($(".check_ul li").length>0){
        $(".check").show();
        $(".congra2").hide();
        $(".congra").hide();
      }else{
        alert("您还没有获得礼包喔~");
      }
    }
});
//点击邀请队友
$(".yq_btn").click(function (){
   if($(".co_after.hidden").length>0){
      //登录之前
      $(".tc_login").show();
      
    }else{
       $(".co_tips_yq").show();
    }
});
//邀请队友点击立即领取
$(".get_btn").click(function (){
   if($(".co_after.hidden").length>0){
      //登录之前
      $(".tc_login").show();
      return;
    } 
    if(!is_choose) {
      alert("邀请人数未达到要求~");
      return;
    }  
    $.post(yq_dc_url, {
    "cms_csrf": srf
  }, function(data) {
    if(data.status == 0) {
      $(".congra2 .m_bg").html(data.code);
      var html = "";
      html += '<li><div class="gift_li">' +
            '<span>玩家助力礼包</span>' +
            '<span id="tc14_copyTextz">' + data.code + '</span>' +
            '<span>2018/10/15—11/30</span></div>' +
            '<a class="copy" id="tc14_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc14_copyTextz" href="javascript:;"></a>' +
            '</li>';
        $(".check_ul").append(html);
      //初始化复制分享链接
      new Clipboard('#tc14_copyBtnz');
      $(".congra2").show();
    }else{
      alert(data.msg);
    }
  }, "json");  
});
//点击领取预约人数礼包
$(".row5 .fr.row_box img,.row5 .fl.yy_progress").click(function() {
  if($(".co_after.hidden").length>0){
      //登录之前
      $(".tc_login").show();
    return;
  }
  if(isNumber < 50000) {
    alert("预约人数未达成~");
    return;
  }
  $.post(yy_dc_url, {
    "cms_csrf": srf
  }, function(data) {
    if(data.status == 0) {
      $(".congra .m_bg").html(data.code);
      var html = "";
      html += '<li><span>官网预约礼包</span>' +
          '<span id="tc13_copyTextz">' + data.code + '</span>' +
          '<span>2018/10/15—11/30</span>' +
          '<a class="copy" id="tc13_copyBtnz" data-clipboard-action="copy" data-clipboard-target="#tc13_copyTextz" href="javascript:;"></a>' +
          '</li>';
      $(".check_ul").append(html);
      //初始化复制分享链接
      new Clipboard('#tc13_copyBtnz');
      $(".congra").show();
    }else{
      alert(data.msg);
    }
  }, "json");
});
//复制
new Clipboard('.copy');
$(".copy").click(function() {
  alert("已复制");
});
$(".check_ul").on("click", "#tc13_copyBtnz", function() {
  alert("已复制~");
});
$(".check_ul").on("click", "#tc14_copyBtnz", function() {
  alert("已复制~");
});
//点击注销
$(".logout").click(function() {
  $.post("/yy/logout.html", {
    "cms_csrf": srf
  }, function(data) {
    if(data.status == 0) {
      location.reload();
    } else {
      alert(data.msg);
    }
  }, "json");
});
//预约人数
setTimeout(function() {
    var numRun = $(".num_box").numberAnimate({
      num: nums,
      dot: 0,
      speed: 2000,
      symbol: ""
    });
    numRun.resetData(nums);
  }, 1000);
});