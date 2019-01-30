<div class="menu Hero-fixed">
    <div class="meau_c">
        <div class="menu-con clearfix">
            <div class="logo fl">
                <img class="fl" src="<?php echo STATIC_DOM;?>4.0/common/images/logo_ico.png" alt="logo">
                <div class="lo_font fl">
                    <h3>极无双</h3>
                    <p>真3D三国动作手游</p>
                </div>
            </div>
            <ul class="links fl">
                <li <?php if($nid==1){echo 'class="active"';} ?>><a href="/index.html">官网首页</a></li>
                <li <?php if($nid==\Yii::$app->params['ZONGHE']){echo 'class="active"';} ?>><a target="_blank" href="<?php echo \common\Cms::getUrl('article/list',array('cid'=>\Yii::$app->params['ZONGHE'],'cat_dir'=>'zixun'));?>">游戏资讯</a></li>
                <li <?php if($nid==\Yii::$app->params['JUESE']){echo 'class="active"';} ?>><a target="_blank" href="/article/hero_list.html">武将介绍</a></li>
                <li class="left03 <?php if($nid==\Yii::$app->params['JANGJUN']){echo 'active';} ?>"><a target="_blank" href="/article/jjd.html" >将军殿</a></li>
                <li><a target="_blank" href="http://bbs.yingxiong.com/index/gameBbsLogin?id=8">游戏社区</a></li>
            </ul>
            <div class="meau_ico fr">
                <a class="ico_wx" href="javascript:">
                    <div class="ewm_wx">
                        <img src="<?php echo STATIC_DOM;?>4.0/img/code.png" alt="ewm_wx">
                    </div>
                </a>
                <a class="ico_qq" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2885626330&site=qq&menu=yes"></a>
                <a class="ico_bd" target="_blank" href="http://tieba.baidu.com/f?kw=%E6%9E%81%E6%97%A0%E5%8F%8C&fr=wwwt"></a>
            </div>
        </div>
    </div>
</div>
<!--顶导航结束-->