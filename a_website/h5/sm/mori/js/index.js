$(function(){
    var s = 0,
         o = $(".img_loading").find("img");    
    var timer = setInterval(function() {      
        s >= o.length && (s = 0);      
                var t = o.eq(s);      
                t.siblings().removeClass("active");       
                setTimeout(function() {         
                    t.addClass("active")       
                }, 200);       
                s++
    }, 200);
    window.onload = function (){
        clearInterval(timer);
        $(".loading").hide();
        $(".swiper-container").removeClass("hidden");
    };
    var play1=true;
    var  myauo1=document.getElementById('music');
    var  myauo2=document.getElementById("music1");
    function audioAutoPlay2(){
        document.getElementById('music1').play();
        document.getElementById('music1').volume = 1;
        document.addEventListener("WeixinJSBridgeReady", function () {
            document.getElementById('music1').play();
            document.getElementById('music1').volume = 1;
        }, false);
    }
    function audioAutoPlay1(){
        myauo1.play();
        document.getElementById('music').play();
        document.getElementById('music').volume = .2;
        document.addEventListener("WeixinJSBridgeReady", function () {
           document.getElementById('music').play();
            document.getElementById('music').volume = .2;
             
        }, false);
    }
    var  h5_wx=$(".h5_wx").html();
    var  h5_data=$(".h5_data").html();
    audioAutoPlay1();
    var share_icon=$(".loading").attr("data-icon");
        var share_title=$(".loading").attr("data-title");
        var share_desc=$(".loading").attr("data-desc");
        var share = {
            imgUrl      : "http:"+share_icon,
            shareTitle  : share_title,
            descContent : share_desc,
            lineLink    : 'http://h5.yingxiong.com/index/sm/ttl.html'
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

                }
            });
            wx.onMenuShareTimeline({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
4
                }
            });

            wx.onMenuShareQQ({
                title: share.shareTitle,
                desc: share.descContent,
                link: share.lineLink,
                imgUrl: share.imgUrl,
                success : function() {

                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        })
    function md_ym_sy(){
            var num = 0;
                var timer = setInterval(function () {
                    if (!window.HLog) {
                        num++;
                        if (num >= 10) {
                            clearInterval(timer);
                        }
                    } else {
                        HLog.push("sm_ttl_page1");
                        clearInterval(timer);
                    }
                }, 500);
        }
    // md_ym_sy();
    
    $(".music_img").click(function(){
            if(play1){
                document.getElementById('music').pause();
                $(this).addClass("active");
                 HLog.event("sm_ttl_music_pause");
                play1=false;
            }else{
               document.getElementById('music').play();
                $(this).removeClass("active");
                 HLog.event("sm_ttl_music_play");
                play1=true;
            }
        })
    //判断题目
        var true_id=0;
    $(".ques_con>div").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        audioAutoPlay2();
    })
    //弹窗关闭
    $(".co_tips_close,.co_tips_surebtn").click(function(){
        $(".co_tips_rules").addClass("hidden");
         HLog.event("sm_ttl_close_tc");
    });
   //开始答题
    $(".btn").click(function(){
         HLog.push("sm_ttl_page2_tm1");
         HLog.event("sm_ttl_dt_start");
        $(".swiper1").addClass("hidden");
        $(".swiper2").removeClass("hidden");
    })
    $(".btn_2.on").click(function(){
        var tm_df=$(this).parent().find(".ques_txt");
        if(tm_df.hasClass("active")){
            $(this).parent().removeClass("active");
            $(this).parent().next("li").addClass("active");
            var li_list=$(this).parent().find(".ques_txt.active");
            var answer=li_list.data("number");
            // options.push($.trim(answer).charAt());
        }else{
            alert("请选择您认为正确的答案~");
        }
    });
    $(".btn_2.on1").click(function(){
        var tm_df=$(this).parent().find(".ques_txt");
        if(tm_df.hasClass("active")){
             HLog.event("tk_bd_dt_end");
            setTimeout(function(){
            $(".swiper2").addClass("hidden");
            $(".swiper3").removeClass("hidden");
            $(".loading").show();
            $(".swiper3 .btn_l,.music_img,.changan").hide();
            $(".dog_logo").show();
            var s = 0,
                o = $(".img_loading").find("img");    
            var timer = setInterval(function() {      
                s >= o.length && (s = 0);      
                var t = o.eq(s);      
                t.siblings().removeClass("active");       
                setTimeout(function() {         
                    t.addClass("active")       
                }, 200);       
                s++
            }, 200);
            li_list=$(this).parent().find(".ques_txt.active");
            answer=li_list.data("number");
            var true_num1=$("body").find(".li1 .ques_txt.active").data("number");
            var true_num2=$("body").find(".li2 .ques_txt.active").data("number");
            var true_num3=$("body").find(".li3 .ques_txt.active").data("number");
            var true_num4=$("body").find(".li4 .ques_txt.active").data("number");
            var true_num5=$("body").find(".li5 .ques_txt.active").data("number");
            send = true_num1+true_num2+true_num3+true_num4+true_num5;
            console.log(true_num1);
            console.log(true_num2);
            console.log(true_num3);
            console.log(true_num4);
            console.log(true_num5);
            console.log(send);
            if(send >= 80 && send<=100){
                $(".swiper_p p").removeClass("active");
                $(".swiper_p p.p1").addClass("active");
                $(".label img").removeClass("active");
                $(".label img.lb2").addClass("active");
                $(".pp_img img").removeClass("active");
                $(".pp_img img.p11").addClass("active");
            }else if(send >= 60 && send<80){
                $(".swiper_p p").removeClass("active");
                $(".swiper_p p.p2").addClass("active");
                $(".label img").removeClass("active");
                $(".label img.lb1").addClass("active");
                $(".pp_img img").removeClass("active");
                $(".pp_img img.p22").addClass("active");
            }
            else if(send >= 20 && send<60){
                $(".swiper_p p").removeClass("active");
                $(".swiper_p p.p3").addClass("active");
                $(".label img").removeClass("active");
                $(".label img.lb3").addClass("active");
                $(".pp_img img").removeClass("active");
                $(".pp_img img.p33").addClass("active");
            }
            else if(send >= -5 && send<20){
                $(".swiper_p p").removeClass("active");
                $(".swiper_p p.p4").addClass("active");
                $(".label img").removeClass("active");
                $(".label img.lb4").addClass("active");
                $(".pp_img img").removeClass("active");
                $(".pp_img img.p44").addClass("active");
            }
                    var canvas2 = document.createElement("canvas");
                    let _canvas = document.querySelector('.swiper3');
                    var w = parseInt(window.getComputedStyle(_canvas).width);
                    var h = parseInt(window.getComputedStyle(_canvas).height);
                    canvas2.width = w * 4;
                    canvas2.height = h * 4;
                    canvas2.style.width = w + "px";
                    canvas2.style.height = h + "px";
                    var context = canvas2.getContext("2d");
                    context.scale(4,4);
                    html2canvas(_canvas, {
                        canvas: canvas2,
                        useCORS: true
                    }).then(function(canvas) {
                        $(".swiper3 .btn_l,.music_img,.changan").show();
                        clearInterval(timer);
                        $(".loading,.dog_logo").hide();
                        $(".jp_img1").attr("src",canvas.toDataURL("data:image/jpeg"));
                        $(".page5").removeClass("hidden");
                    });
            },1100);
        }else{
            alert("请选择您认为正确的答案~");
        } 
    });
    $(".more").click(function(){
        $(".tc").fadeIn(500);
    });
    $(".close").click(function(){
        $(".tc").fadeOut(500);
    })
    $(".share").click(function(){
        $(".share_bg").fadeIn(500);
    });
    $(".share_bg").click(function(){
        $(this).fadeOut(500);
    })
});
