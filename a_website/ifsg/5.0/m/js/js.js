//TouchSlide
var TouchSlide = function(a) { a = a || {}; var b = { slideCell: a.slideCell || "#touchSlide", titCell: a.titCell || ".hd li", mainCell: a.mainCell || ".bd", effect: a.effect || "left", autoPlay: a.autoPlay || !1, delayTime: a.delayTime || 200, interTime: a.interTime || 2500, defaultIndex: a.defaultIndex || 0, titOnClassName: a.titOnClassName || "on", autoPage: a.autoPage || !1, prevCell: a.prevCell || ".prev", nextCell: a.nextCell || ".next", pageStateCell: a.pageStateCell || ".pageState", pnLoop: "undefined " == a.pnLoop ? !0 : a.pnLoop, startFun: a.startFun || null, endFun: a.endFun || null, switchLoad: a.switchLoad || null },
		c = document.getElementById(b.slideCell.replace("#", "")); if(!c) return !1; var d = function(a, b) { a = a.split(" "); var c = [];
			b = b || document; var d = [b]; for(var e in a) 0 != a[e].length && c.push(a[e]); for(var e in c) { if(0 == d.length) return !1; var f = []; for(var g in d)
					if("#" == c[e][0]) f.push(document.getElementById(c[e].replace("#", "")));
					else if("." == c[e][0])
					for(var h = d[g].getElementsByTagName("*"), i = 0; i < h.length; i++) { var j = h[i].className;
						j && -1 != j.search(new RegExp("\\b" + c[e].replace(".", "") + "\\b")) && f.push(h[i]) } else
						for(var h = d[g].getElementsByTagName(c[e]), i = 0; i < h.length; i++) f.push(h[i]);
				d = f } return 0 == d.length || d[0] == b ? !1 : d },
		e = function(a, b) { var c = document.createElement("div");
			c.innerHTML = b, c = c.children[0]; var d = a.cloneNode(!0); return c.appendChild(d), a.parentNode.replaceChild(c, a), m = d, c },
		g = function(a, b) {!a || !b || a.className && -1 != a.className.search(new RegExp("\\b" + b + "\\b")) || (a.className += (a.className ? " " : "") + b) },
		h = function(a, b) {!a || !b || a.className && -1 == a.className.search(new RegExp("\\b" + b + "\\b")) || (a.className = a.className.replace(new RegExp("\\s*\\b" + b + "\\b", "g"), "")) },
		i = b.effect,
		j = d(b.prevCell, c)[0],
		k = d(b.nextCell, c)[0],
		l = d(b.pageStateCell)[0],
		m = d(b.mainCell, c)[0]; if(!m) return !1; var N, O, n = m.children.length,
		o = d(b.titCell, c),
		p = o ? o.length : n,
		q = b.switchLoad,
		r = parseInt(b.defaultIndex),
		s = parseInt(b.delayTime),
		t = parseInt(b.interTime),
		u = "false" == b.autoPlay || 0 == b.autoPlay ? !1 : !0,
		v = "false" == b.autoPage || 0 == b.autoPage ? !1 : !0,
		w = "false" == b.pnLoop || 0 == b.pnLoop ? !1 : !0,
		x = r,
		y = null,
		z = null,
		A = null,
		B = 0,
		C = 0,
		D = 0,
		E = 0,
		G = /hp-tablet/gi.test(navigator.appVersion),
		H = "ontouchstart" in window && !G,
		I = H ? "touchstart" : "mousedown",
		J = H ? "touchmove" : "",
		K = H ? "touchend" : "mouseup",
		M = m.parentNode.clientWidth,
		P = n; if(0 == p && (p = n), v) { p = n, o = o[0], o.innerHTML = ""; var Q = ""; if(1 == b.autoPage || "true" == b.autoPage)
			for(var R = 0; p > R; R++) Q += "<li>" + (R + 1) + "</li>";
		else
			for(var R = 0; p > R; R++) Q += b.autoPage.replace("$", R + 1);
		o.innerHTML = Q, o = o.children } "leftLoop" == i && (P += 2, m.appendChild(m.children[0].cloneNode(!0)), m.insertBefore(m.children[n - 1].cloneNode(!0), m.children[0])), N = e(m, '<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'), m.style.cssText = "width:" + P * M + "px;" + "position:relative;overflow:hidden;padding:0;margin:0;"; for(var R = 0; P > R; R++) m.children[R].style.cssText = "display:table-cell;vertical-align:top;width:" + M + "px"; var S = function() { "function" == typeof b.startFun && b.startFun(r, p) },
		T = function() { "function" == typeof b.endFun && b.endFun(r, p) },
		U = function(a) { var b = ("leftLoop" == i ? r + 1 : r) + a,
				c = function(a) { for(var b = m.children[a].getElementsByTagName("img"), c = 0; c < b.length; c++) b[c].getAttribute(q) && (b[c].setAttribute("src", b[c].getAttribute(q)), b[c].removeAttribute(q)) }; if(c(b), "leftLoop" == i) switch(b) {
				case 0:
					c(n); break;
				case 1:
					c(n + 1); break;
				case n:
					c(0); break;
				case n + 1:
					c(1) } },
		V = function() { M = N.clientWidth, m.style.width = P * M + "px"; for(var a = 0; P > a; a++) m.children[a].style.width = M + "px"; var b = "leftLoop" == i ? r + 1 : r;
			W(-b * M, 0) };
	window.addEventListener("resize", V, !1); var W = function(a, b, c) { c = c ? c.style : m.style, c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms", c.webkitTransform = "translate(" + a + "px,0)" + "translateZ(0)", c.msTransform = c.MozTransform = c.OTransform = "translateX(" + a + "px)" },
		X = function(a) { switch(i) {
				case "left":
					r >= p ? r = a ? r - 1 : 0 : 0 > r && (r = a ? 0 : p - 1), null != q && U(0), W(-r * M, s), x = r; break;
				case "leftLoop":
					null != q && U(0), W(-(r + 1) * M, s), -1 == r ? (z = setTimeout(function() { W(-p * M, 0) }, s), r = p - 1) : r == p && (z = setTimeout(function() { W(-M, 0) }, s), r = 0), x = r } S(), A = setTimeout(function() { T() }, s); for(var c = 0; p > c; c++) h(o[c], b.titOnClassName), c == r && g(o[c], b.titOnClassName);
			0 == w && (h(k, "nextStop"), h(j, "prevStop"), 0 == r ? g(j, "prevStop") : r == p - 1 && g(k, "nextStop")), l && (l.innerHTML = "<span>" + (r + 1) + "</span>/" + p) }; if(X(), u && (y = setInterval(function() { r++, X() }, t)), o)
		for(var R = 0; p > R; R++) ! function() { var a = R;
			o[a].addEventListener("click", function() { clearTimeout(z), clearTimeout(A), r = a, X() }) }();
	k && k.addEventListener("click", function() {
		(1 == w || r != p - 1) && (clearTimeout(z), clearTimeout(A), r++, X()) }), j && j.addEventListener("click", function() {
		(1 == w || 0 != r) && (clearTimeout(z), clearTimeout(A), r--, X()) }); var Y = function(a) { clearTimeout(z), clearTimeout(A), O = void 0, D = 0; var b = H ? a.touches[0] : a;
			B = b.pageX, C = b.pageY, m.addEventListener(J, Z, !1), m.addEventListener(K, $, !1) },
		Z = function(a) { if(!H || !(a.touches.length > 1 || a.scale && 1 !== a.scale)) { var b = H ? a.touches[0] : a; if(D = b.pageX - B, E = b.pageY - C, "undefined" == typeof O && (O = !!(O || Math.abs(D) < Math.abs(E))), !O) { switch(a.preventDefault(), u && clearInterval(y), i) {
						case "left":
							(0 == r && D > 0 || r >= p - 1 && 0 > D) && (D = .4 * D), W(-r * M + D, 0); break;
						case "leftLoop":
							W(-(r + 1) * M + D, 0) } null != q && Math.abs(D) > M / 3 && U(D > -0 ? -1 : 1) } } },
		$ = function(a) { 0 != D && (a.preventDefault(), O || (Math.abs(D) > M / 10 && (D > 0 ? r-- : r++), X(!0), u && (y = setInterval(function() { r++, X() }, t))), m.removeEventListener(J, Z, !1), m.removeEventListener(K, $, !1)) };
	m.addEventListener(I, Y, !1) };
//faskclick
! function() { "use strict";

	function t(e, o) {
		function i(t, e) { return function() { return t.apply(e, arguments) } } var r; if(o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) { for(var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; u > s; s++) c[a[s]] = i(c[a[s]], c);
			n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) { var i = Node.prototype.removeEventListener; "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o) }, e.addEventListener = function(t, n, o) { var i = Node.prototype.addEventListener; "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) { t.propagationStopped || n(t) }), o) : i.call(e, t, n, o) }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) { r(t) }, !1), e.onclick = null) } } var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
		n = navigator.userAgent.indexOf("Android") > 0 && !e,
		o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
		i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
		r = o && /OS [6-7]_\d/.test(navigator.userAgent),
		a = navigator.userAgent.indexOf("BB10") > 0;
	t.prototype.needsClick = function(t) { switch(t.nodeName.toLowerCase()) {
			case "button":
			case "select":
			case "textarea":
				if(t.disabled) return !0; break;
			case "input":
				if(o && "file" === t.type || t.disabled) return !0; break;
			case "label":
			case "iframe":
			case "video":
				return !0 } return /\bneedsclick\b/.test(t.className) }, t.prototype.needsFocus = function(t) { switch(t.nodeName.toLowerCase()) {
			case "textarea":
				return !0;
			case "select":
				return !n;
			case "input":
				switch(t.type) {
					case "button":
					case "checkbox":
					case "file":
					case "image":
					case "radio":
					case "submit":
						return !1 } return !t.disabled && !t.readOnly;
			default:
				return /\bneedsfocus\b/.test(t.className) } }, t.prototype.sendClick = function(t, e) { var n, o;
		document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n) }, t.prototype.determineEventType = function(t) { return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click" }, t.prototype.focus = function(t) { var e;
		o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus() }, t.prototype.updateScrollParent = function(t) { var e, n; if(e = t.fastClickScrollParent, !e || !e.contains(t)) { n = t;
			do { if(n.scrollHeight > n.offsetHeight) { e = n, t.fastClickScrollParent = n; break } n = n.parentElement } while (n) } e && (e.fastClickLastScrollTop = e.scrollTop) }, t.prototype.getTargetElementFromEventTarget = function(t) { return t.nodeType === Node.TEXT_NODE ? t.parentNode : t }, t.prototype.onTouchStart = function(t) { var e, n, r; if(t.targetTouches.length > 1) return !0; if(e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) { if(r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0; if(!i) { if(n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
				this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e) } } return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0 }, t.prototype.touchHasMoved = function(t) { var e = t.changedTouches[0],
			n = this.touchBoundary; return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1 }, t.prototype.onTouchMove = function(t) { return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0 }, t.prototype.findControl = function(t) { return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, t.prototype.onTouchEnd = function(t) { var e, a, c, s, u, l = this.targetElement; if(!this.trackingClick) return !0; if(t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0; if(t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0; if(this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) { if(e = this.findControl(l)) { if(this.focus(l), n) return !1;
				l = e } } else if(this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1); return o && !i && (s = l.fastClickScrollParent, s && s.fastClickLastScrollTop !== s.scrollTop) ? !0 : (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1) }, t.prototype.onTouchCancel = function() { this.trackingClick = !1, this.targetElement = null }, t.prototype.onMouse = function(t) { return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0 }, t.prototype.onClick = function(t) { var e; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e) }, t.prototype.destroy = function() { var t = this.layer;
		n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1) }, t.notNeeded = function(t) { var e, o, i, r; if("undefined" == typeof window.ontouchstart) return !0; if(o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if(!n) return !0; if(e = document.querySelector("meta[name=viewport]")) { if(-1 !== e.content.indexOf("user-scalable=no")) return !0; if(o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0 } } if(a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) { if(-1 !== e.content.indexOf("user-scalable=no")) return !0; if(document.documentElement.scrollWidth <= window.outerWidth) return !0 } return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1) }, t.attach = function(e, n) { return new t(e, n) }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() { return t }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t }();

$(function() {
	$('html').fitText(2);
	FastClick.attach(document.body);

	//  视频播放弹层  
	$(".m-video").on("click", function() {
		var rel = $(this).attr('data-id');
		if(rel) {
			$("#iframe_btn").attr("src", "/video/videoSource.html?" + rel);
			$("#video_tck").show();
			$("#mask").show();
			//兼容安卓延时获取iframe子元素高度来
			setTimeout(function() { $("#iframe_btn").css("height", window.frames['iframe_btn'].dHeight) }, 100);
		}
	});
	$("#close").on("click", function() {
		$("#video_tck").hide();
		$("#mask").hide();
		$('.vid_sp').trigger('pause');
	});

	TouchSlide({
		slideCell: "#sec2-slider",
		titCell: ".hd ul",
		mainCell: ".bd ul",
		effect: "leftLoop",
		autoPage: true,
		autoPlay: true
	});
	TouchSlide({
		slideCell: "#sec2-qie",
		mainCell: ".bd ul",
		effect: "leftLoop",
		interTime: '3000',
		autoPlay: true,
		startFun: function(i, c) {
			var npic = $("#sec2-qie .bd li").eq(i + 2).find("img").data("npic");
			var ppic = $("#sec2-qie .bd li").eq(i + 1).find("img").data("npic");
			$("#sec2-qie span.nextoff").html('<img src=' + npic + '>');
			$("#sec2-qie span.prevoff").html('<img src=' + ppic + '>');

		}
	});
	$(".sec2-tab .hd span").each(function() {
		$(this).on("click", function() {
			var _index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parents(".sec2-tab").find(".bd ul").eq(_index).show().siblings().hide();
		})
	});
	$(".m-gift").on("touchstart", function() {
		$("body").on("touchmove", false);
		$("#mask").show();
		$(".mode-gift").show();
	});
	$(".gift-close").on("click", function() {
		$(".mode-gift").hide();
		$("#mask").hide();
		$("body").off("touchmove", false);
	});
	// $(".sec2-s-chart").on("click",function(e){
	// $("#mask").show();
	// $(".we-chart-box").show();
	// });
	// $(".we-chart-box").on("touchstart",function(e){
	// $(".we-chart-box").hide();
	// $("#mask").hide();
	// });
	// $(".we-chart").on("touchstart",function(e){
	// e.stopPropagation()
	// });
	$("#contact").click(function(e) {
		e.stopPropagation();
		$("#mask").show();
		$(".contact-mode").show();
		$("body").on("touchmove", false);
	});
	$("#mask").click(function(e) {
		$("#mask").hide();
		$(".contact-mode").hide();
		$("body").off("touchmove", false);
	})

	$.ajax({
		type: "GET",
		url: "/json/txt.json",
		dataType: "json",
		success: function(data) {
			// console.log(data[0]['list'].length)
			var html = "";
			for(var i = 0; i < data[0]['list'].length; i++) {
				//  console.log(data[0]['list'][i])
				html += '<div class="swiper-slide"  data-src="' + data[0]['list'][i]['attrpic'] + '">';
				html += '<div class="wj_about fl">';
				html += '<img src="' + data[0]['list'][i]['image'] + '" alt="" class="wj_img">';
				html += '<img src="' + data[0]['list'][i]['name'] + '" alt="" class="wj_name">';
				html += '<ul class="wj_power">';
				for(var ii = 0; ii < data[0]['list'][i]['type'].length; ii++) {
					html += '<li>' + data[0]['list'][i]['type'][ii]['tname'] + '<span><em style="width:' + data[0]['list'][i]['type'][ii]['twidth'] + '"></em></span></li>';
				}
				html += '</ul>';
				html += '<dl class="wj_skill clearfix">';
				html += '<dt>技能</dt>';
				for(var iii = 0; iii < data[0]['list'][i]['skill'].length; iii++) {
					html += '<dd class="' + (iii === 0 ? "on" : "") + '" altr="' + data[0]['list'][i]['skill'][iii]['scon'] + '" alt="' + data[0]['list'][i]['skill'][iii]['sname'] + '"><img src="' + data[0]['list'][i]['skill'][iii]['s_img'] + '"  /><i></i></dd>';
				}
				html += '</dl>';
				html += '<div class="wj_skill_txt">';
				html += '<p><span></span><span></span></p>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			}
			$(".gallery-top .swiper-wrapper").html(html);

			var g = 0,
				y = 0,
				m = "",
				_ = $(".gallery-top .swiper-slide"),
				d = _.length,
				t;
			var mySwipera = new Swiper('.gallery-top', {

				prevButton: '.swiper-prev',
				nextButton: '.swiper-next',
				pagination: '.swiper-pagination',
				paginationClickable: true,
				paginationBulletRender: function(swiper, index, className) {
					return '<span class="' + className + '"><img src="' + $(".gallery-top .swiper-slide").eq(index).attr('data-src') + '" style="width:100%;height:100%"></span>';
				},
				onInit: function() {
					var e1 = $(".swiper-pagination .swiper-pagination-bullet-active").index();
					$(".swiper-slide").eq(0).find(".wj_skill_txt").find("span").eq(0).html($($(".swiper-slide").eq(0).find("dd.on")).attr("alt"));
					$(".swiper-slide").eq(0).find(".wj_skill_txt").find("span").eq(1).html($($(".swiper-slide").eq(0).find("dd.on")).attr("altr"));
					$("body").on('click', '.wj_skill dd', function() {
						var index = $(this).index() - 1;
						$(this).addClass("on").siblings().removeClass("on");
						$(".swiper-slide").eq(e1).find(".wj_skill_txt").find("span").eq(0).html($(this).attr("alt"));
						$(".swiper-slide").eq(e1).find(".wj_skill_txt").find("span").eq(1).html($(this).attr("altr"));
					});
				},
				onSlideChangeStart: function() {
					var e = $(".swiper-pagination .swiper-pagination-bullet-active").index() + 1;

					g = e - 4;
					var c = $(".swiper-pagination span").width(),
						i = parseFloat($(".swiper-pagination span").css("margin-right")),
						r = c + i;
					g > -1 && (
						m = 0 == g ? "0px" : -1 * parseInt(g * r - 1) + "px", $(".swiper-pagination").css("margin-left", m)

					);
					var e1 = $(".swiper-pagination .swiper-pagination-bullet-active").index();
					$(".swiper-slide").eq(e1).find(".wj_skill_txt").find("span").eq(0).html($($(".swiper-slide").eq(e1).find("dd.on")).attr("alt"));
					$(".swiper-slide").eq(e1).find(".wj_skill_txt").find("span").eq(1).html($($(".swiper-slide").eq(e1).find("dd.on")).attr("altr"));
					$("body").on('click', '.wj_skill dd', function() {
						var index = $(this).index() - 1;
						$(this).addClass("on").siblings().removeClass("on");
						$(".swiper-slide").eq(e1).find(".wj_skill_txt").find("span").eq(0).html($(this).attr("alt"));
						$(".swiper-slide").eq(e1).find(".wj_skill_txt").find("span").eq(1).html($(this).attr("altr"));
					});

				}
			});

		}

	});

	$("#ftop01").click(function() {
		$("#right_title").toggle();
	})
});