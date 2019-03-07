
$(function(){
        window.onload = function(){
            var $li = $('.news-left>ul>li>a');
            var $ul = $('.content');
            $li.click(function(){
                var $this = $(this);
                var $t = $this.index();
                $li.removeClass();
                $this.addClass('on');
               $(".content").hide().eq($('.news-left>ul>li>a').index(this)).show();
            })
        }
        // 浮动
        var $_window = $(window);
        var $main_visual = $('.b');
        var itemLi = $main_visual.find('.b1');
        var visualWidth = $main_visual.width();
        $main_visual.mousemove(function(e) {
            var cursorX = e.clientX - $main_visual.offset().left;
            var cursorY = e.clientY - $main_visual.offset().top;
            var i = 0.5;
            $(this).find('.b1').each(function() {
                var item_width = $(this).width();
                var wrapperWidth = $_window.width();
                var wrapperHeight = (wrapperWidth - 0) / 1.26;
                var centerX = wrapperWidth / 2;
                var centerY = wrapperHeight / 2;
                var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
                var newTop = (cursorY - centerY) * (i) / 30 * (-1);
                $(this).css({
                    'transform': 'translate3d(' + newLeft + 'px,' + newTop + 'px, 0)'
                });
                i = i * 2;
            });
        });
});
$(function(){
        var a_i = 0;
        $(".nav-list").each(function(){
           var d= $(this).attr("num",a_i++);
           $(".news-deta").hide();
           $(".news-deta").eq(0).show();
        });
        $(".nav-list").click(function(){
            var this_i = $(this).attr("num");
            if($(".nav-list").find("a").is(".curr")){
                 $(".nav-list").find("a").removeClass("curr");
                 $(this).find("a").addClass("curr");;
            }else{
                $(".nav-list").find("a").removeClass("news-active");
                 $(this).find("a").addClass("news-active");;
            }
            $(".news-deta").hide();
            $(".news-deta").eq(this_i).show();
        });
});
 /**弹框**/
 // $('.i-video,.play-1').on('click',function(e){
 //     $('#video_tck embed').attr('flashvars', $(this).attr('data-url'));
 //            $("#video_tck").show();
 //            $("#mask").show();
 //        })
        $("#close").click(function(){
            $("#video_tck").hide();
            $("#mask").hide();
        });
        $(".float").click(function(){
            $(".float_box").show();
        });
        $(".close").click(function(){
            $(".float_box,.package,#mask").hide();
        });
$(".pack-img,.home,.iph").click(function(){
    $("#mask,.package").show();
});
$(".yuyue").click(function(){
    // $(".tips").show();
});
$(".ture").click(function(){
    $(".tips").hide();
});
$(".copy").on('click',function(){
    var e=document.getElementById("code");//对象是content
        e.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
        alert("礼包码复制成功！");
    });
var countdown=60; 
function sendemail(){
    var obj = $(".yzm");
    settime(obj);
    
    }
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) { 
        obj.attr('disabled',false); 
        obj.css('background','#666666'); 
        //obj.removeattr("disabled"); 
        obj.val("发送");
        countdown = 60;
        return;
    } else { 
        obj.attr('disabled',true); 
        obj.css('background','#bdbdbd');
        obj.val( countdown + "s");
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
}
$(".play-ul li").click(function(){
        var index=$(this).index();//获取当前划过元素的index值
        $(this).addClass("on").siblings().removeClass("on");//改变当前状态
        $(".play-left").eq(index).css({"display":"block"}).siblings(".play-left").css({"display":"none"});//切换内容
    });
$(".m1").click(function(){
    $(".box_mask,.box1").show();
    $(".box2,.box3,.box4").hide();
})
$(".m2").click(function(){
    $(".box_mask,.box2").show();
    $(".box1,.box3,.box4").hide();
})
$(".m3").click(function(){
    $(".box_mask,.box3").show();
    $(".box2,.box1,.box4").hide();
})
$(".m4").click(function(){
    $(".box_mask,.box4").show();
    $(".box2,.box3,.box1").hide();
})
$(".cl").click(function(){
    $(".box_mask").hide();
});

$('.down_bg .float_btn').click(function() {
    $('body').toggleClass('op');
    var img = $(this).attr("src");
    if (this.src.search("boult_in.png")!= -1) {
        this.src = "http://static.dev.yingxiong.com/jjmlz/1.0/images/boult_out.png";
    } else {
        this.src = "http://static.dev.yingxiong.com/jjmlz/1.0/images/boult_in.png";
    }
});