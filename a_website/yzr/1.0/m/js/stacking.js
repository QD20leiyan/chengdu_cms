$(function(){

	(function( $ ){
	
	  $.fn.stack = function( options ) {  
	
		// Create some defaults, extending them with any options that were provided
		var o = $.extend({
			// width		:	400,			// width of the Stacking Gallery Images
			// height	:	500,			// height fo the Stacking Gallery Images
			next		:	'#next',		// id for the Next Navigation Button
			prev		:	'#previous'	// id for the Previous Navigation Button
		},options);
			
	
		var stack 		= $(this); 	// the id for the gallery.
	//	var stackImg 	= stack.find("img"); // this selects all images from the gallery
		var stackImg 	= '#'+stack.attr('id')+' img';
	//var stackImg = "#stage img";
		var count 		= $(stackImg).length; // counts the number of images in the gallery
			
			stack.width(o.width);
			// stack.height(o.height);
			
		// to position the next and previous buttons
		// $(o.next).css({position:'absolute', top: o.height/2 , right: -150 });
		// $(o.prev).css({position:'absolute', top: o.height/2 , left: -150 }); 
			
	anim();
			
	function anim(){
		for(i=0;i<count;i++){
			$(stackImg).eq(count-i-1).animate({
				top: (count-(i*(10))),
				left: (count-(i*20)),
				zIndex: (count-(i+1))
			},10);
		}


	}
	
		$(o.next).click(function(){
			$(stackImg).eq(count-1).detach().prependTo(stack);
			// $(".nv-inf div").eq(count-1).detach().prependTo(".nv-inf");
			anim(); 
		});    
		$(o.prev).click(function(){
			$(stackImg).eq(0).detach().appendTo(stack);
			// $(".nv-inf div").eq(0).detach().appendTo(".nv-inf");
			anim();		
		});
	
	$(o.next+','+o.prev+', '+stackImg).attr('unselectable','on').css('MozUserSelect','none').bind('selectstart',function(){return false;});
	
	};  
	  
	})( jQuery );

});