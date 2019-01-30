<?php $this->renderPartial('//layouts/v3/head'); ?>
<link href="<?php echo STATIC_DOM;?>3.0/css/css.css" rel="stylesheet"/>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.min.js"></script>
<div class="IFTbg">
    <?php $this->renderPartial('//layouts/v3/nav',array('nid'=>2)); ?>
</div>
<div class="list-bg">
    <div class="list-wrap bg-none list-Rshow">

        <ul class="bd">
            <li  class="on">关平</li>
						<li>张苞</li>
						<li>刘舞婵</li>
        </ul>
        <div class="hd">
            <div class="guan infor" style="display:block">
                <img src="<?php echo STATIC_DOMAIN;?>images/guan1_03_1.png">
                <dl class="Rtxt">
                    <dt>关平<p>有志青年，三观正直，武力高强。性格刚毅自负，以国家大业为己任。</p></dt>
								<dd><span>人生目标：</span>消灭蚩尤，蜀汉建国。</dd>
								<dd><span>背景故事：</span>武圣关羽的传人，穿越者之一。穿越前随父亲征战沙场，并一同遭蚩尤封印，在去往时空裂隙途中被孔明拯救，逆转时空回到黄巾之乱的时期，肩负着消灭蚩尤的重任。由于曾遭蚩尤毒手，遗失了大半穿越前的记忆，现为一名怀揣兴复汉室的梦想的耿直青年。</dd>
								<dd><span>未知的秘密：</span>为什么要梳马尾辫？</dd>
                </dl>
            </div>
            <div class="zhang infor">
                <img src="<?php echo STATIC_DOMAIN;?>images/zhang1_03_1.png">
                <dl class="Rtxt">
                    	<dt>张苞<p>富\官二代，富有，身强力壮，但头脑简单，有时候说话很脱线。</p></dt>
								<dd><span>人生目标：</span>摆脱父亲的阴影，证明自己的价值。</dd>
								<dd><span>背景故事：</span>万人敌张飞的传人，穿越者之二。穿越前一度生活在父亲的盛名之下，没人记得“张苞”这个名字，只称他为“张飞的儿子”。他一边享受着父亲打拼来的一切成果，一边又对此感到及不甘心。被孔明带回黄巾之乱时期，同关平一样遗失了大半记忆，却仍记得想证明自己的决心，并将此次重生视作实现自我价值的机会。</dd>
								<dd><span>未知的秘密：</span>把父亲的钱藏在什么地方一起穿越回来的？</dd>
                </dl>
            </div>
            <div class="sun infor">
                <img src="<?php echo STATIC_DOMAIN;?>images/sun1_03_1.png">
                <dl class="Rtxt">
                   	<dt>刘舞婵<p>腹黑少女，喜卖萌，萌萝莉外表下有较嗜杀的本性，外热内冷，特立独行。</p></dt>
								<dd><span>人生目标：</span>消灭蚩尤，解救父亲，实现父亲兴复汉室的梦想。</dd>
								<dd><span>背景故事：</span>中山靖王之后，刘备之女，穿越者之三。极度崇拜父亲，穿越前曾决定追随父亲征战一生并终生不嫁。对所有阻碍父亲事业的人都怀有强烈的憎恨，欲杀之后快。在与刘备一同遭蚩尤封印时，凭借强大的执念保留了所有前世的记忆。但即使是两位结拜兄弟，她也没有分享的打算。</dd>
								<dd><span>未知的秘密：</span>恋父情结？</dd>
                </dl>
            </div>
        </div>


        <div class="Rshow-video">
            <h2><i></i>视频专区</h2>
            <?php foreach($spzq->getData() as $k=>$v){ ?>
                <?php if($k==0){ ?>
                    <div class="vd" rel="" data-id="<?php echo $v['link_url'] ?>">
                        <img src="<?php echo STATIC_DOMAIN;?>images/zate.jpg" alt="视频专区1">
                        <i></i>
                        <div class="tit">视频专区1</div>
                    </div>
                <?php } ?>
            <?php } ?>
        </div>
    </div>
    <?php $this->renderPartial('//layouts/v3/footer'); ?>
</div>
<div id="video_mask" class="video_mask">
    <div id="player5">
        <div id="close"></div>
        <div class="videos">

        </div>
    </div>
</div>
<script>
    $(function(){
        //视频弹出框
        $(".Rshow-video .vd").click(function(){
            var link_url = $(this).attr('data-id');
            $(".videos").append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'" type="application/x-shockwave-flash"></embed>');
            $(".video_mask").show();
        });
        $(".video_mask #close").click(function(){
            $(".video_mask").hide();
        })
    })
</script>
</body>
</html>