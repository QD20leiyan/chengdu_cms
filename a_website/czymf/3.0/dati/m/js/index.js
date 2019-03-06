$(function(){

    var timer = "";
    var csrf_token = $("meta[name='csrf-token']").attr("content");
    
    $(".start-btn").click(function(){
        show_tc();
    });

    $(".tc-close").click(function(){
        hide_tc();
    });

    //获取验证码
    $(".tc-get-mark").click(function(){
        var theThis = $(this);
        var isClick = theThis.attr("isClick");
        if(isClick){
            return;
        }
        var thePhone = $(".tc-phone");
        if(checkPhone(thePhone) !== true){
            return;
        }
        theThis.attr("isClick","true");
        var url = $(this).attr("url");
        var thePhoneVal = thePhone.val();
        //倒计时
        countDown(theThis,60,function(){
            clearTimer(theThis);
        });
        //发起ajax请求
        $.post(url,{
            "phone": thePhoneVal,
            "cms_csrf": csrf_token
        },function(data){
            var data = JSON.parse(data);
            if(data.status == 0){
                alert("验证码已发送到您的手机~");
            }else if(data.status == 1){
                var sh_url = $(".tc-login").attr("sh_url");
                location.href = sh_url+"?id="+data.id;
            }else {
                showErr($(".tc-error").eq(0),data.msg);
            }
        });
    });
    //发起登陆
    $(".tc-login").click(function(){
        var theThis = $(this);
        var isClick = theThis.attr("isClick");
        if(isClick){
            return;
        }
        var thePhone = $(".tc-phone");
        if(checkPhone(thePhone) !== true){
            return;
        }
        var theMark = $(".tc-mark");
        if(checkMark(theMark) !== true){
            return;
        }
        theThis.attr("isClick","true");

        var url = $(this).attr("url");
        var thePhoneVal = thePhone.val();
        var theMarkVal = theMark.val();
        //发起ajax请求
        $.post(url,{
            "phone": thePhoneVal,
            "yzm": theMarkVal,
            "cms_csrf": csrf_token
        },function(data){
            var data = JSON.parse(data);
            console.log(data);
            if(data.status == -1){
                showErr($(".tc-error").eq(1),data.msg);
            }else if(data.status == 0){
                var an_url = theThis.attr("an_url");
                location.href = an_url;
            }else if(data.status == 1){
                var sh_url = theThis.attr("sh_url");
                location.href = sh_url+"?id="+data.id;
            }
            theThis.attr("isClick","");
        });
    });


    //显示弹窗
    function show_tc(){
        var page_tc = $(".an-tc");
        page_tc.css({
            "display": "block"
        });
        setTimeout(function(){
            page_tc.css({
                "opacity": "1"
            });
        },20);
    }
    //取消弹窗
    function hide_tc(){
        var page_tc = $(".an-tc");
        page_tc.css({
            "opacity": "0"
        });
        setTimeout(function(){
            page_tc.css({
                "display": "none"
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
        ele.html(text).css({
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
        timer = setInterval(function(){
            time--;
            if(time == 0){
                clearInterval(timer);
                if(callBack){
                    callBack();
                }
                return;
            }
            ele.html(time+"s");
        },1000);
    }
    //清楚倒计时
    function clearTimer(ele){
        clearInterval(timer);
        ele.html("获取验证码").attr("isClick","");
    }
});