<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><?php echo $this->seo_title;?></title>
    <meta name="Keywords" content="<?php echo $this->seo_key;?>" >
    <meta name="Description" content="<?php echo $this->seo_des;?>" >
    <meta name="format-detection" content="telephone=no,email=no,adress=no">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/common/js/jquery-1.11.2.min.js"></script>
    <link href="<?php echo STATIC_DOMAIN ?>1.0/common/css/common.css" rel="stylesheet"/>
    <link href="<?php echo STATIC_DOMAIN ?>1.0/m/css/css.css" rel="stylesheet"/>
</head>
<body>

<?php echo $content ?>

<?php $this->renderPartial("//common/downloadjs");?>
<?php $this->renderPartial("//common/tongji");?>
</body>
</html>
