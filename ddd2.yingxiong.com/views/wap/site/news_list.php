<?php

use yii\helpers\Url;

if ($cid == 36) {
    $navTitle = 'huodong';
} else if ($cid == 37) {
    $navTitle = 'gonglue';
} else {
    $navTitle = 'xinwen';
}
?>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>3.0/m/css/news_lists.css?<?= VERSION?>">
<style>
    .d_news_list{height:auto;}
</style>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>3.0/m/css/dropload.css?<?= VERSION?>">

<script src="<?php echo STATIC_DOMAIN ?>3.0/m/js/dropload.min.js?<?= VERSION?>"></script>
<div class="hengping"><p>请竖屏浏览</p></div>

<?php echo $this->render('@app/views/layouts/wap/nav.php', ['navTitle' => $navTitle,'global'=>$global]);?>

<div class="top_H"></div>
<div class="d_news">
    <div class="d_news_header">新闻资讯</div>
    <div class="d_news_nav">
        <li <?php if ($cid == 38) {echo 'class="textActive"';} ?> data-cid="38">资讯<span index="0" <?php if ($cid == 38) {echo 'class="active"';} ?> ></span><i></i></li>
        <li <?php if ($cid == 39) {echo 'class="textActive"';} ?> data-cid="39">公告<span index="1" <?php if ($cid == 39) {echo 'class="active"';} ?>></span><i></i></li>
        <li <?php if ($cid == 36) {echo 'class="textActive"';} ?> data-cid="36">活动<span index="2" <?php if ($cid == 36) {echo 'class="active"';} ?>></span><i></i></li>
        <li <?php if ($cid == 37) {echo 'class="textActive"';} ?> data-cid="37">攻略<span index="3" <?php if ($cid == 37) {echo 'class="active"';} ?>></span><i></i></li>
    </div>
    <div class="d_news_lists">
        <ul class="d_news_list">
            <!-- <li><span>关于游戏漏洞恶意刷道具处理办法如下所示</span><i>[05/28]</i></li></li> -->
        </ul>
        <ul class="d_news_list" style="display:none;"></ul>
        <ul class="d_news_list" style="display:none;"></ul>
        <ul class="d_news_list" style="display:none;"></ul>
        <!-- <div class="d_news_more"><div>查看更多</div></div> -->
    </div>
</div>

<script>
    $(function(){
        var page = 1;
        var cid = '<?php echo $cid ?>';
        //下拉加载
        var itemIndex = 0;
        var tab1LoadEnd = false;
        var tab2LoadEnd = false;
        var tab3LoadEnd = false;
        var tab4LoadEnd = false;
        var page0 = 1;
        var page1 = 1;
        var page2 = 1;
        var page3 = 1;
        // tab
        $('.d_news_nav li ').on('click', function(){
            var $this = $(this);

            $(".d_news_nav li").removeClass("textActive");
            $(this).addClass("textActive");

            itemIndex = $this.find("span").attr("index");

            $('.d_news_nav li').find("span").removeClass('active');
            $this.find("span").addClass('active');
            //console.log($this.addClass('liActive').parent("div"));

            $('.d_news_list').eq(itemIndex).show().siblings('.d_news_list').hide();

            page = 1;
            cid = $this.attr('data-cid');
            //下拉加载
            var tab1LoadEnd = false;
            var tab2LoadEnd = false;
            var tab3LoadEnd = false;
            var tab4LoadEnd = false;
            $('.d_news_list').eq(itemIndex).find('li').remove();

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
            }else if(itemIndex == '3'){
                if(!tab4LoadEnd){
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
        var dropload = $('.d_news_list').dropload({
            scrollArea : window,
            loadDownFn : function(me){
                // 加载菜单一的数据
                $.get('<?php echo Url::to(['wap/site/ajax-news']) ?>', {page:page, cid:cid}, function(data){
                    if (data.status == 0) {
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
                                result += '<li><a href='+data.msg[i].url+'><span>'+data.msg[i].title+'</span><i>['+data.msg[i].created_at+']</i></a></li>';
                            }
                            console.log(itemIndex);
                            $('.d_news_list').eq(itemIndex).find(".dropload-down").before(result);
                            page++;
                        }

                        offLists();
//                        toLists();
                        // 每次数据加载完，必须重置
                        me.resetload();
                    } else {
                        alert(data.msg);
                    }


                }, 'json')
            }
        });
    });

    function toLists(){
        $(".d_news_list li").on("click", function(e){
            e.stopPropagation();
            location.href="news_details.html";
        })
    }
    function offLists(){
        $(".d_news_list li").off();
    }
</script>
<script src="//cdnstatic.yingxiong.com/footer/js/footer.js"></script>