<?php $this->renderPartial('//layouts/v3/head'); ?>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN;?>/3.0/css/index.css" />

<!--[if lt IE 9]>
<script src="<?php echo STATIC_DOMAIN;?>common/js/html5shiv.js"></script>
<![endif]-->
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN;?>css/fullPage.css">

<body>
<!--[if lt IE 7]>
<div style="position:absolute;left:0;top:0;width:100%;height:50px;background:rgb(255,255,233);color:rgb(30,84,148);border-bottom:1px solid rgb(230,230,198);text-align:center;line-height:50px;font-size:12px;">您使用的浏览器版本过低，可能会影响到您浏览本网页，建议您升级您的浏览器。</div>
<![endif]-->
<!--顶导航开始-->
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.min.js"></script>
<div class="list_bg"></div>
<?php $this->renderPartial('//layouts/v2/nav',array('nid'=>1)); ?>

<div id="fullpage">
    <div class="section section1 active">
        <img src="<?php echo STATIC_DOMAIN;?>images/bg_01.jpg" alt="bg_01" class="in_bg bg_01">
        <div class="s_main">
            <img src="<?php echo STATIC_DOMAIN;?>images/peo.png" alt="peo" class="peo">
            <img src="<?php echo STATIC_DOMAIN;?>common/images/logo_font.png" alt="" class="logo_font">
            <?php foreach($cover_video as $k=>$v){ ?>
                <?php if($k == 0){ ?>
                    <div class="video" data-id="<?php echo $v['link_url'] ?>">
                        <a href="javascript:">
                            <i class="vi_01"></i>
                            <i class="vi_02"></i>
                        </a>
                    </div>
                <?php } ?>
            <?php } ?>
            <div class="soglan">
                <img src="<?php echo STATIC_DOMAIN;?>common/images/solgan.png" alt="solgan" class="so_01">
                <?php foreach($solgan as $k=>$v){ ?>
                    <?php if($k==0){ ?>
                        <a target="_blank" href="<?php echo $v['link_url'] ?>"><img src="<?php echo $v['image_url'] ?>" alt="solgan" class="so_02"></a>
                    <?php } ?>
                <?php } ?>
            </div>
            <div class="s1_bot">
                <div class="download fl">
                    <span class="ewm_bg"><img src="" alt="ewm" class="ewm_down jump_img"></span>
                    <a class="btn_ios down_ios" target="_blank" href="javascript:"><img src="<?php echo STATIC_DOMAIN;?>images/btn_ios.png" alt="ios"></a>
                    <a class="btn_anz down_andriod" target="_blank" href="javascript:"><img src="<?php echo STATIC_DOMAIN;?>images/btn_anz.png" alt="anz"></a>
                </div>
                <div class="ad_v fl">
                    <?php foreach($ad as $k=>$v){ ?>
                        <?php if($k<2){ ?>
                            <a target="_blank" href="<?php echo $v['link_url'] ?>"><img src="<?php echo $v['image_url'] ?>" alt="img"></a>
                        <?php } ?>
                    <?php } ?>
                </div>
                <a href="javascript:" class="gift fl"><img src="<?php echo STATIC_DOMAIN;?>common/images/gift.png" alt="gift"></a>
            </div>
        </div>
    </div>
    <div class="section section2">
        <img src="<?php echo STATIC_DOMAIN;?>images/bg_02.jpg" alt="bg_02" class="in_bg bg_02">
        <div class="s_main">
            <div class="s2_left">
                <div class="slider-banner-box" id="slider-banner-box">
                    <div class="hd">
                        <ul></ul>
                    </div>
                    <div class="bd">
                        <ul>
                            <?php foreach($banner as $v){ ?>
                            <li><a target="_blank" href="<?= $v['link_url'];?>"><img src="<?= $v['image_url'];?>" alt="<?= $v['title'];?>"></a></li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
                <div class="tab-news-box"  id="tab-news-box">
                    <div class="hd">
                        <ul>
                            <li class="on"><a target="_blank" href="<?php echo CommonMethod::getUrl('article/list',array('cid'=>1,'cat_dir'=>'zixun'));?>">综合</a></li>
                            <li><a target="_blank" href="<?php echo CommonMethod::getUrl('article/list',array('cid'=>2,'cat_dir'=>'xw'));?>">新闻</a></li>
                            <li><a target="_blank" href="<?php echo CommonMethod::getUrl('article/list',array('cid'=>3,'cat_dir'=>'gg'));?>">公告</a></li>
                            <li><a target="_blank" href="<?php echo CommonMethod::getUrl('article/list',array('cid'=>4,'cat_dir'=>'hd'));?>">活动</a></li>
                            <li><a target="_blank" href="<?php echo CommonMethod::getUrl('article/list',array('cid'=>5,'cat_dir'=>'gl'));?>">攻略</a></li>
                        </ul>
                        <a target="_blank" href="<?php echo CommonMethod::getUrl('article/list',array('cid'=>1,'cat_dir'=>'zixun'));?>" class="more"><i></i>更多</a>
                    </div>
                    <div class="bd">
                        <ul>
                            <?php foreach($zx->getData() as $v):?>
                            <li>
                                <a target="_blank" href="<?php echo CommonMethod::getUrl('article/detail',array('aid'=>$v->article_id,'add_time'=>$v->add_time,'cat_dir'=>$v->category->cat_dir,"#"=>"detail"));?>">【<?= $v->category->cat_name;?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d',$v['add_time']); ?></span>
                            </li>
                            <?php endforeach;?>
                        </ul>
                        <ul>
                            <?php foreach($xw->getData() as $v):?>
                                <li>
                                    <a target="_blank" href="<?php echo CommonMethod::getUrl('article/detail',array('aid'=>$v->article_id,'add_time'=>$v->add_time,'cat_dir'=>$v->category->cat_dir,"#"=>"detail"));?>">【<?= $v->category->cat_name;?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d',$v['add_time']); ?></span>
                                </li>
                            <?php endforeach;?>
                        </ul>
                        <ul>
                            <?php foreach($gg->getData() as $v):?>
                                <li>
                                    <a target="_blank" href="<?php echo CommonMethod::getUrl('article/detail',array('aid'=>$v->article_id,'add_time'=>$v->add_time,'cat_dir'=>$v->category->cat_dir,"#"=>"detail"));?>">【<?= $v->category->cat_name;?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d',$v['add_time']); ?></span>
                                </li>
                            <?php endforeach;?>
                        </ul>
                        <ul>
                            <?php foreach($hd->getData() as $v):?>
                                <li>
                                    <a target="_blank" href="<?php echo CommonMethod::getUrl('article/detail',array('aid'=>$v->article_id,'add_time'=>$v->add_time,'cat_dir'=>$v->category->cat_dir,"#"=>"detail"));?>">【<?= $v->category->cat_name;?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d',$v['add_time']); ?></span>
                                </li>
                            <?php endforeach;?>
                        </ul>
                        <ul>
                            <?php foreach($gl->getData() as $v):?>
                                <li>
                                    <a target="_blank" href="<?php echo CommonMethod::getUrl('article/detail',array('aid'=>$v->article_id,'add_time'=>$v->add_time,'cat_dir'=>$v->category->cat_dir,"#"=>"detail"));?>">【<?= $v->category->cat_name;?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d',$v['add_time']); ?></span>
                                </li>
                            <?php endforeach;?>
                        </ul>
                        <ul>
                            <?php foreach($mt->getData() as $v):?>
                                <li>
                                    <a target="_blank" href="<?php echo CommonMethod::getUrl('article/detail',array('aid'=>$v->article_id,'add_time'=>$v->add_time,'cat_dir'=>$v->category->cat_dir,"#"=>"detail"));?>">【<?= $v->category->cat_name;?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d',$v['add_time']); ?></span>
                                </li>
                            <?php endforeach;?>
                        </ul>
                    </div>
                </div>

            </div>
            <img src="<?php echo STATIC_DOMAIN;?>images/peo_r.png" alt="peo" class="s2_right">
        </div>
    </div>
    <div class="section section3">
        <img src="<?php echo STATIC_DOMAIN;?>images/bg_03.jpg" alt="bg_03" class="in_bg bg_03">
        <div class="s_main">
            <ul class="section3-feature-ul">
                <li class="feature1 active">
                    <a href="javascript:void(0);">
                        <img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f1.png" alt="s" />
                    </a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-1.jpg" alt="img">
                </li>
                <li class="feature2 ">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f2.png" alt="s"></a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-2.jpg" alt="img">
                </li>
                <li class="feature3">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f3.png" alt="s"></a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-3.jpg" alt="img">
                </li>
                <li class="feature4">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f4.png" alt="s"></a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-4.jpg" alt="img">
                </li>
                <li class="feature5">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f5.png" alt="s"></a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-5.jpg" alt="img">
                </li>
                <li class="feature6">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f6.png" alt="s"></a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-6.jpg" alt="img">
                </li>
                <li class="feature7">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOMAIN;?>common/images/s3-f7.png" alt="s"></a>
                    <img src="<?php echo STATIC_DOMAIN;?>images/img-7.jpg" alt="img">
                </li>
            </ul>
            <div class="s3_bottom">
                <div class="s3_peo_head">
                    <span class="s_wid118 s_p_h1 on"></span>
                    <span class="s_wid118 s_p_h2"></span>
                    <span class="s_wid118 s_p_h3"></span>
                    <span class="s_wid118 s_p_h4"></span>
                    <span class="s_wid126 s_p_h5"></span>
                    <span class="s_wid126 s_p_h6"></span>
                    <span class="s_wid126 s_p_h7"></span>
                    <a target="_blank" href="/article/hero_list.html" class="s_wid126 s_p_a"></a>
                </div>
                <div class="s3_name">
                    <img class="s3_n1" src="<?php echo STATIC_DOMAIN;?>images/s3_name1.png" alt="name1">
                    <img class="s3_n2 hide" src="<?php echo STATIC_DOMAIN;?>images/s3_name2.png" alt="name2">
                    <img class="s3_n3 hide" src="<?php echo STATIC_DOMAIN;?>images/s3_name3.png" alt="name3">
                    <img class="s3_n4 hide" src="<?php echo STATIC_DOMAIN;?>images/s3_name4.png" alt="name4">
                    <img class="s3_n5 hide" src="<?php echo STATIC_DOMAIN;?>images/s3_name5.png" alt="name5">
                    <img class="s3_n6 hide" src="<?php echo STATIC_DOMAIN;?>images/s3_name6.png" alt="name6">
                    <img class="s3_n7 hide" src="<?php echo STATIC_DOMAIN;?>images/s3_name7.png" alt="name7">
                </div>
                <div class="s3_peo">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img1.png" class="s3_img1" alt="s_i1">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img2.png" class="s3_img1 hide" alt="s_i2">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img3.png" class="s3_img1 hide" alt="s_i3">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img4.png" class="s3_img1 hide" alt="s_i4">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img5.png" class="s3_img1 hide" alt="s_i5">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img6.png" class="s3_img1 hide" alt="s_i6">
                    <img src="<?php echo STATIC_DOMAIN;?>images/s3_img7.png" class="s3_img1 hide" alt="s_i7">
                </div>
                <a target="_blank" href="/article/hero_list.html" class="more_a"></a>
            </div>
        </div>
    </div>
    <div class="section section4">
        <img src="<?php echo STATIC_DOMAIN;?>images/bg_05.png" alt="bg_05" class="in_bg bg_05">

        <div class="s_main s_main1">
            <a href="/article/yh_list.html" class="Moviemore">更多>></a>
            <div class="movieLeft">
                <?php foreach($yh->getData() as $k=>$v){ ?>
                    <?php if($k<3){ ?>
                        <a href="<?php echo $v['link_url'] ?>" class="<?php if($k==0){echo 'a_01';}else{echo 'a_02';} ?>">
                            <img src="<?php echo $v['image_url'] ?>" alt="">
<!--                            <i></i>-->
                            <p><?php echo $v['title'] ?></p>
                        </a>
                    <?php } ?>
                <?php } ?>
            </div>
            <div class="movieRight">
                <?php foreach($yh->getData() as $k=>$v){ ?>
                <?php if($k>2 && $k<9){ ?>
                        <a href="<?php echo $v['link_url'] ?>" class="a_02 ">
                            <img src="<?php echo $v['image_url'] ?>" alt="">
<!--                            <i></i>-->
                            <p><?php echo $v['title'] ?></p>
                        </a>
                    <?php } ?>
                <?php } ?>
            </div>
        </div>

    </div>
    <div class="section section5">
        <img src="<?php echo STATIC_DOMAIN;?>images/bg_04.jpg" alt="bg_04" class="in_bg bg_04">
        <div class="s_main">
            <img class="font_sg" src="<?php echo STATIC_DOMAIN;?>images/font_sg.png" alt="sg">
            <ul class="bottom_infos clearfix">
                <li>
                    <div class="icon_box"><img class="jump_img" src=""></div>
                    <div class="txt">
                        <h3 class="download_title">下载游戏</h3>
                        <p>扫描二维码下载游戏</p>
                        <p>3D动作军团征战手游</p>
                        <p>万人连斩  逐鹿三国</p>
                    </div>
                </li>
                <li>
                    <div class="icon_box"><img src="<?php echo STATIC_DOMAIN;?>common/images/ewm_wx.jpg"></div>
                    <div class="txt">
                        <h3 class="gzh_title">微信公众号</h3>
                        <p>扫描二维码关注官方微信</p>
                        <p>官方微信号：<em class="green">jiwushuanghero</em></p>
                        <p>关注领取最强礼包</p>
                    </div>
                </li>
                <li>
                    <div class="icon_box"><img src="<?php echo STATIC_DOMAIN;?>common/images/ewm_bul.jpg"></div>
                    <div class="txt">
                        <h3 class="server_title">客服服务</h3>
                        <p>
                            <span>客服热线：<em class="green">400-939-3333</em></span>
                            <span>客服QQ：<em class="green">2885626330</em></span>
                            <span>极无双玩家交流1群<a class="green" href="http://jq.qq.com/?_wv=1027&k=2KydGke">482957214</a></span>
                            <span>玩家交流，BUG反馈</span>
                            <a class="a_img" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2885626330&site=qq&menu=yes"><img border="0" src="<?php echo STATIC_DOMAIN;?>images/button.png" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="if-orders">
                <div class="if-orders-box">
                    <div class="if-orders-demo1 fl clearfix">
                        <?php foreach($partner as $k=>$v){ ?>
                        <div class="if-orders-item no_left fl">
                            <a href="#"><img src="<?php echo $v['image_url'] ?>"></a>" alt="1"></a>
                        </div>
                        <?php } ?>
                    </div>
                    <div class="if-orders-demo2 fl clearfix"></div>
                </div>
                <div class="if-orders-prev"></div>
                <div class="if-orders-next"></div>
            </div>
        </div>
    </div>

    <div class="if_bot_wrap">
        <div id="if-copyRight">
            <p class="if-copyRight-p">
					<span class="if-copyRight-p1">
					<a href="javascript:;" target="_blank"><img src="<?php echo STATIC_DOMAIN;?>common/images/i-fot-logo.png" alt="1"></a>
					</span>
					<span class="if-copyRight-p2">
					文网游备字〔2016〕Ｍ-CSG 0339 号  版权所有：北京卓越晨星科技有限公司 联系方式：010-50948585<br>
					COPYRIGHT©2015 – 2015 . ALL RIGHTS RESERVED. 京ICP备15026730号-2<br>
					<a target="_blank" href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393" class="www-ico"><img src="<?php echo STATIC_DOMAIN;?>common/images/www-ico.png" alt=""></a>
					<a target="_blank" href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08c53cc2ed60153cfbc3e1203cd" class="game-ico"><img src="<?php echo STATIC_DOMAIN;?>common/images/game-ico.png" alt=""></a>
						《网络文化经营许可证》京网文[2015]0629-259号
					</span>
            </p>
        </div>
    </div>
</div>
<span class="updown"></span>
<!--按钮导航 start-->
<div id="side-nav">
    <ul>
        <li data-menuanchor="page1" class="active"><a href="#page1">首页</a></li>
        <li data-menuanchor="page2"><a href="#page2">资讯</a></li>
        <li class="li_mar40" data-menuanchor="page3"><a href="#page3">武将</a></li>
        <li class="li_mar40" data-menuanchor="page4"><a href="#page4">影画</a></li>
        <li class="li_mar40" data-menuanchor="page5"><a href="#page5">联系</a></li>
    </ul>
</div>
<div class="side-tck">
    <img class="s_bg" src="<?php echo STATIC_DOMAIN;?>images/side_tckbg.png" alt="side">
    <a href="javascript:" class="side_btn">游戏下载</a>
    <div class="side_tm">
        <img class="s_downl jump_img" src="<?php echo STATIC_DOMAIN;?>common/images/ewm_down.jpg" alt="">
        <a class="s_aios down_ios" target="_blank" href="javascript:"><img src="<?php echo STATIC_DOMAIN;?>images/btn_ios.png" alt="ios"></a>
        <a class="s_anz down_andriod" target="_blank" href="javascript:"><img src="<?php echo STATIC_DOMAIN;?>images/btn_anz.png" alt="anz"></a>
    </div>
</div>
<!--礼包-->
<div class="mask"></div>
<div class="mode-gift">
    <?php foreach($gift_image as $k=>$v){ ?>
        <?php if($k==0){ ?>
            <img src="<?php echo $v['image_url'] ?>" alt="img">
        <?php } ?>
    <?php } ?>
    <div class="close"></div>
</div>
<div id="video_mask" class="video_mask">
    <div class="w man10 both OF none"></div>
    <div id="player5">
        <div id="close"></div>
        <div class="videos">
        </div>
    </div>
</div>
<script src="<?php echo STATIC_DOMAIN;?>/common/js/jquery-1.11.2.min.js"></script>
<script src="<?php echo STATIC_DOMAIN;?>/js/fullpage.js"></script>
<script src="<?php echo STATIC_DOMAIN;?>/common/js/superSlidev2.1.js"></script>
<script src="<?php echo STATIC_DOMAIN;?>/js/js.js"></script>
<script type="text/javascript">
    $(".video").click(function(){
        var link_url = $(this).attr('data-id');
        $('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'" type="application/x-shockwave-flash"></embed>');
        $(".video_mask").show();
    })
    $(".close,#close").click(function(){
        $("#video_mask").hide();
        $(this).parent().hide();
        $(".mask").hide();
    })
</script>
<?php $this->renderPartial("//common/downloadjs");?>
<?php $this->renderPartial("//common/tongji");?>
</body>
</html>
