$(function(){
    var _wrap=$('.box-p');
    var _interval=3000;
    var _moving;
    _wrap.hover(function(){
    clearInterval(_moving);
    },function(){
    _moving=setInterval(function(){
    var _field=_wrap.find('p:first');
    var _h=_field.height();
    _field.animate({marginTop:-_h+'px'},600,function(){
    _field.css('marginTop',13).appendTo(_wrap);
    })
    },_interval)
    }).trigger('mouseleave');
    $(".form textarea").focus(function(){
			$(this).text("");
		});
		$(".form textarea").blur(function(){
			var val = $(this).text();
			if(val=="" || val == null) $(this).text("全民枪战3周年生日快乐！~~快来与我一起送祝福吧。");
		});
        $(".m4").click(function(){
            $(".mask,.box_mask,.mask_box,.partner-box").show();
            $(".time-box,.m-box,.mask_box1").hide();
        })
        $(".m2").click(function(){
            $(".mask,.box_mask,.mask_box,.time-box").show();
            $(".partner-box,.m-box,.mask_box1").hide();
        })
        $(".m3").click(function(){
            $(".mask,.box_mask,.mask_box,.m-box").show();
            $(".partner-box,.time-box,.mask_box1").hide();
        })
        $(".m1").click(function(){
            $(".mask,.mask_box1").show();
            $(".partner-box,.time-box,.m-box,.mask_box").hide();
        })
        $(".close").click(function(){
            $(".mask").hide();
        });
        function yanzheng(){
        var tell = parseInt($(".tell").val());
        var yzm = $(".yzm").val();
        if(!/^1[34578]\d{9}$/.test(tell)){
            alert("请输入正确的手机号");
            return false;        
        }
        if(yzm ==" " && isNaN(yzm)){
             alert("请输入正确的验证码");
            return false;
        }
    }
    $(".c-box").hover(function(){
        $(".download_box").show();
    },function(){
         $(".download_box").hide();
    })
});