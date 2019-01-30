<?php

use yii\helpers\Url;
use common\Cms;

?>

<header class="index1_header">
    <a href="<?php echo Url::to(['wap/site/index'])?>" class="index1_logo"><img src="<?=$global['logo_img']?>" alt=""></a>
    <div class="header_txt">
        <p class="h_p_01"><?=$global['title']?></p>
        <p class="h_p_02"><?=$global['sub_title']?></p>
    </div>
    <a href="https://www.douyin.com/share/user/82414995141/?share_type=link" class="douyin" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>4.0/m/images/douyin_btn.png" alt=""></a>
     <a class="menu fr" href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/img/nav.png" title="" alt=""></a>
     
<ul class="menu_nav">
    <li>
        <a href="/">官网首页</a>
    </li>
    <li>
        <a href="<?php echo Url::to(['wap/article/index'])?>">新闻资讯</a>
    </li>
    <!-- <li>
        <a href="<?php echo Url::to(['wap/article/data', 'id' => 117])?>">玩法资料</a>
    </li> -->
   <li>
        <a href='http://sm.yingxiong.com/gl_wiki.html' target="_blank">游戏攻略</a>
    </li>
    <li>
        <a href="/m/ych/list_658_1.html">油菜花社区</a>
    </li>
    <li>
        <a href="http://forumsm.yingxiong.com/">官方论坛</a>
    </li>
</ul>
</header>
<script type="text/javascript">
    $(function() {
        var clickNumber = 1;
        $(".menu").click(function() {
            if(clickNumber % 2 !== 0) {
                $(this).children("img").attr("src", "<?php echo STATIC_DOMAIN ?>3.0/m/img/nav_close.png");
                $(this).siblings(".menu_nav").slideDown();
            } else {
                $(this).children("img").attr("src", "<?php echo STATIC_DOMAIN ?>3.0/m/img/nav.png");
                $(this).siblings(".menu_nav").slideUp();
            }
            clickNumber++;
        });

    })
</script>