//canvas视频
$(function(){
  $(".loading").show();
  $("body,html").addClass("has_auto");
  //获取图片基础地址
  var baseurl=$(".section01").data("src");
  console.log(baseurl);
  // var baseurl='image1/';
  var imgurls=["canvas0.jpg","canvas1.jpg","canvas2.jpg","canvas3.jpg","canvas4.jpg","canvas5.jpg","canvas6.jpg","canvas7.jpg","canvas8.jpg","canvas9.jpg","canvas10.jpg","canvas11.jpg","canvas12.jpg","canvas13.jpg","canvas14.jpg","canvas15.jpg","canvas16.jpg","canvas17.jpg","canvas18.jpg","canvas19.jpg","canvas20.jpg","canvas21.jpg","canvas22.jpg","canvas23.jpg","canvas24.jpg","canvas25.jpg","canvas26.jpg","canvas27.jpg","canvas28.jpg","canvas29.jpg","canvas30.jpg","canvas31.jpg","canvas32.jpg","canvas33.jpg","canvas34.jpg","canvas35.jpg","canvas36.jpg","canvas37.jpg","canvas38.jpg","canvas39.jpg","canvas40.jpg","canvas41.jpg","canvas42.jpg","canvas43.jpg","canvas44.jpg","canvas45.jpg","canvas46.jpg","canvas47.jpg","canvas48.jpg","canvas49.jpg","canvas50.jpg","canvas51.jpg","canvas52.jpg"];
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
        //播放结束
        // return ;
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
      setTimeout(drawChild,110);
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
//         $("body,html").addClass("no_auto").removeClass("has_auto");
        clearInterval(t);
        drawChild();
      }
    },200);
  }
  childFun();
});