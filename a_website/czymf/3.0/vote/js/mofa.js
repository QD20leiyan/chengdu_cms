$(function() {
	var srf = $('meta[name="csrf-token"]').attr('content');

	function windowHidden() {
		$("html,body").css({
			"overflow": "hidden",
			"width": "100%",
			"height": "100%"
		});
	};

	function windowScroll() {
		$("html,body").css({
			"overflow": "visible",
			"width": "100%",
			"height": "auto"
		});
	};
	//弹窗关闭按钮
	$(".close").click(function() {
		$(this).parent().parent().hide();
		windowScroll();
	});
	//点击查看投票结果
	$(".section2 .look").click(function() {
		$(".vote_result").show();
		windowHidden();
		$(".vote_con").show();
	});
	//点击登录
	$(".section2 .pl_lofin").click(function() {
		var timestamp = Date.parse(new Date());
		var timeNew = 1520265600000;
		if(timestamp < timeNew){
			$(".login_board").show();
			windowHidden();
			$(".login_tel").show();
		} else {
			$(".alert2 p").text("投票活动已结束！");
			$(".alert2").show();
		}
	});
	//投票

	$(".section3").on('click', '.vote', function() {
		var timestamp = Date.parse(new Date());
		var timeNew = 1520265600000;
		console.log(timestamp);
		if(timestamp < timeNew) {
			var id = $(this).attr('data-id');
			var this_ = $(this);
			var my_phone = $('.login_id').text();
			if($('.vote').hasClass('active')) {
				$(".alert2").show();
				$(".alert2 p").text("您已投过票！");
			} else if(!my_phone) {
				$(".alert2").show();
				$(".alert2 p").text("你还未登录！");
			} else {
				$.ajax({
					url: '/verify/poll',
					type: 'POST',
					data: {
						'phone': my_phone,
						'id': id,
						"cms_csrf": srf
					},
					dataType: 'JSON',
					success: function(data) {
						if(data.status == 0) {
							$(".alert1").show();
							windowHidden();
							$(".alert1 p").text(data.msg);
							this_.addClass('active');
						} else {
							$(".alert1").show();
							//                      windowHidden();
							$(".alert1 p").text(data.msg);
						}
					}
				});
			}
			// $(this).addClass("active");
		} else {
			$(".alert2 p").text("投票活动已结束！");
			$(".alert2").show();
		}

	});

	//登录弹窗验证手机 
	$(".gain").click(function() {
		// $(this).attr("disabled","true");
		var my_phone = $(".login_board .tel").val();
		if(my_phone == "") {
			$(".alert1").show();
			windowHidden();
			return false;
		} else if(!/^1[345789]\d{9}$/.test(my_phone)) {
			$(".alert1").show();
			windowHidden();
			$(".alert1 p").text("请输入正确的手机号码");
			return false;
		} else {
			$(this).css("pointer-events", "none");
			$.ajax({
				url: '/verify/get-verify',
				type: 'POST',
				data: {
					'phone': my_phone,
					"cms_csrf": srf
				},
				dataType: 'JSON',
				success: function(data) {
					if(data.status == 0) {
						var $timeNum = 60;
						var $timeInter = setInterval(function() {
							$(".gain").addClass("disabled");
							$(".gain").text($timeNum + "s");
							$timeNum--;
							if($timeNum == 0) {
								$(".gain").css("pointer-events", 'auto');
								clearInterval($timeInter);

								$(".gain").text("获取验证码");
							}
						}, 1000);
					} else {
						alert(data.msg)
					}
				}
			})

		}
	});
	//登录弹窗验证验证码
	$(".login_board .next").click(function() {
		var my_code = $(".login_board .check_code").val();
		var my_phone = $(".login_board .tel").val();
		if(my_code == "") {
			$(".alert1").show();
			windowHidden();
			$(".alert1 p").text("请输入验证码");
			return false;
		}
		$.ajax({
			url: '/verify/vote',
			type: 'POST',
			data: {
				'phone': my_phone,
				'yzm': my_code,
				"cms_csrf": srf
			},
			dataType: 'JSON',
			success: function(data) {
				if(data.status == 0) {
					$(".login_board").hide();
					windowScroll();
					$(".check_board").show();
					windowHidden();
					$(".chech_con").show();
				} else {
					$(".alert1").show();
					windowHidden();
					$(".alert1 p").text(data.msg);
				}
			}
		})
	});
	//关闭弹窗
	$(".sure").click(function() {
		$(this).parent().parent().hide();
		windowScroll()
	});

	//进度条设置#progress宽度
	var max_poll = $('.vote_list').attr('data-id');
	var litems_poll = $(".poll");
	var litems_arrs = []
	for(var i = 0; i < litems_poll.length; i++) {
		litems_arrs.push(litems_poll.eq(i).text());
	}
	var Vote = {};
	Vote.ListShow = (function() {
		var longWidth;
		var percentArr = [];
		var shortWidth = [];
		var spanArr = [];

		/*初始化*/
		function init(o) {
			voteId = o.id;
			longWidth = o.width;
			percentArr = o.percent;
			shortWidth = calWidth();
			spanArr = findSpans();
		}
		/*根据百分比计每个算span的实际宽度*/
		function calWidth() {
			var arr = [];
			for(var i = 0; i < percentArr.length; i++) {
				// var tempLength=percentArr[i]*longWidth;
				var tempLength = percentArr[i] / longWidth;
				if(tempLength > 0) {
					tempLength = Number(tempLength.toFixed(2))
				} else {
					tempLength = 0;
				}
				arr.push(tempLength);
			}
			return arr;
		}
		/*将全部span存为一个数组*/
		function findSpans() {
			var litems = $("." + voteId).find(".progressbar");
			var arr = []
			for(var i = 0; i < litems.length; i++) {
				arr.push(litems[i].children[0]);
			}
			return arr;
		}
		/*每个span元素设置宽度*/
		function setWidth() {
			for(i = 0; i < percentArr.length; i++) {
				$(spanArr[i]).animate({
					width: shortWidth[i] * 4 + "rem"
				}, 'slow');
				$(spanArr[i]).css({
					'background-color': "#065449"
				});
			}
		}
		return {
			init: init,
			set: setWidth
		};
	})();

	/*调用*/
	Vote.ListShow.init({
		id: 'vote_list',
		width: max_poll,
		percent: litems_arrs,
	});
	Vote.ListShow.set();
	//判断题目是否答完
	$(".check_board .vote_btn").css("pointer-events", 'none');
	var i = 0;

	function checked() {
		if($(".rdo").is(":checked")) {
			i++;
			var anw1 = $('input:radio[name="result1"]:checked').val();
			var anw2 = $('input:radio[name="result2"]:checked').val();
			var anw3 = $('input:radio[name="result3"]:checked').val();
		}
		var my_phone = $(".login_board .tel").val();
		if(i >= 3 && anw1 == 2 && anw2 == 2 && anw3 == 2) {
			$(".check_board .nav2").addClass("on");
			$(".check_board .vote_btn").addClass("on");
			$(".check_board .vote_btn").css("pointer-events", 'auto');
			$(".vote_btn").click(function() {
				$.ajax({
					url: '/verify/open-vote',
					type: 'POST',
					data: {
						'phone': my_phone,
						"cms_csrf": srf
					},
					dataType: 'JSON',
					success: function(data) {
						if(data.status == 0) {
							$(this).parent().parent().hide();
							windowScroll();
							location.reload();
						}
					}
				})
			});
		} else {
			$(".check_board .vote_btn").css("pointer-events", 'none');
			$(".check_board .nav2").removeClass("on");
			$(".check_board .vote_btn").removeClass("on");
		}
	}
	//判断题目是否答完
	$(".rdo").click(function() {
		checked();
	})

});
