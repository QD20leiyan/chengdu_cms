<?php

use yii\helpers\Html;
use yii\helpers\Url;

$this->title = '弹弹岛2一周年活动专题页 弹弹岛2官方网站-新一代休闲弹射竞技手游-英雄互娱';
$this->keywords = '弹弹岛2一周年、游戏周年庆、周年庆、官方周年庆、弹弹岛2周年庆活动、弹弹岛周年庆';
$this->description = '弹弹岛2一周年活动专题页。英雄互娱旗下新一代休闲竞技手游迎来一周年！登陆送好礼、口令领红包、三大主题活动带你有免费越南，更有全新觉醒系统激燃来袭！参加弹弹岛2周年庆，畅享百万豪礼回馈。周年庆典616，弹射就要666！';

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->keywords? $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS) :$this->keywords;?>" >
    <meta name="Description" content="<?php  echo !$this->description? $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION) : $this->description;?>" >

    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>dddyzn/pc/css/jquery.mCustomScrollbar.min.css?<?= VERSION?>">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>dddyzn/pc/css/index.css?<?= VERSION?>">
    <script src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
    <?php echo Html::csrfMetaTags()?>
    <!--[if lt IE 9]>
    <![endif]-->
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/wap/special/one-years.html";
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
<body>

<!--[if lt IE 10]>
<div style="position:absolute;left:0;top:0;width:100%;height:50px;background:rgb(255,255,233);color:rgb(30,84,148);border-bottom:1px solid rgb(230,230,198);text-align:center;line-height:50px;font-size:12px;z-index:9999999">您使用的浏览器版本过低，可能会影响到您浏览本网页，建议您升级您的浏览器。</div>
<![endif]-->

<!--网站导航-->
<div class="float_pc">
    <div class="d_xz_btn">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/d_xz.png">
        <div class="d_xz_box">
            <div><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/d_ewm.png" alt="二维码"></div>
            <a href="javascript:alert('敬请期待！')" class="d_ios_xz js_down_ios"></a>
            <a href="javascript:alert('敬请期待！')" class="d_az_xz js_down_andriod"></a>
        </div>
    </div>
    <a href="<?php echo Url::to(['site/index'])?>" class="d_gw_btn">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/d_gw.png">
    </a>
