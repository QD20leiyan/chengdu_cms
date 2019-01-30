<section id="nav_back">
    <a href="javascript:"><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/cp_img1_03.png?<?=VERSION?>"></a>
</section>
<section id="nav_icon" class="nav_icon" name="0">
    <?php if (in_array(Yii::$app->controller->action->id, ['about', 'into'])): ?>
        <img class="nav_icon" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img2_06.png?<?=VERSION?>">
        <img class="close nav_hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/yx_close1_03.png?<?=VERSION?>">
    <?php else: ?>
        <img class="nav_icon" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/cp_img2_03.png?<?=VERSION?>">
        <img class="close nav_hide" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/yx_close1_03.png?<?=VERSION?>">
    <?php endif; ?>
</section>
<ul id="page_nav" class="page_nav">
    <?php echo $this->render('@app/views/layouts/wap/navheader.php');?>
</ul>