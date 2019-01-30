<?php echo $this->render('@app/views/layouts/wap/nav.php', ['global' => $global]);?>
<section class="news news-list">
    <ul class="news-nav clearfix">
        <h4><?php echo $data['name'];?></h4>
    </ul>
    <aside class="center">
        <p><?php echo $data['title'];?></p>
        <span>发布时间：<?php echo date('Y-m-d', $data['created_at'])?> 来源：本网站</span>
        <article class="p">
            <?php echo $data['body']?>
        </article>
    </aside>
    <p class="bottom"></p>
</section>
<section class="bg"></section>


<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/m/common/js/swiper.3.1.7.min.js"></script>
<script src="http://cdnstatic.yingxiong.com/common/js/yx.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>2.0/js/index.js"></script>
<script type="text/javascript">
    $(function(){
        $('body').addClass('news-cont');
        var img = $(".p img")
        $.trim(img);
    })
</script>
