$(function(){
	$(window).scroll(function(){
		var $t = $(this).scrollTop();
		if($t > 0){
			$(".menu").css({"top":"0"});
			$("#Hero-bar").css({"zIndex":"98"});
		}else{
			$(".menu").css({"top":"42px"});
			$("#Hero-bar").css({"zIndex":"9999999"});
		}
	});
});

//hover划出内容
$(".section3-feature-ul li a").hover(function() {
	$(this).parent("li").addClass("active").siblings().removeClass("active");
});
$(".index_slider-ul li a").hover(function() {
	$(this).parent("li").addClass("active").siblings().removeClass("active");
});

//弹框的显示与关闭
$(".detail_btn").click(function(){
	$(".tips").removeClass("hidden");
	$(".tips>div>div>img").addClass("hidden");
	$(".tips>div>div>img:eq("+mySwiper.realIndex+")").removeClass("hidden");
});
$(".close").click(function(){
	$(".tips").addClass("hidden");
});

//新闻对应内容显示
$(".news_box .hd ul li").hover(function(){
	var index=$(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).show().siblings(".news_info").hide();

});
//人物对应显示
$(".s3_peo_head span").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	$(".p_con .p").css("display" , "none");
	$(".p_con .p").eq($(this).index()-1).css("display" , "block");
	$(".canvas_box").removeClass("no_jx");
});
$(".i_main .s3_bottom .name_1 .jineng span").hover(function(){
	$(this).parent().find("span").addClass("gray").removeClass("btm");
	$(this).removeClass("gray").addClass("btm");
	$(this).parent().parent().find(".jineng_des span").css("display" , "none");
	$(this).parent().parent().find(".jineng_des span").eq($(this).index()).css("display" , "block");
});
//觉醒和未觉醒切换
$(".i_main .s3_bottom .p .state span").click(function(){
	var str=$(this).attr("data-id");
	d('myCanvas',JSON.parse("{"+str+"}"));
	if($(this).hasClass("is_jx")==true){
		$(this).parent().removeClass("on");
		$(this).parent().parent().parent().next(".canvas_box").removeClass("no_jx");
	}else{
		$(this).parent().addClass("on");
		$(this).parent().parent().parent().next(".canvas_box").addClass("no_jx");
	}
	$(this).parent().next(".p_name").find(".name_1").addClass("hidden");
	$(this).parent().next(".p_name").find(".name_1").eq($(this).index()).removeClass("hidden");
	$(this).parent().next().next(".p_peo").find(".s3_peo").addClass("hidden");
	$(this).parent().next().next(".p_peo").find(".s3_peo").eq($(this).index()).removeClass("hidden");
});

//武将
var iNow = 0,
	oPre = $(".wj_pre"),
	oNext = $(".wj_next"),
	oPeolist = $(".peo_list"),
	oUl = oPeolist.find("ul"),
	oLi = oUl.find("li"),
	numli = '6';
oUl.css({ "width": oLi.length * (oLi.width() + 21) });

function move() {
	var wleft = -iNow * (numli * oLi.outerWidth(true)) + 'px';
	oUl.animate({ "left": wleft }, 1000);
}
oNext.click(function() {
	if(iNow < Math.ceil(oLi.length / 6)&&oLi.length-(iNow+1)*6>0) {
		iNow++;
		move();
	}
});
oPre.click(function() {
	iNow--;
	if(iNow == -1) {
		iNow = 0;
		return;
	}
	move();
})
oLi.click(function(){
	oLi.removeClass("active");
	$(this).addClass("active");
	$(".s3_bottom .p").hide();
	$(".s3_bottom .p").eq($(this).index()).show();
	//$(".s3_bottom .p").eq($(this).index()).find(".jineng span").removeClass("btm").addClass("gray");
	//$(".s3_bottom .p").eq($(this).index()).find(".c6").removeClass("gray").addClass("btm");
	var str=$(this).attr("data-id");
	d('myCanvas',JSON.parse("{"+str+"}"));
	if($(this).hasClass("no_jx")){
		$(".canvas_box").addClass("no_jx");
	}else{
		$(".canvas_box").removeClass("no_jx");
	}
	$(".p_con .p").eq($(this).index()).find(".state .is_jx").trigger("click");
});
$(function(){
	var url = location.search; //获取url中"?"符后的字串
	var params = {};
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var datas = str.split("&");
		for(var i = 0 ; i < datas.length ; i++){
			var tempData = datas[i].split("=");
			params[tempData[0]]=decodeURIComponent(tempData[1]);
		}
	}
	if(params.wjid){
		$(".peo_list li[data-index='"+params.wjid+"']").trigger("click");
	}else{
		$(".peo_list .li1").trigger("click");
	}
});

