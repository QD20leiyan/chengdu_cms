window.onload=function(){
	var oUp=document.getElementById('up');
	var oDown=document.getElementById('down');
	oUp.style.top = '0px';
	oUp.style.right = '0px'	
	var _timer = null;	//	存放延时器id
	function rotate(ele,i){
			ele.style.WebkitTransform="rotate("+i+"deg)";
			ele.style.MozTransform = "rotate("+i+"deg)";
			ele.style.msTransform = "rotate("+i+"deg)";
			ele.style.OTransform = "rotate("+i+"deg)";
			ele.style.transform = "rotate("+i+"deg)";
	}
	runDiv();
	function runDiv(){
		if(parseInt(oUp.style.right)<850&&parseInt(oUp.style.top)<=0){	//向左
			oUp.style.top = '0px';
			oUp.style.right = (parseInt(oUp.style.right)+10)+'px';
			rotate(oUp,-360);
		}
		else if(parseInt(oUp.style.right)>=840&&parseInt(oUp.style.top)<400){	//转向下
			oUp.style.right = '840px';
			oUp.style.top = (parseInt(oUp.style.top)+10)+'px';
			rotate(oUp,-90);
		}
		else if(parseInt(oUp.style.right)>0&&parseInt(oUp.style.top)>=400){	//转向右
			oUp.style.top = '400px';
			oUp.style.right = (parseInt(oUp.style.right)-10)+'px';
			rotate(oUp,-180);
		}
		else if(parseInt(oUp.style.right)<=0&&parseInt(oUp.style.top)>0){	//转向上
			oUp.style.right = '0px';
			oUp.style.top = (parseInt(oUp.style.top)-10)+'px';
			rotate(oUp,-270);
		}
		_timer = setTimeout(runDiv,100);
	}
	oDown.style.bottom = '0px';
	oDown.style.left = '0px'
	var _timer1 = null;	//	存放延时器id
	runDiv1();
	function runDiv1(){		
		if(parseInt(oDown.style.left)<850&&parseInt(oDown.style.bottom)<=0){//向右	
			oDown.style.bottom = '0px';
			oDown.style.left = (parseInt(oDown.style.left)+10)+'px';
			rotate(oDown,-360);
		}
		else if(parseInt(oDown.style.left)>=840&&parseInt(oDown.style.bottom)<400){	//转向上
			oDown.style.left = '840px';
			oDown.style.bottom = (parseInt(oDown.style.bottom)+10)+'px';
			rotate(oDown,-90);
		}
		else if(parseInt(oDown.style.left)>0&&parseInt(oDown.style.bottom)>=400){	//转向左	
			oDown.style.bottom = '400px';
			oDown.style.left = (parseInt(oDown.style.left)-10)+'px';
			rotate(oDown,-180);
		}
		else if(parseInt(oDown.style.left)<=0&&parseInt(oDown.style.bottom)>0){	//转向下
			oDown.style.left = '0px';
			oDown.style.bottom = (parseInt(oDown.style.bottom)-10)+'px';
			rotate(oDown,-270);
		}
		_timer1 = setTimeout(runDiv1,100);
	}

}
	