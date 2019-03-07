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
    $(".video_close img").on("click", function(e){
        e.stopPropagation();
        $(".order_betro").hide();
        $(".video").hide();
        windowScroll()
    })
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
