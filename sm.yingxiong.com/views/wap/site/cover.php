<?php

use yii\helpers\Url;
use yii\helpers\Html;

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>创造与魔法官方网站 每一个有趣的梦想 都将在这里实现</title>
    <meta name="keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>">
    <meta name="description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>">
    <?= Html::csrfMetaTags() ?>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/m/common/css/common.min.css?<?php echo time();?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/m/common/css/swiper.3.1.7.min.css?<?php echo time();?>" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/m/css/index.css?<?php echo time();?>" />
    <script type="text/javascript">
        document.addEventListener('plusready', function() {
            //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"

        });
    </script>

    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cd3c5f317e3f5ced9e323d594c3eb7b3";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <style type="text/css">
        .banner-box .swiper-slide:first-child{
            background: url(<?php echo STATIC_DOMAIN ?>2.0/m/img/bannerbg.jpg) no-repeat left;
            background-size: auto 100%;
        }
        .banner-box .swiper-slide:nth-child(2){
            background: url(<?php echo STATIC_DOMAIN ?>2.0/m/img/bannerbg.jpg) no-repeat center;
            background-size: cover;
        }
        .banner-box .swiper-slide:last-child{
            background: url(<?php echo STATIC_DOMAIN ?>2.0/m/img/bannerbg.jpg) no-repeat right;
            background-size: auto 100%;
        }
        .b-box img{
            width: 100%;
        }
        .btns{
            display: flex;
            box-sizing: border-box;
            width: 100%;
            padding: 0 10px;
        }
        .btns a{
            flex: 1;
            padding: 0 5px;
        }
        .btns a img{
            width: 100%;
        }
        .bottom-box{
            display: none;
        }
    </style>
</head>

<body>
<header class="index1_header">
    <a href="/m/index.html" class="index1_logo"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/icon.png" alt=""></a>
    <div class="header_txt">
        <p class="h_p_01">创造与魔法</p>
        <p class="h_p_02">3D多人在线开放世界手游</p>
    </div>
</header>
<section>
    <div class="main">
        <div class="swiper-container banner-box">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
<!--                    <img src="--><?php //echo STATIC_DOMAIN ?><!--2.0/m/img/banner01.jpg" />-->
                </div>
                <div class="swiper-slide">
<!--                    <img src="--><?php //echo STATIC_DOMAIN ?><!--2.0/m/img/banner02.jpg" />-->
                </div>
                <div class="swiper-slide">
<!--                    <img src="--><?php //echo STATIC_DOMAIN ?><!--2.0/m/img/banner03.jpg" />-->
                </div>
            </div>
        </div>
        <div class="slogin">
            <img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/txt.png" title="" alt="" />
        </div>
        <div class="play" data-rel="<?php echo $video[0]['url'] ?>">
            <i class="video-b"></i>
            <i class="video-l"></i>
        </div>
<!--        <div class="yyrs">-->
<!--            预约人数&nbsp;<span>--><?php //echo $count; ?><!--</span>-->
<!--        </div>-->
    </div>
</section>
<section class="btns">
    <a><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/bb1.png"/></a>
    <a href="http://www.3839.com/a/88284.htm"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/bb2.png"/></a>
    <a><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/bb3.png"/></a>
</section>
<section>
<!--    <div class="luntan">-->
<!--        <a class="jr" href="javascript:alert('敬请期待');"></a>-->
<!--        <a class="yxyy" href="javascript:;"></a>-->
<!--    </div>-->
</section>
<section class="sect bottom-box">
    <section class="b-box">
        <a><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/b_btn.png"/></a>
    </section>
