<?php

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>周年616，弹射666</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no">
    <link href="<?php use yii\helpers\Url;

    echo STATIC_DOMAIN?>h5/1.0/css/public.css?<?= VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/index.css?<?= VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/animate.min.css?<?= VERSION?>" rel="stylesheet" />
    <link href="<?php echo STATIC_DOMAIN?>h5/1.0/css/swiper.min.css?<?= VERSION?>" rel="stylesheet" />
</head>
<body>
<section>
</section>
<div class="wrap">
    <section class="swiper-container">
        <section class="swiper-wrapper">
            <section class="swiper-slide page2">
                <article class="img6">
                    <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/img6.png" class="ani" swiper-animate-effect="fadeInRightBig" />
                </article>
                <article class="art">
                    <p class="title ani" swiper-animate-effect="lightSpeedIn"><?php echo date('Y年m月d日', $data['createTime']/1000)?></p>
                    <p class="ani" swiper-animate-effect="fadeInLeftBig">我成为光荣的岛民</p>
                    <p class="ani" swiper-animate-effect="fadeInLeftBig">我已在弹岛愉快的生活了<mark><?php echo $data['day']?></mark>天</p>
                </article>
                <article class="art01 ani" swiper-animate-effect="zoomInRight">
                    <label>0</label>
                    <label><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/rig.png" /></label>
                    <label class="counter"><?php echo $data['fight']?></label>
                </article>
                <article class="art03 ani" swiper-animate-effect="slideInUp">
                    <p>
                        从呆鸟到弹王，战斗指数从<mark>0</mark>到 <mark class="counter" data-to="999,542" data-speed="1500"><?php echo $data['fight']?></mark><br/>我的梦想从未停止！
                    <p>
                </article>
                <aside class="down"></aside>
            </section>
            <section class="swiper-slide page3">
                <article class="art art-3">
                    <p class="ani" swiper-animate-effect="fadeInLeftBig">在这一年里，我经历了<mark class="counter"><?php echo $data['battlePalyNum']?></mark>场战斗;</p>
                    <p class="ani" swiper-animate-effect="fadeInLeftBig">获得<mark><?php echo $data['battleWinNum']?></mark>胜,<mark><?php echo $data['battlePalyNum']-$data['battleWinNum']?></mark>败</p>
                    <p class="title ani" swiper-animate-effect="lightSpeedIn">胜率：<?php echo $data['rate']?>%</p>
                </article>
                <article class="art03 ani art-3-1" swiper-animate-effect="slideInUp">
                    <p>失败不可怕，关键看是不是成功他妈<p>
                </article>
                <aside class="down"></aside>
            </section>
            <section class="swiper-slide page4">
                <article class="art art-3">
                    <p class="title ani" swiper-animate-effect="lightSpeedIn">最亲密弹友</p>
                </article>
                <article>
                    <aside class="level clear ani" swiper-animate-effect="slideInRight" swiper-animate-delay="0s">
                        <div class="lef"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/one.png" /><b><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/love.png"></b></div>
                        <div class="rig clear">
                            <i><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/toc1.jpg?<?= VERSION?>"></i>
                            <span><?php echo $data['friend'][0]['name']?></span>
                            <span>亲密度：<label><?php echo $data['friend'][0]['num']?></label></span>
                        </div>
                    </aside>
                    <aside class="level clear ani" swiper-animate-effect="slideInRight" swiper-animate-delay="0.3s">
                        <div class="lef lef-1"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/two.png" /></div>
                        <div class="rig clear">
                            <i><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/toc2.jpg?<?= VERSION?>"></i>
                            <span><?php echo $data['friend'][1]['name']?></span>
                            <span>亲密度：<label><?php echo $data['friend'][1]['num']?></label></span>
                        </div>
                    </aside>
                    <aside class="level clear ani" swiper-animate-effect="slideInRight" swiper-animate-delay="0.5s">
                        <div class="lef lef-2"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/three.png" /></div>
                        <div class="rig clear">
                            <i><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/toc3.jpg?<?= VERSION?>"></i>
                            <span><?php echo $data['friend'][2]['name']?></span>
                            <span>亲密度：<label><?php echo $data['friend'][2]['num']?></label></span>
                        </div>
                    </aside>
                </article>
                <article class="art03 ani" swiper-animate-effect="slideInUp">
                    <p>爱情易推，友情难倒！<br/>蓦然回首，最佳好友你别走！<p>
                </article>
                <aside class="down"></aside>
            </section>
            <?php if ($data['marry'] == 1) {?>
                <section class="swiper-slide page5">
                    <article class="art art-3">
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/love.png"  class="tit-love"/>
                        <p class="title ani" swiper-animate-effect="lightSpeedIn"><?php if ($data['sex'] == 0) {echo "老婆";} else {echo "老公";}  ?></p>
                    </article>
                    <article class="marry ani" swiper-animate-effect="fadeInLeftBig">
                        <span class="sp"><?php echo $data['man']?></span>
                        <span class="sp"><?php echo $data['girl']?></span>
                        <span class="sp1"><?php echo $data['loveName']?></span>
                        <span class="sp1" style="left: 14.11875rem;"><?php echo $data['loveNum']?></span>
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/marry_01.png">
                    </article>
                    <article class="art03 ani a" swiper-animate-effect="slideInUp">
                        <p><span style="color:#fff"><?php echo date('Y年m月d日', $data['createTime']/1000)?></span>我们超越了一弹的距离<br/>成为<mark><?php echo $data['loveName']?></mark>！<p>
                    </article>
                    <aside class="down"></aside>
                </section>
            <?php } else if ($data['sex'] == 1) { ?>
                <section class="swiper-slide page5">
                    <article class="art art-3">
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/love.png"  class="tit-love"/>
                        <p class="title ani" swiper-animate-effect="lightSpeedIn">单身狗的芬芳</p>
                    </article>
                    <article class="ani" swiper-animate-effect="fadeInLeftBig">
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/img1.png" class="dog" />
                    </article>
                    <article class="art03 ani ar" swiper-animate-effect="slideInUp">
                        <p>帅哥靓妹如此多娇，<br/>我却只能狂吃狗粮，人艰不拆！<p>
                    </article>
                    <aside class="down"></aside>
                </section>
            <?php } else { ?>
                <section class="swiper-slide page5">
                    <article class="art art-3">
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/love.png"  class="tit-love"/>
                        <p class="title ani" swiper-animate-effect="lightSpeedIn">单身狗的芬芳</p>
                    </article>
                    <article class="ani" swiper-animate-effect="fadeInLeftBig">
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/img2.png" class="dog1" />
                    </article>
                    <article class="art03 ani ar" swiper-animate-effect="slideInUp">
                        <p>帅哥靓妹如此多娇，<br/>我却只能狂吃狗粮，人艰不拆！<p>
                    </article>
                    <aside class="down"></aside>
                </section>
            <?php } ?>
            <section class="swiper-slide page5">
                <article class="art art-3 show">
                    <p class="title ani" swiper-animate-effect="lightSpeedIn">时装Show</p>
                    <p class="ani" swiper-animate-effect="lightSpeedIn">我在游戏内收集了<mark><?php echo $data['fashionNum']?></mark>件时装</p>
                </article>
                <article class="ani" swiper-animate-effect="fadeInLeftBig">
                    <?php if ($data['sex'] == 0) {?>
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/img3.png" class="img1"/>
                    <?php } else {?>
                        <img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/img4.png" class="img2"/>
                    <?php }?>
                </article>
                <article class="art03 ani ar" swiper-animate-effect="slideInUp">
                    <p style="margin-top: 1.3125rem;">成为弹岛<mark><?php if ($data['fashionNum'] > 15) { echo "时尚王者";}
                    else if ($data['fashionNum'] > 5) {echo "潮流达人";}
                    else {echo "个性青年";}
                    ?>！</mark><p>
                </article>
                <aside class="down"></aside>
            </section>
            <section class="swiper-slide page6">
                <aside class="logo ani" swiper-animate-effect="fadeInDown"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/logo.png"></aside>
                <article class="button">
                    <a href="javascript:" class="share"><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/share.png"  class="ani" swiper-animate-effect="fadeInLeft"></a>
                    <a class="js_wap_down" href=""><img src="<?php echo STATIC_DOMAIN?>h5/1.0/images/download.png" class="ani" swiper-animate-effect="fadeInRight"></a>
                    <p class="ani" swiper-animate-effect="slideInUp"><a href="<?php echo Url::to(['wap/site/index'])?>">进入官网了解更多</a></p>
                </article>
            </section>
        </section>
    </section>
</div>
<div class="share-bg"></div>
<div id="orientLayer" class="mod-orient-layer">
    <div class="mod-orient-layer__content"> <i class="icon mod-orient-layer__icon-orient"></i>
        <div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>
    </div>
</div>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/jquery-1.7.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/jquery+fittext+touchslider.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/swiper.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/swiper.animate.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>h5/1.0/js/jquery.waypoints.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>h5/1.0/js/jquery.countup.min.js?<?= VERSION?>"></script>
<script>
    $('.counter').countUp();
    var mySwiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        pagination: '.swiper-pagination',
        mousewheelControl : true,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper);
        },
        onTransitionEnd: function(swiper){
            swiperAnimate(swiper);
        }
    });
    $(".share").click(function(){
        $(".share-bg").show();
    })
    $(".share-bg").click(function(){
        $(".share-bg").hide();
    })
    $(function(){
        $('.js_wap_down').click(function(){
            $.get('<?php echo Url::to(['wap/h5/ajax-download'])?>', '', function(){});
        });
    });
</script>
</body>
</html>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>

<?php echo $this->render('@app/views/wap/h5/fenxiang.php');?>
