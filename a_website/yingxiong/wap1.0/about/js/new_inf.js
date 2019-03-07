$(document).ready(function () {
        //点击页面顶部导航图标
        main1.click_top_nav({
            ele: $("#nav_icon"),
            nav: $("#page_nav")
        });
        //返回上一页
        main1.go_back($("#nav_back"));
    });