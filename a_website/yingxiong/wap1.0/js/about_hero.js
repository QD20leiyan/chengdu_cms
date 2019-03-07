    $(document).ready(function () {
        var ab_time = $(".s_content>section>div:nth-child(1)");
        var ab_fz = $(".s_content>section>div:nth-child(2)");
        var ab_time_btn = $(".s_content>section>div:nth-child(1)>ul>li");

        function init() {
            //调用fullpage
            $('#ab_content').fullpage({
                verticalCentered: false,
                css3: true,
                afterLoad:function (anchorLink,index){
                    //console.log(index);
                    var index = parseInt(index);
                    switch (index){
                        case 1:{

                        }
                            break;
                        case 2:{
                            ab_time.eq((index-2)).attr("class","animated bounceInLeft");
                            ab_fz.eq((index-2)).attr("class","animated bounceInRight");

                        }
                            break;
                        case 3:{
                            ab_time.eq((index-2)).attr("class","animated bounceInLeft");
                            ab_fz.eq((index-2)).attr("class","animated bounceInRight");
                        }
                            break;
                        case 4:{
                            ab_time.eq((index-2)).attr("class","animated bounceInLeft");
                            ab_fz.eq((index-2)).attr("class","animated bounceInRight");
                        }
                            break;
                        case 5:{
                            ab_time.eq((index-2)).attr("class","animated bounceInLeft");
                            ab_fz.eq((index-2)).attr("class","animated bounceInRight");
                        }
                            break;

                        case 6:{
                            var s_work1_img = $("#s_work1").children();
                            s_work1_img.eq(0).attr("class","animated bounceInLeft");
                            s_work1_img.eq(1).attr("class","animated bounceInRight");
                        }
                            break;
                        case 7:{
                            var s_work2_img = $("#s_work2").children();
                            s_work2_img.eq(0).attr("class","animated bounceInLeft");
                            s_work2_img.eq(1).attr("class","animated bounceInRight");
                        }
                    }
                },
                afterRender:function () {
                    $(".yx_cover").remove();
                    s1_animate();
                }
            });
            //调用点击页面菜单按钮方法
            main1.click_top_nav({
                ele: $(".nav_icon")
            });
            //返回上一页
            main1.go_back($("#nav_back"));
            set_yx_line();
        }

        //页面加载完成第一屏动画
        function s1_animate(){
            var s1_child = $("#s1_content").children();
            s1_child.eq(0).attr("class","animated bounceInRight");
            s1_child.eq(1).attr("class","animated bounceInLeft");
            s1_child.eq(3).attr("class","animated bounceInRight");
            s1_child.eq(5).attr("class","animated bounceInLeft");

        }
        //页面加载完成设置公司发展线条高度
        function set_yx_line() {
            $(".ab_line").each(function () {
                var now_line = $(this);
                var f_ele = $(this).parent();
                var div_ele = f_ele.find("div");
                var len = div_ele.length;
                var all_width = parseInt(f_ele.css("height"));
                var last_width = parseInt(div_ele.eq(len-1).css("height"));
                now_line.css("height",(all_width-last_width-2)+"px");
            });
        }
        //改写点击顶部导航icon方法
        main1.click_top_nav = function (obj) {
            var ele = obj.ele;
            //添加点击事件
            if(ele){
                ele.on("touchend",function () {
                    var name = $(this).attr("name");
                    //0代表导航隐藏
                    if(name == 0){
                        $(this).attr({"name":"1"});

                        $(this).children().eq(0).attr({"class":"nav_icon nav_hide"});
                        $(this).children().eq(1).attr({"class":"close"});


                        //$(this).children().attr({"src":domain+"images/yx_close1_03.png","class":"close"}).css("background","transparent");
                        $(this).parent().children("ul").css("display","block").attr("class","animated bounceInRight");
                    }else {
                        $(this).attr("name","0");

                        $(this).children().eq(0).attr({"class":"nav_icon"});
                        $(this).children().eq(1).attr({"class":"close nav_hide"});

                        //$(this).children().attr({"src":domain+"images/ab_img2_06.png","class":"nav_icon"}).css("background","transparent");
                        $(this).parent().children("ul").attr("class","animated bounceOutRight");
                        setTimeout(function(){
                            $(this).parent().children("ul").css("display","none");
                        },500);
                    }
                })
            }
        };

        //页面事件
        $(".page_next_icon").on("touchend",function () {
            $.fn.fullpage.moveSectionDown();
        });

        ab_time_btn.on("touchend",function () {
            var name = $(this).attr("name");
            var class_name =  $(this).attr("class");
            if(class_name){
                return;
            }
            $.fn.fullpage.moveTo(name);
        });


        init();
    });