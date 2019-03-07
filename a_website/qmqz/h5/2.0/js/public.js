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
    function inp_uname(){
        
    }