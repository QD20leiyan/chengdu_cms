<?php

use yii\helpers\Url;
use common\Cms;

?>

<div class="d_top">
    <div class="d_t_cover"></div>
    <div class="d_t_con">
        <div>
            <img src="<?= isset($global)? $global['logo_img']:''?>">
        </div>
        <div>
            <p><?=isset($global)? $global['title']:'';?></p>
            <p><?= isset($global)? $global['sub_title']:'';?></p>
        </div>
        <div>
            <div class="d_t_con_loadBtn">
                <a class="" href="javascript:;" style="color: #000000">立即下载</a>
            </div>
            
        </div>
        <div>

            <div class="d_t_con_drop" data="0">
                <span class="d_t_t"></span>
                <span class="d_t_m"></span>
                <span class="d_t_b"></span>
            </div>
        </div>
    </div>
    <ul class="down_ul">
		<li><a href="javascript:;" class="js_wap_down stat_down down1"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/gf.png" alt="" /></a></li>
        <li><a href="http://downurl.yingxiong.com/url2/ddd2_pcgw.html" class="stat_down down2">ios预约</a></li>
		<li><a href="http://l.taptap.com/EGoDqaq5" class="stat_tap" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/n_tap.png" alt="" /></a></li>
        <p class="p1">IOS用户需对游戏添加信任</p>
        <p>设置-通用-设备管理</p>
	</ul>
</div>
<div class="d_top_nav">
    <ul>
        <li class="top_active shouye">首 页</li>
        <li class="liansai">英雄联赛</li>
        <li class="xinwen">新闻资讯</li>
        <li class="huodong">活动中心</li>
        <li class="gonglue">弹弹攻略</li>
        <li>官方社区</li>
        <li><a href="https://www.jiyoushe.cn/game/gamePlay.html?gid=280020">点击试玩</a></li>
    </ul>
</div>
<div class="d_top_cover"></div>

<script>
    var u = navigator.userAgent,
        app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid) {
            $(".down_ul").removeClass("active");
            $(".down_ul .down2").css("display","none");
            $(".down_ul .down1").css("display","block");
        }
        if(isIOS) {
            $(".down_ul").addClass("active");
            $(".down_ul .down1").css("display","none");
            $(".down_ul .down2").css("display","block");
        }
	var clickTap = true;
    function getParam(paramName) {
        paramValue = "", isFound = !1;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
            arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    };
    function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
    function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    };


//    var a = getParam("current") || 0;
    $(".d_top_nav ul li").removeClass("top_active");
    var navTitle = "<?php if (isset($navTitle)) {echo $navTitle;} else {echo '';} ?>";
    if (navTitle) {
        $(".d_top_nav ul li."+navTitle).addClass("top_active");
    }

	$(".d_t_con_loadBtn").click(function (){
		if(clickTap){
			$(".down_ul").stop().slideDown();
			clickTap = false;
		} else {
			$(".down_ul").stop().slideUp();
			clickTap = true;
		}
	});
    $(".d_t_con_drop").on("click", function(e){
        e.stopPropagation();
        if($(this).attr("data")=="0"){
            $(".d_t_t").addClass("d_t_t_tran");
            $(".d_t_m").addClass("d_t_m_tran");
            $(".d_t_b").addClass("d_t_b_tran");

            $(this).attr("src","<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_15.png?<?= VERSION?>").attr("data","1");
            $(".d_top_nav").slideDown();
            $(".d_top_cover").show();
            windowHidden();
            //documentNoScroll();
        }else{
            $(".d_t_t").removeClass("d_t_t_tran");
            $(".d_t_m").removeClass("d_t_m_tran");
            $(".d_t_b").removeClass("d_t_b_tran");


            $(this).attr("src","<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_02.png?<?= VERSION?>").attr("data","0");
            $(".d_top_nav").slideUp();
            $(".d_top_cover").hide();
            windowScroll();
            //documentScroll()
        }
    });
    $(".d_top_cover,.d_t_con").on("click",function(e){
        e.stopPropagation();
        $(".d_t_t").removeClass("d_t_t_tran");
        $(".d_t_m").removeClass("d_t_m_tran");
        $(".d_t_b").removeClass("d_t_b_tran");

        $(".d_t_con_drop").attr("src","<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_02.png?<?= VERSION?>").attr("data","0");
        $(".d_top_nav").slideUp();
        $(".d_top_cover").hide();
        windowScroll();
        //documentScroll();
    });
//    $(".d_t_con_loadBtn").on("click", function(e){
//        e.stopPropagation();
//        $(".d_t_t").removeClass("d_t_t_tran");
//        $(".d_t_m").removeClass("d_t_m_tran");
//        $(".d_t_b").removeClass("d_t_b_tran");
//
//
//        $(".d_t_con_drop").attr("src","<?php //echo STATIC_DOMAIN ?>//3.0/m/images/pic_02.png?<?= VERSION?>").attr("data","0");
//        $(".d_top_nav").slideUp();
//        $(".d_top_cover").hide();
//        windowScroll();
//        //documentScroll()
//        alert("敬请期待");
//    })


    $(".d_top_nav ul li").eq(0).on("click",function(e){
        e.stopPropagation();  //首页
        location.href="<?php echo Url::to(['wap/site/index']) ?>";
    });
    $(".d_top_nav ul li").eq(1).on("click",function(e){
        e.stopPropagation();
        location.href="<?php echo Url::to(['wap/special/liansai']) ?>";
    });
    $(".d_top_nav ul li").eq(2).on("click",function(e){
        e.stopPropagation();
        location.href="<?php echo Cms::getUrl('wap/list',array('cid'=>1,'cat_dir'=>'info'))?>";

    });
    $(".d_top_nav ul li").eq(3).on("click",function(e){
        e.stopPropagation();
        location.href="/m/info/list_36_1.html";
    })
    $(".d_top_nav ul li").eq(4).on("click",function(e){
        e.stopPropagation();
        location.href="/m/info/list_37_1.html";
    })
    $(".d_top_nav ul li").eq(5).on("click",function(e){
        e.stopPropagation();
        location.href='http://gamer.yingxiong.com/html/Pc3.0/9.html';
    });
</script>
