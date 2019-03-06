var login_url='/special/get-user-info.html';//判断用户是否登录
var login_url1='/special/login.html';//登录
var verify_url='/common/get-login-verify.html';//登录发送验证码
var out_url='/special/logout.html';//注销登录
var yc_url='/special/yc.html';//预测
var srf = $('meta[name="csrf-token"]').attr('content');
var invite_code="";
var is_focus=0;//input获取事件焦点
var yc_id="";
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
        $(".co_captcha").html(data.msg);
        //$(".co_imgtxt").addClass("hidden");
    }, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
    load_captcha();
    is_focus=2;
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
//图片验证码焦点获取显示验证码
$(".order-to input").focus(function(){
    is_focus++;
    console.log(is_focus);
    if(is_focus==1){
        load_captcha();
    }
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
        'data':{'phone':my_phone,'yzm':co_codenum1,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                $("body,html").removeClass("no_auto");
                alert("登陆成功");
                $(".order-to").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.order-to input').val("");
                $('.user_phone').text(data.data.phone);
                $(".yc_id").attr("data-id",data.data.teamId)// 选择的战队teamId
                yc_id=data.data.teamId;
                $('.gift_code1').text(data.data.giftYc);//预测礼包giftYc
                $('.copy_link1').attr("data-clipboard-text",data.data.giftYc);// 预测礼包giftYc
                $('.gift_code2').text(data.data.giftGj); // 冠军礼包giftGj
                $('.copy_link2').attr("data-clipboard-text",data.data.giftGj); // 冠军礼包giftGj
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
//判断用户是否登录
function is_login(){
    $.ajax({
        'url':login_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                $(".order-to").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.order-to input').val("");
                $('.user_phone').text(data.data.phone);
                $(".yc_id").attr("data-id",data.data.teamId)// 选择的战队teamId
                yc_id=data.data.teamId;
                $('.gift_code1').text(data.data.giftYc);//预测礼包giftYc
                $('.copy_link1').attr("data-clipboard-text",data.data.giftYc);// 预测礼包giftYc
                $('.gift_code2').text(data.data.giftGj); // 冠军礼包giftGj
                $('.copy_link2').attr("data-clipboard-text",data.data.giftGj); // 冠军礼包giftGj
            }else{}
        }
    });
}
//初始化
$(function(){
    //获取分享链接中的邀请码
    invite_code=getUrlParam('code');
    console.log(invite_code);
    is_login();
    //轮播
    var swiper01 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination1',
        slidesPerView: 1,
        paginationClickable: true,
        autoplayDisableOnInteraction : false,
//             autoplay:3000,
        loop:true,
        prevButton:'.swiper-button-prev1',
        nextButton:'.swiper-button-next1',
    });
});
//弹框关闭
$(".tips_close,.co_surebtn").click(function(){
    $(".co_tips").addClass("hidden");
    $('.order-to input').val("");
    $(".co_error").removeClass("co_err_show");
    $("body,html").removeClass("no_auto");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
    $(".order-to").removeClass("hidden");
    $("body,html").addClass("no_auto");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
    var my_phone = $(this).closest(".order-to").find(".co_username").val();
    var captcha =  $(this).closest(".order-to").find(".captcha").val();
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
//点击登陆或者点击预约
$(".co_tips_loginbtn").click(function(){
    HLog.event('df_special_matchlogin');
    get_login();
});

//查看我的礼包
$(".my_gift").click(function(){
    if($(".co_after.hidden").length>0){
        $(".order-to").removeClass("hidden");
        $("body,html").addClass("no_auto");
    }else{
        var code_lth1=$(".gift_code1").text();
        var code_lth2=$(".gift_code2").text();
        if(code_lth1!=""){
            $(".gift_tips").removeClass("hidden");
            if(code_lth2!=""){
                $(".gift_tips .gift_txt2").removeClass("hidden");
            }else{
                $(".gift_tips .gift_txt2").addClass("hidden");
            }

        }else{
            $(".forecast-suc").removeClass("hidden");
            $(".forecast-suc .tips_info").text("您还没有礼包哦~");
        }
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
                alert("注销成功");
                $(".co_before").removeClass("hidden");
                $(".co_after").addClass("hidden");
                $('.user_phone').text("");
                $(".co_codebtn1").html("获取验证码");
                $(".co_codebtn1").css("pointer-events","auto");
                $(".yc_id").attr("data-id","")// 选择的战队teamId
                if(djs_timer){
                    clearInterval(djs_timer);
                }
            }else{
                alert(data.msg);
            }
        }
    });
});
//立即预测
$(".lj_yuce").click(function(){
    HLog.event('df_special_matchyc');
    if($(".co_after.hidden").length>0){
        $(".order-to").removeClass("hidden");
        $("body,html").addClass("no_auto");
    }else{
        $(".yc_tips").removeClass("hidden");
    }
});

//预测选项选择
$(".choose>div").click(function(){
    var id=$(this).attr("data-id");
    $(this).addClass("active").siblings().removeClass("active");
    $(".co_ycbtn").attr("data-id",id);
});
//预测
$(".co_ycbtn").click(function(){
    var yc_id1=""
    var _that=$(this);
    var teamId = _that.attr("data-id");
    if($(".co_after.hidden").length>0){
        //登录之前
        $(".order-to").removeClass("hidden");
        $("body,html").addClass("no_auto");
    }else{
        yc_id=yc_id||_that.attr("data-id");

        if(teamId){
            //登录之后
            $.ajax({
                'url':yc_url,
                'data':{"teamId":teamId,"cms_csrf":srf},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.status==0){
                        $(".forecast-suc").removeClass("hidden");
                        $(".forecast-suc .tips_info").text("恭喜您，预测成功！");
                        $('.gift_code1').text(data.data.giftYc);//预测礼包giftYc
                        $('.copy_link1').attr("data-clipboard-text",data.data.giftYc);// 预测礼包giftYc
                    }else if(data.status==1002){
                        if(yc_id=="1"){
                            yc_id1="非酋躺赢战队"
                        }else if(yc_id=="2"){
                            yc_id1="心之远航战队"
                        }else if(yc_id=="3"){
                            yc_id1="天降正义战队"
                        }else if(yc_id=="4"){
                            yc_id1="毁灭打击战队"
                        }
                        $(".forecast-suc").removeClass("hidden");
                        $(".forecast-suc .tips_info").text("您已预测"+yc_id1+"为冠军队，请勿重复选择");
                    }else{
                        $(".forecast-suc").removeClass("hidden");
                        $(".forecast-suc .tips_info").text(data.msg);
                    }
                }
            });
        }else{
            $(".forecast-suc").removeClass("hidden");
            $(".forecast-suc .tips_info").text("请选择战队");
        }

    }
});

//复制
new Clipboard('.copy');
$(".copy").click(function() {
    alert("已复制");
});