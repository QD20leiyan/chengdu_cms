$(function(){
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
    $(".tel_btn").click(function(){
        fgw_yy_pc();
        var type_id = $(".radio.on input").attr("data-id");
        var mobileObj = $('.tel_p');
        if(type_id == 1){
            if(checkMobile($(mobileObj))){
                $(".tips").show();
            }
        }else if(type_id == 2){
            var phone = mobileObj.val();
            var type = $('input[name="wp"]:checked').val();
            var my_takon = $("meta[name='csrf-token']").attr("content");
            if(checkMobile($(mobileObj))){
                $(".tips").hide();
                $.post(
                    '/site/savephone',
                    {
                        phone:phone,
                        type:type,
                        cms_csrf: my_takon
                    },
                    function(data){
                        if(data.status == 0){
                            fgw_yy_pc_success();
                            alert("预约成功！")
                        }else{
                            alert(data.msg);
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
            $.post(url, {phone:phone,email:email, type:'ios',cms_csrf: my_takon}, function(data){
                if(data.status == 0){
                    fgw_yy_pc_success();
                    alert("预约成功！");
                    $(".tips").hide();
                }else{
                    alert(data.msg);
                    return false;
                    $(".tips").hide();
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
    $(".js_down_ios_tap").click(function(){
        $(".downBox>img").fadeIn();
    })
});
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
