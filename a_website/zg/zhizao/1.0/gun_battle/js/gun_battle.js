function ZoomPic ()
{
	this.initialize.apply(this, arguments)	
}
ZoomPic.prototype = 
{
	initialize : function (id)
	{
		var _this = this;
		this.wrap = typeof id === "string" ? document.getElementById(id) : id;
		this.oUl = this.wrap.getElementsByTagName("ul")[0];
		this.aLi = this.wrap.getElementsByTagName("li");
		this.prev = this.wrap.getElementsByTagName("pre")[0];
		this.next = this.wrap.getElementsByTagName("pre")[1];
		this.timer = null;
		this.aSort = [];
		this.iCenter = 3;
		this._doPrev = function () {return _this.doPrev.apply(_this)};
		this._doNext = function () {return _this.doNext.apply(_this)};
		this.options = [
//			{width:120, height:150, top:71, left:134, zIndex:1},
//			{width:130, height:170, top:61, left:0, zIndex:2},
//			{width:170, height:218, top:37, left:110, zIndex:3},
//			{width:224, height:288, top:0, left:262, zIndex:4},
//			{width:170, height:218, top:37, left:468, zIndex:3},
//			{width:130, height:170, top:61, left:620, zIndex:2},
//			{width:120, height:150, top:71, left:496, zIndex:1}
            
            {width:312, height:367, top:150, left:-90, zIndex:1},
			{width:392, height:447, top:111, left:0, zIndex:2},
			{width:502, height:557, top:55, left:110, zIndex:3},
			{width:582, height:637, top:18, left:262, zIndex:4},
			{width:502, height:557, top:55, left:495, zIndex:3},
			{width:392, height:447, top:111, left:718, zIndex:2},
			{width:312, height:367, top:150, left:895, zIndex:1}
		];
		for (var i = 0; i < this.aLi.length; i++) this.aSort[i] = this.aLi[i];
		this.aSort.unshift(this.aSort.pop());
		this.setUp();
		this.addEvent(this.prev, "click", this._doPrev);
		this.addEvent(this.next, "click", this._doNext);
		this.doImgClick();		
		this.timer = setInterval(function ()
		{
			_this.doNext()	
		}, 3000);		
		this.wrap.onmouseover = function ()
		{
			clearInterval(_this.timer)	
		};
		this.wrap.onmouseout = function ()
		{
			_this.timer = setInterval(function ()
			{
				_this.doNext()	
			}, 3000);	
		}
	},
	doPrev : function ()
	{
		this.aSort.unshift(this.aSort.pop());
		this.setUp()
	},
	doNext : function ()
	{
		this.aSort.push(this.aSort.shift());
		this.setUp()
	},
	doImgClick : function ()
	{
		var _this = this;
		for (var i = 0; i < this.aSort.length; i++)
		{
			this.aSort[i].onclick = function ()
			{
				if (this.index > _this.iCenter)
				{
					for (var i = 0; i < this.index - _this.iCenter; i++) _this.aSort.push(_this.aSort.shift());
					_this.setUp()
				}
				else if(this.index < _this.iCenter)
				{
					for (var i = 0; i < _this.iCenter - this.index; i++) _this.aSort.unshift(_this.aSort.pop());
					_this.setUp()
				}
			}
		}
	},
	setUp : function ()
	{
		var _this = this;
		var i = 0;
		for (i = 0; i < this.aSort.length; i++) this.oUl.appendChild(this.aSort[i]);
		for (i = 0; i < this.aSort.length; i++)
		{
			this.aSort[i].index = i;
			if (i < 7)
			{
				this.css(this.aSort[i], "display", "block");
				this.doMove(this.aSort[i], this.options[i], function ()
				{
					_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {opacity:100}, function ()
					{
						_this.doMove(_this.aSort[_this.iCenter].getElementsByTagName("img")[0], {opacity:100}, function ()
						{
							_this.aSort[_this.iCenter].onmouseover = function ()
							{
								_this.doMove(this.getElementsByTagName("div")[0], {bottom:0})
							};
							_this.aSort[_this.iCenter].onmouseout = function ()
							{
								_this.doMove(this.getElementsByTagName("div")[0], {bottom:-100})
							}
						})
					})
				});
			}
			else
			{
				this.css(this.aSort[i], "display", "none");
				this.css(this.aSort[i], "width", 0);
				this.css(this.aSort[i], "height", 0);
				this.css(this.aSort[i], "top", 37);
				this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2)
			}
			if (i < this.iCenter || i > this.iCenter)
			{
				this.css(this.aSort[i].getElementsByTagName("img")[0], "opacity", 30)
				this.aSort[i].onmouseover = function ()
				{
					_this.doMove(this.getElementsByTagName("img")[0], {opacity:100})	
				};
				this.aSort[i].onmouseout = function ()
				{
					_this.doMove(this.getElementsByTagName("img")[0], {opacity:35})
				};
				this.aSort[i].onmouseout();
			}
			else
			{
				this.aSort[i].onmouseover = this.aSort[i].onmouseout = null
			}
		}		
	},
	addEvent : function (oElement, sEventType, fnHandler)
	{
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
	},
	css : function (oElement, attr, value)
	{
		if (arguments.length == 2)
		{
			return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr]
		}
		else if (arguments.length == 3)
		{
			switch (attr)
			{
				case "width":
				case "height":
				case "top":
				case "left":
				case "bottom":
					oElement.style[attr] = value + "px";
					break;
//				case "opacity" :
//					oElement.style.filter = "alpha(opacity=" + value + ")";
//					oElement.style.opacity = value / 100;
//					break;
				default :
					oElement.style[attr] = value;
					break
			}	
		}
	},
	doMove : function (oElement, oAttr, fnCallBack)
	{
		var _this = this;
		clearInterval(oElement.timer);
		oElement.timer = setInterval(function ()
		{
			var bStop = true;
			for (var property in oAttr)
			{
				var iCur = parseFloat(_this.css(oElement, property));
				property == "opacity" && (iCur = parseInt(iCur.toFixed(2) * 100));
				var iSpeed = (oAttr[property] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				
				if (iCur != oAttr[property])
				{
					bStop = false;
					_this.css(oElement, property, iCur + iSpeed)
				}
			}
			if (bStop)
			{
				clearInterval(oElement.timer);
				fnCallBack && fnCallBack.apply(_this, arguments)	
			}
		}, 30)
	}
};
window.onload = function ()
{
	new ZoomPic("box");
};

