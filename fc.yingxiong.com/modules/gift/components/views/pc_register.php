<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:09
 */ ?>
<div class="reg_con">
    <h3>账号注册</h3>
    <p>
        <img src="<?php echo STATIC_DOMAIN ?>common/images/input_ico01.png" />
        <input type="text" value="请输入手机号码" id="phone_<?php echo $csrf?>" onfocus="if(this.value == '请输入手机号码') this.value = ''" onblur="if(this.value =='') this.value = '请输入手机号码'" />
    </p>
    <p>
        <img src="<?php echo STATIC_DOMAIN ?>common/images/input_ico02.png" />
        <input type="password"  id="password_<?php echo $csrf?>" value="请输入密码" onfocus="if(this.value == '请输入密码') this.value = ''" onblur="if(this.value =='') this.value = '请输入密码'" />
    </p>
    <div class="reg_pspecial">
        <p><img src="<?php echo STATIC_DOMAIN ?>common/images/input_ico03.png" />
            <input class="reg_text"  id="code_<?php echo $csrf?>" type="text" value="请输入验证码" onfocus="if(this.value == '请输入验证码') this.value = ''" onblur="if(this.value =='') this.value = '请输入验证码'" />
        </p><a  id="get_code_<?php echo $csrf?>" href="javascript:void(0)" title="发送验证码">发送验证码</a>
    </div>
    <div class="clear"></div>
    <a class="reg_btn" id="sign_<?php echo $csrf?>" href="javascript:void(0)" title="注册">注册</a>
</div>
<script>
    $().ready(function(){
        var mobileObj = $("#phone_<?php echo $csrf?>");

        var csrf_<?php echo $csrf?> = '<?php echo $csrf?>';
        var type_<?php echo $csrf?> = 0;
        var gift_id_<?php echo $csrf?> =<?php echo $this->giftId?>;
        $("#sign_<?php echo $csrf?>").click(function() {
            var code_<?php echo $csrf?> = $("#code_<?php echo $csrf?>").val();
            var mobile = mobileObj.val();
            var pswd = $("#password_<?php echo $csrf?>").val();
            if(checkMobile(mobileObj)) {
                if (!pswd) {
                    alert('请输入密码！');
                    $("#password_<?php echo $csrf?>").focus();
                    return false;
                } else if (parseInt(pswd.length) < 6 || parseInt(pswd.length) > 20) {
                    alert('密码长度为6-20位！');
                    $("#password_<?php echo $csrf?>").focus();
                    return false;
                } else if (!code_<?php echo $csrf?>) {
                    alert("请输入验证码！");
                    $("#code_<?php echo $csrf?>").focus();
                    return false;
                } else {
                    $.ajax({
                        type: "POST",
                        url: "<?php echo Yii::app()->createUrl('/gift/handle/register2')?>",
                        data: "phone=" + mobile + "&password=" + pswd + "&verifycode=" + code_<?php echo $csrf?>+'&gift_id='+gift_id_<?php echo $csrf?>+ "&csrf=" + csrf_<?php echo $csrf?>,
                        dataType: "json",
                        success: function (msg) {
                            if (msg.status == 1) {
                                var count = msg.count;
                                alert('恭喜您成为第' + count + '名英雄会员');
                            } else if (msg.status == 6) {
                                alert('该手机号已注册英雄会员');
                                //			alert('手机已经注册了');
                            }else if (msg.status == 3) {
                                alert('验证码失效');
                            } else if (msg.status == 5) {
                                alert('验证码有误');
                            }   else if (msg.status == 4) {
                                alert('手机格式有误');
                            }  else if (msg.status == 7) {
                                alert('限量资格已发完，已预约下次测试资格！');
                            } else if (msg.status == 9) {
                               alert('礼包领取失败');
                            } else if (msg.status == -1) {
                                alert(msg.msg);
                            } else {
                                alert('未知错误');
                            }
                        }
                    });
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
