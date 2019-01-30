<!DOCTYPE html>
<html lang="zn-CH">
<head>
    <meta charset="UTF-8">
    <title><?=$this->getSeo('title')?></title>
    <meta  name="Keywords" content="<?=$this->getSeo('key')?>">
    <meta  name="Description" content="<?=$this->getSeo('desc')?>">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <meta name="format-detection" content="telephone=no,email=no,adress=no">
    <link rel="stylesheet" href="<?php echo STATIC_DOM;?>4.0/m/css/style.css">
    <script src="<?php echo STATIC_DOM;?>4.0/common/js/jquery-1.11.2.min.js"></script>
    <meta name="baidu-site-verification" content="HeETSFqgwl" />
</head>
<?php echo $this->render('@app/views/layouts/wap/header_top.php');?>
