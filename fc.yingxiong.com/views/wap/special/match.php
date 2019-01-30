<?php

use common\Cms;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS):$this->web_keywords?>" >
    <meta name="Description" content="<?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION):$this->web_description?>" >
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/common/css/common.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/swiper.3.1.7.min.css">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/m/css/css.css" rel="stylesheet"/>
    <script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
</head>
<link href="<?php echo STATIC_DOMAIN ?>2.0/m/css/match.css" rel="stylesheet"/>

<body>
<div class="kv">
    <div class="btn">
        <i class="yy_k"></i>
        <i class="yy_q"></i>
    </div>
</div>
<div class="one">
    <div class="title"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/title1.png"></div>
    <ul class="step clearfix">
        <li>
            <img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/img1.png">
            <a href="http://fc.yingxiong.com/m/gg/2017/0614/257.html">点击查看</a>
            <p>活动规则</p>
            <i></i>
        </li>
        <li>
            <img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/img2.png">
            <a href="http://fc.yingxiong.com/m/gg/2017/0614/258.html">点击查看</a>
            <p>活动规则</p>
            <i></i>
        </li>
        <li>
            <img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/img3.png">
            <a href="http://fc.yingxiong.com/m/gg/2017/0614/259.html">点击查看</a>
            <p>活动规则</p>
        </li>
    </ul>
</div>
<div class="two">
    <div class="title"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/title2.png"></div>
    <div class="bq_bg"></div>
    <p>10月7日-10月13日</p>
    <img class="shub" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/sb.png" title="" alt="" />
    <p class="second_p">64-32-16-8</p>
    <p class="third_p">8强选手单循环积分赛</p>
    <ul class="list_match">
        <li><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/four_q.png" title="" alt="" /></li>
        <li><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/bjs.png" title="" alt="" /></li>
        <li><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/gj.png" title="" alt="" /></li>
    </ul>
    <p class="last_txt">10月21日</p>
</div>
<div class="tit t"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/tit2.png"></div>
<div class="three">
    <div class="title title04"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/title3.png"></div>
    <div class="car"></div>
    <div class="ranking">
        <div class="rank">
            <div class="lef"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/one.png" alt=""></div>
            <div class="rig">
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/min-car.png" alt=""><span>[妖歌·源]</span>永久</p>
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">10000点券</p>
                <p><img class="dym" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/dym.png" alt="">称号【S6巅峰之战·冠军】</p>
            </div>
        </div>
        <div class="rank">
            <div class="lef"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/two.png" alt=""></div>
            <div class="rig">
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/min-car.png" alt=""><span>[妖歌·源]</span>180天</p>
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">8000点券</p>
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h1.png" alt="">称号【S6巅峰之战·亚军】</p>
            </div>
        </div>
        <div class="rank">
            <div class="lef"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/three.png" alt=""></div>
            <div class="rig">
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/min-car.png" alt=""><span>[妖歌·源]</span>90天</p>
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">6000点券</p>
                <p><img class="dsm" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/dsm.png" alt="">称号【S6巅峰之战·季军】</p>
            </div>
        </div>
        <div class="smc">
            <div class="left_s rig">
                <img class="sm" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/four.png" title="" alt="" />
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">5000点券</p>
            </div>
            <div class="right_s rig">
                <img class="wm" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/five.png" title="" alt="" />
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">3000点券</p>
            </div>
        </div>
        <div class="smc wmc">
            <div class="left_s rig">
                <img class="sm sm01" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/djm.png" title="" alt="" />
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">1688点券</p>
            </div>
            <div class="right_s rig">
                <img class="wm wm01" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/shim.png" title="" alt="" />
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">888点券</p>
                <p class="zs_p"><img class="little_zs" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/little_zs.png" title="" alt="" />888钻石</p>
            </div>
        </div>
        <div class="smc wmc">
            <div class="right_s rig last_p">
                <img class="wm wm01" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/ssm.png" title="" alt="" />
                <p><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/h.png" alt="">588点券</p>
                <p class="zs_p"><img class="little_zs" src="<?php echo STATIC_DOMAIN ?>2.0/m/img/little_zs.png" title="" alt="" />588钻石</p>
            </div>
        </div>
    </div>
