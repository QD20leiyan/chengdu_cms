// var useragent = navigator.userAgent;
// if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
//    var opened = window.open('about:blank', '_self');
//    opened.opener = null;
// }
$(function () {
    //点击音乐按钮
        $("#music_icon").on("touchend",function() {
            var name = $(this).attr("name");
            var music = $("#music");
            if(name == "play"){
                $(this).attr({"src":STATIC_MAIN+"/image/p_music_03.png","name":"pause","class":"music_pause"});
                music[0].pause();
            }else if(name == "pause") {
                $(this).attr({"src":STATIC_MAIN+"/image/p_music_play_06.png","name":"play","class":"music_play"});
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
    //tab切换
    $(".tab li").click(function () {
        var index = $(this).index();//获取当前划过元素的index值
        $(this).addClass("curr").siblings().removeClass("curr");//改变当前状态
        $(".inp").eq(index).css({"display": "block"}).siblings(".inp").css({"display": "none"});//切换内容
        $('.inp').each(function () {
            if (!$(this).is(':hidden')) {
                serverId = $(this).find('option:selected').val();
            }
        })
    });
    $(".select").click(function () {
        window.location.href = "dwl.html"
    });
    $(".share_txt").click(function () {
        console.error('txt');
        $(".share-bg").show();
    })
    $(".share-bg").click(function () {
        $(this).hide();
    })
})
   