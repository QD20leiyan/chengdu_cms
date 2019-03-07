var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
   var opened = window.open('about:blank', '_self');
   opened.opener = null;
}
//tab切换
    $(".tab li").click(function(){
        var index=$(this).index();
        $(this).addClass("curr").siblings().removeClass("curr");
        $(".login_form").eq(index).css({"display":"block"}).siblings(".login_form").css({"display":"none"});
    });
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
    function autoPlayAudio() {
            document.getElementById('music').play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                document.getElementById('music').play();
            }, false);
        } 
    autoPlayAudio();