$(function(){
	var gIndex,all;
	function move(index){
		var src = $("#layer li[data-index='"+index+"']").find("img").attr("src");
		$(".layercon img").attr("src",src);
	}
	$("#layer").on("click","li",function(){
		all = $("#layer li").length;
		$(".layer").show();
		var index = $(this).attr("data-index");
		gIndex = index;
		move(gIndex);
	})
	$(".layercon .prev").on("click",function(){
		gIndex++;
		if (gIndex >= all) {
			gIndex = all;
		}
		move(gIndex);
	})
	$(".layercon .next").on("click",function(){
		gIndex--;
		if (gIndex <= 0) {
			gIndex = 1;
		}
		move(gIndex);
	})
	$(".layer-close").click(function(){
		$(".layer").hide();
	})
})