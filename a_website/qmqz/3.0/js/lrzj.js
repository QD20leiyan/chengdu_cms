$(".downl-02").click(function(){
  $(".downl-tck").show();
  $(".mask").show();
})
$(".downl-01").click(function(){
  $(".downl-tck01").show();
  $(".mask").show();
})
$(".downl-tck .close,.downl-receive-tck .close,.downl-tck01 .close,.downl-bookfail-tck .close").click(function(){
  $(".downl-tck").hide();
  $(".downl-tck01").hide();
  $(".downl-receive-tck").hide();
  $(".downl-bookfail-tck").hide();
  $(".mask").hide();
})
$(".photo_story").click(function(){
  $(".photo_tck").show();
})
$(".photo_close").click(function(){
  $(".photo_tck").hide();
})
$(".photo_share ").click(function(){
  $(".photo_img").addClass("ani");
})
setTimeout(function(){
  $(".photo_img").removeClass("ani");
},5000)
$(".photo_img a").click(function(){
  $(".photo_bigimg").show().addClass("ani01");
  $(".mask").show();
  var img_name01=$(this).find("img").attr('src');
  $(".photo_bigimg").find("img").attr('src',img_name01);
})
$(".mask").click(function(){
  $(".photo_bigimg").hide();
  $(".mask").hide();
  $(".photo_bigimg").removeClass("ani01");
})
var $_window = $(window);
var $main_visual = $('.cover-wrap');
var itemLi =$main_visual.find('.item');
var visualWidth = $main_visual.width();
$main_visual.mousemove(function(e){
    var cursorX = e.clientX - $main_visual.offset().left;
    var cursorY = e.clientY - $main_visual.offset().top;
    var i=0.5;
    $(this).find('.item').each(function(){
        var item_width = $(this).width();
        var wrapperWidth =$_window.width();
        var wrapperHeight =(wrapperWidth-0)/1.26;
        var centerX = wrapperWidth / 2;
        var centerY = wrapperHeight / 2;
        var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
        var newTop = (cursorY - centerY) * (i) / 30 * (-1);
        $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
        i= i*2;
    });
});
$(".picimglink").css("text-decoration", "none");
$(".picimglink").bind({
    mouseenter: function() {
        $(this).children("span").animate({
            bottom: "0px"
        },
        500)
    },
    mouseleave: function() {
        $(this).children("span").clearQueue().animate({
            bottom: "-30px"
        },
        500)
    }
});
var biZhiDelayLoadImg = $("#biglanrenzhijiaUl img");
var biZhiDelayLoadImgLength = biZhiDelayLoadImg.length;
for (var i = 3; i < biZhiDelayLoadImgLength; i++) {
    var curDelayImg = biZhiDelayLoadImg.eq(i);
    if (curDelayImg.attr("srch")) {
        curDelayImg.attr("src", curDelayImg.attr("srch"));
        curDelayImg.removeAttr("srch")
    }
}
var _focus_num = $("#smalllanrenzhijiaUl > li").length;
var _focus_direction = true;
var _focus_pos = 0;
var _focus_max_length = _focus_num * 1058;
var _focus_li_length = 1058;
var _focus_dsq = null;
var _focus_lock = true;
function autoExecAnimate() {
    $("#mypic" + _focus_pos).addClass("info-cur").siblings("li.info-cur").removeClass("info-cur");
    var moveLen = _focus_pos * _focus_li_length;
    $("#biglanrenzhijiaUl").animate({
        left: "-" + moveLen + "px"
    },
    600);
    if (_focus_pos == (_focus_num - 1)) {
        _focus_direction = false
    }
    if (_focus_pos == 0) {
        _focus_direction = true
    }
    if (_focus_direction) {
        _focus_pos++
    } else {
        _focus_pos--
    }
}
_focus_dsq = setInterval("autoExecAnimate()", 6000);
$("#smalllanrenzhijiaUl > li").hover(function() {
    _focus_pos = parseInt($(this).attr("sid"));
    if (_focus_lock) {
        clearInterval(_focus_dsq);
        _focus_lock = false
    }
    $("#mypic" + _focus_pos).addClass("info-cur").siblings("li.info-cur").removeClass("info-cur");
    var moveLen = _focus_pos * _focus_li_length;
    $("#biglanrenzhijiaUl").stop(true, true).animate({
        left: "-" + moveLen + "px"
    },
    600)
},
function() {
    if (_focus_lock == false) {
        _focus_dsq = setInterval("autoExecAnimate()", 6000);
        _focus_lock = true
    }
});
$("#biglanrenzhijiaUl").hover(function() {
    if (_focus_lock) {
        clearInterval(_focus_dsq);
        _focus_lock = false
    }
},
function() {
    if (_focus_lock == false) {
        _focus_dsq = setInterval("autoExecAnimate()", 6000);
        _focus_lock = true
    }
});
$(".pic-list2 li").hover(function() {
    $(this).addClass("hover").siblings().removeClass("hover")
},
function() {
    $(this).removeClass("hover")
});
