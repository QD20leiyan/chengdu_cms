
<link href="<?php use common\Cms;
use yii\helpers\Url;

echo STATIC_DOMAIN ?>3.0/css/style.css?<?= VERSION?>" rel="stylesheet">
<link href="<?php echo STATIC_DOMAIN ?>3.0/common/css/swiper.3.1.7.min.css?<?= VERSION?>" rel="stylesheet">

<div class="bg">
    <!--导航-->
    <?php echo $this->render('@app/views/layouts/pc/nav.php',['global'=>$global]); ?>

    <section>
        <article class="art art-1 cont">
            <img src="<?php echo STATIC_DOMAIN ?>3.0/images/ddd_logo_1.png?<?= VERSION?>" />
            <span class="imgs"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/img1s.png?<?= VERSION?>" /></span>
            <i class="js_video_play" data-url="uu=58546ec681&vu=d36a4ff707"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/play.png" /><img src="<?php echo STATIC_DOMAIN ?>3.0/images/play1.png" /></i>
        </article>
    </section>
    <div class="sec">
        <section class="clearfix">
            <article class="art-banner swiper-container">
                <div class="swiper-wrapper">
                    <?php foreach ($banner as $v) { ?>
                        <div class="swiper-slide"><a target="_blank" href="<?php echo $v['url']; ?>"> <img src="<?php echo $v['thumb'] ?>" /></a></div>
                    <?php } ?>
                </div>
                <div class="swiper-button-prev swiper-button-white"></div>
                <div class="swiper-button-next swiper-button-white"></div>
                <div class="swiper-pagination" style="bottom:42px !important"></div>
            </article>
            <article class="art-news">
                <ul class="news-nav clearfix">
                    <li class="curr">最新</li>
                    <li>资讯</li>
                    <li>公告</li>
                    <li>活动</li>
                    <li>攻略</li>
                    <div class="text_tab_more">
                        <a href="<?php echo Cms::getUrl('article/list',array('cid'=>1,'cat_dir'=>'info'))?>" class="more" target="_blank"></a>
                        <a href="<?php echo Cms::getUrl('article/list',array('cid'=>1,'cat_dir'=>'info'))?>" class="more-h" target="_blank"></a>
                    </div>
                </ul>
                <div class="news-cont show">
                    <p class="title">
                        <a target="_blank" style="color: #333333" href="<?php $id = $zuixin[0]->old_id ? $zuixin[0]->old_id : $zuixin[0]->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$zuixin[0]->created_at,'cat_dir'=>$zuixin[0]->category->url_alias,"#"=>"detail"));?>">
                            <?php echo $zuixin[0]['title'] ?>
                        </a>
                    </p>

                    <div class="brief"><?php echo mb_substr(strip_tags($zuixin[0]->contentMessage), 0, 60, 'utf-8')."..." ?></div>
                    <ul class="news-list">
                        <?php foreach ($zuixin as $k => $v) { ?>
                            <?php if ($k == 0) {continue;} ?>
                            <li><a target="_blank" href="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>"><?php echo $v['title'] ?></a><span>[<?php echo date('m/d', $v['created_at']) ?>]</span></li>
                        <?php } ?>
                    </ul>
                </div>
                <div class="news-cont hide">
                    <p class="title">
                        <a target="_blank" style="color: #333333" href="<?php $id = $xinwen[0]->old_id ? $xinwen[0]->old_id : $xinwen[0]->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$xinwen[0]->created_at,'cat_dir'=>$xinwen[0]->category->url_alias,"#"=>"detail"));?>">
                            <?php echo $xinwen[0]['title'] ?>
                        </a>
                    </p>
                    <div class="brief"><?php echo mb_substr(strip_tags($xinwen[0]->contentMessage), 0, 110, 'utf-8')."..." ?></div>
                    <ul class="news-list">
                        <?php foreach ($xinwen as $k => $v) { ?>
                            <?php if ($k == 0) {continue;} ?>
                            <li><a target="_blank" href="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>"><?php echo $v['title'] ?></a><span>[<?php echo date('m/d', $v['created_at']) ?>]</span></li>
                        <?php } ?>
                    </ul>
                </div>
                <div class="news-cont hide">
                    <p class="title">
                        <a target="_blank" style="color: #333333" href="<?php $id = $gonggao[0]->old_id ? $gonggao[0]->old_id : $gonggao[0]->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$gonggao[0]->created_at,'cat_dir'=>$gonggao[0]->category->url_alias,"#"=>"detail"));?>">
                            <?php echo $gonggao[0]['title'] ?>
                        </a>
                    </p>
                    <div class="brief"><?php echo mb_substr(strip_tags($gonggao[0]->contentMessage), 0, 110, 'utf-8')."..." ?></div>
                    <ul class="news-list">
                        <?php foreach ($gonggao as $k => $v) { ?>
                            <?php if ($k == 0) {continue;} ?>
                            <li><a target="_blank" href="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>"><?php echo $v['title'] ?></a><span>[<?php echo date('m/d', $v['created_at']) ?>]</span></li>
                        <?php } ?>
                    </ul>
                </div>
                <div class="news-cont hide">
                    <p class="title">
                        <a target="_blank" style="color: #333333" href="<?php $id = $huodong[0]->old_id ? $huodong[0]->old_id : $huodong[0]->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$huodong[0]->created_at,'cat_dir'=>$huodong[0]->category->url_alias,"#"=>"detail"));?>">
                            <?php echo $huodong[0]['title'] ?>
                        </a>
                    </p>
                    <div class="brief"><?php echo mb_substr(strip_tags($huodong[0]->contentMessage), 0, 110, 'utf-8')."..." ?></div>
                    <ul class="news-list">
                        <?php foreach ($huodong as $k => $v) { ?>
                            <?php if ($k == 0) {continue;} ?>
                            <li><a target="_blank" href="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>"><?php echo $v['title'] ?></a><span>[<?php echo date('m/d', $v['created_at']) ?>]</span></li>
                        <?php } ?>
                    </ul>
                </div>
                <div class="news-cont hide">
                    <p class="title">
                        <a target="_blank" style="color: #333333" href="<?php $id = $gonglue[0]->old_id ? $gonglue[0]->old_id : $gonglue[0]->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$gonglue[0]->created_at,'cat_dir'=>$gonglue[0]->category->url_alias,"#"=>"detail"));?>">
                            <?php echo $gonglue[0]['title'] ?>
                        </a>
                    </p>
                    <div class="brief"><?php echo mb_substr(strip_tags($gonglue[0]->contentMessage), 0, 110, 'utf-8')."..." ?></div>
                    <ul class="news-list">
                        <?php foreach ($gonglue as $k => $v) { ?>
                            <?php if ($k == 0) {continue;} ?>
                            <li><a target="_blank" href="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('article/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>"><?php echo $v['title'] ?></a><span>[<?php echo date('m/d', $v['created_at']) ?>]</span></li>
                        <?php } ?>
                    </ul>
                </div>
            </article>

        </section>
        <section>
            <div class="activity cont">
                <hgroup class="tit"><span>热门活动</span><span>/&nbsp;&nbsp;ACTIVITY</span>
