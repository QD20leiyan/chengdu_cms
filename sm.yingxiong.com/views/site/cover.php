<?php
use common\Cms;
use yii\helpers\Html;
use yii\helpers\Url;
?>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>创造与魔法官方网站 每一个有趣的梦想 都将在这里实现</title>
    <meta name="keywords" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_KEYWORDS);?>">
    <meta name="description" content="<?php  echo $this->getConfigValue(\common\models\WebsiteConfig::CONFIG_WEB_DESCRIPTION);?>">
    <?= Html::csrfMetaTags() ?>
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>2.0/css/common.css">
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>2.0/css/index.css">
    <link rel="shortcut icon" href="<?php echo STATIC_DOMAIN?>3.0/images/favicon.ico" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>2.0/js/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>2.0/js/jquery.SuperSlide.2.1.1.js"></script>
    <script data-fixed="true">
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            location.href = "/m"+window.location.pathname+window.location.search;
        }
    </script>

    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cd3c5f317e3f5ced9e323d594c3eb7b3";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>
<body>
<script type="text/javascript" src="http://cdnstatic.yingxiong.com/head/js/topbar.js"></script>

<div class="czymf">
    <div style="width:100%;height:757px;">
        <div class="czymf_bg" style="width:1920px;position:absolute;left:50%;transform:translate(-50%);" >
