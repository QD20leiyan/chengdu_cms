        // $("#Jvideo,#vpbox-1.v-bg-box li span").click(function(){
        //     var link_url = $(this).data("rel");
        //     if(link_url){
        //         $('#vo-mask .o-mask-boxs').html('');
        //         $("#vo-mask .o-mask-boxs").append('<embed width="1280" height="720" align="middle" src="http://yuntv.letv.com/bcloud.swf" allowfullscreen="true" quality="high" allowscriptaccess="always" flashvars="'+link_url+'" type="application/x-shockwave-flash">');
        //         $("#vo-mask").show();
        //     }
        // });
        $("#vo-mask .o-mask-close").click(function(){
          $("#vo-mask").hide();
        });
        //slider
        $(".slider-banner-box").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,autoPlay:true,vis:"auto",scroll:1,effect:"leftLoop"});
        $("#tab-news-box").slide({});
        //玩家交流
        $("#paler").click(function(){
            $(".gz-tck").show();
        });
        $(".gz-tck i").click(function(){
            $(".gz-tck").hide();
        });
		//悬浮层
		$("#suspend-nav i").click(function(){
			$("#suspend-nav").hide();
		})

    
	// function clb(num){
	//    //无缝滚动
	//    var m6Item = $(".HERO-orders-item"),
	// 	m6ItemNum = $(".HERO-orders-item").length,
	// 	m6Demo1 = $(".HERO-orders-demo1"),
	// 	m6Demo2 = $(".HERO-orders-demo2"),
	// 	m6Inner = $(".HERO-orders-inner"),
	// 	m6Box = $(".HERO-orders-box");
	// 	if(m6ItemNum>num){
	// 		m6Demo1.append(m6Demo1.html());
	// 		m6Demo1.width(m6ItemNum*230);
	// 		m6Inner.width(m6ItemNum*230);
	// 		var flag=0;
	// 		var time1=null;
	// 		var time2=null;
	// 		function automove(){
	// 		if(flag==0){
	// 		time1=setInterval(function(){
	// 		m6Box.scrollLeft(m6Box.scrollLeft()+1);
	// 		if(m6Box.scrollLeft()>=m6ItemNum*115){
	// 		m6Box.scrollLeft(0);
	// 		}
	// 		},10)
	// 		}else{
	// 		time2=setInterval(function(){
	// 		m6Box.scrollLeft(m6Box.scrollLeft()-1);
	// 		if(m6Box.scrollLeft()<=0){
	// 		m6Box.scrollLeft(m6ItemNum*115);
	// 		}
	// 		},10)
	// 		}
	// 		}
	// 		automove()
	// 		$(".HERO-orders-prev").click(function(){
	// 		flag=1;
	// 		clearInterval(time1);
	// 		clearInterval(time2);
	// 		automove();
	// 		})
	// 		$(".HERO-orders-next").click(function(){
	// 		flag=0;
	// 		clearInterval(time1);
	// 		clearInterval(time2);
	// 		automove();
	// 		})
	// 		m6Box.mouseover(function(){
	// 		clearInterval(time1);
	// 		clearInterval(time2);
	// 		})
	// 		m6Box.mouseout(function(){
	// 		clearInterval(time1);
	// 		clearInterval(time2);
	// 		automove();
	// 		});
	// 	};		
	// }
 //    clb(10)


    $(".HERO-orders-prev").click(function(){
        $(".HERO-orders-demo1").animate({"margin-left":"-110px"},function(){
             $(".HERO-orders-item:eq(0)").appendTo($(".HERO-orders-demo1"))
             $(".HERO-orders-demo1").css({"margin-left":0})
           })

    })
    $(".HERO-orders-next").click(function(){
        $(".HERO-orders-demo1").animate({"margin-left":"110px"},function(){
             $(".HERO-orders-item:last").prependTo($(".HERO-orders-demo1"))
             $(".HERO-orders-demo1").css({"margin-left":0})
           })
        
    })

    // $li1 = $(".apply_nav .apply_array");
    // $window1 = $(".apply .apply_w");
    // $left1 = $(".apply .img_l");
    // $right1 = $(".apply .img_r");
    
    // $window1.css("width", $li1.length*166);

    // var lc1 = 0;
    // var rc1 = $li1.length-5;
    
    // $left1.click(function(){
    //     if (lc1 < 1) {
    //         alert("已经是第一张图片");
    //         return;
    //     }
    //     lc1--;
    //     rc1++;
    //     $window1.animate({left:'+=166px'}, 1000);
    // });

    // $right1.click(function(){
    //     if (rc1 < 1){
    //         alert("已经是最后一张图片");
    //         return;
    //     }
    //     lc1++;
    //     rc1--;
    //     $window1.animate({left:'-=166px'}, 1000);
    // });



    $.fn.img_lb=function(opts){
        return this.each(function(){
            var $con=$(this);
                $con.css("z-index","2");
            var cov_img = $con.find(".bdhdImg img");
            var cov_length = $con.find(".bdhdImg img").length;
            var index = 0;
                cov_img.eq(0).show();
                if(opts==0){
                    $(".tank-jj-box .tank-jj-tit").html(cov_img.eq(0).attr("alt"));
                    $(".tank-jj-box .tank-jj-txt").html(cov_img.eq(0).data("txt")); 
                }else{
                    $(".college-jj-box .college-jj-tit").html(''+cov_img.eq(0).attr("alt")+'<small>'+cov_img.eq(0).data("age")+'</small>');
                    $(".college-jj-box .college-jj-txt").html(cov_img.eq(0).data("txt")); 
                }
                                  
                
            $(".inprev").click(function() {
                index -= 1;
                if (index == -1) {
                    index = cov_length - 1;
                }
                showPics(index);
            });
            $(".innext").click(function() {
                index += 1;
                if (index == cov_length) {
                    index = 0;
                }
                showPics(index);
            });
            function showPics(index) { 
                cov_img.eq(index).show().siblings().hide();
                if(opts==0){
                    $(".tank-jj-box .tank-jj-tit").html(cov_img.eq(index).attr("alt"));
                    $(".tank-jj-box .tank-jj-txt").html(cov_img.eq(index).data("txt")); 
                }else{
                    $(".college-jj-box .college-jj-tit").html(''+cov_img.eq(index).attr("alt")+'<small>'+cov_img.eq(index).data("age")+'</small>');
                    $(".college-jj-box .college-jj-txt").html(cov_img.eq(index).data("txt")); 
                }
                       
            }
        })
    }

    //tankxueyua
   $(".mod-tank-tab .hd li").click(function(){
        var sBHtmlnum = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $($(".mod-tank-tab .tank-list-a").eq(sBHtmlnum)).img_lb(0);
        $(".mod-tank-tab .tank-list-a").eq(sBHtmlnum).css("z-index","2").siblings().css("z-index","-1");
    });
    $(".mod-tank-tab .hd li").eq(0).trigger('click');
    //college
    $(".mod-college-tab .hd li").click(function(){
        var sBHtmlnum = $(this).index();
        $($(".mod-college-tab .college-list-a").eq(sBHtmlnum)).img_lb(1);
        $(this).addClass("on").siblings().removeClass("on");
        $(".mod-college-tab .college-list-a").eq(sBHtmlnum).css("z-index","2").siblings().css("z-index","-1");
    }); 
    $(".mod-college-tab .hd li").eq(0).trigger('click');
	
	
	$("#side-nav .side-nav1").click(function(){
		$("#suspend-nav").show();
	});
	$("#suspend-nav i").click(function(){
		$("#suspend-nav").hide();
	});
	// $(window).resize(function(){
	//      console.log($(window).width());
	// 	 // $("input[name=widthA]").val($(window).width());
	// 	 if($(window).width()<768){
	// 		 window.location.href="http://zjlm.yingxiong.com/m"
	// 	 }
	// });

     //平台、设备和操作系统
    var system ={
        win : false,
        mac : false,
        xll : false
    };
    //检测平台
    var p = navigator.platform;
    // alert(p);
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    // 判断用户机型为安卓 或者 ios
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1 //是否iPad
            };
        }()
    };

    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios || browser.versions.android) {

          window.location.href="http://zjlm.yingxiong.com/m";
     
    }




