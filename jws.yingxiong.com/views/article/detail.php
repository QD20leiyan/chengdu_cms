
<link href="<?php echo STATIC_DOM;?>4.0/css/css.css?<?=VERSION;?>" rel="stylesheet"/>
<div class="list_bg"></div>
<?php echo $this->render('@app/views/layouts/pc/header.php', array('nid' => \Yii::$app->params['ZONGHE']))?>
<div class="list_wrap wid_1200 clear">
    <div class="list_top"></div>
    <div class="art_con">
        <div class="art_top">
            <h3><?=$data['title']?></h3>
            <p class="a_time">发布时间：<?php echo date('Y/m/d',$data['created_at']);?>   来源：<?=$data['user_name']?></p>
        </div>
        <div class="a_inf">
            <?=$data['body']?>
        </div>
        <div class="share">
            <!-- JiaThis Button BEGIN -->
            <div class="jiathis_style">
                <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank">分享至：</a>
                <a class="jiathis_button_qzone"></a>
                <a class="jiathis_button_tsina"></a>
                <a class="jiathis_button_tqq"></a>
                <a class="jiathis_button_weixin"></a>
                <a class="jiathis_button_renren"></a>
            </div>
            <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
            <!-- JiaThis Button END -->
        </div>
    </div>
</div>

<?php echo $this->render('//layouts/v3/footer'); ?>
<!--礼包-->
<div class="mask"></div>
<script src="<?php echo STATIC_DOM;?>4.0/common/js/superSlidev2.1.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOM;?>4.0/js/js.js"></script>

</body>
</html>
