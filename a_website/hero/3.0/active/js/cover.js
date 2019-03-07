var get_url='/site/ajax-wpzz-user.html';//判断用户是否登录
var verify_url='/site/ajax-login-wpzz-verify.html';//登录发送验证码
var login_url='/site/ajax-login-wpzz.html';//登录
var yq_url='/site/ajax-invite-gift.html';//邀请人数礼包
var lb_url='/site/ajax-lb-to-num.html';//奶币转换次数
var lottery_url='/site/ajax-lb-draw.html';//抽奖
var out_url='/site/ajax-login-wpzz-out.html';//注销
var add_url='/site/ajax-address.html';//地址
var code_url='/site/ajax-my-code.html';//礼包
var srf = $('meta[name="csrf-token"]').attr('content');
var invite_code="";
var user_status=0;
var is_show=0;
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
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}
//中奖名单滚动效果
function autoScroll(obj) {
    $(obj).animate({
        marginTop: "-45px"
    }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
}
//获取所有用户中奖记录
function get_all_code(){
    $.ajax({
        'url':code_url,
        'data':{'type':"3","cms_csrf":srf},
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0&& data.msg.length>0){
                $('.price_con ul').empty();
                var result = '';
                for(var i = 0; i < data.msg.length; i++) {
                    result += "<li>恭喜<span>"+data.msg[i].phone+"</span>获得<i>"+data.msg[i].name+"</i></li>";
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
}
//缩放提示
function is_sf(){
    var windowWidth = $(window).width();
    if(windowWidth < 1500){
        $(".q_float .sf_txt").removeClass("hidden");
        setTimeout(function(){
            $(".q_float .sf_txt").addClass("hidden")
        },3600)
    }
}
//初始化
$(function(){
    //获取分享链接中的邀请码
    invite_code=getUrlParam('invite_code');
    console.log(invite_code);
    //判断用户是否登录
    $.ajax({
        'url':get_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                $(".co_tips_login").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.co_username').val("");
                $('.co_codenum1').val("");
                $('.user_phone').text(data.msg.phone);
                $('.count_all').text(data.msg.lb_num||"0");
                $('.tiger_num span').text(data.msg.draw_num||"0");
                $('.my_url').text(data.msg.share_url);
                $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
                $(".co_tips_ward1 .lottery_code1").text((data.msg.login_code||"").split(",")[0]);//--第一个
                $(".co_tips_ward1 .copy1").attr("data-clipboard-text",(data.msg.login_code||"").split(",")[0]);
                $(".co_tips_ward1 .lottery_code2").text((data.msg.login_code||"").split(",")[1]);//--第二个
                $(".co_tips_ward1 .copy2").attr("data-clipboard-text",(data.msg.login_code||"").split(",")[1]);
                user_status=data.msg.user_status;
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
            }else{}
        }
    });
    //swiper
    var swiper1 = new Swiper('.swiper-container1',{
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween : 16,
        autoplay :2000,
        autoplayDisableOnInteraction : false,
        loop:true,
    });
    //获取所有用户中奖记录
    get_all_code();
    //缩放提示
    is_sf();
});
$(window).resize(function() {
    is_sf();
});
//弹框关闭
$(".co_tips_close").click(function(){
    $(".co_tips").addClass("hidden");
    $('.co_tips_login .co_input input').val("");
    $(".co_error").removeClass("co_err_show");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
    if($(this).hasClass("co_loginbtn1")){
        $(".co_tips_login2").removeClass("hidden");
    }else{
        $(".co_tips_login1").removeClass("hidden");
    }
});
//没有账号
$(".co_tips_nobtn").click(function(){
    $(".co_tips_login1").removeClass("hidden");
    $(".co_tips_login2").addClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
    var user_id = $(".co_id").val();
    var user_name = $(".co_nc").val();
    var type = $(this).closest(".co_tips_login").attr("data-type");
    var my_phone = $(this).closest(".co_tips_login").find(".co_username").val();
    var captcha =  $(this).closest(".co_tips_login").find(".captcha").val();
    if(type==1){
        if(user_id == "" || user_id == undefined) {
            showErr(3, "角色ID不能为空哦");
            return;
        }hideErr(3);
        if(user_name == "" || user_name == undefined) {
            showErr(4, "角色昵称不能为空哦");
            return;
        }hideErr(4);
        if(my_phone == "" || my_phone == undefined) {
            showErr(5, "手机号码不能为空哦");
            return;
        }else if(my_phone.length != 11){
            showErr(5, "手机号码不正确哦");
            return;
        }hideErr(5);
        if(captcha == "" || captcha == undefined) {
            showErr(6, "验证码不能为空哦");
            return;
        }hideErr(6);
    }else if(type==3){
        if(my_phone == "" || my_phone == undefined) {
            showErr(0, "手机号码不能为空哦");
            return;
        }else if(my_phone.length != 11){
            showErr(0, "手机号码不正确哦");
            return;
        }hideErr(0);
        if(captcha == "" || captcha == undefined) {
            showErr(1, "验证码不能为空哦");
            return;
        }hideErr(1);
    }
    $.post(verify_url,{"type":type,"phone":my_phone,"user_id":user_id,"user_name":user_name,"captcha":captcha,"cms_csrf":srf },function(data){
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
$(".co_tips_login .co_tips_loginbtn").click(function(){
    var user_id = $(".co_id").val();
    var user_name = $(".co_nc").val();
    var type = $(this).closest(".co_tips_login").attr("data-type");
    var my_phone = $(this).closest(".co_tips_login").find(".co_username").val();
    var co_codenum1 =  $(this).closest(".co_tips_login").find(".co_codenum1").val();
    if(type==1){
        if(user_id == "" || user_id == undefined) {
            showErr(3, "角色ID不能为空哦");
            return;
        }hideErr(3);
        if(user_name == "" || user_name == undefined) {
            showErr(4, "角色昵称不能为空哦");
            return;
        }hideErr(4);
        if(my_phone == "" || my_phone == undefined) {
            showErr(5, "手机号码不能为空哦");
            return;
        }else if(my_phone.length != 11){
            showErr(5, "手机号码不正确哦");
            return;
        }hideErr(5);
        if(co_codenum1 == "" || co_codenum1 == undefined) {
            showErr(7, "验证码不能为空哦");
            return;
        }hideErr(7);
    }else if(type==3){
        if(my_phone == "" || my_phone == undefined) {
            showErr(0, "手机号码不能为空哦");
            return;
        }else if(my_phone.length != 11){
            showErr(0, "手机号码不正确哦");
            return;
        }hideErr(0);
        if(co_codenum1 == "" || co_codenum1 == undefined) {
            showErr(2, "验证码不能为空哦");
            return;
        }hideErr(2);
    }
    $.ajax({
        'url':login_url,
        'data':{"type":type,"phone":my_phone,"user_id":user_id,"user_name":user_name,"yzm":co_codenum1,"invite_code":invite_code,"cms_csrf":srf},
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
                $('.count_all').text(data.msg.lb_num||"0");
                $('.tiger_num span').text(data.msg.draw_num||"0");
                $('.my_url').text(data.msg.share_url);
                $(".copy_link").attr("data-clipboard-text",data.msg.share_url);
                $(".co_tips_ward1 .lottery_code1").text((data.msg.login_code||"").split(",")[0]);//--第一个
                $(".co_tips_ward1 .copy1").attr("data-clipboard-text",(data.msg.login_code||"").split(",")[0]);
                $(".co_tips_ward1 .lottery_code2").text((data.msg.login_code||"").split(",")[1]);//--第二个
                $(".co_tips_ward1 .copy2").attr("data-clipboard-text",(data.msg.login_code||"").split(",")[1]);
                user_status=data.msg.user_status;
                console.log(user_status);
                if(type==1&&user_status!=3&&data.msg.is_login==1){
                    if(user_status==1){
                        //新用户
                        $(".co_tips_ward1 .ts").text("恭喜您获得新兵专属礼包");
                    }else if(user_status==2){
                        //老用户
                        $(".co_tips_ward1 .ts").text("恭喜您获得老兵专属礼包");
                    }
                    $(".co_tips_ward1").removeClass("hidden");
                    $(".co_tips_ward1 .show_gift_box").addClass("hidden");
                    $(".co_tips_ward1 .show_gift_box1").removeClass("hidden");
                }
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
            }else{
                alert(data.msg);
                load_captcha();
            }
        }
    });
});
//中奖纪录弹框显示
$(".check_ward").click(function(){
    var code_id=$(this).attr("data-type");
    if($(".co_after.hidden").length>0){
        if(code_id==1){
            $(".co_tips_login2").removeClass("hidden");
        }else if(code_id==2){
            $(".co_tips_login1").removeClass("hidden");
        }
    }else{
        //获取当前用户中奖记录
        $.ajax({
            'url':code_url,
            'data':{'type':code_id,"cms_csrf":srf},
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0&& data.msg.length>0){
                    $('.co_tips_record .table_list').empty();
                    var result = '';
                    for(var i = 0; i < data.msg.length; i++) {
                        result += "<p class='table_info'><span>"+data.msg[i].msg+"</span><span class='table_code'>"+data.msg[i].code+"</span><span class='copy' data-clipboard-text='"+data.msg[i].code+"'>复制</span></p>";
                    }
                    $('.co_tips_record .table_list').append(result);
                    $(".co_tips_record").removeClass("hidden");
                    //复制
                    new Clipboard('.copy');
                    $(".copy").click(function() {
                        alert("已复制");
                    });
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
        $(".co_tips_login1").removeClass("hidden");
    }else{
        $(".co_tips_yq").removeClass("hidden");
        $(".co_tips.co_tips_yq .my_link>div>p:eq(0)").text("分享你的邀请链接，邀请好友参与获得抽奖机会。");
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
                $('.count_all,.tiger_num span').text("0");
                $('.my_url').text("");
                $(".lottery_code").text("");
                $(".copy_link,.co_tips_ward1 .copy1,.co_tips_ward1 .copy2").attr("data-clipboard-text","");
                $(".u_name").val("");
                $(".u_yb").val("");
                $(".u_tel").val("");
                $(".u_madd").val("");
            }else{
                alert(data.msg);
            }
        }
    });
});
//地址弹框显示
$(".co_tips_addbtn,.co_tips_newbtn").click(function(){
    $(".co_tips").addClass("hidden");
    $(".co_tips_addr").removeClass("hidden");
});
//地址填写请求
$(".co_tips_addr .co_tips_addsure").click(function(){
    var my_name = $(".u_name").val();
    var my_yb=$('.u_yb').val();
    var my_tel = $(".u_tel").val();
    var my_add=$('.u_madd').val();
    if(!my_name) {
        showErr(8, "收件人姓名不能为空哦");
        return;
    }hideErr(8);
    if(!my_tel) {
        showErr(9, "手机号码不能为空哦");
        return;
    }else if(my_tel.length != 11){
        showErr(9, "手机号码不正确哦");
        return;
    }hideErr(9);
    if(!my_yb) {
        showErr(10, "收件人邮编不能为空哦");
        return;
    }hideErr(10);
    if(!my_add) {
        showErr(11, "收件人详细地址不能为空哦");
        return;
    }hideErr(11);
    $.ajax({
        'url':add_url,
        'data':{'name':my_name,'code':my_yb,'address':my_add,'tel':my_tel,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                alert("您的资料已填写完毕，奖品将陆续发货，请耐心等待！");
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
//复制
new Clipboard('.copy');
$(".copy").click(function() {
    alert("已复制");
});
//投入奶币
$(".milk_btn").click(function(){
    if($(".co_after.hidden").length>0){
        //登录之前
        $(".co_tips_login1").removeClass("hidden");
    }else{
        $.ajax({
            'url':lb_url,
            'data':{},
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    $(".tiger_num span").text(data.draw_num);
                    $(".count_all").text(data.lb_num);
                }else{
                    alert(data.msg);
                }
            }
        });
    }
});
//新老兵立即领取
$(".get_btn").click(function(){
    if($(".co_after.hidden").length>0){
        //登录之前
        $(".co_tips_login2").removeClass("hidden");
    }else{
        if(user_status==3){
            //普通用户
            $(".co_tips_success").removeClass("hidden");
            $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
            $(" .co_tips.co_tips_success .success").text("您需注销，重新在新老兵活动处登录！");
        }else{
            if(user_status==1){
                //新用户
                $(".co_tips_ward1 .ts").text("恭喜您获得新兵专属礼包");
            }else if(user_status==2){
                //老用户
                $(".co_tips_ward1 .ts").text("恭喜您获得老兵专属礼包");
            }
            $(".co_tips_ward1").removeClass("hidden");
            $(".co_tips_ward1 .show_gift_box").addClass("hidden");
            $(".co_tips_ward1 .show_gift_box1").removeClass("hidden");
        }
    }
});
//邀请好友领取
$(".yq_btn").click(function(){
    if($(".co_after.hidden").length>0){
        //登录之前
        $(".co_tips_login2").removeClass("hidden");
    }else{
        if(user_status==3){
            //普通用户
            $(".co_tips_success").removeClass("hidden");
            $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
            $(" .co_tips.co_tips_success .success").text("您需注销，重新在新老兵活动处登录！");
        }else{
            $.ajax({
                'url':yq_url,
                'data':{'type':user_status,"cms_csrf":srf},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.status==0){
                        if(data.msg!=""){
                            if(data.msg['1']&&!data.msg['2']){
                                $(".co_tips_ward1 .lottery_code1").text(data.msg['1']);//--第一个
                                $(".co_tips_ward1 .copy1").attr("data-clipboard-text",data.msg['1']);
                                $(".show_gift_box2 .show_gift:eq(0),.show_gift_box3 .show_gift:eq(0)").removeClass("hidden");
                                $(".show_gift_box2 .show_gift:eq(1),.show_gift_box3 .show_gift:eq(1)").addClass("hidden");
                                $(".co_tips_ward1 .tips_num1").removeClass("hidden");
                                $(".co_tips_ward1 .tips_num2").addClass("hidden");
                            }else{
                                $(".co_tips_ward1 .lottery_code1").text(data.msg['1']);//--第一个
                                $(".co_tips_ward1 .copy1").attr("data-clipboard-text",data.msg['1']);
                                $(".co_tips_ward1 .lottery_code2").text(data.msg['2']);//--第二个
                                $(".co_tips_ward1 .copy2").attr("data-clipboard-text",data.msg['2']);
                                $(".show_gift_box2 .show_gift:eq(0),.show_gift_box3 .show_gift:eq(0)").removeClass("hidden");
                                $(".show_gift_box2 .show_gift:eq(1),.show_gift_box3 .show_gift:eq(1)").removeClass("hidden");
                            }
                            if(user_status==1){
                                //新用户
                                $(".co_tips_ward1 .ts").text("恭喜您获得新兵专属礼包");
                                $(".co_tips_ward1").removeClass("hidden");
                                $(".co_tips_ward1 .show_gift_box").addClass("hidden");
                                $(".co_tips_ward1 .show_gift_box3").removeClass("hidden");
                            }else if(user_status==2){
                                //老用户
                                $(".co_tips_ward1 .ts").text("恭喜您获得老兵专属礼包");
                                $(".co_tips_ward1").removeClass("hidden");
                                $(".co_tips_ward1 .show_gift_box").addClass("hidden");
                                $(".co_tips_ward1 .show_gift_box2").removeClass("hidden");
                            }
                        }else{
                            $(".co_tips_yq").removeClass("hidden");
                            $(".co_tips.co_tips_yq .my_link>div>p:eq(0)").text("分享你的邀请链接，邀请好友参与获得礼包。");
                        }
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }
    }
});
//抽奖
(function(){
        var flag=false;
        var TextNum1;
        var TextNum2;
        var TextNum3;
        function letGo(){
            reset();
            if(!TextNum3&&TextNum3!=0){
                $(".lottery1,.lottery2").animate({"top":"-905px"},500,"linear");
                $(".lottery3").animate({"top":"-905px"},500,"linear", function () {
                    letGo();
                });
            }else{
                var toparr=['-55px','-140px','-225px','-310px','-395px','-480px','-565px','-650px','-735px','-820px','-905px'];
                var num1=toparr[TextNum1];//在这里随机
                var num2=toparr[TextNum2];
                var num3=toparr[TextNum3];
                $(".lottery1").animate({"top":num1},500,"linear");
                $(".lottery2").animate({"top":num2},900,"linear",function(){
                    //抽奖结束
                    TextNum1=undefined,TextNum2=undefined,TextNum3=undefined;

                    if(is_show==1){
                        $(".co_tips_ward2").removeClass("hidden");
                    }else{
                        $(".co_tips_success").removeClass("hidden");
                    }
                });
                $(".lottery3").animate({"top":num3},650,"linear");
            }
        }
        function reset(){
            $(".lottery1,.lottery2,.lottery3").css({"top":'-55px'});
        }
        $(".lottery_btn").click(function(){
            if($(".co_after.hidden").length>0){
                $(".co_tips_login1").removeClass("hidden");
            }else{
                if(!flag&&$('.tiger_num span').text()>0){
                    flag=true;
                    reset();
                    letGo();
                    //数据请求
                    $.ajax({
                        'url':lottery_url,
                        'data':{'type':user_status,"cms_csrf":srf},
                        'type':'POST',
                        'dataType':'Json',
                        success:function(data){
                            if(data.status==0){
                                flag=false;
                                $(".tiger_num span").text(data.draw_num);
                                setTimeout(function(){
                                    if(data.msg.is_shiwu==2){
                                        is_show=0;
                                        $(".co_tips.co_tips_success .tips_txt").addClass("hidden");
                                        $(" .co_tips.co_tips_success .success").text("谢谢参与！");
                                        //谢谢参与--保证三个不同
                                        var num1=parseInt(Math.random()*10);
                                        var num2=parseInt(Math.random()*10);
                                        var num3=parseInt(Math.random()*10);
                                        TextNum1=num1;//随机数
                                        TextNum2=num2;
                                        if(num1==num2&&num2==num3){
                                            num3=num3>5?parseInt(Math.random()*5):6+parseInt(Math.random()*4)
                                        }
                                        TextNum3=num3;
                                    }else{
                                        is_show=1;
                                        $(".co_tips_ward2 .lottery_code").text(data.msg.msg);
                                        $(".co_tips_ward2 .copy1").attr("data-clipboard-text",data.msg.msg);
                                        $(".co_tips_ward2 .show_gift").addClass("hidden");
                                        $(".co_tips_ward2 .sz_qrcode").addClass("hidden");
                                        $(".co_tips_ward2 .tips_num").removeClass("hidden");
                                        if(data.msg.is_shiwu==1){
                                            $(".co_tips_ward2 .tips_num").addClass("hidden");
                                        }
                                        if(data.msg.gift_id==330){
                                            TextNum1=9;TextNum2=9;TextNum3=9;//330 venque定制徽章
                                            $(".co_tips_ward2 .show_gift.show_gift9").removeClass("hidden");
                                         }else if(data.msg.gift_id==331){
                                            TextNum1=0;TextNum2=0;TextNum3=0;//331 手机支架
                                            $(".co_tips_ward2 .show_gift.show_gift0").removeClass("hidden");
                                        }else if(data.msg.gift_id==332){
                                            TextNum1=1;TextNum2=1;TextNum3=1;//332 四洲牛奶
                                            $(".co_tips_ward2 .show_gift.show_gift1").removeClass("hidden");
                                        }else if(data.msg.gift_id==333){
                                            TextNum1=2;TextNum2=2;TextNum3=2;//333 四周抽奖机会
                                            $(".co_tips_ward2 .show_gift.show_gift2").removeClass("hidden");
                                            $(".co_tips_ward2 .sz_qrcode").removeClass("hidden");
                                            $(".co_tips_ward2 .tips_num").addClass("hidden");
                                        }else if(data.msg.gift_id==334){
                                            TextNum1=3;TextNum2=3;TextNum3=3;//334 绝版恐龙服（裤子）
                                            $(".co_tips_ward2 .show_gift.show_gift3").removeClass("hidden");
                                        }else if(data.msg.gift_id==335){
                                            TextNum1=4;TextNum2=4;TextNum3=4;//335 绝版恐龙服（一套）
                                            $(".co_tips_ward2 .show_gift.show_gift4").removeClass("hidden");
                                        }else if(data.msg.gift_id==336){
                                            TextNum1=5;TextNum2=5;TextNum3=5;//336 蒙面大侠头饰
                                            $(".co_tips_ward2 .show_gift.show_gift5").removeClass("hidden");
                                        }else if(data.msg.gift_id==337){
                                            TextNum1=6;TextNum2=6;TextNum3=6;//337 2000金币
                                            $(".co_tips_ward2 .show_gift.show_gift6").removeClass("hidden");
                                        }else if(data.msg.gift_id==338){
                                            TextNum1=7;TextNum2=7;TextNum3=7;//338 1500金币+200钻石
                                            $(".co_tips_ward2 .show_gift.show_gift7").removeClass("hidden");
                                        }else if(data.msg.gift_id==339){
                                            TextNum1=6;TextNum2=6;TextNum3=6;//339  1000金币
                                            $(".co_tips_ward2 .show_gift.show_gift10").removeClass("hidden");
                                        }else if(data.msg.gift_id==340){
                                            TextNum1=8;TextNum2=8;TextNum3=8;//340 王牌战争定制体恤
                                            $(".co_tips_ward2 .show_gift.show_gift8").removeClass("hidden");
                                        }
                                    }
                                },1000);
                            }else{
                                flag=false;
                                setTimeout(function(){
                                    var num1=parseInt(Math.random()*10);
                                    var num2=parseInt(Math.random()*10);
                                    var num3=parseInt(Math.random()*10);
                                    TextNum1=num1;//随机数
                                    TextNum2=num2;
                                    if(num1==num2&&num2==num3){
                                        num3=num3>5?parseInt(Math.random()*5):6+parseInt(Math.random()*4)
                                    }
                                    TextNum3=num3;
                                },1000);
                            }
                        }
                        ,error:function(){
                            alert("网络请求失败，请重新刷新页面");
                        }
                    });
                }else{
                    $(".co_tips_yq").removeClass("hidden");
                    $(".co_tips.co_tips_yq .my_link>div>p:eq(0)").text("分享你的邀请链接，邀请好友参与获得抽奖机会。");
                }
            }
        });
    })();
//浮窗
$(".q_f_icon").click(function() {
    var state = $(this).attr("show");
    if(state) {
        $(".q_float").animate({
            "right": "60px"
        }, 200);
        $("#bshare-custom, #q_back").animate({
            "right": "280px"
        }, 200);
        $(this).attr({
            "show": "",
            "class": "show"
        });
    } else {
        $(".q_float").animate({
            "right": "-213px"
        }, 200);
        $("#bshare-custom, #q_back").animate({
            "right": "40px"
        }, 200);
        $(this).attr({
            "show": "true",
            "class": "hide"
        });
    }
})

