<?php

use common\Cms;
use common\helpers\Utils;
use yii\helpers\Url;
use yii\httpclient\UrlEncodedFormatter;

$nav = isset($nav) ? $nav : 'index';


?>

    <ul class="i_h_nav">
        <li class="active index">
            <a href="<?php echo Url::to(['site/index']) ?>">
                官网首页
                <span>
                            Home
                        </span>
            </a>
        </li>
        <li class="video">
            <a href="<?php echo Url::to(['video/index'])?>">
                视频中心
                <span>
                            Video
                        </span>
            </a>
        </li>
        <li class="article">
            <a href="<?php echo Url::to(['article/index'])?>">
                新闻资讯
                <span>
                            New
                        </span>
            </a>
        </li>
        <li class="i_logo">
        </li>
        <li class="gonglue">
            <a href="javascript:alert('敬请期待')">
                游戏攻略
                <span>
                            Raiders
                        </span>
            </a>
        </li>
        <li class="data">
            <a href="javascript:alert('敬请期待')">
                生涯数据
                <span>
                            Data
                        </span>
            </a>
        </li>
        <li class="no_margin judao" id="i_gfqd">
            <a href="javascript:;">
                官方渠道
                <span>
                            Channel
                        </span>
            </a>
        </li>
    </ul>
    <div class="i_h_ginf">
        <div>
            <ul>
                <li class="no_margin_left">
                    <a href="javascript:alert('敬请期待！')" target="_blank">
                    <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_gflt.png?<?= VERSION?>">
                    <span>
                                官方论坛
                            </span>

                    </a>
                </li>
                <li>
                    <a href="https://tieba.baidu.com/f?kw=%D5%BD%D5%F9%D2%D5%CA%F5%B3%E0%B3%B1&fr=ala0&tpl=5" target="_blank">
                    <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_tb.png?<?= VERSION?>">
                    <span>
                                百度贴吧
                            </span>
                    </a>
                </li>
                <li>
                    <a href="http://weibo.com/u/6077032310?refer_flag=1001030103_&is_hot=1" target="_blank">
                    <div>
                        <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_wb_ewm.jpg?{$smarty.const.VERSION}">

                    </div>
                    <span>
                                官方微博
                            </span>
                    </a>
                </li>
                <li class="no_margin_right no_border">
                    <div>
                        <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_wx_ewm.jpg?{$smarty.const.VERSION}">

                    </div>
                    <span>
                                官方微信
                            </span>
                </li>
            </ul>
            <div class="i_h_qq">
                <span>
                        146694202（1群)
                    </span>
                <span class="i_h_qq_right">
                        487592092（2群)
                    </span>
                <p>
                    官方Q群
                </p>
            </div>
            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_icon2.png?<?= VERSION?>">
        </div>
    </div>

<script>
    $(function(){
        var nav = "<?php echo $nav?>";
        $('.i_h_nav li').removeClass('active');
        $('.i_h_nav li.'+nav).addClass('active');
    });

</script>

