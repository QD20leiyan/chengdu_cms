$.fn.tab=function(){
    return this.each(function(){
    var $a=$(this)	
	$a.mouseover(function(){
		var index=$(this).index();
		$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
		$(".infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
      });
  };
