jQuery.fn.floatadv = function(loaded) {
  var obj = this;
  body_height = parseInt($(window).height());
  block_height = parseInt(obj.height());
  top_position = parseInt((body_height/2.5) - (block_height/2.5) + $(window).scrollTop());
  if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };
  if(!loaded) {
    obj.css({'position': 'absolute'});
    obj.css({ 'top': top_position });
    $(window).bind('resize', function() {
      obj.floatadv(!loaded);
    });
    $(window).bind('scroll', function() {
      obj.floatadv(!loaded);
    });
  } else {
    obj.stop();
    obj.css({'position': 'absolute'});
    obj.animate({ 'top': top_position }, 400, 'linear');
  }
}
$(function(){
  $(".float").floatadv();
  //名人堂
  $(".h-slideBox1").slide({mainCell:".bd",titCell:".hd",prevCell:".prev",nextCell:".next",autoPage:true,autoPlay:true,pnLoop:false,effect:"left"});
  $(".h-slideBox2").slide({mainCell:".bd",titCell:".hd",prevCell:".prev",nextCell:".next",autoPage:true,pnLoop:false,effect:"left",scroll:"2",vis:"2"});
  $(".h-slideBox3").slide({mainCell:".bd",titCell:".hd",prevCell:".prev",nextCell:".next",autoPage:true,pnLoop:false,effect:"left",scroll:"1",vis:"4"});
  $(".h-main5 .h-m5 .h-videobox").click(function(){
	  var link_url = $(this).attr('rel');
	  $('.video-content').append('<embed height="720" width="1280" align="middle" type="application/x-shockwave-flash" flashvars="'+ link_url +'" allowscriptaccess="always" quality="high" allowfullscreen="true" src="http://yuntv.letv.com/bcloud.swf">');
    $(".player-bg").show();
  });
  $(".h-main5 .h-m5 .h-videolist").on("click","a",function(){
	  var link_url = $(this).attr('rel');
	  $('.video-content').append('<embed height="720" width="1280" align="middle" type="application/x-shockwave-flash" flashvars="'+ link_url +'" allowscriptaccess="always" quality="high" allowfullscreen="true" src="http://yuntv.letv.com/bcloud.swf">');
    $(".player-bg").show();
  });
  $(".player-bg .video-close").click(function(){
	  var link_url = $(this).attr('rel');
	  $('.video-content').empty();
    $(".player-bg").hide();
  });

  $(".h-main4 .h-m4 .h-per .h-perbox").click(function(){
    var src = $(this).find("img").attr("src");
    $(".tck-container").show();
		$(".mask").show();
    $(".h-tckpercon img").attr("src",src);
		$(".tck-container img").attr("src",src);
  })
  $(".tck-container .h-tckclose").click(function(){
    $(".h-tckper").hide();
		$(".mask").hide();
		$(".tck-container").hide();
  });
  var l = $(".h-perlist img").length,
    s = 0,
    time = null;
  function move(s){
    var src = $(".h-perlist img").eq(s).attr("src");
    $(".h-perbox img").attr("src",src);
  }
  $(".h-perlist img").click(function(){
    var index=$(this).index();
    s=index;
    move(index);

  })
  function autoMove(){
    time = setInterval(function(){
      s++;
      if(s==l){
        s=0;
      }
      move(s);
    },4000)
  }
  autoMove();
  
  $(".bg_bottom ul li").on("click" , function (){
  	var index = $(this).index();
  	$(".banner_main").find("li").css("display" , "none");
  	$(".banner_main").find("li").eq(index).css({"display":"block"});
  })
  var clickNumber = 0;
	$(".r_wx a:nth-child(1)").hover(function() {
		$(".fl_wx").stop().fadeIn();
	}, function() {
		$(".fl_wx").stop().fadeOut();
	})
	$(".float .f_nav").click(function() {
		if(clickNumber % 2 == 0) {
			$("body").addClass("op");
			$(".float").addClass("active");
		} else {
			$(".float").removeClass("active");
			$("body").removeClass("op");
		}
		clickNumber++;
	})
})
