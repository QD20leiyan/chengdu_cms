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
//登录请求
function get_login(){
  var my_phone = $(".co_username").val();
  var co_codenum1 =  $(".co_codenum1").val();
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
        alert("登录成功");
        $(".co_tips_login1").addClass("hidden");
        $(".co_before").addClass("hidden");
        $(".co_after").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_num||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.my_url').text(data.msg.share_url);
        $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
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
        yqpeo();
        //礼包的ID对应的状态 例如： 1待领取  2已达标 3未达标 4 已领取（页面显示和礼包弹框）
        $("[data-id]").removeClass("can_get").removeClass("al_get");
        $(".co_tips_record .co_form").empty();
        for(var i in data.msg.data){
          var dom=$("[data-id='"+i+"']");
          switch(data.msg.data[i]){
            case 1:
              dom.length>0&&dom.addClass("can_get");
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>待领取</i></p>");
              break;
            case 2:
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>已达标</i></p>");
              break;
            case 3:
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>未达标</i></p>");
              break;
            case 4:
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>已领取</i></p>");
              dom.length>0&&dom.addClass("al_get");
              break;
          }
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
//预约人数
function ordernum() {
  $.ajax({
    'url':num_url,
    'data':{'name': 'rw_total',"cms_csrf":srf },
    'type':'POST',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        if(data.msg == 'null' || data.msg == null||data.msg =="") {
            $(".i_main .order_box .l_orderbox .num>span").text("0");
        }else{
          var num = data.msg+"";
          $(".num>span").text("0");
          for(var i=0;i<num.length;i++){
            $('.num>span').eq(5-i).text(num.substr(num.length-i-1,1));
          }
        }
      }else{}
    }
  });
}
//邀请人数的填充
function yqpeo(){
  var friend=$('.friend').text();
  if(friend>0){
    $(".yq_peo1").addClass("active");
  }if(friend>1){
    $(".yq_peo2").addClass("active");
  }if(friend>2){
    $(".yq_peo3").addClass("active");
  }if(friend>3){
    $(".yq_peo4").addClass("active");
  }if(friend>4){
    $(".yq_peo5").addClass("active");
  }if(friend>5){
    $(".yq_peo6").addClass("active");
  }
}
//中奖名单滚动效果
function autoScroll(obj) {
  $(obj).animate({
    marginTop: "-2.625rem"
  }, 1000, function() {
    $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
  });
}
//获取转盘中奖记录
function get_all_code(){
  $.ajax({
    'url':gift_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0&& data.msg.length>0){
        $('.price_con ul').empty();
        var result = '';
        for(var i = 0; i < data.msg.length; i++) {
          var src=baseurl+(prize[data.msg[i].gift_id+''].img||"");
          result +="<li><span class='gift_img'><img src='"+src+"'></span><span class='ts'>恭喜获得</span><span class='info'><i>"+data.msg[i].phone+"</i><i>"+data.msg[i].name+"</i></span></li>";
        }
        $('.price_con ul').append(result);
        //中奖名单--只有一个时复制一个
        if($(".price_con ul li").length>3){
          //$(".price_con ul").append($(".price_con ul li").clone(true));
          setInterval('autoScroll(".price_con ul")', 1500);
        }
      }else{
        $(".price_no").removeClass("hidden");
      }
    }
  });
}
//判断用户是否登录
function is_login(){
  $.ajax({
    'url':login_url,
    'data':{},
    'type':'GET',
    'dataType':'Json',
    success:function(data){
      if(data.status==0){
        $(".co_tips_login1").addClass("hidden");
        $(".co_before").addClass("hidden");
        $(".co_after").removeClass("hidden");
        $('.co_username').val("");
        $('.co_codenum1').val("");
        $('.user_phone').text(data.msg.phone);
        $('.count_all').text(data.msg.draw_num||"0");
        $('.friend').text(data.msg.invite_num||"0");
        $('.my_url').text(data.msg.share_url);
        $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
        is_yuyue=data.msg.is_yuyue;
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
        yqpeo();
        //礼包的ID对应的状态 例如： 1待领取  2已达标 3未达标 4 已领取（页面显示和礼包弹框）
        $("[data-id]").removeClass("can_get").removeClass("al_get");
        $(".co_tips_record .co_form").empty();
        for(var i in data.msg.data){
          var dom=$("[data-id='"+i+"']");
          switch(data.msg.data[i]){
            case 1:
              dom.length>0&&dom.addClass("can_get");
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>待领取</i></p>");
              break;
            case 2:
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>已达标</i></p>");
              break;
            case 3:
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>未达标</i></p>");
              break;
            case 4:
              $(".co_tips_record .co_form").append("<p><span>"+(prize[i].name||"")+"</span> <i data-key='"+i+"'>已领取</i></p>");
              dom.length>0&&dom.addClass("al_get");
              break;
          }
        }
      }else{}
    }
  });
}
//canvas视频
function childFun(){
  var childImg=document.createElement("img");
  var childDom=document.getElementById("child");
  childImg.src=$(childDom).attr("data-src");
  var child= childDom.getContext("2d");
  var x = 0;
  function drawChild(){
    x+=640;
    if(childImg.width!=0&&x>=childImg.width){
      x = 0;
//                setTimeout(function(){
      $(".canvasbox").hide();
      $(".i_main .top .slogan *").show();
//                },200);
      return;
    }
    child.clearRect(0,0,childDom.width,childDom.height);
    child.beginPath();
    child.save();
    //9个参数
    //1元素节点
    //2切割的起始X坐标
    //3切割的起始的Y坐标
    //4切割宽度
    //5切割高度
    //6切割好的图片的定位X坐标
    //7切割好的图片的定位Y坐标
    //8显示切割图片的宽度
    //9显示切割图片的高度
    child.drawImage(childImg,x,0,640,1032,0,0,childDom.width,childDom.height);
    child.closePath();
    child.stroke();
    child.restore();
    setTimeout(drawChild,200);
  }
  var t=setInterval(function(){
    if(childImg.complete){
      $(".loading").addClass("hidden");
      $("body,html").addClass("no_auto");
      clearInterval(t);
      drawChild();
    }
  },100);
}
//初始化
$(function(){
  childFun();
  //获取图片基础地址
  baseurl=$(".i_main").data("src");
  //获取分享链接中的邀请码
  invite_code=getUrlParam('invite_code');
  console.log(invite_code);
  //swiper
  var swiper02 = new Swiper('.swiper-container2',{
    pagination: '.swiper-pagination2',
    paginationClickable: true,
    effect : 'coverflow',
    slidesPerView: 5,
    centeredSlides: true,
    loop:true,
    prevButton:'.swiper-button-prev2',
    nextButton:'.swiper-button-next2',
    coverflow: {
      rotate:0,
      stretch:-30,
      depth:500,
      modifier:1,
      slideShadows : false
    },
    onTouchEnd:function(swiper){
      $(".txt-img>img").addClass("hidden").eq(swiper.realIndex).removeClass("hidden");
    },
    onSlideChangeEnd: function (swiper) {
      $(".txt-img>img").addClass("hidden").eq(swiper.realIndex).removeClass("hidden");
    }
  });
  //判断用户是否登录
  is_login();
  ordernum();
  setInterval(function() {
    ordernum();
  }, 60000);
  get_all_code();
});
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_tips_login1 .co_input input').val("");
  $(".co_error").removeClass("co_err_show");
});
$(".co_tips_surebtn").click(function(){
  $(".co_tips").addClass("hidden");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
  $(".co_tips_login1").removeClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
  var my_phone = $(this).closest(".co_tips_login1").find(".co_username").val();
  var captcha =  $(this).closest(".co_tips_login1").find(".captcha").val();
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
$(".co_tips_login1 .co_tips_btn").click(function(){
  get_login();
});
//预约
$(".order").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_login1").removeClass("hidden");
  }else{
    //登录之后
    if(is_yuyue==1){
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .co_tips_title").text("您已预约");
      $(".co_tips_success .success").html("您已经预约过了，请勿重复预约");
    }else{
      $(".co_tips_login1").addClass("hidden");
      $(".co_tips_type").removeClass("hidden");
    }
  }
});
//手机类型选择
$(".rdo").click(function(){
  $(this).addClass("on").siblings().removeClass("on");
});
//立即预约请求
$(".co_tips_type .co_tips_yybtn").click(function(){
  var type_id=$(".rdo.on").attr("data-id");
  if(type_id==1){
    var type="ios";
  }else if(type_id==2){
    var type="android";
  }
  $.post(yy_url,{ "type":type,"cms_csrf":srf ,'invite_code':invite_code},function(data){
    if(data.status == 0){
      is_yuyue=1;
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .co_tips_title").text("恭喜您！您已预约");
      $(".co_tips_success .success").html("获得专属礼包*1和抽奖机会*1 可在<span class='check_ward'>“我的礼包”</span>处查看");
      is_login();
      ordernum();
    }else{
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .co_tips_title").text("提示");
      $(".co_tips_success .success").html(data.msg);
    }
  }, 'json');
});
//我的礼包
$(".check_ward").click(function(){
  if($(".co_after.hidden").length>0){
    $(".co_tips_login1").removeClass("hidden");
  }else{
    $(".co_tips_record").removeClass("hidden");
  }
});
$(".co_tips_giftbtn").click(function(){
    $(".co_tips_ward").addClass("hidden");
    $(".co_tips_record").removeClass("hidden");
});
//分享
$(".share").click(function(){
  if($(".co_after.hidden").length>0){
    $(".co_tips_login1").removeClass("hidden");
  }else{
    $(".co_tips_share").removeClass("hidden");
    $.ajax({
      'url':share_url,
      'data':{},
      'type':'GET',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){

        }else{}
      }
    });
  }
});
//邀请好友弹框显示
$(".yq,.i_main .yq_box .yq_peo>span i").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_login1").removeClass("hidden");
  }else{
    $(".co_tips_yq").removeClass("hidden");
  }
});
$(".yq_peo span").removeClass("active");
//礼包领取
$(".l_get").click(function(){
  if($(this).parent().hasClass("can_get")){
    var that=$(this).parent();
    var type=that.parent().data("type");
    var key=that.data("id");
    $.ajax({
      'url':get_url,
      'data':{'key': key,'type': type,"cms_csrf":srf },
      'type':'POST',
      'dataType':'Json',
      success:function(data){
        if(data.status==0){
          that.removeClass("can_get").addClass("al_get");
          $(".co_tips_record .co_form [data-key="+key+"]").text("已领取");
          $(".co_tips_success").removeClass("hidden");
          $(".co_tips_success .co_tips_title").text("恭喜您");
          $(".co_tips_success .success").html("礼包领取成功");
        }else{
          alert(data.msg);
        }
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
        $(".co_after").addClass("hidden");
        $('.user_phone').text("");
        $('.count_all,.friend').text("0");
        $('.my_url').text("");
        $(".copy_link").attr("data-clipboard-text","");
        is_yuyue=0;
        clearInterval(djs_timer);
        $(".co_codebtn1").html("获取验证码");
        $(".co_codebtn1").css("pointer-events","auto");
        $(".i_main .yq_box .yq_peo>span").removeClass("active");
        //礼包状态恢复
        $("[data-id]").removeClass("can_get").removeClass("al_get");
        //邀请状态恢复
        $(".yq_peo span").removeClass("active");
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
//地址填写请求
$(".co_tips_addr .co_tips_surebtn").click(function(){
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
        $(".co_tips_success").removeClass("hidden");
        $(".co_tips_success .co_tips_title").text("再接再厉");
        $(" .co_tips.co_tips_success .success").text("没事~下一个大奖就是你的！");
      }else{
        $(".co_tips_ward").removeClass("hidden");
      }
      rotateconf.bRotate = !rotateconf.bRotate;
    }
  });
};
$('.pointer').click(function (){
  if($(".count_all").text()>0){
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
          $(".count_all").text(data.draw_num)
          $(".l_type1").addClass("hidden");
          $(".l_type2").removeClass("hidden");
          var item=0;
          if(data.gift_id==13){//1级材料宝箱
            item=3;
            $(".co_tips.co_tips_ward .ts").text("请到我的礼包中查看！");
          }else if(data.gift_id==14){//2级材料宝箱
            item=6;
            $(".co_tips.co_tips_ward .ts").text("请到我的礼包中查看！");
          }else if(data.gift_id==15){//钻石*588
            item=4;
            $(".co_tips.co_tips_ward .ts").text("请到我的礼包中查看！");
          }else if(data.gift_id==16){//绑钻*88
            item=9;
            $(".co_tips.co_tips_ward .ts").text("请到我的礼包中查看！");
          }else if(data.gift_id==17){//金币*888
            item=7;
            $(".co_tips.co_tips_ward .ts").text("请到我的礼包中查看！");
          }else if(data.gift_id==18){//金币*88
            item=2;
            $(".co_tips.co_tips_ward .ts").text("请到我的礼包中查看！");
          }else if(data.gift_id==19){//热狗玩偶
            item=5;
            $(".co_tips.co_tips_ward .ts").text("请完善个人收件地址，我们将在7个工作日内寄出。");
            $(".l_type1").removeClass("hidden");
            $(".l_type2").addClass("hidden");
          }else if(data.gift_id==20){//腾讯视频会员卡
            item=8;
            $(".co_tips.co_tips_ward .ts").text("我们将在7个工作日内以短信的方式发送兑换码。");
          } else if(data.gift_id==21){//再接再厉
            item=1;
          }
          $(".co_tips.co_tips_ward .show_gift>span img").attr("src",baseurl+prize[data.gift_id].img)
          $(".co_tips.co_tips_ward .show_gift>i").text(prize[data.gift_id].name);
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
    $(".co_tips_success").removeClass("hidden");
    $(".co_tips_success .co_tips_title").text("糟糕了");
    $(" .co_tips.co_tips_success .success").text("抽奖次数没有了哦！");
  }
});