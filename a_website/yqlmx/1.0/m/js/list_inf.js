  $(document).ready(function(){
      var page_w = document.body.clientWidth;
      function init(){
        reset_w();
        //回到顶部
        public.goTop($(".i_goTop>div"));
        reset_title_w();
    }

    function reset_title_w() {
        var if_c_title = $(".if_c_title > h1");
        var html = if_c_title.html();
        var len = html.length;
        if(len > 12){
           if_c_title.html(html.substring(0,12)+"...");
       }
   }
   //重置页面某些模块高度
   function reset_w(){
      $(".lf_banner").height(page_w*0.46+"px");
   }

init();
});