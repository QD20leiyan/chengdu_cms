<?php

use common\Cms;
use yii\helpers\Url;

$nav = isset($nav) ? $nav : 'index';
?>

<div class="top_common">
    <ul>
        <li class="on index">
            <a href="<?php echo Url::to(['site/index'])?>">官网首页</a>
        </li>
        <li class="zhixun">
            <a href="<?php echo Cms::getUrl('article/list', ['id' => 69]);?>">游戏资讯</a>
        </li>
        <li class="zhiliao">
            <a href="<?php echo Cms::getUrl('article/list', ['id' => 69]);?>">游戏资料</a>
        </li>
        <li class="in_logo">
            <a href="javascript:void(0)"><img src="<?php echo STATIC_DOMAIN ?>2.0/common/images/t_logo.png"></a>
        </li>
        <li class="gonglue">
            <a href="<?php echo Cms::getUrl('article/list', ['id' => 74]);?>">游戏攻略</a>
        </li>
        <li>
            <a href="http://bbs.yingxiong.com/t/pc/36" target="_blank">游戏论坛</a>
        </li>
    </ul>
</div>

<script>
    $(function(){
        $('.top_common ul li').removeClass('on');
        $('.top_common ul li.<?php echo $nav?>').addClass('on');
    })

</script>
