<!--底部导航-->
<div class="menu-footer">
    <a href="/m" title="首页" <?php if($nid==1){echo 'class="on"';} ?>>首页</a>
    <a href="/wap/hero_list.html" title="武将" <?php if($nid==2){echo 'class="on"';} ?>>武将</a>
    <a href="/wap/yh_list.html" title="影画" <?php if($nid==3){echo 'class="on"';} ?>>影画</a>
    <a href="javascript:;" title="联系" id="contact">联系</a>
</div>
<!--联系我们-->
<div class="contact-mode">
    <ul class="sec2-share">
        <li class="sec2-s-chart">
            <a href="javascript:;">
                <i></i>
                <span>官方微信公众号：jiwushuanghero</span>
            </a>
        </li>
        <li class="sec2-s-qq">
            <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=7c4baade507d3fe13a568d32d5f71ecb777adb42d131d6efddeca717bc6cd7d6">
                <i></i>
                <span>官方玩家QQ群：482957214</span>
            </a>
        </li>
        <li  class="sec2-s-ser">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2885626330&site=qq&menu=yes">
                <i></i>
                <span>官方客服QQ：2885626330</span>
            </a>
        </li>
        <li  class="sec2-s-bbs">
            <a href="http://bbs.yingxiong.com/index/gameBbsLogin?id=9" target="_blank" title="极无双社区">
                <i></i>
                <span>官方社区 点击进入</span>
            </a>
        </li>
        <li  class="sec2-s-tb">
            <a href="http://tieba.baidu.com/f?kw=%E6%9E%81%E6%97%A0%E5%8F%8C&fr=wwwt" target="_blank">
                <i></i>
                <span>官方贴吧 点击进入</span>
            </a>
        </li>
    </ul>
</div>
<!--礼包-->
<div class="mode-gift">
    <?php foreach($gift_image as $k=>$v){ ?>
        <?php if($k==0){ ?>
            <img src="<?php echo $v['image_url'] ?>" alt="img">
        <?php } ?>
    <?php } ?>
    <div class="gift-close"></div>
</div>
<!--微信二维码-->
<div class="we-chart-box">
    <div class="we-chart">
        <p>微信公众号：jiwushuanghreo</p>
        <img src="<?php echo STATIC_DOMAIN;?>common/images/ewm_wx.jpg" alt="极无双二维码">
    </div>
</div>
<!--视频-->
<!--<div id="video_tck">-->
<!--    <div id="player5">-->
<!--        <div id="close"></div>-->
<!--        <iframe border=0 marginWidth=0 frameSpacing=0 marginHeight=0 src="" frameBorder=0 noResize scrolling="no" width=100% height=100% vspale="0" id="iframe_btn" name="iframe_btn"></iframe>-->
<!--    </div>-->
<!--</div>-->

<script src="<?php echo STATIC_DOMAIN;?>m/js/jquery.fittext.js"></script>
<script src="<?php echo STATIC_DOMAIN;?>m/js/js.js"></script>
<?php $this->renderPartial("//common/downloadjs");?>
<?php $this->renderPartial("//common/tongji");?>
<?php $this->widget('application.widgets.videoPlay.VideoPlayWidget')?>
