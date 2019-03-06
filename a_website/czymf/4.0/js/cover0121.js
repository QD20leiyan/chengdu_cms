var loginurl='/act/login.html';//用户登录
var init='/act/get-user-info.html';//用户初始化信息
var lq_gift='/act/get-register-gift.html';//领取礼包
var yq_hy='/act/get-invite-code.html';//邀请好友
var loginurl1='/act/praise.html';//点赞
var share_url="/act/share.html";//分享
var lottery_url='/act/lottery.html';//抽奖
var verify_url1 ='/common/get-login-verify.html';//验证码
var address_url = "/act/save-address.html";//地址
var zhuxiao_url='/act/logout.html';//注销
var srf=$('meta[name="csrf-token"]').attr('content');
//获取url邀请码
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if(result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}
var base = {
    isLogin: false,
    new_user: false,
    old_user: false,
    friends: false,
    userId: 0,
    sendMark: false,
    sendLogin: false,
    sendLoginOut: false,
    luckyNumber: 0,
    phone: 0,
    id: 0,
};
//session数据
var userJsonStr = sessionStorage.getItem('user');
var userEntity = JSON.parse(userJsonStr);
var user_zan = sessionStorage.getItem('zan');
isLogin();
var click_id=0;
var is_focus=0;//input获取事件焦点
var sy_cjnum=0;//剩余抽奖次数
var new_str = '';
        //初始化登录
        function isLogin() {
            if(userEntity == "null" || userEntity == null || userEntity == "") {
            } else {
            if(userEntity.status == 0) { 
                console.log(userEntity);
                console.log(222);
                base.isLogin = true;
                var invite_num=userEntity.data.user.me_invite_code;//我的邀请码
                $("#invited").html(invite_num);//我的邀请码
                $(".co_tips_yq .info span").html("http://sm.yingxiong.com?invite_code="+invite_num);
                var tel_phone=userEntity.data.user.phone;
                $(".user_login2 span").html(tel_phone);
                $(".user_login").parent().addClass("active");
                sy_cjnum=userEntity.data.user_data.residue_lottery_num;//剩余抽奖次数
                console.log(userEntity.data.user_data.invite_user.length);
                $("#ylyq_num").html(userEntity.data.user_data.invite_user.length);
                $("#lottery_sy").html(sy_cjnum);
                $("#ylyq_num").parent().show();
                $("#lottery_sy").parent().show();//剩余抽奖次数
                $(".yq2_invited").html(invite_num);
                if(userEntity.data.user_data.gift_pass_invite != "") {
                    new_str = '<li><span class="name_txt align-center-vertical">被邀请礼包</span><span  class="name_code align-center-vertical" id="tc7_copyText">' + userEntity.data.user_data.gift_pass_invite + '</span><span><a href="javascript:;" class="copy" id="tc7_copyBtn" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText">复制</a></span></li>';
                    new Clipboard('#tc7_copyBtn');
                } else {
                    new_str = '';
                }
            }else{
                base.isLogin = false;
            }
            }
            //点亮的人数
                if(user_zan == "null" || user_zan == null || user_zan == "") {
                    $("#yq_num").html("1");
                    } else{
                        console.log(user_zan);
                        $("#yq_num").html("0");
                    }
                    console.log(user_zan);
        }
