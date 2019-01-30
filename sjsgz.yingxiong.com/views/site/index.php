<?php

use common\Cms;

?>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
<div class="con" style="height:1774px;">
    <?php echo $this->render('@app/views/layouts/pc/nav.php')?>

    <div class="wrap">
        <div class="peo_box">

            <div class="solgan"></div>
        </div>

        <div class="download">
            <div class="dl_left">
                <label>
                    <input type="text" name="text" placeholder="请输入手机号码下载客户端" />
                    <a class="dl_btn" href="javascript:alert('敬请期待！');"></a>
                </label>
                <div class="dl_an_ios">
                    <a class="dl_and js_down_andriod" href="javascript:"></a>
                    <a class="dl_ios js_down_ios" href="javascript:"></a>
                </div>
                <a href="http://l.taptap.com/hCVRe6H6" target="_blank" class="dl_tap"><img src="<?php echo STATIC_DOMAIN ?>2.0/images/tap.png" alt="" /></a>
            </div>
            <div class="ewm">
                <img class="js_jump_img" src="<?php echo STATIC_DOMAIN ?>2.0/common/images/ewm.jpg" alt="ewm" />
            </div>
            <div class="video">
                <a class="v_01 js_video_play" href="javascript:" data-url="<?php if (!empty($video)) {echo $video[0]['url'];}?>"></a>
                <a class="v_02" href="javascript:" rel="<?php if (!empty($video)) {echo $video[0]['url'];}?>"></a>
            </div>
        </div>
        <div class="m_width main01">
            <div class="m_left">
                <div class="pic-show">
                    <ul>
                        <?php foreach ($banner as $v) {?>
                            <li>
                                <a href="<?php echo $v['url']?>"> <img src="<?php echo $v['thumb']?>" alt="" /></a>
                            </li>
                        <?php }?>
                    </ul>
                </div>
                <div class="pic-num"></div>
            </div>
            <div class="m_right">
                <div class="m_til js_til">
                    <ul>
                        <li>
                            <a href="javascript:void(0)" class="on"><i class="ico01"></i>综合</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="ico02"></i>新闻</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="ico03"></i>公告</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)"><i class="ico04"></i>活动</a>
                        </li>
                    </ul>
                    <a href="<?php echo Cms::getUrl('article/list', ['id' => 69]);?>" class="more">更多>></a>
                </div>
                <div class="clear"></div>
                <div class="m_main">
                    <div class="infor" style="display:block;">
                        <ul>
                            <?php foreach ($zonghe as $v) { ?>
                                <li>
                                    <a href="<?php echo $v['linkUrl'];?>">【综合】<?php echo $v['title']?></a>
                                    <em><?php echo date('Y-m-d', $v['created_at'])?></em>
                                </li>
                            <?php }?>
                        </ul>
                    </div>
                    <div class="infor">
                        <ul>
                            <?php foreach ($xinwen as $v) { ?>
                                <li>
                                    <a href="<?php echo $v['linkUrl'];?>">【新闻】<?php echo $v['title']?></a>
                                    <em><?php echo date('Y-m-d', $v['created_at'])?></em>
                                </li>
                            <?php }?>
                        </ul>
                    </div>
                    <div class="infor">
                        <ul>
                            <?php foreach ($gonggao as $v) { ?>
                                <li>
                                    <a href="<?php echo $v['linkUrl'];?>">【公告】<?php echo $v['title']?></a>
                                    <em><?php echo date('Y-m-d', $v['created_at'])?></em>
                                </li>
                            <?php }?>
                        </ul>
                    </div>
                    <div class="infor">
                        <ul>
                            <?php foreach ($huodong as $v) { ?>
                                <li>
                                    <a href="<?php echo $v['linkUrl'];?>">【活动】<?php echo $v['title']?></a>
                                    <em><?php echo date('Y-m-d', $v['created_at'])?></em>
                                </li>
                            <?php }?>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <div class="m_width main02">
            <div class="title t_01"></div>
            <div id="focus_Box" class="m2_con">
                <span class="prev">&nbsp;</span>
                <span class="next">&nbsp;</span>
                <ul>
                    <?php foreach ($jietu as $v) { ?>
                        <li>
                            <img width="462" height="304" alt="" src="<?php echo $v['thumb']?>" />
                        </li>
                    <?php }?>
                </ul>
            </div>
            <div style="text-align:center;clear:both">
            </div>

        </div>
        <div class="m_width main03">
            <div class="title t_02"></div>
            <?php foreach ($gonglue as $v) { ?>
                <a class="txt01" href="<?php echo $v['linkUrl'];?>">
                    <img src="<?php echo $v['thumb'];?>" title="" alt="" />
                </a>
            <?php }?>
            <div class="clear"></div>
        </div>
        <div class="float_r">
            <img src="<?php echo STATIC_DOMAIN ?>2.0/common/images/ewm.jpg" alt="img" />
            <div class="f_right">
                <span class="l_span">生煎三国志微信公众号：sjsgz_</span>
                <p class="gz"><i></i><em>扫描立刻关注</em></p>
            </div>
            <div class="f_bot">
                <a class="f_ico_tb" href="javascript:alert('敬请期待！');"><i></i><span>官方贴吧</span></a>
                <a class="f_ico_sina" target="_blank" href="http://weibo.com/5887851184/manage"><i></i><span>官方微博</span></a>
                <a class="f_ico_qq" href="https://jq.qq.com/?_wv=1027&k=4ASoESq" target="_blank"><i></i><span>310193441</span></a>
            </div>
        </div>
    </div>
</div>
<div class="l_footer">
    <div class="m4_imgbox" id="js_img">
        <div class="rongqi">
            <ul>
                <?php foreach ($partner as $v) {?>
                    <li>
                        <a href="<?php echo $v['url']?>"><img src="<?php echo $v['thumb']?>" alt="img"></a>
                    </li>
                <?php }?>
            </ul>
        </div>
    </div>
</div>

<!--<div id="video_mask" class="video_mask" style="display: none;">-->
<!--    <div class="w man10 both OF none"></div>-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos">-->
<!--            <embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="640" height="360" align="middle" allowscriptaccess="always" flashvars="uu=58546ec681&amp;vu=d36a4ff707&amp;auto_play=1&amp;gpcflag=1&amp;width=640&amp;height=360" type="application/x-shockwave-flash">-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->

<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery_extend.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/js/ZoomPic.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/js/js.js"></script>
