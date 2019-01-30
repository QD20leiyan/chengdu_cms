<?php

use common\Cms;
use common\widgets\videoPlay\VideoPlayWidget;
use yii\helpers\Url;
use yii\helpers\Html;

$this->title = '弹弹岛2英雄联赛弹王杯赛官方投票页 弹弹岛2官方网站_新一代休闲弹射竞技手游_英雄互娱';
$this->keywords = 'HPL,英雄联赛,弹弹岛2比赛,弹弹岛2弹王杯,弹王杯,弹弹岛2职业联赛,移动电竞,休闲竞技,全民竞技,弹王金杯';
$this->description = '弹弹岛2英雄联赛弹王杯赛官网，弹弹岛2英雄联赛弹王杯在承袭往届英雄联赛成功经验的同时大胆革新，完全采用线上赛的模式，以“全民参与，人人有奖”作为赛事的宗旨，完美诠释“新竞技，更休闲”的游戏理念，实现全民竞技！弹王金杯舍我其谁，快来一战！';

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title><?= $GLOBALS['seo_title']?></title>
    <meta name="Keywords" content="<?= $GLOBALS['seo_key']?>" >
    <meta name="Description" content="<?= $GLOBALS['seo_desc']?>" >
    <?= Html::csrfMetaTags() ?>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/common/css/common.css?<?= VERSION?>">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/css/style.css?<?= VERSION?>">
    <script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "<?php echo Url::to(['/wap/special/liansai']) ?>";
        }
    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?e896a013f613cc56bef66f4d4f67c5ff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>1.0/common/css/common.css?<?= VERSION?>">
