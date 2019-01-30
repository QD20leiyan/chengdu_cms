<?php ?>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/cp_center.css?<?=VERSION?>">
<section class="page_over_hide" id="page_over_hide">
    <header class="cp_header">
        <?php echo $this->render('@app/views/layouts/wap/header.php');?>
        产品中心
    </header>

    <section class="cp_content_hide" id="cp_content">
        <section class="cp_nav" id="cp_nav">
            <ul>
                <li class="active" name="active">所有产品</li>
                <li>热门游戏</li>
                <li>最新游戏</li>
                <li>测试游戏</li>
                <img id="cp_nav_icon" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/cp_img3_11.png?<?=VERSION?>">
            </ul>
        </section>

        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <ul id="cp_all_game" class="cp_all_game"></ul>
                </div>
                <div class="swiper-slide">
                    <ul class="cp_hot_game"></ul>
                </div>
                <div class="swiper-slide">
                    <ul class="cp_new_game"></ul>
                </div>
                <div class="swiper-slide">
                    <ul class="cp_cs_game"></ul>
                </div>
            </div>
        </div>

        <section class="yx_jz">
            <section>
                <p id="cp_ja_text">下拉加载更多....</p>
                <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/cp_img8_03.png?<?=VERSION?>">
            </section>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </section>
    </section>
    <?php echo $this->render('@app/views/layouts/wap/footer.php');?>
</section>
<!--这是返回首页浮标-->
<div class="yx_bc_index">
    <p>回到<br/>首页</p>
</div>
<!--这是加载遮罩层-->
<div class="yx_cover"></div>
<!--这是横屏遮罩层-->
<section class="yx_hp_cover">
    <p>建议竖屏浏览喔~</p>
</section>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/flexible.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/jquery-1.7.1.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_swiper.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/cp_center.js?<?=VERSION?>"></script>