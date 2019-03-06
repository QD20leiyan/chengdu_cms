var countdown = 60;
var srf = $('meta[name="csrf-token"]').attr('content');
//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
	var index=$(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");

});

//二级菜单下拉框
var clickNumber = 1;
var clickNumber2 = 0;
$(".header_a .type").click(function() {
	if(clickNumber % 2 !== 0) {
		$(this).parent().siblings(".nav-content").slideDown();
		$(this).addClass("type1");
	} else {
		$(this).parent().siblings(".nav-content").slideUp();
		$(this).removeClass("type1");
	}
  $(".down_list").slideUp(400);
	clickNumber++;
  clickNumber2=0;
});
//游戏下载下拉菜单
  $(".order").click(function(e){
    $(".nav-content").slideUp();
    $(".header_a .type").removeClass("type1");
    e.stopPropagation();
    if(clickNumber2 % 2 == 0) {
    $(".down_list").slideDown(400);
    } else {
      $(".down_list").slideUp(400);
    }
    clickNumber2++;
    clickNumber=1;
  })
  $(".down_list li,.fade").click(function() {
    $(".down_list").slideUp(400);
    clickNumber2=0;
  })
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
//预约人数获取
function getyynum(){
	var num_url='/site/ajax-get-num.html';
	$.ajax({
		'url':num_url,
		'data':{},
		'type':'GET',
		'dataType':'Json',
		success:function(data){
			if(data.status==0){
				$(".num .num_txt").text(numFormat(data.msg));
			}else{

			}
		}
	});
}
// 验证码倒计时
function timer(ele,callback){
  var timeNum = 60;
  if(ele) {
    ele.html("( 60s )");
  }
  timer_fun = setInterval(function() {
    timeNum--;
    ele.html("( "+(timeNum<=0?0:timeNum) + "s )");
    if(timeNum == 0) {
      clearInterval(timer_fun);
      ele.html("获取验证码");
      if(callback) {
        callback();
      }
    }
  }, 1000);
}
//图片验证码刷新
function tupian() {
  $.get("/site/captcha.html?refresh=1", {}, function(data) {
    $(".code_img img").attr("src", data.url);
  }, 'json');
}
tupian();
  $(".code_img").click(function(){
    tupian();
  });

//点击预约
//  $(".order").click(function(){
//    $(".yuyue_board").removeClass("hidden");
//  });
  //$(".order_btn1").click(function(){
  //  $(".yuyue_board").removeClass("hidden");
  //});

//弹窗关闭按钮
  $(".yuyue_close").click(function(){
    $(this).parent().parent().addClass("hidden");
    $(".yuyue_tel .co_error").hide();
    $(".yuyue_tel input").val("");
    tupian();
  });

//手机类型选择
	$(".yuyue_tel .xitong>span").click(function(){
    $(this).addClass("on").siblings().removeClass("on");
	});
    
//登录获取验证码
  $(".gain1").click(function(){
    var my_tel1 = $("#yuyue_code1").val();
    var my_code1= $("#check_code2").val();
    if(my_tel1 == "" || my_tel1 == undefined) {
      $(".yuyue_tel .err1").show().text("* 手机号码不能为空喔~");
      return;
    }else if(!/^1[345789]\d{9}$/.test(my_tel1)){
      $(".yuyue_tel .err1").show().text("* 手机号码格式不正确喔~");
      return;
    }else if(my_code1 == "" || my_code1 == undefined){
    	$(".yuyue_tel .err1").hide();
    	$(".yuyue_tel .err2").hide();
      $(".yuyue_tel .err3").show().text("* 请输入正确的验证码~");
      $('#check_code2').val("");
      return;
    }else{
      $(".yuyue_tel .err1").hide();
      $(".yuyue_tel .err3").hide();
      $.post('/site/ajax-login-verify.html',{"phone":my_tel1,"captcha":my_code1,"cms_csrf":srf},function(data){
          if(data.status == 0){
              $(".gain1").css("pointer-events","none");
              timer($(".gain1"),function(){
                $(".gain1").css("pointer-events","auto");
              });
          }else{
              alert(data.msg);
              tupian();
          }
        }, 'json');
    }
  });

  // 预约
  $(".yuyue_next").click(function(){
  	var my_tel1 = $("#yuyue_code1").val();
    var yzm= $("#check_code1").val();
    var type_id=$(".yuyue_tel .xitong>span.on").attr("data-id");
      if(type_id==1){
        var type="ios";
      }else if(type_id==2){
        var type="android";
      }
      $.post('/site/ajax-index-yy.html',{"phone":my_tel1,"yzm":yzm,"type":type,"cms_csrf":srf},function(data){
          if(data.status == 0){
            alert('预约成功');
            $(".yuyue_board").addClass("hidden");
            $(".yuyue_tel .co_error").hide();
            $('.yuyue_tel input').val("");
          }else{
            alert(data.msg);
            $(".yuyue_board").addClass("hidden");
            $('.yuyue_tel input').val("");
            $(".yuyue_tel .co_error").hide();
            tupian();
          }
      }, 'json');
    });
  

////初始化
//$(function(){
//	//初始获取预约人数
//	getyynum();
//	//每隔一分钟获取预约人数
//	setInterval(function() {
//	    getyynum();
//	}, 30000);
//});

