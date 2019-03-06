$(function(){
    var order_url ='/common/yy.html ';
    var srf = $('meta[name="csrf-token"]').attr('content');
    //预约弹框
        $(".showtips").click(function(){
            $(".tips").removeClass("hidden");
        });
        $(".close").click(function(){
            $(".tips").addClass("hidden");
            $(".tel").val("");
            $(".error").hide();
        });
    //预约游戏
        $(".getcode").click(function(){
            var my_phone = $(".tel").val();
            if(my_phone == "" || my_phone == undefined) {
                $(".error").show().text("※ 请输入您的手机号码~");
                return;
            }else if(!/^1[345789]\d{9}$/.test(my_phone)){
                $(".error").show().text("※ 您输入的手机号格式不正确喔~");
                return;
            }else{
                $.post(order_url,{ "phone":my_phone,"cms_csrf":srf },function(data){
                    if(data.status == 0){
                        alert(data.msg);
                        $(".tips").addClass("hidden");
                        $(".tel").val("");
                    }else{
                        alert(data.msg);
                        $(".tips").addClass("hidden");
                        $(".tel").val("");
                    }
                }, 'json');
            }
        });
})