</section>
<section class="news">
    <ul class="news-nav clearfix">
        <li class="curr"><a href="javascript:">全部</a></li>
        <li><a href="javascript:">新闻</a></li>
        <li><a href="javascript:">公告</a></li>
        <li><a href="javascript:">活动</a></li>
        <li><a href="javascript:">攻略</a></li>
        <a href="<?php echo Url::to(['wap/article/index'])?>"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/add.png" /></a>
    </ul>
    <aside class="center">
        <ul class="news-li lis show">
            <?php if (!empty($zuixin)) {?>
                <?php foreach ($zuixin as $v) {?>
                    <li><a href="<?php echo Url::to(['wap/article/detail', 'id' => $v['id']])?>"><i>【新闻】</i><?php echo mb_substr(strip_tags($v['title']), 0, 15, 'utf-8')."..." ?>  </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                <?php }?>

            <?php } else {?>
                <div class="none">
                    <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                    <p>暂无内容~</p>
                </div>
            <?php }?>


        </ul>
        <ul class="news-li hide lis">
            <?php if (!empty($xinwen)) {?>
                <?php foreach ($xinwen as $v) {?>
                    <li><a href="<?php echo Url::to(['wap/article/detail/detail', 'id' => $v['id']])?>"><i>【新闻】</i><?php echo mb_substr(strip_tags($v['title']), 0, 15, 'utf-8')."..." ?>  </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                <?php }?>

            <?php } else {?>
                <div class="none">
                    <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                    <p>暂无内容~</p>
                </div>
            <?php }?>
        </ul>
        <ul class="news-li hide lis">
            <?php if (!empty($gonggao)) {?>
                <?php foreach ($gonggao as $v) {?>
                    <li><a href="<?php echo Url::to(['wap/article/detail', 'id' => $v['id']])?>"><i>【公告】</i><?php echo mb_substr(strip_tags($v['title']), 0, 15, 'utf-8')."..." ?>  </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                <?php }?>

            <?php } else {?>
                <div class="none">
                    <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                    <p>暂无内容~</p>
                </div>
            <?php }?>
        </ul>
        <ul class="news-li hide lis">
            <?php if (!empty($huodong)) {?>
                <?php foreach ($huodong as $v) {?>
                    <li><a href="<?php echo Url::to(['wap/article/detail', 'id' => $v['id']])?>"><i>【活动】</i><?php echo mb_substr(strip_tags($v['title']), 0, 15, 'utf-8')."..." ?>  </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                <?php }?>

            <?php } else {?>
                <div class="none">
                    <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                    <p>暂无内容~</p>
                </div>
            <?php }?>

        </ul>
        <ul class="news-li hide lis">
            <?php if (!empty($gonglue)) {?>
                <?php foreach ($gonglue as $v) {?>
                    <li><a href="<?php echo Url::to(['wap/article/detail', 'id' => $v['id']])?>"><i>【攻略】</i><?php echo mb_substr(strip_tags($v['title']), 0, 15, 'utf-8')."..." ?>  </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                <?php }?>

            <?php } else {?>
                <div class="none">
                    <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                    <p>暂无内容~</p>
                </div>
            <?php }?>

        </ul>
    </aside>
    <p class="bottom"></p>
</section>
<section class="rukou">
    <div class="ziliao"><a href="<?php Url::to(['/article/data'])?>"><img src="<?php echo STATIC_DOMAIN; ?>3.0/m/img/ziliao.png" title="" alt="" /></a></div>
    <div class="gonglve"><a href="<?php Url::to(['/article/raiders'])?>"><img src="<?php echo STATIC_DOMAIN; ?>3.0/m/img/gonglve.png" title="" alt="" /></a></div>
</section>
<section>
    <div class="main_banner">
        <div class="swiper-wrapper">
            <?php foreach ($banners as $k => $v) {?>
                <div class="swiper-slide">
                    <a href="<?php echo $v['url'] ?>"><img src="<?php echo $v['thumb']; ?>" /></a>
                </div>
            <?php } ?>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</section>
<section>
    <div class="xiniu">
        <img class="xn_bg" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/xiniu.png" title="" alt="" />
    </div>
</section>
<section>
<!--    <div class="login">-->
<!--        <h3>二级文案，若有，游戏好了第一时间通知你！间通知你！！！！！！</h3>-->
<!--        <form action="javascript:;" onsubmit="false">-->
<!--            <input class="tel js-phone" type="number" placeholder="输入手机号码" />-->
<!--            <input class="code js-yzm" type="number" placeholder="验证码" />-->
<!--            <button class="btn js-send-code">发送</button>-->
<!--            <a class="lgyy js-yuyue" href="javascript:;">立即预约</a>-->
<!--            <span class="close"></span>-->
<!--        </form>-->
<!--    </div>-->

    <div class="login">
        <h3>亲，IOS暂未开放，请您先预约，游戏包好后，我们会第一时间通知您的~</h3>
        <form action="">
            <input class="tel js-phone" type="tel" placeholder="输入手机号码" />
            <!--<input class="code js-yzm" type="tel" placeholder="验证码" />-->
            <!--<button class="btn js-send-code">发送</button>-->
            <div class="ios">
                <input type="radio" name="xitong" checked="checked" value="ios"/><span>iOS预约</span>
            </div>
<!--            <div class="android">-->
<!--                <input type="radio" name="xitong" value="android"/><span>Android预约</span>-->
<!--            </div>-->
            <a class="lgyy js-yuyue" href="javascript:;">立即预约</a>
            <span class="close"></span>
        </form>
    </div>

</section>

