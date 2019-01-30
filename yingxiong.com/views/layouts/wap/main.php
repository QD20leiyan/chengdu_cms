<?php //$this->beginContent('frontend.views.layouts.wap.head'); ?>
<?php echo $this->render('@app/views/layouts/wap/head.php');?>

<?php $this->beginBody() ?>
<body id="i_body">
<?php echo $content ?>
<?php $this->endBody() ?>
<?php echo $this->render('@app/views/common/tongji.php');?>
</body>
</html>
