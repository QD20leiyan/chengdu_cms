
function width() {
     var width = window.innerWidth   
        if(width<1599){
            $(".meidas_list div:eq(4)").attr('id','do_this');
            $(".meidas_list div:eq(5)").attr('id','do_this');
        } 
        if (width>1599){
            $(".meidas_list div:eq(4)").removeAttr("id");
            $(".meidas_list div:eq(5)").removeAttr("id");
        }
}
width();
$(window).resize(function() {  
   width();
});  

$(function () {
        

        // banner鼠标移动效果
         var index_div_pro = [
                {
                        sx: 0,
                        sy: 642,
                        mw: 30,
                        mh: 1,
                        bx: 8.4,
                        by: 10.4,
                        rx: -0.6
                },
                {
                        sx: 240,
                        sy: 234,
                        mw: 3,
                        mh: 0.5,
                        bx: 6.4,
                        by: 8.4,
                        rx: -0.1
                },
                {
                        sx: 490,
                        sy: 0,
                        mw: 0.3,
                        mh: 0.1,
                        bx: 6.5,
                        by: 7.4,
                        rx: -0.1
                },
                {
                        sx: 105,
                        sy: 204,
                        mw: 0.3,
                        mh: 0.1,
                        bx: 6.5,
                        by: 7.4,
                        rx: -0.1
                },
                {
                        sx: 785,
                        sy: 90,
                        mw: 0.3,
                        mh: 0.1,
                        bx: 6.5,
                        by: 7.4,
                        rx: -0.1
                },
                 {
                     sx: 1246,
                     sy:220,
                     mw: 0.3,
                     mh: 0.1,
                     bx: 6.5,
                     by: 7.4,
                     rx: -0.1
                 },
             {
                 sx: 1360,
                 sy:243,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.2
             },
             {
                 sx: 1425,
                 sy:297,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.3
             },
             {
                 sx: 1400,
                 sy:340,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.4
             },
             {
                 sx: 1395,
                 sy:466,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.4
             },
             {
                 sx: 1310,
                 sy:438,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.3
             },
             {
                 sx: 1325,
                 sy:565,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.2
             },
             {
                 sx: 1315,
                 sy:640,
                 mw: 0.3,
                 mh: 0.1,
                 bx: 6.5,
                 by: 7.4,
                 rx: -0.1
             }

         ];
                
                var ePageX = null;
                var ePageY = null;
                
                function getMousePos(expression) {
                        if (ePageX == null || ePageY == null) return null;
                        var _x = $(expression).position().left;
                        _x += ePageX - $(expression).parent().position().left;
                        var _y = $(expression).position().top;
                        _y += ePageY - $(expression).parent().position().top;
                        return {
                                x: _x,
                                y: _y
                        }
                };
                
                var index_xh = setInterval(function () {
                        for (var i = 0; i < 13; i++) {
                                var mousepos = getMousePos("#indexg" + i);
                                if (mousepos != null) {
                                        var left = parseInt($("#indexg" + i).css("left"));
                                        var l = left + (index_div_pro[i].sx + index_div_pro[i].mw - (mousepos.x - 100) / index_div_pro[i].bx * index_div_pro[i].rx - left) * 0.2;
                                        var top = parseInt($("#indexg" + i).css("top"));
                                        var t = top + (index_div_pro[i].sy + index_div_pro[i].mh - (mousepos.y - 100) / index_div_pro[i].by - top) * 0.2;
                                        $("#indexg" + i).css({
                                                left: l,
                                                top: t
                                        })
                                }
                        }
                },
                15);
                
                $("body").mousemove(function (event) {
                        event = event || window.event;
                        ePageX = event.pageX;
                        ePageY = event.pageY;
                });

        // 鼠标移入事件
        $('.r_icon1').mouseover(function () {
            $('.down_game').css('display','block');
        })
        $('.down_game').mouseover(function () {
            $('.down_game').css('display','block');
        })
        $('.r_icon8').mouseover(function () {
            $('.channel').css('display','block');
        })
        $('.channel').mouseover(function () {
            $('.channel').css('display','block');
        })
        $('.r_icon7').mouseover(function () {
            $('.weixin_gift').css('display','block');
        })
        $('.weixin_gift').mouseover(function () {
            $('.weixin_gift').css('display','block');
        })
        $('.r_icon1').mouseout(function () {
            $('.down_game').css('display','none');
        })
        $('.down_game').mouseout(function () {
            $('.down_game').css('display','none');
        })
         $('.channel').mouseout(function () {
            $('.channel').css('display','none');
        })
         $('.weixin_gift').mouseout(function () {
            $('.weixin_gift').css('display','none');
        })
         $('.r_icon7').mouseout(function () {
            $('.weixin_gift').css('display','none');
        })
        $('.r_icon8').mouseout(function () {
            $('.channel').css('display','none');
        })
        
        /*轮播*/
        $(document).ready(function(){
            var curr = 0;
            var num = $('#js .box01').find('a').length;
            $("#jsNav a.trigger").each(function(i){
                $(this).click(function(){
                    curr = i;
                    $("#js a").eq(i).fadeIn("fast").siblings("a").fadeOut("fast");
                    $(this).addClass("imgSelected").siblings().removeClass("imgSelected");
                });
            });
            var timer = setInterval(function(){               
                var go = (curr + 1) % num;
                $("#jsNav a.trigger").eq(go).click();
            },3000);
            $("#js,#next,#prev").hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(function(){
                var go = (curr + 1) % num;
                $("#jsNav a.trigger").eq(go).click();
            },3000);
            });

          $(".slide").hover(function(){

              $(this).find(".qq").show(100);}

              ,function(){

                $(this).find(".qq").hide(100);

            });

        });



    //右侧导航栏
    $(function() {
        var index = 0;
        var aLi = $('.r_nav').find('li');
        var aSpan = aLi.find('span');
        aLi.mouseover(function() {
            index = $(this).index();
            aSpan.eq(index).addClass('on').siblings().removeClass("on");
        })

        aLi.mouseout(function() {
            index = $(this).index();
             aSpan.eq(index).removeClass("on");
        })
    })

    var mySwiper0 = new Swiper('.swiper-container1', {
            direction:'horizontal',
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
        })
    var swiper = new Swiper('.swiper-container3', {
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        autoplay : 5000
    });

    // $('.team1').click(function () {
    //     alert('暂未开放，尽情期待');
    // })
    //$('.ios_down2').click(function () {
    //    alert('暂未开放，尽情期待');
    //})
    // $('.android_down2').click(function () {
    //     alert('暂未开放，尽情期待');
    // })
    //$('.ios_down').click(function () {
    //    alert('暂未开放，尽情期待');
    //})
    //$('.android_down').click(function () {
    //    alert('暂未开放，尽情期待');
    //})
    $('.next_contact1').click(function () {
        window.open ('http://tieba.baidu.com/f?kw=nbalive%E6%89%8B%E6%B8%B8&ie=utf-8');
    })




    // 预约弹窗功能
    //$(".order_now").click(function(){
    //    $(".order_mask").show();
    //})
    //$(".close_btn").click(function(){
    //    $(".order_mask").hide();
    //})   

    $(".android").click(function() {
        $(".android").attr('class','android_change');
        $(".ios").attr('class','ios_change');
    })
    $(".ios").click(function() {
        $(".android_change").attr('class','android');
        $(".ios_change").attr('class','ios');
    })
    

    $('#gift_btn').click(function(){
                var phone = $('#phone').val(); 
                if($(".system_choose span").eq(0).hasClass("ios")){
                    var platform=2;
                }else if($(".system_choose span").eq(0).hasClass("ios_change")){
                    var platform=1;
                }                              
                //验证手机
                var reg = /^1[3|4|5|7|8]\d{9}$/;
                if(!reg.test(phone))
                {
                    window.alert("请正确输入11位手机号码！");
                    return false;
                }

                var data = {
                "mobile" : phone,
                "platform" :platform
                };
                $.ajax({
                    //url: '',
                    url: '/site/order',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success :function(data){
                        if(data['code']==1){
                            $("#gift_btn").attr('class','ordered');
                            alert('恭喜您预约成功！');
                            return false;
                        }
                        else if(data['code']==0){
                            window.alert("请正确输入11位手机号码！");
                        }
                        else if(data['code']==2){
                            $("#gift_btn").attr('class','ordered');
                            window.alert("该号码已进行过预约！");
                        }
                    },
                    error: function(){
                    }
                });
            })

});
