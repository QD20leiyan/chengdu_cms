<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title><?php echo $this->seo_title;?></title>
    <meta  name="Keywords" content="<?php echo $this->seo_key;?>">
    <meta  name="Description" content="<?php echo $this->seo_des;?>">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link rel="shortcut icon" href="<?php echo STATIC_DOMAIN;?>images/favicon.ico" />
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN;?>common/css/common.css">
	<link href="<?php echo STATIC_DOMAIN;?>css/css.css" rel="stylesheet"/>
</head>
<body>
	<div class="yhAll">
        <?php $this->renderPartial('//layouts/v2/nav',array('nid'=>3)); ?>
		<div class="movieCon">
			<h1>游戏影画</h1>
            <?php foreach($yh->getData() as $v){ ?>
                <dl class="movieDl">
                    <dt>
                        <a href="#">
                            <img src="<?php echo $v['image_url'] ?>" alt="">
                        </a>
                    </dt>
                    <dd>
                        <a href="<?php echo $v['link_url'] ?>" class="title"><span class="span1"><?php echo $v['title'] ?></span><span class="span2">发布日期：<?php echo date('Y-m-d',$v['add_time']) ?></span></a>
                        <a href="#" class="text"><?php echo $v['summary'] ?></a>
                    </dd>
                </dl>
			<?php } ?>
			<div class="page">
				<div class="number">
					<ul id="yw0" class="pagination">
                        <?php $this->widget('CLinkPager', Page::go($yh->getPagination())) ?>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="if_bot_wrap">
		<div id="if-copyRight">
			<p class="if-copyRight-p">
			<span class="if-copyRight-p1">
			<a href="javascript:;" target="_blank"><img src="<?php echo STATIC_DOMAIN;?>common/images/i-fot-logo.png" alt="1"></a>
			</span>
			<span class="if-copyRight-p2">
			文网游备字〔2016〕Ｍ-CSG 0339 号  版权所有：北京卓越晨星科技有限公司 联系方式：010-50948585<br>
			COPYRIGHT©2015 – 2015 . ALL RIGHTS RESERVED. 京ICP备15026730号-2<br>
			<a target="_blank" href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393" class="www-ico"><img src="./common/images/www-ico.png" alt=""></a>
			<a target="_blank" href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08c53cc2ed60153cfbc3e1203cd" class="game-ico"><img src="./common/images/game-ico.png" alt=""></a>
				《网络文化经营许可证》京网文[2015]0629-259号
			</span>
			</p>
		</div>
	</div>
    <?php $this->renderPartial("//common/downloadjs");?>
    <?php $this->renderPartial("//common/tongji");?>
</body>
</html>