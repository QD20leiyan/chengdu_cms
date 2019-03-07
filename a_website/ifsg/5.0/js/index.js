$(function() {
	var curIndex = 0, //当前index
		imgLen = $(".imgList li").length; //图片总数
	// 定时器自动变换2.5秒每次
	var autoChange = setInterval(function() {
		if(curIndex < imgLen - 1) {
			curIndex++;
		} else {
			curIndex = 0;
		}
		//调用变换处理函数
		changeTo(curIndex);
	}, 5000);
	//左箭头滑入滑出事件处理
	$("#prev").hover(function() {
		//滑入清除定时器
		clearInterval(autoChange);
	}, function() {
		//滑出则重置定时器
		autoChangeAgain();
	});
	//左箭头点击处理
	$("#prev").click(function() {
		//根据curIndex进行上一个图片处理
		curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
		changeTo(curIndex);
	});
	//右箭头滑入滑出事件处理
	$("#next").hover(function() {
		//滑入清除定时器
		clearInterval(autoChange);
	}, function() {
		//滑出则重置定时器
		autoChangeAgain();
	});
	//右箭头点击处理
	$("#next").click(function() {
		curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
		changeTo(curIndex);
	});
	//对右下角按钮index进行事件绑定处理等
	$(".indexList").find("li").each(function(item) {
		$(this).click(function() {
			clearInterval(autoChange);
			changeTo(item);
			curIndex = item;
		});
	});
	//清除定时器时候的重置定时器--封装
	function autoChangeAgain() {
		autoChange = setInterval(function() {
			if(curIndex < imgLen - 1) {
				curIndex++;
			} else {
				curIndex = 0;
			}
			//调用变换处理函数
			changeTo(curIndex);
		}, 5000);
	}

	function changeTo(num) {
		var goLeft = num * 502;
		$(".imgList").animate({ left: "-" + goLeft + "px" }, 500);
		$(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
	}
	$(".links li").hover(function (){
		$(this).addClass('active');
	},function (){
		$(this).removeClass('active');
		$(".first").addClass("active");
	})
	
	$("#page02").click(function() {
		$(this).addClass("active");
		$("#page01").removeClass("active");
		$(".banner_pic_page1").stop().fadeOut("slow");
		$(".banner_pic_page2").stop().fadeIn("slow");
	})

	$("#page01").click(function() {
		$(this).addClass("active");
		$("#page02").removeClass("active");
		$(".banner_pic_page1").stop().fadeIn("slow");
		$(".banner_pic_page2").stop().fadeOut("slow");
	})

	$(".ico_wx").hover(function() {
		$(".ewm_wx").css("display", "block");
	}, function() {
		$(".ewm_wx").css("display", "none");
	})
	
	$("links li a").hover(function (){
		$(this).addClass("active").eq().removeClass("active");
	},function (){
		$(this).removeClass("active").eq().addClass("active");
	})
	$(".s_p_h1").click(function (){
		$(".p1").css("display" , "block");
		$(".p5").css("display" , "none");
		$(".p4").css("display" , "none");
		$(".p3").css("display" , "none");
		$(".p2").css("display" , "none");
	})
	$(".s_p_h2").click(function(){
		$(".p2").css("display" , "block");
		$(".p1").css("display" , "none");
		$(".p5").css("display" , "none");
		$(".p4").css("display" , "none");
		$(".p3").css("display" , "none");
	})
	$(".s_p_h3").click(function(){
		$(".p3").css("display" , "block");
		$(".p2").css("display" , "none");
		$(".p1").css("display" , "none");
		$(".p5").css("display" , "none");
		$(".p4").css("display" , "none");
	})
	$(".s_p_h4").click(function(){
		$(".p4").css("display" , "block");
		$(".p3").css("display" , "none");
		$(".p2").css("display" , "none");
		$(".p1").css("display" , "none");
		$(".p5").css("display" , "none");
	})
	$(".s_p_h5").click(function(){
		$(".p5").css("display" , "block");
		$(".p4").css("display" , "none");
		$(".p3").css("display" , "none");
		$(".p2").css("display" , "none");
		$(".p1").css("display" , "none");
	})
	
	$(".c1").hover(function(){
		$(".o1").css("display" , "block");
		$(".o5").css("display" , "none");
		$(".o4").css("display" , "none");
		$(".o3").css("display" , "none");
		$(".o2").css("display" , "none");
	})
	$(".c2").hover(function(){
		$(".o2").css("display" , "block");
		$(".o1").css("display" , "none");
		$(".o5").css("display" , "none");
		$(".o4").css("display" , "none");
		$(".o3").css("display" , "none");
	})
	$(".c3").hover(function(){
		$(".o3").css("display" , "block");
		$(".o2").css("display" , "none");
		$(".o1").css("display" , "none");
		$(".o5").css("display" , "none");
		$(".o4").css("display" , "none");
	})
	$(".c4").hover(function(){
		$(".o4").css("display" , "block");
		$(".o3").css("display" , "none");
		$(".o2").css("display" , "none");
		$(".o1").css("display" , "none");
		$(".o5").css("display" , "none");
	})
	$(".c5").hover(function(){
		$(".o5").css("display" , "block");
		$(".o4").css("display" , "none");
		$(".o3").css("display" , "none");
		$(".o2").css("display" , "none");
		$(".o1").css("display" , "none");
	});
	
	$("#price").click(function (){
		$(".price01").css("display" , "block");
	})
	
	$(".close").click(function (){
		$(".price01").css("display" , "none");
	})
	
	$(".mask").click(function (){
		$(".price01").css("display" , "none");
	})
	//关闭右侧二维码
	$(".close_btn").click(function (){
		$(".right_code").fadeOut();
	})
})