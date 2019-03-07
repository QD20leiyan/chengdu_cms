
    var qufu_val='';
    var sel_val='';
    var name_val='';
    var val_sta1=false;
    var val_sta2=false;
    var val_sta3=false;
    var boxIds = new Array();
    var obj=[];
    var h5_id="";
    var phone_type="";
    var serverIds=""//区服
    
    var duzhu_val='';
    var sel_val='';
    var name_val='';
    var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            mousewheelControl: false,
            observer: true,
            observeParents: true,
            noSwiping: true,
            // effect : 'fade',
            fade: {
                crossFade: true
            },
            onInit: function (swiper) {
            },
            onSlideChangeEnd: function (swiper) {
            },
            onTransitionEnd: function (swiper) {
            }
    });
    //设备类型判断
      // function type(){
      //     var u = navigator.userAgent,
      //        app = navigator.appVersion;
      //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      //     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //     if(isIOS) {
      //       phone_type="ios";
      //     }
      //     if(isAndroid) {
      //       phone_type="android";
      //     }
      // }
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
      function custom_close(){
        if(confirm("您确定要关闭本页吗？")){
          location.reload();
        window.opener=null;
        window.open('','_self');
        open(location, '_self').close();
        window.close();
        }
        else{}
        }
      //初始判断填写信息
    $(function() {
            var  h5_wx=$(".h5_wx").html();
    var  h5_data=$(".h5_data").html();
    var login_url="/nba/psq/login.html?h5data="+h5_data;//登录
    var wj_url="/nba/psq/get-gift.html?h5data="+h5_data;//获取礼包
    var info_url="/nba/psq/save-detail.html?h5data="+h5_data;//填写详细信息
    var yzm_url="/commonMethod/ajax-yuyue-verify.html?h5data="+h5_data;//手机验证码
    var srf = $('meta[name="csrf-token"]').attr('content');
      // type();
      //close
      $(".close_index").click(function(){
        location.reload();
        custom_close();
      })

      //点击刷新验证码
      $(".co_codebtn2").click(function(){
        load_captcha();
        $(this).find("i").hide();
        $(this).find("img").show();
      })
       //选择按钮
        $(".qufu_input").click(function(){
            $(".tips").fadeIn(500);
            $(".tips2").addClass("active");
        });
        //区服选择
        $(".tips .tip2 ul li").click(function(){
            var text=$(this).text();
            $(".tips").removeClass("active");
            $(".tips").fadeOut(500);
            $(this).addClass("active").siblings().removeClass("active");
            $(".qufu_input").val(text);
            serverIds=$(this).data("id");
        });
        //单选项
        $(".sel_list.sole ul li").click(function(){
            var text=$(this).find("p").text();
            $(this).addClass("active").siblings().removeClass("active");
        });
        //多选项
         //多选项
        $(".sel_list.more ul li.so").click(function(){
          if($(this).hasClass("active")){
               $(this).removeClass("active");
          }else{
            $(this).addClass("active");
            var text=$(this).find("p").text();
          }
        });
        $(".sel_list.more ul li.other i").click(function(){
          if($(this).parent().hasClass("active")){
               $(this).parent().removeClass("active");
                $(".sel_list.more ul li.other input").val("");
          }else{
               $(this).parent().addClass("active");
          }
          });
          $(".sel_list.more ul li.other span").click(function(){
          if($(this).parent().parent().hasClass("active")){
               $(this).parent().parent().removeClass("active");
               $(".sel_list.more ul li.other input").val("");
          }else{
               $(this).parent().parent().addClass("active");
          }
      });
      $(".sel_list.more ul li.other input").focus(function(){
               $(this).parent().parent().addClass("active");
        });
        var next_click=0;
        $(".cysw").click(function(){
            mySwiper.slideNext();
        });
        $(".next").click(function(){
            var parent=$(this).parent().parent().find(".sel_list");
            var li_sel=parent.find("li.active");
            var that=$(this);
            var input_text="";
            var li_input=parent.find("input");
            if(li_sel&&li_sel.length>0){
              mySwiper.slideNext();
              if(li_input){
                input_text=li_input.val();
                li_input.attr("data-index",input_text);
              }
            }else{
              alert("至少选择一个选项哦~");
            }
        })
        // //获取图片验证码
        $(".co_codebtn1").click(function(){
        var roleId =$(".sel_input").val();
        var roleName =$(".act_name").val();
        var phone =$(".co_username").val();
        var captcha = $(".code1").val();
        var h5_data2=$(".h5_data").html();
        if(serverIds == "" || serverIds == undefined) {
          alert("请选择游戏区服~");
          return;
        }
        if(roleId == "" || roleId == undefined) {
          alert("游戏ID不能为空哦~");
          return;
        }
        if(roleName == "" || roleName == undefined) {
          alert("角色名不能为空哦~");
          return;
        }
        if(phone == "" || phone == undefined) {
          alert("手机号码不能为空哦");
          return;
        } else if(phone.length != 11) {
          alert("手机号码不正确哦");
          return;
        }
        if(captcha == "" || captcha == undefined) {
          alert("验证码不能为空哦");
          return;
        }
        $.post("/commonMethod/ajax-yuyue-verify.html?h5data="+h5_data2, {
          "phone":phone,
          'type': "ios",
          "captcha": captcha,
          "cms_csrf": srf,
          "smsContent":'您正在进行《NBA LIVE》问卷活动登录'
        }, function(data) {
          if(data.status == 0) {
            console.log(h5_data2);
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
        var roleId =$(".sel_input").val();
        var roleName =$(".act_name").val();
        var phone =$(".co_username").val();
        var yzm = $(".code2").val();
        if(serverIds == "" || serverIds == undefined) {
          alert("请选择游戏区服~");
          return;
        }
        if(roleId == "" || roleId == undefined) {
          alert("游戏ID不能为空哦~");
          return;
        }
        if(roleName == "" || roleName == undefined) {
          alert("角色名不能为空哦~");
          return;
        }
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
            'url':login_url,
            'data':{'roleId':roleId,'roleName':roleName,"serverIds":serverIds,"phone":phone,"yzm":yzm,"cms_csrf":srf },
            'type':'POST',
            'dataType':'Json',
            success:function(data){
                if(data.status==0){
                  mySwiper.slideNext();
                  $(".name_input").val(data.userDetail.name);
                  $(".qq_num").val(data.userDetail.qq);
                  $(".address").val(data.userDetail.address);
                }else{
                   alert(data.msg);
                   load_captcha();
                }
            }
            ,error:function(){
                alert("网络请求失败，请重新刷新页面");
            }
        });
        })
      //问卷提交
        $(".submit_wj").click(function(){
          var slider10_text=$(".slide10 .sel_list.more li input").val();
          $(".slide10 .sel_list.more li input").attr("data-index",slider10_text);
          var options = new Array();
          var wrap=$(".swiper-container").find('.wrap2');
          for(var i=0;i<wrap.length;i++){
            var index=$(wrap[i]).find(".sel_list");
            var li_list=index.find("li.active");
            var arr2 = new Array();
            for(var j=0;j<li_list.length;j++){
              var info_text="";
              var active=$(li_list[j]).find("p").text();
              var li_input=$(li_list[j]).find("input");
              if(li_input&&li_input.length>0){
                var content=li_input.data("index");
                arr2.push(active+","+content);
              }else{
                arr2.push(active);
              }
            }
          options.push(arr2);
          }
          console.log(options);
          $.ajax({
                url: wj_url,
                type: "POST",
                data: {
                  options: options,
                  "is_repeat":1,
                  "cms_csrf":srf 
                },
                dataType: "json",
                // traditional: true,//这里设置为true
                success: function(data) {
                  if(data.status == 0){
                    mySwiper.slideNext();
                    $(".code_num").html(data.msg);
                    }else{
                           alert(data.msg);
                    }
                  }
          });
        })
        //复制
        new Clipboard('.copy');
        $(".copy").click(function() {
        alert("已复制");
        });
     //提交详细地址
        $(".submit_info").click(function(){
            var name_val=$(".name_input").val();
            var qq_val=$(".qq_num").val();
            var address_val=$(".address").val();
            if(name_val=="" || name_val == undefined){
                alert("请输入您的姓名哦~");
                return;
            }
            if(qq_val=="" || qq_val == undefined){
                alert("请输入您的QQ号码~");
                return;
            }
            if(address_val=="" || address_val == undefined){
                alert("请输入您的详细地址~");
                return;
            }
            $.ajax({
                url:info_url,
                type:"POST",
                data:{
                  "name":name_val,
                  "qq":qq_val,
                  "address":address_val,
                },
                dataType: "json",
                success: function(data) {
                  if(data.status == 0){
                    mySwiper.slideNext();
                  }if(data.status == -1){
                    mySwiper.slideNext();
                  }else{
                           alert(data.msg);
                        }
                  }
                });
        });
    });