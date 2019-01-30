<div class="about-wrap h-mTop67">
    <div class="abo-wrap abo-wrap0"  data-scroll-index="0">
        <div class="abo-wrap0-img" style="background:url(<?php echo STATIC_DOMAIN;?>2.0/images/abo-banner-1920x558.jpg) no-repeat center top;">
            <div class="abo-banner-txt">
                <h1>公司简介<span>company profile</span></h1>
                <div class="abo-banner-tit">

                    <?php if(isset($gsjj)):?>
                    <?= $gsjj[0]['content_message'] ?>
                    <?php endif;?>
                </div>
            </div>
        </div>
    </div>
    <div class="abo-wrap abo-wrap1" id="abo-wrap1" data-scroll-index="1">
        <span class="hero-xl"></span>
        <div class="h-year-list">
            <h1 class="font-face">公司发展<span> Company Development</span></h1>
            <div class="h-year-tab">
                <div class="hd">
                    <?php if(isset($gsfz)):?>
                    <?php foreach($gsfz as $k=>$v){ ?>
                        <div class="info" <?php if($k==0){echo 'style="display:block"';} ?>>
                            <h1><?php echo $v['title'] ?></h1>
                            <?php echo $v['content_message'] ?>
                        </div>
                    <?php } ?>
                    <?php endif;?>
                </div>
                <div class="bd">
                    <span class="year15 on" data-font="2015年"><i></i><span>2015年</span></span>
                    <span class="year16" data-font="2016年"><i></i><span>2016年</span></span>
                    <span class="year17" data-font="2017年"><i></i><span>2017年</span></span>
                    <span class="year18" data-font="2018年"><i></i><span>2018年</span></span>
                    <span class="year19" data-font="2019年"><i></i><span>2019年</span></span>
                    <span class="year20" data-font="2020年"><i></i><span>2020年</span></span>
                </div>
            </div>
        </div>
    </div>
    <div class="abo-wrap abo-wrap2" id="abo-wrap2" data-scroll-index="2">
        <span class="hero-xl"></span>
        <div class="h-honor-list h-cb">
            <h1 class="font-face">公司荣誉<span>Company Honor</span></h1>
            <div class="h-honor-tab h-cb">
                <div class="bd">
                    <!--span>2014</span-->
