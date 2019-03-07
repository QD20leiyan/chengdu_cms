var num_url = '/commonMethod/ajax-get-new-subscribes.html';//预约人数
var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var login_url1='/site/ajax-login.html';//登录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var out_url='/site/ajax-login-out.html';//注销登录
var yy_url='/site/ajax-yyue.html';//预约
var get_url='/site/ajax-receive.html';//领取礼包
var share_url='/site/ajax-share.html'//分享
var add_url='/site/ajax-address.html';//保存收货地址
var lottery_url='/site/ajax-draw.html';//抽奖
var gift_url='/site/ajax-code.html';//转盘礼包
var srf = $('meta[name="csrf-token"]').attr('content');
var is_yuyue=0;
var invite_code="";
var baseurl="";
var draw_num=1;
var prize={"1":{name:"预约礼包"}
  ,'2':{name:"50000人预约"}
  ,'3':{name:"100000人预约"}
  ,'4':{name:"200000人预约"}
  ,'5':{name:"500000人预约"}
  ,'6':{name:"分享1次"}
  ,'7':{name:"分享5次"}
  ,'8':{name:"分享10次"}
  ,'9':{name:"分享15次"}
  ,'10':{name:"邀请2人"}
  ,'11':{name:"邀请4人"}
  ,'12':{name:"邀请6人"}
  ,'13':{name:"1级材料宝箱",img:"l_gift8.png"}
  ,'14':{name:"2级材料宝箱",img:"l_gift5.png"}
  ,'15':{name:"钻石*588",img:"l_gift7.png"}
  ,'16':{name:"绑钻*88",img:"l_gift2.png"}
  ,'17':{name:"金币*888",img:"l_gift4.png"}
  ,'18':{name:"金币*88",img:"l_gift9.png"}
  ,'19':{name:"热狗玩偶",img:"l_gift6.png"}
  ,'20':{name:"腾讯视频会员卡",img:"l_gift3.png"}
  ,'21':{name:"再接再厉"}
}
var person = {
    isLogin: false,
    type: "ios",
    cms_csrf: $("meta[name='csrf-token']").attr("content")
  };
