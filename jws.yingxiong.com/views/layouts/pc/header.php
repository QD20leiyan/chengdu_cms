<?php
use common\Cms;

?>
<!--header-->
<div class="menu Hero-fixed">
    <div class="meau_c">
        <div class="menu-con clearfix">
            <div class="logo fl">
                <img class="fl" src="<?php echo STATIC_DOM;?>3.0/img/logo.png?<?=VERSION?>" alt="logo">
                <div class="lo_font fl">
                    <h3>极无双</h3>
                    <p>真3D三国动作手游</p>
                </div>
            </div>
            <ul class="links fl">
                <li class="<?php if($nid==1){echo 'active';} ?> left"><a href="/index.html">首页</a></li>
                <li class="<?php if($nid==\Yii::$app->params['ZONGHE']){echo 'active';} ?> left01"><a target="_blank" href="<?php echo Cms::getUrl('article/list',array('cid'=>\Yii::$app->params['ZONGHE'],'cat_dir'=>'zixun'));?>">游戏资讯</a></li>
                <li class="<?php if($nid==\Yii::$app->params['JUESE']){echo 'active';} ?> left02"><a target="_blank" href="/article/hero_list.html">武将介绍</a></li>
                <li class="left03 <?php if($nid==\Yii::$app->params['JANGJUN']){echo 'active';} ?>"><a target="_blank" href="/article/jjd.html" >将军殿</a></li>
                <li class="left04"><a target="_blank" href="http://bbs.yingxiong.com/index/gameBbsLogin?id=8">游戏社区</a></li>
            </ul>
            <div class="meau_ico fr">
                <a class="ico_wx" href="javascript:">
                    <div class="ewm_wx">
                        <img src="<?php echo STATIC_DOM;?>3.0/img/code.png?<?=VERSION?>" alt="ewm_wx">
                    </div>
                </a>
                <a class="ico_qq" target="_blank" href="http://weibo.com/jwssy?refer_flag=1001030201_"></a>
                <a class="ico_bd" target="_blank" href="http://jq.qq.com/?_wv=1027&k=2KydGke"></a>
            </div>
        </div>
    </div>
</div>