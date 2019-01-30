<div class="join-wrap h-mTop67">
    <!--新增按钮-->
    <style type="text/css">
        .joi-banner{
            position: relative;
        }
        .link-btn1{
            position: absolute;
            top: 275px;
            left: calc(50% - 320px);
        }
        .link-btn2{
            position: absolute;
            top: 275px;
            right: calc(50% - 282px);
        }
    </style>
    <div class="joi-banner" data-scroll-index="0">
        <!--<div class="joi-wrap0-img" style="background:url(./images/join-banner-1920x393.jpg) no-repeat center top;"></div>-->
        <div class="joi-wrap0-img" style="background:url(<?php echo STATIC_DOMAIN;?>2.0/images/join_banner_sz.png?<?= VERSION?>) no-repeat center top;"></div>
        <a class="link-btn1" target="_blank" href="https://app.mokahr.com/campus_apply/yingxiong"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join_sz_1.png?<?=VERSION?>"/></a>
        <a class="link-btn2" target="_blank" href="https://app.mokahr.com/apply/yingxiong"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join_sz_2.png?<?=VERSION?>"/></a>

    </div>
    <div class="joi-wrap joi-wrap1" id="joi-wrap1"  data-scroll-index="0">
        <span class="hero-xl"></span>
        <div class="h-welfare-list">
            <h1 class="font-face">福利待遇<span>HERO Benefits</span></h1>
            <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-welfare.jpg?<?=VERSION?>" alt="" class="h-welfare-img">
            <div class="h-welfare-tab">
                <ul class="hd">
                    <?php foreach($fldy as $v){?>
                        <li><a href="javascript:void(0)"><img src="<?= $v['thumb']; ?>" /></a></li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div>
    <div class="joi-wrap joi-wrap2" id="joi-wrap2" data-scroll-index="1">
        <span class="hero-xl"></span>
        <div class="h-photo-list">
            <h1 class="font-face">英雄风采<span>HERO photograph</span></h1>
            <div class="h-photos-tab">
                <div class="parBd">
                    <span class="on">工作环境</span>
                    <span class="">公司活动</span>
                    <span class="">员工福利</span>
                </div>
                <div class="parHd">
                    <div class="slideBox">
                        <div class="sliderBoxImg" style="display:none">
                            <?php foreach($gzhj as $v){ ?>
                                <img src="<?= $v['thumb']; ?>" alt="">
                            <?php } ?>
                        </div>
                    </div>
                    <div class="slideBox">
                        <div class="sliderBoxImg" style="display:none">
                            <?php foreach($yghd as $v){ ?>
                                <img src="<?= $v['thumb']; ?>" alt="">
                            <?php } ?>
                        </div>
                    </div>
                    <div class="slideBox">
                        <div class="sliderBoxImg" style="display:none">
                            <?php foreach($jrfl as $v){ ?>
                                <img src="<?= $v['thumb']; ?>" alt="">
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="joi-wrap joi-wrap3" id="joi-wrap3" data-scroll-index="2">
        <span class="hero-xl"></span>
        <div class="h-devel-list">
            <h1 class="font-face">员工发展<span>staff development </span></h1>
            <div class="h-devels-list h-cb">
                <div class="h-devels-tab">
                    <div class="h-d-t cur">
                        <div class="shadow"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-devel1.jpg?<?=VERSION?>"></div>
                        <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-develc1.png?<?=VERSION?>">
                    </div>
                    <div class="h-d-t">
                        <div class="shadow"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-devel2.jpg?<?=VERSION?>"></div>
                        <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-develc2.png?<?=VERSION?>">
                    </div>
                    <div class="h-d-t">
                        <div class="shadow"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-devel3.jpg?<?=VERSION?>"></div>
                        <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-develc3.png?<?=VERSION?>">
                    </div>
                    <div class="h-d-t">
                        <div class="shadow"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-devel4.jpg?<?=VERSION?>"></div>
                        <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-develc4.png?<?=VERSION?>">
                    </div>
                    <div class="h-d-t">
                        <div class="shadow"><img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-devel5.jpg?<?=VERSION?>"></div>
                        <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-develc5.png?<?=VERSION?>">
                    </div>
                </div>
                <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-devel.jpg?<?=VERSION?>" alt="" class="h-devels-img">
            </div>
        </div>
    </div>
    <div class="joi-wrap joi-wrap4" id="joi-wrap4" data-scroll-index="3">
        <span class="hero-xl"></span>
        <div class="h-us-list">
            <h1 class="font-face">招聘岗位<span>Join Us</span></h1>
            <div class="join-enter">
                <a href="https://app.mokahr.com/campus_apply/yingxiong" target="_blank" class="join-school">
                    <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-school.jpg?<?=VERSION?>" alt="校招">
                </a>
                <a href="https://app.mokahr.com/apply/yingxiong" target="_blank" class="join-social">
                    <img src="<?php echo STATIC_DOMAIN;?>2.0/images/join-social.jpg?<?=VERSION?>" alt="社招">
                </a>
            </div>
        </div>
    </div>
</div>
