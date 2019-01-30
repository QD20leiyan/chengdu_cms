<?php

use common\Cms;
use yii\helpers\Url;

?>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/dropload.css" />

<!-- 下载 -->
<?php echo $this->render('@app/views/layouts/wap/download.php');?>

<div class="main_images">
    <!-- 视频播放 -->
    <?php echo $this->render('@app/views/layouts/wap/video.php');?>

    <div class="main_news">新闻资讯</div>

    <div class="news_navs">
        <div class="news_nav">
            <div><a style="color: #333333" href="<?php echo Cms::getUrl('wap/list', ['id' => 31])?>"><li class="<?php if ($type == 'zuixin') {echo 'liActive';} ?>" data="0">最新</li></a></div>
            <div><a style="color: #333333" href="<?php echo Cms::getUrl('wap/list', ['id' => 32]) ?>"><li class="<?php if ($type == 'xinwen') {echo 'liActive';} ?>" data="1">新闻</li></a></div>
            <div><a style="color: #333333" href="<?php echo Cms::getUrl('wap/list', ['id' => 33]) ?>"><li class="<?php if ($type == 'gonggao') {echo 'liActive';} ?>" data="2">公告</li></a></div>
        </div>
    </div>
    <div class="news_lists">
        <div class="news_list">
<!--            --><?php //foreach ($data as $k => $v) { ?>
<!--                <li><a style="color: #333333" href="--><?php //echo Url::to(['m/site/details', 'id' => $v['id']]) ?><!--"><p>[媒体] --><?php //echo $v['title']; ?><!--</p></a><span>--><?php //echo date('m/d', $v['created_at']) ?><!--</span></li>-->
<!--            --><?php //} ?>

        </div>
    </div>

</div>


<script>
    $(function(){
        //初始化
//        init(0);
        function init(num){
            $.ajax({
                type: 'POST',
                url: 'json/init.json',
                data:"data="+num,
                dataType: 'json',
                success: function(data){
                    console.log(data);
                    var dataList = data.lists;
                    console.log(dataList);
                    var result = "";
                    $.each(dataList, function(index, element){
                        result += '<li><p>'+element.title+'</p><span>'+element.date+'</span></li>';
                    });
                    //$('.news_list').eq(num).append(result);
                    $('.news_list').append(result);
                    offLists()
                    toLists()
                    dropload.resetload();
                }
            });
        }




        //下拉加载
        var itemIndex = 0;
        var tab1LoadEnd = false;
        var tab2LoadEnd = false;
        var tab3LoadEnd = false;
        // tab
        $('.news_nav li').on('click', function(){
            var $this = $(this);
            itemIndex = $this.attr("data");
            $this.addClass('liActive').parent("div").siblings("div").find('li').removeClass('liActive');
            //console.log($this.addClass('liActive').parent("div"));

            $('.news_list').eq(itemIndex).show().siblings('.news_list').hide();

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

        var counter = 0;
        // 每页展示4个
        var num = 4;
        var pageStart = 0,pageEnd = 0;

        var page = 1;
        var type = "<?php echo $type; ?>";
        // dropload
        var dropload = $('.news_lists').dropload({
            scrollArea : window,
            loadDownFn : function(me){
                // 加载菜单一的数据

                $.get("<?php echo Url::to(['m/site/news']) ?>", {page:page, type:type}, function(data){
                    console.log(data['msg']);
                    var result = '';
                    if (data.msg.length <= 0) {
                        // 数据加载完
                        tab1LoadEnd = true;
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    } else {
                        for(var i = 0; i < data.msg.length; i++){
                            result += '<li><a style="color: #333333" href="'+data.msg[i].wapLinkUrl+'"><p>'+data.msg[i].title+'</p></a><span>'+data.msg[i].created_at+'</span></li>';
                        }
                    }

                    $('.news_list').append(result);
                    offLists()
                    toLists()
                    // 每次数据加载完，必须重置
                    me.resetload();
                    tab3LoadEnd = true;
                    page += 1;
                }, 'JSON')

            }
        });
    });

    function toLists(){
        $(".news_lists").on("click", function(e){
            e.stopPropagation();
            location.href="detail01.html";
        })
    }
    function offLists(){
        $(".news_lists").off();
    }
</script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/js/public.js"></script>
</body>
</html>