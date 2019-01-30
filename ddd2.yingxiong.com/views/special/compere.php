<!doctype html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
    <title>弹弹岛2—星主播招募开启</title>
    <meta name="Keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>" >
    <meta name="Description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>" >
	<meta http-equiv="X-UA-Compatible" content="chrome=1,IE=edge">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<link rel="SHORTCUT ICON" href="favicon.ico">
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/common/css/common.css?<?= VERSION?>">
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/common/css/jquery.mCustomScrollbar.min.css?<?= VERSION?>">
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/css/style.css?<?= VERSION?>">
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
	<div class="i_wrap commper">
		<div class="compere-con">
			<div class="d_video_box">
				<a href="http://ddd2.yingxiong.com/index.html" class="logo"><img src="<?php echo STATIC_DOMAIN?>1.0/images/c_logo.png?<?= VERSION?>" alt="img" /></a>
				<div class="d_v_btnbox">
					<div class="d_v_a">
                        <?php foreach($link as $k=>$v){ ?>
                            <?php if($k == 0){ ?>
                                <a target="_blank" href="<?php echo $v['url'] ?>" class="a_mar10"></a>
                                <a target="_blank" href="<?php echo $v['url'] ?>" class="a_marleft2"></a>
                                <a target="_blank" href="<?php echo $v['url'] ?>" class="a_mar10"></a>
                                <a target="_blank" href="<?php echo $v['url'] ?>"></a>
                            <?php } ?>
                        <?php } ?>
					</div>
					<a href="javascript:" class="a_bm"></a>
					<div class="d_v_main d_v_main01">
						<img class="til" src="<?php echo STATIC_DOMAIN?>1.0/images/d_v_til01.png?<?= VERSION?>" alt="til01" />
						<div class="d_v_m1">
							<div class="d_m1_img fl">
                                <a href="http://www.huajiao.com/l/44062047" target="_blank"><img src="<?php echo STATIC_DOMAIN?>1.0/images/xuziwei.jpg?<?= VERSION?>" alt="img" /></a>
								<div class="in_embed">
                                </div>
							</div>
							<div class="d_v_list fl">
								<div class="dv_list_right">
									<div class="n_4m">
                                        <?php foreach($compere_live_vedio as $v){ ?>
										<div class="item">
											<a target="_blank" class="first_a" href="<?php echo $v['url'] ?>">
												<img src="<?php echo $v['thumb'] ?>" alt="img" />
												<p class="p_botil"><?php echo $v['title'] ?></p>
											</a>
										</div>
                                        <?php } ?>
                                        <?php foreach($compere_vedio as $v){ ?>
                                            <div class="item">
                                                <a class="first_a" href="javascript:;" rel="<?php echo $v['url'] ?>">
                                                    <img src="<?php echo $v['thumb'] ?>" alt="img" />
                                                    <p class="p_botil"><?php echo $v['title'] ?></p>
                                                </a>
                                            </div>
                                        <?php } ?>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="d_v_main">
						<img class="til" src="<?php echo STATIC_DOMAIN?>1.0/images/d_v_til02.png?<?= VERSION?>" alt="til02" />
						<div class="d_v_m2">
							<a class="prev" href="javascript:">pre</a>
							<div class="c_w1_m">
								<ul>
                                    <?php foreach($compere as $k=>$v){ ?>
                                        <li>
                                            <a href="javascript:">
                                                <div class="li_img fur">
                                                    <img src="<?php echo $v['thumb'] ?>">
                                                </div>
                                                <?php if($v['url']  != ''){ ?>
                                                <div class="li_img fur">
                                                    <img src="<?php echo $v['url'] ?>">
                                                </div>
                                                <?php }else{ ?>
                                                    <div class="li_img fur">
                                                        <img src="<?php echo STATIC_DOMAIN?>1.0/images/zhubo.jpg?<?= VERSION?>">
                                                    </div>
                                                <?php } ?>
                                            </a>
                                        </li>
                                    <?php } ?>
								</ul>
							</div>
							<a class="next" href="javascript:">next</a>
						</div>
					</div>
					<div class="d_v_main">
						<img class="til" src="<?php echo STATIC_DOMAIN?>1.0/images/d_v_til03.png?<?= VERSION?>" alt="til03" />
						<div class="d_v_m3">
							<div class="m4-lb">
								<div class="m4-box">
									<div class="m4-inner clearfix">
										<div class="m4-demo1 fl clearfix">
                                            <?php foreach($zb_partner as $k=>$v){ ?>
                                                <div class="m4-item fl">
                                                    <a target="_blank" href="<?php echo $v['url'] ?>"><img src="<?php echo $v['thumb'] ?>" alt=""></a>
                                                </div>
                                            <?php } ?>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p class="tip">本次活动可以在以上任意平台进行直播，官方不对平台做限制，您可根据自身喜欢自由选择，《弹弹岛2》将给您最大的曝光与支持</p>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="i-footer">
				<div class="i-fotcon">
					<div class="i-fot-logo">
						<img src="<?php echo STATIC_DOMAIN?>1.0/common/images/i-fot-logo.png?<?= VERSION?>" alt="">
					</div>
					<div class="i-fot-text">
						<p>文网游备字〔2016〕Ｍ-CSG 0339 号</p>
						<p>版权所有：北京卓越晨星科技有限公司 联系方式：010-50948585</p>
						<p>COPYRIGHT©2015 – 2015 . ALL RIGHTS RESERVED. 京ICP备15026730号-2</p>
						<p><a target="_blank" class="game-ico" href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08c53cc2ed60153d10b447e08d8"><img src="<?php echo STATIC_DOMAIN?>1.0/common/images/game-ico.png" alt=""></a><a target="_blank" href="http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393"><img src="<?php echo STATIC_DOMAIN?>1.0/common/images/www-ico.png" alt=""></a>《网络文化经营许可证》京网文[2015]0629-259号</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="dv_mask"></div>
	<div class="d_vtck">
		<a href="javascript:" class="dv_close"></a>
		<p>只要你有稳定的网络环境，并且热爱《弹弹岛2》、愿意去展现你的热情，分享你的快乐！就点击下方的【下载报名表】按钮，下载并填写《弹弹岛2》星主播报名表，添加官方工作人员 QQ：2724507041 或将填写好的报名表发送至<a>2724507041@qq.com</a>。审核通过后，我们会有相关负责人与你取得联系。现支持所有直播平台，你可以自由选择任意平台进行直播。只要你来参与，你都将得到《弹弹岛2》最大限度的支持。<br/>注意事项：为了保证审核后我们可以及时与你取得联系，填写时请务必保证资料的准确性。 你的资料将被《弹弹岛2》官方严格保密，并仅用于明星主播的筛选。 我们的工作人员，不会以任何形式想你索要身份证号、游戏账号密码等私密信息。</p>
		<a href="http://cdnstatic.yingxiong.com/download/dandandao2.xlsx" class="dv_btn"></a>
	</div>
	<script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
	<script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery.mCustomScrollbar.concat.min.js?<?= VERSION?>"></script>
	<script src="<?php echo STATIC_DOMAIN?>1.0/js/zb_v.js?<?= VERSION?>"></script>
	<script src="<?php echo STATIC_DOMAIN?>1.0/js/js.js?<?= VERSION?>"></script>
	<script>
		$(function(){
			$(".n_4m").mCustomScrollbar({});
		})
	</script>
</body>
</html>
