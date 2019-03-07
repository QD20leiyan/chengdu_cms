$(document).ready(function(){

        function init(){
            //调用点击页面菜单按钮方法
            main1.click_top_nav({
                ele: $(".nav_icon")
            });
            //返回上一页
            main1.go_back($("#nav_back"));
        }

        //改写点击顶部导航icon方法
        main1.click_top_nav = function (obj) {
            var ele = obj.ele;
            //添加点击事件
            if(ele){
                ele.on("touchend",function () {
                    var name = $(this).attr("name");
                    //0代表导航处于隐藏状态
                    if(name == 0){
                        $(this).attr({"name":"1"}).css("background","#fff");
                        $(this).children().attr({"src":domain+"images/yx_close1_03.png","class":"close"}).css("background","transparent");
                        $(this).parent().children("ul").css("display","block").attr("class","animated bounceInRight");
                    }else {
                        $(this).attr("name","0").css("background","#252525");
                        $(this).children().attr({"src":domain+"images/ab_img2_06.png","class":"nav_icon"}).css("background","transparent");
                        $(this).parent().children("ul").attr("class","animated bounceOutRight");
                        setTimeout(function(){
                            $(this).parent().children("ul").css("display","none");
                        },500);
                    }
                })
            }
        };

        //页面事件
        
        init();
    });