<section class="weixin">
    <aside class="wx clearfix">
        <div class="lef"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/weixin.png"></div>
        <div class="rig">
            <p class="tit">微信公众号</p>
            <p class="p1">扫描二维码关注官方微信</p>
            <p class="p2">官方微信号<a href="#">创造与魔法手游</a></p>
        </div>
    </aside>
</section>
<section class="weibo">
    <aside class="wx clearfix">
        <div class="lef"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/weibo.png"></div>
        <div class="rig">
            <p class="tit">微博</p>
            <p class="p1">扫描二维码关注微博</p>
            <p class="p2">微博<a href="http://weibo.com/u/6293873121?refer_flag=1001030102_&is_hot=1">创造与魔法</a></p>
        </div>
    </aside>
</section>
<section class="qq">
    <aside class="wx clearfix">
        <div class="lef"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/weibo.png"></div>
        <div class="rig">
            <p class="tit">QQ群</p>
            <p class="p1">好玩乐趣手游等你加入</p>
            <p class="p2">QQ群号<a href="https://jq.qq.com/?_wv=1027&k=4BcLfPN">542437012</a></p>
        </div>
    </aside>
</section>

<div class="mask"></div>
<div id="video_tck">
    <div id="player5">
        <div id="close"></div>
        <iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src="" frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn"></iframe>
    </div>
</div>

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>
<div style="height: 3.85625rem;">

</div>
</body>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/m/common/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/m/common/js/jquery.fittext.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/m/common/js/swiper.3.1.7.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/m/js/index.js"></script>
<script type="text/javascript">
    var wait = 60;
    $(function() {
        $('html').fitText(2);

        var mySwiper = new Swiper('.swiper-container', {
            initialSlide: 1,
        })

        var mySwiper = new Swiper('.main_banner', {

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

        })

        $(".yxyy").click(function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                var href = $('.js_wap_down').attr('href');
                location.href=href;
            }
            if (isIOS) {
                $(".login").show();
                $(".mask").show();
            }
        })

        $(".close").click(function() {
            $(".login").hide();
            $(".mask").hide();
        });

        $(".play").click(function (){
            var rel = $(this).attr('data-rel');
            if(rel){
                $("#iframe_btn").attr("src","<?php echo Url::to(['/videoMobile/video-source']) ?>?"+rel);
            }
            $("#video_tck").show();
            $(".mask").show();
        })

        $("#close").click(function (){
            $("#video_tck").hide();
            $(".mask").hide();
        })

        $(".ios").click(function (){
            $(".android").value("2");
        })

        $('.js-send-code').click(sendCode);
        $('.js-yuyue').click(yuYue);

        $(window).scroll(function(){
            var winH = $(window).height();
            var topH = $(window).scrollTop();
            if(topH > winH){
                $(".bottom-box").fadeIn();
            } else{
                $(".bottom-box").fadeOut();
            }
        })
    })

    function sendCode()
    {
        var phone = $('.js-phone').val();
        if (!checkPhone(phone)) {
            alert('手机号不正确');
            return;
        }
        if (wait != 60 && wait != 0) {
            return;
        }
        var obj = this
        var cms_csrf = $('meta[name="csrf-token"]').attr('content');
        $.post("<?php echo Url::to(['/commonMethod/get-verify']) ?>", {phone:phone, cms_csrf:cms_csrf}, function(data){
            if (data.status != 0) {
                alert(data.msg);
            } else {
                time(obj);
            }
        }, 'JSON');
    }

    function checkPhone (phone)
    {
        if(/^1[3|4|5|7|8|9]\d{9}$/.test(phone)){
            return true;
        }
        return false;
    }

    function time(o) {
        if(wait == 0) {
            o.removeAttribute("disabled");
            o.innerHTML = "再次发送";
            wait = 60;
        } else {

            o.setAttribute("disabled", true);
            o.innerHTML = wait+'s';
            wait--;
            setTimeout(function() {
                    time(o)
                },
                1000)
        }
    }

    function yuYue () {
        var phone = $('.js-phone').val();
        var yzm = $('.js-yzm').val();
        if(!checkPhone(phone)){
            alert('该手机号码不正确');
        } else {
            var cms_csrf = $('meta[name="csrf-token"]').attr('content');
            var type = $('input[name="xitong"]:checked').val();
            $.post('<?php echo Url::to(['/commonMethod/yuyue']) ?>', {phone:phone, cms_csrf:cms_csrf, type:type, is_no_yzm:1}, function(data){
                if(data.status == 0){
                    $(".login").hide();
                    $(".mask").hide();
                    alert('预约已成功');
                }else{
                    alert(data.msg);
                }
            }, 'JSON');
        }
    }
</script>

</html>

<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>