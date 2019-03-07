window.onload=function(){
	var oUp=document.getElementById('up');
	var oDown=document.getElementById('down');
	var oOut=document.getElementById('out');
	var wid=parseInt(oOut.offsetWidth)-100;
	var h=parseInt(oOut.offsetHeight)-102;
	oUp.style.top = '0px';
	oUp.style.right = '0px'
	oDown.style.bottom = '0px';
	oDown.style.left = '0px'
	var timer = null;	//	存放延时器id
	var timer2=null;
	var timer1=null;
	var timer4=null;
	function rotate(ele,i){
			ele.style.WebkitTransform="rotateY("+i+"deg)";
			ele.style.MozTransform = "rotateY("+i+"deg)";
			ele.style.msTransform = "rotateY("+i+"deg)";
			ele.style.OTransform = "rotateY("+i+"deg)";
			ele.style.transform = "rotateY("+i+"deg)";
	}
	timer=setInterval(function runDiv(){
		if(parseInt(oUp.style.right)<wid&&parseInt(oUp.style.top)<=0){
			oUp.style.top = '0px';
			oUp.style.right = (parseInt(oUp.style.right)+10)+'px';
			if(oUp.offsetLeft<=0){
				rotate(oUp,180)
				clearInterval(timer);
				timer2=setInterval(function(){
					oUp.style.right = (parseInt(oUp.style.right)-10)+'px';
					if(parseInt(oUp.style.right)<=0){
						rotate(oUp,360)
						timer=setInterval(runDiv,100)
				 		clearInterval(timer2);
				 	}
				},100)
			}
		}
	},100)

	timer1=setInterval(function runDiv1(){
		if(parseInt(oDown.style.left)<wid&&parseInt(oDown.style.bottom)<=0){
			oDown.style.bottom = '0px';
			oDown.style.left = (parseInt(oDown.style.left)+10)+'px';		
			if(oDown.offsetLeft>wid){
				rotate(oDown,180)
				clearInterval(timer1);
				timer4=setInterval(function(){
					oDown.style.left = (parseInt(oDown.style.left)-10)+'px';
					if(parseInt(oDown.style.left)<=0){
						rotate(oDown,360);
						timer1=setInterval(runDiv1,100)						
				 		clearInterval(timer4);
				 	}
				},100)
			}
		}
	},100)
}
	