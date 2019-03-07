! function(e) {
	var n = "undefined" == typeof module ? e.baidu = e.baidu || {} : module.exports;
	n.template = function(n, a) {
		var r = function() {
				if (!e.document) return t._compile(n);
				var a = document.getElementById(n);
				if (a) {
					if (t.cache[n]) return t.cache[n];
					var r = /^(textarea|input)$/i.test(a.nodeName) ? a.value : a.innerHTML;
					return t._compile(r)
				}
				return t._compile(n)
			}(),
			p = t._isObject(a) ? r(a) : r;
		return r = null, p
	};
	var t = n.template;
	t.versions = t.versions || [], t.versions.push("1.0.6"), t.cache = {}, t.LEFT_DELIMITER = t.LEFT_DELIMITER || "<%", t.RIGHT_DELIMITER = t.RIGHT_DELIMITER || "%>", t.ESCAPE = !0, t._encodeHTML = function(e) {
		return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "&#92;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	}, t._encodeReg = function(e) {
		return String(e).replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")
	}, t._encodeEventHTML = function(e) {
		return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\\\\/g, "\\").replace(/\\\//g, "/").replace(/\\n/g, "\n").replace(/\\r/g, "\r")
	}, t._compile = function(e) {
		var n = "var _template_fun_array=[];\nvar fn=(function(__data__){\nvar _template_varName='';\nfor(name in __data__){\n_template_varName+=('var '+name+'=__data__[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('" + t._analysisStr(e) + "');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
		return new Function("_template_object", n)
	}, t._isObject = function(e) {
		return "function" == typeof e || !(!e || "object" != typeof e)
	}, t._analysisStr = function(e) {
		var n = t.LEFT_DELIMITER,
			a = t.RIGHT_DELIMITER,
			r = t._encodeReg(n),
			p = t._encodeReg(a);
		return e = String(e).replace(new RegExp("(" + r + "[^" + p + "]*)//.*\n", "g"), "$1").replace(new RegExp("<!--.*?-->", "g"), "").replace(new RegExp(r + "\\*.*?\\*" + p, "g"), "").replace(new RegExp("[\\r\\t\\n]", "g"), "").replace(new RegExp(r + "(?:(?!" + p + ")[\\s\\S])*" + p + "|((?:(?!" + r + ")[\\s\\S])+)", "g"), function(e, n) {
			var t = "";
			if (n)
				for (t = n.replace(/\\/g, "&#92;").replace(/'/g, "&#39;");
					/<[^<]*?&#39;[^<]*?>/g.test(t);) t = t.replace(/(<[^<]*?)&#39;([^<]*?>)/g, "$1\r$2");
			else t = e;
			return t
		}), e = e.replace(new RegExp("(" + r + "[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?" + p, "g"), "$1;" + a).replace(new RegExp("(" + r + ":?[hvu]?[\\s]*?=[\\s]*?[^;|" + p + "]*?);[\\s]*?" + p, "g"), "$1" + a).split(n).join("	"), e = t.ESCAPE ? e.replace(new RegExp("\\t=(.*?)" + p, "g"), "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'") : e.replace(new RegExp("\\t=(.*?)" + p, "g"), "',typeof($1) === 'undefined'?'':$1,'"), e = e.replace(new RegExp("\\t:h=(.*?)" + p, "g"), "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'").replace(new RegExp("\\t(?::=|-)(.*?)" + p, "g"), "',typeof($1)==='undefined'?'':$1,'").replace(new RegExp("\\t:u=(.*?)" + p, "g"), "',typeof($1)==='undefined'?'':encodeURIComponent($1),'").replace(new RegExp("\\t:v=(.*?)" + p, "g"), "',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'").split("	").join("');").split(a).join("_template_fun_array.push('").split("\r").join("\\'")
	}
}(window);;
! function(e) {
	var o = {
			initialized: !1,
			currentPopupCount: 0,
			$mask: null,
			$win: e(window),
			init: function() {
				var o = document.createElement("div");
				o.className = "md-overlay", e("body").addClass("md-body").append(o), this.$mask = e(o), this.initialized = !0
			}
		},
		t = {
			setPopupTop: function(t) {
				var n = e(t),
					i = n.outerHeight(),
					s = document.body.scrollTop || document.documentElement.scrollTop,
					d = s + (o.$win.height() - i) / 2,
					a = this.getDocumentHeight();
				d + i > a - 10 && (d = a - i - 20), 0 > d && (d = 10), n.css("top", d + "px")
			},
			getDocumentHeight: function() {
				var e;
				return document.documentElement && (e = document.documentElement.scrollHeight), document.body && document.body.scrollHeight > e && (e = document.body.scrollHeight), e
			},
			replaceCenter: function(t, n) {
				var i = e(t),
					s = {
						width: i.outerWidth(),
						height: i.outerHeight()
					};
				switch (n) {
					case "auto":
						o.$win.height() < s.height ? this.replaceCenter(i, "absolute") : this.replaceCenter(i, "fixed");
						break;
					case "absolute":
						i.css({
							position: "absolute",
							top: "",
							"margin-top": "0",
							"margin-left": s.width / 2 * -1 + "px"
						}), this.setPopupTop(t);
						break;
					case "fixed":
						i.css({
							position: "fixed",
							top: "50%",
							"margin-left": s.width / 2 * -1 + "px",
							"margin-top": s.height / 2 * -1 + "px"
						})
				}
			}
		};
	e.popup = function(n) {
		var i = n || {};
		i = {
			modal: e(i.modal) || e(""),
			closeBtn: e(i.closeBtn) || e(""),
			openBtn: e(i.openBtn) || e(""),
			effect: void 0 !== i.effect ? i.effect : 1,
			position: i.position || "auto",
			zIndex: void 0 !== i.zIndex ? i.zIndex : "",
			maskClose: void 0 !== i.maskClose ? i.maskClose : !1,
			onShow: i.onShow || function() {},
			onShowed: i.onShowed || function() {},
			onHide: i.onHide || function() {},
			onHidden: i.onHidden || function() {}
		};
		var s, d = !1,
			a = "md-show",
			c = "";
		switch (s = "md-effect-" + i.effect, i.modal.addClass("md-modal").addClass(s), c = "auto" === i.position ? i.modal.outerHeight() > o.$win.height() ? "absolute" : "fixed" : i.position) {
			case "absolute":
				i.modal.css({
					position: "absolute",
					left: "50%"
				});
				break;
			case "fixed":
				i.modal.css({
					position: "fixed",
					left: "50%",
					top: "50%"
				})
		}
		"" !== i.zIndex && i.modal.css("z-index", i.zIndex), t.replaceCenter(i.modal, i.position), o.$win.bind("resize", function() {
			t.replaceCenter(i.modal, i.position)
		}), i.openBtn.bind("click", function() {
			d || (o.$mask.addClass(a), i.modal.addClass(a), i.onShow(), setTimeout(function() {
				t.replaceCenter(i.modal, i.position), d = !0, i.onShowed()
			}, 0), o.currentPopupCount++)
		});
		var l = function() {
			d && (i.modal.removeClass(a), o.currentPopupCount--, 0 === o.currentPopupCount && o.$mask.removeClass(a), d = !1, i.onHidden())
		};
		return i.closeBtn.bind("click", l), i.maskClose && o.$mask.bind("click", l), {
			getConfig: function() {
				return i
			},
			refresh: function() {
				t.replaceCenter(i.modal, i.position)
			}
		}
	}, e.popupSetGlobal = {
		setMaskCss: function(e, t) {
			o.$mask.css(e, t)
		}
	}, o.init()
}(jQuery);;
var scrolltotop = {
	setting: {
		startline: 1,
		scrollto: 0,
		scrollduration: 80,
		fadeduration: [500, 100]
	},
	controlHTML: '<img src="/img/gotop.gif" style="width:31px; height:31px;" />',
	controlattrs: {
		offsetx: 100,
		offsety: 165
	},
	anchorkeyword: "#top",
	state: {
		isvisible: !1,
		shouldvisible: !1
	},
	scrollup: function() {
		this.cssfixedsupport || this.$control.css({
			opacity: 0
		});
		var t = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
		t = "string" == typeof t && 1 == jQuery("#" + t).length ? jQuery("#" + t).offset().top : 0, this.$body.animate({
			scrollTop: t
		}, this.setting.scrollduration)
	},
	keepfixed: function() {
		var t = jQuery(window),
			o = t.scrollLeft() + t.width() - this.$control.width() - this.controlattrs.offsetx,
			s = t.scrollTop() + t.height() - this.$control.height() - this.controlattrs.offsety;
		this.$control.css({
			left: o + "px",
			top: s + "px"
		})
	},
	togglecontrol: function() {
		var t = jQuery(window).scrollTop();
		this.cssfixedsupport || this.keepfixed(), this.state.shouldvisible = t >= this.setting.startline ? !0 : !1, this.state.shouldvisible && !this.state.isvisible ? (this.$control.stop().show(), this.state.isvisible = !0) : 0 == this.state.shouldvisible && this.state.isvisible && (this.$control.stop().hide(), this.state.isvisible = !1)
	},
	offset: function(t, o) {
		scrolltotop.controlattrs.offsetx = t, scrolltotop.controlattrs.offsety = o
	},
	init: function() {
		jQuery(document).ready(function(t) {
			var o = scrolltotop,
				s = document.all;
			o.cssfixedsupport = !s || s && "CSS1Compat" == document.compatMode && window.XMLHttpRequest, o.$body = t(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body"), o.$control = t('<div id="topcontrol">' + o.controlHTML + "</div>").css({
				position: o.cssfixedsupport ? "fixed" : "absolute",
				bottom: o.controlattrs.offsety,
				right: o.controlattrs.offsetx,
				display: "none",
				cursor: "pointer"
			}).attr({
				title: "回到顶部"
			}).click(function() {
				return o.scrollup(), !1
			}).appendTo("body"), document.all && !window.XMLHttpRequest && "" != o.$control.text() && o.$control.css({
				width: o.$control.width()
			}), o.togglecontrol(), t('a[href="' + o.anchorkeyword + '"]').click(function() {
				return o.scrollup(), !1
			}), t(window).bind("scroll resize", function() {
				o.togglecontrol()
			})
		})
	}
};;
! function(e) {
	e.slides = function(n) {
		var t = n || {};
		t = {
			tabParent: e(t.tabParent),
			paneParent: e(t.paneParent),
			tabSelector: t.tabSelector || e(t.tabParent).children().prop("tagName"),
			paneSelector: t.paneSelector || e(t.paneParent).children().prop("tagName"),
			direction: t.direction || "x",
			btnPrev: e(t.btnPrev) || null,
			btnNext: e(t.btnNext) || null,
			activeClass: t.activeClass || "active",
			triggerType: t.triggerType || "click",
			initActiveIndex: t.initActiveIndex || 0,
			duration: t.duration || 300,
			onSlideStart: t.onSlideStart || function() {},
			onSlideEnd: t.onSlideEnd || function() {},
			autoslide: void 0 !== t.autoslide ? t.autoslide : !1,
			autoslideInterval: t.autoslideInterval || 4e3,
			banClearAuto: void 0 !== t.banClearAuto ? t.banClearAuto : !1,
			onClearAuto: t.onClearAuto || function() {},
			onEnableAuto: t.onEnableAuto || function() {},
			mouseenterDelay: t.mouseenterDelay || 300,
			enableLog: t.enableLog || !1
		};
		var a, i, o, r, l, u, s = t.tabParent.children(t.tabSelector),
			c = t.paneParent.children(t.paneSelector),
			d = s.length,
			b = t.initActiveIndex,
			v = null,
			f = !1,
			m = e({});
		if ("undefined" != typeof console && t.enableLog ? (u = 0, l = function(e) {
			u++, console.log(u, e)
		}) : l = function() {}, a = "x" === t.direction ? "left" : "top", o = function(e, n, i, o) {
			var r = {};
			if (r[a] = 0, n)
				if ("axis" === i) e.stop().animate(r, t.duration, function() {
					o && o()
				});
				else {
					var l = {};
					l[a] = "100%", e.css(l), e.stop().animate(r, t.duration, function() {
						o && o()
					})
				} else e.css(r)
		}, i = function(e, n, i, o) {
			var r = {};
			if (r[a] = "-100%", n)
				if ("axis" !== i) e.stop().animate(r, t.duration, o);
				else {
					var l = {};
					l[a] = "100%", e.stop().animate(l, t.duration, function() {
						e.css(r), o && o()
					})
				} else e.css(r), o && o()
		}, !s.length && c.length) {
			d = c.length;
			for (var g = 0, x = d; x > g; g++) s[g] = {}
		}
		for (var P, g = 0, x = d; x > g; g++) P = s[g], P._index = g, t.initActiveIndex === g ? (e(P).addClass(t.activeClass), c.eq(P._index).addClass(t.activeClass)) : (e(P).removeClass(t.activeClass), i(c.eq(P._index).removeClass(t.activeClass)));
		switch (r = function(n, a, r) {
			var l, u, d, m = n,
				g = e(n);
			f || b !== m._index && (t.autoslide && T(), f = !0, s.removeClass(t.activeClass), g.addClass(t.activeClass), c.removeClass(t.activeClass), c.eq(m._index).addClass(t.activeClass), v = b, b = m._index, u = c.eq(v), d = c.eq(b), t.onSlideStart(b, v), l = void 0 === r ? b > v ? "anti-axis" : "axis" : r ? "anti-axis" : "axis", i(u, !0, l), o(d, !0, l, function() {
				f = !1, a && a(b, v), t.autoslide && _(), t.onSlideEnd(b, v)
			}))
		}, t.triggerType) {
			case "click":
				var C = function() {
					void 0 !== this._index && 0 !== c.eq(this._index).length && (f || r(this))
				};
				t.tabParent.delegate(t.tabSelector, t.triggerType, C), m.bind("teardown", function() {
					t.tabParent.undelegate(t.tabSelector, t.triggerType, C)
				});
				break;
			case "mousemove":
				var h, C;
				C = function() {
					if (void 0 !== this._index && 0 !== c.eq(this._index).length) {
						var e = this;
						h && (h = clearTimeout(h)), h = setTimeout(function() {
							f || r(e), h = null
						}, 50)
					}
				}, t.tabParent.delegate(t.tabSelector, "mousemove", C), m.bind("teardown", function() {
					t.tabParent.undelegate(t.tabSelector, "mousemove", C)
				});
				break;
			case "mouseover":
			case "mouseenter":
				var p, C, S;
				C = function() {
					if (void 0 !== this._index && 0 !== c.eq(this._index).length) {
						var e = this;
						p && (p = clearTimeout(p)), p = setTimeout(function() {
							f || r(e), p = null
						}, t.mouseenterDelay)
					}
				}, S = function() {
					void 0 !== this._index && 0 !== c.eq(this._index).length && p && (p = clearTimeout(p))
				}, t.tabParent.delegate(t.tabSelector, "mouseenter", C), t.tabParent.delegate(t.tabSelector, "mouseleave", S), m.bind("teardown", function() {
					t.tabParent.undelegate(t.tabSelector, "mouseenter", C), t.tabParent.undelegate(t.tabSelector, "mouseleave", S)
				})
		}
		var A, _, T, I, w, y, q;
		if (t.autoslide && (_ = function() {
			clearInterval(A), A = setInterval(function() {
				f || (b === d - 1 ? r(s[0], null, !0) : r(s[b + 1]))
			}, t.autoslideInterval), t.onEnableAuto(b, v)
		}, T = function() {
			A && (A = clearInterval(A)), t.onClearAuto(b, v)
		}, I = function() {
			T()
		}, w = function() {
			_()
		}, y = function() {
			T()
		}, q = function() {
			_()
		}, _(), t.banClearAuto || (t.tabParent.bind("mouseover", I).bind("mouseout", w), t.paneParent.bind("mouseover", y).bind("mouseout", q)), m.bind("teardown", function() {
			A && (A = clearInterval(A)), t.tabParent.unbind("mouseover", I).unbind("mouseout", w), t.paneParent.unbind("mouseover", y).unbind("mouseout", q)
		})), t.btnPrev) {
			var k = function() {
				f || (0 === b ? r(s[d - 1], null, !1) : r(s[b - 1]))
			};
			e(t.btnPrev).bind("click", k), m.bind("teardown", function() {
				e(t.btnPrev).unbind("click", k)
			})
		}
		if (t.btnNext) {
			var N = function() {
				f || (d - 1 === b ? r(s[0], null, !0) : r(s[b + 1]))
			};
			e(t.btnNext).bind("click", N), m.bind("teardown", function() {
				e(t.btnNext).unbind("click", N)
			})
		}
		return {
			isSliding: function() {
				return f
			},
			slideTo: function(e) {
				f || r(s[e])
			},
			clearAuto: function() {
				T()
			},
			enableAuto: function() {
				_()
			},
			getTabs: function() {
				return s
			},
			getPanes: function() {
				return c
			},
			teardown: function() {
				m.trigger("teardown"), m.unbind("teardown")
			}
		}
	}
}(jQuery);;
! function(e) {
	e.switchActive = function(t) {
		var n = t || {};
		n = {
			tabParent: e(n.tabParent),
			paneParent: e(n.paneParent),
			tabSelector: n.tabSelector || e(n.tabParent).children().prop("tagName"),
			paneSelector: n.paneSelector || e(n.paneParent).children().prop("tagName"),
			activeClass: n.activeClass || "active",
			triggerType: n.triggerType || "click",
			btnPrev: e(n.btnPrev) || null,
			btnNext: e(n.btnNext) || null,
			initActiveIndex: n.initActiveIndex || 0,
			autoslide: void 0 !== n.autoslide ? n.autoslide : !1,
			autoslideInterval: n.autoslideInterval || 4e3,
			onSwitchStart: n.onSwitchStart || function() {},
			onSwitchEnd: n.onSwitchEnd || function() {},
			mouseenterDelay: n.mouseenterDelay || 300
		};
		var a = n.tabParent.children(n.tabSelector),
			i = n.paneParent.children(n.paneSelector),
			s = a.length,
			o = n.initActiveIndex;
		if (!a.length && i.length) {
			s = i.length;
			for (var l = 0, r = s; r > l; l++) a[l] = {}
		}
		for (var c, l = 0, r = s; r > l; l++) c = a[l], c._index = l, n.initActiveIndex === l ? (e(c).addClass(n.activeClass), i.eq(c._index).addClass(n.activeClass)) : (e(c).removeClass(n.activeClass), i.eq(c._index).removeClass(n.activeClass));
		var d = function(t, s) {
				var l = t,
					r = e(t);
				r.hasClass(n.activeClass) || (n.onSwitchStart(o), a.removeClass(n.activeClass), r.addClass(n.activeClass), i.removeClass(n.activeClass), i.eq(l._index).addClass(n.activeClass), o = l._index, s && s(o), n.onSwitchEnd(o))
			},
			u = function(e) {
				n.onSwitchStart(o), o = 0, a.removeClass(n.activeClass).eq(0).addClass(n.activeClass), i.removeClass(n.activeClass).eq(0).addClass(n.activeClass), e && e(o), n.onSwitchEnd(o)
			},
			v = function(e) {
				n.onSwitchStart(o), o = s - 1, a.removeClass(n.activeClass).eq(s - 1).addClass(n.activeClass), i.removeClass(n.activeClass).eq(s - 1).addClass(n.activeClass), e && e(o), n.onSwitchEnd(o)
			};
		if ("click" === n.triggerType) n.tabParent.delegate(n.tabSelector, n.triggerType, function() {
			void 0 !== this._index && 0 !== i.eq(this._index).length && d(this)
		});
		else if ("mousemove" === n.triggerType) {
			var f;
			n.tabParent.delegate(n.tabSelector, "mousemove", function() {
				if (void 0 !== this._index && 0 !== i.eq(this._index).length) {
					var e = this;
					f && (f = clearTimeout(f)), f = setTimeout(function() {
						d(e)
					}, 50)
				}
			})
		} else if ("mouseover" === n.triggerType || "mouseenter" === n.triggerType) {
			var f;
			n.tabParent.delegate(n.tabSelector, "mouseenter", function() {
				if (void 0 !== this._index && 0 !== i.eq(this._index).length) {
					var e = this;
					f && (f = clearTimeout(f)), f = setTimeout(function() {
						d(e)
					}, n.mouseenterDelay)
				}
			}), n.tabParent.delegate(n.tabSelector, "mouseleave", function() {
				void 0 !== this._index && 0 !== i.eq(this._index).length && f && (f = clearTimeout(f))
			})
		}
		var C, h, b;
		return n.autoslide && (h = function() {
			b(), C = setInterval(function() {
				o === s - 1 ? u() : d(a[o + 1])
			}, n.autoslideInterval)
		}, b = function() {
			C && (C = clearInterval(C))
		}, n.tabParent.bind("mouseover", function() {
			b()
		}).bind("mouseout", function() {
			h()
		}), n.paneParent.bind("mouseover", function() {
			b()
		}).bind("mouseout", function() {
			h()
		}), h()), n.btnPrev && e(n.btnPrev).bind("click", function() {
			n.autoslide && b(), 0 === o ? v(function() {
				n.autoslide && h()
			}) : d(a[o - 1], function() {
				n.autoslide && h()
			})
		}), n.btnNext && e(n.btnNext).bind("click", function() {
			n.autoslide && b(), s - 1 === o ? u(function() {
				n.autoslide && h()
			}) : d(a[o + 1], function() {
				n.autoslide && h()
			})
		}), {
			getTabs: function() {
				return a
			},
			getPanes: function() {
				return i
			},
			teardown: null
		}
	}
}(jQuery);