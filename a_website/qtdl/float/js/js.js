$(function(){
    var oBtn = document.getElementById('getCode');
    var timer = null;
    var flag = 0;
    var t = 60;
	var telVal;
	var isSubmit = 0;
	var telReg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
		var codeReg = /^[0-9]*$/;
	$(".close").click(function(){
		closeWebview();//sdkRedirect('');
	})
	$("#getCode").click(function(){
		
		 telVal = $(".telInp").val();
		
		
		if(telVal == ''){
			tips("请输入有效的手机号码");
			return false;
		}else if(!telReg.test(telVal)){
			tips("请输入有效的手机号码");
			return false;
		}else if(telVal.length != 11 ){
			tips("请输入有效的手机号码");
			return false;
		}else if(isNaN(telVal)){
			tips("请输入正确的格式");
			return false;
		}else{
			// return true;
            if(flag == 0){
                flag = 1;
                clearInterval(timer);
                timer = setInterval(tick,1000);
                tick();
				csrf = $("input[name='_csrf']").val();
                //获取验证码
                $.ajax({
                    url:codeUrl,
                    type:"post",
                    async:false,
                    data:"phone="+$("input[name='phone']").val()+"&_csrf_float_before="+csrf,
                    dataType:"json",
                    success:function(data){

                        if(data.code == 0 ){
                            var msgtext = '短信发送成功！';
                        }else{
                            var msgtext = data.msg;
                        }
                        tips(data.msg);
                    }
                });
            }
		}
	})
	$('.js_button').click(function(){
		var codeVal = $(".codeInp").val();
		if(codeVal == ''){
			tips("请输入正确的验证码");
			return false;
		}else if(!codeReg.test(codeVal)){
			tips("请输入正确的验证码");
			return false;
		}else{
			if(!isSubmit){
				isSubmit =1;
				$.ajax({
					url:url,
					type:"POST",
					dataType:"json",
					data:{phone:telVal,code:codeVal,_csrf_float_before:$("input[name='_csrf']").val(),token:token,gameid:gameid},
					success:function(data){
						isSubmit=0;
						console.log(data)
						if(data.code == 0){
							console.log(2)
							tips(data.msg);
							$('.tipShadow').click(function(){
								$(".shadow").hide();
								$(".tipShadow").hide();
							});
						}else{	
							tips(data.msg);
							
						}
					},
					  error: function(e){   
					  	tips('服务器异常，稍后再试！');
						isSubmit=0;
					}
				})
			}
			return true;
		}
	})
	$('.tipShadow').click(function(eve){
		if(this == eve.target){
			$(".tipShadow").hide();
		}
	})
	function tips(msg){
			$(".tipShadow").show();
			$(".tipShadow").html(msg);
			setTimeout(function(){
				$(".tipShadow").hide();
			},2000);
		}
	function tick(){
    t--;
    oBtn.style.fontSize = "14px";
    oBtn.textContent =t+ '秒后重发';
    oBtn.style.cursor = "default";
    if(t<=0){
        oBtn.textContent ='获取验证码';
        oBtn.style.cursor = "pointer";
        clearInterval(timer);
        flag = 0;
        t = 60;
    }
	};
})
