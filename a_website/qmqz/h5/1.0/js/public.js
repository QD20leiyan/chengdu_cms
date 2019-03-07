$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction : 'vertical',
        pagination: '.swiper-pagination',
        mousewheelControl : true,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper);
        },
        onTransitionEnd: function(swiper){
            swiperAnimate(swiper);
        }
    });
    function animate(){
        $(".charts").each(function(i,item){
            var a=parseInt($(item).attr("w"));
            $(item).animate({
                width: a+"%"
            },1000);
        });
    }
    animate();
    (function(a) {
    a.fn.typewriter = function(speed) {
    this.each(function() {
    var d = a(this),
    c = d.html(),
    b = 0;
    d.html("");
    var e = setInterval(function() {
    var f = c.substr(b, 1);
    if (f == "<") {
    b = c.indexOf(">", b) + 1
    } else {
    b++
    }
    d.html(c.substring(0, b) + (b & 1 ? "": "|"));
    if (b >= c.length) {
    clearInterval(e)
    }
    },
    speed)
    });
    return this;
    }
})(jQuery);

$(".btn-01").click(function(){
        $(".mask").show();
    })
     //点击音乐按钮
        $("#music_icon").on("touchend",function() {
            var name = $(this).attr("name");
            var music = $("#music");
            if(name == "play"){
                $(this).attr({"src":STATIC_MAIN+"/images/p_music_03.png","name":"pause","class":"music_pause"});
                music[0].pause();
            }else if(name == "pause") {
                $(this).attr({"src":STATIC_MAIN+"/images/p_music_play_06.png","name":"play","class":"music_play"});
                music[0].play();
            }
        });
    //微信接口音乐
    function autoPlayAudio1() {
            document.getElementById('music').play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                document.getElementById('music').play();
            }, false);
        } 
    autoPlayAudio1();
   function autoPlayAudio() {
        document.getElementById('audio').play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            document.getElementById('audio').play();
        }, false);
    } 
})