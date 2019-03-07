function unitPicBox(sid,width,height){
	var cW=document.querySelector("body").clientWidth;
	var tH=height/width*cW;
	$("."+sid).height(tH);
	var liW = cW *1;
	$(".image_ul img").width(liW);
	$(".image_ul li").width(cW);
}
unitPicBox("image_ul",640,300);
TouchSlide({
	slideCell:"#Roll",
	titCell:".hd ul",
	mainCell:".bd ul",
	effect:"leftLoop",
	autoPage:true,
	autoPlay:true,
	satrtFun:function(i,c){

	}
});
$(function(){
	$(".n_infor li").click(function(){
		$(this).addClass("on").siblings('li').removeClass("on");
	})
 	$(".n_title ul li").click(function(){
 		var index=$(this).index();
 		$(this).addClass("on").siblings().removeClass("on");
 		$(".n_informain").eq(index).show().siblings(".n_informain").hide();
		$(".new_more").eq(index).show().siblings(".new_more").hide();
 	})
	$(".list_more").click(function(){
		var cid = $(this).attr('data-id');
		if(cid==1){
			var type = 't1';
		}else if(cid==2){
			var type = 't2';
		}else if(cid==3){
			var type = 't3';
		}else if(cid==4){
			var type = 't4';
		}else{
			var type = 't6';
		}
		var begin = $(this).parent(".n_informain").find("ul li").length;
		var cat_name = $(this).attr('rel');
		$.post(
            '/wap/list',
            {
                begin:begin,
                cid:cid
            },
            function(msg){
                if(msg == 0){
                    alert('没有更多了');
                    return false;
                }else {
                    var myobj=eval(msg);
                    for(var i=0;i<myobj.length;i++){
						var li ='<li><a href="/wap/detail/aid/' + myobj[i].article_id + '">【'+ cat_name +'】 '+ myobj[i].title +'</a><span>'+ myobj[i].pub_time +'</span></li>';
						$('.'+type+' ul').append(li);
                    }
                }
            });
	})
})
