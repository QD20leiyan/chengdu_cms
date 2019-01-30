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
    <img src="<?php echo $model->thumb?>">
    <strong><?= Html::encode($model->title) ?></strong>
    <span><?php echo $model->summary?></span>
    <a href="<?= Url::to(['image/detail','id'=>$model->id]) ?>"><?= HtmlPurifier::process($model->title) ?> </a>
</div>