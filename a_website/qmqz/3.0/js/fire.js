	//图片轮播    
				$.fn.img_lb=function(){
					return this.each(function(){
						var $con=$(this);//包裹按钮和轮播的图片元素
						var sWidth = $con.width();
						var cov_length = $con.find("ul li").length;
						var index = 0;
						var picTimer;
						var btn = "<div class='buttons'>";
						for (var i = 0; i < cov_length; i++) {
							if(i==0){
								btn+="<span class='on'></span>";
							}else{
								btn+="<span></span>";
							}
						}
						$con.append(btn);
						$con.find(".buttons span").mouseover(function() {
							index = $con.find(".buttons span").index(this);
							showPics(index);
						}).eq(0).trigger("mouseover");
						$(".pre").click(function() {
							index -= 1;
							if (index == -1) {
								index = cov_length - 1;
							}
							showPics(index);
						});
						$(".next").click(function() {
							index += 1;
							if (index == cov_length) {
								index = 0;
							}
							showPics(index);
						});
						$con.find("ul").css("width", sWidth * (cov_length));
						$con.hover(function() {
							clearInterval(picTimer);
						}, function() {
							picTimer = setInterval(function() {
								showPics(index);
								index++;
								if (index == cov_length) {
									index = 0;
								}
							}, 3000);
						}).trigger("mouseleave");
						function showPics(index) { 
							var nowLeft = -index * sWidth;
							$con.find("ul").stop(true, false).animate({
								"left": nowLeft
							}, 300);
						    $con.find(".buttons span").removeClass("on").eq(index).addClass("on"); 				
						}
					})
				}
					//滚动方法
				function Ctab_Mdemo(a){
					var speed = 20;
					var tab_image = $("#"+a).find("#demo");
					var tab1 = $("#"+a).find("#demo1");
					var tab2 = $("#"+a).find("#demo2");
					tab2.html(tab1.html());
					var x = 0;
					function Marquee_x(){ 
						tab_image.scrollLeft(++x);
						if(x==tab1.width()) { x = 0 };
					};
					var MyMar=setInterval(Marquee_x,speed); 
				}