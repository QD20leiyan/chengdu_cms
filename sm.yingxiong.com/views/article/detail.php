<?php

use yii\helpers\Url;
$nav = $data['category_id'] == 68 ? 'gonglue' : 'news';
?>
<?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'news','global' => $global]);?>
<div class="news-bg">
    <div class="news-details">
        <p class="min-menu">您当前位置:<a href="/">首页</a>><a href="<?php echo Url::to(['article/index'])?>">新闻公告</a>>新闻详情</p>
        <div class="top">
            <div class="nav-bg"><?php echo $data['name']?></div>
        </div>
        <div class="center">
            <h4><?php echo $data['title'];?></h4>
            <span>发布时间：<?php echo date('Y-m-d', $data['created_at'])?> 来源：本网站</span>
            <div class="p">
                <?php echo $data['body']?>
            </div>
        </div>
        <div class="bottom"></div>

    </div>
</div>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/js/index.js"></script>
