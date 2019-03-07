
    var play1=true;
    var click_able=true;
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
        document.getElementById('music').play();
        document.getElementById('music').volume = .5;
        document.addEventListener("WeixinJSBridgeReady", function () {
           document.getElementById('music').play();
            document.getElementById('music').volume = .5;
             setTimeout(function(){
              document.getElementById('music').volume += .1;
              },1200);
        }, false);
    }
    function nba_ym_md(name){
        HLog.push(name);
        console.log(name);
    }
    function md_ym_sy(){
    var num = 0;
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push("nba_dt_page1");
                clearInterval(timer);
            }
        }, 500);
}
    var page2="nba_dt_page2";
    var page3="nba_dt_page3";
    var page4="nba_dt_page4";
    var page5="nba_dt_page5";
    var page6="nba_dt_page6";
    var page7="nba_dt_page7";
    var page8="nba_dt_page8";
    $(function() {
        audioAutoPlay1();
        md_ym_sy();
        //滑动页面
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            mousewheelControl: false,
            observer: true,
            observeParents: true,
            noSwiping: true,
            // effect : 'fade',
            fade: {
                crossFade: true
            },
            onInit: function (swiper) {
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
                var audio1=$("#music").attr("src");
                $("#music").attr("src",audio1);
            },
            onSlideChangeEnd: function (swiper) {
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
            }
        });
        var true_id=0;
        var send1="";
        var send_all="";
        var index_tm=$("body").find(".page").index();
        $(".xsj").click(function(){
            if($(".nba_xsj_num").length>0){
                HLog.event("nba_xsj_num");
                console.log(111);
            }else{
                console.log(222);
            }
        })
        $(".daan_box li").click(function(){
            if(click_able){
            audioAutoPlay2();
            var index=$(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            var child=$(this);
            var sen1=Number($(this).data("id"));
            send_all =Number(send_all + sen1);
            setTimeout(function(){
                // mySwiper.slideNext();
                child.parent().parent().parent().addClass("hidden");
                console.log(send_all);
                click_able =true;
            },1000);
            click_able =false;
            }
        });
        $(".page2 .daan_box li").click(function(){
            nba_ym_md(page3);
        })
        $(".page3 .daan_box li").click(function(){
            nba_ym_md(page4);
        })
        $(".page4 .daan_box li").click(function(){
            nba_ym_md(page5);
        })
        $(".page5 .daan_box li").click(function(){
            nba_ym_md(page6);
        })
        $(".page6 .daan_box li").click(function(){
            nba_ym_md(page7);
        })
        $(".page7 .daan_box li").click(function(){
            console.log(send_all);
            if(send_all == 24 || send_all == 23){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li10").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp3").addClass("active");
                $(".pp_peo_name").html("奥尼尔");
                $(".description").html("你或许还不知道，你的天赋已经超过了这个时代，拼命的努力能使你的天赋璀璨放光，请保持前进，你就是主宰！");
            }
            
            if(send_all == 22 || send_all == 21){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li2").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp2").addClass("active");
                $(".pp_peo_name").html("詹姆斯");
                $(".description").html("万王之王，天赋凌然！通向成功的路是孤独的，但是别忘记时常告诉自己，唯有努力才能保持天赋！");
            }
            if(send_all == 20 || send_all == 19){
                 $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li1").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp1").addClass("active");
                $(".pp_peo_name").html("哈登");
                $(".description").html("努力是你的代名词，尽管曾有乌云遮住你的天赋，但请你足够相信，夏天的每一滴汗水都将化为成功的泪水。");
               }
            if(send_all == 18 || send_all == 17){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li9").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp5").addClass("active");
                $(".pp_peo_name").html("约翰逊");
                $(".description").html("无论是技术、领导力、观赏性，你都无可挑剔，善用你的天赋，你就是时代的选择。");
                
            }
            if(send_all == 16 || send_all == 15){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li7").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp2").addClass("active");
                $(".pp_peo_name").html("杜兰特");
                $(".description").html("那些质疑你的人从未到达你曾经的高度，而你却依旧在往高处攀登！努力与天赋助你成为MVP。");
                
            }
            if(send_all == 14 || send_all == 13){

                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li8").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp1").addClass("active");
                $(".pp_peo_name").html("吉诺比利");
                $(".description").html("你就像一把妖刀，精准而致命，永远能抓住最好的机会，在最正确的时间做出最正确的出手。");
                
            }
            if(send_all == 12 || send_all == 11){
                 $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li3").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp3").addClass("active");
                $(".pp_peo_name").html("姚明");
                $(".description").html("不要在意那些莫须有的质疑，你要做的就是用自己的天赋与勤奋打破一个个所谓的不可能，你是地上最强！");
            }
            if(send_all == 10 || send_all == 9){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li6").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp5").addClass("active");
                $(".pp_peo_name").html("西蒙斯");
                $(".description").html("你是新时代的超新星，尽管现在还有细节需要打磨，但是未来就是你的！");
            }
            if(send_all == 8 || send_all == 7){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li5").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp5").addClass("active");
                $(".pp_peo_name").html("库里");
                $(".description").html("你的使命就是为了打破规则，请尽情地挥洒你的天赋，用最快最直接的方式解决战斗！");
            }
            if(send_all == 6){
                $(".pp_peo img").removeClass("active");
                $(".pp_peo img.li4").addClass("active");
                $(".pp_name img").removeClass("active");
                $(".pp_name img.pp4").addClass("active");
                $(".pp_peo_name").html("保罗加索尔");
                $(".description").html("你从不屑于那些华丽但无用的炫技，只会在最关键的时刻在敌人的心口上插上制胜的一剑。");
            }
            setTimeout(function(){
                $(".js_load").show();
                $(".page7").addClass("hidden");
                $(".page8").addClass("hidden");
                $(".page9").show();
                if($(".page7 .daan_box li.active.nba_dt_num").length>0){ HLog.event("nba_dt_num"); }
            },800);
             setTimeout(function(){
            var canvas2 = document.createElement("canvas");
            let _canvas = document.querySelector('.page9');
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
                $(".js_load").hide();
                $(".page8").removeClass("hidden");
                $(".jp_img1").attr("src",canvas.toDataURL("data:image/jpeg"));
                $(".page8").removeClass("hidden");
                nba_ym_md(page8);
            });
             },1100);

        })
        $(".test_go_btn").click(function(){
            nba_ym_md(page2);
            mySwiper.slideNext();
            $(".page1").addClass("swiper-no-swiping");
        });
        $(".music_img").click(function(){
            if(play1){
                document.getElementById('music').pause();
                $(this).addClass("active");
                play1=false;
            }else{
                document.getElementById('music').play();
                $(this).removeClass("active");
                play1=true;
            }
        })
        });