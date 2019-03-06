
var result_angle = [
    {a:7,p:0.08,t:'小黄鱼烧豆腐',id:'1'},
    {a:58,p:0.08,t:'烤肉筋一份',id:'2'},
    {a:109,p:0.08,t:'烤肥瘦一份',id:'3'},
    {a:160,p:0.35,t:'冰封/可乐任选1瓶',id:'4'},
    {a:211,p:0.35,t:'益可滋酸奶1瓶',id:'5'},
    {a:262,p:0.03,t:'9折买单',id:'6'},
    {a:313,p:0.03,t:'8折买单',id:'7'}
];
var n = 0;
var rotate = {
	rotate_angle : 10, //起始位置为0
	flag_click : false, //转盘转动过程中不可再次触发
	calculate_result:function(type,during_time){//type:0,箭头转动,1,背景转动;during_time:持续时间(s)
		var self = this;
		    type = type || 0; // 默认为箭头转动
		    during_time = during_time || 1; // 默认为1s
		var rand_num = Math.ceil(Math.random() * 100); // 用来判断的随机数，1-100
		var result_index; // 最终要旋转到哪一块，对应result_angle的下标
		var start_pos = end_pos = 0; // 判断的角度值起始位置和结束位置
		for(var i in result_angle){
			start_pos = end_pos + 1; // 区块的起始值
			end_pos = end_pos + 100 * result_angle[i].p; // 区块的结束值
			if(rand_num >= start_pos && rand_num <= end_pos){ //如果随机数落在当前区块，那么获取到最终要旋转到哪一块
				result_index = i;
				break;
			}
		}
		var rand_circle = Math.ceil(Math.random() * 4) + 1; // 附加多转几圈，2-3
		self.flag_click = false; // 旋转结束前，不允许再次触发
		if(type == 1){ // 转动盘子
			var index_deg=result_angle[result_index].a;
		    var lot_id = result_angle[result_index].id;// 最终要旋转到哪一块对应result_angle的下标的id
			self.rotate_angle= self.rotate_angle - rand_circle*360 - index_deg - self.rotate_angle % 360;
			$('#rotate').css({
				'transform': 'rotate('+self.rotate_angle+'deg)',
				'-ms-transform': 'rotate('+self.rotate_angle+'deg)',
				'-webkit-transform': 'rotate('+self.rotate_angle+'deg)',
				'-moz-transform': 'rotate('+self.rotate_angle+'deg)',
				'-o-transform': 'rotate('+self.rotate_angle+'deg)',
				'transition': 'transform ease-out '+during_time+'s',
				'-moz-transition': '-moz-transform ease-out '+during_time+'s',
				'-webkit-transition': '-webkit-transform ease-out '+during_time+'s',
				'-o-transition': '-o-transform ease-out '+during_time+'s'
				});
		}else{ // 转动指针
				self.rotate_angle = self.rotate_angle + rand_circle * 360 + result_angle[result_index].a - self.rotate_angle % 360;
				$('.pointer').css({
					'transform': 'rotate('+self.rotate_angle+'deg)',
					'-ms-transform': 'rotate('+self.rotate_angle+'deg)',
					'-webkit-transform': 'rotate('+self.rotate_angle+'deg)',
					'-moz-transform': 'rotate('+self.rotate_angle+'deg)',
					'-o-transform': 'rotate('+self.rotate_angle+'deg)',
					'transition': 'transform ease-out '+during_time+'s',
					'-moz-transition': '-moz-transform ease-out '+during_time+'s',
					'-webkit-transition': '-webkit-transform ease-out '+during_time+'s',
					'-o-transition': '-o-transform ease-out '+during_time+'s'
				});
		}
		// 旋转结束后，不允许再次触发
		setTimeout(function(){ 
			self.flag_click = false;
			// 告诉结果
		    $(".light1").removeClass("active");
		    $(".light2").removeClass("active");
			alert("恭喜您，获得"+result_angle[result_index].t);
			console.log(lot_id);
		},during_time*1500);
	}
}
//灯光闪烁
$(".pointer").on("click",function(){
	n++;
  	if(n == 1){
		rotate.calculate_result(1,1);
		$(".light1").addClass("active");
		$(".light2").addClass("active");
		return ; 
  	}else if(n >= 2){
  		alert("欢迎明天您的光临~");
  	}
});
