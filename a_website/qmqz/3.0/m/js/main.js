
function aa(){
	$(".page-font2").css("opacity",Math.random().toFixed(5));
}
setInterval(aa,100);
$(".page-cj-btn").on("touchstart",function(){
	$("body").on("touchmove",false);
	$(".mask").show();
	$(".page-result").show();
});
$(".page-explain-a").on("touchstart",function(){
	$("body").on("touchmove",false);
	$(".mask").show();
	$(".page-explain").show();
});
 $(".page-result").on("touchstart",function(e){
	$(".mask").hide();
	$(".page-result").hide();
})
$(".page-explain").on("touchstart",function(e){
	$(".mask").hide();
	$(".page-explain").hide();
});
$(".pop-win i").on("touchstart",function(){
	$("body").off("touchmove",false);
	$(".mask").hide();
	$(".pop-win").hide();
})


var _turntable = true;
var _prize=new Array()
_prize[8]="总决赛门票";
_prize[7]="积分10";
_prize[6]="魅族充电宝";
_prize[5]="头盔三";
_prize[4]="大神X";
_prize[3]="谢谢参与";
_prize[2]="积分20";
_prize[1]="魅族X5";

var _key;

$(".page-cj-05").on("click",function(){
	$("body").on("touchmove",false);
	//活动结束
	//alert('活动已结束');
	//return false;
	//抽奖入库
	var _num = parseInt($(".page-cj-integral span").text());
	if(_num>0 && _turntable){
		lottery();
		_turntable = false;
		//返回奖品信息
		// $.ajax({
			// url:url,
			// dataType:"json",
			// type:"GET",
			// success:function(data){
				// //data._key返回中的几个将（1，2，3，4，5，6，7，8）
				// //data._num返回积分树  $(".page-cj-integral span").text(_num-1);
			// }
		// });
		$(".page-cj-integral span").text(_num-1);
		_key=8;
	}else{
		alert('积分不够')
	}
});
//转盘转动
function lottery(){
	var _time=8*5;
	var i=0;
	$(".page-cj-03").css("-webkit-transform","rotate(0deg)");
	timeSet = setInterval(function(){
		_time--;
		i++;
		if(_time>=0 || _key==0){
			$(".page-cj-03").css("-webkit-transform","rotate(" + i*45 + "deg)");
		}else if(_key){
			clearInterval(timeSet);
			zui(50,0,_key);
		}
	},45)
}
function zui(_speed,j,k){
	MtimeSet = setTimeout(function() {
		j++
		if(k>=j){
			j==1?c=0:c=45;var jj = Number(j*45)-Number(22.5);
			$(".page-cj-03").css("-webkit-transform","rotate(" + jj + "deg)");
			zui(_speed + 10,j,k);
		}else{
			$("body").off("touchmove",false);
			_turntable = true;
			setTimeout(function(){
				$(".page-result dl dd").eq(0).before("<dd>"+_prize[k]+"</dd>");
				//var url = window.location.href;
				if(k==3){
					
					//结果入库
				}else{
					
					//结果入库
				}

			},800)
		}
	},_speed)
}
