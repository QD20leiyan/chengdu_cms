    var play1=true;
    var images=['.img1','.img2','.img3','.img4','.img5','.img6','.img7'];//随机生成告白图
    var url=images[Math.floor(Math.random()*images.length)];
    var loadingTxt = 15;
    var timer,timer1 = null;
    var widthNum = 15;
    var bar = $(".heart_line").css({"width":widthNum+"%"});
    var name1="";
    var my_phone1="";
    var money_id1=0;
    var money_id="";
    var city_id1="";
    var city_id2="";
    var city_id="";
    var time_id1=0;
    var time_id="";
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
    document.addEventListener('DOMContentLoaded', function () {
        var  myauo1=document.getElementById('music1');
        function audioAutoPlay2() {
            myauo1.load();
            document.addEventListener("WeixinJSBridgeReady", function () {
                myauo1.load();
            }, false);
        }
        audioAutoPlay2();
    });
    function audioAutoPlay2(){
            document.getElementById('music1').play();
            document.getElementById('music1').volume = .5;
            document.addEventListener("WeixinJSBridgeReady", function () {
               document.getElementById('music1').play();
                document.getElementById('music1').volume = .5;
                 setTimeout(function(){
                  document.getElementById('music1').volume += .1;
                  },1200);
            }, false);
    }

    var  myVid1=document.getElementById("my_video1");
    var  myauo1=document.getElementById('music1');
    function md_ym_sy(){
            var num = 0;
                var timer = setInterval(function () {
                    if (!window.HLog) {
                        num++;
                        if (num >= 10) {
                            clearInterval(timer);
                        }
                    } else {
                        HLog.push("tk_old_page1");
                        clearInterval(timer);
                    }
                }, 500);
        }
    $(function() {
        md_ym_sy();
        var  h5_wx=$(".h5_wx").html();
        var  h5_data=$(".h5_data").html();
        var srf = $('meta[name="csrf-token"]').attr('content');
        var test_url="/tk/old/index.html?h5data="+h5_data;
        var type_id="";
        var u = navigator.userAgent,
            app = navigator.appVersion;
                    // HLog.event("nba_txty_down");
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    
        //滑动页面
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            mousewheelControl: true,
            observer: true,
            observeParents: true,
            noSwiping: true,
            nested: true,
            speed:1100,
            onInit: function (swiper) {
                time_jd();
                if(swiper.activeIndex==2){
                    swiperAnimateCache(swiper);
                    swiperAnimate(swiper);
                }
            },
            onSlideChangeEnd: function (swiper) {
                if(swiper.activeIndex==2){
                    $(".s1,.s3,.s5,.s7").addClass("fadeInLeft");
                    $(".s2,.s4,.s6").addClass("fadeInRight");
                    $(".page1 .poster").show();
                    $(".poster_sm").addClass("zoomIn");
                    $(".poster_sm").show();
                    swiperAnimate(swiper);
                }
                if(swiper.activeIndex==3){
                    $(".page10").addClass("swiper-no-swiping");
                }
            },
            onTransitionEnd: function (swiper) {
                if(swiper.activeIndex==2){
                    $(".s1,.s3,.s5,.s7").addClass("fadeInLeft");
                    $(".s2,.s4,.s6").addClass("fadeInRight");
                    $(".page1 .poster").show();
                    $(".poster_sm").addClass("zoomIn");
                    $(".poster_sm").show();
                    swiperAnimate(swiper);
                    HLog.push("tk_old_page3");
                }
                if(swiper.activeIndex==3){
                    $(".page10").addClass("swiper-no-swiping");
                    HLog.push("tk_old_page4");
                }
            }
        });
        //百分比进度条
        function time_jd(){
            timer=setInterval(function(){
            widthNum++;
            loadingTxt++;
            $(".heart_line").css({"width":widthNum+"%"});
            $("#loading-txt span").html(loadingTxt+"%")
            if(widthNum>=0 && loadingTxt==100){
                clearInterval(timer);
                widthNum == 100;
                $(".page2").removeClass("swiper-no-swiping");
                mySwiper.slideNext();
                HLog.push("tk_old_page2");
            }
            },50)
        }
        $(".jump").click(function(){
            myVid1.pause();
            $(".page1").removeClass("swiper-no-swiping");
            $(".music_play").show();
            mySwiper.slideNext();
            audioAutoPlay2();
            HLog.event("tk_old_jump");
        })
        var true_id=0;
        $(".play").click(function(){
                myVid1.play();
                myVid1.onended = function() {
                $(".page1").removeClass("swiper-no-swiping");
                  mySwiper.slideNext();
                  audioAutoPlay2();
                  $(".music_play").show();
                }
                $(this).hide();
                HLog.event("tk_old_play");
        });

        $(".next_btn").click(function(){
            mySwiper.slideNext();
            HLog.push("tk_old_page5");
            HLog.event("tk_old_yntx");
        })
        $(".page4 .sel1.on1").click(function(){
            $(this).removeClass("on1");
            $(".page1,.page2,.page3,.page10").removeClass("hidden");
            $(".page5,.page6").addClass("hidden");
            $(".page7").removeClass("hidden");
            mySwiper.slideNext();
            HLog.push("tk_old_page6");
            HLog.event("tk_old_jzsj");
        })
        $(".page4 .sel2.on1").click(function(){
            $(this).removeClass("on1");
            $(".page1,.page2,.page3,.page10").removeClass("hidden");
            $(".page5").removeClass("hidden");
            $(".page7,.page6").addClass("hidden");
            mySwiper.slideNext();
            HLog.push("tk_old_page7");
            HLog.event("tk_old_jzsk");
        })
        $(".page4 .sel3.on1").click(function(){
            $(this).removeClass("on1");
            $(".page1,.page2,.page3,.page10").removeClass("hidden");
            $(".page6").removeClass("hidden");
            $(".page7,.page5").addClass("hidden");
            mySwiper.slideNext();
            HLog.push("tk_old_page8");
            HLog.event("tk_old_jzsy");
        })
        $(".page4").on("click",".sel3.on",function(){
            $(".page1,.page2,.page3,.page4,.page10").addClass("hidden");
            $(".page5,.page6").addClass("hidden");
            $(".page7").removeClass("hidden");
             mySwiper.slideTo(0);
             HLog.push("tk_old_page6");
             HLog.event("tk_old_jzsj");
        })
        $(".page4").on("click",".sel3.on",function(){
            $(".page1,.page2,.page3,.page4,.page10").addClass("hidden");
            $(".page5").removeClass("hidden");
            $(".page7,.page6").addClass("hidden");
            mySwiper.slideTo(0);
            HLog.push("tk_old_page7");
            HLog.event("tk_old_jzsk");
        })
        $(".page4").on("click",".sel3.on",function(){
            $(".page1,.page2,.page3,.page4,.page10").addClass("hidden");
            $(".page6").removeClass("hidden");
            $(".page7,.page5").addClass("hidden");
             mySwiper.slideTo(0);
             HLog.push("tk_old_page8");
             HLog.event("tk_old_jzsy");
        })
        $(".page5 .rutern.on1").click(function(){
             $(this).removeClass("on1");
            $(".page4,.page5").removeClass("hidden");
            $(".page7,.page6").addClass("hidden");
            $(".page1,.page2,.page3,.page4,.page10").removeClass("hidden");
            mySwiper.slideTo(4);
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern1");
        })
        $(".page6 .rutern.on1").click(function(){
             $(this).removeClass("on1");
            $(".page6").removeClass("hidden");
            $(".page7,.page5").addClass("hidden");
            $(".page1,.page2,.page3,.page4,.page10").removeClass("hidden");
            mySwiper.slideTo(4);
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern2");
        })
        $(".page7 .rutern.on1").click(function(){
             $(this).removeClass("on1");
            $(".page5,.page6").addClass("hidden");
            $(".page1,.page2,.page3,.page4,.page10").removeClass("hidden");
            $(".page7").removeClass("hidden");
            mySwiper.slideTo(4);
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern3");
        })
        $(".page5").on("click",".rutern.on",function(){
            $(".page5,.page6,.page7,.page8").addClass("hidden");
            $(".page4").removeClass("hidden");
            // $(".page6").removeClass("hidden");
            // $(".page7,.page5").addClass("hidden");
            mySwiper.slideTo(-3);
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern1");
        })
        $(".page6").on("click",".rutern.on",function(){
            $(".page5,.page6,.page7,.page8").addClass("hidden");
            $(".page4").removeClass("hidden");
            // $(".page6").removeClass("hidden");
            // $(".page7,.page5").addClass("hidden");
            mySwiper.slideTo(0);
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern2");
        })
        $(".page7").on("click",".rutern.on",function(){
            $(".page5,.page6,.page7,.page8").addClass("hidden");
            $(".page4").removeClass("hidden");
            
            // $("").removeClass("hidden");
            mySwiper.slideTo(0);
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern3");
        })
        $(".page8 .rutern").click(function(){
            $(".page5 .rutern").removeClass("on1");
            $(".page7 .rutern,.page6 .rutern,.page5 .rutern").addClass("on");
            $(".page4 .sel1,.page4 .sel2,.page4 .sel3").addClass("on");
            $(".page5,.page6,.page7").removeClass("hidden");
            $(".page1,.page2,.page3,.page10").remove();
            $(".page4").removeClass("hidden");
            HLog.push("tk_old_page5");
            HLog.event("tk_old_rutern4");
            // mySwiper.slideTo(0);
        })
        $("#my_video1").click(function(){
            myVid1.pause();
            $(".play").show();
            HLog.event("tk_old_pause");
        })
        $(".music_img").click(function(){
            if(play1){
                document.getElementById('music1').pause();
                $(this).addClass("active");
                HLog.event("tk_old_m_pause");
                play1=false;
            }else{
                document.getElementById('music1').play();
                $(this).removeClass("active");
                HLog.event("tk_old_m_paly");
                play1=true;
            }
        })
        $(".submit1").click(function(){
            // type_id="sk";
            // name1=$(".page5 .co_username").val();
            // my_phone1=$(".page5 .co_phone").val();
            // if(name1 == "" || name1==undefined){
            //     alert("请输入您的姓名~");
            //     return;
            // }
            // if(my_phone1 == "" || my_phone1 == undefined) {
            //     alert("手机号码不能为空哦");
            //     return;
            // }
            // if(my_phone1.length != 11) {
            //     alert("手机号码不正确哦");
            //     return;
            // }
            HLog.event("tk_old_m_submit1");
        })
        $(".submit2").click(function(){
            type_id="sy";
            name1=$(".page6 .co_username").val();
            my_phone1=$(".page6 .co_phone").val();
            if(name1 == "" || name1==undefined){
                alert("请输入您的姓名~");
                return;
            }
            if(my_phone1 == "" || my_phone1 == undefined) {
                alert("手机号码不能为空哦");
                return;
            }
            if(my_phone1.length != 11) {
                alert("手机号码不正确哦");
                return;
            }
            HLog.event("tk_old_m_submit2");
        })
        $(".submit3").click(function(){
            type_id="sj";
            name1=$(".page7 .co_username").val();
            my_phone1=$(".page7 .co_phone").val();
            time_id1=$(".page7 .js_serverId").find('option:selected').attr("data-id");
            time_id=String(Number(time_id1)*60) + "分钟";
            console.log(time_id);
            city_id1=$(".page7 #selProvince").find('option:selected').attr("value");
            city_id2=$(".page7 #selCity").find('option:selected').attr("value");
            city_id=city_id1+"-"+city_id2;
            if(name1 == "" || name1==undefined){
                alert("请输入您的姓名~");
                return;
            }
            if(my_phone1 == "" || my_phone1 == undefined) {
                alert("手机号码不能为空哦");
                return;
            }if(my_phone1.length != 11) {
                alert("手机号码不正确哦");
                return;
            }
            if(time_id1 == "" || time_id1==undefined){
                alert("请选择您要捐献的时长~");
                return;
            }
            if(city_id1 == "" || city_id1==undefined){
                alert("请选择您要捐献的城市~");
                return;
            }
            HLog.event("tk_old_m_submit3");
        })
        //金额选择
            $(".page5 .js_serverId").click(function(){
                $(".name2").hide();
            });
            $(".page7 .js_serverId").click(function(){
                $(".name2_1").hide();
            });
            $(".page7 .city").click(function(){
                $(".name2").show();
                $(".page7 .name2_2").hide();
                 $(".page7 .name2_1").hide();
                $("#selProvince").show();
                $("#selCity").show();
            })
        $('.submit3,.submit2').click(function(){
            $.ajax({
            type:'POST',
            'dataType':'Json',
            url:test_url,
            data:{"type":type_id,"phone":my_phone1,"name":name1,"time":time_id1,"city":city_id,"cms_csrf":srf},
            success:function(data){
                if(data.code == 0){
                    $(".js_load").show();
                    $("#name_img span").html(name1);
                    $("#name_img2 span").html(name1);
                    if(type_id == "sy"){
                       $(".jx_text").html("邀你一同参与关爱老兵慈善活动");
                       $(".page8 h2,.page9 h2").hide();
                    }else if(type_id == "sj"){
                       $(".jx_text").html("感谢您为关爱老兵基金捐献");
                       $(".page8 h2,.page9 h2").html(time_id);
                       console.log(time_id);
                    }
                    $(".page1,.page2,.page3,.page4,.page5,.page6,.page7,.page8,.page10").addClass("hidden");
                    $(".pic_box img").removeClass("active");
                    $(".pic_box").find(url).addClass("active");
                    $(".rutern").hide();
                    $(".page9").removeClass("hidden");
                    mySwiper.slideTo(0);
                    var canvas1 = document.createElement("canvas");
                    let _canvas = document.querySelector('.page9');
                    var w = parseInt(window.getComputedStyle(_canvas).width);
                    var h = parseInt(window.getComputedStyle(_canvas).height);
                    canvas1.width = w * 2;
                    canvas1.height = h * 2;
                    canvas1.style.width = w + "px";
                    canvas1.style.height = h + "px";
                    var context1 = canvas1.getContext("2d");
                    context1.scale(2,2);
                    html2canvas(_canvas,{canvas:canvas1,useCORS: true}).then(
                    function(canvas){
                    console.log(canvas1.toDataURL());
                    $(".page1,.page2,.page3,.page4,.page5,.page6,.page7,.page9,.page10").addClass("hidden");
                    $(".page8").removeClass("hidden");
                    mySwiper.slideTo(0);
                    $(".js_load").hide();
                    $(".rutern").show();
                    $(".jp_img1").attr("src",canvas1.toDataURL());
                    });
                }else{
                    alert(data.msg);
                }
            },
            error:function(){
                alert("网络请求错误，请刷新页面");
            }
        });
        });
        // $('.submit1').click(function(){
        //     $.ajax({
        //     type:'POST',
        //     'dataType':'Json',
        //     url:test_url,
        //     data:{"type":"sk","phone":my_phone1,"name":name1,"cms_csrf":srf},
        //     success:function(data){
        //         if(data.code == 0){
        //             if(isAndroid) {
                        
        //                 HLog.event("tk_old_az_down");
        //                 window.location.href='http://downurl.yingxiong.com/url/tk_lbh5.html';
        //             }else if(isIOS){

        //               HLog.event("tk_old_ios_down");
        //               window.location.href='http://downurl.yingxiong.com/url/tk_lbh5.html';
        //             }
        //         }else{
        //             alert(data.msg);
        //         }
        //     },
        //     error:function(){
        //         alert("网络请求错误，请刷新页面");
        //     }
        //     });
        // });
    });