<!--            <img src="--><?php //echo STATIC_DOMAIN; ?><!--2.0/images/cz_pic_04.jpg" usemap="#Map" border="0" style="width:100%;">-->
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/img11.jpg" usemap="#Map" border="0" style="width:100%;">
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/1.png" class="imgcur1 imgcur">
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/2.png" class="imgcur2 imgcur">
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/3.png" class="imgcur3 imgcur">
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/4.png" class="imgcur4 imgcur">
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/5.png" class="imgcur5 imgcur">
            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/6.png" class="imgcur6 imgcur">
            <div class="czymf_play"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/cz_play.png"></div>
            <!--
                            <div class="czymf_yxyy"><img src="./images/cz_pic_01.png" alt=""></div>
                            <div class="czymf_yxlt"><img src="./images/cz_pic_02.png" alt=""></div>
                            <div class="czymf_yyrs">预约人数<span>243333353</span></div>
            -->
        </div>
    </div>



    <map name="Map" id="Map">
        <area class="cur1" shape="poly" coords="1425,564,1410,558,1398,551,1383,559,1384,581,1384,587,1373,597,1368,611,1355,628,1346,635,1327,635,1319,633,1319,640,1325,648,1341,648,1358,643,1367,639,1374,638,1376,649,1379,659,1387,665,1391,675,1402,680,1408,682,1414,677,1415,666,1420,658,1425,664,1422,680,1421,687,1434,691,1441,692,1460,693,1477,695,1483,695,1486,691,1486,679,1487,668,1487,660,1486,648,1486,637,1480,617,1476,603,1463,591,1439,578" href="#" />
        <area class="cur2" shape="poly" coords="335,550,338,553,326,567,322,577,320,589,327,597,337,603,351,601,360,597,365,594,362,581,368,573,366,567,356,560,352,556,347,556" href="#" />
        <area class="cur3" shape="poly" coords="1230,381,1219,387,1203,388,1195,395,1191,404,1187,399,1179,392,1169,392,1169,405,1168,416,1168,430,1171,441,1182,447,1190,451,1196,444,1198,428,1198,417,1206,422,1208,429,1205,439,1204,446,1204,452,1217,453,1220,447,1225,447,1232,447,1234,455,1240,460,1244,456,1243,444,1242,440,1243,432,1248,428,1256,427,1256,443,1257,455,1258,464,1268,461,1276,457,1278,449,1280,440,1282,428,1284,420,1276,420,1267,423,1262,423" href="#"/>
        <area class="cur4" shape="poly" coords="626,474,614,478,610,473,607,469,602,469,594,473,588,481,585,483,574,484,565,484,545,476,548,471,550,468,550,464,549,455,547,445,544,442,540,444,536,450,534,454,526,449,520,441,515,436,508,430,507,439,519,447,519,453,523,460,527,465,534,470,535,474,541,480,547,487,552,492,561,496,569,504,578,505,578,521,572,534,568,549,564,567,561,593,559,613,555,627,549,637,558,643,571,642,573,640,574,626,575,615,570,603,570,599,575,583,579,574,592,568,603,555,611,549,614,549,606,564,603,572,598,583,598,589,598,601,602,606,611,605,615,601,616,590,618,577,622,570,625,562,634,563,643,563,651,559,656,547,661,540,674,530,682,525,690,520,701,514,709,513,706,524,700,535,699,542,700,554,705,562,715,568,720,554,723,544,721,533,721,518,721,500,720,490,709,484,700,475,691,463,688,445,685,430,691,422,696,412,705,414,713,410,713,398,708,386,701,375,696,363,689,355,672,353,660,355,652,362,653,379,654,393,654,398,657,411,645,440,638,454,638,463" href="#" />
        <area class="cur5" shape="poly" coords="1610,538,1607,548,1607,555,1607,562,1615,569,1616,574,1616,580,1609,586,1600,591,1597,597,1599,606,1606,613,1606,623,1605,636,1609,642,1620,648,1629,654,1633,654,1642,656,1647,664,1653,670,1661,666,1663,657,1655,638,1646,638,1646,631,1651,627,1651,621,1641,600,1638,584,1634,577,1630,568,1634,558,1635,553,1636,546,1623,534" href="#" />
        <area class="cur6" shape="poly" coords="1015,307,1019,328,1025,352,1025,358,1010,368,998,375,985,382,977,392,975,394,956,411,952,419,951,443,950,461,947,479,941,485,930,484,915,483,907,489,897,503,893,522,893,534,894,542,894,552,876,567,866,574,858,594,864,615,861,627,852,635,840,647,839,659,837,672,821,702,818,716,812,731,788,767,781,779,778,803,796,803,793,809,790,819,800,820,804,827,813,819,817,816,822,820,828,823,835,826,842,815,859,790,877,745,886,719,905,722,906,731,903,739,920,739,928,727,932,727,936,739,955,724,962,704,974,695,1005,679,1025,684,1051,684,1085,680,1114,660,1111,596,1103,583,1099,581,1092,579,1098,570,1113,568,1128,567,1145,573,1151,567,1157,542,1137,528,1110,523,1102,523,1091,527,1075,536,1066,536,1057,533,1053,526,1053,519,1058,508,1059,499,1077,481,1080,477,1084,468,1091,455,1095,422,1099,404,1100,386,1112,385,1119,385,1126,385,1134,377,1145,367,1147,356,1151,337,1163,334,1168,324,1169,292,1170,271,1165,258,1157,247,1149,239,1125,229,1090,222,1076,224,1058,238,1043,253,1027,266,1024,269" href="#"  />

    </map>
    <div class="czymf_mid" style="display:none;">
    </div>
    <div class="news-cont">
        <div class="button">
            <a target="_blank" href="javascript:" id="yuyue"><i><label>预约人数： <b><?php echo $count; ?> </b>人</label></i></a>
            <a target="_blank" href="javascript:alert('敬请期待！')" class="js_down_andriod"><i><label></label></i></a>
            <a target="_blank" href="https://www.taptap.com/app/51645"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/cz_btn3.png" /></a>
        </div>
        <div class="new">
        <div class="news clearfix">
            <div class="news-tab">
                <ul class="news-nav clearfix">
                    <li class="curr"><a target="_blank" href="javascript:">全部</a></li>
                    <li><a target="_blank" href="javascript:">新闻</a></li>
                    <li><a target="_blank" href="javascript:">公告</a></li>
                    <li><a target="_blank" href="javascript:">活动</a></li>
                    <li><a target="_blank" href="javascript:">攻略</a></li>
                    <a target="_blank" target="_blank" href="<?php echo Url::to(['article/'])?>"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/add.png" class="add"></a>
                </ul>
                <ul class="lis news-li show">
                    <?php if (!empty($zuixin)) { ?>
                        <?php if ($zuixin) {?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $zuixin[0]->id, 'add_time' => $zuixin[0]->created_at]);?>"><i>【新闻】</i><?php echo $zuixin[0]['title'] ?> </a><span>[<?php echo date('Y-m-d', $zuixin[0]->created_at) ?>]</span>
                                <p><?php echo mb_substr(strip_tags($zuixin[0]->contentMessage), 0, 60, 'utf-8')."..." ?></p>
                            </li>
                        <?php }?>
                        <?php foreach ($zuixin as $k => $v) {?>
                            <?php if ($k == 0) {continue;}?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $v['id'], 'add_time' => $v['created_at']]);?>"><i>【新闻】</i><?php echo $v['title']?> </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                        <?php }?>

                    <?php } else {?>
                        <div class="none">
                            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                            <p>暂无内容~</p>
                        </div>
                    <?php }?>
                </ul>
                <ul class="lis news-li hide">
                    <?php if (!empty($xinwen)) { ?>
                        <?php if ($xinwen) {?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $xinwen[0]->id, 'add_time' => $xinwen[0]->created_at]);?>"><i>【新闻】</i><?php echo $xinwen[0]['title'] ?> </a><span>[<?php echo date('Y-m-d', $xinwen[0]->created_at) ?>]</span>
                                <p><?php echo mb_substr(strip_tags($xinwen[0]->contentMessage), 0, 60, 'utf-8')."..." ?></p>
                            </li>
                        <?php }?>
                        <?php foreach ($xinwen as $k => $v) {?>
                            <?php if ($k == 0) {continue;}?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $v['id'], 'add_time' => $v['created_at']])?>"><i>【新闻】</i><?php echo $v['title']?> </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                        <?php }?>

                    <?php } else {?>
                        <div class="none">
                            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                            <p>暂无内容~</p>
                        </div>
                    <?php }?>
                </ul>
                <ul class="lis news-li hide">
                    <?php if (!empty($gonggao)) { ?>
                        <?php if ($gonggao) {?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $gonggao[0]->id, 'add_time' => $gonggao[0]->created_at])?>"><i>【公告】</i><?php echo $gonggao[0]['title'] ?> </a><span>[<?php echo date('Y-m-d', $gonggao[0]->created_at) ?>]</span>
                                <p><?php echo mb_substr(strip_tags($gonggao[0]->contentMessage), 0, 60, 'utf-8')."..." ?></p>
                            </li>
                        <?php }?>
                        <?php foreach ($gonggao as $k => $v) {?>
                            <?php if ($k == 0) {continue;}?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $v['id'], 'add_time' => $v['created_at']])?>"><i>【公告】</i><?php echo $v['title']?> </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                        <?php }?>

                    <?php } else {?>
                        <div class="none">
                            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                            <p>暂无内容~</p>
                        </div>
                    <?php }?>
                </ul>
                <ul class="lis news-li hide">
                    <?php if (!empty($huodong)) { ?>
                        <?php if ($huodong) {?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $huodong[0]->id, 'add_time' => $huodong[0]->created_at])?>"><i>【活动】</i><?php echo $huodong[0]['title'] ?> </a><span>[<?php echo date('Y-m-d', $huodong[0]->created_at) ?>]</span>
                                <p><?php echo mb_substr(strip_tags($huodong[0]->contentMessage), 0, 60, 'utf-8')."..." ?></p>
                            </li>
                        <?php }?>
                        <?php foreach ($huodong as $k => $v) {?>
                            <?php if ($k == 0) {continue;}?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $v['id'], 'add_time' => $v['created_at']])?>"><i>【活动】</i><?php echo $v['title']?> </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                        <?php }?>

                    <?php } else {?>
                        <div class="none">
                            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                            <p>暂无内容~</p>
                        </div>
                    <?php }?>
                </ul>
                <ul class="lis news-li hide">
                    <?php if (!empty($gonglue)) { ?>
                        <?php if ($gonglue) {?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $gonglue[0]->id, 'add_time' => $gonglue[0]->created_at])?>"><i>【攻略】</i><?php echo $gonglue[0]['title'] ?> </a><span>[<?php echo date('Y-m-d', $gonglue[0]->created_at) ?>]</span>
                                <p><?php echo mb_substr(strip_tags($gonglue[0]->contentMessage), 0, 60, 'utf-8')."..." ?></p>
                            </li>
                        <?php }?>
                        <?php foreach ($gonglue as $k => $v) {?>
                            <?php if ($k == 0) {continue;}?>
                            <li><a target="_blank" href="<?php echo Cms::getUrl('article/detail', ['id' => $v['id'], 'add_time' => $v['created_at']])?>"><i>【攻略】</i><?php echo $v['title']?> </a><span>[<?php echo date('Y-m-d', $v['created_at'])?>]</span></li>
                        <?php }?>

                    <?php } else {?>
                        <div class="none">
                            <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/none.png" />
                            <p>暂无内容~</p>
                        </div>
                    <?php }?>
                </ul>
            </div>
        </div>
    </div>
    </div>
    <div style="height: 607px;"></div>
    <div class="czymf_bg" style="width:1920px;position:absolute;left:50%;transform:translate(-50%);">

        <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/cz_pic_03.jpg" style="width:100%;">
        <div class="czymf_bottom">
