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
        <input id="phone" type="text">
    </div>
    <span id="sub" class="c_tack_btn"></span>
</div>
<script>
    $().ready(function(){
        $("#sub").click(function(){
            var phone = $('#phone').val();
            if(checkMobile(phone)){
                $.ajax({
                    type: "POST",
                    url: "<?php echo Yii::app()->createUrl("gift/handle/savePhone")?>",
                    data: 'phone='+phone,
                    dataType:'json',
                    success: function(data){
                        if(data.status==1){
                            alert('预约成功');
                        }else if(data.status == 0){
                            alert('预约失败');
                        }else if(data.status == -2){
                            alert('手机号码错误');
                        }else{
                            alert('未知错误');
                        }
                    }
                });
            }else{
                alert('手机号码输入错误，请重新输入');
            }

        })
    })
    function checkMobile(phone){
        var phone = phone;
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
        if (phone.length == 0) {
            alert('请输入手机号码！');
            return false;
        } else if (phone.length != 11) {
            alert('请输入有效的手机号码！');
            return false;
        } else if (!myreg.test(phone)) {
            alert('请输入有效的手机号码！');
            return false;
        }
        return true;
    }
</script>
