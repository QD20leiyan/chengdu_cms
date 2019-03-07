$(function() {
	var type_id ='';
	var mySwiper = new Swiper('.banner_vg', {
		autoplay: 2500,
        loop:true,
        preventClicks : true,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        prevButton:'.swiper-button-xia',
        nextButton:'.swiper-button-last',
        autoplayDisableOnInteraction:false,
	});
    var $_window = $(window);
    var $main_visual = $('.cover_con');
    var itemLi =$main_visual.find('.item');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.5;
        $(this).find('.item').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
            var newTop = (cursorY - centerY) * (i) / 30 * (-1);
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
            i= i*2;
        });
    });
    function isEmail(email) {
        var reg = /^[^@]+@[^@]+\.[^@]+$/;
        var temp = reg.test(email);
        return temp;
    }
    function checkMobile(mobileObj){
    var mobile = mobileObj.val();
    var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
    if (mobile.length == 0) {
        alert('请输入手机号码！');
        mobileObj.focus();
        return false;
    } else if (mobile.length != 11) {
        alert('请输入有效的手机号码！');
        mobileObj.focus();
        return false;
    } else if (!myreg.test(mobile)) {
        alert('请输入有效的手机号码！');
        mobileObj.focus();
        return false;
    }
    return true;
}
	$(".radio").on("click", function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(this).children('span').addClass("txt_col");
		$(this).siblings().children('span').removeClass("txt_col");
		var type_id = $(".radio.on input").attr("data-id");
	});
    
	$(".weixin").hover(function() {
		$(".erweima").stop().fadeIn();
	}, function() {
		$(".erweima").stop().fadeOut();
	});
	$(".i_share_wx").hover(function() {
		$(".i_share_weixin").stop().fadeIn();
	}, function() {
		$(".i_share_weixin").stop().fadeOut();
	});
 
	$(".video-w").click(function() {
		// var link_url = $(this).attr("rel");
		// $('.videos').html('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="' + link_url + '&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash"></embed>');
		$("#video_mask").show();
	});

	$("#close").click(function() {
		$("#video_mask").hide();
	});
	// nav列表
	$(".news-nav li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".tab-cont ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	// 新闻中心列表
	$(".news-menu li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		$(".lis ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
    
    $(".tel_btn").click(function(){
        var type_id = $(".radio.on input").attr("data-id");
        var mobileObj = $('.tel_p');
        if(type_id == 1){
            if(checkMobile($(mobileObj))){
                $(".tips").show();
                var type = 'ios';
            }
        }else if(type_id == 2){
            var phone = mobileObj.val();
            var type = 'android';
            var my_takon = $("meta[name='csrf-token']").attr("content");
            if(checkMobile($(mobileObj))){
                $(".tips").hide();
                $.post(
                    '/site/savephone',
                    {
                        phone:phone,
                        type:type,
                        scene:1,
                        cms_csrf: my_takon
                    },
                    function(data){
                        if(data.status == 0){
                            alert("预约成功！");
                            $("input").val("");
                        }else{
                            alert(data.msg);
                            $("input").val("");
                            return false;
                        }
                    }
                    ,'json');
            }
        }
    });
    $(".getcode").click(function(){
        var email= $('.email').val();
        var mobileObj = $('.tel_p');
        var phone = mobileObj.val();
        var url = '/commonMethod/ajax-yuyue-email.html';
        var my_takon = $("meta[name='csrf-token']").attr("content");
        if(isEmail(email)){
            $.post(url, {phone:phone,email:email, type:'ios',scene:1,cms_csrf: my_takon}, function(data){
                if(data.status == 0){
                    alert("预约成功！");
                    $(".tips").hide();
                    $("input").val("");
                }else{
                    alert(data.msg);
                    $(".tips").hide();
                    $("input").val("");
                    return false;
                }
            },'json');
        }
        else{
            $(".error2").show();
        }
    });
    $(".close").click(function(){
        $(".tck_yue").hide();
        $(".mask").hide();
        $(".video_mask").hide();
    });
    $(".tips .close").click(function(){
        $(".tips").hide();
        $(".email").val("");
    })
    // $(".video_play").click(function(){
    //   $(".video_mask").show();
    // })
    $(".ewm_box .ico_wx").click(function(){
        $(".ewm").toggle();
    })
})