<?php

use common\Cms;
use yii\helpers\Url;
use yii\helpers\Html;

$navTitle = 'liansai';
$this->title = '弹弹岛2英雄联赛弹王杯赛官方投票页 弹弹岛2官方网站_新一代休闲弹射竞技手游_英雄互娱';
$this->keywords = 'HPL,英雄联赛,弹弹岛2比赛,弹弹岛2弹王杯,弹王杯,弹弹岛2职业联赛,移动电竞,休闲竞技,全民竞技,弹王金杯';
$this->description = '弹弹岛2英雄联赛弹王杯赛官网，弹弹岛2英雄联赛弹王杯在承袭往届英雄联赛成功经验的同时大胆革新，完全采用线上赛的模式，以“全民参与，人人有奖”作为赛事的宗旨，完美诠释“新竞技，更休闲”的游戏理念，实现全民竞技！弹王金杯舍我其谁，快来一战！';
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <title><?= $GLOBALS['seo_title']?></title>
    <meta name="Keywords" content="<?= $GLOBALS['seo_key']?>" >
    <meta name="Description" content="<?= $GLOBALS['seo_desc']?>" >
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/public.css?<?= VERSION?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/swiper.min.css?<?= VERSION?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/bomb_dwb.css?<?= VERSION?>" />
    <?= Html::csrfMetaTags() ?>
    <style>
        #video_tck {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            background: rgba(0,0,0,.5);
        }
        #player5 {
            width: 80%;
            color: #000;
            position: absolute;
            left: 50%;
            top: 30%;
            margin-left: -40%;
            z-index: 1000;
        }
        #close {
            width: 0.93750rem;
            height: 0.93750rem;
            display: block;
            position: absolute;
            top: -0.46875rem;
            right: -0.46875rem;
            background: url(<?php echo STATIC_DOMAIN ?>1.0/common/images/c.png) no-repeat;
            cursor: pointer;
            background-size: 100% 100%;
        }
        #player5 {
            width: 80%;
            color: #000;
            position: absolute;
            left: 50%;
            top: 30%;
            margin-left: -40%;
            z-index: 1000;
        }
    </style>
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
<header>
    <div class="slogo">
        <img class="dwb_logo" src="<?php echo STATIC_DOMAIN ?>1.0/m/img/slogin.png?<?php echo time();?>" title="" alt="" />
    </div>
</header>

