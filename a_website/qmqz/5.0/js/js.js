$(window).load(function(){
	$(".top01 a").click(function(){
    	$(this).addClass("cur").siblings().removeClass("cur");
    });
    $(".snow_list li").click(function(){
    	var index=$(this).index();
    	 $(".snow_list li").eq(index).addClass("on").siblings().removeClass("on");
    	  $(".snow_list01 li").eq(index).show().siblings().hide();
    })
   $(".ticket_list li").click(function(){
   		var index=$(this).index();
   		 $(".ticket_list li").eq(index).addClass("on").siblings().removeClass("on");
   		 $(".ticket_list01 li").eq(index).show().siblings().hide();
   })
    $(".ticket_list01 li .buy").click(function(){
    	alert("关注全民枪战（ID：quanminqiangzhan）官方微信购票");
        
    })
    $(".near_first_list01 li a,.near_seven_list a").click(function(){
    	alert("关注全民枪战（ID：quanminqiangzhan）官方微信购买");
    });
    $(".present_txt").click(function(){
        alert("关注全民枪战微信，回复“嘉年华”参与活动");
    });
    $(".robot .buy").click(function(){
        alert("敬请期待");
    })
    $(".near_first_list li").click(function(){
    	var index=$(this).index();
    	 $(".near_first_list li").eq(index).addClass("on").siblings().removeClass("on");
    	 $(".near_first_list01 li").eq(index).show().siblings().hide();
    })
    $(".video_i").click(function(){
    	//alert("暂未开启");
    });
    $("#team_list_team03 li a").click(function(){
    	alert("敬请期待");
    });
    $("#team_list_team01 li").click(function(){
    	var index=$(this).index();
    	$("#team_list_team01 li").eq(index).addClass("on").siblings().removeClass("on");
    	$("#team_list_team02 li,#team_list_team03 li").removeClass("on");
        $("#team_bot_01 li").eq(index).show().siblings().hide();
        $("#team_bot_02 li").hide();

    })
     $("#team_list_team02 li").click(function(){
    	var index=$(this).index();
    	$("#team_list_team02 li").eq(index).addClass("on").siblings().removeClass("on");
    	$("#team_list_team01 li,#team_list_team03 li").removeClass("on");
    })
     $("#team_list_team02 li.LA_btn").click(function(){
        $(".LA").show();
        $(".LA").siblings().hide();
    })
    $("#team_list_team02 li.Gn_btn").click(function(){
        $(".Gn").show();
        $(".Gn").siblings().hide();
    })
    $("#team_list_team02 li.meng_btn").click(function(){
        $(".meng").show();
        $(".meng").siblings().hide();
    })
     $("#team_list_team02 li.lingdian_btn").click(function(){
       alert("敬请期待");
    })
    $("#team_list_team02 li.BYL_btn").click(function(){
         alert("敬请期待");
    })



    $("#team_list_team03 li").click(function(){
    	var index=$(this).index();
    	$("#team_list_team03 li").eq(index).addClass("on").siblings().removeClass("on");
    	$("#team_list_team01 li,#team_list_team02 li").removeClass("on");
    })
   $(".fixed a:not(.goTop)").hover(function() {
            //鼠标滑上去
        $(this).addClass("hover");
    }, function() {
        //鼠标移开
        $(this).removeClass("hover");
    });
     //鼠标点击
    var mark = 1;
    $(".fixed a:not(.goTop)").click(function() {
        mark = 2; //改变标记
        $(this).addClass("hover");
        $(this).removeClass("hover");
        //点击左边导航 然后跳到指定的楼层                                                                                                                                                                                                                                                                                                    
        var $index = $(this).index(); //找到了对应的序列号
        //saalert($index);
        var $top = $(".main .floor").eq($index).offset().top; //获取制定Louti与浏览器上面的距离
        //alert($top);
        $("body,html").animate({
            scrollTop: $top}, 500, function() {
            mark = 1;
        }); //浏览器滚动的高度
    });
        
         //浏览器串口滚动事件
    $(window).scroll(function() {
        if (mark == 1) {    
            var $t = $(this).scrollTop(); //获取滚动条滚动的高度             
            var $obj = $(".main .floor");
            //循环每一个Louti 然后找到最先满足条件的那个 Louti
            $obj.each(function() {
                var $index = $(this).index();
                
            var $height;
            if ($obj.eq($index).offset()) {
                $height = $obj.eq($index).offset().top + $(this).height() / 2;
            }
            // document.title = $t + "--" + $height;
            });
        }
    });
    $(".fixed").css("right",($(window).width()-1130)/2+"px");
    $(".goTop").click(function(){
        $("body,html").animate({
            scrollTop:0}, 500, function() {
        }); 
    });
    /*领取礼包验证*/

    $(".i-gift").click(function(){
        $(".gift").show();
    });
    $("#bClose").click(function(){
        $(".gift").hide();
    });
    

    //验证手机号
    $(".giftSend").click(function(){
        var timer=null;
        var n=300;
        var phoneVal = $("#phone").val();
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-7]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(phoneVal==""){
            popup('手机号码不能为空</br>请输入手机号码');
        }else if(phoneVal.toString().length!=11){
            popup('手机号码不正确</br>请您重新输入');
        }else if(!myreg.test(phoneVal)){
            popup('手机号码不正确</br>请您重新输入');
        }else if(isNaN(phoneVal)){
            popup('手机号码不正确</br>请您重新输入');
        }else{
            $(this).css("backgroundColor","#666");
            $(this).attr("disabled","disabled");
            timer = setInterval(function(){
                n--;
                $(".giftSend").html('发送验证码（'+n+'）');
                if(n==0){
                    clearInterval(timer);
                    n=300;
                    $(".giftSend").html('发送验证码');
                    $(".giftSend").css("backgroundColor","#2867da");
                    $(".giftSend").removeAttr("disabled");
                }
            },1000);
        }
    });
    //弹窗
    function popup(html){
        $("#popup").html(html+'<i class="close"></i>');
        $("#popup").css("display","block");
        $("#popup .close").click(function(){
            $(this).parent("div").hide();
        });
        return false;
    }
    //预约
    $("#yuyue").click(function(){
        var phoneVal = $("#phone").val();
        var kapkey = $("#kapkey").val();
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-7]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(phoneVal==""){
            popup('手机号码不能为空</br>请输入手机号码');
        }else if(phoneVal.toString().length!=11){
            popup('手机号码不正确</br>请您重新输入');
        }else if(!myreg.test(phoneVal)){
            popup('手机号码不正确</br>请您重新输入');
        }else if(isNaN(phoneVal)){
            popup('手机号码不正确</br>请您重新输入');
        }else if(kapkey==""){
            popup('验证码不能为空</br>请输入验证码');
        }
    });
})