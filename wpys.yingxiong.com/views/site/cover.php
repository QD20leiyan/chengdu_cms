<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title><?php echo $this->seo_title;?></title>
    <meta name="Keywords" content="<?php echo $this->seo_key;?>" >
    <meta name="Description" content="<?php echo $this->seo_des;?>" >
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/common/css/common.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/common/css/swiper.3.1.7.min.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/index.css" />
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/";
        }
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?bce4ef36b7d104da80d9ff2c4dfbbb52";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>

<body>
<div class="main">
    <div class="main_content">
        <img class="wp_logo" src="<?php echo STATIC_DOMAIN ?>1.0/images/logo.png" title="" alt="" />
        <div class="wp_banner"></div>
        <a class="video-w" href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/play_btn.png" title="" alt="" /></a>
        <div class="txt_bg">
            <p>输入手机号码,&nbsp;&nbsp;&nbsp;<span>预约测试资格</span></p>
            <span class="radio on">
                <input class="radio01" type="radio" checked="checked" name="wp" value="ios" />
                <span>iOS预约</span>
            </span>

            <span class="radio">
                <input class="radio01" type="radio" name="wp" value="android"/>
                <span>安卓预约</span>
            </span>

            <form action="" class="tel_bg">
                <input type="tel" class="tel_p" id="phone" placeholder="输入手机号码" />
                <i class="btn tel_btn">立即预约</i>
            </form>
        </div>
        <div class="tck">
            <a target="_blank" href="http://weibo.com/u/5828593704">
                <img src="<?php echo STATIC_DOMAIN ?>1.0/images/weibo.png" title="" alt="" />
            </a>
            <a class="weixin" href="javascript:;">
                <img src="<?php echo STATIC_DOMAIN ?>1.0/images/weixin.png" title="" alt="" />
            </a>
            <a target="_blank" href="http://tieba.baidu.com/f?ie=utf-8&kw=王牌御史手游&fr=search">
                <img src="<?php echo STATIC_DOMAIN ?>1.0/images/baidu.png" title="" alt="" />
            </a>
            <img class="erweima" src="<?php echo STATIC_DOMAIN ?>1.0/images/erweima.png" title="" alt="" />
        </div>
        <div class="main_banner">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/images/banner01.png" title="" alt="" />
                </div>
                <div class="swiper-slide" id="banner_second">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/images/banner02.png" title="" alt="" />
                </div>
                <div class="swiper-slide" id="banner_third">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/images/banner03.png" title="" alt="" />
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="renwu">
            <img src="<?php echo STATIC_DOMAIN ?>1.0/images/renwu.png" title="" alt="" />
        </div>

        <div class="banner_ng">
            <div class="banner_vg">
                <div class="swiper-wrapper boder_bg">
                    <?php foreach ($cover_banner as $k => $v) { ?>
                        <div class="swiper-slide">
                            <a href="<?php echo $v['link_url'] ?>">
                                <img src="<?php echo $v['image_url'] ?>" title="" alt="" />
                            </a>
                        </div>
                    <?php } ?>
                </div>
            </div>
            <div class="swiper-button-last"></div>
            <div class="swiper-button-xia"></div>
        </div>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <!--视频播放-->
    <div id="video_mask" class="video_mask">
        <div class="w man10 both OF none"></div>
        <div id="player5">
            <div id="close" class="close"></div>
            <div class="videos">
                <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="uu=58546ec681&vu=1af4324e32&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>
            </div>
        </div>
    </div>
    <!--通用底部-->
    <div class="i-footer">
        <div class="i-fotcon">
            <div class="i-fot-logo">
                <img src="<?php echo STATIC_DOMAIN ?>1.0/common/images/i-fot-logo.png" alt="">
            </div>
            <div class="i-fot-text">
                <p>文网游备字〔2016〕Ｍ-CSG 0339 号</p>
                <p>版权所有：北京卓越晨星科技有限公司 联系方式：010-50948585</p>
                <p>COPYRIGHT©2015 – 2017 . ALL RIGHTS RESERVED. 京ICP备15026730号-2</p>
                <p>
                    <!--<a href="#"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/www-ico.png" alt=""></a>-->
                    <!--<a href="#"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/game-ico.png" alt=""></a>-->
                    <a href="javascript:;">《网络文化经营许可证》</a>
                    <a target="_blank" href="javascript:;">京网文[2015]0629-259号</a>
                </p>
            </div>
        </div>
    </div>
</div>

<div class="mask"></div>
<div class="tck_yue">
    <a href="javascript:" class="close"></a>
    <img class="fl" src="<?php echo STATIC_DOMAIN ?>1.0/common/images/ewm_gzh.jpg" alt="ewm">
    <div class="text fr">
        <p>恭喜预约成功！</p>
        <p>更多详情尽请关注《全民御使》手游官方微信公众号！</p>
        <p>有机会优先获得测试资格哦！</p>
    </div>
</div>
</body>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/common/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/common/js/swiper.3.1.7.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/js/index.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/js/js.js"></script>
</html>