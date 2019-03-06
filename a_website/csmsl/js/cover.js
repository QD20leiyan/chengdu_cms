$(function (){
    var mySwiper = new Swiper ('.left_banner', {
//				autoplay:2000,
//			    loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    });
    var mySwiper1 = new Swiper ('.tab_pic', {
        autoplay:2000,
        loop: true,
        effect : 'fade',
        fade: {
            crossFade: true,
        },
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // 如果需要分页器
        pagination: '.swiper-pagination1',
        paginationType : 'fraction',
        paginationFractionRender: function (swiper, currentClassName, totalClassName) {
            return '<span class="' + currentClassName + '"></span>' +
                ' / ' +
                '<span class="' + totalClassName + '"></span>';
        }
    });
    var clipboard_1 = new Clipboard('#copyCode');
    var clipboard_2 = new Clipboard('#copyLink');
    var countdown = 60;
    var person={
        login:false,
        type:'ios',
        csrf:$("meta[name='csrf-token']").attr("content")
    }
    //微信二维码
    $(".right_nav a:nth-child(1)").hover(function (){
        $(".t_erweima").stop().fadeIn();
    },function (){
        $(".t_erweima").stop().fadeOut(300);
    });
    //倒计时
    function sendemail() {
        var obj = $(".g_code");
        settime(obj);
    }

    function settime(obj) { //发送验证码倒计时
        if(countdown == 0) {
            obj.attr('disabled', false);
            obj.val("免费获取验证码");
            countdown = 60;
            return;
        } else {
            obj.attr('disabled', true);
            obj.val("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
            settime(obj);
        }, 1000)
    }
    //点击图形验证码
    $(".captcha").click(function (){
        tupian();
    });
    //点击发送验证码
    $(".g_code").click(function (){
        var phone = $(".phone").val();
        var t_yzm = $(".t_yzm").val();
        if(phone == "" || phone == undefined){
            alert("请输入正确的手机号");
            return;
        }
        if(t_yzm == "" || t_yzm == undefined){
            alert("请输入正确的图形验证码");
            return;
        }
        $.post("/site/ajax-login-verify.html",{
            "phone": phone,
            "captcha":t_yzm,
            "cms_csrf": person.csrf
        },function (data){
            if(data.status == 0){
                sendemail();
            } else {
                alert(data.msg);
                tupian();
            }
        },"json");
    });
    //点击登录
    $(".yxyy").click(function (){
        var phone = $(".phone").val();
        var yzm = $(".yzm").val();
        if(phone == "" || phone == undefined){
            alert("请输入正确的手机号");
            return;
        }
        if(yzm == "" || yzm == undefined){
            alert("请输入验证码");
            return;
        }
        $.post("/site/ajax-login.html",{
            "phone": phone,
            "yzm":yzm,
            "cms_csrf": person.csrf
        },function (data){
            if(data.status == 0){
                initPerson(data.msg);
                if(person.is_yuyue == 0){
                    $('.mask').show();
                    $('.dialogBox').hide();
                    $('#type').show();
                }else{
                    $('.mask').hide();
                    $('.dialogBox').hide();
                }
            } else {
                alert(data.msg);
                tupian();
            }
        },"json");
    });
    //ajaxInit();
    //setInterval(ajaxInit, 30000);
    //初始化用户
    function initPerson(data) {
        person.login = true;
        person.phone = data.phone;//预约的手机号
        person.invite_num = data.invite_num;//表示已经邀请的人数
        person.invite_count = data.invite_count;//表示已经使用的次数
        person.today_draw_count = data.today_draw_count;//今日已经使用的次数
        person.lottery_node_1 = data.lottery_node_1;//表示1号奖池是否开启过
        person.count = data.count;//剩余机会
        person.me_invite_code = data.me_invite_code;//自己的邀请码
        person.name = data.name;//姓名
        person.address = data.address;//地址
        person.tel = data.tel;//收件人电话
        person.code = data.code;//收件人邮编
        person.is_yuyue = data.is_yuyue;//是否预约；0：未预约；1：已经预约
        person.share_url = data.share_url;//分享地址
        count_num(data.invite_num,data.invite_count,data.lottery_node_1);
        $(".login").hide();
        $(".phone").val("");
        $(".t_yzm").val("");
        $(".yzm").val("");
        $('.userInfo').find('p:nth-child(1)').hide();
        $('#userPhone').text(person.phone);
        if(!person.invite_num || person.invite_num == 'null'){
            person.invite_num = 0;
        }
        $('#userFriends').text(person.invite_num);
        $('#userChance').text(person.count);
        $('.userInfo').find('p:nth-child(2)').show();
        $('#my_invite').text(person.me_invite_code);
        $('#my_share_url').text(person.share_url);
        if(person.name && person.name.length > 0){
            $('#priseBox').find('.addressBtn').eq(0).hide();
            $('#priseBox').find('.editBtn').show();
            $('#getPriseBox').find('.addressBtn').eq(0).hide();
            $('#getPriseBox').find('.editBtn').show();
            $('#address').find('.address_name').val(person.name);
            $('#address').find('.address_num').val(person.code);
            $('#address').find('.address_phone').val(person.tel);
            $('#address').find('.address_info').text(person.address);
        }else{
            $('#priseBox').find('.editBtn').hide();
            $('#priseBox').find('.addressBtn').eq(0).show();
            $('#getPriseBox').find('.editBtn').hide();
            $('#getPriseBox').find('.addressBtn').eq(0).show();
        }
        //if(person.invite_num >= 1 && person.count > 0 && (person.lottery_node_1 == 0)){
        //    $('.giftBox').find('li:nth-child(1)').addClass('active');
        //    $('.giftBox').find('li:nth-child(1)').find('#userChance2').text(1);
        //}else{
        //    $('.giftBox').find('li:nth-child(1)').removeClass('active');
        //    $('.giftBox').find('li:nth-child(1)').find('#userChance2').text(0);
        //}
        //if(person.invite_num >= 3 && person.count > 0){
        //    var help;
        //    if(person.invite_num >=5){
        //        help = 2;
        //    }else{
        //        help = person.invite_num - 3;
        //    }
        //    $('.giftBox').find('li:nth-child(2)').addClass('active');
        //    $('.giftBox').find('li:nth-child(2)').find('#userChance3').text(person.count);
        //    $('.giftBox').find('li:nth-child(2)').find('.friendsHelp').text(help);
        //}else{
        //    var help1;
        //    if(person.invite_num >=5){
        //        help1 = 2;
        //    }else if(person.invite_num <= 3){
        //        help1 = 0;
        //    }
        //    else{
        //        help1 = person.invite_num - 3;
        //    }
        //    $('.giftBox').find('li:nth-child(2)').removeClass('active');
        //    $('.giftBox').find('li:nth-child(2)').find('#userChance3').text(person.count);
        //    $('.giftBox').find('li:nth-child(2)').find('.friendsHelp').text(help1);
        //}
        //if(person.invite_num >= 5 && person.count > 0){
        //    var help2;
        //    help2 = person.invite_num - 5;
        //    $('.giftBox').find('li:nth-child(3)').addClass('active');
        //    $('.giftBox').find('li:nth-child(3)').find('#userChance4').text(person.count);
        //    $('.giftBox').find('li:nth-child(3)').find('.friendsHelp').text(help2);
        //}else{
        //    var help3;
        //    if(person.invite_num >= 5){
        //        help3 = person.invite_num - 5;
        //    }else{
        //        help3 = 0;
        //    }
        //    $('.giftBox').find('li:nth-child(3)').removeClass('active');
        //    $('.giftBox').find('li:nth-child(3)').find('#userChance4').text(person.count);
        //    $('.giftBox').find('li:nth-child(3)').find('.friendsHelp').text(help3);
        //}
    }
    //拉取用户信息
    function ajaxInit() {
        $.get("/site/ajax-get-num.html", function(data) {
            var str = String(data.msg);
            var newStr = "";
            var count = 0;
            if(str.indexOf(".") == -1) {
                for(var i = str.length - 1; i >= 0; i--) {
                    if(count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    } else {
                        newStr = str.charAt(i) + newStr;
                    }
                    count++;
                }
                str = newStr; //自动补小数点后两位		   
            } else {
                for(var i = str.indexOf(".") - 1; i >= 0; i--) {
                    if(count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    } else {
                        newStr = str.charAt(i) + newStr; //逐个字符相接起来					 
                    }
                    count++;
                }
                str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            }
            $(".text_number").text(str);
            jindu(parseInt(data.msg));
        }, "json");
    };
    //验证是否登录
    function userLogin() {
        $.get("/site/ajax-get-user.html", {}, function(data) {
            if(data.status == 0){
                initPerson(data);
            }
        }, 'json');
    }
    userLogin();
    //进度
    function jindu(temp){
        var percent;
        if(temp<50000){
            percent = (temp / 6800).toFixed(2) + '%';
        }
        if(temp >= 50000){
            percent = (((temp - 50000) / 50000).toFixed(2) * 17 + 10) + '%';
            $('.item_word').find('li:nth-child(1)').addClass('active');
        }if(temp >= 100000){
            percent = (((temp - 100000) / 80000).toFixed(2) * 21 + 27) + '%';
            $('.item_word').find('li:nth-child(2)').addClass('active');
        }if(temp >= 180000){
            percent = (((temp - 180000) / 200000).toFixed(2) * 22 + 48) + '%';
            $('.item_word').find('li:nth-child(3)').addClass('active');
        }if(temp >= 380000){
            percent = (((temp - 380000) / 300000).toFixed(2) * 20 + 70) + '%';
            $('.item_word').find('li:nth-child(4)').addClass('active');
        }if(temp >= 680000){
            percent = 100 + '%';
            $('.item_word').find('li:nth-child(5)').addClass('active');
        }
        $('.line').find('img').css({
            width: percent
        })
    }
    //图片验证码
    function tupian() {
        $.get("/site/captcha.html?refresh=1", {}, function(data) {
            $(".captcha img").attr("src", data.url);
        }, 'json');
    }
    //中奖名单滚动效果
    function autoScroll(obj) {
        $(obj).animate({
            marginTop: "-71px"
        }, 1000, function() {
            $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
        });
    }
    //所有用户中奖纪录
    function allUserPrise() {
        var priseWord = $('.priseWord');
        var prise = '';
        $(priseWord).html('');
        $.get("/site/ajax-lottery-log.html", {}, function(data) {
            // var length = (data.data.length > 5)?5:data.data.length;
            for(var i=0;i<data.data.length;i++){
                prise += "<li>恭喜 <span>"+ data.data[i].phone +"</span> 获得 <span>"+ data.data[i].name +"</span></li>";
            }
            priseWord.append(prise);
            if(data.data.length > 5){
                setInterval(function () {
                    autoScroll(".priseWord");
                }, 1500);
            }
        }, 'json');
    }
    allUserPrise();

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
        var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
        if (result != null) {
            return decodeURIComponent(result[2]);
        } else {
            return null;
        }
    }
    //用户中奖纪录
    function userPrise() {
        var tbody = $('.table_container').find('table').find('tbody');
        var prise = '';
        $(tbody).html('');
        $.get("/site/ajax-lottery-me-log.html", {}, function(data) {
            // if(data.msg.length > 3){
            //     $('.table_container').css({
            //         height:'181px'
            //     });
            // }
            person.mePriseLength = data.msg.length;
            if(!person.mePriseLength || person.mePriseLength <= 0){
                alert('您还没有中奖纪录！');
                return 'Dialog';
            }
            for(var i=0;i<data.msg.length;i++){
                prise += "<tr>\n" +
                    "<td>"+ data.msg[i].name +"</td>\n" +
                    "<td>"+ data.msg[i].code +"</td>\n" +
                    "<td><span class=\"tableCopy\">复制</span></td>\n" +
                    "</tr>";
            }
            tbody.append(prise);
            var copyBtn = $('.tableCopy');
            for(var i=0;i<copyBtn.length;i++){
                var thisBtn = copyBtn[i];
                var copyBtnId = 'copyBtn'+i;
                $(thisBtn).attr('id',copyBtnId);
                var copyText = $(thisBtn).parent('td').prev();
                var copyTextId = 'copyText'+i;
                $(copyText).attr('id',copyTextId);
                $(thisBtn).attr('data-clipboard-target','#'+copyTextId);
                $(thisBtn).attr('data-clipboard-action','copy');
                var id = '#'+copyBtnId;
                var name = 'clipboard' + copyBtnId;
                name = new Clipboard(id);
            }
        }, 'json');
    }
    function initOutPerson(){
        person.login = false;
        person.phone = '';
        person.invite_num = 0;
        person.invite_count = 0;//表示已经使用的次数
        person.today_draw_count = 0;//今日已经使用的次数
        person.count = 0;
        person.me_invite_code = '';
        person.name = '';
        person.address = '';
        person.tel = '';
        person.code = '';
        person.is_yuyue = 0;//是否预约；0：未预约；1：已经预约
        person.share_url = '';
        $('.userInfo').find('p:nth-child(2)').hide();
        $('#userPhone').text('');
        $('#userFriends').text('');
        $('#userChance').text('');
        $('.userInfo').find('p:nth-child(1)').show();
        $('#my_invite').text('');
        $('#my_share_url').text('');
        $('.giftBox').find('li:nth-child(1)').find('#userChance2').text(0);
        $('.giftBox').find('li:nth-child(2)').find('#userChance3').text(0);
        $('.giftBox').find('li:nth-child(2)').find('.friendsHelp').text(0);
        $('.giftBox').find('li:nth-child(3)').find('#userChance4').text(0);
        $('.giftBox').find('li:nth-child(3)').find('.friendsHelp').text(0);
        $('.giftBox').find('li:nth-child(1)').removeClass('active');
        $('.giftBox').find('li:nth-child(2)').removeClass('active');
        $('.giftBox').find('li:nth-child(3)').removeClass('active');
    }
    //注销
    $('#logout').click(function () {
        $.get("/site/ajax-login-out.html", {}, function(data) {
            if(data.status == 0){
                initOutPerson();
                alert('注销成功');
            }else{
                alert(data.msg);
            }
        }, 'json');
    })
    //上方预约按钮
    //$('#yuyue_btn').click(function () {
    //    $('.mask').show();
    //    $('.dialogBox').hide();
    //    $('#dialog_yuyue').show();
    //})
    //下方登录按钮
    $('#login_btn').click(function () {
        if(person.is_yuyue == 1){
            $('#success').find('.r_main').find('p').text('');
            $('#success').find('.r_main').find('h4').text('您已预约成功，请勿重复预约');
            $('.mask').show();
            $('.dialogBox').hide();
            $('#success').show();
            return;
        }
        if(person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#type').show();
            return;
        }
        $('.mask').show();
        $('.dialogBox').hide();
        $('#login').show();
    })
    //预约游戏弹窗中的登录按钮
    $('.login_btn2').click(function () {
        if(person.is_yuyue == 1){
            $('#success').find('.r_main').find('p').text('');
            $('#success').find('.r_main').find('h4').text('您已预约成功，请勿重复预约');
            $('.mask').show();
            $('.dialogBox').hide();
            $('#success').show();
            return;
        }
        if(person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#type').show();
            return;
        }
        $('.mask').show();
        $('.dialogBox').hide();
        $('#login').show();
    })
    //邀请好友弹窗
    $('#getMore').click(function () {
        if(!person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#login').show();
            return;
        }
        $('#getFriends').find('.loginTitle').text('邀请好友');
        $('#getFriends').find('.bigDialog').find('p').eq(0).text('分享您的专属链接，发送给好友，获得更多参加活动机会！');
        $('.mask').show();
        $('.dialogBox').hide();
        $('#getFriends').show();
    })
    //预约信息弹窗
    $('.type_save').click(function () {
        if(!person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#login').show();
            return;
        }
        if(person.is_yuyue == 1){
            $('#success').find('.r_main').find('p').text('');
            $('#success').find('.r_main').find('h4').text('您已预约成功，请勿重复预约');
            $('.mask').show();
            $('.dialogBox').hide();
            $('#success').show();
            return;
        }
        var type = $('#type').find('.r_type').find('.active').attr('data-date');
        var invite_code = getQueryString('invite_code');
        var params = {
            'type':type,
            'invite_code':invite_code,
            "cms_csrf": person.csrf
        }
        $.post("/site/ajax-yuyue.html", params, function(data) {
            if(data.status == 0){
                person.is_yuyue = 1;
                $('#success').find('.r_main').find('p').text('恭喜您');
                $('#success').find('.r_main').find('h4').text('预约成功');
                $('.mask').show();
                $('.dialogBox').hide();
                $('#success').show();
            }else{
                alert(data.msg);
            }
        }, 'json');
    })
    //预约成功弹窗
    $('.successBtn').click(function () {
        $('.dialogBox').hide();
        $('.mask').hide();
    })
    //打开我的奖品弹窗
    $('#giftBtn').click(function () {
        if(!person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#login').show();
            return;
        }
        var user = userPrise();
        if(user == 'Dialog'){
            return;
        }
        $('.mask').show();
        $('.dialogBox').hide();
        $('#priseBox').show();
    })
    //打开地址弹窗
    $('.addressBtn').click(function () {
        if(!person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#login').show();
            return;
        }
        $('.mask').show();
        $('.dialogBox').hide();
        $('#address').show();
    })
    //开奖
    $('.open').click(function () {
        if(!person.login){
            $('.mask').show();
            $('.dialogBox').hide();
            $('#login').show();
            return;
        }
        index = $(this).parent().attr('data-index');
        if(index==1&&person.lottery_node_1==1){
            alert("该奖池只能抽一次哦");
            return;
        }
        if(person.invite_count >= 400){
            $('#success').find('.r_main').find('p').text('');
            $('#success').find('.r_main').find('h4').text('该账号抽奖次数已达到总上限');
            $('.mask').show();
            $('.dialogBox').hide();
            $('#success').show();
            return;
        }
        if(person.today_draw_count >= 10){
            $('#success').find('.r_main').find('p').text('');
            $('#success').find('.r_main').find('h4').text('您已达到今日开奖上限，请明日再来');
            $('.mask').show();
            $('.dialogBox').hide();
            $('#success').show();
            return;
        }else{
            if(person.count <= 0){
                $('#getFriends').find('.loginTitle').text('糟糕了！');
                $('#getFriends').find('.bigDialog').find('p').eq(0).text('您还没有抽奖机会 ，赶快邀请更多好友参与吧');
                $('.mask').show();
                $('.dialogBox').hide();
                $('#getFriends').show();
                return;
            }
            var params = {
                "node":index,
                "cms_csrf": person.csrf
            }
            $.post("/site/ajax-lottery.html", params, function(data) {
                if(data.status == 0){
                    $('#userChance').text(data.user.invite_num-data.user.invite_count);
                    count_num(data.user.invite_num,data.user.invite_count,data.user.lottery_node_1);
                    person.invite_num = data.user.invite_num;
                    person.invite_count = data.user.invite_count;
                    person.lottery_node_1 = data.user.lottery_node_1;
                    $('#getPriseBox').find('.myGift').show();
                    $('#getPriseBox').find('.duiCode').show();
                    $('.thanks').hide();
                    $('.myGift').find('span').text(data.gift_name);
                    $('#copyCodeText').text(data.gift_code);
                    $(".duiCode").css({"opacity":"1"});
                    if(data.id == 0){
                        $('#getPriseBox').find('.myGift').hide();
                        $('#getPriseBox').find('.duiCode').hide();
                        $('.thanks').show();
                    }
                    if(data.id == 25){
                        $('.myGift').attr('class','myGift gift8');
                    }
                    if(data.id == 26){
                        $('.myGift').attr('class','myGift gift5');
                    }
                    if(data.id == 27){
                        $('.myGift').attr('class','myGift gift7');
                    }
                    if(data.id == 28){
                        $('.myGift').attr('class','myGift gift8');
                    }
                    if(data.id == 29){
                        $('.myGift').attr('class','myGift gift8');
                    }
                    if(data.id == 30){
                        $('.myGift').attr('class','myGift gift9');
                    }
                    if(data.id == 31){
                        $('.myGift').attr('class','myGift gift7');
                    }
                    if(data.id == 32){
                        $('.myGift').attr('class','myGift gift5');
                    }
                    if(data.id == 33){
                        $('.myGift').attr('class','myGift gift1');
                    }
                    if(data.id == 34){
                        $('.myGift').attr('class','myGift gift7');
                    }
                    if(data.id == 35){
                        $('.myGift').attr('class','myGift gift5');
                    }
                    if(data.id == 36){
                        $('.myGift').attr('class','myGift gift2');
                    }
                    if(data.id == 37){
                        $(".duiCode").css({"opacity":"0"});
                        $('.myGift').attr('class','myGift gift12');
                    }
                    if(data.id == 38){
                        $(".duiCode").css({"opacity":"0"});
                        $('.myGift').attr('class','myGift gift10');
                    }
                    if(data.id == 40){
                        $('.myGift').attr('class','myGift gift6');
                    }
                    if(data.id == 41){
                        $('.myGift').attr('class','myGift gift5');
                    }
                    if(data.id == 42){
                        $('.myGift').attr('class','myGift gift4');
                    }
                    if(data.id == 43){
                        $('.myGift').attr('class','myGift gift6');
                    }
                    if(data.id == 44){
                        $('.myGift').attr('class','myGift gift5');
                    }
                    if(data.id == 45){
                        $('.myGift').attr('class','myGift gift4');
                    }
                    if(data.id == 46){
                        $('.myGift').attr('class','myGift gift6');
                    }
                    if(data.id == 47){
                        $('.myGift').attr('class','myGift gift5');
                    }
                    if(data.id == 48){
                        $('.myGift').attr('class','myGift gift4');
                    }
                    if(data.id == 49){
                        $(".duiCode").css({"opacity":"0"});
                        $('.myGift').attr('class','myGift gift11');
                    }
                    if(data.id == 50){
                        $(".duiCode").css({"opacity":"0"});
                        $('.myGift').attr('class','myGift gift648');
                    }
                    allUserPrise();
                    $('.mask').show();
                    $('.dialogBox').hide();
                    $('#getPriseBox').show();
                    userLogin();
                }else if(data.status == 2){
                    initOutPerson();
                }
                else{
                    alert(data.msg);
                }
            }, 'json');
        }
    })
    //地址信息弹窗
    $('.address_btn').click(function () {
        var nameV = $('.address_name').val();
        var numV = $('.address_num').val();
        var phoneV = $('.address_phone').val();
        var infoV = $('.address_info').val();
        if(!nameV || nameV.length <= 0 || !numV || numV.length <= 0 || !phoneV || phoneV.length <= 0 || !infoV || infoV.length <= 0 ){
            alert('请输入完整信息');
            return;
        }
        $.post("/site/ajax-save-address.html",{
            "name": nameV,
            "code":numV,
            "address":infoV,
            "tel":phoneV,
            "cms_csrf": person.csrf
        },function (data){
            if(data.status == 0){
                alert('收货地址保存成功');
                $('.mask').hide();
                $('.dialogBox').hide();
            } else {
                alert(data.msg);
            }
        },"json");
    })
    $(".r_type>div").on("click", function (){
        $(this).addClass("active").siblings().removeClass("active");
    });
    $('.dialogBox').find('.close').click(function () {
        $('.dialogBox').hide();
        $('.mask').hide();
    });

    //奖池机会援助计算
    function count_num(invite_num,invite_count,lottery_node_1){
        //1奖池
        if(invite_num>=1){
            if(lottery_node_1==1){
                //1奖池已开启
                $("#userChance2").text("0");
                $(".ward1").removeClass("active");
            }else{
                //1奖池未开启
                $("#userChance2").text("1");
                $(".ward1").addClass("active");
            }

            // invite_num-1  未抽时二三奖池可用次数
            // (invite_count-(lottery_node_1==1?1:0))  二三奖池已用次数
            var last_count=invite_num-1-(invite_count-(lottery_node_1==1?1:0));

            //2奖池
            if(invite_num>=3){
                $("#userChance3").text(last_count);
                if(last_count>0){
                    $(".ward2").addClass("active");
                }else{
                    $(".ward2").removeClass("active");
                }
            }else{
                $("#userChance3").text("0");
                $(".ward2").removeClass("active");
            }

            //3奖池
            if(invite_num>=5){
                $("#userChance4").text(last_count);
                if(last_count>0){
                    $(".ward3").addClass("active");
                }else{
                    $(".ward3").removeClass("active");
                }
            }else{
                $("#userChance4").text("0");
                $(".ward3").removeClass("active");
            }

            //if(invite_num>1){
            //    $(".ward1 .help").text("1");
            //}else{
            //    $(".ward1 .help").text("0");
            //}

            if(invite_num>3){
                $(".ward2 .friendsHelp").text("1");
            }else{
                $(".ward2 .friendsHelp").text("0");
            }

            if(invite_num>5){
                $(".ward3 .friendsHelp").text(invite_num-5);
            }else{
                $(".ward3 .friendsHelp").text("0");
            }

        }
    }
});