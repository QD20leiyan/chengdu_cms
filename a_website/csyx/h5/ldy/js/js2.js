$(function(){
	// var srf = $('meta[name="csrf-token"]').attr('content');
		$(".login_next").click(function(){
			var my_phone = $(".tel").val();
            if(my_phone == "" || my_phone == undefined) {
                $(".co_error").show().text("※ 请输入您的手机号码~");
                return;
            }else if(!/^1[345789]\d{9}$/.test(my_phone)){
                $(".co_error").show().text("※ 您输入的手机号格式不正确喔~");
                return;
            }else{
                $(".co_error").hide();
                $.get('/h5/csyx/ajax-tank.html',{ "phone":my_phone,"type":2},function(data){
                    if(data.status == 0){
                        alert(data.msg);
                        $(".login_board").hide();
                        $(".tel").val("");
                    }else{
                        alert(data.msg);
                        $(".login_board").hide();
                        $(".tel").val("");
                    }
                }, 'json');
            }
    });
})