<!--                    <div class="text_tab_more">-->
<!--                        <a href="" class="more" target="_blank"></a>-->
<!--                        <a href="" class="more-h" target="_blank"></a>-->
<!--                    </div>-->
                </hgroup>
                <ul class="clearfix activity-li">
                    <?php foreach ($activity as $v ) { ?>
                        <li><a target="_blank" href="<?php echo $v['url'] ?>"><img src="<?php echo $v['thumb'] ?>" /></a></li>
                    <?php } ?>
                </ul>
            </div>
        </section>
        <section class="sec1">
            <div class="cont">
                <hgroup class="tit game"><span>游戏特色</span><span>/&nbsp;&nbsp;Game features</span>
                </hgroup>
                <article class="game-banner swiper-container">
                    <div class="swiper-wrapper">
                        <?php foreach ($gameTese as $v) { ?>
                            <div class="swiper-slide"><img src="<?php echo $v['thumb'] ?>" /></div>
                        <?php } ?>
                    </div>
                    <div class="swiper-pagination" style="bottom:14px;!important"></div>
                </article>
            </div>
        </section>
        <section class="sec1">
            <div class="cont">
                <hgroup class="tit video"><span>视频专区</span><span>/&nbsp;&nbsp;Video Zone</span>
                    <div class="text_tab_more">
                        <a target="_blank" href="<?php echo Url::to(['video/list']) ?>" class="more" target="_blank"></a>
                        <a target="_blank" href="<?php echo Url::to(['video/list']) ?>" class="more-h" target="_blank"></a>
                    </div>
                </hgroup>
                <article>
                    <ul class="video-list clearfix">
                        <?php foreach ($gameVideo as $v) { ?>
                            <li>
                                <img src="<?php echo $v['thumb'] ?>" />
                                <i class="js_video_play" data-url="<?php echo $v->contentMessage ?>"></i>
                                <p><?php echo $v['title'];?></p>
                            </li>
                        <?php } ?>
                    </ul>
                </article>

            </div>
        </section>
    </div>
