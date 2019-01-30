<?php

use yii\helpers\Url;
use common\Cms;

?>
<style>
    .mengban{
        width:100%;
        height:103px;
        background: url(<?php echo STATIC_DOMAIN ?>1.0/images/mengban.png) no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
        left:0;
        top:0;
        z-index:99;

    }
    .float{
        top: 61%;
    }
</style>
<div class="index-bg b">

    <?php echo $this->render('@app/views/layouts/pc/show.php');?>

    <div class="min-bg clearfix" >
        <div class="cont">
            <div class="clearfix">
                <div class="banner-lef">
                    <div class="slider">


                        <div class="slider">
                            <div class="slider-img swiper-container swiper_01">

                                <ul class="slider-img-ul swiper-wrapper">
                                    <?php foreach ($banners as $k => $v) { ?>
                                        <li class="swiper-slide swiper-no-swiping"><a target="_blank" href="<?php echo $v['url']; ?>" target="_blank"><img src="<?php echo $v['thumb'] ?>"></a></li>
                                    <?php } ?>

                                </ul>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination">
                                    <span id="span"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <ul class="clearfix">
                        <li>
                            <p>
                                <?php foreach ($xinshou as $k => $v) { ?>
                                <a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v->title; ?></a>
                                <?php } ?>
                            </p>
                        </li>
                        <li>
                            <p>
                                <?php foreach ($fuben as $k => $v) { ?>
                                    <a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v->title; ?></a>
                                <?php } ?>
                            </p>
                        </li>
                        <li>
                            <p>
                                <?php foreach ($tese as $k => $v) { ?>
                                    <a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v->title; ?></a>
                                <?php } ?>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="clearfix">
                <div class="news-left">
                    <ul class="clearfix">
                        <?php foreach ($martial as $k => $v) { ?>
                        <li><a target="_blank" href="javascript:" <?php if ($k == 0) {echo 'class="on"';} ?>><?php echo $v['title'] ?></a></li>
                        <?php } ?>
                    </ul>

                    <?php foreach ($martial as $k => $v) { ?>
                        <div class="content" style="display:<?php if ($k == 0) {echo 'block';} else {echo 'none';} ?>">
                            <div class="img"><img src="<?php echo $v['thumb'] ?>"></div>
                            <div class="txt">
                                <?php echo $v['summary']; ?>
                            </div>
                            <i class="play-1 js_video_play" data-url="<?php echo $v['url'] ?>"></i>
                        </div>

                    <?php } ?>
                </div>
                <div class="news-right">
                    <ul class="clearfix">
                        <li class="nav-list"><a target="_blank" href="javascript:" class="curr">最新</a></li>
                        <li class="nav-list"><a target="_blank" href="javascript:">新闻</a></li>
                        <li class="nav-list"><a target="_blank" href="javascript:">公告</a></li>
                        <li class="nav-list"><a target="_blank" href="javascript:">攻略</a></li>
                        <p class="more"><i></i><a target="_blank" href="<?php echo Cms::getUrl('article/list', ['cid' => 31]); ?>">MORE</a></p>
                    </ul>
                    <div class="news-deta">
                        <?php foreach ($zuixin as $k => $v) { ?>
                            <p><i></i><a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v['title'] ?></a><span><?php echo date('m/d', $v['created_at']) ?></span></p>
                        <?php } ?>
                    </div>
                    <div class="news-deta">
                        <?php foreach ($xinwen as $k => $v) { ?>
                            <p><i></i><a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v['title'] ?></a><span><?php echo date('m/d', $v['created_at']) ?></span></p>
                        <?php } ?>
                    </div>
                    <div class="news-deta">
                        <?php foreach ($gonggao as $k => $v) { ?>
                            <p><i></i><a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v['title'] ?></a><span><?php echo date('m/d', $v['created_at']) ?></span></p>
                        <?php } ?>
                    </div>

                    <div class="news-deta">
                        <?php foreach ($gongnue as $k => $v) { ?>
                            <p><i></i><a target="_blank" href="<?php echo Cms::getUrl('site/details', ['id' => $v['id'], 'add_time' => $v['created_at']]) ?>"><?php echo $v['title'] ?></a><span><?php echo date('m/d', $v['created_at']) ?></span></p>
                        <?php } ?>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="swiper_show"> <!--新增图片轮播-->
        <div class="swiper_show_01">
            <div class="swiper-container swiper_02" dir="rtl">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="<?php echo $szYl[0]['thumb']?>">
