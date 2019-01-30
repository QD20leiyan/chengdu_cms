<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>全民枪战2_官方网站_ca，新一代的枪战选择</title>
    <meta name="keywords" content="绝地求生，吃鸡，生存竞技，吃鸡手游,生存游戏，求生，求生游戏，大逃杀，陈赫,全民枪战,全民枪战2，CA，全民吃鸡，大吉大利，全民枪战官网,全民枪战下载，全民创造,全民枪战激活码,全民枪战礼包,FPS手游,枪战手游,竞技手游，射击手游，枪战游戏，FPS游戏，机甲，射击游戏" />
    <meta name="description" content="人气FPS电竞手游《全民枪战2》生存竞技版本即将上线!跳伞？飙车？捡枪对决！最极致的操作手感，最专业的射击体系，最上瘾的野战演习手游！靠运气更靠实力！圈快缩了，叫上兄弟准备组队迎战！" />
    <link rel="shortcut icon" href="http://cdnstatic.yingxiong.com/qmqz//6.0/images/favicon.ico?{$smarty.const.VERSION}">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>7.0/css/swiper.3.1.7.min.css?<?= VERSION?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>7.0/css/public.css?<?= VERSION?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>7.0/css/cover.css?<?= VERSION?>" />
</head>
<script data-fixed="true">
    if((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
        location.href = "/m"+window.location.pathname+window.location.search;
    }
</script>
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?4197a56f5c9a0de486bea7deb10092a6";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>

<body>
<script type="text/javascript" src="//cdnstatic.yingxiong.com/head/js/topbar.js?<?= VERSION?>"></script>
<div class="top">
    <div class="wrap">
        <div class="logo"><img src="<?php echo STATIC_DOMAIN?>7.0/images/logo.png?<?= VERSION?>" alt="" /></div>
        <div class="slogan">
            <img src="<?php echo STATIC_DOMAIN?>7.0/images/slogan.png?<?= VERSION?>" alt="" />
            <?php if(isset($video)):?>
            <img class="js_video_play" data-url="<?= $video[0]['url']?>" src="<?php echo STATIC_DOMAIN?>7.0/images/play.png?<?= VERSION?>" alt="" />
            <?php endif;?>
        </div>
        <div class="btn">
            <a class="app js_down_ios" href="javascript:;">
                <img src="<?php echo STATIC_DOMAIN?>7.0/images/app.png?<?= VERSION?>" alt="" />
                <img src="<?php echo STATIC_DOMAIN?>7.0/images/app_h.png?<?= VERSION?>" alt="" />
            </a>
            <a class="enter" href="/index.html">
                <img src="<?php echo STATIC_DOMAIN?>7.0/images/enter.png?<?= VERSION?>" alt="" />
                <img src="<?php echo STATIC_DOMAIN?>7.0/images/enter_h.png?<?= VERSION?>" alt="" />
            </a>
            <a class="andriod js_down_andriod" href="javascript:;">
                <img src="<?php echo STATIC_DOMAIN?>7.0/images/andriod.png?<?= VERSION?>" alt="" />
                <img src="<?php echo STATIC_DOMAIN?>7.0/images/andriod_h.png?<?= VERSION?>" alt="" />
            </a>
        </div>
    </div>
    <div class="f_video">
        <video src="<?php echo STATIC_DOMAIN?>7.0/images/flv.mp4" autoplay="autoplay" loop="loop"></video>
    </div>
</div>
<div class="middle">
    <div class="wrap">
        <div class="label"><img src="<?php echo STATIC_DOMAIN?>7.0/images/label.png?<?= VERSION?>" alt="" /></div>
        <div class="banner">
            <ul class="swiper-wrapper">
                <?php  if($play_img): foreach ($play_img as $key=>$value):?>
                <li class="swiper-slide">
                    <a href="javascript:;"><img src="<?= $value['img']?>" alt="" /></a>
                </li>
                <?php endforeach;endif;?>
            </ul>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="uk">
            <img src="<?php echo STATIC_DOMAIN?>7.0/images/98k.png?<?= VERSION?>" alt="" />
        </div>
    </div>
</div>
<div class="l_main">
    <div class="wrap">
        <div class="label1"><img src="<?php echo STATIC_DOMAIN?>7.0/images/label1.png?<?= VERSION?>" alt="" /></div>
        <div class="t_tab">
            <ul>
                <li class="active">全部赛事</li>
                <li>正在进行</li>
                <li>已结束</li>
            </ul>
        </div>
        <div id="time"></div>
        <div class="zhu_body">
            <?php if($data): ?>
            <div class="m_body active">
                <ul>
                    <?php foreach ($data as $key=>$value):?>
                    <li>
                        <a href="<?=$value['link_pc'];?>"  target="_blank">
                            <div class="m_img">
                                <img src="<?=$value['img'];?>" alt="" />
                                <div class="wks">
                                    <?php if($value['type']=='ing'):?>
                                    <img src="<?php echo STATIC_DOMAIN?>7.0/images/jxz.png?<?= VERSION?>" alt="" />
                                    <?php elseif ($value['type']=='ed'):?>
                                    <img src="<?php echo STATIC_DOMAIN?>7.0/images/wks.png?<?= VERSION?>" alt="" />
                                    <?php else:?>
                                    <img src="<?php echo STATIC_DOMAIN?>7.0/images/yjs.png?<?= VERSION?>" alt="" />
                                    <?php endif;?>
                                </div>
                                <div class="time">
                                    <?= $value['start_time']?>
                                </div>
                            </div>
                        </a>

                        <?php if($value['type']=='ed'):?>
                        <div class="m_txt">
                            <p>距离赛事开启还有</p>
                            <div class="datatime" data-time="<?= $value['start_time'];?>">
                                <span>01</span><em>:</em>
                                <span>59</span><em>:</em>
                                <span>23</span>
                            </div>
                            <div class="datatit">
                                <span>HOURS</span>
                                <span>MINUTES</span>
                                <span>SECONDS</span>
                            </div>
                        </div>
                        <?php else:?>
                        <div class="m_ctxt">
                        <p><?= $value['title'];?></p>
                        <p class="second_p"><?= $value['summary'];?></p>
                        </div>
                        <?php endif;?>
                    </li>
                    <?php endforeach;?>
                </ul>
            </div>
            <div class="m_body">
                <ul>
                <?php if(isset($ing) && !empty($ing)): foreach ($ing as $key=>$value):?>
                    <li>
                        <a href="<?=$value['link_pc'];?>"  target="_blank">
                            <div class="m_img">
                                <img src="<?=$value['img'];?>" alt="" />
                                <div class="wks">
                                    <img src="<?php echo STATIC_DOMAIN?>7.0/images/jxz.png?<?= VERSION?>" alt="" />
                                </div>
                                <div class="time"><?= $value['start_time']?></div>
                            </div>
                        </a>
                        <div class="m_ctxt">
                            <p><?= $value['title'];?></p>
                            <p class="second_p"><?= $value['summary']?></p>
                        </div>
                    </li>
                 <?php endforeach;?>
                <?php else:?>
                    <p class="wsj_txt" style="text-align: center;font-size:40px;color:#666;line-height:400px;">暂无数据~</p>
                </ul>
                <?php  endif;?>
            </div>
            <div class="m_body">
                <ul>
                <?php if(isset($end) && !empty($end)): foreach ($end as $key=>$value):$j=0;?>
                        <li>
                            <a href="<?=$value['link_pc'];?>"  target="_blank">
                                <div class="m_img">
                                    <img src="<?=$value['img'];?>" alt="" />
                                    <div class="wks">
                                        <img src="<?php echo STATIC_DOMAIN?>7.0/images/yjs.png?<?= VERSION?>" alt="" />
                                    </div>
                                    <div class="time"><?= $value['start_time']?></div>
                                </div>
                            </a>
                            <div class="m_ctxt">
                                <p><?= $value['title'];?></p>
                                <p class="second_p"><?= $value['summary']?></p>
                            </div>
                        </li>

                    <?php endforeach;else:?>
                    <p class="wsj_txt" style="text-align: center;font-size:40px;color:#666;line-height:400px;">暂无数据~</p>
                    <?php endif;?>
                </ul>
            </div>
            <?php else:?>
                <p class="wsj_txt" style="text-align: center;font-size:40px;color:#666;line-height:400px;">暂无数据~</p>
            <?php endif;?>
        </div>
    </div>
    <script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js?<?= VERSION?>"></script>
</div>
</body>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>7.0/js/jquery-1.7.1.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>7.0/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script type="text/javascript">
    $(function (){
        var mySwiper = new Swiper ('.banner', {
            autoplay : 2000,
            loop: true,
            simulateTouch : false,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
        $(".t_tab li").click(function (){
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(".zhu_body .m_body").eq(index).addClass("active").siblings().removeClass("active");
        });
        function ShowCountDown(dateString,this_)
        {
            var now = new Date();
            var endDate = new Date(dateString);
            var leftTime=endDate.getTime()-now.getTime();
            var leftsecond = parseInt(leftTime/1000);
            var hour=Math.floor((leftsecond-60*60)/3600);
            var minute=Math.floor((leftsecond-60*60-hour*3600)/60);
            var second=Math.floor(leftsecond-60*60-hour*3600-minute*60);
            if(hour<10) hour='0'+hour;
            if(minute<10) minute='0'+minute;
            if(second<10) second='0'+second;
            this_.find('span').eq(0).text(hour);
            this_.find('span').eq(1).text(minute);
            this_.find('span').eq(2).text(second);
        }

        $(".datatime").each(function (i,b){
            var this_=$('.datatime').eq(i);
            var datatime = $('.datatime').eq(i).attr("data-time");
            setInterval(function(){ShowCountDown( datatime,this_)},0);
        })
    });
</script>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
</html>
