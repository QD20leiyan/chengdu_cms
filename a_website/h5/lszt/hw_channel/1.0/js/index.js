//移动端版本兼容

	var jsVer = 15;
	var phoneWidth = parseInt(window.screen.width);
	var phoneScale = phoneWidth/640;

	var ua = navigator.userAgent;
	if (/Android (\d+\.\d+)/.test(ua)){
		var version = parseFloat(RegExp.$1);
		// andriod 2.3
		if(version>2.3){
			document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
		// andriod 2.3以上
		}else{
			document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
		}
		// 其他系统
	} else {
		document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
	}

//移动端版本兼容 end
$(function(){
    function _preventDefault(e) { e.preventDefault(); }
    //弹出框
    function prompt_show(ele){
        $('<div class="prompt_bg"></div>').appendTo($("body"));
        $(ele).fadeIn();
        document.body.style.overflow = 'hidden';
        window.addEventListener('touchmove', _preventDefault);
    }
    //关闭弹出框
    function prompt_hide(ele){
        $('.prompt_bg').remove();
        $(ele).fadeOut();
        document.body.style.overflow = 'auto';
        window.removeEventListener('touchmove', _preventDefault);
    }

	//header部分花瓣飘落效果
	$(".header").snowfall({
		image: [
			"img/realLeaf1.png",
			"img/realLeaf2.png",
			"img/realLeaf3.png",
			"img/realLeaf4.png",
			"img/realLeaf5.png",
            "img/realLeaf6.png",
            "img/realLeaf7.png",
            "img/realLeaf8.png",
            "img/realLeaf9.png",
            "img/realLeaf10.png"
		],
		flakeCount:5,
		minSize: 60,
		maxSize: 90,
		minSpeed:1,
		maxSpeed:4
	});

    //预约送p10
    $('.p10').on('click',function(){
        $('body,html').animate({ scrollTop: $($.attr(this,'href')).offset().top}, 200);
        return false;
    });

	//角色介绍
	// $('.role .nav li').on('click',function(){
	// 	$(this).addClass('on').siblings().removeClass('on');
	// 	var dd = $('.role .content dd').eq($(this).index());
	// 	$('.role .content dd').hide()
	// 	dd.fadeIn();
	// 	dd.find('.text').addClass('animated fadeInLeft');
	// 	dd.find('.pic').addClass('animated fadeInRight');
	// });
    var list = new Swiper('.role .list .swiper-container',{
        slidesPerView: 4,
        loop:true,
        slideToClickedSlide: true,
        nextButton: '.role .list .swiper-button-next',
        prevButton: '.role .list .swiper-button-prev',
        onSlideChangeEnd: function(swiper){ 
            // role.slideTo(swiper.realIndex);
            var dd = $('.role .content dd').eq(swiper.realIndex);
            $('.role .content dd').hide()
            dd.fadeIn();
            dd.find('.name').addClass('animated fadeInDown');
            dd.find('.pic').addClass('animated fadeInUp');
            dd.find('.see_role').addClass('animated fadeInRight');
            dd.find('.speech').addClass('animated fadeInRight');
        }
    });

    //人物介绍
    $('.see_role').on('click',function(){
        var key = $(this).attr('key');
        $('.pop4 h2').text(herolist[key].name);
        $('.pop4 h3').text(herolist[key].user);
        $('.pop4 p').text(herolist[key].dis);
        prompt_show('.pop4');
    });

    $('.closediv').on('click',function(){
        prompt_hide($(this).parent())
    });

	//游戏特色
	var swiper = new Swiper('.character .swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop:true,
        nextButton: '.character .swiper-button-next',
        prevButton: '.character .swiper-button-prev',
        coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });

    $(".character .swiper-slide").on('click',function(){
    	$(".prompt_swiper").show();
    	if(this.mySwiper == undefined){
    		this.mySwiper = new Swiper('.prompt_swiper .swiper-container', {
    			autoplay:3000,//可选选项，自动滑动
    			pagination : '.prompt_swiper .swiper-pagination',
    			loop : true,
    			autoplayDisableOnInteraction: false,
    		});
    	}
    });
    
    $(".prompt_swiper").on('click',function(){
    	$(this).hide();
    });
    
    $(".prompt_swiper .swiper-container").on('click',function(e){
    	e.stopPropagation();
    });

    $('.introduce .arrow').on('click',function(e){
    	if($(this).attr('tip')==1){
    		$(this).css({backgroundImage:'url(img/arrow2.png)'});
    		$('.introduce .briefing').hide();
    		$('.introduce .details').show();
    		$(this).attr('tip',2);
    	}else{
    		$(this).css({backgroundImage:'url(img/arrow.png)'});
    		$('.introduce .briefing').show();
    		$('.introduce .details').hide();
    		$(this).attr('tip',1);
    	}
    	e.stopPropagation();
    });

});