//中奖名单滚动效果
function autoScroll(obj) {
    var length = $(obj).find("li").length;
    if(length > 1) {
        $(obj).find("ul").animate({
            marginTop: "-50px"
        }, 1000, function() {
            $(this).css({
                marginTop: "0px"
            }).find("li:first").appendTo(this);
        })
    }
};
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
      $(".co_captcha").html(data.msg);
    }, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
    load_captcha();
    is_focus=2;
});
//图片验证码焦点获取显示验证码
$(".co_form input").focus(function(){
    is_focus++;
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
//进度条显示
function initActive(num){
    var percent = parseFloat((parseInt(num) / 30000 + 5).toFixed(2));
    num=parseInt(num)>0?parseInt(num):0;//防止小于0
    if(num>=300000){
        $(".xianshi .first").addClass("active");
    }if(num>=1000000){
        $(".xianshi .second").addClass("active");
    }if(num>=3000000){
        $(".xianshi .third").addClass("active");
    }
    if(percent == 300000) {
        percent = 19;
    }
    if(percent == 1000000) {
        percent = 49;
    }
    if(percent == 3000000) {
        percent = 79
    }
    if(num > 50000 && num < 100000){
        percent = 6
    }
    if(num > 100000 && num < 200000){
        percent = 11
    }
    if(num > 200000 && num < 300000){
        percent = 16.5
    }
    if(num > 300000 && num < 400000){
        percent = 24
    }
    if(num > 400000 && num < 500000){
        percent = 29
    }
    if(num > 500000 && num < 600000){
        percent = 33
    }
    if(num > 600000 && num < 700000){
        percent = 37
    }

    if(num >700000 && num < 800000){
        percent = 40
    }
    if(num >800000 && num < 900000){
        percent = 43
    }
    if(num >900000 && num < 1000000){
        percent = 47
    } 
    if(num > 1000000 && num <1500000){
    	percent = 56.86
    }
    if(num > 1500000 && num < 2000000){
    	percent = 63.86
    }
    if(num > 2000000 && num < 2500000){
    	percent = 68.86
    }
    if(num > 2500000 && num < 3000000){
    	percent = 74.86
    }
    return percent;
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
//预约人数分段
function numFormat(n){
    n=n+"";
    if(n.length>3){

        return numFormat(n.substring(0, n.length-3))+","+ n.substr(n.length-3,3);
    }else{
        return n;
    }
}
//弹幕
// function danmu(){
//         var strArr=['黑蚀龙','鎏金龙','周年灯笼龟','限量蛋糕烟花','限量蛋糕烟花','周年限量法杖','我中奖啦！','好感动5555','创魔不倒，陪你到老',
//               '耶( •̀ ω •́ )y感动到爆','50元话费','10元花费','全服礼包','两只手接不过来','哇，还有全服奖励','报名！','生日快乐！','创魔生日快乐！','萌新求带','我是骨灰玩家','59级大佬路过','回归啦！','大佬我回来啦','首测玩家，叫哥','首发就玩啦','公测时下载的，现在还没卸载~','和老公一起玩，开森','游戏里奔现，有创魔真好','同学都在玩，我第一个入坑的嘿嘿嘿','和前桌一起建家园','同桌加了敌对部落==','为了部落！'];
//         var colorArr=['#ffba00', '#00f0ff', '#fff'];
//         var toparr2=[32,62,92,122,152,182,212,242,272,302,422,452,482,512,542,572,602];
//         var sizearr=[20,22,24,28,26];
//     function danmufun() {
//         var topindex = Math.floor(toparr2.length * Math.random());
//         var sizeindex = Math.floor(sizearr.length * Math.random());
//         var span = $('<span style="top:' + toparr2[topindex] + 'px;font-size:' + sizearr[sizeindex] + 'px;color:' + colorArr[Math.floor(colorArr.length * Math.random())] + ';">' + strArr[Math.floor(strArr.length * Math.random())] + '</span>');
//         toparr2.splice(topindex, 1);
//         span.appendTo(".danmu").animate({
//             left: -span.width() + "px"
//         }, 10000, 'linear', function() {
//             toparr2.push(parseFloat($(this).css('top')));
//             $(this).remove();
//         });

//         setTimeout(function() {
//             danmufun();
//         }, 1000 + Math.random() * 1000);
//     }
//     danmufun();
// }
       
        $('.float ul').find('li').click(function() {
            var parent = $(this).parent();
                if($(this).attr('data-id') == 1) {
                    $("html,body").animate({
                        scrollTop: 1180
                    }, 500);
                } else if($(this).attr('data-id') == 2) {
                    $("html,body").animate({
                        scrollTop: 2260
                    }, 500);
                    $(".float").removeClass("active");
                }else if($(this).attr('data-id') == 3) {
                    $("html,body").animate({
                        scrollTop: 3340
                    }, 500);
                    $(".float").removeClass("active");
                }else if($(this).attr('data-id') == 4) {
                    $("html,body").animate({
                        scrollTop: 4420
                    }, 500);
                    $(".float").removeClass("active");
                }else if($(this).attr('data-id') == 5) {
                    $("html,body").animate({
                        scrollTop: 5500
                    }, 500);
                    $(".float").removeClass("active");
                }
        })
        $(window).scroll(function() {
            var scroll = $(this).scrollTop();
            if(scroll >= 980 && scroll < 2060) {
                $('.float ul').find('li').removeClass('active');
                $('.float ul').find("li[data-id='1']").addClass('active');
            } else if(scroll >= 2060 && scroll < 3140) {
                $('.float ul').find('li').removeClass('active');
                $('.float ul').find("li[data-id='2']").addClass('active');
            }else if(scroll >= 3140 && scroll < 4220) {
                $('.float ul').find('li').removeClass('active');
                $('.float ul').find("li[data-id='3']").addClass('active');
            }else if(scroll >= 4220 && scroll < 5300) {
                $('.float ul').find('li').removeClass('active');
                $('.float ul').find("li[data-id='4']").addClass('active');
            }else if(scroll >= 5300) {
                $('.float ul').find('li').removeClass('active');
                $('.float ul').find("li[data-id='5']").addClass('active');
            }
        });
        $('.float').hover(function(){
            $(this).removeClass("active");
        },function(){
            $(this).addClass("active");
        })
        //下拉选择区服
            $(".s_input").click(function (){
                if(clickTap){
                    $(this).addClass("active");
                    $("#qu_ul").stop().slideDown();
                    $(".co_tips .co_con i").addClass("active");
                    clickTap = false;

                } else {
                    $(this).removeClass("active");
                    $(".co_tips .co_con i").removeClass("active");
                    $("#qu_ul").stop().slideUp();
                    clickTap = true;
                }
            });
//初始化

var dianzan_num=parseInt($("#dl_num").text());
$(function(){
    // getList();
    isLogin();
    // console.log(dianzan_num);
    $("#dl_num").html(numFormat(dianzan_num));
    // 预约人数进度条
    $(".jdt").css({
        width: initActive(dianzan_num) + "%"
    });
    // num_peo();
    // getPrice();
    // getFiveNumber();
    // danmu();
    var scroll = setInterval('autoScroll(".lhj_borlist")', 1500);
    $(".co_form .co_invite").val(getQueryString("invite_code"));
    console.log(getQueryString("invite_code"));
    var clickTap = true;
    $(".s_ul li:eq(0)").hover(function() {
        $(".fl_wx").stop().fadeIn();
    }, function() {
        $(".fl_wx").stop().fadeOut();
    });
    // 点亮祝福按钮
    $(".light_btn").click(function(){
        if($("#yq_num").text() > 0) {
            $.post("/act/praise.html", {}, function(data) {
                if(data.status == 0) {
                    $(".co_tips").addClass("hidden");
                    $(".co_tips_tsh p").html("点亮成功，记得明日再来哟~");
                    $("#yq_num").html("0");
                    $(".co_tips_tsh").removeClass("hidden");
                    user_zan = 1;
                    sessionStorage.setItem('zan', user_zan);
                }else if(data.status == 2){
                    sessionStorage.clear("user");
                    location.reload();
                }else {
                    user_zan = 1;
                    $("#yq_num").html("0");
                    sessionStorage.setItem('zan', user_zan);
                    $(".co_tips").addClass("hidden");
                    $(".co_tips_tsh p").html(data.msg);
                    $(".co_tips_tsh").removeClass("hidden");
                }
            }, "json");
            isLogin();
        }else{
            $(".co_tips").addClass("hidden");
            $(".co_tips_tsh p").html("您已经点亮过了哦~");
            $(".co_tips_tsh").removeClass("hidden");
        }  
    });


    //第三屏点击领取福利按
    $("#lqfl_btn").click(function() {
        if(base.isLogin) {
            $.post(lq_gift,{},function(data) {
                    if(data.status == 0) {
                        var big_gift="";
                        if(data.data.register_type==3){
                            $(".yincang").html("欢乐相伴礼包");
                                big_gift=$(".yincang").html();
                        } else if(data.data.register_type==2){
                            $(".yincang").html("忠实玩家礼包");
                                big_gift=$(".yincang").html();
                        } else if(data.data.register_type==1){
                            $(".yincang").html('骨灰级重聚礼包');
                            big_gift=$(".yincang").html();
                        }
                        userEntity.data.user_data.register_type = data.data.register_type;
                        userEntity.data.user_data.gift_register = data.data.code;
                        sessionStorage.setItem('user', JSON.stringify(userEntity));
                        var userJsonStr = sessionStorage.getItem('user');
                        userEntity = JSON.parse(userJsonStr);
                        console.log(userEntity);
                        console.log("123");
                        console.log(userEntity.data.user_data.register_type);
                         console.log(userEntity.data.user_data.gift_register);
                        $(".co_tips_gx2 h3 span").html(big_gift);
                        $(".co_tips_gx2 .code").html(data.data.code);
                        $(".co_tips").addClass("hidden");
                        $(".co_tips_gx2").removeClass("hidden");
                    }else if(data.status == 2) {
                        sessionStorage.clear("user");
                        location.reload();
                    } else {
                    $(".co_tips").addClass("hidden");
                    $(".co_tips_tsh p").html(data.msg);
                    $(".co_tips_tsh").removeClass("hidden");
                }
            }, "json");
        } else {
            $(".co_tips").addClass("hidden");
            $(".co_tips_login").removeClass("hidden");
        }
    });
     //第三屏点击查看我的奖励
        $("#fl_btn1").click(function() {
            if(base.isLogin){
                if(userEntity.status == 0) {
                    if(userEntity.data.user_data.register_type != "") {
                        var big_gift="";
                        // isLogin();
                            var html = "";
                            if(userEntity.data.user_data.register_type==3){
                                $(".yincang").html("欢乐相伴礼包");
                                big_gift=$(".yincang").html();
                            } else if(userEntity.data.user_data.register_type==2){
                                $(".yincang").html("忠实玩家礼包");
                                big_gift=$(".yincang").html();
                            } else if(userEntity.data.user_data.register_type==1){
                                $(".yincang").html('骨灰级重聚礼包');
                                big_gift=$(".yincang").html();
                            };
                            console.log(22);
                            console.log(big_gift);
                            html = '<li><span class="name_txt align-center-vertical">'+big_gift+'</span><span class="name_code align-center-vertical" id="tc7_copyText' + i +'">' + userEntity.data.user_data.gift_register + '</span><span><a href="javascript:;" class="copy" id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '" data-id="' + i + '">复制</a></span></li>';
                            $(".g_price2 ul").html(null).append(html);
                            //初始化复制插件
                            $(".g_price2 ul li a").each(function(i,n) {
                                 new Clipboard('#tc7_copyBtn' + $(n).attr("data-id"));
                            });
                            $(".co_tips_gift").removeClass("hidden");
                            console.log(userEntity.data.user_data.register_type);
                      }else{
                        $(".co_tips").addClass("hidden");
                        $(".co_tips_tsh p").html("您还没有领取礼包哦~");
                        $(".co_tips_tsh").removeClass("hidden")
                      }
                    } else {
                        $(".co_tips").addClass("hidden");
                        $(".co_tips_tsh p").html(data.msg);
                        $(".co_tips_tsh").removeClass("hidden");
                    }
            } else {
                $(".co_tips").addClass("hidden");
                $(".co_tips_login").removeClass("hidden");
            }
        });
    //第四屏邀请好友按钮
    $("#yqhy_btn").click(function() {
        if(base.isLogin) {
            $(".co_tips").addClass("hidden");
            $(".co_tips_yq1").removeClass("hidden");
        } else {
            $(".co_tips").addClass("hidden");
            $(".co_tips_login").removeClass("hidden");
        }
    });
    //第四屏点击查看我的奖励
        $("#p4_gift").click(function() {
            if(base.isLogin){
                $.post(yq_hy,{}, function(data) {
                    if(data.status == 0) {
                        var html = "";
                        var prize_name=""
                        if(data.data != "" && new_str == "") {
                            for(var i in data.data) {
                                if(data.data[i].gift_id == 474){
                                    prize_name="邀请2人礼包";
                                }else if(data.data[i].gift_id == 475){
                                    prize_name="邀请4人礼包";
                                }else if(data.data[i].gift_id == 476){
                                    prize_name="邀请6人礼包";
                                }
                                html += '<li><span class="name_txt align-center-vertical">'+ prize_name +'</span><span class="name_code align-center-vertical" id="tc47_copyText' + i +'">' + data.data[i].code + '</span><span><a href="javascript:;" class="copy" id="tc47_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc47_copyText' + i + '" data-id="' + i + '">复制</a></span></li>';
                            }
                            $(".g_price2 ul").html(null).append(html + new_str);
                            //初始化复制插件
                            $(".g_price2 ul li a").each(function(i,n) {
                                new Clipboard('#tc47_copyBtn' + $(n).attr("data-id"));
                            });
                            $(".co_tips_gift").removeClass("hidden");
                        }else if(data.data == "" && new_str != ""){
                            $(".g_price2 ul").html(null).append(new_str);
                            //初始化复制插件
                            $(".co_tips_gift").removeClass("hidden");
                        }else if(data.data != "" && new_str != ""){
                            var html = "";
                            for(var i in data.data) {
                                if(data.data[i].gift_id == 474){
                                    prize_name="邀请2人礼包";
                                }else if(data.data[i].gift_id == 475){
                                    prize_name="邀请4人礼包";
                                }else if(data.data[i].gift_id == 476){
                                    prize_name="邀请6人礼包";
                                }
                                html += '<li><span class="name_txt align-center-vertical">'+ prize_name +'</span><span class="name_code align-center-vertical" id="tc47_copyText' + i +'">' + data.data[i].code + '</span><span><a href="javascript:;" class="copy" id="tc47_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc47_copyText' + i + '" data-id="' + i + '">复制</a></span></li>';
                            }
                            $(".g_price2 ul").html(null).append(html + new_str);
                            //初始化复制插件
                            $(".g_price2 ul li a").each(function(i,n) {
                                new Clipboard('#tc47_copyBtn' + $(n).attr("data-id"));
                            });
                            $(".co_tips_gift").removeClass("hidden");
                        }else{
                            $(".co_tips").addClass("hidden");
                            $(".co_tips_tsh p").html("您还没有中奖纪录~");
                            $(".co_tips_tsh").removeClass("hidden");
                        }
                    } else {
                        $(".co_tips").addClass("hidden");
                        $(".co_tips_tsh p").html(data.msg);
                        $(".co_tips_tsh").removeClass("hidden");
                    }
                }, "json");
            } else {
                $(".co_tips").addClass("hidden");
                $(".co_tips_login").removeClass("hidden");
            }
        });
    //第五屏点击查看我的奖励
        $("#lhj_jl").click(function() {
            if(base.isLogin){
                if(userEntity.data.user_data.gift_lottery_prize != ""){
                        var html = "";
                        for(var i in userEntity.data.user_data.gift_lottery_prize){
                            html += '<li><span class="name_txt align-center-vertical" data-id="'+ i +'">'+ userEntity.data.user_data.gift_lottery_prize[i].prize +'</span><span class="name_code align-center-vertical" id="tc57_copyText' + i +'">' + userEntity.data.user_data.gift_lottery_prize[i].code + '</span><span><a href="javascript:;" class="copy" id="tc57_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc57_copyText' + i  + '" data-id="' + i + '">复制</a></span></li>';
                        }
                        $(".g_price2 ul").html(null).append(html);
                        //初始化复制插件
                        $(".g_price2 ul li a").each(function(i,n) {
                            new Clipboard('#tc57_copyBtn' + $(n).attr("data-id"));
                        });
                        $(".co_tips_gift").removeClass("hidden");
                }else{
                            $(".co_tips").addClass("hidden");
                            $(".co_tips_tsh p").html("您还没有中奖纪录~");
                            $(".co_tips_tsh").removeClass("hidden");
                }
            } else {
                $(".co_tips").addClass("hidden");
                $(".co_tips_login").removeClass("hidden");
            }
        });
        //第五屏点击抽奖start_lottery
        var flag = false;
        var TextNum1;
        var TextNum2;
        var TextNum3;
        function letGo() {
            reset();
        if(!TextNum3 && TextNum3 != 0) {
            $(".lottery1,.lottery2").animate({
                "top": "-1126px"
            }, 500, "linear");
            $(".lottery3").animate({
                "top": "-1126px"
            }, 500, "linear", function() {
                letGo();
            });
        } else {
            var toparr = ['8px', '-81px', '-167px', '-254px', '-341px', '-428px', '-515px', '-603px', '-689px', '-777px', '-863px', '-951px', '-1038px', '-1126px'];
            var num1 = toparr[TextNum1]; //在这里随机
            var num2 = toparr[TextNum2];
            var num3 = toparr[TextNum3];
            $(".lottery1").animate({
                "top": num1
            }, 500, "linear");
            $(".lottery2").animate({
                "top": num2
            }, 900, "linear", function() {
                //抽奖结束
                TextNum1 = undefined, TextNum2 = undefined, TextNum3 = undefined;
            });
            $(".lottery3").animate({
                "top": num3
            }, 650, "linear");
        }
    }
    function reset() {
        $(".lottery1,.lottery2,.lottery3").css({
            "top": '8px'
        });
    }
    //获取第五屏礼包剩余数量
    // function getFiveNumber() {
    //     $.post("/act/get-residue-num.html", {}, function(data) {
    //         if(data.status == 0) {
    //             $(".gidt_zs .li").each(function(i, n) {
    //                 for(var b in data.data) {
    //                     if($(n).attr("data-id") == b) {
    //                         $(n).html(data.data[b])
    //                     }
    //                 }
    //             });
    //         } else {
    //             $(".co_tips").addClass("hidden");
    //             $(".co_tips_tsh p").html(data.msg);
    //             $(".co_tips_tsh").removeClass("hidden");
    //         }
    //     }, "json");
    // }    
        $(".start_lottery").click(function() {
            if(base.isLogin) {
                if(!flag && $("#lottery_sy").text() > 0) {
                $(this).css("transform","translate(0, 8px)");
                $(this).css("twebkit-transform","translate(0, 8px)");
                flag = true;
                reset();
                letGo();
                //数据请求
                //              setTimeout(function() {
                //                  TextNum1 = 4; //随机数
                //                  TextNum2 = 4;
                //                  TextNum3 = 4;
                //              }, 2000)
                $.ajax({
                    'url': lottery_url,
                    'data': {},
                    'type': 'POST',
                    'dataType': 'Json',
                    success: function(data) {
                        if(data.status == 0) {
                            flag = false;
                            setTimeout(function() {
                                is_show = 1;
                                $("#lottery_sy").html(data.data.residue_lottery_num);
                                userEntity.data.user_data.residue_lottery_num = data.data.residue_lottery_num;
                                sessionStorage.setItem('user', JSON.stringify(userEntity));
                                var userJsonStr = sessionStorage.getItem('user');
                                userEntity = JSON.parse(userJsonStr);
                                console.log(data.data.residue_lottery_num);
                                if(data.data.gift_id == 0){
                                    is_show = 0;
                                    $(".co_tips").addClass("hidden");
                                    $(".co_tips_tsh p").html("和大奖擦肩而过>-< <br>努力努力，明天欧气，下次就会中大奖了！");
                                    $(".co_tips_tsh").removeClass("hidden");
                                    var num1 = parseInt(Math.random() * 6);
                                    var num2 = parseInt(Math.random() * 6);
                                    var num3 = parseInt(Math.random() * 6);
                                        TextNum1 = num1; //随机数
                                        TextNum2 = num2;
                                    if(num1 == num2 && num2 == num3) {
                                        num3 = num3 > 3 ? parseInt(Math.random() * 3) : 4 +      parseInt(Math.random() * 2)
                                    }
                                    TextNum3 = num3;
                                }else{
                                    if(data.data.gift_id == 477) {
                                        TextNum1 = 12;
                                        TextNum2 = 12;
                                        TextNum3 = 12; //兽皮5、珍珠奶茶10
                                        $(".co_tips_gx2 h3 span").html("兽皮5、珍珠奶茶10");
                                         $(".co_tips_gx2 .code").html(data.data.code);
                                        $(".co_tips.co_tips_gx2").removeClass("hidden");
                                    } else if(data.data.gift_id ==478) {
                                        TextNum1 = 0;
                                        TextNum2 = 0;
                                        TextNum3 = 0; //星星法杖
                                        $(".co_tips_gx2 h3 span").html("星星法杖");
                                         $(".co_tips_gx2 .code").html(data.data.code);
                                        $(".co_tips.co_tips_gx2").removeClass("hidden");
                                    } else if(data.data.gift_id == 479) {
                                        TextNum1 = 1;
                                        TextNum2 = 1;
                                        TextNum3 = 1; //金鱼昊昊
                                        $(".co_tips_gx2 h3 span").html("金鱼昊昊");
                                        $(".co_tips_gx2 .code").html(data.data.code);
                                        $(".co_tips.co_tips_gx2").removeClass("hidden");
                                } else if(data.data.gift_id == 480) {
                                    TextNum1 = 2;
                                    TextNum2 = 2;
                                    TextNum3 = 2; //雪狼王
                                    $(".co_tips_gx2 h3 span").html("雪狼王");
                                     $(".co_tips_gx2 .code").html(data.data.code);
                                    $(".co_tips.co_tips_gx2").removeClass("hidden");;
                                } else if(data.data.gift_id == 481) {
                                    TextNum1 = 3;
                                    TextNum2 = 3;
                                    TextNum3 = 3; //周年限量法杖
                                    $(".co_tips_gx2 h3 span").html("周年限量法杖");
                                     $(".co_tips_gx2 .code").html(data.data.code);
                                    $(".co_tips.co_tips_gx2").removeClass("hidden");
                                } else if(data.data.gift_id == 482) {
                                    TextNum1 = 4;
                                    TextNum2 = 4;
                                    TextNum3 = 4; //50元话费
                                    $(".co_tips_gx3 h3 span").html("50元话费");
                                    $(".co_tips.co_tips_gx3").removeClass("hidden");
                                } else if(data.data.gift_id == 483) {
                                    TextNum1 = 5;
                                    TextNum2 = 5;
                                    TextNum3 = 5; //10元话费
                                    $(".co_tips_gx3 h3 span").html("10元话费");
                                    $(".co_tips.co_tips_gx3").removeClass("hidden");
                                } else if(data.data.gift_id == 484) {
                                    TextNum1 = 6;
                                    TextNum2 = 6;
                                    TextNum3 = 6; //灯笼龟
                                    $(".co_tips_gx2 h3 span").html("灯笼龟");
                                     $(".co_tips_gx2 .code").html(data.data.code);
                                    $(".co_tips.co_tips_gx2").removeClass("hidden");
                                } else if(data.data.gift_id == 485) {
                                    TextNum1 = 7;
                                    TextNum2 = 7;
                                    TextNum3 = 7; //鎏金龙
                                    $(".co_tips_gx2 h3 span").html("鎏金龙");
                                     $(".co_tips_gx2 .code").html(data.data.code);
                                    $(".co_tips.co_tips_gx2").removeClass("hidden");
                                } else if(data.data.gift_id == 486) {
                                    TextNum1 = 8;
                                    TextNum2 = 8;
                                    TextNum3 = 8; //限量蛋糕烟花
                                    $(".co_tips_gx2 h3 span").html("限量蛋糕烟花");
                                    $(".co_tips_gx2 .code").html(data.data.code);
                                    $(".co_tips.co_tips_gx2").removeClass("hidden");
                                } else if(data.data.gift_id == 487) {
                                    TextNum1 = 9;
                                    TextNum2 = 9;
                                    TextNum3 = 9; //    限量蛋糕炸弹
                                    $(".co_tips_gx2 h3 span").html("限量蛋糕炸弹");
                                     $(".co_tips_gx2 .code").html(data.data.code);
                                    $(".co_tips.co_tips_gx2").removeClass("hidden");
                                }else if(data.data.gift_id == 488) {
                                    TextNum1 = 10;
                                    TextNum2 = 10;
                                    TextNum3 = 10; // IPad 2018年新款9.7英寸32G WLAN版 金色
                                    $(".co_tips_gx1 h3 span").html("IPad 2018年新款9.7英寸32G WLAN版 金色");
                                    $(".co_tips.co_tips_gx1").removeClass("hidden");
                                }else if(data.data.gift_id == 489) {
                                    TextNum1 = 11;
                                    TextNum2 = 11;
                                    TextNum3 = 11; //    SWITCH游戏机s欧版 红蓝主机
                                    $(".co_tips_gx1 h3 span").html("SWITCH游戏机s欧版 红蓝主机");
                                    $(".co_tips.co_tips_gx1").removeClass("hidden");
                                }
                                userEntity.data.user_data.gift_lottery_prize = data.data.gift_lottery_prize;
                                sessionStorage.setItem('user', JSON.stringify(userEntity));
                                isLogin();
                                }
                                $(".start_lottery").css("transform","translate(0, 0px)");
                                $(".start_lottery").css("twebkit-transform","translate(0, 0px)");
                            }, 1000);
                        }else if(data.status == 2){
                            sessionStorage.clear("user");
                            location.reload();
                        }   else {
                            flag = false;
                            setTimeout(function() {
                                is_show = 0;
                                var num1 = parseInt(Math.random() * 6);
                                var num2 = parseInt(Math.random() * 6);
                                var num3 = parseInt(Math.random() * 6);
                                TextNum1 = num1; //随机数
                                TextNum2 = num2;
                                if(num1 == num2 && num2 == num3) {
                                    num3 = num3 > 3 ? parseInt(Math.random() * 3) : 4 +      parseInt(Math.random() * 2)
                                }
                                TextNum3 = num3;
                                $(".co_tips").addClass("hidden");
                                $(".co_tips_tsh p").html(data.msg);
                                $(".co_tips_tsh").removeClass("hidden");
                            }, 1000);
                        }
                    },
                    error: function() {
                        alert("网络请求失败，请重新刷新页面");
                    }
                });
                } else {
                    $(".co_tips").addClass("hidden");
                    $(".co_tips_tsh p").html("您已经没有次数了");
                    $(".co_tips_tsh").removeClass("hidden");
                }
            }else{
                    $(".co_tips").addClass("hidden");
                    $(".co_tips_login").removeClass("hidden");
            }
        });
    //第五屏点击分享
    $(".lhj_share").click(function(){
        if(base.isLogin) {
            $.post("/act/share.html", {}, function(data) {
            if(data.status == 0) {
                $(".co_tips_yq2").removeClass("hidden");
                $("#lottery_sy").html(data.data.residule_lottery_num);
            } else {
                $(".co_tips_yq2").removeClass("hidden");
            }
            }, "json");
        }else{
            $(".co_tips").addClass("hidden");
            $(".co_tips_login").removeClass("hidden");
        }
    })
    //提交地址信息
    $(".add_submit").click(function(){
        var delivery_name=$(".co_tips_address .name_input").val();
        var delivery_postcode=$(".co_tips_address .qq_num").val();
        var delivery_phone=$(".co_tips_address .tel_num").val();
        var delivery_address=$(".co_tips_address .address").val();
        if(delivery_name == "" || delivery_name == undefined) {
            alert("请输入姓名");
            return;
        }
        if(delivery_postcode == "" || delivery_postcode == undefined) {
            alert("请输入邮编");
            return;
        }
        if(delivery_phone == "" || delivery_phone == undefined) {
            alert("手机号不能为空哦~");
            return;
        }
        if(delivery_phone.length != 11) {
            alert("手机号不正确");
            return;
        }
        if(delivery_address == "" || delivery_address == undefined) {
            alert("地址不能为空哦~");
            return;
        }
        $.ajax({
            'url':address_url,
            'data':{"delivery_name":delivery_name,"delivery_postcode":delivery_postcode,"delivery_phone":delivery_phone,"delivery_address":delivery_address,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    alert(data.msg);
                    $(".co_tips").addClass("hidden");
                }else{
                    $(".co_tips").addClass("hidden");
                    $(".co_tips_tsh p").html(data.msg);
                    $(".co_tips_tsh").removeClass("hidden");
                }
            }
        });
    })
    //注销
    $(".zhuxiao").click(function(){
        $.post("/act/logout.html", {}, function(data) {
        if(data.status == 0) {
            sessionStorage.clear("user");
            location.reload();
        } else {
            $(".co_tips").addClass("hidden");
            $(".co_tips_tsh p").html(data.msg);
            $(".co_tips_tsh").removeClass("hidden");
        }
    }, "json")
    })
});
        new Clipboard('#tc1_copyBtn');
        new Clipboard('#tc1_copyBtn');
        new Clipboard('#tc5_copyBtn');
        //点击填写地址按钮
        $(".address_btn").click(function(){
            $(".co_tips").addClass("hidden");
            $(".co_tips_address").removeClass("hidden");
        })
        //登录弹框关闭
        $(".co_tips_close").click(function (){
            $(this).parent().parent().addClass("hidden");   
        });
        // 点击登录弹窗
        $(".user_login1").click(function(){
            $(".co_tips").addClass("hidden");
            $(".co_tips_login").removeClass("hidden");
        }); 
        $("#rule1").click(function(){
            $(".co_tips").addClass("hidden");
            $(".co_tips.co_rule1").removeClass("hidden");
        }); 
        $("#rule2").click(function(){
            $(".co_tips").addClass("hidden");
            $(".co_tips.co_rule2").removeClass("hidden");
        });
        $("#rule3").click(function(){
            $(".co_tips").addClass("hidden");
            $(".co_tips.co_rule3").removeClass("hidden");
        });
        $("#rule4").click(function(){
            $(".co_tips").addClass("hidden");
            $(".co_tips.co_rule4").removeClass("hidden");
        });
        $(".sure_btn").click(function(){
            $(".co_tips").addClass("hidden");
        });
        $("body").on("click",".copy",function(){
            alert("已复制~");
        })
//登录获取验证码
$(".co_codebtn1").click(function(){
    var role_id=$(".co_form .co_id").val();
    var service_id = $('.qufu option:selected').attr("data-type");
    var phone = $(".co_form .co_username").val();
    var t_yzm = $(".co_form .captcha").val();
    var invited2 = $(".co_form .co_invite").val();
    if(role_id == "" || role_id == undefined) {
        alert("请输入角色名");
        return;
    }
    if(service_id == "请选择区服" || service_id == undefined) {
        alert("请选择区服");
        return;
    }
    if(phone == "" || phone == undefined) {
        alert("手机号不能为空");
        return;
    }
    if(phone.length != 11) {
        alert("手机号不正确");
        return;
    }
    if(t_yzm == "" || t_yzm == undefined) {
        alert("图形验证码不能为空");
        return;
    }
    $.post(verify_url1,{"phone":phone,"captcha":t_yzm,"cms_csrf":srf},function(data){
        if(data.status == 0){
            $(".co_codebtn1").css("pointer-events","none");
            page_djs($(".co_codebtn1"),function(){
                $(".co_codebtn1").css("pointer-events","auto");
            });
        }else{
            alert(data.msg);
            load_captcha();
        }
    },'json');
});
//登录请求
$(".co_tips_btn1").click(function(){
    var role_id=$(".co_form .co_id").val();
    var service_id = $('.qufu option:selected').attr("data-type");
    var phone = $(".co_form .co_username").val();
    var t_yzm = $(".co_form .captcha").val();
    var invited2 = $(".co_form .co_invite").val();
    var co_codenum1 = $(".co_form .co_codenum1").val();
    if(role_id == "" || role_id == undefined) {
        alert("请输入用角色名");
        return;
    }
    if(service_id == "请选择区服" || service_id == undefined) {
        alert("请选择区服");
        return;
    }
    if(phone == "" || phone == undefined) {
        alert("手机号不能为空");
        return;
    }
    if(phone.length != 11) {
        alert("手机号不正确");
        return;
    }
    if(co_codenum1 == "" || co_codenum1 == undefined) {
        alert("短信验证码不能为空");
        return;
    }
    $.ajax({
        'url':loginurl,
        'data':{"role_name":role_id,"server_id":service_id,"phone":phone,"invite_code":invited2,'yzm':co_codenum1,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
                // var invite_num=data.msg.invite_num;
                // if(!invite_num){
                //      invite_num=0;
                // }
                $(".co_tips_login").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                // $('.co_username').val("");
                // $('.co_codenum1').val("");
                $('.co_name').text(data.msg.user_phone);
                $('.co_yy_name span').text(data.msg.user_phone);
                // $('.co_peonum i').text(invite_num);
                // $('.co_code i').text(data.msg.me_invite_code);
                // $('.co_qr_code img').attr("src",data.msg.invite_img);
                // $('.co_after').attr("data-url",data.msg.share_url);
                // $('.co_invite_code').text(data.msg.me_invite_code);
                // if(click_id==1){
                //     $(".co_tips_order").removeClass("hidden");
                // }
                // console.log(base.id);
                //  console.log(22);
                //重新加载页面
                //location.reload();
                sessionStorage.setItem('user', JSON.stringify(data));
                var userJsonStr = sessionStorage.getItem('user');
                userEntity = JSON.parse(userJsonStr);
                isLogin();
            }else{
                $(".co_tips").addClass("hidden");
                $(".co_tips_tsh p").html(data.msg);
                $(".co_tips_tsh").removeClass("hidden");
                //alert(data.msg);
            }
        }
    });
});
//确定关闭弹窗
$(".co_tips.co_rule .copy_btn").click(function(){
    $(".co_tips.co_rule").addClass("hidden");
})



