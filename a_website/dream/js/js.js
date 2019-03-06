$(function () {
    var person = {
        type: "ios",
        cms_csrf: $("meta[name='csrf-token']").attr("content")
    };
    var mySwiper = new Swiper(".swiper-container", {
        autoplay: 5000,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        loop: true
    });
    var countdown = 60;

    function sendemail() {
        var obj = $("#getMarkBtn");
        settime(obj);
    }

    function settime(obj) { //发送验证码倒计时
        if (countdown == 0) {
            obj.attr('disabled', false);
            obj.text("获取验证码");
            countdown = 60;
            return;
        } else {
            obj.attr('disabled', true);
            obj.text("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    };

    //图片验证码
    function tupian() {
        $.get("/site/captcha.html?refresh=1", {}, function (data) {
            $("#captcha-img").attr("src", data.url);
        }, 'json');
    };

    function isLogin() {
        var params = {};
        $.get("/site/ajax-get-user.html",
            function (data) {
                if (data.status == 0) {
                    person.isLogin = true;
                    person.user_phone = data.msg.user_phone;
                    person.me_invite_code = data.msg.me_invite_code;
                    person.invite_img = data.msg.invite_img;
                    person.share_url = data.msg.share_url;
                    person.invite_code = data.msg.invite_code;
                    person.chance_num = data.msg.chance_num;
                    person.walk_num = data.msg.walk_num - 1;
                    person.invite_num = data.msg.invite_num;
                    person.isYuyue = data.msg.is_yuyue;
                    gameStart(person.walk_num);
                    $('.shaizi').find('span').text(person.chance_num);
                    $('.logined').find('.phoneNum').find('span').text(person.user_phone);
                    $('.logined').find('.yaoCode').find('span').text(person.me_invite_code);
                    $('.logined').find('.yaoSuccess').find('span').text(person.invite_num);
                    $('.login').hide();
                    $('.logined').show();
                    $('.phoneNum').find('span').text(person.user_phone);
                    $('.yaoCode').find('span').text(person.me_invite_code);
                    $('.yaoSuccess').find('span').text(person.invite_num);
                    $('.dialog-yue').find('.shareCode').find('.myCode').attr('src', person.invite_img)
                    $('.dialog-yue').find('.shareCode').find('.yaoNum').text(person.me_invite_code);
                    //初始判断是否预约成功
                    if(person.isYuyue==-1) {
                        var new_url=$(".yueBtn").attr("data-url");
                        $(".yueBtn").attr("src",new_url);
                    }
                } else {
                    person.isLogin = false;
                }
            }, 'json');
    }

    isLogin();

    function getYueNum() {
        $.get("/site/ajax-get-num.html",
            function (data) {
                if (data.status == 0) {
                    $('.nowNum').find('span').text(data.msg);
                }
            }, "json");
    }

    getYueNum();

    function getNum() {
        if (!person.isLogin) {
            $('.mask').show();
            $('.cont6-dialog').hide();
            $('.dialog').hide();
            $('.dialog-information').show();
            return;
        }
        else if (person.chance_num <= 0) {
            alert('亲，剩余次数不足!');
            return;
        }
        var random = Math.floor((Math.random() * 6) + 1);
        random = parseInt(random);
        person.random = random;
        if (random == 2) {
            $('.shaizi').addClass('num2');
        }
        if (random == 3) {
            $('.shaizi').addClass('num3');
        }
        if (random == 4) {
            $('.shaizi').addClass('num4');
        }
        if (random == 5) {
            $('.shaizi').addClass('num5');
        }
        if (random == 6) {
            $('.shaizi').addClass('num6');
        }
        var params = {
            "num": random,
            "cms_csrf": person.cms_csrf
        };
        $.post("/site/walk.html", params,
            function (data) {
                if (data.status == 0) {
                    gameStart((random + person.walk_num));
                    if((random + person.walk_num) > 20){
                        $('.mask').show();
                        $('.cont6-dialog').hide();
                        $('.dialog').hide();
                        $('.dialog-gift').show();
                        alert('恭喜您到达终点');
                    }
                    person.walk_num = data.msg;
                    person.chance_num--;
                    $('.shaizi').find('span').text(person.chance_num);
                } else {

                }
            }, "json");
    }

    function gameStart(num) {
        var basicWidth = 125, basicHeight = 94, line1Last = 10, width = 45, height = 0;
        var random = num;
        if (random <= 6) {
            width += random * basicWidth;
            // $('#gift1').show();
            // $('#gift1').css({
            //     opacity: 0
            // })
            // if (random == 6 || random == 2) {
            //     width -= line1Last;
            //     $('.mask').show();
            //     $('.dialog').hide();
            //     $('.dialog-gift').show();
            // }
            $('.gamePlayer').removeClass('back');
            $('.gamePlayer').removeClass('right');
            $('.gamePlayer').removeClass('front');
            if(random > 0){
                $('#getGift1').show();
            }
            if(random == 6){
                $('#getGift2').show();
            }

        }
        if (random > 6 && random < 11) {
            width += 6 * basicWidth - line1Last;
            height = (random - 6) * basicHeight;
            // $('#gift1').show();
            // $('#gift1').css({
            //     opacity: 0
            // })
            // $('#gift2').show();
            // $('#gift2').css({
            //     opacity: 0
            // })
            $('.gamePlayer').removeClass('back');
            $('.gamePlayer').removeClass('right');
            $('.gamePlayer').addClass('front');
            $('#getGift1').show();
            $('#getGift2').show();
        }
        if (random >= 11 && random < 17) {
//            width = basicNum + 6 * basicWidth - line1Last;
//            height = 4 * basicHeight;
//            width = width - (random - 10) * basicWidth;
            width += (16 - random) * basicWidth;
            height = 4 * basicHeight;
            // $('#gift1').show();
            // $('#gift1').css({
            //     opacity: 0
            // })
            // $('#gift2').show();
            // $('#gift2').css({
            //     opacity: 0
            // })
            // $('#gift3').show();
            // $('#gift3').css({
            //     opacity: 0
            // })
            if (random == 16) {
                // $('#gift4').show();
                // $('#gift4').css({
                //     opacity: 0
                // })
            }
            // if (random == 11 || random == 16) {
            //     width -= line1Last;
            //     $('.mask').show();
            //     $('.dialog').hide();
            //     $('.dialog-gift').show();
            // }
            $('.gamePlayer').removeClass('back');
            $('.gamePlayer').removeClass('front');
            $('.gamePlayer').addClass('right');
            $('#getGift1').show();
            $('#getGift2').show();
            $('#getGift3').show();
            if(random == 16){
                $('#getGift4').show();
            }
        }
        if (random >= 17 && random < 19) {
//            width = basicNum + 6 * basicWidth - line1Last;
//            height = 4 * basicHeight;
//            width = width - (random - 10) * basicWidth;
//            height = height - (random - 16) * basicHeight;
            height = (20 - random) * basicHeight;
            // $('#gift1').show();
            // $('#gift1').css({
            //     opacity: 0
            // })
            // $('#gift2').show();
            // $('#gift2').css({
            //     opacity: 0
            // })
            // $('#gift3').show();
            // $('#gift3').css({
            //     opacity: 0
            // })
            // $('#gift4').show();
            // $('#gift4').css({
            //     opacity: 0
            // })
            $('.gamePlayer').removeClass('right');
            $('.gamePlayer').removeClass('front');
            $('.gamePlayer').addClass('back');
            $('#getGift1').show();
            $('#getGift2').show();
            $('#getGift3').show();
            $('#getGift4').show();
        }
        if (random >= 19 && random < 22) {
            width += (random - 18) * basicWidth;
            height = 2 * basicHeight;
            // $('#gift1').show();
            // $('#gift1').css({
            //     opacity: 0
            // })
            // $('#gift2').show();
            // $('#gift2').css({
            //     opacity: 0
            // })
            // $('#gift3').show();
            // $('#gift3').css({
            //     opacity: 0
            // })
            // $('#gift4').show();
            // $('#gift4').css({
            //     opacity: 0
            // })
            // if (random == 21) {
            //     $('#gift5').show();
            //     $('#gift5').css({
            //         opacity: 0
            //     })
            // }
            $('.gamePlayer').removeClass('back');
            $('.gamePlayer').removeClass('right');
            $('.gamePlayer').removeClass('front');
            $('#getGift1').show();
            $('#getGift2').show();
            $('#getGift3').show();
            $('#getGift4').show();
            if (random == 21) {
                $('#getGift5').show();
            }
        }
        if(random >= 22){
            width += 3 * basicWidth;
            height = 2 * basicHeight;
            // $('#gift1').show();
            // $('#gift1').css({
            //     opacity: 0
            // })
            // $('#gift2').show();
            // $('#gift2').css({
            //     opacity: 0
            // })
            // $('#gift3').show();
            // $('#gift3').css({
            //     opacity: 0
            // })
            // $('#gift4').show();
            // $('#gift4').css({
            //     opacity: 0
            // })
            // $('#gift5').show();
            // $('#gift5').css({
            //     opacity: 0
            // })
            $('.gamePlayer').removeClass('back');
            $('.gamePlayer').removeClass('right');
            $('.gamePlayer').removeClass('front');
            $('#getGift1').show();
            $('#getGift2').show();
            $('#getGift3').show();
            $('#getGift4').show();
            $('#getGift5').show();
        }
        $('.gamePlayer').fadeOut(300);
        setTimeout(function () {
            $('.gamePlayer').css({
                left: width,
                top: height
            })
            $('.gamePlayer').fadeIn(300);
        },300)
    }

    $('.close').click(function () {
        $(this).parent('.dialog').parent('.mask').hide();
    })
    $('#type').find('p').click(function () {
        $('#type').find('p').removeClass('active');
        $(this).addClass('active');
        if ($(this).attr('data-index') == 1) {
            person.type = 'ios';
        }
        else {
            person.type = 'android';
        }
    })
    $('#friend-checkBox').find('p').click(function () {
        $('#friend-checkBox').find('p').removeClass('active');
        $(this).addClass('active');
    })
    $('.friend-btn').click(function () {
        var input = $('#friend-input').val();
        // if ($('#friend-checkBox').find('.active').attr('data-index') == 3) {
        //     if (input == "" || input == undefined) {
        //         alert("请输入邀请码");
        //         return;
        //     }
        // }
        $.post("/site/ajax-yuyue.html", {
            "type": person.type,
            "invite_code": input,
            "cms_csrf": person.cms_csrf
        }, function (data) {
            if (data.status == 0) {
                // alert("恭喜您预约成功!");
                // $('.mask').hide();
                // $('.dialog').hide();
                var new_url=$(".yueBtn").attr("data-url");
                $(".dialog-success").show();
                    $(".dialog-success").find('.yq_num').text(person.me_invite_code);
                    $(".yueBtn").attr("src",new_url);
                    $(".dialog-type").hide();
                    $(".dialog-yue").hide();
                    $(".dialog-information").hide();
                    $(".dialog-gift").hide();
                person.chance_num++;
                $('.shaizi').find('span').text(person.chance_num);
            } else {
                if(data.msg=="您已经预约过了，请勿重复预约"){
                     var new_url=$(".yueBtn").attr("data-url");
                    $(".dialog-success").show();
                    $(".dialog-success").find('.yq_num').text(person.me_invite_code);
                    $(".yueBtn").attr("src",new_url);
                    $(".dialog-type").hide();
                    $(".dialog-yue").hide();
                    $(".dialog-information").hide();
                    $(".dialog-gift").hide();
                    }else{
                    alert(data.msg);
                }
            }
        }, "json")
    })
    //立即分享
    $(".lj_order").click(function(){
        $(".dialog").hide();
        $(".dialog.dialog-yue").show();
    })
    $('.p_sure').click(function () {
        $('.mask').hide();
        $('.dialog').hide();
        $('.cont6-dialog').hide();
    })
    $('.goHome').click(function () {
        alert('敬请期待');
    })
    // $('.download').click(function () {
    //     alert('将于3月1日16点开放预下载!');
    // })
    $('.gift').click(function () {
        $("html,body").animate({
            scrollTop: 800
        }, 500);
    })
    $('.fixed-right-btn').click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });
    $('.yueBtn').click(function () {
        if (person.isLogin) {
            if(person.isYuyue==-1) {
                $('.mask').show();
                $('.dialog').hide();
                $('.cont6-dialog').hide();
                $('.dialog-success').show();
                var new_url=$(".yueBtn").attr("data-url");
                $(".yueBtn").attr("src",new_url);
                $(".dialog-success").find('.yq_num').text(person.me_invite_code);
            }else{
                $('.mask').show();
                $('.cont6-dialog').hide();
                $('.dialog').hide();
                $('.dialog-type').show();
            }
        } else {
            $('.mask').show();
            $('.cont6-dialog').hide();
            $('.dialog').hide();
            $('.dialog-information').show();
        }
    });
    $('.share').click(function () {
        if (person.isLogin) {
            $('.shareCode').find('.yaoNum').text(person.me_invite_code);
            $('.shareCode').find('.myCode').attr('src', person.invite_img);
            $('.mask').show();
            $('.cont6-dialog').hide();
            $('.dialog').hide();
            $('.dialog-yue').show();
        } else {
            $('.mask').show();
            $('.cont6-dialog').hide();
            $('.dialog').hide();
            $('.dialog-information').show();
        }
    })
    $('.login').click(function () {
        $('.mask').show();
        $('.cont6-dialog').hide();
        $('.dialog').hide();
        $('.dialog-information').show();
    })
    //点击更新图片验证码
    $("#captcha-img").click(function () {
        tupian();
    });
    $('.information-btn').click(function () {
        var phone = $('#phone').val();
        var img_code = $('#img-code').val();
        var code = $('#code').val();
        $('.err').css("visibility", "hidden");
        if (phone == '' || phone == undefined) {
            $('#phone-err').text("请输入手机号/邮箱/用户名");
            $('#phone-err').css("visibility", "visible");
            return;
        }
        else if (phone.length != 11) {
            $('#phone-err').text("请输入11位手机号");
            $('#phone-err').css("visibility", "visible");
            return;
        }
        else if (img_code == '' || img_code == undefined) {
            $('#img-code-err').css("visibility", "visible");
            return;
        }
        else if (code == '' || code == undefined) {
            $('#code-err').css("visibility", "visible");
            return;
        }
        $.post("/site/ajax-login.html", {
            "phone": phone,
            "yzm": code,
            "cms_csrf": person.cms_csrf
        }, function (data) {
            if (data.status == 0) {
                sendemail();
                $('.err').css("visibility", "hidden");
                isLogin();
                if(data.msg.is_yuyue==-1){
                    $('.dialog-information').hide();
                    $('.dialog-success').show();
                    var new_url=$(".yueBtn").attr("data-url");
                    $(".yueBtn").attr("src",new_url);
                    $(".dialog-success").find('.yq_num').text(data.msg.me_invite_code);
                    $(".yaoNum").text(data.msg.me_invite_code);
                }else{
                    // $('.mask').show();
                    $('.dialog-information').hide();
                    $('.dialog-type').show();
                }
            } else {
                tupian();
                alert(data.msg);
            }
        }, "json");
    })
    $('#getMarkBtn').click(function () {
        var phone = $('#phone').val();
        var img_code = $('#img-code').val();
        var code = $('#code').val();
        var yaoNum = $('#yaoNum').val();
        $('.err').css("visibility", "hidden");
        if (phone == '' || phone == undefined) {
            $('#phone-err').text("请输入手机号/邮箱/用户名");
            $('#phone-err').css("visibility", "visible");
            return;
        }
        else if (phone.length != 11) {
            $('#phone-err').text("请输入11位手机号");
            $('#phone-err').css("visibility", "visible");
            return;
        }
        else if (img_code == '' || img_code == undefined) {
            $('#img-code-err').css("visibility", "visible");
            return;
        }
        $.post("/site/ajax-login-verify.html", {
            "phone": phone,
            "captcha": img_code,
            "cms_csrf": person.cms_csrf
        }, function (data) {
            if (data.status == 0) {
                sendemail();
                $('.err').css("visibility", "hidden");
            } else {
                tupian();
                alert(data.msg);
            }
        }, "json");
    })
    $('.giftBox').on('mouseenter', function () {
        var parent = $(this).parent('.giftMask');
        $(parent).css({
            zIndex: "999"
        })
        $(parent).animate({
            opacity: 1
        })
    })
    $('.giftBox').on('mouseleave', function () {
        var parent = $(this).parent('.giftMask');
        $(parent).css({
            zIndex: "9"
        })
        $(parent).animate({
            opacity: 0
        })
    })
    $('.shaizi').click(function () {
        if(person.walk_num >= 21){
            alert('您已到达终点');
            return;
        }
        getNum();
    })
    $('.right-box').find('li').click(function () {
        var parent = $(this).parent();
        if($(this).attr('data-index') == 1){
            $("html,body").animate({
                scrollTop: 0
            }, 500);
        }else if($(this).attr('data-index') == 2){
            $("html,body").animate({
                scrollTop: 800
            }, 500);
        }else if($(this).attr('data-index') == 4){
            $("html,body").animate({
                scrollTop: 2700
            }, 500);
        }else{
            $("html,body").animate({
                scrollTop: 1800
            }, 500);
        }
    })
    $('.cont6-dialog').find('.close').click(function () {
        $(this).parent().hide();
        $('.mask').hide();
    })
    $('#cont6-box1').click(function () {
        $('.mask').show();
        $('.dialog').hide();
        $('.cont6-dialog').hide();
        $('#cont6-dialog1').show();
    })
    $('#cont6-box2').click(function () {
        $('.mask').show();
        $('.dialog').hide();
        $('.cont6-dialog').hide();
        $('#cont6-dialog2').show();
    })
    $('#cont6-box3').click(function () {
        $('.mask').show();
        $('.dialog').hide();
        $('.cont6-dialog').hide();
        $('#cont6-dialog3').show();
    })
    $('#cont6-box4').click(function () {
        $('.mask').show();
        $('.dialog').hide();
        $('.cont6-dialog').hide();
        $('#cont6-dialog4').show();
    })
    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        if (scroll < 600) {
            $('.right-box').find('li').removeClass('active');
            $('.right-box').find('li:nth-child(1)').addClass('active');
        }
        else if (scroll >= 1800 && scroll <= 2400) {
            $('.right-box').find('li').removeClass('active');
            $('.right-box').find('li:nth-child(3)').addClass('active');
        }
        else if (scroll >= 2400) {
            $('.right-box').find('li').removeClass('active');
            $('.right-box').find('li:nth-child(4)').addClass('active');
        }
        else {
            $('.right-box').find('li').removeClass('active');
            $('.right-box').find('li:nth-child(2)').addClass('active');
        }

        if (scroll > 0) {
            $(".cont1").css({
                top: "0",
                position: 'fixed',
                zIndex: "999"
            });
            $("#Hero-bar").css({
                zIndex: "98"
            });
        } else {
            $(".cont1").css({
                position: 'relative',
                zIndex: "9"
            });
            $("#Hero-bar").css({
                zIndex: "9999999"
            });
        }
    })
})