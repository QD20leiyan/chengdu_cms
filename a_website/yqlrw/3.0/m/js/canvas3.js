//canvas视频
$(function(){
  $("body,html").addClass("has_auto");
  //获取图片基础地址
  var baseurl=$(".i_main").data("src");
  // var baseurl='images/';
  var imgurls=["canvas0.jpg","canvas1.jpg","canvas2.jpg","canvas3.jpg","canvas4.jpg","canvas5.jpg","canvas6.jpg","canvas7.jpg","canvas8.jpg","canvas9.jpg","canvas10.jpg","canvas11.jpg","canvas12.jpg"];
  var imgurls3=["11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg","21.jpg","22.jpg","23.jpg","24.jpg","25.jpg","26.jpg","27.jpg"];
  var imgs=[];
  for(var i in imgurls){
    var img=document.createElement("img");
    img.src=baseurl+imgurls[i];
    imgs.push(img);
  }
  function childFun(){
    var i=0;
    var childDom=document.getElementById("child");
    var child= childDom.getContext("2d");
    function drawChild(){
      if(i>=imgs.length){
        i=0;
         // //播放结束
        $("#child").hide();
        $("#child3").css("display","block");
        return ;
      }
      var childImg=imgs[i++];
      child.clearRect(0,0,childDom.width,childDom.height);
      child.beginPath();
      child.save();
      //9个参数
      //1元素节点
      //2切割的起始X坐标
      //3切割的起始的Y坐标
      //4切割宽度
      //5切割高度
      //6切割好的图片的定位X坐标
      //7切割好的图片的定位Y坐标
      //8显示切割图片的宽度
      //9显示切割图片的高度
      child.drawImage(childImg,0,0,childImg.width,childImg.height,0,0,childDom.width,childDom.height);
      child.closePath();
      child.stroke();
      child.restore();
      setTimeout(drawChild,200);
    }
    var t=setInterval(function(){
      var complete=true;
      for(var i in imgs){
        if(!imgs[i].complete){
          complete=false;
        }
      }
      if(complete){
        $(".loading").hide();
        $("body,html").addClass("no_auto").removeClass("has_auto");
        clearInterval(t);
        drawChild();
      }
    },100);
  }
  childFun();
});