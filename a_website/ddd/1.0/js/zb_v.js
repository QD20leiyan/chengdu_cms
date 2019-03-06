$(function(){
  var li_width=$(".c_w1_m ul li").width()+41;
  var index_w=0;
  var index_l=$(".c_w1_m ul li").length;
  $(".c_w1_m ul").width(li_width*index_l);
  function move(){
    var _left=li_width*index_w;
    $(".c_w1_m ul").animate({left:-_left});
  }
 // if(){
	  $(".next").click(function(){
		if(index_w>index_l-5){
		  index_w=index_l-4;
		  return;
		}
		index_w++;
		move();
	  });
	  $(".prev").click(function(){
		  index_w--;
		  if(index_w<0){
		  index_w=0;
		  return;
		 }
		move();
	  });
 // }

  //无缝滚动
var m4Item = $(".m4-item"),
  m4ItemNum = $(".m4-item").length,
  m4Demo1 = $(".m4-demo1"),
  m4Demo2 = $(".m4-demo2"),
  m4Inner = $(".m4-inner"),
  m4Box = $(".m4-box");
m4Demo1.append(m4Demo1.html());
m4Demo1.width(m4ItemNum*436);
m4Inner.width(m4ItemNum*436);
var flag=0;
var time1=null;
var time2=null;
function automove(){
  if(flag==0){
    time1=setInterval(function(){
      m4Box.scrollLeft(m4Box.scrollLeft()+1);
      if(m4Box.scrollLeft()>=m4ItemNum*218){
        m4Box.scrollLeft(0);
      }
    },10)
  }else{
    time2=setInterval(function(){
      m4Box.scrollLeft(m4Box.scrollLeft()-1);
      if(m4Box.scrollLeft()<=0){
        m4Box.scrollLeft(m4ItemNum*218);
      }
    },10)
  }
}
automove()
$(".m4-prev").click(function(){
  flag=1;
  clearInterval(time1);
  clearInterval(time2);
  automove();
})
$(".m4-next").click(function(){
  flag=0;
  clearInterval(time1);
  clearInterval(time2);
  automove();
})
m4Box.mouseover(function(){
  clearInterval(time1);
  clearInterval(time2);
})
m4Box.mouseout(function(){
  clearInterval(time1);
  clearInterval(time2);
  automove();
})
$(".d_m1_img a").click(function(){
  $(this).hide();
  $(".in_embed").show();
})
$(".first_a").click(function(){
  $(this).next("p").addClass("active").end().parent().siblings().find("p").removeClass("active");
  // $(".d_m1_img").empty();
  var index3=$(this).index();
  var link_url = $(this).attr('rel');
  var image_url = $(this).attr('data-id');
  // <a href="javascript:"><img src="'+img_name01+'" alt="img'+index3+'" /><span class="v_logo"></span><i></i></a>
  var a='<div class="in_embed"><embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="574" height="366" align="middle" allowScriptAccess="always" flashvars="'+link_url+'&auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash" play="true" flashvars="autoplay=true&play=true"></embed></div>';
  $(".d_m1_img").html(a);
  $(".in_embed").show();
  // var img_name01=$(this).find('img').attr("src");
  // $(".d_m1_img a").find('img').attr("src",img_name01);
  $(".d_m1_img a").click(function(e){
     $(".in_embed").empty();
    $(".in_embed").show();
     e.stopPropagation();
     $(this).hide();
    $(".in_embed").append('<embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="580" height="370" align="middle" allowScriptAccess="always" flashvars="'+ link_url +'&auto_play=1&gpcflag=1&width=580&height=370" type="application/x-shockwave-flash" play="true" flashvars="autoplay=true&play=true"></embed>');
    $(".in_embed").show();
  })
})

$(".a_bm").click(function(){
  $(".d_vtck").show();
  $(".dv_mask").show();
})
$(".dv_close").click(function(){
  $(".d_vtck").hide();
  $(".dv_mask").hide();
})

})