<!--            <div class="czymf_pig"><img src="--><?php //echo STATIC_DOMAIN; ?><!--2.0/images/cz_pig.png" alt=""></div>-->
            <div class="czymf_niu"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/cz_niu.png" alt=""></div>

            <div id="slideBox" class="slideBox">
                <div class="bd">
                    <ul>
                        <?php foreach ($banners as $k => $v) { ?>
                            <li><a target="_blank" href="<?php echo $v['url'] ?>" target="_blank"><img src="<?php echo $v['thumb'] ?>"/></a></li>
                        <?php } ?>
                    </ul>
                </div>
                <!-- 下面是前/后按钮代码，如果不需要删除即可 -->
                <a target="_blank" class="prev" href="javascript:void(0)"></a>
                <a target="_blank" class="next" href="javascript:void(0)"></a>

            </div>
        </div>

    </div>

</div>
<!--<div class="yxyy_tk">-->
<!--    <div class="yxyy_con">-->
<!--        <div class="yxyy_con_h">-->
<!--            <h3 style="color:#dbb8b5;font-size:34px;font-weight:normal">游戏预约</h3>-->
<!--            <p style="color:#8a8484;font-size:14px;">Game reservation</p>-->
<!--        </div>-->
<!--        <div class="yxyy_con_info">-->
<!--            <p class="yxyy_con_in_h">二级文案，若有，游戏号了第一时间通知你！！！</p>-->
<!--            <div class="yxyy_con_in_phone"><input type="text" placeholder="请输入手机号码" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')"></div>-->
<!--            <div class="yxyy_con_in_btn">立即预约</div>-->
<!---->
<!--        </div>-->
<!--        <div class="yxyy_con_close"><img src="--><?php //echo STATIC_DOMAIN; ?><!--2.0/images/cz_pic_11.png"></div>-->
<!--    </div>-->
<!--</div>-->
<div style="height: 530px;"></div>
<div class="yxyy_tk"></div>
<div class="yxyy_con">
    <div class="yxyy_con_h">
        <h3 style="color:#dbb8b5;font-size:34px;font-weight:normal">游戏预约</h3>
        <p style="color:#8a8484;font-size:14px;">Game reservation</p>
    </div>
    <div class="yxyy_con_info">
        <p class="yxyy_con_in_h">亲，IOS暂未开放，请您先预约，游戏包好后，我们会第一时间通知您的~</p>
        <div class="yxyy_con_choice"><p><input type="radio" name="xitong" checked id="xitong1" value="ios"><label style="padding-left:10px;" for="xitong1">iOS</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p></div>
        <div class="yxyy_con_in_phone"><input type="text" placeholder="请输入手机号码" onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')"></div>
        <div class="yxyy_con_in_btn">立即预约</div>

    </div>
    <div class="yxyy_con_close"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/cz_pic_11.png"></div>