</div>
<div class="i-main5">
    <div class="i-m5">
        <ul>
            <li>
                <div class="i-m5-ico">
                    <img class="jump_img" src="<?php echo STATIC_DOMAIN ?>3.0/images/erweima2.png?<?= VERSION?>" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>下载游戏</h3>
                    <p>扫描二维码，立即下载游戏</p>
                    <span>新竞技，更休闲</span>
                </div>
            </li>
            <li>
                <div class="i-m5-ico">
                    <img src="<?= $global['wx_img']?>" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>微信公众号</h3>
                    <p>扫描二维码，关注官方微信</p>
                    官方微信号：<span>弹弹岛2</span>
                </div>
            </li>
            <li>
                <div class="i-m5-ico">
                    <img src="<?php echo STATIC_DOMAIN ?>3.0/images/i_kefu.png?<?= VERSION?>" alt="">
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
<!--<div id="video_mask" class="video_mask" style="display: none;">-->
<!--    <div class="w man10 both OF none"></div>-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos">-->
<!--            <embed width="696" height="358" allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash" src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/player.swf" pluginspage="http://www.adobe.com/go/getflashplayer" flashvars="vcastr_file=http://ca.yingxiong.com/wap/themes/wap312/images/video.mp4&amp;IsAutoPlay=0&amp;width=570&amp;height=300&amp;DefaultVolume=100">-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--<input type='checkbox' >-->
<aside class="float">
    <img class="ufo" src="<?php echo STATIC_DOMAIN ?>3.0/images/ufo.png?<?= VERSION?>" >
    <img class="f_mark" src="http://gamerimage.yingxiong.com/qrcode/jump2_ddd2_pcgw.png">
    <span class="close"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/close.png?<?= VERSION?>"></span>
<!--    <a class="js_down_ios" target="_blank"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/ios_1.png" /></a>-->
    <a class="js_down_andriod stat_android" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/and_1.png?<?= VERSION?>" /></a>
    <a href="http://l.taptap.com/EGoDqaq5" target="_blank" class="stat_tap"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/tap_img.png?<?= VERSION?>"></a>
    <a href="https://www.jiyoushe.cn/game/gamePlay.html?gid=280020" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/sw_img.png?<?= VERSION?>"></a>
</aside>
<aside>
    <span class="open"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/open.png?<?= VERSION?>" /></span>
</aside>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js?{$smarty.const.VERSION}"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/js/index.js?<?= VERSION?>"></script>
