<?php

use common\Cms;
use yii\helpers\Url;
use yii\widgets\LinkPager;

?>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/css/jquery.fancybox.css">
<link rel="stylesheet" type="text/css" href="<?php echo STATIC_DOMAIN ?>1.0/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
<style>
    .i-v{
        top: 35.5%;
    }
    .tel{
        margin: 18px auto 50px auto;
        position: relative;
        top: 107px;
    }
    .img_class div a{
        color: #676666;
    }
    .img_class .img_active a {
        background: #ed6d67;
        color: #fff;
        position: relative;
    }
    .img_class>div:hover a {
        background: #ed6d67;
        color: #fff;
        position: relative;
        transition: color 0.2s linear;
    }
    .float{
        top: 61%;
    }
</style>

<body>
<div class="index-bg-top b">
    <?php echo $this->render('@app/views/layouts/pc/show.php');?>
</div>
<div class="index-bg-center">
    <div class="shadow"></div>
    <div class="center-bg" style="min-height:830px;">
        <div class="news-title clearfix">
            <a href="javascript:history.back(-1);" class="return" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/lef.png" /></a>
            <span><a href="<?php echo Url::to(['/index'])?>" target="_blank">首页 &gt; </a>图片专区</span>
            <div class="img_nav">
                <div id="pic" class="<?php  if (in_array($id, [102, 103, 107,112])) {echo 'nav_active';}?>" ind="0">精彩画面</div>
                <div id='bizi' class="<?php  if ($id == 113) {echo 'nav_active';}?>" ind="1">壁纸下载</div>
            </div>
            <div class="img_class" style="display: <?php  if (in_array($id, [102, 103, 107, 112])) {echo 'block';} else {echo 'none';}?>">
                <div class="<?php  if ($id == 102) {echo 'img_active';}?>"><a href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 102])?>">全部</a></div>
                <div class="<?php  if ($id == 103) {echo 'img_active';}?>"><a href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 103])?>">时装展示</a></div>
                <div class="<?php  if ($id == 107) {echo 'img_active';}?>"><a href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 107])?>">人物翅膀</a></div>
                <div class="<?php  if ($id == 112) {echo 'img_active';}?>"><a href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 112])?>">游戏截图</a></div>
            </div>
            <div class="img_lists clearfix <?php if ($id == 113) {echo 'img_lists_02';} else { echo 'img_lists_01';}?>">
                <?php foreach ($data as $k => $v) {?>
                    <div class="img_list">

                        <a class="fancybox" href="<?php echo $v['contentMessage']?>" data-fancybox-group="gallery" title="业余凌峰">

                            <img src="<?php echo STATIC_DOMAIN ?>1.0/images/fangdajing.png" class="list_fdj">
                            <div class="img_list_cover"></div>
                        </a>
                        <img src="<?php echo $v['thumb']?>" class="img">

                    </div>
                <?php }?>

            </div>
            <?php
            echo LinkPager::widget([
                'pagination' => $page,
                'hideOnSinglePage' => false,
                'firstPageLabel' => '首页',
                'lastPageLabel' => '尾页',
                'options' => ['class' => 'page'],
                'nextPageLabel' => false,
                'prevPageLabel' => false,
            ]);
            ?>
        </div>

    </div>
</div>
<div class="index-bg-bottom">
    <!-- 底部电话 -->
    <?php echo $this->render('@app/views/layouts/pc/tel.php');?>
    <?php echo $this->render('@app/views/layouts/pc/float.php');?>
    <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
</div>
</div>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/jquery-1.8.2.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/jquery.fancybox.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/jquery.mousewheel-3.0.6.pack.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/function.js"></script>

<script>
    $(function(){
        $('#pic').click(function(){
            location.href = '<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 102])?>';
        });

        $('#bizi').click(function(){
            location.href = '<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 113])?>';
        });

        $(document).scrollTop(450);
        //显示游戏截图或者壁纸下载；
        var curIndex = getParam("id");
        console.log(curIndex)
//        $(".img_nav>div").eq(curIndex).addClass("nav_active").siblings("div").removeClass("nav_active");
//        if(curIndex=="0"){
//            $(".img_navLine,.img_class").show();
//            $(".img_lists").addClass("img_lists_01").removeClass("img_lists_02")
//        }else{
//            $(".img_navLine,.img_class").hide();
//            $(".img_lists").addClass("img_lists_02").removeClass("img_lists_01")
//        }


        //点击显示游戏截图或者壁纸下载
        $(".img_nav>div").on("click",function(e){
            e.stopPropagation();
            var data = $(this).attr("ind");
            console.log(data)
            if(data=="0"){
                $(".img_navLine,.img_class").show();
                $(".img_lists").addClass("img_lists_01").removeClass("img_lists_02")
            }else{
                $(".img_navLine,.img_class").hide();
                $(".img_lists").addClass("img_lists_02").removeClass("img_lists_01")
            }


            $(this).addClass("nav_active").siblings("div").removeClass("nav_active");
        });
        $(".img_class>div").on("click",function(e){
            e.stopPropagation();
            $(this).addClass("img_active").siblings("div").removeClass("img_active");
        });
        $(".img_navLine>.div").on("click",function(e){
            e.stopPropagation();
            $(this).addClass("navActive").siblings(".div").removeClass("navActive");
        });

        //.img_list 鼠标移入移除显示
        $(".img_list").hover(function(){
            $(this).find(".list_fdj").addClass("list_fdj_show")
            $(this).find(".img_list_cover").addClass("img_list_cover_show")
        },function(){
            $(this).find(".list_fdj").removeClass("list_fdj_show")
            $(this).find(".img_list_cover").removeClass("img_list_cover_show")
        })

        $('.fancybox').fancybox({
//            helpers : {
//                title: {
//                    type: 'inside'
//                }, //<-- add a comma to separate the following option
//                buttons: {
//                    //这是按钮的模板，参见jquery.fancybox-buttons.js文件,
//                    //<li><a class="btnClose" title="Close" href="javascript:jQuery.fancybox.close();"></a></li>
//                    tpl: '<div id="fancybox-buttons"><ul><li><a class="loadImg" title="下载场景" href="javascript:;"><span>下载场景</span></a></li></ul></div>',
//
//
//                } //<-- add this for buttons
//            }

        });
//        $('body').on('click','.loadImg', function() {
//            alert("下载成功")
//        })//增加左转单击事件


    });

</script>
</body>
</html>