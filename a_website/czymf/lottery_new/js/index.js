var login_url1='/site/ajax-lottery-login.html';//登录
var me_url='/site/ajax-lottery-me-log.html';//获取当前用户中奖记录
var all_url='/site/ajax-lottery-log.html'; //获取所有用户中奖记录
var lottery_url1='/site/ajax-lottery-share.html';//抽奖分享获得抽奖次数
var add_url='/site/save-address.html';//保存收货地址
var lottery_url='/site/ajax-lottery.html';//抽奖
var login_url='/site/ajax-lottery-get-user.html';//判断用户是否登录
var out_url='/site/ajax-login-out.html';//注销登录
var verify_url='/site/ajax-lottery-login-verify.html';//登录发送验证码
var srf = $('meta[name="csrf-token"]').attr('content');
var my_lotteryid="";
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    //imgMarkIndex++;
    var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
        $(".co_captcha img").show();
        $(".co_captcha img").attr("src",data.url);
        $(".co_imgtxt").addClass("hidden");
    }, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
    load_captcha();
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
    //抖音浮窗显示
    $(".btn .dy").hover(function (){
        $(".fl_dy").stop().fadeIn();
    },function (){
        $(".fl_dy").stop().fadeOut();
    });
    //判断用户是否登录
      $.ajax({
          'url':login_url,
          'data':{},
          'type':'GET',
          'dataType':'Json',
          success:function(data){
              if(data.status==0){
                  $(".co_before").addClass("hidden");
                  $(".co_after").removeClass("hidden");
                  $('.count').text(data.lottery_count);
                  $('.user_phone').text(data.phone);
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
    $(".co_tips").addClass("hidden");
    $('.co_username').val("");
    $('.captcha').val("");
    $('.co_codenum1').val("");
    $(".co_error").removeClass("co_err_show");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
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
$(".co_tips_btn1").click(function(){
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
              $(".co_before").addClass("hidden");
              $(".co_after").removeClass("hidden");
              $('.co_username').val("");
              $('.co_codenum1').val("");
              $('.user_phone').text(data.msg.phone);
              $('.count').text(data.msg.lottery_count);
          }else{
              showErr(2, data.msg);
              load_captcha();
          }
      }
  });
});
//中奖纪录弹框显示
$(".check_ward").click(function(){
  if($(".co_after.hidden").length>0){
      $(".co_tips_login").removeClass("hidden");
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
                      var ids=[374,375,376,377];
                      result += "<p class='table_info'><span>"+data.msg[i].name+"</span><span class='table_code'>"+(ids.indexOf(data.msg[i].gift_id)>-1?"实物奖励":data.msg[i].code)+"</span><span class='copy' data-clipboard-text='"+data.msg[i].code+"'></span></p>";
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
$(".co_share>span").click(function(){
  if($(".co_after.hidden").length>0){
      //登录之前
      $(".co_tips_login").removeClass("hidden");
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
              $(".co_after").addClass("hidden");
              $('.count').text("0");
              $('.user_phone').text("");
          }else{
              alert(data.msg);
          }
      }
  });
});
//中奖名单滚动效果
function autoScroll(obj) {
    $(obj).animate({
        marginTop: "-30px"
    }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
}
//分享获取抽奖次数
$(".co_wx,.co_qq,.co_wb").click(function(){
  $.ajax({
      'url':lottery_url1,
      'data':{},
      'type':'GET',
      'dataType':'Json',
      success:function(data){
          if(data.status==0){
              $('.count').text(data.lottery_count);
          }else{
              //alert(data.msg);
          }
      }
  });
});
//抽奖
$(document).ready(function(){
  var lottery={
      index:-1,	//当前转动到哪个位置，起点位置
      count:0,	//总共有多少个位置
      timer:0,	//setTimeout的ID，用clearTimeout清除
      speed:20,	//初始转动速度
      times:0,	//转动次数
      cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize:-1,	//中奖位置
      init:function(id){
          if ($("#"+id).find(".lottery-unit").length>0) {
              $lottery = $("#"+id);
              $units = $lottery.find(".lottery-unit");
              this.obj = $lottery;
              this.count = $units.length;
              $lottery.find(".lottery-unit-"+this.index).addClass("active");
          };
      },
      roll:function(){
          var index = this.index;
          var count = this.count;
          var lottery = this.obj;
          $(lottery).find(".lottery-unit-"+index).removeClass("active");
          index += 1;
          if (index>count-1) {
              index = 0;
          };
          $(lottery).find(".lottery-unit-"+index).addClass("active");
          this.index=index;
          return false;
      },
      stop:function(index){
          this.prize=index;
          return false;
      },
      end:function(){}
  };
  function roll(){
      lottery.times += 1;
      lottery.roll();
      if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
          clearTimeout(lottery.timer);
          lottery.prize=-1;
          lottery.times=0;
          click=false;
          lottery.end();
      }else{
          if (lottery.times<lottery.cycle) {
              lottery.speed -= 10;
          }else{
              if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                  lottery.speed += 110;
              }else{
                  lottery.speed += 20;
              }
          }
          if (lottery.speed<60) {
              lottery.speed=60;
          };
          lottery.timer = setTimeout(roll,lottery.speed);
      }
      return false;
  }
  var prizes={
      372:{i:0,prize:'蒸汽石*20'},
      373:{i:1,prize:'巧克力蛋糕*5'},
      377:{i:2,prize:'限量款玩偶1个*1'},
      375:{i:7,prize:'限量款贴纸*1'},
      374:{i:3,prize:'CONWOOD合作箱包*1'},
      0:{i:6,prize:'谢谢参与'},
      376:{i:5,prize:'限量款笔记本*1'},
      371:{i:4,prize:'黑蚀龙*1'},
  };
  var click=false;
  window.onload=function(){
      lottery.init('lottery');
      $(".click_btn").click(function(){
          //抽奖前先判断是否登录
          if($(".co_after.hidden").length>0){
              //登录之前
              $(".co_tips_login").removeClass("hidden");
          }else{
              //登录之后就抽奖
              if(click){
                  return ;//正在抽奖，点击无效;
              }
              if($(this).find(".count").text()>0){
                  lottery.speed=150;
                  roll();
                  click=true;
                  var lightInterval=setInterval(function(){
                      if(click){
                          $(".hm-cj").toggleClass("light");
                      }else{
                          clearInterval(lightInterval);
                      }
                  },100);
                  //请求数据；
                  setTimeout(function(){
                      $.ajax({
                          'url':lottery_url,
                          'data':{},
                          'type':'GET',
                          'dataType':'Json',
                          success:function(data){
                              click=false;
                              if(data.status==0){
                                  $('.count').text(data.count);
                                  //var id=Math.ceil(Math.random()*8);
                                  var id=data.id;
                                  lottery.stop(prizes[id].i);
                                  //中奖弹框显示
                                  var code=data.code;
                                  lottery.end=function(){
                                      if(id!==0){
                                          $(".jp_name span").text(prizes[id].prize);
                                          if(id==374||id==375||id==376||id==377){
                                              my_lotteryid=data.giftCodeLogId;
                                              $(".co_tips").addClass("hidden");
                                              $(".co_tips_addr").removeClass("hidden");
                                          }else{
                                              $(".tips_num").html("<span>"+code+"</span>");
                                              $(".co_tips_ward .copy").attr("data-clipboard-text",code);
                                              $(".co_tips_ward ").removeClass("hidden");
                                          }
                                      }else if(id==0){
                                          $(".co_tips.co_tips_no .tips_txt").text("谢谢参与！");
                                          $(".co_tips_no").removeClass("hidden");
                                      }
                                  }
                              }else if(data.status==-2){
                                  if(data.msg=="您还有实体礼包未填写收货信息"){
                                      lottery.stop(prizes[data.giftId].i);
                                      $(".jp_name span").text(prizes[data.giftId].prize);
                                      my_lotteryid=data.giftCodeLogId;
                                      $(".co_tips").addClass("hidden");
                                      $(".co_tips_addr").removeClass("hidden");
                                  }
                              }else{
                                  //alert(data.msg);
                                  lottery.stop(prizes[0].i);
                                  $(".co_tips.co_tips_no .tips_txt").text(data.msg);
                                  $(".co_tips_no").removeClass("hidden");
                                  if(data.msg=="登陆超时，请重新登录！"){
                                      $(".co_before").removeClass("hidden");
                                      $(".co_after").addClass("hidden");
                                      $('.count').text("0");
                                      $('.user_phone').text("");
                                  }
                                  $('.count').text(data.count);
                              }
                          }
                      });
                  },3000);
              }else{
                  //alert("抽奖次数已经用完！");
                  $(".co_tips_yq ").removeClass("hidden");
              }
          }
      });
  };
});
//复制
var clipboard=new Clipboard('.copy');
clipboard.on('success', function(e) {
    console.log(e);
    alert("已复制");
});
clipboard.on('error', function(e) {
    console.log(e);
});
//地址填写请求
$(".co_tips_addr .co_tips_surebtn").click(function(){
    var my_name = $(".u_name").val();
    var my_tel = $(".u_tel").val();
    var my_add=$('.u_madd').val();
    if(!my_name) {
        showErr(3, "收件人姓名不能为空哦");
        return;
    }hideErr(3);
    if(!my_tel) {
        showErr(3, "手机号码不能为空哦");
        return;
    }else if(my_tel.length != 11){
        showErr(3, "手机号码不正确哦");
        return;
    }hideErr(3);
    if(!my_add) {
        showErr(4, "收件人地址不能为空哦");
        return;
    }hideErr(4);
    $.ajax({
        'url':add_url,
        'data':{'name':my_name,'id':my_lotteryid,'address':my_add,'phone':my_tel,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                alert("保存成功");
                $(".co_tips_addr").addClass("hidden");
                $(".u_name").val(my_name);
                $(".u_tel").val(my_tel);
                $(".u_madd").val(my_add);
            }else{
                alert(data.msg);
            }
        }
    });
});
