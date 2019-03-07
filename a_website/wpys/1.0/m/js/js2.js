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
    var clickNumber = 0;
            $(".h_nav,.h_nav2").on("click", function(e) {
                e.stopPropagation();
                if(clickNumber % 2 == 0) {
                    $(".d_t_t").addClass("d_t_t_tran");
                    $(".d_t_m").addClass("d_t_m_tran");
                    $(".d_t_b").addClass("d_t_b_tran");
                    $(".top-list").stop().slideDown();
                } else {
                    $(".d_t_t").removeClass("d_t_t_tran");
                    $(".d_t_m").removeClass("d_t_m_tran");
                    $(".d_t_b").removeClass("d_t_b_tran");
                    $(".top-list").stop().slideUp();
                }
                clickNumber++;
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
    $(".wp_play").click(function(){
        $("#mask").show();
        $("#video_tck").show();
        var link_url = $(this).attr('rel');
        if(link_url){
            $("#iframe_btn").attr("src","/video/videosource.html?"+link_url);
        }
    })
    $(".close,#close").click(function(){
        $(".tck_yue").hide();
        $("#iframe_btn").attr("src",'');
        $("#video_tck").hide();
        $(".mask").hide();
    })

    // $('html').fitText(3);
    // $(".video_play").click(function(){
    //   $("#mask").show();
    // 	$("#video_tck").show();
    // 	var link_url = $(this).attr('rel');
    // 	if(link_url){
    // 		$("#iframe_btn").attr("src","/video/videosource.html?"+link_ur7.171875rem  // 	}
    // })
    $(".close,#close").click(function(){
        $(".tck_yue").hide();
        $("#iframe_btn").attr("src",'');
        $("#video_tck").hide();
        $(".mask").hide();
    })
    $(".tel_btn a").click(function(){
        var mobileObj = $('#phone');
        var phone = mobileObj.val();
        var my_takon = $("meta[name='csrf-token']").attr("content");
        if(checkMobile($(mobileObj))){
            $.post(
                '/site/savephone',
                {
                    phone:phone,
                    type:type,
                    cms_csrf: my_takon
                },
                function(data){
                    var data = eval('(' + data + ')');
                    if(data.status == 1){
                        $(".mask").show();
                        $(".tck_yue").show();
                    }else{
                        alert(data.msg);
                        return false;
                    }
                }
            );
        }
    });
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
     var u = navigator.userAgent,
                    app = navigator.appVersion;
                    // HLog.event("nba_txty_down");
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
       $('.h_order,.yy_btn').attr('href','https://itunes.apple.com/cn/app/id1318073121');
       // // $('.h_order,.js_down_wap_btn').addClass('ios-down');
       // $(".ios-down").css({"display":"block"});
       // $(".android-down").hide();
    }
    // if(isAndroid){
    //    // $('.h_order,.js_down_wap_btn').removeClass('ios-down');
    //    // $('.h_order,.js_down_wap_btn').addClass('android-down');
    //     $(".ios-down").hide();
    //     $(".android-down").css({"display":"block"});
    // }
    // $(".h_order.android-down,.js_down_wap_btn.android-down").on("click",function(e){
    //    e.stopPropagation();
    //    $(".order_phone").val("")
    //    $(".order_betro").show();
    //    $(".order_b_bg").show();
    //    windowHidden();
    // })
    // $(".h_order.ios-down,.js_down_wap_btn.ios-down").on("click",function(e){
    //    e.stopPropagation();
    //    $(".order_phone2").val("")
    //    $(".order_betro").show();
    //    $(".order_b_bg2").show();
    //    windowHidden();
    // })
    $(".order_b_f_input button").on("click",function(e){
        fgw_yy_wap();
        e.stopPropagation();
        if($(".order_phone").val().length!=11){
            alert("请输入正确的电话号码");
            return false;
        }else{
            var phone = $('#phone').val();
            var my_takon = $("meta[name='csrf-token']").attr("content");
            $.post('/site/savephone', {phone:phone, type:'android',cms_csrf: my_takon}, function(data){
                if(data.status == 1){
                    $(".mask").show();
                    $(".tck_yue").show();

                    $(".order_betro").hide();
                    $(".order_b_bg").hide();
                    $(".close").on("click",function(e){
                        e.stopPropagation();
                        $(".mask").hide();
                        $(".tck_yue").hide();
                        windowScroll();
                        fgw_yy_wap_success();
                    })
                }else{
                    alert(data.msg);
                    return false;
                }
            }, 'JSON');
        }
    });
    $(".order_b_f_input2 .email_yy").on("click",function(e){
        e.stopPropagation();
        fgw_yy_wap();
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
            $.post(url, {phone:phone,email:email, type:'ios',cms_csrf: my_takon}, function(data){
                if(data.status == 0){
                    $(".order_betro").hide();
                    $(".order_b_bg2").hide();
                    alert('预约成功');
                    fgw_yy_wap_success();
                }else{
                    alert(data.msg);
                    return false;
                    $(".order_betro").hide();
                    $(".order_b_bg2").hide();
                }
            }, 'JSON');
        }
    });
    $(".order_b_close").on("click",function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".order_b_bg").hide();
        windowScroll();
    });
    $(".order_b_close2").on("click",function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".order_b_bg2").hide();
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
    // function changeBtn(str){
    //     $(".h_order").text(str);
    // };

    // changeBtn("游戏下载");


    // // 设备类型判断
    // function change(){
    //     var u = navigator.userAgent,
    //         app = navigator.appVersion;
    //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    //     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     if(isIOS) {
    //         $(".h_order,.js_down_wap_btn").removeClass("js_wap_down");
    //         $(".h_order,.js_down_wap_btn").attr("href", "https://www.taptap.com/app/85889");
    //     }
    //     if(isAndroid) {
    //         $(".h_order,.js_down_wap_btn").addClass("js_wap_down");
    //         $(".h_order,.js_down_wap_btn").attr("href", "javascript:;");
    //     }
    // }
    // change();

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
