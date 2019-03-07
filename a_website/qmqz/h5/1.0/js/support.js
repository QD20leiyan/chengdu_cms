    id = GetRequest('id');
        console.log(id);
    switch(parseInt(id)){
        case 7:
          $(".supp-map .img1>img").attr("src",url+"qmqz/h5/1.0/images/img_1.png");
          $(".supp-map .img1").css({"animation":"scale1 1.5s linear 0s infinite"});
          $(".supp-map span.img1 p").css({"opacity":"1"});
          $(".supp-map span.img1 i>img").css({"opacity":"1"});
        break;
        case 3:
          $(".supp-map .img2>img").attr("src",url+"qmqz/h5/1.0/images/img_2.png");
          $(".supp-map .img2").css({"animation":"scale1 1.5s linear 0s infinite"});
           $(".supp-map span.img2 p").css({"opacity":"1"});
          $(".supp-map span.img3 i>img").css({"opacity":"1"});
        break;
        case 1:
           $(".supp-map .img3>img").attr("src",url+"qmqz/h5/1.0/images/img_3.png");
           $(".supp-map .img3").css({"animation":"scale1 1.5s linear 0s infinite"});
            $(".supp-map span.img3 p").css({"opacity":"1"});
          $(".supp-map span.img3 i>img").css({"opacity":"1"});
        break;
        case 2:
           $(".supp-map .img4>img").attr("src",url+"qmqz/h5/1.0/images/img_4.png");
           $(".supp-map .img4").css({"animation":"scale1 1.5s linear 0s infinite"});
            $(".supp-map span.img4 p").css({"opacity":"1"});
          $(".supp-map span.img5 i>img").css({"opacity":"1"});
        break;
        case 4:
           $(".supp-map .img5>img").attr("src",url+"qmqz/h5/1.0/images/img_5.png");
           $(".supp-map .img5").css({"animation":"scale1 1.5s linear 0s infinite"});
             $(".supp-map span.img5 p").css({"opacity":"1"});
          $(".supp-map span.img5 i>img").css({"opacity":"1"});
        break;
        case 5:
           $(".supp-map .img6>img").attr("src",url+"qmqz/h5/1.0/images/img_6.png");
           $(".supp-map .img6").css({"animation":"scale1 1.5s linear 0s infinite"});
             $(".supp-map span.img6 p").css({"opacity":"1"});
          $(".supp-map span.img6 i>img").css({"opacity":"1"});
        break;
        case 6:
           $(".supp-map .img7>img").attr("src",url+"qmqz/h5/1.0/images/img_7.png");
           $(".supp-map .img7").css({"animation":"scale1 1.5s linear 0s infinite"});
            $(".supp-map span.img7 p").css({"opacity":"1"});
         	$(".supp-map span.img7 i>img").css({"opacity":"1"});
        break;
      }
    function GetRequest(name) {   
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null)  
            return unescape(r[2]);  
        return "";  
       }