<?php

use common\models\Stat;

$stat = Stat::find()->where(['website_id' => 25, 'name' => 'download_num'])->asArray()->one();
$num = number_format($stat['count']);
?>
<!--<div class="float">-->
<!--    <p><b>--><?php //echo  $num;?><!--人</b></p>-->
<!--    <p>已下载</p>-->
<!--</div>-->
<!--<div class="float_box">-->
<!--    <div class="float_bg">-->
<!--        <img class="js_jump_img" src="--><?php //echo STATIC_DOMAIN ?><!--1.0/images/ewm.png" />-->
<!--        <a href="javascript:" class="js_down_ios"><img src="--><?php //echo STATIC_DOMAIN ?><!--1.0/images/ios.png" /></a>-->
<!--        <a href="javascript:" class="js_down_andriod"><img src="--><?php //echo STATIC_DOMAIN ?><!--1.0/images/and.png" /></a>-->
<!--        <p class="close"></p>-->
<!--    </div>-->
<!--</div>-->
<!--<script src="--><?php //echo STATIC_DOMAIN ?><!--1.0/js/jquery-1.11.2.min.js"></script>-->