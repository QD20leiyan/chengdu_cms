$(function(){
	var method = {};
	method.reduce = function(speed){
		var rand = Math.random();
		var speed = speed;
		if(rand < speed){
			common.tips("当前网络繁忙,请稍后再试");
			return false;
		}else{
			return true;
		}
	}
	
	method.reduce(threshold);
})