<a href="javascript:" class="close"></a>
<p class="f_p"><span>手机号：</span><input type="text" id="phone_<?php echo $csrf?>" placeholder="请输入手机号码" /></p>
<p class="s_p"><span>验证码：</span><input type="text" id="code_<?php echo $csrf?>" placeholder="验证码" />
<a href="javascript:" class="shut" id="get_code_<?php echo $csrf?>"></a>
<input type="hidden" value="0" id="type_<?php echo $csrf?>"/>
</p>
<a href="javascript:" class="btn" id="sign_<?php echo $csrf?>"></a>

<script>
    $().ready(function(){
        var mobileObj = $("#phone_<?php echo $csrf?>");

        var csrf_<?php echo $csrf?> = '<?php echo $csrf?>';
        
        var gift_id_<?php echo $csrf?> =<?php echo $this->giftId?>;
        $("#sign_<?php echo $csrf?>").click(function() {
            var code_<?php echo $csrf?> = $("#code_<?php echo $csrf?>").val();
            var mobile = mobileObj.val();
            if(checkMobile(mobileObj)) {
               if (!code_<?php echo $csrf?>) {
                    alert("请输入验证码！");
                    $("#code_<?php echo $csrf?>").focus();
                    return false;
                } else {
                    alert('恭喜您成功预约，我们会在测试的前一天以短信形式给您发送礼包码，敬请您来体验！');
                }
            }
        })

        /*获取手机验证码*/
        $('#get_code_<?php echo $csrf?>').click(function () {
            if (checkMobile(mobileObj)) {
                $.ajax({
                    type: "POST",
                    url: "<?php echo Yii::app()->createUrl('/gift/handle/getVerify')?>",
                    data: "phone=" +mobileObj.val() + "&csrf=" + csrf_<?php echo $csrf?>+'&type='+type_<?php echo $csrf?>,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 1) {
                            alert("验证码已发送到手机，请注意查收短信！");
                        } else if (data.status == 2) {
                            alert("不能重复提交短信！");
                        } else if (data.status == 3) {
                            alert("超过了发送短信次数！");
                        } else if (data.status == 4) {
                            alert("您的手机号已经注册过了！");
                        }else {
                            alert("短信发送失败,请重试！");
                        }
                        return true;
                    }
                })
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


