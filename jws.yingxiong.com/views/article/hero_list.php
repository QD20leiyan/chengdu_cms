<?php echo $this->render('//layouts/pc/head.php'); ?>
<link href="<?php echo STATIC_DOM;?>4.0/css/css.css?<?=VERSION?>" rel="stylesheet"/>
	<body>
    <div class="list_bg"></div>
    <?php echo $this->render('@app/views/layouts/pc/header.php', array('nid' => \Yii::$app->params['JUESE']))?>
		<!--顶导航结束-->
		<div class="wj_con wj_hero">
			<div class="wj_wrap" style="z-index: 1">
				<div class="wj_about">
					<img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gp_name.png?<?=VERSION?>" alt="img_name" class="wj_name">
					<p class="wj_txt"></p>
					<ul class="wj_power"></ul>
					<dl class="wj_skill"></dl>
					<div class="wj_skill_txt">
						<p><span class="w_span1"></span><span class="w_span2"></span></p>
					</div>
				</div>
				<div class="wj_img">
					<img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gp_img.png?<?=VERSION?>" alt="img" class="wj_image">
				</div>
				<div class="wj_peo_box clearfix">
					<a href="javascript:" class="wj_pre"></a>
                    <div class="peo_list">
                        <ul>
                        	<li class="on">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_sj_peo.png?<?=VERSION?>" alt="孙坚" class="item1"/>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_sj_peo_h.png?<?=VERSION?>" alt="孙坚" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_ht_peo.png?<?=VERSION?>" alt="华佗" class="item1"/>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_ht_peo_h.png?<?=VERSION?>" alt="华佗" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zhj_peo.png?<?=VERSION?>" alt="甄姬" class="item1"/>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zhj_peo_h.png?<?=VERSION?>" alt="甄姬" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dw_peo.png?<?=VERSION?>" alt="典韦" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dw_peo_h.png?<?=VERSION?>" alt="典韦" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zrfr_peo.png?<?=VERSION?>" alt="祝融夫人" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zrfr_peo_h.png?<?=VERSION?>" alt="祝融夫人" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_ys_peo.png?<?=VERSION?>" alt="袁绍" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_ys_peo_h.png?<?=VERSION?>" alt="袁绍" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_mh_peo.png?<?=VERSION?>" alt="孟获" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_mh_peo_h.png?<?=VERSION?>" alt="孟获" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_smy_peo.png?<?=VERSION?>" alt="司马懿" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_smy_peo_h.png?<?=VERSION?>" alt="司马懿" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_sc_peo.png?<?=VERSION?>" alt="孙策" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_sc_peo_h.png?<?=VERSION?>" alt="孙策" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_ssx_peo.png?<?=VERSION?>" alt="孙尚香" class="item1" />
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_ssx_peo_h.png?<?=VERSION?>" alt="孙尚香" class="item2" />
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gy_peo.png?<?=VERSION?>" alt="关羽" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gy_peo_h.png?<?=VERSION?>" alt="关羽" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zgl_peo.png?<?=VERSION?>" alt="诸葛亮" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zgl_peo_h.png?<?=VERSION?>" alt="诸葛亮" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zyun_peo.png?<?=VERSION?>" alt="赵云" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zyun_peo_h.png?<?=VERSION?>" alt="赵云" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_lb_peo.png?<?=VERSION?>" alt="吕布" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_lb_peo_h.png?<?=VERSION?>" alt="吕布" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zf_peo.png?<?=VERSION?>" alt="张飞" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zf_peo_h.png?<?=VERSION?>" alt="张飞" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_cc_peo.png?<?=VERSION?>" alt="曹操" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_cc_peo_h.png?<?=VERSION?>" alt="曹操" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gj_peo.png?<?=VERSION?>" alt="郭嘉" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gj_peo_h.png?<?=VERSION?>" alt="郭嘉" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_mc_peo.png?<?=VERSION?>" alt="马超" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_mc_peo_h.png?<?=VERSION?>" alt="马超" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dq_peo.png?<?=VERSION?>" alt="大乔" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dq_peo_h.png?<?=VERSION?>" alt="大乔" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zy_peo.png?<?=VERSION?>" alt="周瑜" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zy_peo_h.png?<?=VERSION?>" alt="周瑜" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xq_peo.png?<?=VERSION?>" alt="小乔" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xq_peo_h.png?<?=VERSION?>" alt="小乔" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zl_peo.png?<?=VERSION?>" alt="张辽" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zl_peo_h.png?<?=VERSION?>" alt="张辽" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dc_peo.png?<?=VERSION?>" alt="貂蝉" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dc_peo_h.png?<?=VERSION?>" alt="貂蝉" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_tsc_peo.png?<?=VERSION?>" alt="太史慈" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_tsc_peo_h.png?<?=VERSION?>" alt="太史慈" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zh_peo.png?<?=VERSION?>" alt="张郃" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zh_peo_h.png?<?=VERSION?>" alt="张郃" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zj_peo.jpg" alt="张角" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zj_peo_h.jpg" alt="张角" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xhy_peo.png?<?=VERSION?>" alt="夏侯渊" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xhy_peo_h.png?<?=VERSION?>" alt="夏侯渊" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dz_peo.png?<?=VERSION?>" alt="董卓" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_dz_peo_h.png?<?=VERSION?>" alt="董卓" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xh_peo.png?<?=VERSION?>" alt="徐晃" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xh_peo_h.png?<?=VERSION?>" alt="徐晃" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xhc_peo.png?<?=VERSION?>" alt="夏侯淳" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xhc_peo_h.png?<?=VERSION?>" alt="夏侯淳" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xc_peo.png?<?=VERSION?>" alt="许褚" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_xc_peo_h.png?<?=VERSION?>" alt="许褚" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gp_peo.png?<?=VERSION?>" alt="关平" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_gp_peo_h.png?<?=VERSION?>" alt="关平" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_lwc_peo.png?<?=VERSION?>" alt="刘武婵" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_lwc_peo_h.png?<?=VERSION?>" alt="刘武婵" class="item2">
                            </li>
                            <li>
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zb_peo.png?<?=VERSION?>" alt="张苞" class="item1">
                                <img src="<?php echo STATIC_DOM;?>4.0/common/images/wj_zb_peo_h.png?<?=VERSION?>" alt="张苞" class="item2">
                            </li>
                        </ul>
                    </div>
					<a href="javascript:" class="wj_next"></a>
				</div>
			</div>
		</div>
    <div class="include" style="z-index: 0"></div>
		<!--礼包-->
    <?php echo $this->render('@app/views/layouts/pc/footer_bottom.php');?>
	</body>
</html>
