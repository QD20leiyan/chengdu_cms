//新闻对应内容显示
$(".news_box .hd ul li").click(function(){
	var index=$(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$(".news_info").eq(index).removeClass("hidden").siblings(".news_info").addClass("hidden");

});

//娃娃
function childFun(){
	var childImg=document.createElement("img");
	childImg.src=$(".childimg img").attr("src");
	var childDom=document.getElementById("child");
	//给canvas设置width,height，不设置canvas会模糊
	childDom.width=$(childDom).width();
	childDom.height=$(childDom).height();
	var child= childDom.getContext("2d");
	var x = 0;
	function drawChild(){
		child.clearRect(0,0,childDom.width,childDom.height);
		child.beginPath();
		child.save();
		x+=278;
		if(x>=childImg.width){
			x = 0;
		}
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
		child.drawImage(childImg,x,0,278,251,0,0,childDom.width,childDom.height);
		child.closePath();
		child.stroke();
		child.restore();
	}
	drawChild();
	setInterval(drawChild,150);
}
childFun();


//光
function lightFun(){
	var lightImg=document.createElement("img");
	lightImg.src=$(".lightimg img").attr("src");
	var lightDom=document.getElementById("light");
	//给canvas设置width,height，不设置canvas会模糊
	lightDom.width=$(lightDom).width();
	lightDom.height=$(lightDom).height();
	//console.log();
	var light= lightDom.getContext("2d");
	var y = 0;
	function drawLight(){
		light.clearRect(0,0,lightDom.width,lightDom.height);
		light.beginPath();
		light.save();
		y+=1036;
		if(y>=lightImg.height){
			y = 0;
		}
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
		light.drawImage(lightImg,0,y,640,1036,0,0,lightDom.width,lightDom.height);
		light.closePath();
		light.stroke();
		light.restore();
	}
	drawLight();
	setInterval(drawLight,1000);
}
lightFun();

