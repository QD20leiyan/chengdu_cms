        
        var bRotate = false;
        var giftNum = [
                {
                    "id": "413",
                    "name": "感恩节手枪(永久)",
                    "img":".img4"
                },
                {
                    "id": "414",
                    "name": "黑暗骑士碎片*1",
                    "img":".img2"
                },
                {
                    "id": "415",
                    "name": "强化点*50000",
                    "img":".img1"
                },
                {
                    "id": "416",
                    "name": "射手座头像*1",
                    "img":".img3"
                },
                {
                    "id": "417",
                    "name": "钻石*20",
                    "img":".img6"
                },
                {
                    "id": "418",
                    "name": "英雄之心(10天)",
                    "img":".img5"
                },
                {
                    "id": "0",
                    "name": "谢谢参与",
                    "img":""
                }
            ];
        var rotateTimeOut = function() {
        $('#rotate').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function() {
                alert('网络超时，请检查您的网络设置！');
            }
        });
        };
        var rotateFn = function(awards, angles, txt, num) {
            bRotate = !bRotate;
            $('#rotate').stopRotate();
            $('#rotate').rotate({
                angle: 0,
                animateTo: angles + 1777.5,
                duration: 3000,
                callback: function() {
                    if(num == 0) {
                        $(".code_tips").removeClass("hidden");
                    }
                    if(num == 1) {
                         alert("谢谢参与");
                    }
                    bRotate = !bRotate;
                }
            })
        };
        function md_ym_sy1(){
    var num = 0;
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push("dfzj_inv_selfpage1");
                clearInterval(timer);
            }
        }, 500);
}
    $(function(){
        var h5_wx=$(".h5_wx").html();
        var h5_data=$(".h5_data").html();
        var click_bnt = true;
        var srf = $('meta[name="csrf-token"]').attr('content');
        var  play1=true;
        var lottery_num=0;
        var lottery_usenum=0;
        var lottery_sy=0;
        var  h5_wx=$(".h5_wx").html();
        var  h5_data=$(".h5_data").html();
        var lottery_url="/ca/king/lottery.html"+ h5_jk_url;//转盘
        var num_url="/ca/king/get-user-info.html"+ h5_jk_url;//获取用户信息
        var text_url="/ca/king/help.html"+ h5_jk_url;//助力
        var invite_code="";
        var gift_id_code="";
        var info_code="";
        var invite_code = "";
        var openid="";
        var username="";
        var zm_nym="";
        function md_ym_sy1(){
    var num = 0;
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push("ca_king_selfpage1");
                clearInterval(timer);
            }
        }, 500);
}
function md_ym_sy2(){
    var num = 0;
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push("ca_king_friendpage1");
                clearInterval(timer);
            }
        }, 500);
}
             //滑动页面
        var mySwiper = new Swiper('.swiper-container', {
            mousewheelControl: true,
            observer: true,
            observeParents: true,
            noSwiping: true,
            nested: true,
            onInit: function (swiper) {
                
            },
            onSlideChangeEnd: function (swiper) {
               
            },
            onTransitionEnd: function (swiper) {
                
            }
        });
        //判断邀请码
        function in_code(){
            invite_code = getQueryString('invite_code');
            if(invite_code=="" || invite_code==undefined){
                is_me_=1;
                invite_code=openid;
                wx_o();
            }else{
                is_me_=0;
                wx_o();
                invite_code=getQueryString('invite_code');
            }
        }
        // 微信信息
    function wx_o(){
        if(is_me_ == 1){
            share_url='http://h5.yingxiong.com/index/ca/king.html?invite_code='+openid;
        }else{
            share_url='http://h5.yingxiong.com/index/ca/king.html?invite_code='+invite_code;
        }
        var share_icon=$(".wrap").attr("data-icon");
        var share_title=$(".wrap").attr("data-title");
        var share_desc=$(".wrap").attr("data-desc");
        var share = {
            imgUrl      : "http:"+share_icon,
            shareTitle  : share_title,
            descContent : share_desc,
            lineLink    : share_url
        };
        wx.config({
            debug     : false,
            appId     : wx_conf.appId,
            timestamp : wx_conf.timestamp,
            nonceStr  : wx_conf.nonceStr,
            signature : wx_conf.signature,
            jsApiList : [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ]
        });
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                     dfzj_inv_share();
                }
            });
            wx.onMenuShareTimeline({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                    dfzj_inv_share();
                }
            });

            wx.onMenuShareQQ({
                title: share.shareTitle,
                desc: share.descContent,
                link: share.lineLink,
                imgUrl: share.imgUrl,
                success : function() {
                    dfzj_inv_share();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        })
        }
            //用户初始信息
        function lottery_recode(){
            $.post(num_url, {"invite_code":getQueryString("invite_code")}, function(data) {
                    if(data.code=="0") {
                        info_code=window.location.href.split('info=')[1];
                        invite_code = getQueryString('invite_code');
                        openid=data.data.openid;
                        username=data.data.nickname;
                        zm_nym=data.data.invLog;
                        var len=0;
                        var len2=0;
                        for(var i in data.data.invLog){
                            len++;
                        }
                        zm_nym2=len;
                        in_code();
                        if(is_me_==1){
                            md_ym_sy1();
                            $(".invite_page").addClass("hidden");
                            $(".wrap").css("opacity","1");
                        }else{
                            md_ym_sy2();
                            $(".wrap").css("opacity","0");
                            var result2="";
                            for(var err in data.data.invLog) {
                                var dm_li =data.data.invLog[err].headimgurl ;
                                result2 +='<img src="' + dm_li +'">';
                            }
                            console.log(result2);
                            $(".phone_box").html(null).append(result2);
                            $(".friend_box .info_name").html(data.data.nickname);
                            $(".friend_box .info_num").html(zm_nym2);
                            $(".invite_page").removeClass("hidden");
                        }
                        // 抽奖次数
                        lottery_num = Number(data.data.lotteryTotalNum);
                        lottery_usenum = Number(data.data.lotteryUseNum);
                        lottery_sy = Number(lottery_num-lottery_usenum);
                        console.log(lottery_sy);
                        $(".sy_num span").html(lottery_sy);
                        // 抽奖记录
                        var msg=data.data.giftLog;
                        if(!msg) {
                            $(".gift_look").addClass("on");
                        } else {
                            $(".gift_look").removeClass("on");
                        }  
                        var result="";
                        for(var err2 in data.data.giftLog) {
                            var lbId1 = Number(msg[err2].giftId);
                             var lbId = Number(lbId1 - 413);
                            if(lbId > -1){
                             result += '<li>' +
                                '<span class="name_txt align-center-vertical">' + giftNum[lbId].name + '</span>' +
                                '<span class="name_code align-center-vertical"  id="page_gold_code' + lbId + 1 + '">' + msg[err2].giftCode + '</span>' +
                                '<span class="name_time align-center-vertical">' + msg[err2].time + '</span>'+
                                '<span class="copy_btn2"><a href="javascript:;" id="tc2_copy_btn' + lbId + 1 + '" data-clipboard-action="copy" data-clipboard-target="#page_gold_code' + lbId + 1 + '" class="copy' + lbId + 1 + '"></a></span>' 
                            }

                            $(".f_login_tips .price_ul").html(null).append(result);
                        }
                    }else{
                        alert(data.msg);
                        return;
                    }
                }, "json");
        }
            //用户初始信息
        function lottery_recode2(){
            $.post(num_url, {}, function(data) {
                    if(data.code=="0") {
                        // 抽奖次数
                        lottery_num = Number(data.data.lotteryTotalNum);
                        lottery_usenum = Number(data.data.lotteryUseNum);
                        lottery_sy = Number(lottery_num-lottery_usenum);
                        console.log(lottery_sy);
                        $(".sy_num span").html(lottery_sy);
                        // 抽奖记录
                        var msg=data.data.giftLog;
                        if(!msg) {
                            alert("您还没有抽奖记录喔~");
                        } else {
                            $(".tips.f_login_tips").removeClass("hidden");
                        }  
                        var result="";
                        for(var err2 in data.data.giftLog) {
                            var lbId1 = Number(msg[err2].giftId);
                             var lbId = Number(lbId1 - 413);
                            if(lbId > -1){
                             result += '<li>' +
                                '<span class="name_txt align-center-vertical">' + giftNum[lbId].name + '</span>' +
                                '<span class="name_code align-center-vertical"  id="page_gold_code' + lbId + 1 + '">' + msg[err2].giftCode + '</span>' +
                                '<span class="name_time align-center-vertical">' + msg[err2].time + '</span>'+
                                '<span class="copy_btn2"><a href="javascript:;" id="tc2_copy_btn' + lbId + 1 + '" data-clipboard-action="copy" data-clipboard-target="#page_gold_code' + lbId + 1 + '" class="copy' + lbId + 1 + '"></a></span>' 
                            }
                            $(".f_login_tips .price_ul").html(null).append(result);
                        }
                    }else{
                        alert(data.msg);
                        return;
                    }
                }, "json");
        }
        //好友头像
        function autoScroll(obj) {
            $(obj).animate({
                marginTop: "-3.06rem"
            }, 1500, function() {
                $(this).css({marginTop: "0"}).find("img:first").appendTo(this);
            });
        }
        if($(".phone_box img").length>10){
            //$(".price_con ul").append($(".price_con ul li").clone(true));
            setInterval('autoScroll($(".phone_box"));',2000);
        }
        //音乐视频初始化
        document.addEventListener('DOMContentLoaded', function () {
            var  myVid1=document.getElementById("my_video1");
            function audioAutoPlay() {
                myVid1.load();
                document.addEventListener("WeixinJSBridgeReady", function () {
                     myVid1.load();
                }, false);
            }
            audioAutoPlay();
        });
        //音乐视频初始化
        document.addEventListener('DOMContentLoaded', function () {
            var  myauo1=document.getElementById("music1");
            myauo1.volume = .5;
            function audioAutoPlay1() {
                myauo1.play();
                document.addEventListener("WeixinJSBridgeReady", function () {
                    myauo1.volume = .5;
                     myauo1.play();
                }, false);
            }
            audioAutoPlay1();
        });
        (function(){
            //手机类型判断
            var u = navigator.userAgent,
                    app = navigator.appVersion;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isIOS) {
                audioAutoPlay1();
            }
            var myauo1=document.getElementById("music1");
            var timer=setInterval(function(){
                if(myauo1.readyState==4){
                    clearInterval(timer);
                    myauo1.pause();
                }
            },10);
        })();
        var  myVid1=document.getElementById("my_video1");
        var  myauo1=document.getElementById('music1');
        var  myauo2=document.getElementById("music2");
        function audioAutoPlay2(){
            document.getElementById('music2').play();
            document.getElementById('music2').volume = 1;
            document.addEventListener("WeixinJSBridgeReady", function () {
                document.getElementById('music2').play();
            }, false);
        }
        function audioAutoPlay1(){
            document.getElementById('music1').play();
            document.getElementById('music1').volume = .5;
            document.addEventListener("WeixinJSBridgeReady", function () {
               document.getElementById('music1').play();
                document.getElementById('music1').volume = .5;
            }, false);
        }
        lottery_recode(); 
       //点击视频
        $(".page2").click(function(){
            HLog.event("ca_king_video_play");
            $(".page0_v").removeClass("hidden");
            myVid1.play();
            myVid1.onended = function() {
                $(this).removeClass("swiper-no-swiping");
                $(".page0_v").addClass("hidden");
                $(".music_img").removeClass("hidden");
                audioAutoPlay1();
                mySwiper.slideNext();
                HLog.push("ca_king_page2");
            }
        });
        //点击抽奖
        $('.p-all-center').click(function() {
            HLog.event("ca_king_lottery_point");
                if(bRotate) return;
                if(lottery_sy < 1){
                    alert("您的抽奖次数已用完~");
                    return;
                }
                $.post(lottery_url, {}, function(data) {
                    if(data.code=="0") {
                        var item = data.data.giftId;
                       switch(item) {
                            case 413:
                                rotateFn(-23.5, 31.5, '感恩节手枪(永久)', 0);
                                break;
                            case 414:
                                rotateFn(287.5,335.5, '黑暗骑士碎片*1', 0);
                                break;
                            case 415:
                                rotateFn(241.5, 286.5, '强化点*50000', 0);
                                break;
                            case 416:
                                rotateFn(194.5, 240.5, '射手座头像*1', 0);
                                break;
                            case 417:
                                rotateFn(144.5, 193.5, '钻石*20', 0);
                                break;
                            case 418:
                                rotateFn(89.5, 143.5, '英雄之心(10天)', 0);
                                break;
                            case 0:
                                rotateFn(30.5, 88.5, '谢谢参与', 1);
                                break;
                        }
                        var giftId = data.data.giftId - 413;
                        if(giftId > -1){
                            setTimeout(function(){
                            $(".code_tips .gift_ico img").removeClass("active");
                            $(".code_tips .dhm_info .code").html(data.data.giftCode);
                            $(".code_tips .gift_ico").find(giftNum[giftId].img).addClass("active");
                            $(".code_tips .gift_name").html(giftNum[giftId].name);
                            $(".code_tips").removeClass("hidden");
                            },1000);
                        }
                        lottery_recode();
                    }else{
                        alert(data.msg);
                        return;
                    }
                }, "json");
        });
        
        //抽奖按钮
        $(".mm_box3 .sure").click(function(){
            HLog.event("ca_king_mm_sure");
            var answer=$(".mm_val").val();
            if(answer=="CA11"){
                $(".wrap").addClass("hidden");
                $(".lottery").removeClass("hidden");
                HLog.push("ca_king_lottery");
                audioAutoPlay2();
                return;
            }else if(answer=="Ca11"){
                $(".wrap").addClass("hidden");
                $(".lottery").removeClass("hidden");
                HLog.push("ca_king_lottery");
                audioAutoPlay2();
                return;
            }else if(answer=="ca11"){
                $(".wrap").addClass("hidden");
                $(".lottery").removeClass("hidden");
                HLog.push("ca_king_lottery");
                audioAutoPlay2();
                return;
            }else if(answer=="cA11"){
                $(".wrap").addClass("hidden");
                $(".lottery").removeClass("hidden");
                HLog.push("ca_king_lottery");
                audioAutoPlay2();
                return;
            }else{
                alert("密码输入错误喔~");
            }
        })
        //关闭弹窗按钮
        $(".close_tips").click(function(){
            HLog.event("ca_king_tc_close");
          $(this).parent().parent().addClass("hidden");
          audioAutoPlay2();
        });
        //查看礼包
        $(".gift_look").click(function(){
            HLog.event("ca_king_lookgift");
            lottery_recode2();
            audioAutoPlay2();
        });
         //复制
        new Clipboard('.copy');
        $(".copy").click(function() {
            HLog.event("ca_king_code_copy");
           alert("已复制");
        });
        new Clipboard('.copy01');
        $(".price_ul").on("click",".copy_btn2",function() {
           alert("已复制");
        });
        new Clipboard('.copy11');
        new Clipboard('.copy21');
        new Clipboard('.copy31');
        new Clipboard('.copy41');
        new Clipboard('.copy51');
        new Clipboard('.copy61');
         $(".sure_btn").click(function(){
            $(".tips.f_login_tips").addClass("hidden");
            HLog.event("ca_king_tc_sure");
        });
        $(".music_img").click(function(){
            if(play1){
                HLog.event("ca_king_music_pause");
                document.getElementById('music1').pause();
                $(".music_img").addClass("active");
                play1=false;
            }else{
                 HLog.event("ca_king_music_play");
                document.getElementById('music1').play();
                $(".music_img").removeClass("active");
                play1=true;
            }
        });
        // 按钮点击效果
        $(".lottery .invite").click(function(){
            HLog.event("ca_king_invite_friend");
            $(this).addClass("active");
            audioAutoPlay2();
        })
        $(".lottery .down_url").click(function(){
             HLog.event("ca_king_down_self");
            $(this).addClass("active");
            audioAutoPlay2();
        })
        $(".invite_page .cy_lottery").click(function(){
            HLog.event("ca_king_friend_lottery");
        });
        $(".invite_page .cy_down").click(function(){
            HLog.event("ca_king_friend_down");
        });
        //点击再见外挂君
        $(".page3 .part1").click(function(){
            HLog.event("ca_king_btn_part1");
            audioAutoPlay2();
            $(this).addClass("active");
            setTimeout(function(){
            $(".page1").addClass("swiper-no-swiping");
            $(".page3").removeClass("swiper-no-swiping");
            $(".page1>div").addClass("hidden");
            $(".page1 .mm_box1").removeClass("hidden");
            $(".page1 .mm_text3").addClass("hidden");
            mySwiper.slideNext();
            HLog.push("ca_king_page3");
            },400);
        })
        //点击战术大师
        $(".page3 .part2").click(function(){
            HLog.event("ca_king_btn_part2");
            audioAutoPlay2();
            $(this).addClass("active");
            setTimeout(function(){
            $(".page1").addClass("swiper-no-swiping");
            $(".page3").removeClass("swiper-no-swiping");
            $(".page1>div").addClass("hidden");
            $(".page1 .mm_box2").removeClass("hidden");
             $(".page1 .mm_text3").addClass("hidden");
            mySwiper.slideNext();
            HLog.push("ca_king_page4");
            },400);
        })
        //点击战术大师
        $(".page3 .part3").click(function(){
            HLog.event("ca_king_btn_part3");
            audioAutoPlay2();
            $(this).addClass("active");
            $(".wrap").addClass("active");
            setTimeout(function(){
                $(".page1").addClass("swiper-no-swiping");
                $(".page3").removeClass("swiper-no-swiping");
                $(".page1>div").addClass("hidden");
                 $(".page1>a").addClass("hidden");
                $(".page1 .mm_box3").removeClass("hidden");
                $(".page1 .mm_text3").removeClass("hidden");
                mySwiper.slideNext();
                HLog.push("ca_king_page5");
            },400);
        });
        //点击返回上一页
        $(".page1 .return,.page1 .return2,.page1 .cancel").click(function(){
            HLog.event("ca_king_btn_return");
            audioAutoPlay2();
            $(".page1").removeClass("swiper-no-swiping");
            $(".wrap").removeClass("active");
            $(".page1 .mm_text3").addClass("hidden");
            $(".page3 .sel_box>a").removeClass("active");
            $(".page1>a").removeClass("hidden");
            mySwiper.slidePrev();
            HLog.push("ca_king_page2");
            $(".page3").addClass("swiper-no-swiping");
        });
        $(".lottery .invite").click(function(){
            audioAutoPlay2();
            $(".share_bg").removeClass("hidden");
        })
        //分享页面
        $(".share_bg").click(function(){
            audioAutoPlay2();
             $(".share_bg").addClass("hidden");
            // HLog.event("dfzj_inv_shareClose");
        })
        //助力
        $(".friend_help").click(function(){
            HLog.event("ca_king_friend_help");
            $.ajax({
                type: 'POST',
                url: text_url,
                data: {"invite_code" : getQueryString("invite_code")},
                        'dataType':'Json',
                success:function(data){
                    if(data.code == 0){
                        lottery_recode();
                        alert(data.msg);
                    }else{
                        alert(data.msg);
                    }
                },
                error:function(){
                    alert("网络请求失败，请重新刷新页面");
                }
            });
        })
})