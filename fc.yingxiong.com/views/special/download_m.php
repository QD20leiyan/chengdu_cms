<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS):$this->web_keywords?>" >
    <meta name="Description" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION):$this->web_description?>" >
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <link href="//cdnstatic.yingxiong.com/yqlfc/2.0/common/css/common.min.css" rel="stylesheet"/>
    <link href="//cdnstatic.yingxiong.com/yqlfc/2.0/m/css/css.css" rel="stylesheet"/>
    <script src="//cdnstatic.yingxiong.com/yqlfc/2.0/common/js/jquery-1.11.2.min.js"></script>
</head>
<body>
<div class="container-download">
    <div class="download-con">
        <a class="download-con-bg"><img src="http://cdnstatic.yingxiong.com/yqlfc/2.0/m/images/download-bg.jpg" alt=""/></a>
        <a href="https://downurl.yingxiong.com/ios/fc_pcgw.html" class="download-btn">
            <img src="http://cdnstatic.yingxiong.com/yqlfc/2.0/m/images/download-play.png" alt=""/>
        </a>
        <p>天津英雄互娱科技有限公司  版权所有</p>
    </div>
</div>
<script type="text/javascript" src="//cdnstatic.yingxiong.com/yqlfc/2.0/m/js/jquery.fittext.js"></script>
<script>
    getData();
    function getData() {
        var url = window.location.href;
        var id = url.substr(url.indexOf("=") + 1, url.length - 1);
        var info = new Array()
        info[1] = "https://lnk0.com/xZNlwl";
        info[2] = "https://lnk0.com/1YxFl8";
        info[3] = "https://lnk0.com/IVBRV1";
        info[4] = "https://lnk0.com/VxR1Y1";
        info[5] = "https://lnk0.com/ARVlw5";
        info[6] = "https://lnk0.com/dIhQpk";
        info[7] = "https://lnk0.com/BFtwNh";
        info[8] = "https://lnk0.com/h0IVh0";
        info[9] = "https://lnk0.com/1sUx5s";
        info[10] = "https://lnk0.com/dE94Y9";
        info[11] = "https://lnk0.com/FNdc40";
        info[12] = "https://lnk0.com/EdgIxt";
        info[13] = "https://lnk0.com/sENRxh";
        info[14] = "https://lnk0.com/kgQNls";
        info[15] = "https://lnk0.com/cMhwJ5";
        info[16] = "https://lnk0.com/Vho8ss";
        info[17] = "https://lnk0.com/Ft8QJl";
        info[18] = "https://lnk0.com/kgYtMp";
        info[19] = "https://lnk0.com/50s0ck";
        info[20] = "https://lnk0.com/gQFtIt";
        info[21] = "https://lnk0.com/BhIZ1s";
        info[22] = "https://lnk0.com/IZF9kk";
        info[23] = "https://lnk0.com/RNJBR1";
        info[24] = "https://lnk0.com/cEp0Y1";
        info[25] = "https://lnk0.com/cQZh8k";
        info[26] = "https://lnk0.com/okcUF5";
        info[27] = "https://lnk0.com/94wN5k";
        $('.download-btn').attr('href',info[id]);
    }
</script>
<script>
    $('html').fitText(2);
</script>

</body>
</html>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget();?>
