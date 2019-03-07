;(function(designWidth, maxWidth) {
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 750;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 750);


// 登陆弹窗
function alertDl(){
    var txt = '<h2>メールが確認できるメールアドレスを入力してください</h2>'
            + '<input class="input" type="text" name="" placeholder="メールアドレスを入力してください">'
            + '<p>メールアドレスが間違っています</p>';

        dialog.alertDL('',txt,"dialog.closeDiv()","alertStep1()","d");
}

// 弹窗-步骤1
function alertStep1(){
    var txt = '<dl class="msg">'
            +  '<dd>リセット成功！</dd>'
            +  '<dd>再度ガチャを回して更に良い特典を獲得しよう！</dd>'
            +  '</dl>'
        dialog.alertDL('',txt,"dialog.closeDiv()","alertStep2()","d");
}

// 弹窗-步骤2
function alertStep2(){
    var txt = '<dl>'
            +  '<dt>確定中の特典をリセットしますか？</dt>'
            +  '<dd>＊一度リセットすると、元に戻すことはできません</dd>'
            +  '</dl>'
        dialog.alertDL('戻る',txt,"alertStep3()","","s");
}

// 弹窗-步骤3
function alertStep3(){
    var txt = '<dl class="step3">'
            +  '<dt>事前登録が完了しました</dt>'
            +  '<dd>リリース時、ご登録メールアドレスでお知らせ致します。<br/>メールアドレス確認：<span class="email">xxx.用戶輸入的郵箱</span></dd>'
            +  '</dl>'
        dialog.alertDL('',txt,"","","0");
}

function alertStep4(){
    var maskLayer="<div id='maskLayer'></div>";
    $("body").append(maskLayer);
    $("#maskLayer").height($(document).height()).show();

    alertPop('.fb_em_dl');
}
// 开关
var bOff = true;


$(function() {
    // 输入框获得焦点 隐藏 placeholder
    if ($('.sechbg input').val() == '') {
         $('.sechbg input').focus(function(){
            $(this).attr('placeholder','')
        });
    };
    // 滚动加载
    scroll_con();

    // 特点一览
    $('.alert_td').on('click',function(){
        var maskLayer="<div id='maskLayer'></div>";
        $("body").append(maskLayer);
        $("#maskLayer").height($(document).height()).show();

        alertPop('.pop_td');
    });

    // 分享登陆
//  alertStep4();

    //底部活动规则
    $('.zy a').on('click',function(){
        var maskLayer="<div id='maskLayer'></div>";
        $("body").append(maskLayer);
        $("#maskLayer").height($(document).height()).show();

        alertPop('.pop_hdgz');
    });

    // 声优活动规则
    $('.pop_sy').on('click',function(){
        var maskLayer="<div id='maskLayer'></div>";
        $("body").append(maskLayer);
        $("#maskLayer").height($(document).height()).show();

        alertPop('.pop_sygz');
    });

    // 登陆弹出
    $('.btn_secrch').on('click',function(){
        alertDl();
    })

    // 底部固定导航
    $('.fixed_footNav').stop().animate({'bottom':'0'},1000);

    //关闭
    $(document).on("click", ".pop .cse,#alertInfo .close,.close", dialog.closeDiv);
    // menu
    $('.change-btn,.closemenu').on('click', bOffFn);

    //弹出视频
    $('.vBtn').on('click', function() {
        var url = $(this).attr('data-url');
        console.log(url)
        dialog.alertVideo(url);

    })

    // 返回顶部
    $(".gTop").click(function(event) {
        event.preventDefault();
        $("html,body").animate({
            scrollTop: 0
        }, 300);
    });

    // 点击播放音频
    $('.btn_audio').on('click',function(){
        $(this).toggleClass('play_audio');
        var dataSrc = $(this).attr('data-src');
        // console.log(dataSrc);
        var indexAudio = $(this).find('audio')[0];

        // console.log(indexAudio)

        if ($(this).hasClass('play_audio')) {
            // indexAudio.pause();
            indexAudio.src = dataSrc;
            indexAudio.play();
            // console.log('1'+indexAudio.src)
        }else{
            indexAudio.pause();
            // console.log('0'+indexAudio.src)
        }
        // 66.0.3359.181 google 不自动播放
        // 67.0.3396.62
    });

    // 锚点链接
    $('#top').on('click',function(){
        $("html,body").animate({
            scrollTop: 0
        }, 300);

        bOffFn();
    })

    $('#champion').on('click',function(){
        var h = $('.sect1').offset().top - 60;

        $("html,body").animate({
            scrollTop: h
        }, 300);
        bOffFn();
    })

    $('#character').on('click',function(){
        var h = $('.sect3').offset().top - 50;
        $("html,body").animate({
            scrollTop: h
        }, 300);
        bOffFn();
    })
     $('#movie').on('click',function(){
        var h = $('.sect4').offset().top - 50;
        $("html,body").animate({
            scrollTop: h
        }, 300);
        bOffFn();
    });

    $('.b_pic p').on('click',function(){
        var $index = $(this).index();
        // console.log($index)
        /*$(".centbox .section").each(function(i,n){
            var bound = n.getBoundingClientRect();
            // console.log(bound);
            if (bound.top < document.documentElement.clientHeight) {
                $(n).addClass("animated fadeInUp");
            }
        });*/

        var h = $('.centbox .section').eq($index).offset().top - 50;

        if ($index ==2 ) {
            var h3 = $('.centbox .b3_cen').offset().top - 50;
            $("html,body").animate({
                scrollTop: h3
            }, 300);
        }else{
            $("html,body").animate({
                scrollTop: h
            }, 300);
        }
    });

    // 假逻辑
    $('.pop1 .btn1').on('click',function(){
        // alert('a')
        $('.pop1').hide();
        $('.pop2').show();
    })

    $('.pop2 .btn2').on('click',function(){
        $('.default').hide();
        var num = randomNum(1,18);
        console.log(num)
        $('.cj_end').show();
        $('.cj_end').addClass('animated flipInY')

        $('.cj_end img').attr('src','images/rssx2/r'+num+'.png').show();

        setTimeout(function(){
            $('.cj_end').removeClass('flipInY');
        }, 1000);
    });

    $('.pop2 .btn3').on('click',function(){
        $('.pop2').hide();
        $('.pop3').show();
    });

    $('.pop3 .btn5').on('click',function(){
        $('.pop3').hide();
        $('.pop1').show();
        $('.cj_end').hide();
        $('.default').show();
    });



    // 滚动条美化
    $(".content_1").mCustomScrollbar({
        scrollInertia:600,
        autoDraggerLength:false
    });
})

$(window).scroll(function() {
    scroll_con();
    var scrollT = $(window).scrollTop()

    if (scrollT > 400) {
        $('.up').show();
    } else {
        $('.up').hide();
    };

    var $plt = parseInt($('.plimg').offset().top + $('.plimg').height());
    var $prt = parseInt($('.primg').offset().top + $('.primg').height());

    // console.log(scrollT);

    if (scrollT>1400) {
        $('.primg').stop().animate({
            top: (scrollT-$prt)/5+'px'
        },1000);

        $('.fixed_footNav .fx3').stop().animate({'bottom':'-2rem'},500).hide();
        $('.fixed_footNav .app_gp').show().stop().animate({'bottom':'0'},500);
    }else{
        $('.fixed_footNav .fx3').stop().animate({'bottom':'0'},500).show();
        $('.fixed_footNav .app_gp').hide().stop().animate({'bottom':'-2rem'},500);
    }
    var a = $(window).scrollTop();
    if (scrollT>2500) {
        $('.plimg').stop().animate({
            top: parseInt($('.primg').offset().top) - (a)/3+'px'
        },1000);
    }
});

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
        break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
            default:
                return 0;
            break;
    }
}

