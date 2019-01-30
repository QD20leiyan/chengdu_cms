<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
?>

<?php $this->beginPage() ?>
<?php echo $this->render('@app/views/layouts/pc/header.php');?>
<?php $this->beginBody() ?>

<?= $content ?>

<?php echo $this->render('@app/views/layouts/pc/footer.php');?>
<?php $this->endBody() ?>
<?php $this->endPage() ?>
