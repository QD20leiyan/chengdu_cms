$(function(){
    var mySwiper = new Swiper('.wp_swiper_b', {
        loop: true,
        autoplay: 2700,
        speed: 300,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction: false
    });
    var type = "";
    if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {//移动端
        //给页面下载链接赋值
        if ((/iphone|ipad/i.test(navigator.userAgent.toLowerCase()))) {
            type = 'ios';
        }else{
            type = 'android';
        }
    }
    // $(".wp_play").click(function(){
    //     $("#mask").show();
    //     $("#video_tck").show();
    //     var link_url = $(this).attr('rel');
    //     if(link_url){
    //         $("#iframe_btn").attr("src","/video/videosource.html?"+link_url);
    //     }
    // })

    // $('html').fitText(3);
    // $(".video_play").click(function(){
    //   $("#mask").show();
    // 	$("#video_tck").show();
    // 	var link_url = $(this).attr('rel');
    // 	if(link_url){
    // 		$("#iframe_btn").attr("src","/video/videosource.html?"+link_url);
    // 	}
    // })
    // $(".tel_btn a").click(function(){
    //     var mobileObj = $('#phone');
    //     var phone = mobileObj.val();
    //     var my_takon = $("meta[name='csrf-token']").attr("content");
    //     if(checkMobile($(mobileObj))){
    //         $.post(
    //             '/site/savephone',
    //             {
    //                 phone:phone,
    //                 scene:1,
    //                 type:type,
    //                 cms_csrf: my_takon
    //             },
    //             function(data){
    //                 var data = eval('(' + data + ')');
    //                 if(data.status == 1){
    //                     $(".mask").show();
    //                     $(".tck_yue").show();
    //                 }else{
    //                     alert(data.msg);
    //                     return false;
    //                 }
    //             }
    //         );
    //     }
    // });
    //微信点击显示二维码
    $(".ewm_box  .ico_wx").click(function(){
        $(".ewm_box  .ewm").toggle();
    });
    function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
    function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    };

    if (/iphone|ipad/i.test(navigator.userAgent.toLowerCase())) {
        $('.h_order,.js_down_wap_btn').removeClass('android-down');
        $('.h_order,.js_down_wap_btn').addClass('ios-down');
        $(".order_betro").show();
        $(".order_b_bg2").show();
        $(".order_b_bg").hide();
        windowHidden();
    }else{
        $('.h_order').removeClass('ios-down');
        $('.h_order').addClass('android-down');
        $(".order_betro").show();
        $(".order_b_bg").show();
        $(".order_b_bg2").hide();
        windowHidden();
    }
    $(".h_order.android-down").on("click",function(e){
        e.stopPropagation();
        $(".order_phone").val("")
        $(".order_betro").show();
        $(".order_b_bg").show();
        $(".order_b_bg2").hide();
        windowHidden();
    })
    $(".h_order.ios-down").on("click",function(e){
        e.stopPropagation();
        $(".order_phone2").val("")
        $(".order_betro").show();
        $(".order_b_bg2").show();
        $(".order_b_bg").hide();
        windowHidden();
    })
    $(".order_b_f_input button").on("click",function(e){
        e.stopPropagation();
        if($(".order_phone").val().length!=11){
            alert("请输入正确的电话号码");
            return false;
        }else{
            var phone = $('.order_phone').val();
            var my_takon = $("meta[name='csrf-token']").attr("content");
            $.post('/site/savephone', {phone:phone,type:'android',scene:1,cms_csrf: my_takon}, function(data){
                if(data.status == 1){
                    alert('预约成功');
                    $(".order_betro").hide();
                    $(".order_b_bg").hide();
                    $("input").val("");
                    windowScroll();
                }else{
                    alert(data.msg);
                    $(".order_betro").hide();
                    $(".order_b_bg").hide();
                    $("input").val("");
                    windowScroll();
                    return false;
                }
            }, 'JSON');
        }
    });
    $(".order_b_f_input2 .email_yy").on("click",function(e){
        e.stopPropagation();
        console.log(1);
        var url = '/commonMethod/ajax-yuyue-email.html';
        var phone = $('.order_phone2').val();
        var my_takon = $("meta[name='csrf-token']").attr("content");
        var email=$('.order_email').val();
        if($(".order_phone2").val().length!=11){
            alert("请输入正确的电话号码");
            return false;
        }else if(!isEmail(email)){
            alert("请输入正确的邮箱");
            return false;
        }else if(isEmail(email)){
            $.post(url, {phone:phone,email:email,type:'ios',scene:1,cms_csrf: my_takon}, function(data){
                if(data.status == 0){
                    alert('预约成功');
                    $(".order_betro").hide();
                    $(".order_b_bg2").hide();
                    $("input").val("");
                    windowScroll();
                }else{
                    alert(data.msg);
                    $(".order_betro").hide();
                    $(".order_b_bg2").hide();
                    $("input").val("");
                    windowScroll();
                    return false;
                }
            }, 'JSON');
        }
    });
    $(".order_b_close").on("click",function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".order_b_bg").hide();
        $("input").val("");
        windowScroll();
    });
    $(".order_b_close2").on("click",function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".order_b_bg2").hide();
        $("input").val("");
        windowScroll();
    });
//    $(".wp_play").on("click", function(e){
//        e.stopPropagation();
//        $(".order_betro").show();
//        $(".video").show();
//        windowHidden()
//    });
    $(".video_close img").on("click", function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".video").hide();
        windowScroll()
    })
    function changeBtn(str){
        $(".h_order").text(str);
    };

    changeBtn("立即预约");


    function checkMobile(mobileObj){
        var mobile = mobileObj.val();
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
        if (mobile.length == 0) {
            alert('请输入手机号码！');
            mobileObj.focus();
            return false;
        } else if (mobile.length != 11) {
            alert('请输入有效的手机号码！');
            mobileObj.focus();
            return false;
        } else if (!myreg.test(mobile)) {
            alert('请输入有效的手机号码！');
            mobileObj.focus();
            return false;
        }
        return true;
    }
    function isEmail(email) {
        var reg = /^[^@]+@[^@]+\.[^@]+$/;
        var temp = reg.test(email);
        return temp;
    }
});
