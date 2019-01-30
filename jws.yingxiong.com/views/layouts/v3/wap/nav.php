<?php
/**
 * Created by PhpStorm.
 * User: thinkpad
 * Date: 2017/4/5
 * Time: 11:49
 */
?>
<section class="ftop">
    <a href="javascript:history.go(-1)" id="back"><img src="<?php echo STATIC_DOMAIN;?>common/images/back.png" /></a>
    <a href="#" id="ftop01"><img src="<?php echo STATIC_DOMAIN;?>common/images/right_title.png" /></a>
    <ul id="right_title">
        <li><a href="/m">首页</a></li>
        <li><a href="<?php echo CommonMethod::getUrl('wap/list',array('cid'=>1,'cat_dir'=>'xinwen'));?>">资讯</a></li>
        <li><a href="/wap/hero_list.html">武将</a></li>
        <li><a href="/wap/jjd.html">将军殿</a></li>
        <li><a  href="http://shang.qq.com/wpa/qunwpa?idkey=7c4baade507d3fe13a568d32d5f71ecb777adb42d131d6efddeca717bc6cd7d6">QQ群</a></li>
        <li>
            <a target="_blank" href="javascript:;" id="ClickMe">公众号</a>
            <div id="goodcover"></div>
            <div id="code">
                <div class="close1"><span href="javascript:void(0)" id="closebt"><img src="<?php echo STATIC_DOMAIN;?>m/images/c.png"></span></div>
                <div class="code-img"> <img id="ewmsrc"  src="<?php echo STATIC_DOMAIN;?>m/images/erweima.jpg" /></div>
            </div>

        </li>
    </ul>
</section>
