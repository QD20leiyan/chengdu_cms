$(window).scroll(function(){
    var $t = $(this).scrollTop();
    if($t > 50){
        $(".l_gotop").stop().fadeIn();
    }else{
        $(".l_gotop").stop().fadeOut();
    }
});
$(function(){
    var  h5_wx=$(".h5_wx").html();
    var  h5_data=$(".h5_data").html();
    var options = new Array();
    var ans_url="/tk/bd/index.html?h5data="+h5_data;
    var srf = $('meta[name="csrf-token"]').attr('content');
    var sel_txt1=$(".tm_sel1 a.active").data("sel");
    var sel_txt2=$(".tm_sel2 a.active").data("sel");
    var sel_txt3=$(".tm_sel3 a.active").data("sel");
    var sel_txt4=$(".tm_sel4 a.active").data("sel");
    var sel_txt5=$(".tm_sel5 a.active").data("sel");
    function md_ym_sy(){
            var num = 0;
                var timer = setInterval(function () {
                    if (!window.HLog) {
                        num++;
                        if (num >= 10) {
                            clearInterval(timer);
                        }
                    } else {
                        HLog.push("tk_bd_page1");
                        clearInterval(timer);
                    }
                }, 500);
        }
        md_ym_sy();
    //swiper初始化
    var swiper02 = new Swiper('.swiper-container2',{
        pagination: '.swiper-pagination2',
        paginationClickable: true,
        effect : 'coverflow',
        slidesPerView: 3,
        centeredSlides: false,
        loop:true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        coverflow: {
            rotate:0,
            stretch:-90,
            depth:440,
            modifier:1,
            slideShadows : false
        }
    });
    // 视频
    $(".l_videoBtn").click(function(){
        HLog.event("tk_bd_video");
    })
    // 下载
    $(".l_download").click(function(){
         HLog.event("tk_bd_down");
    })
    //判断题目
        var true_id=0;
        $("#page3 .part2 .tm_sel a").click(function(){
            $(this).addClass("active").siblings().removeClass("active"); 
        })
         $("#page3 .part2 .choose1").click(function(){
            HLog.event("tk_bd_A");
        })
        $("#page3 .part2 .choose2").click(function(){
            HLog.event("tk_bd_B");
        })
        $("#page3 .part2 .choose3").click(function(){
            HLog.event("tk_bd_C");
        })
         $("#page3 .part2 .choose4").click(function(){
            HLog.event("tk_bd_D");
        })
    //活动规则弹窗显示
    $(".l_btn2").click(function(){
        $(".co_tips_rules").removeClass("hidden");
        HLog.event("tk_bd_hd_tc");
    });
    //弹窗关闭
    $(".co_tips_close,.co_tips_surebtn").click(function(){
        $(".co_tips_rules").addClass("hidden");
        HLog.event("tk_bd_close_tc");
    });

    //回到顶部
    $(".l_gotop").click(function(){
        HLog.event("tk_bd_return_top");
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

    //立即评测
    $(".i_main .l_pc .l_pcbox a").click(function() {
        HLog.push("tk_bd_page2_pince");
        HLog.event("tk_bd_ljpc");
        $("#page1").addClass("hidden");
        $("#page2").removeClass("hidden");
        $("#page3").addClass("hidden");
    });

    //立即参与
    $(".i_main .l_answer .l_btn1").click(function() {
        HLog.push("tk_bd_page3_dt");
        HLog.event("tk_bd_ljcy");
        $("#page1").addClass("hidden");
        $("#page2").addClass("hidden");
        $("body,html").addClass("on");
        $("#page3").removeClass("hidden");
    });
   //开始答题
    $(".test_go").click(function(){
        HLog.push("tk_bd_page4_tm1");
        HLog.event("tk_bd_dt_start");
        $("#page3 .part1").addClass("hidden");
        $("#page3 .part2").removeClass("hidden");
    })
    $(".next.on").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
            $(this).parent().addClass("hidden");
            $(this).parent().next(".tm").removeClass("hidden");
            var li_list=$(this).parent().find(".tm_sel a.active");
            var answer=li_list.data("sel");
            options.push($.trim(answer).charAt());
        }else{
            alert("请选择您认为正确的答案~");
        }
    });
    $(".tm_list1 .next").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
        HLog.push("tk_bd_page5_tm2");
        }
    })
    $(".tm_list2 .next").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
        HLog.push("tk_bd_page6_tm3");
        }
    })
    $(".tm_list3 .next").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
        HLog.push("tk_bd_page7_tm4");
        }
    })
    $(".tm_list4 .next").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
        HLog.push("tk_bd_page8_tm5");
        }
    })
    $(".tm_list5 .next").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
        HLog.push("tk_bd_page9_submit");
        }
    })
    $(".next.on1").click(function(){
        var tm_df=$(this).parent().find(".tm_sel a");
        if(tm_df.hasClass("active")){
            HLog.event("tk_bd_dt_end");
            $(".part2").addClass("hidden");
            $(".part3").removeClass("hidden");
            var li_list=$(this).parent().find(".tm_sel a.active");
            var answer=li_list.data("sel");
            options.push($.trim(answer).charAt());
            var true_num=$("body").find(".tm_sel a.active.true");
            var true_num_id=true_num.length;
            var send=Number(true_num_id)*20;
            $("#send span").html(send);
            console.log(options);
        }else{
            alert("请选择您认为正确的答案~");
        }
    });
    $(".test_submit").click(function(){
        HLog.event("tk_bd_dt_submit");
        var user_name =$(".co_username").val();
        var user_phone =$(".co_userphone").val();
        if(user_name == "" || user_name == undefined) {
          alert("请输入您的昵称~");
          return;
        }
        if(user_phone == "" || user_phone == undefined) {
          alert("手机号码不能为空哦");
          return;
        } else if(user_phone.length != 11) {
          alert("手机号码不正确哦");
          return;
        }
        $.ajax({
            'url':ans_url,
            'data':{
                'answers[0]':options[0],'answers[1]':options[1],'answers[2]':options[2],'answers[3]':options[3],'answers[4]':options[4],'name':user_name,'phone':user_phone,"cms_csrf":srf
            },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.code=="0"){
                     HLog.event("tk_bd_dt_submit_success");
                    alert(data.msg);
                }else{
                   alert(data.msg);
                }
            }
            ,error:function(){
                alert("网络请求错误，请刷新页面");
            }
        });
    })
});
