    var  h5_wx=$(".h5_wx").html();
    var  h5_data=$(".h5_data").html();
    var wj_url="/ca/s1/get-gift.html?h5data="+h5_data;//获取礼包
    var yzm_url="/commonMethod/ajax-yuyue-verify.html?h5data="+h5_data;//手机验证码
    var srf = $('meta[name="csrf-token"]').attr('content');
    var lb_code="";
      //倒计时
      function page_djs(ele, callback) {
        var time = 60;
        if(ele) {
          ele.html("重新发送(60s)");
        }
        djs_timer = setInterval(function() {
          time--;
          ele.html("重新发送("+(time <= 0 ? 0 : time) + "s)");
          if(time == 0) {
            clearInterval(djs_timer);
            ele.html("获取验证码");
            if(callback) {
              callback();
            }
          }
        }, 1000);
      }
      //图片验证码刷新
      var imgMarkIndex = 1;
      //刷新图片验证码
      function load_captcha(){
          imgMarkIndex++;
          var imgUrl = "/commonMethod/captcha.html?refresh=" + imgMarkIndex;
          $.get(imgUrl, {}, function(data) {
            $(".co_codebtn2 img").attr("src", data.url);
          }, 'json');
      }
      //控制弹窗滚动
function stop() {
    $("html,body").css({
      "overflow": "hidden",
      "width": "100%",
      "height": "100%"
    });
  };

function move() {
    $("html,body").css({
      "overflow": "visible",
      "width": "100%",
      "height": "auto"
    });
  };

      //下载
   function down() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var href="";
    if(isAndroid) {
        href = $('.cysw').attr('href',"http://downurl.yingxiong.com/android/pc_qmqz.html")
        // location.href = href;
    }
    if(isIOS) {
       href = $('.cysw').attr('href',"http://downurl.yingxiong.com/ios/pc_qmqz.html")
        // location.href = href;
    }
  }
    $(function() {
      $(".close").click(function(){
        $(".wrap").fadeOut(300);
        move();
      })
      down();
      //点击刷新验证码
      $(".co_codebtn2").click(function(){
        load_captcha();
        $(this).find("i").hide();
        $(this).find("img").show();
      })
        // //获取验证码
      $(".co_codebtn1").click(function(){
        var phone =$(".co_username").val();
        var captcha = $(".code1").val();
        if(phone == "" || phone == undefined) {
          alert("手机号码不能为空哦");
          return;
        } else if(phone.length != 11) {
          alert("手机号码不正确哦");
          return;
        }
        if(captcha == "" || captcha == undefined) {
          alert("图片验证码不能为空哦");
          return;
        }
        $.post(yzm_url, {
          "phone":phone,
          'type': "ios",
          "captcha": captcha,
          "cms_csrf": srf,
          "smsContent":'您正在进行《全民枪战2》超值独家福利领取'
        }, function(data) {
          if(data.status == 0) {
            $(".co_codebtn1").css("pointer-events", "none");
            page_djs($(".co_codebtn1"), function() {
              $(".co_codebtn1").css("pointer-events", "auto");
            });
          }else{
            alert(data.msg);
            load_captcha();
          }
        },'json');
      })
        //登录
      $(".btn_add").click(function(){
        var phone =$(".co_username").val();
        var yzm = $(".code2").val();
        if(phone == "" || phone == undefined) {
          alert("手机号码不能为空哦");
          return;
        } else if(phone.length != 11) {
          alert("手机号码不正确哦");
          return;
        }
        if(yzm == "" || yzm == undefined) {
          alert("验证码不能为空哦");
          return;
        }
        $.ajax({
            'url':wj_url,
            'data':{"phone":phone,"yzm":yzm,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                   if(data.isRepeat == 0){
                      $(".wrap").fadeIn(300);
                      stop();
                      $(".code_num").html(data.msg);
                      $(".wrap .info").html("恭喜你，获得CA独家礼包码");
                   }else if(data.isRepeat == 1){
                      $(".wrap").fadeIn(300);
                      $(".wrap .info").html("您已经获得CA独家礼包码");
                      stop();
                      $(".code_num").html(data.msg);
                   }else{
                      alert(data.msg);
                   }
                }else{
                  alert(data.msg);
                   load_captcha();
                   move();
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
      })
       //复制
        new Clipboard('.copy');
        $(".copy").click(function() {
        alert("已复制");
        });

    });
      