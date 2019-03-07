$(function(){
	$(".topSlide span").mouseover(function(){
		$(".topSlidebox").show();
	});
	$(".topSlide").mouseleave(function(){
		$(".topSlidebox").hide();
	});

	$(".head-slider").slider({interTime:5000,delayTime:5000});
	$(".h-year-tab").tab_switch();
	$(".h-honor-tab").tab_sajax();
	$(".h-contact-tab").tab_switch();
	$(".h-teams-list").tab_spic();
	$(".h-devels-tab").kaTab();
	$(".h-welfare-tab").joi_slider();


	function resultImg(_num){
		var resulturl1=[];
		var resulturl = $(".h-photos-tab .slideBox").eq(_num).find(".sliderBoxImg img");
		$(".h-photos-tab .slideBox").eq(_num).find(".sliderBoxImg img").each(function(){
			resulturl1.push($(this).attr("src"));
		});
		var sBHtml = '<div class="sliderBoxImgs"><ul class="bd">';
		for(var i in resulturl1){
			sBHtml += '<li><img src="'+resulturl1[i]+'" alt=""></li>';
		}
		sBHtml+='</ul><div class="hdhd"><i class="botBtn-1"></i><ul class="hd"></ul><i class="botBtn-2"></i></div></div>';
		$(".h-photos-tab .slideBox").eq(_num).append(sBHtml);
		$($(".h-photos-tab .slideBox").eq(_num)).slide( { mainCell:"ul.bd",titCell:".hdhd ul", effect:"leftLoop",autoPlay:true,autoPage:true,startFun:function(i,c,s){var aa = c*29+38;s.find(".hdhd").width(aa);}});
		var mLeft = $(".h-photos-tab .slideBox").eq(_num).find(".hdhd").width()/2;
		$(".h-photos-tab .slideBox").eq(_num).find(".hdhd").css("margin-left","-"+mLeft+"px");
	}

	$(".h-photos-tab .parBd span").click(function(){
		var sBHtmlnum = $(this).index();
		$(".h-photos-tab .slideBox").eq(sBHtmlnum).find(".sliderBoxImgs").remove().end().siblings().find(".sliderBoxImgs").remove();
		resultImg(sBHtmlnum);
		$(this).addClass("on").siblings().removeClass("on");
		$(".h-photos-tab .slideBox").eq(sBHtmlnum).css("z-index","2");
	});
	$(".h-photos-tab .parBd span").eq(0).trigger('click');
	//resultImg(0);

	$url = window.location.href;
	var $uarr = $url.split("#");
	if($("html").find("."+$uarr[1]+"").length){
		$("html, body").animate({ scrollTop: $("."+$uarr[1]).offset().top-120+"px" });
	}



	var _NavAy = [];
	$(".menuNav.on a[data-scroll-nav]").each(function(e,i){
		var s=$(i),
		r=s.attr("data-scroll-nav");
		a=$("[data-scroll-index="+r+"]"),
		c=a.offset().top,
		l=c+a.outerHeight();
		_NavAy.push({s:r,t:c,b:l,i:s,el:a}),
		s.on("click",function(e){
			var $n = $(e.target).attr("data-scroll-nav"),
			$a=$("[data-scroll-index="+$n+"]"),
			$c=$a.offset().top-100;
			n = $(window).scrollTop();
			$("html,body").stop().animate({ scrollTop:$c+"px" },300);
			$(e.target).addClass("active").siblings().removeClass("active");
		})
	});

	$(window).on("scroll",function(){
		e=$(window).scrollTop()-100;
		h=$(window).height();
		for(var i in _NavAy){
			var a=parseInt(i);
			if((_NavAy[a].t-h/2)<e){
				var ab = a;
			}
		}
		$("html,body").is(":animated")?"":$("[data-scroll-nav='"+ab+"']").addClass("active").siblings().removeClass("active");
	}).scroll();
	// 验证用户名
	function isChinaName(name) {
		var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		return pattern.test(name);
	}
	// 验证密码
	function checkpwd(pwd){
		var pattern= /^[a-zA-Z0-9_]*$/;
		return pattern.test(pwd);
	}
	 // 验证身份证
	 function isCardNo(card) {
	 	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	 	return pattern.test(card);
	 }
	 // 验证函数
	 function formValidate() {
		 // 判断用户名
		 var u_name=$.trim($('.username').val());
		 if(u_name.length == 0) {
		 	alert("用户名不能为空");
		 	$('.username').focus();
		 	return false;
		 } else  {
		 	if(isChinaName(u_name) == false) {
		 		alert("请输入用户名,长度为6-47个字符,包含数字、字母");
		 		$('.username').focus();
		 		return false;
		 	}else if(u_name.length < 6 || u_name.length > 47){
		 		alert("请输入用户名,长度为6-47个字符,包含数字、字母");
		 		$('.username').focus();
		 		return false;
		 	}
		 }
		//验证密码
		 var pwd=$.trim($('.password').val());//去除空格
		 var pwd_again=$.trim($('.repwd').val());
		 if(pwd.length == 0) {
		 	alert("密码不能为空");
		 	$('.password').focus();
		 	return false;
		 }
		 if(pwd.length<6 || pwd.length>17){
		 	alert("密码由数字、字母或下划线组成，长度为6-16");
		 	$('.password').focus();
		 	return false;
		 }
		 if(!checkpwd(pwd)){
		 	alert("密码格式不对");
		 	$('.password').focus();
		 	return false;
		 }
		 if(pwd==u_name){
		 	alert("密码不能和账号名相同");
		 	$('.password').focus();
		 	return false;
		 }
		 if(pwd!=pwd_again){
		 	alert("两次密码不一致");
		 	$('.repwd').focus();
		 	return false;
		 }
		// 验证身份证
		var cred=$.trim($('.credit').val());
		if(cred.length == 0) {
			alert("身份证号码不能为空");
			$('.credit').focus();
			return false;
		} else {
			if(isCardNo(cred) == false) {
				alert("身份证号不正确");
				$('.credit').focus();
				return false;
			}
		}
		 //验证年龄是否大于18岁
		 var myDate = new Date();
		 var month = myDate.getMonth() + 1;
		 var day = myDate.getDate();
		 var age = myDate.getFullYear() - cred.substring(6, 10) - 1;
		 if (cred.substring(10, 12) < month || cred.substring(10, 12) == month && cred.substring(12, 14) <= day) {
		 	age++;
		 	if(age<18){
		 		alert("亲，您还未满18岁呦！")
		 	}
		 }
		}
		$(".reg_form .reg_btn").click(function(){
			formValidate();
		})


	 // 2017.9.29改版模块js
	 $(".leader_show > div").hover(function(){
	 	$(".leader_show > div").removeClass("show");
	 	$(this).addClass("show");
	 });
	 $(".l_b_nav li p").click(function(){
	 	var index = $(this).attr("n-index");
	    $(".l_b_nav li p").removeClass("active");
	    $(this).addClass("active");
	    $(".l_b_content li").removeClass("active");
	    $(".l_b_content li").eq(index).addClass("active");	  
	 });
	});
