<?php ?>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/about_hero.css?<?=VERSION?>">
<header class="cp_header">
    <?php echo $this->render('@app/views/layouts/wap/header.php');?>
    <img class="logo" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img1_03.png?<?=VERSION?>">
</header>
<div id="ab_content">
    <div class="yx_cover"></div>
    <div class="section s1">
        <section id="s1_content">
            <img class="hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img3_03.png?<?=VERSION?>">
            <?php echo $gsjj[3]['content_message'] ?>
        </section>
        <img class="page_next_icon" name="1" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img7_06.png?<?=VERSION?>">
    </div>
    <?php foreach ($gsfz as $k => $v): ?>  
        <div class="section s_content">
            <section>
                <div class="hide">
                    <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img8_03.png?<?=VERSION?>">
                    <ul>
                        <?php foreach ($years as $key => $y): ?>
                            <li class="<?= $k == $y ? 'active' : '' ?>" name="<?= $key + 2 ?>"><?= $y ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="hide">
                    <?php foreach ($v as $c): ?>
                        <div>
                            <h1><?= $c['time'] ?></h1>
                            <p><?= $c['content'] ?></p>
                            <i></i>
                        </div>
                    <?php endforeach; ?>
                    <section class="ab_line"></section>
                </div>
            </section>
            <img class="page_next_icon" name="2" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img7_06.png?<?=VERSION?>">
        </div>
    <?php endforeach; ?>
    <div class="section s_work1" id="s_work1">
        <img class="hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img9_03.png?<?=VERSION?>">
        <img class="hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img10_07.png?<?=VERSION?>">
        <img class="page_next_icon" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img7_06.png?<?=VERSION?>">
    </div>
    <div class="section s_work2" id="s_work2">
        <img class="hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img11_06.png?<?=VERSION?>">
        <img class="hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img12_15.png?<?=VERSION?>">
        <img class="page_next_icon" src="<?php echo STATIC_DOMAIN; ?>wap1.0//images/ab_img7_up.png?<?=VERSION?>">
    </div>
</div>
<?php echo $this->render('@app/views/layouts/wap/footer.php');?>
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
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx.fullPage.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/about_hero.js?<?=VERSION?>"></script>
<script>
    $(function(){
        $("#s1_content>p span").css({"font":"inherit"});
    });
</script>
