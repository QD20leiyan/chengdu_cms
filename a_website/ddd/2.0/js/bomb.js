
                $(".close").click(function(){
                    mask();
                })
              
             
                  $("#btn-2 img").click(function(){
	   		$(".share").show();
	   });
	   $(".share").click(function(){
	   		$(".share").hide();
	   });
	   function mask(){
	   	 	 $("#mask1").hide();
	         $(".vote").hide();
	         $("#logo").hide();
	         $(".succ").hide();
	         $(".rows").hide();
	         $(".tp").hide();
	   }
	   $("#mask1").click(function(){
			mask();
	   })
              
			