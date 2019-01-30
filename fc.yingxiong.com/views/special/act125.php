<?php

use common\Cms;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS):$this->web_keywords?>" >
    <meta name="Description" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION):$this->web_description?>" >
    <link rel="shortcut icon" href="<?php echo STATIC_DOMAIN ?>2.0/images/favicon.ico" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/common.min.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/swiper.3.1.7.min.css">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/css/style.css" rel="stylesheet"/>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/special/act125_m";
        }
    </script>
</head>
<body>
<div class="wrap_125">
    <?php echo $this->render("//layouts/pc/nav",array('nid'=>0));?>
    <div class="page1_125">
        <div class="con">
            <a href="/index.html" class="logo"><img src="<?php echo STATIC_DOMAIN ?>2.0/images/125_logo.png" alt=""></a>
        </div>
        <!-- <div class="slogan"></div> -->
        <div class="page1_b_125"></div>
    </div>
    <div class="page2_125">
        <div class="page2_title_125"></div>
        <div class="page2_125_con">
            <div class="lb">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <?php foreach($sdzs as $k=>$v){ ?>
                        <div class="swiper-slide swiper-no-swiping">
                            <img src="<?php echo $v['thumb'] ?>" alt="" >
                        </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="lb_03_prev"></div>
                <div class="lb_03_next"></div>
                <div class="txt">
                    <p>限定赛道：水晶矿山</p>
                    <p>限定赛车：使用B级及B级以下任意车型（原始未改装状态）</p>
                    <p>限定时间：125秒</p>
                    <p>详情介绍：玩家需使用原始未改装状态下的B级或B级以下任意车型，在125秒的限定时间内跑完全程。</p>
                </div>
            </div>
        </div>
    </div>
    <div class="page3_125">
        <div class="title"></div>
        <div class="con">
            <div class="con_t">
                <?php foreach($tzzx as $k=>$v){ ?>
                <div class="img_border">
                    <a target="_blank" href="<?php echo $v['linkUrl'] ?>">
                        <img src="<?php echo $v['thumb'] ?>" alt="">
                        <p><?php echo $v['title'] ?></p>
                    </a>
                </div>
                <?php } ?>
            </div>

            <div class="con_b">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <?php foreach($tzlb as $k=>$v){ ?>
                        <div class="swiper-slide swiper-no-swiping">
                            <a target="_blank" href="<?php echo $v['redirect_url'] ?>"><img src="<?php echo $v['thumb'] ?>" alt="" ></a>
                        </div>
                        <?php } ?>
                    </div>
                    <!-- 如果需要分页器 -->
<!--                    <div class="swiper-pagination">-->
<!--                        --><?php //foreach($tzlb as $k=>$v){ ?>
<!--                            <span --><?php //if($k==0){echo 'id="span"';} ?><!--></span>-->
<!--                        --><?php //} ?>
<!--                    </div>-->
                </div>
                <div class="lb_02_prev"></div>
                <div class="lb_02_next"></div>
            </div>
        </div>
    </div>
    <div class="page4_125">
        <div class="title"></div>
        <div class="con">
            <a href="javascript:;" class="more"><img src="<?php echo STATIC_DOMAIN ?>2.0/images/page4_more.png" alt=""></a>
            <div class="video_125">
                <?php foreach($jcsp as $k=>$v){ ?>
                    <div class="video">
                        <div class="videoImg">
                            <img src="<?php echo $v['thumb'] ?>" alt="">
                            <i class="video_i js_video_play" data-url="<?php echo $v['redirect_url'] ?>"></i>
                        </div>
                        <p><?php echo $v['title'] ?></p>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <div class="page5_125">
        <div class="title"></div>
        <div class="con">
            <div class="page5_lb">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <?php foreach($mrt as $k=>$v){ ?>
                            <div class="swiper-slide swiper-no-swiping">
                                <div class="actor_01">
                                    <div class="border">
                                        <img src="<?php echo $v['thumb'] ?>" alt="">
                                    </div>
                                    <div class="name">敬请期待</div>
                                    <p>挑战记录：<?php echo $v['sub_title'] ?>秒</p>
                                    <p><?php echo $v['title'] ?></p>
                                    <i class="video_i js_video_play" data-url="<?php echo $v['redirect_url'] ?>"></i>
                                </div>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="lb_01_prev"></div>
                <div class="lb_01_next"></div>
            </div>
        </div>
    </div>
    <div class="page6_125">
        <div class="title"></div>
        <div class="con">
            <div class="page6_lb">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <?php foreach($yxzb as $k=>$v){ ?>
                        <div class="swiper-slide swiper-no-swiping">
                            <div class="page6_v">
                                <a href="<?php echo $v['redirect_url'] ?>"><img src="<?php echo $v['thumb'] ?>" alt=""></a>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="lb_00_prev"></div>
                <div class="lb_00_next"></div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js"></script>
</div>
<!--<div id="video_mask" class="video_mask" style="display: none;">-->
<!--    <div class="w man10 both OF none"></div>-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos">-->
<!---->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/swiper.3.1.7.min.js"></script>
<script>
    var mySwiper = new Swiper ('.page2_125 .swiper-container', {
        loop: true,
        autoplay: 5000,
        // // 如果需要分页器
        pagination: '.swiper-pagination',
        speed:500,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_03_next',
        prevButton: '.lb_03_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    var mySwiper = new Swiper ('.con_b .swiper-container', {
        loop: true,
        autoplay: 5000,
        // // 如果需要分页器
        pagination: '.swiper-pagination',
        speed:500,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_02_next',
        prevButton: '.lb_02_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    var mySwiper = new Swiper ('.page5_lb .swiper-container', {
        loop: true,
        // autoplay: 5000,
        freeMode : true,
        // // 如果需要分页器
        pagination: '.swiper-pagination',
        spaceBetween : 30,
        speed:500,
        slidesPerView : 2,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_01_next',
        prevButton: '.lb_01_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    var mySwiper = new Swiper ('.page6_lb .swiper-container', {
        loop: true,
        freeMode : true,
        autoplay: 5000,
        spaceBetween : 10,
        slidesPerView : 4,
        // // 如果需要分页器
        pagination: '.swiper-pagination',
        speed:500,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_00_next',
        prevButton: '.lb_00_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    $(".video_i").click(function(){
        var link_url = $(this).attr('rel');
        $(".videos").html('');
        $('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash"></embed>');
        $(".video_mask").show();
    })
    $("#close").click(function(){
        $(".videos").html('');
        $(".video_mask").hide();
    })
</script>
</body>
</html>

<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>