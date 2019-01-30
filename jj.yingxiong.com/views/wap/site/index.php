<?php

use common\Cms;
use yii\helpers\Url;

?>
<style>
    .swiper-pagination-bullet {
        background: url(<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_16.png) no-repeat center center;
        background-size:100% 100%;
        opacity: 1;

    }
    .swiper-pagination-bullet-active{

        background: url(<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_15.png) no-repeat center center;
        background-size:100% 100%;
    }
</style>

<!-- 下载 -->
<?php echo $this->render('@app/views/layouts/wap/download.php');?>

<div class="main_images">
    <div class="main_gb1"><img class="main_gb1_img" src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_10.png"></div>
    <!-- <img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_05.png" class="chuantou"> -->

    <!-- 视频播放 -->
    <?php echo $this->render('@app/views/layouts/wap/video.php');?>


    <!-- <img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_07.png" class="main_orange">-->

    <div class="swiper-container the_container">
        <div class="swiper-wrapper">
            <?php foreach ($banners as $k => $v) { ?>
                <div class="swiper-slide"><a href="<?php echo $v['url']; ?>" target="_blank"><img src="<?php echo $v['thumb'] ?>"></a></div>
            <?php } ?>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>
<div class="main_news ind_mt2">角色展示</div>

<div class="ind_role">
    <?php foreach ($martial as $k => $v) { ?>
        <img src="<?php echo $v['thumb'] ?>" class="ind_r_img01" style="display: <?php if ($k == 0) { echo 'block';} else { echo 'none';} ?>">
    <?php } ?>
    <ul class="ind_r_ul">
        <?php foreach ($martial as $k => $v) { ?>
            <li <?php if ($k == 0) {echo 'class="addStyle"';} ?>  index="<?php echo $k; ?>"><?php echo $v['title'] ?></li>
        <?php } ?>
    </ul>
    <?php foreach ($martial as $k => $v) { ?>
    <div class="ind_r_text" style="display: <?php if ($k == 0) {echo 'block';} else {echo 'none';} ?>">
        <?php echo $v['summary']; ?>
    </div>
    <div class="ind_r_play video-menu js_video_play" data-url="<?php echo $v['url'] ?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_18.png"></div>
    <?php } ?>
</div>

<div class="main_news ind_mt2">新闻资讯</div>
<div class="news_navs">
    <div class="news_nav">
        <div><li class="liActive" data="0" isLoad="0">最新</li></div>
        <div><li data="1" isLoad="1">新闻</li></div>
        <div><li data="2" isLoad="1">公告</li></div>
        <div><li data="3" isLoad="1">攻略</li></div>
    </div>
    <div class="news_more"><a href="<?php echo Cms::getUrl('wap/list', ['id' => 31]);?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_19.png"></a></div>
</div>
<div class="news_lists">
    <div class="news_list">
        <?php foreach ($zuixin as $k => $v) { ?>
            <a href="<?php echo $v['wapLinkUrl']; ?>"><li><p><?php echo $v['title'] ?></p><span><?php echo date('m/d', $v['created_at']) ?></span></li></a>
        <?php } ?>
    </div>

    <div class="news_list" style="display:none">
        <?php foreach ($xinwen as $k => $v) { ?>
            <a href="<?php echo $v['wapLinkUrl']; ?>"><li><p><?php echo $v['title'] ?></p><span><?php echo date('m/d', $v['created_at']) ?></span></li></a>
        <?php } ?>
    </div>

    <div class="news_list" style="display:none">
        <?php foreach ($gonggao as $k => $v) { ?>
            <a href="<?php echo $v['wapLinkUrl']; ?>"><li><p><?php echo $v['title'] ?></p><span><?php echo date('m/d', $v['created_at']) ?></span></li></a>
        <?php } ?>
    </div>

    <div class="news_list" style="display:none">
        <?php foreach ($gongnue as $k => $v) { ?>
            <a href="<?php echo $v['wapLinkUrl']; ?>"><li><p><?php echo $v['title'] ?></p><span><?php echo date('m/d', $v['created_at']) ?></span></li></a>
        <?php } ?>
    </div>
</div>

<div class="img_display">
    <div><a href="<?php echo Cms::getUrl('wap/list', ['cat_dir' => 'image', 'id' =>103])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_25.png" data_id="103"></a></div>
    <div><a href="<?php echo Cms::getUrl('wap/list', ['cat_dir' => 'image', 'id' =>107])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_26.png" data_id="107"></a></div>
</div>

<div class="main_news ind_mt2">游戏资料</div>

