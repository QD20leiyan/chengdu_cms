var play1=true;
    var  myVid1=document.getElementById("music");
    var  myVid2=document.getElementById("py1");

    //音乐视频初始化
    document.addEventListener('DOMContentLoaded', function () {
        var  myVid1=document.getElementById("music");
        var  myVid2=document.getElementById("py1");
        function audioAutoPlay(){
            myVid1.load();
            myVid1.volume = .3;
            setTimeout(function(){
                  myVid1.volume += .1;
                  },1200);
            document.addEventListener("WeixinJSBridgeReady", function () {
                myVid1.load();
                myVid1.volume = .3;
                 setTimeout(function(){
                  myVid1.volume += .1;
                  },1200);
            }, false);
        }
        audioAutoPlay();
    });
     function audioAutoPlay2(){
            document.getElementById('py1').play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                document.getElementById('py1').play();
            }, false);
        }
    // 获取题目
    // var  h5_wx=$(".h5_wx").html();
    // var  h5_data=$(".h5_data").html();
    // var  h5_url=window.location.href;
    // var  h5_url_index2=h5_url.split("http://")[1];
    // var  info="http://game.yingxiong.com/wechat/index.html?callback_url=http:\/\/"+h5_url_index2+"?h5data="+h5_data;
    // var  info_data="";
    // var  h5_jk_url="";
    // var  test_url="";//题目
    // var  dts_url="";//答案
    // $(".js_load").show();
    // function wx_sq(){
    //     if(h5_wx==1){
    //         if(h5_url.indexOf("info=") >= 0){
    //            $(".js_load").hide();
    //            info_data=window.location.href.split('info=')[1];
    //            h5_jk_url="?h5data="+h5_data+"&info="+info_data;
    //            console.log(info_data);
    //            console.log(h5_jk_url);
    //         }else{
    //             $(".js_load").hide();
    //             location.href =info;
    //             info_data=window.location.href.split('info=')[1];
    //             h5_jk_url="?h5data="+h5_data+"&info="+info_data;
    //             console.log(info_data);
    //             console.log(h5_jk_url);
    //         }
    //     }else{
    //         info="";
    //         h5_jk_url="?h5data="+h5_data;
    //     }
    // }
    // function jk_url(){
    //     wx_sq();
    //    var test_url="/h5-common/get-ti.html"+h5_jk_url;
    //     console.log(test_url);
    //    var dts_url="/h5-common/check-ti-answer.html"+h5_jk_url;
    //      console.log(dts_url);
    // }
    // jk_url();
    //  var wxinfo = getQueryString('info');
    //         if (!wxinfo) {
    //             var url = window.location.href;
    //             window.location.href = "http://game.yingxiong.com/wechat/index.html?callback_url="+url+"?h5data=bc8eqJ2TFMDTsvUpDqYENfiCJXrVMi1FLtoG-9BtBkQIBvK3ZGgBmL9PFDhwqa30lw";
    //         }

    //         function getQueryString(name)
    //         {
    //             var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    //             var r = window.location.search.substr(1).match(reg);
    //             if(r!=null)return  unescape(r[2]); return null;
    //         }

    var test_url="/h5-common/get-ti.html"+h5_jk_url;
    var dts_url="/h5-common/check-ti-answer.html"+h5_jk_url;
    var srf = $('meta[name="csrf-token"]').attr('content');
    var  tm_num=0;
    var  tm_id=0;
    var dts=0;//答对数量
    // 请求题目
    function quest(){
        $.ajax({
            type:'POST',
            url:test_url,
            data:{},
            success:function(data){
                var data = JSON.parse(data);
                if(data.status == 0){
                    var result1="";
                    var result2="";
                    var result3="";
                    var persent="";
                    var j=0;
                    tm_num=data.msg.length;
                    for(var i = 0;i < data.msg.length; i++){
                        if(data.msg[i].options.D == "" || data.msg[i].options.D == undefined){
                            j++;
                            tm_id=j;
                            result1 += "<div class='type'><p class='percent'>进度&nbsp;<span>"+j+"</span>/12</p><div class='question_box'><img src='"+data.msg[i].img+"' class='quest_img'><p class='question_txt' data-num='"+data.msg[i].id+"'>"+data.msg[i].title+"</p></div><div class='choose_box'><a href='javascript:;' class='choose1' data-id='A'>A."+data.msg[i].options.A+"</a><a href='javascript:;' class='choose2' data-id='B'>B."+data.msg[i].options.B+"</a><a href='javascript:;' class='choose3' data-id='C'>C."+data.msg[i].options.C+"</a></div><div class='bg_mc_s'></div><div class='bg_mc2'></div><div class='choose_box2'><a href='javascript:;' class='choose1'></a><a href='javascript:;' class='choose2'></a><a href='javascript:;' class='choose3'></a></div></div>";
                        }else{
                            j++;
                            tm_id=j;
                            result1 += "<div class='type'><p class='percent'>进度&nbsp;<span>"+j+"</span>/12</p><div class='question_box'><img src='"+data.msg[i].img+"' class='quest_img'><p class='question_txt' data-num='"+data.msg[i].id+"'>"+data.msg[i].title+"</p></div><div class='choose_box on'><a href='javascript:;' class='choose1' data-id='A'>A."+data.msg[i].options.A+"</a><a href='javascript:;' class='choose2' data-id='B'>B."+data.msg[i].options.B+"</a><a href='javascript:;' class='choose3' data-id='C'>C."+data.msg[i].options.C+"</a><a href='javascript:;' class='choose4' data-id='D'>D."+data.msg[i].options.D+"</a></div><div class='bg_mc_s'></div><div class='bg_mc2'></div><div class='choose_box2 on'><a href='javascript:;' class='choose1'></a><a href='javascript:;' class='choose2'></a><a href='javascript:;' class='choose3'></a><a href='javascript:;' class='choose4'></a></div></div>";
                        }
                    }
                    $(".page3").append(result1);
                }else if(data.status == 1){
                    alert("请重新登录~");
                }
            },
            error:function(){
                alert("网络请求错误，请刷新页面");
            }
        });
    }
    // 答对题目数判断
    
        var true_id=0;
        $(".page3").on("click",".type .choose_box2 a",function (){
            var that=$(this);
        	var index=$(this).index();
            var index_fa=$(this).parents(".type").index();
            var index_fa_next=index_fa+1;
            $(".page3 .type.active .choose_box>a").eq(index).addClass("active").siblings().removeClass("active");
            true_id=$(".page3 .type.active .choose_box>a.active").data("id");
            true_num=$(".page3 .type.active .question_txt").data("num");
            if(index_fa_next<tm_num){
            setTimeout(function(){
                $(this).parents(".type").removeClass("active");
                $(".type").eq(index_fa_next).addClass("active").siblings().removeClass("active");

             },1300);
            }else{
                setTimeout(function(){
                mySwiper.slideNext();
                $(".js_load").show();
                var canvas2 = document.createElement("canvas");
                       let _canvas = document.querySelector('.page4');
                       var w = parseInt(window.getComputedStyle(_canvas).width);
                       var h = parseInt(window.getComputedStyle(_canvas).height);
                       canvas2.width = w * 2;
                       canvas2.height = h * 2;
                       canvas2.style.width = w + "px";
                       canvas2.style.height = h + "px";
                       var context = canvas2.getContext("2d");
                       context.scale(2,2);
                       html2canvas(_canvas,{canvas:canvas2}).then(function(canvas){
                           console.log(canvas.toDataURL());
                           $(".js_load").hide();
                           $(".page4").addClass("hidden");
                           $(".jp_img").attr("src",canvas.toDataURL());
                           $(".page6").removeClass("hidden");
                            // mySwiper.slideNext();
                       });
                },1000);
            }
            audioAutoPlay2();
            console.log(true_id);
            console.log(true_num);
            $.ajax({
                'url':dts_url,
                'data':{
                            'id':true_num,'option':true_id,"cms_csrf":srf
                        },
                        'type':'POST',
                        'dataType':'Json',
                        success:function(data){
                            if(data.status==0){
                               dts++;
                               num();
                                $(".page3 .type.active .choose_box>a").removeClass("false");
                                $(".page3 .type.active .choose_box>a").removeClass("true");
                                $(".page3 .type.active .choose_box>a.active").addClass("true");
                                $(".page3 .type.active .choose_box.on>a.active").addClass("true");
                            }else{
                                $(".page3 .type.active .choose_box>a").removeClass("true");
                                $(".page3 .type.active .choose_box>a").removeClass("false");
                                $(".page3 .type.active .choose_box>a.active").addClass("false");
                                $(".page3 .type.active .choose_box.on>a.active").addClass("false");
                            }
                            console.log(dts);
                        }
                        ,error:function(){
                            alert("网络请求错误，请刷新页面");
                        }
            });
        });
        //滑动页面
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            mousewheelControl: false,
            observer: true,
            observeParents: true,
            noSwiping: true,
            onInit: function (swiper) {
                swiperAnimateCache(swiper);
                swiperAnimate(swiper);
                var py1=$("#py1").attr("src");
                var py2=$("#py2").attr("src");
            },
            onSlideChangeEnd: function (swiper) {
            },
            onTransitionEnd: function (swiper) {
                swiperAnimate(swiper);
            }
        });