//scroll
function scroll_con(){
    $(".scrollAni:not(.fadeInUp)").each(function(i,n){
        var bound = n.getBoundingClientRect();
        // console.log(bound);
        if (bound.top < document.documentElement.clientHeight) {
            $(n).addClass("animated fadeInUp");
        }
    });
}

// 弹出框
function alertPop(Ele){
    var _winH=$(window).height();             //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
    var _scrollTop=$(document).scrollTop();   //　　　　　　　　　　　      ├→
    // $("#alertInfo").append(alertHtml).show(); //﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
    $(Ele).show();
    var _thisDomWidth=$(Ele).outerWidth();
    var _thisDomHeight=$(Ele).outerHeight();
    var topD=parseInt(_scrollTop+(_winH-_thisDomHeight)/2);
    var mL=parseInt(_thisDomWidth/2);
    if(_thisDomHeight>=_winH){
        topD=_scrollTop;
        if(_scrollTop+_thisDomHeight>=$(document).height()){
            topD=$(document).height()-_thisDomHeight;
        };
        $(Ele).css("position","absolute");
    }else{
        topD=(_winH-_thisDomHeight)/2;
        $(Ele).css("position","fixed");
    };
    $(Ele).css({
        "margin-left":"-"+mL+"px"
    }).stop(true,true).animate({
        "top":topD+"px",
        "margin-left":"-"+mL+"px",
        "opacity":"1"
    },"fast");
}



function bOffFn(){
    $('.change-btn').toggleClass('cur');
    if (bOff) {
        $('.menu').show();
        $('.menu').removeClass('nav-hide').addClass('nav-show');

        bOff = !bOff;
        console.log('show nav')
    } else {
        $('.menu').removeClass('nav-show').addClass('nav-hide');
        bOff = !bOff;
        console.log('hide nav')
    }
}