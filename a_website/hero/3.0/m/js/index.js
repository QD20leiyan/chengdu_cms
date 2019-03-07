var num_url='/site/ajax-get-yuyue-num.html';
var verify_url2 ='/commonMethod/get-verify';
var order_url ='/commonMethod/yuyue';
var arm_url='/arms/ajax-get-arms.html';
var srf = $('meta[name="csrf-token"]').attr('content');
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
//预约人数分段
function numFormat(n){
    n=n+"";
    if(n.length>3){

        return numFormat(n.substring(0, n.length-3))+","+ n.substr(n.length-3,3);
    }else{
        return n;
    }
}
function getyynum(){
    //预约人数监控
    $.ajax({
        'url':num_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                $(".renshu span").text(numFormat(data.msg));
            }else{

            }
        }
    });
}
//初始化
$(function(){
    //初始获取预约人数
    getyynum();
    //每隔一分钟获取预约人数
    //setInterval(function() {
    //    getyynum();
    //}, 5000);
});
//新闻分类切换
$(".news .tab_box .tab_til ul li").click(function(){
    var index=$(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".news_infor").eq(index).show().siblings(".news_infor").hide();
    var tzid=$(this).attr("data-id");
    if(tzid==419){
        $(".more a").css("display","none");
        $(".more .tz1").css("display","inline-block");
    }else if(tzid==420){
        $(".more a").css("display","none");
        $(".more .tz2").css("display","inline-block");
    }else if(tzid==421){
        $(".more a").css("display","none");
        $(".more .tz3").css("display","inline-block");
    }else if(tzid==422){
        $(".more a").css("display","none");
        $(".more .tz4").css("display","inline-block");
    }else if(tzid==423){
        $(".more a").css("display","none");
        $(".more .tz5").css("display","inline-block");
    }
    //数据有误监测
    if($(".news_infor").eq(index).hasClass("no_datas")){
        $(".more").css("display","none");
        $(".no_data").css("display","block");
    }else{
        $(".more").css("display","block");
        $(".no_data").css("display","none");
    }
});
$(".news .tab_box .tab_til ul li:eq(0)").click();
//地图点击显示区域
$('.map-box').find('.small-tips').click(function () {
    $('.map-box').find('.small-tips').show();
    $(this).hide();
    $('.hover-tips').hide();
    $('.map').hide();
    $(this).next().show();
    $(this).parent().next().show();
});
//地图弹框显示
$(".hover-tips").click(function(){
    $(".user_tips").removeClass("hide");
    swiper02.update();
    swiper02.slideTo(Number($(this).attr('data-index')),10);
});
//地图弹框关闭
$(".user_tips .user_close").click(function(){
    $(".user_tips").addClass("hide");
});
//地图小图标跳动
var index=Math.floor(Math.random()*3);
$(".small-tips").removeClass('animate').eq(index).addClass('animate');
setInterval(function(){
    var index=Math.floor(Math.random()*7);
    $(".small-tips").removeClass('animate').eq(index).addClass('animate');
},3000);
//微信弹框显示
$(".wx").click(function(){
    $(".code_tips").removeClass("hide");
});
//微信弹框关闭
$(".code_tips .user_close").click(function(){
    $(".code_tips").addClass("hide");
});
//二级菜单下拉框
var clickNumber = 1;
$(".header_a a").click(function() {
    var game_url=$(".header_a").attr("data-url");
    var version=$(".header_a").attr("data-version");
    $(this).toggleClass('animated');
    if(clickNumber % 2 !== 0) {
        $(this).parent().siblings(".nav-content").slideDown();
        $(".header_a a img").attr("src",""+game_url+"images/im_select1.png"+version+"");
    } else {
        $(this).parent().siblings(".nav-content").slideUp();
        $(".header_a a img").attr("src",""+game_url+"images/im_select.png"+version+"");
    }
    clickNumber++;
});
//预约框显示
//$(".sl .yuyue").click(function(){
//    $(".c_login").removeClass("hide");
//});
//预约框关闭
$(".h_yuyue .close").click(function(){
    $(".c_login").hide();
    $('.phone').val("");
    $('.code').val("");
});
//手机型号选择
$(".xitong .xt_ra").on("click" , function (){
    $(this).addClass("on").siblings().removeClass("on");
    $('.code').val("");
});
////预约获取验证码
//$(".g_code").click(function(){
//    var my_phone1 = $(".phone").val();
//    var type_id=$(".xitong .xt_ra.on").attr("data-id");
//    if(type_id==1){
//        var type="ios";
//    }else if(type_id==2){
//        var type="android";
//    }
//    var srf = $('meta[name="csrf-token"]').attr('content');
//    if(my_phone1 == "" || my_phone1 == undefined) {
//        alert("手机号码不能为空哦");
//        return;
//    }
//    $.post(verify_url2,{ "phone":my_phone1,"type":7,"device_type":type,"cms_csrf":srf },function(data){
//        if(data.status == 0){
//            $(".g_code").css("pointer-events","none");
//            page_djs($(".g_code"),function(){
//                $(".g_code").css("pointer-events","auto");
//            });
//        }else{
//            alert(data.msg);
//        }
//    }, 'json');
//});
////预约提交
//$(".h_yuyue .o_denglu").click(function(){
//    var my_phone1 = $(".phone").val();
//    var co_codenum2= $('.code').val();
//    var type_id=$(".xitong .xt_ra.on").attr("data-id");
//    if(type_id==1){
//        var type="ios";
//    }else if(type_id==2){
//        var type="android";
//    }
//
//    var srf = $('meta[name="csrf-token"]').attr('content');
//    if(my_phone1 == "" || my_phone1 == undefined) {
//        alert("手机号码不能为空哦");
//        return;
//    }
//    if(co_codenum2 == "" || co_codenum2 == undefined) {
//        alert("验证码不能为空哦");
//        return;
//    }
//
//    $.post(order_url,{ "phone":my_phone1,"type":type,"yzm":co_codenum2,"device_type":7,'cms_csrf':srf},function(data){
//        if(data.status == 0){
//            alert('预约成功');
//            $(".c_login").addClass("hide");
//            $('.co_username1').val("");
//            $('.co_codenum2').val("");
//        }else{
//            alert(data.msg);
//        }
//    }, 'json');
//});

