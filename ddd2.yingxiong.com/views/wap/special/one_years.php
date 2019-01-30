<?php

use yii\helpers\Html;
use yii\helpers\Url;

$this->title = '弹弹岛2一周年活动专题页 弹弹岛2官方网站-新一代休闲弹射竞技手游-英雄互娱';
$this->keywords = '弹弹岛2一周年、游戏周年庆、周年庆、官方周年庆、弹弹岛2周年庆活动、弹弹岛周年庆';
$this->description = '弹弹岛2一周年活动专题页。英雄互娱旗下新一代休闲竞技手游迎来一周年！登陆送好礼、口令领红包、三大主题活动带你有免费越南，更有全新觉醒系统激燃来袭！参加弹弹岛2周年庆，畅享百万豪礼回馈。周年庆典616，弹射就要666！';
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php  echo !$this->title?$this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_NAME):$this->title?></title>
    <meta name="Keywords" content="<?php  echo !$this->keywords? $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS) :$this->keywords;?>" >
    <meta name="Description" content="<?php  echo !$this->description? $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION) : $this->description;?>" >

    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>dddyzn/m/css/common.css?<?= VERSION?>">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>dddyzn/m/css/index.css?<?= VERSION?>">

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <?php echo Html::csrfMetaTags()?>
    <script src="<?php echo STATIC_DOMAIN ?>dddyzn/m/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
    <script>
        (function (doc, win) {
            var docEl = doc.documentElement,
                // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 16*(clientWidth / 320) + 'px';
                };

            recalc();
            //判断是否支持监听事件 ，不支持则停止
            if (!doc.addEventListener) return;
            //注册翻转事件
            win.addEventListener(resizeEvt, recalc, false);

        })(document, window);
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
<script src="<?php echo STATIC_DOMAIN ?>dddyzn/m/js/top.js?<?= VERSION?>"></script>
<div class="yzn_con">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_07.jpg?<?= VERSION?>" class="yzn_bg">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_04.png?<?= VERSION?>" class="yzn_img01">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_08.png?<?= VERSION?>" class="yzn_img02">
    <!-- <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_05.png" class="yzn_img03"> -->
</div>
<div class="top_H1"></div>
<div class="yzn_part_01">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_09.png" class="yzn_part01_bg">
    <!-- <div class="swiper-container swiper_01">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_10.png"></div>
            <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_11.png"></div>
            <div class="swiper-slide"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_12.png"></div>
        </div>
    </div> -->
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_10.png" class="yzn_part01_01">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_13.png" class="look_detail">
</div>
<div class="top_H2"></div>

<div class="yzn_part_02">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_15.png" class="yzn_part02_bg">
    <div class="videos">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_33.png" class="js_video_play" data-url="uu=58546ec681&vu=c4e1b47788">
    </div>
    <div class="part_02_swith">
        <textarea class="ly_input" maxlength="60" placeholder="《弹弹岛2》一岁啦！发送你对弹弹岛2的生日祝福，小小的祝福，大大的鼓励~"></textarea>
    </div>
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_16.png" class="send_swith">
    <div class="wall_swith">
        <h3>[祝福墙]</h3>
        <div class="ly_loaction" id="content">
            <?php foreach ($zhufu as $v) {?>
                <p><i><?php echo $v['username']?></i>发送了祝福：<?php echo $v['content']?></p>

                <p><span><?php echo $v['username']?></span>发送了祝福：<?php echo $v['content']?></p>
            <?php }?>
        </div>

    </div>
</div>
<div class="top_H2"></div>
<div class="yzn_part_03">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_17.png" class="yzn_part03_bg">
    <div class="part_03_text">一年，365天，在弹岛邂逅无数小确幸！上“弹弹岛2贴吧”发表在弹岛发生的故事，赢取周年欢庆大礼！</div>
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_18.png" class="part_03_icon">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_19.png" class="imm_part">
</div>
<div class="top_H2"></div>

<div class="yzn_part_04">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_20.png" class="yzn_part04_bg">
    <div class="part_04_text">陪伴你的一直都在，616不见不散</div>
    <div class="part_04_icon">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_21.png" class="part_04_con_bg">
        <div class="ewm">
            <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_22.png" >
        </div>
    </div>
