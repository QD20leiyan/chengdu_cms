$(function() {
	$('html').fitText(2);

	$(".input_select").click(function() {
		var ul = $("#dropdown ul");
		if(ul.css("display") == "none") {
			ul.slideDown("fast");
		} else {
			ul.slideUp("fast");
		}
	});
	$("#dropdown ul li").click(function() {
            var id = $(this).attr('value');
		var txt = $(this).text();
		$(".input_select").val(txt);
                $(".input_select").attr('data-id', id);
		$("#dropdown ul").hide();
	});

	 $(".show_list div").on('click' , function (){
      	$(".denglu").show();
      	$(".include").show();
//      $(".m1").show();
//        setTimeout('$(".m").fadeOut();$(".m1").fadeOut()', 1000);
      });
    
   	$(".include").click(function (){
   		$(".denglu").css("display" , "none");
   		$(".include").css("display" , "none");
   	})
   	
  
    $(".small_video li").on('click' , function (){
		var index = $(this).index();
		$(".picBox").find("li").css("display" , "none");
		$(".picBox").find("li").eq(index).css({"display":"block"});
    })
	
	$(".small_video li").click(function (){
		$(this).addClass("gaoliang").siblings().removeClass("gaoliang");
	})
	
	$(".match_list li a").click(function (){
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	$(".input_huge").click(function (){
		var ul = $(".big_box ul");
		if(ul.css("display") == "none"){
			ul.slideDown();
		}else {
			ul.slideUp();
		}
	})
	
	$(".close_bbb").click(function (){
		$(".denglu").css("display" , "none");
		$(".include").css("display" , "none");
	})
	
	$(".big_box ul li a").click(function() {
		var txt = $(this).text();
		$(".input_huge").val(txt);
		$(".big_box ul").css("display" , "none");
		var txt01 = $(".input_huge").val();
		if(txt01 == "第一组"){
			$(".show_list").css("display" , "block");
			$(".show_list_1").css("display" , "none");
			$(".show_list_2").css("display" , "none");
			$(".show_list_3").css("display" , "none");
		} else if(txt01 == "第二组"){
			$(".show_list").css("display" , "none");
			$(".show_list_1").css("display" , "block");
			$(".show_list_2").css("display" , "none");
			$(".show_list_3").css("display" , "none");
		} else if(txt01 == "第三组"){
			$(".show_list").css("display" , "none");
			$(".show_list_1").css("display" , "none");
			$(".show_list_2").css("display" , "block");
			$(".show_list_3").css("display" , "none");
		} else if(txt01 == "第四组"){
			$(".show_list").css("display" , "none");
			$(".show_list_1").css("display" , "none");
			$(".show_list_2").css("display" , "none");
			$(".show_list_3").css("display" , "block");
		}
	});
});