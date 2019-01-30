<?php
use common\Cms;
use yii\helpers\Html;
use yii\widgets\ListView;
use yii\helpers\Url;
use yii\widgets\LinkPager;

$nav = $type == 'gonglue' ? 'gonglue' : 'zhixun';
?>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
<div class="con">
    <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => $nav])?>

    <div class="wrap">
        <div class="peo_box">
            <div class="peo">
                <div class="solgan"></div>
            </div>
        </div>

        <div class="list_con">
            <div class="li_left">
                <div class="li_til">
                    <h3>游戏资讯</h3>
                    <p><i></i>你当前位置：
                        <a href="<?php echo Url::to(['site/index'])?>">首页</a> >
                        <a href="<?php echo Url::to(['article/index'])?>">游戏资讯</a> > 资讯</p>
                </div>
                <div class="li_main">
                    <div class="l_mtil js_til">
                        <ul>
                            <li>
                                <a <?php if ($type == 'zonghe') {echo 'class="on"';}?> href="<?php echo Cms::getUrl('article/list', ['id' => 69])?>"><i class="ico01"></i>综合</a>
                            </li>
                            <li>
                                <a <?php if ($type == 'xinwen') {echo 'class="on"';}?> href="<?php echo Cms::getUrl('article/list', ['id' => 70])?>"><i class="ico02"></i>新闻</a>
                            </li>
                            <li>
                                <a <?php if ($type == 'huodong') {echo 'class="on"';}?> href="<?php echo Cms::getUrl('article/list', ['id' => 72])?>"><i class="ico02"></i>活动</a>
                            </li>
                            <li>
                                <a <?php if ($type == 'gonggao') {echo 'class="on"';}?> href="<?php echo Cms::getUrl('article/list', ['id' => 71])?>"><i class="ico03"></i>公告</a>
                            </li>
                            <li>
                                <a <?php if ($type == 'gonglue') {echo 'class="on"';}?> href="<?php echo Cms::getUrl('article/list', ['id' => 74])?>"><i class="ico04"></i>攻略</a>
                            </li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                    <div class="l_m">
                        <div class="infor" style="display:block;">
                            <ul class="ul_01">
                                <?php if (!empty($data)) {?>
                                    <?php foreach ($data as $v) {?>
                                        <li>
                                            <i></i>
                                            <a href="<?php echo $v['linkUrl']?>"><?php echo $v['title']?></a>
                                            <em><?php echo date('Y-m-d', $v['created_at'])?></em>
                                        </li>
                                    <?php }?>
                                <?php }?>
                            </ul>

                        </div>

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
                </div>
            </div>
            <?php echo $this->render('@app/views/layouts/pc/right.php')?>
        </div>
    </div>
    <div class="chengg"></div>
</div>

<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/js/js.js"></script>


<script>
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

</script>