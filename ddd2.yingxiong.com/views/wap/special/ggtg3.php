<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="copyright" content="">
    <meta name="author" content="">
    <title></title>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN;?>1.0/common/css/common.css?<?= VERSION?>">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN;?>1.0/common/css/swiper-3.3.1.min.css?<?= VERSION?>">

    <link rel="stylesheet" type="text/css" href="<?php echo STATIC_DOMAIN;?>1.0/m/css/style.css?<?= VERSION?>">
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
<div class="land-container landlove">
    <header class="header" id="header">
        <div class="header-wrap">
            <div>
                <a href="javascript:;"><img src="<?php echo STATIC_DOMAIN;?>1.0/m/images/landpage-icon.png" alt="" class="land-icon"></a>
                <div class="icon-msg">
                    <h5>萌宠宝贝们在求抚摸</h5>
                    <p>快来这里做迷妹欧巴！</p>
                </div>
            </div>
            <div>
                <a href="javascript:;" class="js_wap_down"><span class="land-download"></span></a>
            </div>
        </div>
    </header>
</div>
<script src="<?php echo STATIC_DOMAIN;?>1.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN;?>1.0/common/js/swiper-3.3.1.jquery.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN;?>1.0/m/js/jquery.fittext.js?<?= VERSION?>"></script>
<script >
    $(function () {
        $('html').fitText(2);
    });
</script>
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
</body>
</html>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>