</div>
<div class="tit t"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/tit3.png"></div>
<div class="five">
    <div class="title title09"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/title5.png"></div>
    <div class="five-ul">
        <ul>
            <li><i></i>全民可参与竞猜，预测正确获得神秘奖励。</li>
            <li><i></i>点击你认为冠军所在服务器进行投票，预留奖品接收手机号。</li>
            <li><i></i>若您竞猜正确，您将获得冠军大礼包激活码一个。</li>
            <li><i></i>每位玩家仅能投票一次。</li>
        </ul>
    </div>
    <div class="vote">
        <?php foreach ($servers as $k => $v) { ?>

            <?php if ($k%2 == 0) { echo '<div>'; } ?>
                <div class="vote-1 v1"><i id="<?php echo $v['id'] ?>"><?php echo $v['view_count']; ?>票</i><p><?php echo $v['title']; ?></p><a data-num="<?php echo $v['view_count'] ?>" data-id="<?php echo $v['id']; ?>" href="javascript:">点击投票</a></div>
            <?php if (($k%2 == 1) || ($k == (count($servers)-1))) { echo '</div>';} ?>

        <?php } ?>
    </div>
</div>
<div class="six"></div>
<div class="tit t"><img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/tit4.png"></div>
<div class="video">
<!--    <div>-->
<!--        <div class="video-1">-->
<!--            <img src="<?php echo STATIC_DOMAIN ?>2.0/m/img/img3.jpg" alt="">-->
<!--            <i class="play-1"></i>-->
<!--        </div>-->
<!--    </div>-->

    <?php foreach ($video as $k => $v) { ?>
        <?php if ($k%2 == 0) { echo '<div>'; } ?>
            <div class="video-1">
                <img src="<?php echo $v['thumb'] ?>" alt="">
                <i class="play-1 js_video_play" data-url="<?php echo $v['content_message'] ?>"></i>
            </div>
        <?php if (($k%2 == 1) || $k == (count($video) - 1)) { echo '</div>';} ?>

    <?php } ?>
</div>
<div class="none"></div>

<!-- 弹框 -->
<!--视频区域 start-->
<!-- 弹框 -->
<div id="mask"></div>

<div id="index1_video_mask">
    <div id="index1_player5">
        <div id="index1_close"></div>
        <iframe border=0 marginWidth=0 frameSpacing=0 marginHeight=0 src="" frameBorder=0 noResize scrolling="no" width=100% height=100% vspale="0" id="iframe_btn" name="iframe_btn"></iframe>
    </div>
</div>
<div class="login">
    <h3>HPL巅峰车神争霸赛S6</h3>
    <div class="close-1"></div>
    <p>感谢您预约观看HPL-巅峰车神争霸赛S6，本赛事将于10月21日正式开始，我们会以短信形式提前半小时邀您来观看。</p>
    <form action="" data-type="yuyue">
        <input class="sjh js-phone" id="yuyue-phone" name="phone" type="tel" placeholder="输入手机号">
        <input class="yzm" type="text"  id="yuyue-yzm" placeholder="输入验证码"/>
        <a class="fs yuyue-btn" href="javascript:;" id="btn">发送</a>
        <a class="y" href="javascript:;" id="yuyue"></a>
    </form>
</div>
<div class="ballot">
    <h3>HPL巅峰车神争霸赛S6</h3>
    <div class="close-1"></div>
    <p>为您心目中会产生总冠军的服务器投票，若您投中，便可获得冠军预测大礼包激活码一个，比赛结束后，发放至您的手机号中。</p>
    <form action="" data-type="vote">
        <input class="sjh" id="vote-phone" name="phone" type="tel" placeholder="输入手机号">
        <input class="yzm" id="vote-yzm" type="text"  placeholder="输入验证码"/>
        <a class="fs" href="javascript:;" id="vote-btn">发送</a>
        <a class="y" href="javascript:;" id="vote"></a>
    </form>
