<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>飞车康师傅合作页面</title>
    <link rel="stylesheet" href="<?php use yii\helpers\Url;

    echo STATIC_DOMAIN ?>kangshifu/css/public.css" />
    <link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>kangshifu/css/index.css" />
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery-3.2.0.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/jquery.fittext.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN ?>kangshifu/js/index.js"></script>
    <script type="text/javascript">
        document.addEventListener('plusready', function() {
            //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"

        });
    </script>
    <script>
        //yxhy2016
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?3ad2b20caaa89bc9c22e9c483d2b64c5";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>

<body>
<div id="preload">
    <div id="progressbar">
        <div id="progressbarwrap">
            <div id="progressbarbg" style="width: 100%;">
                <div class="progressbarperson"><img src="<?php echo STATIC_DOMAIN ?>kangshifu/img/loading_car.png" title="" alt=""></div>
            </div>
        </div>
        <div class="progressbarnum">100%</div>
        <span class="txt">已加载&nbsp;:</span>
    </div>
    <img class="logo_1" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/game_logo.png" title="" alt="" />
    <img class="logo_2" src="<?php echo STATIC_DOMAIN ?>kangshifu/img/contact_logo.png" title="" alt="" />
</div>
<script>
    // 预加载
    var loader = new resLoader({
        resources: [
            '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-bg.jpg', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-jiang1.png', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-jiang2.png',
            '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-jiang3.png', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-jiang4.png', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-jiang5.png',
            '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide2-jiang0.png', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide3-bg.jpg', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide3-pic.png',
            '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide3-txt1.png', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide3-txt2.png', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide3-txt3.png',
            '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide4-bg.jpg', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide5-bg.jpg', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide6-bg.jpg',
            '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide7-bg.jpg', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide8-bg.jpg', '<?php echo STATIC_DOMAIN ?>kangshifu/images/slide9-bg.jpg',
        ],
        onProgress: function(current, total) {
            var percent = current / total * 100;
            $('#progressbarbg').css('width', percent + '%');
            $('.progressbarnum').text(parseInt(percent) + '%');
        },
        onComplete: function(total) {
            //$("#preload").hide();
            var url = '<?php if($info){echo Url::to(['/game/handle/main']);}else{echo Url::to(['/game/handle/explain']);}?>';
	window.location.href=url;
        }
    });

    loader.start();
</script>

</body>

</html>
