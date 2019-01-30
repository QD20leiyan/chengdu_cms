<?php
use common\Cms;
?>
<link rel="stylesheet" href="<?php echo STATIC_DOM; ?>4.0/css/index.css?<?=VERSION?>"/>
<link rel="stylesheet" href="<?php echo STATIC_DOM; ?>common/css/public.css?<?=VERSION?>">
<div class="i_main">
    <div class="i_main_1">
        <?php echo $this->render('@app/views/layouts/pc/header.php', array('nid' => 1))?>
        <!--download-->
        <div class="download">
            <div class="download_1">
                <div class="download_bg">
                    <img class="download02" src="<?php echo STATIC_DOM; ?>3.0/img/code_1.png?<?=VERSION?>" title="" alt=""/>
                    <div class="download01">
                        <a href="#" target="_blank" class="js_down_ios">
                            <img class=""src="<?php echo STATIC_DOM; ?>3.0/img/appstore.png?<?=VERSION?>"title="" alt=""/></a><br/>
                        <a href="#" target="_blank" class="js_down_andriod">
                            <img class=""src="<?php echo STATIC_DOM; ?>3.0/img/android.png?<?=VERSION?>"title="" alt=""/></a>
                       	<a href="http://l.taptap.com/ryPUAkGD" target="_blank">
                            <img src="<?php echo STATIC_DOM; ?>3.0/img/tap.png?<?=VERSION?>" alt="" /></a>
                    </div>
                    <a href="javascript:;" id="price">
                        <img src="<?php echo STATIC_DOM; ?>3.0/img/price.png?<?=VERSION?>" title=""alt=""/></a>
                                                           
                </div>

                <?php foreach ($cover_video as $k => $v) {?>
                    <?php if ($k == 0) { ?>
                        <div class="play01 js_video_play" id="video" data-url="<?php echo $v['url'] ?>">
                            <a href="javascript:;">
                                <img src="<?php echo STATIC_DOM; ?>3.0/img/play.png?<?=VERSION?>" title="" alt=""/>
                            </a>
                        </div>
                    <?php } ?>
                <?php } ?>
            </div>
        </div>
        <!--礼包-->
        <div class="price01">
            <div class="mask"></div>
            <div class="mode-gift">
                <?php foreach ($gift_image as $k => $v) {?>
                    <?php if ($k == 0) { ?>
                        <img src="<?php echo $v['thumb'] ?>" alt="img">
                    <?php } ?>
                <?php } ?>
                <div class="close"></div>
            </div>
        </div>