//获取url中的参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) return unescape(r[2]);
  return null;
}
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
  imgMarkIndex++;
  var imgUrl = "/site/captcha.html?refresh=" + imgMarkIndex;
  $.get(imgUrl, {}, function(data) {
    $("#getMarkBtn1 img").attr("src",data.url);
  }, 'json');
}
//图片验证码刷新
$("#captcha-img").click(function(){
  load_captcha();
});
//倒计时
function page_djs(ele, callback) {
  var time = 60;
  if(ele) {
    ele.html("重新发送(60s)");
  }
  djs_timer = setInterval(function() {
    time--;
    ele.html("重新发送("+(time<=0?0:time) + "s)");
    if(time == 0) {
      clearInterval(djs_timer);
      ele.html("获取验证码");
      if(callback) {
        callback();
      }
    }
  }, 1000);
}
//登录请求
function get_login(){
  var my_phone = $("#phone").val();
  var co_codenum1 =  $("#code").val();
  if(my_phone == "" || my_phone == undefined) {
      $('#phone-err').text("请输入手机号");
      $('#phone-err').css("visibility", "visible");
    return;
  }else if(my_phone.length != 11){
      $('#phone-err').text("请输入11位手机号");
      $('#phone-err').css("visibility", "visible");
    return;
  }
  if(co_codenum1 == "" || co_codenum1 == undefined) {
   $('#img-code-err').css("visibility", "visible");
   $('#img-code-err').text("请输入验证码");
    return;
  }
  $.ajax({
    'url':login_url1,
    'data':{'phone':my_phone,'yzm':co_codenum1,'invite_code':invite_code,"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        alert("登录成功！");
        $(".dialog-information").stop().fadeOut(400);
        $(".mask").stop().fadeOut(400);
        $(".is_login .b_denglu").removeClass("active");
        $(".is_login .a_denglu").addClass("active");
        person.isLogin = true;
        person.phone = data.msg.phone; //手机号
        person.me_invite_code = data.msg.me_invite_code; //邀请码
        person.invite_img = data.msg.invite_img; //分享二维码
        person.share_url = data.msg.share_url; //邀请地址
        person.invite_num = data.msg.invite_num; //邀请人数
        person.is_yuyue = data.msg.is_yuyue; //是否预约
        person.invite_count = data.msg.draw_num; //抽奖剩余次数
        person.gift_code_id = data.msg.gift_code_id; //已领取的礼包序号
        person.data = data.msg.data; //已领取的礼包序号
        person.today_draw_count = data.msg.today_draw_count;
        bShare.addEntry.url = person.share_url;
        today_draw_count = person.today_draw_count;
        $(".is_login .a_denglu .x_phone").html(person.phone);
        $(".dialog-prise h4").html(person.phone);
        $('.jj_number span').html(data.msg.invite_num||"0");
        $('.lt_num span').html(data.msg.draw_num||"0");
        invite_url=data.msg.share_url;
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.dialog-success a').text(data.msg.share_url);
        $('.dialog-success a').attr("href",data.msg.share_url);
        $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
        if(!data.msg.name&&!data.msg.address&&!data.msg.tel&&!data.code){
          $(".clickBtn2_add").removeClass("hidden");
          $(".clickBtn2_ch").addClass("hidden");
        }else{
          $(".s_put .name").val(data.msg.name);
          $(".s_put .youbian").val(data.msg.code);
          $(".p_put .s_phone").val(data.msg.tel);
          $(".s_dizhi").val(data.msg.address);
          $(".clickBtn2_add").addClass("hidden");
          $(".clickBtn2_ch").removeClass("hidden");
        }
        yqpeo();
        get_all_code();
        //礼包的ID对应的状态 例如： 1待领取  2已达标 3未达标 4 已领取（页面显示和礼包弹框）
       $("[data-id]").removeClass("active").removeClass("active2");
        $(".table_ul").empty();
        for(var i in data.msg.data){
          var dom=$("[data-id='"+i+"']");
          switch(data.msg.data[i]){
            case 1:
              dom.length>0&&dom.addClass("active2");
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span> <span class='get' data-key='"+i+"'>待领取</span></li>");
              break;
            case 2:
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span> <span class='get1' data-key='"+i+"'>已达标</span></li>");
              break;
            case 3:
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span><span class='get2' data-key='"+i+"'>未达标</span></li>");
              break;
            case 4:
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span> <span class='get3' data-key='"+i+"'>已领取</span></li>");
              dom.length>0&&dom.addClass("active");
              break;
          }
        }
      }else{
        alert(data.msg);
        load_captcha();
        $(".is_login .b_denglu").addClass("active");
        $(".is_login .a_denglu").removeClass("active");
      }
    }
  });
}
//预约人数
function textNum(num) {
            var textnum = num.toString();
            for(var i=0;i<textnum.length;i++){
                $('.c_number ul').find('li').eq(5-i).text(textnum.charAt(textnum.length - (i+1)));
            }
        }
