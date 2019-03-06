$(function(){
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    var m4_ks = $("#m4_ks");
    var csrf_param = $("meta[name='csrf_param']").attr("content");
    var csrf_token = $("meta[name='csrf-token']").attr("content");
    var device_type = "";
    var countDownTimer = "";

    $(document).mouseenter(function(e){
        startX = e.pageX;
        startY = e.pageY;
    });
    $(document).mousemove(function(e){
        endX = e.pageX;
        endY = e.pageY;
        var myX = -(endX - startX)/100;
        var myY = -(endY - startY)/100;
        m4_ks.css({
            transform: "translate3d("+myX+"px,"+myY+"px,0)"
        });
    });

    //显示弹框
    $(".cd-yy-btn").click(function(){
        device_type = $(this).attr("name");
        $(".cd-tc").css({
            display: "block"
        });
        setTimeout(function(){
            $(".cd-tc").css({
                opacity: "1"
            });
        },20);
    });
    //消失弹框
    $(".tc-close").click(function(){
        hide_tc();
    });

    //获取验证码
    $("#tc_get_mark").click(function(){
        var myThis = $(this);
        var isClick = myThis.attr("isClick");
        if(isClick){
            return;
        }
        //验证手机号码
        if(checkPhone($("#tc-phone")) !== true){
            return;
        }
        myThis.attr("isClick","true");
        var url = myThis.attr("url");
        var phone = $("#tc-phone").val();
        countDown(myThis,60,function(){
            myThis.html("获取验证码");
        });
        $.ajax({
            url: url,
            type: "post",
            data: {
                "phone": phone,
                "type": "1",
                "device_type": device_type,
                "cms_csrf": csrf_token
            },
            success: function(data){
                var data = JSON.parse(data);
                alert(data.msg);
                clearInterval(countDownTimer);
                myThis.attr("isClick","").html("获取验证码");
            },
            error: function(){
                alert("网路异常，请检查~");
                clearInterval(countDownTimer);
                myThis.attr("isClick","").html("获取验证码");
            }
        });
    });

    //提交
    $("#tc-tj-btn").click(function(){
        var myThis = $(this);
        var isClick = myThis.attr("isClick");
        if(isClick){
            return;
        }
        //验证手机号码
        if(checkPhone($("#tc-phone")) !== true){
            return;
        }
        if(checkMark($("#tc-mark")) !== true){
            return;
        }

        myThis.attr("isClick","true");
        var url = myThis.attr("url");
        var phone = $("#tc-phone").val();
        var yzm = $("#tc-mark").val();
        $.ajax({
            url: url,
            type: "post",
            data: {
                "phone": phone,
                "yzm": yzm,
                "type": device_type,
                "cms_csrf": csrf_token
            },
            success: function(data){
                myThis.attr("isClick","");
                var data = JSON.parse(data);
                if(data.status == 0){
                    alert("预约成功");
                    hide_tc();
                }else {
                    alert(data.msg);
                }
            },
            error: function(){
                alert("网路异常，请检查~");
                myThis.attr("isClick","");
            }
        });
    });

    function hide_tc(){
        $(".cd-tc").css({
            opacity: "0"
        });
        setTimeout(function(){
            $(".cd-tc").css({
                display: "none"
            });
        },300);
    }

    //判断用户填写的手机号码是否正确
    function checkPhone(ele){
        var tc_err = $(".tc-error").eq(0);
        var myPhone = ele.val();
        if(myPhone == "" || myPhone == null){
            showErr(tc_err,"请输入手机号码");
            return false;
        }

        if(!(/^1[0-9]{10}$/.test(myPhone))){
            alert(1);
            showErr(tc_err,"请输入正确的手机号码");
            return false;
        }

        hideErr(tc_err);
        return true;
    }

    //判断用户填写的验证码是否正确
    function checkMark(ele){
        var tc_err = $(".tc-error").eq(1);
        var myPhone = ele.val();
        if(myPhone == "" || myPhone == null){
            showErr(tc_err,"请输入验证码");
            return false;
        }
        if(!(/^[0-9]*$/.test(myPhone))){
            showErr(tc_err,"请输入正确的验证码");
            return false;
        }
        hideErr(tc_err);
        return true;
    }

    //显示错误信息
    function showErr(ele,text){
        ele.html(text);
        ele.css({
            visibility: "visible"
        });
    }
    //隐藏错误信息
    function hideErr(ele){
        ele.css({
            visibility: "hidden"
        });
    }
    //倒计时
    function countDown(ele,time,callBack){
        var time = parseInt(time);
        ele.html(time+"s");
        countDownTimer = setInterval(function(){
            time--;
            if(time == 0){
                clearInterval(countDownTimer);
                if(callBack){
                    callBack();
                }
                return;
            }
            ele.html(time+"s");
        },1000);
    }
});