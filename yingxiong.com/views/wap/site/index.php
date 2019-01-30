<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/index.css?<?=VERSION?>">
<section class="page_over_hide" id="page_over_hide">

    <section class="i_nav_hide" id="i_nav">
        <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/i_logo_03.png?<?=VERSION?>">
        <section id="i_nav_icon">
            <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/i_nav_icon_06.png?<?=VERSION?>">
        </section>
    </section>
    <section id="i_banner" class="i_banner">
        <section class="i_banner_icon" id="i_banner_icon">
            <i class="active"></i>
            <i></i>
            <i></i>
            <i></i>
        </section>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php foreach ($wapHomeBanner as $b): ?>
                    <div class = "swiper-slide"><a href= "<?= $b->url ? $b->url : 'javascript:' ?>"><img src = "<?= $b->thumb ?>"></a></div>
                <?php endforeach; ?>
            </div>
        </div>
        <section class="i_banner_cover" id="i_banner_cover"></section>
    </section>
    <section class="i_new_hide" id="i_new">
        <section class="title">
            <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/i_new_icon_03.png?<?=VERSION?>">
            <div>
                <span>新闻动态</span>
                <span>News center</span>
            </div>
        </section>
        <section class="i_new_s1">

            <?php foreach ($newtuijian as $nt):?>
                <section>
                    <a href="<?= $nt->url ? $nt->url : 'javascript:' ?>">
                        <img src="<?= $nt->thumb ?>">
                        <p><?= $nt->title ?></p>
                    </a>
                </section>
            <?php endforeach; ?>
        </section>
        <ul class="i_new_list">
            <?php foreach ($news as $new): ?>
                <li><a href="<?= \yii\helpers\Url::to('/m/news')?>/<?= $new['id']?>.html"><p><?= $new['title'] ?></p></a><p><?= date('m/d', $new['created_at']); ?></p></li>
            <?php endforeach; ?>
        </ul>
        <div>
            <a class="i_new_btn page_btn" href="<?= \yii\helpers\Url::to(['/m/news'])?>">查看更多</a>
        </div>
    </section>
    <section class="i_game_hide" id="i_game">
        <section class="title">
            <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/i_game_icon_11.png?<?=VERSION?>">
            <div>
                <span>热门游戏</span>
                <span>Hot game</span>
            </div>
        </section>
        <ul>
            <?php foreach ($hotGame as $key => $g):?>
                <li class="<?= $key % 2 == 1 ? 'i_game_li_right' : '' ?>">
                    <a href="<?= $g['user_name'] ? $g['user_name'] : 'javascript:alert(\'敬请期待\')' ?>">
                        <img src="<?= $g['thumb'] ?>">
                    </a>
                    <section>
                        <h1><?= $g['title']; ?></h1>
                        <p><?= $g['sub_title']; ?></p>
                        <section>
                            <a class="i_game_btn" href="<?= $g['down_url'] ? $g['down_url'] : 'javascript:alert(\'敬请期待\')' ?>">立即下载</a>
                            <a class="i_game_btn" href="<?= $g['user_name'] ? $g['user_name'] : 'javascript:alert(\'敬请期待\')' ?>">进入官网</a>
                        </section>
                    </section>
                </li>
            <?php endforeach; ?>
        </ul>
        <div>
            <a class="i_new_btn page_btn" href="<?= \yii\helpers\Url::to(['/m/product'])?>">查看更多</a>
        </div>
    </section>
    <?php echo $this->render('@app/views/layouts/wap/footer.php');?>
    <section class="i_main_nav">
        <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/i_logo_03.png?<?=VERSION?>">
        <section id="n_close">
            <img class="n_close" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/n_close_03.png?<?=VERSION?>">
        </section>
        <ul>
            <?php echo $this->render('@app/views/layouts/wap/navheader.php');?>
        </ul>
    </section>

</section>
<section class="yx_hp_cover">
    <p>建议竖屏浏览喔~</p>
</section>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_swiper.min.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/js/index.js?<?=VERSION?>"></script>