<?php

use yii\helpers\Url;

?>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/common/js/jquery-1.11.2.min.js"></script>
<div class="con">

    <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'zhixun'])?>

    <div class="wrap">
        <div class="peo_box">
            <div class="peo">
                <div class="solgan"></div>
            </div>
        </div>
        <div class="list_con">
            <div class="li_left">
                <div class="li_til  txt_main">
                    <h3><?php echo $data['name']?></h3>
                    <p><i></i>你当前位置：
                        <a href="<?php echo Url::to(['site/index'])?>">首页</a> >
                        <a href="javasciprt:;"><?php echo $data['name']?></a> </p>
                </div>
                <div class="art_main">
                    <div class="a_til">
                        <h3><?php echo $data['title'];?></h3>
                        <p><span>发布时间：<?php echo date('Y-m-d', $data['created_at'])?></span><span>来源：官方</span></p>
                    </div>
                    <div class="lccon">
                        <?php echo $data['body']; ?>
<!--                        <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>-->
                    </div>
                </div>
            </div>

            <?php echo $this->render('@app/views/layouts/pc/right.php')?>

        </div>
    </div>
    <div class="chengg"></div>
</div>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/js/js.js"></script>
