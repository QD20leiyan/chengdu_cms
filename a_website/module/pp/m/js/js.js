//二级菜单下拉框
var clickNumber = 1;
var clickNumber2 = 0;
$(".header_a .type").click(function(e) {
  e.stopPropagation();
  if(clickNumber % 2 !== 0) {
    $(this).parent().siblings(".nav-content").slideDown();
    $(this).addClass("type1");
    $('.down_list').slideUp(500);
  } else {
    $(this).parent().siblings(".nav-content").slideUp();
    $(this).removeClass("type1");
    $('.down_list').slideUp(500);
  }
  clickNumber++;
  clickNumber2=0;
});
$(document).click(function(e){
  if($(e.target).closest(".nav-content").length==0&&clickNumber % 2 == 0){
    $(".nav-content").slideUp();
    $(".header_a .type").removeClass("type1");
    $('.down_list').slideUp(500);
    clickNumber++;
    clickNumber2=0;
  }
});
$('.down_btn').click(function () {
    if(clickNumber2 % 2 == 0) {
        $('.down_list').slideDown(500);
        $('.top-list').slideUp(500);
        $(".header_a .type").parent().siblings(".nav-content").slideUp();
        $(".header_a .type").removeClass("type1");
    } else {
        $('.down_list').slideUp(500);
        $(".header_a .type").parent().siblings(".nav-content").slideUp();
        $(".header_a .type").removeClass("type1");
    }
        clickNumber2++;
        clickNumber=1;
    });
$(".fade").click(function(){
      $('.down_list').slideUp(500);
      clickNumber2=0;
});

//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
  var index=$(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");
});


