$(window).load(function () {
    $(".order").click(function () {
        $(".shadow_order").show();
    })
    $(".orderClose").click(function () {
        $(".shadow_order").hide();
    })
    $(".sure").click(function () {
        $(".shadow_phone").hide();
    })
    $(".phoneClose").click(function () {
        $(".shadow_phone").hide();
    })
    $(".phone li").eq(0).on("click", function () {
        $(".phone li").eq(0).addClass("Android");
        $(".phone li").eq(0).siblings().removeClass("ios");

    });
    $(".phone li").eq(1).on("click", function () {
        $(".phone li").eq(1).addClass("ios");
        $(".phone li").eq(1).siblings().removeClass("Android");
    });
    $(".submit").on("click", function () {
        var oUserTel = $('.telInp');
        var userTel = /^1[34578]\d{9}$/;
        if (userTel.test(oUserTel.val())) {
            if ($(".phone li").hasClass("Android")) {

                $(".shadow_order").hide();
                $("#shadow_false1").show();
                $('.phoneTxt').html("亲爱的入局者，恭喜您获得《影之刃2》江湖好礼一份。请保持手机畅通，游戏上线后，我们将以礼包码的形式发放至您的手机，让您驰聘武林，鏖战江湖。")
            } else if ($(".phone li").hasClass("ios")) {
                $(".shadow_order").hide();
                $("#shadow_false1").show();
                $('.phoneTxt').html("亲爱的入局者，当游戏预约人数到达10万以上的时候，我们运营团队将会为大家带来江湖好礼数份。发至各位邮箱，11月17日，App  Store，让我们江湖再见吧！")
            } else {
                $(".shadow_order").hide();
                $("#shadow_false2").show();
                $(".falseTxt").html("请选择手机平台");

            }
        } else {
            $("#shadow_false2").show();
            $(".falseTxt").html("请输入正确的手机号码");
        }
    });
    $(window).scroll(function () {
        var h = $('#Indexall').height();
        var $t = $(this).scrollTop();
        //console.log($t);
        if ($t > 100) {
            $('#goTop').fadeIn();
        } else {
            $('#goTop').fadeOut();
        }
    });
    $('#goTop').click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 500); //浏览器滚动
    })
    $('#weixin').mouseover(function () {
        $('#erweima').show();
    })
    $('#weixin').mouseout(function () {
        $('#erweima').hide();
    })
    //视频
    $('.video_i').click(function () {
		var link_url = $(this).attr('data-id');
		if(link_url != ''){
			$(".videos").append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>');
			$('#video_mask').show();
		}else{
			alert('敬请期待');
		}
    });
    $('#close').click(function () {
		$(".videos").empty();
        $('#video_mask').hide();
    });
});

$(function(){
    $(window).scroll(function(){
        var $t = $(this).scrollTop();
        if($t > 42){
            $(".head").css({"top":"0"});
        }else{
            $(".head").css({"top":"42px"});
        }
    });
});