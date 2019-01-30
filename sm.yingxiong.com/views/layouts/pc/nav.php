<?php

use yii\helpers\Url;
use common\Cms;

$nav = isset($nav) ? $nav : 'index';
?>

<div class="nav">
    <div class="nav_top">  	
        <a class="nav_logo fl" href="javascript:;"><img src="<?=$global['logo_img']?>" title="" alt="" /></a>
        <div class="logo_txt fl">
            <p class="p_01"><?=$global['title']?></p>
            <p class="p_02"><?=$global['sub_title']?></p>
        </div>
        <div class="js_nav link fr">
            <ul>
                <li class="active js_nav_index">
                    <a href="/">官网首页<i>HOME</i></a>
                </li>
                <li class="js_nav_news">
                    <a target="_blank" href="<?php echo Cms::getUrl('article/list', ['id' => 64])?>">新闻资讯<i>NEWS</i></a>
                </li>
                <!-- <li class="js_nav_marteria">
                    <a target="_blank" href="<?php echo Url::to(['/article/data'])?>">玩法资料<i>DATA</i></a>
                </li> -->
                <li class="js_nav_gonglue">
                    <a target="_blank" href="http://sm.yingxiong.com/gl_wiki.html" target="_blank">游戏攻略<i>RAIDERS</i></a>
                </li>
				<li>
					<a target="_blank" href='/ych/list_658_1.html'>油菜花社区<i>COMMUNITY</i></a>
				</li>
                <li>
                    <a target="_blank" href="http://forumsm.yingxiong.com/">官方论坛<i>FORUM</i></a>
                </li>
                <li class="kun">
                    <a target="_blank" href="<?php echo Url::to(['/special/kun-plan']);?>"><img src="<?php echo STATIC_DOMAIN; ?>3.0/images/mav_entry.png" /></a>
                    <p class="ent-max">
                        <a target="_blank" href="<?php echo Url::to(['/special/kun-plan']);?>" class="ent-img"><img src="<?php echo STATIC_DOMAIN; ?>3.0/images/ent_max.png"></a>
                        <img src="<?php echo STATIC_DOMAIN; ?>3.0/images/del.png" class="del">
                    </p>
                </li>
            </ul>
        </div>
    </div>
</div>

<script>
    var nav = '<?php echo $nav?>';
    $(function(){
        $('.js_nav ul li').removeClass('active');
        $('.js_nav ul li.js_nav_'+nav).addClass('active');

    })
$(".kun img").hover(function(){
        $(".ent-max").show();
    },function(){
        $(".ent-max").hide();
    });
    $(".del").click(function(){
        $(".ent-max").hide();
    })
    $(window).scroll(function() { $t = $(this).scrollTop();
            if($t > 0) {
                $(".nav").css({
                    top: "0",
                    position: 'fixed',
                    zIndex: "98"
                });
            } else {
                $(".nav").css({
                    top: "42px",
                    position: 'fixed',
                    zIndex: "98"
                });
            }
        });

</script>