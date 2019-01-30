<?php
?>
<a class="gift_btn rotateIn" href="javascript:void(0)">
    <img src="<?php echo STATIC_DOMAIN ?>2.0/m/images/gift.png" alt="礼包" />
</a>
<div class="tel_text">
    <input type="tel" name="text" placeholder="输入手机号领取礼包" id="phone_<?php echo $csrf?>" />
    <a class="go" href="javascript:void(0)" id="gift_get_<?php echo $csrf?>"></a>
    <div class="clear"></div>
</div>
<img class="ewm_gift" src="<?php echo STATIC_DOMAIN ?>2.0/m/images/ewm_gift.jpg" alt="礼包" />
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
                            alert('小主,礼包已发送至你的手机， 请查收。')
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

