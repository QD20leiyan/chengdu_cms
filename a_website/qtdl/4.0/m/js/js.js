    window.onload = function(){
       // $("#startLoading").hide();
    }
    $(document).ready(function(){ 
        FastClick.attach(document.body);
        $('html').fitText(2);
        
        // 下拉菜单
        var flag = 1;
        $("#list").on("click",function(){
            if (flag == 1){
                $("#list").addClass('on');
                $("#mode-list").show();
                flag = 0;
            } else{
                $("#list").removeClass('on');
                $("#mode-list").hide();
                flag = 1;
            }
        });
        //图片轮播
        TouchSlide({ slideCell:"#slideBox-1",titCell:".hd ul", mainCell:".bd ul",autoPage:true, effect:"leftLoop" });
        $(".slideBox-3 li").each(function(i){$(".slideBox-3 li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});
        TouchSlide({ slideCell:"#slideBox-3"});
        //tab切换
        $("#tabBox-1 .hd li").eq(0).addClass('on');
        $("#tabBox-1 .bd ul").eq(0).show();
        $("#tabBox-1 .hd li").on("click",function(){
            var index=$(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $("#tabBox-1 .bd ul").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
        });
        //二维码
        $(".i-m10 .item-list1").on("click",function(){
            $("body").on("touchmove",false);
            $("#mode-wechat").show();
        });
        $("#mode-wechat").on("click",function(e){
            $("body").off("touchmove",false);
            $("#mode-wechat").hide();
        });
        $("#mode-wechat img").on("click",function(e){
            e.stopPropagation();
        });
        //首页视频播放
        $(".i-m1-video,.i-v-list-1 li a").click(function(){
            var link_url = $('.i-m1-video').attr('data-id');
            var rel = $(this).attr('data-id');
			
            if(rel){
                $("#iframe_btn").attr("src","/video/videoSource.html?"+rel);
                $("#video_tck").show();
                $("#mask").show();
                setTimeout(function(){$("#iframe_btn").css("height",window.frames['iframe_btn'].dHeight)},100);
            }else{
                alert('暂无视频');
                return false;
            }

        });
        $("#close").click(function(){
            $("#video_tck").hide();
            $("#mask").hide();
            setTimeout(function(){$(window.frames['iframe_btn'].document).find("video")[0].pause()},100);
        }); 

        //领取礼包
        $(".i-m1-lb").on("click",function(){
            $("#mask").show();
            $(".i-m12-lb").show();
        });
        $(".i-m12-lb .i-close").on("click",function(){
            $("#mask").hide();
            $(".i-m12-lb").hide();
        });
        var validCode=true;
        $(".m-scode").on("click",function(){
            var time=60;
            var code=$(this);
            if(validCode){
                validCode=false;
                var t=setInterval(function(){
                    time--;
                    code.html(time+"秒");
                    code.addClass("m-on");
                    //ajax获取验证码
                    if (time==0) {
                        clearInterval(t);
                        code.html("重新获取");
                        validCode=true;
                        code.removeClass("m-on");
                     }
                },1000);
            }
        });
        //礼包信息
        $(".i-mode12-cl,.i-mode12-qd").on("click",function(){
            $(".i-mode12").hide();
        });
        $(".qtdl-mh5-bg-9-3").on("click",function(){
            $(".i-mode12").show();
        });
        //佣兵。枪械
        $(".slideBox-3 .bd li").on("click",function(){
           $(this).parents(".bd").find("li").removeClass("on");
           $(this).addClass("on");
           $(".list-qx-hd img").attr("src",$(this).find("img").attr("data-src"));
        });
		//图片
		$(".i-v-list-2 li a").click(function(){
			  var _src = $(this).find("img").attr("src");
			  $("#mask").show();
			  $("#i-v-pic").show().append('<img src="'+_src+'">');
			
		});
        $("#i-v-pic #close").click(function(){
            $("#i-v-pic").hide();
            $("#i-v-pic img").remove();
        })
		
    })