<!--        <div id="video_mask" class="video_mask">-->
<!--            <div class="w man10 both OF none"></div>-->
<!--            <div id="player5">-->
<!--                <div id="close"></div>-->
<!--                <div class="videos">-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <!--banner_newslist-->
        <div class="banner_newslist">
            <div class="banner_news">
                <div class="left_banner">
                    <div id="wrapper">
                        <!-- 最外层部分 -->
                        <div id="banner">
                            <!-- 轮播部分 -->
                            <ul class="imgList">
                                <?php foreach ($banner as $v) {?>
                                    <li><a target="_blank" href="<?= $v['url']; ?>"><img
                                                    src="<?= $v['thumb']; ?>"
                                                    width="502px" height="322px"
                                                    alt="<?= $v['title']; ?>"></a>
                                    </li>
                                <?php } ?>
                            </ul>
                            <ul class="indexList">
                                <!-- 图片右下角序号部分 -->
                                <?php foreach ($banner as $k => $v) { ?>
                                    <li class="<?php if ($k == 0) { ?>indexOn<?php } ?>"><?php echo $k + 1; ?></li>
                                <?php } ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <!--right_news_list-->
                <div class="tab-news-box" id="tab-news-box">
                    <div class="hd">
                        <ul>
                            <li class="on"><a target="_blank"
                                              href="<?php echo Cms::getUrl('article/list', array('cid' => Yii::$app->params['ZONGHE'], 'cat_dir' => 'zixun')); ?>">综合</a>
                            </li>
                            <li><a target="_blank"
                                   href="<?php echo Cms::getUrl('article/list', array('cid' => Yii::$app->params['XINWEN'], 'cat_dir' => 'xw')); ?>">新闻</a>
                            </li>
                            <li><a target="_blank"
                                   href="<?php echo Cms::getUrl('article/list', array('cid' => Yii::$app->params['GONGGAO'], 'cat_dir' => 'gg')); ?>">公告</a>
                            </li>
                            <li><a target="_blank"
                                   href="<?php echo Cms::getUrl('article/list', array('cid' => Yii::$app->params['HUODONG'], 'cat_dir' => 'hd')); ?>">活动</a>
                            </li>
                            <li><a target="_blank"
                                   href="<?php echo Cms::getUrl('article/list', array('cid' => Yii::$app->params['GONGLUE'], 'cat_dir' => 'gl')); ?>">攻略</a>
                            </li>
                            <li><a target="_blank"
                                   href="<?php echo Cms::getUrl('article/list', array('cid' => Yii::$app->params['FENGYUN'], 'cat_dir' => 'fy')); ?>">无双风云</a>
                            </li>
                        </ul>
                        <a href="<?php echo Cms::getUrl('article/list', array('cid' => 1, 'cat_dir' => 'zixun')); ?>"
                           class="more"><i><img src="<?php echo STATIC_DOM; ?>3.0/img/play_small.png" title="" alt=""/></i></a>
                    </div>
                    <div class="bd">
                        <ul>
                            <?php foreach ($zx as $v):?>
                                <li>
                                    <a target="_blank" href="<?=$v['linkUrl']?>">
                                        【<?= $v['categoryName']; ?>】<?php echo $v['title']; ?></a>
                                    <span><?php echo date('Y-m-d', $v['created_at']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <ul>
                            <?php foreach ($xw as $v): ?>
                                <li>
                                    <a target="_blank" href="<?=$v['linkUrl']?>">
                                        【<?= $v['categoryName']; ?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d', $v['created_at']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <ul>
                            <?php foreach ($gg as $v): ?>
                                <li>
                                    <a target="_blank" href="<?=$v['linkUrl']?>">
                                        【<?= $v['categoryName']; ?>】<?php echo $v['title']; ?></a>
                                    <span><?php echo date('Y-m-d', $v['created_at']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <ul>
                            <?php foreach ($hd as $v): ?>
                                <li>
                                    <a target="_blank" href="<?=$v['linkUrl']?>">
                                        【<?= $v['categoryName']; ?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d', $v['created_at']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <ul>
                            <?php foreach ($gl as $v): ?>
                                <li>
                                    <a target="_blank" href="<?=$v['linkUrl']?>">
                                        【<?= $v['categoryName']; ?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d', $v['created_at']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <ul>
                            <?php foreach ($fy as $v): ?>
                                <li>
                                    <a target="_blank"
                                       href="<?=$v['linkUrl']?>">
                                        【<?= $v['categoryName']; ?>】<?php echo $v['title']; ?></a><span><?php echo date('Y-m-d', $v['created_at']); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="banner_picture">
                <div class="banner_pic">
                    <div class="banner_pic_page1">
                        <ul>
                            <?php foreach ($imageText as $k => $v): ?>
                                <?php if ($k <= 2) { ?>
                                    <li>
                                        <a target="_blank" href="<?php echo $v['url'] ?>"><img
                                                    src="<?php echo $v['thumb'] ?>"
                                                    title="<?php echo $v['title'] ?>"
                                                    alt=""/></a>
                                       <!-- <p><?php /*echo $v['title'] */?></p>-->
                                    </li>
                                <?php } ?>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <div class="banner_pic_page2">
                        <ul>
                            <?php foreach ($imageText as $k => $v): ?>
                                <?php if ($k > 2) { ?>
                                    <li>
                                        <a target="_blank" href="<?php echo $v['url'] ?>"><img
                                                    src="<?php echo $v['thumb'] ?>"
                                                    title="<?php echo $v['title'] ?>"
                                                    alt=""/></a>
                                        <!-- <p><?php /*echo $v['title'] */ ?></p>-->
                                    </li>
                                <?php } ?>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <div class="left_logo">
                        <span class="active" id="page01"></span>
                        <span id="page02"></span>
                    </div>
                </div>
            </div>
            <ul class="section3-feature-ul">
                <li class="feature3">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOM; ?>3.0/img/zhengba.png?<?=VERSION?>" alt="s"></a>
                    <img src="<?php echo STATIC_DOM; ?>3.0/img/img01.jpg" alt="img">
                </li>
                <li class="feature4">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOM; ?>3.0/img/wushuang.png?<?=VERSION?>" alt="s"></a>
                    <img src="<?php echo STATIC_DOM; ?>3.0/img/img02.jpg" alt="img">
                </li>
                <li class="feature5">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOM; ?>3.0/img/juntuan.png?<?=VERSION?>" alt="s"></a>
                    <img src="<?php echo STATIC_DOM; ?>3.0/img/img03.jpg" alt="img">
                </li>
                <li class="feature6">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOM; ?>3.0/img/baijiang.png?<?=VERSION?>" alt="s"></a>
                    <img src="<?php echo STATIC_DOM; ?>3.0/img/img04.jpg" alt="img">
                </li>
                <li class="feature7 active">
                    <a href="javascript:void(0);"><img src="<?php echo STATIC_DOM; ?>3.0/img/sanguo.png?<?=VERSION?>" alt="s"></a>
                    <img src="<?php echo STATIC_DOM; ?>3.0/img/img05.jpg" alt="img">
                </li>
            </ul>
            <div class="s3_bottom">
                <div class="s3_peo_head">
                    <span class="s_wid118 s_p_h1 on"><img src="<?php echo STATIC_DOM; ?>3.0/img/sj.jpg?<?=VERSION?>" alt="img"></span>
                    <span class="s_wid118 s_p_h2"><img src="<?php echo STATIC_DOM; ?>3.0/img/ht.jpg?<?=VERSION?>" alt="img"></span>
                    <span class="s_wid118 s_p_h3"><img src="<?php echo STATIC_DOM; ?>3.0/img/zhj.jpg?<?=VERSION?>" alt="img"></span>
                    <span class="s_wid118 s_p_h4"><img src="<?php echo STATIC_DOM; ?>3.0/img/dw.jpg?<?=VERSION?>" alt="img"></span>
                    <span class="s_wid126 s_p_h5"><img src="<?php echo STATIC_DOM; ?>3.0/img/zy.jpg?<?=VERSION?>" alt="img"></span>
                    <a href="/article/hero_list.html" class="s_wid126 s_p_a" target="_blank"></a>
                </div>
                <div class="p1">
                    <div class="name_1">
                        <p class="rw_name"><img src="<?php echo STATIC_DOM; ?>4.0/img/sywj_sj_name.png" title="华佗" alt=""></p>
                        <p>谁道江南少将才？明星夜夜照文台。昔破虏雄才，将陨岘山；今魂系江东，百战归来！江东孙家的早期家主、吴国第二名红将——孙坚，率领孙家子弟，角逐三国舞台！有着破虏之名的孙坚，挥刀间刚猛无俦，大开大合，更能借幽冥之力，对大范围敌人进行控制、杀伤。是纵横疆场、破敌于指尖的上将之选。
                        </p>
                        <div class="jineng">
                            <img class="c1" src="<?php echo STATIC_DOM; ?>3.0/img/sj01.png?<?=VERSION?>" title="" alt="">
                            <img class="c2" src="<?php echo STATIC_DOM; ?>3.0/img/sj02.png?<?=VERSION?>" title="" alt="">
                            <img class="c3" src="<?php echo STATIC_DOM; ?>3.0/img/sj03.png?<?=VERSION?>" title="" alt="">
                            <img class="c4" src="<?php echo STATIC_DOM; ?>3.0/img/sj04.png?<?=VERSION?>" title="" alt="">
                            <img class="c5" src="<?php echo STATIC_DOM; ?>3.0/img/sj05.png?<?=VERSION?>" title="" alt="">
                        </div>
                        <span class="o1">
						唤出幽冥之墙向前推进，并爆发力量将敌人卷至空中撕裂
						</span>
                        <span class="o2">
						抬手放出一个带有吸力的能量球，随后向前方打出并不断造成伤害，解锁将星技能后，可触发被动效果：征战
						</span>
                        <span class="o3">
						投掷出刀刃在身前的空间内飞舞斩击，解锁将星技能后，可触发被动效果：利刃
						</span>
                        <span class="o4">
						借幽冥之力瞬息间移到前方
						</span>
                        <span class="o5">
						在周身召唤四片巨大刀刃旋转绞杀敌人，同时孙坚浮游飘向前方，之后聚合刀刃引爆能量
						</span>
                    </div>
                    <div class="s3_peo">
                        <img src="<?php echo STATIC_DOM; ?>3.0/img/sj.png?<?=VERSION?>" class="s3_img1" alt="s_i1">
                    </div>
                </div>
                <div class="p2">
                    <div class="name_1">
                        <p class="rw_name"><img src="<?php echo STATIC_DOM; ?>4.0/img/sywj_ht_name.png?<?=VERSION?>" title="华佗" alt=""></p>
                        <p>执一柄剑，携一壶酒，在这乱世的舞台中看尽生死，青囊济世。<br />继吕布后，群雄势力的第二名红将——华佗，终于登场！华佗早年曾游学徐土，仗剑纵横战场的他，不但擅长聚怪群攻，更有着不负神医之名的恢复能力，为团队生存提供有力保障。带给你一个不同以往印象的青年神医！
                        </p>
                        <div class="jineng">
                            <img class="c1" src="<?php echo STATIC_DOM; ?>3.0/img/ht01.png?<?=VERSION?>" title="" alt="">
                            <img class="c2" src="<?php echo STATIC_DOM; ?>3.0/img/ht02.png?<?=VERSION?>" title="" alt="">
                            <img class="c3" src="<?php echo STATIC_DOM; ?>3.0/img/ht03.png?<?=VERSION?>" title="" alt="">
                            <img class="c4" src="<?php echo STATIC_DOM; ?>3.0/img/ht04.png?<?=VERSION?>" title="" alt="">
                            <img class="c5" src="<?php echo STATIC_DOM; ?>3.0/img/ht05.png?<?=VERSION?>" title="" alt="">
                        </div>
                        <span class="o1">
						踏步刺剑，随后快速挥出三道剑光
						</span>
                        <span class="o2">
						汇聚力量将剑插入地面，引出滔天气浪造成多段伤害
						</span>
                        <span class="o3">
						向前方打出一道猛烈气旋，将敌人聚拢并卷至空中。解锁将星技能后，可触发被动效果：回春
						</span>
                        <span class="o4">
						于瞬息间向前移动身形，躲闪敌人攻击
						</span>
                        <span class="o5">
						御剑控制周身气旋，将大范围敌人聚拢后向前推出再拉回，而后挥剑爆发气劲。解锁将星技能后，可触发被动效果：医者
						</span>
                    </div>
                    <div class="s3_peo">
                        <img src="<?php echo STATIC_DOM; ?>3.0/img/ht.png?<?=VERSION?>" class="s3_img1" alt="s_i1">
                    </div>
                </div>
                <div class="p3">
                    <div class="name_1">
                        <p class="rw_name"><img src="<?php echo STATIC_DOM; ?>4.0/img/sywj_zhj_name.png?<?=VERSION?>" title="甄姬" alt=""></p>
                        <p>倾国洛神，凌波微步，起舞不羁乱世间。一袭紫衣，一支玉笛，吹尽多舛命运事。曹魏第一美女，有着传奇故事的冰山美人——甄姬终于参战极无双的世界！作为游戏中第一个女性红将，甄姬有着超越其他三国美人的极强实力。使用玉笛激发冰系魔法进行攻击的甄姬，无论是聚怪清怪还是击杀BOSS都会有着让你惊喜的表现。
                        </p>
                        <div class="jineng">
                            <img class="c1" src="<?php echo STATIC_DOM; ?>3.0/img/zj01.png?<?=VERSION?>" title="" alt="">
                            <img class="c2" src="<?php echo STATIC_DOM; ?>3.0/img/zj02.png?<?=VERSION?>" title="" alt="">
                            <img class="c3" src="<?php echo STATIC_DOM; ?>3.0/img/zj03.png?<?=VERSION?>" title="" alt="">
                            <img class="c4" src="<?php echo STATIC_DOM; ?>3.0/img/zj04.png?<?=VERSION?>" title="" alt="">
                            <img class="c5" src="<?php echo STATIC_DOM; ?>3.0/img/zj05.png?<?=VERSION?>" title="" alt="">
                        </div>
                        <span class="o1">
						洛神舞起，将身前敌人向前推出而后迅速拉回
						</span>
                        <span class="o2">
						快速翻腾起舞，对周身敌人造成多段伤害
						</span>
                        <span class="o3">
						向前抛出缓慢移动的冰晶并随后爆炸，冰冻前方小范围敌人
						</span>
                        <span class="o4">
						踏着寒气向前快速移动
						</span>
                        <span class="o5">
						翩跹着奏响手中长笛，在周身召唤大量冰晶爆炸，后引发寒气爆炸冰冻周身大范围敌人
						</span>
                    </div>
                    <div class="s3_peo">
                        <img src="<?php echo STATIC_DOM; ?>3.0/img/zhj.png?<?=VERSION?>" class="s3_img1" alt="s_i1">
                    </div>
                </div>
                <div class="p4">
                    <div class="name_1">
                        <p class="rw_name"><img src="<?php echo STATIC_DOM; ?>4.0/img/sywj_dw_name.png?<?=VERSION?>" title="典韦" alt=""></p>
                        <p>古之恶来，英勇救主，以一己之力抵挡万千大军！令敌闻风裂胆，望影魂飞！相貌魁梧，膂力过人的魏国猛将典韦，是游戏中【护】类型的第一员红将！不仅作为护类型武将有着面对BOSS仍然能进行强大输出的能力，同时在清杀小怪方面也有着其他护武将所不及的超强实力，不负古之恶来威名！
                        </p>
                        <div class="jineng">
                            <img class="c1" src="<?php echo STATIC_DOM; ?>3.0/img/dw01.png?<?=VERSION?>" title="" alt="">
                            <img class="c2" src="<?php echo STATIC_DOM; ?>3.0/img/dw02.png?<?=VERSION?>" title="" alt="">
                            <img class="c3" src="<?php echo STATIC_DOM; ?>3.0/img/dw03.png?<?=VERSION?>" title="" alt="">
                            <img class="c4" src="<?php echo STATIC_DOM; ?>3.0/img/dw04.png?<?=VERSION?>" title="" alt="">
                            <img class="c5" src="<?php echo STATIC_DOM; ?>3.0/img/dw05.png?<?=VERSION?>" title="" alt="">
                        </div>
                        <span class="o1">
						典韦挥动巨剑发动猛烈的旋风斩扫荡周围敌人，并在最后一击时跳向前方斩击地面。
						</span>
                        <span class="o2">
						典韦凝聚力量将周围的敌人吸附到身边，并挥动巨剑将敌人挑飞。
						</span>
                        <span class="o3">
						典韦向前方发动冲锋，到达位置后再发动一次斩击。
						</span>
                        <span class="o4">
						弹反敌人的攻击，重击敌人后将敌人挑飞。
						</span>
                        <span class="o5">
						典韦狂挥乱舞后跳向空中，将巨剑猛烈砸向地面，对周围造成大范围打击。
						</span>
                    </div>
                    <div class="s3_peo">
                        <img src="<?php echo STATIC_DOM; ?>3.0/img/dw.png?<?=VERSION?>" class="s3_img1" alt="s_i1">
                    </div>
                </div>
                <div class="p5">
                    <div class="name_1">
                        <p class="rw_name"><img src="<?php echo STATIC_DOM; ?>4.0/img/sywj_zyun_name.png?<?=VERSION?>" title="赵云" alt=""></p>
                        <p>听手中的长枪说，现在的画面只是你生前所见。即使只是普通攻击序列，赵云也能打出与他人不同的华丽连技。更不用提其技能及无双体现出不讲道理的穿梭能力，以及在移动中切削穿刺的战斗快感。七进七出不只是个故事，银龙闪电也不仅仅是特效而已。
                        </p>
                        <div class="jineng">
                            <img class="c1" src="<?php echo STATIC_DOM; ?>3.0/img/zy_01.png?<?=VERSION?>" title="" alt="">
                            <img class="c2" src="<?php echo STATIC_DOM; ?>3.0/img/zy_02.png?<?=VERSION?>" title="" alt="">
                            <img class="c3" src="<?php echo STATIC_DOM; ?>3.0/img/zy_03.png?<?=VERSION?>" title="" alt="">
                            <img class="c4" src="<?php echo STATIC_DOM; ?>3.0/img/zy_04.png?<?=VERSION?>" title="" alt="">
                            <img class="c5" src="<?php echo STATIC_DOM; ?>3.0/img/zy_05.png?<?=VERSION?>" title="" alt="">
                        </div>
                        <span class="o1">
						猛地引枪向前旋转穿刺，对沿途敌人造成伤害。
						</span>
                        <span class="o2">
						以枪为轴旋转踢击敌人，忽而腾空而起，居高临下对敌人刺出致命的一击。
						</span>
                        <span class="o3">
						血不沾衣地在敌阵中穿梭绞杀，留下本尊的残影对敌人进行二次伤害。
						</span>
                        <span class="o4">
						俯身冲刺，发动快速的长距离位移回避敌人的攻击。
						</span>
                        <span class="o5">
						将一柄枪舞成银色的巨龙，裹挟着如雨般的突刺对敌人进行密集的打击。
						</span>
                    </div>
                    <div class="s3_peo">
                        <img src="<?php echo STATIC_DOM; ?>3.0/img/zhaoyun.png?<?=VERSION?>" class="s3_img1" alt="s_i1">
                    </div>
                </div>
            </div>

            <!--movie-->
            <div class="movie">
                <div class="main_movie">
                    <?php foreach ($cover_video as $k => $v) { ?>
                        <?php if ($k == 0) { ?>
                            <div class="" id="default-player">
                                <img src="<?php echo $v['thumb'] ?>" title="" alt="" width="494px" height="279px"/>
                                <span class="video"><a href="javascript:;"><img
                                                src="<?php echo STATIC_DOM; ?>3.0/img/play_little.png?<?=VERSION?>" class="js_video_play" data-url="<?php echo $v['url'] ?>"/></a></span>
                            </div>
<!--                            <div class="vedios" id="vedios-player" style="display: none">-->
<!--                                <embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high"-->
<!--                                       width="494" height="279" align="middle" allowscriptaccess="always"-->
<!--                                       flashvars="--><?php //echo $v['url'] ?><!--&auto_play=1&gpcflag=1&width=494&height=279"-->
<!--                                       type="application/x-shockwave-flash">-->
<!--                            </div>-->
                        <?php } ?>
                    <?php } ?>

                </div>
                <div class="right_movie">
                    <?php foreach ($yh as $k => $v) {?>
                        <a href="<?php echo $v['redirect_url'] ?>" target="_blank">
                            <img src="<?php echo $v['thumb'] ?>" alt="" width="294px" height="136px">
                            <!-- <p><?php /*echo $v['title'] */ ?></p>-->
                        </a>
                    <?php } ?>
                </div>
                <!--right_code-->
                <?php echo $this->render('@app/views/layouts/pc/right_code.php');?>
            </div>
        </div>
        <!--footer-->
        <div class="footer">
            <div class="footer01">
                <span>
                <img class="fl" src="<?php echo STATIC_DOM; ?>3.0/img/code01.png?<?=VERSION?>" width="137px" title="" alt=""/>
                <div class="text_pro fl">
                    <h2>下载游戏</h2>
                    <p>扫描二维码下载游戏</p>
                    <p>真3D三国动作手游</p>
                    <p>万人连斩&nbsp;逐鹿三国</p>
                </div>
                </span>
                <span>
                <img class="img02 fl" src="<?php echo STATIC_DOM; ?>3.0/img/code02.png?<?=VERSION?>" width="137px" title="" alt=""/>
                <div class="text_pro01 fl">
                    <h2>微信账号</h2>
                    <p>扫描二维码关注官方微信</p>
                    <p style="color:yellow">官方微信号:jiwushuanghero</p>
                    <p>关注最强礼包</p>
                </div>
                </span>
                <span>
                <img class="img03 fl" src="<?php echo STATIC_DOM; ?>3.0/img/code03.png?<?=VERSION?>" width="137px" title="" alt=""/>
                <div class="text_pro02 fl">
                    <h2>客服服务</h2>
                    <p>客服电话<i style="color:yellow;">400-939-3333</i></p>
                    <p>客服QQ<i style="color:yellow">2885626330</i></p>
                    <p>玩家交流，BUG反馈</p>
                </div>
                </span>
            </div>

        </div>
        <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
    </div>
</div>


<!-----global----->
<script type="text/javascript" src="<?php echo STATIC_DOM; ?>3.0/js/superSlidev2.1.js?<?=VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOM; ?>4.0/js/js.js?<?=VERSION?>"></script>
<!---------script------->
<script type="text/javascript" src="<?php echo STATIC_DOM; ?>3.0/js/index.js?<?=VERSION?>"></script>
<?php //$this->renderPartial("//common/tongji"); ?>
<script>
    $().ready(function () {
//        $('.video').click(function () {
//            $('#default-player').hide();
//            $("#vedios-player").show();
//        });
        $('#close').click(function () {
            $("#video_mask").hide();
        })
//        $("#video").click(function () {
//            var url = $(this).attr('data-id');
//            $('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="714" height="378" align="middle" allowScriptAccess="always" flashvars="' + url + '" type="application/x-shockwave-flash"></embed>');
//            $(".video_mask").show();
//        })
    })
</script>
</body>
</html>
