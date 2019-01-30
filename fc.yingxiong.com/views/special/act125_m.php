<?php



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS):$this->web_keywords?>" >
    <meta name="Description" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION):$this->web_description?>" >
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>3.0/m/css/index.css">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/common/css/common.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/swiper.3.1.7.min.css">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/m/css/css.css" rel="stylesheet"/>

</head>
<body>
<?php echo $this->render("//layouts/wap/nav");?>
<section class="page1_125">
    <a href="/" class="logo_125"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/logo_125.png" alt=""></a>
</section>
<section class="page2_125">
    <div class="page2_title_125"></div>
    <div class="page2_lb_125">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php foreach($sdzs as $k=>$v){ ?>
                    <div class="swiper-slide">
                        <img src="<?php echo $v['thumb'] ?>" alt="">
                    </div>
                <?php } ?>
            </div>
        </div>
        <div class="lb_01_prev"></div>
        <div class="lb_01_next"></div>
        <div class="txt">
            <p>限定赛道：水晶矿山</p>
            <p>限定赛车：使用B级及B级以下任意车型（原始未改装状态）</p>
            <p>限定时间：125秒</p>
            <p>详情介绍：玩家需使用原始未改装状态下的B级或B级以下任意车型，在125秒的限定时间内跑完全程。</p>
        </div>
    </div>
    </div>
</section>
<section class="page3_125">
    <div class="page3_title_125"></div>
    <div class="page3_t_125">
        <?php foreach($tzzx as $k=>$v){ ?>
            <div class="img_border">
                <a href="<?php echo $v['wapLinkUrl']?>">
                    <img src="<?php echo $v['thumb'] ?>" alt="">
                    <p><?php echo $v['title'] ?></p>
                </a>
            </div>
        <?php } ?>
    </div>
    <div class="page_b_125">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php foreach($tzlb as $k=>$v){ ?>
                    <div class="swiper-slide">
                        <a href="<?php echo $v['redirect_url'] ?>"><img src="<?php echo $v['thumb'] ?>" alt="" ></a>
                    </div>
                <?php } ?>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination">
                <?php foreach($tzlb as $k=>$v){ ?>
                    <span <?php if($k==0){echo 'id="span"';} ?>></span>
                <?php } ?>
            </div>
        </div>
        <div class="lb_02_prev"></div>
        <div class="lb_02_next"></div>
    </div>
</section>
<section class="page4_125">
    <div class="page4_title_125"></div>
    <a href="javascript:;" class="more_125"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/more_125.png" alt=""></a>
    <div class="page4_video_125">
        <?php foreach($jcsp as $k=>$v){ ?>
            <div class="video">
                <div class="videoImg">
                    <img src="<?php echo $v['thumb'] ?>" alt="">
                    <i class="video_i js_video_play" data-url="<?php echo $v['redirect_url'] ?>"></i>
                </div>
                <p><?php echo $v['title'] ?></p>
            </div>
        <?php } ?>
    </div>
</section>
<section class="page5_125">
    <div class="page5_title_125"></div>
    <div class="page5_lb">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php foreach($mrt as $k=>$v){ ?>
                    <div class="swiper-slide">
                        <div class="actor_01">
                            <div class="border">
                                <img src="<?php echo $v['thumb'] ?>" alt="">
                            </div>
                            <div class="name">敬请期待</div>
                            <p>挑战记录：<?php echo $v['sub_title'] ?>秒</p>
                            <p><?php echo $v['title'] ?></p>
                            <i class="video_i js_video_play" data-url="<?php echo $v['redirect_url'] ?>"></i>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        <div class="lb_03_prev"></div>
        <div class="lb_03_next"></div>
    </div>
</section>
<section class="page6_125">
    <div class="page6_title_125"></div>
    <div class="page6_lb_125">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <?php foreach($yxzb as $k=>$v){ ?>
                    <div class="swiper-slide">
                        <div class="page6_v">
                            <a href="<?php echo $v['redirect_url'] ?>"><img src="<?php echo $v['thumb'] ?>" alt=""></a>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        <div class="lb_04_prev"></div>
        <div class="lb_04_next"></div>
    </div>
</section>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>

<!--微信二维码-->
<div class="weixin_ewm">
    <img src="http://cdnstatic.yingxiong.com/yqlfc/1.0/common/images/ewm_wx.jpg" alt="">
</div>
<script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/m/js/jquery.fittext.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/swiper.3.1.7.min.js"></script>
<script>
    $('html').fitText(2);
    var mySwiper = new Swiper ('.page2_lb_125 .swiper-container', {
        loop: true,
        autoplay: 5000,
        // // 如果需要分页器
        // pagination: '.swiper-pagination',
        speed:500,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_01_next',
        prevButton: '.lb_01_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    var mySwiper = new Swiper ('.page_b_125 .swiper-container', {
        loop: true,
        autoplay: 5000,
        // // 如果需要分页器
        pagination: '.swiper-pagination',
        speed:500,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_02_next',
        prevButton: '.lb_02_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    var mySwiper = new Swiper ('.page5_lb .swiper-container', {
        loop: true,
        autoplay: 5000,
        // // 如果需要分页器
        // pagination: '.swiper-pagination',
        speed:500,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_03_next',
        prevButton: '.lb_03_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
    var mySwiper = new Swiper ('.page6_lb_125 .swiper-container', {
        loop: true,
        // autoplay: 5000,
        // // 如果需要分页器
        // pagination: '.swiper-pagination',
        speed:500,
        freeMode : true,
        // spaceBetween : -10,
        slidesPerView : 2,
        paginationClickable :true,
        // // 如果需要前进后退按钮
        nextButton: '.lb_04_next',
        prevButton: '.lb_04_prev',
        // // 如果需要滚动条
        // scrollbar: '.swiper-scrollbar',
    });
//    $(".video_i").click(function(){
//        var rel = $(this).attr('rel');
//        if(rel){
//            $("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
//            $("#index1_video_mask").show();
//            //兼容安卓延时获取iframe子元素高度来
//            setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
//        }else{
//            alert('暂无视频，敬请期待');
//            return false;
//        }
//    });

    $("#index1_close,#index1_video_mask").click(function(){
        $("#index1_video_mask").hide();
        setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
    });
    $("#index1player5").click(function(e){
        e.stopPropagation();
    });
    $(".index1_h_loadGame").click(function(){
        $(".h_select").toggle();
    })

    $(".index1_h_order1").click(function(){
        $(".h_select").toggle();
    })
    // 公众号
    $(".i_share_weixin").click(function(){
        $(".weixin_ewm").show();
    })
    $(".weixin_ewm").click(function(){
        $(".weixin_ewm").hide();
    });
    $(".weixin_ewm img").click(function(e){
        e.stopPropagation()
    });
</script>
</body>
</html>

<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget();?>
