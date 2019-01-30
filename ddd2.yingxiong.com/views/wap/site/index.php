<?php

use common\Cms;
use yii\helpers\Url;

$navTitle = 'shouye';

?>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>3.0/m/css/index.css?<?= VERSION?>">
<div class="hengping"><p>请竖屏浏览</p></div>

<?php echo $this->render('@app/views/layouts/wap/nav.php', ['navTitle' => $navTitle,'global'=>$global]);?>
<div class="d_header">
    <img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_03.png" class="d_h_bg">
    <img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_04.png" class="d_h_play d_h_play_tran js_video_play" data-url="uu=58546ec681&vu=d36a4ff707">
</div>
<div class="d_news">
    <div class="d_news_header">新闻资讯</div>
    <div class="d_news_nav">
        <li class="textActive">资讯<span index="0" class="active"></span><i></i></li>
        <li>公告<span index="1"></span><i></i></li>
        <li>活动<span index="2" class=""></span><i></i></li>
        <li>攻略<span index="3"></span><i></i></li>
    </div>
    <div class="d_news_lists">
        <ul class="d_news_list">
            <?php foreach ($xinwen as $k => $v) { ?>
                <li data-url="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('wap/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>">
                    <span><?php echo $v['title'] ?></span><i>[<?php echo date('m/d', $v['created_at']) ?>]</i>
                </li>
            <?php } ?>

        </ul>
        <ul class="d_news_list" style="display:none;">
            <?php foreach ($gonggao as $k => $v) { ?>
                <li data-url="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('wap/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>">
                    <span><?php echo $v['title'] ?></span><i>[<?php echo date('m/d', $v['created_at']) ?>]</i></li>
            <?php } ?>
        </ul>
        <ul class="d_news_list" style="display:none;">
            <?php foreach ($huodong as $k => $v) { ?>
                <li data-url="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('wap/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>">
                    <span><?php echo $v['title'] ?></span><i>[<?php echo date('m/d', $v['created_at']) ?>]</i></li>
            <?php } ?>
        </ul>
        <ul class="d_news_list" style="display:none;">
            <?php foreach ($gonglue as $k => $v) { ?>
                <li data-url="<?php $id = $v->old_id ? $v->old_id : $v->id; echo Cms::getUrl('wap/detail',array('aid'=>$id,'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>">
                    <span><?php echo $v['title'] ?></span><i>[<?php echo date('m/d', $v['created_at']) ?>]</i></li>
            <?php } ?>
        </ul>
        <div class="d_news_load"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/loading.png">正在加载...</div>
        <div class="d_news_more"><div>查看更多</div></div>
    </div>
</div>
<div class="d_guagn">
    <?php foreach ($activity as $v) { ?>
        <div><a href="<?php echo $v['url'] ?>"><img width="100%" height="100%" src="<?php echo $v['thumb'] ?>"></a></div>
    <?php } ?>
</div>
<div class="swiper-container d_swiper_01">
    <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_08.png"></div>
        <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_09.png"></div>
        <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_10.png"></div>
        <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_11.png"></div>
    </div>
    <div class="swiper-pagination"></div>
</div>
<div class="d_movie_center">
    <div class="d_movie_header">视频中心</div>
    <div class="d_movie_nav">
        <li class="textActive">全部视频<span index="0" class="m_active"></span><i></i></li>
<!--        <li class="textActive">玩法攻略<span index="0" class="m_active"></span><i></i></li>-->
<!--        <li>新手教程<span index="1"></span><i></i></li>-->
<!--        <li>精彩赛事<span index="2"></span><i></i></li>-->
    </div>

    <div class="d_movie_lists">
        <?php foreach ($gameVideo as $v) {?>
            <div class="d_movie_list">
                <dt>
                <div class="videos">
                    <img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_16.png" class="videos_play_btn js_video_play" data-url="<?php echo $v->contentMessage?>">
                    <img src="<?php echo $v['thumb']?>" class="videos_play_mask">
                </div>
                </dt>
                <dd><?php echo $v['title'];?></dd>
            </div>
        <?php } ?>

    </div>

<!--    <div class="d_movie_lists">-->
<!--        --><?php //foreach ($wanFaVideo as $v) {?>
<!--            <div class="d_movie_list">-->
<!--                <dt>-->
<!--                    <div class="videos" rel="--><?php //echo $v['redirect_url']?><!--">-->
<!--                        <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/pic_16.png" class="videos_play_btn">-->
<!--                        <img src="--><?php //echo $v['thumb']?><!--" class="videos_play_mask">-->
<!--                    </div>-->
<!--                </dt>-->
<!--                <dd>--><?php //echo $v['title'];?><!--</dd>-->
<!--            </div>-->
<!--        --><?php //} ?>
<!---->
<!--    </div>-->
<!--    <div class="d_movie_lists" style="display:none;">-->
<!--        --><?php //foreach ($xinShouVideo as $v) {?>
<!--            <div class="d_movie_list">-->
<!--                <dt>-->
<!--                <div class="videos" rel="--><?php //echo $v['redirect_url']?><!--">-->
<!--                    <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/pic_16.png" class="videos_play_btn">-->
<!--                    <img src="--><?php //echo $v['thumb']?><!--" class="videos_play_mask">-->
<!--                </div>-->
<!--                </dt>-->
<!--                <dd>--><?php //echo $v['title'];?><!--</dd>-->
<!--            </div>-->
<!--        --><?php //} ?>
<!---->
<!---->
<!--    </div>-->
<!--    <div class="d_movie_lists" style="display:none;">-->
<!--        --><?php //foreach ($saiShiVideo as $v) {?>
<!--            <div class="d_movie_list">-->
<!--                <dt>-->
<!--                <div class="videos" rel="--><?php //echo $v['redirect_url']?><!--">-->
<!--                    <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/pic_16.png" class="videos_play_btn">-->
<!--                    <img src="--><?php //echo $v['thumb']?><!--" class="videos_play_mask">-->
<!--                </div>-->
<!--                </dt>-->
<!--                <dd>--><?php //echo $v['title'];?><!--</dd>-->
<!--            </div>-->
<!--        --><?php //} ?>
<!---->
<!---->
<!--    </div>-->


    </div>
    <div class="d_movie_more"><div>查看更多</div></div>
