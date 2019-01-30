<?php

?>
<link href="<?php echo STATIC_DOMAIN ?>2.0/css/new_inf.css" rel="stylesheet">
<div class="i_head">
    <div class="i_h_content">

        <!--顶部导航-->
        <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'article']);?>
    </div>
</div>
<div class="n_i_banner"></div>
<div class="n_i_content">
    <div class="c_title">
        <h1><?php echo $data['title'];?></h1>
        <p>发布于 <?php echo date('Y-m-d', $data['created_at'])?></p>
        <a href="javascript:window.history.go(-1)"></a>
    </div>
    <div class="c_text">
        <?php echo $data['body']?>
    </div>
</div>
</body>
<script src="<?php echo STATIC_DOMAIN ?>2.0/public/jquery-1.7.1.min.js?{$smarty.const.VERSION}" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/public/public.js?{$smarty.const.VERSION}"></script>
<script type="text/javascript"></script>
