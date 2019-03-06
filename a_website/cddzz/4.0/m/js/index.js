var code_url = "/commonMethod/get-verify";
var yy_url = "/commonMethod/yuyue";

//游戏下载弹框显示
$(".top-down .down-top").click(function() {
    $(this).parent().find(".top-down-main").slideDown();
    $(this).hide();
    $(".top-down .down-up").show();
    //menu弹框收起
    $(".top-menu-main").slideUp();
    $(".top-menu .menu-up").hide();
    $(".top-menu .menu-top").show();
});
$(".top-down .down-up").click(function() {
    $(this).parent().find(".top-down-main").slideUp();
    $(this).hide();
    $(".top-down .down-top").show();
});
//menu弹框显示
$(".top-menu .menu-top").click(function() {
    $(this).parent().find(".top-menu-main").slideDown();
    $(this).hide();
    $(".top-menu .menu-up").show();
    //游戏下载弹框收起
    $(".top-down-main").slideUp();
    $(".top-down .down-up").hide();
    $(".top-down .down-top").show();
});
$(".top-menu .menu-up").click(function() {
    $(this).parent().find(".top-menu-main").slideUp();
    $(this).hide();
    $(".top-menu .menu-top").show();
});
//游戏弹框点击ios
// $(".top-down-main .yue2").click(function(){
//     $(".top-down-main").slideUp();
//     $(".top-down .down-up").hide();
//     $(".top-down .down-top").show();
// });
$('#mask-close').click(function () {
    $('.mask').hide();
})
$('#mask2-close').click(function () {
    $('.mask2').hide();
})
// $('.yue').click(function () {
//     $('.mask').show();
//     // link();
// })
$('.yue2').click(function () {
    $('.mask2').show();
})
$('#mask-yue').click(function () {
    $('.mask').hide();
    $('.mask2').show();
})
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    autoplay:2000,
    loop:true
});

$(".news-title ul li").on("click" , function (){
    var index = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".news-main ul").eq(index).addClass("active").siblings().removeClass("active");
});

var srf = $('meta[name="csrf-token"]').attr('content');
var countdown = 60;
//倒计时
function sendemail() {
    var obj = $("#yanCode-box");
    settime(obj);
}
//滚动
function link() {
    console.log(1);
    $(".mask").animate({
        scrollTop: 800
    }, {
            duration: 1000,
            easing: "swing"
        });
        return false;
}
function settime(obj) { //发送验证码倒计时
    if(countdown == 0) {
        obj.attr('disabled', false);
        obj.text("获取验证码");
        countdown = 60;
        return;
    } else {
        obj.attr('disabled', true);
        obj.text("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function() {
        settime(obj);
    }, 1000)
}
//获取预约百分比
function getPercent(number) {
    var percent = parseFloat((parseInt(number) / 10000).toFixed(2));
    if(number >= 100000) {
        $("#line-img").find('li').eq(0).addClass("active");
    }
    if(number >= 400000) {
        $("#line-img").find('li').eq(1).addClass("active");
    }
    if(number >= 700000) {
        $("#line-img").find('li').eq(2).addClass("active");
    }
    if(number >= 1000000) {
        $("#line-img").find('li').eq(3).addClass("active");
    }
    percent = percent>100?97:percent;
    return percent;
};
function Init() {
    $.get("/commonMethod/captcha.html?refresh=1", {}, function(data) {
        $("#img-code-box").attr("src", data.url);
    }, 'json');
}
$("#img-code-box").click(function() {
    Init();
});
$("#yanCode-box").click(function() {
    var phone = $("#phone").val();
    var img_code = $("#img-code").val();
    if(phone == "" || phone == undefined) {
        alert("手机号不能为空");
        return;
    }
    if(phone.length != 11) {
        alert("手机号不正确");
        return;
    }
    if(img_code == "" || img_code == undefined) {
        alert("图片验证码不能为空");
        return;
    }
    $.post(code_url, {
        "captcha": img_code,
        "phone": phone,
        "type": 1,
        "device_type": "ios",
        "cms_csrf": srf
    }, function(data) {
        if(data.status == 0) {
            sendemail();
        } else {
            Init();
            alert(data.msg);
        }
    }, "json");
});
$("#mask2-yue").click(function() {
    var phone = $("#phone").val();
    var img_code = $("#img-code").val();
    var yanCode = $("#yanCode").val();
    if(phone == "" || phone == undefined) {
        alert("手机号不能为空");
        return;
    }
    if(phone.length != 11) {
        alert("手机号不正确");
        return
    }
    if(img_code == "" || img_code == undefined) {
        alert("图片验证码不能为空");
        return
    }
    $.post(yy_url, {
        "yzm": yanCode,
        "phone": phone,
        "type": 1,
        "cms_csrf": srf
    }, function(data) {
        if(data.status == 0) {
            alert("恭喜您预约成功~");
            $("#phone").val('');
            $("#img-code").val('');
            $("#yanCode").val('');
            $(".mask2").hide();
        } else {
            alert(data.msg);
        }
    }, "json");
});
$(function () {
    Init();
    if($('#user_all').text()){
        var num = parseInt($('#user_all').text());
        var height = getPercent(num) + '%';
        $('.line-color').css({
            'height': height
        })
    }
    $('#weixin-button').click(function () {
        $('.wechat').show();
    })
    $('.wechat').click(function () {
        setTimeout(function () {
            $('.wechat').hide();
        },300)
    });
})