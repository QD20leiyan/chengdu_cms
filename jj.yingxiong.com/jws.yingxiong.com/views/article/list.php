<?php
use common\Cms;
?>
<?php echo $this->render('//layouts/pc/head.php'); ?>
<link href="<?php echo STATIC_DOM;?>4.0/css/css.css?<?=VERSION?>" rel="stylesheet"/>
<div class="list_bg"></div>
<?php //echo $this->render('//layouts/v3/nav', array('nid' => 2)); ?>
<?php echo $this->render('@app/views/layouts/pc/header.php', array('nid' => \Yii::$app->params['ZONGHE']))?>
<div class="list_wrap wid_1200 clear">
    <div class="list_top">
        <ul class="clearfix">
            <li <?php if($cid == Yii::$app->params['ZONGHE']):?>class="on"<?php endif;?>>
                <a  href="<?php echo Cms::getUrl('article/list',array('cid'=>Yii::$app->params['ZONGHE'],'cat_dir'=>'zixun'));?>">综合</a>
            </li>
            <li <?php if($cid == Yii::$app->params['XINWEN']):?>class="on"<?php endif;?>>
                <a  href="<?php echo Cms::getUrl('article/list',array('cid'=>Yii::$app->params['XINWEN'],'cat_dir'=>'xinwen'));?>">新闻</a>
            </li>
            <li <?php if($cid == Yii::$app->params['GONGGAO']):?>class="on"<?php endif;?>>
                <a  href="<?php echo Cms::getUrl('article/list',array('cid'=>Yii::$app->params['GONGGAO'],'cat_dir'=>'gonggao'));?>">公告</a>
            </li>
            <li <?php if($cid == Yii::$app->params['HUODONG']):?>class="on"<?php endif;?>>
                <a  href="<?php echo Cms::getUrl('article/list',array('cid'=>Yii::$app->params['HUODONG'],'cat_dir'=>'huodong'));?>">活动</a>
            </li>
            <li <?php if($cid == Yii::$app->params['GONGLUE']):?>class="on"<?php endif;?>>
                <a  href="<?php echo Cms::getUrl('article/list',array('cid'=>Yii::$app->params['GONGLUE'],'cat_dir'=>'gonglue'));?>">攻略</a>
            </li>
            <li <?php if($cid == Yii::$app->params['FENGYUN']):?>class="on"<?php endif;?>>
                <a  href="<?php echo Cms::getUrl('article/list',array('cid'=>Yii::$app->params['FENGYUN'],'cat_dir'=>'meiti'));?>">无双风云</a>
            </li>
        </ul>
    </div>
    <div class="l_con">
        <div class="l_inf show">
            <ul>
                <?php foreach($data['data'] as $v){?>
                <li>
                    <a href="<?= $v['linkUrl']?>">
                        <p>【<?= $v['name']; ?>】<?php echo mb_substr($v['title'],0,28,'utf-8') ?></p>
                        <span>【<?php echo date('[Y-m-d]',$v['created_at']) ?>】</span>
                    </a>
                </li>
                <?php } ?>
            </ul>
        </div>
        <div class="page" style="margin-bottom: 50px">
            <div class="number">
                <ul id="yw0" class="pagination">
                    <?=  $data['page'];?>
                </ul>
            </div>
        </div>
    </div>
</div>
<?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
<!--礼包-->
<div class="mask"></div>
<script src="<?php echo STATIC_DOM;?>3.0/common/js/superSlidev2.1.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOM;?>4.0/js/js.js"></script>

</body>
</html>

