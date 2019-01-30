<?php
?>
<style>
    .i-v{
        top: 35.5%;
    }
    .tel{
        margin: 18px auto 50px auto;
        position: relative;
        top: 107px;
    }
    .float{
        top: 61%;
    }
</style>
<div class="index-bg-top b">
    <?php echo $this->render('@app/views/layouts/pc/show.php');?>
</div>
<div class="index-bg-center">
    <div class="shadow"></div>
    <div class="center-bg">
        <div class="news-title clearfix">
            <a target="_blank" href="<?php echo common\Cms::getUrl('article/list', ['cid' => 31]); ?>" class="return"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/lef.png" /></a>
            <span><a target="_blank" href="/index.html">首页 &gt; </a><?php echo $data['name']; ?></span>
        </div>
        <div class="detalist">
            <h3><?php echo $data['title']; ?></h3>
            <span>《九剑魔龙传》官网 时间：<?php echo date('Y-m-d H:i:s', $data['created_at']) ?></span>
            <div class="datalist-txt">
                <?php echo $data['body']; ?>
            </div>
        </div>
    </div>
</div>
<div class="index-bg-bottom">
    <!-- 底部电话 -->
    <?php echo $this->render('@app/views/layouts/pc/tel.php');?>
    <?php echo $this->render('@app/views/layouts/pc/float.php');?>
    <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
</div>
</div>


<script src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>