//火焰
//$(function(){
//    var dom=$('.i_main');
//    function aa(){
//        for(var i=0;i<5;i++){
//            var j=parseInt(Math.random()*dom.width()*3);
//            var t=j*(0.5+0.5*Math.random());
//            var n=(j+60)*(Math.random()+0.5);
//            dom.prepend('<div class="fire"><div><div><div><div></div></div></div></div></div>');
//            dom.children('.fire').eq(0).css({'left':j,'top':-10});
//            dom.children('.fire').eq(0).animate({'left':-50,'top':n},t);
//
//        }
//    }
//    aa();
//    setInterval(function(){
//        aa();
//    },300);
//    setInterval(function(){
//        dom.children('.fire').each(function(i,n){
//            if($(n).css('left')=="-50px"){
//                $(n).remove();
//            }
//        });
//        //for(var jj=0;jj<dom.children('.fire').size()/4;jj++){
//        //    dom.children('.fire').eq(dom.children('.fire').size()-jj).remove();
//        //}
//    },1000);
//});

//能力占比canvas绘制
function d(id,param){
	var canvas=document.getElementById(id);
	var w=canvas.width;
	var h=canvas.height;
	var p=0.7;//设置内菱形的大小比例，1与外菱形一样大
	var ctx=canvas.getContext('2d');
	ctx.clearRect(0,0,w,h);
	//绘制整个菱形区域
	//开始一个新的绘制路径
	ctx.beginPath();
	ctx.moveTo(w/2,0);
	//绘制直线线段到坐标点(20, 100)
	ctx.lineTo(w,h/2);
	//绘制直线线段到坐标点(70, 100)
	ctx.lineTo(w/2,h);
	//绘制直线线段到坐标点(20,100)
	ctx.lineTo(0,h/2);
	//先关闭绘制路径。
	ctx.closePath();
	//设置要填充的颜色
	ctx.fillStyle='#4E231D';
	//最后，填充颜色
	ctx.fill();

	//绘制十字线及菱形线
	//开始一个新的绘制路径
	ctx.beginPath();
	ctx.moveTo(0,h/2);
	ctx.lineTo(w,h/2);
	ctx.moveTo(w/2,0);
	ctx.lineTo(w/2,h);
	ctx.moveTo(w/2,h/2*(1-p));
	ctx.lineTo(w/2*(1+p),h/2);
	ctx.lineTo(w/2,h/2*(1+p));
	ctx.lineTo(w/2*(1-p),h/2);
	ctx.closePath();
	ctx.lineWidth=1;
	ctx.strokeStyle='#81362F';
	ctx.stroke();

	//绘制中间要显示的菱形区域
	ctx.beginPath();
	ctx.moveTo(w/2,h/2*(1-param.t));
	ctx.lineTo(w/2*(1+param.r),h/2);
	ctx.lineTo(w/2,h/2*(1+param.b));
	ctx.lineTo(w/2*(1-param.l),h/2);
	ctx.closePath();
	ctx.fillStyle='rgba(232, 165, 63, .4)';
	ctx.fill();
}
//l为左边的百分比
// t为上边的百分比
// r为右边的百分比
// b为下边的百分比


//首页能力赋值
$(".s_wid118").click(function(){
	var str=$(this).attr("data-id");
	d('myCanvas',JSON.parse("{"+str+"}"));
	if($(this).hasClass("no_jx")){
		$(".canvas_box").addClass("no_jx");
	}else{
		$(".canvas_box").removeClass("no_jx");
	}
	$(".p_con .p").eq($(this).index()-1).find(".state .is_jx").trigger("click");
});
$(".s_p_h1").trigger("click");

//浮窗
$(".float").click(function(e){
	if(e.target==this){
		$(this).removeClass("active");
	}
});
$(".float .fl_close").click(function(){
	$(this).parent().addClass("active");
});


