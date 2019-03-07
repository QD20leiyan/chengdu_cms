$(function(){
	$(".tab_box .tab_til ul li").click(function(){
    var index=$(this).index();
    $(".infor").eq(index).find("ul li").length > 0 ? ($(this).addClass("active").siblings().removeClass("active"),$(".infor").eq(index).show().siblings(".infor").hide()) : "";;
  })
	$(".m_giftbtn").click(function(){
		//$(".gift_tck").show();
		//$(".mask").show();
		alert("敬请期待!");
	})
	$(".gift_tck .close").click(function(){
		$(".gift_tck").hide();
		$(".mask").hide();
	})
})


/*--------------------------------------------------手机绑定页面----------------------------------------------------*/

$(function () {
	$('.binding-mask').click(function () {
		$('.binding-mask').css('display','none');
		$('.binding-tips1').css('display','none');
		$('.binding-tips2').css('display','none');
		$('.binding-tips3').css('display','none');
		$('.binding-tips4').css('display','none');
		$('.binding-tips5').css('display','none');
		$('.binding-tips6').css('display','none');
		$('.binding-tips7').css('display','none');
		$('.binding-tips8').css('display','none');
		$('.binding-tips9').css('display','none');
		$('.binding-tips10').css('display','none');
		$('.binding-tips11').css('display','none');
		$('.binding-tips12').css('display','none');
		$('.binding-tips13').css('display','none');
		$('.binding-tips14').css('display','none');
		$('.binding-tips15').css('display','none');

	})

	//版本、区服选择
	$('.binding-ios').click(function () {
		$('.binding-mask').css('display','block');
		$('.binding-tips4').css('display','none');
		$('.binding-tips5').css('display','block');
	})
	$('.binding-else').click(function () {
		$('.binding-mask').css('display','block');
		$('.binding-tips4').css('display','none');
		$('.binding-tips6').css('display','block');
	})

	$('.binding-tips4 span').click(function() {
		$('.binding-tips4').css('display','none');
		$('.binding-mask').css('display','block');
		$('#version').val($(this).html());
	})

	$('.binding-tips5 span').click(function() {
		$('.binding-tips5').css('display','none');
		$('.binding-mask').css('display','none');
		$('#server').val($(this).html());
		var serverIos = $(this).attr("id");
		$('#server').attr("data-id",serverIos);

	})

	$('.binding-tips6 span').click(function() {
		$('.binding-tips6').css('display','none');
		$('.binding-mask').css('display','none');
		$('#server').val($(this).html());
		var serverid = $(this).attr("id");
		$('#server').attr("data-id",serverid);
	})

	$('#select1').click(function () {
		$('.binding-tips4').css('display','block');
		$('.binding-mask').css('display','block');
	})

	$('.m_binding_close').click(function () {
		$('.binding-tips6').css('display','none');
		$('.binding-mask').css('display','none')
	})

	$('#select2').click(function () {
		var version = $('#version').val();
		if(version !== "" && version == "ios正版") {
			$('.binding-tips5').css('display','block');
			$('.binding-mask').css('display','block');
		}
		if(version !== "" && version == "其他版本") {
			$('.binding-tips6').css('display','block');
			$('.binding-mask').css('display','block');
		}
		if(version == "" || version == null){
			$('.binding-tips2').css('display','block');
			$('.binding-mask').css('display','block');
		}
	})

	
})

//发送验证码倒计时
	var wait=300;
	function time(o) {
			if (wait == 0) {
				$('.get-code').css("display","block");	
				$('.get-again').css("display","none");		
				wait = 300;
			} else {
				$('.get-code').css("display","none");	
				$('.get-again').css("display","block");				
				$(".get-again").html("重新发送(" + wait + ")" );
				wait--;
				setTimeout(function() {
					time(o)
				},
				1000)
			}
		}

