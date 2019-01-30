<?php

use yii\helpers\Url;
use yii\widgets\LinkPager;
use common\Cms;

$nav = $cid == 68 ? 'gonglue' : 'news';
?>

<?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => $nav,'global' => $global]);?>
<div class="news-bg">
    <div class="news-list clearfix">
        <p class="min-menu">您当前位置:<a href="/">首页</a>>新闻公告</p>
        <ul class="news-nav news-menu clearfix">
            <li <?php if ($cid == 64) {echo 'class="curr"';}?> ><a href="<?php echo Cms::getUrl('article/list', ['cid' => 64, 'cat_dir' => 'info/all']);?>">全部</a></li>
            <li <?php if ($cid == 65) {echo 'class="curr"';}?>><a href="<?php echo Cms::getUrl('article/list', ['cid' => 65, 'cat_dir' => 'info/all']);?>">新闻</a></li>
            <li <?php if ($cid == 66) {echo 'class="curr"';}?>><a href="<?php echo Cms::getUrl('article/list', ['cid' => 66, 'cat_dir' => 'info/all']);?>">公告</a></li>
            <li <?php if ($cid == 67) {echo 'class="curr"';}?>><a href="<?php echo Cms::getUrl('article/list', ['cid' => 67, 'cat_dir' => 'info/all']);?>">活动</a></li>
        </ul>
        <ul class="lis news-li-1 show">
            <?php if (!empty($data)) {?>
                <?php foreach ($data as $v) {?>
                    <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $v['id'], 'add_time' => $v['created_at']])?>"><i>【<?php echo $v['name']?>】</i><?php echo $v['title']?> </a><span>[<?php echo $v['created_at_formate']?>]</span></li>
                <?php }?>

            <?php } else {?>
                <div class="none n">
                    <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                    <p>暂无内容~</p>
                </div>
            <?php }?>
        </ul>

        <?php
            if ($page) {
                echo LinkPager::widget([
                    'pagination' => $page,
                    'hideOnSinglePage' => false,
                    'firstPageLabel' => '首页',
                    'lastPageLabel' => '尾页',
                    'options' => ['class' => 'page'],
                    'nextPageLabel' => '下一页',
                    'prevPageLabel' => '上一页',
                    'maxButtonCount' => 7,
//                    'pageSizeParam' => false,
                ]);
            }
        ?>
    </div>
</div>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/js/index.js"></script>

<script>
    var nowPage = '<?php echo $nowPage;?>';
    <?php if ($page) {?>
        var totalPage = '<?php echo $page->getPageCount();?>';
    <?php }?>

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
</script>