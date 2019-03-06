$(function(){
	var srf = $('meta[name="csrf-token"]').attr('content');
	// var open=true;
	// $(".navlist").click(function(){
	//  	if(open){
	//  		$(this).addClass("active");
 //        	$(".collapse").slideDown("200");
 //        	open=false;
	//  	}else{
	//  		$(this).removeClass("active");
	//  		$(".collapse").slideUp("200");
	//  		open=true;
	//  	}
 //    });
    var clickNumber =0;
    $(".navlist").on("click", function(e){
        e.stopPropagation();
        if(clickNumber %2==0){
        	$(this).addClass("active");
            $(".collapse").stop().slideDown("fast");
        }else{
            $(".collapse").stop().slideUp("fast");
            $(this).removeClass("active");
        }
        clickNumber++;
    });
})