//中奖名单滚动效果
function autoScroll(obj) {
  $(obj).animate({
    marginTop: "-69px"
  }, 1000, function() {
    $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
  });
}
//手机类型选择
$("#type p").click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});
//获取转盘中奖记录
function get_all_code(){
  $.ajax({
    'url':gift_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0&& data.msg.length>0){
        $('.lottery_list ul').empty();
        var result = '';
        for(var i = 0; i < data.msg.length; i++) {
          var src=baseurl+(prize[data.msg[i].gift_id+''].img||"");
          result +="<li><div class='lp_img'><img src='"+src+"'></div><div class='lp_yh_info'><p>恭喜<span>"+data.msg[i].phone+"</span></p><p>获得<span>"+data.msg[i].name+"</span></p></div></li>";
        }
        $('.lottery_list ul').append(result);
        //中奖名单--只有一个时复制一个
        if($(".lottery_list ul li").length>5){
          //$(".price_con ul").append($(".price_con ul li").clone(true));
          setInterval('autoScroll(".lottery_list ul")', 1500);
        }
      }else{
      }
    }
  });
}
function ordernum(){
  $.ajax({
    'url':num_url,
    'data':{'name':'rw_total',"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
       if(data.status == 0){
              // textNum(data.msg);
              // $('.lp_xianshi .lp').removeClass("active");
              // $('.lp_xianshi .lp').removeClass("active2");
              if(data.msg == 'null' || data.msg == null||data.msg ==""){
                $(".c_number ul li").text("0");
              }else{
                var num = data.msg+"";
                $(".c_number ul li").text("0");
                for(var i=0;i<num.length;i++){
                $('.c_number ul li').eq(5-i).text(num.substr(num.length-i-1,1));
                }
              }
              if(data.msg >= 50000){
                  $('.lp_xianshi .lp').removeClass("active");
                  $('.lp_xianshi .lp').removeClass("active2");
                  $(".lp_xianshi .lp1").addClass("active2");
              }
              if(data.msg >= 100000){
                  $('.lp_xianshi .lp').removeClass("active");
                  $('.lp_xianshi .lp').removeClass("active2");
                  $(".lp_xianshi .lp1").addClass("active2");
                  $(".lp_xianshi .lp2").addClass("active2");
              }
              if(data.msg >= 200000){
                 $('.lp_xianshi .lp').removeClass("active");
                  $('.lp_xianshi .lp').removeClass("active2");
                  $(".lp_xianshi .lp1").addClass("active2");
                  $(".lp_xianshi .lp2").addClass("active2");
                  $(".lp_xianshi .lp3").addClass("active2");
              }
              if(data.msg >= 500000){
                 $('.lp_xianshi .lp').removeClass("active");
                  $('.lp_xianshi .lp').removeClass("active2");
                  $(".lp_xianshi .lp1").addClass("active2");
                  $(".lp_xianshi .lp2").addClass("active2");
                  $(".lp_xianshi .lp3").addClass("active2");
                  $(".lp_xianshi .lp4").addClass("active2");
              }
       }
     }
  });
}
function info(){
   $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        person.isLogin = true;
        person.phone = data.msg.phone; //手机号
        person.me_invite_code = data.msg.me_invite_code; //邀请码
        person.invite_img = data.msg.invite_img; //分享二维码
        person.share_url = data.msg.share_url; //邀请地址
        person.invite_num = data.msg.invite_num; //邀请人数
        person.is_yuyue = data.msg.is_yuyue; //是否预约
        person.invite_count = data.msg.draw_num; //抽奖剩余次数
        person.gift_code_id = data.msg.gift_code_id; //已领取的礼包序号
        person.data = data.msg.data; //已领取的礼包序号
        person.today_draw_count = data.msg.today_draw_count;
        bShare.addEntry.url = person.share_url;
        today_draw_count = person.today_draw_count;
        is_yuyue=data.msg.is_yuyue;
        $(".is_login .b_denglu").removeClass("active");
        $(".is_login .a_denglu").addClass("active");
        $(".x_phone").html(person.phone);
        $('.jj_number span').html(data.msg.invite_num||"0");
        $('.lt_num span').html(data.msg.draw_num||"0");
        invite_url=data.msg.share_url;
        $('.user_phone').text(data.msg.phone);
        $(".dialog-prise h4").html(person.phone);
        $('.count_all').text(data.msg.draw_count||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.dialog-success a').text(data.msg.share_url);
        $('.dialog-success a').attr("href",data.msg.share_url);
        $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
        if(!data.msg.name&&!data.msg.address&&!data.msg.tel&&!data.code){
          $(".clickBtn2_add").removeClass("hidden");
          $(".clickBtn2_ch").addClass("hidden");
        }else{
          $(".s_put .name").val(data.msg.name);
          $(".s_put .youbian").val(data.msg.code);
          $(".p_put .s_phone").val(data.msg.tel);
          $(".s_dizhi").val(data.msg.address);
          $(".clickBtn2_add").addClass("hidden");
          $(".clickBtn2_ch").removeClass("hidden");
        }
        yqpeo();
        //礼包的ID对应的状态 例如： 1待领取  2已达标 3未达标 4 已领取（页面显示和礼包弹框）
        $("[data-id]").removeClass("active").removeClass("active2");
        $(".table_ul").empty();
        console.log(data.msg.data);
        for(var i in data.msg.data){
          var dom=$("[data-id='"+i+"']");
          switch(data.msg.data[i]){
            case 1:
              dom.length>0&&dom.addClass("active2");
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span> <span class='get' data-key='"+i+"'>待领取</span></li>");
              break;
            case 2:
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span> <span class='get1' data-key='"+i+"'>已达标</span></li>");
              break;
            case 3:
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span><span class='get2' data-key='"+i+"'>未达标</span></li>");
              break;
            case 4:
              $(".table_ul").append("<li><span>"+(prize[i].name||"")+"</span> <span class='get3' data-key='"+i+"'>已领取</span></li>");
              dom.length>0&&dom.addClass("active");
              break;
          }
        }
      }else{
      }
    }
  });
}
//邀请人数的填充
function yqpeo(){
  var friend=$('.jj_number span').text();
  if(friend>0){
    $(".yq_peo1").addClass("active");
  }if(friend>1){
    $(".yq_peo2").addClass("active");
    $(".jj_gift li.jj_gift1").addClass("active2");
  }if(friend>2){
    $(".yq_peo3").addClass("active");
  }if(friend>3){
    $(".yq_peo4").addClass("active");
    $(".jj_gift li.jj_gift2").addClass("active2");
  }if(friend>4){
    $(".yq_peo5").addClass("active");
  }if(friend>5){
    $(".yq_peo6").addClass("active");
    $(".jj_gift li.jj_gift3").addClass("active2");
  }
}
//初始化
$(function(){
  //获取分享链接中的邀请码
  var params = {};
  baseurl=$(".kv").data("src");
    //获取分享链接中的邀请码
  invite_code=getUrlParam('invite_code');
  console.log(invite_code);
  var invite_url='';
  //判断用户是否登录
  info();
  ordernum();
  setInterval(function() {
    ordernum();
  }, 60000);
  get_all_code();
  console.log(person.invite_num);
  console.log(person.invite_count);
  var clickNumber2 = 0;
  $(".f_down").click(function(){
    if(clickNumber2 % 2 == 0){
      $(".down_ewm,.float.active .down_ewm p").addClass("hidden");
        $(".float").css("height","328px");
       $(".float").css("top","25%");
    }else {
      $(".down_ewm,.float.active .down_ewm p").removeClass("hidden");
        $(".float").css("height","471px");
        $(".float").css("top","20%");
    }
    clickNumber2++;
  })
});
//弹框关闭
$(".mask .close").click(function(){
        $(this).parent().fadeOut(400);
        $(".mask").fadeOut(400);
      });