//下载按钮点击
//$(".js_wap_down").click(function() {
//	var u = navigator.userAgent,
//		app = navigator.appVersion;
//	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
//	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//	if(isIOS) {
//		$(this).attr("href", "javascript:;")
//		$(".c_login").show();
//	}
//});

//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/site/captcha?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
        $(".g_captcha img").attr("src", data.url);
    }, 'json');
}
$(".g_captcha").click(function(){
    load_captcha();
});
//预约获取验证码
$(".g_code").click(function(){
    var err = $('#phone-err');
    var err1 = $('#code-err1');
    var my_phone = $('.phone').val();
    var captcha = $(".captcha").val();
    var device_type="ios";
    var srf = $('meta[name="csrf-token"]').attr('content');
    if(my_phone == "" || my_phone == undefined) {
        $(err).addClass('active');
        $(err).text('手机号码不能为空哦');
        return;
    }else if(my_phone.length != 11){
        $(err).addClass('active');
        $(err).text("请输入正确的手机号码");
        return;
    }else{
        $(err).removeClass('active');
    }
    if(captcha == "" || captcha == undefined) {
        $(err1).addClass('active');
        $(err1).text('图片验证码不能为空哦');
        return;
    }else{
        $(err1).removeClass('active');
    }
    $.post(verify_url2,{ "phone":my_phone,"captcha":captcha,"type":1,"device_type":device_type,"cms_csrf":srf },function(data){
        if(data.status == 0){
            $(".g_code").css("pointer-events","none");
            load_captcha();
            page_djs($(".g_code"),function(){
                $(".g_code").css("pointer-events","auto");
            });
        }else{
            alert(data.msg);
            load_captcha();
        }
    }, 'json');
});
//预约成功
$(".o_denglu").click(function(){
    var err = $('#phone-err');
    var err1 = $('#code-err1');
    var err2 = $('#code-err2');
    var my_phone = $('.phone').val();
    var mark = $(".code").val();
    var device_type="ios";
    var srf = $('meta[name="csrf-token"]').attr('content');
    if(my_phone == "" || my_phone == undefined) {
        $(err).addClass('active');
        $(err).text('手机号码不能为空哦');
        return;
    }else if(my_phone.length != 11){
        $(err).addClass('active');
        $(err).text("请输入正确的手机号码");
        return;
    }else{
        $(err).removeClass('active');
    }
    if(mark == "" || mark == undefined) {
        $(err2).addClass('active');
        $(err2).text('手机验证码不能为空哦');
        return;
    }else{
        $(err2).removeClass('active');
    }

    $.post(order_url,{ "phone":my_phone,"yzm":mark,"type":device_type,"cms_csrf":srf },function(data){
        if(data.status == 0){
            alert(data.msg);
            $(".c_login ").hide();
            $('.phone').val("");
            $(".code").val("");
            $(".captcha").val("");
        }else{
            alert(data.msg);
        }
    }, 'json');
});



