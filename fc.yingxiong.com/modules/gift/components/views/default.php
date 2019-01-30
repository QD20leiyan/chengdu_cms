<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:09
 */ ?>
<div class="index_gift">
    <input type="text" placeholder="请输入手机号" class="index_text" id="phone_<?php echo $csrf?>">
    <select id="type_<?php echo $csrf?>">
        <option value="<?php echo GiftCodeModel::CODE_TYPE_LEGAL?>">正版</option>
        <option value="<?php echo GiftCodeModel::CODE_TYPE_UNLEGAL?>">混版</option>
    </select>
    <a class="lingqu_btn" href="javascript:void(0)" id="gift_get_<?php echo $csrf?>">领取</a>
</div>
<script>
    $().ready(function(){
        var id = "gift_get_<?php echo $csrf?>";
        $("#"+id).click(function(){
            var csrf_<?php echo $csrf?> = '<?php echo $csrf?>';
            var phone_<?php echo $csrf?> = $('#phone_<?php echo $csrf?>').val();
            var type_<?php echo $csrf?> = $('#type_<?php echo $csrf?>')?$('#type_<?php echo $csrf?>').val():'';
            var gift_id_<?php echo $csrf?> =<?php echo $this->giftId?>;
            if(phone_<?php echo $csrf?>){
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
                        }else{
                            alert('你已经领取了');
                        }
                    }
                });
            }

        })
    })
</script>