//登录弹框显示
$(".login_start").click(function(){
  $(".dialog-information").stop().fadeIn(400);
  $(".mask").stop().fadeIn(400);
});
//地址填写请求
$(".address_btn").click(function(){
           $(".dialog").stop().fadeOut(400);
           $(".dialog-address").stop().fadeIn(400);
           $(".mask").stop().fadeIn(400);
})

$(".clickBtn2").click(function(){
  var my_name = $(".s_put .name").val();
  var my_yb=$('.s_put .youbian').val();
  var my_tel = $(".p_put .s_phone").val();
  var my_add=$('.s_dizhi').val();
  if(!my_name) {
    alert( "收件人姓名不能为空哦1");
    return;
  }
  if(!my_yb) {
    alert( "收件人邮编不能为空哦2");
    return;
  }
  if(!my_add) {
    alert( "收件人地址不能为空哦3");
    return;
  }
  if(!my_tel) {
    alert( "手机号码不能为空哦4");
    return;
  }else if(my_tel.length != 11){
    alert("手机号码不正确哦5");
    return;
  }
  $.ajax({
    'url':add_url,
    'data':{'name':my_name,'code':my_yb,'address':my_add,'tel':my_tel,"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        alert("保存成功");
        $(".dialog").stop().fadeOut(400);
        $(".mask").stop().fadeOut(400);
         $(".s_put .name").val(my_name);
        $('.s_put .youbian').val(my_yb);
        $(".s_put .s_phone").val(my_tel);
        $('.s_put .s_dizhi').val(my_add);
      }else{
        alert(data.msg);
      }
    }
  });
});
//登录获取验证码
$("#getMarkBtn").click(function(){
  $('.err').css("visibility", "hidden");
  var my_phone = $("#phone").val();
  var captcha =  $("#img-code").val();
  if(my_phone == "" || my_phone == undefined) {
    $('#phone-err').text("请输入手机号");
      $('#phone-err').css("visibility", "visible");
    return;
  }else if(my_phone.length != 11){
    $('#phone-err').text("请输入11位手机号");
      $('#phone-err').css("visibility", "visible");
    return;
  }
  if(captcha == "" || captcha == undefined) {
    $('#img-code-err').css("visibility", "visible");
    return;
  }

  $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
    if(data.status == 0){
      $("#getMarkBtn").css("pointer-events","none");
      page_djs($("#getMarkBtn"),function(){
        $("#getMarkBtn").css("pointer-events","auto");
      });
      $('.err').css("visibility", "hidden");
    }else{
      alert(data.msg);
      load_captcha();
    }
  }, 'json');
});
//点击登陆
$(".dialog-information .information-btn").click(function(){
  get_login();
});
//预约
$(".yy,.yy_btn").click(function(){
  if($(".b_denglu").hasClass("active")){
    //登录之前
    console.log(true);
    $(".dialog-information").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
  }else{
    //登录之后
    $(".mask").stop().fadeIn(400);
    if(is_yuyue==1){
      $(".dialog").stop().fadeOut(400);
      $(".dialog-success").stop().fadeIn(400);
      $(".dialog-success h3").html("您已预约");
      $('.lt_num span').html(person);
    }else{
      $(".dialog").stop().fadeOut(400);
      $(".dialog-type").stop().fadeIn(400);
    }
  }
});
//立即预约请求
$(".information-btn2").click(function(){
  var type=$("#type p.active").attr("data-index");
  $.post(yy_url,{"type":type,"cms_csrf":srf ,'invite_code':invite_code},function(data){
    if(data.status == 0){
      is_yuyue=1;
      $(".dialog").stop().fadeOut(400);
      $(".dialog-yy-success").stop().fadeIn(400);
      $(".mask").stop().fadeIn(400);
      $('.lt_num span').html(1);
      ordernum();
      info();
    }else{
           $(".dialog").stop().fadeOut(400);
           $(".dialog-jqqd").stop().fadeIn(400);
           $(".mask").stop().fadeIn(400);
          $(".dialog-jqqd h3").html("提示");
          $(".dialog-jqqd p").html(data.msg);
    }
  }, 'json');
});
//分享
$(".share_btn").click(function(){
  if($(".b_denglu").hasClass("active")){
    $(".dialog-information").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
  }else{
    $(".dialog").stop().fadeOut(400);
    $(".dialog-yue").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
    $.ajax({
      'url':share_url,
      'data':{},
      'type':'GET',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){
           info();
        }else{
          alert(data.msg);
        }
      }
    });
  }
});
//邀请好友弹框显示
$(".invite_btn,.user_rs li").click(function(){
  if($(".b_denglu").hasClass("active")){
    $(".dialog-information").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
  }else{
    $(".dialog").stop().fadeOut(400);
    $(".dialog-success").stop().fadeIn(400);
    $(".dialog-success h3").html("邀请好友");
    $(".mask").stop().fadeIn(400);
  }
});
//我的礼包
$(".gift_bag,.look_btn").click(function(){
  if($(".b_denglu").hasClass("active")){
    $(".dialog-information").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
  }else{
    $(".dialog").stop().fadeOut(400);
    $(".dialog-prise").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
    info();
  }
});
$(".co_tips_giftbtn").click(function(){
    $(".co_tips_ward").addClass("hidden");
    $(".co_tips_record").removeClass("hidden");
});
//礼包领取
$(".linqu2").click(function(){
  if($(this).parent().parent().hasClass("active2")){
    var that=$(this).parent().parent();
    var type=that.parent().data("type");
    var key=that.data("id");
    $.ajax({
      'url':get_url,
      'data':{'key': key,'type': type,"cms_csrf":srf },
      'type':'POST',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){
          that.removeClass("active2").addClass("active");
          $(".dialog-prise .huadong [data-key="+key+"]").text("已领取");
          $(".dialog").stop().fadeOut(400);
          $(".dialog-jqqd").stop().fadeIn(400);
          $(".mask").stop().fadeIn(400);
          $(".dialog-jqqd h3").html("恭喜您");
          $(".dialog-jqqd p").html("礼包领取成功");
        }else{
          alert(data.msg);
        }
      }
    });
  }
});
//礼包领取jj_gift
$(".zhaohu li,.jj_gift li").click(function(){
  if($(this).hasClass("active2")){
    var type=$(this).parent().data("type");
    var key=$(this).data("id");
    console.log(66);
    $.ajax({
      'url':get_url,
      'data':{'key': key,'type': type,"cms_csrf":srf },
      'type':'POST',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){
          $(this).removeClass("active2").addClass("active");
          $(".dialog-prise .huadong [data-key="+key+"]").text("已领取");
          $(".dialog").stop().fadeOut(400);
          $(".dialog-jqqd").stop().fadeIn(400);
          $(".mask").stop().fadeIn(400);
          $(".dialog-jqqd h3").html("恭喜您");
          $(".dialog-jqqd p").html("礼包领取成功");
          info();
        }else{
          alert(data.msg);
        }
      }
    });
  }else{}
});
//手机类型选择
$(".rdo").click(function(){
  $(this).addClass("on").siblings().removeClass("on");
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
        $(".is_login .a_denglu").removeClass("active");
        $(".is_login .b_denglu").addClass("active");
        $('.x_phone').text("");
        $('.lp_xianshi .lp').removeClass("active");
        $('.lp_xianshi .lp').removeClass("active2");
        $(".zhaohu li").removeClass("active");
        $(".zhaohu li").removeClass("active2");
        $(".user_rs li").removeClass("active");
        $(".jj_gift li").removeClass("active");
        $(".jj_gift li").removeClass("active2");
        $('.jj_number span').text("0");
        $(".lt_num span").text("0");
        $(".invite_href").attr("href","");
        $(".invite_href").html("");
        $(".copy_link").attr("data-clipboard-text","");
        is_yuyue=0;
        clearInterval(djs_timer);
        //礼包状态恢复
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
$(function(){
  //微信二维码
  $(".weixin_btn").click(function(){
    $(".wechat").removeClass("hidden");
  });
  $(".wechat").click(function(){
    $(".wechat").addClass("hidden");
  });
  //抽奖
var rotateTimeOut = function (){
  $('.wheelcanvas').rotate({
    angle:0,
    animateTo:2196,
    duration:8000,
    callback:function (){
      alert('网络超时，请检查您的网络设置！');
    }
  });
};
var rotateconf={
  bRotate:false,
  gifts:["金币*88","再接再厉","迪士尼旅游套餐","绑钻*88","腾讯视频会员卡","金币*888","2级材料宝箱","热狗玩偶","钻石*588","1级材料宝箱"]
}
  //旋转转盘 item:奖品位置; txt：提示语,code是礼包码;
var rotateFn = function (item){
  var angles = item * (360 /10);
  console.log(angles);
  $('.wheelcanvas').stopRotate();
  $('.wheelcanvas').rotate({
    angle:0,
    animateTo:angles+1800,
    duration:8000,
    callback:function (){
      if(item==1){
        $(".dialog").stop().fadeOut(400);
        $(".dialog-jqqd").stop().fadeIn(400);
        $(".mask").stop().fadeIn(400);
        $(".dialog-jqqd h3").html("再接再厉");
        $(".dialog-jqqd p").html("没事~下一个大奖就是你的！");
      }else{
        $(".mask").stop().fadeIn(400);
        $(".dialog").stop().fadeOut(400);
        $(".dialog-materialGift").stop().fadeIn(400);
      }
      rotateconf.bRotate = !rotateconf.bRotate;
    }
  });
};
  $('.pointer').click(function (){
  if($(".b_denglu").hasClass("active")){
    $(".dialog-information").stop().fadeIn(400);
    $(".mask").stop().fadeIn(400);
  }else{
      if($(".lt_num span").text()>0){
    if(rotateconf.bRotate) return;
    rotateconf.bRotate = !rotateconf.bRotate;
    rotateTimeOut();
//            //模拟ajax
//            setTimeout(function(){
//                //获取随机数模拟抽奖结果(奖品个数范围内)
//                var item =2;
//                rotateFn(item, rotateconf.gifts[item],"ABDE23JGGEI");
//            },1000);
    $.ajax({
      'url':lottery_url,
      'data':{},
      'type':'POST',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){
          $(".lt_num span").text(data.draw_num||"0");
          $(".address_btn").removeClass("active");
          $(".look_btn").addClass("active");
          var item=0;
          if(data.gift_id==13){//1级材料宝箱
            item=3;
            $(".look_txt").text("请到我的礼包中查看！");
          }else if(data.gift_id==14){//2级材料宝箱
            item=6;
            $(".look_txt").text("请到我的礼包中查看！");
          }else if(data.gift_id==15){//钻石*588
            item=4;
            $(".look_txt").text("请到我的礼包中查看！");
          }else if(data.gift_id==16){//绑钻*88
            item=9;
            $(".look_txt").text("请到我的礼包中查看！");
          }else if(data.gift_id==17){//金币*888
            item=7;
            $(".look_txt").text("请到我的礼包中查看！");
          }else if(data.gift_id==18){//金币*88
            item=2;
            $(".look_txt").text("请到我的礼包中查看！");
          }else if(data.gift_id==19){//热狗玩偶
            item=5;
            $(".look_txt").text("请完善个人收件地址，我们将在7个工作日内寄出。");
            $(".look_btn").removeClass("hidden");
            $(".address_btn").addClass("hidden");
          }else if(data.gift_id==20){//腾讯视频会员卡
            item=8;
            $(".look_txt").text("我们将在7个工作日内以短信的方式发送兑换码。");
          } else if(data.gift_id==21){//再接再厉
            item=1;
          }
          $(".giftImage").attr("src",baseurl+prize[data.gift_id].img)
          $(".gift_name_ico").text(prize[data.gift_id].name);
          rotateFn(item);
          info();
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
     $(".dialog").stop().fadeOut(400);
           $(".dialog-jqqd").stop().fadeIn(400);
           $(".mask").stop().fadeIn(400);
          $(".dialog-jqqd h3").html("糟糕了");
          $(".dialog-jqqd p").html("抽奖次数没有了哦！");
  }
  } 
});
});






