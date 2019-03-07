var all_url='/h5/hero/ajax-code.html'; //获取所有用户中奖记录
var verify_url='/h5/hero/ajax-sz-verify.html';//登录发送验证码
var login_url1='/h5/hero/ajax-sz-login.html';//登录
var code_url='/h5/hero/sz.html';//串码
var lottery_url='/h5/hero/ajax-draw.html';//抽奖
var srf = $('meta[name="csrf-token"]').attr('content');
var is_login=-1;
var is_lottery=0;
var is_show=0;
var is_detail=0;

//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/h5/hero/captcha.html?refresh=" + imgMarkIndex;
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
//中奖名单滚动效果
function autoScroll(obj) {
    $(obj).animate({
        marginTop: "-1.5rem"
    }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
}
//获取所有用户中奖记录
function getallcode(){
    $.ajax({
        'url':all_url,
        'data':{'type':"all"},
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0&& data.data.length>0){
                var result = '';
                for(var i = 0; i < data.data.length; i++) {
                    result += "<li><span>"+data.data[i].phone+"</span>获得<span>"+data.data[i].grade+"</span></li>";
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
        ,error:function(){
            alert("网络请求失败，请重新刷新页面");
        }
    });
}

//初始化
$(function(){
    //获取所有用户中奖记录
    getallcode();
    //滑动页面
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl: false,
        observer: true,
        observeParents: true,
        noSwiping: true,
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function (swiper) {
            if(swiper.activeIndex==1){

            }
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
        }
    });
    //弹框关闭
    $(".co_tips_close1").click(function(){
        $(".co_tips").addClass("hidden");
        $('.co_input input').val("");
        $(".co_error").removeClass("co_err_show");
    });
    //立即抽奖
    $(".btn1").click(function(){
        mySwiper.slideNext();
        $(".cd-m-floor.cd-image-float-floor").addClass("cd-float-show");
    });
    $(".cd-m-floor.cd-image-float-floor").click(function(){
        $(".cd-m-floor.cd-image-float-floor").removeClass("cd-float-show");
    });
    //奖品详情
    $(".btn2").click(function(){
        is_detail=1;
        is_login=$(".wrap").attr("data-state");
        $(".co_tips").addClass("hidden");
        if(is_login==0){
            mySwiper.slideTo(3);
        }else{
            $(".co_tips_login1").removeClass("hidden");
        }
    });
    //登录获取验证码
    $(".co_codebtn1").click(function(){
        var my_phone = $(".co_userphone").val();
        var captcha = $(".captcha").val();
        if(my_phone == "" || my_phone == undefined) {
            showErr(2, "手机号码不能为空哦");
            return;
        }else if(my_phone.length != 11){
            showErr(2, "手机号码不正确哦");
            return;
        }
        hideErr(2);
        $.post(verify_url,{ "phone":my_phone,"cms_csrf":srf },function(data){
            if(data.status == 0){
                $(".co_codebtn1").css("pointer-events","none");
                page_djs($(".co_codebtn1"),function(){
                    $(".co_codebtn1").css("pointer-events","auto");
                });
            }else{
                alert(data.msg);
            }
        }, 'json').error(function() { alert("网络请求失败，请重新刷新页面"); });
    });
    //登录请求
    $(".tipsbtn1").click(function(){
        var my_phone = $(".co_userphone").val();
        var co_codenum1=$('.co_codenum1').val();
        var name = $(".co_username").val();
        var qq = $(".co_userqq").val();
        if(my_phone == "" || my_phone == undefined) {
            showErr(2, "手机号码不能为空哦");
            return;
        }else if(my_phone.length != 11){
            showErr(2, "手机号码不正确哦");
            return;
        }
        hideErr(2);
        if(co_codenum1 == "" || co_codenum1 == undefined) {
            showErr(3, "验证码不能为空哦");
            return;
        }
        hideErr(3);
        $.ajax({
            'url':login_url1,
            'data':{'phone':my_phone,'verify':co_codenum1,"name":name,"qq":qq,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    alert("登录成功");
                    $(".co_tips").addClass("hidden");
                    $(".wrap").attr("data-state","0");
                    if(is_detail==1){
                        mySwiper.slideTo(3);
                    }else{
                        mySwiper.slideNext();
                    }
                }else{
                    showErr(3, data.msg);
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
    });
    //去抽奖
    $(".tipsbtn2").click(function(){
        var code =$.trim($(".co_code").val());
        if(code == "" || code == undefined) {
            showErr(4, "抽奖码不能为空哦");
            return;
        }
        hideErr(4);
        $.ajax({
            'url':code_url,
            'data':{'code':code,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    is_lottery=1;
                    $(".co_tips").addClass("hidden");
                }else{
                    showErr(4, data.msg);
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
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
                $(".lottery1,.lottery2").animate({"top":"-19.6875rem"},500,"linear");
                $(".lottery3").animate({"top":"-19.6875rem"},500,"linear", function () {
                    letGo();
                });
            }else{
                var toparr=['-0.9375rem','-4.0625rem','-7.1875rem','-10.3125rem','-13.4375rem','-16.5625rem','-19.6875rem'];
                var num1=toparr[TextNum1];//在这里随机
                var num2=toparr[TextNum2];
                var num3=toparr[TextNum3];
                $(".lottery1").animate({"top":num1},500,"linear");
                $(".lottery2").animate({"top":num2},900,"linear",function(){
                    //抽奖结束
                    TextNum1=undefined,TextNum2=undefined,TextNum3=undefined;

                    if(is_show==1){
                        $(".co_tips_ward").removeClass("hidden");
                    }else{
                        $(".co_tips_no").removeClass("hidden");
                    }
                    //抽奖结束停止闪灯
                    $(".page2 .light").removeClass('active');
                });
                $(".lottery3").animate({"top":num3},650,"linear");
            }
        }
        function reset(){
            $(".lottery1,.lottery2,.lottery3").css({"top":'-0.9375rem'});
        }

        $(".lottery_btn").click(function(){
            if(is_lottery==1){
                if(!flag){
                    flag=true;
                    reset();
                    //开始抽奖闪灯
                    $(".page2 .light").addClass('active');
                    letGo();
                    //数据请求
                    $.ajax({
                        'url':lottery_url,
                        'data':{},
                        'type':'POST',
                        'dataType':'Json',
                        success:function(data){
                            if(data.status==0||data.status==404){
                                flag=false;
                                setTimeout(function(){
                                    is_lottery=0;
                                    is_show=1;
                                    console.log(is_show)
                                    TextNum1=4;//随机数
                                    TextNum2=4;
                                    TextNum3=4;
                                    //$(".co_tips_ward").removeClass("hidden");
                                    $(".co_tips_ward .ward").addClass("hidden");
                                    $(".co_tips_ward .ward .ward_name").text(data.msg.grade);
                                    $(".co_tips_ward .ward .code_num").text(data.msg.code);
                                    if(data.msg.id==1){
                                        $(".co_tips_ward .ward1").removeClass("hidden");
                                    }else if(data.msg.id==2){
                                        $(".co_tips_ward .ward2").removeClass("hidden");
                                    }else if(data.msg.id==3){
                                        $(".co_tips_ward .ward3").removeClass("hidden");
                                    }else if(data.msg.id==4){
                                        $(".co_tips_ward .ward4").removeClass("hidden");
                                    }else if(data.msg.id==5){
                                        $(".co_tips_ward .ward5").removeClass("hidden");
                                    }
                                },1000);
                            }else{
                                flag=false;
                                setTimeout(function(){
                                    is_show=0;
                                    var num1=parseInt(Math.random()*6);
                                    var num2=parseInt(Math.random()*6);
                                    var num3=parseInt(Math.random()*6);
                                    TextNum1=num1;//随机数
                                    TextNum2=num2;
                                    if(num1==num2&&num2==num3){
                                        num3=num3>3?parseInt(Math.random()*3):4+parseInt(Math.random()*2)
                                    }
                                    TextNum3=num3;
                                    //$(".co_tips_no").removeClass("hidden");
                                },1000);
                            }
                        }
                        ,error:function(){
                            alert("网络请求失败，请重新刷新页面");
                        }
                    });
                }
            }else{
                $(".co_tips_login2").removeClass("hidden");
            }
        });
    })();
    //奖品列表查看
    $(".listbtn").click(function(){
        $(".co_tips_list1").removeClass("hidden");
    });
    //最后一页
    $(".tipsbtn3,.co_tips_close2").click(function(){
        is_login=$(".wrap").attr("data-state");
        $(".co_tips").addClass("hidden");
        if(is_login==0){
            mySwiper.slideNext();
        }else{
            $(".co_tips_login1").removeClass("hidden");
        }
    });
    //登陆的关闭按钮
    $(".co_tips_login1 .co_tips_close1").click(function(){
        if(is_detail==1){
            $(".co_tips_login1").addClass("hidden");
            is_detail=0;
        }else{
            mySwiper.slideNext();
        }
    });
    //查看中奖记录
    $(".record").click(function(){
        $('.co_tips_list2 .ward_list').empty();
        $.ajax({
            'url':all_url,
            'data':{'type':"me"},
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0&& data.data.length>0){
                    if( data.data.length>2){
                        $('.co_tips_list2 .ward_list').addClass("s_auto");
                    }
                    var result = '';
                    for(var i = 0; i < data.data.length; i++) {
                        result += "<div class='ward_con'><p class='name'>"+data.data[i].grade+"</p><p class='sm'>"+data.data[i].name+"</p><p class='sm is_show "+(data.data[i].code?"":"hidden")+"'>奖品：<span class='code'>"+(data.data[i].code||'')+"</span></p></div>";
                    }
                    $('.co_tips_list2 .ward_list').append(result);
                    $(".co_tips_list2").removeClass("hidden");
                }else{
                    $(".price_no1").removeClass("hidden");
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });


    });
    //继续抽奖
    $(".again").click(function(){
        $(".co_tips_login2").removeClass("hidden");
        mySwiper.slideTo(1);
        $(".co_code").val("");
        getallcode();
    });
    ////活动说明
    //$(".ac_sm").click(function(){
    //    $(".co_tips_list3").removeClass("hidden");
    //});
    $(".detail_btn").click(function(){
        mySwiper.slideNext();
    });
});