<section>
    <div class="include"></div>
    <div class="main_1">
        <div class="title_main">

        </div>
        <p class="title_txt">英雄联赛-弹王杯，是《弹弹岛2》最顶级的赛事，秉承着“公平竞技”的赛事理念，深受玩家们的喜爱和追捧。在比赛期间，全服勇者齐聚英雄联赛，争夺最强弹王荣耀！一场移动电竞顶级盛会蓄势待发，用战斗和荣誉诠释“新竞技更休闲”! </p>
        <div class="img_pic">
            <img src="<?php echo STATIC_DOMAIN ?>1.0/m/img/img_demo.jpg?<?= VERSION?>" title="" alt="" />
        </div>
        <div class="list_bg">
            <ul>
                <?php foreach ($news as $v) { ?>
                    <li>
                        <a href="<?php echo Cms::getUrl('wap/detail',array('aid'=>$v['id'],'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>"><?php echo $v['title']; ?></a>
                    </li>
                <?php } ?>
            </ul>
        </div>

        <div class="video_list">
            <ul class="picBox" id="picBox">
                <?php foreach ($gameVideo as $k => $v) { ?>
                    <li class="video_list_1" style='display: <?php if ($k == 0) {echo 'block';} else {echo 'none';}?>'>
                        <img class="img01" src="<?php echo $v['thumb']; ?>" title="" alt="" />
                        <img class="play_btn js_video_play" data-url='<?php echo $v->contentMessage; ?>' src="<?php echo STATIC_DOMAIN ?>1.0/m/img/play.png" title="" alt="" />
                        <span></span>
                        <p><?php echo $v['title'] ?></p>
                    </li>
                <?php  } ?>
            </ul>

            <div class="small_video video_small">
                <ul class="swiper-wrapper listBox"  id="listBox" >
                    <?php foreach ($gameVideo as $k => $v) { ?>
                        <li data-rel='<?php echo $v->contentMessage; ?>' date-img='<?php echo $v['thumb']; ?>' class="swiper-slide <?php if ($k == 0) { echo 'gaoliang';} ?>">
                            <img src="<?php echo $v['thumb']; ?>" title="" alt="" />
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div>


    <div class="main_2">
        <div class="title_main">

        </div>
        <p class="title_txt">英雄联赛-弹王杯，是《弹弹岛2》最顶级的赛事，秉承着“公平竞技”的赛事理念，深受玩家们的喜爱和追捧。在比赛期间，全服勇者齐聚英雄联赛，争夺最强弹王荣耀！一场移动电竞顶级盛会蓄势待发，用战斗和荣誉诠释“新竞技更休闲”! </p>

        <div class="party_time">
            <h4>活动时间：</h4>
            <p>第一轮竞猜：  6月26日 32强赛（小组赛）比赛开始前</p>
            <p>第二轮竞猜：  6月27日16强赛比赛开始前</p>
            <p>第三轮竞猜：  6月28日8强赛比赛开始前</p>
            <p>第四轮竞猜：  6月29日4强赛比赛开始前</p>
            <p>第五轮竞猜：  6月30日冠军赛强赛比赛开始前</p>
        </div>

        <div class="party_rule">
            <h4>活动规则：</h4>
            <p>1.每个游戏帐号第一轮竞猜可以选择4支队伍表示支持；</p>
            <p>2.每个游戏帐号第二轮竞猜可以选择2支队伍表示支持；</p>
            <p>3.每个游戏帐号第三、四、五轮竞猜可以选择1支队伍表示支持；</p>
            <p>4.每轮竞猜只需猜对一支获胜队伍，即可获得1分竞猜分；</p>
            <p>5.每轮竞猜的队伍都将在比赛前进行更新;</p>
            <p>6.获得指定的竞猜分，即可获得对应的档位的奖励，奖励只发放对应的最高档位；</p>
            <p>7.奖励发放预计需要7个工作日,请耐心等待,注意查收所填写的邮箱邮件;</p>
            <p>8.请确保填写的游戏ID和区服正确，如因信息错误导致未能收到奖励,将无法补发；</p>
            <p>9.如您还需其它帮助可联系官方客服：4009 393 333</p>
        </div>

        <div class="party_price clearfix">
            <div class="left_txt">
                <h4>活动奖励</h4>
                <p>获得1分竞猜分:金币宝箱*1、甜甜圈*2</p>
                <p>获得2分竞猜分:金币宝箱*2、宝石礼盒*1</p>
                <p>获得3分竞猜分:金币宝箱*3、祈福币宝箱*1</p>
                <p>获得4分竞猜分:大金币宝箱*2、宝石礼盒*2</p>
            </div>
                <img src="<?php echo $liansaiAct[0]['thumb'] ?>" />
            </div>
            <p class="p">获得5分竞猜分:大金币宝箱*3、祈福币宝箱*2、神秘羽翼*7天</p>
        </div>
    </div>

    <div class="main_last">
        <div class="title_main"></div>
        <div class="big_box">
            <?php if ($matchInfo['status'] <= 2) { ?>
                <input class="input_huge" id="" type="text" placeholder="切换小组" readonly="readonly" />
                <ul>
                    <li>
                        <a href="javascript:;">第一组</a>
                    </li>
                    <?php if ($matchInfo['status'] <= 2) { ?>
                        <li>
                            <a href="javascript:;">第二组</a>
                        </li>
                    <?php } ?>
                    <?php if ($matchInfo['status'] == 1) { ?>
                        <li>
                            <a href="javascript:;">第三组</a>
                        </li>
                        <li>
                            <a href="javascript:;">第四组</a>
                        </li>
                    <?php } ?>
                </ul>
            <?php } ?>
        </div>
        <div class="champion">
            <img src="<?php echo STATIC_DOMAIN ?>1.0/m/img/champion.png" title="" alt="" />
        </div>
        <div class="show_list">

            <?php for ($i = 0; $i < 4; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>


            <?php for ($i = 0; $i < 2; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition2[$i]['id']; ?>" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name js_corps_id_<?php echo $dataPosition3[0]['id']; ?>" data-id='<?php echo $dataPosition3[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[0]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <div class="team_name js_corps_id_<?php echo $dataPosition3[1]['id']; ?>" data-id='<?php echo $dataPosition3[1]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[1]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[1]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <?php for ($i = 2; $i < 4; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition2[$i]['id']; ?>" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php for ($i = 4; $i < 8; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id=''>
                <p class="team"><?php echo $dataPosition4[0]['name'] ?></p>
                <?php if (!empty($dataPosition4)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition4[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

        </div>

        <div class="show_list show_list_1">
            <?php for ($i = 8; $i < 12; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>


            <?php for ($i = 0; $i < 2; $i++) { ?>
                <div class="team_name" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id='<?php echo $dataPosition3[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[0]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <div class="team_name" data-id='<?php echo $dataPosition3[1]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[1]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[1]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <?php for ($i = 2; $i < 4; $i++) { ?>
                <div class="team_name" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php for ($i = 12; $i < 16; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id='<?php echo $dataPosition4[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition4[0]['name'] ?></p>
                <?php if (!empty($dataPosition4)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition4[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

        </div>


        <div class="show_list show_list_2">

            <?php for ($i = 16; $i < 20; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>


            <?php for ($i = 0; $i < 2; $i++) { ?>
                <div class="team_name" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id='<?php echo $dataPosition3[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[0]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <div class="team_name" data-id='<?php echo $dataPosition3[1]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[1]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[1]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <?php for ($i = 2; $i < 4; $i++) { ?>
                <div class="team_name" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php for ($i = 20; $i < 24; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id='<?php echo $dataPosition4[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition4[0]['name'] ?></p>
                <?php if (!empty($dataPosition4)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition4[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

        </div>

        <div class="show_list show_list_3">
            <?php for ($i = 24; $i < 28; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>


            <?php for ($i = 0; $i < 2; $i++) { ?>
                <div class="team_name" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id='<?php echo $dataPosition3[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[0]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <div class="team_name" data-id='<?php echo $dataPosition3[1]['id']; ?>'>
                <p class="team"><?php echo $dataPosition3[1]['name'] ?></p>
                <?php if (!empty($dataPosition3)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition3[1]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

            <?php for ($i = 2; $i < 4; $i++) { ?>
                <div class="team_name" data-id='<?php echo $dataPosition2[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition2[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition2)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition2[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php for ($i = 28; $i < 32; $i++) { ?>
                <div class="team_name js_corps_id_<?php echo $dataPosition1[$i]['id']; ?>" data-id='<?php echo $dataPosition1[$i]['id']; ?>'>
                    <p class="team"><?php echo $dataPosition1[$i]['name'] ?></p>
                    <?php if (!empty($dataPosition1)) { ?>
                        <p>获得<span class='js_vote_num'><?php echo $dataPosition1[$i]['vote_num'] ?></span>票</p>
                    <?php } ?>
                </div>
            <?php } ?>

            <div class="team_name" data-id='<?php echo $dataPosition4[0]['id']; ?>'>
                <p class="team"><?php echo $dataPosition4[0]['name'] ?></p>
                <?php if (!empty($dataPosition4)) { ?>
                    <p>获得<span class='js_vote_num'><?php echo $dataPosition4[0]['vote_num'] ?></span>票</p>
                <?php } ?>
            </div>

        </div>


        <div class="m1">
            <div class="m">已投票</div>
        </div>
        <footer id="Hero-bar">
            <div class="f_t">
                <ul>
                    <li>
                        <a href="http://kf.yingxiong.com/Mobile/checkOption?Gid=73">客服中心</a>
                    </li>
                    <li>
                        <a href="http://bbs.yingxiong.com/index/gameBbsLogin?id=18" id="community">游戏社区</a>
                    </li>
                </ul>
                <div class="tel">
                    <a href="tel:4009393333"><i></i>400-939-3333</a>
                </div>
            </div>
            <p class="f_txt">COPY RIGHT @2017-2017 ALL RIGHTS RESERVED</p>
            <p class="f_link">
                <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393" class="f_a01">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/link_a1.png" alt="">
                </a>
                <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08c53cc2ed60153d10b447e08d8" class="f_a02">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/link_a2.png" alt="">
                </a>英雄互娱版权所有</p>
        </footer>
        <!--登陆-->
        <div class="denglu">
            <!--                        <div class="username">
                                            <span>姓名</span><input type="text" />
                                    </div>-->
            <img class="close_bbb" src="<?php echo STATIC_DOMAIN ?>1.0/m/img/close.png" title="" alt="" />
            <div class="userid">
                <span>玩家ID</span><input id='name' name="name" type="text" />
            </div>
            <div class="userqf">
                <span>区服</span>
                <div id="dropdown">
                    <input readonly="readonly" name="server_id" id='server_id' class="input_select" data-id='<?php echo $gameServer[0]['id'] ?>' id="" type="text" placeholder="<?php echo $gameServer[0]['name'] ?>" />
                    <ul>
                        <?php foreach ($gameServer as $v) { ?>
                            <li value="<?php echo $v['id']; ?>"><?php echo $v['name'] ?></li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
            <div class="userphone">
                <span>手机</span><input id='mobile' name="phone" type="tel" /><i id="get_code">获取验证码</i>
            </div>
            <div class="usercode">
                <span></span><input id='yzm' name='yzm' type="number" placeholder="请输入验证码" />
            </div>
            <div class="submit_btn">
                <p id='vote_btn'>提交</p>
            </div>
        </div>
    </div>

</section>

</body>
<div id="mask"></div>
<!--<div id="video_tck">-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <iframe border=0 marginWidth=0 frameSpacing=0 marginHeight=0 src="" frameBorder=0 noResize scrolling="no" width=100% height=100% vspale="0" id="iframe_btn"></iframe>-->
<!--    </div>-->
<!--</div>-->
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/m/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/m/js/jquery.fittext.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/m/js/swiper.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>1.0/m/js/bomb_dwb.js?<?= VERSION?>"></script>
<script type="text/javascript">
    var videoSmall = new Swiper('.video_small', {
        //			loop:true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        slideToClickedSlide: true
    });

    var timer = null;
    var flag = 0;
    var t =60;
    var oBtn = $("#get_code");
    var vote = $('#vote_btn');
    var match_status = <?php echo $matchInfo['status']; ?>;
    var is_login = '<?php echo Cms::getSession('vote_phone'); ?>';
    var vote_corps_id = '';
    $(function(){
        //投票
        $(".show_list div").click(voteBtn);

        /*获取手机验证码*/
        $('#get_code').click(sendCode);

        $('#vote_btn').click(function(){
            voteCorps();
        });

        // 视频
        $("#listBox li").click(function(){

            var rel = $(this).attr('data-rel');
            var img = $(this).attr('data-img');

            $('#video_list_1 .img01').attr('src', img);
            $('#video_list_1').attr('data-rel', rel);
        });

//        $(".play_btn").click(function(){
//            var rel = $('.video_list_1').attr('data-rel');
//
//            $("#mask").show();
//            $("#video_tck").show();
//            console.log(rel);
//            $("#iframe_btn").attr("src","/videoMobile/video-source.html?"+rel);
//        });
//        $("#close").click(function(){
//            $("#mask").hide();
//            $("#video_tck").hide();
//            $('.vid_sp').trigger('pause');
//        });
    });

    /**
     * 发送验证码
     * @returns {undefined}
     */
    function sendCode()
    {
        var mobile = $('#mobile').val();
        if (checkMobile(mobile)) {
            if(flag == 0){
                flag = 1;
                clearInterval(timer);
                timer = setInterval(tick,1000);
                tick();
                var _csrf = $('meta[name="csrf-token"]').attr('content');
                $.ajax({
                    type: "POST",
                    url: "<?php echo Url::to(['/wap/special/get-verify'])  ?>",
                    data: "phone=" +mobile+"&cms_csrf="+_csrf,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 1) {
                            alert("验证码已发送到手机，请注意查收短信！");
                            return true;
                        }else {
                            alert(data.msg);
                            return false;
                        }
                        return true;
                    }
                });
            }

        }
    }

    /**
     * 验证手机
     * @param {type} mobile
     * @returns {Boolean}
     */
    function checkMobile(mobile)
    {
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
        var obj = $('#mobile');
        if (mobile.length == 0) {
            alert('请输入手机号码！');
            obj.focus();
            return false;
        } else if (mobile.length != 11) {
            alert('请输入有效的手机号码！');
            obj.focus();
            return false;
        } else if (!myreg.test(mobile)) {
            alert('请输入有效的手机号码！');
            obj.focus();
            return false;
        }
        return true;
    }

    function tick()
    {
        t--;
        oBtn.css({"background":"gray","color":"#fff","fontSize":"12px","cursor":"default"})
        oBtn.html(t+ '秒后重新发送')
        if(t <= 0){
            oBtn.css({"background":"#FF8C11","color":"white","fontSize":"0.5625rem","cursor":"pointer"})
            clearInterval(timer);
            flag = 0;
            t = 60;
            oBtn.html("获取验证码")
        }
    };

    function voteCorps()
    {
        var url = '<?php echo Url::to(['/wap/special/vote'])?>';
        var server_id = $('#server_id').attr('data-id');
        var phone = $('#mobile').val();
        var name = $('#name').val();
        var yzm = $('#yzm').val();
        var corps_id = $('#corps_id').val();
        if (!phone) {
            alert('请输入手机号码！');
            return;
        }
        if (!name) {
            alert('玩家ID不能为空！');
            return;
        }
        if (!yzm) {
            alert('yzm不能为空！');
            return;
        }
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        $.post(url, {server_id:server_id, phone:phone, name:name, yzm:yzm, corps_id:vote_corps_id, cms_csrf:_csrf}, function(data){
            $(".denglu").css("display" , "none");
            $(".include").css("display" , "none");
            if (data.vote_phone) {
                is_login = data.vote_phone;
            }
            if (!data.status) {
                alert(data.msg);
            } else {
                $(".m1, .m").show();
                setTimeout(function(){
                    $(".m1, .m").hide();
                }, 2000);
                $('.js_corps_id_'+vote_corps_id).find('.js_vote_num').text(data.msg);
            }
        }, 'json');
    }

    function voteCorpsLogin()
    {
        var url = '<?php echo Url::to(['/wap/special/vote'])?>';
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        $.post(url, {corps_id:vote_corps_id, cms_csrf:_csrf}, function(data){
            if (!data.status) {
                alert(data.msg);
            } else {
                $(".m1, .m").show();
                setTimeout(function(){
                    $(".m1, .m").hide();
                }, 2000);
                $('.js_corps_id_'+vote_corps_id).find('.js_vote_num').text(data.msg);
            }
        }, 'json');
    }

    function voteBtn()
    {
        vote_corps_id = $(this).attr('data-id');
        if (!vote_corps_id) {
            return false;
        }
        if (is_login) {
            voteCorpsLogin();
        } else {
            $(".denglu").show();
            $(".include").show();
            setTimeout('$(".m").fadeOut();$(".m1").fadeOut()', 1000);
        }
    }

    $(".d_top_nav ul li").removeClass("top_active");
    $(".d_top_nav ul li").eq(1).addClass("top_active");
</script>

</html>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>