<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/5/23
 * Time: 13:42
 */
use common\Cms;
use yii\helpers\Html;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $GLOBALS['seo_title']?></title>
    <meta name="Keywords" content="<?= $GLOBALS['seo_key']?>" >
    <meta name="Description" content="<?= $GLOBALS['seo_desc']?>" >
    <link rel="shortcut icon" href="<?php echo STATIC_DOMAIN ?>2.0/images/favicon.ico" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/common.min.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/common/css/swiper.3.1.7.min.css">
    <link href="<?php echo STATIC_DOMAIN ?>2.0/css/style.css" rel="stylesheet"/>
    <?php echo Html::csrfMetaTags();?>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
//            location.href = "/wap/special/match.html";
        }
    </script>
</head>
<body>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>2.0/css/style.css" />
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.min.js"></script>

<div class="index1">
    <?php echo $this->render("//layouts/pc/nav",array('nid'=>3));?>
    <div class="bg_pic">
        <div class="bg_pic_1">
            <img class="small_btn" src="<?php echo STATIC_DOMAIN ?>2.0/images/small.png" title="" alt="" />
            <img class="big_btn" src="<?php echo STATIC_DOMAIN ?>2.0/images/big.png" title="" alt="" />
        </div>
    </div>
    <div class="bg_main">
        <div class="page_main">
            <div class="page01">
                <img class="title01" src="<?php echo STATIC_DOMAIN ?>2.0/images/title01.png" title="" alt="" />
                <div class="top_page01">
                    <ul>
                        <li class="first_li">
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/star01.jpg" title="" alt="" />
                            <a href="http://fc.yingxiong.com/gg/2017/0614/257.html">点击查看</a>
                            <p>活动规则</p>
                        </li>
                        <li class="second_li">
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/star02.jpg" title="" alt="" />
                            <a href="http://fc.yingxiong.com/gg/2017/0614/258.html">点击查看</a>
                            <p>活动规则</p>
                        </li>
                        <li>
                            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/star03.jpg" title="" alt="" />
                            <a href="http://fc.yingxiong.com/gg/2017/0614/259.html">点击查看</a>
                            <p>活动规则</p>
                        </li>
                    </ul>
                </div>
                <div class="top_page02">
                    <img class="line" src="<?php echo STATIC_DOMAIN ?>2.0/images/line.png" title="" alt="" />
                    <div class="match_bg01">
                        64位复赛选手
                    </div>
                    <div class="match_bg02">
                        64-32-16-8
                    </div>
                    <div class="match_bg03">
                        8强选手单循环积分赛
                    </div>
                    <div class="match_bg04">
                        <span>4强</span>
                        <span>4强</span>
                        <span>4强</span>
                        <span>4强</span>
                    </div>
                    <div class="match_bg05">
                        <span>半决赛</span>
                        <span>半决赛</span>
                    </div>
                    <div class="match_bg06">
                        <span>冠军</span>
                    </div>
                    <div class="match_bg07">
                        11月4日-11月10日
                    </div>
                    <div class="match_bg08">
                        11月25日
                    </div>
                </div>
            </div>
        </div>

        <div class="page_main">
            <img class="title02" src="<?php echo STATIC_DOMAIN ?>2.0/images/title02.png" title="" alt="" />
            <div class="page02">
                <img class="title03" src="<?php echo STATIC_DOMAIN ?>2.0/images/title03.png" title="" alt="" />
                <div class="middle">
                    <img class="car" src="<?php echo STATIC_DOMAIN ?>2.0/images/car.jpg" title="" alt="" />
                    <div class="dwm">
                        <img src="<?php echo STATIC_DOMAIN ?>2.0/images/f.jpg" title="" alt="" />
                        <ul>
                            <li>
                                <img src="<?php echo STATIC_DOMAIN ?>2.0/images/car_sm.jpg" title="" alt="" />
                                <p><i>【妖歌·源】</i>180天</p>
                            </li>
                            <li>
                                <img class="lunpan" src="<?php echo STATIC_DOMAIN ?>2.0/images/lunpan.png" title="" alt="" />
                                <p>8000点券</p>
                            </li>
                            <li>
                                <img class="mz" src="<?php echo STATIC_DOMAIN ?>2.0/images/mz.png" title="" alt="" />
                                <p>称号【S7巅峰之战亚军】</p>
                            </li>
                        </ul>
                    </div>
                    <div class="dym">
                        <img src="<?php echo STATIC_DOMAIN ?>2.0/images/f1.jpg" title="" alt="" />
                        <ul>
                            <li>
                                <img src="<?php echo STATIC_DOMAIN ?>2.0/images/car_sm.jpg" title="" alt="" />
                                <p><i>【妖歌·源】</i>永久</p>
                            </li>
                            <li>
                                <img class="lunpan" src="<?php echo STATIC_DOMAIN ?>2.0/images/lunpan.png" title="" alt="" />
                                <p>10000点券</p>
                            </li>
                            <li>
                                <img class="mz" src="<?php echo STATIC_DOMAIN ?>2.0/images/mz01.png" title="" alt="" />
                                <p>称号【S7巅峰之战冠军】</p>
                            </li>
                        </ul>
                    </div>
                    <div class="dsm">
                        <img src="<?php echo STATIC_DOMAIN ?>2.0/images/f2.jpg" title="" alt="" />
                        <ul>
                            <li>
                                <img src="<?php echo STATIC_DOMAIN ?>2.0/images/car_sm.jpg" title="" alt="" />
                                <p><i>【妖歌·源】</i>90天</p>
                            </li>
                            <li>
                                <img class="lunpan" src="<?php echo STATIC_DOMAIN ?>2.0/images/lunpan.png" title="" alt="" />
                                <p>6000点券</p>
                            </li>
                            <li>
                                <img class="mz" src="<?php echo STATIC_DOMAIN ?>2.0/images/mz02.png" title="" alt="" />
                                <p>称号【S7巅峰之战季军】</p>
                            </li>
                        </ul>
                    </div>

                    <div class="dxm">
                        <span><img src="<?php echo STATIC_DOMAIN ?>2.0/images/sm.png" title="" alt="" /></span>
                        <span>5000点券</span>
                    </div>
                    <div class="dbm">
                        <span><img src="<?php echo STATIC_DOMAIN ?>2.0/images/wm.png" title="" alt="" /></span>
                        <span>3000点券</span>
                    </div>
                    <div class="dqm">
                        <span><img src="<?php echo STATIC_DOMAIN ?>2.0/images/jm.png" title="" alt="" /></span>
                        <span>1688点券</span>
                    </div>
                    <div class="dim">
                        <span><img src="<?php echo STATIC_DOMAIN ?>2.0/images/im.png" title="" alt="" /></span>
                        <span>888点券+888钻石</span>
                    </div>
                    <div class="dlm">
                        <span><img src="<?php echo STATIC_DOMAIN ?>2.0/images/ssm.png" title="" alt="" /></span>
                        <span>588点券+588钻石</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="page_main">
            <img class="title05" src="<?php echo STATIC_DOMAIN ?>2.0/images/title05.png" title="" alt="" />
            <div class="page03">
                <img class="title06" src="<?php echo STATIC_DOMAIN ?>2.0/images/title06.png" title="" alt="" />
                <div class="ctc">
                    <div class="ctc_txt">
                        <p>
                            全民可参与竞猜，预测正确获得神秘奖励。
                        </p>
                        <p>
                            点击你认为冠军所在服务器进行投票，预留奖品接收手机号。
                        </p>
                        <p>
                            若您竞猜正确，您将获得冠军大礼包激活码一个。
                        </p>
                        <p>
                            每位玩家仅能投票一次。
                        </p>
                    </div>
                    <div class="fwq">
                        <?php foreach ($servers as $k => $v) { ?>

                            <?php if ($k%5 == 0) { echo '<ul>'; } ?>
                                <li class="dyh">
                                    <p class="piaoshu" id="<?php echo $v['id'] ?>"><?php echo $v['view_count']; ?>票</p>
                                    <p class="md"><?php echo $v['title']; ?></p>
                                    <p class="tp" data-num="<?php echo $v['view_count'] ?>" data-id="<?php echo $v['id']; ?>">投 票</p>
                                </li>
                            <?php if (($k%5 == 4) || ($k == (count($servers)-1))) { echo '</ul>';} ?>

                        <?php } ?>

                    </div>
                </div>
                <div class="tp_tc">
                    <h3>HPL巅峰车神争霸赛S7</h3>
                    <img class="yy_c yy_b" src="<?php echo STATIC_DOMAIN ?>2.0/images/yuyue_c.png" title="" alt="" />
                    <p>为您心目中会产生总冠军的服务器投票，若您投中，便可获得冠军预测大礼包激活码一个，比赛结束后，发放至您的手机号中。</p>
                    <form action="" data-type="2" onsubmit="return false">
                        <input class="sjh" type="tel" placeholder="输入手机号" id="vote-phone" name="phone" />
                        <input class="yzm" type="text" placeholder="输入验证码" id="vote-yzm"/>
                        <button class="fs" id="vote-btn">发送</button>
                        <a class="yy_s" href="javascript:;" id="vote"></a>
                    </form>
                </div>
            </div>
        </div>

        <div class="page_main">
            <img class="title07" src="<?php echo STATIC_DOMAIN ?>2.0/images/title07.png" title="" alt="" />
            <div class="page04">
                <img class="title08" src="<?php echo STATIC_DOMAIN ?>2.0/images/title08.png" title="" alt="" />
                <div class="sp">
                    <ul class="sp_list">
                        <?php foreach ($video as $k => $v) { ?>
                            <li>
                                <img src="<?php echo $v['thumb'] ?>" title="" alt="" />
                                <img data-url="<?php echo $v['content_message'] ?>" class="bgn js_video_play" src="<?php echo STATIC_DOMAIN ?>2.0/images/bgn.png" title="" alt="" />
                                <p><?php echo $v['title'] ?></p>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
<!--        <div id="video_mask" class="video_mask">-->
<!--            <div class="w man10 both OF none"></div>-->
<!--            <div id="player5">-->
<!--                <div id="close"></div>-->
<!--                <div class="videos"><embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="1280" height="720" align="middle" allowscriptaccess="always" flashvars="undefined&amp;auto_play=1&amp;gpcflag=1&amp;width=1280&amp;height=720" type="application/x-shockwave-flash"></div>-->
<!--            </div>-->
<!--        </div>-->

    </div>

    <div class="tc">
        <h3>HPL巅峰车神争霸赛S7</h3>
        <img class="yy_c" src="<?php echo STATIC_DOMAIN ?>2.0/images/yuyue_c.png" title="" alt="" />
        <p>感谢您预约观看HPL-巅峰车神争霸赛S7，本赛事将于11月25日正式开始，我们会以短信形式提前半小时邀您来观看。</p>
        <form action="" data-type="1" onsubmit="return false">
            <input class="sjh js-phone" id="yuyue-phone" name="phone" type="tel" placeholder="输入手机号" />
            <input class="yzm" type="text" id="yuyue-yzm" placeholder="输入验证码" />
            <button class="fs yuyue-btn" id="btn">发送</button>
            <a class="yy_s" href="javascript:;" id="yuyue"></a>
        </form>
    </div>
    <div class="include"></div>
</div>
</body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js"></script>

<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/common/js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>2.0/js/js.js"></script>
<script type="text/javascript">
    var serverId = 0;
    var wait = 60;
    var wait_vote = 60
    $(function() {
        $(".yuyue").click(yuYue);
        $('.yuyue-btn').click(sendCode);
        $('#vote-btn').click(sendCode);
        $('#yuyue').click(yuYue);
        $('#vote').click(vote);
        $('.tp').on('click',function(e){
            serverId = $(this).attr('data-id');
        })

    })

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
                    $(".tc").hide();
                    $(".include").hide();
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
                    $(".tp_tc").hide();
                    $(".include").hide();
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
            if (data.status != 0) {
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
<?php echo common\widgets\videoPlay\VideoPlayWidget::widget()?>

