var all_url='/site/ajax-lottery-log.html'; //获取所有用户中奖记录
var me_url='/site/ajax-lottery-me-log.html';//获取当前用户中奖记录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var out_url='/site/ajax-login-out.html';//注销登录
var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var login_url1='/site/ajax-login.html';//登录
var yy_url='/site/ajax-yuyue.html';//预约
var lottery_url='/site/ajax-lottery.html';//抽奖
//var yynum_url='/site/ajax-get-num.html';//预约人数监控
var add_url='/site/ajax-save-address.html';//保存收货地址
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var today_draw_count=0;
var lottery_node_1=0;

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
        $("body,html").removeClass("no_auto");
        $(".co_tips_login").addClass("hidden");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $(".login_af").removeClass("login_af1");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.phone);
        $('.count_all').text(data.count||"0");
        $('.friend').text(data.invite_num||"0");
        $('.yq_num').text(data.me_invite_code);
        $('.my_url').text(data.share_url);
        is_yuyue=data.is_yuyue;
        today_draw_count=data.today_draw_count;
        lottery_node_1=data.lottery_node_1;
        count_num(data.invite_num,data.invite_count,data.lottery_node_1);
        if(!data.name&&!data.address&&!data.tel&&!data.code){
          $(".co_tips_addbtn").removeClass("hidden");
          $(".co_tips_newbtn").addClass("hidden");
        }else{
          $(".u_name").val(data.name);
          $(".u_yb").val(data.code);
          $(".u_tel").val(data.tel);
          $(".u_madd").val(data.address);
          $(".co_tips_addbtn").addClass("hidden");
          $(".co_tips_newbtn").removeClass("hidden");
        }
      }else{}
    }
  });
  //获取所有用户中奖记录
  $.ajax({
    'url':all_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0&& data.data.length>0){
        var result = '';
        for(var i = 0; i < data.data.length; i++) {
          result += "<li>恭喜<span>"+data.data[i].phone+"</span>获得<span>"+data.data[i].name+"</span></li>";
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
  //进度条
  initActive($(".num .num_txt").text());
});
//弹框关闭
$(".co_tips_close").click(function(){
  $("body,html").removeClass("no_auto");
  $(".co_tips").addClass("hidden");
  $('.co_input input').val("");
  $('.co_input textarea').val("");
  $(".co_error").removeClass("co_err_show");
});
$(".co_tips_surebtn").click(function(){
  $(".co_tips").addClass("hidden");
});
//地址弹框显示
$(".co_tips_addbtn,.co_tips_newbtn").click(function(){
  $("body,html").addClass("no_auto");
  $(".co_tips").addClass("hidden");
  $(".co_tips_addr").removeClass("hidden");
});
//奖品展示弹框显示
$(".ward1 .gift_more").click(function(){
  $(".co_tips_show,.co_tips_show .show1").removeClass("hidden");
  $(".co_tips_show .show2,.co_tips_show .show3").addClass("hidden");
});
$(".ward2 .gift_more").click(function(){
  $(".co_tips_show,.co_tips_show .show2").removeClass("hidden");
  $(".co_tips_show .show1,.co_tips_show .show3").addClass("hidden");
});
$(".ward3 .gift_more").click(function(){
  $(".co_tips_show,.co_tips_show .show3").removeClass("hidden");
  $(".co_tips_show .show1,.co_tips_show .show2").addClass("hidden");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
  $("body,html").addClass("no_auto");
  $(".co_tips_login").removeClass("hidden");
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
        $("body,html").removeClass("no_auto");
        $(".co_tips_login").addClass("hidden");
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
        $(".login_af").removeClass("login_af1");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.yq_num').text(data.msg.me_invite_code);
        $('.my_url').text(data.msg.share_url);
        $(".co_tips_yq .copy").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
        today_draw_count=data.msg.today_draw_count;
        lottery_node_1=data.msg.lottery_node_1;
        count_num(data.msg.invite_num,data.msg.invite_count,data.msg.lottery_node_1);
        if(!data.msg.name&&!data.msg.address&&!data.msg.tel&&!data.msg.code){
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
        if(is_yuyue==1){
          $("body,html").removeClass("no_auto");
          $(".co_tips_login").addClass("hidden");
        }else{
          $("body,html").removeClass("no_auto");
          $(".co_tips_login").addClass("hidden");
          //预约接口
          yy_game();
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
    $("body,html").addClass("no_auto");
    $(".co_tips_login").removeClass("hidden");
  }else{
    $(".co_tips_yq").removeClass("hidden");
  }
});
//游戏预约弹框显示
$(".c_anbtn").click(function(){
  $(".co_tips_yy").removeClass("hidden");
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
        $(".login_af").addClass("login_af1");
        $('.user_phone').text("");
        $('.count_all,.count,.help,.friend').text("0");
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
//预约框进度条显示
function initActive(num){
  num=parseInt(num)>0?parseInt(num):0;//防止小于0
  if(num>=100000){
    $(".co_tips_yy .yy_progress_box .row1").addClass("active");
  }if(num>=400000){
    $(".co_tips_yy .yy_progress_box .row2").addClass("active");
  }if(num>=700000){
    $(".co_tips_yy .yy_progress_box .row3").addClass("active");
  }if(num>=1000000){
    $(".co_tips_yy .yy_progress_box .row4").addClass("active");
  }
}
//立即预约弹框显示
$(".co_tips_yy .co_tips_yybtn").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $("body,html").addClass("no_auto");
    $(".co_tips_yy").addClass("hidden");
    $(".co_tips_login").removeClass("hidden");
  }else{
    //登录之后
    $(".co_tips_yy").addClass("hidden");
    if(is_yuyue==1){
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
    }else{
      //预约接口
      yy_game();
    }
  }
});
//立即预约请求
function yy_game(){
    var invite_code=getQueryString('invite_code');
  $.post(yy_url,{"cms_csrf":srf,'invite_code':invite_code},function(data){
    if(data.status == 0){
      // $(".co_tips_success").removeClass("hidden");
      // $(".co_tips_success .success").text("预约成功");
        $(".co_tips_ward2").removeClass("hidden");
        $(".co_tips.co_tips_ward2 .tips_num1").text('京东200-10元优惠券');
        $(".co_tips.co_tips_ward2 .co_tips_turnbtn").attr("href",data.msg);
    }else{
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .success").text(data.msg);
    }
  }, 'json');
}
//奖池机会援助计算
function count_num(invite_num,invite_count,lottery_node_1){
  //1奖池
  if(invite_num>=1){
    if(lottery_node_1==1){
      //1奖池已开启
      $(".ward1 .count").text("0");
      //$(".ward1").addClass("gray");
    }else{
      //1奖池未开启
      $(".ward1 .count").text("1");
      //$(".ward1").removeClass("gray");
    }

    // invite_num-1  未抽时二三奖池可用次数
    // (invite_count-(lottery_node_1==1?1:0))  二三奖池已用次数
    var last_count=invite_num-1-(invite_count-(lottery_node_1==1?1:0));

    //2奖池
    if(invite_num>=3){
      $(".ward2 .count").text(last_count);
      if(last_count>0){
        //$(".ward2").removeClass("gray");
      }else{
        //$(".ward2").addClass("gray");
      }
    }else{
      $(".ward2 .count").text("0");
      //$(".ward2").addClass("gray");
    }

    //3奖池
    if(invite_num>=5){
      $(".ward3 .count").text(last_count);
      if(last_count>0){
        //$(".ward3").removeClass("gray");
      }else{
        //$(".ward3").addClass("gray");
      }
    }else{
      $(".ward3 .count").text("0");
      //$(".ward3").addClass("gray");
    }

    if(invite_num>1){
      $(".ward1 .help").text("1");
    }else{
      $(".ward1 .help").text("0");
    }

    if(invite_num>3){
      $(".ward2 .help").text("1");
    }else{
      $(".ward2 .help").text("0");
    }

    if(invite_num>5){
      $(".ward3 .help").text(invite_num-5);
    }else{
      $(".ward3 .help").text("0");
    }

  }
}
//抽奖
$(document).ready(function(){
  var prizes={
    0:{img:0,prize:'谢谢参与'},
    1:{img:5,prize:'徽章*20'},
    2:{img:6,prize:'小喇叭*1'},
    3:{img:4,prize:'花朵*3'},
    4:{img:5,prize:'徽章*30'},
    5:{img:4,prize:'花朵*5'},
    6:{img:1,prize:'"龙族"(人类)限时*1天'},
    7:{img:10,prize:'京东M&M豆店铺优惠券'},
    8:{img:7,prize:'京东指定店铺10元优惠券'},
    9:{img:5,prize:'徽章*50'},
    10:{img:3,prize:'蛋糕*1'},
    11:{img:2,prize:'"龙族"(恶魔)限时*3天'},
    12:{img:8,prize:'汇源果汁'},
    13:{img:7,prize:'京东200-10元优惠券'},
  };
  var click=false;
  window.onload=function(){
    $(".lottery").click(function(){
      var node=$(this).data("id");
      //抽奖前先判断是否登录
      if($(".co_after.hidden").length>0){
        //登录之前
        $(".co_tips_login").removeClass("hidden");
        $("body,html").addClass("no_auto");
      }else{
        if(node==1&&lottery_node_1==1){
            alert("该奖池只能抽一次哦");
        }else{
          //登录之后就抽奖
          if(click){
            return ;//正在抽奖，点击无效;
          }
          if($(this).parent().find(".count").text()>0){
            if(today_draw_count<10){
              if(today_draw_count<400){
                click=true;
                //请求数据；
                $.ajax({
                  'url':lottery_url,
                  'data':{"node":node,"cms_csrf":srf },
                  'type':'POST',
                  'dataType':'Json',
                  success:function(data){
                    click=false;
                    $(".co_tips.co_tips_ward1 .tips_num").removeClass("hidden");
                    if(data.status==0){
                      $('.friend').text(data.user.invite_num);
                      $('.count_all').text(data.user.invite_num-data.user.invite_count);
                      count_num(data.user.invite_num,data.user.invite_count,data.user.lottery_node_1);
                      var id=data.id;
                      var code=data.gift_code;
                      //中奖弹框显示
                      if(id==0){
                        //谢谢参与
                        $(".co_tips_success").removeClass("hidden");
                        $(".co_tips.co_tips_success .tips_txt,.co_tips.co_tips_success .co_tips_title").addClass("hidden");
                        $(" .co_tips.co_tips_success .success").text("谢谢参与！");
                      }else{
                        if(id==7||id==8||id==13){
                          $(".co_tips_ward2").removeClass("hidden");
                          $(".co_tips.co_tips_ward2 .tips_num1").text((prizes[id]||{}).prize);
                          $(".co_tips.co_tips_ward2 .co_tips_turnbtn").attr("href",code);
                        }else{
                          if(id==12){
                            $(".co_tips.co_tips_ward1 .tips_num").addClass("hidden");
                          }
                          $(".co_tips_ward1").removeClass("hidden");
                          $(".co_tips.co_tips_ward1 .show_gift>i").text((prizes[id]||{}).prize);
                          $(".co_tips.co_tips_ward1 .tips_num>span").text(code);
                          $(".co_tips.co_tips_ward1 .show_gift").addClass("hidden");
                          $(".co_tips.co_tips_ward1 .show_gift"+(prizes[id]||{}).img).removeClass("hidden");
                        }
                      }
                    }else if(data.status==2){
                      //登陆超时，请重新登录
                      $(".co_before").removeClass("hidden");
                      $(".co_after,.ward_yq").addClass("hidden");
                      $(".login_af").addClass("login_af1");
                      $('.user_phone').text("");
                      $('.count_all,.count,.help,.friend').text("0");
                      $('.yq_num').text("");
                      $('.my_url').text("");
                    }else{
                      //alert(data.msg);
                      $(".co_tips_success").removeClass("hidden");
                      $(".co_tips.co_tips_success .tips_txt,.co_tips.co_tips_success .co_tips_title").addClass("hidden");
                      $(" .co_tips.co_tips_success .success").text(data.msg);
                    }
                  },
                  error:function(){
                    click=false;
                  }
                });
              }else{
                $(".co_tips_success").removeClass("hidden");
                $(".co_tips.co_tips_success .tips_txt,.co_tips.co_tips_success .co_tips_title").addClass("hidden");
                $(" .co_tips.co_tips_success .success").text("该账号抽奖次数已达到总上限哦");
              }
            }else{
              $(".co_tips_success").removeClass("hidden");
              $(".co_tips.co_tips_success .tips_txt,.co_tips.co_tips_success .co_tips_title").addClass("hidden");
              $(" .co_tips.co_tips_success .success").text("您今日抽奖次数已达到上限哦");
            }
          }else{
            //alert("抽奖次数已经用完！");
            $(".co_tips_yq .co_tips_title").text("糟糕了！");
            $(".co_tips_yq .tips_txt").text("您还没有抽奖机会 ，赶快邀请更多好友参与吧");
            $(".co_tips_yq").removeClass("hidden");
          }
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
//地址填写请求
$(".co_tips_addr .co_tips_addsurebtn").click(function(){
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
  if(!my_add) {
    showErr(4, "收件人邮编不能为空哦");
    return;
  }hideErr(4);
  if(!my_tel) {
    showErr(5, "手机号码不能为空哦");
    return;
  }else if(my_tel.length != 11){
    showErr(5, "手机号码不正确哦");
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
        $("body,html").removeClass("no_auto");
        $(".co_tips_addr").addClass("hidden");
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
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}