<?php

use yii\helpers\Url;

$this->title = '视频列表';
$this->params['breadcrumbs'][] = $this->title;

$this->title = '弹弹岛2官方视频中心弹弹岛2官方网站-新一代休闲弹射竞技手游-英雄互娱';
$this->description = '弹弹岛2官方视频中心，弹弹岛2官方宣传视频、弹弹岛2玩法视频、弹弹岛2游戏视频在线观看。弹弹岛2是SNH48三位成员李艺彤、莫寒、杨韫玉代言的新一代休闲竞技弹射手游，经典抛物线射击玩法易上手！Q萌画面，甜美人物，可爱宠物，领略冒险世界！探险之地、组队副本，战斗场景多样，天梯竞技、娱乐PK，竞技玩法丰富~更有语音聊天、结拜、结婚等多样社交玩法，给您不同的休闲竞技弹射体验！。欣赏更多弹弹岛2游戏视频就上弹弹岛2官方视频中心！';
$this->keywords = '弹弹岛2官方视频中心,弹弹岛2视频,弹弹岛2玩法视频,弹弹岛2宣传片, 弹弹岛2官方下载,弹弹岛2安卓,弹弹岛2ios,弹弹岛2礼包,弹弹岛2安装包,弹弹堂手游,弹王杯,弹弹岛2论坛,弹弹岛2视频,SNH48,新手入门,新手礼包';
$navTitle = '';
?>

<style>
    .dropload-down{
        width:100%;
        text-align: center;
        float: left;
    }
</style>

<div class="hengping"><p>请竖屏浏览</p></div>
<?php echo $this->render('@app/views/layouts/wap/nav.php', ['navTitle' => $navTitle]);?>
<div class="top_H"></div>
<div class="d_movie_center">
    <div class="d_movie_header">视频中心</div>
    <div class="d_movie_nav">
        <li class="textActive" data-cid="40">全部视频<span index="0" class="m_active"></span><i></i></li>
<!--        <li class="textActive" data-cid="52">玩法攻略<span index="0" class="m_active"></span><i></i></li>-->
<!--        <li data-cid="53">新手教程<span index="1"></span><i></i></li>-->
<!--        <li data-cid="54">精彩赛事<span index="2"></span><i></i></li>-->
    </div>
    <div class="d_movie_lists">
<!--        <div class="d_movie_list">-->
<!--            <dt>-->
<!--            <div class="videos">-->
<!--                <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/pic_16.png" class="videos_play_btn">-->
<!--                <img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/pic_09.png" class="videos_play_mask">-->
<!--            </div>-->
<!--            </dt>-->
<!--            <dd>01标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</dd>-->
<!--        </div>-->

    </div>
    <div class="d_movie_lists" style="display:none;"></div>

    <div class="d_movie_lists" style="display:none;"></div>

    <div class="d_movie_lists" style="display:none;"></div>

    <!-- <div class="d_movie_more"><div>查看更多</div></div> -->
</div>


<script src="<?php echo STATIC_DOMAIN ?>3.0/m/js/dropload.min.js?<?= VERSION?>"></script>


<!--<script src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/js/common.js"></script>-->
<!--<div class="cover" style="display:none"></div>-->
<!--<div class="moviePlay" style="display:none">-->
<!--    <div class="movieClose"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/m/images/c.png"></div>-->
<!--    <div class="videos">-->
<!--        <iframe border="0" marginwidth="0" framespacing="0" marginheight="0" src="" frameborder="0" noresize="" scrolling="no" width="100%" height="100%" vspale="0" id="iframe_btn" name="iframe_btn"></iframe>-->
<!--    </div>-->
<!--</div>-->
<script>
    $(function(){

        var page = 1;
        var cid = '<?php echo $defaultCid;?>';

        //下拉加载
        var itemIndex = 0;
        var tab1LoadEnd = false;
        var tab2LoadEnd = false;
        var tab3LoadEnd = false;
        // tab
        $(".d_movie_nav li").on('click', function(){
            var $this = $(this);
            $(".d_movie_nav li").removeClass("textActive");
            $this.addClass("textActive");
            itemIndex = $this.find("span").attr("index");
            $this.find("span").addClass('m_active').parent("li").siblings("li").find('span').removeClass('m_active');
            $('.d_movie_lists').eq(itemIndex).show().siblings('.d_movie_lists').hide();

            page = 1;
            cid = $this.attr('data-cid');
            //下拉加载
            var tab1LoadEnd = false;
            var tab2LoadEnd = false;
            var tab3LoadEnd = false;
            var tab4LoadEnd = false;
            $('.d_movie_lists').eq(itemIndex).find('.d_movie_list').remove();

            // 如果选中菜单一
            if(itemIndex == '0'){
                // 如果数据没有加载完
                if(!tab1LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
                // 如果选中菜单二
            }else if(itemIndex == '1'){
                if(!tab2LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
                // 如果选中菜单三
            }else if(itemIndex == '2'){
                if(!tab3LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
            }
            // 重置
            dropload.resetload();
        });

        // dropload
        var dropload = $('.d_movie_lists').dropload({
            scrollArea : window,
            loadDownFn : function(me){
                // 加载菜单一的数据
                $.get('<?php echo Url::to(['wap/video/ajax-list']) ?>', {page:page, cid:cid}, function(data){
                    if (data.msg.length == 0) {
                        // 数据加载完
                        tab1LoadEnd = true;
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    } else {
                        var result = '';
                        for(var i = 0; i < data.msg.length; i++){
                            result += '<div class="d_movie_list"><dt><div class="videos" rel="'+data.msg[i].contentMessage+'">' +
                                '<img src="<?php echo STATIC_DOMAIN ?>3.0/m/images/pic_16.png" class="videos_play_btn js_video_play" data-url="'+data.msg[i].contentMessage+'"/>'+
                                '<img src="'+data.msg[i].thumb+'" class="videos_play_mask"/>'+
                                '</div></dt><dd>'+data.msg[i].title+'</dd></div>';
                        }
                        $('.d_movie_lists').eq(itemIndex).find(".dropload-down").before(result);
                        page++;

                        videoInit();
                    }
//
//                    movieClickOff()
//                    movieClick();
                    // 每次数据加载完，必须重置
                    me.resetload();
                }, 'json');

            }
        });
        function movieClick(){
            $(".d_movie_list").on("click",function(e){
//                e.stopPropagation();
//                var rel = $(this).find('.videos').attr('rel');
//                tankuang("/videoMobile/video-source.html?"+rel);

                e.stopPropagation();
                $(this).removeClass("d_h_play_tran");
//        windowHidden();
                $(".cover").show();
                $(".moviePlay").show();
                var rel = $(this).find('.videos').attr('rel');
                if(rel){
                    $("#iframe_btn").attr("src","/videoMobile/video-source.html?"+rel);
                }
                $(".cover,.movieClose img").on("click",function(e){
                    $(".d_h_play").addClass("d_h_play_tran")
                    $("#iframe_btn").attr("src","");
                    e.stopPropagation();
                    $(".cover").hide();
                    $(".moviePlay").hide();
//            windowScroll()
                });
            })
        }
        function movieClickOff(){
            $(".d_movie_list").off();
        }
    });

</script>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
<script src="//cdnstatic.yingxiong.com/footer/js/footer.js"></script>