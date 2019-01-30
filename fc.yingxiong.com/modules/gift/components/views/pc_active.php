<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:09
 */ ?>
<div class="c_tack_con">
    <i class="c_clsoe"></i>
    <div class="c_tack_iphone">
        <i></i>
        <input id="phone_<?php echo $csrf?>" type="text">
    </div>
    <span id="gift_get_<?php echo $csrf?>" class="c_tack_btn"></span>
</div>
<script>
    $().ready(function(){
        var id = "gift_get_<?php echo $csrf?>";
        $("#"+id).click(function(){
            var csrf_<?php echo $csrf?> = '<?php echo $csrf?>';
            var phone_<?php echo $csrf?> = $('#phone_<?php echo $csrf?>').val();
            var gift_id_<?php echo $csrf?> =<?php echo $this->giftId?>;
            if(checkMobile($('#phone_<?php echo $csrf?>'))){
                $.ajax({
                    type: "POST",
                    url: "<?php echo Yii::app()->createUrl("gift/handle/getCode")?>",
                    data: 'csrf='+csrf_<?php echo $csrf?>+'&phone='+phone_<?php echo $csrf?>+'&gift_id='+gift_id_<?php echo $csrf?>+ "&template=<?php echo $template?>",
                    dataType:'json',
                    success: function(data){
                        /*
                         status 1:成功0:非法提交-1:手机号码有误-2:已经领取了-3:礼包码用完了
                         */
                        if(data.status==1){
//                            $(".note-Tooltip p").html('小主,礼包已发送至你的手机， 请查收。')
                            alert('小主,礼包已发送至你的手机， 请查收。');
                        }else if(data.status == -1){
//                            $(".note-Tooltip p").html('手机号不正确');
                            alert('手机号不正确');
                        }else if(data.status == -2){
//                            $(".note-Tooltip p").html('礼包码已领取过');
                            alert('礼包码已领取过');
                        }else if(data.status == -3){
//                            $(".note-Tooltip p").html('您来晚了,礼包已领完');
                            alert('您来晚了,礼包已领完');
                        }else if(data.status == -4){
//                            $(".note-Tooltip p").html('礼包类型不存在!');
                            alert('礼包类型不存在');
                        }else{
//                            $(".note-Tooltip p").html('非法提交!');
                            alert('非法提交');
                        }
//                        $(".note-mask").show();
                    }
                });
            }else{
                alert('手机号码输入错误，请重新输入');
            }

        })
    })
    function checkMobile(mobileObj){
        var mobile = mobileObj.val();
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
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
