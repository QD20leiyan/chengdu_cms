    var timer2="";
    var current = 0;
    var skew="";
    var js1=false;
    var js2=false;
    var js3=false;
    var js4=false;
    var js5=false;
    var js6=false;
    var js7=false;
    var js8=false;
    var js9=false;
    var game_num=0;
    var str="";
    var str2="";
    var zj_gift=false;
    // 背景音效
    var  myauo1=document.getElementById('music1');
    // 打字音效
    var  myauo2=document.getElementById("music2");
     //切换音效
    var  myauo3=document.getElementById("music3");
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
        // 打字音效
        function audioAutoPlay2(){
            document.getElementById('music2').play();
            document.getElementById('music2').volume = .1;
            document.addEventListener("WeixinJSBridgeReady", function () {
                document.getElementById('music2').play();
                document.getElementById('music2').volume = .1;
            }, false);
        }
        //切换音效
         function audioAutoPlay3(){
            document.getElementById('music3').play();
            document.getElementById('music3').volume = .1;
            document.addEventListener("WeixinJSBridgeReady", function () {
                document.getElementById('music3').play();
                document.getElementById('music3').volume = .1;
            }, false);
        }
        // 背景音效
        function audioAutoPlay1(){
            document.getElementById('music1').play();
            document.getElementById('music1').volume = 1;
            document.addEventListener("WeixinJSBridgeReady", function () {
               document.getElementById('music1').play();
                document.getElementById('music1').volume = 1;
            }, false);
        }
    //打字
      function print(str){
          if(str){
              if(str.charAt()=="#"){
                  $(".page2 .poster1").append("<p></p>");
                  str=str.substr(1);
              }
              $(".page2 .poster1 p:last").text($(".page2 .poster1 p:last").text()+str.charAt());
              timer2=setTimeout(function(){
                audioAutoPlay2();
                print(str.substr(1));
            },60);
          }else{
                document.getElementById('music2').pause();
          }
      };
      function dfzj_shanben_sy() {
    var num = 0;
    var timer = setInterval(function() {
        if(!window.HLog) {
            num++;
            if(num >= 10) {
                clearInterval(timer);
            }
        } else {
            HLog.push("dfzj_plot_page1");
            clearInterval(timer);
        }
    }, 500);
}
    $(function() {
        
        (function(){
            audioAutoPlay2();
            var audio=document.getElementById("music2");
            var timer=setInterval(function(){
                if(audio.readyState==4){
                    clearInterval(timer);
                    document.getElementById('music2').pause();
                    clearTimeout(timer2);
                }
            },10);
        })();
        /*截取参数*/
            function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search.substr(1)).match(reg);
                if (r != null)return unescape(r[2]);
                return null;
            }
            dfzj_shanben_sy();
        var  h5_wx=$(".h5_wx").html();
        var  h5_data=$(".h5_data").html();
        var user_info="/dfzj/plot/get-user-info.html"+ h5_jk_url;
        var gift_code="/dfzj/plot/get-gift.html"+ h5_jk_url;
        var share_icon=$(".wrap").attr("data-icon");
        var share_title=$(".wrap").attr("data-title");
        var share_desc=$(".wrap").attr("data-desc");
        var gift_code2="/dfzj/plot/get-gift-zj.html"+ h5_jk_url;
        var type_id="";
        var play1=true;
        var share_url="";
        var is_me_="";
        var invite_code="";
        var openid="";
         //判断邀请码
        function in_code(){
            invite_code = getQueryString('invite_code');
            if(invite_code=="" || invite_code==undefined){
                is_me_=1;
                invite_code=openid;
                wx_o();
            }else{
                is_me_=0;
                invite_code=getQueryString('invite_code');
                wx_o();
            }
        }
        function wx_o(){
            if(is_me_ == 1){
                share_url='http://h5.yingxiong.com/index/dfzj/plot.html?invite_code='+openid;
            }else{
                share_url='http://h5.yingxiong.com/index/dfzj/plot.html?invite_code='+invite_code;
            }
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

                }
            });
            wx.onMenuShareTimeline({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {

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
        }
        audioAutoPlay1();
        //用户初始信息
        function lottery_recode(){
            $.post(user_info, {}, function(data) {
                    if(data.code=="0") {
                        openid=data.data.openid;
                        username=data.data.nickname;
                        var msg=data.data.giftLog;
                        in_code();
                        var len=0;
                        game_num=data.data.num;
                        for(var i in msg){
                            len++;
                        }
                        if(len > 0){
                            $(".swiper-container").addClass("hidden");
                        }else{
                            $(".swiper-container").removeClass("hidden");
                        }
                        if(msg["sg"]){
                            js1=true;
                            $(".sel_box .sel1").addClass("active");
                            $("#code2 span").html(msg["sg"]);
                        }
                        if(msg["zx"]){
                            js2=true;
                            $(".sel_box .sel2").addClass("active");
                            $("#code2 span").html(msg["zx"]);
                        }
                        if(msg["qd"]){
                            js3=true;
                            $(".sel_box .sel3").addClass("active");
                            $("#code2 span").html(msg["qd"]);
                        }
                        if(msg["mh"]){
                            js4=true;
                            $(".sel_box .sel4").addClass("active");
                            $("#code2 span").html(msg["mh"]);
                        }
                        if(msg["xs"]){
                            js5=true;
                            $(".sel_box .sel5").addClass("active");
                            $("#code2 span").html(msg["xs"]);
                        }
                        if(msg["bh"]){
                            js6=true;
                            $(".sel_box .sel6").addClass("active");
                            $("#code2 span").html(msg["bh"]);
                        }
                        if(msg["yw"]){
                            js7=true;
                            $(".sel_box .sel7").addClass("active");
                            $("#code2 span").html(msg["yw"]);
                               $(".an_51").removeClass("on");
                               $(".an_52").removeClass("hidden");
                               $(".answer5 img").addClass("hidden");
                        }
                        if(msg["fx"]){
                            js8=true;
                            $(".sel_box .sel8").addClass("active");
                            $("#code2 span").html(msg["fx"]);
                        }
                        if(msg["zb"]){
                            js9=true;
                            $(".sel_box .sel9").addClass("active");
                            $("#code2 span").html(msg["zb"]);
                        }
                        if(msg["sg"] && msg["zx"] && msg["qd"] && msg["mh"] && msg["xs"] && msg["bh"] && msg["yw"] && msg["fx"] && msg["zb"]){
                            zj_gift=true;
                        }
                        console.log(zj_gift);
                    }else{
                        alert(data.msg);
                        return;
                    }
                }, "json");
        }
        // //用户礼包码
        function gift(){
            $.post(gift_code, {"type":type_id,"invite_code" : getQueryString("invite_code")}, function(data) {
                    if(data.code=="0") {
                        $("#code1 span").html(data.data.code);
                        $(".result_box .tc_gift").removeClass("hidden");
                        lottery_recode();
                    }else{
                        alert(data.msg);
                        return;
                    }
                }, "json");
        }
        // //用户礼包码
        function zj_gift1(){
            $.post(gift_code2, {}, function(data) {
                    if(data.code=="0"||data.code==6027) {
                        $("#code2 span").html(data.data);
                        $(".tc_gift3").addClass("hidden");
                        $(".tc_gift2").removeClass("hidden");
                        HLog.event("dfzj_plot_zjsu");
                    }else{
                        $(".tc_gift2").addClass("hidden");
                        $(".tc_gift3").removeClass("hidden");
                        HLog.event("dfzj_plot_zjnull");
                    }
                }, "json");
        }
        lottery_recode();
        new Clipboard('#tc11_copyBtnz');
        new Clipboard('#tc12_copyBtnz');
        new Clipboard('#tc13_copyBtnz');
        $(".start_btn a").click(function(){
            $(".page1").addClass("hidden");
            $(".page2").removeClass("hidden");
        });
        //点击复制口令
        $(".copy").click(function() {
            alert("已复制");
        });
        $(".start_btn").click(function(){
            $(".page1 .poster2").fadeIn(1500);
            setTimeout(function(){
                $(".swiper-container").addClass("hidden");
            },1500);
        });
    // 背景音乐播放
    $(".music_img").click(function(){
            if(play1){
                document.getElementById('music1').pause();
                $(".music_img").addClass("active");
                play1=false;
            }else{
                document.getElementById('music1').play();
                $(".music_img").removeClass("active");
                play1=true;
            }
        });
        $(".page2 .poster2.on").click(function(){
            $(".page2 .poster1 p").remove();
            clearTimeout(timer2);
            str="#你在旅途中，会遭遇各种事件，你的不同抉择都会导致事件导向不同的发展，你会迎来怎样的结局呢，开始你的旅程吧……";
            print(str);
            $(this).addClass("hidden");
            $(".page2 .poster3").removeClass("hidden");
            $(".page2 .poster2").removeClass("on");
            $(".page2 .poster3").addClass("shouci_play");
        })
        $(".page2 .poster3.shouci_play").click(function(){
            audioAutoPlay3();
            $(".page2 .poster3").removeClass("shouci_play");
        })
        $(".page2 .poster3").click(function(){
             $(".page2 .poster3").addClass("hidden");
             $(".page2").addClass("hidden");
             $(".page3").removeClass("hidden");
             $(".page3 .page3_1").fadeIn(500);
             $(".board_mao").hide();
              $(".mao").removeClass("xuanzhuan");
            $(".page3 .page3_1 .poster0 p").addClass("ani");
        })
        $(".page3 .page3_1.on").click(function(){
            $(".page3 .page3_1").hide();
            $(".board_mao").show();
             $(".mao").removeClass("xuanzhuan");
            $(".page3 .poster1").removeClass("hidden");
        })
        $(".page3 .poster1 .type.active ul li").click(function(){
             setTimeout(function(){
                 $(".page3 .poster1 .type").removeClass("active");
            },800);
        })
        $(".page3 .poster1 .type ul li:nth-child(1)").click(function(){
            $(".mao").addClass("xuanzhuan2");
            setTimeout(function(){
                 $(".mao").removeClass("xuanzhuan2");
            },800);
        })
         $(".page3 .poster1 .type ul li:nth-child(2)").click(function(){
            $(".mao").addClass("xuanzhuan");
            setTimeout(function(){
                 $(".mao").removeClass("xuanzhuan");
            },800);
        })
        $(".page3 .poster1 .type.active ul li.an_01").click(function(){
             setTimeout(function(){
                 $(".page3 .poster1 .type.type1_2").addClass("active");
                 $(".mengceng").css("display","block");
                 $(".mengceng").addClass("pb1_20");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },800);
        });
        $(".page3").on("click",".mengceng.pb1",function(){
            $(".page3 .poster1 .type1 p.p1").hide();
            $(".page3 .poster1 .type1 p.p2").fadeIn();
            $(this).removeClass("pb1");
            $(".mengceng").hide();
            $(".page3 .poster1 .type1 .answer1").removeClass("hidden");
        })
        $(".page3").on("click",".mengceng.pb1_20",function(){
            $(".page3 .poster1 .type1_2 p").hide();
            $(".page3 .poster1 .type1_2 p.p2").fadeIn();
            $(this).removeClass("pb1_20");
            $(this).addClass("pb1_21");
        })
        $(".page3").on("click",".mengceng.pb1_21",function(){
            $(".page3 .poster1 .type1_2 p").hide();
            $(".page3 .poster1 .type1_2 p.p3").fadeIn();
            $(this).removeClass("pb1_21");
            $(this).addClass("pb1_22");
        })
        $(".page3").on("click",".mengceng.pb1_22",function(){
            $(".page3 .poster1 .type1_2 p").hide();
            $(".page3 .poster1 .type1_2 p.p4").fadeIn();
            $(this).removeClass("pb1_22");
            $(this).addClass("pb1_23");
        })
        $(".page3").on("click",".mengceng.pb1_23",function(){
            $(".page3 .poster1 .type1_2 p").hide();
            $(".page3 .poster1 .type1_2 .answer2 p").show();
            $(".page3 .poster1 .type1_2 p.p5").fadeIn();
            $(this).removeClass("pb1_23");
            $(".type1_2 .peo1").removeClass("hidden");
            $(".mengceng").hide();
            $(".page3 .poster1 .type1_2 .answer2").removeClass("hidden");
        })
        $(".an_11").click(function(){
             $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#经过一次交战，你发现海盗实力强劲，你们在人手上很吃亏，这可不行！";
            print(str);
            $(".page2 .poster3").addClass("pb1_1");
            $(".page2 .poster3").removeClass("hidden");
            
        });
        // 旁白
        $(".an_12").click(function(){
             $(".mao").addClass("xuanzhuan");
            setTimeout(function(){
            $(".mao").removeClass("xuanzhuan");
            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#难民找你要了一艘木筏，决定要自己去救人，你们仿佛想要开口说什么，但最终没能开的了口……";
            print(str);
            $(".page2 .poster3").addClass("pb1_2");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
            },800);
        })
        $(".an_42").click(function(){
            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#原来海盗老大是你儿时熟悉的好友，他告诉你那些所谓的难民其实为了抢走他们几年前获得的一把钥匙，想要寻找宝藏，打造巅峰战舰称霸大洋";
            print(str);
            $(".page2 .poster2").addClass("pb1_4");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster2").removeClass("hidden");
        })
        $(".an_32").click(function(){
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type1_4").addClass("active");
                 $(".mengceng").css("display","block");
                 $(".mengceng").addClass("pb1_41");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },800);
        })
         $(".page3").on("click",".mengceng.pb1_41",function(){
            
            $(".page3 .poster1 .type1_4 p").hide();
            $(".page3 .poster1 .type1_4 .answer4 p").show();
            $(".page3 .poster1 .type1_4 p.p2").fadeIn();
            $(".page3 .poster1 .type1_4 .peo2").removeClass("hidden");
            $(this).removeClass("pb1_41");
            $(".mengceng").hide();
            $(".page3 .poster1 .type1_4 .answer4").removeClass("hidden");
        })
        $(".an_31,.an_41").click(function(){
            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你艰难的战胜了敌人，最终拯救了其他的难民，安顿好他们后，你也继续朝着航线行驶。";
            print(str);
            $(".page2 .poster3").addClass("pb1_3");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_51").click(function(){
            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你拿过钥匙回到船上，却发现难民早已经逃走，你暗自剁椒，也发誓以后要小心行事-你拿过钥匙回到船上，却发现难民早已经逃走，你暗自跺脚，也发誓以后要小心行事";
            print(str);
            $(".page2 .poster2").addClass("pb1_5_1");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster2").removeClass("hidden");
        })
        $(".an_52").click(function(){
            audioAutoPlay3();
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("背后的真相 铁血铸就的头衔  留下孤独的背影");
            $(".page3_1").addClass("relt4");
            setTimeout(function(){
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
            $(".page3 .page3_1").fadeIn(500);
            $(".page3 .poster1 .type4_1").addClass("active");
            },800);
        });
         $(".page2").on("click",".pb1_2",function(){
            audioAutoPlay3();
            // 触发事件1条件2
            $(".type3_3_2").addClass("on");
            $(".type3_2_2").addClass("on");
            $(".page2 .poster3").removeClass("pb1_2");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("风浪的洗礼  分岔路口的选择");
            $(".page3_1").addClass("relt");
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
             $(".page3 .page3_1").fadeIn(500);
            $(".page2 .poster1").removeClass("pb1_2");
            $(".page3").removeClass("hidden");
         })
         $(".page2").on("click",".pb1_1",function(){
            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb1_1");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type1_3").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
         $(".page2").on("click",".pb1_3",function(){
            audioAutoPlay3();
            // 触发事件1条件2
            $(".type3_3_2").addClass("on");
            $(".type3_2_2").addClass("on");
            $(".page2 .poster3").removeClass("pb1_3");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("风浪的洗礼  分岔路口的选择");
            $(".page3_1").addClass("relt");
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
             $(".page3 .page3_1").fadeIn(500);
            $(".page3").removeClass("hidden");
         })
         $(".page2").on("click",".pb1_4",function(){
            $(".page2 .poster1 p").remove();
            clearTimeout(timer2);

            $(".poster2").removeClass("pb1_4");
            $(".poster2").addClass("hidden");
            $(".page2 .poster3").removeClass("hidden");
            str="#你这才反应了过来，原来那难民是敌军的人！你想要立刻回到战舰上，将难民抓住";
            print(str);
            $(".poster3").addClass("pb1_4_1");
        })
         $(".page2").on("click",".pb1_4_1",function(){

            // 触发事件1条件1
            $(".type3_3_1").addClass("on");
            $(".type3_2_1").addClass("on");
            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb1_4_1");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type1_5").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
         $(".page2").on("click",".pb1_5_1",function(){

            $(".page2 .poster1 p").remove();
            $(".poster2").removeClass("pb1_5_1");
            clearTimeout(timer2);
            $(".page2 .poster3").addClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            str="#你拿过钥匙回到船上，却发现难民早已经逃走，你暗自剁椒，也发誓以后要小心行事";
            $(".poster2").addClass("pb1_5_2");
             print(str);
        })
         $(".page2").on("click",".pb1_5_2",function(){

            $(".page2 .poster1 p").remove();
            $(".poster2").removeClass("pb1_5_2");

            clearTimeout(timer2);
            $(".page2 .poster3").removeClass("hidden");
            str="#检查战舰，没有发现什么特殊问题后，你们只好继续朝着目的地出发";
            print(str);
            $(".poster3").addClass("pb1_5_3");
        })
         $(".page2").on("click",".pb1_5_3",function(){

            audioAutoPlay3();
            $(".page2 .poster3").removeClass("pb1_5_3");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("风浪的洗礼  分岔路口的选择");
            $(".page3_1").addClass("relt");
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").addClass("xuanzhuan");
             $(".page3 .page3_1").fadeIn(500);
            $(".page3").removeClass("hidden");
         })
        $(".page3 .poster1 .type.active ul li.an_02").click(function(){

            audioAutoPlay3();
            // 触发事件1条件2
            $(".type3_3_2").addClass("on");
            $(".type3_2_2").addClass("on");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("风浪的洗礼  分岔路口的选择");
            $(".page3_1").addClass("relt");
            setTimeout(function(){
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
            $(".page3 .page3_1").fadeIn(500);
            $(".page3 .poster1 .type2_1").addClass("active");
            $(".mengceng").css("display","block");
            $(".mengceng").addClass("pb2_20");
            },800);
        });
        $(".page3").on("click",".mengceng.pb2_20",function(){

            $(".page3 .poster1 .type2_1 p.p1").hide();
            $(".page3 .poster1 .type2_1 p.p2").fadeIn();
            $(this).removeClass("pb2_20");
            $(".mengceng").hide();
            $(".page3 .poster1 .type2_1 .peo1").removeClass("hidden");
            $(".page3 .poster1 .type2_1 .answer2_1").removeClass("hidden");
        })
        //转入事件二
        $(".page3").on("click",".page3_1.relt",function(){

            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            // $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type2_1").addClass("active");
             $(".mengceng").css("display","block");
            $(".mengceng").addClass("pb2_20");
            $(".page3 .poster1 .type2_1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            // $(".result_box").removeClass("hidden");
        })
        $(".an_11_2").click(function(){

            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type2_2").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },800);
        })
        //结局8
        $(".an_12_2").click(function(){

            $(".mao").addClass("xuanzhuan");
             setTimeout(function(){
            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".mao").removeClass("xuanzhuan");
            str="#你们躲开了风浪区，但意料之外出现了几艘战舰，他们不由分说的对你进行攻击，战舰很快沉没，你撕毁了指示图，含恨而亡";
            print(str);
            $(".page2 .poster3").addClass("pb2_1");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
            },800);
        })
        $(".an_21_2").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你们踏浪而过，但不幸的是你们撞上了礁石，战舰的引擎出现了问题，船上的材料却不足以修复战舰";
            print(str);
            $(".page2 .poster3").addClass("pb2_3");

            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        //结局9
        $(".an_22_2").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你们没能跑过海浪，被海水彻底吞没，你含恨而亡";
            print(str);
            $(".page2 .poster3").addClass("pb2_2");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".page2").on("click",".pb2_3",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb2_3");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type2_3").addClass("active");
                 $(".mengceng").css("display","block");
                 $(".mengceng").addClass("pb3_20");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
        $(".page3").on("click",".mengceng.pb3_20",function(){

            
            $(".page3 .poster1 .type2_3 p.p1").hide();
            $(".page3 .poster1 .type2_3 p.p2").fadeIn();
            $(this).removeClass("pb3_20");
            $(".mengceng").hide();
            $(".page3 .poster1 .type2_3 .peo1").removeClass("hidden");
            $(".page3 .poster1 .type2_3 .answer3_2").removeClass("hidden");
        })
        $(".an_31_2").click(function(){

            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type2_4").addClass("active");
                 $(".mengceng").css("display","block");
                 $(".mengceng").addClass("pb4_20");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },800);
        })
         $(".page3").on("click",".mengceng.pb4_20",function(){

            $(".page3 .poster1 .type2_4 p.p1").hide();
            $(".page3 .poster1 .type2_4 p.p2").fadeIn();
            $(this).removeClass("pb4_20");
            $(".mengceng").hide();
            $(".page3 .poster1 .type2_4 .answer4_2").removeClass("hidden");
        })
        $(".an_32_2").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#大副最终再也没有回来……";
            print(str);
            $(".page2 .poster3").addClass("pb2_4");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
         })
        //事件三
         $(".page2").on("click",".pb2_4",function(){

            audioAutoPlay3();
            // 触发事件2条件2
            $(".an_31_31,.an_31_32").removeClass("on1");
            $(".an_31_31,.an_31_32").addClass("on2");
            $(".page2 .poster3").removeClass("pb2_4");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("沉没在时间的尽头  看不到终点的出口");
            $(".page3_1").addClass("relt3");
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
             $(".page3 .page3_1").fadeIn(500);
            $(".page2 .poster1").removeClass("pb2_4");
            $(".page3").removeClass("hidden");
        })
         $(".an_32_32,.an_32_31").click(function(){

             $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#经过了激烈的搏斗，最终没能战胜敌军，你含恨而亡";
            print(str);
            $(".page2 .poster3").addClass("pb3_4");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
         })
         $(".page3").on("click",".page3_1.relt3",function(){

            
            $(".page3 .page3_1").removeClass("relt3");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            // $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type3_1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            // $(".result_box").removeClass("hidden");
        })
         
        $(".an_41_2").click(function(){

            // -触发事件2条件2
            $(".an_31_31,.an_31_32").removeClass("on1");
            $(".an_31_31,.an_31_32").addClass("on2");
            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#大副被你杀掉，而你看着远处驶来的敌舰，心理忧心忡忡";
            print(str);
            $(".page2 .poster3").addClass("pb2_6");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_42_2").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".poster2").removeClass("hidden");
            $(".poster3").addClass("hidden");
            $(".poster2").addClass("pb2_5_1");
            $(".page2").removeClass("hidden");
            str="#大副被你强行控制了起来，而那雷达上的战舰越来越近，直到海平线上浮现了身影";
            print(str);
            //触发事件2条件1
            $(".an_31_31").removeClass("on2");
            $(".an_31_31").addClass("on1");
            $(".an_31_32").removeClass("on2");
            $(".an_31_32").addClass("on1");
        })
         $(".page2").on("click",".pb2_5_1",function(){

            $(".page2 .poster1 p").remove();
            $(".poster2").removeClass("pb2_5_1");
            clearTimeout(timer2);
            $(".page2 .poster3").addClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            str="#让人心惊胆战的是，那是敌人的战舰！倘若大副真的前往，后果将不堪设想！";
            $(".poster2").addClass("pb2_5_2");
             print(str);
        })
         $(".page2").on("click",".pb2_5_2",function(){

            $(".page2 .poster1 p").remove();
            $(".poster2").removeClass("pb2_5_2");
            clearTimeout(timer2);
            str="#当然，现在的情况，也好不了哪儿去";
            print(str);
            $(".page2 .poster3").addClass("pb2_5");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster2").addClass("hidden");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".page2").on("click",".pb2_5",function(){

            audioAutoPlay3();
            $(".page2 .poster3").removeClass("pb2_5");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("沉没在时间的尽头  看不到终点的出口");
            $(".page3_1").addClass("relt3");
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
             $(".page3 .page3_1").fadeIn(500);
            $(".page2 .poster1").removeClass("pb2_5");
            $(".page3").removeClass("hidden");
        })
        $(".page2").on("click",".pb2_6",function(){

            audioAutoPlay3();
            $(".page2 .poster3").removeClass("pb2_6");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".page3_1 .poster0 p").html("沉没在时间的尽头  看不到终点的出口");
            $(".page3_1").addClass("relt3");
            $(".page3 .poster1").addClass("hidden");
            $(".board_mao").hide();
            $(".mao").removeClass("xuanzhuan");
             $(".page3 .page3_1").fadeIn(500);
            $(".page2 .poster1").removeClass("pb2_6");
            $(".page3").removeClass("hidden");
        })
        // 第三篇
        $(".an_11_3").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你下令全面与敌人开战，最终你们战败了，你含恨而亡……";
            print(str);
            $(".page2 .poster3").addClass("pb3_1");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_12_3").click(function(){

            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type3_2.on").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },800);
        })
        $(".an_21_32,.an_21_31").click(function(){


            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#敌军让你带路寻找，你最终带着他们找到了巅峰战舰的图纸所在地";
            print(str);
            $(".page2 .poster3").addClass("pb3_2");
            $(".page2 .poster3").removeClass("pb3_3");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        
         $(".an_22_32,.an_22_31").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你没能逃走，含恨而亡，但敌军也因为未能获得指示图未能找到巅峰战舰的设计图纸";
            print(str);
             $(".page2 .poster3").removeClass("pb3_2");
            $(".page2 .poster3").addClass("pb3_3");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".page2").on("click",".pb3_2",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb3_2");
            $(".page2 .poster3").removeClass("pb3_3");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            // $(".result_box,.page1_2").addClass("hidden");
            // $(".page2").removeClass("hidden");
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type3_3.on").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");

        })
        $(".an_31_31").click(function(){

            if($(this).hasClass("on1")){
                  $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#在争抢图纸的过程当中，敌军朝你开枪，大副为了救你，帮你挡下了子弹，倒在血泊中，而海平线上一艘艘战舰突然出现，你的好友正赶来救援，经过一番搏斗，你们击败敌军，成功逃脱";
            print(str);
            $(".page2 .poster3").addClass("pb3_5");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
            $(this).removeClass("on1");
            }else if($(this).hasClass("on2")){
                $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#在争抢图纸的过程当中，敌军朝你开枪，你倒在了血泊中，但你的好友最终战胜了敌军";
            print(str);
            $(".page2 .poster3").addClass("pb3_8");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
            $(this).removeClass("on2");
            }else{
                alert("error");
            }

        })
        $(".an_31_32").click(function(){

            if($(this).hasClass("on1")){
                  $(".page2 .poster1 p").remove();
                  $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#在争抢图纸的过程当中，敌军朝你开枪，大副为了救你，帮你挡下了子弹，倒在血泊中；但你也无处可逃，最后的关头，你毁掉了图纸，但也丧命于此";
            print(str);
            $(".page2 .poster3").addClass("pb3_7");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
             $(this).removeClass("on1");
            }else if($(this).hasClass("on2")){
                $(".page2 .poster1 p").remove();
                $(".page3").addClass("hidden");
                $(".page2").removeClass("hidden");
                str="#在争抢图纸的过程当中，敌军朝你开枪，你倒在了血泊中";
                print(str);
                $(".page2 .poster3").addClass("pb3_6");
                $(".page3 .poster1 .type").removeClass("active");
                $(".page2 .poster3").removeClass("hidden");
                $(this).removeClass("on2");
            }else{
                alert("error");
            }
        })
        // 触发结局8
        $(".page2").on("click",".pb3_7",function(){

            $(".page2 .poster3").removeClass("pb3_7");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r8").addClass("active");
            $(".relt_bg p.p8").addClass("active");
            $("#result_num span").html("八");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj8");
            type_id="fx";
         })
        // 触发结局7
        $(".page2").on("click",".pb3_5",function(){
            $(".page2 .poster3").removeClass("pb3_5");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r7").addClass("active");
            $(".relt_bg p.p7").addClass("active");
            $("#result_info").removeClass("hidden");
            $("#result_num span").html("七");
            $(".result_box").removeClass("hidden");
            $(".an_51").removeClass("on");
             $(".answer5 img").addClass("hidden");
            $(".an_52").removeClass("hidden");
            HLog.event("dfzj_plot_jj7");
            type_id="yw";
         })
        // 触发结局6
        $(".page2").on("click",".pb3_6",function(){

            $(".page2 .poster3").removeClass("pb3_6");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("dd");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r6").addClass("active");
            $(".relt_bg p.p6").addClass("active");
            $("#result_num span").html("六");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj6");
            type_id="bh";
         })
        // 触发结局5
        $(".page2").on("click",".pb3_8",function(){

            $(".page2 .poster3").removeClass("pb3_8");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("dd");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r5").addClass("active");
            $(".relt_bg p.p5").addClass("active");
            $("#result_num span").html("五");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj5");
            type_id="xs";
         })
        // 触发结局8
        $(".page2").on("click",".pb2_1",function(){

            $(".page2 .poster3").removeClass("pb2_1");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r8").addClass("active");
            $(".relt_bg p.p8").addClass("active");
            $("#result_num span").html("八");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj8");
            type_id="fx";
         })
        // 触发结局8
        $(".page2").on("click",".pb3_3",function(){

            $(".page2 .poster3").removeClass("pb3_3");
            $(".page2 .poster3").removeClass("pb3_2");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r8").addClass("active");
            $(".relt_bg p.p8").addClass("active");
            $("#result_num span").html("八");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj8");
            type_id="fx";
         })
        // 触发结局9
        $(".page2").on("click",".pb3_1",function(){

            $(".page2 .poster3").removeClass("pb3_1");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r9").addClass("active");
            $(".relt_bg p.p9").addClass("active");
            $("#result_num span").html("九");
            $(".result_box").removeClass("hidden");
            type_id="zb";
         })
         $(".page2").on("click",".pb2_2",function(){

            $(".page2 .poster3").removeClass("pb2_2");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r9").addClass("active");
            $(".relt_bg p.p9").addClass("active");
            $("#result_num span").html("九");
            $(".result_box").removeClass("hidden");
             type_id="zb";
         })
         $(".page2").on("click",".pb3_1",function(){

            $(".page2 .poster3").removeClass("pb3_1");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r9").addClass("active");
            $(".relt_bg p.p9").addClass("active");
            $("#result_num span").html("九");
            $(".result_box").removeClass("hidden");
             type_id="zb";
         })
         $(".page2").on("click",".pb3_4",function(){

            $(".page2 .poster3").removeClass("pb3_4");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r9").addClass("active");
            $(".relt_bg p.p9").addClass("active");
            $("#result_num span").html("九");
            $(".result_box").removeClass("hidden");
             type_id="zb";
         })
         //故事四
         $(".page3").on("click",".page3_1.relt4",function(){

            $(".page3 .page3_1").removeClass("relt4");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            // $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type4_1").addClass("active");
            $(".mengceng").css("display","block");
            $(".mengceng").addClass("pb41_20");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            // $(".result_box").removeClass("hidden");
        })
         $(".page3").on("click",".mengceng.pb41_20",function(){

            $(".page3 .poster1 .type4_1 p.p1").hide();
            $(".page3 .poster1 .type4_1 p.p2").fadeIn();
            $(this).removeClass("pb41_20");
            $(".mengceng").addClass("pb42_20");
        })
         $(".page3").on("click",".mengceng.pb42_20",function(){

            $(".page3 .poster1 .type4_1 p.p1,.page3 .poster1 .type4_1 p.p2").hide();
            $(".page3 .poster1 .type4_1 p.p3").fadeIn();
            $(this).removeClass("pb42_20");
            $(".mengceng").hide();
            $(".page3 .poster1 .type4_1 .peo2").removeClass("hidden");
            $(".page3 .poster1 .type4_1 .answer4_1").removeClass("hidden");
        })
        $(".an_11_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#好友显然不相信你说的话，他认为自己的手下忠心耿耿";
            print(str);
            $(".page2 .poster3").addClass("pb4_1");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_12_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#傍晚，你发现了纹身男在甲板上和好友在交谈，好友看起来满目愁容";
            print(str);
            $(".page2 .poster3").addClass("pb4_5");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".page2").on("click",".pb4_1",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb4_1");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type4_2").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
        $(".page2").on("click",".pb4_5",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb4_5");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type4_5").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
        $(".an_21_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            $(".page2 .poster3").addClass("hidden");
            str="#你故意来到纹身男不远的地方，装作与好友聊天，透露出了指示图的放置地点";
            print(str);
            $(".page2 .poster2").addClass("pb40_2");
            
        })
        $(".page2").on("click",".pb40_2",function(){

            $(".page2 .poster1 p").remove();
            clearTimeout(timer2);
            $(".poster2").removeClass("pb40_2");
            $(".poster2").addClass("hidden");
            $(".page2 .poster3").removeClass("hidden");
            str="#到了傍晚，你提前来到了放置地点蹲守……";
            print(str);
            $(".poster2").addClass("hidden");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
            $(".page2 .poster3").addClass("pb4_2");
        })
        $(".an_22_4").click(function(){

            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type4_4").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },800);
        })
        $(".page2").on("click",".pb4_2",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb4_2");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type4_3").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
        $(".an_31_4,.an_41_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你没能搏斗过纹身男，被他丢下了海里，你含恨而亡";
            print(str);
            $(".page2 .poster3").addClass("pb4_3");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_32_4,.an_42_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你刚起来电话，还未拨通，“砰”的一枪响，你倒在血泊中，含恨而亡";
            print(str);
            $(".page2 .poster3").addClass("pb4_4");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_51_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#好友沉思良久，认为你的担心是有必要的，于是你们设计透露出了指示图的消息在第二天引诱纹身男来到了虚假的地点";
            print(str);
            $(".page2 .poster3").addClass("pb4_6");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_52_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            $(".page2 .poster3").addClass("hidden");
            str="#由于你备齐了武器，纹身男没能打过你，你制服他后质问他有何图谋";
            print(str);
            $(".page2 .poster2").addClass("pb47_2");
        })
        $(".page2").on("click",".pb47_2",function(){

            $(".page2 .poster1 p").remove();
            clearTimeout(timer2);
            $(".poster2").removeClass("pb47_2");
            $(".poster2").addClass("hidden");
            $(".page2 .poster3").removeClass("hidden");
            str="#他承认是看上了你的指示图，而他们手上持有钥匙，希望打造出巅峰战舰称霸海洋";
            print(str);
            $(".poster2").addClass("hidden");
            $(".page2 .poster3").addClass("pb4_7");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".page2").on("click",".pb4_6",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb4_6");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type4_6").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
        $(".page2").on("click",".pb4_7",function(){

            $(".page3 .page3_1").hide();
            $(".page2 .poster3").removeClass("pb4_7");
            $(".page2 .poster3").addClass("hidden");
            $(".page3 .page3_1").removeClass("on");
            $(".board_mao").show();
            $(".page3 .poster1 .type").removeClass("active");
            setTimeout(function(){
                 $(".page3 .poster1 .type.type4_7").addClass("active");
                 $(".mao").removeClass("xuanzhuan2");
                 $(".mao").removeClass("xuanzhuan");
            },100);
            $(".page3").removeClass("hidden");
         })
        $(".an_61_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你没能搏斗过纹身男，被他丢下了海里，你含恨而亡";
            print(str);
            $(".page2 .poster3").addClass("pb4_3");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_62_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#联系好友，让他迅速前来捉拿叛贼";
            print(str);
            $(".page2 .poster3").addClass("pb4_4");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_71_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            str="#你见到了好友，你用枪指着他，他承认了所有的罪行你笑了笑，开枪杀死了好友";
            print(str);
            $(".page2 .poster3").addClass("hidden");
            $(".page2 .poster2").addClass("pb48_2");
            
        })
         $(".page2").on("click",".pb48_2",function(){

            $(".page2 .poster1 p").remove();
            clearTimeout(timer2);
            $(".poster2").removeClass("pb48_2");
            str="#你带着图纸和钥匙，最终找到图纸打败敌军，踏上了回家的旅程";
            print(str);
            $(".poster2").addClass("hidden");
            $(".page2 .poster3").addClass("pb4_8");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        $(".an_72_4").click(function(){

            $(".page2 .poster1 p").remove();
            $(".page3").addClass("hidden");
            $(".page2").removeClass("hidden");
            str="#你见到了好友，但他仿佛早有准备，举枪对着你，他承认了所有的罪行后，杀掉了你";
            $(".poster1 p").css("top","3rem");
            print(str);
            $(".page2 .poster3").addClass("pb4_9");
            $(".page3 .poster1 .type").removeClass("active");
            $(".page2 .poster3").removeClass("hidden");
        })
        //触发结局一
         $(".page2").on("click",".pb4_8",function(){

            
            $(".page2 .poster3").removeClass("pb4_8");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r1").addClass("active");
            $(".relt_bg p.p1").addClass("active");
            $("#result_num span").html("一");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj1");
            type_id="sg";
         })
         //触发结局二
         $(".page2").on("click",".pb4_9",function(){

            
            $(".page2 .poster3").removeClass("pb4_9");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r2").addClass("active");
            $(".relt_bg p.p2").addClass("active");
            $("#result_num span").html("二");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj2");
            type_id="zx";
         })
        //触发结局三
         $(".page2").on("click",".pb4_3",function(){

            
            $(".page2 .poster3").removeClass("pb4_3");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r3").addClass("active");
            $(".relt_bg p.p3").addClass("active");
            $("#result_num span").html("三");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj3");
            type_id="qd";
         })
         //触发结局四
         $(".page2").on("click",".pb4_4",function(){
            

            $(".page2 .poster3").removeClass("pb4_4");
            $(".page3 .page3_1").removeClass("relt");
            $(".page3 .page3_1").addClass("on");
            $(".poster1 .type").removeClass("active");
            $(".swiper-container").addClass("hidden");
            $(".tc_gift").addClass("hidden");
            $(".page3 .poster1 .type.type1").addClass("active");
            $(".mao").removeClass("xuanzhuan2");
            $(".mao").removeClass("xuanzhuan");
            $(".relt_bg img").removeClass("active");
            $(".relt_bg p").removeClass("active");
            $(".relt_bg img.r4").addClass("active");
            $(".relt_bg p.p4").addClass("active");
            $("#result_num span").html("四");
            $(".result_box").removeClass("hidden");
            HLog.event("dfzj_plot_jj4");
            type_id="mh";
         })
        $(".invite").click(function(){
            $(".share_bg").removeClass("hidden");
        })
        $(".share_bg").click(function(){
            $(this).addClass("hidden");
            HLog.event("dfzj_plot_share");
        })
        $(".sel_box li").click(function(){
            var index=$(this).index();
            if($(this).hasClass("active")){
                $(".page1_2 .btn_box a.again").addClass("on");
            }else{
                $(".page1_2 .btn_box a.again").removeClass("on");
            }
            $(".bg_box img").eq(index).addClass("active").siblings().removeClass("active");
        })
        $(".sel_box").on("click","li.active a",function(){
            $(".page1_2 .tc_gift").removeClass("hidden");
        })
        $(".close_btn").click(function(){
            $(".page2 .poster1 p").remove();
            $(".swiper-container").removeClass("hidden");
            $(".page1").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".page3 .poster1").addClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            $(".result_box").addClass("hidden");
            $(".swiper-container").addClass("hidden");
            $(".rule_box").addClass("hidden");
            $(".tc_gift,.tc_gift2,.tc_gift3").addClass("hidden");
            
        });
        $(".result_box .close_btn").click(function(){
            $(".result_box").addClass("hidden");
        })
        $(".look_gift2").click(function(){
            gift();
        })
        $(".again").click(function(){
            if(game_num <= 0){
                alert("暂无冒险机会，快去邀请好友吧");
            }else{
                HLog.event("dfzj_plot_start");
                $(".page2 .poster1 p").remove();
                clearTimeout(timer2);
            $(".swiper-container").removeClass("hidden");
            $(".page1").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".page3 .poster1").addClass("hidden");
            $(".page2 .poster2").removeClass("hidden");
            $(".result_box").addClass("hidden");
            $(".poster0 p").html("肩负巅峰的使命 迎来命运的抉择");
            $(".page3 .page3_1 .poster0 p").addClass("ani");
            $(".page2 .poster2").addClass("on");
            str="#你带着一张航海图，正前往大海深处，寻找传说中巅峰战舰的设计图，传闻一旦拥有它，便可以称霸海洋……";
            print(str);
        }
        });
        $(".again2").click(function(){
            if(game_num <= 0){
                alert("暂无冒险机会，快去邀请好友吧");
            }else{
                HLog.event("dfzj_plot_again");
            $(".page2 .poster1 p").remove();
            clearTimeout(timer2);
            $(".result_box").addClass("hidden");
            $(".swiper-container").removeClass("hidden");
            $(".page1").addClass("hidden");
            $(".page2").removeClass("hidden");
            $(".page3 .poster1").addClass("hidden");
            $(".poster0 p").html("肩负巅峰的使命 迎来命运的抉择");
            $(".page3 .page3_1 .poster0 p").addClass("ani");
            $(".page2 .poster2").removeClass("hidden");
             $(".page2 .poster2").addClass("on");
            str="#你带着一张航海图，正前往大海深处，寻找传说中巅峰战舰的设计图，传闻一旦拥有它，便可以称霸海洋……";
            print(str);
            }
        })
        $(".sel_box .sel1").click(function(){
            HLog.event("dfzj_plot_menusel1");
            if(js1){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel2").click(function(){
            HLog.event("dfzj_plot_menusel2");
            if(js2){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel3").click(function(){
            HLog.event("dfzj_plot_menusel3");
            if(js3){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel4").click(function(){
            HLog.event("dfzj_plot_menusel4");
            if(js4){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel5").click(function(){
            HLog.event("dfzj_plot_menusel5");
            if(js5){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel6").click(function(){
            HLog.event("dfzj_plot_menusel6");
            if(js6){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel7").click(function(){
            HLog.event("dfzj_plot_menusel7");
            if(js7){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel8").click(function(){
            HLog.event("dfzj_plot_menusel8");
            if(js8){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        $(".sel_box .sel9").click(function(){
            HLog.event("dfzj_plot_menusel9");
            if(js9){
                $(".page1_2 .again").addClass("on");
            }else{
                $(".page1_2 .again").removeClass("on");
            }
        })
        // 终极礼包
        $(".zj_gift").click(function(){
            zj_gift1();
        });
        // 活动规则
         $(".rule_btn").click(function(){
            $(".rule_box").removeClass("hidden");
         })
    });