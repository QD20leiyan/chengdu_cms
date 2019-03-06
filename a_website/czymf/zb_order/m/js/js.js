var order_url = '/verify/enlist';
var send_url ='/verify/get-verify';
var next_url ='/verify/vote';

//错误提示显示
function showErr(index, text) {
    $(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
    $(".err").eq(index).removeClass("err_show");
}

//下拉框内容选择
$(".sign_list h1").click(function () {
    $(".sign_list ul").toggleClass("show");
});
$(".sign_list ul li").click(function () {
    var html = $(this).find("span").html();
    $(".sign_list ul li").removeClass("active");
    $(this).addClass("active");
    $(this).parent().removeClass("show");
    $(".sign_list h1").attr("checked", "true");
    $(".zb_xb").html(html);
});

//返回顶部
$(".go_top").click(function(){
    var a;
    function back(){
        a=setInterval(go_top,5);
    }
    function go_top(){
        if(window.scrollY<=0){
            clearInterval(a);
        }else{
            scrollTo(0,window.scrollY-15);
        }
    }
    back();
});

//倒计时
function page_djs(ele, callback) {
    var time = 60;
    if (ele) {
        ele.html("60s");
    }
    djs_timer = setInterval(function () {
        time--;
        ele.html((time <= 0 ? 0 : time) + "s");
        if (time == 0) {
            clearInterval(djs_timer);
            ele.html("获取验证码");
            if (callback) {
                callback();
            }
        }
    }, 1000);
}
//报名弹框
$(".order").click(function () {
    $(".load_tips").removeClass("hidden");
});
$(".loadtips_close").click(function () {
    $(".load_tips").addClass("hidden");
    $("input").val("");
});
//发送验证码
$(".sendcode").click(function () {
    var my_phone = $(".tel").val();
    if (my_phone == "" || my_phone == undefined) {
        alert("手机号不能为空");
        return;
    }
    if (!(/^1[34578]\d{9}$/.test(my_phone))) {
        alert("请输入正确的手机号码");
        return;
    }
    var srf = $('meta[name="csrf-token"]').attr('content');
    $.post(send_url, {"phone": my_phone, "type": 5, "cms_csrf": srf}, function (data) {
        if (data.status == 0) {
            $(".sendcode").css("pointer-events", "none");
            page_djs($(".sendcode"), function () {
                //	alert('倒计时结束');
                $(".sendcode").css("pointer-events", "auto");
            });
        } else {
            alert(data.msg);
        }
    }, 'json');
});
//下一步
$(".nextbtn").click(function () {
    var my_phone = $(".tel").val();
    var my_code = $(".codenum").val();
    if (my_code == "" || my_code == undefined) {
        alert("验证码不能为空");
        return;
    }
    var srf = $('meta[name="csrf-token"]').attr('content');
    $.post(next_url, {"phone": my_phone, "type": 5,"yzm": my_code, "cms_csrf": srf}, function (data) {
        if (data.status == 0) {
            $(".load_tips .content").addClass("after");
            //alert(data.msg);
        } else {
            alert(data.msg);
        }
    }, 'json');
});

//提交信息
$(".orderbtn").click(function () {
    var my_phone = $(".tel").val();
    var zb_pt = $(".zb_pt").val();
    var zb_name = $(".zb_name").val();
    var zb_xb = $(".zb_xb").html();
    var zb_room = $(".zb_room").val();
    var zb_qf = $(".zb_qf").val();
    var zb_role = $(".zb_role").val();
    var zb_qq = $(".zb_qq").val();

    if(zb_pt == "" || zb_pt == undefined) {
        showErr(0, "请输入直播平台");
        return;
    }
    hideErr(0);
    if(zb_name == "" || zb_name == undefined) {
        showErr(1, "请输入主播名称");
        return;
    }
    hideErr(1);
    if(zb_xb == "请选择性别") {
        showErr(2, "请选择性别");
        return;
    }
    hideErr(2);
    if(zb_room == "" || zb_room == undefined) {
        showErr(3, "请输入房间号码");
        return;
    }
    hideErr(3);
    if(zb_qf == "" || zb_qf == undefined) {
        showErr(4, "请输入游戏区服");
        return;
    }
    hideErr(4);
    if(zb_role == "" || zb_role == undefined) {
        showErr(5, "请输入角色名称");
        return;
    }
    hideErr(5);
    if(zb_qq == "" || zb_qq == undefined) {
        showErr(6, "请输入QQ账号");
        return;
    }
    hideErr(6);


    var srf = $('meta[name="csrf-token"]').attr('content');
    $.post(order_url, {"phone": my_phone,"zbpt": zb_pt, "zbmc": zb_name, "zbxb": zb_xb,
        "fjhm": zb_room, "yxqf": zb_qf, "jsmc": zb_role,"qq": zb_qq, "cms_csrf": srf}, function (data) {
        if (data.status == 0) {
            $(".load_tips").addClass("hidden");
            $(".load_tips .content").removeClass("after");
            $("input").val("");
            alert(data.msg);
        } else {
            alert(data.msg);
        }
    }, 'json');
});