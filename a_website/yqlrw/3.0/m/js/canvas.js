//canvas视频
function childFun(){
  var childImg=document.createElement("img");
  var childDom=document.getElementById("child");
  childImg.src=$(childDom).attr("data-src");
  var child= childDom.getContext("2d");
  var x = 0;
  function drawChild(){
    x+=640;
    if(childImg.width!=0&&x>=childImg.width){
      x = 0;
//                setTimeout(function(){
      $(".canvasbox").hide();
      $(".i_main .top .slogan *").show();
//                },200);
      return;
    }
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
    child.drawImage(childImg,x,0,640,1032,0,0,childDom.width,childDom.height);
    child.closePath();
    child.stroke();
    child.restore();
    setTimeout(drawChild,200);
  }
  var t=setInterval(function(){
    if(childImg.complete){
      $(".loading").addClass("hidden");
      $("body,html").addClass("no_auto").removeClass("has_auto");
      clearInterval(t);
      drawChild();
    }
  },100);
}
$(function(){
  $("body,html").addClass("has_auto");
  setTimeout(function(){
    childFun();
  },100);
});