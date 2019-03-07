$(function() {
	$('html').fitText(3);
	
	$(".nav_tab").click(function() {
		if($(".tab_select").css("display") == "none") {
			$(".nav_tab01").addClass("active");
			$(".nav_tab02").addClass("active");
			$(".nav_tab03").addClass("active");
			$(".tab_select").stop().slideDown();
		} else {
			$(".nav_tab01").removeClass("active");
			$(".nav_tab02").removeClass("active");
			$(".nav_tab03").removeClass("active");
			$(".tab_select").stop().slideUp();
		}
	})

	$(".tab_select .public_tab").on("click", function() {
		if($(this).children("ul").css("display") == "none") {
			$(this).children("ul").stop().slideDown();
			$("#tab_language .tab_ul").stop().slideUp();
			$(this).siblings(".public_tab").children("ul").stop().slideUp();
		} else {
			$(this).children("ul").stop().slideUp();
		}
	});
})