</div>
<div class="top_H2"></div>
<div class="yzn_part_05">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_24.png" class="yzn_part05_bg">
    <div class="part_05_text">将自己设计或者收集的时装设计图在“QQ部落”与大家分享我们将为人气最高的设计者实现梦想，在游戏中还原他的设计并有豪礼相送！</div>
    <div class="wrapper-images swiper_02">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_39 (1).png" class="pic">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_39 (2).png" class="pic" style="display:none;">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_39 (3).png" class="pic" style="display:none;">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_39 (4).png" class="pic" style="display:none;">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_39 (5).png" class="pic" style="display:none;">
    </div>
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_26.png" class="part_05_left">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_25.png" class="part_05_right">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_27.png" class="i_join">
</div>
<div class="top_H2"></div>

<div class="yzn_part_06">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_29.png" class="yzn_part06_bg">
    <div class="yzn_part_06_text">周年重磅更新，角色觉醒系统开启！觉醒之魂、觉醒之体双重进阶，全新天赋、技能上线，提供更多属性加成，成就你的弹王之路！</div>
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_28.png" class="look_detail_06">
</div>

<div class="top_H2"></div>

<div class="yzn_part_07">
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_30.png" class="yzn_part07_bg">
    <div class="part_07_text">人气主播化身冒险家，《弹弹岛2》定制直播综艺“淋浴歌王”  6月16晚20：00花椒直播不见不散！</div>
    <div class="part_07_icon">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_31.png" class="part_07_con_bg">
    </div>
    <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_32.png" class="go_huajiao">
</div>
<div class="gw_enter"><a href="<?php echo Url::to(['wap/site/index'])?>"><img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_34.png"></a></div>
<div class="yzn_cover"></div>
<div class="yzn_c_con">

    <div class="c_con">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_37.png" class="con_bg">
        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_36.png" class="con_close">
            <select id="serverName" name="serverName" class="c_con_sel">
                <?php foreach ($server as $v) {?>
                    <?php if ($v['status'] == 1) {?>
                        <option value="<?php echo $v['serverName']?>"><?php echo $v['serverName']?></option>
                    <?php } ?>
                <?php } ?>
            </select>
            <input type="text" id="username" placeholder="输入昵称" class="nicheng">

        <img src="<?php echo STATIC_DOMAIN ?>dddyzn/m/images/pic_35.png" class="send_btn">
    </div>
</div>

