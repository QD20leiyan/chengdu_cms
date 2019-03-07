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
    $(".tel_btn").click(function(){
        var mobileObj = $('#phone');
        var phone = mobileObj.val();
        var type = $('input[name="wp"]:checked').val();
        var my_takon = $("meta[name='csrf-token']").attr("content");
        if(checkMobile($(mobileObj))){
            $.post(
                '/site/savephone',
                {
                    phone:phone,
                    type:type,
                    cms_csrf: my_takon
                },
                function(data){
                    var data = eval('(' + data + ')');
                    if(data.status == 1){
                        $(".mask").show();
                        $(".tck_yue").show();
                    }else{
                        alert(data.msg);
                        return false;
                    }
                }
            );
        }

    })
  $(".close").click(function(){
    $(".tck_yue").hide();
    $(".mask").hide();
    $(".video_mask").hide();
  })
  // $(".video_play").click(function(){
  //   $(".video_mask").show();
  // })
  $(".ewm_box .ico_wx").click(function(){
    $(".ewm").toggle();
  })
})
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
