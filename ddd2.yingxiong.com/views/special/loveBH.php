<?php

use yii\helpers\Url;

$this->title = '弹弹岛2白色情人专题页 弹弹岛2官方网站_新一代休闲弹射竞技手游_英雄互娱';
$this->keywords = '弹弹岛2白色情人节、白色情人节、3.14、弹弹岛2 3.14、弹弹岛2情人节、纯白盛宴、百合网、百合';
$this->description = '弹弹岛2白色情人专题页。白色情人节，有爱不孤单~《弹弹岛2》白色情人节全新时装浪漫来袭，更与婚恋全产业链领导者百合网珠联璧合，全新玩法强势来袭，制霸竞技场不再是梦！';

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=1, user-scalable=no">
	<title><?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->keywords? $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS) :$this->keywords;?>" >
    <meta name="Description" content="<?php  echo !$this->description? $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION) : $this->description;?>" >
	<link rel="SHORTCUT ICON" href="favicon.ico">
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/common/css/common.css?<?= VERSION?>">
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>2.0/css/style1.css?<?= VERSION?>">
	<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>" ></script>
	<script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/special/loveBH_m";
        }
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?e896a013f613cc56bef66f4d4f67c5ff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>
<body>
<div class="Valentine">
    <div class="Valentine_page1">
        <div class="Valentine_page1_main">
            <a href="<?php echo Url::to(['site/index']) ?>" class="Valentine_back"></a>
            <a href="<?php echo Url::to(['site/index']) ?>" class="Valentine_logo"><img src="<?php echo STATIC_DOMAIN?>2.0/images/ddd_logo_valentine.png?<?= VERSION?>" alt=""></a>
        </div>
    </div>
    <div class="Valentine_page2">
        <div class="Valentine_video">
            <i class="video_i js_video_play" data-url="uu=58546ec681&vu=a9cf3e4add"></i>
        </div>
    </div>
    <div class="Valentine_fixed">
        <img src="http://image.yingxiong.com/qrcode/jump_ddd2_bhw.png" alt="" class="Valentine_ewm">
        <a href="https://lnk0.com/w9Ml08" class="Valentine_ios"><img src="<?php echo STATIC_DOMAIN?>2.0/images/Valentine_ios.png" alt=""></a>
        <a href="http://cdn.yingxiong.com/ddd2/ddd2-bhw-P32618A-0303.apk" class="Valentine_android"><img src="<?php echo STATIC_DOMAIN?>2.0/images/Valentine_android.png?<?= VERSION?>" alt=""></a>
        <a href=""></a>
    </div>
</div>
<!--<div id="video_mask" class="video_mask" style="display: none;">-->
<!--    <div class="w man10 both OF none"></div>-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos">-->
<!--            <embed width="696" height="358" allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash" src="images/player.swf" pluginspage="http://www.adobe.com/go/getflashplayer" flashvars="vcastr_file=http://ca.yingxiong.com/wap/themes/wap312/images/video.mp4&amp;IsAutoPlay=0&amp;width=570&amp;height=300&amp;DefaultVolume=100">-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<div class="HERO-copyRight Valentine_HERO-copyRight">
    <div class="HERO-copyRight-wrap h-cb">
        <a class="hero-logo" href="http://www.yingxiong.com"></a>
        <div class="HERO-copyRight-footer">
            <p>文网游备字〔2016〕Ｍ-CSG 0339 号</p>
            <p>版权所有：北京卓越晨星科技有限公司 联系方式：010-50948585</p>
            <p>COPYRIGHT©2015 – 2016 . ALL RIGHTS RESERVED.&nbsp;京ICP备15026730号-2</p>
            <p class="footer_last">
                <i>
                    <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08c53cc2ed60153d10b447e08d8" class="game_icon"></a>
                    <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393" class="www_icon"></a>
                </i>
                《网络文化经营许可证》<a href="http://img02.yingxiong.com/M00/00/1D/CsggAlYqD3GEGHRYAAAAAF5auqs487.jpg" target="_blank">京网文[2015]0629-259号</a>
            </p>
        </div>
    </div>
</div>
<script>
//    $(".video_i").click(function(){
//        var link_url = $(this).attr('rel');
//        $(".videos").html('');
//        $('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="1280" height="720" align="middle" allowScriptAccess="always" flashvars="uu=58546ec681&vu=a9cf3e4add&auto_play=1&gpcflag=1&width=1280&height=720" type="application/x-shockwave-flash"></embed>');
//        $(".video_mask").show();
//    })
//    $("#close").click(function(){
//        $(".video_mask").hide();
//    })
</script>
<!--    --><?php //$this->renderPartial("//common/download_js");?>

    <div style="display:none">
        <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258207346'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1258207346%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
    </div>
</body>
</html>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
