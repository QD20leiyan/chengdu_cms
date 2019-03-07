var all_url='/activity/ajax-get-gift'; //获取所有用户中奖记录
var me_url='/activity/ajax-get-my-gift';//获取当前用户中奖记录
var zhaohuan_url='/activity/ajax-get-call';//我要召唤
var login_url='/activity/ajax-get-user';//判断用户是否登录
var verify_url='/site/ajax-activity-login-verify';//登录发送验证码
var login_url1='/activity/ajax-activity-login';//登录
var lottery_url='/activity/ajax-activity';//抽奖
var fanpal_url='/activity/ajax-activity-draw';//翻牌
var add_url='/activity/ajax-address';//保存收货地址
var share_url='/activity/ajax-share-add';//分享
var srf = $('meta[name="csrf-token"]').attr('content');
var is_save = '';
var base = {
  isLogin: false,
  is_addres:0,
  is_activity:0,
  luckyNumber: 0,
  click_num:0
};
//jiaThis配置
var jiathis_config = {
  url: "",
  title: "全民枪战2",
  summary: "",
  pic: "",
}
//图片验证码刷新
var imgMarkIndex=1;
function load_captcha(){
    imgMarkIndex++;
    var imgUrl = "/site/captcha?refresh=" + imgMarkIndex;
    $.get(imgUrl, {}, function(data) {
      $("#getMarkBtn1 img").attr("src", data.url);
    }, 'json');
}
//图片验证码刷新
$("#getMarkBtn1").click(function(){
  load_captcha();
});

//倒计时
function page_djs(ele, callback) {
  var time = 60;
  if(ele) {
    ele.html("重新发送(60s)");
  }
  djs_timer = setInterval(function() {
    time--;
    ele.html("重新发送("+(time<=0?0:time) + "s)");
    if(time == 0) {
      clearInterval(djs_timer);
      ele.html("获取验证码");
      if(callback) {
        callback();
      }
    }
  }, 1000);
}
//错误提示显示
function showErr(index, text) {
  $(".err").eq(index).show().html(text);
}
//错误提示隐藏
function hideErr(index) {
  $(".err").eq(index).hide();
}
//显示弹窗  
function showTc(index, obj) {
    var self = $(".d_tc > div").eq(index);
    $(".d_tc > div").hide();
    self.show();
    if (index == 6) {
      $(".d_tc7 .tc7_info").html(obj.html);
    }
    $(".d_tc").show();
  }
  //中奖名单滚动效果
    function autoScroll(obj) {
      $(obj).animate({
        marginTop: "-68px"
      }, 1000, function() {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
      });
    }
    function init(){
       $.ajax({
        'url':login_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
          if(data.status==0){
              is_save = data.msg.is_save;
              base.isLogin = true;
              jiathis_config.url =data.msg.share_url;
              base.luckyNumber =data.msg.activity_count;
              base.priceNumber=data.msg.is_activity;
              var n_number = parseInt(data.msg.lottery_num);
            $(".login_yl").hide();
            $(".lg_suc").show();
            $('.lg_suc').html(data.msg.phone);
            $(".sh_yu").html(data.msg.activity_count);
            $("#my_invite").html(data.msg.me_invite_code);
            $(".getFriends_link .my_url").text(data.msg.invite_url);
            $('.yq_num').html(data.msg.me_invite_code);
            $(".help_friend").addClass("active");
            $(".co_tips_copybtn").attr("data-clipboard-text",data.msg.invite_url);
            if(data.msg.is_save != ""){
              var index = parseInt(data.msg.is_save)-1;
              $(".fan_pal li").eq(index).addClass("active");
              $(".fan_pal li").eq(index).addClass("on");
            }
            if(data.msg.is_address == 1){
              $(".address_name").val(data.msg.name);
              $(".address_num").val(data.msg.code);
              $(".address_phone").val(data.msg.tel);
              $(".address_inf").html(data.msg.address);
              $(".addBtn_sure").hide();
              $(".addBtn_change").show();
            } else if(data.msg.is_address == 0){
              $(".sure_add").addClass("active");
              $(".address_name").val(data.msg.name);
              $(".address_num").val(data.msg.code);
              $(".address_phone").val(data.msg.tel);
              $(".address_inf").html(data.msg.address);
              $(".addBtn_sure").show();
              $(".addBtn_change").hide();
            }
            if(data.msg.is_activity == 1){
              $(".sy_cshu").show();
              $(".start_gift").addClass("on");
              $(".start_gift").removeClass("active");
              $(".sy_cshu .count_all").html(data.msg.lottery_num);
            }else if(data.msg.is_activity == 0){
              $(".sy_cshu").hide();
              $(".start_gift").removeClass("active");
              $(".start_gift").removeClass("on");
              $(".count_all").html(data.msg.lottery_num);
            }
            if(n_number == 0 && data.msg.is_activity == 1){
              $(".sy_cshu").hide();
              $(".start_gift").removeClass("on");
              $(".start_gift").addClass("active");
              $(".count_all").html(data.msg.lottery_num);
            } else if(n_number != 0 && data.msg.is_activity == 1){
              $(".sy_cshu").show();
              $(".start_gift").addClass("on");
              $(".start_gift").removeClass("active");
              $(".sy_cshu .count_all").html(data.msg.lottery_num);
            }
            $.each(data.msg.activity_str, function(i,n) {
              $(".fan_pal li").each(function (o,p){
                // if(o+1 == n) {
                //   $(this).addClass("active");
                // }
                $(".fan_pal li").eq(n-1).addClass("active");
              });
            });
          }else{
            base.isLogin = false;
          }
        }
    });
    }
