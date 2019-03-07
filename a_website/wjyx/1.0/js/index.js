function isEmail(email) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var temp = reg.test(email);
        return temp;
}
function autoScroll(obj) {
    $(obj).animate({
        marginTop: "-40px"
    }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    });
}
var ajaxUrl = "/commonMethod/ajax-get-list.html";
var url = "/commonMethod/ajax-yuyue-email.html";
    // getListFu();
$(function() {
	// $(".weixin").hover(function() {
	// 	$(".erweima").stop().fadeIn();
	// }, function() {
	// 	$(".erweima").stop().fadeOut();
	// });
	$(".i_share_wx").hover(function() {
		$(".i_share_weixin").stop().fadeIn();
	}, function() {
		$(".i_share_weixin").stop().fadeOut();
	});
	// nav列表
	//$(".news-nav li").on("click", function() {
	//	var index = $(this).index();
	//	$(this).addClass("curr").siblings().removeClass("curr");
	//	$(".tab-cont ul").eq(index).removeClass("hide").siblings().addClass("hide");
	//});
	// 新闻中心列表
	$(".news-menu li").on("click", function() {
		var index = $(this).index();
		$(this).addClass("curr").siblings().removeClass("curr");
		//$(".lis ul").eq(index).removeClass("hide").siblings().addClass("hide");
	});
     // $("input").trigger("click");
	var order_url ='/common/yy.html ';
    var srf = $('meta[name="csrf-token"]').attr('content');
    //预约弹框
        $(".ios").click(function(){
            $(".tips").removeClass("hidden");
        });
        $(".close").click(function(){
            $(".tips").addClass("hidden");
            $(".tel").val("");
            $(".error").hide();
        });
    //预约游戏
        $(".submit").click(function(){
            var email = $(".tel").val();
            if(isEmail(email)) {
                var params = {
                    "type":'ios',
                    "email":email,
                    "cms_csrf": $("meta[name='csrf-token']").attr("content")
                }
            $.post(url, params,
                function(data){
                    console.error(data);
                    if(data.status == 0){
                        alert(data.msg);
                        $(".tips").addClass("hidden");
                        $(".tel").val("");
                    }else{
                        alert(data.msg);
                        $(".tips").addClass("hidden");
                        $(".tel").val("");
                    }
                }, 'json');
            }else{
                 alert('邮箱格式错误');
            }
        });
    var iCount=setInterval('autoScroll(".news_ul ul")', 1500);
    $(".news_ul li").hover(function(){
        clearInterval(iCount);
    },function(){
        iCount = setInterval('autoScroll(".news_ul ul")', 1500);
    })
})