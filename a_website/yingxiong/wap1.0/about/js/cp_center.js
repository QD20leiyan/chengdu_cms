$(document).ready(function () {
    var mySwiper;
    var page_width = document.body.clientWidth;
    //页面整个主要内容显示框
    var $swiper_slide = $(".swiper-slide");
    var $cp_con_ul = $(".swiper-slide>ul");
    //页面头部导航显示icon
    var $cp_nav_li = $("#cp_nav>ul>li");
    var $cp_nav_icon = $("#cp_nav_icon");
    //当前展示内容的下标
    var content_index = 0;
    //加载图片高度
    var img_height_list = 0;

    function init() {
        //去掉loading页
        main1.remove_loading($(".yx_cover"));
        //初始化切换内容区域的高度
        cp_content_show();
        //页面模块加载动画
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
    }

    function page_jz_animate(){
        $("#cp_content").attr("class","cp_content animated bounceInUp");
        $("#i_foot").attr("class","i_foot animated bounceInUp");
    }
    //初始化显示区域内容
    function cp_content_show(){
        mySwiper = new Swiper ('.swiper-container', {
            autoplayDisableOnInteraction: false,
            onInit:function () {
                set_cp_cont_height(0);
            },
            onSlideChangeEnd: function(swiper){
                var width = parseInt($cp_nav_li.css("width"));
                content_index = swiper.activeIndex;
                //nav切换
                $cp_nav_li.attr("class","");
                $cp_nav_li.eq(content_index).attr("class","active");
                $cp_nav_icon.css({
                    "transform":"translate3d("+width*content_index+"px,0,0)",
                    "-webkit-transform":"translate3d("+width*content_index+"px,0,0)"
                });
                //判断切换内容区域高度是否已经改变
                set_cp_cont_height(content_index);
                loadgame(content_index,'init');
            }
        })
    }

    //设置切换显示区域高度
    function set_cp_cont_height(index){
        $swiper_slide.css({
            "height":"0"
        });
        $swiper_slide.eq(index).css({
            "height":"auto"
        });
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

    //点击导航栏切换显示内容
    $("#cp_nav>ul>li").on("touchend",function () {
        var width = parseInt($(this).css("width"));
        content_index = $(this).index();
        //nav切换
        $cp_nav_li.attr("class","");
        $(this).attr("class","active");
        $cp_nav_icon.css({
            "transform":"translate3d("+width*content_index+"px,0,0)",
            "-webkit-transform":"translate3d("+width*content_index+"px,0,0)"
        });
        //显示内容切换
        mySwiper.slideTo(content_index);
        loadgame(content_index,'init');
    });
    //声明加载分页对象
    var loadpage = {
        page:[],//页码
        phtml:[]//状态
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
    //下拉刷新添加数据，需要后台添加
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight >= scrollHeight){
            loadgame(content_index,'load');
        }
    });

    /**
     * @params content_index 目标装载dome下标
     * @params sign 标记 init初始化第一次加载 load 后续多次加载
     */
    function loadgame(content_index,sign){
        var c = 'all';
        //下标转换请求目标分类
        switch(content_index){
            case 1:
                c ='hot';
                break;
            case 2:
                c ='new';
                break;
            case 3:
                c ='test';
                break;
        }

        //状态标识为‘结束’，取消加载
        if(loadpage.getPhtml(c) == 'over'){
            cp_loading_change(2);
            return false;
        }
        if(loadpage.getPhtml(c) == 'loading'){
            cp_loading_change(1);
            return false;
        }
        //判断是否是第一次加载数据
        if(sign == 'init' && $cp_con_ul.eq(content_index).html() !==''){
            return false;
        }
        loadpage.setPhtml(c,'loading');
        //处理并保存页码
        page = loadpage.getPage(c);
        if(page){
            page = page + 1;
            loadpage.setPage(c,page);
        }else{
            page = 1;
            loadpage.setPage(c,page);
        }
        cp_loading_change(1);
        //请求数据
        $.get('/wap/site/getgame',{c:c,page:page},function(html){
            if(html !=='over'){
                cp_loading_change(0);
                loadpage.setPhtml(c,'init');
                $cp_con_ul.eq(content_index).append(html);
                //设置加载数据图片高度
                $(".swiper-slide ul li>img").height(page_width*0.266+"px");
                $(".swiper-slide ul li>section").height(page_width*0.266+"px");
            } else{
                //返回为空时，标识变为结束，拒绝下次再次加载数据
                loadpage.setPhtml(c,'over');
                cp_loading_change(2);
            }
        },'html');

    }
    //初始化首次加载
    loadgame(content_index,'init');
    init();
});