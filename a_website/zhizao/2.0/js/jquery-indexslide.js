(function(e){"use strict";var t="ScrollIt",n="1.0.3";var r={upKey:38,downKey:40,easing:"linear",scrollTime:600,activeClass:"active",onPageChange:null,topOffset:0};e.scrollIt=function(t){var n=e.extend(r,t),i=0,s=e("[data-scroll-index]:last").attr("data-scroll-index");var o=function(t){if(t<0||t>s)return;var r=e("[data-scroll-index="+t+"]").offset().top+n.topOffset+1;e("html,body").animate({scrollTop:r,easing:n.easing},n.scrollTime)};var u=function(t){var n=e(t.target).closest("[data-scroll-nav]").attr("data-scroll-nav")||e(t.target).closest("[data-scroll-goto]").attr("data-scroll-goto");o(parseInt(n))};var a=function(t){var r=t.which;if(e("html,body").is(":animated")&&(r==n.upKey||r==n.downKey)){return false}if(r==n.upKey&&i>0){o(parseInt(i)-1);return false}else if(r==n.downKey&&i<s){o(parseInt(i)+1);return false}return true};var f=function(t){if(n.onPageChange&&t&&i!=t)n.onPageChange(t);i=t;e("[data-scroll-nav]").removeClass(n.activeClass);e("[data-scroll-nav="+t+"]").addClass(n.activeClass)};var l=function(){var t=e(window).scrollTop();var r=e("[data-scroll-index]").filter(function(r,i){return t>=e(i).offset().top+n.topOffset&&t<e(i).offset().top+n.topOffset+e(i).outerHeight()});var i=r.first().attr("data-scroll-index");f(i)};e(window).on("scroll",l).scroll();e(window).on("keydown",a);e("body").on("click","[data-scroll-nav], [data-scroll-goto]",function(e){/*e.preventDefault();*/u(e)})}})(jQuery)

