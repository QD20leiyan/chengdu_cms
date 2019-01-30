<?php
use common\Cms;
use yii\helpers\Url;

?>

<?php echo $this->render('@app/views/layouts/wap/nav.php', ['global' => $global]);?>
<section class="news news-list">
    <ul class="news-nav clearfix">
        <li <?php if ($cid == 64) {echo 'class="curr"';}?> ><a href="<?php echo Cms::getUrl('wap/list', ['cid' => 64, 'cat_dir' => 'info/all']);?>">全部</a></li>
        <li <?php if ($cid == 65) {echo 'class="curr"';}?>><a href="<?php echo Cms::getUrl('wap/list', ['cid' => 65, 'cat_dir' => 'info/all']);?>">新闻</a></li>
        <li <?php if ($cid == 66) {echo 'class="curr"';}?>><a href="<?php echo Cms::getUrl('wap/list', ['cid' => 66, 'cat_dir' => 'info/all']);?>">公告</a></li>
        <li <?php if ($cid == 67) {echo 'class="curr"';}?>><a href="<?php echo Cms::getUrl('wap/list', ['cid' => 67, 'cat_dir' => 'info/all']);?>">活动</a></li>
    </ul>
    <aside class="center">
        <ul class="news-li">
            <?php foreach ($data as $v) {?>
                <li><a href="<?php echo Url::to(['wap/article/detail', 'id' => $v['id']])?>"><i>【<?=$v['name']?>】</i><?php echo mb_substr(strip_tags($v['title']), 0, 10, 'utf-8')."..." ?>  </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
            <?php }?>
        </ul>
<!--        <ul class="news-li">2</ul>-->
<!--        <ul class="news-li">3</ul>-->
<!--        <ul class="news-li">4</ul>-->
<!--        <ul class="news-li">5</ul>-->
    </aside>
    <div class="bottom">
<!--        <ul class="page clearfix">-->
<!--            <li><a href="#">首页</a></li>-->
<!--            <li><a href="#">上一页</a></li>-->
<!--            <li><a href="#">1</a></li>-->
<!--            <li><a href="#">2</a></li>-->
<!--            <li><a href="#">3</a></li>-->
<!--            <li><a href="#">4</a></li>-->
<!--            <li><a href="#">尾页</a></li>-->
<!--        </ul>-->
    </div>
</section>
<section class="bg"></section>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/m/common/js/jquery-1.11.2.min.js"></script>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/m/common/js/swiper.3.1.7.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/m/js/index.js"></script>
<script type="text/javascript">
    var cid = '<?=$cid?>';
    $(function(){
        $('body').addClass('news-cont');
    })
</script>