<!--                    <span class="on">2015</span>-->
<!--                    <span class="">2016</span>-->
<!--                    <span class="">2017</span>-->

                    <?php if(isset($gsry)):?>
                        <?php foreach($gsry as $k=>$v){ ?>
                            <span  <?php if($k==0){echo 'class="on"';} ?>>
                                <?php echo $v['title'] ?>
                            </span>
                        <?php } ?>
                    <?php endif;?>
                </div>
                <div class="hd">
                    <?php if(isset($gsry)):?>
                    <?php foreach($gsry as $k=>$v){ ?>
                        <div class="info" <?php if($k==0){echo 'style="display:block"';} ?>>
                            <?php echo $v['content_message'] ?>
                        </div>
                    <?php } ?>
                    <?php endif;?>
                    <a href="javascript:;" class="more"></a>
                </div>

            </div>
            <div class="honor-trophy"></div>
        </div>
    </div>
    <div class="abo-wrap abo-wrap3" id="abo-wrap3" data-scroll-index="3">
        <span class="hero-xl"></span>
        <div class="h-team-list">
            <h1 class="font-face">高管团队<span>management team</span></h1>
            <div class="h-teams-list h-cb">
                <div class="hd">
                    <?php if(isset($gsgg)):?>
                    <?php foreach($gsgg as $k=>$v){?>
                        <div class="info" <?php if($k==0){echo 'style="display:block"';} ?>>
                            <img src="<?php echo $v['thumb']; ?>" alt="应">
                            <div class="info-msg">
                                <h2><?php echo $v['title'] ?><span><?php echo $v['sub_title'] ?></span></h2>
                                <?php echo $v['content_message'] ?>
                            </div>
                        </div>
                    <?php } ?>
                    <?php endif;?>
                </div>
                <div class="bd">
                    <a href="javascript:;" class="prev"></a>
                    <div class="bd-list-c">
                        <ul	class="bd-list">
                            <?php if(isset($gsgg)):?>
                            <?php foreach($gsgg as $k=>$v){ ?>
                                <li class="<?php if($k==0){echo 'on';} ?>">
                                    <img src="<?php echo $v['thumb'];?>" alt="">
                                    <div class="bd-opc"></div>
                                </li>
                            <?php } ?>
                            <?php endif;?>
                        </ul>
                    </div>
                    <a href="javascript:;" class="next"></a>
                </div>
            </div>
        </div>
    </div>
    <div class="abo-wrap abo-wrap4" id="abo-wrap4" data-scroll-index="4">
        <span class="hero-xl"></span>
        <div class="h-culture-list">
            <h1 class="font-face">公司文化<span>company culture</span></h1>
            <img src="<?php echo STATIC_DOMAIN;?>2.0/images/about-bg3.jpg?<?=VERSION?>" alt="" class="h-culture-img">
        </div>
    </div>
    <div class="abo-wrap abo-wrap5" id="abo-wrap5" data-scroll-index="5">
        <div class="h-contact-list">
            <h1 class="font-face">联系我们<span>CONTACT us</span></h1>
            <dl class="h-contact-mail">
                <dd>商务合作：bd@yingxiong.com</dd>
                <dd>人员招聘：hr@yingxiong.com</dd>
                <dd>媒体合作：media@yingxiong.com</dd>
                <dd>投资关系：investment@yingxiong.com</dd>
                <dd>市场异业：key_account@yingxiong.com</dd>
                <dd>产品合作：product@yingxiong.com</dd>
                <dd>VR销售：vrsales@yingxiong.com</dd>
            </dl>
            <div class="h-contact-tab">
                <div class="bd">
                    <span class="on">北京<span>beijing</span></span>
                    <span>上海<span>shanghai</span></span>
                    <span>成都<span>chengdu</span></span>
                    <span>深圳<span>shenzhen</span></span>
                    <span>台湾<span>taiwan</span></span>
                </div>
                <div class="hd">
                    <div class="info" style="display:block">
                        <p>400-939-3333</p>
                        <p>北京市朝阳区酒仙桥路宏源大厦3层</p>
                    </div>
                    <div class="info">
                        <p>021-5168-8333</p>
                        <p>上海市徐汇区漕东支路85号漕河泾实业大厦8层</p>
                    </div>
                    <div class="info">
                        <p>028-6103-0922</p>
                        <p>成都市高新区天府五街200号菁蓉国际广场A1-10楼</p>
                    </div>
                    <div class="info">
                        <p></p>
                        <p>深圳市南山区比克科技大厦</p>
                    </div>
                    <div class="info">
                        <p></p>
                        <p>新北市新店区民权路108号10楼之1</p>
                    </div>
                </div>
            </div>
            <div class="HERO-copyRight-footer">
                <a href="<?= \yii\helpers\Url::to(['site/about']);?>">公司简介</a>-<a target="_blank" href="http://kf.yingxiong.com/">客户服务</a>-<a href="<?= \yii\helpers\Url::to(['site/about']);?>">联系我们</a>-<a href="<?= \yii\helpers\Url::to(['site/join']);?>">加入我们</a>
                <p>英雄互娱版权所有 &copy;2015-2018中国网络游戏版权保护联盟举报中心</p>
                <p>COPYRIGHT&copy;2015 &ndash; 2018 . ALL RIGHTS RESERVED.&nbsp;京ICP备15026730号-2</p>
                <p><i style="width:19px;height:19px;top: 5px;position: relative;background:url('http://cdnstatic.yingxiong.com/common/images/wwwdzbq.png') no-repeat;background-size:100% 100%;display: block;float: left;"></i>《网络文化经营许可证》<a href="http://img02.yingxiong.com/M00/00/1D/CsggAlYqD3GEGHRYAAAAAF5auqs487.jpg?<?=VERSION?>" target="_blank">京网文[2015]0629-259号</a></p>
            </div>
<!--            --><?php //echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
        </div>
    </div>
</div>
<script src="<?php echo STATIC_DOMAIN;?>2.0/common/js/jquery_extend.js?<?=VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN;?>2.0/js/js.js?<?=VERSION?>"></script>
<!-- tongji start -->
<?php echo $this->render('@app/views/common/tongji.php'); ?>
<!-- tongji start -->
</body>
</html>
