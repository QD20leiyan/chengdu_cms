$(function(){
    // 微信
    var fla = 1;
    $(".i_m4 a.weixin").click(function(){
        if (fla == 1) {
            $(".i_m4 a.weixin").find("img").show();
            fla = 0;
        } else {
            $(".i_m4 a.weixin").find("img").hide();
            fla = 1;
        }
    })
    // 战舰展示
    function show(id,i) {
		var ii=0;
        var obj = $(id);
		if(obj.parent().find(".item i").length>0){
			if(typeof(obj.parent().find("li").eq(i).attr("dataw"))=="undefined"){}else{

				var datawarr = obj.parent().find("li").eq(i).attr("dataw").split("_");
				var dataName = obj.parent().find("li").eq(i).data("name");
				var dataDesc = obj.parent().find("li").eq(i).data("desc");
				obj.parent().find(".i_m2_txt h3").html(dataName);
				obj.parent().find(".i_m2_txt p").html(dataDesc);
  				for(var i in datawarr){
  					 ii++;
  					  obj.parent().find(".item"+ii).find("i").animate({
  					    width :datawarr[i]+"%"
  					  },1000);
  			    }
			}
  		}
  	}
	$(".i_m2_nav ul li").click(function(){
	    var index=$(this).index();
        var _index = $(this).index()+1;
        $(this).addClass("on").siblings().removeClass("on");
        $(".i_m2con").eq(index).css({"display":"block"}).siblings().css({"display":"none"});
        $(".i_m2con").eq(index).find(".item i").css("width","0");
        show(".slideBox"+_index,0);
        $(".i_m2con").find("li").eq(0).show().siblings().hide();
	})

    $(".slideBox1").slide({mainCell:"ul",autoPage:false,pnLoop:false,
        endFun:function(i,c){
            console.log(i)
            show(".slideBox1",i)
        }
    });
    $(".slideBox2").slide({mainCell:"ul",autoPage:false,pnLoop:false,
        endFun:function(i,c){
            console.log(i)
            show(".slideBox2",i)
        }
    });
    $(".slideBox3").slide({mainCell:"ul",autoPage:false,pnLoop:false,
        endFun:function(i,c){
            console.log(i)
            show(".slideBox3",i)
        }
    });
    $(".slideBox4").slide({mainCell:"ul",autoPage:false,pnLoop:false,
        endFun:function(i,c){
            console.log(i)
            show(".slideBox4",i)
        }
    });
    $(".slideBox5").slide({mainCell:"ul",autoPage:false,pnLoop:false,
        endFun:function(i,c){
            console.log(i)
            show(".slideBox5",i)
        }
    });
    $(".float_img .close").click(function(){
      $(".float_img").hide();
    })
    setTimeout(function(){
      $(".float_img").hide();
    },5000)


});
