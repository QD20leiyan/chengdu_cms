var loginurl='/newyear/login.html';//用户登录
var verify_url1 ='/common/get-login-verify.html';//验证码
var init_url='/newyear/get-user-info.html'//获取用户初始信息
var xnlq_gift='/newyear/get-newyear-gift.html';//领取新年礼包
var qdlq_gift='/newyear/get-sign-gift.html';//领取签到礼包
var zhuxiao_url='/newyear/logout.html';//注销
var srf=$('meta[name="csrf-token"]').attr('content');
var base = {
    isLogin: false,
    id: 0,
    date_time:'',
    lbsend: false
};
var is_focus=0;
//session数据
var userJsonStr = sessionStorage.getItem('user');
var userEntity = JSON.parse(userJsonStr);
//签到礼包成功弹窗
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/common/get-captcha.html?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
      $(".co_captcha").html(data.msg);
    }, 'json');
}
//图片验证码刷新
$(".co_captcha").click(function(){
    load_captcha();
    is_focus=2;
});
//图片验证码焦点获取显示验证码
$(".c_login input").focus(function(){
    is_focus++;
    console.log(is_focus);
    if(is_focus==1){
        load_captcha();
    }
});
//倒计时
//60s倒计时验证
var countdown = 60;
function sendemail() {
	var obj = $(".g_code");
	settime(obj);
};
function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val("(" + countdown + "s)");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
};
//查看礼包记录
function gift_send(){
	init();
    $(".tips").removeClass("active");
    $(".tips.check").addClass("active");
}
//初始用户信息
function init(){
	if(userEntity == "null" || userEntity == null || userEntity == "") {
    } else {
			if(userEntity.status == 0){
				console.log(userEntity);
                base.isLogin = true;
	            $('.rule_con .login_su span').text(userEntity.data.phone);
	            $('.rule_con').addClass("active");
	            base.date_time=userEntity.data.now;
	            $("#newyear_gift").html(userEntity.data.gift_newyear);
	            //礼包记录
	            var html = "";
                var html2 = "";
                var xd_name="";
	            if(userEntity.data.gift_newyear != ""){
                	html2 ='<li><span><i>官方春节普发礼包</i><br>黄金*20<br>钞票*20000<br>钢材*10<br>助溶剂*10</span><span id="tc1_copyText">' + userEntity.data.gift_newyear + '</span><a id="tc1_copyBtn" data-clipboard-action="copy" data-clipboard-target="#tc1_copyText" class="copy">[ 复制 ]</a></li>';
                	new Clipboard('#tc1_copyBtn');
                	if(userEntity.data.gift_sign != ""){
						for(var i in userEntity.data.gift_sign){
							 if(userEntity.data.gift_sign[i].gift_id == 498){
                                    xd_name="<i>第1天签到礼包</i><br>黄金*10<br>钞票*10000<br>合金材料*5<br>转向机组件*5";
                                }else if(userEntity.data.gift_sign[i].gift_id == 499){
                                    xd_name="<i>第2天签到礼包</i><br>载具2阶材料随机包*1<br>2阶武器材料随机包*1";
                                }else if(userEntity.data.gift_sign[i].gift_id == 500){
                                    xd_name="<i>第3天签到礼包</i><br>黄金宝箱*1<br>基础科研核心*1";
                                } 
                                else if(userEntity.data.gift_sign[i].gift_id == 501){
                                    xd_name="<i>第4天签到礼包</i><br>限时1天豹1*1<br>轻型装甲钢*1";
                                } 
                                else if(userEntity.data.gift_sign[i].gift_id == 502){
                                    xd_name="<i>第5天签到礼包</i><br>载具3阶材料随机包*1<br>3阶武器材料随机包*1";
                                } 
                                else if(userEntity.data.gift_sign[i].gift_id == 503){
                                    xd_name="<i>第6天签到礼包</i><br>银质纪念币*1<br>改良信号发射器*1";
                                } 
                                else if(userEntity.data.gift_sign[i].gift_id == 504){
                                    xd_name="<i>第7天签到礼包</i><br>高级金币宝箱*1<br>基础炸药图纸*1";
                                } 
                                else if(userEntity.data.gift_sign[i].gift_id == 505){
                                    xd_name="<i>第8天签到礼包</i><br>载具4阶材料随机包*1<br>4阶武器材料随机包*1";
                                } 
	                    	html += '<li><span>'+ xd_name +'</span><span id="tc47_copyText' + i +'">' + userEntity.data.gift_sign[i].code + '</span><span><a href="javascript:;" class="copy" id="tc47_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc47_copyText' + i + '" data-id="' + i + '">[ 复制 ]</a></span></li>';
                 		}
                    }else{
                    	html="";
                    }
                    $(".huadong ul").html(null).append(html2+html);
                            //初始化复制插件
                    $(".huadong ul li a").each(function(i,n) {
                        new Clipboard('#tc47_copyBtn' + $(n).attr("data-id"));
                    });
      	        	base.lbsend=true;
                }else{
                    base.lbsend=false;
                }

            }else{
            	console.log(userEntity.msg);
            }
            
            $(".part2 ul li").each(function(i, n) {
			if($(n).attr("data-id") == userEntity.data.now) {
				$(n).removeClass("active");
			} else if($(n).attr("data-id") < userEntity.data.now) {
				$(n).addClass("active");
			} else if($(n).attr("data-id") > userEntity.data.now){
				$(n).removeClass("active");
			}
		   });
	}	
}
//
$(function(){
	init();
	//查看规则
	$(".look_rule").click(function(){
		$(".tips").removeClass("active");
      	$(".tips.rule").addClass("active");
	});
	//登录获取验证码
	$(".g_code").click(function(){
	    var phone = $(".c_phone").val();
	    var t_yzm = $(".c_tyzm").val();
	    if(phone == "" || phone == undefined) {
	        alert("手机号不能为空");
	        return;
	    }
	    if(phone.length != 11) {
	        alert("手机号不正确");
	        return;
	    }
	    if(t_yzm == "" || t_yzm == undefined) {
	        alert("图形验证码不能为空");
	        return;
	    }
	    $.post(verify_url1,{"phone":phone,"captcha":t_yzm,"cms_csrf":srf},function(data){
	        if(data.status == 0){
	            sendemail();
	        }else{
	            alert(data.msg);
	            load_captcha();
	        }
	    },'json');
	});
	//登录请求
	$(".co_tips_btn1").click(function(){
	    var phone = $(".c_body .c_phone").val();
	    var t_yzm = $(".c_body .c_tyzm").val();
	    var co_codenum1 = $(".c_body .c_yzm").val();
	    if(phone == "" || phone == undefined) {
	        alert("手机号不能为空");
	        return;
	    }
	    if(phone.length != 11) {
	        alert("手机号不正确");
	        return;
	    }
	    if(co_codenum1 == "" || co_codenum1 == undefined) {
	        alert("短信验证码不能为空");
	        return;
	    }
	    $.ajax({
	        'url':loginurl,
	        'data':{"phone":phone,'yzm':co_codenum1,"cms_csrf":srf },
	        'type':'POST',
	        'dataType':'Json',
	        success:function(data){
	            if(data.status==0){
	            	base.isLogin = true;
	                $('.rule_con .login_su span').text(data.data.phone);
	                $('.rule_con').addClass("active");
	                alert("登陆成功~");
	                $(".tips").removeClass("active");
	                $("#newyear_gift").html(data.data.gift_newyear);
	                if(data.data.is_new == 1){
	                	if(data.data.gift_newyear != ""){
	                		$(".tips").removeClass("active");
	                	    $(".tips.xc_gift").addClass("active");
	                	    console.log(1);
	                	}else{
	                		$(".tips").removeClass("active");
	                		console.log(2);
	                	}
	                }else{
	                	$(".tips").removeClass("active");
	                }
	                sessionStorage.setItem('user', JSON.stringify(data));
                	var userJsonStr = sessionStorage.getItem('user');
                        userEntity = JSON.parse(userJsonStr);
                        init();
	            }else{
	                alert(data.msg);
	                load_captcha();
	            }
	        }
	    });
	});
   //领取春节好礼(补给箱)
    $(".bjlq_btn").click(function(){
      	if(base.isLogin){
      		init();
	        var code_new=$("#newyear_gift").html();
      		if(code_new !=""){
      			$(".tips").removeClass("active");
	            $(".tips.xc_gift").addClass("active");
      		}else{
      			alert("礼包码已经领取完了~");
      		}
      	}else{
      		$(".tips").removeClass("active");
      		$(".tips.login").addClass("active");
      	}
    })
    //领取春节好礼(页面)
    $(".ljlq_btn").click(function(){
      	if(base.isLogin){
      		init();
      		var code_new=$("#newyear_gift").html();
      		if(code_new !=""){
      			$(".tips").removeClass("active");
	            $(".tips.xc_gift").addClass("active");
      		}else{
      			alert("礼包码已经领取完了~");
      		}
      	}else{
      		$(".tips").removeClass("active");
      		$(".tips.login").addClass("active");
      	}
    })
    //查看礼包记录
    $(".lb_rend").click(function(){
    	init();
      	if(base.isLogin){
      		if(base.lbsend){
      			gift_send();
      		}else{
      			alert("暂无礼包记录~");
      		}
      	}else{
      		$(".tips").removeClass("active");
      		$(".tips.login").addClass("active");
      	}
    })
    //签到领取礼包
    $(".part2 ul li").click(function(){
      	if(base.isLogin){
	        var date=$(this).data("id");
	        $.ajax({
				'url': qdlq_gift,
				'data': {"date":date,"cms_csrf":srf},
				'type': 'POST',
				'dataType': 'Json',
				success: function(data) {
					if(data.status == 0){
	    		        $(".tips.qd_gift #qiandao_gift").text(data.data.code);
	    		        $(this).addClass("active");
	    		        $(".tips.qd_gift").addClass("active");
	    		        userEntity.data = data.data.user_data;
						sessionStorage.setItem('user', JSON.stringify(userEntity));
						console.log(data.data.user_data);
						isLogin();
        		    }else{
        		    	alert(data.msg);
        		    }
				},
				error: function() {
					alert("网络请求失败，请重新刷新页面");
				}
	        });
      	}else{
      		$(".tips").removeClass("active");
      		$(".tips.login").addClass("active");
      	}
    })
    //关闭弹窗
    $(".close,.rule .sure").click(function(){
		$(".tips").removeClass("active");
    });
    $(".close_rule").click(function(){
    	$('html,body').animate({
			scrollTop: 1080
		}, 500);
    })
    //登录弹窗
    $(".login_no span").click(function(){
    	$(".tips.login").addClass("active");
    });
    //点击注销
	$(".zhuxiao").click(function() {
		$.post(zhuxiao_url, {}, function(data) {
			if(data.status == 0) {
				sessionStorage.clear("user");
				alert('注销成功');
			    location.reload();
			} else {
				alert(data.msg);
				load_captcha();
			}
		}, "json")
    });
    //复制
    new Clipboard('#tc5_copyBtn');//新春礼包码
    new Clipboard('#tc4_copyBtn');//签到礼包码
    $(".tips").on("click",".copy",function() {
		alert("已复制~");
    });
});