//初始化
$(function(){
  //判断用户是否登录
    $.ajax({
        'url':login_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
          if(data.status==0){
              is_save = data.msg.is_save;
              base.isLogin = true;
              jiathis_config.url =data.msg.share_url;
              base.luckyNumber =data.msg.activity_count;
              base.priceNumber=data.msg.is_activity;
              var n_number = parseInt(data.msg.lottery_num);
            $(".login_yl").hide();
            $(".lg_suc").show();
            $('.lg_suc').html(data.msg.phone);
            $(".sh_yu").html(data.msg.activity_count);
            $("#my_invite").html(data.msg.me_invite_code);
            $(".getFriends_link .my_url").text(data.msg.invite_url);
            $('.yq_num').html(data.msg.me_invite_code);
            $(".help_friend").addClass("active");
            $(".co_tips_copybtn").attr("data-clipboard-text",data.msg.invite_url);
            if(data.msg.is_save != ""){
              var index = parseInt(data.msg.is_save)-1;
              $(".fan_pal li").eq(index).addClass("active");
              $(".fan_pal li").eq(index).addClass("on");
            }
            if(data.msg.is_address == 1){
              $(".address_name").val(data.msg.name);
              $(".address_num").val(data.msg.code);
              $(".address_phone").val(data.msg.tel);
              $(".address_inf").html(data.msg.address);
              $(".addBtn_sure").hide();
              $(".addBtn_change").show();
            } else if(data.msg.is_address == 0){
              $(".sure_add").addClass("active");
              $(".address_name").val(data.msg.name);
              $(".address_num").val(data.msg.code);
              $(".address_phone").val(data.msg.tel);
              $(".address_inf").html(data.msg.address);
              $(".addBtn_sure").show();
              $(".addBtn_change").hide();
            }
            if(data.msg.is_activity == 1){
              $(".sy_cshu").show();
              $(".start_gift").addClass("on");
              $(".start_gift").removeClass("active");
              $(".sy_cshu .count_all").html(data.msg.lottery_num);
            }else if(data.msg.is_activity == 0){
              $(".sy_cshu").hide();
              $(".start_gift").removeClass("active");
              $(".start_gift").removeClass("on");
              $(".count_all").html(data.msg.lottery_num);
            }
            if(n_number == 0 && data.msg.is_activity == 1){
              $(".sy_cshu").hide();
              $(".start_gift").removeClass("on");
              $(".start_gift").addClass("active");
              $(".count_all").html(data.msg.lottery_num);
            } else if(n_number != 0 && data.msg.is_activity == 1){
              $(".sy_cshu").show();
              $(".start_gift").addClass("on");
              $(".start_gift").removeClass("active");
              $(".sy_cshu .count_all").html(data.msg.lottery_num);
            }
            $.each(data.msg.activity_str, function(i,n) {
              $(".fan_pal li").each(function (o,p){
                // if(o+1 == n) {
                //   $(this).addClass("active");
                // }
                $(".fan_pal li").eq(n-1).addClass("active");
              });
            });
          }else{
            base.isLogin = false;
          }
        }
    });
  //获取所有用户中奖记录
    $.ajax({
        'url':all_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
          if(data.status==0){
            var result = '';
            for(var i = 0; i < data.msg.length; i++) {
              result += "<li>恭喜<span>"+data.msg[i].phone+"</span>获得<i>"+data.msg[i].name+"</i></li>";
            }
            $('.price_con ul').append(result);
            //中奖名单--只有一个时复制一个
            if($(".price_con ul li").length>1){
              setInterval('autoScroll(".price_con ul")', 1500);
            }
          }else{
            var result
          }
        }
    });
  //点击抽奖
    $(".start_gift").click(function (){
        if(base.isLogin == false) {
            showTc(0);
            return;
        }
        if(base.isLogin == true && base.priceNumber == 0){
            $(".d_tc7 .tc7_info").html("您的卡牌还没有全部翻开哦~");
            $(".d_tc7").show();
            $(".d_tc").show();
            return;
        }
        // $(".tc7_info").html("卡牌还没有全部翻开哦~");
        if($(".start_gift").hasClass("on")){
            $.post("/activity/ajax-activity",{
                "cms_csrf": srf
            },function(data){
                if(data.status == 0){
                    $(".count_all").html(data.lottery_num);
                    if(data.gift_id == 1){
                        $(".gidt_img img").attr("src",imgSrc + "pic07.png");
                        $('.gidt_img p').html(data.name);
                        $("#tc10_copyBtnz3").html(data.msg);
                    } else if(data.gift_id == 2){
                        $(".gidt_img img").attr("src",imgSrc + "pic06.png");
                        $('.gidt_img p').html(data.name);
                         $("#tc10_copyBtnz3").html(data.msg);
                    } else if(data.gift_id == 3){
                        $(".gidt_img img").attr("src",imgSrc + "pic04.png");
                        $('.gidt_img p').html(data.name);
                         $("#tc10_copyBtnz3").html(data.msg);
                    } else if(data.gift_id == 4){
                        $(".gidt_img img").attr("src",imgSrc + "pic03.png");
                        $('.gidt_img p').html(data.name);
                        $("#tc10_copyBtnz3").html(data.msg);
                    } else if(data.gift_id == 5){
                        $(".gidt_img img").attr("src",imgSrc + "zanshi2.png");
                        $('.gidt_img p').html(data.name);
                        $("#tc10_copyBtnz3").html(data.msg);
                    } else if(data.gift_id == 6){
                        $(".gidt_img img").attr("src",imgSrc + "pic02.png");
                        $('.gidt_img p').html(data.name);
                        // $("#copyCodeText").html(data.msg);
                    } else if(data.gift_id == 7){
                        $(".gidt_img img").attr("src",imgSrc + "pic01.png");
                        $('.gidt_img p').html(data.name);
                        $("#tc10_copyBtnz3").html(data.msg);
                    }
                    $(".d_tc7").hide();
                    $(".d_tc4").show();
                    $(".d_tc").show();
                    if(data.lottery_num == 0){
                        // $(".c_message").html("您还没有抽奖机会，请稍后再来~");
                        $(".start_gift").removeClass("on");
                        $(".start_gift").addClass("active");
                      }
                } else {
                    alert(data.msg);
                    $(".d_tc").hide();
                }
            },"json");
        }
        if($(".start_gift").hasClass("active")){
             // 我的中奖记录2
            $.ajax({
                url: me_url,
                type: "post",
                data: {
               type:2,
               cms_csrf: srf
            },
            success: function(data) {
            var data = JSON.parse(data);
               //console.log(data);
            if (data.status == 0) {
                var msg = data.msg.data;
                var listLen = msg.length;
                if (listLen == 0) {
                   alert("您还没有中奖记录喔~");
                } else {
                    var html = "";
                    for (var i = 0; i < listLen; i++) {
                        html = html + '<tr>' +
                          '<td>' + msg[i].name + '</td>' +
                          '<td id="tc7_copyText' + i + '">' + msg[i].code + '</td>' +
                          '<td>' +
                          '<label id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '">复制</label>' +
                          '</td>' +
                          '</tr>';
                        }
                        $("#tc7_tbody").html(null).append(html);
                        //初始化复制插件
                        setTimeout(function() {
                          $("#tc7_tbody tr label").each(function(index) {
                            new Clipboard('#tc7_copyBtn' + index);
                          });
                          $(".d_tc").show();
                          $(".d_tc3").show();
                        }, 50);
                      }
                } else {
                  alert(data.msg);
                }
            },
            error: function(data) {
            }
            });
        }
    }); 
    // 点击我要召唤
    $(".zhhuan").click(function(){
        if(!base.isLogin){
           showTc(0);
           return;
         }
         $.ajax({
            'url':zhaohuan_url,
            'data':{},
            'type':'GET',
            'dataType':'Json',
            success:function(data){
              if(data.status==0){
                  showTc(8);
                  $(".addBtn").hide();
                  $("#tc10_copyBtnz2").html(data.msg);
                  $(".gidt_img p").html(data.gift_name);
                  $(".d_tc7").hide();
              }
              if(data.status==102){
                $(".d_tc").show();
                $(".d_tc7").show();
                $(".tc7_info").html(data.msg);
              }
              if(data.status==101){
                $(".d_tc").show();
                $(".d_tc7").show();
                $(".tc7_info").html(data.msg);
              }
              if(data.status==103){
                $(".d_tc").show();
                $(".d_tc7").show();
                $(".tc7_info").html(data.msg);
              }
            },
        });
    });
    // 我的中奖记录1
    $(".ck_jl").click(function() {
        if(base.isLogin == false) {
          showTc(0);
          return;
        }
        $.ajax({
          url: me_url,
          type: "post",
          data: {
            "type":1,
            cms_csrf: srf
          },
          success: function(data) {
            var data = JSON.parse(data);
            //console.log(data);
            if (data.status == 0) {
              var msg = data.msg.data;
              var listLength = msg.length;
              if (listLength== 0) {
                alert("您还没有中奖记录喔~");
              } else {
                var html = "";
                for (var i = 0; i < listLength; i++) {
                  html = html + '<tr>' +
                    '<td>' + msg[i].name + '</td>' +
                    '<td id="tc7_copyText' + i + '">' + msg[i].code + '</td>' +
                    '<td>' +
                    '<label id="tc7_copyBtn' + i + '" data-clipboard-action="copy" data-clipboard-target="#tc7_copyText' + i + '">复制</label>' +
                    '</td>' +
                    '</tr>';
                }
                $("#tc7_tbody").html(null).append(html);
                //初始化复制插件
                setTimeout(function() {
                  $("#tc7_tbody tr label").each(function(index) {
                    new Clipboard('#tc7_copyBtn' + index);
                  });
                  $(".d_tc").show();
                  $(".d_tc3").show();
                  $(".addBtn").hide();
                }, 50);
              }
            } else {
              alert(data.msg);
            }
          },
          error: function(data) {
          }
        })
    });
 

    // 翻牌点击
    $(".fan_pal li").click(function(){
      //判断是否登录
        var self = $(this);
        // var isClick = self.attr("isClick");
        if(!base.isLogin){
           showTc(0);
           return;
         }
         //判断是否剩余点击次数
         // if(base.luckyNumber == 1){
         //    $(".d_tc").show();
         //    $(".d_tc7").show();
         //    $(".tc7_info").html("您还没有翻牌机会<br>赶紧分享页面，参加活动吧");
         //    text: "您还没有翻牌机会<br>赶紧分享页面，参加活动吧"
         //  })
         //  return;
         // }
        //判断是否点击
        // var isClick = self.attr("isClick");
        // if(isClick == "true") {
        //   return;
        // }
        var index = [];

        // self.attr("isClick", "true");
        self.addClass("on");
        if(base.luckyNumber <= 0){
          $(".d_tc").show();
          $(".d_tc7").show();
          $(".tc7_info").html("您还没有翻牌机会<br>赶紧邀请好友，获得参与机会吧");
            return;
        }
        if(base.luckyNumber>0){
            base.luckyNumber--;
            $(".sh_yu").html(base.luckyNumber);
            console.log(base.luckyNumber);
            self.addClass("active");
            // var index = parseInt($(".fan_pal li").index(self)) + 1;
            var param = '';
            if($(".fan_pal li.on").length == 1){
                param = $(this).index()+1;
        
            }else if($(".fan_pal li.on").length == 2){
                // param = is_save + ',' + ($(this).index()+1);

                $(".fan_pal li").each(function(i,val){
                    if($(val).hasClass("on")){
                        index.push(i+1);
                    }
                })
                param = index[0] + ',' + index[1];
        
            }else if($(".fan_pal li.on").length > 2){
                // $(".fan_pal li ").removeClass("on");
                 param = $(this).index()+1;       
            }
        }
        //翻牌ajax
        $.ajax({
            url: fanpal_url,
            type: "post",
            'dataType':'Json',
            data: {
                num: param,
                cms_csrf: srf
            },
            success: function(data) {
                // var data = JSON.parse(data);
                if (data.status == 0) {
                    if(data.msg.activity_count<0){
                        $(".d_tc").show();
                        $(".d_tc7").show();
                        $(".tc7_info").html(data.msg);
                    }else{
                        if(data.msg.is_lottery){
                            $(".start_gift").addClass("on");
                            $(".start_gift").removeClass("active");
                        }
                        if($(".fan_pal li.on").length == 2){
                             // self.attr("isClick",'');
                            // console.log(111);
                            $(".fan_pal li").removeClass("on");
                            if(!data.msg.is_pair){
                               $(".fan_pal li").eq(index[0]-1).removeClass("active");
                               $(".fan_pal li").eq(index[1]-1).removeClass("active");
                               // self.attr("isClick", "");
                            }
                        }
                        var img1=$(this).children("img:nth-child(1)");
                        var new_url = img1.attr("data-url");
                        img1.attr("src", new_url);
                        $(this).addClass("active");
                        // self.attr("isClick","");
                        }
    
                } else {
                  
                }
            },
            error: function(data) {
                // self.attr("isClick", "");
            }
        });
        
    });

    // 登录弹窗
    $(".login_yl").click(function(){
        $(".d_tc").show();
        $(".d_tc1").show();
    })
    //弹框关闭
    $(".tc_closeBtn").click(function(){
        $(this).parent().hide();
        $(this).parent().parent().hide();
        $('input').val("");
        $('textarea').val("");
        $(".err").removeClass("active");
    });
    //地址弹框显示
    $(".addBtn").click(function(){
        $(".d_tc5").show();
        init();
    });
    //登录获取验证码
    $(".g_code").click(function(){
      var my_phone = $(".phone").val();
      var captcha = $(".captcha").val();
      if(my_phone == "" || my_phone == undefined) {
        showErr(0, "手机号码不能为空哦");
        return;
      }else if(my_phone.length != 11){
        showErr(0, "手机号码不正确哦");
        return;
      }
      hideErr(0);
      if(captcha == "" || captcha == undefined) {
        showErr(1, "验证码不能为空哦");
        return;
      }
      hideErr(1);
      $.post(verify_url,{ "phone":my_phone,"captcha":captcha,"cms_csrf":srf },function(data){
        if(data.status == 0){
          $(".g_code").css("pointer-events","none");
          page_djs($(".g_code"),function(){
            $(".g_code").css("pointer-events","auto");
          });
        }else{
          alert(data.msg);
          load_captcha();
        }
      }, 'json');
    });
    //登录请求
    $("#loginBtn").click(function(){
      var my_phone = $(".phone").val();
      var co_codenum1=$('.mark').val();
      var code_url=$(".code_url").attr("data-id");
      if(my_phone == "" || my_phone == undefined) {
        showErr(0, "手机号码不能为空哦");
        return;
      }else if(my_phone.length != 11){
        showErr(0, "手机号码不正确哦");
        return;
      }
      hideErr(0);
      if(co_codenum1 == "" || co_codenum1 == undefined) {
        showErr(2, "验证码不能为空哦");
        return;
      }
      hideErr(2);
      $.ajax({
        'url':login_url1,
        'data':{'phone':my_phone,'yzm':co_codenum1,"code":code_url,"cms_csrf":srf },
        'type':'POST',
        'dataType':'Json',
        success:function(data){
          if(data.status==0){
            alert("登录成功");
            base.isLogin = true;
            $(".d_tc").hide();
            $(".d_tc1").hide();
            init();
          }else{
            showErr(6,data.msg);
            base.isLogin = false;
            load_captcha();
            //alert(data.msg);
          }
        }
      });
    });
    // 好友助力
    $(".help_friend").click(function(){
        if(!base.isLogin) {
          showTc(0);
          return;
        }
        if($(".help_friend").hasClass("active")){
            showTc(5);
        }
    })
      //点击分享
    $(".jiathis_style_32x32 a").click(function() {
        var self = $(this);
        var isClick = self.attr("isClick");
        if(isClick == "true") {
            return;
        }
        self.attr("isClick", "true");
        $.get("/activity/ajax-share-add", {}, function(data) {
            if(data.status == 0) {
                base.luckyNumber = data.msg;
                $(".sh_yu").html(base.luckyNumber);
            } else {
                alert(data.msg);
            }
            self.attr("isClick", "");
        }, "json");
    });
      //手机类型选择
        $(".r_type>div").on("click", function (){
            $(this).addClass("active").siblings().removeClass("active");
        });
    // 点击填写地址
    $(".addBtn").click(function(){
      showTc(4);
    })
    //地址填写请求
    $(".addBtn_sure,.addBtn_change").click(function(){
        var my_name = $(".address_name").val();
        var my_yb=$('.address_num').val();
        var my_tel = $(".address_phone").val();
        var my_add=$('.address_inf').val();
        if(!my_name) {
          showErr(3, "收件人姓名不能为空哦");
          return;
        }hideErr(3);
        if(!my_yb) {
          showErr(3, "收件人邮编不能为空哦");
          return;
        }hideErr(3);
        if(!my_tel) {
          showErr(4, "手机号码不能为空哦");
          return;
        }hideErr(4);
        if(!my_add) {
          showErr(5, "收件人地址不能为空哦");
          return;
        }else if(my_tel.length != 11){
          showErr(5, "手机号码不正确哦");
          return;
        }hideErr(5);
        $.ajax({
          'url':add_url,
          'data':{'name':my_name,'code':my_yb,'address':my_add,'tel':my_tel,"cms_csrf":srf },
          'type':'POST',
          'dataType':'Json',
          success:function(data){
            if(data.status==0){
                alert("保存成功");
                $(".d_tc5").hide();
                $(".d_tc").hide();
                $(".address_name").val(my_name);
                $(".address_num").val(my_yb);
                $(".address_phone").val(my_tel);
                $(".address_inf").val(my_add);
            }else{
                alert(data.msg);
            }
          }
        });
    });
    new Clipboard('#tc10_copyBtnz');
    $(".shareBtn").click(function(){
      alert("已复制~");
    })
    new Clipboard('#tc10_copyBtnz2');
    $("#copyCode").click(function(){
      alert("已复制~");
    })
    new Clipboard('#tc10_copyBtnz3');
    $("#copyCode2").click(function(){
      alert("已复制~");
    })
});