</div>
<div id="fullpage">
    <div class="bigpage">
        <div class="section section1">
            <div class="sec1-box sec-box"></div>
        </div>
        <div class="section section2">
            <div class="sec2-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-1.png" alt=""/></div>
                <div class="part-1">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/island.jpg?<?= VERSION?>" alt=""/>
                </div>
                <div class="part-2">
                    <div>
                        <div>
                            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/gift-1.png" alt=""/>
                            <p>从6月16-6月22日期间完成七天连续登陆玩家中，</br>随机<i>[抽取3名送出越南旅游大奖]</i></p>
                        </div>
                        <div>
                            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/gift-2.png" alt=""/>
                            <p>从6月16-6月22日期间完成七天连续登陆玩家中，</br>随机<i>[抽取3名送出越南旅游大奖]</i></p>
                        </div>
                        <div>
                            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/gift-3.png" alt=""/>
                            <p>从6月16-6月22日期间完成七天连续登陆玩家中，</br>随机<i>[抽取3名送出越南旅游大奖]</i></p>
                        </div>
                    </div>
                </div>
                <a href="/info/news/2017/0615/402.html" class="check" target="_blank"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/btn-1.png" alt=""/></a>
            </div>
        </div>
        <div class="section section3">
            <div class="sec3-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-2.png" alt=""/></div>
                <div class="per-1"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/per-1.png" alt=""/></div>
                <ul class="video-box">
                    <li class="js_video_play"  data-url="uu=58546ec681&vu=c4e1b47788">
                        <a>
                            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/video.jpg?<?= VERSION?>" alt="HPL2016总决赛" width="219">
                            <span><i></i></span>
                        </a>
                    </li>
                </ul>
                <div class="sendbox">
                    <div class="send">
                        <textarea id="content" maxlength="60" placeholder="《弹弹岛2》一岁啦！发送你对弹弹岛2的生日祝福，小小的祝福，大大的鼓励~"></textarea>
                        <i></i>
                    </div>
                    <div class="txt">
                        <span>[祝福墙]</span>
                        <div class="mCScrollp">
                            <?php foreach ($zhufu as $v) {?>
                                <p><i><?php echo $v['username']?></i>发送了祝福：<?php echo $v['content']?></p>
                            <?php }?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section4">
            <div class="sec4-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-3.png" alt=""/></div>
                <p class="title-info">一年，365天，在弹岛邂逅无数小确幸！上“弹弹岛2贴吧”发表在弹岛发生的故事，赢取周年欢庆大礼！</p>
                <a href="https://tieba.baidu.com/p/5163788394" target="_blank" class="check"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/btn-2.png" alt=""/></a>
                <div class="videpbox">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/videp.jpg?<?= VERSION?>" alt=""/>
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/videptxt.png?<?= VERSION?>" alt="" class="txt"/>
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/per-2.png?<?= VERSION?>" alt="" class="per-2"/>
                </div>
            </div>
        </div>
        <div class="section section5">
            <div class="sec5-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-4.png?<?= VERSION?>" alt=""/></div>
                <p class="title-info">陪伴你的一直都在，616不见不散</p>
                <div class="qrcodepbox">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/per-3.png?<?= VERSION?>" alt="" class="per-3"/>
                    <div class="codeimg">
                        <div>
                            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/jump_wctt_pcgw.png?<?= VERSION?>" alt=""/>
                            <p>扫码打开我的弹王之路</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section section6">
            <div class="sec6-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-5.png" alt=""/></div>
                <p class="title-info">将自己设计或者收集的时装设计图在“QQ部落”与大家分享 </br>我们将为人气最高的设计者实现梦想，在游戏中还原他的设计并有豪礼相送！</p>
                <a href="https://buluo.qq.com/p/detail.html?bid=315559&pid=3347121-1497511210" target="_blank" class="check"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/btn-3.png" alt=""/></a>
                <div class="clearfix"></div>
                <div class="imgbox sm first">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/banner-1.png" alt=""/>
                </div>
                <div class="imgbox md">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/banner-2.png" alt=""/>
                </div>
                <div class="imgbox">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/banner-3.png" alt=""/>
                </div>
                <div class="imgbox md">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/banner-4.png" alt=""/>
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/per-4.png" alt="" class="per-4"/>
                </div>
                <div class="imgbox sm">
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/banner-5.png" alt=""/>
                </div>
            </div>
        </div>
        <div class="section section7">
            <div class="sec7-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-6.png" alt=""/></div>
                <p class="title-info">周年重磅更新，角色觉醒系统开启！觉醒之魂、觉醒之体双重进阶, </br>全新天赋、技能上线，提供更多属性加成，成就你的弹王之路！</p>
                <a href="/info/news/2017/0615/403.html" target="_blank" class="check"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/btn-1.png" alt=""/></a>
                <div>
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/part6.png" alt=""/>
                </div>
            </div>
        </div>
        <div class="section section8">
            <div class="sec8-box sec-box">
                <div class="title-img"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/title-7.png" alt=""/></div>
                <p class="title-info">人气主播化身冒险家，《弹弹岛2》定制直播综艺“淋浴歌王”  6月16晚20：00花椒直播不见不散！</p>
                <div>
                    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/part7.png" alt=""/>
                </div>
                <a href="javascript:;" class="check"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/btn-4.png" alt=""/></a>
                <div class="i-footer">
                    <div class="i-fotcon">
                        <div class="i-fot-logo">
                            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/images/logo.png" alt="">
                        </div>
                        <div class="i-fot-text">
                            <p>文网游备字〔2016〕Ｍ-CSG 0339 号</p>
                            <p>版权所有：北京卓越晨星科技有限公司 联系方式：010-50948585</p>
                            <p>COPYRIGHT©2015 – 2015 . ALL RIGHTS RESERVED. 京ICP备15026730号-2</p>
                            <p>
                                <!--<a href="#">
                                    <img src="common/images/www-ico.png" alt="">
                                </a>
                                <a href="#">
                                    <img src="common/images/game-ico.png" alt="">
                                </a>-->
                                <a href="javascript:;">《网络文化经营许可证》</a><a href="javascript:;">京网文[2015]0629-259号</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--右导航-->
<div id="side-nav">
    <ul>
        <li data-menuanchor="page1" class="active side-nav-1"><a href="#page1"></a></li>
        <li data-menuanchor="page2" class="side-nav-2"><a href="#page2"></a></li>
        <li data-menuanchor="page3" class="side-nav-3"><a href="#page3"></a></li>
        <li data-menuanchor="page4" class="side-nav-4"><a href="#page4"></a></li>
        <li data-menuanchor="page5" class="side-nav-5"><a href="#page5"></a></li>
        <li data-menuanchor="page6" class="side-nav-6"><a href="#page6"></a></li>
        <li data-menuanchor="page7" class="side-nav-7"><a href="#page7"></a></li>
        <li data-menuanchor="page8" class="side-nav-8"><a href="#page8"></a></li>
    </ul>
