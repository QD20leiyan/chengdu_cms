<?php ?>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/new.css?<?=VERSION?>">
<div class="yx_cover"></div>
<section class="page_over_hide" id="page_over_hide">
    <header class="cp_header">
        <?php echo $this->render('@app/views/layouts/wap/header.php');?>
        新闻动态
    </header>
    <section id="xw_banner" class="xw_banner_hide">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php foreach ($wapHomeBanner as $b): ?>
                    <div class="swiper-slide"><a href="<?= $b['url'] ? $b['url'] : 'javascript:' ?>"><img src="<?= $b['thumb'] ?>"></a></div>
                <?php endforeach; ?>
            </div>
        </div>
        <section class="xw_banner_icon" id="xw_banner_icon">
            <i class="active"></i>
            <i></i>
            <i></i>
            <i></i>
        </section>
    </section>
    <ul id="xw_c1" class="xw_c1_hide">

    </ul>
    <section id="yx_jz" class="yx_jz">
        <section>
            <p>下拉加载更多....</p>
            <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/cp_img8_03.png?<?=VERSION?>">
        </section>
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </section>
    <?php echo $this->render('@app/views/layouts/wap/footer.php');?>
</section>
<!--这是返回首页浮标-->
<div class="yx_bc_index">
    <p>回到<br/>首页</p>
</div>
<!--这是横屏遮罩层-->
<section class="yx_hp_cover">
    <p>建议竖屏浏览喔~</p>
</section>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/flexible.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/jquery-1.7.1.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_swiper.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/news.js?<?=VERSION?>"></script>