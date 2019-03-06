var TouchSlide=function(a){a=a||{};var b={slideCell:a.slideCell||"#touchSlide",titCell:a.titCell||".hd li",mainCell:a.mainCell||".bd",effect:a.effect||"left",autoPlay:a.autoPlay||!1,delayTime:a.delayTime||200,interTime:a.interTime||2500,defaultIndex:a.defaultIndex||0,titOnClassName:a.titOnClassName||"on",autoPage:a.autoPage||!1,prevCell:a.prevCell||".prev",nextCell:a.nextCell||".next",pageStateCell:a.pageStateCell||".pageState",pnLoop:"undefined "==a.pnLoop?!0:a.pnLoop,startFun:a.startFun||null,endFun:a.endFun||null,switchLoad:a.switchLoad||null},c=document.getElementById(b.slideCell.replace("#",""));if(!c)return!1;var d=function(a,b){a=a.split(" ");var c=[];b=b||document;var d=[b];for(var e in a)0!=a[e].length&&c.push(a[e]);for(var e in c){if(0==d.length)return!1;var f=[];for(var g in d)if("#"==c[e][0])f.push(document.getElementById(c[e].replace("#","")));else if("."==c[e][0])for(var h=d[g].getElementsByTagName("*"),i=0;i<h.length;i++){var j=h[i].className;j&&-1!=j.search(new RegExp("\\b"+c[e].replace(".","")+"\\b"))&&f.push(h[i])}else for(var h=d[g].getElementsByTagName(c[e]),i=0;i<h.length;i++)f.push(h[i]);d=f}return 0==d.length||d[0]==b?!1:d},e=function(a,b){var c=document.createElement("div");c.innerHTML=b,c=c.children[0];var d=a.cloneNode(!0);return c.appendChild(d),a.parentNode.replaceChild(c,a),m=d,c},g=function(a,b){!a||!b||a.className&&-1!=a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className+=(a.className?" ":"")+b)},h=function(a,b){!a||!b||a.className&&-1==a.className.search(new RegExp("\\b"+b+"\\b"))||(a.className=a.className.replace(new RegExp("\\s*\\b"+b+"\\b","g"),""))},i=b.effect,j=d(b.prevCell,c)[0],k=d(b.nextCell,c)[0],l=d(b.pageStateCell)[0],m=d(b.mainCell,c)[0];if(!m)return!1;var N,O,n=m.children.length,o=d(b.titCell,c),p=o?o.length:n,q=b.switchLoad,r=parseInt(b.defaultIndex),s=parseInt(b.delayTime),t=parseInt(b.interTime),u="false"==b.autoPlay||0==b.autoPlay?!1:!0,v="false"==b.autoPage||0==b.autoPage?!1:!0,w="false"==b.pnLoop||0==b.pnLoop?!1:!0,x=r,y=null,z=null,A=null,B=0,C=0,D=0,E=0,G=/hp-tablet/gi.test(navigator.appVersion),H="ontouchstart"in window&&!G,I=H?"touchstart":"mousedown",J=H?"touchmove":"",K=H?"touchend":"mouseup",M=m.parentNode.clientWidth,P=n;if(0==p&&(p=n),v){p=n,o=o[0],o.innerHTML="";var Q="";if(1==b.autoPage||"true"==b.autoPage)for(var R=0;p>R;R++)Q+="<li>"+(R+1)+"</li>";else for(var R=0;p>R;R++)Q+=b.autoPage.replace("$",R+1);o.innerHTML=Q,o=o.children}"leftLoop"==i&&(P+=2,m.appendChild(m.children[0].cloneNode(!0)),m.insertBefore(m.children[n-1].cloneNode(!0),m.children[0])),N=e(m,'<div class="tempWrap" style="overflow:hidden; position:relative;"></div>'),m.style.cssText="width:"+P*M+"px;"+"position:relative;overflow:hidden;padding:0;margin:0;";for(var R=0;P>R;R++)m.children[R].style.cssText="display:table-cell;vertical-align:top;width:"+M+"px";var S=function(){"function"==typeof b.startFun&&b.startFun(r,p)},T=function(){"function"==typeof b.endFun&&b.endFun(r,p)},U=function(a){var b=("leftLoop"==i?r+1:r)+a,c=function(a){for(var b=m.children[a].getElementsByTagName("img"),c=0;c<b.length;c++)b[c].getAttribute(q)&&(b[c].setAttribute("src",b[c].getAttribute(q)),b[c].removeAttribute(q))};if(c(b),"leftLoop"==i)switch(b){case 0:c(n);break;case 1:c(n+1);break;case n:c(0);break;case n+1:c(1)}},V=function(){M=N.clientWidth,m.style.width=P*M+"px";for(var a=0;P>a;a++)m.children[a].style.width=M+"px";var b="leftLoop"==i?r+1:r;W(-b*M,0)};window.addEventListener("resize",V,!1);var W=function(a,b,c){c=c?c.style:m.style,c.webkitTransitionDuration=c.MozTransitionDuration=c.msTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms",c.webkitTransform="translate("+a+"px,0)"+"translateZ(0)",c.msTransform=c.MozTransform=c.OTransform="translateX("+a+"px)"},X=function(a){switch(i){case"left":r>=p?r=a?r-1:0:0>r&&(r=a?0:p-1),null!=q&&U(0),W(-r*M,s),x=r;break;case"leftLoop":null!=q&&U(0),W(-(r+1)*M,s),-1==r?(z=setTimeout(function(){W(-p*M,0)},s),r=p-1):r==p&&(z=setTimeout(function(){W(-M,0)},s),r=0),x=r}S(),A=setTimeout(function(){T()},s);for(var c=0;p>c;c++)h(o[c],b.titOnClassName),c==r&&g(o[c],b.titOnClassName);0==w&&(h(k,"nextStop"),h(j,"prevStop"),0==r?g(j,"prevStop"):r==p-1&&g(k,"nextStop")),l&&(l.innerHTML="<span>"+(r+1)+"</span>/"+p)};if(X(),u&&(y=setInterval(function(){r++,X()},t)),o)for(var R=0;p>R;R++)!function(){var a=R;o[a].addEventListener("click",function(){clearTimeout(z),clearTimeout(A),r=a,X()})}();k&&k.addEventListener("click",function(){(1==w||r!=p-1)&&(clearTimeout(z),clearTimeout(A),r++,X())}),j&&j.addEventListener("click",function(){(1==w||0!=r)&&(clearTimeout(z),clearTimeout(A),r--,X())});var Y=function(a){clearTimeout(z),clearTimeout(A),O=void 0,D=0;var b=H?a.touches[0]:a;B=b.pageX,C=b.pageY,m.addEventListener(J,Z,!1),m.addEventListener(K,$,!1)},Z=function(a){if(!H||!(a.touches.length>1||a.scale&&1!==a.scale)){var b=H?a.touches[0]:a;if(D=b.pageX-B,E=b.pageY-C,"undefined"==typeof O&&(O=!!(O||Math.abs(D)<Math.abs(E))),!O){switch(a.preventDefault(),u&&clearInterval(y),i){case"left":(0==r&&D>0||r>=p-1&&0>D)&&(D=.4*D),W(-r*M+D,0);break;case"leftLoop":W(-(r+1)*M+D,0)}null!=q&&Math.abs(D)>M/3&&U(D>-0?-1:1)}}},$=function(a){0!=D&&(a.preventDefault(),O||(Math.abs(D)>M/10&&(D>0?r--:r++),X(!0),u&&(y=setInterval(function(){r++,X()},t))),m.removeEventListener(J,Z,!1),m.removeEventListener(K,$,!1))};m.addEventListener(I,Y,!1)};


function cfarray(a){
   for(var i in a){
		if(a.indexOf(a[i]) != a.lastIndexOf(a[i])){
			return true;
		}
	}
	return false;
}
function cfiphone(a){
    if(/^1[3|4|5|7|8]\d{9}$/.test(a)){
	   return true;
	}
	return false;
}

 jQuery.fn.fadeslider = function() {
      var _this = $(this),
          _liBo = $(this).find("ul.hd-con > li"),
          _liLe = _liBo.length,
          _prev = $(this).find("span.prev"),
          _next = $(this).find("span.next"),
          _ulCo = $(this).find("ul.hd-con"),
           _num = 0,
           _triggleTime;

          _next.on("click",function(){
          	if(!_triggleTime){
          		_triggleTime = true;
          		setTimeout(function(){
          			gotogo(_num+1);
          			_triggleTime = false;
          		},500)
          	}
          });
          _prev.on("click",function(){
            if(!_triggleTime){
          		_triggleTime = true;
          		setTimeout(function(){
          			gotogo(_num-1);
          			_triggleTime = false;
          		},500)
          	}
          });
        var gotogo = function(o){
        	 _num = o;
        	 if(_num > _liLe-1 || _num<-3){
        	 	_num = 0;
        	 }
        	_liBo.eq(_num).show().siblings().hide();
        }
 }

jQuery.fn.floatadv = function(loaded) {
	  var obj = this;
	  body_height = parseInt($(window).height());
	  block_height = parseInt(obj.height());
	  top_position = parseInt((body_height/2.5) - (block_height/2.5) + $(window).scrollTop());
	  if (body_height<block_height) { top_position = 0 + $(window).scrollTop(); };
	  if(!loaded) {
		obj.css({'position': 'absolute'});
		obj.css({ 'top': top_position });
		$(window).bind('resize', function() {
		  obj.floatadv(!loaded);
		});
		$(window).bind('scroll', function() {
		  obj.floatadv(!loaded);
		});
	  } else {
		obj.stop();
		obj.css({'position': 'absolute'});
		obj.animate({ 'top': top_position }, 400, 'linear');
	  }
};
var match = {

	init:function(){
		$(".match-B-tab").fadeslider();
		$(".float_div").floatadv();
		$(".player-bg .video-close").click(function(){
			$(".player-bg").hide();
		});
		//8.19日预定结束\预定结束之后按钮变为在线播放按钮，播放地址8.18给出  去掉class 为btn-yyss-tc的，增加close 样式
		// $("a.btn-yyss-tc.yytx-tc").click(function(){
		// 	$(".mask").show();
		//     $("#final-bespeak-fail").show();
		// });

		$(".btn-bespeak").click(function(){

		    if($(this).data("uid")==2){
			    $("#final-bespeak-fail").hide();
			      if(!cfiphone($(".s-iphone").val())){
						$("#final-bespeak p.tit").html('很抱歉');
						$("#final-bespeak p.txt").html('该手机号码不正确');
						$("#final-bespeak a.btn-bespeak").attr("data-uid",'10');
						$("#final-bespeak").show();
				  }else{
					  var phone = $(".s-iphone").val();
					  $.post(
						'/special/save_phone',
						{
							phone:phone
						},
						function(data){
							var data = eval('(' + data + ')');
							if(data.status == 1){
								$("#final-bespeak p.tit").html('恭喜您');
								 $("#final-bespeak p.txt").html('预约已成功');
								 $("#final-bespeak a.btn-bespeak").attr("data-uid",'0');
								 $("#final-bespeak").show();
							}else if(data.status == -1){
								$("#final-bespeak p.tit").html('很抱歉');
								 $("#final-bespeak p.txt").html('该手机号码不正确');
								 $("#final-bespeak a.btn-bespeak").attr("data-uid",'10');
								 $("#final-bespeak").show();
							}else if(data.status == -2){
								$("#final-bespeak p.tit").html('很抱歉');
								 $("#final-bespeak p.txt").html('该手机号码已参与过短信预约');
								 $("#final-bespeak a.btn-bespeak").attr("data-uid",'0');
								 $("#final-bespeak").show();
							}else{
								alert(data.msg);
							}
						}
					  );
				  }

			   //判断手机号是否重复或者错误 一下步骤 ajax
			   /*
			      ###
				  1.成功
				     $("#final-bespeak p.tit").html('恭喜您');
					 $("#final-bespeak p.txt").html('预约已成功')
					 $("#final-bespeak a.btn-bespeak").attr("data-uid",'0')；
					 $("#final-bespeak").show();

				  2.该手机号码不正确
				     $("#final-bespeak p.tit").html('很抱歉');
					 $("#final-bespeak p.txt").html('该手机号码不正确')
					 $("#final-bespeak a.btn-bespeak").attr("data-uid",'1')
					 $("#final-bespeak").show();
				  3.该手机号码重复使用
				     $("#final-bespeak p.tit").html('很抱歉');
					 $("#final-bespeak p.txt").html('该手机号码已参与过短信预约')
		             $("#final-bespeak a.btn-bespeak").attr("data-uid",'1')
		             $("#final-bespeak").show();
			   */
			   //三种方案 1.成功
			   //2.该手机号码不正确
			   //3.该手机号码重复使用
			   //如果手机号提交成功，
			}
			if($(this).data("uid")==0){
			    $("#final-bespeak-fail").hide();
			    $("#final-bespeak").hide();
				$(".s-iph-input").val('');
				$(".mask").hide();
			}
			if($(this).data("uid")==10){
			    $("#final-bespeak-fail").show();
			    $("#final-bespeak").hide();
				$(".s-iph-input").val('');
			}
			//预测活动结束以后
			if($(this).data("uid")==3){
			    $("#bespeak-fail").hide();
				$(".mask").hide();
			}
			//开始预测
			if($(this).data("uid")==5){
				$(".mask").show();
			     var arruid=[];
				$(".s-zduser").each(function(i){
				    arruid.push($(".s-zduser").eq(i).attr("data-opt"))
				});
				 for(var i = 0 ;i<arruid.length;i++){
					if(arruid[i] == "" || typeof(arruid[i]) == "undefined"){
						arruid.splice(i,1);
						i= i-1;
					}
				 }

				 if(cfarray(arruid) || arruid.length<4 ){
						$("#bespeak-succ p.tit").html('很抱歉');
						$("#bespeak-succ p.txt").html('您选择的战队重复或为空，请重新选择');
						$("#bespeak-succ a.btn-bespeak").attr("data-uid",'20');
						$("#bespeak-succ").show();
						$("#bespeak-first").hide();
						return ;
				 }

				 if(!cfiphone($(".sb-iphone").val())){
						$("#bespeak-succ p.tit").html('很抱歉');
						$("#bespeak-succ p.txt").html('该手机号码不正确');
						$("#bespeak-succ a.btn-bespeak").attr("data-uid",'20');
						$("#bespeak-succ").show();
						$("#bespeak-first").hide();
                    return ;
				 }
				 var phone = $(".sb-iphone").val();
				 var gj = $('.s-zdu-input1').attr('data-opt');
				 var yj = $('.s-zdu-input2').attr('data-opt');
				 var jj = $('.s-zdu-input3').attr('data-opt');
				 var dj = $('.s-zdu-input4').attr('data-opt');
				 $.post(
					'/special/save_yc',
					{
						phone:phone,
						gj:gj,
						yj:yj,
						jj:jj,
						dj:dj
					},
					function(data){
						var data = eval('(' + data + ')');
						if(data.status == 1){
							$("#bespeak-first").hide();
							$("#bespeak-succ p.tit").html('恭喜您');
							$("#bespeak-succ p.txt").html('预测成功');
							$("#bespeak-succ a.btn-bespeak").attr("data-uid",'21');
							$("#bespeak-succ").show();
						}else if(data.status == -3){
							$("#bespeak-first").hide();
							$("#bespeak-first-repeat").show();
							$("#bespeak-first-repeat .gj-first .s-zduser").attr("data-opt",data.gj).html(data.gj);
							$("#bespeak-first-repeat .gj-second .s-zduser").attr("data-opt",data.yj).html(data.yj);
							$("#bespeak-first-repeat .gj-three .s-zduser").attr("data-opt",data.jj).html(data.jj);
							$("#bespeak-first-repeat .gj-four .s-zduser").attr("data-opt",data.dj).html(data.dj);
							$("#bespeak-first-repeat a.btn-bespeak").attr("data-uid",'6');
						}else{
							alert(data.msg);
						}
					}
				 );
				 //获取选中id和手机号
				//console.log(arruid+'===='+$(".sb-iphone").val())

			    /*
				    方式  两种
					 1.预测成功
					   $("#bespeak-first").hide();
					   $("#bespeak-succ").show();
					 2.重复预测，ajax显示预测结果
					   $("#bespeak-first").hide();
					   $("#bespeak-first-repeat").show();
					   $("#bespeak-first-repeat .gj-first").attr("data-opt",'返回团队id值').html('返回团队名称')
					   $("#bespeak-first-repeat .gj-first").attr("data-opt",'返回团队id值').html('返回团队名称')
					   $("#bespeak-first-repeat .gj-second").attr("data-opt",'返回团队id值').html('返回团队名称')
					   $("#bespeak-first-repeat .gj-three").attr("data-opt",'返回团队id值').html('返回团队名称')
					   $("#bespeak-first-repeat .gj-four").attr("data-opt",'返回团队id值').html('返回团队名称')
					  3.在提交的时候如果遇到两个一样让其修改

				*/



			}
			//预测成功
			if($(this).data("uid")==4){
			    $("#bespeak-succ").hide();
				$(".mask").hide();
				$(".s-iph-input").val('');
			}
			//预测重复
			if($(this).data("uid")==6){
			    $("#bespeak-first-repeat").hide();
				$(".mask").hide();
			}
			if($(this).data("uid")==20){
				$("#bespeak-first").show();
			    $("#bespeak-succ").hide();
				$(".mask").hide();
			}
			if($(this).data("uid")==21){
				
				$("#bespeak-first").hide();
			    $("#bespeak-succ").hide();
				$(".mask").hide();
			}
		});
		$("a.btn-yyzd-tc").click(function(){
			$(".mask").show();
			var is_show = $('#is_show').val();	
		    if(is_show == -1){
			    //活动结束以后
			    $("#bespeak-fail").show();
			}else{
			    $("#bespeak-first").show();
			}

		});
		$(".s-zduser").on("click",function(){
		    var _this = $(this);
		    var _index = _this.parent().index();
		    if((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))){
                 $(".s-zdname").css("top",26.5+(_index-2)*12.1+'%').show();
		    }else{
                $(".s-zdname").css("top",146+(_index-2)*67).show();
		    }

			$(".s-zdname a").off();
			$(".s-zdname a").on("click",function(){
			    var _nameId = $(this).data("nameid");
				var _nameTxt = $(this).html();
				_this.attr("data-opt",_nameId).html(_nameTxt);
				$(".s-zdname").hide();
			});
		});
		$("#final-bespeak,#final-bespeak-fail,#bespeak-first-repeat,#bespeak-fail,#bespeak-succ,#bespeak-first").find(".bespeak-item-close").click(function(){
		   $(".mask").hide();
		   $(this).parent().parent().hide();
		});

	}
}
match.init();
