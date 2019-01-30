<?php
/**
 * Created by PhpStorm.
 * User: thinkpad
 * Date: 2017/4/5
 * Time: 11:22
 */
?>
<?php echo $this->render('//layouts/pc/head.php'); ?>
<link rel="stylesheet" href="<?php echo STATIC_DOM;?>4.0/css/jjd.css" />
<script src="<?php echo STATIC_DOM;?>4.0/js/jjd.js"></script>
<div class="list_bg"></div>
<?php echo $this->render('@app/views/layouts/pc/header.php', array('nid' => \Yii::$app->params['JANGJUN']))?>
<!--bg_pic-->
<div class="bg">
    <div class="bg_1">
    </div>
</div>

<div class="main_txt_1">
    <div class="main_txt_2">
        <?php foreach($data as $v){?>
        <div class="content_1">
            <div class="pic fl">
                <img src="<?=$v['thumb']?>" title="" alt="" />
            </div>
            <div class="center_txt fl">
                <div class="left_name fl">
                    <p><?=$v['title']?></p>
                </div>
                <h3 class="fl"><?php echo $v['sub_title']?></h3>
                <div class="right_title fr">
                    <p><?php echo $v['user_name']?></p>
                </div>
            </div>
            <span class="fl"><?=$v['summary']?></span>
            </span>
        </div>
        <?php }?>
    </div>
</div>
