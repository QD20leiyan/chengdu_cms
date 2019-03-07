$(function(){
    $('.nav_ul li a').click(function() {
        if($(this).attr('data-id') == 1) {
            $('#fullpage').fullpage.moveTo(1);
        } else if($(this).attr('data-id') == 2) {
            $('#fullpage').fullpage.moveTo(2);
        } else if($(this).attr('data-id') == 3) {
            $('#fullpage').fullpage.moveTo(3);
        }  else if($(this).attr('data-id') == 4) {
            $('#fullpage').fullpage.moveTo(4);
        }  else if($(this).attr('data-id') == 5) {
            $('#fullpage').fullpage.moveTo(5);
        } 
    });
$('.float li a').click(function() {
    $('.float li').removeClass("active");
    $(this).parent().addClass("active");
    if($(this).attr('data-id') == 1) {
        $('#fullpage').fullpage.moveTo(1);
    } else if($(this).attr('data-id') == 2) {
        $('#fullpage').fullpage.moveTo(2);
    } else if($(this).attr('data-id') == 3) {
        $('#fullpage').fullpage.moveTo(3);
    }  else if($(this).attr('data-id') == 4) {
        $('#fullpage').fullpage.moveTo(4);
    }  else if($(this).attr('data-id') == 5) {
        $('#fullpage').fullpage.moveTo(5);
    } 
});
        $(".to_top").click(function(){
            $('#fullpage').fullpage.moveTo(1);
        });
        $(".float ul").hover(function(){
           $(".float ul").css("width","100%");
           $(".float ul li span").css("display","block");
           },function(){
            $(".float ul").css("width","15%");
           $(".float ul li span").css("display","none");
        });
    //滚动位置判断
    function showani(){
        $(".ani:not(.show-ani)").each(function(i,n){
            var offset=$(n).offset();
            var scrollY=window.pageYOffset || document.documentElement.scrollTop;
            if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/2){
                $(n).addClass("show-ani");
            }
        })
    }
    $(window).scroll(function(e){
        showani();
    });
    showani();
    //»ñÈ¡Í¼Æ¬»ù´¡µØÖ·
    var baseurl=$(".i_main").data("src");
    var verify_url='/common/get-login-verify.html';//登录发送验证码
    var yy_url='/commonMethod/ajax-yuyue.html';//预约
    var srf = $('meta[name="csrf-token"]').attr('content');
    var is_focus=0;//input获取事件焦点
    var djs_timer=null;
    //图片验证码刷新
    var imgMarkIndex=1;
    function load_captcha(){
        imgMarkIndex++;
        var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
        $.get(imgUrl, {}, function(data) {
            $(".captcha").html(data.msg);
            $(".captcha p").hide();
        }, 'json');
    }
    //图片验证码刷新
    $(".captcha").click(function(){
        load_captcha();
        is_focus=2;
    });
    //图片验证码焦点获取显示验证码
    $(".login input").focus(function(){
        is_focus++;
        // $(".s_put.tupian").css("display","block");
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
    //·to_top
    $(".to_top").click(function(){
        var a;
        function back(){
            a=setInterval(go_top,5);
        }
        function go_top(){
            if(window.scrollY<=0){
                clearInterval(a);
            }else{
                scrollTo(0,window.scrollY-50);
            }
        }
        back();
    });
    //二维码
    $(".s_ul li:eq(0)").hover(function() {
        $(".fl_wx").stop().fadeIn();
    }, function() {
        $(".fl_wx").stop().fadeOut();
    });
    //手机类型选择
        $(".select_ul li").click(function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    
        //点击预约
        $(".liyy_btn,.btn_ljyy").click(function(){
            $(".tc").css("display","block");
        })
        $(".yy_btn").click(function() {
            var phone = $(".phone").val();
            var yzm = $(".yzm").val();
            var type = $(".select_ul li.active").attr("data-type");
            if(phone == "" || phone == undefined) {
                alert("请输入手机号");
                return;
            }
            if(phone.length != 11) {
                alert("手机号有误");
                return;
            }
            if(yzm == "" || yzm == undefined) {
                alert("请输入验证码");
                return;
            }
            $.post(yy_url, {
                "phone": phone,
                "yzm": yzm,
                "cms_csrf": srf,
                "type" : type,
                "email":"",
                "unique_phone":"1",
                "scene":"2",
            }, function(data) {
                if(data.status == 0) {
                    $(".tc").hide();
                     alert("预约成功");
                }else if(data.status == -1){
                    if(data.is_repeat==1){
                        $(".s_put input").val("");
                        load_captcha();
                        alert(data.msg);
                    }
                }else{
                    load_captcha();
                    alert(data.msg);
                }
            }, "json");
        });
        //登录获取验证码
$(".g_code").click(function(){
    var phone = $(".phone").val();
    var yzm = $(".yzm").val();
    var captcha = $(".t_yzm").val();
    var type = $(".select_ul li.active").attr("data-type");
    if(phone == "" || phone == undefined) {
                alert("请输入手机号");
                return;
   }
    if(phone.length != 11) {
         alert("手机号有误");
                return;
    }
    // if(captcha == "" || captcha == undefined) {
    //     alert( "验证码不能为空哦");
    //     return;
    // }
    $.post(verify_url,{ "phone":phone,"captcha":captcha,"type":type,"smsContent":"您正在进行《小小军团》3D新版登录","cms_csrf":srf },function(data){
        if(data.status == 0){
            $(".g_code").css("pointer-events","none");
            page_djs($(".g_code"),function(){
                $(".g_code").css("pointer-events","auto");
            });
        }else if(data.status == -2){
            alert(data.msg);
            load_captcha();
            $(".tupian").show();
        } else{
            alert(data.msg);
            load_captcha();
        }
    }, 'json');
});
$(".close").click(function(){
    $(".tc").hide();
})


});
        