</div>

<div class="float" style="height:534px">
    <div class="float-cont">
        <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/11.png" class="float_btn" />
        <p class="txt"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/txt.png" /></p>
        <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/erweima.png" class="erweima" />
        <div class="btns">
            <a target="_blank" href="javascript:" class="ios"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/ios.png" /></a>
            <a target="_blank" href="http://downurl.yingxiong.com/android/czymf_wjtest.html" class="js_down_andriod"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/and.png" /></a>
        </div>
        <p class="tap">
            <a href="http://www.3839.com/a/88284.htm" target="_blank"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/img22.jpg" /></a>
        </p>
        <p class="tap"><a target="_blank" href="http://l.taptap.com/k9bRaUI4" target="_blank"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/tap.png" /></a></p>
        <div class="ico">
            <a target="_blank" href="javascript:"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/weixin.png" />
                <i></i>
            </a>

            <a target="_blank" href="javascript:">
                <img src="<?php echo STATIC_DOMAIN; ?>2.0/images/qq.png" />
                <i></i>
            </a>
            <a target="_blank" href="http://weibo.com/u/6293873121?refer_flag=1001030102_&is_hot=1" target="_blank"><img src="<?php echo STATIC_DOMAIN; ?>2.0/images/weibo.png" /></a>

        </div>
    </div>

</div>

<div id="video_mask" class="video_mask">
    <div class="w man10 both OF none"></div>
    <div id="player5">
        <div id="close"></div>
        <div class="videos"><embed src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" width="1280" height="720" align="middle" allowscriptaccess="always" flashvars="<?php echo $video[0]['url']; ?>" type="application/x-shockwave-flash"></div>
    </div>