//武器大分类切换
$(".cont_wq .w_label_box>span").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    var id=$(this).attr("data-id");
    $.post(arm_url,{ "id":id,"cms_csrf":srf },function(data){
        swiper03.removeAllSlides()
        for(var i = 0; i < data.length; i++) {
            var result = '';
            result += "<div class='swiper-slide'><div class='w_imgbox'><img src="+data[i].content.wap_img+"></div>"+
            "<div class='w_txtbox' data-attribute='"+data[i].content.attribute+"'><p class='w_bigtitle'>"+data[i].title+"</p>";
            result +=data[i].sub_title?"<p class='w_subtitle'>"+data[i].sub_title+"</p>":"";
            result +="<div class='w_sign_box'>";
            if(data[i].content){
                for(var j = 0 in data[i].content.label) {
                    result +="<span>"+data[i].content.label[j]+"</span>";
                }
            }
            result +="</div><p class='w_info'>"+data[i].summary+"</p></div></div>";
            swiper03.appendSlide(result);
        }
        swiper03.updateSlidesSize();
        if(data[0]){
            //拿值
            var wq_barnumarr=(data[0].content.attribute||"").split(",");
            $(".w_blue").percircle({
                text:"射速",
                percent:wq_barnumarr[0]||"0",
                progressBarColor: "#3C6DEA"
            });
            $(".w_red").percircle({
                text:"伤害",
                percent: wq_barnumarr[1]||"0",
                progressBarColor: "#E80303"
            });
            $(".w_yellow").percircle({
                text:"弹夹",
                percent: wq_barnumarr[2]||"0",
                progressBarColor: "#F5A119"
            });
        }
    }, 'json');
});

