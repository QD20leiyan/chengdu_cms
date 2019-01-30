<?php use yii\helpers\Url;

echo $this->render('@app/views/layouts/pc/header_top.php');?>

<!--头部-->
<?php $cur_cid = Yii::$app->controller->id; $cur_mid = Yii::$app->controller->action->id;
//$cid =Yii::$app->params['id'];
?>
<div id="topBar" class="h-fix">
    <div  class="topBar">
        <div class="topBox h-cb">
            <a href="/index.html" title="英雄互娱" class="topLogo"></a>
            <ul class="topBoxlist">
                <li class="homeHero <?php if($cur_cid == 'site' && ($cur_mid=='index' || $cur_mid=='')){ echo 'on';}?>"><a href="/index.html" title="首页">首页</a></li>
                <li class="proHero <?php if($cur_cid == 'article'&& $cur_mid=='product'){ echo 'on';}?>"><a href="<?= \yii\helpers\Url::to(['article/product'])?>" title="产品中心">产品中心</a></li>
                <li class="joinHero <?php if($cur_cid == 'site' && ($cur_mid=='join' || strtolower($cur_mid) == 'jobschool')){ echo 'on';}?>"><a href="<?= \yii\helpers\Url::to(['site/join']);?>" title="加入英雄">加入英雄</a></li>
                <li class="aboutHero <?php if(($cur_cid == 'site' && $cur_mid=='about')||($cur_cid == 'article' && $cur_mid=='list')||($cur_cid == 'article' && $cur_mid=='detail')){ echo 'on';}?>"><a href="<?= \yii\helpers\Url::to(['about'])?>" title="关于英雄">关于英雄</a></li>
            </ul>
            <div class="topSlide">
                <span>产品与服务</span>
                <div class="topSlidebox">
                    <dl class="topSlidelist-1">
                        <dt><a target="_blank" href="<?= \yii\helpers\Url::to(['article/product'])?>" title="英雄产品"><i></i>英雄产品</a></dt>
                        <dd><a target="_blank" class="t-s-l-1-1" href="http://ca.yingxiong.com" title="全民枪战"><img src="<?php echo STATIC_DOMAIN;?>2.0/common/images/qz-ico.png?<?=VERSION?>" alt="全民枪战">全民枪战</a></dd>
                        <dd><a target="_blank" class="t-s-l-1-2" href="http://dfzj.yingxiong.com" title="巅峰战舰"><img src="<?php echo STATIC_DOMAIN;?>2.0/common/images/dfzj_icon.png?<?=VERSION?>" alt="巅峰战舰">巅峰战舰</a></dd>
                        <dd><a target="_blank" class="t-s-l-1-3" href="http://wctt.yingxiong.com" title="舞创天团"><img src="<?php echo STATIC_DOMAIN;?>2.0/common/images/ttxw-ico.png?<?=VERSION?>" alt="舞创天团">舞创天团</a></dd>
                        <dd><a target="_blank" class="t-s-l-1-4" href="http://y.yingxiong.com" title="影之刃2"><img src="<?php echo STATIC_DOMAIN;?>2.0/common/images/yzr2-ico.png?<?=VERSION?>" alt="影之刃2">影之刃2</a></dd>
                    </dl>
                    <dl class="topSlidelist-2">
                        <dt><a href="javascript:;" title="英雄产品">英雄服务</a></dt>
                        <dd><a target="_blank" class="t-s-l-2-1" href="http://i.yingxiong.com" title="账号中心"><i></i>账号中心</a></dd>
                        <dd><a class="t-s-l-2-2" href="javascript:alert('暂未开放');" title="充值中心"><i></i>充值中心</a></dd>
                        <dd><a target="_blank" class="t-s-l-2-3" href="http://kf.yingxiong.com/" title="客服中心"><i></i>客服中心</a></dd>
                        <dd><a target="_blank" class="t-s-l-3-4" href="http://gamer.yingxiong.com/index/share" title="英雄社区"><i></i>英雄社区</a></dd>
                    </dl>
                    <dl class="topSlidelist-3">
                        <dt><a target="_blank" href="<?= \yii\helpers\Url::to(['about'])?>" title="英雄发展">英雄发展</a></dt>
                        <dd><a target="_blank" class="t-s-l-3-1" href="/index.html" title="英雄首页"><i></i>英雄首页</a></dd>
                        <dd><a target="_blank" class="t-s-l-3-2" href="<?= \yii\helpers\Url::to(['site/join']);?>" title="加入我们"><i></i>加入我们</a></dd>
                        <dd><a target="_blank" class="t-s-l-3-3" href="<?= \yii\helpers\Url::to(['site/about'])?>#abo-wrap5" title="联系方式"><i></i>联系方式</a></dd>
                        <dd><a class="t-s-l-2-4" href="javascript:;" title="微信服务"><i></i>微信服务</a></dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    <!--导航做判断需要的页面显示不需要的去掉,显示页面加on-->
    <?php if(($cur_cid == 'site' && $cur_mid=='about')||($cur_cid == 'article' && $cur_mid=='list')||($cur_cid == 'article' && $cur_mid=='detail')){?>
        <div class="menuNav aboutNav on" id="menuNav-2">
            <p>
                <a href="<?php if($cur_mid=='list'||$cur_mid=='detail'){echo \yii\helpers\Url::to(['site/about']).'#abo-wrap0';}else{echo 'javascript:;';} ?>" title="公司简介" data-scroll-nav="0">公司简介</a><span>&middot;</span>
                <a href="<?php if($cur_mid=='list'||$cur_mid=='detail'){echo \yii\helpers\Url::to(['site/about']).'#abo-wrap1';}else{echo 'javascript:;';} ?>" title="公司发展" data-scroll-nav="1">公司发展</a><span>&middot;</span>
                <a href="<?php if($cur_mid=='list'||$cur_mid=='detail'){echo \yii\helpers\Url::to(['site/about']).'#abo-wrap2';}else{echo 'javascript:;';} ?>" title="公司荣誉" data-scroll-nav="2">公司荣誉</a><span>&middot;</span>
                <a href="<?php if($cur_mid=='list'||$cur_mid=='detail'){echo \yii\helpers\Url::to(['site/about']).'#abo-wrap3';}else{echo 'javascript:;';} ?>" title="高管团队" data-scroll-nav="3">高管团队</a><span>&middot;</span>
                <a href="<?php if($cur_mid=='list'||$cur_mid=='detail'){echo \yii\helpers\Url::to(['site/about']).'#abo-wrap4';}else{echo 'javascript:;';} ?>" title="公司文化" data-scroll-nav="4">公司文化</a><span>&middot;</span>
                <a href="<?php if($cur_mid=='list'||$cur_mid=='detail'){echo \yii\helpers\Url::to(['site/about']).'#abo-wrap5';}else{echo 'javascript:;';} ?>" title="联系我们" data-scroll-nav="5">联系我们</a><span>&middot;</span>
                <a href="<?php echo Url::to(['article/list']);?>" <?php if($cur_mid=='list'||$cur_mid=='detail'){echo 'class="on"';} ?> title="公司动态">公司动态</a>
            </p>
        </div>
    <?php }elseif($cur_cid == 'site' && $cur_mid=='join' ){?>
        <div class="menuNav joinNav on" id="menuNav-3">
            <p>
                <a href="javascript:;" title="福利待遇"  data-scroll-nav="0">福利待遇</a><span>&middot;</span>
                <a href="javascript:;" title="英雄风采" data-scroll-nav="1">英雄风采</a><span>&middot;</span>
                <a href="javascript:;" title="员工发展" data-scroll-nav="2">员工发展</a><span>&middot;</span>
                <a href="javascript:;" title="招聘岗位"  data-scroll-nav="3" <?php if(strtolower($cur_mid) == 'jobschool'):?>class="active"<?php endif;?>>招聘岗位</a>
            </p>
        </div>
    <?php }elseif($cur_cid == 'site' && strtolower($cur_mid) == 'jobschool'){?>
        <div class="menuNav joinNav on" id="menuNav-3">
            <p>
                <a href="<?= \yii\helpers\Url::to(['site/join']);?>" title="福利待遇"  data-scroll-nav="0">福利待遇</a><span>&middot;</span>
                <a href="<?= \yii\helpers\Url::to(['site/join']);?>" title="英雄风采" data-scroll-nav="1">英雄风采</a><span>&middot;</span>
                <a href="<?= \yii\helpers\Url::to(['site/join']);?>" title="员工发展" data-scroll-nav="2">员工发展</a><span>&middot;</span>
                <a href="" title="招聘岗位"  data-scroll-nav="3"  class="active" >招聘岗位</a>
            </p>
        </div>
    <?php }?>

    <!--副导航结束-->
</div>
