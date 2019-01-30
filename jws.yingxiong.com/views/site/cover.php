
<?php $this->renderPartial('//layouts/head'); ?>
<body>
<?php //$this->renderPartial('//layouts/header'); ?>
<div class="co-main cover_bg01">
    <div class="MAUT1018">
        <div class="donw-tit-gif">
			<a href="/index.html" class="home-btn">
				<img src="<?php echo STATIC_DOMAIN;?>images/home-btn.png" alt="进入官网">
			</a>
            <img src="<?php echo STATIC_DOMAIN;?>images/txt11_03.png" alt="极无双" class="tit">
            <div class="down">
                <div class="down-link fl">
                    <a class="down-anzhuo down_andriod" title="安卓下载">
						<span></span>
                        <img src="<?php echo STATIC_DOMAIN;?>images/down_03.png" alt="IOS下载">
                    </a>
					<a class="down-app down_ios" title="IOS下载">
                        <img src="<?php echo STATIC_DOMAIN;?>images/down_02.png" alt="IOS下载">
                    </a>
                </div>
				<div class="ewm fl">
					<img class="down_andriod_img" src="<?php echo STATIC_DOMAIN;?>common/images/ewm.jpg" alt="二维码下载">
				</div>
            </div>
            
			<?php #foreach($cover_video as $k=>$v){ ?>
                <?php #if($k == 0){ ?>
                    <!--a class="gift-video" title="" data-id="<?php #echo $v['link_url'] ?>">
                        <img src="<?php #echo STATIC_DOMAIN;?>common/images/play_btn.png" alt="三国视频" width="108" height="66">
                    </a-->
                <?php #} ?>
            <?php #} ?>
            <div class="gift">
                <?php $this->widget('frontend.modules.gift.components.GiftWidget', array(
                    'giftId' => 4,
                    'template' => 'pc_active',
                )) ?>
            </div>
        </div>
        <div class="list-Pshow co_main">
			<ul class="bd">
				<li class="pr1">马伯庸</li>
				<li class="pr2">研发团队</li>
				<li class="pr3">配音团队</li>
				<li class="pr4">杭盖乐队</li>
				<li class="pr5 on">Zeta</li>
			</ul>
			<div class="HD">
				<div class="infor">
					<img class="posi" src="<?php echo STATIC_DOMAIN;?>images/co_img01.png" height="285" width="351" alt="小马">
					<div class="co_right">
						<h1>极原创经典——马伯庸</h1>
						<p>通晓古今，善于挖掘出不为人知的历史细节的马亲王，为此次《极无双》游戏写作故事，大开脑洞创作出了另一个三国世界观。</p>
					</div>
				</div>
				<div class="infor">
					<img src="<?php echo STATIC_DOMAIN;?>images/co_img02.png" height="237" width="350" alt="小马">
					<div class="co_right">
						<h1>极情怀匠心——制作人及研发团队</h1>
						<p>在一切讲求效率、减少成本而尽力获得利益最大化的时代，我们需要这样的始终如一。这种对于国人传统匠心的坚守，是古老中国的传承，也是我们原本就温柔敦厚的底子。
						<br>姚乐中——制作人，不忘初心，立志创造国人骄傲的游戏
						<br>Franc Yin——美术总监，打破常规，开拓想象，还原历史三国的真实
						<br>国际CG界最早成名的华人艺术家之一，用多年的艺术底蕴，塑造出基于传统，但又有着现代诠释的全新三国世界！
						</p>
					</div>
				</div>
				<div class="infor">
					<img src="<?php echo STATIC_DOMAIN;?>images/co_img03.png" height="244" width="317" alt="小马">
					<div class="co_right">
						<h1>极超越激情——杭盖乐队</h1>
						<p>颠覆选择用阳刚的金属乐体现草原的魂，用刚毅的声音及金属的极端演绎原生民族音乐，激发听者对未知世界的想象。时而沉静，时而清澈，将原生态的音乐与现代的摇滚结合，以一种流行的音乐形式让大众领略到了“杭盖”音乐中对自然、对生命最原始的表达和最质朴的尊重。</p>
						<p>《中国好歌曲第二季》年度盛典冠军乐队，凭借专辑《He Who Travels Far》获得 “第十一届音乐风云榜”最佳摇滚专辑、“第十一届华语音乐传媒大奖” 最佳乐队和最佳民族音乐艺人以及《Songlines》举办的“SONGLINES MUSIC AWARDS 2011”最佳乐队等多项提名。</p>
						<p>代表曲目：《轮回》</p>
					</div>
				</div>
				<div class="infor">
					<img src="<?php echo STATIC_DOMAIN;?>images/co_img04.png" height="248" width="366" alt="zate">
					<div class="co_right">
						<h1>极造诣原声——Zeta</h1>
						<p>zeta运用中国几千年留传下来的各族各地民歌、戏曲、词牌、古曲等国粹结合重金属摇滚，用心呈现出一个充满想象力的三国。更在制作过程中与杭盖乐队激情碰撞跨界合作，录制了马头琴等情感厚重又有特色的蒙古族乐器，为世界观的历史感和地域感增加了十分真实而原始的质感。跟随Zeta的音乐，聆听重新演绎后充满激情和力量的熟悉旋律，感受来自于民族文化根源的声音与游戏完美结合的体验。</p>
					</div>
				</div>
				<div class="infor" style="display:block">
					<img src="<?php echo STATIC_DOMAIN;?>images/co_img05.png" height="245" width="366" alt="配音团队">
					<div class="co_right">
						<h1>极演绎精髓——《武媚娘》《琅琊榜》《甄嬛传》配音团队</h1>
						<p>《极无双》诚挚邀请《武媚娘》《琅琊榜》《甄嬛传》配音团队担纲游戏配音演绎三国精髓，强大专业的配音团队相信能给广大玩家享受游戏的同时带来听觉的盛宴。<p>
						<p><span>宝木中阳</span>，知名配音演员，搞笑漫画日和系列的中文声优，不仅声音清澈有磁性，语言也极富感染力和幽默感，配音中不时闪现令人捧腹的口头禅式短语，受到人们的喜爱。</p>
						<p>代表作：《十万个冷笑话》李靖，《尸兄》白小飞，《琅琊榜》誉王</p>
						<p><span>齐克建</span>，国家一级演员，著名配音演员、著名配音导演、著名解说、朗诵艺术家。代表作：《三国演义》于禁，《倚天屠龙记》张三丰</p>
					</div>
				</div>
			</div>
		</div>
        <div class="co-tab">
            <div class="co-share fl">
                <a href="javascript:;" class="co-share1">
                    <i class="ren"></i>
                    <i class="shi"></i>
                    <p>关注官方微信送福利人人有份</p>
                    <i class="more"></i>
                    <div class="ewmbg">
                        <img src="<?php echo STATIC_DOMAIN;?>common/images/ewm.jpg" alt="二维码">
                    </div>
                </a>
                <a href="javascript:;" class="co-share2">
                    <i class="ren"></i>
                    <i class="shi"></i>
                    <p>游戏等级冲级大比拼送现金红包</p>
                    <i class="more"></i>
                    <div class="ewmbg">
                        <img src="http://image.yingxiong.com/qrcode/android_ifsg_pcgw.png" alt="下载二维码">
                    </div>
                </a>
                <a href="http://tieba.baidu.com/f?kw=if%C8%FD%B9%FA&fr=index" target="_blank" class="co-share3">
                    <i class="ren"></i>
                    <i class="shi"></i>
                    <p>关注官方贴吧送惊喜人人有礼</p>
                    <i class="more"></i>
                </a>
                <a href="javascript:;" class="co-share4">
                    <i class="ren"></i>
                    <i class="shi"></i>
                    <p>加官方Q群送限量武器</p>
                    <i class="more"></i>
                    <div class="ewmbg">
                        <span>官方玩家QQ群:<br>482957214</span>
                    </div>
                </a>
            </div>
            <div class="co-lb fr">
                <ul>
                    <?php foreach($banner as $v){ ?>
                        <li>
                            <img src="<?php echo $v['image_url'] ?>" alt="轮播">
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
        <?php $this->renderPartial('//layouts/footer'); ?>
    </div>
    <div class="co-footerbg cover_bg02"></div>
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
        //礼包
        $(".gift .gift-lb").click(function(){
            if($(this).hasClass("closep")){
                $(".gift-con").show();
                $(this).removeClass("closep");
            }else{
                $(".gift-con").hide();
                $(this).addClass("closep");
            }
            $(".gift-msg").hide();
        });
//        $(".gift-con input").focus(function(){
//            $(this).val("")
//        }).blur(function(){
//            if($(this).val()==""){
//                $(this).val("请输入手机号领取")
//            }
//        })
//        $(".gift-con .gift-btn").click(function(){
//            if($(".gift-con input").val() ==''){
//                $(".gift-msg").find("p").html("请输入手机号")&&$(".gift-msg").show();
//            }else{
//                $(".gift-msg").find("p").html("请注意查收")&&$(".gift-msg").show();
//            }
//        });
//        $(".gift-msg .close").click(function(){
//            $(".gift-msg").hide();
//        })
        //视频弹出框
        $(".vi-tab li,.gift-video").click(function(){
            var link_url = $(this).attr('data-id');
            $('.videos').append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'" type="application/x-shockwave-flash"></embed>');
            $(".video_mask").show();
        });
        $(".video_mask #close").click(function(){
            $(".video_mask").hide();
        })
        //选择卡
        banner_hover1();
    })
</script>
</body>
</html>
