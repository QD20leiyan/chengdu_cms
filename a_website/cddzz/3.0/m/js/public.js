var countdown=60; 
function sendemail(){
    var obj = $(".yzm");
    settime(obj);
    
    }
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) { 
        obj.attr('disabled',false); 
        obj.css('background','#ffba00'); 
        //obj.removeattr("disabled"); 
        obj.val("获取验证码");
        countdown = 60;
        return;
    } else { 
        obj.attr('disabled',true); 
        obj.css('background','#666666');
        obj.val( countdown + "s");
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
}
$(".ios").click(function(){
	$(".mask").show();
})
$(".close").click(function(){
	$(".mask").hide();
});
function yanzheng(){
    var tell = parseInt($(".tell").val());
    var yzm = $(".yzm").val();
      var type = $(".game-btn p img").attr('data-type');
      var page = 1;
    if(!/^1[34578]\d{9}$/.test(tell)){
        alert("请输入正确的手机号");
        return false;        
    }
    if(yzm ==" " && isNaN(yzm)){
         alert("请输入正确的验证码");
        return false;
    }
}