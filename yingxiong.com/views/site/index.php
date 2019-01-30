<!--banner-->
<div class="head-slider h-mTop67">
    <ul class="hd">
        <?php use common\Cms;
        use yii\helpers\Url;

        foreach($banner as $v){ ?>
            <li><a target="_blank" href="<?= $v->url;?>"><img src="<?= $v->thumb;?>" /></a></li>
        <?php } ?>
    </ul>
</div>
<!--主体-->
<div class="con-wrap con-wrap1">
    <div class="con-box h-cb h-hotBox">
        <div class="h-hotList-l h-fl">
            <?php if($index_recommend){?>
                <?php foreach($index_recommend as $k=>$v){ ?>
                    <a target="_blank" class="h-hl-<?php echo $k+1; ?>" title="" href="<?= $v->url; ?>"><img src="<?= $v->thumb;?>" alt=""></a>
                <?php } ?>
            <?php } ?>
        </div>
        <div class="h-hotList-r h-fr">
            <a class="more" href="<?php echo Url::to(['article/list']);?>" title="更多">更多</a>
            <dl>
                <dt>新闻动态</dt>
                <?php foreach($news as $k=>$v){?>
                    <dd><a <?php if($k==0){echo 'class="on"';} ?> href="<?= \yii\helpers\Url::to('site/news');?>/<?php echo $v['id'];?>.html" target="_blank"><span class="mid">&middot;</span>
                            <span class="txt"><?php echo $v['title'] ?></span><span class="tit"><?php echo date('Y.m.d',$v['created_at']); ?></span></a></dd>
                <?php } ?>
            </dl>
        </div>
    </div>
</div>
<div class="con-wrap con-wrap2">
    <div class="con-box h-cb">
        <a target="_blank" class="link-li-box link-li-box1" href="<?= \yii\helpers\Url::to(['site/join']);?>">
            <img src="<?php echo STATIC_DOMAIN;?>2.0/images/hero-ico01.png?<?=VERSION?>" alt="" class="link-li-box-img">
            <h3 class="link-li-h3">招聘信息</h3>
            <p class="link-li-p">用英雄的待遇匹配英雄</p>
            <div class="link-li-move">
                <p class="p0">Not human resource</p>
                <p class="p0">just  hero resource</p>
                <i class="p0"></i>
            </div>
        </a>
        <a target="_blank" class="link-li-box link-li-box2"  href="<?= \yii\helpers\Url::to(['site/about']);?>">
            <img src="<?php echo STATIC_DOMAIN;?>2.0/images/hero-ico02.png?<?=VERSION?>" alt="" class="link-li-box-img">
            <h3 class="link-li-h3">商务合作</h3>
            <p class="link-li-p">既成大事，何不与英雄携手同行</p>
            <div class="link-li-move">
                <p class="p0">Ask yourself what you can do </p>
                <p class="p0">for your industry</p>
                <i class="p0"></i>
            </div>

        </a>
        <a target="_blank" class="link-li-box link-li-box3"  href="<?= \yii\helpers\Url::to(['site/about']);?>#abo-wrap5">
            <img src="<?php echo STATIC_DOMAIN;?>2.0/images/hero-ico03.png?<?=VERSION?>" alt="" class="link-li-box-img">
            <h3 class="link-li-h3">联系我们</h3>
            <p class="link-li-p">没有态度，不成品牌</p>
            <div class="link-li-move">
                <p class="p0">No business too small,</p>
                <p class="p0">no problem too big</p>
                <i class="p0"></i>
            </div>

        </a>
    </div>
</div>
