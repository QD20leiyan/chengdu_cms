if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
    window.onload=function(){$(".loading").remove()}
}else{
	$(".mCScrollp").mCustomScrollbar({});
}
$(function(){
	$("#chlive-sec3-v1").val($(".chlive-sec3-1 dd.on").data("hdid"));
	$("#chlive-sec3-v2").val($(".chlive-sec3-2 dd.on").data("hdid"));
	$("#chlive-sec3-v3").val($(".chlive-sec3-3 dd.on").data("hdid"));
	$(".chlive-sec3-1 dd,.chlive-sec3-2 dd,.chlive-sec3-3 dd").each(function(){
		  $(this).click(function(){
			  var _hdid = $(this).data("hdid");
			  $(this).parent().find("input[type='hidden']").val(_hdid);
			  $(this).addClass("on").siblings().removeClass("on");
		  })
	});
	$("a.live-inter-btn").click(function(){
		var chlivev1 = $("#chlive-sec3-v1").val();
		var chlivev2 = $("#chlive-sec3-v2").val();
		var chlivev3 = $("#chlive-sec3-v3").val();
		//alert("你选择的是："+chlivev1+","+chlivev2+","+chlivev3);
		$.post(
			'/special/vote',
			{
				vote1:chlivev1,
				vote2:chlivev2,
				vote3:chlivev3
			},
			function(data){
				if(data == 1){
					//$(".chlive-sec3 dd span").addClass("on");//成功以后
					window.location.href='/special/chlive';
				}else{
					alert('投票失败');
					return false;
				}
			}
		);
		//投票成功以后显示，并且只能投一次
		//$("a.live-inter-btn").addClass("on")//成功以后
	});
	$(".chlive-present .bd").tab_switch()
	//登录
	$("a.danmu-login").click(function(){
		$("#mask").show();
		$(".chlive-suss-3").show();
	});
	$(".chlive-suss .cancel,.chlive-suss .reinput").click(function(){
		$(".chlive-suss").hide();
		$("#mask").hide();
	});
	$(".chlive-suss-1 a.signin").click(function(){
		$(".chlive-suss").hide();
		$(".chlive-suss-3").show();
	});
	//区服
	$(".chlive-suss-3 .serviceBox").click(function(){
		  $(".serviceList").show();
	});
	$(".serviceList dd").click(function(){
		var sId = $(this).data("sid");
		var sIdh = $(this).html();
		$(".serviceBox span").html(sIdh);
		$(".serviceBox span").attr("data-sid",sId);
		$(".serviceList").hide();
	})
	//登录提交
	$(".chlive-suss-3 a.signin").click(function(){
		var role_id = $("#role_id").val();
		var server_id = $(".serviceBox span").attr("data-sid");
		if(role_id == ''){
			 alert('请输入你的角色ID');
			 return false;
		}
		if(server_id == 0){
			 alert('请输入你的区服');
			 return false;
		}
	
		$.post(
			'/special/ch_login',
			{
				role_id:role_id,
				server_id:server_id
			},
			function(data){
				if(data == 1){
					$('#is_login').val(1);
					$("#mask").hide();
					$(".chlive-suss-3").hide();
					window.location.href = '/special/chlive';
				}else{
					alert('登录失败，请重新填写');
					return false;
				}
			}
		); 
	});
});
		
		
		//提交评论
		$("#danmu-test").removeAttr("disabled");$(".chlive-barrage").hover(function(){$(".userLogin").show()},function(){$(".userLogin").hide()});
		$("a.danmu-btn,.danmu-mo dd").click(function(){
		    if($("#is_login").val()==0){
			    $("#mask").show();
				$(".chlive-suss-1").show();
				return;
			}else{
			    if($(this).parent().data("inbtn")==1){
					$("#danmu-test").removeAttr("disabled");
				    var text = $("#danmu-test").val();
					if(text == ""){
						$(".chlive-suss-2 .s1").html("<p>太短了</p><p>弹幕不能为空哟!</p>");
						$("#mask").show();
						$(".chlive-suss-2").show();
						return;
					}else if(text.length>16){
						$(".chlive-suss-2 .s1").html("<p>太长了</p><p>弹幕字数不能超过16个字哟!</p>");
						$("#mask").show();
						$(".chlive-suss-2").show();
						return;
					}else{
						
					}
				}
			}
			$(".danmu-mo dl").hide();
		    var t = $("#danmu-test").val() || $(this).html();
			$.post(
				'/special/save_dm',
				{
					content:t
				},
				function(data){
					if(data == 0){
						alert('发送失败');
						return false;
					}else{
						return t && ($("#danmu-test").val("").blur(), e.addOne(t)),!1		
					}
				}
			);
		
        });
		var e = {
			_speed : 1e4,
			_count : $(".danmu-box .item").length,
			_items : $(".danmu-box .item"),
			_lastPos : 0,
			_posCount : 7,
			_typeCount : 6,
			_sendBuffer : [],
			_random : function (t) {
				return Math.floor(99999 * Math.random() % t)
			},
			_doAnimate : function (t, n) {
				return t.animate({
					left : "-100%"
				}, this._speed, "linear",n),
				this
			},
			_setPos : function (t) {
				for (var n; ; )
					if (n = this._random(this._posCount), Math.abs(n - this._lastPos) > 1)
						break;
				return this._lastPos = n,
				t.stop(!0, !0).css({
					top : 30 * n,
					left : "100%"
				}),
				this
			},
			_setStyle : function (t) {
				return t.attr("class", "item").addClass("type" + (this._random(this._typeCount) + 1)),
				this
			},
			_playItem : function (t) {
				return this._setPos(t)._setStyle(t)._doAnimate(t)
			},
			start : function () {
				var t = this;
				return this._curr = 0,
				setInterval(function () {
					t._curr >= t._count && (t._curr = 0, t._items = $(".danmu-box .item"), t._count = t._items.length),
					t._playItem(t._sendBuffer.length ? t._sendBuffer.pop() : t._items.eq(t._curr++))
				}, 2e3),
				this
			},
			addOne : function (t) {
				var n = $('<div class="item">' + t + "</div>");
				return n.insertBefore(this._items.eq(this._curr)),
				this._sendBuffer.push(n),
				this
			}
		};
		
		e.start();
		$(".danmu-close").click(function () {
		    if($(this).hasClass("on")){
			   $(".danmu-box").show(); 
			    $(this).removeClass("on")
			}else{
			   $(".danmu-box").hide();
			   $(this).addClass("on")
			}
			
		});
		//快捷弹幕
		$(".danmu-mo").hover(function(){
		     $(".danmu-mo dl").show();
		},function(){
		     $(".danmu-mo dl").hide();
		});
		
        //tab切换
		$.fn.tab_switch=function(){
		    var $this = $(this);
			return this.each(function(){ //tab导航元素
				$(this).find("a").click(function(){
					var index=$(this).index();//获取当前划过元素的index值
					$(this).addClass("on").siblings().removeClass("on");//改变当前状态
					$this.next().find(".infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
				})
			})
		}