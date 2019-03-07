var winObj = $(window);
var pageH=0;
var pageSc = 1;
var pageCtrl = {
	resize:function(f){
		var pw = 750;
		var ph = 9320;
		var tww = document.body.offsetWidth;
		var twh = document.body.offsetHeight;
		var wh = twh*pw/tww;
		var sc = tww/pw;
		var tw = Math.max(0,(pw-tww)*0.5);
		if(sc<=1) {
			tw = 0;
		}
		pageSc = sc;
		pageH = wh;
		$('#wrap').width(tww);
		$('#main').css({'transform':'translate('+tw+'px, 0px) scale('+sc+')','-webkit-transform':'translate3d('+tw+'px, 0px, 0px) scale('+sc+')'});
	},
	init:function(){
		this.inited = true;
		$('.ipic').each(function(){
			$(this).attr('src',$(this).data('pic'));
		});
		$('.npic').each(function(){
			$(this).attr('src',$(this).data('pic'));
		});
		var uto;
		$('.btn').each(function(){
			var ismove = false;
			var data = {};
			this.addEventListener('touchstart', function(e){
				ismove = false;
				var ob = $(this).data('ob');
				$(this).css({'background-position':'0 -'+ob+'px'});
				var touch = e.touches[0];
				data.sx = touch.pageX;
				data.sy = touch.pageY;
				data.ex = touch.pageX;
				data.ey = touch.pageY;
			},false,false);
			this.addEventListener('touchmove', function(e){
				var touch = e.touches[0];
				data.ex = touch.pageX;
				data.ey = touch.pageY;
				if(Math.abs(data.sx-data.ex)>10||Math.abs(data.sy-data.ey)>10) {
					ismove = true;
				}
			},false,false);
			this.addEventListener('touchend', function(e){
				e.preventDefault();
				$(this).css({'background-position':'0 0'});
				if(ismove) {
					ismove = false;
					return;
				}
				var id = $(this).attr('id');
				switch(id) {
					case "navBtn1":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:$('.page2').offset().top}, 1000);
						break;
					case "navBtn2":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:$('.page3').offset().top}, 1000);
						break;
					case "navBtn3":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:$('.page4').offset().top}, 1000);
						break;
					case "navBtn4":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:$('.page5').offset().top}, 1000);
						break;
					case "navBtn5":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:$('.page6').offset().top}, 1000);
						break;
					case "navBtn6":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:$('.page7').offset().top}, 1000);
						break;
					case "topBtn":
						$("html,body").stop(true);
						$("html,body").animate({scrollTop:0}, 1000);
						break;
					case "getBtn":
						var hf = $(this).data('href');
						if(hf!='#') {
							location.href=$(this).data('href');
						}
						break;
				}
			},false,false);
		});
		this.resize();
		winObj.resize(function(){
			pageCtrl.resize();
		});
		var uto = null;
		function pdscr() {
			if(uto) {
				clearTimeout(uto);
			}
			uto = setTimeout(function(){
				var ws = winObj.scrollTop()/pageSc;
				if(ws>1586) {
					$('#topBtn').css({'transform':'translateY('+(winObj.scrollTop()/pageSc+pageH-120)+'px)'}).show();
				} else {
					$('#topBtn').hide();
				}
			},100);
		}
		winObj.scroll(function(){
			pdscr();
		});
		pdscr();
		$('#wrap').show();
	}
}
pageCtrl.init();