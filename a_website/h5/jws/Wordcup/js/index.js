
var  h5_wx=$(".h5_wx").html();
var  h5_data=$(".h5_data").html();
var login_url1='/jws/world-cup/ajax-login.html?h5data='+h5_data;//登录
var login_url2='/jws/world-cup/ajax-get-user.html?h5data='+h5_data;//判断用户是否登陆

var guess_url='/jws/world-cup/ajax-save-data.html?h5data='+h5_data;//竞猜
var type="ios";
var srf = $('meta[name="csrf-token"]').attr('content');
var is_login=0;//0-未登陆 1-已登录
var fw_time=new Date();
//错误提示显示
function showErr(index, text) {
    $(".co_error").eq(index).addClass("co_err_show").html(text);
    $(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
    $(".co_error").eq(index).removeClass("co_err_show");
}
//初始化
$(function(){
    //判断用户是否登录
    $.ajax({
        'url':login_url2,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            console.log(data);
            if(data.status==0){
                is_login=1;
                fw_time=new Date(data.time*1000);
                console.log(fw_time);
                $(".race .icon").removeClass("win");
                for(var i in data.msg){
                    var date=new Date(data.msg[i].time*1000);
                    var year=date.getFullYear(),month=date.getMonth()+ 1,day=date.getDate(),h=date.getHours(),m=date.getMinutes(),s=date.getSeconds();
                    var day= year+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day)+" "+(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
                    var race=$(".race[data-time='"+day+"']");
                    var win=race.find("."+(data.msg[i].is_guess=='one'?"left_flag[data-name='"+data.msg[i].one+"']":"right_flag[data-name='"+data.msg[i].two+"']"));
                    win.addClass("win");
                    race.closest(".race");
                    if(data.msg[i].is_guess=='one'){
                        race.find(".state").text(race.find('.left_flag').attr("data-name")+' 胜');
                    }else{
                        race.find(".state").text(race.find('.right_flag').attr("data-name")+' 胜');
                    }
                }
                $(".sure_btn .back").trigger("click");
            }else{}
        }
    });
    //滑动页面
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl: false,
        observer: true,
        observeParents: true,
        noSwiping: true,
        onSlideChangeEnd: function (swiper) {
            //if(swiper.activeIndex==1){
            //
            //}
        },

    });
    //弹框关闭
    $(".co_tips_close,.tipsbtn3").click(function(){
        $(".co_tips").addClass("hidden");
        $('.co_input input').val("");
        $(".co_error").removeClass("co_err_show");
    });
    //开始竞猜
    $(".btn1").click(function(){
        if(is_login==1){
            mySwiper.slideNext();
        }else{
            $(".co_tips_login1").removeClass("hidden");
        }
    });
    //类型选择
    $(".rdo").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        if($(this).attr("data-id")==1){
            type="ios";
            $(".qf.qf_and").addClass("hidden");
            $(".qf.qf_ios").removeClass("hidden");
        }else if($(this).attr("data-id")==2){
            type="android";
            $(".qf.qf_and").removeClass("hidden");
            $(".qf.qf_ios").addClass("hidden");
        }
    });
    //立即登陆
    $(".tipsbtn1").click(function(){
        var h5_id=$(".wrap").attr("data-id");
        var service_name=$(".qf:not(.hidden) .js_serverId").find('option:selected').text();
        var name = $.trim($(".username").val());
        if(name == "" || name == undefined) {
            showErr(2, "角色名不能为空哦");
            return;
        }
        hideErr(2);
        $.ajax({
            'url':login_url1,
            'data':{'type':type,'service_name':service_name,"name":name,"h5_id":h5_id,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    is_login=1;
                    alert("登录成功");
                    $(".co_tips_login1").addClass("hidden");
                    mySwiper.slideNext();
                    fw_time=new Date(data.time*1000);
                    $(".race .icon").removeClass("win");
                    for(var i in data.msg){
                        var date=new Date(data.msg[i].time*1000);
                        var year=date.getFullYear(),month=date.getMonth()+ 1,day=date.getDate(),h=date.getHours(),m=date.getMinutes(),s=date.getSeconds();
                        var day= year+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day)+" "+(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s);
                        var race=$(".race[data-time='"+day+"']");
                        var win=race.find("."+(data.msg[i].is_guess=='one'?"left_flag[data-name='"+data.msg[i].one+"']":"right_flag[data-name='"+data.msg[i].two+"']"));
                        win.addClass("win");
                        race.closest(".race");
                        if(data.msg[i].is_guess=='one'){
                            race.find(".state").text(race.find('.left_flag').attr("data-name")+' 胜');
                        }else{
                            race.find(".state").text(race.find('.right_flag').attr("data-name")+' 胜');
                        }
                    }
                    $(".sure_btn .back").trigger("click");
                }else{
                    showErr(2, data.msg);
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
    });
    //处理表情
    $(".username").on("input", function(){
        this.value = this.value.replace(/\ud83d[\udc00-\ude4f\ude80-\udfff]/g, '');
    });
    //开始竞猜
    $(".detail_btn").click(function(){
        mySwiper.slideNext();
    });
    //活动规则
    $(".rules").click(function(){
        mySwiper.slideTo(1);
    });
    //场次选择
    $(".swiper2_prev").click(function(){
        var previndex=$(".times:not(.hidden)").prev().index();
        if(previndex<0) return;
        $(".times").addClass("hidden");
        $(".times").eq(previndex).removeClass("hidden");
        $(".race_list").addClass("hidden");
        $(".race_list").eq(previndex).removeClass("hidden");
        var time=$(".race_list").eq(previndex).data("time");
        var year=fw_time.getFullYear(),month=fw_time.getMonth()+ 1,day=fw_time.getDate();
        var today= year+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
        $(".sure_btn>img").addClass('hidden');
        if(today==time){
            $(".sure_btn .sure").removeClass('hidden');
        }else{
            $(".sure_btn .back").removeClass('hidden');
        }
    });
    $(".swiper2_next").click(function(){
        var nextindex=$(".times:not(.hidden)").next(".times").index();
        $(".times").addClass("hidden");
        $(".times").eq(nextindex).removeClass("hidden");
        $(".race_list").addClass("hidden");
        $(".race_list").eq(nextindex).removeClass("hidden");
        var time=$(".race_list").eq(nextindex).data("time");
        var year=fw_time.getFullYear(),month=fw_time.getMonth()+ 1,day=fw_time.getDate();
        var today= year+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
        $(".sure_btn>img").addClass('hidden');
        if(today==time){
            $(".sure_btn .sure").removeClass('hidden');
        }else{
            $(".sure_btn .back").removeClass('hidden');
        }
    });
    //回到当日
    $(".sure_btn .back").click(function(){
        var year=fw_time.getFullYear(),month=fw_time.getMonth()+ 1,day=fw_time.getDate();
        var today= year+"-"+(month<10?"0"+month:month)+"-"+(day<10?"0"+day:day);
        var index=$(".race_list[data-time='"+today+"']").index();
        $(".times").addClass("hidden");
        $(".times").eq(index).removeClass("hidden");
        $(".race_list").addClass("hidden");
        $(".race_list").eq(index).removeClass("hidden");
        $(".sure_btn .back").addClass('hidden');
        $(".sure_btn .sure").removeClass('hidden');
    }).trigger('click');
    //国家选择
    $(".icon").click(function(){
        var time=$(this).closest(".race_list").data("time");
        var time_s=new Date(time+" 00:00:00");
        var time_e=new Date(time+" 23:59:59");
        var now=fw_time;
        if(now<time_s){
            $(".co_tips_no").removeClass("hidden");
            $(".co_tips_no .ts").text("请选择今日可竞猜场次");
        }else if(now>time_e){
            //$(".co_tips_no").removeClass("hidden");
            //$(".co_tips_no .ts").text("");
            return;
        }else{
            //时间为当天
            //判断时间是否是12:00-20:00
            if(now.getHours()<12||now.getHours()>23){
                $(".co_tips_no").removeClass("hidden");
                $(".co_tips_no .ts").text("竞猜时间为今日12:00-20:00");
            }else{
                //然后再判断哪些场次可以选择,且是单选(可竞猜当日20:01-次日11:00期间的获胜球队)
                var list=$(this).closest(".race_list");
                if(list.find(".win").length>0){
                    return;
                }
                list.find(".icon").removeClass("active");
                $(this).addClass("active");
                list.find(".state").text("未竞猜");
                $(this).closest(".race").find(".state").text($(this).data("name")+" 胜");
            }
        }
    });
    //确定竞猜
    $(".sure").click(function(){
        var racelist=$(".race_list:not(.hidden)");
        var race=racelist.find('.icon.active').closest(".race");
        var ball_time=new Date(race.attr("data-time")).getTime();
        var ball_name1=race.find(".left_flag").attr("data-name");
        var ball_name2=race.find(".right_flag").attr("data-name");
        var is_guess=race.find(".left_flag").hasClass("active")?"one":"two";
        var data={};
        data.time=ball_time/1000;
        data.one=ball_name1;
        data.two=ball_name2;
        data.is_guess=is_guess;
        //var data_list=[data];
        console.log(data);
        if(racelist.find('.icon.win').length>0){
            $(".co_tips_no").removeClass("hidden");
            $(".co_tips_no .ts").text("您今日已提交竞猜信息，请明日竞猜时间内再来");
            return;
        }else{
            if(racelist.find('.icon.active').length<=0){
                $(".co_tips_no").removeClass("hidden");
                $(".co_tips_no .ts").text("请选择您竞猜的获胜球队");
                return;
            }
        }

        $.ajax({
            'url':guess_url,
            'data':{'data':data,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    $(".co_tips_no").removeClass("hidden");
                    $(".co_tips_no .ts").text("您已成功提交竞猜信息，我们将按照规则返还礼包钻石");
                    racelist.find('.icon.active').removeClass("active").addClass("win");
                    racelist.find('.icon.win').next(".info .state").text(racelist.find('.icon.win').attr("data-name")+' 胜');
                }else{
                    $(".co_tips_no").removeClass("hidden");
                    $(".co_tips_no .ts").text(data.msg);
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
    });

});
