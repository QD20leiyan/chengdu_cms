	$(function(){

        var down_box = $(".a-dwon-box"); 
        var mySwiper = "";
        var bannerOffsetTop = 0;

        function init(){
            addSwiperIcon();    
            isShowDownBanner();
            start_cj();
        };  

        //复制兑换码
        var clipboard = new Clipboard('#tc-ok');
        clipboard.on('success', function(e) {
            alert('复制成功!');
            e.clearSelection();
            hide_tc();
        });
        clipboard.on('error', function(e) {
            alert('当前浏览器不支持自动复制,请选择长按复制!');
        });  
        
        
        //判断是否显示下载浮窗
        function isShowDownBanner(){
            var scrollTop = document.body.scrollTop;
            if(scrollTop >= 520){
                down_box.show();
            }else{
                down_box.hide();
            }
        }
        //获取轮播图到顶端高度
        function getLbTop(){
            bannerOffsetTop = $(".i5-banner").offset().top;
            var bannerHeight = $(".i5-banner").height();
            bannerOffsetTop = bannerOffsetTop - bannerHeight;
            return bannerOffsetTop;
        }
        function isShowLb(){
            var scrollTop = $(window).scrollTop();
            if(scrollTop >= bannerOffsetTop){
                mySwiper.startAutoplay();
            }else{
                mySwiper.stopAutoplay();
            }
        }
        //添加swiper插件轮播icon
        function addSwiperIcon(){
        	var len = $(".i5-banner .swiper-slide").length;
        	var html = "";
        	for(var i=0; i<len; i++){
        		if(i == 0){
        			html = html+'<label class="active"></label>';
        		}else{
        			html = html+'<label></label>';
        		}
        	}
        	$(".swiper-icon").append(html);
        	initSwiper(len);
        }
        //改变swiper插件轮播icon
        function changeSwiperIocn(index){
        	$(".swiper-icon label").removeClass("active");
        	$(".swiper-icon label").eq(index).addClass("active");  
        }
        //初始化swiper插件
        function initSwiper(len){
        	mySwiper = new Swiper ('.swiper-container', {
        		loop: true,
        		autoplay: 4000,
        		autoplayDisableOnInteraction: false,
        		pagination: '.swiper-pagination',
        		slidesPerView: 'auto',
        		centeredSlides: true,
        		paginationClickable: true,
        		nextButton: '.swiper-button-next',
        		prevButton: '.swiper-button-prev',
        		onSlideChangeEnd: function(swiper){
        			var index = parseInt(swiper.activeIndex) - len;
        			if(index == len){
        				index = 0;
        			}
        			if(index == -1){
        				index = len - 1;
        			}
        			changeSwiperIocn(index);
        		}
        	});     
            getLbTop();
            isShowLb();   
        }

        //开始转盘
        function start_cj(){
        	$("#cj_start_btn").on("click",function(){
        		var myThis = $(this);
                var isClick = myThis.attr("isClick");
                if(isClick){
                 return;
             }
             $(this).attr("isClick","true");
             getJpByAjax(myThis);
         }); 
        }

        //ajax获取中奖奖品
        function getJpByAjax(myThis){
        	var degList = initDegArr();
        	if(getCjAjax){
        		getCjAjax.abort();
        	}
        	var getCjAjax = $.ajax({
        		url: "/h5/wctt/ajax-cj.html",
        		type: "get",
        		setTimeout: 1000,
        		success: function(data){
                    var data = JSON.parse(data);
                    console.log(data); 
                    if(data.status == 0){
                        var index = getJpIndex(data.type);

                        var rotateDeg = -degList[index]+(360*4);
                        rotate(rotateDeg,function(){
                            //获取相应奖品
                            show_tc(data.msg);
                        });         
                    }else if(data.status == 1){
                        alert(data.msg);
                    }else{
                        show_tc(data.code);
                    }
                    myThis.attr("isClick","");
                },
                error: function(){
                 alert("网路异常,请检查您的网络~");
                 myThis.attr("isClick","");
             },
             complete : function(XMLHttpRequest,status){ 
                 if(status=='timeout'){
                    getCjAjax.abort();
                    alert("网路超时~");
                    myThis.attr("isClick","");
                }
            }  
        });
        } 
        //初始化旋转角度数组 
        function initDegArr(){
        	var initDeg= 22.5;
        	var deg_list = [initDeg];
        	for(var i=0; i<7; i++){
        		initDeg = initDeg + 45;
        		deg_list.push(initDeg); 
        	} 
        	return deg_list;
        } 
        //获取中奖编号
        function getJpIndex(index){
        	var ran = parseInt(index);
        	var index = 0;
        	if(ran == 1){
        		index = 6; 
        	}else if(ran == 2){
        		index = 5; 
        	}else if(ran == 3){
        		index = 0; 
        	}else if(ran == 4){
        		index = 2; 
        	}
        	return index;
        }

        //旋转角度
        function rotate(myDeg,callBack){
        	$("#cj_pan").css({
        		"transition":"transform 1s",
        		"-webkit-transition":"transform 1s",
                "transform": "rotate("+myDeg+"deg)",
                "-webkit-transform": "rotate("+myDeg+"deg)"
            });
        	setTimeout(function(){
        		if(callBack){
        			callBack();
        		}  
        	},1010);
        }

        //弹出弹窗
        function show_tc(mark_cj){
            $("#tc-mark").val(mark_cj);
            $(".a-tc").css({
              display: "block"
          });
            setTimeout(function(){
              $(".a-tc").css({
               opacity: "1"
           });
          },10);
        }  
        function hide_tc(){
        	$(".a-tc").css({
        		opacity: "0"
        	});
        	setTimeout(function(){
        		$(".a-tc").css({
        			display: "none"
        		});
        	},200);
        }

        //悬浮窗下载判断显示
        $(document).scroll(function(){
            isShowDownBanner();
            isShowLb();
        }); 
        //页面事件
        $(".tc-close").on("click",function(){
        	hide_tc();
        })

        init();
    });