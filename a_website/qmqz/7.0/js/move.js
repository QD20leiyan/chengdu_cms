/**
 * Created by lmy on 2017/8/5 0005.
 */
//全局变量
function move() {
	var myObj, mo_timer;
	var mo_container = "";
	var mo_swipe = "";
	var mo_item = "";
	var mo_item_len = 0;
	var mo_index = 0;
	var mo_loopTime = 4000;

	this.init = function(obj) {
		if(!obj) {
			return;
		} else {
			myObj = obj;
		}

		if(!obj.ele) {
			return;
		} else {
			getMoveElement(obj.ele)
		}
		//判断是否可以循环
		if(isMove(mo_item) == false) {
			return;
		}
		//是否循环
		if(!obj.loop) {
			resetMoveWidth();
			//点击左右切换
			if(obj.prev) {
				clickPrevNoLoop(obj.prev);
			}
			if(obj.next) {
				clickNextNoLoop(obj.next)
			}
		} else {
			resetMoveEle();
			resetMoveMargin();
			//点击左右切换
			if(obj.prev) {
				clickPrevLoop(obj.prev);
			}
			if(obj.next) {
				clickNextLoop(obj.next)
			}
		}
		//循环时间
		if(obj.loopTime) {
			mo_loopTime = obj.loopTime;
		}
		//是否自动播放
		if(obj.auto) {
			autoMoveStart(mo_loopTime);
			moveAutoStop(mo_container);
		}
	};

	this.itemMoveto = function(index) {
		var index = parseInt(index);
		if(index > mo_item_len - 1 || index < 0) {
			return;
		}
		if(myObj.loop) {
			mo_index = index + mo_item_len / 2;
			moveTranslate(mo_index, function() {
				if(mo_index == mo_item_len - 1) {
					mo_index = mo_item_len / 2 - 1;
					mo_swipe.css({
						"margin-left": -mo_index * 100 + "%"
					})
				} else if(mo_index == mo_item_len / 2 - 1) {
					mo_index = mo_item_len - 1;
					mo_swipe.css({
						"margin-left": -mo_index * 100 + "%"
					})
				}
			});
		} else {
			mo_index = index;
			moveTranslate(mo_index);
		}
	};

	//判断轮播节点是否大于1
	function isMove(ele) {
		var len = ele.length;
		if(len <= 1) {
			return false;
		} else {
			return true;
		}
	}
	//获取轮播全部节点
	function getMoveElement(ele) {
		mo_container = ele;
		mo_swipe = mo_container.eq(0).children(".mo-swipe");
		mo_item = mo_swipe.children(".mo-item");
	}
	//重置轮播节点
	function resetMoveEle() {
		var newItem = mo_item.clone();
		mo_swipe.append(newItem);
		mo_item = mo_swipe.children();
		resetMoveWidth();
	}
	//重置节点宽高度
	function resetMoveWidth() {
		mo_item_len = mo_item.length;
		mo_swipe.css("width", 100 * mo_item_len + "%");
		mo_item.css("width", 100 / mo_item_len + "%");
	}
	//如果是循环轮播，则初始化轮播margin-left值
	function resetMoveMargin() {
		mo_swipe.css({
			"margin-left": -mo_item_len / 2 * 100 + "%"
		});
		mo_index = mo_item_len / 2;
	}
	//自动轮播
	function autoMoveStart(mo_loopTime) {
		mo_timer = setInterval(function() {
			mo_index++;
			moveTranslate(mo_index, function() {
				var l = mo_item_len - 1;
				if(mo_index == l) {
					mo_index = mo_item_len / 2 - 1;
					mo_swipe.css({
						"margin-left": -mo_index * 100 + "%"
					})
				}
			});
		}, mo_loopTime);
	}

	//非循环点击左右移动
	function clickPrevNoLoop(ele) {
		ele.click(function() {
			if(mo_index == 0) {
				return;
			}
			var isClick = ele.attr("isClick");
			if(isClick) {
				return;
			}
			ele.attr("isClick", "true");
			mo_index--;
			moveTranslate(mo_index, function() {
				ele.attr("isClick", "");
			});
		});
	}

	function clickNextNoLoop(ele) {
		ele.click(function() {
			if(mo_index == mo_item_len - 1) {
				return;
			}
			var isClick = ele.attr("isClick");
			if(isClick) {
				return;
			}
			ele.attr("isClick", "true");
			mo_index++;
			moveTranslate(mo_index, function() {
				ele.attr("isClick", "");
			});
		});
	}
	//循环点击左右移动
	function clickPrevLoop(ele) {
		ele.click(function() {
			var isClick = ele.attr("isClick");
			if(isClick) {
				return;
			}
			ele.attr("isClick", "true");
			mo_index--;
			moveTranslate(mo_index, function() {
				var l = mo_item_len / 2 - 2;
				if(mo_index == l) {
					mo_index = mo_item_len - 2;
					mo_swipe.css({
						"margin-left": -mo_index * 100 + "%"
					})
				}
				ele.attr("isClick", "");
			});
		});
	}

	function clickNextLoop(ele) {
		ele.click(function() {
			var isClick = ele.attr("isClick");
			if(isClick) {
				return;
			}
			ele.attr("isClick", "true");
			mo_index++;
			moveTranslate(mo_index, function() {
				var l = mo_item_len - 2;
				if(mo_index == l) {
					mo_index = mo_item_len / 2 - 2;
					mo_swipe.css({
						"margin-left": -mo_index * 100 + "%"
					})
				}
				ele.attr("isClick", "");
			});
		});
	}
	//鼠标移入轮播框，停止轮播
	function moveAutoStop(ele) {
		if(!ele) {
			return;
		}
		ele.hover(function() {
			if(mo_timer) {
				clearInterval(mo_timer);
			}
		}, function() {
			autoMoveStart(mo_loopTime);
		});
	}
	//轮播移动
	function moveTranslate(index, overFun) {
		mo_swipe.animate({
			"margin-left": -(index * 100) + "%"
		}, 400, function() {
			if(overFun) {
				overFun();
			}
		})
		moveEnd(index);
	}
	//监控轮播结束
	function moveEnd(index) {
		var relLen = mo_item_len/2;
		var relIndex = index - relLen;
		moveChangeIcon(relIndex);
	}
	//改变轮播icon
	function moveChangeIcon(index){
		var icon = mo_container.find(".mo-icon i");	
		if(icon.length == 0){
			return;
		}
		icon.removeClass("active");
		icon.eq(index).addClass("active");
	}
}