!function(a){a.fn.slide=function(b){return a.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1},this.each(function(){var c=a.extend({},a.fn.slide.defaults,b),d=a(this),e=c.effect,f=a(c.prevCell,d),g=a(c.nextCell,d),h=a(c.pageStateCell,d),i=a(c.playStateCell,d),j=a(c.titCell,d),k=j.size(),l=a(c.mainCell,d),m=l.children().size(),n=c.switchLoad,o=a(c.targetCell,d),p=parseInt(c.defaultIndex),q=parseInt(c.delayTime),r=parseInt(c.interTime);parseInt(c.triggerTime);var Q,t=parseInt(c.scroll),u=parseInt(c.vis),v="false"==c.autoPlay||0==c.autoPlay?!1:!0,w="false"==c.opp||0==c.opp?!1:!0,x="false"==c.autoPage||0==c.autoPage?!1:!0,y="false"==c.pnLoop||0==c.pnLoop?!1:!0,z="false"==c.mouseOverStop||0==c.mouseOverStop?!1:!0,A="false"==c.defaultPlay||0==c.defaultPlay?!1:!0,B="false"==c.returnDefault||0==c.returnDefault?!1:!0,C=0,D=0,E=0,F=0,G=c.easing,H=null,I=null,J=null,K=c.titOnClassName,L=j.index(d.find("."+K)),M=p=-1==L?p:L,N=p,O=p,P=m>=u?0!=m%t?m%t:t:0,R="leftMarquee"==e||"topMarquee"==e?!0:!1,S=function(){a.isFunction(c.startFun)&&c.startFun(p,k,d,a(c.titCell,d),l,o,f,g)},T=function(){a.isFunction(c.endFun)&&c.endFun(p,k,d,a(c.titCell,d),l,o,f,g)},U=function(){j.removeClass(K),A&&j.eq(N).addClass(K)};if("menu"==c.type)return A&&j.removeClass(K).eq(p).addClass(K),j.hover(function(){Q=a(this).find(c.targetCell);var b=j.index(a(this));I=setTimeout(function(){switch(p=b,j.removeClass(K).eq(p).addClass(K),S(),e){case"fade":Q.stop(!0,!0).animate({opacity:"show"},q,G,T);break;case"slideDown":Q.stop(!0,!0).animate({height:"show"},q,G,T)}},c.triggerTime)},function(){switch(clearTimeout(I),e){case"fade":Q.animate({opacity:"hide"},q,G);break;case"slideDown":Q.animate({height:"hide"},q,G)}}),B&&d.hover(function(){clearTimeout(J)},function(){J=setTimeout(U,q)}),void 0;if(0==k&&(k=m),R&&(k=2),x){if(m>=u)if("leftLoop"==e||"topLoop"==e)k=0!=m%t?(0^m/t)+1:m/t;else{var V=m-u;k=1+parseInt(0!=V%t?V/t+1:V/t),0>=k&&(k=1)}else k=1;j.html("");var W="";if(1==c.autoPage||"true"==c.autoPage)for(var X=0;k>X;X++)W+="<li>"+(X+1)+"</li>";else for(var X=0;k>X;X++)W+=c.autoPage.replace("$",X+1);j.html(W);var j=j.children()}if(m>=u){l.children().each(function(){a(this).width()>E&&(E=a(this).width(),D=a(this).outerWidth(!0)),a(this).height()>F&&(F=a(this).height(),C=a(this).outerHeight(!0))});var Y=l.children(),Z=function(){for(var a=0;u>a;a++)Y.eq(a).clone().addClass("clone").appendTo(l);for(var a=0;P>a;a++)Y.eq(m-a-1).clone().addClass("clone").prependTo(l)};switch(e){case"fold":l.css({position:"relative",width:D,height:C}).children().css({position:"absolute",width:E,left:0,top:0,display:"none"});break;case"top":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+u*C+'px"></div>').css({top:-(p*t)*C,position:"relative",padding:"0",margin:"0"}).children().css({height:F});break;case"left":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+u*D+'px"></div>').css({width:m*D,left:-(p*t)*D,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:E});break;case"leftLoop":case"leftMarquee":Z(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+u*D+'px"></div>').css({width:(m+u+P)*D,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(P+p*t)*D}).children().css({"float":"left",width:E});break;case"topLoop":case"topMarquee":Z(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+u*C+'px"></div>').css({height:(m+u+P)*C,position:"relative",padding:"0",margin:"0",top:-(P+p*t)*C}).children().css({height:F})}}var $=function(a){var b=a*t;return a==k?b=m:-1==a&&0!=m%t&&(b=-m%t),b},_=function(b){var c=function(c){for(var d=c;u+c>d;d++)b.eq(d).find("img["+n+"]").each(function(){var b=a(this);if(b.attr("src",b.attr(n)).removeAttr(n),l.find(".clone")[0])for(var c=l.children(),d=0;d<c.size();d++)c.eq(d).find("img["+n+"]").each(function(){a(this).attr(n)==b.attr("src")&&a(this).attr("src",a(this).attr(n)).removeAttr(n)})})};switch(e){case"fade":case"fold":case"top":case"left":case"slideDown":c(p*t);break;case"leftLoop":case"topLoop":c(P+$(O));break;case"leftMarquee":case"topMarquee":var d="leftMarquee"==e?l.css("left").replace("px",""):l.css("top").replace("px",""),f="leftMarquee"==e?D:C,g=P;if(0!=d%f){var h=Math.abs(0^d/f);g=1==p?P+h:P+h-1}c(g)}},ab=function(a){if(!A||M!=p||a||R){if(R?p>=1?p=1:0>=p&&(p=0):(O=p,p>=k?p=0:0>p&&(p=k-1)),S(),null!=n&&_(l.children()),o[0]&&(Q=o.eq(p),null!=n&&_(o),"slideDown"==e?(o.not(Q).stop(!0,!0).slideUp(q),Q.slideDown(q,G,function(){l[0]||T()})):(o.not(Q).stop(!0,!0).hide(),Q.animate({opacity:"show"},q,function(){l[0]||T()}))),m>=u)switch(e){case"fade":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,G,function(){T()}).siblings().hide();break;case"fold":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,G,function(){T()}).siblings().animate({opacity:"hide"},q,G);break;case"top":l.stop(!0,!1).animate({top:-p*t*C},q,G,function(){T()});break;case"left":l.stop(!0,!1).animate({left:-p*t*D},q,G,function(){T()});break;case"leftLoop":var b=O;l.stop(!0,!0).animate({left:-($(O)+P)*D},q,G,function(){-1>=b?l.css("left",-(P+(k-1)*t)*D):b>=k&&l.css("left",-P*D),T()});break;case"topLoop":var b=O;l.stop(!0,!0).animate({top:-($(O)+P)*C},q,G,function(){-1>=b?l.css("top",-(P+(k-1)*t)*C):b>=k&&l.css("top",-P*C),T()});break;case"leftMarquee":var c=l.css("left").replace("px","");0==p?l.animate({left:++c},0,function(){l.css("left").replace("px","")>=0&&l.css("left",-m*D)}):l.animate({left:--c},0,function(){l.css("left").replace("px","")<=-(m+P)*D&&l.css("left",-P*D)});break;case"topMarquee":var d=l.css("top").replace("px","");0==p?l.animate({top:++d},0,function(){l.css("top").replace("px","")>=0&&l.css("top",-m*C)}):l.animate({top:--d},0,function(){l.css("top").replace("px","")<=-(m+P)*C&&l.css("top",-P*C)})}j.removeClass(K).eq(p).addClass(K),M=p,y||(g.removeClass("nextStop"),f.removeClass("prevStop"),0==p&&f.addClass("prevStop"),p==k-1&&g.addClass("nextStop")),h.html("<span>"+(p+1)+"</span>/"+k)}};A&&ab(!0),B&&d.hover(function(){clearTimeout(J)},function(){J=setTimeout(function(){p=N,A?ab():"slideDown"==e?Q.slideUp(q,U):Q.animate({opacity:"hide"},q,U),M=p},300)});var bb=function(a){H=setInterval(function(){w?p--:p++,ab()},a?a:r)},cb=function(a){H=setInterval(ab,a?a:r)},db=function(){z||(clearInterval(H),bb())},eb=function(){(y||p!=k-1)&&(p++,ab(),R||db())},fb=function(){(y||0!=p)&&(p--,ab(),R||db())},gb=function(){clearInterval(H),R?cb():bb(),i.removeClass("pauseState")},hb=function(){clearInterval(H),i.addClass("pauseState")};if(v?R?(w?p--:p++,cb(),z&&l.hover(hb,gb)):(bb(),z&&d.hover(hb,gb)):(R&&(w?p--:p++),i.addClass("pauseState")),i.click(function(){i.hasClass("pauseState")?gb():hb()}),"mouseover"==c.trigger?j.hover(function(){var a=j.index(this);I=setTimeout(function(){p=a,ab(),db()},c.triggerTime)},function(){clearTimeout(I)}):j.click(function(){p=j.index(this),ab(),db()}),R){if(g.mousedown(eb),f.mousedown(fb),y){var ib,jb=function(){ib=setTimeout(function(){clearInterval(H),cb(0^r/10)},150)},kb=function(){clearTimeout(ib),clearInterval(H),cb()};g.mousedown(jb),g.mouseup(kb),f.mousedown(jb),f.mouseup(kb)}"mouseover"==c.trigger&&(g.hover(eb,function(){}),f.hover(fb,function(){}))}else g.click(eb),f.click(fb)})}}(jQuery),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*.3*1.5),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:.5*h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});
$(function(){
		//当导航条的固定
		var navcount=0; //顶部变小动画只执行一次
		$(window).scroll(function(){
	    if($(document).scrollTop()>100){
	    	$(".topLogo").hide();
	    	$(".sales-tel,.language").hide();
	    	$("#topBar").addClass("h-fix");
	        navcount++;
	        if(navcount==1){
	        	$(".topBoxlist .topBox,.topBar,.topSlide,.on,.navbar").css({"height":"0"});
	    	    $(".topBoxlist .topBox,.topBar,.topSlide,.on,.navbar").stop().animate({"height":"50"});
	        }
	        $(".topBoxlist").css({"float":"left"});
	        $(".suspend-height").addClass("suspend");  
	    }
	    else if($(document).scrollTop()<100){
	    	navcount=0;
	        $(".topLogo").show();
	        $(".sales-tel,.language").show();
	        $("#topBar").removeClass("h-fix");
	        $(".topBox,.topBar,.topSlide,.on,.navbar").css({"height":"100"});
	        $(".topBoxlist").css({"height":"100","float":"right"});
	        $(".suspend-height").removeClass("suspend");
	    }
	});
		//二级导航的显示隐藏
	$(".yingjian-zhizao").mouseover(function(){
		$("#hardworkNav-2").show();
	});
	$(".hardworkNav").mouseover(function(){
		$("#hardworkNav-2").show();
	});
	$(".hardworkNav").mouseleave(function(){
		$("#hardworkNav-2").hide();
	});

	$(".yingjian-zhizao").mouseleave(function(){
		$("#hardworkNav-2").hide();
	});
    $(".head-slider").slider({interTime:5000,delayTime:5000});
	//首页banner2的效果动画
    $(".h-vedio-box").hover(function() {
    	    $(".h-vedio-box .yinying-bg").hide();
    		$(".h-vedio-box-title").stop().animate({
    			"top": "20px"
    		}, 500)
    	}, function() {
    		 $(".h-vedio-box .yinying-bg").show();
    		$(".h-vedio-box-title").stop().animate({
    			"top": "70px"
    		}, 500)
    	})
    	$(".h-vedio-box").hover(function() {
    		$(".bg_red").stop().animate({
    			"top": "0%"
    		}, 1000)
    	}, function() {
    		$(".bg_red").stop().animate({
    			"top": "100%"
    		}, 1000)
    	})

    	$(".h-vedio-box").hover(function() {
    		$(".text_intro").stop().animate({
    			"margin-top": "40px"
    		}, 500)
    	}, function() {
    		$(".text_intro").stop().animate({
    			"margin-top": "0"
    		}, 500)
    	})

    	$(".h-game-box").hover(function() {
    		$(".new_game").stop().animate({
    			"top": "20px"
    		}, 500)
    	}, function() {
    		$(".new_game").stop().animate({
    			"top": "70px"
    		}, 500)
    	})

    	$(".h-game-box").hover(function() {
    		$(".h-game-box .yinying-bg").hide();
    		$(".new_down").stop().animate({
    			"margin-top": "40px"
    		}, 500)
    	}, function() {
    		$(".h-game-box .yinying-bg").show();
    		$(".new_down").stop().animate({
    			"margin-top": "0"
    		}, 500)
    	})
    	
    	$(".h-game-box").hover(function (){
    		$(".bg_down").stop().animate({
    			"top": "0%"
    		},1000)
    	},function (){
    		$(".bg_down").stop().animate({
    			"top": "100%"
    		},1000)
    	})
})	
//导航fixed
$.fn.fixNav = function(){
	var $nav =$(this),navY = $nav.offset().top,scollY;

	var stickyHandle = function(){
		scollY = $(document).scrollTop();
		if(scollY >= navY){
			$nav.addClass('h-fix');
		}else{
			$nav.removeClass('h-fix');
		}
	}
	$(window).bind("scroll",stickyHandle);
	stickyHandle();
}
//防止连续点击	
$.fn.slider = function(){
	return this.each(function(){
		var $this = $(this);
		var t = $this.find(".hd li").length;
		var e =1/t*100+'%';;
		var ulwidth = $this.find(".hd").css({width:100 * t+'%'});
		$this.find(".hd li").css("width",e);
		var btn = "<a class='preNexts pres' title='上一页'></a><a class='preNexts nexts' title='下一页'></a>";
		$this.append(btn);
		var botBtn = "<div class='botBtn'><i class='botBtn-1'></i><i class='botBtn-2'></i>";
		for(var i = 0; i < t; i++) {
			if(i==0){
				botBtn+="<span class='on'></span>";
			}else{
				botBtn+="<span></span>";
			}
		}
		$this.append(botBtn);
		$this.find(".botBtn").css("margin-left","-"+($this.find(".botBtn").width())/2+"px");
		var n;
		var i=t-1;
		var o=0;
		var a={
			delay:5e3,
			to:function(t1){
				t1>i?t1=0:0>t1&&(t1=i);//当t不存在的时候小于0，t=-1当t超过li总数的时候t初始化为0，当t递减到0的时候t为i
				var c = -t1 * 100+'%';
				$this.find("ul").stop(true, false).animate({"margin-left": c},500,function(){o=t1});
				$this.find(".botBtn span").removeClass("on").eq(t1).addClass("on"); 	
				$this.find(".hd li").removeClass("on-slideimg").eq(t1).addClass("on-slideimg");
				n||(a.stop(),a.play());
			},
			play:function(){
				n=setInterval(function(){a.to(o+1)},2e3|a.delay)
			},
			stop:function(){
				n=clearInterval(n)
			},
			prev:function(){
				hidepretitle();
				a.stop(),a.to(o-1)
			},
			next:function(){
	            hidenexttitle();
				a.stop(),a.to(o+1)
			},
			botn:function(o){
				a.stop(),a.to(o)
			},

		};
		a.play(),
		$this.find(".nexts").on("click",a.next),
		$this.find(".pres").on("click",a.prev),
		$(".pre-title").on("click",a.prev),
		$(".next-title").on("click",a.next);
		function showpretitle(){
			a.stop();
	     $(".on-slideimg .pre-title").stop().animate({
    			"left": "0"
    		}, 500);
		};
		function hidepretitle(){
			 $(".pre-title").stop().animate({
			    			"left": "-210px"
			    		}, 100);
				     $(".on-slideimg .pre-title").stop().animate({
			    			"left": "-170px"
			    		}, 500);
		};
			$this.find(".pre-title").mouseover(function(){
			a.stop();
			showpretitle();
		}),
        $this.find(".pre-title").mouseout(function(){
			a.stop();
			hidepretitle();
		});
	
			function shownexttitle(){
				a.stop();
		     $(".on-slideimg .next-title").stop().animate({
	    			"right": "0"
	    		}, 500);
			};
			function hidenexttitle(){
				 $(".next-title").stop().animate({
			    			"right": "-210px"
			    		}, 100);
					     $(".on-slideimg .next-title").stop().animate({
				    			"right": "-170px"
				    		}, 500);
			};
				$this.find(".next-title").mouseover(function(){
				a.stop();
				shownexttitle();
			}),
	        $this.find(".next-title").mouseout(function(){
				a.stop();
				hidenexttitle();
			}),	
    
		$this.find(".botBtn span").mouseover(function() {
			index = $this.find(".botBtn span").index(this);
			// showPics(index);
			a.botn(index);
		}).eq(0).trigger("mouseover"),
		$this.mouseover(function(){
			a.stop();
		}),
		$this.mouseout(function(){
			a.play();
		});
	})
}
//防止连续点击	
$.fn.joi_slider = function(){
	return this.each(function(){
		var $this = $(this);
		var t = $this.find(".hd li").length;
		var e = $this.find(".hd li").eq(0).outerWidth(!0);
		var ulwidth = $this.find(".hd").css({width:e*t})
        var botBtn = "<div class='botBtn'><i class='botBtn-1'></i><i class='botBtn-2'></i>";
		for(var i = 0; i < t; i++) {
			if(i==0){
				botBtn+="<span class='on'></span>";
				// $(".hd li").addClass("on-slideimg");
			}else{
				botBtn+="<span></span>";
			}
		}
		$this.append(botBtn);
		$this.find(".botBtn").css("margin-left","-"+($this.find(".botBtn").width())/2+"px");
		var n;
		var i=t-1;
		var o=0;
		var a={
			delay:5e3,
			to:function(t1){
				t1>i?t1=0:0>t1&&(t1=i);//当t不存在的时候小于0，t=-1当t超过li总数的时候t初始化为0，当t递减到0的时候t为i
				var c = -e*t1;
				$this.find("ul").stop(true, false).animate({"margin-left": c},500,function(){o=t1});
				$this.find(".botBtn span").removeClass("on").eq(t1).addClass("on"); 	
				$this.find(".hd li").removeClass("on-slideimg").eq(t1).addClass("on-slideimg");
				n||(a.stop(),a.play());
			},
			play:function(){
				n=setInterval(function(){a.to(o+1)},2e3|a.delay)
			},
			stop:function(){
				n=clearInterval(n)
			},
			prev:function(){
				a.stop(),a.to(o-1)
			},
			next:function(){
				a.stop(),a.to(o+1)
			},
			botn:function(o){
				a.stop(),a.to(o)
			}
		};
		a.play(),
		$this.find(".nexts").on("click",a.next),
		$this.find(".pres").on("click",a.prev),
		$this.find(".botBtn span").mouseover(function() {
			 index = $this.find(".botBtn span").index(this);
			// showPics(index);
			a.botn(index);
		 }).eq(0).trigger("mouseover"),
		$this.mouseover(function(){
			a.stop();
		}),
		$this.mouseout(function(){
			a.play();
		});
	})
}
//tab切换
$.fn.tab_switch=function(){
	var $this = $(this);
	return this.each(function(){ //tab导航元素
		if($($this.find(".bd>span")).hasClass("on")){
			var index = $($this.find(".bd>span")).index();
			var rel = $($this.find(".bd>span")).data("font");
			$($this.find(".hd .info").eq(index)).find("h1").html(rel);
		}
		$this.find(".bd>span").click(function(){
			var index=$(this).index();//获取当前划过元素的index值
			if($this.find(".hd .info").eq(index).text()!=""){
				var rel = $(this).data("font");
				$(this).addClass("on").siblings().removeClass("on");//改变当前状态
				$($this.find(".hd .info").eq(index)).find("h1").html(rel);
				$this.find(".hd .info").eq(index).css({"display":"block"}).siblings().css({"display":"none"});//切换内容
			}else{
				alert('暂未开放')
			}
		})
	})
}
//tab切换-ajax
$.fn.tab_sajax=function(){
	var $this = $(this);
	return this.each(function(){ //tab导航元素
		$this.find(".bd>span").click(function(){
			var index=$(this).index();//获取当前划过元素的index值
			if($this.find(".hd .info").eq(index).text()!=""){
				$this.find(".bd>span").eq(index).addClass("on").siblings().removeClass("on");//改变当前状态
				$this.find(".hd .info").eq(index).css({"display":"block"}).siblings(".info").css({"display":"none"});//切换内容
				$this.find("a.more").removeClass("on");
				$this.find(".hd .info").eq(index).siblings(".info").height("300");
			}else{
				alert('暂未开放')
			}
		});
		$(".h-honor-tab a.more").click(function(){
		    if($(this).hasClass("on")){
				$(this).siblings().eq($this.find(".bd>span.on").index()).css("height","300");
				$(this).removeClass("on")				
		    }else{
				$(this).siblings().eq($this.find(".bd>span.on").index()).css("height","auto");
				$(this).addClass("on")
		    }
		})
	})
}

