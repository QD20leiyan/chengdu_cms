<?php

use common\Cms;
use yii\helpers\Url;

$nav = isset($nav) ? $nav : 'index';
?>

<section>
    <div class="i_top">
        <div class="cont">
            <div class="i_topcon clearfix">
                <div class="i_icon">
                    <img src="<?= $global['logo_img']?>" alt="ICON">
                </div>
                <div class="i_top_title">
                    <h3><?= $global['title']?></h3>
                    <p><?= $global['sub_title']?></p>
                </div>
                <div class="i_nav">
                    <ul>
                        <li class="index">
                            <a <?php if ($nav == 'index') { echo 'class="on"';}?> href="<?php echo Url::to(['site/index']) ?>" >首 页</a>
                        </li>
                        <li class="">
                            <a target="_blank"  href="<?php echo Url::to(['special/index']) ?>">英雄联赛</a>
                        </li>
                        <li class="news">
                            <a target="_blank" <?php if ($nav == 'news') { echo 'class="on"';}?> href="<?php echo Cms::getUrl('article/list',array('cid'=>1,'cat_dir'=>'info'))?>">新闻资讯</a>
                        </li>
                        <li class="activity">
                            <a target="_blank" <?php if ($nav == 'activity') { echo 'class="on"';}?> href="/info/huodong/list_3_1.html">活动中心</a>
                        </li>
                        <li class="gonglue">
                            <a target="_blank" <?php if ($nav == 'gonglue') { echo 'class="on"';}?> href="/gonglue/list_5_1.html">弹弹攻略</a>
                        </li>
                        <li>
                            <a target="_blank" href="http://bbs.yingxiong.com/t/pc/9">官方社区</a>
                        </li>
                    </ul>
                </div>
                <div class="i_share clearfix">
                    <a target="_blank" href="<?= !empty($global['wb_url'])?$global['wb_url']:"javascript:yx_showTips('敬请期待');"?>" class="i_share_wb" title="微博"></a>
                    <a href="javascript:" class="i_share_wx" title="微信"></a>
                    <a target="_blank" href="<?= $global['tb_url']?>" class="i_share_bd" title="百度"></a>
                    <div class="i_share_weixin">
                        <div class="ewm">
                        <img src="<?= $global['wx_img']?>" alt="微信ewm">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
//    $(function(){
//        $('.i_nav ul li a').removeClass('on');
//        $('.i_nav ul li.<?php //echo $nav;?>// a').addClass('on');
//    })

</script>
