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


//二级菜单下拉框
var clickNumber1 = 1;
var clickNumber3 = 0;
$(".header_a .order").click(function() {
    if(clickNumber1 % 2 !== 0) {
        $(".wap_tab").slideDown();
        $(this).parent().siblings(".nav-content").slideUp();
    } else {
        $(".wap_tab").slideUp();
        $(this).parent().siblings(".nav-content").slideUp();
    }
    clickNumber1++;
    clickNumber3 = 1;
});