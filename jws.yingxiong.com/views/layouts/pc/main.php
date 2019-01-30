<?php

/* @var $this \yii\web\View */
/* @var $content string */

?>
<?php $this->beginPage() ?>
<?php echo $this->render('@app/views/layouts/pc/head.php');?>
<?php $this->beginBody() ?>

<?= $content ?>
<?php echo $this->render('@app/views/layouts/pc/footer.php');?>
<?php $this->endBody() ?>
<?php $this->endPage() ?>