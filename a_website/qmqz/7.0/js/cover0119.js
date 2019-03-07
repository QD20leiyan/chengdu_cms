var srf = $('meta[name="csrf-token"]').attr('content');
var login_url='/newyear/get-user-info.html';//判断用户是否登录
var login_url1='/newyear/login.html';//登录
var verify_url='/common/get-login-verify.html';//登录发送验证码
var lottery_url='/newyear/lottery.html';//抽奖
var out_url='/newyear/logout.html';//注销登录
var baseurl="";
var is_list=false;
var prize1={
    '506':{name:"金鸡满堂",img:"hm-jp-img01.png",clas:"lottery-unit-0"}
    ,'507':{name:"贪睡熊猫帽子+贪玩熊猫背包",img:"hm-jp-img02.png",clas:"lottery-unit-1"}
    ,'508':{name:"英雄之翼（3天）+手枪弹匣（3天）+强化点*88W",img:"hm-jp-img03.png",clas:"lottery-unit-2"}
    ,'509':{name:"雪花挂饰",img:"hm-jp-img04.png",clas:"lottery-unit-7"}
    ,'510':{name:"死亡骑士碎片*2+惩戒骑士碎片*2",img:"hm-jp-img06.png",clas:"lottery-unit-3"}
    ,'0':{name:"谢谢参与"}
    ,'511':{name:"强化点10W+荣誉5000",img:"hm-jp-img08.png",clas:"lottery-unit-5"}
    ,'512':{name:"强化点*8W",img:"hm-jp-img09.png",clas:"lottery-unit-4"}
}
//手机类型判断
var u = navigator.userAgent,
    app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
