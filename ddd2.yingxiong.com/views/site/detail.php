<?php

use common\Cms;
use yii\helpers\Url;

$this->title = $data['seo_title'];
$this->description = $data['seo_description'];
$this->keywords = $data['seo_keywords'];

?>
<link href="<?php echo STATIC_DOMAIN ?>3.0/css/style.css?<?= VERSION?>" rel="stylesheet">
<link href="<?php echo STATIC_DOMAIN ?>3.0/common/css/swiper.3.1.7.min.css?<?= VERSION?>" rel="stylesheet">
<div class="bg">
    <!--导航-->
    <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'news','global'=>$global]); ?>
    
    <section>
        <article class="art art-1 cont">
            <img src="<?php echo STATIC_DOMAIN ?>3.0/images/ddd_logo_1.png?<?= VERSION?>" />
            <span class="imgs"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/img1s.png?<?= VERSION?>" /></span>
        </article>
    </section>
    <div class="sec">
        <section class="clearfix">
            <article class="news-list-lef clearfix">
                <nav class="titles title-details">
                    <h3>
                        <a href="<?php echo Cms::getUrl('article/list',array('cid'=>1,'cat_dir'=>'info'))?>">
                            <img src="<?php echo STATIC_DOMAIN ?>3.0/images/lef_icon.png?<?= VERSION?>">
                        </a>
                        <?php echo $data['name']?>
                        <span>
                            <a href="<?php echo Url::to(['site/index'])?>">首页 &gt;</a>
                            <a href="<?php echo Cms::getUrl('article/list',array('cid'=>1,'cat_dir'=>'info'))?>">新闻资讯</a>
                        </span>
                    </h3>
                </nav>
                <div class="details-cont">
                    <div class="details-tit">
                        <p><?php echo $data['title']; ?></p>
                        <span>发布时间：<?php echo date('Y-m-d', $data['created_at'])?> 来源：本网站</span>
                    </div>
                    <?php echo $data['body']; ?>
                </div>
                <!-- JiaThis Button BEGIN -->
                <div class="jiathis_style">
                    <a class="jiathis_button_qzone"></a>
                    <a class="jiathis_button_tsina"></a>
                    <a class="jiathis_button_tqq"></a>
                    <a class="jiathis_button_weixin"></a>
                    <a class="jiathis_button_renren"></a>
                    <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>
                    <a class="jiathis_counter_style"></a>
                </div>
                <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
                <!-- JiaThis Button END -->
            </article>
            <article class="news-list-rig">
                <aside class="erweima">
                    <img src="http://gamerimage.yingxiong.com/qrcode/jump2_ddd2_pcgw.png" class=""/>
                    <i></i>
<!--                    <a class="js_down_ios" target="_blank" href="javascript:;"><img src="--><?php //echo STATIC_DOMAIN ?><!--3.0/images/ios1.png?<?= VERSION?>"></a>-->
                    <a href="http://l.taptap.com/EGoDqaq5" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/tap_img1.png?<?= VERSION?>"></a>
                    <a class="js_down_andriod" target="_blank" href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/android.png?<?= VERSION?>"></a>
                    <a href="http://bbs.yingxiong.com/t/pc/9" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>3.0/images/sq_img.png?<?= VERSION?>"></a>
                </aside>
                <aside class="pl-img">
                    <?php foreach ($activity as $v ) { ?>
                        <a href="<?php echo $v['url'] ?>"><img src="<?php echo $v['thumb'] ?>" /></a>
                    <?php } ?>
                </aside>
            </article>
        </section>
    </div>
</div>
<div class="i-main5">
    <div class="i-m5">
        <ul>
            <li>
                <div class="i-m5-ico">
                    <img class="jump_img" src="<?php echo STATIC_DOMAIN ?>3.0/images/erweima2.png?<?= VERSION?>" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>下载游戏</h3>
                    <p>扫描二维码，立即下载游戏</p>
                    <span>新竞技，更休闲</span>
                </div>
            </li>
            <li>
                <div class="i-m5-ico">
                    <img src="<?= $global['wx_img']?>" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>微信公众号</h3>
                    <p>扫描二维码，关注官方微信</p>
                    官方微信号：<span>弹弹岛2</span>
                </div>
            </li>
            <li>
                <div class="i-m5-ico">
                    <img src="<?php echo STATIC_DOMAIN ?>3.0/images/i_kefu.png?<?= VERSION?>" alt="">
                </div>
                <div class="i-m5-txt">
                    <h3>客户服务</h3>
                    <p>BUG反馈，游戏问题</p>
                    客户服务电话：<span>400-939-3333</span>
                </div>
            </li>
        </ul>
    </div>
</div>

<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/swiper.3.1.7.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/js/index.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>3.0/common/js/yx.js?<?= VERSION?>"></script>