</div>
<div class="footer">
    <div class="footer_m">
        <div><img src="<?= $global['wx_img']?>"><span></span></div>
        <div>
            <p>微信公众号</p>
            <p>扫描二维码关注官方微信</p>
            <p>官方微信号：<span>弹弹岛2</span></p>
        </div>
    </div>
    <div class="footer_m">
        <div><img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_14.png"><span></span></div>
        <div>
            <p>客户服务</p>
            <p>BUG反馈，游戏问题</p>
            <p>客户服务电话：<span>400-939-333</span></p>
        </div>
    </div>
</div>
<div class="cover"></div>
<!--<div class="moviePlay">-->
<!--    <div class="movieClose"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/c.png"></div>-->
<!--    <div class="videos">-->
<!--        <iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src="" frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn" name="iframe_btn"></iframe>-->
<!--    </div>-->
<!--</div>-->


<script src="<?php echo STATIC_DOMAIN ?>3.0/m/js/swiper.min.js?<?= VERSION?>"></script>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js?{$smarty.const.VERSION}"></script>
<script>
    var swiper = new Swiper(".swiper-container",{
        autoplay:3000,

        loop:true,
        pagination:".swiper-pagination"
    });
    var isClick = true;  //判断是否可以点击
    init(0)
    function init(index){
        isClick = false;
        $(".d_news_nav li span").removeClass("active")
        $(".d_news_nav li span").eq(0).addClass("active");

    }


    $(".d_news_nav li").on("click",function(e){
        e.stopPropagation();
        if($(this).hasClass("active")){
            return false;
        }else{
            isClick = true;
            if(isClick){

                isClick = false;

                $(".d_news_nav li").removeClass("textActive");
                $(this).addClass("textActive");





                $(".d_news_nav li span").removeClass("active");
                $(this).find("span").addClass("active");

                var index = $(this).find("span").attr("index");

                $('.d_news_list').hide();
                $('.d_news_list').eq(index).show();

//                $(".d_news_list").hide();
//                $(".d_news_load").css("display","-webkit-box");

            }else{
                return false;
            }
        }
    });
    $(".d_movie_nav li").on("click", function(e){
        e.stopPropagation();
        if($(this).hasClass("m_active")){
            return false;
        }else{
            $(".d_movie_nav li").removeClass("textActive");
            $(this).addClass("textActive");

            var index  = $(this).find("span").attr("index");
            $(".d_movie_nav li span").removeClass("m_active");
            $(this).find("span").addClass("m_active");
            $(".d_movie_lists").hide();
            $(".d_movie_lists").eq(index).show();
        }

    })

    $(".d_news_more").on("click", function(e){
        e.stopPropagation();
        location.href="<?php echo Cms::getUrl('wap/list',array('cid'=>38,'cat_dir'=>'info'))?>";
    });
    $(".d_movie_more").on("click", function(e){
        e.stopPropagation();
        location.href="<?php echo Url::to(['wap/video/index'])?>"

    })
    function toLists(){
        $(".d_news_list li").on("click", function(e){
            e.stopPropagation();
            var url = $(this).attr('data-url');
            location.href=url;
        })
    };
//    $(".d_h_play").on("click", function(e){
//        if($(this).hasClass("d_h_play_tran")){
//            $(this).removeClass("d_h_play_tran");
////            windowHidden();
//            var rel = $(this).attr('rel');
//            if(rel){
//                $("#iframe_btn").attr("src","/videoMobile/video-source.html?"+rel);
//            }
//            $(".cover").show();
//            $(".moviePlay").show();
//            $(".cover,.movieClose img").on("click",function(e){
//                $(".d_h_play").addClass("d_h_play_tran")
//                $("#iframe_btn").attr("src","");
//                e.stopPropagation();
//                $(".cover").hide();
//                $(".moviePlay").hide();
////                windowScroll()
//            });
//        }
//
//    });

//    $(".d_movie_list").on("click", function(e){
//        e.stopPropagation();
//        $(this).removeClass("d_h_play_tran");
////        windowHidden();
//        $(".cover").show();
//        $(".moviePlay").show();
//        var rel = $(this).find('.videos').attr('rel');
//        if(rel){
//            $("#iframe_btn").attr("src","/videoMobile/video-source.html?"+rel);
//        }
//        $(".cover,.movieClose img").on("click",function(e){
//            $(".d_h_play").addClass("d_h_play_tran")
//            $("#iframe_btn").attr("src","");
//            e.stopPropagation();
//            $(".cover").hide();
//            $(".moviePlay").hide();
////            windowScroll()
//        });
//    });

    function offLists(){
        $(".d_news_list li").off();
    }

    function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
    function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    };

</script>

<script>
    toLists();
</script>
<script src="//cdnstatic.yingxiong.com/footer/js/footer.js"></script>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>