</div>

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/m/js/jquery.fittext.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/m/js/js.js"></script>
<script>
    var serverId = 0;
    var wait = 60;
    var wait_vote = 60
    $(window).load(function(){
        $('html').fitText(2);
    })
    $(function(){
//        $(".video-1 .play-1").click(function(){
//            var rel = $(this).attr('rel');
//            if(rel){
//                $("#iframe_btn").attr("src","/video/videosource?"+rel);
//                $("#index1_video_mask").show();
//                //兼容安卓延时获取iframe子元素高度来
//                //setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
//            }else{
//                alert('暂无视频，敬请期待');
//                return false;
//            }
//        });
        $("#index1_close,#index1_video_mask").click(function(){
            $("#iframe_btn").attr("src","");
            $("#index1_video_mask").hide();
            //setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
        });


        $(".yuyue").click(yuYue);
        $('.yuyue-btn').click(sendCode);
        $('#vote-btn').click(sendCode);
        $('#yuyue').click(yuYue);
        $('#vote').click(vote);
        $('.vote-1 a').on('click',function(e){
            serverId = $(this).attr('data-id');
        })
    });
    
    function yuYue () {
        var phone = $(this).parent('form').find('.sjh').val();
        var yzm = $(this).parent('form').find('.yzm').val();
        if(!checkPhone(phone)){
            alert('该手机号码不正确！');
        }else if (!yzm) {
            alert('验证码不正确！');
        } else {
            var csrf = $('meta[name="csrf-token"]').attr('content');
            $.post('<?php echo Cms::getUrl('special/save-phone')?>', {phone:phone, yzm:yzm, cms_csrf:csrf}, function(data){
                if(data.status == 1){
                    $(".login").hide();
                    $("#mask").hide();
                    alert('预约已成功');
                }else if(data.status == -1){
                    alert('该手机号码不正确');
                }else if(data.status == -2){
                    alert('该手机号码已参与过短信预约');
                }else{
                    alert(data.msg);
                }
            }, 'JSON');
        }
    }

    /**
     * 投票
     */
    function vote () {
        var phone = $(this).parent('form').find('.sjh').val();
        var yzm = $(this).parent('form').find('.yzm').val();
        if(!checkPhone(phone)){
            alert('该手机号码不正确');
        }else if (!yzm){
            alert('验证码不正确');
        } else {
            var csrf = $('meta[name="csrf-token"]').attr('content');
            $.post('/special/vote', {phone:phone, server_id:serverId, yzm:yzm, cms_csrf:csrf}, function(data){
                if(data.status == 1){
                    $(".ballot").hide();
                    $("#mask").hide();
                    $('#'+serverId).text(data.msg+'票');
                    alert('投票成功');
                }else{
                    alert(data.msg);
                }
            }, 'JSON');
        }
    }

    function checkPhone (phone)
    {
        if(/^1[3|4|5|7|8|9]\d{9}$/.test(phone)){
            return true;
        }
        return false;
    }

    function sendCode()
    {
        var phone = $(this).parent('form').find('.sjh').val();
        var type = $(this).parent('form').attr('data-type');
        if (!checkPhone(phone)) {
            alert('手机号不正确');
            return;
        }
        var obj = this
        var btn = $(this).attr('id');

        if (btn == 'btn') {
            if (wait != 60 && wait != 0) {
                return;
            }
        } else if (btn == 'vote-btn') {
            if (wait_vote != 60 && wait_vote != 0) {
                return;
            }
        }


        var csrf = $('meta[name="csrf-token"]').attr('content');
        $.post("<?php echo Cms::getUrl('commonMethod/get-verify')?>", {phone:phone, type:type, cms_csrf:csrf}, function(data){
            if (data.status != 1) {
                alert(data.msg);
            } else {
//                alert('发送成功！');

                if (btn == 'btn') {
                    time(obj);
                } else if (btn == 'vote-btn') {
                    timeVote(obj);
                }
            }
        }, 'JSON');
    }

    function time(o) {
        if(wait == 0) {
            o.removeAttribute("disabled");
            o.innerHTML = "再次发送";
            wait = 60;
        } else {

            o.setAttribute("disabled", true);
            o.innerHTML = wait+'s';
            wait--;
            setTimeout(function() {
                    time(o)
                },
                1000)
        }
    }

    function timeVote(o) {
        if(wait_vote == 0) {
            o.removeAttribute("disabled");
            o.innerHTML = "再次发送";
            wait_vote = 60;
        } else {

            o.setAttribute("disabled", true);
            o.innerHTML = wait_vote+'s';
            wait_vote--;
            setTimeout(function() {
                    timeVote(o)
                },
                1000)
        }
    }
</script>