<script src="<?php echo STATIC_DOMAIN ?>dddyzn/m/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script src="<?php echo STATIC_DOMAIN ?>dddyzn/m/js/common.js?<?= VERSION?>"></script>
<script>
    // var mySwiper = new Swiper(".swiper_01",{
    // 	loop:true,
    // 	autoplay:3000
    // });
    // var mySwiper = new Swiper('.swiper_02',{
    // 	loop:true,
    // 	autoplay:3000

    // });
    $(function(){
        setInterval(getZhufu, 10000);
    })
    function getZhufu()
    {
        var _csrf = $('meta[name="csrf-token"]').attr('content');
        $.post('<?php echo Url::to(['special/ajax-zhufu'])?>', {cms_csrf:_csrf}, function(data){
            var content = '';
            for (var i in data.msg) {
                content += '<p><span>'+data.msg[i]['username']+'</span>发送了祝福：'+data.msg[i]['content']+'</p>';
            }

            $(".ly_loaction").html(content);
        }, 'json');
    }

    $(".look_detail").on("click", function(e){
        e.stopPropagation();
        window.location="/m/info/news/2017/0615/402.html";
    });
    $(".send_swith").on("click", function(e){
        e.stopPropagation();
        var theVal = $(".ly_input").val().replace(/[\r\n]/g,"").replace(/\ +/g,"");
        if(theVal==""){
            theVal = "《弹弹岛2》一岁啦！发送你对弹弹岛2的生日祝福，小小的祝福，大大的鼓励~";
        }
        $(".yzn_cover").show();
        $(".yzn_c_con").show();
        sendClickOff();
        sendClickOn();
        function sendClickOn(){
            $(".send_btn").on("click",function(e){
                e.stopPropagation();
                var selDaqu = $(".c_con_sel").val();
                    //执行正常
                var nichen = $(".nicheng").val();
                if(nichen==""){
                    alert("请输入昵称");
                }else{
                    var val = "";
                    $(".yzn_cover").hide();
                    $(".yzn_c_con").hide();
                    val = $(".ly_input").val().replace(/[\r\n]/g,"").replace(/\ +/g,"") || theVal;
                    var serverName = $('#serverName').val();
                    var username = $('#username').val();
                    var content = val;
                    var _csrf = $('meta[name="csrf-token"]').attr('content');
                    $.post('<?php echo Url::to(['special/send-zhufu'])?>', {content:content, cms_csrf:_csrf, serverName:serverName, username:username}, function(data){
                        if (data.status == 0) {
                            $(".ly_loaction").prepend('<p><span>'+username+'</span>发送了祝福：'+val+'</p>');
                        } else {
                            alert(data.msg);
                            return;
                        }
                    }, 'json');
                }
            });
        };
        function sendClickOff(){
            $(".send_btn").off();
        }
        $(".con_close").on("click",function(e){
            e.stopPropagation();
            $(".yzn_cover").hide();
            $(".yzn_c_con").hide();
        })
    });
    $(".gw_enter").on("click",function(e){
        e.stopPropagation();
        //输入你想跳转的界面
        window.location="<?php echo Url::to(['site/index'])?>";
    })
    $(".imm_part").on("click", function(e){
        e.stopPropagation();
        window.location="https://tieba.baidu.com/p/5163788394";
    });
    $(".i_join").on("click",function(e){
        e.stopPropagation();
        window.location = 'https://buluo.qq.com/p/detail.html?bid=315559&pid=3347121-1497511210';
    });
    $(".look_detail_06").on("click",function(e){
        e.stopPropagation();
        window.location = '/m/info/news/2017/0615/403.html';
    });
    $(".go_huajiao").on("click",function(e){
        e.stopPropagation();
        alert("敬请期待！");
    });
//    //点击加载视频
//    $(".videos").on("click",function(e){
//        e.stopPropagation();
//        tankuang("/videoMobile/video-source.html?uu=58546ec681&vu=c4e1b47788")
//    })



    //首页轮播图

    var
        timer = null,
        currIndex = 0,
        nextIndex = 1,
        timer = null,
        //wrapper-images
        len = $(".wrapper-images .pic").length,  //4
        imgWidth = $(".wrapper-images .pic").width();  //810
    //timer = setInterval(move, 2000);

    //创建小圆点
    // var html = "";
    // for(var i = 0; i < len; i++){
    // 	html+="<div>" + (i + 1) + "</div>";
    // }
    // $(html).appendTo("#pages").on("click",function(){
    // 	nextIndex = $(this).index();
    // 	move();
    // }).eq(0).addClass("show");

    // //点击小圆点
    // $(".wrapper-images").hover(function(){
    // 	clearInterval(timer)
    // },function(){
    // 	timer = setInterval(move, 2000);
    // }).trigger("mouseleave");
    //点击左右键图片运动
    // $(".part_05_right").click(move);
    $(".part_05_right").on("click",function(e){
        e.stopPropagation();
        clearInterval(timer)
        move();
        timer = setInterval(move, 2000);
    });


    // $(".part_05_left").click(function(){

    // 	nextIndex -= 2;
    // 	if(nextIndex < 0)
    // 		nextIndex = nextIndex + len;
    // 		move();
    // });
    $(".part_05_left").on("click",function(e){
        e.stopPropagation();
        clearInterval(timer)
        nextIndex -=2;
        if(nextIndex<0){
            nextIndex = nextIndex + len;
            move();
        }
        timer = setInterval(move, 2000);
    });



    timer = setInterval(move, 2000);
    function move(){
        $(".pic").eq(currIndex).fadeOut(1000);   //消失
        $(".pic").eq(nextIndex).fadeIn(1000);    //出现

        currIndex = nextIndex;
        nextIndex++;
        if(nextIndex == len){
            nextIndex = 0;
        }
        // //设置小圆点样式.
        // $("#pages>div").eq(currIndex).addClass("show").siblings().removeClass("show");
    }

</script>
</body>
</html>

<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>
<?php echo \common\widgets\videoPlay\VideoPlayWidget::widget();?>
