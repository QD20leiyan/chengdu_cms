h5_data=$(".h5_data").html();
$(".inter_btn,.down_btn").click(function(){//下载埋点
    // HLog.event('tk_luck_downbtn');
});
var srf = $('meta[name="csrf-token"]').attr('content');
var login_url='/ca/back/get-user-info.html?h5data='+h5_data;//判断用户是否登录
var login_url1='/ca/back/login.html?h5data='+h5_data;//登录
var verify_url='/commonMethod/ajax-yuyue-verify.html?h5data='+h5_data;//登录发送验证码
var lottery_url='/ca/back/lottery.html?h5data='+h5_data;//抽奖
var out_url='/ca/back/logout.html?h5data='+h5_data;//注销登录
var baseurl="";
var is_list=false;
var is_shiwu=false;
var prize1={
        '0':{name:"雨燕*3天"},
        '1':{name:"4阶材料包*5"},
        '2':{name:"虎王坦克模型"},
        '3':{name:"mate20"},
        '4':{name:"99式原型(永久)"},
        '5':{name:"黄金*20"},
        '6':{name:"主题卫衣"},
        '7':{name:"悍马*3天"}
    }
//手机类型判断
var u = navigator.userAgent,
    app = navigator.appVersion;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//倒计时
function page_djs(ele, callback) {
    var time = 60;
    if(ele) {
        ele.html("60s");
    }
    djs_timer = setInterval(function() {
        time--;
        ele.html((time<=0?0:time) + "s");
        if(time == 0) {
            clearInterval(djs_timer);
            ele.html("获取验证码");
            if(callback) {
                callback();
            }
        }
    }, 1000);
}
//错误提示显示
function showErr(index, text) {
    $(".co_error").eq(index).addClass("co_err_show").html(text);
    $(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
    $(".co_error").eq(index).removeClass("co_err_show");
}
//图片验证码获取
function yx_getcaptcha(capname,tipsname){
    var is_focus=0;//input获取事件焦点
    var imgMarkIndex=1;
    function load_captcha(){
        imgMarkIndex++;
        //var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
        var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
        $.get(imgUrl, {}, function(data) {
            //$(capname).html(data.msg);
            $(capname).html("<img src="+data.url+">");
            $(".tp_yzm").removeClass("hidden");
        }, 'json');
        
    }
    //图片验证码刷新
    $(capname).click(function(){
        load_captcha();
        is_focus=2;
    });
    //图片验证码焦点获取显示验证码
    $(tipsname).find("input").focus(function(){
        is_focus++;
        if(is_focus==1){
            load_captcha();
        }
    });
}
//判断用户是否登录
function is_login(){
    $.ajax({
        'url':login_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.code==0){
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.count').text(data.data.residue_num);
                //$('.count_all').text(data.data.total_num);
                $('.user_phone').text(data.data.phone);
                var length= Object.keys(data.data.gift_log).length;
                if(length>0){
                    is_list=true;
                    $('.table_list').empty();
                    var result = '';
                    for(var i in data.data.gift_log) {
                        //var src=baseurl+(prize1[data.data.gift_log[i].gift_id+''].img||"");
                        var name=(prize1[data.data.gift_log[i].gift_id+''].name||"");
                        result += "<p class='table_info'><span>"+name+"</span><span class='table_code'>"+data.data.gift_log[i].code+"</span><span class='copy' data-clipboard-text='"+data.data.gift_log[i].code+"'>复制</span></p>";
                    }
                    $('.table_list').append(result);
                }else{
                    is_list=false;
                }
            }else{}
        }
    });
}
//登录请求
function get_login(){
    var my_phone = $(".co_username").val();
    var co_codenum1 =  $(".co_codenum1").val();
    if(my_phone == "" || my_phone == undefined) {
        showErr(0, "手机号码不能为空哦");
        return;
    }else if(my_phone.length != 11){
        showErr(0, "手机号码不正确哦");
        return;
    }hideErr(0);
    if(co_codenum1 == "" || co_codenum1 == undefined) {
        showErr(2, "验证码不能为空哦");
        return;
    }hideErr(2);
    $.ajax({
        'url':login_url1,
        'data':{'phone':my_phone,'yzm':co_codenum1,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
            if(data.code==0){
                alert("登陆成功");
                $(".co_tips_login").addClass("hidden");
                $(".co_before").addClass("hidden");
                $(".co_after").removeClass("hidden");
                $('.count').text(data.data.residue_num);
                //$('.count_all').text(data.data.total_num);
                $('.user_phone').text(data.data.phone);
                var length= Object.keys(data.data.gift_log).length;
                if(length>0){
                    is_list=true;
                    $('.table_list').empty();
                    var result = '';
                    for(var i in data.data.gift_log) {
                        //var src=baseurl+(prize1[data.data.gift_log[i].gift_id+''].img||"");
                        var name=(prize1[data.data.gift_log[i].gift_id+''].name||"");
                        result += "<p class='table_info'><span>"+name+"</span><span class='table_code'>"+data.data.gift_log[i].code+"</span><span class='copy' data-clipboard-text='"+data.data.gift_log[i].code+"'>复制</span></p>";
                    }
                    $('.table_list').append(result);
                }else{
                    is_list=false;
                }
            }else{
                showErr(2, data.msg);
                $(".co_captcha").trigger("click");
            }
        }
    });
}
//初始化
$(function(){
    //获取图片基础地址
    //baseurl=$(".i_main").data("src");
    yx_getcaptcha(".co_captcha",".co_tips_login");
    is_login();
});
//弹框关闭
$(".co_tips_close,.co_tips_surebtn").click(function(){
    if($(this).hasClass("add_dizhi")){
        $(".co_tips").addClass("hidden");
        $(".co_tips.co_tips_address").removeClass("hidden");
        $('.co_tips input').val("");
        $(".co_error").removeClass("co_err_show");
    }else{
        $(".co_tips").addClass("hidden");
        $('.co_tips input').val("");
        $(".co_error").removeClass("co_err_show");
    } 
});
//登录弹框显示
$(".co_loginbtn").click(function(){
    // HLog.event('tk_luck_loginbtn');
    $(".co_tips_login").removeClass("hidden");
});
//登录获取验证码
$(".co_codebtn1").click(function(){
    var my_phone = $(this).closest(".co_tips").find(".co_username").val();
    var captcha =  $(this).closest(".co_tips").find(".captcha").val();
    if(my_phone == "" || my_phone == undefined) {
        showErr(0, "手机号码不能为空哦");
        return;
    }else if(my_phone.length != 11){
        showErr(0, "手机号码不正确哦");
        return;
    }hideErr(0);
    if(captcha == "" || captcha == undefined) {
        showErr(1, "验证码不能为空哦");
        return;
    }hideErr(1);
    $.post(verify_url,{ 'type': "ios", "phone":my_phone,"captcha":captcha, "smsContent":"您正在进行《巅峰坦克》抽奖活动登录","cms_csrf":srf },function(data){
        if(data.status == 0){
            $(".co_codebtn1").css("pointer-events","none");
            page_djs($(".co_codebtn1"),function(){
                $(".co_codebtn1").css("pointer-events","auto");
            });
        }else{
            alert(data.msg);
            $(".co_captcha").trigger("click");
        }
    }, 'json');
});
//点击登陆
$(".co_tips_loginbtn").click(function(){
    get_login();
    // HLog.event('tk_luck_surebtn');
});
//中奖纪录弹框显示
$(".check_ward").click(function(){
    if($(".co_after.hidden").length>0){
        $(".co_tips_login").removeClass("hidden");
    }else{
        if(is_list==true){
            $(".co_tips_record").removeClass("hidden");
        }else{
            alert("您还没有中奖记录哦~");
        }
    }
});
//填写地址
$(".address_btn").click(function(){
    if($(".co_after.hidden").length>0){
        $(".co_tips_login").removeClass("hidden");
    }else{
        if(is_shiwu==true){
            $(".co_tips_address").removeClass("hidden");
        }else{
            alert("您还没有抽中实物哦~");
        }
    }
});
//注销登录
$(".logout").click(function(){
    $.ajax({
        'url':out_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.code==0){
                alert("注销成功");
                $(".co_before").removeClass("hidden");
                $(".co_after").addClass("hidden");
                $('.count').text("0");
                //$('.count_all').text("0");
                $('.user_phone').text("");
                is_list=false;
                $('.table_list').empty();
                $(".co_codebtn1").html("获取验证码");
                $(".co_codebtn1").css("pointer-events","auto");
                if(djs_timer){
                    clearInterval(djs_timer);
                }
            }else{
                alert(data.msg);
            }
        }
    });
});

