//TouchSlide
var TouchSlide=function(a){a=a||{};var b={slideCell:a.slideCell||"#touchSlide",titCell:a.titCell||".hd li",mainCell:a.mainCell||".bd",effect:a.effect||"left",autoPlay:a.autoPlay||!1,delayTime:a.delayTime||200,interTime:a.interTime||2500,defaultIndex:a.defaultIndex||0,titOnClassName:a.titOnClassName||"on",autoPage:a.autoPage||!1,prevCell:a.prevCell||".prev",nextCell:a.nextCell||".next",pageStateCell:a.pageStateCell||".pageState",pnLoop:"undefined "==a.pnLoop?!0:a.pnLoop,startFun:a.startFun||null,endFun:a.endFun||null,switchLoad:a.switchLoad||null},c=document.getElementById(b.slideCell.replace("#",""));if(!c)return!1;var d=function(a,b){a=a.split(" ");var c=[];b=b||document;var d=[b];for(var e in a)0!=a[e].length&&c.push(a[e]);for(var e in c){if(0==d.length)return!1;var f=[];for(var g in d)if("#"==c[e][0])f.push(document.getElementById(c[e].replace("#","")));else if("."==c[e][0])for(var h=d[g].getElementsByTagName("*"),i=0;i<h.length;i++){var j=h[i].className;j&&-1!=j.search(new RegExp("\\b"+c[e].replace(".","")+"\\b"))&&f.push(h[i])}else for(var h=d[g].getElementsByTagName(c[e]),i=0;i<h.length;i++)f.push(h[i]);d=f}return 0==d.length||d[0]==b?!1:d},e=function(a,b){var c=document.createElement("div");c.innerHTML=b,c=c.children[0];var d=a.cloneNode(!0);return c.appendChild(d),a.parentNode.replaceChild(c,a),m=d,c},g=function(a,b){!a||!b||a.className&&-1!=a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className+=(a.className?" ":"")+b)},h=function(a,b){!a||!b||a.className&&-1==a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className=a.className.replace(new RegExp("\\s*\\b"+b+"\\b","g"),""))},i=b.effect,j=d(b.prevCell,c)[0],k=d(b.nextCell,c)[0],l=d(b.pageStateCell)[0],m=d(b.mainCell,c)[0];if(!m)return!1;var N,O,n=m.children.length,o=d(b.titCell,c),p=o?o.length:n,q=b.switchLoad,r=parseInt(b.defaultIndex),s=parseInt(b.delayTime),t=parseInt(b.interTime),u="false"==b.autoPlay||0==b.autoPlay?!1:!0,v="false"==b.autoPage||0==b.autoPage?!1:!0,w="false"==b.pnLoop||0==b.pnLoop?!1:!0,x=r,y=null,z=null,A=null,B=0,C=0,D=0,E=0,G=/hp-tablet/gi.test(navigator.appVersion),H="ontouchstart"in window&&!G,I=H?"touchstart":"mousedown",J=H?"touchmove":"",K=H?"touchend":"mouseup",M=m.parentNode.clientWidth,P=n;if(0==p&&(p=n),v){p=n,o=o[0],o.innerHTML="";var Q="";if(1==b.autoPage||"true"==b.autoPage)for(var R=0;p>R;R++)Q+="<li>"+(R+1)+"</li>";else for(var R=0;p>R;R++)Q+=b.autoPage.replace("$",R+1);o.innerHTML=Q,o=o.children}"leftLoop"==i&&(P+=2,m.appendChild(m.children[0].cloneNode(!0)),m.insertBefore(m.children[n-1].cloneNode(!0),m.children[0])),N=e(m,'<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'),m.style.cssText="width:"+P*M+"px;"+"position:relative;overflow:hidden;padding:0;margin:0;";for(var R=0;P>R;R++)m.children[R].style.cssText="display:table-cell;vertical-align:top;width:"+M+"px";var S=function(){"function"==typeof b.startFun&&b.startFun(r,p)},T=function(){"function"==typeof b.endFun&&b.endFun(r,p)},U=function(a){var b=("leftLoop"==i?r+1:r)+a,c=function(a){for(var b=m.children[a].getElementsByTagName("img"),c=0;c<b.length;c++)b[c].getAttribute(q)&&(b[c].setAttribute("src",b[c].getAttribute(q)),b[c].removeAttribute(q))};if(c(b),"leftLoop"==i)switch(b){case 0:c(n);break;case 1:c(n+1);break;case n:c(0);break;case n+1:c(1)}},V=function(){M=N.clientWidth,m.style.width=P*M+"px";for(var a=0;P>a;a++)m.children[a].style.width=M+"px";var b="leftLoop"==i?r+1:r;W(-b*M,0)};window.addEventListener("resize",V,!1);var W=function(a,b,c){c=c?c.style:m.style,c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms",c.webkitTransform="translate("+a+"px,0)"+"translateZ(0)",c.msTransform=c.MozTransform=c.OTransform="translateX("+a+"px)"},X=function(a){switch(i){case"left":r>=p?r=a?r-1:0:0>r&&(r=a?0:p-1),null!=q&&U(0),W(-r*M,s),x=r;break;case"leftLoop":null!=q&&U(0),W(-(r+1)*M,s),-1==r?(z=setTimeout(function(){W(-p*M,0)},s),r=p-1):r==p&&(z=setTimeout(function(){W(-M,0)},s),r=0),x=r}S(),A=setTimeout(function(){T()},s);for(var c=0;p>c;c++)h(o[c],b.titOnClassName),c==r&&g(o[c],b.titOnClassName);0==w&&(h(k,"nextStop"),h(j,"prevStop"),0==r?g(j,"prevStop"):r==p-1&&g(k,"nextStop")),l&&(l.innerHTML="<span>"+(r+1)+"</span>/"+p)};if(X(),u&&(y=setInterval(function(){r++,X()},t)),o)for(var R=0;p>R;R++)!function(){var a=R;o[a].addEventListener("click",function(){clearTimeout(z),clearTimeout(A),r=a,X()})}();k&&k.addEventListener("click",function(){(1==w||r!=p-1)&&(clearTimeout(z),clearTimeout(A),r++,X())}),j&&j.addEventListener("click",function(){(1==w||0!=r)&&(clearTimeout(z),clearTimeout(A),r--,X())});var Y=function(a){clearTimeout(z),clearTimeout(A),O=void 0,D=0;var b=H?a.touches[0]:a;B=b.pageX,C=b.pageY,m.addEventListener(J,Z,!1),m.addEventListener(K,$,!1)},Z=function(a){if(!H||!(a.touches.length>1||a.scale&&1!==a.scale)){var b=H?a.touches[0]:a;if(D=b.pageX-B,E=b.pageY-C,"undefined"==typeof O&&(O=!!(O||Math.abs(D)<Math.abs(E))),!O){switch(a.preventDefault(),u&&clearInterval(y),i){case"left":(0==r&&D>0||r>=p-1&&0>D)&&(D=.4*D),W(-r*M+D,0);break;case"leftLoop":W(-(r+1)*M+D,0)}null!=q&&Math.abs(D)>M/3&&U(D>-0?-1:1)}}},$=function(a){0!=D&&(a.preventDefault(),O||(Math.abs(D)>M/10&&(D>0?r--:r++),X(!0),u&&(y=setInterval(function(){r++,X()},t))),m.removeEventListener(J,Z,!1),m.removeEventListener(K,$,!1))};m.addEventListener(I,Y,!1)};


function autoScroll(obj,dis){  
	$(obj).find("ul").animate({  
		marginTop : dis  
	},500,function(){  
		$(this).css({marginTop : "0px"}).find("li:first").appendTo(this); 
	})  
}
$(function(){
    $('html').fitText(2);

    //  视频播放弹层  
    $(".i-m1-video,.i-v-list li a,.i-m11-con li a").click(function(){
		var link_url = $('.i-m1-video').attr('data-id');
		var rel = $(this).attr('data-id');
		if(rel){
			$("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
		}
		$("#video_tck").show();
        $("#mask").show();
    })
    $("#close").click(function(){
        $("#video_tck").hide();
        $("#mask").hide();
        $('.vid_sp').trigger('pause');
    })
    // 下拉菜单
    var flag = 1;
    $(".list").on("touchstart",function(){
        if (flag == 1){
            $(".list-con").show();
            flag = 0;
        } else{
            $(".list-con").hide();
            flag = 1;
        }
    })


	// newsTab
	$(".i-m3-news-nav ul li").mouseover(function(){
	var index=$(this).index();
	$(this).find("span").addClass("i-m3-on").end().siblings().find("span").removeClass("i-m3-on");
	$(".i-m3-inf").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
    // 攻略Tab
    $(".i-m5-nav li").mouseover(function(){
    var index=$(this).index();
    $(this).find("span").addClass("i-m5-on").end().siblings().find("span").removeClass("i-m5-on");
    $(".i-m5-inf ul").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
    })

	// 实时新闻滚动
	$(".i-m3-newinf").hover(function(){
		clearInterval(time1);
	},function(){
		time1 = setInterval('autoScroll(".i-m3-newinfcon","-1.52rem")',3000);
	}).trigger("mouseleave");

	// 首页轮播
	var index = 0;
	$(".i-m4-lb-box ul li").eq(0).css({"display":"block","opacity":"1"})
    $(".i-lb-nav ul li").click(function(){
    	index = $(this).index();
    	move(index);
    	if (index == 3){
    		index = 0;
    	}else{
    		index += 1;
    	}
    	console.log(index)
    })
    function move(index){
        var aaa = 4.633*index+"rem";
    	$(".i-lb-scrollbar").animate({
    		left : aaa
    	},500);
    	$(".i-m4-lb-box ul").children("li").css("opacity","0")
    	$(".i-m4-lb-box ul li").eq(index).css("display","block").animate({
    		opacity : 1
    	},500)
    }
    $(".i-m4-lb").hover(function(){
    	clearInterval(time);
    },function(){
    	time = setInterval(function(){
        	move(index);
        	index++;
        	if (index >= 4){
        		index = 0;
        	}
        },3000)
    })
    function start(){
    	index = 1;
    	time = setInterval(function(){
        	move(index);
        	index++;
        	if (index >= 4){
        		index = 0;
        	}
        },3000)
    }
    start();
    $(".i-lb-nav ul li img").each(function(i){
        this.src = $(".i-m4-lb-box ul li img").eq(i).attr("src");
    })

    // 枪械Tab
	$(".i-m7-nav li").click(function(){
	var index=$(this).index();
	$(this).find("span").addClass("i-m7-on").end().siblings().find("span").removeClass("i-m7-on");
	$(".i-m7-infcon ul").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	});
	//枪械轮播介绍
	$(".list-qx-hd").find("img").attr("src",$("#list-qx-bd .bd li").eq(0).find("img").data("src"));
	$("#list-qx-bd .bd li").each(function(i){ $("#list-qx-bd .bd li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});
	TouchSlide({slideCell:"#list-qx-bd",pnLoop:"false"});
    $("#list-qx-bd .bd li").click(function(){
		$(this).addClass("on").siblings().removeClass("on").end().parent().siblings().find("li").removeClass("on")
		var _src=$(this).find("img").data("src");
		$(".list-qx-hd").html('<img src="'+_src+'" alt="">');
	});
	//佣兵轮播介绍
	$(".list-yb-hd").find("img").attr("src",$("#list-yb-bd .bd li").eq(0).find("img").data("src"));
	$("#list-yb-bd .bd li").each(function(i){ $("#list-yb-bd .bd li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});
	TouchSlide({slideCell:"#list-yb-bd",pnLoop:"false"});
    $("#list-yb-bd .bd li").click(function(){
		$(this).addClass("on").siblings().removeClass("on").end().parent().siblings().find("li").removeClass("on")
		var _src=$(this).find("img").data("src");
		$(".list-yb-hd").html('<img src="'+_src+'" alt="">');
	});

    // 佣兵Tab
    $(".i-m6-nav ul li").click(function(){
        var index=$(this).index();
        $(this).find("span").addClass("i-m6-on").end().siblings().find("span").removeClass("i-m6-on");
        $(".i-m6-nav ul li").each(function(i){
            $(this).css("background","url(http://dev.static.yingxiong.com/qtdl/2.0/common/images/i_m3_ico"+(i+1)+".png)")
            $(this).css("background-size","100% 100%")
        })
        $(this).css("background","url(http://dev.static.yingxiong.com/qtdl/2.0/common/images/i_m3_ico"+(index+1)+"1.png)")
        $(this).css("background-size","100% 100%")
        $(".i-m6-con ul").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
    })



})