var srf = $('meta[name="csrf-token"]').attr('content');
var num_url = '/commonMethod/ajax-get-subscribes.html';
var click_id=0;
// 验证码倒计时
function timer(ele,callback){
      var timeNum = 60;
      if(ele) {
        ele.html("60s");
      }
      timer_fun = setInterval(function() {
          timeNum--;
          ele.html((timeNum<=0?0:timeNum) + "s");
          if(timeNum == 0) {
              clearInterval(timer_fun);
              ele.html("获取验证码");
              if(callback) {
                callback();
              }
          }
      }, 1000);
    }
    //获取预约人数
function getYyNumber() {
    $.post('/commonMethod/ajax-get-new-subscribes.html', {
    'name': 'zzyzf_total'
  }, function(data) {
    if(data.msg == 'null' || data.msg == null) {
      data.msg = 0;
    }
   // var data = JSON.parse(data);
        var yyNumber = data.msg;
        if (data.msg == null) {
          yyNumber = 0;
        }
        yyNumber = parseInt(yyNumber);
        $(".peo_num>span").html(yyNumber);
  }, "json");
  }
$(function() {
    // 初始判断
    $.ajax({
        'url':'/site/ajax-get-user.html',
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
              var invite_num=data.msg.invite_num;
                if(!invite_num){
                    invite_num=0;
                }
                $(".log_bf").addClass("hide");
                $(".log_af").removeClass("hide");
                $('.user_id>span').text(data.msg.user_phone);
                $('.sec_num span').text(invite_num);
                $('.code>span').text(data.msg.me_invite_code);
                $('.inv_con>img').attr("src",data.msg.invite_img);
                $('.log_af').attr("data-url",data.msg.share_url);
                $('.inv_num').text(data.msg.me_invite_code);
            }else{}
        }
    });
    $.ajax({
        'url':'/commonMethod/ajax-get-new-subscribes.html',
        'data':{'name': 'zzyzf_total'},
        'type':'post',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
               var peo_num=data.msg;
               $(".peo_num>span").text(data.msg);
               if(peo_num>=10000){
                    $(".gift1 .g1 .dach").removeClass("hide");
                }else if(peo_num>=20000){
                    $(".gift1 .g1 .dach").removeClass("hide");
                    $(".gift1 .g2 .dach").removeClass("hide");
                }else if(peo_num>=50000){
                    $(".gift1 .g1 .dach").removeClass("hide");
                    $(".gift1 .g2 .dach").removeClass("hide");
                    $(".gift1 .g3 .dach").removeClass("hide");
                }else if(peo_num>=100000){
                    $(".gift1 .g1 .dach").removeClass("hide");
                    $(".gift1 .g2 .dach").removeClass("hide");
                    $(".gift1 .g3 .dach").removeClass("hide");
                    $(".gift1 .g4 .dach").removeClass("hide");
                }else if(peo_num>=200000){
                    $(".gift1 .g1 .dach").removeClass("hide");
                    $(".gift1 .g2 .dach").removeClass("hide");
                    $(".gift1 .g3 .dach").removeClass("hide");
                    $(".gift1 .g4 .dach").removeClass("hide");
                    $(".gift1 .g5 .dach").removeClass("hide");
                }
            }else{

            }
        }
    });
    //获取分享链接中的邀请码
    var url = url||location.search; //获取url中"?"符后的字串
    var params = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var datas = str.split("&");
        for(var i = 0 ; i < datas.length ; i++){
            var tempData = datas[i].split("=");
            params[tempData[0]]=tempData[1];
        }
    }
    $("#invite_code").val(params.code);
});
$('.js-yuyue').click(yuYue);
function checkPhone(phone) {
    if(/^1[3|4|5|7|8|9]\d{9}$/.test(phone)) {
      return true;
    }
    return false;
  }
  function yuYue() {
    var phone = $('.js-phone').val();
    var email = $('.js-email').val();
    var type = "ios";
    if(!checkPhone(phone)) {
      alert('该手机号码不正确');
    } else {
      var type = $('input[name="xitong"]:checked').val();
      $.post('/site/subscribe.html', {
          phone: phone,
          email: email,
          cms_csrf: srf ,
          type: type,
          is_no_yzm: 1
        },
        function(data) {
          if(data.status == 0) {
            $(".mask").removeClass("hide");
            $('.js-phone').val("");
            $('.js-email').val("");
            alert('预约已成功');
          } else {
            alert(data.msg);
          }
        }, 'JSON');
    }
  }
//弹窗关闭按钮
    $(".close").click(function(){
        $(this).parent().parent().addClass("hide");
    });
//登录弹框关闭
    $(".login_board .close").click(function(){
        $(".login_board").addClass("hide");
        $(".yuyue_board").addClass("hide");
        $(".invite_board").addClass("hide");
        $('#login_code1').val("");
        $('#check_code1').val("");
        $('#check_code2').val("");
        // $('#invite_code').val("");
        $(".co_error").hide();
    });
//点击邀请好友
  $(".yaoq").click(function(){
    if($(".log_af.hide").length>0){
        //还未登录
        $(".login_board").removeClass("hide");
    }else{
        $(".invite_board").removeClass("hide");
    }
  });