//复制
var clipboard=new Clipboard('.copy');
clipboard.on('success', function(e) {
    console.log(e);
    alert("已复制");
});
//抽奖
var rotateTimeOut = function (){
    $('.wheelcanvas').rotate({
        angle:0,
        animateTo:2182.5,
        duration:8000,
        callback:function (){
            alert('网络超时，请检查您的网络设置！');
        }
    });
};
var rotateconf={
    bRotate:false,
    gifts:["雨燕*3天","4阶材料包*5","虎王坦克模型","mate20","99式原型(永久)","黄金*20","主题卫衣","悍马*3天"]
}
//旋转转盘 item:奖品位置; txt：提示语,code是礼包码;
var rotateFn = function (item){
    var angles = item * (360 /8);
    console.log(angles);
    $('.wheelcanvas').stopRotate();
    $('.wheelcanvas').rotate({
        angle:0,
        animateTo:angles+1800,
        duration:8000,
        callback:function (){
            if(item==2||item==3||item==6){
                $(".co_tips.co_tips_ward .co_form div").removeClass("active");
                $(".co_tips.co_tips_ward .co_form .no_code").addClass("active");
                $(".co_tips.co_tips_ward .co_form .gift_img").addClass("active");
                $(".co_tips.co_tips_ward .co_tips_surebtn").addClass("add_dizhi")
                $(".co_tips_ward").removeClass("hidden");
                console.log("实物");
            }else{
                //中奖弹窗显示
                $(".co_tips.co_tips_ward .co_form div").removeClass("active");
                $(".co_tips.co_tips_ward .co_form .has_code").addClass("active")
                $(".co_tips.co_tips_ward .co_tips_surebtn").removeClass("add_dizhi")
                $(".co_tips_ward").removeClass("hidden");
                console.log("礼包码");
            }
            rotateconf.bRotate = !rotateconf.bRotate;
        }
    });
};
$('.pointer').click(function (){
    // HLog.event('tk_luck_lotterybtn');
    //抽奖前先判断是否登录
    if($(".co_after.hidden").length>0){
        //登录之前
        $(".co_tips_login").removeClass("hidden");
    } else{
        if($(".count").text()>0){
            if(rotateconf.bRotate) return;
            rotateconf.bRotate = !rotateconf.bRotate;
            rotateTimeOut();
//				//模拟ajax
//				setTimeout(function(){
//				    //获取随机数模拟抽奖结果(奖品个数范围内)
//				    var item =2;
                    // rotateFn(item, rotateconf.gifts[item],"ABDE23JGGEI");
                    // var img_name="."+prize1[item].classname;
                    // $(".co_tips_ward .tips_name span").text(prize1[item].name);
                    // var img_show="img[data-id="+item+"]";
                    // $(".co_tips.co_tips_ward .co_form>div.gift_img").find($(img_show)).addClass("active");
//				},1000);
            $.ajax({
                'url':lottery_url,
                'data':{},
                'type':'POST',
                'dataType':'Json',
                success:function(data){
                    if(data.code==0){
                        var now_count=$('.count').text();
                        $('.count').text(now_count-1);
                        var id=data.data.gift_id;
                        var img_show="img[data-id="+id+"]";
                        $(".co_tips_ward .tips_name span").text(prize1[id].name);
                        $(".co_tips_ward .tips_code .code_num").text(data.data.code);
                        $(".co_tips.co_tips_ward .co_form>div.gift_img img").removeClass("active");
                        $(".co_tips.co_tips_ward .co_form>div.gift_img").find($(img_show)).addClass("active");
                        $(".co_tips_ward .tips_code .code_copy").attr("data-clipboard-text",data.data.code);
                        var item="";
                        if(data.data.gift_id==458){//雨燕*3天
                            item=0;
                        }else if(data.data.gift_id==453){//4阶材料包*5
                            item=1;
                        }else if(data.data.gift_id==454){//虎王坦克模型
                            item=2;
                        }else if(data.data.gift_id==455){//mate20
                            item=3;
                        }else if(data.data.gift_id==456){//99式原型(永久)
                            item=4;
                        }else if(data.data.gift_id==457){//黄金*20
                            item=5;
                        }else if(data.data.gift_id==0){//主题卫衣
                            item=6;
                        }else if(data.data.gift_id==0){//悍马*3天
                            item=7;
                        }
                        rotateFn(item);

                        if(data.data.gift_id!==0){
                            var result1 = '';
                            result1 += "<p class='table_info'><span>"+prize1[id].name+"</span><span class='table_code'>"+data.data.code+"</span><span class='copy' data-clipboard-text='"+data.data.code+"'>复制</span></p>";
                            $('.table_list').append(result1);
                            is_list=true;
                        }
                    }else{
                        rotateconf.bRotate = !rotateconf.bRotate;
                        $('.wheelcanvas').stopRotate();
                        rotateFn(1);
                        alert(data.msg);
                    }
                },
                error:function(){
                    rotateconf.bRotate = !rotateconf.bRotate;
                    $('.wheelcanvas').stopRotate();
                    rotateFn(1);
                    alert("网络超时，请检查您的网络设置！");
                }
            });
        }else{
            alert("抽奖次数没有了哦！");
        }
    }


});