</div>
<!--视频-->
<!--<div id="vid_mask" class="video_mask" style="display: none;">-->
<!--    <div id="player">-->
<!--        <div id="close"></div>-->
<!--        <div class="videos"></div>-->
<!--    </div>-->
<!--</div>-->
<!--登录弹框-->
<div class="zz"></div>
<div class="tipbox">
    <div class="close-1"></div>
    <div class="one">
        <select id="serverName" name="serverName" id="">
            <?php foreach ($server as $v) {?>
                <?php if ($v['status'] == 1) {?>
                    <option value="<?php echo $v['serverName']?>"><?php echo $v['serverName']?></option>
                <?php } ?>
            <?php } ?>
        </select>
    </div>
    <div><input id="username" type="text" placeholder="输入昵称"/></div>
    <div><button class="sendbtn">发送祝福</button></div>
</div>
<!--end-->
<script src="<?php echo STATIC_DOMAIN ?>dddyzn/pc/js/fullpage.js?<?= VERSION?>"></script>
<script>
    $(function(){
        //每屏高度
        $(window).resize(function(){
            $(".bigpage").css("height",$(window).width()*8260/1920);
            $(".section1").css("height",$(window).width()*0.4839);
        });
        $(".bigpage").css("height",$(window).width()*8260/1920);
        $(".section1").css("height",$(window).width()*0.4839);
        //滚动
        $(".mCScrollp").mCustomScrollbar({
            theme:"rounded-dark",
            scrollInertia:400
        });

        //视频获取
//        $(".video-box li").click(function(){
//                        var rel = $(this).attr('data-id');
//            if(rel){
//                $(".videos").html('<embed width="640" height="360" align="middle" type="application/x-shockwave-flash" flashvars="'+rel+'" allowscriptaccess="always" quality="high" allowfullscreen="true" src="http://yuntv.letv.com/bcloud.swf">');
//            }
//            $("#vid_mask").show();
//        })
//        $("#close").click(function(){
//            $("#vid_mask").hide();
//        });

        //我要下载弹框显示
        $(".send i").click(function(e){
            $(".tipbox").css({opacity:1,zIndex:1050});
            $(".zz").css({opacity:1,zIndex:1049});
        });
        $(".close-1,.zz").click(function(e){
            $(".tipbox").css({opacity:0,zIndex:-1});
            $(".zz").css({opacity:0,zIndex:-2});
        });

        //祝福新来数据
        function add(){
            var p=$("<p><i>熊爱明</i>发送了祝福：小小的祝福，大大的鼓励~</p>");
            $('.mCScrollp').append(p);
            $('.mCScrollp').mCustomScrollbar('scrollTo','-='+ p.height());
        }
        $(".sendbtn").click(function(){
            var serverName = $('#serverName').val();
            var username = $('#username').val();
            var content = $('#content').val();
            var _csrf = $('meta[name="csrf-token"]').attr('content');
            if (!content) {
                alert('请先编辑祝福语哦~~！');
                return;
            }
            if (!username) {
                alert('昵称不能为空！');
                return;
            }
            $.post('<?php echo Url::to(['special/send-zhufu']) ?>', {content:content, cms_csrf:_csrf, serverName:serverName, username:username}, function(data){
                if (data.status == 0) {
                    var p=$("<p><i>"+username+"</i>发送了祝福："+content+"</p>");
                    $('.mCScrollp .mCSB_container').prepend("<p><i>"+username+"</i>发送了祝福："+content+"</p>");
                    $('.mCScrollp').mCustomScrollbar('scrollTo','-='+ p.height());
                } else {
                    alert(data.msg);
                    return;
                }
            }, 'json');
            $(".tipbox").css({opacity:0,zIndex:-1});
            $(".zz").css({opacity:0,zIndex:-2});
        });

        setInterval(getZhufu, 10000);
    })

    function getZhufu()
    {
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        $.post('<?php echo Url::to(['special/ajax-zhufu'])?>', {cms_csrf:_csrf}, function(data){
            var content = '';
            for (var i in data.msg) {
                content += "<p><i>"+data.msg[i]['username']+"</i>发送了祝福："+data.msg[i]['content']+"</p>";
            }
            $('.mCScrollp .mCSB_container').html(content);
//            $('.mCScrollp').append(content);


//            $('.mCScrollp').mCustomScrollbar('scrollTo','-='+ $(content).height());
        }, 'json');
    }
</script>
</body>
</html>

<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
