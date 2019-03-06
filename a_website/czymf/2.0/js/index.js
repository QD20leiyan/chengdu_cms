$(".news-nav li").click(function(){
		var index=$(this).index();//获取当前划过元素的index值
		$(this).addClass("curr").siblings().removeClass("curr");//改变当前状态
		$(".lis").eq(index).css({"display":"block"}).siblings(".lis").css({"display":"none"});//切换内容
	});
    $('.float_btn').click(function() {  
        $('body').toggleClass('op');
        var img = $(this).attr("src");
        if (this.src.search("11.png") != -1) {
            this.src = "http://dev.static.yingxiong.com/czymf/2.0/images/22.png";
        } else {
            this.src = "http://dev.static.yingxiong.com/czymf/2.0/images/11.png";
        }
    });  
// var windowHeight = $(window).scrollTop();
// var documentHeight = $(".button").height();
// var height = windowHeight - documentHeight;
// if(height <650){
// 	$(".button").addClass("but");
// }
// if(height == 655){
// 	$(".button").removeClass("but");
// }
//
//$(function(){
//var button=$(".button"); //得到导航对象
//var win=$(window); //得到窗口对象
//var sc=$(document);//得到document文档对象。
//win.scroll(function(){
//  if(sc.scrollTop()<=100){
//    button.addClass("but"); 
//   $(".navTmp").fadeIn(); 
//  }else{
//   button.removeClass("but");
//   $(".navTmp").fadeOut();
//  }
//})  
//})