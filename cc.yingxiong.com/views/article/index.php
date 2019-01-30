<?php
use yii\helpers\Html;
use yii\widgets\ListView;
use yii\helpers\Url;
use yii\widgets\LinkPager;

//$this->title = '图片列表';
//$this->params['breadcrumbs'][] = $this->title;
?>

<link href="<?php echo STATIC_DOMAIN ?>2.0/css/news_center.css" rel="stylesheet">
<div class="i_head">
    <div class="i_h_content">
        <!--顶部导航-->
        <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'article']);?>
    </div>
</div>
<!-- 这是banner图 -->
<div class="n_banner"></div>
<!-- 这是新闻列表 -->
<div class="n_content">
    <div class="n_c_title">
        <h1>新闻资讯</h1>
        <p><a href="<?php echo Url::to(['site/index'])?>">首页</a><span>></span><a href="<?php echo Url::to(['article/index'])?>">新闻资讯</a></p>
    </div>
    <ul class="n_c_list">
        <?php foreach ($data as $v) {?>
            <li><a href="<?php echo Url::to(['article/detail', 'id' => $v['id']])?>"><?php echo $v['title']?></a><span><?php echo date('m/d', $v['created_at'])?></span></li>
        <?php } ?>
    </ul>
</div>
<!--这是页码-->
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
</body>
<script src="<?php echo STATIC_DOMAIN ?>2.0/public/jquery-1.7.1.min.js?{$smarty.const.VERSION}" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/public/public.js?{$smarty.const.VERSION}"></script>
<script type="text/javascript">
</script>
