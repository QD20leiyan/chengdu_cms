<!--主体-->
<div class="art-wrap h-mTop67">
    <div class="art-article">
        <div class="art-header">
            <span>新闻中心</span>
            <a href="/news.html"><span>&lt;</span>返回新闻中心</a>
        </div>
        <div class="art-content">
            <div class="HERO-art">
                <h1 class="artTitle"><?php echo $model->title;;?></h1>
                <p class="artInfo">发布时间：<?php echo date('Y年m月d日',$model->created_at);?><span>来源：<?php echo $model->user_name;?></span></p>
                <div class="artText">
                    <?php echo $content;?>
                    <div class="a_amore">
                        <div class="sns">
                            <div class="bdsharebuttonbox">
                                <a href="#" class="bds_more" data-cmd="more"></a>
                                <span>分享至：</span>
                                <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                                <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
                                <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
                                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                            </div>
                            <script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>