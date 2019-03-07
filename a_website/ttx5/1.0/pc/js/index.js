$(function(){  $.fn.miwflunbo=function(){
    return this.each(function(){
        var $oBox = $(this);
        var $oUl = $oBox.find('.content');
        var $aLi = $oUl.children('li');
        var len = $aLi.length;
        var aLiWidth = $aLi.outerWidth();
        $oUl.children('li').clone().appendTo($oUl);
        var nLen = ($oUl.children().length) * aLiWidth;
        $oUl.css('width',nLen+'px');
        var w = $oUl.outerWidth()/2;
        var iNow = 0;
        $oBox.find('.prevbtn').bind('click', function(event) {
          iNow --;
          tab();
        });
        $oBox.find('.nextbtn').bind('click', function(event) {
          next();
          tab();
        });
        function next(){
          iNow ++;
        }
        function tab(){
          moveToL($oUl,-$aLi.outerWidth()*iNow,1000);
        }
        var left = 0;
        function moveToL(obj,iTarget,time){
          var start = left;
          var dis = iTarget - start;
          var count = Math.round(time/30);
          var n = 0;
          clearInterval(obj.timer);
          obj.timer = setInterval(function(){
            n++;
            var a = 1 - n/count;
            var cur = start + dis*(1-a*a*a);
            left = cur;
            if(left < 0){
              obj.css('left', left%w + "px");
            } else {
              obj.css('left', (left%w-w)%w + "px");
            }
            if(n == count){
              clearInterval(obj.timer);
            }
          },30);
        }
      });
  };
$(function(){
  // 调用
  $('#t2,#indSecondtbanner').miwflunbo();
});

	//精美图片
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积） 
	var cov_length = $("#focus ul li").length; //获取焦点图个数 
	var index = 0;
	var picTimer;
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮 
	var btn = "<div class='btn'>";
	for (var i = 0; i < cov_length; i++) {
		btn += "<span></span>";
	}
	$("#focus").append(btn);
	//为小按钮添加鼠标滑入事件，以显示相应的内容 
	$("#focus .btn span").mouseover(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");
	
	//上一页按钮 
	$(".pre").click(function() {
		index -= 1;
		if (index == -1) {
			index = cov_length - 1;
		}
		showPics(index);
	});
	//下一页按钮 
	$(".next").click(function() {
		index += 1;
		if (index == cov_length) {
			index = 0;
		}
		showPics(index);
	});
	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度 
	$("#focus ul").css("width", sWidth * (cov_length));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放 
	$("#focus").hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if (index == cov_length) {
				index = 0;
			}
		}, 3000); //此4000代表自动播放的间隔，单位：毫秒 
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容 
	function showPics(index) { //普通切换 
		var nowLeft = -index * sWidth; //根据index值计算ul元素的left值 
		$("#focus ul").stop(true, false).animate({
			"left": nowLeft
		}, 300); //通过animate()调整ul元素滚动到计算出的position 
	
		$("#focus .btn span").stop(true, false).animate({
			"opacity": "0.7"
		}, 300).eq(index).stop(true, false).animate({
			"opacity": "1"
		}, 300); //为当前的按钮切换到选中的效果 
	}
	//新闻播放
	var myindex = 0;
	$tab_title_li = $(".tab_title ul li");
	$tab_title_li.hover(function() {
		$(this).addClass("select").siblings().removeClass("select");
		var index = $tab_title_li.index(this);
		var dis = index - myindex;
		var l = (-dis * 422);
		$(".tab_text").animate({
			left: '+=' + l
		});
		var j = (-dis * 112);
		$(".sprite-ico04").animate({
			right: '+=' + j
		});
		myindex = index;
	})
	
	
	//礼物
	var list = $('.content');
	var list01 = $('.content01');
	var prev = $('.turn_l');
	var next = $('.turn_r');
	var prev01 = $('.turn01_l');
	var next01 = $('.turn01_r');
	var len = 7;
	
	function animates(offset) {
		var left = parseInt(list.css('left')) + offset;
		if (offset > 0) {
			offset = '+=' + offset;
		} else {
			offset = '-=' + Math.abs(offset);
		}
		list.animate({
			'left': offset
		}, 300, function() {
			if (left > -307) {
				list.css('left', -307 * len);
			}
			if (left < (-307 * len)) {
				list.css('left', -307);
			}
		});
	}
	next.bind('click', function() {
		var l = list.css("left");
		if (l == -2149 + 'px') {
			return false;
		} else {
			animates(-307);
		}
	});
	
	prev.bind('click', function() {
		var l = list.css("left");
		if (l == 0 + 'px') {
			return false;
		} else {
			animates(307);
		}
	});
	
	function animates01(offset) {
		var left = parseInt(list01.css('left')) + offset;
		if (offset > 0) {
			offset = '+=' + offset;
		} else {
			offset = '-=' + Math.abs(offset);
		}
		list01.animate({
			'left': offset
		}, 300, function() {
			if (left > -307) {
				list01.css('left', -307 * len);
			}
			if (left < (-307 * len)) {
				list01.css('left', -307);
			}
		});
	}
	next01.bind('click', function() {
		var l = list.css("left");
		if (l == -2149 + 'px') {
			return false;
		} else {
			animates01(-307);
		}
	});
	
	prev01.bind('click', function() {
		var l = list.css("left");
		if (l == 0 + 'px') {
			return false;
		} else {
			animates01(307);
		}
	});	
	//newlist
	$(".new_title ul li").mouseover(function() {
			var index = $(this).index();
			$(this).addClass("new_on").siblings().removeClass("new_on");
			$(".sub_list").eq(index).css({
				"display": "block"
			}).siblings().css({
				"display": "none"
			});
	 })
	//下载
	$(".dl01").mouseover(function(){
		$(this).find("img").attr("src",'images/ios_hover.jpg');
	})
	$(".dl01").mouseout(function(){
		$(this).find("img").attr("src",'images/ios.jpg');
	})
	$(".dl02").mouseover(function(){
		$(this).find("img").attr("src",'images/anzh_hover.jpg');
	})
	$(".dl02").mouseout(function(){
		$(this).find("img").attr("src",'images/anzh.jpg');
	})
	$(".dl03").mouseover(function(){
		$(this).find("img").attr("src",'images/jint_hover.jpg');
	})
	$(".dl03").mouseout(function(){
		$(this).find("img").attr("src",'images/jint.jpg');
	})
	$(".dl04").mouseover(function(){
		$(this).find("img").attr("src",'images/luntan_hover.jpg');
	})
	$(".dl04").mouseout(function(){
		$(this).find("img").attr("src",'images/luntan.jpg');
	})
	$(".dl05").mouseover(function(){
		$(this).find("img").attr("src",'images/baidu_hover.jpg');
	})
	$(".dl05").mouseout(function(){
		$(this).find("img").attr("src",'images/baidu.jpg');
	})
	$(".dl06").mouseover(function(){
		$(this).find("img").attr("src",'images/sina_hover.jpg');
	})
	$(".dl06").mouseout(function(){
		$(this).find("img").attr("src",'images/sina.jpg');
	})
	//视频
	$(".tb_video").click(function(){
		$(".index_video").show();
		$('.index_video embed').trigger('play');
	})
})
