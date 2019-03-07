$(document).ready(function () {
    var page_width = document.body.clientWidth;
    var xw_banner_icon = $("#xw_banner_icon>i");
    var page_nav = $("#page_nav");
    //调用方法集合
    function init() {
         reset_img();
        //去掉loading页
        main1.remove_loading($(".yx_cover"));
        //页面加载完成内容出现动画
        page_jz_animate();
        //返回上一页
        main1.go_back($("#nav_back"));
        //点击页面顶部导航图标
        main1.click_top_nav({
            ele: $("#nav_icon"),
            nav: $("#page_nav")
        });
        main1.hide_nav({
            ele: $("#page_over_hide"),
            nav: $("#page_nav"),
            nav_icon: $("#nav_icon")
        });
        start_banner();
    }
    //重置banner图高度
    function reset_img(){
        $("#xw_banner").height(page_width*0.48+"px");
    }

    //加载完成内容出现动画
    function page_jz_animate(){
        $("#xw_banner").attr("class","xw_banner animated bounceInDown");
        setTimeout(function(){
            $("#xw_c1").attr("class","xw_c1 animated bounceInUp");
            $("#yx_jz").attr("class","yx_jz animated bounceInUp");
            $("#i_foot").attr("class","i_foot animated bounceInUp");
        },500);
    }
    //开始轮播banner
    function start_banner() {
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            onInit:function () {

            },
            onSlideChangeEnd: function(swiper){
                //切换结束时，告诉我现在是第几个slide
                var len = xw_banner_icon.length;
                var activeIndex = swiper.activeIndex;
                if(activeIndex == (len+1)){
                    activeIndex = 1;
                }else if(activeIndex == 0){
                    activeIndex = len;
                }
                xw_banner_icon.attr("class","").eq((activeIndex-1)).attr("class","active");
            }
        })
    }

    //加载中，加载完成切换
    //0代表还没有或者加载完成， 1代表加载中, 2数据全加载完成
    function cp_loading_change(type){
        //初始化加载样式
        $(".yx_jz>section").css("display","none");
        $(".yx_jz>div").css("display","none");
        $(".yx_jz>section>p").html("下拉加载更多...");
        $(".yx_jz>section>img").css("display","inline-block");

        if(type == 0){
            $(".yx_jz>section").css("display","block");
        }else if(type == 1){
            $(".yx_jz>section").css("display","none");
            $(".yx_jz>div").css("display","block");
        }else if(type == 2){
            $(".yx_jz>section").css("display","block");
            $(".yx_jz>section>p").html("已经到底了喔~");
            $(".yx_jz>section>img").css("display","none");
        }
    }
    //下拉刷新添加数据，需要后台添加
    var i=true;
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight >= scrollHeight){
            // loadgame();
            if(i=true){
                i=false;
                // setTimeout(function () {
                    loadgame();
                // })
            }
        }
    });

    var loadpage = {
        page:[],
        phtml:[]
    };

    loadpage.setPage = function(key,value){
        loadpage.page[key] = value;
    }

    loadpage.getPage = function(key){
        if(loadpage.page[key]){
            return loadpage.page[key];
        }
        return '';
    }

    loadpage.setPhtml = function(key,value){
        loadpage.phtml[key] = value;
    }

    loadpage.getPhtml = function(key){
        if(loadpage.phtml[key]){
            return loadpage.phtml[key];
        }
        return '';
    }

    function loadgame(){
        c = 'newslist';
        if(loadpage.getPhtml(c) == 'over'){
            cp_loading_change(2);
            return false;
        }
        page = loadpage.getPage(c);
        if(page){
            page = page + 1;
            loadpage.setPage(c,page);
        }else{
            page = 1;
            loadpage.setPage(c,page);
        }
        cp_loading_change(1);
        $.get('/wap/site/getnews',{page:page},function(html){
            if(html !=='over'){
                cp_loading_change(0);
                var xw_c1 = $("#xw_c1");
                xw_c1.append(html);
                //设置图片高度
                $("#xw_c1>li>a>img").height(page_width*0.21+"px");
                $("#xw_c1>li>a>section").height(page_width*0.21+"px");
            } else{
                loadpage.setPhtml(c,'over');
                cp_loading_change(2);
            }
            i=true;;
        },'html');
    }

    loadgame();
    init();
});