//判断用户是否登录
function is_login(){
    $.ajax({
        'url':login_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.count').text(data.data.residue_num);
                $('.count_all').text(data.data.total_num);
                $('.user_phone').text(data.data.phone);
                if(data.data.gift_log.length>0){
                    is_list=true;
                    $('.table_list').empty();
                    var result = '';
                    for(var i = 0; i < data.data.gift_log.length; i++) {
                        var clas=(prize1[data.data.gift_log[i].gift_id+''].clas||"");
                        if(data.data.gift_log[i].gift_id!==0){
                            $("."+clas).addClass("get");
                        }
                        //var src=baseurl+(prize1[data.data.gift_log[i].gift_id+''].img||"");
                        var name=(prize1[data.data.gift_log[i].gift_id+''].name||"");
                        result += "<p class='table_info'><span>"+name+"</span><span class='table_code'>"+data.data.gift_log[i].code+"</span><span class='copy' data-clipboard-text='"+data.data.gift_log[i].code+"'>[ 复制 ]</span></p>";
                    }
                    $('.table_list').append(result);
                }else{
                    is_list=false;
                }

            }else{}
        }
    });
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
    }hideErr(0);
    if(co_codenum1 == "" || co_codenum1 == undefined) {
        showErr(2, "验证码不能为空哦");
        return;
    }hideErr(2);
    $.ajax({
        'url':login_url1,
        'data':{'phone':my_phone,'yzm':co_codenum1,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                alert("登陆成功");
                $(".co_tips_login").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.count').text(data.data.residue_num);
                $('.count_all').text(data.data.total_num);
                $('.user_phone').text(data.data.phone);
                if(data.data.gift_log.length>0){
                    is_list=true;
                    $('.table_list').empty();
                    var result = '';
                    for(var i = 0; i < data.data.gift_log.length; i++) {
                        var clas=(prize1[data.data.gift_log[i].gift_id+''].clas||"");
                        if(data.data.gift_log[i].gift_id!==0){
                            $("."+clas).addClass("get");
                        }
                        //var src=baseurl+(1[data.data.gift_log[i].gift_id+''].img||"");
                        var name=(prize1[data.data.gift_log[i].gift_id+''].name||"");
                        result += "<p class='table_info'><span>"+name+"</span><span class='table_code'>"+data.data.gift_log[i].code+"</span><span class='copy' data-clipboard-text='"+data.data.gift_log[i].code+"'>[ 复制 ]</span></p>";
                    }
                    $('.table_list').append(result);
                }else{
                    is_list=false;
                }
            }else{
                showErr(2, data.msg);
                $(".co_captcha").trigger("click");
            }
        }
    });
}
//初始化
$(function(){
    //获取图片基础地址
    baseurl=$(".i_main").data("src");
    yx_getcaptcha(".co_captcha",".co_tips_login");
    pc_cover();
    is_login();
    //轮播
    var swiper02 = new Swiper('.swiper-container2',{
        pagination: '.swiper-pagination2',
        paginationClickable: true,
        slidesPerView: 1,
        centeredSlides: false,
        loop:true,
        autoplay:4000,
        autoplayDisableOnInteraction: false,
        prevButton:'.swiper-button-prev2',
        nextButton:'.swiper-button-next2',
    });
    var swiper3 = new Swiper('#swiper3', {
        prevButton:'.swiper-button-prev3',
        nextButton:'.swiper-button-next3',
        slidesPerView:6,
        spaceBetween : 48,
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
$(".co_tips_close,.co_tips_surebtn").click(function(){
    $(".co_tips").addClass("hidden");
    $('.co_tips input').val("");
    $(".co_error").removeClass("co_err_show");
});
//登录弹框显示
$(".co_loginbtn").click(function(){
    $(".co_tips_login").removeClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
    var my_phone = $(this).closest(".co_tips").find(".co_username").val();
    var captcha =  $(this).closest(".co_tips").find(".captcha").val();
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
    $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
        if(data.status == 0){
            $(".co_codebtn1").css("pointer-events","none");
            page_djs($(".co_codebtn1"),function(){
                $(".co_codebtn1").css("pointer-events","auto");
            });
        }else{
            alert(data.msg);
            $(".co_captcha").trigger("click");
        }
    }, 'json');
});
//点击登陆
$(".co_tips_loginbtn").click(function(){
    get_login();
});
//中奖纪录弹框显示
$(".check_ward").click(function(){
    if($(".co_after.hidden").length>0){
        $(".co_tips_login").removeClass("hidden");
    }else{
        if(is_list==true){
            $(".co_tips_record").removeClass("hidden");
        }else{
            $(".co_tips.co_tips_no .tips_txt").text("您还没有中奖记录哦~");
            $(".co_tips_no").removeClass("hidden");
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
                $('.count').text("0");
                $('.count_all').text("0");
                $('.user_phone').text("");
                is_list=false;
                $('.table_list').empty();
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

//复制
var clipboard=new Clipboard('.copy');
clipboard.on('success', function(e) {
    console.log(e);
    alert("已复制");
});
//new Clipboard('.copy');
//$(".copy").click(function() {
//    alert("已复制");
//});


//抽奖
$(document).ready(function(){
    var lottery={
        index:-1,	//当前转动到哪个位置，起点位置
        count:0,	//总共有多少个位置
        timer:0,	//setTimeout的ID，用clearTimeout清除
        speed:20,	//初始转动速度
        times:0,	//转动次数
        cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize:-1,	//中奖位置
        init:function(id){
            if ($("#"+id).find(".lottery-unit").length>0) {
                $lottery = $("#"+id);
                $units = $lottery.find(".lottery-unit");
                this.obj = $lottery;
                this.count = $units.length;
                $lottery.find(".lottery-unit-"+this.index).addClass("active");
            };
        },
        roll:function(){
            var index = this.index;
            var count = this.count;
            var lottery = this.obj;
            $(lottery).find(".lottery-unit-"+index).removeClass("active");
            index += 1;
            if (index>count-1) {
                index = 0;
            };
            $(lottery).find(".lottery-unit-"+index).addClass("active");
            this.index=index;
            return false;
        },
        stop:function(index){
            this.prize=index;
            return false;
        },
        end:function(){}
    };
    function roll(){
        lottery.times += 1;
        lottery.roll();
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
            clearTimeout(lottery.timer);
            lottery.prize=-1;
            lottery.times=0;
            click=false;
            lottery.end();
        }else{
            if (lottery.times<lottery.cycle) {
                lottery.speed -= 10;
            }else{
                if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                    lottery.speed += 110;
                }else{
                    lottery.speed += 20;
                }
            }
            if (lottery.speed<60) {
                lottery.speed=60;
            };
            lottery.timer = setTimeout(roll,lottery.speed);
        }
        return false;
    }
    var prizes={
        506:{i:0,prize:'金鸡满堂',img:"hm-jp-img01.png",clas:"lottery-unit-0"},
        507:{i:1,prize:'贪睡熊猫帽子+贪玩熊猫背包',img:"hm-jp-img02.png",clas:"lottery-unit-1"},
        508:{i:2,prize:'英雄之翼（3天）+手枪弹匣（3天）+强化点*88W',img:"hm-jp-img03.png",clas:"lottery-unit-2"},
        509:{i:7,prize:'雪花挂饰',img:"hm-jp-img04.png",clas:"lottery-unit-7"},
        510:{i:3,prize:'死亡骑士碎片*2+惩戒骑士碎片*2',img:"hm-jp-img06.png",clas:"lottery-unit-3"},
        0:{i:6,prize:'谢谢参与'},
        511:{i:5,prize:'强化点10W+荣誉5000',img:"hm-jp-img08.png",clas:"lottery-unit-5"},
        512:{i:4,prize:'强化点*8W',img:"hm-jp-img09.png",clas:"lottery-unit-4"},
    };
    var click=false;
    window.onload=function(){
        lottery.init('lottery');
        $(".begin_txt").click(function(){
            //抽奖前先判断是否登录
            if($(".co_after.hidden").length>0){
                //登录之前
                $(".co_tips_login").removeClass("hidden");
            }else{
                //登录之后就抽奖
                if(click){
                    return ;//正在抽奖，点击无效;
                }
                if($(".leave .count").text()>0){
                    lottery.speed=150;
                    roll();
                    click=true;
                    var lightInterval=setInterval(function(){
                        if(click){
                            $(".hm-cj").toggleClass("light");
                        }else{
                            clearInterval(lightInterval);
                        }
                    },100);
                    //请求数据；
                    setTimeout(function(){
                        $.ajax({
                            'url':lottery_url,
                            'data':{},
                            'type':'GET',
                            'dataType':'Json',
                            success:function(data){
                                click=false;
                                if(data.status==0){
                                    var now_count=$('.count').text();
                                    $('.count').text(now_count-1);
                                    //var id=Math.ceil(Math.random()*8);
                                    var id=data.data.gift_id;
                                    lottery.stop(prizes[id].i);
                                    //中奖弹框显示
                                    //var code=data.data.code;
                                    lottery.end=function(){
                                        if(id!==0){
                                            var lo_src=baseurl+(prizes[id].img||"");
                                            $(".co_tips_ward .tips_name").text(prizes[id].prize);
                                            $(".co_tips_ward .tis_img img").attr("src",lo_src);
                                            $(".co_tips_ward").removeClass("hidden");

                                            var result1 = '';
                                            result1 += "<p class='table_info'><span>"+prizes[id].prize+"</span><span class='table_code'>"+data.data.code+"</span><span class='copy' data-clipboard-text='"+data.data.code+"'>[ 复制 ]</span></p>";
                                            $('.table_list').append(result1);
                                            is_list=true;
                                        }else if(id==0){
                                            $(".co_tips_no .tips_txt").text("谢谢参与！");
                                            $(".co_tips_no").removeClass("hidden");
                                        }
                                    }
                                }else{
                                    //alert(data.msg);
                                    lottery.stop(prizes[0].i);
                                    $(".co_tips.co_tips_no .tips_txt").text(data.msg);
                                    $(".co_tips_no").removeClass("hidden");
                                    if(data.msg=="登陆超时，请重新登录！"){
                                        $(".co_before").removeClass("hidden");
                                        $(".co_after").addClass("hidden");
                                        $('.count').text("0");
                                        $('.count_all').text("0");
                                        $('.user_phone').text("");
                                        is_list=false;
                                        $('.table_list').empty();
                                        $(".co_codebtn1").html("获取验证码");
                                        $(".co_codebtn1").css("pointer-events","auto");
                                        if(djs_timer){
                                            clearInterval(djs_timer);
                                        }
                                    }
                                }
                            }
                        });
                    },3000);
                }else{
                    $(".co_tips.co_tips_no .tips_txt").text("抽奖次数已经用完！");
                    $(".co_tips_no").removeClass("hidden");
                }
            }
        });
    };
});

//滚动位置判断
function showani(){
    $(".ani:not(.show-ani)").each(function(i,n){
        var offset=$(n).offset();
        var scrollY=window.pageYOffset || document.documentElement.scrollTop;
        //console.log(offset);
        //console.log(scrollY);
        if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/4){
            $(n).addClass("show-ani");
        }
    })
}
$(window).scroll(function(e){
    showani();
});
showani();
