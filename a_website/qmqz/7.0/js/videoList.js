$(function() {

	function init() {
        lb_init();
	}

	function lb_init() {
		add_move_icon($(".mo1"));
		add_move_icon($(".mo2"));
		add_move_icon($(".mo3"));
		add_move_icon($(".mo4"));
		add_move_icon($(".mo5"));
		add_move_icon($(".mo6"));
	}

    $(".nav li").click(function(){
    	var index = $(this).attr("data-index");
    	console.log(index);
    	changeShowContent($(".nav li"),$(".v2_content"),index)
    });

	init();
});