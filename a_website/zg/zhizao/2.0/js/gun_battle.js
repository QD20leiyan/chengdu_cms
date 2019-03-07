$(function() {
	var _NavAy = [];
	$(".left-menu li[data-scroll-nav]").each(function(e, i) {
		var s = $(i),
			r = s.attr("data-scroll-nav");
		a = $("[data-scroll-index=" + r + "]"),
			c = a.offset().top,
			l = c + a.outerHeight();
		_NavAy.push({
				s: r,
				t: c,
				b: l,
				i: s,
				el: a
			}),
			s.on("click", function(e) {
				var $n = $(e.target).attr("data-scroll-nav"),
					$a = $("[data-scroll-index=" + $n + "]"),
					$c = $a.offset().top - 100;
				n = $(window).scrollTop();
				$("html,body").stop().animate({
					scrollTop: $c + "px"
				}, 300);
				$(e.target).addClass("right_act").siblings().removeClass("right_act");
			})
	});

	$(window).on("scroll", function() {
		e = $(window).scrollTop() - 100;
		h = $(window).height();
		for(var i in _NavAy) {
			var a = parseInt(i);
			if((_NavAy[a].t - h / 2) < e) {
				var ab = a;
			}
		}

		$("html,body").is(":animated") ? "" : $("[data-scroll-nav='" + ab + "']").addClass("right_act").siblings().removeClass("right_act");
	}).scroll();
});

$(".left-menu ul li").click(function() {
	$(this).addClass('right_act').siblings().removeClass('right_act');
})