<!--                        <div class="slide_text">--><?php //echo $szYl[0]['title']?><!--</div>-->
                        <div class="mengban"></div>
                    </div>
                    <div class="swiper-slide">
                        <img src="<?php echo $szLf[0]['thumb']?>">
<!--                        <div class="slide_text">--><?php //echo $szLf[0]['title']?><!--</div>-->
                        <div class="mengban"></div>
                    </div>
                    <div class="swiper-slide">
                        <img src="<?php echo $szJz[0]['thumb']?>">
<!--                        <div class="slide_text">--><?php //echo $szJz[0]['title']?><!--</div>-->
                        <div class="mengban"></div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev swiper-button-prev2"></div>
                <div class="swiper-button-next swiper-button-next2"></div>
            </div>
            <div class="swiper_more"><a target="_blank" href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => $szJz[0]['parent_id']])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/swiper_more.png"></a></div>
        </div>
        <div class="swiper_show_01">
            <div class="swiper-container swiper_03" >
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img src="<?php echo $rwYl[0]['thumb']?>">
                        <div class="mengban"></div>
                    </div>
                    <div class="swiper-slide">
                        <img src="<?php echo $rwLf[0]['thumb']?>">
                        <div class="mengban"></div>
                    </div>
                    <div class="swiper-slide">
                        <img src="<?php echo $rwJz[0]['thumb']?>">
                        <div class="mengban"></div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev swiper-button-prev3"></div>
                <div class="swiper-button-next swiper-button-next3"></div>
            </div>
            <div class="swiper_more"><a target="_blank" href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => $rwJz[0]['parent_id']])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/swiper_more.png"></a></div>
        </div>
    </div>
    <div class="people_show">
        <div class="people_show_01">
            <div class="container">
                <div class="trans"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/loadImg.png"></div>
                <div class="container_title">
                    <div>BOSS展示区</div>
                </div>
                <div class="container_info">
                    <div class="container_name">
                        <div class="inner">
                            <div id="boss_title"><?php echo $boss[0]['title']?></div>
                            <div class="inner_number">
                                <span id="boss_id">01</span>
                                <span>/</span>
                                <span><?php echo $countBoss?></span>
                            </div>
                        </div>
                    </div>
                    <div class="container_text">
                        <div id="summary"><?php echo $boss[0]['summary']?></div>
                    </div>
                    <div class="boss_img">
                        <img id="boss_img" width="100%" height="100%" src="<?php echo $boss[0]['content_message']?>">
                    </div>
                </div>

                <div class="swiper_04">
                    <div>
                        <img class="show_to_left_01" src="<?php echo STATIC_DOMAIN ?>1.0/images/show_03_to_left_no.png" alt="">
                        <img class=" show_to_left show_to_left_02" src="<?php echo STATIC_DOMAIN ?>1.0/images/show_03_to_left.png" alt="" >
                    </div>
                    <div class="swipepr_con">
                        <div class="swipepr_box" id="scroll">
                            <div class="swipepr_lists">
                                <?php foreach ($boss as $k => $v) {?>
                                    <div class="<?php if ($k == 0) {echo 'divActive';}?>" data="<?php echo $k;?>" data-id="<?php echo $k;?>">
                                        <div class="activeBorder"></div>
                                        <div class="activeB"></div>
                                        <img src="<?php echo $v['thumb']?>">
                                        <input class="js_summary" id="boss_msg_<?php echo $k?>" value="<?php echo $v['summary']?>" type="hidden">
                                        <input class="js_img" id="boss_img_<?php echo $k?>" value="<?php echo $v['content_message']?>" type="hidden">
                                        <input class="js_title" id="boss_title_<?php echo $k?>" value="<?php echo $v['title']?>" type="hidden">
                                    </div>
                                <?php }?>

                            </div>
                        </div>
                    </div>
                    <div>
                        <img class="show_to_right show_to_right_01" src="<?php echo STATIC_DOMAIN ?>1.0/images/show_03_to_right.png" alt="">
                        <img class="show_to_right_02" src="<?php echo STATIC_DOMAIN ?>1.0/images/show_03_to_right_no.png" alt="">
                    </div>
                </div>

            </div>
        </div>
        <div class="people_show_02">
            <div class="cuteload">
                <div class="cuteload_con cuteload_con1">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/images/bz_cute.png" class="cuteload_bg">
                    <a target="_blank" href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => $jietu[0]['category_id']])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/add_fix.png" class="cuteload_btn cuteload_btn1"></a>
                </div>
            </div>
            <div class="cuteload">
                <div class="cuteload_con cuteload_con2">
                    <img src="<?php echo STATIC_DOMAIN ?>1.0/images/bz_load.png" class="cuteload_bg">
                    <a target="_blank" href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => $bizi[0]['category_id']])?>"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/add_fix.png" class="cuteload_btn cuteload_btn2"></a>
                </div>
            </div>
        </div>

    </div>

    <!-- 底部电话 -->
    <?php echo $this->render('@app/views/layouts/pc/tel.php');?>
    <?php echo $this->render('@app/views/layouts/pc/float.php');?>
    <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
