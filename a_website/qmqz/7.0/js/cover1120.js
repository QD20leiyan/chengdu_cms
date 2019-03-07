var num_url = '/common/get-yuyue-count.html';//预约人数
var login_url='/site/get-user-info-relation.html';//判断用户是否登录
var login_url1='/site/relation-phone.html';//登录
var verify_url='/common/get-login-verify.html';//登录发送验证码
var out_url='/site/logout.html';//注销登录
var srf = $('meta[name="csrf-token"]').attr('content');
var invite_code="";

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
    var game_user = $(".game_user").val();
    var my_phone = $(".co_username").val();
    var co_codenum1 =  $(".co_codenum1").val();
    if(game_user == "" || game_user == undefined) {
        showErr(0, "游戏账号不能为空哦");
        return;
    }hideErr(0);
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
        'data':{'phone':my_phone,'zh':game_user,'yzm':co_codenum1,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            fgw_yy_pc_success();
            if(data.status==0){
                //alert("登陆成功");
                $(".forecast-suc").removeClass("hidden");
                $(".forecast-suc .tips_info").text("登陆成功");
                $(".order-to").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.order-to input').val("");
                $('.user_phone').text(my_phone);
            }else if(data.status==4){
                $(".forecast-suc").removeClass("hidden");
                $(".forecast-suc .tips_info").text(data.msg);
                $(".order-to").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.order-to input').val("");
                $('.user_phone').text(my_phone);
            }else{
                showErr(3, data.msg);
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
        'data':{'name': 'ca_total',"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                var w=964;
                var wl=data.msg;
                if(wl>100000){
                    wl=100000;
                }
                $(".probar .progressbar .pro_num em").text((wl/100000)*100);
                $(".probar .progress .po_bar").width(w*wl/100000+"px");
                $(".probar .progressbar .pro_num").css("left",w*wl/100000+"px");
            }else{}
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
                $(".order-to").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.order-to input').val("");
                $('.user_phone').text(data.data.phone);
            }else{}
        }
    });
}
//初始化
$(function(){
    yx_getcaptcha(".co_captcha",".order-to");
    pc_cover();
    //获取分享链接中的邀请码
    invite_code=getUrlParam('code');
    console.log(invite_code);
    is_login();
    ordernum();
    //轮播
    var swiper02 = new Swiper('.swiper-container2',{
        pagination: '.swiper-pagination2',
        paginationType : 'fraction',
        paginationClickable: true,
        effect : 'coverflow',
        slidesPerView: 3,
        centeredSlides: false,
        loop:true,
        autoplay:4000,
        autoplayDisableOnInteraction: false,
        prevButton:'.swiper-button-prev2',
        nextButton:'.swiper-button-next2',
        coverflow: {
            rotate:0,
            stretch:5,
            depth:50,
            modifier:1,
            slideShadows : false
        }
    });
    var swiper3 = new Swiper('#swiper3', {
        prevButton:'.swiper-button-prev3',
        nextButton:'.swiper-button-next3',
        slidesPerView: 4,
        spaceBetween : 14,
        onInit: function(swiper){
            $(swiper.slides).removeClass("active");
            var slide=$(swiper.slides[swiper.activeIndex]);
            slide.addClass("active");
            var src=slide.find(".w_sm_gun img").attr("data-src");
            var name=slide.find(".w_sm_gun img").attr("data-name");
            $(".w_imgbox .big_img").attr("src",src);
            $(".w_imgbox .big_name").text(name);
            $(".w_imgbox .big_img").removeClass("hidden");
        },
        onClick: function(swiper){
            $(swiper.slides).removeClass("active");
            var slide=$(swiper.slides[swiper.clickedIndex]);
            slide.addClass("active");
            var src=slide.find(".w_sm_gun img").attr("data-src");
            var name=slide.find(".w_sm_gun img").attr("data-name");
            $(".w_imgbox .big_img").attr("src",src);
            $(".w_imgbox .big_name").text(name);
            $(".w_imgbox .big_img").removeClass("hidden");
        }
    });
    $('.swiper-button-prev3').click(function(){
        var index=$("#swiper3 .swiper-slide.active").prev(".swiper-slide").index();
        if(index==-1){
            index=swiper3.slides.length-1;
        }
        var slide=$(swiper3.slides[index]);
        $(swiper3.slides).removeClass("active");
        slide.addClass("active");
        swiper3.slideTo(index);
        var src=slide.find(".w_sm_gun img").attr("data-src");
        var name=slide.find(".w_sm_gun img").attr("data-name");
        $(".w_imgbox .big_img").attr("src",src);
        $(".w_imgbox .big_name").text(name);
        $(".w_imgbox .big_img").removeClass("hidden");
    });
    $('.swiper-button-next3').click(function(){
        var index=$("#swiper3 .swiper-slide.active").next(".swiper-slide").index();
        var slide=$(swiper3.slides[index]||swiper3.slides[0]);
        $(swiper3.slides).removeClass("active");
        slide.addClass("active");
        swiper3.slideTo(index);
        var src=slide.find(".w_sm_gun img").attr("data-src");
        var name=slide.find(".w_sm_gun img").attr("data-name");
        $(".w_imgbox .big_img").attr("src",src);
        $(".w_imgbox .big_name").text(name);
        $(".w_imgbox .big_img").removeClass("hidden");
    });
});
//弹框关闭
$(".tips_close,.co_surebtn").click(function(){
    $(".co_tips").addClass("hidden");
    $('.order-to input').val("");
    $(".co_error").removeClass("co_err_show");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
    fgw_yy_pc();
    if($(".co_after.hidden").length>0){
        $(".order-to").removeClass("hidden");
    }else{
        $(".forecast-suc").removeClass("hidden");
        $(".forecast-suc .tips_info").text("您已登录，请勿重复登录哦~");
    }
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
//注销登录
$(".logout").click(function(){
    $.ajax({
        'url':out_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                //alert("注销成功");
                $(".forecast-suc").removeClass("hidden");
                $(".forecast-suc .tips_info").text("注销成功");
                $(".co_before").removeClass("hidden");
                $(".co_after").addClass("hidden");
                $('.user_phone').text("");
                $(".co_codebtn1").html("获取验证码");
                $(".co_codebtn1").css("pointer-events","auto");
                if(djs_timer){
                    clearInterval(djs_timer);
                }
            }else{
                alert(data.msg);
            }
        }
    });
});

//技能显示
$(".skill .seven").click(function(){
    ordernum();
    var title=$(this).find(".name").text();
    var subtitle=$(this).find(".intro").text();
    var img=$(this).attr("data-img");
    var src=$(this).attr("data-url");
    $(".skill .seven").removeClass("active");
    $(this).addClass("active");
    $(".big_seven .big_name").text(title);
    $(".big_seven .big_intro").text(subtitle);
    $(".big_seven .audio2").attr("data-url",src);
    $(".big_seven .audio2 .play-img>img").attr("src",img);
});
$(".skill .seven1").trigger("click");

//滚动位置判断
function showani(){
    $(".ani:not(.show-ani)").each(function(i,n){
        var offset=$(n).offset();
        var scrollY=window.pageYOffset || document.documentElement.scrollTop;
        console.log(offset)
        console.log(scrollY)
        if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/4){
            $(n).addClass("show-ani");
        }
    })
}
$(window).scroll(function(e){
    showani();
});
showani();
