var all_url='/site/ajax-lottery-log.html'; //获取所有用户中奖记录
var me_url='/site/ajax-lottery-me-log.html';//获取当前用户中奖记录
var login_url='/site/ajax-get-user.html';//判断用户是否登录
var out_url='/site/ajax-login-out.html';//注销登录
var verify_url='/site/ajax-login-verify.html';//登录发送验证码
var login_url1='/site/ajax-login.html';//登录
var yy_url='/site/ajax-yuyue.html';//预约
var lottery_url='/site/ajax-lottery.html';//抽奖
var yynum_url='/site/ajax-get-num.html';//预约人数监控
var add_url='/site/ajax-save-address.html';//保存收货地址
var srf = $('meta[name="csrf-token"]').attr('content');
var  num_url='/commonMethod/ajax-get-subscribes.html';//预约人数
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
//拉取预约人数
function ajaxInit() {
    $.post(num_url,{'name':'zjzg_total'},function(data) {
        if(data.msg == 'null' || data.msg == null){
            data.msg = 0;
        }
        // newNumber =parseInt(data.msg);
        var str = String(data.msg);
        var newStr = "";
        var count = 0;
        if(str.indexOf(".") == -1) {
            for(var i = str.length - 1; i >= 0; i--) {
                if(count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr; //自动补小数点后两位      
        } else {
            for(var i = str.indexOf(".") - 1; i >= 0; i--) {
                if(count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来          
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        }
        $(".yy_num span").text(str);
    }, "json");
};
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
  ////滚动条初始化
  //$(".co_tips.co_tips_detail .co_con .co_form").mCustomScrollbar({
  //  axis:"y"
  //});
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
        $('.user_phone').text(data.phone);
        $('.count_all').text(data.count||"0");
        $('.friend').text(data.invite_num||"0");
        $('.yq_num').text(data.me_invite_code);
        $('.my_url').text(data.share_url);
        $(".co_tips_yq .copy").attr("data-clipboard-text",data.share_url);
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
  ////初始获取预约人数
  //getyynum();
  ////每隔30s获取预约人数
  //setInterval(function() {
  //  getyynum();
  //}, 30000);
});
//弹框关闭
$(".co_tips_close").click(function(){
  $(".co_tips").addClass("hidden");
  $('.co_input input').val("");
  $('.co_input textarea').val("");
  $(".co_error").removeClass("co_err_show");
  $("body,html").removeClass("no_auto");
});
$(".co_tips_success .co_tips_surebtn").click(function(){
  $(".co_tips").addClass("hidden");
});
//地址弹框显示
$(".co_tips_addbtn,.co_tips_newbtn").click(function(){
  $(".co_tips").addClass("hidden");
  $(".co_tips_addr").removeClass("hidden");
  $("body,html").addClass("no_auto");
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
          $(".co_tips_login").addClass("hidden");
          $("body,html").removeClass("no_auto");
          //$(".co_tips_success").removeClass("hidden");
          //$(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
        }else{
          $(".co_tips_login").addClass("hidden");
          $("body,html").removeClass("no_auto");
          $(".co_tips_type").removeClass("hidden");
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
//游戏预约弹框显示
$(".order_btn1").click(function(){
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
        $('.user_phone').text("");
        $('.count_all,.count,.help,.friend').text("0");
        $('.yq_num').text("");
        $('.my_url').text("");
        $(".ward1,.ward2,.ward3").addClass("gray");
      }else{
        alert(data.msg);
      }
    }
  });
});
//中奖名单滚动效果
function autoScroll(obj) {
  $(obj).animate({
    marginTop: "-3rem"
  }, 1000, function() {
    $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
  });
}
//返回顶部
$(".go_top").click(function(){
	var a;
	function back(){
		a=setInterval(go_top,5);
	}
	function go_top(){
		if(window.scrollY<=0){
			clearInterval(a);
		}else{
			scrollTo(0,window.scrollY-15);
		}
	}
	back();
});
//预约人数分段
function numFormat(n){
	n=n+"";
	if(n.length>3){

		return numFormat(n.substring(0, n.length-3))+","+ n.substr(n.length-3,3);
	}else{
		return n;
	}
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}
//预约人数获取
function getyynum(){
	$.ajax({
		'url':yynum_url,
		'data':{},
		'type':'GET',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				$(".num .num_txt").text(numFormat(data.msg));
                $(".co_tips_yy .yy_num").text(numFormat(data.msg));
                initActive(data.msg);
			}else{

			}
		}
	});
}
//预约框进度条显示
function initActive(num){
  num=parseInt(num)>0?parseInt(num):0;//防止小于0
  if(num>=50000){
    $(".co_tips_yy .yy_progress_box .row1").addClass("active");
  }if(num>=100000){
    $(".co_tips_yy .yy_progress_box .row2").addClass("active");
  }if(num>=180000){
    $(".co_tips_yy .yy_progress_box .row3").addClass("active");
  }if(num>=380000){
    $(".co_tips_yy .yy_progress_box .row4").addClass("active");
  }if(num>=680000){
    $(".co_tips_yy .yy_progress_box .row5").addClass("active");
  }
}
//立即预约弹框显示
$(".co_tips_yy .co_tips_yybtn").click(function(){
  if($(".co_after.hidden").length>0){
    //登录之前
    $(".co_tips_yy").addClass("hidden");
    $(".co_tips_login").removeClass("hidden");
    $("body,html").addClass("no_auto");
    //$(".co_tips_login .co_tips_loginbtn").addClass("hidden");
    //$(".co_tips_login .co_tips_yybtn").removeClass("hidden");
  }else{
    //登录之后
    $(".co_tips_yy").addClass("hidden");
    if(is_yuyue==1){
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
    }else{
      $(".co_tips_type").removeClass("hidden");
    }
  }
});
//预约登录请求
$(".co_tips_login .co_tips_yybtn").click(function(){
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
        $(".co_before").addClass("hidden");
        $(".co_after,.ward_yq").removeClass("hidden");
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
          $(".co_tips_login").addClass("hidden");
          $("body,html").removeClass("no_auto");
          $(".co_tips_success").removeClass("hidden");
          $(".co_tips_success .success").text("您已经预约过了，请勿重复预约");
        }else{
          $(".co_tips_login").addClass("hidden");
          $("body,html").removeClass("no_auto");
          $(".co_tips_type").removeClass("hidden");
        }
      }else{
        load_captcha();
        showErr(2, data.msg);
        //alert(data.msg);
      }
    }
  });
});
//手机类型选择
$(".rdo").click(function(){
  $(this).addClass("on").siblings().removeClass("on");
});
//立即预约请求
$(".co_tips_type .co_tips_yybtn").click(function(){
  var type_id=$(".rdo.on").attr("data-id");
  var invite_code=getQueryString('invite_code');
  if(type_id==1){
    var type="ios";
  }else if(type_id==2){
    var type="android";
  }
  $.post(yy_url,{ "type":type,"cms_csrf":srf ,'invite':invite_code},function(data){
    if(data.status == 0){
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .success").text("预约成功");
    }else{
      $(".co_tips_type").addClass("hidden");
      $(".co_tips_success").removeClass("hidden");
      $(".co_tips_success .success").text(data.msg);
    }
  }, 'json');
});
//奖池机会援助计算
function count_num(invite_num,invite_count,lottery_node_1){
  //1奖池
  if(invite_num>=1){
    if(lottery_node_1==1){
      //1奖池已开启
      $(".ward1 .count").text("0");
      $(".ward1").addClass("gray");
    }else{
      //1奖池未开启
      $(".ward1 .count").text("1");
      $(".ward1").removeClass("gray");
    }

    // invite_num-1  未抽时二三奖池可用次数
    // (invite_count-(lottery_node_1==1?1:0))  二三奖池已用次数
    var last_count=invite_num-1-(invite_count-(lottery_node_1==1?1:0));

    //2奖池
    if(invite_num>=3){
      $(".ward2 .count").text(last_count);
      if(last_count>0){
        $(".ward2").removeClass("gray");
      }else{
        $(".ward2").addClass("gray");
      }
    }else{
      $(".ward2 .count").text("0");
      $(".ward2").addClass("gray");
    }

    //3奖池
    if(invite_num>=5){
      $(".ward3 .count").text(last_count);
      if(last_count>0){
        $(".ward3").removeClass("gray");
      }else{
        $(".ward3").addClass("gray");
      }
    }else{
      $(".ward3 .count").text("0");
      $(".ward3").addClass("gray");
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
    0: {img:0,prize:'谢谢参与'},
    25:{img:1,prize:'战魂*10'},
    26:{img:7,prize:'金币*20w'},
    27:{img:9,prize:'灵银*20'},
    28:{img:1,prize:'战魂*30'},
    29:{img:1,prize:'战魂*15'},
    30:{img:2,prize:'1级食材篮*5'},
    31:{img:9,prize:'灵银*25'},
    32:{img:7,prize:'金币*40w'},
    33:{img:3,prize:'2级食材篮*5'},
    34:{img:9,prize:'灵银*40'},
    35:{img:7,prize:'金币*60w'},
    36:{img:4,prize:'3级食材篮*5'},
    37:{img:11,prize:'超杀抱枕*1'},
    38:{img:10,prize:'左慈人偶U盘'},
    40:{img:8,prize:'烈战魂*20'},
    41:{img:7,prize:'金币*30w'},
    42:{img:6,prize:'草人*5'},
    43:{img:8,prize:'烈战魂*25'},
    44:{img:7,prize:'金币*50w'},
    45:{img:6,prize:'草人*10'},
    46:{img:8,prize:'烈战魂*50'},
    47:{img:7,prize:'金币*80w'},
    48:{img:6,prize:'草人*20'},
    49:{img:12,prize:'超杀鼠标垫*1'},
    50:{img:5,prize:'648游戏充值*1	'},
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
                    $(".co_tips.co_tips_ward .tips_num").removeClass("hidden");
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
                        if(id==37||id==38||id==49||id==50){
                          $(".co_tips.co_tips_ward .tips_num").addClass("hidden");
                        }
                        $(".co_tips_ward").removeClass("hidden");
                        $(".co_tips.co_tips_ward .show_gift>i").text((prizes[id]||{}).prize);
                        $(".co_tips.co_tips_ward .tips_num>span").text(code);

                        $(".co_tips.co_tips_ward .show_gift").addClass("hidden");
                        $(".co_tips.co_tips_ward .show_gift"+(prizes[id]||{}).img).removeClass("hidden");
                      }
                    }else if(data.status==2){
                      //登陆超时，请重新登录
                      $(".co_before").removeClass("hidden");
                      $(".co_after,.ward_yq").addClass("hidden");
                      $('.user_phone').text("");
                      $('.count_all,.count,.help,.friend').text("0");
                      $('.yq_num').text("");
                      $('.my_url').text("");
                      $(".ward1,.ward2,.ward3").addClass("gray");
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
                $(" .co_tips.co_tips_success .success").text("该账号抽奖次数已达到总上限");
              }
            }else{
              $(".co_tips_success").removeClass("hidden");
              $(".co_tips.co_tips_success .tips_txt,.co_tips.co_tips_success .co_tips_title").addClass("hidden");
              $(" .co_tips.co_tips_success .success").text("今日抽奖次数已达到上限");
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

//弹框计算
