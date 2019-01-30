<!DOCTYPE html>
<html>
<?php $this->beginContent('frontend.views.layouts.head'); ?>
<?php echo $content ?>
<?php $this->endContent() ?>

<body>
<?php $this->beginContent('frontend.views.layouts.nav'); ?>
<?php echo $content ?>
<?php $this->endContent() ?>

<?php echo $content?>

</body>
</html>