// ==================================================这里是领取金币JS===================================================
var pageGold = {
    type: "ios",
    imgMarkIndex: 1,
    cms_csrf: $('meta[name="csrf-token"]').attr('content'),
    getMarkIng: false,
    getGoldIng: false,
};
//点击领取金币礼包
$(".header_gold_icon").click(function() {
    showGoldTc(0);
});
$(".tc_close").click(function() {
    closeGoldTc();
});
$(".tc1_type p").click(function() {
    $(".tc1_type p").removeClass("active");
    $(this).addClass("active");
    pageGold.type = $(this).attr("type");
});
//刷新图形验证码
$(".tc1_img_mark_box").click(function() {
    pageGold.imgMarkIndex++;
    getImgMark();
});
//点击获取验证码
$(".userMark1Box button").click(function() {
    var self = $(this);
    if(pageGold.getMarkIng) {
        return;
    }
    if(checkUserPhone() != true)
        return;
    if(checkImgMark() != true)
        return;

    pageGold.getMarkIng = true;

    $.post("/site/ajax-login-verify.html", {
        "phone": $(".userPhone").val(),
        "type": 2,
        "captcha": $(".userMark2").val(),
        "cms_csrf": pageGold.cms_csrf
    }, function(data) {
        console.log(data);
        pageGold.getMarkIng = false;
        var data = JSON.parse(data);
        if(data.status==101){
            $(".page_gold_code").html(data.msg);
            showGoldTc(1);
        } else if(data.status == 0) {
            countdownTime(self, 60, function() {
                self.html("获取验证码");
            })
        } else {
            showGoldErr(2, data.msg);
        }
    });
});

//点击领取金币
$(".tc1_sign").click(function() {
    var self = $(this);
    if(pageGold.getGoldIng) {
        return;
    }
    if(checkUserPhone() != true)
        return;
    if(checkMark() != true)
        return;

    pageGold.getGoldIng = true;

    $.post("/site/ajax-gold.html", {
        "phone": $(".userPhone").val(),
        "yzm": $(".userMark1").val(),
        "type": pageGold.type,
        "cms_csrf": pageGold.cms_csrf
    }, function(data) {
        pageGold.getGoldIng = false;
        var data = JSON.parse(data);
        console.log(data);

        if(data.status == 0) {
            $(".page_gold_code").html(data.msg);
            showGoldTc(1);
        } else {
            showGoldErr(2, data.msg);
        }

    });
});

//获取图形验证码
function getImgMark() {
    $.get("/site/captcha.html?refresh=" + pageGold.imgMarkIndex, {}, function(data) {
        console.log(data);
        $(".tc1_img_mark").attr("src", data.url);
    });
}
getImgMark();

//显示金币弹窗
function showGoldTc(index) {
    $(".l_tc > div").removeClass("tc_show").eq(index).addClass("tc_show");
    $(".l_tc").addClass("l_tc_show");
}
//关闭金币弹窗
function closeGoldTc() {
    $(".l_tc").removeClass("l_tc_show");
}
//显示错误信息
function showGoldErr(index, text) {
    $(".tc1_err").eq(index).html(text).addClass("tc1_err_show");
}
//去掉错误显示
function closeGoldErr(index) {
    $(".tc1_err").eq(index).removeClass("tc1_err_show");
}
//判断手机号码
function checkUserPhone() {
    var userPhone = $(".userPhone").val();
    if(userPhone == "" || userPhone == undefined || userPhone == null) {
        showGoldErr(0, "请输入手机号码");
        return;
    }
    if(userPhone.length != 11) {
        showGoldErr(0, "请输入正确的手机号码");
        return;
    }
    closeGoldErr(0);
    return true;
}
//判断验证码
function checkMark() {
    var userMark1 = $(".userMark1").val();
    if(userMark1 == "" || userMark1 == undefined || userMark1 == null) {
        showGoldErr(2, "请输入手机验证码");
        return;
    }
    closeGoldErr(2);
    return true;
}
//判断图形验证码
function checkImgMark() {
    var userMark2 = $(".userMark2").val();
    if(userMark2 == "" || userMark2 == undefined || userMark2 == null) {
        showGoldErr(1, "请输入图形验证码");
        return;
    }
    closeGoldErr(1);
    return true;
}
//倒计时
function countdownTime(ele, time, callBack) {
    var markBtn = ele;
    var time = parseInt(time);
    markBtn.html(time + "s");
    var timer = setInterval(function() {
        time = time - 1;
        if(time == 0) {
            markBtn.html("获取验证码");
            clearInterval(timer);
            if(callBack) {
                callBack()
            }
            return;
        }
        markBtn.html(time + "s");
    }, 1000);
}