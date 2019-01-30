<?php
use yii\helpers\Html;
use yii\widgets\ListView;
use common\components\Page;

$this->title = '文章列表';
$this->params['breadcrumbs'][] = $this->title;
?>
<!--主体-->
<div class="new-list-wrap h-mTop67">
    <div class="news-list">
        <ul class="event-list-news">
            <?php $i=0;?>
            <?php foreach($dataProvider->getModels() as $v) {?>
                <li>
                    <a href="/news/<?php echo $v->id;?>.html" target="_blank">
                        <img src="<?php echo $v->thumb?>" alt="">
                        <h2><?php echo $v->title?></h2>
                        <p class="tit"><?php echo date('Y年m月d日',$v->created_at)?></p>
                        <p class="txt"><?php  echo $v->summary; ?></p>
                    </a>
                </li>
                <?php $i++;}?>
        </ul>
        <div class="page">
            <div class="number">
                <ul>

                    <?php echo \yii\widgets\LinkPager::widget([
                        'pagination'=>$dataProvider->pagination,
                        'hideOnSinglePage' => false,
                        'firstPageLabel' => '<',
                        'lastPageLabel' => '>',
                        'nextPageLabel' => '',
                        'prevPageLabel' => '',
                    ]);?>
                </ul>
            </div>
        </div>
    </div>
</div>
