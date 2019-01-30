<?php

use yii\grid\GridView;
use yii\helpers\Url;
use yii\widgets\BaseListView;
use yii\widgets\LinkPager;
use common\Cms;

?>
<style type="text/css">
    .float{
        top: 61%;
    }
    .i-v {
        left: 37%;
        top: 22%;
    }
</style>
<body>
<div class="index-bg b newsbox-bg">
    <?php echo $this->render('@app/views/layouts/pc/show.php');?>

    <div class="min-bg clearfix">

        <div class="news-title" style="margin-left: 42px;">
            <span><a target="_blank" href="/index.html">首页 &gt; </a>新闻资讯</span>
            <ul class="clearfix news-menu">
                <li class="nav-list"><a href="<?php echo Cms::getUrl('article/list', ['cid' => 31, 'cat_dir' => 'info/zuixin']); ?>" class="<?php if ($cid == 31) {echo 'news-active';} ?>">最新</a></li>
                <li class="nav-list"><a href="<?php echo Cms::getUrl('article/list', ['cid' => 32, 'cat_dir' => 'info/xinwen']); ?>" class="<?php if ($cid == 32) {echo 'news-active';} ?>">新闻</a></li>
                <li class="nav-list"><a href="<?php echo Cms::getUrl('article/list', ['cid' => 33, 'cat_dir' => 'info/gonggao']); ?>" class="<?php if ($cid == 33) {echo 'news-active';} ?>">公告</a></li>
            </ul>
        </div>
        <div class="news-deta news-list">
            <?php foreach ($data as $k => $v) { ?>
                <p><i></i><a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>">[媒体] <?php echo $v['title']; ?></a><span><?php echo date('m/d', $v['created_at']) ?></span></p>
            <?php } ?>

        </div>

        <?php
            echo LinkPager::widget([
                'pagination' => $page,
                'hideOnSinglePage' => false,
                'firstPageLabel' => '首页',
                'lastPageLabel' => '尾页',
                'options' => ['class' => 'page'],
                'nextPageLabel' => false,
                'prevPageLabel' => false,
            ]);
        ?>
    </div>


    <!-- 底部电话 -->
    <?php echo $this->render('@app/views/layouts/pc/tel.php');?>
    <?php echo $this->render('@app/views/layouts/pc/float.php');?>
    <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>

</div>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>
<!--<script src="--><?php //echo STATIC_DOMAIN ?><!--1.0/js/xSlider.js"></script>-->