</div>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/swiper-3.4.0.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/iscroll.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>
<script>
    var mySwiper_01 = new Swiper('.swiper_01',{
        autoplay: 5000,
        paginationClickable :true,
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction:false
    });
    var mySwipe_02 = new Swiper('.swiper_02',{
        autoplay: 3000,
        loop:true,
        preventClicks : false,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        prevButton:'.swiper-button-prev2',
        nextButton:'.swiper-button-next2',
        autoplayDisableOnInteraction:false,
        paginationBulletRender: function (swiper,index, className){
            var font = ["月轮","吟风","剑宗"];
            return '<li class="' + className + '">'+font[index]+'</li>';
        }
    });
    var mySwipe_03 = new Swiper('.swiper_03',{
        autoplay: 3000,
        loop:true,
        preventClicks : false,
        pagination : '.swiper-pagination',
        paginationClickable :true,
        autoplayDisableOnInteraction:false,
        prevButton:'.swiper-button-prev3',
        nextButton:'.swiper-button-next3',
        paginationBulletRender: function (swiper,index, className){
            var font = ["月轮","吟风","剑宗"];
            return '<li class="' + className + '">'+font[index]+'</li>';
        }
    });
    //add new
    $(function(){
        var distance = 470;     //每次点击滚动的距离
        var curDistance = 0;    //translate的距离
        var navLength = Math.floor($(".swipepr_lists>div").length/6)-2;
        if($(".swipepr_lists>div").length%6==0){
            navLength--;
        }
        //滚动的个数
        //console.log(navLength);
        $(".swipepr_lists>div").on("click", function(e){
            var summary = $(this).find('.js_summary').val();
            var img = $(this).find('.js_img').val();
            var title = $(this).find('.js_title').val();
            $('#summary').text(summary);
            $('#boss_img').attr('src', img);
            $('#boss_title').text(title);
            $(this).addClass("divActive").siblings("div").removeClass("divActive");
            var id = $(this).attr('data-id');
            var index = parseInt(id)+1

            $('#boss_id').text(index);
        });
        // var myScroll = new IScroll('#scroll', {
        //     eventPassthrough: true,
        //     scrollX: true,
        //     scrollY: false,
        //     preventDefault: false;
        // });
        $(".show_to_right").on("click",function(e){
            e.stopPropagation();

            curDistance = $(".swipepr_lists").css("transform").replace(/[^0-9\-,]/g,'').split(',')[4]||0;
            //console.log(curDistance)
            $(".swipepr_lists").css("transform","translate("+(curDistance-distance)+"px)");

            if(-curDistance/470<=navLength){
                $(".show_to_right_01").show();
                $(".show_to_right_02").hide();
            }else{
                $(".show_to_right_01").hide();
                $(".show_to_right_02").show();
            }


            if(curDistance<=0){
                $(".show_to_left_01").hide();
                $(".show_to_left_02").show();
            }else{
                $(".show_to_left_01").show();
                $(".show_to_left_02").hide();
            }
            //console.log(curDistance-distance);



        })
        $(".show_to_left").on("click",function(e){
            e.stopPropagation();

            curDistance = $(".swipepr_lists").css("transform").replace(/[^0-9\-,]/g,'').split(',')[4]||0;
            $(".swipepr_lists").css("transform","translate("+(parseInt(curDistance)+parseInt(distance))+"px)");



            console.log(-curDistance/470);
            console.log(navLength)
            // console.log(navLength);
            // console.log(curDistance/470>=-1)
            if(curDistance/470>=-1){
                $(".show_to_left_01").show();
                $(".show_to_left_02").hide();
            }else{
                $(".show_to_left_01").hide();
                $(".show_to_left_02").show();
            }

            if(-curDistance/470<navLength){
                $(".show_to_right_01").hide();
                $(".show_to_right_02").show();
            }else{
                $(".show_to_right_01").show();
                $(".show_to_right_02").hide();
            }
            //console.log(parseInt(curDistance)+parseInt(distance))
        });

    })
</script>
