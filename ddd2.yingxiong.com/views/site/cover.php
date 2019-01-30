
<link href="<?php use yii\helpers\Url;

echo STATIC_DOMAIN ?>3.0/css/style.css?<?= VERSION?>" rel="stylesheet">
<section class="cover">
    <div class="cove">
        <img src="<?php echo STATIC_DOMAIN ?>3.0/images/img1.png?<?= VERSION?>" class="img1" />
        <img src="<?php echo STATIC_DOMAIN ?>3.0/images/img2.png?<?= VERSION?>" class="img2" />
        <article class="art">
            <img src="<?php echo STATIC_DOMAIN ?>3.0/images/ddd_logo.png?<?= VERSION?>" />
            <i class="js_video_play" data-url="uu=58546ec681&vu=d36a4ff707"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/play.png?<?= VERSION?>" /><img src="<?php echo STATIC_DOMAIN ?>3.0/images/play1.png?<?= VERSION?>" /></i>
            <article class="art-block clearfix">
                <span><img src="http://gamerimage.yingxiong.com/qrcode/jump2_ddd2_pcgw.png" class=""/></span>
                <span>
<!--                    <a href="#" target="_blank" class="js_down_ios"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/ios_down1.png?<?= VERSION?>"></a>-->
                    <a href="#" target="_blank" class="js_down_andriod stat_cover_android"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/az_down1.png?<?= VERSION?>"></a>
                    <a href="http://l.taptap.com/EGoDqaq5" target="_blank" class="stat_cover_tap"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/tap_img2.png?<?= VERSION?>"></a>
                </span>
            </article>
            <aside class="link-a">
                <a href="<?php echo Url::to(['site/index']) ?>"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/link_btn.png?<?= VERSION?>" /></a>
                <span><a target="_blank" href="<?= !empty($global['wb_url'])?$global['wb_url']:"javascript:yx_showTips('敬请期待');"?>"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/weibo.png?<?= VERSION?>" /></a></span>
                <span><a href="javascript:;" class="weixin"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/weixin.png?<?= VERSION?>" /></a></span>
                <span><a target="_blank" href="<?= $global['tb_url']?>"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/baidu.png?<?= VERSION?>" /></a></span>
                <div class="ewm">
                    <div class="ewm_bg"><img src="<?= $global['wx_img']?>" alt=""></div>
                </div>
            </aside>
        </article>
<!--    <div class="cov">-->
<!--        <div class="cov-1">-->
<!--            <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/img1.png?<?= VERSION?>" class="img1" />-->
<!--            <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/img2.png?<?= VERSION?>" class="img2" />-->
<!--        </div>-->
<!--    </div>-->
    </div>
</section>


<!--<div id="video_mask" class="video_mask" style="display: none;">-->
<!--    <div class="w man10 both OF none"></div>-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos">-->
<!--            <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="uu=58546ec681&vu=d36a4ff707&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js?{$smarty.const.VERSION}"></script>
<script>
    $(function(){
        pc_cover();
    })
</script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/js/index.js?<?= VERSION?>"></script>

