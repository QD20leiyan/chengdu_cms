var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var login_url1='/site/ajax-login.html';//登录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var lottery_url='/site/ajax-draw.html';//抽奖
var add_url='/site/ajax-address.html';//保存收货地址
var yy_url='/site/ajax-yuyue.html';//预约
var sign_url='/site/ajax-enlist.html';//签到
var me_url='/site/ajax-my-code.html';//获取用户中奖记录--签到、中奖、所有
var out_url='/site/ajax-login-out.html';//注销登录
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var sign_num=0;//已签到几天
var is_enlist=0;//今日是否签到
var phone_type=0; //0--ios  1--and
var is_yybtn=0;
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
//获取所有用户中奖记录
function get_all_code(){
  $.ajax({
    'url':me_url,
    'data':{'type':"3","cms_csrf":srf},
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0&& data.msg.length>0){
        $('.price_con ul').empty();
        var result = '';
        for(var i = 0; i < data.msg.length; i++) {
          result += "<li>恭喜<span>"+data.msg[i].phone+"</span>获得<i>"+data.msg[i].name+"</i></li>";
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
//登录请求
function get_login(){
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
    'data':{'phone':my_phone,'yzm':co_codenum1,'invite_code':invite_code,"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $(".i_main .sign_box .slide .swiper-slide").css("pointer-events","none");
        $(".co_tips_login").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.my_url').text(data.msg.share_url);
        $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
        $('.yy_dhm').text(data.msg.gift_code);
        $(".co_tips_yy .copy1").attr("data-clipboard-text",data.msg.gift_code);
        is_yuyue=data.msg.is_yuyue;
        //签到信息
        sign_num=data.msg.gift_code_id;
        is_enlist=data.msg.is_enlist;
        var now_sign_num=is_enlist?--sign_num:sign_num;
        $(".swiper-container .swiper-slide:lt("+now_sign_num+")").addClass("al_sign").find(".signbtn").append("<a>已签到</a>");
        $(".swiper-container .swiper-slide:eq("+now_sign_num+")").addClass("active").find(".signbtn").append(is_enlist?"<a>已签到</a>":"<a class='receivebtn'>点击签到</a>");
        //签到
        $(".swiper-container .swiper-slide.active .receivebtn").click(function(){
          $.ajax({
            'url':sign_url,
            'data':{},
            'type':'GET',
            'dataType':'Json',
            success:function(data){
              if(data.status==0){
                $(".swiper-container .swiper-slide.active .receivebtn").unbind("click").text('已签到');
                $('.co_tips_ward2 .tips_num>span').text(data.msg);
                $(".co_tips_ward2 .copy1").attr("data-clipboard-text",data.msg);
                $(".co_tips_ward2").removeClass("hidden");
                $(".co_tips.co_tips_ward2 .show_gift").addClass("hidden");
                $(".co_tips.co_tips_ward2 .show_gift"+(now_sign_num)).removeClass("hidden");
                if(!data.msg){
                  $('.co_tips_ward2 .tips_num').addClass("hidden");
                }
              }else{
                alert(data.msg);
              }
            }
          });
        });
        swiper.slideTo(now_sign_num);
        $('.sign_num').text(sign_num);
        if(!data.msg.name&&!data.msg.address&&!data.msg.tel&&!data.code){
          $(".co_tips_addbtn").removeClass("hidden");
          $(".co_tips_newbtn").addClass("hidden");
        }else{
          $(".u_name").val(data.msg.name);
          $(".u_yb").val(data.msg.code);
          $(".u_tel").val(data.msg.tel);
          $(".u_madd").val(data.msg.address);
          $(".co_tips_addbtn").addClass("hidden");
          $(".co_tips_newbtn").removeClass("hidden");
        }
        if(is_yybtn==1){
          $(".co_tips_yy").removeClass("hidden");
        }else{
          if(is_yuyue!=1){
            $(".co_tips_yy").removeClass("hidden");
          }
          alert("登陆成功");
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
//初始化
$(function(){
  //获取分享链接中的邀请码
  invite_code=getUrlParam('invite_code');
  console.log(invite_code);
  //判断用户是否登录
  $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $(".i_main .sign_box .slide .swiper-slide").css("pointer-events","none");
        $(".co_tips_login").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.my_url').text(data.msg.share_url);
        $(".copy").attr("data-clipboard-text",data.msg.share_url);
        $('.yy_dhm').text(data.msg.gift_code);
        $(".co_tips_yy .copy1").attr("data-clipboard-text",data.msg.gift_code);
        is_yuyue=data.msg.is_yuyue;
        //签到信息
        sign_num=data.msg.gift_code_id;
        is_enlist=data.msg.is_enlist;
        var now_sign_num=is_enlist?--sign_num:sign_num;
        $(".swiper-container .swiper-slide:lt("+now_sign_num+")").addClass("al_sign").find(".signbtn").append("<a>已签到</a>");
        $(".swiper-container .swiper-slide:eq("+now_sign_num+")").addClass("active").find(".signbtn").append(is_enlist?"<a>已签到</a>":"<a class='receivebtn'>点击签到</a>");
        //签到
        $(".swiper-container .swiper-slide.active .receivebtn").click(function(){
          $.ajax({
            'url':sign_url,
            'data':{},
            'type':'GET',
            'dataType':'Json',
            success:function(data){
              if(data.status==0){
                $(".swiper-container .swiper-slide.active .receivebtn").unbind("click").text('已签到');
                $('.co_tips_ward2 .tips_num>span').text(data.msg);
                $(".co_tips_ward2 .copy1").attr("data-clipboard-text",data.msg);
                $(".co_tips_ward2").removeClass("hidden");
                $(".co_tips.co_tips_ward2 .show_gift").addClass("hidden");
                $(".co_tips.co_tips_ward2 .show_gift"+(now_sign_num)).removeClass("hidden");
              }else{
                alert(data.msg);
              }
            }
          });
        });
        swiper.slideTo(now_sign_num);
        $('.sign_num').text(sign_num);
        if(!data.msg.name&&!data.msg.address&&!data.msg.tel&&!data.code){
          $(".co_tips_addbtn").removeClass("hidden");
          $(".co_tips_newbtn").addClass("hidden");
        }else{
          $(".u_name").val(data.msg.name);
          $(".u_yb").val(data.msg.code);
          $(".u_tel").val(data.msg.tel);
          $(".u_madd").val(data.msg.address);
          $(".co_tips_addbtn").addClass("hidden");
          $(".co_tips_newbtn").removeClass("hidden");
        }
      }else{}
    }
  });
  //获取所有用户中奖记录
  get_all_code();
  //swiper
  swiper = new Swiper('.swiper-container',{
    slidesPerView: 3,
    centeredSlides: true
  });

  // 设备类型判断
  function change(){
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isIOS) {
      $(".and1").addClass("active");
      $(".and1").removeClass("js_down_andriod");
      $(".and1.active").attr("href", "javascript:yx_showTips('抱歉,iOS暂时还未上架，请使用安卓设备下载体验');");
    }
    if(isAndroid) {
      $(".and1").removeClass("active");
      $(".and1").addClass("js_down_andriod");
      $(".and1").attr("href", "javascript:;");
    }
  }
  change();
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
//中奖纪录弹框显示
$(".check_ward").click(function(){
  var type=$(this).attr("data-id");
  if(type==2){
    $(".type1").addClass("hidden");
    $(".type2").removeClass("hidden");
  }else{
    $(".type1").removeClass("hidden");
    $(".type2").addClass("hidden");
  }
  if($(".co_after.hidden").length>0){
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
  }else{
    //获取当前用户中奖记录
    $.ajax({
      'url':me_url,
      'data':{'type':type,"cms_csrf":srf},
      'type':'POST',
      'dataType':'Json',
      success:function(data){
        if(data.status==0&& data.msg.length>0){
          $('.co_tips_record .table_list').empty();
          var result = '';
          for(var i = 0; i < data.msg.length; i++) {
            result += "<p class='table_info'><span>"+data.msg[i].name+"</span><span class='table_code'>"+data.msg[i].code+"</span><span><i class='copy' data-clipboard-text="+data.msg[i].code+">复制</i></span></p>";
          }
          $('.co_tips_record .table_list').append(result);
          $(".co_tips_record").removeClass("hidden");
          new Clipboard('.copy');
          $(".copy").click(function() {
            alert("已复制");
          });
        }else{
          alert("您还没有中奖记录哦~");
        }
      }
    });
  }
});
//邀请好友弹框显示
$(".co_share").click(function(){
  $(".co_tips_success").removeClass("hidden");
  $(".co_tips_success .tips_txt").text("活动已结束");
  $(".co_tips_success .success").text("敬请期待更多福利活动");

  //if($(".co_after.hidden").length>0){
  //  //登录之前
  //  $(".co_tips_login").removeClass("hidden");
  //  $("body,html").addClass("no_auto");
  //}else{
  //  $(".co_tips_yq").removeClass("hidden");
  //}
});
//签到点击
$(".i_main .sign_box .slide .swiper-slide").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
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
        $(".swiper-container .swiper-slide").removeClass("al_sign").removeClass("active").find(".signbtn>a").remove();
        $(".i_main .sign_box .slide .swiper-slide").css("pointer-events","auto");
      }else{
        alert(data.msg);
      }
    }
  });
});
//中奖名单滚动效果
function autoScroll(obj) {
  $(obj).animate({
    marginTop: "-2.59375rem"
  }, 1000, function() {
    $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
  });
}
//立即预约弹框显示
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
      $.ajax({
        'url':yy_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
          if(data.status==0){
            $('.yy_dhm').text(data.msg.code);
            $(".co_tips_yy .copy1").attr("data-clipboard-text",data.msg.code);
            $(".co_tips_yy").removeClass("hidden");
            if(!data.msg.code){
              $('.co_tips_yy .tips_num').addClass("hidden");
            }
          }else{
            alert(data.msg);
          }
        }
      });
    }else{
      $(".co_tips_login .co_tips_title").removeClass("co_tips_logintitle").addClass("co_tips_yytitle");
      $(".co_tips_login .co_tips_btn").removeClass("co_tips_loginbtn").addClass("co_tips_yybtn");
      $(".co_tips_login").removeClass("hidden");
      $("body,html").addClass("no_auto");
    }
  }
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
    2: {i: 3, prize: '5分钟加速*5'},
    6: {i: 1, prize: '1W粮食*1'},
    7: {i: 0, prize: '6000铁*3'},
    1111: {i: 5, prize: 'iPad'},
    8: {i: 2, prize: '1W木材*1'},
    5: {i: 7, prize: '150银*1'},
    1111: {i: 6, prize: 'Switch'},
    1111: {i: 4, prize: 'JD卡'},

  };
  var click = false;
  window.onload = function () {
    lottery.init('lottery');
    $(".click_btn").click(function () {
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .tips_txt").text("活动已结束");
      $(".co_tips_success .success").text("敬请期待更多福利活动");
      ////抽奖前先判断是否登录
      //if ($(".co_after.hidden").length > 0) {
      //  //登录之前
      //  $(".co_tips_login").removeClass("hidden");
      //} else {
      //  //登录之后就抽奖
      //  if (click) {
      //    return;//正在抽奖，点击无效;
      //  }
      //  if ($(this).find(".count_all").text() > 0) {
      //    lottery.speed = 150;
      //    roll();
      //    click = true;
      //    //var lightInterval = setInterval(function () {
      //    //  if (click) {
      //    //    $(".hm-cj").toggleClass("light");
      //    //  } else {
      //    //    clearInterval(lightInterval);
      //    //  }
      //    //}, 100);
      //    //请求数据；
      //    setTimeout(function () {
      //      $.ajax({
      //        'url': lottery_url,
      //        'data': {},
      //        'type': 'GET',
      //        'dataType': 'Json',
      //        success: function (data) {
      //          if (data.status == 0) {
      //            get_all_code();
      //            var id = data.gift_id;
      //            var code=data.msg;
      //            var count=data.draw_count;
      //            $('.count_all').text(count);
      //            $('.lottery_code').text(code);
      //            $(".co_tips_ward1 .copy1").attr("data-clipboard-text",code);
      //            lottery.stop(prizes[id].i);
      //            lottery.end = function () {
      //              $(".co_tips_ward1").removeClass("hidden");
      //              $(".co_tips.co_tips_ward1 .show_gift>i").text((prizes[id]||{}).prize);
      //              $(".co_tips.co_tips_ward1 .show_gift").addClass("hidden");
      //              $(".co_tips.co_tips_ward1 .show_gift"+(prizes[id]||{}).i).removeClass("hidden");
      //            }
      //          } else {
      //            lottery.stop(prizes[2].i);
      //            lottery.end = function () {
      //              $(".lottery-unit").removeClass("active");
      //            }
      //            $(".co_tips_success").removeClass("hidden");
      //            $(".co_tips_success .tips_txt").text("");
      //            $(".co_tips_success .success").text(data.msg);
      //          }
      //        }
      //      });
      //    }, 3000);
      //  } else {
      //    //alert("抽奖次数已经用完！");
      //    $(".co_tips_success").removeClass("hidden");
      //    $(".co_tips_success .tips_txt").text("糟糕了！");
      //    $(".co_tips_success .success").text("您还没有抽奖机会 ，赶快邀请更多好友参与吧");
      //  }
      //}
    });
  };
});
//地址弹框显示
$(".co_tips_addbtn,.co_tips_newbtn").click(function(){
  $(".co_tips").addClass("hidden");
  $(".co_tips_addr").removeClass("hidden");
  $("body,html").addClass("no_auto");
});
//地址填写请求
$(".co_tips_addr .co_tips_addsure").click(function(){
  var my_name = $(".u_name").val();
  var my_yb=$('.u_yb').val();
  var my_tel = $(".u_tel").val();
  var my_add=$('.u_madd').val();
  if(!my_name) {
    showErr(3, "收件人姓名不能为空哦");
    return;
  }hideErr(3);
  if(!my_yb) {
    showErr(3, "收件人邮编不能为空哦");
    return;
  }hideErr(3);
  if(!my_tel) {
    showErr(4, "手机号码不能为空哦");
    return;
  }else if(my_tel.length != 11){
    showErr(4, "手机号码不正确哦");
    return;
  }hideErr(4);
  if(!my_add) {
    showErr(5, "收件人详细地址不能为空哦");
    return;
  }hideErr(5);
  $.ajax({
    'url':add_url,
    'data':{'name':my_name,'code':my_yb,'address':my_add,'tel':my_tel,"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        alert("保存成功");
        $(".co_tips_addr").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".u_name").val(my_name);
        $(".u_yb").val(my_yb);
        $(".u_tel").val(my_tel);
        $(".u_madd").val(my_add);
        $(".co_tips_addbtn").addClass("hidden");
        $(".co_tips_newbtn").removeClass("hidden");
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
