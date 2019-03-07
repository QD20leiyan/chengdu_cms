$(function(){
//	$(".main01_top a").click(function(){
//		$(this).addClass("on").siblings("a").removeClass("on");
//	})
	
	$(".sign_bot p span").click(function(){		
		if($(this).attr("class")=='on'){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}		 
	})
	
	var sWidth = $(".con01").width();
	var cov_length = $(".con01 ul li").length;
	var index = 0;
	var picTimer;
	var btn = "<div class='buttons'>";
	for (var i = 0; i < cov_length; i++) {
			if(i==0){
				btn+="<span class='on'></span>";
			}else{
				btn+="<span></span>";
			}
		}
	$(".con01").append(btn);
	$(".con01 ul").css("width", sWidth * (cov_length));	
	$(".con01").hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if (index == cov_length) {
				index = 0;
			}
		}, 3000);
	}).trigger("mouseleave");	
	function showPics(index) {
		var nowLeft = -index * sWidth;
		$(".con01 ul").stop(true, false).animate({
			"left": nowLeft
		}, 300); 
	
		$(".con01 .buttons span").removeClass("on").eq(index).addClass("on"); 
	}
	
 	$(".mask").click(function(){
 		$(".gift_iframe").hide();
 		$(this).hide();
 	})
 	$(".close_btn").click(function(){
 		$(".gift_iframe").hide();
 		$(".mask").hide();
 	})
// 验证手机号码
    $(".check_from").click(function(){
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
        	$(".gift_iframe").show();
        	$(".mask").show();
        }        
    })
    $(".xs_nav li").click(function(){
		var index=$(this).index();
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".qzdq .qzdq_0").eq(index).show().siblings(".qzdq_0").hide();
	})
	$(".qzdq_01").img_loop_lb();
})
