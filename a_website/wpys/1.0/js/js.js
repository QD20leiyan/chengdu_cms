$(function(){
  var $_window = $(window);
  var $main_visual = $('.cover_con');
  var itemLi =$main_visual.find('.item');
  var visualWidth = $main_visual.width();
  $main_visual.mousemove(function(e){
      var cursorX = e.clientX - $main_visual.offset().left;
      var cursorY = e.clientY - $main_visual.offset().top;
      var i=0.5;
      $(this).find('.item').each(function(){
          var item_width = $(this).width();
          var wrapperWidth =$_window.width();
          var wrapperHeight =(wrapperWidth-0)/1.26;
          var centerX = wrapperWidth / 2;
          var centerY = wrapperHeight / 2;
          var newLeft = ((cursorX - centerX) * (i) / 30) * (-1);
          var newTop = (cursorY - centerY) * (i) / 30 * (-1);
          $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
          i= i*2;
      });
  });
  function isEmail(email) {
      var reg = /^[^@]+@[^@]+\.[^@]+$/;
    var temp = reg.test(email);
    return temp;
  }
  var type = '';
  $(".ios").click(function(){
      type = 'ios';
      $(".tips").show();
  });
    $(".andr").click(function(){
        type = 'android';
        $(".tips").show();
    });
    $(".getcode").click(function(){
        var phone= $('.phone');
        if(checkMobile(phone)){
            var email= $('.email').val();
            var url = '/commonMethod/ajax-yuyue-email.html';
            var my_takon = $("meta[name='csrf-token']").attr("content");
            if(isEmail(email)){
                $.post(url, {phone:phone.val(),email:email, type:type,cms_csrf: my_takon}, function(data){
                    if(data.status == 0){
                        alert("预约成功！");
                        $(".tips").hide();
                    }else{
                        alert(data.msg);
                        // return false;
                        $(".tips").hide();
                        $(".error").hide();
                    }
                },'json');
            }
            else{
                $(".error").hide();
                $(".error2").show();
            }
        }else{
            $(".error").hide();
            $(".error1").show();
        }
    });
  $(".close").click(function(){
    $(".tck_yue").hide();
    $(".mask").hide();
    $(".video_mask").hide();
  });
  $(".tips .close").click(function(){
    $(".tips").hide();
    $(".email").val("");
    $(".phone").val("");
  })
  // $(".video_play").click(function(){
  //   $(".video_mask").show();
  // })
  $(".ewm_box .ico_wx").click(function(){
    $(".ewm").toggle();
  })
});
function checkMobile(mobileObj){
        var mobile = mobileObj.val();
        var myreg = /^(1[3|4|5|7|8][0-9]+\d{8})$/;
        if (mobile.length == 0) {
            alert('请输入手机号码！');
            mobileObj.focus();
            return false;
        } else if (mobile.length != 11) {
            alert('请输入有效的手机号码！');
            mobileObj.focus();
            return false;
        } else if (!myreg.test(mobile)) {
            alert('请输入有效的手机号码！');
            mobileObj.focus();
            return false;
        }
        return true;
    }
