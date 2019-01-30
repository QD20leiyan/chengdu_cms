<?php

use common\Cms;

if ($cid == 3) {
    $nav = 'activity';
} else if ($cid == 5) {
    $nav = 'gonglue';
} else {
    $nav = 'news';
}

?>

<link href="<?php use yii\helpers\Url;
use yii\widgets\LinkPager;

echo STATIC_DOMAIN ?>3.0/css/style.css?<?= VERSION?>" rel="stylesheet">
<link href="<?php echo STATIC_DOMAIN ?>3.0/common/css/swiper.3.1.7.min.css?<?= VERSION?>" rel="stylesheet">
<div class="bg">
    <!--导航-->
    <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => $nav,'global'=>$global]); ?>

    <section>
        <article class="art art-1 cont">
            <img src="<?php echo STATIC_DOMAIN ?>3.0/images/ddd_logo_1.png?<?= VERSION?>" />
            <span class="imgs"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/img1s.png?<?= VERSION?>" /></span>
        </article>
    </section>
    <div class="sec">
        <section class="clearfix">
            <article class="news-list-lef">
                <nav class="titles">
                    <h3>新闻资讯<span><a href="<?php echo  Url::to(['site/index'])?>">首页 &gt;</a>  新闻资讯</span></h3>
                    <ul class="menu clearfix">
                        <li <?php if ($cid == 1 || !$cid) {echo 'class="active"';} ?> data-type="zuixin"><a href="<?php echo Cms::getUrl('article/list',array('cid'=>1,'cat_dir'=>'info'))?>">最新</a></li>
                        <li <?php if ($cid == 2) {echo 'class="active"';} ?> data-type="xinwen">
                            <a href="<?php echo Cms::getUrl('article/list',array('cid'=>2,'cat_dir'=>'info/news'))?>">资讯</a>
                        </li>
                        <li <?php if ($cid == 4) {echo 'class="active"';} ?> data-type="gonggao">
                            <a href="<?php echo Cms::getUrl('article/list',array('cid'=>4,'cat_dir'=>'info/gonggao'))?>">公告</a>
                        </li>
                        <li <?php if ($cid == 3) {echo 'class="active"';} ?> data-type="huodong">
                            <a href="<?php echo Cms::getUrl('article/list',array('cid'=>3,'cat_dir'=>'info/huodong'))?>">活动</a>
                        </li>
                        <li <?php if ($cid == 5) {echo 'class="active"';} ?> data-type="gonglue">
                            <a href="<?php echo Cms::getUrl('article/list',array('cid'=>5,'cat_dir'=>'gonglue'))?>">攻略</a>
                        </li>
                    </ul>
                    <div class="content">
                        <ul class="content-list show" id="content">
                            <?php foreach ($data as $v) { ?>
                                <li><a target="_blank" href="<?php echo $v['link_url']; ?>">
                                        [<?php
                                            if ($cid == 1 || !$cid) { echo "公告";}
                                            else if ($cid == 2) {echo "新闻";}
                                            else if ($cid == 4) {echo "公告";}
                                            else if ($cid == 3) {echo "活动";}
                                            else if ($cid == 5) {echo "攻略";}
                                        ?>]
                                        <?php echo $v['title'] ?> </a><span>[<?php echo $v['created_at_formate'] ?>]</span>
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
                    <img src="http://gamerimage.yingxiong.com/qrcode/jump2_ddd2_pcgw.png" class=""/>
                    <i></i>
<!--                    <a class="js_down_ios" target="_blank" href="javascript:;"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/ios1.png"></a>-->
                    <a href="http://l.taptap.com/EGoDqaq5" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/tap_img1.png?<?= VERSION?>"></a>
                    <a class="js_down_andriod" target="_blank" href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/android.png?<?= VERSION?>"></a>
                    <a href="http://bbs.yingxiong.com/t/pc/9" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/sq_img.png?<?= VERSION?>"></a>
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

<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/js/index.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/yx.js?<?= VERSION?>"></script>

<script>
    var page = 1;
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
    function loadList()
    {
        var type = $('.menu li.active').attr('data-type');
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        var content = '';
        $.get('<?php echo Url::to(['site/ajax-news']) ?>', {page:page, type:type, cms_csrf:_csrf}, function(data){
            if (data.status != 0) {
                alert(data.msg);
            } else {
                for (var i in data.msg) {
                    content += '<li><a href="'+data.msg[i]['link_url']+'">[公告] '+data.msg[i]['title']+' </a><span>['+data.msg[i]['created_at_formate']+']</span></li>';
                }
                $('#content').html(content);
                $('ul.page').html(data.page);
                $('ul.page a').attr('href', 'javascrpt:;');
                $('ul.page li').click(function(){
                    var tmp = $(this).find('a').attr('data-page');
                    page = parseInt(tmp)+1;
                    loadList();
                });
            }

        }, 'json');
    }
</script>