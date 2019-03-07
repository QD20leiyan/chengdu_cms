var info_url="/dfzj/inv/get-user-info.html"+h5_jk_url;//初始化
$(".inter_btn,.down_btn").click(function(){//下载埋点
    HLog.event('ca_newyear_downbtn');
});
var srf = $('meta[name="csrf-token"]').attr('content');
var login_url="/ca/sp/get-user-info.html"+h5_jk_url;//判断用户是否登录
var lottery_url="/ca/sp/lottery.html"+h5_jk_url;//抽奖
var is_list=false;
var prize1={
     '490':{name:"神圣骑士",img:""}
    ,'491':{name:"强化点*88W+狙击枪弹匣(7天)+2019新年AWP(永久)",img:""}
    ,'492':{name:"强化点*88W+ 机枪弹匣(7天)+ 2017新年极光(永久)",img:""}
    ,'493':{name:"雪花挂饰+ 新年雪人背包(14天)",img:""}
    ,'494':{name:"疾风骑士碎片*1+新年雪人背包(7天)",img:""}
    ,'495':{name:"强化点10W+荣誉5000",img:""}
    ,'496':{name:"强化点*8W",img:""}
    ,'0':{name:"谢谢参与"}
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
//判断用户是否登录
function is_login(){
    $.ajax({
        'url':login_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.code==0){
                $('.count').text(data.data.residue_num);
                $('.user_phone').text(data.data.nickname);
                var length= Object.keys(data.data.gift_log).length;
                if(length>0){
                    is_list=true;
                    $('.table_list').empty();
                    var result = '';
                    for(var i in data.data.gift_log) {
                        //var src=baseurl+(prize1[data.data.gift_log[i].gift_id+''].img||"");
                        var name=(prize1[data.data.gift_log[i].gift_id+''].name||"");
                        result += "<p class='table_info'><span>"+name+"</span><span class='table_code'>"+data.data.gift_log[i].code+"</span><span class='copy' data-clipboard-text='"+data.data.gift_log[i].code+"'>[ 复制 ]</span></p>";
                    }
                    $('.table_list').append(result);
                }else{
                    is_list=false;
                }
            }else{}
        }
    });
}
//初始化
$(function(){
    is_login();
});
//弹框关闭
$(".co_tips_close,.co_tips_surebtn").click(function(){
    $(".co_tips").addClass("hidden");
    $(".co_error").removeClass("co_err_show");
});
$(".check_ward").click(function(){
    if($(".co_after.hidden").length>0){
        $(".co_tips_login").removeClass("hidden");
    }else{
        if(is_list==true){
            $(".co_tips_record").removeClass("hidden");
        }else{
            $(".co_tips.co_tips_no .tips_txt").text("您还没有中奖记录哦~");
            $(".co_tips_no").removeClass("hidden");
        }
    }
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
    gifts:["雪花挂饰+新年雪人背包(14天)","强化点*88W+机枪弹匣(7天)+2017新年极光(永久)","强化点*88W+狙击枪弹匣(7天)+2019新年AWP(永久)","神圣骑士","谢谢参与","强化点*8W","强化点10W+荣誉5000","疾风骑士碎片*1+新年雪人背包(7天)"]
}
//旋转转盘 item:奖品位置; txt：提示语,code是礼包码;
var rotateFn = function (item){
    var angles = item * (360 /8)-22.5;
    console.log(angles);
    $('.wheelcanvas').stopRotate();
    $('.wheelcanvas').rotate({
        angle:0,
        animateTo:angles+1800,
        duration:8000,
        callback:function (){
            if(item==4){
                $(".co_tips.co_tips_no .tips_txt").html("谢谢参与<br>没事~下一个大奖就是你的！");
                $(".co_tips_no").removeClass("hidden");
            }else{
                //中奖弹窗显示
                $(".co_tips_ward").removeClass("hidden");
            }
            rotateconf.bRotate = !rotateconf.bRotate;
        }
    });
};
$('.pointer').click(function (){
    HLog.event('ca_newyear_lotterybtn');
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
//				    rotateFn(item, rotateconf.gifts[item],"ABDE23JGGEI");
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
                        $(".co_tips_ward .tips_name span").text(prize1[id].name);
                        $(".co_tips_ward .tips_code .code_num").text(data.data.code);
                        $(".co_tips_ward .tips_code .code_copy").attr("data-clipboard-text",data.data.code);
                        var item="";
                        if(data.data.gift_id==493){//雪花挂饰+ 新年雪人背包(14天)
                            item=0;
                        }else if(data.data.gift_id==492){//强化点*88W+ 机枪弹匣(7天)+ 2017新年极光(永久)
                            item=1;
                        }else if(data.data.gift_id==491){//强化点*88W+狙击枪弹匣(7天)+2019新年AWP(永久)
                            item=2;
                        }else if(data.data.gift_id==490){//神圣骑士
                            item=3;
                        }else if(data.data.gift_id==496){//强化点*8W
                            item=5;
                        }else if(data.data.gift_id==495){//强化点10W+荣誉5000
                            item=6;
                        }else if(data.data.gift_id==494){//疾风骑士碎片*1+新年雪人背包(7天)
                            item=7;
                        }else if(data.data.gift_id==0){//谢谢参与
                            item=4;
                        }
                        rotateFn(item);

                        if(data.data.gift_id!==0){
                            var result1 = '';
                            result1 += "<p class='table_info'><span>"+prize1[id].name+"</span><span class='table_code'>"+data.data.code+"</span><span class='copy' data-clipboard-text='"+data.data.code+"'>[ 复制 ]</span></p>";
                            $('.table_list').append(result1);
                            is_list=true;
                        }
                    }else{
                        rotateconf.bRotate = !rotateconf.bRotate;
                        $('.wheelcanvas').stopRotate();
                        rotateFn(4);
                        alert(data.msg);
                    }
                },
                error:function(){
                    rotateconf.bRotate = !rotateconf.bRotate;
                    $('.wheelcanvas').stopRotate();
                    rotateFn(4);
                }
            });
        }else{
            $(".co_tips.co_tips_no .tips_txt").text("抽奖次数没有了哦！");
            $(".co_tips_no").removeClass("hidden");
        }
    }


});



//滚动位置判断
function showani(){
    $(".ani:not(.show-ani)").each(function(i,n){
        var offset=$(n).offset();
        var scrollY=window.pageYOffset || document.documentElement.scrollTop;
        console.log(offset)
        console.log(scrollY)
        if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/4){
            $(n).addClass("show-ani");
        }
    })
}
$(window).scroll(function(e){
    showani();
});
showani();



