<?php
use yii\helpers\Html;
use yii\widgets\ListView;

$this->title = '单页面列表';
$this->params['breadcrumbs'][] = $this->title;
?>
<ul>
    <?php
    echo ListView::widget([
        'dataProvider' => $dataProvider,
        'itemView' => '_item',//子视图
        'layout'=>'{items}{pager}',
        'itemOptions'=>['class'=>'mydd_box'],
        'pager'=>[
            'maxButtonCount'=>10,
            'nextPageLabel'=>Yii::t('app','下一页'),
            'prevPageLabel'=>Yii::t('app','上一页'),
        ],
    ]);
    ?>
</ul>
<code><?= __FILE__ ?></code>