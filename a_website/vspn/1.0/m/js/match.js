$(function(){

	    var clickNumber=0;
	    var clickNumber1=0;
	    var clickNumber2=0;
	    var clickNumber3=0;
	    var clickNumber4=0;
		$(".h_nav").on("click", function(e) {
		e.stopPropagation();
		if(clickNumber % 2 == 0) {
			$(".d_t_t").addClass("d_t_t_tran");
			$(".d_t_b").addClass("d_t_b_tran");
			$(".header_nav").stop().slideDown();
		} else {
			$(".d_t_t").removeClass("d_t_t_tran");
			$(".d_t_b").removeClass("d_t_b_tran");
			$(".header_nav").stop().slideUp();
		}
		clickNumber++;
	    });
		var mySwiper = new Swiper(".banner_slider", {
        pagination : '.swiper-pagination',
		loop: true,
		paginationClickable: true,
		autoplayDisableOnInteraction : false,
        autoplay:3000,
        speed:1000,
        centeredSlides: true,
        });
	   $(".header_nav li,.fade,.header_nav").click(function() {
	   	$(".d_t_t").removeClass("d_t_t_tran");
	   	$(".d_t_m").removeClass("d_t_m_tran");
	   	$(".d_t_b").removeClass("d_t_b_tran");
	   	$(".header_nav").stop().slideUp();
	   	clickNumber = 0;
	   })
	   var swiper1 = new Swiper('.swiper-container1', {
        	  slidesPerView:3.9,
        	  spaceBetween:10,
        	  // centeredSlides:true,
        	  observeParents:true,
        	  // slideToClickedSlide: true,
        	  mode: 'horizontal',
	   		freeMode:false,
	   		touchRatio:0.5,
	   		longSwipesRatio:0.1,
	   		threshold:1,
	   		followFinger:false,
	   		observer: true,
	   		observeParents: true,
            autoplayDisableOnInteraction : false,
        	});
	   $(".swiper-container1 .select_ul li").click(function(){
	   		var index=$(this).index();
	   		$(this).addClass("active").siblings().removeClass("active");
	   		$(".select_con .info").eq(index).addClass("active").siblings(".select_con .info").   removeClass("active");
	   });
       $(".swiper-container1 .select_ul li:nth-child(1)").click(function(){
            $(".menu_list li").removeClass("active");
            $(".menu_list_li li").removeClass("active");
        });
        $(".swiper-container1 .select_ul li:nth-child(4)").click(function(){
            $(".select_ul").css({"transform":"translate3d(-14.6rem, 0px, 0px)"});
            $(".select_ul").css({"transition-duration":"300ms"});
        })
        $(".swiper-container1 .select_ul li:nth-child(6)").click(function(){
            $(".select_ul").css({"transform":"translate3d(-19rem, 0px, 0px)"});
            $(".select_ul").css({"transition-duration":"300ms"});
        })
	   $(".swiper-container1 .select_ul li:nth-child(3)").click(function(){
	   	$(".select_ul").css({"transform":"translate3d(0px, 0px, 0px)"});
	   	$(".select_ul").css({"transition-duration":"300ms"});
	   })
	   $(".return_top").click(function(){
	   	$("html,body").animate({
                scrollTop: 0
            }, 500);
	   })
	   $(".list2.info .year_sel li").click(function(){
	   		var index=$(this).index();
	   		$(this).addClass("active").siblings().removeClass("active");
	   		$(".list2.info .jd_detail").eq(index).addClass("active").siblings(".list2.info . jd_detail").removeClass("active");
	   		clickNumber1=0;
	   		clickNumber2=0;
	   		clickNumber3=0;
	   		clickNumber4=0;
	   		$(".timelinContent").slideUp();
	   		$(".list2.info .jd_detail ul li").removeClass("active");
	   });
	   $(".list2.info .jd_detail ul li.li1").click(function(){
	   	if(clickNumber1 % 2 == 0) {
	   		var index=$(this).index();
	   		$(this).addClass("active");
	   		$(this).find(".timelinContent").slideDown();
	   		clickNumber1++;
	   	}else{
                var index=$(this).index();
	   		$(this).find(".timelinContent").slideUp();
	   		$(this).removeClass("active");
	   		clickNumber1++;
	   	}
	   });
	   $(".list2.info .jd_detail ul li.li2").click(function(){
	   	if(clickNumber2 % 2 == 0) {
	   		var index=$(this).index();
	   		$(this).addClass("active");
	   		$(this).find(".timelinContent").slideDown();
	   		clickNumber2++;
	   	}else{
                var index=$(this).index();
	   		$(this).find(".timelinContent").slideUp();
	   		$(this).removeClass("active");
	   		clickNumber2++;
	   	}
	   });
	   $(".list2.info .jd_detail ul li.li3").click(function(){
	   	if(clickNumber3 % 2 == 0) {
	   		var index=$(this).index();
	   		$(this).addClass("active");
	   		$(this).find(".timelinContent").slideDown();
	   		clickNumber3++;
	   	}else{
                var index=$(this).index();
	   		$(this).find(".timelinContent").slideUp();
	   		$(this).removeClass("active");
	   		clickNumber3++;
	   	}
	   });
	   $(".list2.info .jd_detail ul li.li4").click(function(){
	   	if(clickNumber4 % 2 == 0) {
	   		var index=$(this).index();
	   		$(this).addClass("active");
	   		$(this).find(".timelinContent").slideDown();
	   		clickNumber4++;
	   	}else{
                var index=$(this).index();
	   		$(this).find(".timelinContent").slideUp();
	   		$(this).removeClass("active");
	   		clickNumber4++;
	   	}
	   });
        var swiper2= new Swiper('.swiper-container2',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination2',
                paginationClickable: true,
                slidesPerView:1,
    
                autoplay:3000,
                autoplayDisableOnInteraction : false,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper21= new Swiper('.swiper-container21',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination21',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,

                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper22= new Swiper('.swiper-container22',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination22',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper23= new Swiper('.swiper-container23',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination23',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper24= new Swiper('.swiper-container24',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination24',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper25= new Swiper('.swiper-container25',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination25',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper26= new Swiper('.swiper-container26',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination26',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper27= new Swiper('.swiper-container27',{
                loop:true,
                paginationType : 'fraction',
                pagination: '.swiper-pagination27',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper3= new Swiper('.swiper-container3',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                autoplayDisableOnInteraction : false,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper3){ 
                    if(swiper3.activeIndex==0){
                        $(".calendar1").css('height', '37.2rem');
                        $(".calendar1 .slider").css('height', '28rem');
                        $(".calendar1").css('overflow-y', 'hidden');
                        $(".calendar1 .qh_btn p").html("3月");
                    }else{
                        $(".calendar1").css('height', 'auto');
                        $(".calendar1 .slider").css('height', 'auto');
                        $(".calendar1").css('overflow-y', 'hidden');
                    }
                    if(swiper3.activeIndex==1){
                        $(".calendar1 .qh_btn p").html("4月");
                    }
                    if(swiper3.activeIndex==2){
                        $(".calendar1 .qh_btn p").html("5月");
                    }
                    console.log(swiper3.activeIndex);
                },
                onSlideChangeEnd : function() {
                    if(swiper3.activeIndex==0){
                        $(".calendar1").css('height', '37.2rem');
                        $(".calendar1 .slider").css('height', '28rem');
                        $(".calendar1").css('overflow-y', 'hidden');
                        $(".calendar1 .qh_btn p").html("3月");
                    }else{
                        $(".calendar1").css('height', 'auto');
                        $(".calendar1 .slider").css('height', 'auto');
                        $(".calendar1").css('overflow-y', 'hidden');
                    }
                    if(swiper3.activeIndex==1){
                        $(".calendar1 .qh_btn p").html("4月");
                    }
                    if(swiper3.activeIndex==2){
                        $(".calendar1 .qh_btn p").html("5月");
                    }
                    console.log(swiper3.activeIndex);
                }
            });
        var swiper4= new Swiper('.swiper-container4',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                autoplayDisableOnInteraction : false,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper4){ 
                    if(swiper4.activeIndex==0){
                        $(".calendar2 .qh_btn p").html("5月");
                    }
                    if(swiper4.activeIndex==1){
                        $(".calendar2 .qh_btn p").html("6月");
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper4.activeIndex==0){
                        $(".calendar2 .qh_btn p").html("5月");
                    }
                    if(swiper4.activeIndex==1){
                        $(".calendar2 .qh_btn p").html("6月");
                    }
                }
            });
        var swiper5= new Swiper('.swiper-container5',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                autoplayDisableOnInteraction : false,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper5){ 
                    if(swiper5.activeIndex==0){
                        $(".calendar3").css('height', '51.2rem');
                        $(".calendar3 .slider").css('height', '42rem');
                        $(".calendar3").css('overflow-y', 'hidden');
                        $(".calendar3 .qh_btn p").html("6月");
                    }
                    if(swiper5.activeIndex==1){
                        $(".calendar3 .qh_btn p").html("7月");
                        $(".calendar3").css('height', '51.2rem');
                        $(".calendar3 .slider").css('height', '42rem');
                    }
                    if(swiper5.activeIndex==2){
                        $(".calendar3 .qh_btn p").html("8月");
                        $(".calendar3").css('height', '57.2rem');
                        $(".calendar3 .slider").css('height', '48rem');
                    }
                    if(swiper5.activeIndex==3){
                        $(".calendar3 .qh_btn p").html("9月");
                        $(".calendar3").css('height', '14.2rem');
                        $(".calendar3 .slider").css('height', '5rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper5.activeIndex==0){
                        $(".calendar3").css('height', '51.2rem');
                        $(".calendar3 .slider").css('height', '42rem');
                        $(".calendar3").css('overflow-y', 'hidden');
                        $(".calendar3 .qh_btn p").html("6月");
                    }
                    if(swiper5.activeIndex==1){
                        $(".calendar3 .qh_btn p").html("7月");
                        $(".calendar3").css('height', '51.2rem');
                        $(".calendar3 .slider").css('height', '42rem');
                    }
                    if(swiper5.activeIndex==2){
                        $(".calendar3 .qh_btn p").html("8月");
                        $(".calendar3").css('height', '57.2rem');
                        $(".calendar3 .slider").css('height', '48rem');
                    }
                    if(swiper5.activeIndex==3){
                        $(".calendar3 .qh_btn p").html("9月");
                        $(".calendar3").css('height', '14.2rem');
                        $(".calendar3 .slider").css('height', '5rem');
                    }
                }
            });
        var swiper6= new Swiper('.swiper-container6',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                autoplayDisableOnInteraction : false,
                nextButton:'.swiper-button-next1',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper6){ 
                    if(swiper6.activeIndex==0){
                        $(".calendar4").css('height', '51.2rem');
                        $(".calendar4 .slider").css('height', '42rem');
                        $(".calendar4").css('overflow-y', 'hidden');
                        $(".calendar4 .qh_btn p").html("9月");
                    }
                    if(swiper6.activeIndex==1){
                        $(".calendar4 .qh_btn p").html("10月");
                        $(".calendar4").css('height', '40.2rem');
                        $(".calendar4 .slider").css('height', '31rem');
                    }
                    if(swiper6.activeIndex==2){
                        $(".calendar4 .qh_btn p").html("11月");
                        $(".calendar4").css('height', '28.2rem');
                        $(".calendar4 .slider").css('height', '19rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper6.activeIndex==0){
                        $(".calendar4").css('height', '51.2rem');
                        $(".calendar4 .slider").css('height', '42rem');
                        $(".calendar4").css('overflow-y', 'hidden');
                        $(".calendar4 .qh_btn p").html("9月");
                    }
                    if(swiper6.activeIndex==1){
                        $(".calendar4 .qh_btn p").html("10月");
                        $(".calendar4").css('height', '40.2rem');
                        $(".calendar4 .slider").css('height', '31rem');
                    }
                    if(swiper6.activeIndex==2){
                        $(".calendar4 .qh_btn p").html("11月");
                        $(".calendar4").css('height', '28.2rem');
                        $(".calendar4 .slider").css('height', '19rem');
                    }
                }
            });
        var swiper7= new Swiper('.swiper-container7',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                autoplayDisableOnInteraction : false,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper7){ 
                    if(swiper7.activeIndex==0){
                        $(".calendar5 .qh_btn p").html("09月");
                        $(".calendar5").css('height', 'auto');
                        $(".calendar5 .slider").css('height', '18rem');
                    }
                    if(swiper7.activeIndex==1){
                        $(".calendar5 .qh_btn p").html("10月");
                        $(".calendar5").css('height', 'auto');
                        $(".calendar5 .slider").css('height', 'auto');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper7.activeIndex==0){
                        $(".calendar5 .qh_btn p").html("09月");
                        $(".calendar5").css('height', 'auto');
                        $(".calendar5 .slider").css('height', '18rem');
                    }
                    if(swiper7.activeIndex==1){
                        $(".calendar5 .qh_btn p").html("10月");
                        $(".calendar5").css('height', 'auto');
                        $(".calendar5 .slider").css('height', 'auto');
                    }
                }
            });
        var swiper8= new Swiper('.swiper-container8',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                autoplayDisableOnInteraction : false,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper8){ 
                    if(swiper8.activeIndex==0){
                        $(".calendar6 .qh_btn p").html("8月");
                        $(".calendar6").css('height', '17.2rem');
                        $(".calendar6 .slider").css('height', '8rem');
                    }
                    if(swiper8.activeIndex==1){
                        $(".calendar6 .qh_btn p").html("9月");
                        $(".calendar6").css('height', '39.2rem');
                        $(".calendar6 .slider").css('height', '30rem');
                    }
                    if(swiper8.activeIndex==2){
                        $(".calendar6 .qh_btn p").html("10月");
                        $(".calendar6").css('height', '28.2rem');
                        $(".calendar6 .slider").css('height', '19rem');
                    }
                    if(swiper8.activeIndex==3){
                        $(".calendar6 .qh_btn p").html("11月");
                    }
                    if(swiper8.activeIndex==4){
                        $(".calendar6 .qh_btn p").html("12月");
                    }
                    if(swiper8.activeIndex==5){
                        $(".calendar6 .qh_btn p").html("1月");
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper8.activeIndex==0){
                        $(".calendar6 .qh_btn p").html("8月");
                        $(".calendar6").css('height', '17.2rem');
                        $(".calendar6 .slider").css('height', '8rem');
                    }
                    if(swiper8.activeIndex==1){
                        $(".calendar6 .qh_btn p").html("9月");
                        $(".calendar6").css('height', '39.2rem');
                        $(".calendar6 .slider").css('height', '30rem');
                    }
                    if(swiper8.activeIndex==2){
                        $(".calendar6 .qh_btn p").html("10月");
                         $(".calendar6").css('height', '28.2rem');
                        $(".calendar6 .slider").css('height', '19rem');
                    }
                    if(swiper8.activeIndex==3){
                        $(".calendar6 .qh_btn p").html("11月");
                        $(".calendar6").css('height', '34.2rem');
                        $(".calendar6 .slider").css('height', '25rem');
                    }
                    if(swiper8.activeIndex==4){
                        $(".calendar6 .qh_btn p").html("12月");
                        $(".calendar6").css('height', '17.2rem');
                        $(".calendar6 .slider").css('height', '8rem');
                    }
                    if(swiper8.activeIndex==5){
                        $(".calendar6 .qh_btn p").html("1月");
                        $(".calendar6").css('height', '19.2rem');
                        $(".calendar6 .slider").css('height', '10rem');
                    }
                }
            });
        var swiper10= new Swiper('.swiper-container10',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                autoplayDisableOnInteraction : false,
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper10){ 
                    if(swiper10.activeIndex==0){
                        $(".calendar8 .qh_btn p").html("6月");
                        $(".calendar8").css('height', '21.2rem');
                        $(".calendar8 .slider").css('height', '16rem');
                    }
                    if(swiper10.activeIndex==1){
                        $(".calendar8 .qh_btn p").html("7月");
                        $(".calendar8").css('height', '44.2rem');
                        $(".calendar8 .slider").css('height', '40rem');
                    }
                    if(swiper10.activeIndex==2){
                        $(".calendar8 .qh_btn p").html("8月");
                        $(".calendar8").css('height', '15.2rem');
                        $(".calendar8 .slider").css('height', '10rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper10.activeIndex==0){
                        $(".calendar8 .qh_btn p").html("6月");
                       $(".calendar8").css('height', '21.2rem');
                        $(".calendar8 .slider").css('height', '16rem');
                    }
                    if(swiper10.activeIndex==1){
                        $(".calendar8 .qh_btn p").html("7月");
                        $(".calendar8").css('height', '44.2rem');
                        $(".calendar8 .slider").css('height', '40rem');
                    }
                    if(swiper10.activeIndex==2){
                        $(".calendar8 .qh_btn p").html("8月");
                         $(".calendar8").css('height', '15.2rem');
                        $(".calendar8 .slider").css('height', '10rem');
                    }
                }
            });
        var swiper9= new Swiper('.swiper-container9',{
                slidesPerView:1,
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev1',
                nextButton:'.swiper-button-next1',
                mode: 'horizontal',
                autoplayDisableOnInteraction : false,
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper9){ 
                    if(swiper9.activeIndex==0){
                        $(".calendar7 .qh_btn p").html("7月");
                        $(".calendar7").css('height', '19.2rem');
                        $(".calendar7 .slider").css('height', '10rem');
                    }
                    if(swiper9.activeIndex==1){
                        $(".calendar7 .qh_btn p").html("8月");
                        $(".calendar7").css('height', '78.2rem');
                        $(".calendar7 .slider").css('height', '69rem');
                    }
                    if(swiper9.activeIndex==2){
                        $(".calendar7 .qh_btn p").html("9月");
                         $(".calendar7").css('height', '40.2rem');
                        $(".calendar7 .slider").css('height', '31rem');
                    }
                    if(swiper9.activeIndex==3){
                        $(".calendar7 .qh_btn p").html("10月");
                        $(".calendar7").css('height', '19.2rem');
                        $(".calendar7 .slider").css('height', '10rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper9.activeIndex==0){
                        $(".calendar7 .qh_btn p").html("7月");
                        $(".calendar7").css('height', '19.2rem');
                        $(".calendar7 .slider").css('height', '10rem');
                    }
                    if(swiper9.activeIndex==1){
                        $(".calendar7 .qh_btn p").html("8月");
                        $(".calendar7").css('height', '78.2rem');
                        $(".calendar7 .slider").css('height', '69rem');
                    }
                    if(swiper9.activeIndex==2){
                        $(".calendar7 .qh_btn p").html("9月");
                         $(".calendar7").css('height', '40.2rem');
                        $(".calendar7 .slider").css('height', '31rem');
                    }
                    if(swiper9.activeIndex==3){
                        $(".calendar7 .qh_btn p").html("10月");
                        $(".calendar7").css('height', '19.2rem');
                        $(".calendar7 .slider").css('height', '10rem');
                    }
                }
            });
        $(".menu_list li").click(function(){
                var index=$(this).index();
                $(".menu_list").addClass("hidden");
                $(".menu_list_li").removeClass("hidden");
                $(this).addClass("active").siblings().removeClass("active");
                $(".menu_list_li .li_info").eq(index).addClass("active").siblings(".menu_list_li .li_info").removeClass("active");
        });
        $(".saishi").click(function(){
            $(".menu_list").removeClass("hidden");
            $(".menu_list_li").addClass("hidden");
        })
        // $(".list5.info .super_star .star").click(function(){
        //     $(".tips_star").fadeIn(300);
        // })
        // $(".list5 .img_close").click(function(){
        //     $(".tips_star").fadeOut(300);
        // })
        // $(".list5.info .super_star .star1").click(function(){
        //     $(".tips_star .star11").removeClass("active");
        //     $(".tips_star .start21").addClass("active");
        //     $(".info_text1").css('top', '-4rem');
        // })
        // $(".list5.info .super_star .star2").click(function(){
        //     $(".tips_star .star11").removeClass("active");
        //     $(".tips_star .start22").addClass("active");
        //     $(".info_text1").css('top', '-4rem');
        // })
        // $(".list5.info .super_star .star3").click(function(){
        //     $(".tips_star .star11").removeClass("active");;
        //     $(".tips_star .start23").addClass("active");
        //     $(".info_text1").css('top', '-4rem');
        // })
        // $(".list5.info .super_star .star4").click(function(){
        //     $(".tips_star .star11").removeClass("active");
        //     $(".tips_star .start24").addClass("active");
        //     $(".info_text1").css('top', '-4rem');
        // })
        // $(".list5.info .super_star .star5").click(function(){
        //     $(".tips_star .star11").removeClass("active");
        //     $(".tips_star .start25").addClass("active");
        //     $(".info_text1").css('top', '-4rem');
        // })
        var swiper31= new Swiper('.swiper-container31',{
                paginationType : 'fraction',
                pagination: '.swiper-pagination31',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                // autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
        var swiper32= new Swiper('.swiper-container32',{
                paginationType : 'fraction',
                pagination: '.swiper-pagination32',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                // autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper32){ 
                   if(swiper32.activeIndex==3){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper32.activeIndex==4){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper32.activeIndex==5){
                        $(".info_text1").css('top', '-17rem');
                    }else{
                        $(".info_text1").css('top', '-4rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper32.activeIndex==3){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper32.activeIndex==4){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper32.activeIndex==5){
                        $(".info_text1").css('top', '-17rem');
                    }else{
                        $(".info_text1").css('top', '-4rem');
                    }
                }
            });
        var swiper33= new Swiper('.swiper-container33',{
                paginationType : 'fraction',
                pagination: '.swiper-pagination33',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                // autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper33){ 
                    if(swiper33.activeIndex==5){
                        $(".info_text1").css('top', '-17rem');
                    }else{
                        $(".info_text1").css('top', '-4rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper33.activeIndex==5){
                        $(".info_text1").css('top', '-17rem');
                    }else{
                        $(".info_text1").css('top', '-4rem');
                    }
                }
            });
        var swiper34= new Swiper('.swiper-container34',{
                paginationType : 'fraction',
                pagination: '.swiper-pagination34',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                // autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
                onInit: function(swiper34){ 
                   if(swiper34.activeIndex==3){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper34.activeIndex==4){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper34.activeIndex==5){
                        $(".info_text1").css('top', '-17rem');
                    }else{
                        $(".info_text1").css('top', '-4rem');
                    }
                },
                onSlideChangeEnd : function() {
                    if(swiper34.activeIndex==3){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper34.activeIndex==4){
                        $(".info_text1").css('top', '-17rem');
                    }else if(swiper34.activeIndex==5){
                        $(".info_text1").css('top', '-17rem');
                    }else{
                        $(".info_text1").css('top', '-4rem');
                    }
                }
            });
        var swiper35= new Swiper('.swiper-container35',{
                paginationType : 'fraction',
                pagination: '.swiper-pagination35',
                paginationClickable: true,
                slidesPerView:1,
                autoplayDisableOnInteraction : false,
                // autoplay:3000,
                speed:800,
                // effect : 'fade',
                // fade: {
                //     crossFade: true,
                // },
                slideToClickedSlide: true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                mode: 'horizontal',
                freeMode:false,
                touchRatio:0.5,
                longSwipesRatio:0.1,
                threshold:1,
                followFinger:false,
                observer: true,
                observeParents: true,
            });
         $(".peo_box>li").click(function(){
                $(this).addClass("active").siblings().removeClass("active");
                $(".list5.info .mengceng").show();
           })
           $(".list5.info .mengceng").click(function(){
                $(".peo_box>li").removeClass("active");
                $(this).hide();
           })
});