<body>
    <div class="bg-1"></div>
    <div class="bg-2">
        <div class="cont clearfix">
            <div class="title-bg"><img src="<?php echo STATIC_DOMAIN?>1.0/images/title-bg-1.png?<?= VERSION?>" /></div>
            <p class="p">英雄联赛-弹王杯，是《弹弹岛2》最顶级的赛事，秉承着“公平竞技”的赛事理念，深受玩家们的喜爱和追捧。在比赛期间，全服勇者齐聚英雄联赛，争夺最强弹王荣耀！一场移动电竞顶级盛会蓄势待发，用战斗和荣誉诠释“新竞技更休闲”! </p>
            <div class="news-lef">
                <div class="img"><img src="<?php echo $liansai[0]['thumb'] ?>" /></div>
                <div class="news-list">
                    <?php foreach ($news as $v) { ?>
                        <a href="<?php echo Cms::getUrl('article/detail',array('aid'=>$v['id'],'add_time'=>$v->created_at,'cat_dir'=>$v->category->url_alias,"#"=>"detail"));?>">
                            <p>[新闻] <?php echo $v['title']; ?></p>
                        </a>
                    <?php } ?>
                </div>
            </div>
            <div class="news-rig">
                <p class="tit"><i></i>视频中心<a href="<?php echo Cms::getUrl('special/video-list')?>"><img src="<?php echo STATIC_DOMAIN?>1.0/images/add.png?<?= VERSION?>" /></a></p>

                <div class="mod18 clearfix">
                    <span id="prev" class="btn prev"></span>
                    <span id="next" class="btn next1"></span>
                    <span id="prevTop" class="btn prev" style="display: none;"></span>
                    <span id="nextTop" class="btn next" style="display: none;"></span>
                    <div id="picBox" class="picBox">
                        <ul class="cf clearfix" id='play_video'>
                            <?php foreach ($gameVideo as $k => $v) { ?>
                                <li>
                                    <a href="javascript:;" class='video_embed'>
                                        <i data-id="<?php echo $k;?>" data-src='<?php echo $v->contentMessage?>'></i>
                                        <div class='video_emb prism-player' id="container_<?php echo $k;?>">
<!--                                            <embed type="application/x-shockwave-flash" autostart='false' allowfullscreeninteractive="true" allowfullscreen="true" wmode="window" bgcolor="#000" quality="high" src="" allowscriptaccess="always" allownetworking="all" height="270" width="100%"/>-->
                                        </div>

                                    </a>
                                    <span class="video_title"><?php echo $v['title'] ?></span>
                                </li>
                            <?php } ?>

                        </ul>
                    </div>
                    <div id="listBox" class="listBox">
                        <ul class="cf clearfix">
                            <?php foreach ($gameVideo as $k => $v) { ?>
                                <?php if ($k == 0) { ?>
                                    <li class="on" data-index='<?php echo $k; ?>' data-url='<?php echo $v->contentMessage ?>'><img src="<?php echo $v['thumb']; ?>" alt=""></li>
                                <?php }else{ ?>
                                    <li data-index='<?php echo $k; ?>' data-url='<?php echo $v->contentMessage ?>'><img src="<?php echo $v['thumb']; ?>" alt=""></li>
                                <?php } ?>
                            <?php } ?>

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="bg-3">
         <div class="cont clearfix">
             <div class="title-bg"><img src="<?php echo STATIC_DOMAIN?>1.0/images/title-bg-2.png?<?= VERSION?>" /></div>
             <p class="txt-1">英雄联赛-弹王杯，是《弹弹岛2》最顶级的赛事，秉承着“公平竞技”的赛事理念，深受玩家们的喜爱和追捧。在比赛期间，全服勇者齐聚英雄联赛，争夺最强弹王荣耀！一场移动电竞顶级盛会蓄势待发，用战斗和荣誉诠释“新竞技更休闲”! </p>
            <div class="descrip-lef">
                <span>活动时间：</span>
                <p>第一轮竞猜：  6月26日 32强赛（小组赛）比赛开始前</p>
                <p>第二轮竞猜：  6月27日16强赛比赛开始前</p>
                <p>第三轮竞猜：  6月28日8强赛比赛开始前</p>
                <p>第四轮竞猜：  6月29日4强赛比赛开始前</p>
                <p>第五轮竞猜：  6月30日冠军赛强赛比赛开始前</p>
                <span>活动规则：</span>
                <p>1.每个游戏帐号每轮只能竞猜一个晋级队伍;</p>
                <p>2.每轮竞猜的队伍都将在直播前进行更新;</p>
                <p>3.竞猜正确即可获得奖励;</p>
                <p>4.每次竞猜的奖励均不相同,三次奖励可叠加获得;</p>
                <p>5.奖励将在当日直播结束后逐一发放至竞猜时留下的邮箱帐号中;</p>
                <p>6.奖励发放预计需要3日,请耐心等待,注意查收所填写的邮箱邮件;</p>
                <p>7.请确保所留的邮箱帐号正确，如因信息错误导致未能收到奖励,将无法补发；</p>
                <p>8.如您还需其它帮助可联系官方客服：4009 393 333</p>
                <span>活动奖励：</span>
                <p>获得1分竞猜分：金币宝箱*1、甜甜圈*2</p>
                <p>获得2分竞猜分：金币宝箱*2、宝石礼盒*1</p>
                <p>获得3分竞猜分：金币宝箱*3、祈福币宝箱*1</p>
                <p>获得4分竞猜分：大金币宝箱*2、宝石礼盒*2</p>
                <p>获得5分竞猜分：大金币宝箱*3、祈福币宝箱*2、神秘羽翼*7天</p>
             </div>
            <div class="descrip-rig"><div><img src="<?php echo $liansaiAct[0]['thumb'] ?>" /></div></div>
        </div>
    </div>
    <div class="bg-4">
         <div class="cont clearfix">
             <div class="m1"><div class="m">已投票</div></div>
             <div class="title-bg"><img src="<?php echo STATIC_DOMAIN?>1.0/images/Battle.png?<?= VERSION?>" /></div>
             <div class="one">
                  <img src="<?php echo STATIC_DOMAIN?>1.0/images/trophy.png?<?= VERSION?>" />
                    <div>
                        <p><?php echo $corps_1[0]['name'];?></p>
                        <span>获得&nbsp;<i><?php echo $corps_1[0]['vote_num'];?></i>&nbsp;票</span>
                    </div>
             </div>
             <div class="battle-bg clearfix" id="match_list">
                <div class="ell">
                    <?php for ($i = 0; $i < 16; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_32[$i]['id']; ?>'>
                            <p><?php echo $corps_32[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_32[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 1) { ?>
                                <img data-id="<?php echo $corps_32[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>

                 </div>
                <div class="ell">
                    <?php for ($i = 0; $i < 8; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_16[$i]['id']; ?>'>
                            <p><?php echo $corps_16[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_16[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 2) { ?>
                                <img data-id="<?php echo $corps_16[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>

                 </div>
                <div class="ell">
                    <?php for ($i = 0; $i < 4; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_8[$i]['id']; ?>'>
                            <p><?php echo $corps_8[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_8[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 3) { ?>
                                <img data-id="<?php echo $corps_8[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>
                 </div>
                <div class="ell">
                    <?php for ($i = 0; $i < 2; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_4[$i]['id']; ?>'>
                            <p><?php echo $corps_4[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_4[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 4) { ?>
                                <img data-id="<?php echo $corps_4[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>
                 </div>
                <div class="ell">
                    <div class='js_corps_id_<?php echo $corps_2[0]['id']; ?>'>
                        <p><?php echo $corps_2[0]['name'];?></p>
                        <span>获得&nbsp;<i><?php echo $corps_2[0]['vote_num'];?></i>&nbsp;票</span>
                        <?php if ($matchInfo['status'] == 5) { ?>
                            <img data-id="<?php echo $corps_2[0]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                        <?php } ?>
                    </div>
                 </div>
                 <div class="ell-1">
                     <?php for ($i = 16; $i < 32; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_32[$i]['id']; ?>'>
                            <p><?php echo $corps_32[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_32[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 1) { ?>
                                <img data-id="<?php echo $corps_32[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>

                 </div>

                 <div class="ell-1">
                     <?php for ($i = 8; $i < 16; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_16[$i]['id']; ?>'>
                            <p><?php echo $corps_16[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_16[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 2) { ?>
                                <img data-id="<?php echo $corps_16[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>
                 </div>

                 <div class="ell-1">
                     <?php for ($i = 4; $i < 8; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_8[$i]['id']; ?>'>
                            <p><?php echo $corps_8[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_8[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 3) { ?>
                                <img data-id="<?php echo $corps_8[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>
                 </div>

                 <div class="ell-1">
                    <?php for ($i = 2; $i < 4; $i++) { ?>
                        <div class='js_corps_id_<?php echo $corps_4[$i]['id']; ?>'>
                            <p><?php echo $corps_4[$i]['name'];?></p>
                            <span>获得&nbsp;<i><?php echo $corps_4[$i]['vote_num'];?></i>&nbsp;票</span>
                            <?php if ($matchInfo['status'] == 4) { ?>
                                <img data-id="<?php echo $corps_4[$i]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                            <?php } ?>
                        </div>
                    <?php } ?>
                 </div>

                 <div class="ell-1">
                    <div class='js_corps_id_<?php echo $corps_2[1]['id']; ?>'>
                        <p><?php echo $corps_2[1]['name'];?></p>
                        <span>获得&nbsp;<i><?php echo $corps_2[1]['vote_num'];?></i>&nbsp;票</span>
                        <?php if ($matchInfo['status'] == 5) { ?>
                            <img data-id="<?php echo $corps_2[1]['id'];?>" src="<?php echo STATIC_DOMAIN?>1.0/images/t.png?<?= VERSION?>" />
                        <?php } ?>
                    </div>
                </div>
             </div>
        </div>
    </div>
    <div class="sidebar">
        <div class="sidebar-1">
            <a href="<?php echo Url::to(['site/index'])?>">返回官网</a>
            <span></span>
            <a href="javascript:" id="top">回到顶部</a>
        </div>
    </div>

    <div id = "dialog">
        <div class = "login">
            <img class="close_btn" src="<?php echo STATIC_DOMAIN ?>1.0/images/close.png?<?= VERSION?>" title="" alt="" />
                <h2 class = "msgHeader"><h2>
                <div class = "msgBody">
<!--                        <p>
                                <span>姓名</span>
                                <input type = "text" />
                        </p>-->
                        <p>
                                <span>玩家ID</span>
                                <input id='name' name="name" class = "userId" type = "text" placeholder="ID输入不正确无法获得奖励"/>
                        </p>
                        <p>
                                <span>区服</span>
                                <select name="server_id" id='server_id'>
                                    <?php foreach ($gameServer as $v) { ?>
                                        <option value="<?php echo $v['id']; ?>"><?php echo $v['name'] ?></option>
                                    <?php } ?>
                                </select>
                        </p>
                        <p>
                                <span>手机</span>
                                <input id='mobile' name="phone" class = "tel" type = "text" value = "" />
                                <button id="get_code" class = "checkMa">获取验证码</button>
                        </p>
                        <p>
                                <span></span>
                                <input id='yzm' name='yzm' class = "inputPlz" type="number" placeholder="请输入验证码" />
                        </p>
                </div>
                <div class = "msgFooter">
                        <button id='vote_btn' class = "submit">提交</button>
                </div>
        </div>
    </div>
    <script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js"></script>
    <div id="video_mask" class="video_mask" style="display: none;">
        <div class="w man10 both OF none"></div>
        <div id="player5">
            <div id="close"></div>
            <div class="videos">
                <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="uu=58546ec681&vu=d36a4ff707&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>
            </div>
        </div>
    </div>
    <script src="<?php echo STATIC_DOMAIN?>1.0/common/js/jquery_extend.js?<?= VERSION?>"></script>
    <script src="<?php echo STATIC_DOMAIN?>1.0/js/js.js?<?= VERSION?>"></script>
    <div style="display:none">
        <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258207346'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1258207346%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));</script>
    </div>

</body>
</html>
    <script src="<?php echo STATIC_DOMAIN?>1.0/js/js.js?<?= VERSION?>"></script>
    <script src="<?php echo STATIC_DOMAIN?>1.0/js/photo.js?<?= VERSION?>"></script>
<?php echo VideoPlayWidget::widget()?>
<script>
    var timer = null;
    var flag = 0;
    var t =60;
    var oBtn = $("#get_code");
    var vote = $('#vote_btn');
    var match_status = <?php echo $matchInfo['status']; ?>;
    var is_login = '<?php echo Cms::getSession('vote_phone'); ?>';
    var vote_corps_id = '';
    $(function(){
//        $('#listBox li').click(function(){
//            var link_url = $(this).attr('data-url');
//            var index = $(this).attr('data-index');
//            $('.video_embed').html('');
//            $('.video_embed').eq(index).html('<embed type="application/x-shockwave-flash" autostart="false" allowfullscreeninteractive="true" allowfullscreen="true" wmode="window" bgcolor="#000" quality="high" src="http://yuntv.letv.com/bcloud.swf?'+link_url+'" allowscriptaccess="always" allownetworking="all" height="300" width="100%"/>');
//        });

        //投票
        $(".ell div img").click(voteBtn);
        $(".ell-1 div img").click(voteBtn);

        /*获取手机验证码*/
        $('#get_code').click(sendCode);

        $('#vote_btn').click(function(){
            voteCorps();
        });

        $('#play_video i').click(function(){
            var src = $(this).attr('data-src');
            var key = $(this).attr('data-id');
            videoPlay(src, '', '270px', '', 'container_'+key);
//            $(this).siblings('div').html('<embed type="application/x-shockwave-flash" autostart="false" allowfullscreeninteractive="true" allowfullscreen="true" wmode="window" bgcolor="#000" quality="high" src="'+src+'" allowscriptaccess="always" allownetworking="all" height="270" width="100%"/>');
            $(this).hide();
        });
    });

    /**
     * 发送验证码
     * @returns {undefined}
     */
    function sendCode()
    {
        var mobile = $('#mobile').val();
        if (checkMobile(mobile)) {
            if(flag == 0){
                flag = 1;
                clearInterval(timer);
                timer = setInterval(tick,1000);
                tick();
                var _csrf = $('meta[name="csrf-token"]').attr('content');
                $.ajax({
                    type: "POST",
                    url: "<?php echo Url::to(['/special/get-verify'])?>",
                    data: "phone=" +mobile+"&cms_csrf="+ _csrf,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 1) {
                            alert("验证码已发送到手机，请注意查收短信！");
                            return true;
                        }else {
                            alert(data.msg);
                            return false;
                        }
                        return true;
                    }
                });
            }

        }
    }

    /**
    * 验证手机
    * @param {type} mobile
    * @returns {Boolean}
    */
    function checkMobile(mobile)
    {
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
        var obj = $('#mobile');
        if (mobile.length == 0) {
            alert('请输入手机号码！');
            obj.focus();
            return false;
        } else if (mobile.length != 11) {
            alert('请输入有效的手机号码！');
            obj.focus();
            return false;
        } else if (!myreg.test(mobile)) {
            alert('请输入有效的手机号码！');
            obj.focus();
            return false;
        }
        return true;
    }

    function tick()
    {
        t--;
        oBtn.css({"background":"gray","color":"#fff","fontSize":"12px","cursor":"default"})
        oBtn.html(t+ '秒后重新发送')
        if(t <= 0){
            oBtn.css({"background":"#FF8C11","color":"white","fontSize":"16px","cursor":"pointer"})
            clearInterval(timer);
            flag = 0;
            t = 60;
            oBtn.html("获取验证码")
        }
    };

    function voteCorps()
    {
        var url = '<?php echo Url::to(['/special/vote'])?>';
        var server_id = $('#server_id').val();
        var phone = $('#mobile').val();
        var name = $('#name').val();
        var yzm = $('#yzm').val();
        var corps_id = $('#corps_id').val();
        if (!phone) {
            alert('请输入手机号码！');
            return;
        }
        if (!name) {
            alert('玩家ID不能为空！');
            return;
        }
        if (!yzm) {
            alert('yzm不能为空！');
            return;
        }
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        $.post(url, {server_id:server_id, phone:phone, name:name, yzm:yzm, corps_id:vote_corps_id, cms_csrf:_csrf}, function(data){
            $("#dialog").hide();
            if (data.vote_phone) {
                is_login = data.vote_phone;
            }
            if (!data.status) {
                alert(data.msg);
            } else {
                $(".m1, .m").show();
                setTimeout(function(){
                    $(".m1, .m").hide();
                }, 2000);
                $('.js_corps_id_'+vote_corps_id).find('i').text(data.msg);
            }
        }, 'json');
    }

    function voteCorpsLogin()
    {
        $("#dialog").hide();
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        var url = '<?php echo Url::to(['/special/vote'])?>';
        $.post(url, {corps_id:vote_corps_id, cms_csrf:_csrf}, function(data){
            if (!data.status) {
                alert(data.msg);
            } else {
                $(".m1, .m").show();
                setTimeout(function(){
                    $(".m1").hide();
                }, 2000);
                $('.js_corps_id_'+vote_corps_id).find('i').text(data.msg);
            }
        }, 'json');
    }

    function voteBtn()
    {
        vote_corps_id = $(this).attr('data-id');
        if (is_login) {
            voteCorpsLogin();
        } else {
            $("#dialog").show();
            setTimeout('$(".m").fadeOut();$(".m1").fadeOut()', 1000);
        }
    }
</script>
