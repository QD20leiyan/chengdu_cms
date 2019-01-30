<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>一起来冒险</title>
    <link rel="stylesheet" href="{$smarty.const.STATIC_DOMAIN}1.0/common/css/common.min.css" />
    <link rel="stylesheet" href="{$smarty.const.STATIC_DOMAIN}1.0/common/css/swiper.3.1.7.min.css" />
    <link rel="stylesheet" href="{$smarty.const.STATIC_DOMAIN}1.0/css/style.css" />
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m"+window.location.pathname+window.location.search;
        }
    </script>
    <script type="text/javascript" src="{$smarty.const.STATIC_DOMAIN}1.0/common/js/jquery-1.11.2.min.js"></script>
</head>
<body>
	<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.min.js"></script>
		<link rel="stylesheet" href="http://cdnstatic.yingxiong.com/head/css/head.css">
		<div class="main_body">
			<!--顶部导航-->
			<div class="nav_top">
				<div class="nav">
					<div class="logo"><img src="{$smarty.const.STATIC_DOMAIN}1.0/images/logo.png" title="一起来冒险" alt="" /></div>
					<div class="title">
						<p>一起来冒险</p>
						<p class="game">游戏定位游戏定位</p>
						<p class="game_js">游戏介绍</p>
					</div>
					<ul>
						<li>
							<div class="a_bg active">
								<a target="_blank" href="{myurl name="site/index"}">首页
									<p>HOME</p>
								</a>
							</div>
						</li>
						<li>
							<div class="a_bg">
								<a target="_blank" href="{myurl name="article/index"}">资讯
									<p>NEWS</p>
								</a>
							</div>
						</li>
						<li>
							<div class="a_bg">
								<a target="_blank" href="javascript:;">攻略
									<p>STRATEGY</p>
								</a>
							</div>
						</li>
						<li>
							<div class="a_bg">
								<a target="_blank" href="javascript:;">社区
									<p>COMMMUNITY</p>
								</a>
							</div>
						</li>
					</ul>
					<div class="fx_bg">
						<div class="fx_content">
							<a href="javascript:;"><i>微信</i></a>
							<em></em>
							<a target="_blank" class="qq" href="javascript:;"><i>QQ</i></a>
							<em class="second_em"></em>
							<a target="_blank" class="baidu" href="javascript:;"><i>百度</i></a>
						</div>
					</div>
				</div>
			</div>