</div>

<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer_new.js"></script>
<script type="text/javascript">
    jQuery(".slideBox").slide({mainCell:".bd ul",autoPlay:true,effect:"left",});
    //动态效果
    $("#yuyue,.ios").on("click", function(e){
        e.stopPropagation();
        $(".yxyy_tk").show();
        $(".yxyy_con").show();
    });
    $(".yxyy_con_close").on("click",function(e){
        e.stopPropagation();
        $(".yxyy_tk").hide();
        $(".yxyy_con").hide();
        $(".yxyy_con_in_phone input").val("");
    })
    $(".yxyy_con_in_btn").on("click",function(e){
        e.stopPropagation();
        var phone = $(".yxyy_con_in_phone input").val();
        var phoneLen = phone.length;
        if(phoneLen!=11){
            alert("请输入正确的手机号码");
        }else{
            var cms_csrf = $('meta[name="csrf-token"]').attr('content');
            var type = $('input[name="xitong"]:checked').val();
            $.post('<?php echo Url::to(['site/subscribe']) ?>', {phone:phone, cms_csrf:cms_csrf, type:type}, function (data) {
                if (data.status == 0) {
                    alert("预约成功");
                    $(".yxyy_tk").hide();
                    $(".yxyy_con").hide();
                    $(".yxyy_con_in_phone input").val("");
                } else {
                    alert(data.msg);
                }
            }, 'JSON');
        }
    });
    $(".czymf_yxlt").on("click", function(e){
        e.stopPropagation();
        alert("敬请期待！");
    })
    $(".czymf_yxlt").hover(function(){
        $(this).find("img").attr("src","<?php echo STATIC_DOMAIN; ?>2.0/images/cz_pic_02_p.png");
    },function(){
        $(this).find("img").attr("src","<?php echo STATIC_DOMAIN; ?>2.0/images/cz_pic_02.png");
    });
//    $(".czymf_yxyy").hover(function(){
//        $(this).find("img").attr("src","<?php //echo STATIC_DOMAIN; ?>//2.0/images/cz_pic_01_p.png");
//    },function(){
//        $(this).find("img").attr("src","<?php //echo STATIC_DOMAIN; ?>//2.0/images/cz_pic_01.png");
//    })


    $(".cur1").hover(function(e){
        e.stopPropagation();
        $(".imgcur1").show();
    },function(){
        $(".imgcur1").hide();
    });
    $(".cur2").hover(function(e){
        e.stopPropagation();
        $(".imgcur2").show();
    },function(){
        $(".imgcur2").hide();
    });

    $(".cur3").hover(function(e){
        e.stopPropagation();
        $(".imgcur3").show();
    },function(){
        $(".imgcur3").hide();
    })
    $(".cur4").hover(function(e){
        e.stopPropagation();
        $(".imgcur4").show();
    },function(){
        $(".imgcur4").hide();
    });
    $(".cur5").hover(function(e){
        e.stopPropagation();
        $(".imgcur5").show();
    },function(){
        $(".imgcur5").hide();
    });
    $(".cur6").hover(function(e){
        e.stopPropagation();
        $(".imgcur6").show();
    },function(){
        $(".imgcur6").hide();
    });
    $(".czymf_play").click(function (){
        $(".video_mask").show();
    })

    $("#close").click(function (){
        $(".video_mask").hide();
    })

    String.prototype.insert = function (index, item) {
        var temp = [];
        for (var i = 0; i < this.length; i++) {
            temp.push(this[i]);
        }
        temp.splice(index, 0, item);
        return temp.join("")
    };
    var theNum = $(".czymf_yyrs").find("span").text();
    var aa = theNum.split("").reverse().join("");
    var ss = aa;
    var theNumLen = aa.length;
    var result = theNumLen/3;
    if(result>1){
        if(theNumLen%3==0){
            result--;
        }else{
            result = Math.floor(result);
        };
        for(var i=result; i>0; i--){
            ss = ss.insert(Math.floor(i*3), ",");
            console.log(ss)
        }
    }
    var bb = ss.split("").reverse().join("");
    $(".czymf_yyrs").find("span").text(bb);
</script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>2.0/js/index.js"></script>
</body>
</html>
<?php echo \common\widgets\downloadLink\DownloadLinkWidget::widget(); ?>