<?php

$this->title = $data['seo_title'];
$this->description = $data['seo_description'];
$this->keywords = $data['seo_keywords'];
?>


<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>3.0/m/css/news_details.css?<?= VERSION?>">
<div class="hengping"><p>请竖屏浏览</p></div>
<script src="<?php echo STATIC_DOMAIN?>3.0/m/js/top.js?<?= VERSION?>"></script>
<div class="top_H"></div>
<div class="news_header">
    <div>
        <h1><?php echo $data['title'] ?></h1>
        <p>发布时间：<?php echo date('Y-m-d', $data['created_at'])?> 来源：本网站</p>
    </div>
</div>
<div class="news_con">
    <div>
        <?php echo $data['body']?>
    </div>
</div>
<script src="//cdnstatic.yingxiong.com/footer/js/footer.js"></script>