//tab切换pic
$.fn.tab_spic=function(){
	var $this = $(this),t=0;
	return this.each(function(){ //tab导航元素
		var bdli = $this.find(".bd li");
		var bdlil = $this.find(".bd li").length;
		var bdlilpage = Math.ceil(bdlil/7);
		var bdlic = $this.find(".bd .bd-list");
		
		var bdliw = $this.find(".bd .bd-list-c").width()+25;
		bdlic.css("width",bdliw*bdlilpage);
		var hdDiv = $this.find(".hd .info");
		var bdprev = $this.find(".bd .prev");
		var bdnext = $this.find(".bd .next");
		bdli.click(function(){
			var $index = $(this).index();
			hdDiv.eq($index).show().siblings().hide();
			bdli.removeClass("on").eq($index).addClass("on");
		});
		var bdleft = function(obj){
			if(bdlil>7){
				if(obj<0){obj=0;return false}
				var c = -obj*bdliw+'px';
		        if(obj>=bdlilpage){
					return false;
				}else{
					bdlic.animate({"left": c},1000);
					t--;
				}
				obj=t;
	        }else{alert('没有啦')}
		}
		var bdright = function(obj){
			if(bdlil>7){
				var c = -obj*bdliw+'px';
		        if(obj>=bdlilpage){
					return false;
				}else{
					bdlic.animate({"left": c},1000);
					t++;
				}
				obj=t;
	        }else{alert('没有啦')}
		}
		bdprev.click(function(){bdleft(t-1)});
		bdnext.click(function(){bdright(t+1)});
	})
}
//选择卡
$.fn.kaTab = function(){
	return this.each(function(){
		var t=0;
		var $this = $(this);
		$this.find(".h-d-t").hover(function(){
		t!=$this.find(".h-d-t").index($(this));
			5!=$this.find(".h-d-t").index($(this));
			t=$this.find(".h-d-t").index();
			$this.find(".h-d-t").removeClass("cur");
			$(this).addClass("cur")
		});
	})	
};


	//鼠标移动banner上箭头显示
	$(".head-slider").hover(function(){
	
	  	 $(".on-slideimg  .pre-title").stop().animate({
    			"left": "-170px"
    		}, 500);
	  $(".on-slideimg  .next-title").stop().animate({
    			"right": "-170px"
    		}, 500)
	 
	},function(){
	     $(".pre-title").stop().animate({
    			"left": "-210px"
    		}, 500);
	  $(".next-title").stop().animate({
    			"right": "-210px"
    		}, 500)
	}); 
