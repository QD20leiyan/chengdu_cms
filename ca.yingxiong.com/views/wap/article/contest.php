<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>全民枪战2_官方网站_ca，新一代的枪战选择</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <meta name="keywords" content="绝地求生，吃鸡，生存竞技，吃鸡手游,生存游戏，求生，求生游戏，大逃杀，陈赫,全民枪战,全民枪战2，CA，全民吃鸡，大吉大利，全民枪战官网,全民枪战下载，全民创造,全民枪战激活码,全民枪战礼包,FPS手游,枪战手游,竞技手游，射击手游，枪战游戏，FPS游戏，机甲，射击游戏" />
    <meta name="descriptions" content="人气FPS电竞手游《全民枪战2》生存竞技版本即将上线!跳伞？飙车？捡枪对决！最极致的操作手感，最专业的射击体系，最上瘾的野战演习手游！靠运气更靠实力！圈快缩了，叫上兄弟准备组队迎战！" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>7.0/m/css/swiper.3.1.7.min.css?<?= VERSION?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>7.0/css/public.css?<?= VERSION?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>7.0/m/css/cover.css?<?= VERSION?>" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN?>7.0/m/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
    <script type="text/javascript">
        (function(win, doc) {
            if(!win.addEventListener) return;
            var html = document.documentElement;

            function setFont(cb) {
                var w = html.clientWidth,
                    h = html.clientHeight;
                html.style.fontSize = w > h ? w / 1136 * 100 + "px" : w / 640 * 100 + "px";
                if(cb && typeof(cb) == "function") {
                    cb()
                }
            }
            doc.addEventListener('DOMContentLoaded', setFont, false);
            win.addEventListener('resize', setFont, false);
            win.addEventListener('load', setFont, false);
        })(window, document);
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

</head>

<body>

<section>
    <div class="kv">
        <div class="fly_char">
            <img class="z_kv" src="<?php echo STATIC_DOMAIN?>7.0/m/images/kv.jpg?<?= VERSION?>" alt="" />
            <img class="z_char" src="<?php echo STATIC_DOMAIN?>7.0/m/images/char.png?<?= VERSION?>" alt="" />
            <img class="t_cloud" src="<?php echo STATIC_DOMAIN?>7.0/m/images/t_cloud.png?<?= VERSION?>" alt="" />
            <img class="l_cloud" src="<?php echo STATIC_DOMAIN?>7.0/m/images/l_cloud.png?<?= VERSION?>" alt="" />
            <img class="r_cloud" src="<?php echo STATIC_DOMAIN?>7.0/m/images/r_cloud.png?<?= VERSION?>" alt="" />
        </div>
        <img class="logo" src="<?php echo STATIC_DOMAIN?>7.0/images/logo.png?<?= VERSION?>" alt="" />
        <div class="slogan">
            <img src="<?php echo STATIC_DOMAIN?>7.0/images/slogan.png?<?= VERSION?>" alt="" />
            <?php if(isset($video)):?>
            <img  class="js_video_play"   data-url="<?= $video[0]['url']?>" src="<?php echo STATIC_DOMAIN?>7.0/images/play.png?<?= VERSION?>" alt="" />
            <?php endif;?>
        </div>
        <div class="download">
            <img src="<?php echo STATIC_DOMAIN?>7.0/m/images/btn.png?<?= VERSION?>" alt="" />
            <a class="enter" href="/m/index.html"></a>
            <a class="dl js_wap_down" href="javascript:;"></a>
        </div>
        <img style="width:100%;height:10.28rem;overflow: hidden;" src="<?php echo STATIC_DOMAIN?>7.0/m/images/gi.gif" alt="" />
    </div>
</section>
<section>
    <div class="bg">
        <img src="<?php echo STATIC_DOMAIN?>7.0/images/label.png?<?= VERSION?>" alt="" class="label"/>
        <div class="m_banner">
            <ul class="swiper-wrapper">
                <?php  if($play_img): foreach ($play_img as $key=>$value):?>
                <li class="swiper-slide">
                    <a href="javascript:;"><img src="<?= $value['img']?>" alt="" /></a>
                </li>
                <?php endforeach;endif;?>
            </ul>
        </div>
        <div class="swiper-pagination"></div>
        <img class="uk" src="<?php echo STATIC_DOMAIN?>7.0/m/images/98k.png?<?= VERSION?>" alt="" />
    </div>
