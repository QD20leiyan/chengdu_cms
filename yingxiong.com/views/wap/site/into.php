
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/in_hero.css?<?=VERSION?>">
<div class="ab_cover"></div>
<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<header class="cp_header">
    <?php echo $this->render('@app/views/layouts/wap/header.php');?>
    <img class="logo" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img1_03.png?<?=VERSION?>">
    <link href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/index_join.css?<?=VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_swiper.min.css?<?=VERSION?>" rel="stylesheet" />
</header>

<div class="wrap" >
    <section class="section1">
        <div class="joi-wrap0-img"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/one01.png?<?=VERSION?>" alt=""/></div>
        <a class="link-btn1" href="http://jobs.yingxiong.ourats.com/m/index/campus"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/one02.png?<?=VERSION?>"></a>
        <a class="link-btn2" href="http://jobs.yingxiong.ourats.com"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/one03.png?<?=VERSION?>"></a>
    </section>
    <section class="section2">
        <h1 class="font-face">福利待遇<span>HERO BENEFITS</span></h1>
        <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/two01.png?<?=VERSION?>" alt="" class="h-welfare-img">
    </section>
    <section class="section3">
        <div class="h-welfare-tab swiper-container">
            <ul class="hd swiper-wrapper">
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/banner01.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/banner03.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/banner04.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/banner05.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/banner06.png?<?=VERSION?>" /></a></li>
            </ul>
            <div class="swiper-pagination" id="swiper-pagination">
                &nbsp;</div>
        </div>
    </section>
    <section class="section4">
        <h1 class="font-face">英雄风采<span>HERO PHOTOGRAPH</span></h1>
        <div class="h-photos-tab">
            <div class="parBd">
                <span class="on sta1">工作环境</span>
                <span class="sta2">员工活动</span>
                <span class="sta3">节日福利</span>
            </div>
            <div class="parHd">
                <div class="slideBox swiper-container1 box1">
                    <div class="sliderBoxImg swiper-wrapper">
                        <?php if($gzhj): foreach($gzhj as $v){ ?>
                            <img src="<?php echo $v['thumb'].'?'.VERSION ?>" class="swiper-slide">
                        <?php } endif;?>
                    </div>
                    <div class="swiper-pagination" id="swiper-pagination1">
                        &nbsp;</div>
                </div>
                <div class="slideBox swiper-container2 box2 hidden" id="slideBox2">
                    <div class="sliderBoxImg swiper-wrapper">
                        <?php if($yghd): foreach($yghd as $v){ ?>
                            <img src="<?php echo $v['thumb'].'?'.VERSION  ?>" class="swiper-slide">
                        <?php } endif;?>
                    </div>
                    <div class="swiper-pagination" id="swiper-pagination2">
                        &nbsp;</div>
                </div>
                <div class="slideBox swiper-container3 box3 hidden"  id="slideBox3">
                    <div class="sliderBoxImg  swiper-wrapper">
                        <?php if($jrfl):foreach($jrfl as $v){ ?>
                            <img src="<?php echo $v['thumb'].'?'.VERSION  ?>" class="swiper-slide">
                        <?php } endif;?>
                    </div>
                    <div class="swiper-pagination" id="swiper-pagination3">
                        &nbsp;</div>
                </div>
            </div>
        </div>
    </section>
    <section class="section5">
        <h1 class="font-face">员工发展<span>STAFF DEVELOPMENT</span></h1>
        <div class="h-welfare-tab swiper-container4">
            <ul class="hd swiper-wrapper">
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve01.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve02.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve03.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve04.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve05.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve06.png?<?=VERSION?>" /></a></li>
                <li class="swiper-slide"><a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/deve07.png?<?=VERSION?>" /></a></li>
            </ul>

        </div>
        <div class="develope-img">
            <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/five01.png?<?=VERSION?>"/>
        </div>
    </section>
    <section class="section6">
        <h1 class="font-face">招聘岗位<span>JOIN US</span></h1>
        <a class="link-btn1" href="http://jobs.yingxiong.ourats.com/m/index/campus"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/one02.png?<?=VERSION?>"></a>
        <a class="link-btn2" href="http://jobs.yingxiong.ourats.com"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/one03.png?<?=VERSION?>"></a>
    </section>
</div>
<script src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/jquery-1.11.2.min.js?<?=VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/jquery+fittext+touchslider.js?<?=VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_swiper.min.js?<?=VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/public.js?<?=VERSION?>"></script>

<script>
    window.onload = function(){$(".ab_cover").css({"display":"none"})};
</script>
<?php echo $this->render('@app/views/layouts/wap/footer.php');?>
<!--这是返回首页浮标-->
<div class="yx_bc_index">
    <p>回到<br/>首页</p>
</div>
<!--这是横屏遮罩层-->
<section class="yx_hp_cover">
    <p>建议竖屏浏览喔~</p>
</section>
<!---->
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx.fullPage.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/in_heroN.js?<?=VERSION?>"></script>
