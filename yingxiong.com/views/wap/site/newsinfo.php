<?php ?>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/new_inf.css?<?=VERSION?>">
<section class="page_over_hide">
    <header class="cp_header">
        <?php echo $this->render('@app/views/layouts/wap/header.php');?>
        新闻动态
    </header>
    <section class="ni_title">
        <h1><?php echo $model->title; ?></h1>
        <p><?php echo date('Y/m/d', $model->created_at); ?></p>
         <p>来源：
            <?php
             if ($model->sub_title) {echo $model->sub_title;} else {echo "pr";}
            ?>
        </p>
    </section>
    <section class="ni_con1">
        <?php echo $content; ?>
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
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/new_inf.js?<?=VERSION?>"></script>

