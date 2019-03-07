$(".section3-feature-ul li a").hover(function() {
	$(this).parent("li").addClass("active").siblings().removeClass("active");
});
$(".close_btn").click(function (){
		$(".right_code").fadeOut();
	})
$(".s3_peo_head span").click(function() {
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".s3_name img").eq(index).show().siblings().hide();
	$(".s3_peo img").eq(index).show().siblings().hide();
})
$(".s_p_a").click(function() {
	//alert("功能暂未开放，敬请期待！");
})
$(".side_btn").text("点击收起");
$(".side_btn").click(function() {
	var text = $(this).text();
	if(text == '点击收起') {
		$(this).parent().animate({ left: '-202px' }, "50");
		$(this).text('游戏下载');
	} else {
		$(this).parent().animate({ left: '0' }, "50");
		$(this).text('点击收起');
	}
})
$(".list_top ul li").click(function() {
	var index = $(this).index(); //获取当前划过元素的index值
	$(this).addClass("on").siblings().removeClass("on"); //改变当前状态
	$(".l_inf").eq(index).css({ "display": "block" }).siblings(".l_inf").css({ "display": "none" }); //切换内容
})
//武将
//var iNow = 0,
//	oPre = $(".wj_pre"),
//	oNext = $(".wj_next"),
//	oPeolist = $(".peo_list"),
//	oUl = oPeolist.find("ul"),
//	oLi = oUl.find("li"),
//	numli = '8';
//oUl.css({ "width": oLi.length * (oLi.width() + 17) });
//
//function move() {
//	var wleft = -iNow * (numli * oLi.outerWidth(true)) + 'px';
//	oUl.animate({ "left": wleft }, 1000);
//}
//oNext.click(function() {
//	if(iNow < parseInt(oLi.length / 8) && iNow < parseInt(oLi.length / 8)) {
//		iNow++;
//		move();
//	} else {
//		iNow = parseInt(oLi.length / 8);
//	}
//})
//oPre.click(function() {
//	iNow--;
//	if(iNow == -1) {
//		iNow = 0;
//		return;
//	}
//	move();
//})
//$.ajax({
//	type: "GET",
//	//url:"json/txt.json",
//	url: "/json/txt.json",
//	dataType: "json",
//	success: function(data) {
//		function w_data(obj) {
//			var _wmain = $(".wj_wrap");
//			//name
//			_wmain.find(".wj_about .wj_name").attr("src", obj.name);
//			//about
//			_wmain.find(".wj_about .wj_txt").html(obj.about);
//			//wj_power
//			var tmp = '';
//			$.each(obj.type, function(k, v) {
//				tmp += '<li>';
//				tmp += '<i>' + v.tname + '</i>';
//				tmp += '<span><em style="width:' + v.twidth + '"></em></span>';
//				tmp += "</li>";
//			})
//			_wmain.find(".wj_power").html(tmp);
//			//skill
//			var ski = '<dt>技能</dt>';
//			$.each(obj.skill, function(k, v) {
//				ski += '<dd class="' + (k === 0 ? "on" : "") + '" >';
//				ski += '<img src="' + v.s_img + '" alt="img" />';
//				ski += '<i></i>';
//				ski += "</dd>";
//			})
//			//skill介绍
//			_wmain.find(".wj_skill").html(ski);
//			$(".wj_skill dd").mouseover(function() {
//				var index = $(this).index() - 1;
//				$(this).addClass("on").siblings().removeClass("on");
//				$(this).parent().next().show();
//				$(this).parent().next().find("p span").eq(0).html(obj.skill[index].sname);
//				$(this).parent().next().find("p span").eq(1).html(obj.skill[index].scon);
//			})
//			$(".wj_skill_txt").find("p span").eq(0).html(obj.skill[0].sname);
//			$(".wj_skill_txt").find("p span").eq(1).html(obj.skill[0].scon);
//			//image
//			_wmain.find(".wj_img .wj_image").attr("src", obj.image);
//		}
//		$(".peo_list ul li").click(function() {
//			var _this = $(this);
//			$(this).addClass("on").siblings().removeClass("on");
//			//渲染数据
//			cur_index = _this.index();
//			var json_data = data[0].list[cur_index];
//			w_data(json_data);
//		});
//		w_data(data[0].list[0]);
//	}
//})
//slider
$("#slider-banner-box").slide({ titCell: ".hd ul", mainCell: ".bd ul", autoPage: true, autoPlay: true, effect: "leftLoop" });
$("#tab-news-box").slide({});
//无缝滚动
var m6Item = $(".if-orders-item"),
	m6ItemNum = $(".if-orders-item").length,
	m6Demo1 = $(".if-orders-demo1"),
	m6Demo2 = $(".if-orders-demo2"),
	m6Inner = $(".if-orders-inner"),
	m6Box = $(".if-orders-box"),
	li_wid = $(".if-orders-item").width();
if(m6ItemNum > 5) {
	m6Demo1.append(m6Demo1.html());
	m6Demo1.width(m6ItemNum * (li_wid * 2));
	m6Inner.width(m6ItemNum * (li_wid * 2));
	var flag = 0;
	var time1 = null;
	var time2 = null;

	function automove() {
		if(flag == 0) {
			time1 = setInterval(function() {
				m6Box.scrollLeft(m6Box.scrollLeft() + 1);
				if(m6Box.scrollLeft() >= m6ItemNum * li_wid) {
					m6Box.scrollLeft(0);
				}
			}, 10)
		} else {
			time2 = setInterval(function() {
				m6Box.scrollLeft(m6Box.scrollLeft() - 1);
				if(m6Box.scrollLeft() <= 0) {
					m6Box.scrollLeft(m6ItemNum * li_wid);
				}
			}, 10)
		}
	}
	automove()
	$(".if-orders-prev").click(function() {
		flag = 1;
		clearInterval(time1);
		clearInterval(time2);
		automove();
	})
	$(".if-orders-next").click(function() {
		flag = 0;
		clearInterval(time1);
		clearInterval(time2);
		automove();
	})
	m6Box.mouseover(function() {
		clearInterval(time1);
		clearInterval(time2);
	})
	m6Box.mouseout(function() {
		clearInterval(time1);
		clearInterval(time2);
		automove();
	});
	
};