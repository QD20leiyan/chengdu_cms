//canvas视频
$(function(){
  //获取图片基础地址
  var baseurl=$(".i_main").data("src");
  // var baseurl='images/';
  var imgurls=["btn_img1.png","btn_img2.png","btn_img3.png","btn_img4.png","btn_img5.png","btn_img6.png","btn_img7.png","btn_img8.png","btn_img9.png","btn_img10.png","btn_img11.png","btn_img12.png","btn_img13.png","btn_img14.png","btn_img15.png","btn_img16.png","btn_img17.png","btn_img18.png","btn_img19.png","btn_img20.png","btn_img21.png","btn_img22.png","btn_img23.png","btn_img24.png","btn_img25.png","btn_img26.png","btn_img27.png","btn_img28.png","btn_img29.png","btn_img30.png","btn_img31.png","btn_img32.png","btn_img33.png","btn_img34.png","btn_img35.png","btn_img36.png","btn_img37.png","btn_img38.png","btn_img39.png","btn_img40.png","btn_img41.png","btn_img42.png","btn_img43.png","btn_img48.png","btn_img49.png","btn_img50.png","btn_img51.png","btn_img52.png","btn_img53.png","btn_img54.png","btn_img55.png","btn_img56.png","btn_img57.png","btn_img58.png","btn_img59.png","btn_img60.png"];
  var imgs=[];
  
  for(var i in imgurls){
    var img=document.createElement("img");
    img.src=baseurl+imgurls[i];
    // img.src="images/"+imgurls[i];
    imgs.push(img);
  }
  var childDom_img=document.getElementsByClassName("child");
   for(var i=0;i<childDom_img.length;i++){
        var childDom=childDom_img[i];
        var child=childDom.getContext("2d");
        childFun(child);
   }
  function childFun(child){
    var i=0;
    function drawChild(){
      if(i>=imgs.length){
        i=0;
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
      setTimeout(drawChild,40);
    }
    var t=setInterval(function(){
      var complete=true;
      for(var i in imgs){
        if(!imgs[i].complete){
          complete=false;
        }
      }
      if(complete){
        clearInterval(t);
        drawChild();
      }
    },150);
  }
});