var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var login_url1='/site/ajax-login.html';//登录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var yy_url='/site/ajax-yuyue.html';//预约
var lottery_url='/site/ajax-draw.html';//抽奖
var me_url='/site/ajax-my-code.html';//获取当前用户中奖记录
var all_url='/site/ajax-code.html'; //获取所有用户中奖记录
var out_url='/site/ajax-login-out.html';//注销登录
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var today_invite_count=0; //当日邀请次数
var phone_type=0; //0--ios  1--and

//手机类型判断
var u = navigator.userAgent,
    app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isIOS) {
  phone_type=0;
}else{
  phone_type=1;
}
//二级菜单下拉框
var clickNumber = 1;
var clickNumber2 = 0;
$(".header_a .type").click(function() {
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
$('.down_btn').click(function () {
        if(clickNumber2 % 2 == 0) {
        $('.down_list').slideDown(500);
        $('.top-list').slideUp(500);
        $(".header_a .type").parent().siblings(".nav-content").slideUp();
    $(".header_a .type").removeClass("type1");
    } else {
        $('.down_list').slideUp(500);
        $(".header_a .type").parent().siblings(".nav-content").slideUp();
        $(".header_a .type").removeClass("type1");
    }
        clickNumber2++;
        clickNumber=1;
    });
$(".fade").click(function(){
      $('.down_list').slideUp(500);
      clickNumber2=0;
    })
//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
  var index=$(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
  imgMarkIndex++;
  var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
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
//判断手机类型--显示预约类型弹框
function type(){
  $(".co_tips_type").removeClass("hidden");
  if(phone_type==0){
    //ios
    $(".co_tips_type .email_input").removeClass("hidden");
  }else if(phone_type==1){
    //安卓
    $(".co_tips_type .email_input").addClass("hidden");
  }
}
//获取所有用户中奖记录
function get_all_code(){
  $.ajax({
    'url':all_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0&& data.data.length>0){
        var result = '';
        for(var i = 0; i < data.data.length; i++) {
          result += "<li>恭喜<span>"+data.data[i].phone+"</span>获得<i>"+data.data[i].name+"</i></li>";
        }
        $('.price_con ul').append(result);
        //中奖名单--只有一个时复制一个
        if($(".price_con ul li").length>1){
          //$(".price_con ul").append($(".price_con ul li").clone(true));
          setInterval('autoScroll(".price_con ul")', 1500);
        }
      }else{
        $(".price_no").removeClass("hidden");
      }
    }
  });
}
//初始化
$(function(){
  //判断用户是否登录
  $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $(".co_tips_login").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.invite_count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.yq_num').text(data.msg.me_invite_code);
        $('.my_url').text(data.msg.share_url);
        $(".co_tips_yq .copy").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
        today_invite_count=data.msg.today_invite_count;
      }else{}
    }
  });
  //获取所有用户中奖记录
  get_all_code();
});
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_input input').val("");
  $('.co_input textarea').val("");
  $(".co_error").removeClass("co_err_show");
  $("body,html").removeClass("no_auto");
});
$(".co_tips_surebtn").click(function(){
  $(".co_tips").addClass("hidden");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
  $(".co_tips_login").removeClass("hidden");
  $("body,html").addClass("no_auto");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
  var my_phone = $(".co_username").val();
  var captcha = $(".captcha").val();
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
//登录请求
$(".co_tips_loginbtn").click(function(){
  var my_phone = $(".co_username").val();
  var co_codenum1=$('.co_codenum1').val();
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
        alert("登录成功");
        $(".co_tips_login").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.invite_count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.yq_num').text(data.msg.me_invite_code);
        $('.my_url').text(data.msg.share_url);
        $(".co_tips_yq .copy").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
        today_invite_count=data.msg.today_invite_count;
        if(is_yuyue==1){
          $(".co_tips_login").addClass("hidden");
          $("body,html").removeClass("no_auto");
        }else{
          $(".co_tips_login").addClass("hidden");
          $("body,html").removeClass("no_auto");
          type();
        }
      }else{
        showErr(2, data.msg);
        load_captcha();
        //alert(data.msg);
      }
    }
  });
});
//中奖纪录弹框显示
$(".check_ward").click(function(){
  if($(".co_after.hidden").length>0){
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
  }else{
    //获取当前用户中奖记录
    $.ajax({
      'url':me_url,
      'data':{},
      'type':'GET',
      'dataType':'Json',
      success:function(data){
        if(data.status==0&& data.msg.length>0){
          $('.table_list').empty();
          var result = '';
          for(var i = 0; i < data.msg.length; i++) {
            result += "<p class='table_info'><span>"+data.msg[i].name+"</span><span class='table_code'>"+data.msg[i].code+"</span></p>";
          }
          $('.table_list').append(result);
          $(".co_tips_record").removeClass("hidden");
        }else{
          alert("您还没有中奖记录哦~");
        }
      }
    });
  }
});
//邀请好友弹框显示
$(".co_share").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
  }else{
    $(".co_tips_yq").removeClass("hidden");
  }
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
        alert(data.msg);
        $(".co_before").removeClass("hidden");
        $(".co_after,.ward_yq").addClass("hidden");
        $('.user_phone').text("");
        $('.count_all,.friend').text("0");
        $('.yq_num').text("");
        $('.my_url').text("");
      }else{
        alert(data.msg);
      }
    }
  });
});
//中奖名单滚动效果
function autoScroll(obj) {
  $(obj).animate({
    marginTop: "-3.2rem"
  }, 1000, function() {
    $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
  });
}
//立即预约弹框显示
$(".order").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_yy").addClass("hidden");
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
  }else{
    //登录之后
    $(".co_tips_yy").addClass("hidden");
    if(is_yuyue==1){
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .tips_txt").text("");
      $(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
    }else{
      type();
    }
  }
});
//手机类型选择
$(".rdo").click(function(){
  $(this).addClass("on").siblings().removeClass("on");
  hideErr(3);
  if($(this).attr("data-id")==1){
    $(".email_input").removeClass("hidden");
  }else if($(this).attr("data-id")==2){
    $(".email_input").addClass("hidden");
  }
});
//立即预约请求
$(".co_tips_type .co_tips_yybtn").click(function(){
  var type_id=$(".rdo.on").attr("data-id");
  var phone=$('.user_phone').text();
  var email=$('.email').val();
  if(type_id==1){
    var type="ios";
    phone_type=0;
  }else if(type_id==2){
    var type="android";
    phone_type=1;
  }
  if(phone_type==0){
    //ios
    if(email == "" || email == undefined) {
      showErr(3, "邮箱不能为空哦");
      return;
    }
    hideErr(3);
  }
  $.post(yy_url,{ "type":type,"cms_csrf":srf ,'phone':phone,'email':email},function(data){
    if(data.status == 0){
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .tips_txt").text("恭喜您");
      $(".co_tips_success .success").text("预约成功");
      is_yuyue=1;
    }else{
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .tips_txt").text("");
      $(".co_tips_success .success").text(data.msg);
    }
  }, 'json');
});
//中奖名单和规则的切换
$(".i_main .ward_box .two_part .type>span").click(function(){
  $(this).addClass("active").siblings().removeClass("active");
  if($(this).hasClass("md")){
    $(".list_box").removeClass("hidden");
    $(".ward_rules").addClass("hidden");
  }else if($(this).hasClass("rules")){
    $(".list_box").addClass("hidden");
    $(".ward_rules").removeClass("hidden");
  }
});
//抽奖
$(document).ready(function() {
  var lottery = {
    index: -1,	//当前转动到哪个位置，起点位置
    count: 0,	//总共有多少个位置
    timer: 0,	//setTimeout的ID，用clearTimeout清除
    speed: 20,	//初始转动速度
    times: 0,	//转动次数
    cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1,	//中奖位置
    init: function (id) {
      if ($("#" + id).find(".lottery-unit").length > 0) {
        $lottery = $("#" + id);
        $units = $lottery.find(".lottery-unit");
        this.obj = $lottery;
        this.count = $units.length;
        $lottery.find(".lottery-unit-" + this.index).addClass("active");
      }
      ;
    },
    roll: function () {
      var index = this.index;
      var count = this.count;
      var lottery = this.obj;
      $(lottery).find(".lottery-unit-" + index).removeClass("active");
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      ;
      $(lottery).find(".lottery-unit-" + index).addClass("active");
      this.index = index;
      return false;
    },
    stop: function (index) {
      this.prize = index;
      return false;
    },
    end: function () {
    }
  };
  function roll() {
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
      clearTimeout(lottery.timer);
      lottery.prize = -1;
      lottery.times = 0;
      click = false;
      lottery.end();
    } else {
      if (lottery.times < lottery.cycle) {
        lottery.speed -= 10;
      } else {
        if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
          lottery.speed += 110;
        } else {
          lottery.speed += 20;
        }
      }
      if (lottery.speed < 60) {
        lottery.speed = 60;
      }
      ;
      lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
  }
  var prizes = {
    104: {i: 3, prize: '三级宝石'},
    105: {i: 1, prize: '钻石'},
    106: {i: 0, prize: '宝物魔盒'},
    107: {i: 5, prize: '低级技能芯片'},
    108: {i: 2, prize: '京东卡5元'},
    109: {i: 7, prize: '京东卡20元'},
    0: {i: 6, prize: 'iPhoneX'},
    110: {i: 4, prize: '低级强化石'},

  };
  var click = false;
  window.onload = function () {
    lottery.init('lottery');
    $(".click_btn").click(function () {
      //抽奖前先判断是否登录
      if ($(".co_after.hidden").length > 0) {
        //登录之前
        $(".co_tips_login").removeClass("hidden");
      } else {
        //登录之后就抽奖
        if (click) {
          return;//正在抽奖，点击无效;
        }
        if ($(this).find(".count_all").text() > 0) {
          lottery.speed = 150;
          roll();
          click = true;
          //var lightInterval = setInterval(function () {
          //  if (click) {
          //    $(".hm-cj").toggleClass("light");
          //  } else {
          //    clearInterval(lightInterval);
          //  }
          //}, 100);
          //请求数据；
          setTimeout(function () {
            $.ajax({
              'url': lottery_url,
              'data': {},
              'type': 'GET',
              'dataType': 'Json',
              success: function (data) {
                if (data.status == 0) {
                  get_all_code();
                  var id = data.gift_id;
                  var code=data.msg;
                  var count=data.invite_count;
                  $('.count_all').text(count);
                  $('.yq_num').text(code);
                  lottery.stop(prizes[id].i);
                  lottery.end = function () {
                    // if(id==110){
                    //   //谢谢参与
                    //   $(".co_tips_success").removeClass("hidden");
                    //   $(".co_tips_success .tips_txt").text("");
                    //   $(".co_tips_success .success").text("谢谢参与！");
                    // }else{
                      $(".co_tips_ward").removeClass("hidden");
                      $(".co_tips.co_tips_ward .show_gift>i").text((prizes[id]||{}).prize);
                      $(".co_tips.co_tips_ward .tips_num>span").text(code);

                      $(".co_tips.co_tips_ward .show_gift").addClass("hidden");
                      $(".co_tips.co_tips_ward .show_gift"+(prizes[id]||{}).i).removeClass("hidden");
                    // }
                  }
                } else {
                  lottery.stop(prizes[110].i);
                  $(".co_tips_success").removeClass("hidden");
                  $(".co_tips_success .tips_txt").text("");
                  $(".co_tips_success .success").text(data.msg);
                  //if (data.msg == "登陆超时，请重新登录！") {
                  //  $(".co_before").removeClass("hidden");
                  //  $(".co_after,.ward_yq").addClass("hidden");
                  //  $('.user_phone').text("");
                  //  $('.count_all,.friend').text("0");
                  //  //$('.yq_num').text("");
                  //  //$('.my_url').text("");
                  //}
                  //$('.count_all').text(count);
                }
              }
            });
          }, 3000);
        } else {
          //alert("抽奖次数已经用完！");
          $(".co_tips_success").removeClass("hidden");
          $(".co_tips_success .tips_txt").text("糟糕了！");
          $(".co_tips_success .success").text("您还没有抽奖机会 ，赶快邀请更多好友参与吧");
        }
      }
    });
  };


  //复制
  new Clipboard('.copy');
  $(".copy").click(function() {
    alert("已复制");
  });
});