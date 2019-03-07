var login_url1='/common/yuyue-phone.html';//登录
var verify_url='/common/get-login-verify.html';//登录发送验证码
var srf = $('meta[name="csrf-token"]').attr('content');
var invite_code="";
var type="";
var imgMarkIndex=1;
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
function load_captcha(){
        imgMarkIndex++;
        var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
        $.get(imgUrl, {}, function(data) {
            $(".co_captcha").html(data.msg);
        }, 'json');
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
    fgw_yy_pc();
    var my_phone = $(".co_username").val();
    var co_codenum1 =  $(".co_codenum1").val();
    if(my_phone == "" || my_phone == undefined) {
        showErr(1, "手机号码不能为空哦");
        return;
    }else if(my_phone.length != 11){
        showErr(1, "手机号码不正确哦");
        return;
    }hideErr(1);
    if(co_codenum1 == "" || co_codenum1 == undefined) {
        showErr(3, "手机验证码不能为空哦");
        return;
    }hideErr(3);
    $.ajax({
        'url':login_url1,
        'data':{'phone':my_phone,'type':type,'yzm':co_codenum1,"scene": 1 ,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                fgw_yy_pc_success();
            	if(data.is_repeat==1){
                	$(".order-to").addClass("hidden");
                	$(".forecast-suc .tips_info").text("您已经预约过了，请勿重复预约");
                    $(".forecast-suc").removeClass("hidden");
                	$('.order-to input').val("");
            	}else{
                	$(".order-to").addClass("hidden");
                	$(".forecast-suc .tips_info").text("恭喜您预约成功~");
                	$(".forecast-suc").removeClass("hidden");
                	$('.order-to input').val("");
            	}
            }else{
                $(".forecast-suc").removeClass("hidden");
                $(".forecast-suc .tips_info").text(data.msg);
                load_captcha();
            }
        }
    });
}

//初始化
$(function(){
    yx_getcaptcha(".co_captcha",".order-to");   
});
//弹框关闭
$(".tips_close").click(function(){
    $(".co_tips").addClass("hidden");
    $('.order-to input').val("");
    $(".co_error").removeClass("co_err_show");
});
//弹框关闭
$(".co_surebtn").click(function(){
    $(".forecast-suc").addClass("hidden");
});
//登录弹框显示
$(".down_ios").click(function(){
    $(".order-to").removeClass("hidden");
    type="ios";
});
//登录弹框显示
$(".down_az").click(function(){
    $(".order-to").removeClass("hidden");
    type="android";
});
//登录获取验证码
$(".co_codebtn1").click(function(){
    var my_phone = $(this).closest(".order-to").find(".co_username").val();
    var captcha =  $(this).closest(".order-to").find(".captcha").val();
    if(my_phone == "" || my_phone == undefined) {
        showErr(1, "手机号码不能为空哦");
        return;
    }else if(my_phone.length != 11){
        showErr(1, "手机号码不正确哦");
        return;
    }hideErr(0);
    if(captcha == "" || captcha == undefined) {
        showErr(2, "验证码不能为空哦");
        return;
    }hideErr(2);
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
$(".co_tips_loginbtn").click(function(){
    get_login();
});


