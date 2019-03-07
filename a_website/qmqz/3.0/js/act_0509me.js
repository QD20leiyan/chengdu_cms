// 浮动
function move(id) {
    var $_window = $(window);
    var $main_visual = $(id);
    var itemLi =$main_visual.find('.move_item');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.5;
        $(this).find('.move_item').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * (i) / 80) * (-1);
            var newTop = (cursorY - centerY) * (i) / 80 * (-1);
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
            i= i*2;
        });
    });
}
$(function(){
    move("#main_visual1");
    move("#main_visual2");
    //  视频播放    
    $(".p5_video_cont").click(function(){
        $("#video_mask").show();
    })
    $("#close").click(function(){
        $("#video_mask").hide();
    });
    // 滚屏效果
    $(".pageCont").css("transition-duration","200ms")
    var HEIGHT = -$("body").height();
    $(".page").height($("body").height())
    var time1 = null,time2 = null;
    $('.page_01').bind('mousewheel', function(event, delta, deltaX, deltaY) {
        if (window.console && console.log) {
             clearTimeout(time1)
             if (delta < 0) {
                $(".pageCont").css("transform",'translate3d(0px,'+HEIGHT+'px,0px)')
                $(".page_05").addClass("page_active");
                time1 = setTimeout(function(){
                    $(".page_01").removeClass("page_active");
                },500)
             }
        }
    });
    $('.page_05').bind('mousewheel', function(event, delta, deltaX, deltaY) {
        if (window.console && console.log) {
             clearTimeout(time2)
             if (delta > 0) {
                $(".pageCont").css("transform",'translate3d(0px,0px,0px)')
                $(".page_01").addClass("page_active");
                time2 = setTimeout(function(){
                    $(".page_05").removeClass("page_active");
                },500)
             }
        }
    });
    window.onresize = function(){
        var bodyHieght = $("body").height();
        var HEIGHT = -$("body").height() || HEIGHT;
        if ($(".page_01").hasClass("page_active")){
            $(".pageCont").css("transform",'translate3d(0px,0px,0px)')
        } else{
            $(".pageCont").css("transform",'translate3d(0px,'+HEIGHT+'px,0px)')
        }
        
        $(".page").height(bodyHieght);
        $('.page_01').bind('mousewheel', function(event, delta, deltaX, deltaY) {
            if (window.console && console.log) {
                 clearTimeout(time1)
                 if (delta < 0) {
                    $(".pageCont").css("transform",'translate3d(0px,'+HEIGHT+'px,0px)')
                    $(".page_05").addClass("page_active");
                    time1 = setTimeout(function(){
                        $(".page_01").removeClass("page_active");
                    },500)
                 }
            }
        });
        $('.page_05').bind('mousewheel', function(event, delta, deltaX, deltaY) {
            if (window.console && console.log) {
                 clearTimeout(time2)
                 if (delta > 0) {
                    $(".pageCont").css("transform",'translate3d(0px,0px,0px)')
                    $(".page_01").addClass("page_active");
                    time2 = setTimeout(function(){
                        $(".page_05").removeClass("page_active");
                    },500)
                 }
            }
        });
    }

    // tab切换
    var _p5_info = [
        {
            'name':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_name_01.png',
            'vimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_page2_img.jpg',
            'desc':'<p>斗魂本名刘霄，是一个27岁的北京人，目前隶属NVA战队，战术位置为A系步枪手，最擅长的枪械是炎龙。因其个人强绝的实力带领队伍一路冲到总决赛。是一位绝对强者，也是公认的无冕之王！作为一个80后，越来越大的年龄并没有让他停下脚步，他始终想要圆自己一个电竞梦，想站在像HPL这样更高更大的舞台上证明自己，想要在移动电竞的路上一直走下去，他有信心，也更有实力！</p>',
            'pimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_per_01.png',
			'vid':'uu=58546ec681&vu=9f958c3c76'
        },
		{
            'name':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_name_02.png',
            'vimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_page2_img2.png',
            'desc':'<p>如果你关注《全民枪战》的联赛，那么你一定不会忽视这样一位选手。他战术强、技术过人，他带领的团队，从一支完全不被看好的新兴队伍，在一个月间就摇身赶超顶级战队，还曾获得中国最成功的职业玩家之一——Alex的好评。但他依旧内敛、冷静、低调，他就是MOK.T战队的队长、战术核心——牛奶。在队友心中，牛奶是团队最可靠的领导核心，也是多次挽救战队的灵魂人物。</p>',
            'pimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_per_02.png',
			'vid':'uu=58546ec681&vu=4368623a28'
        },
		{
            'name':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_name_03.png',
            'vimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_page2_img3.png',
            'desc':'<p>血魔本名胡浩，来自江西，今年刚满18岁，目前在MOK.HD战队中担任自由人的位置，在比赛中最喜欢使用炎龙。血魔一直是队伍里的关键先生，多次在比赛中帮助队伍化险为夷。尤其是他在HPL2015全球总决赛中发挥出色，为MOK.HD拿下总决赛冠军做出了极大贡献。血魔经常直言不讳的说：“我的梦想是冠军。”而对手对血魔的评价是：“血魔真的很强。”</p>',
            'pimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_per_03.png',
			'vid':'uu=58546ec681&vu=b75534e64c'
        },
		{
            'name':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_name_05.png',
            'vimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_page2_img5.png',
            'desc':'<p>林轩本名张水恋，来自黑龙江，目前是SG丶Hero战队的队长。她是整个《全民枪战》游戏中少有的精通多类枪械的自由人，而且目前是HPL职业联赛中唯一的一名女性自由人。作为一名女生，林轩是典型的”不爱红装爱武装”，从初入《全民枪战》，到成为区冠军，在一步步成为职业战队的队长。林轩用他强大的个人实力，告诉了人们什么是“巾帼不让须眉”。林轩说的最多的一句话就是：“我想赢！”</p>',
            'pimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_per_05.png',
			'vid':'uu=58546ec681&vu=9759a1e6ee'
        },
		{
            'name':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_name_04.png',
            'vimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_page2_img4.png',
            'desc':'<p></p>',
            'pimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_per_04.png',
			'vid':'uu=58546ec681&vu=44444'
        },
		{
            'name':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_name_06.png',
            'vimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_page2_img6.png',
            'desc':'<p></p>',
            'pimg':'http://dev.static.yingxiong.com/qmqz/3.0/images/hof_per_06.png',
			'vid':'uu=58546ec681&vu=66666'
        }
    ];
     $(".fs_0 .sper").click(function(){
		 var index=$(this).index();
		 if(index<4){
         var num = index+1;
         $(this).addClass("on").siblings().removeClass("on");
         $(".page_05 .page_Content").removeClass("fadeIn").addClass("fadeOut");
         for (var i = 1;i<=6;i++){
             $(".page_05 .page_Content").removeClass("in_"+i);
         }
         $(".page_05 .page_Content").addClass("out_"+num);
         setTimeout(function(){
             $(".p5_rw_name i").css("background","url("+_p5_info[index].name+")")
             $(".p5_show_bimg i").css("background-image","url("+_p5_info[index].pimg+")")
             $(".p5_video_cont img").attr("src",_p5_info[index].vimg);
             $(".p5_rw_desc").html(_p5_info[index].desc)
             $(".page_05 .page_Content").removeClass("fadeOut").addClass("fadeIn");
             $(".page_05 .page_Content").removeClass("out_"+num).addClass("in_"+num);
			 $("#video_mask .videos").html('');
			 $("#video_mask .videos").html('<embed width="1280" height="720" align="middle" type="application/x-shockwave-flash" flashvars="'+_p5_info[index].vid+'&auto_play=1&gpcflag=1&width=1280&height=720" allowscriptaccess="always" quality="high" allowfullscreen="true" src="http://yuntv.letv.com/bcloud.swf">')
         },300)
		 }
     })
    
})
