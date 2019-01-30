<?php
/**
 * Created by PhpStorm.
 * User: thinkpad
 * Date: 2017-04-25
 * Time: 15:57
 */
use yii\helpers\Html;
use yii\helpers\HtmlPurifier;
use yii\helpers\Url;
?>
<div class="post">
    <strong><?= Html::encode($model->title) ?></strong>
    <span><?php echo $model->summary?></span>
    <a href="<?= Url::to(['wap/article/detail','id'=>$model->id]) ?>"><?= HtmlPurifier::process($model->title) ?> </a>
</div>