$(function(){
	var static_path="http://dev.static.yingxiong.com/qmqz/3.0/";
	//首页n_banner
	$(".n_banner").css({"background":"url("+$(".n_banner").data("bg")+") no-repeat center top"});
//导航单击特效
    $(".top01 a").click(function(){
    	$(this).addClass("cur").siblings().removeClass("cur");
    })
//tab切换
	$(".main02_nav ul li").mouseover(function(){
		var index=$(this).index();
		$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
		$(".infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
	$(".main04_nav ul li").click(function(){
		var index=$(this).index();
		$(this).find("a").addClass("on").end().siblings().find("a").removeClass("on");
		$(".m4_infor").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
	})
//	图片轮播特效6-24修改
	$(".main02_right").img_lb_nobtn();
	$(".jchd_con").img_lb();
   $(".main04_link a").mouseover(function(){
  	  var index=$(this).attr("index");
  	  $(".hide div").eq(index).slideToggle();
  })
  $(".main04_link a").mouseout(function(){
  	  var index=$(this).attr("index");
  	  $(".hide div").eq(index).hide();
  })


//	首页新加
	$(".xs_nav li").click(function(){
		var index=$(this).index();
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".qzdq .qzdq_0").eq(index).show().siblings(".qzdq_0").hide();
	})
	$(".qzdq_01").img_loop_lb();
    $(".js_image").img_loop_lb();
        $(".lq_gift").click(function(){
                $(".gift_tck").show();
                //$(".zz").show();
		//$(".i_libao").show();

        })
        $(".zz").click(function(){
                $(".gift_tck").hide();
                $(".zz").hide();
        })
    $(".qzdq").img_loop_lb();

	//	视频播放
	$(".play_btn,.vPicBtn").click(function(){
 		$("#video_mask").show();
 	})
 	$(".main05_right ul li").click(function(){
 	     var embedhtml=' <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="'+$(this).attr('rel')+'" type="application/x-shockwave-flash"></embed>';
		$("#video_mask").find('.videos').html(embedhtml);
 		$("#video_mask").show();
 	})
 	$("#close").click(function(){
 		$("#video_mask").hide();
 	});


	function Ctab_demo(a,b,c){
		var speed = 20; //数字越大速度越慢
		var tab_image = $("#"+a);
		var tab1 = $("#"+b);
		var tab2 = $("#"+c);
		tab2.html(tab1.html());
		var x = 0;
		function Marquee_x(){
	        tab_image.scrollLeft(++x);
			if(x==tab1.width()) { x = 0 };
		};
		var MyMar=setInterval(Marquee_x,speed);
	}

	Ctab_demo("demo","demo1","demo2");
    Ctab_demo("COMdemo","COMdemo1","COMdemo2");
    //添加img图标
    $(".main05_right ul li").addClass("add_on");
    var btn="<div class='v_ico'><span class='img_ico'></span></div>";
	$(".main05_right ul li").append(btn);
	// 礼包
	$(".i_libao_close").click(function(){
		$(".i_libao").hide();
	})
	$(".act_stil ul li").click(function(){
		var index=$(this).index();
		$(this).find("a").addClass("act_sactive").end().siblings().find("a").removeClass("act_sactive");
		$(".act_smain02_1").find(".act_swidth").eq(index).css("display","block").siblings().css("display","none");
	})
	$(".act_sbtn ul li").click(function(){
		$(this).find("a").addClass("btnon").end().siblings().find("a").removeClass("btnon");
	})
	$(".act_sbtn_gift").click(function(){
		$("#js_giftck").show();
		$(".mask").show();
	})
	$(".acts_close").click(function(){
		$("#js_giftck").hide();
		$("#js_result").hide();
		$(".mask").hide();
	})
	$(".act_sbtn_cj").click(function(){
		$("#js_cjtck").show();
		$(".mask").show();
	})
	$(".a_close").click(function(){
		$("#js_cjtck").hide();
		$(".mask").hide();
	})
	$(".a_search").click(function(){
		$("#js_result").show();
		$("#js_cjtck").hide();
		$(".mask").show();
	})
	$("#select_top span").click(function(){
		$("#select_info").slideToggle();
	})
	$("#select_info ul li").click(function(){
		var j=$(this).text();
		var i=$(this).index(); //获取到当前点击的index
		$("#select_top input").val(j); //将选中的li值赋给input
		$("#select_info").slideUp(); //点击之后收起下拉框
		$("#selAreaId").val($(this).attr('data-id'));
		$(".n_t_main").eq(i).css({"display":"block"}).siblings(".n_t_main").css({"display":"none"}); //切换对应的内容
	})
	$("#select_top02 span").click(function(){
		$("#select_info02").slideToggle();
	})
	$("#select_info02 ul li").click(function(){
		var j=$(this).text();
		var i=$(this).index(); //获取到当前点击的index
		$("#select_top02 input").val(j); //将选中的li值赋给input
		$("#select_info02").slideUp(); //点击之后收起下拉框
		$("#selServerId").val($(this).attr('data-id'));
	})
	$(".link-download").click(function(){
		$(".enter_load_wrap").slideToggle();
		setTimeout(function(){
			$(".enter_load_wrap").hide();
		},5000);
	})
	$(".sina_download, .btn-jr").click(function(){
		$(".enter_load_wrap").slideToggle();
		setTimeout(function(){
			$(".enter_load_wrap").hide();
		},5000);
	})
	$(".enter_load_wrap").click(function(){
		$(this).hide();
	})
	$(".gift_button").click(function(){
		$(".gift_tck").show();
   		$(".mask").show();
	})
	$(".close").click(function(){
 		$(".gift_tck").hide();
 		$(".mask").hide();
 	})
	$(".sina_playbtn").click(function(){
 		$("#video_mask").show();
 	})

	$(".tc_btn1").click(function(e){
		$(".t_tck").show();
	})
	$(".tc_close").click(function(){
		$(".t_tck").hide();
		$(".re_tck").hide();
	})
	$(".tc_btn2").click(function(){
	    	 init_screen();
			$(".re_tck").show();
			$(".mask").show();
		})

	//二维码下载弹出框
	$(".c_d-0307 span").on("click",function(){
		var $this = $(this).parent();
		if($this.hasClass('off')){
			$this.removeClass("off").addClass("on");
		}else{
			$this.removeClass("on").addClass("off");
		}
    })

})
