<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:09
 */ ?>
<div class="mask"></div>
<div class="gift_iframe">
    <h1>领取礼包</h1>
    <input type="tel" placeholder="输入手机号领取礼包" class="mobile"  id="phone_<?php echo $csrf?>"/>
    <a href="javascript:void(0)" id="gift_get_<?php echo $csrf?>" class="lq_btn">点击领取</a>
    <span class="close_gift"><img src="<?php echo STATIC_DOMAIN; ?>/images/wap/gift_close.png"></span>
</div>
<script>
    $().ready(function(){
        var id = "gift_get_<?php echo $csrf?>";
        $("#"+id).click(function(){
            var csrf_<?php echo $csrf?> = '<?php echo $csrf?>';
            var phone_<?php echo $csrf?> = $('#phone_<?php echo $csrf?>').val();
            var type_<?php echo $csrf?> = 0;
            var gift_id_<?php echo $csrf?> =<?php echo $this->giftId?>;
            if(checkMobile($('#phone_<?php echo $csrf?>'))){
                $.ajax({
                    type: "POST",
                    url: "<?php echo Yii::app()->createUrl("gift/handle/getCode")?>",
                    data: 'csrf='+csrf_<?php echo $csrf?>+'&phone='+phone_<?php echo $csrf?>+'&type='+type_<?php echo $csrf?>+'&gift_id='+gift_id_<?php echo $csrf?>,
                    dataType:'json',
                    success: function(data){
                        /*
                        status 1:成功0:非法提交-1:手机号码有误-2:已经领取了-3:礼包码用完了
                         */
                        if(data.status==1){
                            alert('发送成功，请查收短信');
                        }else if(data.status == -1){
                            alert('手机号不正确');
                        }else if(data.status == -2){
                            alert('礼包码已领取过');
                        }else if(data.status == -3){
                            alert('您来晚了,礼包已领完');
                        }else{
                            alert('未知错误!');
                        }
                    }
                });
            }else{

            }

        })
    })
    function checkMobile(mobileObj){
        var mobile = mobileObj.val();
        var myreg = /^(1[3|4|5|8][0-9]+\d{8})$/;
        if (mobile.length == 0) {
            alert('请输入手机号码！');
            mobileObj.focus();
            return false;
        } else if (mobile.length != 11) {
            alert('请输入有效的手机号码！');
            mobileObj.focus();
            return false;
        } else if (!myreg.test(mobile)) {
            alert('请输入有效的手机号码！');
            mobileObj.focus();
            return false;
        }
        return true;
    }
</script>