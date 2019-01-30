<?php

use common\Cms;
use yii\widgets\LinkPager;




?>
<link href="<?php use yii\helpers\Url;

echo STATIC_DOMAIN ?>3.0/css/style.css?<?= VERSION?>" rel="stylesheet">
<link href="<?php echo STATIC_DOMAIN ?>3.0/common/css/swiper.3.1.7.min.css?<?= VERSION?>" rel="stylesheet">
<div class="bg">
    <!--导航-->
    <?php echo $this->render('@app/views/layouts/pc/nav.php', ['global' => $global]); ?>
    
    <section>
        <article class="art art-1 cont">
            <img src="<?php echo STATIC_DOMAIN ?>3.0/images/ddd_logo_1.png" />
            <span class="imgs"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/img1s.png" /></span>
        </article>
    </section>
    <div class="sec">
        <section class="clearfix">
            <article class="news-list-lef">
                <nav class="titles">
                    <h3>视频中心<span><a href="<?php echo Url::to(['site/index']) ?>">首页 &gt;</a>  视频中心</span></h3>
                    <ul class="menu clearfix">
                        <li <?php if ($cid == 40) {echo 'class="active"';} ?> ><a href="<?php echo Url::to(['video/list','cid' => 40]) ?>">全部视频</a></li>
                    </ul>
                    <div class="content video-cont">
                        <ul class="content-list show vi-list clearfix">
                            <?php foreach ($data as $v) { ?>
                            <li>
                                <img src="<?php echo $v['thumb'] ?>">
                                <i class="i_play js_video_play" data-url="<?php echo $v['contentMessage'] ?>"></i>
                                <p><?php echo $v['title'] ?></p>
                            </li>
                            <?php } ?>
                        </ul>
<!--                        <ul class="content-list hide">-->
<!--                            2-->
<!--                        </ul>-->
<!--                        <ul class="content-list hide">-->
<!--                            3-->
<!--                        </ul>-->
<!--                        <ul class="content-list hide">-->
<!--                            4-->
<!--                        </ul>-->
<!--                        <ul class="content-list hide">-->
<!--                            5-->
<!--                        </ul>-->

                        <?php
                        echo LinkPager::widget([
                            'pagination' => $page,
                            'hideOnSinglePage' => false,
                            'firstPageLabel' => '首页',
                            'lastPageLabel' => '尾页',
                            'options' => ['class' => 'page'],
                            'nextPageLabel' => '下一页',
                            'prevPageLabel' => '上一页',
                            'maxButtonCount' => 7
                        ]);
                        ?>
                    </div>
                </nav>
            </article>
            <article class="news-list-rig">
                <aside class="erweima">
                    <img src="<?php echo STATIC_DOMAIN ?>3.0/images/erweima4.png" />
                    <i></i>
<!--                    <a class="js_down_ios" target="_blank" href="javascript:;"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/ios1.png"></a>-->
                    <a class="js_down_andriod" target="_blank" href="#javascript:;"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/android.png"></a>
                </aside>
                <aside class="pl-img">
                    <?php foreach ($activity as $v ) { ?>
                        <a href="<?php echo $v['url'] ?>"><img src="<?php echo $v['thumb'] ?>" /></a>
                    <?php } ?>
                </aside>
            </article>
        </section>
    </div>
</div>
<div class="i-main5">
    <div class="i-m5">
        <ul>
            <li>
                <div class="i-m5-ico">
                    <img class="jump_img" src="<?php echo STATIC_DOMAIN ?>3.0/images/erweima2.png" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>下载游戏</h3>
                    <p>扫描二维码，立即下载游戏</p>
                    <span>新竞技，更休闲</span>
                </div>
            </li>
            <li>
                <div class="i-m5-ico">
                    <img src="<?php echo STATIC_DOMAIN ?>3.0/images/erweima3.png" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>微信公众号</h3>
                    <p>扫描二维码，关注官方微信</p>
                    官方微信号：<span>弹弹岛2</span>
                </div>
            </li>
            <li>
                <div class="i-m5-ico">
                    <img src="<?php echo STATIC_DOMAIN ?>3.0/images/i_kefu.png" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>客户服务</h3>
                    <p>BUG反馈，游戏问题</p>
                    客户服务电话：<span>400-939-3333</span>
                </div>
            </li>
        </ul>
    </div>
</div>

<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/js/index.js?<?= VERSION?>"></script>

<script>
    $(function(){
        var nowPage = '<?php echo $nowPage;?>';
        var totalPage = '<?php echo $page->getPageCount();?>';
        if (totalPage > 1 && totalPage == nowPage) {
            $('.page .next').remove();
        }
        if (totalPage > 1 && nowPage == 1) {
            $('.page .prev').remove();
        }

        if (totalPage == 1) {
            $('.page .next').remove();
            $('.page .prev').remove();
        }
    })
</script>
