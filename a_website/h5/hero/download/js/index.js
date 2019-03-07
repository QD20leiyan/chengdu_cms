h5_data=$(".h5_data").html();
$(".inter_btn,.down_btn").click(function(){//下载埋点
    HLog.event('hero_liu_downbtn');
});
var srf = $('meta[name="csrf-token"]').attr('content');
//var login_url='/ca/new/get-user-info.html?h5data='+h5_data;//判断用户是否登录





//初始化
$(function(){

});


//滚动位置判断
function showani(){
    $(".ani:not(.show-ani)").each(function(i,n){
        var offset=$(n).offset();
        var scrollY=window.pageYOffset || document.documentElement.scrollTop;
        console.log(offset)
        console.log(scrollY)
        if(scrollY > offset.top - document.documentElement.clientHeight + $(n).height()/4){
            $(n).addClass("show-ani");
        }
    })
}
$(window).scroll(function(e){
    showani();
});
showani();




