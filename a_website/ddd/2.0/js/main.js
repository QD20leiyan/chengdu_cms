
function aa(){
	$(".page-font2").css("opacity",Math.random().toFixed(5));
}
setInterval(aa,100);

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
_prize[8]="超值大礼包";
_prize[7]="精致毛毡炸弹笔记本";
_prize[6]="超值大礼包";
_prize[5]="萌眼小呆龙卡套";
_prize[4]="愤怒搬砖主题T恤";
_prize[3]="超值大礼包";
_prize[2]="炫彩加厚鼠标垫";
_prize[1]="360儿童手表";

var _key;

$(".page-cj-05").on("click",function(){
	//$("body").on("touchmove",false);
	//活动结束
	//alert('活动已结束');
	//return false;
	//抽奖入库
	//var _num = parseInt($(".page-cj-integral span").text());
	if(_turntable){
		//返回奖品信息
		$.post(
			'/act/get_pinfo',
			{},
			function(data){
				var data = eval('(' + data + ')');
				if(data.status == 1){
					_key=5;
					lottery();
					_turntable = false;
					$('#t_code').val(data.msg);
					$('.tck_lbm').show();
				}else{
					$('.mask').show();
					$('.tck_telerr').show();
					return false;
				}
			}
		);
		//_key=5;
	}
	//else{
		//alert('积分不够')
//	}
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
			j==1?c=0:c=45;var jj = Number(j*45)-Number(-360);
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
