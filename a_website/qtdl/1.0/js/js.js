// 导航
var leftNav=document.getElementById("leftnavcon");
var leftNavLi=leftNav.getElementsByTagName('li');
var navZs=document.getElementById("navzx");
var navLt=document.getElementById("navlt");
var navZsBox=document.getElementById("nav_zixunbox");
var time=null;
var time1=null;
var i=-205;
var flag;
    function move(div,x,y,z){
    	if(flag==1){
    		clearTimeout(z);
			z=setTimeout(function(){
				i+=205;
				if(i>=0){
					clearTimeout(z);
					i=0;
				}
				div.style.left=i+"px";
			},x)
    	}else{
    		clearTimeout(z);
			z=setTimeout(function(){
				i-=205;
				if(i<=-205){
					clearTimeout(z);
					i=-205;
				}
				div.style.left=i+"px";
			},y)
    	}
    }
	navZs.addEventListener("mouseover",function(){
		flag=1;
		move(navZs,1,1,time);
	},true);
	navZs.addEventListener("mouseout",function (){
		flag=0;
		move(navZs,1,1,time);
	},true);
	navLt.addEventListener("mouseover",function (){
		flag=1;
		move(navLt,10,1,time1);
	},true);
	navLt.addEventListener("mouseout",function (){
		flag=0;
		move(navLt,1,10,time1);
	},true);
	

// 轮播
	var oBox = document.getElementById("r_lbbox");
	var oImgs = document.getElementById("r_lbinner").getElementsByTagName("img");
	var oBtns = document.getElementById("r_lunbobtn").getElementsByTagName("span");
	var Num = 0,imgWidth=453;
	var flag = 0;
	var time=null,time2 = null;
	function moveTo (startPos,endPos) {
		clearInterval(time);
		var step = 0;
		var stepMax = 50;
		var everyStep = (endPos-startPos)/stepMax;
		time = setInterval(move,1);
		function move(){
			startPos+=everyStep;
			oBox.scrollLeft = startPos;
			step++;
			if(step == stepMax){
				clearInterval(time);
			}
		}
	}
	function autoMove(){
		if(flag == 0){
			Num++;
			if(Num == oImgs.length){
				Num = 0;
			}
			moveTo(oBox.scrollLeft,Num*imgWidth);
			color();
		}else{
			Num--;
			if(Num == -1){
				Num = oImgs.length-1;
			}
			moveTo(oBox.scrollLeft,Num*imgWidth);
			color();
		}
	}
	function Main(){
		time2 = setInterval(autoMove,2500);
	}
	function clearMain(){
		clearInterval(time2);
	}
	color();
	function color(){
		for(var i=0;i<oBtns.length;i++){
			oBtns[i].style.background = "url(../qtdl/images/qt_lunbo_01.png) no-repeat top center";
		}
		oBtns[Num].style.background = "url(../qtdl/images/qt_lunbo_02.png) no-repeat top center";
	}
	oBox.addEventListener("mouseover",function(){
		clearInterval(time2);
	})
	oBox.addEventListener("mouseout",function(){
		Main();
	})
	window.onload = Main;