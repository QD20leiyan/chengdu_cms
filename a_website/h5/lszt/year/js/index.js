var dm_url="/lszt/oldplayer/get-sign-log.html"+h5_jk_url;//弹幕
var login_url="/lszt/oldplayer/sign.html"+h5_jk_url;//确认签到
var lb_url='/lszt/oldplayer/get-gift.html'+h5_jk_url;//获取礼包
function windowHidden(){
        $("html,body").css({
            "overflow":"hidden",
            "width":"100%",
            "height":"100%"
        });
    };
function windowScroll(){
        $("html,body").css({
            "overflow":"visible",
            "width":"100%",
            "height":"auto"
        });
    }; 
//弹幕
function danmu(){
      	$.ajax({
		        type:'POST',
            url:dm_url,
            data:{},
            success:function(data){
                var data = JSON.parse(data);
                if(data.status == 0 && data.msg.data.length>0){
					          var strArr=new Array();
                    for(i =0 ;i<data.msg.data.length;i++){
                    	var dm_li=data.msg.data[i].data.name+":"+data.msg.data[i].data.year+"年征途玩家！"+data.msg.data[i].data.content;
                        strArr.push(dm_li);
                    }
					var colorArr=['#fff','#50f200','#ffae00','#00ccff','#ff0018','#fff','#50f200','#ffae00','#00ccff','#ff0018'];
					var toparr=[0.8,2.8,4.8,6.8,8.8];
		          function danmufun(){
		              var topindex=Math.floor(toparr.length*Math.random());
		              var span=$('<span style="top:'+toparr[topindex]+'rem;color:'+colorArr[Math.floor(colorArr.length*Math.random())]+';">'+strArr[Math.floor(strArr.length*Math.random())]+'</span>');
		              toparr.splice(topindex,1);
		              span.appendTo(".danmu").animate({left:-span.width()+"px"},10000,'linear',function(){
	                  toparr.push(parseFloat($(this).css('top'))/parseFloat($('html').css('fontSize')));
	                  $(this).remove();
	              });
              setTimeout(function(){
                  danmufun();
              },1500+Math.random()*1000);
            }
            danmufun();
          }else{
              $(".danmu").hide();
          }
      },
      error:function(){
            alert("网络请求错误，请刷新页面");
            $(".danmu").hide();
      }
    });
}
//兑换码
function code(){
	$.ajax({
		type:'POST',
        url:lb_url,
        data:{},
        success:function(data){
            var data = JSON.parse(data);
            if(data.status == 0){}
               $(".c_put").text(data.msg);
            },
        error:function(){
            alert("网络请求错误，请刷新页面");
             $(".c_put").text("网络请求错误，请刷新页面");
        }
    });
}
$(function(){
    //弹幕
    danmu();
    windowHidden();
    //选择按钮
    var li_click="";
	$(".age").click(function(){
		var li_click=$(this).parent().find(".t_ul");
	    $(this).parent().find(".t_ul").slideDown();
	    $(".t_ul2").slideUp();
	});
	$(".word").click(function(){
		var li_click=$(this).parent().find(".t_ul");
	    $(this).parent().find(".t_ul").slideDown();
	    $(".t_ul1").slideUp();
	});
	$(".t_ul1 li").click(function(){
		var text1=$(this).text();
        var year1=$(this).data("num");
        var g_year1=$(this).data("id");
		$(this).addClass("active").siblings().removeClass("active");
		$(".age.l_put").val(text1);
		$(".age.l_put").attr("data-num",year1);
		$(".age.l_put").attr("data-id",g_year1);
		$(".t_ul1").slideUp();

	})
	$(".t_ul2 li").click(function(){
		var text2=$(this).text();
		$(this).addClass("active").siblings().removeClass("active");
		$(".word.l_put").val(text2);
		$(".t_ul2").slideUp();
	})
	//确认签到
	$(".sure").click(function(){
    windowScroll();
		var name=$(".name").val();
        var year=$(".age").data("num");
        console.log(year);
        var g_year=$(".age").data("id");
        console.log(g_year);
        var content=$(".word").val();
		if(name=="" || name == undefined){
                alert("请输入您的《征途》昵称哦~");
                return;
            }
            if(year=="" || year == undefined){
                alert("请选择您的《征途》年龄哦~");
                return;
            }
            if(content=="" || content == undefined){
                alert("请选择您中意的签到语哦~");
                return;
            }
		$.ajax({
			    type:'POST',
	            url:login_url,
	            data:{
	            	"name":name,
                    "year":year,
                    "content":content,
	            },
	            success:function(data){
                var data = JSON.parse(data);
                if(data.status == 0){
                	$(".g_name").text(name);
                	$(".g_num").text(g_year+"年征途情");
                	$(".qdy").text(content);
                	code();
                	$(".page1").removeClass("active");
                	$(".page2").addClass("active");
                	$(".js_load").show();
                	var canvas2 = document.createElement("canvas");
                       let _canvas = document.querySelector('#jp_img');
                       var w = parseInt(window.getComputedStyle(_canvas).width);
                       var h = parseInt(window.getComputedStyle(_canvas).height);
                       canvas2.width = w * 4;
                       canvas2.height = h * 4;
                       canvas2.style.width = w + "px";
                       canvas2.style.height = h + "px";
                       var context = canvas2.getContext("2d");
                       context.scale(4,4);
                       html2canvas(_canvas,
                       {
                        canvas:canvas2
                      }
                      ).then(function(canvas){
                           console.log(canvas.toDataURL());
                           $(".js_load").hide();
                           $(".page2").removeClass("active");
                           $(".jp_img").attr("src",canvas.toDataURL("data:image/png"));
                           $(".page3").addClass("active");
                    });
            // var dom = $('#jp_img');
            // var width = dom.width();
            // var height = dom.height();
            // var type = "png";
            // var scaleBy = 2;  // 缩放比例
            // var canvas = document.createElement('canvas');
            // canvas.width = width * scaleBy;
            // canvas.height = height * scaleBy; 
            // canvas.style.width = width * scaleBy + 'px';
            // canvas.style.height = height * scaleBy + 'px';
            // var context = canvas.getContext('2d');
            // context.scale(scaleBy, scaleBy);
            // html2canvas(dom[0], {
            //     canvas : canvas,
            //     onrendered : function(canvas) {
            //         $(".picture").append(Canvas2Image.convertToImage(canvas, width * scaleBy, height * scaleBy, type));
            //         $(".picture img").addClass("jp_img");
            //         $(".picture img.sz_img").removeClass("jp_img");
            //           $(".js_load").hide();
            //           $(".page2").removeClass("active");
            //           // $(".jp_img").attr("src",canvas.toDataURL());
            //           $(".page3").addClass("active");
            //     }
            // });
                }
	            },
	            error:function(){
	                alert("网络请求错误，请刷新页面");
	            }
		    })
    })
});