/**浠庡乏鍒板彸**/
$(function () {             
            //缁戝畾婊氬姩鏉′簨浠� 
              //缁戝畾婊氬姩鏉′簨浠� 
            $(window).bind("scroll", function () { 
                var sTop = $(window).scrollTop(); 
                var sTop = parseInt(sTop); 
                if (sTop >= 1900) { 
                    if (!$("#scrollSearchDiv").is(":visible")) { 
                        try { 
                            $("#scrollSearchDiv").animate({left:'36%'},"slow").fadeIn("5000");
                        } catch (e) { 
                            $("#scrollSearchDiv").show(); 
                        }                       
                    } 
                } 
                else { 
                    if ($("#scrollSearchDiv").is(":visible")) { 
                        try { 
                            $("#scrollSearchDiv").animate({left:'36%'},"slow").fadeIn("5000"); 
                        } catch (e) { 
                            $("#scrollSearchDiv").hide(); 
                        }                        
                    } 
                }  
            }); 
        }) 
/**瑙掕壊閫夋嫨**/
$(function(){
	$('#owl-demo').owlCarousel({
		items: 1,
		singleItem:true,
		navigation: true,
		navigationText: ["涓婁竴涓�","涓嬩竴涓�"],
		autoPlay: true,
		stopOnHover: true,
		paginationSpeed:0,
		slideSpeed:0,
		rewindSpeed:0,
		addClassActive:true,
		responsiveRefreshRate:200,
		afterInit: function(){
			var $t = $('.owl-pagination span');
			$t.each(function(i){
				$(this).before('<img src="http://dev.static.yingxiong.com/zhizao/1.0/gun_battle/images/t' + (i+1) + '.png">');
			})
		}
	});
	var screenwidth=$(window).width();
	if(screenwidth<1400){
		$(".owl-prev,.owl-next").hide()
	}else{
		$(".owl-prev,.owl-next").show()
	}
	

	var _NavAy = [];
	$(".left-menu li[data-scroll-nav]").each(function(e,i){
		var s=$(i),
		r=s.attr("data-scroll-nav");
		a=$("[data-scroll-index="+r+"]"),
		c=a.offset().top,
		l=c+a.outerHeight();
		_NavAy.push({s:r,t:c,b:l,i:s,el:a}),
		s.on("click",function(e){
			var $n = $(e.target).attr("data-scroll-nav"),
			$a=$("[data-scroll-index="+$n+"]"),
			$c=$a.offset().top-100;
			n = $(window).scrollTop();
			$("html,body").stop().animate({ scrollTop:$c+"px" },300);
			$(e.target).addClass("right_act").siblings().removeClass("right_act");
		})
	});

	$(window).on("scroll",function(){
		e=$(window).scrollTop()-100;
		h=$(window).height();
		for(var i in _NavAy){
			var a=parseInt(i);
			if((_NavAy[a].t-h/2)<e){
				var ab = a;
			}
		}
		$("html,body").is(":animated")?"":$("[data-scroll-nav='"+ab+"']").addClass("right_act").siblings().removeClass("right_act");
	}).scroll();
});

$(".left-menu ul li").click(function(){
    $(this).addClass('right_act').siblings().removeClass('right_act');
})
$(".screen-img li").click(function(){
    $(this).addClass('b_src_act').siblings().removeClass('b_src_act');
})

$(".b_screen ul li").mouseover(function(){
    $(this).addClass('b_src_act').siblings().removeClass('b_src_act');
})
//$(".screen-img li").click(function(){
//     if($('span').hasClass('sp1')){
//         $('span').addClass('sp_a');
//    }else if($('span').hasClass('sp2')){
//         $('span').addClass('sp_b');
//    }else{
//         $('span').addClass('sp_c');
//    }
//})

/*閿氱偣閾炬帴*/
// $('#next').click(function () {
// $('#gun_1').animate({
// scrollTop: $($.attr(this, 'href')).offset().top
// }, 500);
// return false;
// });



