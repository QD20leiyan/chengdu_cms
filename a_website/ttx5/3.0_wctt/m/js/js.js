$(function(){
  //$('html').fitText(2);
  var clickTap = true;
  $(".downl").click(function (){
  	if(clickTap){
  		$(".down_ul").stop().slideDown();
  		clickTap = false;
  	} else {
  		$(".down_ul").stop().slideUp();
  		clickTap = true;
  	}
  })
	$('.turn_top').click(function(){
		$("html,body").animate({scrollTop:0},500);
	});
  $(".wd_main02 ul li,.video_play").click(function(){
      var rel = $(this).attr('rel');
	  if(rel){
	 	 $("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
	  }
      $("#video_tck").show();
      $(".mask").show();
  });
  $("#video_tck #close").click(function(){
	  $("#iframe_btn").attr("src","");
      $("#video_tck").hide();
      $(".mask").hide();
  })
  $("#leftTabBox01 .hd li").click(function(){
    var index=$(this).index();
    $(this).addClass("on").siblings().removeClass("on");
    $("#leftTabBox01 .bd ul").eq(index).show().siblings().hide()
  })
})
