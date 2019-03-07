$(function(){
	$(".receive").click(function(){
		$(".gift_tck").show();
	    function showtime(){
	        $(".gift_tck").fadeOut();
	    }
	    var test = setTimeout(function(){
	        showtime()
	    },3000);
	})
	
	$(".news").tab_switch();
	$("#img01,#about_image").img_lb();
	//弹出框
	var s_index = 0;
    var $wrap = $(".main04_main");
    $wrap.find("ul li").click(function() {
        var ss_index = $(this).index();
        $(".tck_con").show();
        $(".mask").show();
        var dis = ss_index - s_index;
        var sl = dis * 1000;
        s_index = ss_index;
        $(".con ul").animate({
            left: '-=' + sl
        });
    })
    $(".prevbtn").click(function() {
        if (s_index == 0) {
            s_index = 3;
            $(".con ul").css({
                'left': '-5000px'
            });
            $(".con ul").animate({
                left: '+=1000px'
            });
        } else {
            s_index--;
            $(".con ul").animate({
                left: '+=1000px'
            });
        }

    })
    $(".nextbtn").click(function() {
        if (s_index == 3) {
            s_index = 0;
            $(".con ul").css({
                'left': '0'
            });
            $(".con ul").animate({
                left: '-=1000px'
            });
        } else {
            s_index++;
            $(".con ul").animate({
                left: '-=1000px'
            });
        }

    })
    $(".close").click(function() {
        $(".tck_con").hide();
        $(".mask").hide();
    })
    
	//微信
	$(".weixin").click(function(){
		$(".weixin").hide();
		$(".wx_tck").show();
	})
	$(".wx_tck").click(function(){
		$(".wx_tck").hide();
		$(".weixin").show();
	})
	//list
	$(".list_tcon ul li").mouseover(function(){
		$(this).find(".ico").show();
	})
	$(".list_tcon ul li").mouseout(function(){
		$(this).find(".ico").hide();
	})
	// 验证手机号码
    $(".sign").click(function(){
		return false;
    	var mobile=$(".mobile").val();
    	var myreg = /^(1[3|4|5|8][0-9]+\d{8})$/;
    	if(mobile.length==0)
        {
           alert('请输入手机号码！');
           document.form1.mobile.focus();
           return false;
        }
        else if(mobile.length!=11)
        {
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else if(!myreg.test(mobile))
        {  
            alert('请输入有效的手机号码！');
            document.form1.mobile.focus();
            return false;
        }else{
        	$(".sign_frame").show();
        }        
    })
    $(".close_sframe").click(function(){
 		$(".sign_frame").hide();
 	})
    //滚动
    var speed = 20; //数字越大速度越慢
	var tab_image_s = document.getElementById("demo_s");
	var tab1_s = document.getElementById("demo1_s");
	var tab2_s = document.getElementById("demo2_s");
	tab2_s.innerHTML = tab1_s.innerHTML;
	function Marquee() {
		if (tab2_s.offsetWidth - tab_image_s.scrollLeft <= 0)
			tab_image_s.scrollLeft -= tab1_s.offsetWidth
		else {
			tab_image_s.scrollLeft++;
		}
	}
	var MyMar = setInterval(Marquee, speed);
	tab_image_s.onmouseover = function() {
		clearInterval(MyMar)
	};
	tab_image_s.onmouseout = function() {
		MyMar = setInterval(Marquee, speed)
	};
    $(".main06_main").img_gdong();
    $(".play_btn").click(function(){
		$("#video_mask").show();
	})
	$("#close").click(function(){
		$("#video_mask").hide();
	})
})