</section>
<section>
    <div class="btm">
        <img src="<?php echo STATIC_DOMAIN?>7.0/images/label1.png?<?= VERSION?>" alt="" class="label1"/>
        <div class="m_tab">
            <ul>
                <li class="active">全部赛事</li>
                <li>正在进行</li>
                <li>已结束</li>
            </ul>
        </div>
            <div class="m_content">
                <div class="main_body">
                    <?php if($data): ?>
                        <div class="m_pic active">
                    <ul class="swiper-wrapper">
                    <?php foreach ($data as $key=>$value):?>
                        <li class="swiper-slide">
                            <a href="<?=$value['link_wap'];?>" target="_blank">
                                <img class="z_img" src="<?= $value['img']?>" alt="" />
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
                            </a>

                                <?php if($value['type']=='ed'):?>
                            <div class="m_txt">
                                <p>距离赛事开启还有</p>
                                <div class="datatime" data-time="<?= $value['start_time']?>">
                                    <span></span><em>:</em>
                                    <span></span><em>:</em>
                                    <span></span>
                                </div>
                                <div class="datatit">
                                    <span>HOURS</span>
                                    <span>MINUTES</span>
                                    <span>SECONDS</span>
                                </div>
                            </div>
                                <?php else:?>
                            <div class="m_ctxt">
                                    <p class="f_p"><?= $value['title'];?></p>
                                    <p class="s_p"><?= $value['summary'];?></p>
                            </div>
                                <?php endif;?>
                        </li>
                    <?php endforeach;?>
                    </ul>
                    <div class="swiper-pagination01"></div>
                      </div>
                        <div class="m_pic">
                            <ul class="swiper-wrapper">
                                <?php if(isset($ing) && !empty($ing)): foreach ($ing as $key=>$value):?>
                                <li class="swiper-slide">
                                    <a href="<?=$value['link_wap'];?>"  target="_blank">
                                        <img class="z_img" src="<?= $value['img']?>" alt="" />
                                        <div class="wks">
                                            <img src="<?php echo STATIC_DOMAIN?>7.0/images/jxz.png?<?= VERSION?>" alt="" />
                                        </div>
                                        <div class="time">
                                            <?= $value['start_time']?>
                                        </div>
                                    </a>
                                    <div class="m_ctxt">
                                        <p class="f_p"><?= $value['title'];?></p>
                                        <p class="s_p"><?= $value['summary']?></p>
                                    </div>
                                </li>
                                <?php endforeach;else:?>
                                        <p class="wsj_txt" style="text-align: center;font-size:0.5625rem;color:#666;line-height:4rem;width:100%;margin-left:0.8rem;">暂无数据~</p>
                                 <?php endif;?>
                            </ul>
                            <div class="swiper-pagination01"></div>
                        </div>
                        <div class="m_pic">
                    <ul class="swiper-wrapper">
                        <?php if(isset($end) && !empty($end)): foreach ($end as $key=>$value):?>
                                <li class="swiper-slide">
                                    <a href="<?=$value['link_wap'];?>"  target="_blank">
                                        <img class="z_img" src="<?= $value['img']?>" alt="" />
                                        <div class="wks">
                                            <img src="<?php echo STATIC_DOMAIN?>7.0/images/yjs.png?<?= VERSION?>" alt="" />
                                        </div>
                                        <div class="time">
                                            <?= $value['start_time']?>
                                        </div>
                                    </a>
                                    <div class="m_ctxt">
                                        <p class="f_p"><?= $value['title'];?></p>
                                        <p class="s_p"><?= $value['summary']?></p>
                                    </div>
                                </li>
                            <?php endforeach;else:?>
                                <p class="wsj_txt" style="text-align: center;font-size:0.5625rem;color:#666;line-height:4rem;width:100%;margin-left:0.8rem;">暂无数据~</p>
                            <?php endif;?>
                    </ul>
                    <div class="swiper-pagination01"></div>
                </div>
                    <?php else:?>
                        <p class="wsj_txt" style="text-align: center;font-size:0.5625rem;color:#666;line-height:4rem;width:100%;margin-left:0.8rem;">暂无数据~</p>
                    <?php endif;?>
                </div>
        </div>
    </div>
</section>
</body>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>7.0/m/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js?<?= VERSION?>"></script>
<script type="text/javascript">
    $(function (){
        var mySwiper = new Swiper(".m_banner" , {
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            observer:true,
            observeParents:true,
        });
        var mySwiper01 = new Swiper(".m_pic" , {
            spaceBetween : 20,
            pagination: '.swiper-pagination01',
            observer:true,
            observeParents:true,
        });
        $(".m_tab li").click(function (){
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(".main_body .m_pic").eq(index).addClass("active").siblings().removeClass("active");
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
    })
</script>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
</html>
