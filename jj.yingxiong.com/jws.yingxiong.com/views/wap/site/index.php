<?php
use common\Cms;
?>
<style>
    body{ font-size: 32px;}
</style>
<?php echo $this->render('@app/views/layouts/wap/header.php')?>
<link rel="stylesheet" href="<?php echo STATIC_DOM;?>4.0/m/css/swiper.min.css?<?= VERSION?>" />
<link rel="stylesheet" href="<?php echo STATIC_DOM;?>4.0/m/css/animate.min.css?<?= VERSION?>" />
<script type="text/javascript" src="<?php echo STATIC_DOM;?>4.0/m/js/swiper.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOM;?>4.0/m/js/index.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOM;?>4.0/m/js/swiper.animate1.0.2.min.js?<?= VERSION?>"></script>
<body>
<section class="m-kv marginT80">
    <?php foreach($cover_video as $k=>$v){?>
        <?php if($k == 0){ ?>
            <span class="m-video video-item-1 js_video_play" data-url="<?= $v['url'];?>">
			<img src="<?php echo STATIC_DOM;?>4.0/m/images/play.png" alt="视频">
			</span>
        <?php } ?>
    <?php } ?>
    <section class="m-sec2">
        <div class="sec2-box">
            <div class="sec2-slider" id="sec2-slider">
                <div class="hd">
                    <ul>
                        <?php foreach($wap_banner as $k=> $v){?>
                            <li class="<?php if($k==0){?>on<?php }?>"><?php echo $k+1?></li>
                        <?php } ?>
                    </ul>
                </div>
                <div class="bd">
                    <div class="tempWrap" style="overflow:hidden; position:relative;">
                        <ul style="width: 1998px; position: relative; overflow: hidden; padding: 0px; margin: 0px; transition-duration: 200ms; transform: translate(-666px, 0px) translateZ(0px);">
                            <?php foreach($wap_banner as $v){ ?>
                                <li style="display: table-cell; vertical-align: top; width: 333px;">
                                    <a href="<?= $v['url'];?>" target="_blank">
                                        <img class="images" src="<?php echo $v['thumb'] ?>" alt="<?= $v['title'];?>">
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="sec2-tab">
                <div class="hd">
							<span class="on">
						<i>综合</i>
					</span>
                    <span>
						<i>新闻</i>
					</span>
                    <span>
						<i>公告</i>
					</span>
                    <span>
						<i>活动</i>
					</span>
                    <span>
						<i>攻略</i>
					</span>
                    <span>
						<i>风云</i>
					</span>

                </div>
                <div class="bd">
                    <ul style="display:block">
                        <?php foreach($news['zx'] as $v){?>
                            <li>
                                <a href="<?=$v['wapLinkUrl'];?>">
                                    【<?= $v['categoryName']; ?>】<?php echo mb_substr($v['title'],0,16,'utf-8') ?> <span><?php echo date('m-d',$v['created_at']) ?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <ul>
                        <?php foreach($news['xw'] as $v){ ?>
                            <li>
                                <a href="<?=$v['wapLinkUrl'];?>">
                                    【<?= $v['categoryName']; ?>】<?php echo mb_substr($v['title'],0,16,'utf-8') ?> <span><?php echo date('m-d',$v['created_at']) ?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <ul>
                        <?php foreach($news['gg'] as $v){ ?>
                            <li>
                                <a href="<?=$v['wapLinkUrl'];?>">
                                    【<?= $v['categoryName']; ?>】<?php echo mb_substr($v['title'],0,16,'utf-8') ?> <span><?php echo date('m-d',$v['created_at']) ?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <ul>
                        <?php foreach($news['hd'] as $v){ ?>
                            <li>
                                <a href="<?=$v['wapLinkUrl'];?>">
                                    【<?= $v['categoryName']; ?>】<?php echo mb_substr($v['title'],0,16,'utf-8') ?> <span><?php echo date('m-d',$v['created_at']) ?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <ul>
                        <?php foreach($news['gl'] as $v){ ?>
                            <li>
                                <a href="<?=$v['wapLinkUrl'];?>">
                                    【<?= $v['categoryName']; ?>】<?php echo mb_substr($v['title'],0,16,'utf-8') ?> <span><?php echo date('m-d',$v['created_at']) ?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <ul>
                        <?php foreach($news['fy'] as $v){ ?>
                            <li>
                                <a href="<?=$v['wapLinkUrl'];?>">
                                    【<?= $v['categoryName']; ?>】<?php echo mb_substr($v['title'],0,16,'utf-8') ?> <span><?php echo date('m-d',$v['created_at']) ?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
                <p class="check_more">
                    <a href="<?php echo Cms::getUrl('wap/list',array('cid'=>\Yii::$app->params['ZONGHE'],'cat_dir'=>'zixun'));?>">查看更多</a>
                </p>
            </div>
        </div>
    </section>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <?php foreach($imageText as $k=>$v):?>
                <div class="swiper-slide">
                    <a href="<?php echo $v['url']?>">
                    <img src="<?php echo $v['thumb']?>" height="16.25rem"  />
                   <!-- <p><?php /*echo $v['title']*/?></p>-->
                    </a>
                </div>
            <?php endforeach;?>
        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    <div class="bg_last">
        <div class="bg_rw">
            <img class="renwu renwu-active" src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_sj_peo_h.png?<?= VERSION?>" title="" alt="" num="0">
            <img class="renwu01" src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_ht_peo_h.png?<?= VERSION?>" title="" alt="" num="1">
            <img class="renwu02" src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_zhj_peo_h.png?<?= VERSION?>" title="" alt="" num="2">
            <img class="renwu03" src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_dw_peo_h.png?<?= VERSION?>" title="" alt="" num="3">
            <ul class="renwu_1 right1" style="display: block;">
                <li>
                    <span><img src="<?php echo STATIC_DOM; ?>4.0/m/images/wj_sj_name.png?<?= VERSION?>" title="" alt=""></span>
                </li>
                <li>
                    <img src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_sj_img.png?<?= VERSION?>" title="" alt="">
                </li>
                <li>
                    <p>谁道江南少将才？明星夜夜照文台。昔破虏雄才，将陨岘山；今魂系江东，百战归来！江东孙家的早期家主、吴国第二名红将——孙坚，率领孙家子弟，角逐三国舞台！有着破虏之名的孙坚，挥刀间刚猛无俦，大开大合，更能借幽冥之力，对大范围敌人进行控制、杀伤。是纵横疆场、破敌于指尖的上将之选。
                    </p>
                </li>
            </ul>
            <ul class="renwu_2 right1">
                <li>
                    <span><img src="<?php echo STATIC_DOM; ?>4.0/m/images/wj_ht_name.png?<?= VERSION?>" title="" alt=""></span>
                </li>
                <li>
                    <img src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_ht_img.png?<?= VERSION?>" title="" alt="">
                </li>
                <li>
                    <p>执一柄剑，携一壶酒，在这乱世的舞台中看尽生死，青囊济世。<br />继吕布后，群雄势力的第二名红将——华佗，终于登场！华佗早年曾游学徐土，仗剑纵横战场的他，不但擅长聚怪群攻，更有着不负神医之名的恢复能力，为团队生存提供有力保障。带给你一个不同以往印象的青年神医！
                    </p>
                </li>
            </ul>
            <ul class="renwu_3 right1">
                <li>
                    <span><img src="<?php echo STATIC_DOM; ?>4.0/m/images/wj_zhj_name.png?<?= VERSION?>" title="" alt=""></span>
                </li>
                <li>
                    <img src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_zhj_img.png?<?= VERSION?>" title="" alt="">
                </li>
                <li>
                    <p>倾国洛神，凌波微步，起舞不羁乱世间。一袭紫衣，一支玉笛，吹尽多舛命运事。曹魏第一美女，有着传奇故事的冰山美人——甄姬终于参战极无双的世界！作为游戏中第一个女性红将，甄姬有着超越其他三国美人的极强实力。使用玉笛激发冰系魔法进行攻击的甄姬，无论是聚怪清怪还是击杀BOSS都会有着让你惊喜的表现。
                    </p>
                </li>
            </ul>
            <ul class="renwu_4 right1">
                <li>
                    <span><img src="<?php echo STATIC_DOM; ?>4.0/m/images/wj_dw_name.png?<?= VERSION?>" title="" alt=""></span>
                </li>
                <li>
                    <img src="<?php echo STATIC_DOM; ?>4.0/common/images/wj_dw_img.png?<?= VERSION?>" title="" alt="">
                </li>
                <li>
                    <p>古之恶来，英勇救主，以一己之力抵挡万千大军！令敌闻风裂胆，望影魂飞！相貌魁梧，膂力过人的魏国猛将典韦，是游戏中【护】类型的第一员红将！不仅作为护类型武将有着面对BOSS仍然能进行强大输出的能力，同时在清杀小怪方面也有着其他护武将所不及的超强实力，不负古之恶来威名！
                    </p>
                </li>
            </ul>
        </div>
        <p class="select_more">
            <a href="/wap/hero_list.html">查看更多</a>
        </p>
    </div>
</section>

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js?<?= VERSION?>"></script>
<!--<footer class="rbot">-->
<!--    <p>COPY RIGHT   @2015-2016  ALL RIGHTS RESERVED</p>-->
<!--    <p>英雄互娱版权所有</p>-->
<!--</footer>-->
<script type="text/javascript">
    window.onload = function() {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        })
    }
</script>
<div id="mask"></div>
<?php echo $this->render('@app/views/layouts/wap/footer.php', array('nid' => 1,'gift_image'=>$gift_image))?>
</body>
</html>
