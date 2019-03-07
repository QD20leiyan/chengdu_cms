$(function() {

	//全局
	var jz_state = false;

	//事件
	$(".v_list_label").click(function() {
		if(jz_state) {
			return;
		}
		jz_state = false;
		jz_init(1);
		setTimeout(function() {
			jz_init(0);
		}, 4000);
	});

    $(".v_nav li").click(function(){
    	var index = $(this).attr("data-index");
    	changeShowContent($(".v_nav li"),$(".v_list_ul"),index)
    });
    
	//方法
	function jz_init(index) {
		$(".v_list_label span").removeClass("active").eq(index).addClass("active");
	}

    

});