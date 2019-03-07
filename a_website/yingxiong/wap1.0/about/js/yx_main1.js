/**
 * Created by lmy on 2017/5/18.
 */

var main1 = {};


//main1调用方法
main1.init = function(){
    //调用返回首页方法
    main1.go_back_index($(".yx_bc_index"));
    //禁止手机浏览器缩放
    main1.no_page_zoom();
};

//去掉loading页
main1.remove_loading = function(ele) {
    if(ele){
        ele.remove();
    }
};

//禁止手机浏览器双指缩放
main1.no_page_zoom = function() {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false);
};

//返回首页
main1.go_back_index = function(ele){
    if(ele){
        ele.on("touchend",function(){
            location.href = "/m/index";
        })
    }
};
//返回上一页
main1.go_back = function(ele){
    if(ele){
        ele.on("touchend",function(){
            window.history.go(-1);
        })
    }
};

//点击屏幕取消某些页面nav的显示
main1.hide_nav = function(obj){
    var ele = obj.ele;
    var nav = obj.nav;
    var nav_icon = obj.nav_icon;
    if(ele){
        ele.on("click",function(){
            var nav_display = nav.css("display");
            if(nav_display == "block"){
                nav_icon.attr("name","0").css("background","#ff3c5e");
                nav_icon.children().attr({"src":domain+"images/cp_img2_03.png","class":"nav_icon"});
                nav.attr("class","animated bounceOutRight");
                setTimeout(function(){
                    nav.css("display","none");
                },500);
            }
        });
    }
};

//点击页面顶部菜单图标
main1.click_top_nav = function (obj) {
    var ele = obj.ele;
    var nav = obj.nav;
    //添加点击事件
    if(ele){
        ele.on("touchend",function (event) {
            //阻止事件冒泡
            event.stopPropagation();
            var name = $(this).attr("name");
            //0代表导航隐藏
            if(name == 0){
                $(this).attr({"name":"1"}).css("background","#fff");
                $(this).children().eq(0).attr({"class":"nav_icon nav_hide"});
                $(this).children().eq(1).attr({"class":"close"});
                nav.css("display","block").attr("class","animated bounceInRight");

            }else {
                $(this).attr("name","0").css("background","#ff3c5e");
                $(this).children().eq(0).attr({"class":"nav_icon"});
                $(this).children().eq(1).attr({"class":"close nav_hide"});
                nav.attr("class","animated bounceOutRight");
                setTimeout(function(){
                    nav.css("display","none");
                },500);
            }
        });
        ele.on("click",function(event){
            //阻止事件冒泡
            event.stopPropagation();
        })
    }
};


main1.init();
