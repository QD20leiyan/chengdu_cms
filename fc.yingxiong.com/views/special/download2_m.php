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
			<a class="download-con-bg"><img src="http://cdnstatic.yingxiong.com/yqlfc/2.0/m/images/download-bg2.jpg" alt=""/></a>
			<a href="https://downurl.yingxiong.com/ios/fc_pcgw.html" class="download-btn">
				<img src="http://cdnstatic.yingxiong.com/yqlfc/2.0/m/images/download-play.png" alt=""/>
			</a>
		</div>
	</div>
	<script>
		$('html').fitText(2);
	</script>
</body>
</html>