//第一页
$('.binding-btn').click(function () {
	//location.href = '/wxband/wxbandform.html';
	$.ajax({
	    url: '/wxband/wxband.html',
	    type: 'get',
	    dataType: 'json',
	    success : function(data){
				if(data['code']==1){
					//跳转到 'wxBand/wxBandForm'
					location.href = '/wxband/wxbandform.html';
				}
				else if(data['code']==2){
					$('#cdkey').html(data.cdkey);
					
						$('.binding-mask1').css('display','block');
						$('.binding-cover1').css('display','block');
					
					//礼包码为data['cdkey']
				}
	    },
	    error: function(){
			console.log(data);
	    }
	});
})
//第二页
//获取短信：
$('.get-code').click(function() {
	var phone = $('#phone').val();
	var telRe = /^1[3|4|5|7|8]\d{9}$/;
	var gameid = $('#id').val();
	var severs = $('#server').val();
	if(gameid == "" || gameid == null) {
		$('.binding-mask').css('display','block');
		$('.binding-tips13').css('display','block');
		return false;
	}
	if(severs == "" || severs == null) {
		$('.binding-mask').css('display','block');
		$('.binding-tips14').css('display','block');
		return false;
	}
	if(!(telRe.test(phone)) || phone == "") {
		//手机号格式不正确
		$('.binding-mask').css('display','block');
		$('.binding-tips3').css('display','block');
		return false;
	} else {
		$.ajax({
		    url:'/wxband/getverify.html',
		    type:'POST',
		    //phone
		    data:{"phone":phone},
		    dataType: 'json',
		    success : function(data){
					if(data['code']==1){
						//短信发送成功
						time(this);
						console.log('success');
					}
					else if(data['code']==2){
						//距上次提交未超过300秒
						$('.binding-tips12').css('display','block');
						$('.binding-mask').css('display','block');
					}
					else if(data['code']==3){
						//今天的提交此时已达上限
						$('.binding-tips8').css('display','block');
						$('.binding-mask').css('display','block');
					}
					else if(data['code']==4){
						//手机号格式不正确
						$('.binding-mask').css('display','block');
						$('.binding-tips3').css('display','block');
					}
					else if(data['code']==5){
						//手机号已经被绑定过了
						$('.binding-mask').css('display','block');
						$('.binding-tips10').css('display','block');
					}
		    },
		    error: function(){
				console.log('222');
		    }
		});
	}
		

})
//提交：
$('.binding-sub').click(function () {
	var data = {
			"gameid" : $('#id').val(),
			"area" : $('#server').attr('data-id'),
			"phone" : $('#phone').val(),
			"code" : $('#code').val()
			};
	var phone = $('#phone').val();
	var telRe = /^1[3|4|5|7|8]\d{9}$/;
	var gameid = $('#id').val();
	var severs = $('#server').val();
	if(gameid == "" || gameid == null) {
		$('.binding-mask').css('display','block');
		$('.binding-tips13').css('display','block');
		return false;
	}
	if(severs == "" || severs == null) {
		$('.binding-mask').css('display','block');
		$('.binding-tips14').css('display','block');
		return false;
	}
	if(!(telRe.test(phone)) || phone == "") {
		//手机号格式不正确
		$('.binding-mask').css('display','block');
		$('.binding-tips3').css('display','block');
		return false;
	} else {
		$.ajax({	
		    url: '/wxband/wxbandform.html',
		    type: 'post',
		    data: data,    //需要提交的数据 gameid游戏角色id area区服 phone手机号 code验证码 版本不用传 
		    dataType: 'json',
		    success : function(data){
					if(data['code']==1){
						//表单验证				
						//绑定成功返回cdkey
						$('#cdkey1').html(data.cdkey);
						$('.binding-mask2').css('display','block');
						$('.binding-cover1').css('display','block');
					}
					else if(data['code']==2){
						//绑定失败
						//验证码超过半小时过期
						$('.binding-tips15').css('display','block');
						$('.binding-mask').css('display','block');
					}
					else if(data['code']==3){
						//绑定失败
						$('.binding-tips7').css('display','block');
						$('.binding-mask').css('display','block');
					}
					else if(data['code']==4){
						//绑定失败
						//手机号格式不正确
						$('.binding-mask').css('display','block');
						$('.binding-tips3').css('display','block');
					}
					else if(data['code']==5){
						// 绑定失败
						// 角色与区服不匹配
						$('.binding-mask').css('display','block');
						$('.binding-tips9').css('display','block');
					}
					else if(data['code']==6){
						//绑定失败
						//该游戏账号已经被其他微信账号绑定
						$('.binding-mask').css('display','block');
						$('.binding-tips11').css('display','block');

					}
		    },
		    error: function(){
				console.log(data);
		    }
		});
	}

})
	
$('.binding-mask2').click(function () {
	location.href = 'http://game.yingxiong.com/wxband/wxband.html';
})
	
