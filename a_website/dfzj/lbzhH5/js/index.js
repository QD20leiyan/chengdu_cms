$(function() {
	$('html').fitText(2);

	var video = document.querySelector('#video');
	$(".btn").on("click" , function (){
		$("#video").fadeIn();
		$(this).css("display" , "none");
		video.play();
	})
	
	video.onended = function (){
		$("#video").fadeOut();
		$(".container_2").fadeIn();
	}
})