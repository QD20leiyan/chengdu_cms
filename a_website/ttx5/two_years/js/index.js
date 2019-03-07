// JavaScript Document

/*time*/
var interval = 100; 
		function ShowCountDown(year,month,day,divname) 
		{ 
		var now = new Date(); 
		var endDate = new Date(year, month-1, day); 
		var leftTime=endDate.getTime()-now.getTime(); 
		var leftsecond = parseInt(leftTime/1000); 
		//var day1=parseInt(leftsecond/(24*60*60*6)); 
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600); 
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); 
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60); 
		var cc = document.getElementById(divname); 
		$('.unm_bg').find('li:eq(0)').html(day1+"<i></i><b>天</b>")
		$('.unm_bg').find('li:eq(1)').html(hour+"<i></i><b>时</b>")
		$('.unm_bg').find('li:eq(2)').html(minute+"<i></i><b>分</b>")
		$('.unm_bg').find('li:eq(3)').html(second+"<i></i><b>秒</b>")
		}
		window.setInterval(function(){ShowCountDown(2017,1,13,'divdown1');}, interval);
		
/**/
$(function(){
	$('.nav2 a').click(function(){
		
		var index= $(".nav2 a").index(this);
		$(this).parent().next('.pop').find('li').eq(index).show().siblings().hide();
	})
	$('.pop a').click(function(){
		$(this).parent('li').hide();
	})
	
	$(".to_top").hide()
		$(window).scroll(function(){
			if($(window).scrollTop()>100){
				$(".to_top").fadeIn(400)
			}else{
				$(".to_top").fadeOut(200)
			}
		})
	$(".to_top").click(function(){
			/*$("html,body").scrollTop(0)*/
			/*$("html,body").animate({scrollTop:0},200)*/
			$("html,body").animate({scrollTop:"0px"},500)
	})
	
	$(".nav a:eq(0)").click(function(){
			$("html,body").animate({scrollTop:"1050px"},500)
	})
	$(".nav a:eq(1)").click(function(){
			$("html,body").animate({scrollTop:"2000px"},500)
	})
	$(".nav a:eq(2)").click(function(){
			$("html,body").animate({scrollTop:"3100px"},500)
	})
	$(".nav a:eq(3)").click(function(){
			$("html,body").animate({scrollTop:"4100px"},500)
	})
	$(".nav a:eq(4)").click(function(){
			$("html,body").animate({scrollTop:"5300px"},500)
	})
	$(".nav a:eq(5)").click(function(){
			$("html,body").animate({scrollTop:"6350px"},500)
	})
	
	 $('.nav3 a').click(function(e){
		var target = e.target;
            var id = $(target).data("to");
            $('html,body').animate({scrollTop:$('#'+id).offset().top}, 800);
	})
	
	$('#star a').click(function(){
		var txt=$(this).siblings('input').val()
		$('#star .name').html(txt)
	})
	
})