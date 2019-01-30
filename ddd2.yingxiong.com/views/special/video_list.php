<?php
use yii\helpers\Url;
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title><?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>" >
    <meta name="Description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>" >
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/common/css/common.css?<?= VERSION?>">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/css/style.css?<?= VERSION?>">
    <script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m/";
        }
    </script>
</head>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/common/css/common.css?<?= VERSION?>">
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/css/style.css?<?= VERSION?>">
<script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
    <body>
        <div class="t-bg">
        </div>
        <div class="tbg-1">
            <div class="v-1">
               
                <div class="header">
                   <div class="v-2">
                       <span><i></i>视频中心</span>
                       <p>你的位置：<a href="<?php echo Url::to(['special/index'])?>">首页</a> > 视频中心 > 视频</p>
                   </div>
                 </div>
                <div class="content" id='list'>
                    <ul class="v-2 clearfix">
                        <?php foreach($list as $k => $v) { ?>
                            <?php if ($k%3 == 0) { echo '<div>';} ?>
                            
                                <li class="js_video_play" data-url='<?php echo $v->contentMessage; ?>'>
                                    <a href="javascript:">
                                        <i></i>
                                        <img src="<?php echo $v['thumb']; ?>">
                                    </a>
                                    <span><i></i><?php echo $v['title'] ?></span>
                                    <p><?php echo $v['summary']?></p>
                                </li>
                            <?php if ($k%3 == 2) { echo '</div>';} ?>
                        <?php } ?>
                        
                    </ul>
                </div>
            </div>
            <div class="vv"></div>
        </div>
    </body>
    
<script>
    $(function(){
//       $("#list li").click(function(){
//            var rel = $(this).attr('data-url');
//            $('#player5 .videos').html('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+rel+'&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>');
//            $(".video_mask").show();
//        })
//        $("#close").click(function(){
//            $(".video_mask").hide();
//        })
    });
</script>

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js"></script>
<!--<div id="video_mask" class="video_mask" style="display: none;">-->
<!--    <div class="w man10 both OF none"></div>-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos">-->
<!--            <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="uu=58546ec681&vu=d36a4ff707&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery_extend.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN?>1.0/js/js.js?<?= VERSION?>"></script>
<div style="display:none">
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?e896a013f613cc56bef66f4d4f67c5ff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258207346'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1258207346%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
</div>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
