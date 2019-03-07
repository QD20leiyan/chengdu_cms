
var  h5_wx=$(".h5_wx").html();
var  h5_data=$(".h5_data").html();
var login_url1='/fc/fuel/ajax-login.html?h5data='+h5_data;//登录
var login_url2='/fc/fuel/ajax-get-data.html?h5data='+h5_data;//判断用户是否登陆
var help_url='/fc/fuel/ajax-help.html?h5data='+h5_data;//助威
var type="ios";
var srf = $('meta[name="csrf-token"]').attr('content');
var is_login=0;//0-未登陆 1-已登录
//错误提示显示
var share_title="来为世界杯冠军助威吧！再也不用去天台了…";
function showErr(index, text) {
    $(".co_error").eq(index).addClass("co_err_show").html(text);
    $(".err").eq(index).addClass("err_show").html(text);
}
//错误提示隐藏
function hideErr(index) {
    $(".co_error").eq(index).removeClass("co_err_show");
}
//中奖名单滚动效果
function autoScroll(obj) {
    $(obj).animate({
        marginTop: "-2rem"
    }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
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
            if(data.status==0){
                is_login=1;//是否登录
                $(".count_all").text(data.draw_num);//助威次数
                //if(data.draw_num!=0){
                //    $(".c_list").addClass("scale");
                //    $(".c_list.out").removeClass("scale");
                //}else{
                //    $(".c_list").removeClass("scale");
                //}
                //投票数据展示
                $(".c_list .count>span").text("0");
                for(var i in data.msg) {
                    $(".c_list[data-name='"+i+"'] .count>span").text(data.msg[i]||"0");
                }
                //轮播
                if(data.data_all!=""){
                    var result = '';
                    for(var i in data.data_all) {
                        var img=$(".c_list[data-name='"+i+"'] .c_img img");
                        result += "<li><img src='"+img.attr("src")+"'/><span>"+i+"-获得助威<i>"+data.data_all[i]+"</i>次</span></li>";
                    }
                    $('.price_con ul').append(result);
                    //中奖名单--只有一个时复制一个
                    if($(".price_con ul li").length>1){
                        $(".price_con ul").append($(".price_con ul li").clone(true));
                    }
                    setInterval('autoScroll(".price_con ul")', 2000);
                }else{
                    $(".price_no").removeClass("hidden");
                }
                //当前用户助威最多国家
                var max=data.max;
                //$(".c_list").removeClass("max").filter("[data-name='"+max+"']").addClass("max1");
                //分享文案
                var titleobj={"法国":"时间不多了，快来为我法打call！","巴西":"心疼内马尔一下，巴西队pick起来！","比利时":"这次的我们不一样，请为比利时加油！","乌拉圭":"世界杯我为乌拉圭打call！你呢？","俄罗斯":"安排好了，这届世界杯冠军就是你！","瑞典":"世界杯我为瑞典打call！你呢？","克罗地亚":"对阵东道主，我们都不慌！","英格兰":"一切都是命运的安排，相信凯恩相信英格兰！"};
                share_title=titleobj[max]||share_title;
                console.log(share_title);
                shareInit();
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
    //开始预测1
    $(".btn1").click(function(){
        if(is_login==1){
            //mySwiper.slideNext();
            mySwiper.slideTo(2);
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
        var service_id=$(".qf:not(.hidden) .js_serverId").find('option:selected').attr("data-id");
        var role_id = $.trim($(".username").val());
        if(role_id == "" || name == role_id) {
            showErr(2, "ID不能为空哦");
            return;
        }hideErr(2);
        $.ajax({
            'url':login_url1,
            'data':{'type':type,'service_id':service_id,"role_id":role_id,"h5_id":h5_id,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                    alert("登录成功");
                    $(".co_tips_login1").addClass("hidden");
                    mySwiper.slideNext();
                    is_login=1;
                    $(".count_all").text(data.draw_num);//助威次数
                    //if(data.draw_num!=0){
                    //    $(".c_list").addClass("scale");
                    //    $(".c_list.out").removeClass("scale");
                    //}else{
                    //    $(".c_list").removeClass("scale");
                    //}
                    //投票数据展示
                    $(".c_list .count>span").text("0");
                    for(var i in data.msg) {
                        $(".c_list[data-name='"+i+"'] .count>span").text(data.msg[i]||"0");
                    }
                    //轮播
                    if(data.data_all!=""){
                        var result = '';
                        for(var i in data.data_all) {
                            var img=$(".c_list[data-name='"+i+"'] .c_img img");
                            result += "<li><img src='"+img.attr("src")+"'/><span>"+i+"-获得助威<i>"+data.data_all[i]+"</i>次</span></li>";
                        }
                        $('.price_con ul').append(result);
                        //中奖名单--只有一个时复制一个
                        if($(".price_con ul li").length>1){
                            $(".price_con ul").append($(".price_con ul li").clone(true));
                        }
                        setInterval('autoScroll(".price_con ul")', 1500);
                    }else{
                        $(".price_no").removeClass("hidden");
                    }
                    //当前用户助威最多国家
                    var max=data.max;
                    //$(".c_list").removeClass("max").filter("[data-name='"+max+"']").addClass("max1");
                    //分享文案
                    var titleobj={"法国":"时间不多了，快来为我法打call！","巴西":"心疼内马尔一下，巴西队pick起来！","比利时":"这次的我们不一样，请为比利时加油！","乌拉圭":"世界杯我为乌拉圭打call！你呢？","俄罗斯":"安排好了，这届世界杯冠军就是你！","瑞典":"世界杯我为瑞典打call！你呢？","克罗地亚":"对阵东道主，我们都不慌！","英格兰":"一切都是命运的安排，相信凯恩相信英格兰！"};
                    share_title=titleobj[max]||share_title;
                    console.log(share_title);
                    shareInit();
                }else{
                    showErr(2, data.msg);
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
    });
    //开始预测2
    $(".detail_btn").click(function(){
        mySwiper.slideNext();
    });
    //活动规则
    $(".fixed_btn .third").click(function(){
        mySwiper.slideTo(1);
    });
    //活动规则
    $(".fixed_btn .second").click(function(){
        mySwiper.slideTo(3);
    });
    //一起世界杯
    $(".fixed_btn .first").click(function(){
        mySwiper.slideTo(2);
    });
    //邀请朋友--微信分享
    $(".zw_btn2").click(function(){
        $(".share_bg").removeClass("hidden");
    });
    $(".share_bg").click(function(){
        $(".share_bg").addClass("hidden");
    });
    //助威
    $(".c_list").click(function(){
        //if($(".count_all").text()>0){
        //    if(!$(".count_all").attr("data-loading")){
        //        //data-loading设置为1正在请求数据
        //        $(".count_all").attr("data-loading","1");
        //        var help_name=$(this).data("name");
        //        $.ajax({
        //            'url':help_url,
        //            'data':{'help_name':help_name,"cms_csrf":srf },
        //            'type':'POST',
        //            'dataType':'Json',
        //            success:function(data){
        //                $(".count_all").removeAttr("data-loading");
        //                if(data.status==0){
        //                    $(".count_all").text(data.draw_num);//助威次数
        //                    if(data.draw_num!=0){
        //                        $(".c_list").addClass("scale");
        //                        $(".c_list.out").removeClass("scale");
        //                    }else{
        //                        $(".c_list").removeClass("scale");
        //                    }
        //                    //投票数据展示
        //                    $(".c_list .count>span").text("0");
        //                    for(var i in data.msg) {
        //                        $(".c_list[data-name='"+i+"'] .count>span").text(data.msg[i]||"0");
        //                    }
        //                    //轮播
        //                    if(data.data_all!=""){
        //                        var result = '';
        //                        for(var i in data.data_all) {
        //                            var img=$(".c_list[data-name='"+i+"'] .c_img img");
        //                            result += "<li><img src='"+img.attr("src")+"'/><span>"+i+"-获得助威<i>"+data.data_all[i]+"</i>次</span></li>";
        //                        }
        //                        $('.price_con ul').append(result);
        //                        //中奖名单--只有一个时复制一个
        //                        if($(".price_con ul li").length>1){
        //                            $(".price_con ul").append($(".price_con ul li").clone(true));
        //                        }
        //                        setInterval('autoScroll(".price_con ul")', 1500);
        //                    }else{
        //                        $(".price_no").removeClass("hidden");
        //                    }
        //                    //当前用户助威最多国家
        //                    var max=data.max;
        //                    //$(".c_list").removeClass("max").filter("[data-name='"+max+"']").addClass("max1");
        //                    //助威弹框显示
        //                    $(".co_tips_no .ts_box,.co_tips_no .ts_box .ts").addClass("hidden");
        //                    var nameobj={"法国":"fg","巴西":"bx","比利时":"bls","乌拉圭":"wlg","俄罗斯":"els","瑞典":"rd","克罗地亚":"kldy","英格兰":"ygl"};
        //                    var tsbox=$(".co_tips_no .ts_box."+nameobj[help_name]);
        //                    tsbox.find(".ts:eq("+Math.floor(tsbox.find(".ts").length*Math.random())+")").removeClass("hidden");
        //                    tsbox.removeClass("hidden");
        //                    $(".co_tips_no").removeClass("hidden");
        //                    //分享文案
        //                    var titleobj={"法国":"时间不多了，快来为我法打call！","巴西":"心疼内马尔一下，巴西队pick起来！","比利时":"这次的我们不一样，请为比利时加油！","乌拉圭":"世界杯我为乌拉圭打call！你呢？","俄罗斯":"安排好了，这届世界杯冠军就是你！","瑞典":"世界杯我为瑞典打call！你呢？","克罗地亚":"对阵东道主，我们都不慌！","英格兰":"一切都是命运的安排，相信凯恩相信英格兰！"};
        //                    share_title=titleobj[max]||share_title;
        //                    console.log(share_title);
        //                    shareInit();
        //                }else{
        //                    showErr(2, data.msg);
        //                }
        //            }
        //            ,error:function(){
        //                $(".count_all").removeAttr("data-loading");
        //                alert("网络请求失败，请重新刷新页面");
        //            }
        //        });
        //    }
        //}else{
        //    alert("今日助威次数已达到上限，请明日再来");
        //}

        alert("助威已结束哦~");
    });
});
