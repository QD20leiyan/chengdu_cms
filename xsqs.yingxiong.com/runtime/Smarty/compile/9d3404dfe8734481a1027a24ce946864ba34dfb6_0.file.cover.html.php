<?php
/* Smarty version 3.1.31, created on 2017-08-16 14:31:41
  from "/mnt/hgfs/data/cmgephp/cms2/website/xsqs.yingxiong.com/views/site/cover.html" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.31',
  'unifunc' => 'content_5993e6cd0b6664_37470080',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9d3404dfe8734481a1027a24ce946864ba34dfb6' => 
    array (
      0 => '/mnt/hgfs/data/cmgephp/cms2/website/xsqs.yingxiong.com/views/site/cover.html',
      1 => 1502865091,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5993e6cd0b6664_37470080 (Smarty_Internal_Template $_smarty_tpl) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>像素求生</title>
    <link rel="stylesheet" href="<?php echo @constant('STATIC_DOMAIN');?>
1.0/css/reset.css">
    <link rel="stylesheet" href="<?php echo @constant('STATIC_DOMAIN');?>
1.0/css/index.css">
</head>
<body>
<div class="container">
    <img src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/bimg1.png">
    <div class="item">
        <img class="logo" src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/logo1.png">
        <div class="playBox">
            <div class="pb_1">
                <img src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/play_bimg.png">
                <img class="play_icon all_center" src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/play_icon.png">
            </div>
            <div class="pb_2">
                <img src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/ewm_box.png">
                <img class="ewm_img" src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/ewm1.png">
                <label class="ewm-line"></label>
            </div>
        </div>
        <div class="down">
            <a class="down_ios" href="javascript:">
                <img src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/down_ios.png">
            </a>
            <a class="down_az" href="javascript:">
                <img src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/down_az.png">
            </a>
        </div>
        <div class="fc">
            <img src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/xf.png">
            <img class="ewm_img" src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/images/ewm1.png">
            <p class="wb_inf">
                微博:XXXXXXX
            </p>
            <p class="qq_inf">
                QQ群:XXXXXXX
            </p>
            <p class="tb_inf">
                贴吧:XXXXXXX
            </p>
        </div>
    </div>
</div>
</body>
<?php echo '<script'; ?>
 type="text/javascript" src="<?php echo @constant('STATIC_DOMAIN');?>
1.0/public/jquery-1.7.1.min.js"><?php echo '</script'; ?>
>
<?php echo '<script'; ?>
 type="text/javascript">
    $(function(){
        var ewm_line = $(".ewm-line");
        function init(){
            startEwmLine();
        }
        //二维码扫描动画
        function startEwmLine(){
            var name = ewm_line.attr("name");
            var myTop = 0;
            if(name){
                myTop = "20%";
                ewm_line.attr("name","");
            }else {
                myTop = "90%";
                ewm_line.attr("name","up");
            }
            ewm_line.animate({
                top: myTop
            },2000,function(){
                startEwmLine();
            })
        }

        init();
    });
<?php echo '</script'; ?>
>
</html><?php }
}