<div class="game_data">
    <div class="g_data01">
        <div class="g_data_bg"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_20.png" alt=""></div>
        <div class="g_data_con">
            <p>新手介绍</p>
            <span>Newbie introduction</span>
            <div></div>
            <ul>
                <?php foreach ($xinshou as $k => $v) { ?>
                    <a href="<?php echo  $v['wapLinkUrl'] ?>"><li><?php echo $v['title']; ?></li></a>
                <?php } ?>
            </ul>
        </div>
    </div>
    <div class="g_data02">
        <div class="g_data_bg"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_21.png"></div>
        <div class="g_data_con">
            <p style="color:#982327">副本介绍</p>
            <span style="color:#ecb4b4">Copy introduction</span>
            <div style="background:#f8b6b6;"></div>
            <ul>
                <?php foreach ($fuben as $k => $v) { ?>
                    <a href="<?php echo $v['wapLinkUrl'];?>"><li><?php echo $v['title']; ?></li></a>
                <?php } ?>
            </ul>
        </div>
    </div>
    <div class="g_data03">
        <div class="g_data_bg"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_22.png" alt=""></div>
        <div class="g_data_con">
            <p style="color:#a507c4;">特色玩法</p>
            <span style="color:#ecb4e4">Features play</span>
            <div style="background:#f8b6f6"></div>
            <ul>
                <?php foreach ($tese as $k => $v) { ?>
                    <a href="<?php echo $v['wapLinkUrl'];?>"><li><?php echo $v['title']; ?></li></a>
                <?php } ?>
            </ul>
        </div>
    </div>
</div>

<div class="img_display">
    <div><a href="<?php echo Cms::getUrl('wap/list', ['cat_dir' => 'image', 'id' =>111])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_27.png" data_id="111"></a></div>
    <div><a href="<?php echo Cms::getUrl('wap/list', ['cat_dir' => 'image', 'id' =>112])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_28.png" data_id="112"></a></div>
</div>


<div class="ind_ewm"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_23.png" alt=""></div>
<div class="ind_focus">关注九剑魔龙传官网微信</div>
<div class="ind_wxss">请微信搜索微信公众号：<i>九剑魔龙传</i><br>获取更多活动礼包</div>

<!--<footer id="Hero-bar"><div class="f_t"><ul><li><a href="javascript:alert('敬请期待')">客服中心</a></li><li><a href="javascript:alert('敬请期待')" id="community">游戏社区</a></li></ul><div class="tel"><a href="tel:4009393333"><i></i>400-939-3333</a></div></div><p class="f_txt">COPY RIGHT   @2015-2016  ALL RIGHTS RESERVED</p><p class="f_link"><a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393">《网络文化经营许可证》 </a>&nbsp;<a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08b573b3c8901573c1ba4e908b3">[2015]0629-259号</a></p></footer>-->

<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/swiper-3.3.1.jquery.min.js"></script>



<script>
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop:true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '"></span>';
        }
    });

//    $(".img_display>div>img").on("click",function(e){
//        e.stopPropagation();
//
//        var id = $(this).attr("data_id");
//        location.href="<?php //echo Cms::getUrl('wap/list', ['cat_dir' => 'image', 'id' =>107])?>//";
//    })

    //点击ind_r_ul li
    $(".ind_r_ul li").on("click", function(e){
        e.stopPropagation();
        if($(this).hasClass("addStyle")){
            return false;
        }else{
            //alert($(this).attr("index"))
            $(".ind_r_ul li").removeClass("addStyle");
            $(this).addClass("addStyle");
            var curIndex = $(this).attr("index");
            $(".ind_r_img01").hide()
            $(".ind_r_img01").eq(curIndex).show();

            $(".ind_r_text").hide();
            $(".ind_r_text").eq(curIndex).show();
            $(".ind_r_play").hide();
            $(".ind_r_play").eq(curIndex).show();


        }
    });
    $(".news_nav li").on("click",function(e){
        e.stopPropagation();
        if($(this).hasClass("liActive")){
            return false;
        }else{
            var theData = $(this).attr("data");
            $(".news_nav li").removeClass("liActive");
            $(this).addClass("liActive");
            $(".news_list").hide();
            $(".news_list").eq(theData).show();
            if($(this).attr("isLoad")=="1"){
                init(theData);
                $(this).attr("isLoad","0");
            }else{
                return false;
            }

        }
    });
    $(".news_more").on("click",function(e){
        e.stopPropagation();
        location.href="dataList.html";
    });
    function toLists(){
        $(".news_lists li").on("click", function(e){
            e.stopPropagation();
            location.href="detail01.html";
        })
    }
    function offLists(){
        $(".news_lists li").off();
    };
    init(0)
    function init(curIndex){
        console.log(curIndex)
        $.ajax({
            type: 'POST',
            url: 'json/init.json',
            data:"data="+curIndex,
            dataType: 'json',
            success: function(data){

                var dataList = data.lists;

                var result = "";
                $.each(dataList, function(index, element){
                    result += '<li><p>'+element.title+'</p><span>'+element.date+'</span></li>';
                });
                //$('.news_list').eq(curIndex).append(result);
                $('.news_list').eq(curIndex).append(result);
                offLists()
                toLists()

            }
        });
    }
</script>

<!--<script src="--><?php //echo STATIC_DOMAIN ?><!--/js/public.js"></script>-->
