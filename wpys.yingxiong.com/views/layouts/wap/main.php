<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
?>
<?php $this->beginPage() ?>
<?php echo $this->render('@app/views/layouts/wap/header.php');?>
<?php $this->beginBody() ?>
<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => 'My Company',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            ['label' => '首页', 'url' => ['/wap/site/index']],
            ['label' => '文章', 'url' => ['/wap/article/list']],
            ['label' => '单页', 'url' => ['/wap/page/index']],
            ['label' => '图片', 'url' => ['/wap/image/index']],
            ['label' => '视频', 'url' => ['/wap/video/index']],
        ],
    ]);
    NavBar::end();
    ?>
    <div class="container" style="margin-top: 150px">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= $content ?>
    </div>
</div>
<?php echo $this->render('@app/views/layouts/wap/footer.php');?>
<?php $this->endBody() ?>
<?php $this->endPage() ?>