//点击预约
    $(".yy").click(function(){
        if($(".log_af.hide").length>0){
          //还未登录
             click_id=1;
            $(".login_board").removeClass("hide");
        }else{
            $(".yuyue_board").removeClass("hide");
            $(".yuyue_tel .err3").hide();
        }
    });
//点击登录
    $(".main2 .login").click(function(){
        $(".login_board").removeClass("hide");
    });
//登录获取验证码
  $(".gain1").click(function(){
    var my_tel1 = $("#login_code1").val();
    var my_code1= $("#check_code2").val();
    if(my_tel1 == "" || my_tel1 == undefined) {
        $(".login_tel .err1").show().text("* 手机号码不能为空喔~");
        return;
    }else if(!/^1[345789]\d{9}$/.test(my_tel1)){
        $(".login_tel .err1").show();
        return;
    }else if(my_code1 == "" || my_code1 == undefined){
        $(".login_tel .err3").show().text("* 请输入正确的验证码~");
        return;
    }else{
        $(".login_tel .err1").hide();
        $(".login_tel .err3").hide();
        $.post('/site/ajax-login-verify.html',{"phone":my_tel1,"captcha":my_code1,"cms_csrf":srf},function(data){
          if(data.status == 0){
              $(".gain1").css("pointer-events","none");
              $.get('/site/captcha.html?refresh=1',{ },function(data){
                  $("#captcha-img").attr("src",data.url);
              }, 'json');
              timer($(".gain1"),function(){
                $(".gain1").css("pointer-events","auto");
              });
          }else{
              alert(data.msg);
              $.get('/site/captcha.html?refresh=1',{ },function(data){
                  $("#captcha-img").attr("src",data.url);
              }, 'json');
          }
        }, 'json');
    }
  });
// 登录
  $(".login_next").click(function(){
    var my_tel1 = $("#login_code1").val();
    var my_code1 = $('#check_code1').val();
    var my_code2 = $('#check_code2').val();
    if(my_tel1 == "" || my_tel1 == undefined) {
        $(".login_tel .err1").show().text("* 手机号码不能为空喔~");
        return;
    }else if(!/^1[345789]\d{9}$/.test(my_tel1)){
        $(".login_tel .err1").show().text("* 请输入正确的手机号码~");
        return;
    }else if(my_code2 == "" || my_code2 == undefined){
        $(".login_tel .err3").show();
        return;
    }else{
        $(".login_tel .err1").hide();
        if(my_code1 == "" || my_code1 == undefined){
          $(".login_tel .err2").show();
          return;
        }else{
          $(".login_tel .err2").hide();
        }
    }
    $.ajax({
        'url':'/site/ajax-login.html',
        'data':{'phone':my_tel1,'captcha':my_code2,'yzm':my_code1,"cms_csrf":srf},
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
              var invite_num=data.msg.invite_num;
                if(!invite_num){
                     invite_num=0;
                }
                $(".login_board").addClass("hide");
                $(".log_bf").addClass("hide");
                $(".log_af").removeClass("hide");
                $('#login_code1').val("");
                $('#check_code1').val("");
                $('.user_id>span').text(data.msg.user_phone);
                $('.sec_num>span').text(invite_num);
                $('.code>span').text(data.msg.me_invite_code);
                $('.inv_con>img').attr("src",data.msg.invite_img);
                $('.log_af').attr("data-url",data.msg.share_url);
                $('.inv_num').text(data.msg.me_invite_code);
                if(click_id==1){
                    $(".yuyue_board").removeClass("hide");
                }
            }else{
                alert(data.msg);
            }
        }
    });
  });
  //图片验证码刷新
$(".code_img").click(function(){
  $.get('/site/captcha.html?refresh=1',{ },function(data){
       $("#captcha-img").attr("src",data.url);
    }, 'json');
});
  // 预约
  $(".yuyue_next").click(function(){
    var invite_code = $('#invite_code').val();
    var type_id=$(".yuyue_tel .yuyue_form .xitong>span.on").attr("data-id");
      if(type_id==1){
        var type="ios";
      }else if(type_id==2){
        var type="android";
      }
    var yq_xz=$(".yuyue_tel .yuyue_form .inv_hav>span.active").text();
     if(invite_code == ""&&yq_xz=="是") {
        $(".yuyue_tel .err3").show().text("* 邀请码不能为空喔~");
        return;
    }
            $.post('/site/ajax-yuyue.html',{ "type":type,"invite_code":invite_code,'cms_csrf':srf},function(data){
                  if(data.status == 0){
                    alert('预约成功');
                    getYyNumber();
                    $(".yuyue_board").addClass("hide");
                    $(".yuyue_tel .err3").hide();
                    $('#invite_code').val("");
                  }else{
                      alert(data.msg);
                       $(".yuyue_board").addClass("hide");
                       $('#invite_code').val("");
                  }
              }, 'json');
      //   }
      // }
    });
  //手机类型选择
$(".yuyue_tel .yuyue_form .xitong>span").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
});
//是否被邀请
$(".yuyue_tel .yuyue_form .inv_hav>span.rdo3").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
     if($(this).text()=="否"){
          $('#invite_code').val("");
      }
});
// nav列表
  $(".news-nav li").on("click", function() {
    var index = $(this).index();
    $(this).addClass("curr").siblings().removeClass("curr");
    $(".tab-cont ul").eq(index).removeClass("hide").siblings().addClass("hide");
  });
  getYyNumber();