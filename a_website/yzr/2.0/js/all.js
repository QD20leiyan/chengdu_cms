 /*!* SuperSlide v2.1.1 */
(function(f){f.fn.slide=function(ca){f.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1};return this.each(function(){var c=f.extend({},f.fn.slide.defaults,ca),a=f(this),d=c.effect,b=f(c.prevCell,a),e=f(c.nextCell,a),t=f(c.pageStateCell,a),A=f(c.playStateCell,a),q=f(c.titCell,a),k=q.size(),h=f(c.mainCell,a),l=h.children().size(),C=c.switchLoad,G=f(c.targetCell,a),g=parseInt(c.defaultIndex),r=parseInt(c.delayTime),T=parseInt(c.interTime);parseInt(c.triggerTime);var m=parseInt(c.scroll),w=parseInt(c.vis),M="false"==c.autoPlay||0==c.autoPlay?!1:!0,U="false"==c.opp||0==c.opp?!1:!0,p="false"==c.autoPage||0==c.autoPage?!1:!0,N="false"==c.pnLoop||0==c.pnLoop?!1:!0,V="false"==c.mouseOverStop||0==c.mouseOverStop?!1:!0,K="false"==c.defaultPlay||0==c.defaultPlay?!1:!0,I="false"==c.returnDefault||0==c.returnDefault?!1:!0,v=0,u=0,L=0,O=0,y=c.easing,H=null,P=null,Q=null,D=c.titOnClassName,x=q.index(a.find("."+D)),W=g=-1==x?g:x,da=g,J=g,n=l>=w?0!=l%m?l%m:m:0,z,E="leftMarquee"==d||"topMarquee"==d?!0:!1,ea=function(){f.isFunction(c.startFun)&&c.startFun(g,k,a,f(c.titCell,a),h,G,b,e)},B=function(){f.isFunction(c.endFun)&&c.endFun(g,k,a,f(c.titCell,a),h,G,b,e)},X=function(){q.removeClass(D);K&&q.eq(da).addClass(D)};if("menu"==c.type)K&&q.removeClass(D).eq(g).addClass(D),q.hover(function(){z=f(this).find(c.targetCell);var a=q.index(f(this));P=setTimeout(function(){g=a;q.removeClass(D).eq(g).addClass(D);ea();switch(d){case"fade":z.stop(!0,!0).animate({opacity:"show"},r,y,B);break;case"slideDown":z.stop(!0,!0).animate({height:"show"},r,y,B)}},c.triggerTime)},function(){clearTimeout(P);switch(d){case"fade":z.animate({opacity:"hide"},r,y);break;case"slideDown":z.animate({height:"hide"},r,y)}}),I&&a.hover(function(){clearTimeout(Q)},function(){Q=setTimeout(X,r)});else{0==k&&(k=l);E&&(k=2);if(p){l>=w?"leftLoop"==d||"topLoop"==d?k=0!=l%m?(l/m^0)+1:l/m:(p=l-w,k=1+parseInt(0!=p%m?p/m+1:p/m),0>=k&&(k=1)):k=1;q.html("");p="";if(1==c.autoPage||"true"==c.autoPage)for(x=0;x<k;x++)p+="<li>"+(x+1)+"</li>";else for(x=0;x<k;x++)p+=c.autoPage.replace("$",x+1);q.html(p);q=q.children()}if(l>=w){h.children().each(function(){f(this).width()>L&&(L=f(this).width(),u=f(this).outerWidth(!0));f(this).height()>O&&(O=f(this).height(),v=f(this).outerHeight(!0))});var fa=h.children(),p=function(){for(var a=0;a<w;a++)fa.eq(a).clone().addClass("clone").appendTo(h);for(a=0;a<n;a++)fa.eq(l-a-1).clone().addClass("clone").prependTo(h)};switch(d){case"fold":h.css({position:"relative",width:u,height:v}).children().css({position:"absolute",width:L,left:0,top:0,display:"none"});break;case"top":h.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+w*v+'px"></div>').css({top:-(g*m)*v,position:"relative",padding:"0",margin:"0"}).children().css({height:O});break;case"left":h.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+w*u+'px"></div>').css({width:l*u,left:-(g*m)*u,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:L});break;case"leftLoop":case"leftMarquee":p();h.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+w*u+'px"></div>').css({width:(l+w+n)*u,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(n+g*m)*u}).children().css({"float":"left",width:L});break;case"topLoop":case"topMarquee":p(),h.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+w*v+'px"></div>').css({height:(l+w+n)*v,position:"relative",padding:"0",margin:"0",top:-(n+g*m)*v}).children().css({height:O})}}var Y=function(a){var b=a*m;a==k?b=l:-1==a&&0!=l%m&&(b=-l%m);return b},ga=function(a){var b=function(b){for(var c=b;c<w+b;c++)a.eq(c).find("img["+C+"]").each(function(){var a=f(this);a.attr("src",a.attr(C)).removeAttr(C);if(h.find(".clone")[0])for(var b=h.children(),c=0;c<b.size();c++)b.eq(c).find("img["+C+"]").each(function(){f(this).attr(C)==a.attr("src")&&f(this).attr("src",f(this).attr(C)).removeAttr(C)})})};switch(d){case"fade":case"fold":case"top":case"left":case"slideDown":b(g*m);break;case"leftLoop":case"topLoop":b(n+Y(J));break;case"leftMarquee":case"topMarquee":var c="leftMarquee"==d?h.css("left").replace("px",""):h.css("top").replace("px",""),e="leftMarquee"==d?u:v,t=n;0!=c%e&&(c=Math.abs(c/e^0),t=1==g?n+c:n+c-1);b(t)}},F=function(a){if(!K||W!=g||a||E){E?1<=g?g=1:0>=g&&(g=0):(J=g,g>=k?g=0:0>g&&(g=k-1));ea();null!=C&&ga(h.children());G[0]&&(z=G.eq(g),null!=C&&ga(G),"slideDown"==d?(G.not(z).stop(!0,!0).slideUp(r),z.slideDown(r,y,function(){h[0]||B()})):(G.not(z).stop(!0,!0).hide(),z.animate({opacity:"show"},r,function(){h[0]||B()})));if(l>=w)switch(d){case"fade":h.children().stop(!0,!0).eq(g).animate({opacity:"show"},r,y,function(){B()}).siblings().hide();break;case"fold":h.children().stop(!0,!0).eq(g).animate({opacity:"show"},r,y,function(){B()}).siblings().animate({opacity:"hide"},r,y);break;case"top":h.stop(!0,!1).animate({top:-g*m*v},r,y,function(){B()});break;case"left":h.stop(!0,!1).animate({left:-g*m*u},r,y,function(){B()});break;case"leftLoop":var c=J;h.stop(!0,!0).animate({left:-(Y(J)+n)*u},r,y,function(){-1>=c?h.css("left",-(n+(k-1)*m)*u):c>=k&&h.css("left",-n*u);B()});break;case"topLoop":c=J;h.stop(!0,!0).animate({top:-(Y(J)+n)*v},r,y,function(){-1>=c?h.css("top",-(n+(k-1)*m)*v):c>=k&&h.css("top",-n*v);B()});break;case"leftMarquee":a=h.css("left").replace("px","");0==g?h.animate({left:++a},0,function(){0<=h.css("left").replace("px","")&&h.css("left",-l*u)}):h.animate({left:--a},0,function(){h.css("left").replace("px","")<=-(l+n)*u&&h.css("left",-n*u)});break;case"topMarquee":a=h.css("top").replace("px",""),0==g?h.animate({top:++a},0,function(){0<=h.css("top").replace("px","")&&h.css("top",-l*v)}):h.animate({top:--a},0,function(){h.css("top").replace("px","")<=-(l+n)*v&&h.css("top",-n*v)})}q.removeClass(D).eq(g).addClass(D);W=g;N||(e.removeClass("nextStop"),b.removeClass("prevStop"),0==g&&b.addClass("prevStop"),g==k-1&&e.addClass("nextStop"));t.html("<span>"+(g+1)+"</span>/"+k)}};K&&F(!0);I&&a.hover(function(){clearTimeout(Q)},function(){Q=setTimeout(function(){g=da;K?F():"slideDown"==d?z.slideUp(r,X):z.animate({opacity:"hide"},r,X);W=g},300)});var Z=function(a){H=setInterval(function(){U?g--:g++;F()},a?a:T)},R=function(a){H=setInterval(F,a?a:T)},S=function(){V||(clearInterval(H),Z())},I=function(){if(N||g!=k-1)g++,F(),E||S()},p=function(){if(N||0!=g)g--,F(),E||S()},aa=function(){clearInterval(H);E?R():Z();A.removeClass("pauseState")},ba=function(){clearInterval(H);A.addClass("pauseState")};M?E?(U?g--:g++,R(),V&&h.hover(ba,aa)):(Z(),V&&a.hover(ba,aa)):(E&&(U?g--:g++),A.addClass("pauseState"));A.click(function(){A.hasClass("pauseState")?aa():ba()});"mouseover"==c.trigger?q.hover(function(){var a=q.index(this);P=setTimeout(function(){g=a;F();S()},c.triggerTime)},function(){clearTimeout(P)}):q.click(function(){g=q.index(this);F();S()});if(E){e.mousedown(I);b.mousedown(p);if(N){var ha,M=function(){ha=setTimeout(function(){clearInterval(H);R(T/10^0)},150)},x=function(){clearTimeout(ha);clearInterval(H);R()};e.mousedown(M);e.mouseup(x);b.mousedown(M);b.mouseup(x)}"mouseover"==c.trigger&&(e.hover(I,function(){}),b.hover(p,function(){}))}else e.click(I),b.click(p)}})}})(jQuery);jQuery.easing.jswing=jQuery.easing.swing;(function(f,ca){f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,d,b,e){return f.easing[f.easing.def](c,a,d,b,e)},easeInQuad:function(c,a,d,b,e){return b*(a/=e)*a+d},easeOutQuad:function(c,a,d,b,e){return-b*(a/=e)*(a-2)+d},easeInOutQuad:function(c,a,d,b,e){return 1>(a/=e/2)?b/2*a*a+d:-b/2*(--a*(a-2)-1)+d},easeInCubic:function(c,a,d,b,e){return b*(a/=e)*a*a+d},easeOutCubic:function(c,a,d,b,e){return b*((a=a/e-1)*a*a+1)+d},easeInOutCubic:function(c,a,d,b,e){return 1>(a/=e/2)?b/2*a*a*a+d:b/2*((a-=2)*a*a+2)+d},easeInQuart:function(c,a,d,b,e){return b*(a/=e)*a*a*a+d},easeOutQuart:function(c,a,d,b,e){return-b*((a=a/e-1)*a*a*a-1)+d},easeInOutQuart:function(c,a,d,b,e){return 1>(a/=e/2)?b/2*a*a*a*a+d:-b/2*((a-=2)*a*a*a-2)+d},easeInQuint:function(c,a,d,b,e){return b*(a/=e)*a*a*a*a+d},easeOutQuint:function(c,a,d,b,e){return b*((a=a/e-1)*a*a*a*a+1)+d},easeInOutQuint:function(c,a,d,b,e){return 1>(a/=e/2)?b/2*a*a*a*a*a+d:b/2*((a-=2)*a*a*a*a+2)+d},easeInSine:function(c,a,d,b,e){return-b*Math.cos(a/e*(Math.PI/2))+b+d},easeOutSine:function(c,a,d,b,e){return b*Math.sin(a/e*(Math.PI/2))+d},easeInOutSine:function(c,a,d,b,e){return-b/2*(Math.cos(Math.PI*a/e)-1)+d},easeInExpo:function(c,a,d,b,e){return 0==a?d:b*Math.pow(2,10*(a/e-1))+d},easeOutExpo:function(c,a,d,b,e){return a==e?d+b:b*(-Math.pow(2,-10*a/e)+1)+d},easeInOutExpo:function(c,a,d,b,e){return 0==a?d:a==e?d+b:1>(a/=e/2)?b/2*Math.pow(2,10*(a-1))+d:b/2*(-Math.pow(2,-10*--a)+2)+d},easeInCirc:function(c,a,d,b,e){return-b*(Math.sqrt(1-(a/=e)*a)-1)+d},easeOutCirc:function(c,a,d,b,e){return b*Math.sqrt(1-(a=a/e-1)*a)+d},easeInOutCirc:function(c,a,d,b,e){return 1>(a/=e/2)?-b/2*(Math.sqrt(1-a*a)-1)+d:b/2*(Math.sqrt(1-(a-=2)*a)+1)+d},easeInElastic:function(c,a,d,b,e){c=1.70158;var t=0,f=b;if(0==a)return d;if(1==(a/=e))return d+b;t||(t=.3*e);f<Math.abs(b)?(f=b,c=t/4):c=t/(2*Math.PI)*Math.asin(b/f);return-(f*Math.pow(2,10*--a)*Math.sin(2*(a*e-c)*Math.PI/t))+d},easeOutElastic:function(c,a,d,b,e){c=1.70158;var t=0,f=b;if(0==a)return d;if(1==(a/=e))return d+b;t||(t=.3*e);f<Math.abs(b)?(f=b,c=t/4):c=t/(2*Math.PI)*Math.asin(b/f);return f*Math.pow(2,-10*a)*Math.sin(2*(a*e-c)*Math.PI/t)+b+d},easeInOutElastic:function(c,a,d,b,e){c=1.70158;var f=0,A=b;if(0==a)return d;if(2==(a/=e/2))return d+b;f||(f=.3*e*1.5);A<Math.abs(b)?(A=b,c=f/4):c=f/(2*Math.PI)*Math.asin(b/A);return 1>a?-.5*A*Math.pow(2,10*--a)*Math.sin(2*(a*e-c)*Math.PI/f)+d:A*Math.pow(2,-10*--a)*Math.sin(2*(a*e-c)*Math.PI/f)*.5+b+d},easeInBack:function(c,a,d,b,e,f){void 0==f&&(f=1.70158);return b*(a/=e)*a*((f+1)*a-f)+d},easeOutBack:function(c,a,d,b,e,f){void 0==f&&(f=1.70158);return b*((a=a/e-1)*a*((f+1)*a+f)+1)+d},easeInOutBack:function(c,a,d,b,e,f){void 0==f&&(f=1.70158);return 1>(a/=e/2)?b/2*a*a*(((f*=1.525)+1)*a-f)+d:b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+d},easeInBounce:function(c,a,d,b,e){return b-f.easing.easeOutBounce(c,e-a,0,b,e)+d},easeOutBounce:function(c,a,d,b,e){return(a/=e)<1/2.75?7.5625*b*a*a+d:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+.75)+d:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+.9375)+d:b*(7.5625*(a-=2.625/2.75)*a+.984375)+d},easeInOutBounce:function(c,a,d,b,e){return a<e/2?.5*f.easing.easeInBounce(c,2*a,0,b,e)+d:.5*f.easing.easeOutBounce(c,2*a-e,0,b,e)+.5*b+d}})})(jQuery);
/*fuulpage*/
!function(e){e.fn.fullpage=function(n){function o(e){e.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>'),"#fff"!=n.controlArrowColor&&(e.find(".fp-controlArrow.fp-next").css("border-color","transparent transparent transparent "+n.controlArrowColor),e.find(".fp-controlArrow.fp-prev").css("border-color","transparent "+n.controlArrowColor+" transparent transparent")),n.loopHorizontal||e.find(".fp-controlArrow.fp-prev").hide()}function t(){e("body").append('<div id="fp-nav"><ul></ul></div>'),G=e("#fp-nav"),G.css("color",n.navigationColor),G.addClass(n.navigationPosition);for(var o=0;o<e(".fp-section").length;o++){var t="";n.anchors.length&&(t=n.anchors[o]);var t='<li><a href="#'+t+'"><span></span></a>',i=n.navigationTooltips[o];void 0!=i&&""!=i&&(t+='<div class="fp-tooltip '+n.navigationPosition+'">'+i+"</div>"),t+="</li>",G.find("ul").append(t)}}function i(){e(".fp-section").each(function(){var n=e(this).find(".fp-slide");n.length?n.each(function(){k(e(this))}):k(e(this))}),e.isFunction(n.afterRender)&&n.afterRender.call(this)}function l(){if(!n.autoScrolling||n.scrollBar){var o=e(window).scrollTop(),t=0,i=Math.abs(o-e(".fp-section").first().offset().top);e(".fp-section").each(function(n){var l=Math.abs(o-e(this).offset().top);i>l&&(t=n,i=l)});var l=e(".fp-section").eq(t)}if(!n.autoScrolling&&!l.hasClass("active")){fn=!0;var a=e(".fp-section.active").index(".fp-section")+1,s=L(l),r=l.data("anchor"),c=l.index(".fp-section")+1,f=l.find(".fp-slide.active");if(f.length)var d=f.data("anchor"),p=f.index();l.addClass("active").siblings().removeClass("active"),on||(e.isFunction(n.onLeave)&&n.onLeave.call(this,a,c,s),e.isFunction(n.afterLoad)&&n.afterLoad.call(this,r,c)),A(r,0),n.anchors.length&&!on&&(K=r,H(p,d,r,c)),clearTimeout(rn),rn=setTimeout(function(){fn=!1},100)}n.scrollBar&&(clearTimeout(cn),cn=setTimeout(function(){on||v(l)},1e3))}function a(e){return scrollable=e.find(".fp-slides").length?e.find(".fp-slide.active").find(".fp-scrollable"):e.find(".fp-scrollable")}function s(n,o){if(an[n]){if("down"==n)var t="bottom",i=e.fn.fullpage.moveSectionDown;else t="top",i=e.fn.fullpage.moveSectionUp;if(0<o.length){if(!(t="top"===t?!o.scrollTop():"bottom"===t?o.scrollTop()+1+o.innerHeight()>=o[0].scrollHeight:void 0))return!0;i()}else i()}}function r(o){var t=o.originalEvent;if(!c(o.target)){n.autoScrolling&&!n.scrollBar&&o.preventDefault(),o=e(".fp-section.active");var i=a(o);on||J||(t=U(t),un=t.y,vn=t.x,o.find(".fp-slides").length&&Math.abs(pn-vn)>Math.abs(dn-un)?Math.abs(pn-vn)>e(window).width()/100*n.touchSensitivity&&(pn>vn?an.right&&e.fn.fullpage.moveSlideRight():an.left&&e.fn.fullpage.moveSlideLeft()):n.autoScrolling&&!n.scrollBar&&Math.abs(dn-un)>e(window).height()/100*n.touchSensitivity&&(dn>un?s("down",i):un>dn&&s("up",i)))}}function c(o,t){t=t||0;var i=e(o).parent();return t<n.normalScrollElementTouchThreshold&&i.is(n.normalScrollElements)?!0:t==n.normalScrollElementTouchThreshold?!1:c(i,++t)}function f(e){e=U(e.originalEvent),dn=e.y,pn=e.x}function d(o){if(n.autoScrolling){o=window.event||o;var t=Math.max(-1,Math.min(1,o.wheelDelta||-o.deltaY||-o.detail));return n.scrollBar&&(o.preventDefault?o.preventDefault():o.returnValue=!1),o=e(".fp-section.active"),o=a(o),on||(0>t?s("down",o):s("up",o)),!1}}function p(o){var t=e(".fp-section.active").find(".fp-slides");if(t.length&&!J){var i=t.find(".fp-slide.active"),l=null,l="prev"===o?i.prev(".fp-slide"):i.next(".fp-slide");if(!l.length){if(!n.loopHorizontal)return;l=i.siblings("prev"===o?":last":":first")}J=!0,b(t,l)}}function u(){e(".fp-slide.active").each(function(){W(e(this))})}function v(o,t,i){var l=o.position();if("undefined"!=typeof l&&(t={element:o,callback:t,isMovementUp:i,dest:l,dtop:l.top,yMovement:L(o),anchorLink:o.data("anchor"),sectionIndex:o.index(".fp-section"),activeSlide:o.find(".fp-slide.active"),activeSection:e(".fp-section.active"),leavingSection:e(".fp-section.active").index(".fp-section")+1,localIsResizing:tn},!(t.activeSection.is(o)&&!tn||n.scrollBar&&e(window).scrollTop()===t.dtop))){if(t.activeSlide.length)var a=t.activeSlide.data("anchor"),s=t.activeSlide.index();n.autoScrolling&&n.continuousVertical&&"undefined"!=typeof t.isMovementUp&&(!t.isMovementUp&&"up"==t.yMovement||t.isMovementUp&&"down"==t.yMovement)&&(t.isMovementUp?e(".fp-section.active").before(t.activeSection.nextAll(".fp-section")):e(".fp-section.active").after(t.activeSection.prevAll(".fp-section").get().reverse()),O(e(".fp-section.active").position().top),u(),t.wrapAroundElements=t.activeSection,t.dest=t.element.position(),t.dtop=t.dest.top,t.yMovement=L(t.element)),o.addClass("active").siblings().removeClass("active"),on=!0,H(s,a,t.anchorLink,t.sectionIndex),e.isFunction(n.onLeave)&&!t.localIsResizing&&n.onLeave.call(this,t.leavingSection,t.sectionIndex+1,t.yMovement),h(t),K=t.anchorLink,n.autoScrolling&&A(t.anchorLink,t.sectionIndex)}}function h(o){if(n.css3&&n.autoScrolling&&!n.scrollBar)z("translate3d(0px, -"+o.dtop+"px, 0px)",!0),setTimeout(function(){w(o)},n.scrollingSpeed);else{var t=g(o);e(t.element).animate(t.options,n.scrollingSpeed,n.easing).promise().done(function(){w(o)})}}function g(e){var o={};return n.autoScrolling&&!n.scrollBar?(o.options={top:-e.dtop},o.element="."+ln):(o.options={scrollTop:e.dtop},o.element="html, body"),o}function m(n){n.wrapAroundElements&&n.wrapAroundElements.length&&(n.isMovementUp?e(".fp-section:first").before(n.wrapAroundElements):e(".fp-section:last").after(n.wrapAroundElements),O(e(".fp-section.active").position().top),u())}function w(o){m(o),e.isFunction(n.afterLoad)&&!o.localIsResizing&&n.afterLoad.call(this,o.anchorLink,o.sectionIndex+1),setTimeout(function(){on=!1,e.isFunction(o.callback)&&o.callback.call(this)},600)}function S(){if(!fn){var e=window.location.hash.replace("#","").split("/"),n=e[0],e=e[1];if(n.length){var o="undefined"==typeof K,t="undefined"==typeof K&&"undefined"==typeof e&&!J;(n&&n!==K&&!o||t||!J&&$!=e)&&R(n,e)}}}function b(o,t){var i=t.position(),l=o.find(".fp-slidesContainer").parent(),a=t.index(),s=o.closest(".fp-section"),r=s.index(".fp-section"),c=s.data("anchor"),f=s.find(".fp-slidesNav"),d=t.data("anchor"),p=tn;if(n.onSlideLeave){var u,v=s.find(".fp-slide.active").index();u=v==a?"none":v>a?"left":"right",p||"none"===u||e.isFunction(n.onSlideLeave)&&n.onSlideLeave.call(this,c,r+1,v,u)}t.addClass("active").siblings().removeClass("active"),"undefined"==typeof d&&(d=a),!n.loopHorizontal&&n.controlArrows&&(s.find(".fp-controlArrow.fp-prev").toggle(0!=a),s.find(".fp-controlArrow.fp-next").toggle(!t.is(":last-child"))),s.hasClass("active")&&H(a,d,c,r);var h=function(){p||e.isFunction(n.afterSlideLoad)&&n.afterSlideLoad.call(this,c,r+1,d,a),J=!1};n.css3?(i="translate3d(-"+i.left+"px, 0px, 0px)",C(o.find(".fp-slidesContainer"),0<n.scrollingSpeed).css(Y(i)),setTimeout(function(){h()},n.scrollingSpeed,n.easing)):l.animate({scrollLeft:i.left},n.scrollingSpeed,n.easing,function(){h()}),f.find(".active").removeClass("active"),f.find("li").eq(a).find("a").addClass("active")}function y(){if(x(),Z){if("text"!==e(document.activeElement).attr("type")){var n=e(window).height();Math.abs(n-gn)>20*Math.max(gn,n)/100&&(e.fn.fullpage.reBuild(!0),gn=n)}}else clearTimeout(hn),hn=setTimeout(function(){e.fn.fullpage.reBuild(!0)},500)}function x(){if(n.responsive){var o=en.hasClass("fp-responsive");e(window).width()<n.responsive?o||(e.fn.fullpage.setAutoScrolling(!1,"internal"),e("#fp-nav").hide(),en.addClass("fp-responsive")):o&&(e.fn.fullpage.setAutoScrolling(sn.autoScrolling,"internal"),e("#fp-nav").show(),en.removeClass("fp-responsive"))}}function C(e){var o="all "+n.scrollingSpeed+"ms "+n.easingcss3;return e.removeClass("fp-notransition"),e.css({"-webkit-transition":o,transition:o})}function T(e){return e.addClass("fp-notransition")}function M(n,o){if(825>n||900>o){var t=Math.min(100*n/825,100*o/900).toFixed(2);e("body").css("font-size",t+"%")}else e("body").css("font-size","100%")}function A(o,t){n.menu&&(e(n.menu).find(".active").removeClass("active"),e(n.menu).find('[data-menuanchor="'+o+'"]').addClass("active")),n.navigation&&(e("#fp-nav").find(".active").removeClass("active"),o?e("#fp-nav").find('a[href="#'+o+'"]').addClass("active"):e("#fp-nav").find("li").eq(t).find("a").addClass("active"))}function L(n){var o=e(".fp-section.active").index(".fp-section");return n=n.index(".fp-section"),o==n?"none":o>n?"up":"down"}function k(e){e.css("overflow","hidden");var o=e.closest(".fp-section"),t=e.find(".fp-scrollable");if(t.length)var i=t.get(0).scrollHeight;else i=e.get(0).scrollHeight,n.verticalCentered&&(i=e.find(".fp-tableCell").get(0).scrollHeight);o=nn-parseInt(o.css("padding-bottom"))-parseInt(o.css("padding-top")),i>o?t.length?t.css("height",o+"px").parent().css("height",o+"px"):(n.verticalCentered?e.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />'):e.wrapInner('<div class="fp-scrollable" />'),e.find(".fp-scrollable").slimScroll({allowPageScroll:!0,height:o+"px",size:"10px",alwaysVisible:!0})):B(e),e.css("overflow","")}function B(e){e.find(".fp-scrollable").children().first().unwrap().unwrap(),e.find(".slimScrollBar").remove(),e.find(".slimScrollRail").remove()}function E(e){e.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:'+P(e)+'px;" />')}function P(e){var o=nn;return(n.paddingTop||n.paddingBottom)&&(o=e,o.hasClass("fp-section")||(o=e.closest(".fp-section")),e=parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom")),o=nn-e),o}function z(e,n){n?C(en):T(en),en.css(Y(e)),setTimeout(function(){en.removeClass("fp-notransition")},10)}function R(n,o){"undefined"==typeof o&&(o=0);var t=isNaN(n)?e('[data-anchor="'+n+'"]'):e(".fp-section").eq(n-1);n===K||t.hasClass("active")?I(t,o):v(t,function(){I(t,o)})}function I(e,n){if("undefined"!=typeof n){var o=e.find(".fp-slides"),t=o.find('[data-anchor="'+n+'"]');t.length||(t=o.find(".fp-slide").eq(n)),t.length&&b(o,t)}}function N(e,o){e.append('<div class="fp-slidesNav"><ul></ul></div>');var t=e.find(".fp-slidesNav");t.addClass(n.slidesNavPosition);for(var i=0;o>i;i++)t.find("ul").append('<li><a href="#"><span></span></a></li>');t.css("margin-left","-"+t.width()/2+"px"),t.find("li").first().find("a").addClass("active")}function H(e,o,t,i){var l="";n.anchors.length?(e?("undefined"!=typeof t&&(l=t),"undefined"==typeof o&&(o=e),$=o,F(l+"/"+o)):("undefined"!=typeof e&&($=o),F(t)),V(location.hash)):V("undefined"!=typeof e?i+"-"+e:String(i))}function F(e){if(n.recordHistory)location.hash=e;else if(Z||_)history.replaceState(void 0,void 0,"#"+e);else{var o=window.location.href.split("#")[0];window.location.replace(o+"#"+e)}}function V(n){n=n.replace("/","-").replace("#",""),e("body")[0].className=e("body")[0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g,""),e("body").addClass("fp-viewing-"+n)}function D(){var e,n=document.createElement("p"),o={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(n,null);for(var t in o)void 0!==n.style[t]&&(n.style[t]="translate3d(1px,1px,1px)",e=window.getComputedStyle(n).getPropertyValue(o[t]));return document.body.removeChild(n),void 0!==e&&0<e.length&&"none"!==e}function q(){return window.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function U(e){var n=[];return n.y="undefined"!=typeof e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,n.x="undefined"!=typeof e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,n}function W(n){e.fn.fullpage.setScrollingSpeed(0,"internal"),b(n.closest(".fp-slides"),n),e.fn.fullpage.setScrollingSpeed(sn.scrollingSpeed,"internal")}function O(e){n.scrollBar?en.scrollTop(e):n.css3?z("translate3d(0px, -"+e+"px, 0px)",!1):en.css("top",-e)}function Y(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function X(){O(0),e("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove(),e(".fp-section").css({height:"","background-color":"",padding:""}),e(".fp-slide").css({width:""}),en.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),e(".fp-section, .fp-slide").each(function(){B(e(this)),e(this).removeClass("fp-table active")}),T(en),T(en.find(".fp-easing")),en.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function(){e(this).replaceWith(this.childNodes)}),e("html, body").scrollTop(0)}function Q(e,o,t){n[e]=o,"internal"!==t&&(sn[e]=o)}function j(e,n){console&&console[e]&&console[e]("fullPage: "+n)}n=e.extend({menu:!1,anchors:[],navigation:!1,navigationPosition:"right",navigationColor:"#000",navigationTooltips:[],slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,easing:"easeInQuart",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:null,scrollOverflow:!1,touchSensitivity:5,normalScrollElementTouchThreshold:5,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,resize:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,sectionSelector:".section",slideSelector:".slide",afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null},n),function(){n.continuousVertical&&(n.loopTop||n.loopBottom)&&(n.continuousVertical=!1,j("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),n.continuousVertical&&n.scrollBar&&(n.continuousVertical=!1,j("warn","Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),e.each(n.anchors,function(n,o){(e("#"+o).length||e('[name="'+o+'"]').length)&&j("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")})}(),e.extend(e.easing,{easeInQuart:function(e,n,o,t,i){return t*(n/=i)*n*n*n+o}}),e.fn.fullpage.setAutoScrolling=function(o,t){Q("autoScrolling",o,t);var i=e(".fp-section.active");n.autoScrolling&&!n.scrollBar?(e("html, body").css({"overflow-y":"hidden","overflow-x":"auto",height:"100%"}),e.fn.fullpage.setRecordHistory(n.recordHistory,"internal"),en.css({"-ms-touch-action":"none","touch-action":"none"}),i.length&&O(i.position().top)):(e("html, body").css({"overflow-y":"visible","overflow-x":"visible",height:"initial"}),e.fn.fullpage.setRecordHistory(!1,"internal"),en.css({"-ms-touch-action":"","touch-action":""}),O(0),e("html, body").scrollTop(i.position().top))},e.fn.fullpage.setRecordHistory=function(e,n){Q("recordHistory",e,n)},e.fn.fullpage.setScrollingSpeed=function(e,n){Q("scrollingSpeed",e,n)},e.fn.fullpage.setMouseWheelScrolling=function(e){e?document.addEventListener?(document.addEventListener("mousewheel",d,!1),document.addEventListener("wheel",d,!1)):document.attachEvent("onmousewheel",d):document.addEventListener?(document.removeEventListener("mousewheel",d,!1),document.removeEventListener("wheel",d,!1)):document.detachEvent("onmousewheel",d)},e.fn.fullpage.setAllowScrolling=function(n,o){"undefined"!=typeof o?(o=o.replace(" ","").split(","),e.each(o,function(o,t){switch(t){case"up":an.up=n;break;case"down":an.down=n;break;case"left":an.left=n;break;case"right":an.right=n;break;case"all":e.fn.fullpage.setAllowScrolling(n)}})):n?(e.fn.fullpage.setMouseWheelScrolling(!0),(Z||_)&&(MSPointer=q(),e(document).off("touchstart "+MSPointer.down).on("touchstart "+MSPointer.down,f),e(document).off("touchmove "+MSPointer.move).on("touchmove "+MSPointer.move,r))):(e.fn.fullpage.setMouseWheelScrolling(!1),(Z||_)&&(MSPointer=q(),e(document).off("touchstart "+MSPointer.down),e(document).off("touchmove "+MSPointer.move)))},e.fn.fullpage.setKeyboardScrolling=function(e){n.keyboardScrolling=e},e.fn.fullpage.moveSectionUp=function(){var o=e(".fp-section.active").prev(".fp-section");o.length||!n.loopTop&&!n.continuousVertical||(o=e(".fp-section").last()),o.length&&v(o,null,!0)},e.fn.fullpage.moveSectionDown=function(){var o=e(".fp-section.active").next(".fp-section");o.length||!n.loopBottom&&!n.continuousVertical||(o=e(".fp-section").first()),o.length&&v(o,null,!1)},e.fn.fullpage.moveTo=function(n,o){var t="",t=isNaN(n)?e('[data-anchor="'+n+'"]'):e(".fp-section").eq(n-1);"undefined"!=typeof o?R(n,o):0<t.length&&v(t)},e.fn.fullpage.moveSlideRight=function(){p("next")},e.fn.fullpage.moveSlideLeft=function(){p("prev")},e.fn.fullpage.reBuild=function(o){tn=!0;var t=e(window).width();nn=e(window).height(),n.resize&&M(nn,t),e(".fp-section").each(function(){if(parseInt(e(this).css("padding-bottom")),parseInt(e(this).css("padding-top")),n.verticalCentered&&e(this).find(".fp-tableCell").css("height",P(e(this))+"px"),e(this).css("height",nn+"px"),n.scrollOverflow){var o=e(this).find(".fp-slide");o.length?o.each(function(){k(e(this))}):k(e(this))}o=e(this).find(".fp-slides"),o.length&&b(o,o.find(".fp-slide.active"))}),e(".fp-section.active").position(),t=e(".fp-section.active"),t.index(".fp-section")&&v(t),tn=!1,e.isFunction(n.afterResize)&&o&&n.afterResize.call(this),e.isFunction(n.afterReBuild)&&!o&&n.afterReBuild.call(this)};var K,$,G,J=!1,Z=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/),_="ontouchstart"in window||0<navigator.msMaxTouchPoints||navigator.maxTouchPoints,en=e(this),nn=e(window).height(),on=!1,tn=!1,ln="fullpage-wrapper",an={up:!0,down:!0,left:!0,right:!0},sn=jQuery.extend(!0,{},n);e.fn.fullpage.setAllowScrolling(!0),n.css3&&(n.css3=D()),e(this).length?(en.css({height:"100%",position:"relative"}),en.addClass(ln)):j("error","Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();"),e(n.sectionSelector).each(function(){e(this).addClass("fp-section")}),e(n.slideSelector).each(function(){e(this).addClass("fp-slide")}),n.navigation&&t(),e(".fp-section").each(function(t){var i=e(this),l=e(this).find(".fp-slide"),a=l.length;if(t||0!==e(".fp-section.active").length||e(this).addClass("active"),e(this).css("height",nn+"px"),(n.paddingTop||n.paddingBottom)&&e(this).css("padding",n.paddingTop+" 0 "+n.paddingBottom+" 0"),"undefined"!=typeof n.sectionsColor[t]&&e(this).css("background-color",n.sectionsColor[t]),"undefined"!=typeof n.anchors[t]&&e(this).attr("data-anchor",n.anchors[t]),a>1){t=100*a;var s=100/a;l.wrapAll('<div class="fp-slidesContainer" />'),l.parent().wrap('<div class="fp-slides" />'),e(this).find(".fp-slidesContainer").css("width",t+"%"),n.controlArrows&&o(e(this)),n.slidesNavigation&&N(e(this),a),l.each(function(){e(this).css("width",s+"%"),n.verticalCentered&&E(e(this))}),i=i.find(".fp-slide.active"),0==i.length?l.eq(0).addClass("active"):W(i)}else n.verticalCentered&&E(e(this))}).promise().done(function(){e.fn.fullpage.setAutoScrolling(n.autoScrolling,"internal");var o=e(".fp-section.active").find(".fp-slide.active");if(o.length&&(0!=e(".fp-section.active").index(".fp-section")||0==e(".fp-section.active").index(".fp-section")&&0!=o.index())&&W(o),n.fixedElements&&n.css3&&e(n.fixedElements).appendTo("body"),n.navigation&&(G.css("margin-top","-"+G.height()/2+"px"),G.find("li").eq(e(".fp-section.active").index(".fp-section")).find("a").addClass("active")),n.menu&&n.css3&&e(n.menu).closest(".fullpage-wrapper").length&&e(n.menu).appendTo("body"),n.scrollOverflow?("complete"===document.readyState&&i(),e(window).on("load",i)):e.isFunction(n.afterRender)&&n.afterRender.call(this),x(),o=window.location.hash.replace("#","").split("/")[0],o.length){var t=e('[data-anchor="'+o+'"]');!n.animateAnchor&&t.length&&(n.autoScrolling?O(t.position().top):(O(0),V(o),e("html, body").scrollTop(t.position().top)),A(o,null),e.isFunction(n.afterLoad)&&n.afterLoad.call(this,o,t.index(".fp-section")+1),t.addClass("active").siblings().removeClass("active"))}e(window).on("load",function(){var e=window.location.hash.replace("#","").split("/"),n=e[0],e=e[1];n&&R(n,e)})});var rn,cn,fn=!1;e(window).on("scroll",l);var dn=0,pn=0,un=0,vn=0;e(window).on("hashchange",S),e(document).keydown(function(o){if(n.keyboardScrolling&&n.autoScrolling&&(40!=o.which&&38!=o.which||o.preventDefault(),!on))switch(o.which){case 38:case 33:e.fn.fullpage.moveSectionUp();break;case 40:case 34:e.fn.fullpage.moveSectionDown();break;case 36:e.fn.fullpage.moveTo(1);break;case 35:e.fn.fullpage.moveTo(e(".fp-section").length);break;case 37:e.fn.fullpage.moveSlideLeft();break;case 39:e.fn.fullpage.moveSlideRight()}}),e(document).on("click touchstart","#fp-nav a",function(n){n.preventDefault(),n=e(this).parent().index(),v(e(".fp-section").eq(n))}),e(document).on("click touchstart",".fp-slidesNav a",function(n){n.preventDefault(),n=e(this).closest(".fp-section").find(".fp-slides");var o=n.find(".fp-slide").eq(e(this).closest("li").index());b(n,o)}),n.normalScrollElements&&(e(document).on("mouseenter",n.normalScrollElements,function(){e.fn.fullpage.setMouseWheelScrolling(!1)}),e(document).on("mouseleave",n.normalScrollElements,function(){e.fn.fullpage.setMouseWheelScrolling(!0)})),e(".fp-section").on("click touchstart",".fp-controlArrow",function(){e(this).hasClass("fp-prev")?e.fn.fullpage.moveSlideLeft():e.fn.fullpage.moveSlideRight()}),e(window).resize(y);var hn,gn=nn;e.fn.fullpage.destroy=function(o){e.fn.fullpage.setAutoScrolling(!1,"internal"),e.fn.fullpage.setAllowScrolling(!1),e.fn.fullpage.setKeyboardScrolling(!1),e(window).off("scroll",l).off("hashchange",S).off("resize",y),e(document).off("click","#fp-nav a").off("mouseenter","#fp-nav li").off("mouseleave","#fp-nav li").off("click",".fp-slidesNav a").off("mouseover",n.normalScrollElements).off("mouseout",n.normalScrollElements),e(".fp-section").off("click",".fp-controlArrow"),o&&X()}}}(jQuery);
/*snow*/
var Snow=function(){var t=function(t){function i(){window.requestAnimationFrame(i),o.globalCompositeOperation="source-over",o.clearRect(0,0,n,a),o.globalCompositeOperation="lighter",Math.random()>u&&new e;for(var t in w)w[t].draw()}function e(){this.x=h,this.y=m,this.vx=Math.random()*p+1.5,this.vy=Math.random()*g-4,this.growth=.01*(Math.abs(this.vx)+Math.abs(this.vy)),l++,w[l]=this,this.id=l,this.size=Math.random()*v}var n,a,o,s,r,h,m,d,c,w={},u=.85,l=0,v=1,p=-2,g=4;if(this.options=$.extend({image:"",startColor:"rgba(0,0,0,1)",endColor:"rgba(0,0,0,0.3)"},t),this.canvas=this.options.canvas.get(0),o=this.canvas.getContext("2d"),u=(10-this.options.count)/10,v=this.options.size,n=this.canvas.width,a=this.canvas.height,h=n/2,m=a/2,s=this.options.startColor,r=this.options.endColor,d=this.options.image,c=$("<img src='"+d+"' style='display: none'>"),this.options.speed){var f=this.options.speed.split(",");f[1]&&(p=f[0],g=f[1])}if(this.options.startPoint){var x=this.options.startPoint.split(",");x[1]&&(h=1*x[0],m=1*x[1])}Date.now||(Date.now=function(){return(new Date).getTime()});for(var y=["webkit","moz"],A=0;A<y.length&&!window.requestAnimationFrame;++A){var C=y[A];window.requestAnimationFrame=window[C+"RequestAnimationFrame"],window.cancelAnimationFrame=window[C+"CancelAnimationFrame"]||window[C+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var b=0;window.requestAnimationFrame=function(t){var i=Date.now(),e=Math.max(b+16,i);return setTimeout(function(){t(b=e)},e-i)},window.cancelAnimationFrame=clearTimeout}e.prototype.draw=function(){if(this.x+=2*this.vx,this.y+=2*this.vy,this.size+=this.growth,(this.x>n||this.y>a)&&delete w[this.id],d)return void o.drawImage(c.get(0),this.x,this.y,this.size,this.size);var t=o.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);t.addColorStop(0,s),t.addColorStop(1,r),o.fillStyle=t,o.beginPath(),o.arc(this.x,this.y,this.size,0*Math.PI,2*Math.PI),o.fill()},window.requestAnimationFrame(i)};return{create:function(i,e){document.createElement("canvas").getContext&&$(i).each(function(i,n){var a=$.extend({},e);return $.each(n.attributes,function(t,i){a[$.camelCase(i.name)]=Number(Number(i.value))?Number(i.value):i.value}),a.canvas=$(n),new t(a)})}}}();
/*mousewheel*/
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var s=t||window.event,a=h.call(arguments,1),r=0,f=0,d=0,c=0,m=0,g=0;if(t=e.event.fix(s),t.type="mousewheel","detail"in s&&(d=-1*s.detail),"wheelDelta"in s&&(d=s.wheelDelta),"wheelDeltaY"in s&&(d=s.wheelDeltaY),"wheelDeltaX"in s&&(f=-1*s.wheelDeltaX),"axis"in s&&s.axis===s.HORIZONTAL_AXIS&&(f=-1*d,d=0),r=0===d?f:d,"deltaY"in s&&(d=-1*s.deltaY,r=d),"deltaX"in s&&(f=s.deltaX,0===d&&(r=-1*f)),0!==d||0!==f){if(1===s.deltaMode){var w=e.data(this,"mousewheel-line-height");r*=w,d*=w,f*=w}else if(2===s.deltaMode){var v=e.data(this,"mousewheel-page-height");r*=v,d*=v,f*=v}if(c=Math.max(Math.abs(d),Math.abs(f)),(!l||l>c)&&(l=c,i(s,c)&&(l/=40)),i(s,c)&&(r/=40,f/=40,d/=40),r=Math[r>=1?"floor":"ceil"](r/l),f=Math[f>=1?"floor":"ceil"](f/l),d=Math[d>=1?"floor":"ceil"](d/l),u.settings.normalizeOffset&&this.getBoundingClientRect){var p=this.getBoundingClientRect();m=t.clientX-p.left,g=t.clientY-p.top}return t.deltaX=f,t.deltaY=d,t.deltaFactor=l,t.offsetX=m,t.offsetY=g,t.deltaMode=0,a.unshift(t,r,f,d),o&&clearTimeout(o),o=setTimeout(n,200),(e.event.dispatch||e.event.handle).apply(this,a)}}function n(){l=null}function i(e,t){return u.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120===0}var o,l,s=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],a="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],h=Array.prototype.slice;if(e.event.fixHooks)for(var r=s.length;r;)e.event.fixHooks[s[--r]]=e.event.mouseHooks;var u=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var n=a.length;n;)this.addEventListener(a[--n],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",u.getLineHeight(this)),e.data(this,"mousewheel-page-height",u.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var n=a.length;n;)this.removeEventListener(a[--n],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var n=e(t),i=n["offsetParent"in e.fn?"offsetParent":"parent"]();return i.length||(i=e("body")),parseInt(i.css("fontSize"),10)||parseInt(n.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});
//tab切换pic
(function(){var c=function(){var e=[].slice.call(arguments);e.push(c.options);if(e[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)){e[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm,function(h,i){var f=document;var g=f&&f.getElementById(i);e[0]=g?(g.value||g.innerHTML):h;});}if(arguments.length==1){return c.compile.apply(c,e);}if(arguments.length>=2){return c.to_html.apply(c,e);}};var d={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(e){return d.escapehash[e];},escaping:function(e){return typeof(e)!=="string"?e:e.replace(/[&<>"]/igm,this.escapereplace);},detection:function(e){return typeof(e)==="undefined"?"":e;}};var b=function(e){if(typeof(console)!=="undefined"){if(console.warn){console.warn(e);return;}if(console.log){console.log(e);return;}}throw (e);};var a=function(h,f){h=h!==Object(h)?{}:h;if(h.__proto__){h.__proto__=f;return h;}var g=function(){};var j=Object.create?Object.create(f):new (g.prototype=f,g);for(var e in h){if(h.hasOwnProperty(e)){j[e]=h[e];}}return j;};c.__cache={};c.version="0.6.5-stable";c.settings={};c.tags={operationOpen:"{@",operationClose:"}",interpolateOpen:"\\${",interpolateClose:"}",noneencodeOpen:"\\$\\${",noneencodeClose:"}",commentOpen:"\\{#",commentClose:"\\}"};c.options={cache:true,strip:true,errorhandling:true,detection:true,_method:a({__escapehtml:d,__throw:b,__juicer:c},{})};c.tagInit=function(){var f=c.tags.operationOpen+"each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?"+c.tags.operationClose;var h=c.tags.operationOpen+"\\/each"+c.tags.operationClose;var i=c.tags.operationOpen+"if\\s*([^}]*?)"+c.tags.operationClose;var j=c.tags.operationOpen+"\\/if"+c.tags.operationClose;var n=c.tags.operationOpen+"else"+c.tags.operationClose;var o=c.tags.operationOpen+"else if\\s*([^}]*?)"+c.tags.operationClose;var k=c.tags.interpolateOpen+"([\\s\\S]+?)"+c.tags.interpolateClose;var l=c.tags.noneencodeOpen+"([\\s\\S]+?)"+c.tags.noneencodeClose;var m=c.tags.commentOpen+"[^}]*?"+c.tags.commentClose;var g=c.tags.operationOpen+"each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)"+c.tags.operationClose;var e=c.tags.operationOpen+"include\\s*([^}]*?)\\s*,\\s*([^}]*?)"+c.tags.operationClose;c.settings.forstart=new RegExp(f,"igm");c.settings.forend=new RegExp(h,"igm");c.settings.ifstart=new RegExp(i,"igm");c.settings.ifend=new RegExp(j,"igm");c.settings.elsestart=new RegExp(n,"igm");c.settings.elseifstart=new RegExp(o,"igm");c.settings.interpolate=new RegExp(k,"igm");c.settings.noneencode=new RegExp(l,"igm");c.settings.inlinecomment=new RegExp(m,"igm");c.settings.rangestart=new RegExp(g,"igm");c.settings.include=new RegExp(e,"igm");};c.tagInit();c.set=function(f,j){var h=this;var e=function(i){return i.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm,function(l){return"\\"+l;});};var k=function(l,m){var i=l.match(/^tag::(.*)$/i);if(i){h.tags[i[1]]=e(m);h.tagInit();return;}h.options[l]=m;};if(arguments.length===2){k(f,j);return;}if(f===Object(f)){for(var g in f){if(f.hasOwnProperty(g)){k(g,f[g]);}}}};c.register=function(g,f){var e=this.options._method;if(e.hasOwnProperty(g)){return false;}return e[g]=f;};c.unregister=function(f){var e=this.options._method;if(e.hasOwnProperty(f)){return delete e[f];}};c.template=function(e){var f=this;this.options=e;this.__interpolate=function(g,l,i){var h=g.split("|"),k=h[0]||"",j;if(h.length>1){g=h.shift();j=h.shift().split(",");k="_method."+j.shift()+".call({}, "+[g].concat(j)+")";}return"<%= "+(l?"_method.__escapehtml.escaping":"")+"("+(!i||i.detection!==false?"_method.__escapehtml.detection":"")+"("+k+")) %>";};this.__removeShell=function(h,g){var i=0;h=h.replace(c.settings.forstart,function(n,k,m,l){var m=m||"value",l=l&&l.substr(1);var j="i"+i++;return"<% ~function() {for(var "+j+" in "+k+") {if("+k+".hasOwnProperty("+j+")) {var "+m+"="+k+"["+j+"];"+(l?("var "+l+"="+j+";"):"")+" %>";}).replace(c.settings.forend,"<% }}}(); %>").replace(c.settings.ifstart,function(j,k){return"<% if("+k+") { %>";}).replace(c.settings.ifend,"<% } %>").replace(c.settings.elsestart,function(j){return"<% } else { %>";}).replace(c.settings.elseifstart,function(j,k){return"<% } else if("+k+") { %>";}).replace(c.settings.noneencode,function(k,j){return f.__interpolate(j,false,g);}).replace(c.settings.interpolate,function(k,j){return f.__interpolate(j,true,g);}).replace(c.settings.inlinecomment,"").replace(c.settings.rangestart,function(m,l,n,k){var j="j"+i++;return"<% ~function() {for(var "+j+"="+n+";"+j+"<"+k+";"+j+"++) {{var "+l+"="+j+"; %>";}).replace(c.settings.include,function(l,j,k){return"<%= _method.__juicer("+j+", "+k+"); %>";});if(!g||g.errorhandling!==false){h="<% try { %>"+h;h+='<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>';}return h;};this.__toNative=function(h,g){return this.__convert(h,!g||g.strip);};this.__lexicalAnalyze=function(k){var j=[];var o=[];var n="";var g=["if","each","_","_method","console","break","case","catch","continue","debugger","default","delete","do","finally","for","function","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","null","typeof","class","enum","export","extends","import","super","implements","interface","let","package","private","protected","public","static","yield","const","arguments","true","false","undefined","NaN"];var m=function(r,q){if(Array.prototype.indexOf&&r.indexOf===Array.prototype.indexOf){return r.indexOf(q);}for(var p=0;p<r.length;p++){if(r[p]===q){return p;}}return -1;};var h=function(p,i){i=i.match(/\w+/igm)[0];if(m(j,i)===-1&&m(g,i)===-1&&m(o,i)===-1){if(typeof(window)!=="undefined"&&typeof(window[i])==="function"&&window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)){return p;}if(typeof(global)!=="undefined"&&typeof(global[i])==="function"&&global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)){return p;}if(typeof(c.options._method[i])==="function"||c.options._method.hasOwnProperty(i)){o.push(i);return p;}j.push(i);}return p;};k.replace(c.settings.forstart,h).replace(c.settings.interpolate,h).replace(c.settings.ifstart,h).replace(c.settings.elseifstart,h).replace(c.settings.include,h).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/igm,h);for(var l=0;l<j.length;l++){n+="var "+j[l]+"=_."+j[l]+";";}for(var l=0;l<o.length;l++){n+="var "+o[l]+"=_method."+o[l]+";";}return"<% "+n+" %>";};this.__convert=function(h,i){var g=[].join("");g+="'use strict';";g+="var _=_||{};";g+="var _out='';_out+='";if(i!==false){g+=h.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;";return g;}g+=h.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";return g;};this.parse=function(h,g){var i=this;if(!g||g.loose!==false){h=this.__lexicalAnalyze(h)+h;}h=this.__removeShell(h,g);h=this.__toNative(h,g);this._render=new Function("_, _method",h);this.render=function(k,j){if(!j||j!==f.options._method){j=a(j,f.options._method);}return i._render.call(this,k,j);};return this;};};c.compile=function(g,f){if(!f||f!==this.options){f=a(f,this.options);}try{var h=this.__cache[g]?this.__cache[g]:new this.template(this.options).parse(g,f);if(!f||f.cache!==false){this.__cache[g]=h;}return h;}catch(i){b("Juicer Compile Exception: "+i.message);return{render:function(){}};}};c.to_html=function(f,g,e){if(!e||e!==this.options){e=a(e,this.options);}return this.compile(f,e).render(g,e._method);};typeof(module)!=="undefined"&&module.exports?module.exports=c:this.juicer=c;})();



;(function(){
	$(".gift_content .ico_close").click(function(){
		//$(".gift_content").hide();
		//$("#mask").hide();
	})
	$(".pt a").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	})
	var e=1,i=!0,t=null,
	n=function(){
		s(),
		d(),
		c(),
		snowFun(),
		scrollPics("#section4-tab", false, 6, 3000,"click"),
		o()
	},
	o=function(){
		var n=$("#mask"),o=$(".video_content"),l=$(".gift_content"),yuy=$(".yue_content");
		$(".video_btn").click(function(){
			var link_url = $(this).attr('data-id');
			$(".video_wrap").html('');
			n.show(),setTimeout(function(){
				$(".video_wrap").append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>');
				n.addClass("show")
				,o.show()},50)
		}),
		$(".video_content .close_pop").click(function(){
			n.removeClass("show"),o.hide(),setTimeout(function(){n.hide()},300)
		}),
		$(".btns a.libao").click(function(e){
			e.preventDefault()
			//alert('敬请期待')
			n.show(),yuy.show();
			$(".mask").show();
		//},50)
		}),
		$(".yue_content .y_btn").click(function(){
				var phone=$(".y_tel").val();
				var myreg = /^(((13[0-9]{1})|(14[579]{1})|(17[0135678]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if(phone==''){
					$(".yue_content").find("p").show().html("请输入手机号");
					return false;
				}else if( !myreg.test(phone) ){
					$(".yue_content").find("p").show().html("请输入有效的手机号码");
					return false;
				}else if( phone.length != 11 ){
					$(".yue_content").find("p").show().html("请输入有效的手机号码");
					return false;
				}else if(isNaN(phone)){
					$(".yue_content").find("p").show().html("请输入正确的格式");
					return false;
				}else{
					$.post(
						'/site/save_phone',
						{
							phone:phone
						},
						function(data){
							var data = eval('(' + data + ')');
							if(data == 1){
								$('.yue_content').hide();
								$(".yue_secceed").show();
								$(".yue_content").find("p").hide()
								$(".mask").show();
								return true;
							}else if(data == 2){
								$(".yue_content").find("p").show().html("该手机号码已经预约过了");
								return false;
							}else if(data == 3){
								$(".yue_content").find("p").show().html("请输入有效的手机号码");
								return false;
							}else{
								$(".yue_content").find("p").show().html("预约失败，请重新预约");
								return false;
							}
						}
					);
					/* $(this).parent().hide();
					$(".yue_secceed").show();
					$(".yue_content").find("p").hide()
					$(".mask").show();
					return true; */
					
				}
		}),
		$(".close").click(function(){
			$(this).parent().hide();
			$(".mask").hide();
		})
		$(".setion1_downloadbar .open_btn").click(function(){$this=$(this),$this.hasClass("show")?$(".setion1_downloadbar").animate({left:"0px"},300):$(".setion1_downloadbar").animate({left:"-347px"},300),$this.toggleClass("show")}),
			$(".section4-tab-ul li[data-tid=1]").find("img:last").show().siblings().hide();
				$(".section4-tab-ul li").click(function(){
					var _index = $(this).data('tid');
					$(".info[data-tid="+_index+"]").show().siblings().hide();
                    $(this).find("img:last").show().siblings().hide();;
                    $(this).siblings().find("img:first").show()
				});
		$("#flash-wrap").css("height",$(".fp-section").height());



	},
	snowFun=function(){
		$(".snow-canvas")[0].width=1920,
		$(".snow-canvas")[0].height=1040,
		Snow.create(".snow-canvas",{startPoint:"1720,-100",image:"http://dev.static.yingxiong.com/yzr/2.0/images/yzrfc-snow5.png",speed:"-6, 6",size:"25",count:"4",startColor:"rgba(23,47,140,1)",endColor:"rgba(20,44,137,0.3)"})
	},
	s=function(){
		$("#fullpage").fullpage({
			verticalCentered:!1,
			css3:!0,
			anchors:["page1","page2","page3","page4","page5","page6"],
			menu:"#side_nav ul",
			afterLoad:function(i,t){e=t;t==2?$(".section2").addClass("ani"):$(".section2").removeClass("ani");/*t>1?($(".setion1_downloadbar").animate({left:"-347px"},300),$(".setion1_downloadbar .open_btn").toggleClass("show")):""*/},
			afterRender:function(){
				setTimeout(function(){$(".section1").siblings(".section").addClass("show")},300)
			}
		}),
		$(window).height()<730&&$(".down_arrow").hide(),
		document.documentElement.clientWidth<1510&&$("#header").css({width:$(window).width()})
		,$("#side_nav .arrow2").click(function(){$.fn.fullpage.moveSectionDown()}),
		$("#side_nav .arrow1").click(function(){$.fn.fullpage.moveSectionUp()})
	},
	c=function(){
		$(".section3-feature-ul li a").hover(function(){$(this).parent("li").addClass("active").siblings().removeClass("active")});
		var s=$(".section6_wrap"),r=s.find(".section6");
		$(document).mousewheel(function(i,t){0>t&&5==e&&(s.show(),r.animate({bottom:"0px",opacity:"1"},300))}),
		s.mousewheel(function(e,i){e.stopPropagation(),i>0&&r.animate({bottom:"-550px",opacity:"0"},300,function(){s.hide()})})
	},
	d=function(){
	    $("#section2_silde_news").slide();
	    $("#section2_slide_banner").slide({titCell:".hd ul",mainCell:".bd ul",effect:"left",autoPlay:!0,autoPage:true,delayTime:500,interTime:5e3,trigger:"click"});
	},
	scrollPics=function(o, autoplay, minNum, time,ev){
		var ul = $(o).find("ul"),
		    li_li = ul.find("li"),
			li_len = ul.find("li").length,
			li_w = ul.find("li").width(),
			left = $(o).find(".prev"),
			right = $(o).find(".next"),
			timer = null,
			minNum = minNum || 0,
			time = time || 5000;

		if(li_len > minNum){
			right.click(function() {
				if (!ul.is(":animated")) {
					ul.animate({
						"left": -(ul.find("li").eq(0).width())
					}, 200, function() {
						ul.find("li").eq(0).appendTo(ul);
						ul.css("left", 0);
					})
				}
			});
			left.click(function() {
				if (!ul.is(":animated")) {
					ul.find("li").last().prependTo(ul);
					ul.css("left", -(ul.find("li").eq(0).width()));
					ul.animate({
						"left": 0
					}, 200);
				}
			});
			if (autoplay) {
				timer = setInterval(function() {
					right.trigger("click");
				}, time);
				$(o).mouseenter(function() {
					clearInterval(timer);
				})
				$(o).mouseleave(function() {
					clearInterval(timer);
					timer = setInterval(function() {
						right.trigger("click");
					}, time);
				})
			};
		}
    };
	n()

})();

var img_url = "http://dev.static.yingxiong.com/yzr/2.0/",
data = {
    list: [
            {
				 id:1,
			   icon:img_url+"images/yzrfc-s4-s1-1.jpg",
			   name:"魂",
			   desc:"外表冷漠，但坚守着侠义之道的“组织”成员，此时年仅19岁的他仍然对命运充满迷茫，因为介入了“怪面”之乱而展开了一段揭开自己身世的旅程。他最终会成长为那个顽强地与命运抗争的传奇英雄，他鬼魅般的身影和耀眼的赤红刀刃，将会在混乱的武林中斩开一线光明，并成为影与刃的传说。",
			   type:img_url+"images/yzrfc-s4-s1-icon.png",
		   typeDesc:"若没有心，看清了这局有何用？",
			typeImg:img_url+"images/yzdfc-lx-wl.png",
			   arms:"黑伤",
			 lineup:"组织成员/魔堡血脉",
			  skill:[
					{skillIcon:img_url+"images/yzrfc-s4-s1-1-1.png",
					 skillName:"瞬杀",
					 skillDesc:"当今武林没有人能躲过这一剑，向前远距离突刺攻击。"},
					{skillIcon:img_url+"images/yzrfc-s4-s1-1-2.png",
					 skillName:"飞杀",
					 skillDesc:"向上挑起敌人，造成大量伤害。"},
					{skillIcon:img_url+"images/yzrfc-s4-s1-1-3.png",
					 skillName:"影杀",
					 skillDesc:"幻化为无数黑影向敌人发动攻击，霸体技能无法被打断，但仍会被控制技能控制。"},
					{skillIcon:img_url+"images/yzrfc-s4-s1-1-4.png",
					 skillName:"灭杀",
					 skillDesc:"无法抑制的杀气作用下爆发出来的连续斩击。霸体技能无法被打断，但仍会被控制技能控制。"},
					{skillIcon:img_url+"images/yzrfc-s4-s1-1-5.png",
					 skillName:"血噬",
					 skillDesc:"提高自身攻击力"},
					{skillIcon:img_url+"images/yzrfc-s4-s1-1-6.png",
					 skillName:"夜色",
					 skillDesc:"每次闪避都使得下一招造成的伤害提高"}
					]

			},
			{
			     id:2,
			   icon:img_url+"images/yzrfc-s4-s1-2.jpg",
			   name:"银月",
			   desc:"武林正道门派“月堡”堡主的养女，自小在严苛，正统的正派环境中长大。追寻着正道的路途，遵循着师门的教诲，以最高的道德和正义理念指引着自己。",
			   type:img_url+"images/yzrfc-s4-s2-icon.png",
		   typeDesc:"一切邪魔歪道，都无法生存在阳光之下。",
			typeImg:img_url+"images/yzdfc-lx-tk.png",
			   arms:"终极斧",
			 lineup:"正道联盟",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-2-1.png",
					 skillName:"狂风暴雨",
			         skillDesc:"大范围旋转攻击，最后一击可击晕敌人2秒，造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-2-2.png",
					 skillName:"啸风轻鸣",
				     skillDesc:"连续挥砍并将敌人挑空，可蓄力两段，造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-2-3.png",
					 skillName:"无畏突击",
			         skillDesc:"意志坚定地向前突进，无人可以阻挡。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-2-4.png",
					 skillName:"至尊银皇",
				     skillDesc:"正气凌然的惊天一击，将敌人挑起后凌空斩下。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-2-5.png",
					 skillName:"坚定意志",
			         skillDesc:"降低全队受到的物理伤害"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-2-6.png",
					 skillName:"杀气护体",
			         skillDesc:"当五秒未受到任何伤害时，获得一个护盾，可吸收伤害"}
				 ]
			},
			{
				 id:3,
			   icon:img_url+"images/yzrfc-s4-s1-3.jpg",
			   name:"瞳媚",
			   desc:"身世离奇而富有魅力的女子。而她的面庞却总是冷若冰霜，仿佛带有某种天生的孤独感。她本以为自己的一生都将是“主人”手中危险无情的武器，然而19岁时遇到的那名黑衣红刃的少年，却彻底改变了她的人生轨迹。",
			   type:img_url+"images/yzrfc-s4-s3-icon.png",
		   typeDesc:"我的生命中都是悲伤的回忆。",
			typeImg:img_url+"images/yzdfc-lx-fg.png",
			   arms:"神石·墨曲流光",
			 lineup:"玄家密探",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-1.png",
					 skillName:"幽冥电球",
			         skillDesc:"向前方释放一个长距离飞行的电球，对路径上的敌人造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-2.png",
					 skillName:"巨大电球",
				     skillDesc:"自身后退并在原地放出一个巨大的电球，造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-3.png",
					 skillName:"突袭喷泉",
			         skillDesc:"向前突进并掀起三道能量喷泉。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-4.png",
					 skillName:"光之罚",
				     skillDesc:"在身体周边生成多道能量喷泉洗礼敌人。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-3-5.png",
					 skillName:"赤瞳",
			         skillDesc:"提高自身伤害"},
				   {skillIcon:img_url+"images/yzrfc-s4-s1-3-6.png",
					skillName:"高能",
			        skillDesc:"每次释放技能，提升自身攻击力"}
				 ]
		    },
			{
			     id:4,
			   icon:img_url+"images/yzrfc-s4-s1-4.jpg",
			   name:"小宏",
			   desc:"丐帮长老胡九的弟子，生性乐观、热爱美食的少年。15岁的他本以为自己会安稳地做一辈子乞丐厨师，却猝不及防地被卷入武林阴谋的漩涡之中，开启了一段危险而血脉偾张的冒险之旅，也书写了自己的人生传奇。",
			   type:img_url+"images/yzrfc-s4-s4-icon.png",
		   typeDesc:"没有什么事情是一只烧鸡不能解决的，如果有，就两只。",
			typeImg:img_url+"images/yzdfc-lx-tk.png",
			   arms:"神锅·厨神",
			 lineup:"丐帮遗孤",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-4-1.png",
					 skillName:"热油瓶",
			         skillDesc:"丢出一个易燃易爆的油瓶，使敌人的物理防御降低，造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-4-2.png",
					 skillName:"打破砂锅",
				     skillDesc:"将敌人挑空，将锅踹下砸晕敌人2秒，造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-4-3.png",
					 skillName:"无畏突击",
			         skillDesc:"背起大锅向前突击，造成大量伤害。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-4-4.png",
					 skillName:"开饭喽",
				     skillDesc:"放下大锅，升起篝火，烹饪一顿美食并大快朵颐，就餐期间免伤50%并且恢复生命值。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-4-5.png",
					 skillName:"移花接木",
			         skillDesc:"降低全队受到的所有伤害"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-4-6.png",
					 skillName:"精湛厨艺",
			         skillDesc:"每次释放技能后为全队套一个魔法盾，可吸收一定量的伤害，持续1.5秒"}
				 ]
			},
			{
			     id:5,
			   icon:img_url+"images/yzrfc-s4-s1-5.jpg",
			   name:"苗苗",
			   desc:"出身于医药世家，自小便跟随父亲研习医术。她善良、单纯、缺乏江湖经验，但她可爱柔弱的外表下，是一颗坚强而骄傲的心。苗苗和她摇摆着的巨大木杖不仅治愈了众人的伤痛，也成为了无情江湖中的一线希望。",
			   type:img_url+"images/yzrfc-s4-s5-icon.png",
		   typeDesc:"一不小心又赢了呢！",
			typeImg:img_url+"images/yzdfc-lx-fp.png",
			   arms:"药神杖",
			 lineup:"药师家族",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-5-1.png",
					 skillName:"粉色冲击波",
			         skillDesc:"苗苗挥舞手中的法杖，向前挥出一个粉红色的冲击波。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-5-2.png",
					 skillName:"猫咪突进",
				     skillDesc:"猫咪前突冲击，并用后爪将敌人挑起，造成大量伤害，同时使敌人造成的伤害降低。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-5-3.png",
					 skillName:"一肚遮天",
			         skillDesc:"猫咪翻滚着跃起，并从空中扑腾而下。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-5-4.png",
					 skillName:"全员治愈",
				     skillDesc:"原地持续默念某种神秘咒语，恢复自身及场下队友的生命值。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-5-5.png",
					 skillName:"猫咪护体",
			         skillDesc:"降低自身受到的物理伤害"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-5-6.png",
					 skillName:"越战越勇",
			         skillDesc:"所有攻击都有20%概率使敌人受到的物理伤害提高，持续5秒"}
				 ]
			},
			{
				 id:7,
			   icon:img_url+"images/yzrfc-s4-s1-7.jpg",
			   name:"钩者",
			   desc:"“组织”的乙级鬼差，独门绝技“连环钩”夺命无数。在众鬼差之中，论疯狂嗜血，钩者当属第一，他斩杀时发出的歇斯底里的笑声，似乎是一种彻底的释放，令人心惊胆寒。",
			   type:img_url+"images/yzrfc-s4-s7-icon.png",
		   typeDesc:"你还没有看清楚这一局哦，哈哈哈哈哈！",
			typeImg:img_url+"images/yzdfc-lx-wl.png",
			   arms:"离别钩",
			 lineup:"组织鬼差",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-1.png",
					 skillName:"幽冥电球",
			         skillDesc:"用钩子将敌人拉近并施加两段斩击，造成流血效果。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-2.png",
					 skillName:"巨大电球",
				     skillDesc:"疯狂的近身乱舞攻击并在最后将敌人击飞，对流血目标造成额外伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-3.png",
					 skillName:"突袭喷泉",
			         skillDesc:"前冲多段攻击，自身暴击率提升。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-3-4.png",
					 skillName:"光之罚",
				     skillDesc:"前方大范围乱舞攻击，并用钩子组成一个夺命飞轮收割敌人。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-3-5.png",
					 skillName:"赤瞳",
			         skillDesc:"提高全队暴击率"},
				   {skillIcon:img_url+"images/yzrfc-s4-s1-3-6.png",
					skillName:"高能",
			        skillDesc:"每次释放技能为全队增加攻击力，持续2秒"}
				 ]
		    },
			{
			     id:8,
			   icon:img_url+"images/yzrfc-s4-s1-8.jpg",
			   name:"锤者",
			   desc:"“组织”的乙级鬼差。体型壮硕，能抡起重达数百斤的大锤。他木讷、迟钝，却战斗力惊人。他没有自我，因而他对“组织”的忠诚也绝对没有任何人能够撼动。",
			   type:img_url+"images/yzrfc-s4-s8-icon.png",
		   typeDesc:"这么大的锤……锤子你见……见过吗！",
			typeImg:img_url+"images/yzdfc-lx-tk.png",
			   arms:"神锤·行星核心",
			 lineup:"组织鬼差",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-8-1.png",
					 skillName:"震荡锤击",
			         skillDesc:"跃起砸地产生震荡波，砸晕敌人2秒，造成伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-8-2.png",
					 skillName:"蓄力锤击",
				     skillDesc:"憋足了劲向前一砸，造成基础伤害，可蓄力两段，造成大量伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-8-3.png",
					 skillName:"怒锤冲撞",
			         skillDesc:"前冲突进并将敌人抡起，带阻挡判定。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-8-4.png",
					 skillName:"巨锤天降",
				     skillDesc:"原地跃至高空中，可选择落点，两秒后落地，砸晕敌人4秒并造成大量伤害。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-8-5.png",
					 skillName:"木质皮肤",
			         skillDesc:"自身受到的法术伤害降低"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-8-6.png",
					 skillName:"破釜沉舟",
			         skillDesc:"受到攻击时进入激怒状态，增加攻击力，持续5秒，最多叠加3层"}
				 ]
			},
			{
			     id:9,
			   icon:img_url+"images/yzrfc-s4-s1-9.jpg",
			   name:"铁诞",
			   desc:"丐帮叛逃弟子，贪财好色，野心勃勃。为了实现自己的野心，他不惜背叛养育自己的师门，对自己从内到外进行了彻底的“杀气改造”，这改造只保存了他的大脑和脊柱，其余都被无坚不摧的精钢所重铸。",
			   type:img_url+"images/yzrfc-s4-s9-icon.png",
		   typeDesc:"美人儿，你在哪里？",
			typeImg:img_url+"images/yzdfc-lx-tk.png",
			   arms:"神蛹·混元一体",
			 lineup:"怪面成员",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-9-1.png",
					 skillName:"铁壳滚地",
			         skillDesc:"将全身缩入铁壳之中高速旋转，朝敌人碾压。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-9-2.png",
					 skillName:"蛋壳震地",
				     skillDesc:"变成蛋高高跃起，连续砸击前方。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-9-3.png",
					 skillName:"高速飞蛋",
			         skillDesc:"缩入铁壳之中向前猛烈突击，造成大量伤害。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-9-4.png",
					 skillName:"无尽爆弹",
				     skillDesc:"如同天女散花般向四周散射出无数爆弹。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-9-5.png",
					 skillName:"机械磨光",
			         skillDesc:"全队受到的减益效果持续时间缩短"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-9-6.png",
					 skillName:"暴怒一击",
			         skillDesc:"受到攻击后增加暴击等级，持续5秒，最多可以堆叠5次"}
				 ]
			},
			{
				 id:10,
			   icon:img_url+"images/yzrfc-s4-s1-3.jpg",
			   name:"弄蛇",
			   desc:"蛇蝎美人这个词用来形容弄蛇再合适不过了。作为上官斩最得力的怪面，心狠手辣，不择手段，就是弄蛇的信条。事实上，早在成为怪面之前，弄蛇就已经将心中的少女杀死，不再存有一丝悲悯和仁慈。对这世界绝望之后，弄蛇就已经成为弄蛇，而非怪面改造之功。",
			   type:img_url+"images/yzrfc-s4-s10-icon.png",
		   typeDesc:"不要动，我会让你尖叫的，啊哈哈哈……",
			typeImg:img_url+"images/yzdfc-lx-fg.png",
			   arms:"神牙·无摧",
			 lineup:"怪面成员",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-10-1.png",
					 skillName:"毒蛇绞杀",
			         skillDesc:"用腿释放毒蛇武器进行多段绞杀攻击，使目标中毒并总计造成伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-10-2.png",
					 skillName:"蛇信",
				     skillDesc:"如同毒蛇一般叮咬敌人，并伴随着高速旋转攻击。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-10-3.png",
					 skillName:"乱蛇舞",
			         skillDesc:"同无数小蛇在前方进行乱舞攻击，对中毒敌人造成额外伤害。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-10-4.png",
					 skillName:"巨蛇吞噬",
				     skillDesc:"跃起后进行乱舞攻击，最后召唤巨蛇吞噬敌人，立即刷新所有技能CD。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-10-5.png",
					 skillName:"蛇心",
			         skillDesc:"提高自身攻击力"},
				   {skillIcon:img_url+"images/yzrfc-s4-s1-10-6.png",
					skillName:"淬毒肌肤",
			        skillDesc:"受到攻击后使攻击者中毒，在5秒内造成伤害"}
				 ]
		    },
			{
				 id:11,
			   icon:img_url+"images/yzrfc-s4-s1-11.jpg",
			   name:"夜锋",
			   desc:"武林正道联盟“月堡”堡主的入室弟子，自幼接受正统而严苛的教育，在人前总是展现出谦谦君子的风范。然而他的心中，却隐藏着另一个自己。他层层伪装机关算尽，却始终没有发现，自己不过是乱局之中一颗无足轻重的棋子。",
			   type:img_url+"images/yzrfc-s4-s11-icon.png",
		   typeDesc:"每个人都有自己的面具。",
			typeImg:img_url+"images/yzdfc-lx-wl.png",
			   arms:"九天刺",
			 lineup:"怪面成员/正道联盟",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-11-1.png",
					 skillName:"混乱地刺",
			         skillDesc:"将匕首刺入地下再由前方刺出，使目标混乱。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-11-2.png",
					 skillName:"旋转切割",
				     skillDesc:"旋转匕首攻击，可控制方向，受到的法术伤害降低50%。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-11-3.png",
					 skillName:"野蜂飞舞",
			         skillDesc:"快速跃起然后匕首刺入地面将自己拉回地面，总计造成攻击力{1}%的伤害。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-11-4.png",
					 skillName:"原形毕露",
				     skillDesc:"化身为狂暴之蜂，吸血+15%，持续10秒，变身瞬间造成伤害。整个持续时间霸体，所有技能无法被打断。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-11-5.png",
					 skillName:"嗜血",
			         skillDesc:"提高自身攻击吸血率"},
				   {skillIcon:img_url+"images/yzrfc-s4-s1-11-6.png",
					skillName:"洞察",
			        skillDesc:"每次释放技能将提高物理穿透等级，持续3秒"}
				 ]
		    },
			{
				 id:16,
			   icon:img_url+"images/yzrfc-s4-s1-3.jpg",
			   name:"水冰淼",
			   desc:"前“组织”成员。作为冰系奇术的使用者，水冰淼人如其术，外表如冰霜般冷硬，内心如磐石般坚定。唯有面对自己的女儿，他如坚冰一般的表情才会慢慢融化，但是命运的残酷玩笑却让他永远地失去了笑容。",
			   type:img_url+"images/yzrfc-s4-s16-icon.png",
		   typeDesc:"我曾经做过错事，从此便不再犯错。",
			typeImg:img_url+"images/yzdfc-lx-fg.png",
			   arms:"神笛·无声",
			 lineup:"组织叛徒",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-16-1.png",
					 skillName:"刺骨冰锥",
			         skillDesc:"发射一枚刺骨的冰锥，冻结敌人3秒并造成伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-16-2.png",
					 skillName:"水仙扇",
				     skillDesc:"滑步前冲挥出一道冰扇，造成伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-16-3.png",
					 skillName:"悬冰落",
			         skillDesc:"以优美的身姿将敌人挑空然后踹下。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-16-4.png",
					 skillName:"不融之冰",
				     skillDesc:"吹奏起冻入骨髓的悲曲，前方大范围冰冻，冻结敌人4秒并造成伤害。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-16-5.png",
					 skillName:"冰之心",
			         skillDesc:"提高全队法术伤害"},
				   {skillIcon:img_url+"images/yzrfc-s4-s1-16-6.png",
					skillName:"极度深寒",
			        skillDesc:"所有攻击有20%概率使敌人受到的法术伤害提高，持续5秒"}
				 ]
		    },
			{
				 id:17,
			   icon:img_url+"images/yzrfc-s4-s1-17.jpg",
			   name:"鲤",
			   desc:"自小便生活在械城，父母皆是嬴氏家族的门客。性格温柔，循规蹈矩，对机关术有着浓厚的兴趣与极高的天赋。江湖动荡，赢氏家族也一度没落，直到“公主”的突然到来，改变了整个械城的命运的同时也彻底改写了鲤的人生。",
			   type:img_url+"images/yzrfc-s4-s17-icon.png",
		   typeDesc:"离开了，又为什么要回来？",
			typeImg:img_url+"images/yzdfc-lx-wl.png",
			   arms:"神枪·枪枪命中",
			 lineup:"机械师/赢氏家族",
			  skill:[
			        {skillIcon:img_url+"images/yzrfc-s4-s1-17-1.png",
					 skillName:"离子炮击",
			         skillDesc:"向前方轰击三炮，被击中的目标攻击力下降，同时造成伤害。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-17-2.png",
					 skillName:"液氮突刺",
				     skillDesc:"利用液氮加速向前突击，下一个技能的伤害提高15%，造成大量伤害。%。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-17-3.png",
					 skillName:"电离斩击",
			         skillDesc:"使用高能刀刃进行两次斩击，造成流血效果。霸体技能无法被打断，但仍会被控制技能控制。"},
			        {skillIcon:img_url+"images/yzrfc-s4-s1-17-4.png",
					 skillName:"高能强袭",
				     skillDesc:"使用刀刃进行乱舞斩击，最后轰出巨大的离子炮，能够击穿任何盔甲。霸体技能无法被打断，但仍会被控制技能控制。"},
				    {skillIcon:img_url+"images/yzrfc-s4-s1-17-5.png",
					 skillName:"电磁强化",
			         skillDesc:"提高全队物理伤害"},
				   {skillIcon:img_url+"images/yzrfc-s4-s1-17-6.png",
					skillName:"甲级回路",
			        skillDesc:"每次受到攻击时产生必杀值，同时恢复攻击力{1}%的生命值"}
				 ]
		    }
    ]
};
