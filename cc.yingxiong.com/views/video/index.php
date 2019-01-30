<?php

//$this->title = '视频列表';
//$this->params['breadcrumbs'][] = $this->title;
?>
<link href="<?php echo STATIC_DOMAIN ?>2.0/css/video_center.css?<?= VERSION?>" rel="stylesheet">
<div class="i_head">
    <div class="i_h_content">
        <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'video']);?>
    </div>
</div>
<!-- 这是轮播图 -->
<div class="v_banner page_lb">
    <ul>
        <?php foreach ($banner as $v) {?>
            <li><a href="<?php echo $v['url']?>"><img src="<?php echo $v['thumb']?>" alt=""/></a></li>
        <?php } ?>
    </ul>
    <label class="qh prev"></label>
    <label class="qh next"></label>
</div>
<!-- 这是视频列表 -->
<div class="v_content">
    <div class="v_c_title">
        <h1>视频中心</h1>
        <p>
            <a href="index.html">首页</a>
            <span>></span>
            <a href="#">视频中心</a>
        </p>
    </div>
    <div class="v_c_item i1">
        <h1><img src="<?php echo STATIC_DOMAIN ?>2.0/images/v_icon1.png?<?= VERSION?>"><span>官方宣传</span></h1>
        <ul>
            <?php foreach ($xuanchuan as $v) {?>
                <li>
                    <div>
                        <img src="<?php echo $v['thumb']?>">
                        <div class="v_c_hcover" rel="<?php echo $v->contentMessage?>">
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_sp_picon.png?<?= VERSION?>">
                        </div>
                    </div>
                    <p><?php echo $v['title'];?></p>
                </li>
            <?php }?>
        </ul>
    </div>
    <div class="v_c_item i2">
        <h1><img src="<?php echo STATIC_DOMAIN ?>2.0/images/v_icon2.png?<?= VERSION?>"><span>精彩赛事</span></h1>
        <ul>
            <?php foreach ($jingcai as $v) {?>
                <li>
                    <div>
                        <img src="<?php echo $v['thumb']?>">
                        <div class="v_c_hcover" rel="<?php echo $v->contentMessage?>">
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_sp_picon.png?<?= VERSION?>">
                        </div>
                    </div>
                    <p><?php echo $v['title'];?></p>
                </li>
            <?php }?>
        </ul>
    </div>
    <div class="v_c_item i3">
        <h1><img src="<?php echo STATIC_DOMAIN ?>2.0/images/v_icon3.png"><span>热门英雄</span></h1>
        <ul>
            <?php foreach ($remen as $v) {?>
                <li>
                    <div>
                        <img src="<?php echo $v['thumb']?>">
                        <div class="v_c_hcover" rel="<?php echo $v->contentMessage?>">
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_sp_picon.png?<?= VERSION?>">
                        </div>
                    </div>
                    <p><?php echo $v['title'];?></p>
                </li>
            <?php }?>
        </ul>
    </div>
    <div class="v_c_item i4">
        <h1><img src="<?php echo STATIC_DOMAIN ?>2.0/images/v_icon4.png?<?= VERSION?>"><span>解说视频</span></h1>
        <ul>
            <?php foreach ($jieshuo as $v) {?>
                <li>
                    <div>
                        <img src="<?php echo $v['thumb']?>">
                        <div class="v_c_hcover" rel="<?php echo $v->contentMessage?>">
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_sp_picon.png?<?= VERSION?>">
                        </div>
                    </div>
                    <p><?php echo $v['title'];?></p>
                </li>
            <?php }?>

        </ul>
    </div>
</div>
<!-- 这是弹窗播放器 -->
<div class="page_video_box">
    <div id="my_video" class="my_video">
        <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>
        <label class="v_close"></label>
    </div>
</div>
</body>

<script src="<?php echo STATIC_DOMAIN ?>2.0/public/public.js" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function(){
        function init(){
            banner_init();
        }
        function banner_init(){
            var v_banner = $(".v_banner");
            var b_w = v_banner.width();
            v_banner.height(b_w*0.192+"px");
            banner.init(v_banner);
        }

        //点击视频弹出播放器
        $(".v_c_item ul li .v_c_hcover").click(function(){
            var rel = $(this).attr('rel');
            $('.page_video_box embed').attr('flashvars', rel+'&auto_play=1&gpcflag=1&width=640&height=360');
            $(".page_video_box").css({
                "display":"block",
                "opacity":"1",
                "transform":"scale(1,1)"
            });
        });

        //点击取消弹窗视频
        $(".v_close").click(function(){
            var page_video_box = $(".page_video_box");
            page_video_box.css({
                "opacity":"0",
                "transform":"scale(0,0)"
            });
            setTimeout(function(){
                page_video_box.css({
                    "display":"none"
                });
            },210);
        });

        init();
    });
</script>
