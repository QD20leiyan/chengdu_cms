var all_url='/site/ajax-lottery-log.html'; //获取所有用户中奖记录
var me_url='/site/ajax-lottery-me-log.html';//获取当前用户中奖记录
var login_url='/site/ajax-lottery-get-user.html';//判断用户是否登录
var out_url='/site/ajax-login-out.html';//注销登录
var verify_url='/site/ajax-lottery-login-verify.html';//登录发送验证码
var img_url ='/site/captcha.html?refresh=1';//更新图片验证码
var login_url1='/site/ajax-lottery-login.html';//登录
var lottery_url='/site/ajax-lottery.html';//抽奖
var lottery_url1='/site/ajax-lottery-share.html';//抽奖分享获得抽奖次数
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
//  $.ajax({
//      'url':login_url,
//      'data':{},
//      'type':'GET',
//      'dataType':'Json',
//      success:function(data){
//          if(data.status==0){
//              $(".co_before").addClass("hidden");
//              $(".co_after").removeClass("hidden");
//              $('.count').text(data.lottery_count);
//              $('.user_phone').text(data.phone);
//          }else{}
//      }
//  });
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
                    result += "<li>恭喜<span>"+data.data[i].phone+"</span>获得<i>"+data.data[i].name+"</i></li>";
                }
                $('.price_con ul').append(result);
                //中奖名单--只有一个时复制一个
                if($(".price_con ul li").length>1){
                    //$(".price_con ul").append($(".price_con ul li").clone(true));
                    setInterval('autoScroll(".price_con ul")', 1000);
                }
            }else{

            }
        }
    });
});
//弹框关闭
$(".co_tips_close").click(function(){
    $(".co_tips_login").addClass("hidden");
    $(".co_tips_ward").addClass("hidden");
    $(".co_tips_no").addClass("hidden");
    $(".co_tips_yq").addClass("hidden");
    $(".co_tips_record").addClass("hidden");
    $(".co_tips_detail").addClass("hidden");
    $('.co_username').val("");
    $('.captcha').val("");
    $('.co_codenum1').val("");
    $(".co_error").removeClass("co_err_show");
});
//马戏弹框显示
$(".mx").click(function(){
    $(".co_tips_detail").removeClass("hidden");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
//  $(".co_tips_login").removeClass("hidden");
	alert("活动已结束！");
});
$(".click_btn").click(function (){
	alert("活动已结束！");
});
$(".co_share").click(function (){
	alert("活动已结束！");
});
$(".check_ward").click(function (){
	alert("活动已结束！");
});
//登录获取验证码
//$(".co_codebtn1").click(function(){
//  var my_phone = $(".co_username").val();
//  var captcha = $(".captcha").val();
//  var srf = $('meta[name="csrf-token"]').attr('content');
//  if(my_phone == "" || my_phone == undefined) {
//      showErr(0, "手机号码不能为空哦");
//      return;
//  }else if(my_phone.length != 11){
//      showErr(0, "手机号码不正确哦");
//      return;
//  }
//  hideErr(0);
//  if(captcha == "" || captcha == undefined) {
//      showErr(1, "验证码不能为空哦");
//      return;
//  }
//  hideErr(1);
//  $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
//      if(data.status == 0){
//          $(".co_codebtn1").css("pointer-events","none");
//          $.get(img_url,{ },function(data){
//              $(".co_captcha img").attr("src",data.url);
//          }, 'json');
//          page_djs($(".co_codebtn1"),function(){
//              $(".co_codebtn1").css("pointer-events","auto");
//          });
//      }else{
//          alert(data.msg);
//          $.get(img_url,{ },function(data){
//              $(".co_captcha img").attr("src",data.url);
//          }, 'json');
//      }
//  }, 'json');
//});
//登录请求
//$(".co_tips_btn1").click(function(){
//  var my_phone = $(".co_username").val();
//  var co_codenum1=$('.co_codenum1').val();
//  var srf = $('meta[name="csrf-token"]').attr('content');
//  if(my_phone == "" || my_phone == undefined) {
//      showErr(0, "手机号码不能为空哦");
//      return;
//  }else if(my_phone.length != 11){
//      showErr(0, "手机号码不正确哦");
//      return;
//  }
//  hideErr(0);
//  if(co_codenum1 == "" || co_codenum1 == undefined) {
//      showErr(2, "验证码不能为空哦");
//      return;
//  }
//  hideErr(2);
//  $.ajax({
//      'url':login_url1,
//      'data':{'phone':my_phone,'yzm':co_codenum1,"cms_csrf":srf },
//      'type':'POST',
//      'dataType':'Json',
//      success:function(data){
//          if(data.status==0){
//              alert("登录成功");
//              $(".co_tips_login").addClass("hidden");
//              $(".co_before").addClass("hidden");
//              $(".co_after").removeClass("hidden");
//              $('.co_username').val("");
//              $('.co_codenum1').val("");
//              $('.user_phone').text(data.msg.phone);
//              $('.count').text(data.msg.lottery_count);
//          }else{
//              showErr(2, data.msg);
//              //alert(data.msg);
//          }
//      }
//  });
//});
//图片验证码刷新
//$(".co_captcha").click(function(){
//  $.get(img_url,{ },function(data){
//      $(".co_captcha img").attr("src",data.url);
//  }, 'json');
//});
//中奖纪录弹框显示
//$(".check_ward").click(function(){
//  if($(".co_after.hidden").length>0){
//      $(".co_tips_login").removeClass("hidden");
//  }else{
//      //获取当前用户中奖记录
//      $.ajax({
//          'url':me_url,
//          'data':{},
//          'type':'GET',
//          'dataType':'Json',
//          success:function(data){
//              if(data.status==0&& data.msg.length>0){
//                  $('.table_list').empty();
//                  var result = '';
//                  for(var i = 0; i < data.msg.length; i++) {
//                      if(data.msg[i].gift_id==1){
//                          result += "<p class='table_info'><span>"+data.msg[i].name+"</span><span class='table_code'><a href='https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b' target='_blank'>https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b</a></span><span class='copy' data-clipboard-text='https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b'></span></p>";
//                      }else{
//                          result += "<p class='table_info'><span>"+data.msg[i].name+"</span><span class='table_code'>"+data.msg[i].code+"</span><span class='copy' data-clipboard-text='"+data.msg[i].code+"'></span></p>";
//                      }
//                  }
//                  $('.table_list').append(result);
//                  $(".co_tips_record").removeClass("hidden");
//              }else{
//                  alert("您还没有中奖记录哦~");
//              }
//          }
//      });
//
//
//  }
//});
//邀请好友弹框显示
//$(".co_share>span").click(function(){
//  if($(".co_after.hidden").length>0){
//      //登录之前
//      $(".co_tips_login").removeClass("hidden");
//  }else{
//      $(".co_tips_yq").removeClass("hidden");
//  }
//});
//注销登录
//$(".logout").click(function(){
//  $.ajax({
//      'url':out_url,
//      'data':{},
//      'type':'GET',
//      'dataType':'Json',
//      success:function(data){
//          if(data.status==0){
//              alert(data.msg);
//              $(".co_before").removeClass("hidden");
//              $(".co_after").addClass("hidden");
//              $('.count').text("0");
//              $('.user_phone').text("");
//          }else{
//              alert(data.msg);
//          }
//      }
//  });
//});
//中奖名单滚动效果
function autoScroll(obj) {
    $(obj).animate({
        marginTop: "-30px"
    }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
}
//分享获取抽奖次数
//$(".co_wx,.co_qq,.co_wb").click(function(){
//  $.ajax({
//      'url':lottery_url1,
//      'data':{},
//      'type':'GET',
//      'dataType':'Json',
//      success:function(data){
//          if(data.status==0){
//              $('.count').text(data.lottery_count);
//          }else{
//              //alert(data.msg);
//          }
//      }
//  });
//});
//抽奖
//$(document).ready(function(){
//  var lottery={
//      index:-1,	//当前转动到哪个位置，起点位置
//      count:0,	//总共有多少个位置
//      timer:0,	//setTimeout的ID，用clearTimeout清除
//      speed:20,	//初始转动速度
//      times:0,	//转动次数
//      cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
//      prize:-1,	//中奖位置
//      init:function(id){
//          if ($("#"+id).find(".lottery-unit").length>0) {
//              $lottery = $("#"+id);
//              $units = $lottery.find(".lottery-unit");
//              this.obj = $lottery;
//              this.count = $units.length;
//              $lottery.find(".lottery-unit-"+this.index).addClass("active");
//          };
//      },
//      roll:function(){
//          var index = this.index;
//          var count = this.count;
//          var lottery = this.obj;
//          $(lottery).find(".lottery-unit-"+index).removeClass("active");
//          index += 1;
//          if (index>count-1) {
//              index = 0;
//          };
//          $(lottery).find(".lottery-unit-"+index).addClass("active");
//          this.index=index;
//          return false;
//      },
//      stop:function(index){
//          this.prize=index;
//          return false;
//      },
//      end:function(){}
//  };
//
//  function roll(){
//      lottery.times += 1;
//      lottery.roll();
//      if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
//          clearTimeout(lottery.timer);
//          lottery.prize=-1;
//          lottery.times=0;
//          click=false;
//          lottery.end();
//      }else{
//          if (lottery.times<lottery.cycle) {
//              lottery.speed -= 10;
//          }else{
//              if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
//                  lottery.speed += 110;
//              }else{
//                  lottery.speed += 20;
//              }
//          }
//          if (lottery.speed<60) {
//              lottery.speed=60;
//          };
//          lottery.timer = setTimeout(roll,lottery.speed);
//      }
//      return false;
//  }
//
//  var prizes={
//      1:{i:0,prize:'饿了么专属红包*1'},
//      2:{i:1,prize:'《马戏之王》电影票*1'},
//      3:{i:2,prize:'独角兽*1'},
//      4:{i:7,prize:'银矿*10'},
//      5:{i:3,prize:'烤牛排*30'},
//      6:{i:6,prize:'谢谢参与'},
//      7:{i:5,prize:'红菇大虾*5'},
//      8:{i:4,prize:'爱奇艺会员折扣券*1'},
//  };
//
//  var click=false;
//  window.onload=function(){
//      lottery.init('lottery');
//      $(".click_btn").click(function(){
//          //抽奖前先判断是否登录
//          if($(".co_after.hidden").length>0){
//              //登录之前
//              $(".co_tips_login").removeClass("hidden");
//          }else{
//              //登录之后就抽奖
//              if(click){
//                  return ;//正在抽奖，点击无效;
//              }
//              if($(this).find(".count").text()>0){
//                  lottery.speed=150;
//                  roll();
//                  click=true;
//                  var lightInterval=setInterval(function(){
//                      if(click){
//                          $(".hm-cj").toggleClass("light");
//                      }else{
//                          clearInterval(lightInterval);
//                      }
//                  },100);
//                  //请求数据；
//                  setTimeout(function(){
//                      $.ajax({
//                          'url':lottery_url,
//                          'data':{},
//                          'type':'GET',
//                          'dataType':'Json',
//                          success:function(data){
//                              if(data.status==0){
//                                  $('.count').text(data.count);
//                                  //var id=Math.ceil(Math.random()*8);
//                                  var id=data.id;
//                                  lottery.stop(prizes[id].i);
//                                  //中奖弹框显示
//                                  var code=data.code;
//                                  if(id==1){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("饿了么专属红包");
//                                  }else if(id==2){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("《马戏之王》电影票");
//                                  }else if(id==3){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("独角兽")
//                                  }else if(id==4){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("银矿")
//                                  }else if(id==5){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("烤牛排")
//                                  }else if(id==7){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("红菇大虾")
//                                  }else if(id==8){
//                                      $(".co_tips.co_tips_ward .tips_txt span").text("爱奇艺会员折扣券")
//                                  }
//                                  lottery.end=function(){
//                                      if(id!==6){
//                                          if(id==1){
//                                              $(".tips_num").html("<a href='https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b' target='_blank'>https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b</a>");
//                                              $(".co_tips_ward .copy").attr("data-clipboard-text","https://h5.ele.me/baida/#group_sn=d1b70109647bf58abdd8e6113b772f24&b");
//                                              $(".co_tips_ward ").removeClass("hidden");
//                                          }else{
//                                              $(".tips_num").html("<span>"+code+"</span>");
//                                              $(".co_tips_ward .copy").attr("data-clipboard-text",code);
//                                              $(".co_tips_ward ").removeClass("hidden");
//                                          }
//                                      }else if(id==6){
//                                          $(".co_tips_no").removeClass("hidden");
//                                      }
//                                  }
//                              }else{
//                                  //alert(data.msg);
//                                  lottery.stop(prizes[6].i);
//                                  $(".co_tips.co_tips_no .tips_txt").text(data.msg);
//                                  $(".co_tips_no").removeClass("hidden");
//                                  if(data.msg=="登陆超时，请重新登录！"){
//                                      $(".co_before").removeClass("hidden");
//                                      $(".co_after").addClass("hidden");
//                                      $('.count').text("0");
//                                      $('.user_phone').text("");
//                                  }
//                                  $('.count').text(data.count);
//                              }
//                          }
//                      });
//                  },3000);
//              }else{
//                  //alert("抽奖次数已经用完！");
//                  $(".co_tips_yq ").removeClass("hidden");
//              }
//          }
//      });
//  };
//
//  //复制
//  var clipboard=new Clipboard('.copy');
//  clipboard.on('success', function(e) {
//      console.log(e);
//      alert("已复制");
//  });
//  clipboard.on('error', function(e) {
//      console.log(e);
//  });
//
//});
