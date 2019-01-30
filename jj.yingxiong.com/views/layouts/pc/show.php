<?php

use yii\helpers\Url;
use common\Cms;

?>
<div class="b1">
    <span class="b2 b3"></span>
</div>

<?php echo $this->render('@app/views/layouts/pc/header_kefu.php');?>

<!--<video src="--><?php //echo STATIC_DOMAIN; ?><!--mp3/maintheme1.mp3" controls="ControlPanel" autoplay loop>-->
    <!--    您的浏览器不支持 video 标签。-->
    <!--</video>-->
    <!--            <embed src="mp3/maintheme2.mp3" hidden="false" autostart="true" loop="true"> -->
        <div class="slogan clearfix">
            <div class="nav">
                <ul class="clearfix">
                    <li><a target="_blank" href="<?php echo Url::to(['site/index']); ?>"></a></li>
                    <li><a target="_blank" href="<?php echo Cms::getUrl('article/list', ['cid' => 31]);?>"></a></li>
                    <li><a target="_blank" href="javascript:alert('敬请期待！')"></a></li>
                    <li><a target="_blank" href="<?php echo Cms::getUrl('image/list', ['cat_dir' => 'image', 'id' => 103])?>"></a></li>
                </ul>
            </div>

            <img src="<?php echo STATIC_DOMAIN ?>1.0/images/logo.png" class="logo"/>
            <div class="i-video i-v js_video_play" data-url="http://video.yingxiong.com/hd/55388ea0edfe4b23aeb1e14005d7939d.mp4">
                <i class="i-v-img"></i>
                <i class="i-v-img1"></i>
            </div>
        </div>
        <div class="cont">
            <div class="btn index">

                <i><b></b><img class="js_jump_img" src="<?php echo STATIC_DOMAIN ?>1.0/images/jump_mlz_pcgw.png" /></i>
                <i>
                    <a target="_blank" class="js_down_ios" href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/iphone.png" /></a>
                    <a target="_blank" class="js_down_andriod" href="http://cdn.yingxiong.com/mlz/mlz-pcgw-P32888A-0524.apk"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/android.png" /></a>
                    <a target="_blank" href="http://l.taptap.com/8v5o3IDV"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/j_tap.png" /></a>
                </i>
                <i><a target="_blank" href="javascript:;"><img class="pack-img" src="<?php echo STATIC_DOMAIN ?>1.0/images/package.png" /></a></i>
                <i><a target="_blank" href="http://weibo.com/6261950549"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/img11.png" /></a></i>
                <i>
                    <a target="_blank" href="javascript:;"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/img22.png" />
                        <span class="erweima"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/erweima1.png" /></span>
                    </a>
                </i>
                <i><a target="_blank" target="_blank" href="https://tieba.baidu.com/f?kw=%E4%B9%9D%E5%89%91%E9%AD%94%E9%BE%99%E4%BC%A0&fr=wwwt"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/img33.png" /></a></i>
            </div>
        </div>

        <div class="package">
            <a href="javascript:"><img src="<?php echo STATIC_DOMAIN ?>1.0/images/close.png" class="close"></a>
            <form class="form">
                <p>《九剑魔龙传》共赴仙途新手礼包</p>
                <input type="tel" id="name" name="" placeholder="输入手机号">
                <input type="tel" id="verify" name="" placeholder="验证码"><input type="button" name="" class="yzm send_verify" id="verify" value="发送">
                <button class="yuyue get_gift" type="button">立即领取</button>
            </form>
            <ul class="pack-rig">
                <p>礼包使用说明</p>
                <li><i>1</i>点主界面左上角，角色头像</li>
                <li><i>2</i>进入角色信息，兑换奖励 </li>
                <li><i>3</i>输入兑换码</li>
                <li><i>4</i>点击“兑换”即可</li>
            </ul>
        </div>
        <div class="tips tips2">
            <div class="tips-box get_sms">
                <p>验证码已发送到手机请注意查收短信</p>
                <span class="ture">确&nbsp;定</span>
            </div>
            <div class="tips-box tips-box-1 ti">
                <p><font id="gift_title">您的礼包码是：</font><b><input type="text" name="" value="JODF443REFER34" id="code"></b></p>
                <span class="copy">复&nbsp;制</span>
                <span class="ture">确&nbsp;定</span>
            </div>
        </div>

        <script>
            $(function(){
                $('.send_verify').click(sendVerify);
                $('.get_gift').click(getGift);
            })

            function sendVerify()
            {
                var phone = $('#name').val();
                if(!phone.match(/^1[345789]\d{9}$/)){
                    alert("请输入正确的手机号！");
                    return false;
                }
                $.get('<?php echo Url::to(['/site/get-verify'])?>',{ "phone":phone},function(data){
                    if (data.status == 0) {
                        $('.tips-box').hide();
                        $('.get_sms').show();
                        $(".tips").show();
                        settime($('.send_verify'));
                    }else if (data.status == 1) {
                        $('#gift_title').text('您已经领取礼包码：');
                        $('#code').val(data.msg);
                        $("#mask,.package").hide();
                        $('.tips-box').hide();
                        $('.ti').show();
                        $(".tips").show();

                    } else {
                        alert(data.msg);
                    }
                }, 'json')
            }

            function getGift()
            {
                var phone = $('#name').val();
                var verify = $('#verify').val();
                if(!phone.match(/^1[345789]\d{9}$/)){
                    alert("请输入正确的手机号！");
                    return false;
                }
                if(verify ==" " && isNaN(verify)){
                    alert("请输入正确的验证码");
                    return false;
                }

                $.get('<?php echo Url::to(['/site/get-gift'])?>',{ "phone":phone, verify:verify},function(data){
                    if (data.status != 0) {
                        alert(data.msg);
                    }else{
                        $('#code').val(data.msg);
                        $("#mask,.package").hide();
                        $(".tips").show();
                        $('.tips-box').hide();
                        $('.ti').show();

                    }
                }, 'json')
            }
        </script>
