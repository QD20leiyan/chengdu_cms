$(document).ready(function() {
	var $wrapper = $('.tab-wrapper'),
	    $allTabs = $wrapper.find('.tab-content > div'),
	    $tabMenu = $wrapper.find('.tab-menu li'),
	    $line = $('<div class="line"></div>').appendTo($tabMenu);

	  $allTabs.not(':first-of-type').hide();  
	  $tabMenu.filter(':first-of-type').find(':first').width('100%')
	  
	  $tabMenu.each(function(i) {
	    $(this).attr('data-tab', 'tab'+i);
	  });
	  
	  $allTabs.each(function(i) {
	    $(this).attr('data-tab', 'tab'+i);
	  });
	  
	  $tabMenu.on('click', function() {
	    
	    var dataTab = $(this).data('tab'),
	        $getWrapper = $(this).closest($wrapper);
	    
	    $getWrapper.find($tabMenu).removeClass('curr');
	    $(this).addClass('curr');
	    
	    $getWrapper.find('.line').width(0);
	    $(this).find($line).animate({'width':'100%'}, 'fast');
	    $getWrapper.find($allTabs).hide();
	    $getWrapper.find($allTabs).filter('[data-tab='+dataTab+']').show();
	  });
		$(".header_tab").click(function() {
			if($(".h_tab").css("display") == "none") {
				$(".header_tab span").addClass("active");
				$(".h_tab").stop().slideDown();
			} else {
				$(".header_tab span").removeClass("active");
				$(".h_tab").stop().slideUp();
			}
		});
			$(".lists-nav li").click(function(){
				var index=$(this).index();//获取当前划过元素的index值
				$(this).addClass("curr").siblings().removeClass("curr");//改变当前状态
				$(".l_inf").eq(index).css({"display":"block"}).siblings(".l_inf").css({"display":"none"});//切换内容
			})
		});