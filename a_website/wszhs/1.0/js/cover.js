var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var yy_url1='/commonMethod/ajax-yuyue.html';//预约
var yy_url2='/commonMethod/ajax-yuyue-verify.html';//预约验证码
var login_url1='/site/ajax-login.html';//登录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var lottery_url='/site/ajax-draw.html';//抽奖
var add_url='/site/ajax-address.html';//保存收货地址
var me_url='/site/ajax-my-code.html';//获取用户中奖记录--中奖、所有
var out_url='/site/ajax-login-out.html';//注销登录
var share_url='/site/ajax-share.html';//分享
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
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
  imgMarkIndex++;
  var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
  $.get(imgUrl, {}, function(data) {
    $(".co_captcha img").attr("src",data.url);
  }, 'json');
}
var imgMarkIndex2=0;
function load_captcha2(){
  imgMarkIndex2++;
  var imgUrl2 = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
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
        alert("登陆成功");
        $(".co_tips_login").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_num||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.my_url').text(data.msg.share_url);
        $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
        today_draw_count=data.msg.today_draw_count;
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
        $(".co_tips_login").addClass("hidden");
        $("body,html").removeClass("no_auto");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_num||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.my_url').text(data.msg.share_url);
        $(".copy").attr("data-clipboard-text",data.msg.share_url);
        today_draw_count=data.msg.today_draw_count;
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
  //swiper
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
//点击登陆
$(".co_tips_login .co_tips_btn").click(function(){
  get_login();
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
      'data':{'type':2,"cms_csrf":srf},
      'type':'POST',
      'dataType':'Json',
      success:function(data){
        if(data.status==0&& data.msg.length>0){
          $('.co_tips_record .table_list').empty();
          var result = '';
          for(var i = 0; i < data.msg.length; i++) {
            result += "<p class='table_info'><span>"+data.msg[i].name+"</span></p>";
          }
          $('.co_tips_record .table_list').append(result);
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
//分享弹框显示
$(".get_btn").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
  }else{
    $(".co_tips_share").removeClass("hidden");
    $.ajax({
      'url':share_url,
      'data':{},
      'type':'GET',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){
          $('.count_all').text(data.draw_num);
        }else{}
      }
    });
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
        $('.my_url').text("");
      }else{
        alert(data.msg);
      }
    }
  });
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
    1: {i: 3, prize: '参与礼包'},
    2: {i: 1, prize: '188元冲刺礼包'},
    3: {i: 4, prize: '328元豪华礼包'},
    4: {i: 5, prize: '谢谢参与'},
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
          console.log(today_draw_count);
          if(today_draw_count<10){
            lottery.speed = 150;
            roll();
            click = true;
            //请求数据；
            setTimeout(function () {
              $.ajax({
                'url': lottery_url,
                'data': {},
                'type': 'GET',
                'dataType': 'Json',
                success: function (data) {
                  if (data.status == 0) {
                    var id = data.msg.gift_id;
                    var code=data.msg.code;
                    var count=data.msg.draw_num;
                    $('.count_all').text(count);
                    $('.lottery_code').text(code);
                    $(".co_tips_ward1 .copy1").attr("data-clipboard-text",code);
                    lottery.stop(prizes[id].i);
                    lottery.end = function () {
                      if(id==4){
                        //谢谢参与
                        $(".co_tips_success").removeClass("hidden");
                        $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
                        $(" .co_tips.co_tips_success .success").text("谢谢参与！");
                      }else{
                        $(".co_tips_ward1").removeClass("hidden");
                        $(".co_tips.co_tips_ward1 .show_gift>i").text((prizes[id]||{}).prize);
                        $(".co_tips.co_tips_ward1 .show_gift").addClass("hidden");
                        $(".co_tips.co_tips_ward1 .show_gift"+(prizes[id]||{}).i).removeClass("hidden");
                      }
                    }
                  } else {
                    lottery.stop(prizes[4].i);
                    $(".co_tips_success").removeClass("hidden");
                    $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
                    $(".co_tips_success .success").text(data.msg);
                  }
                }
              });
            }, 3000);
          }else{
            $(".co_tips_success").removeClass("hidden");
            $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
            $(" .co_tips.co_tips_success .success").text("今日抽奖次数已达到上限");
          }
        } else {
          //alert("抽奖次数已经用完！");
          $(".co_tips_success").removeClass("hidden");
          $(".co_tips_success .tips_txt").addClass("hidden");
          $(".co_tips_success .success").text("您还没有抽奖机会 ，赶快邀请更多好友参与吧");
        }
      }
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
        alert("您的资料已填写完毕，奖品将陆续发货，请耐心等待！");
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
