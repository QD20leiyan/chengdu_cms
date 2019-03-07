        var page = 1; //页数
		var id = $(".list_ul").attr("data-id"); //类型
		var ajaxUrl = '/commonMethod/ajax-get-list';
		getListFu();
		// window.onscroll = function() {
		// 	var winH = window.innerHeight; //屏幕高度
		// 	var allH = document.body.scrollHeight; //总高度
		// 	var topH = window.pageYOffset; //滚动高度
		// 	if((allH - (winH +
		// 			topH) < 10) && isScroll == 1) {
		// 		isScroll = 0;
		// 		$(".dropload-noData").html("数据加载中...")
		// 		getListFu();
		// 	}
		// }
        function loadpage() {
        	$.jqPaginator('.dropload-noData', {
            	pageSize:6,
            	totalCounts:5,
                visiblePages: 6,
                currentPage: 1,
                first: '',
                prev: '',
                next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
                last: '',
                page: '<li class="page" data-total="{{totalPages}}"><a href="javascript:;">{{page}}</a></li>',
                onPageChange: function (num, type) {
                	var page_n=$(".dropload-noData .page a").html();
                	var page_t=$(".dropload-noData .page").data("total");
                    console.log(page_n);
                    console.log(page_t);
                    $(".dropload-noData").append("<li class='page_num'>第" + page_n +"页</div><li class='page_total'>共" + page_t +"页</li>");
                    // getListFu();
                }
            });
        }
		function getListFu() {
			$.ajax({
				type: "get",
				url: ajaxUrl,
				data: {
					page: page++,
					id: id,
				},
				success: function(data) {
					var data = JSON.parse(data);
					if(data.status == 0 && data.msg.length > 0) {
						var result = '';
						for(var i = 0; i < data.msg.length; i++) {
							result += "<li><a href=" + data.msg[i].wapLinkUrl + "><i class='left_name'>"+ data.msg[i].name +"</i>"+
									  "<div class='right_list'><p>" + data.msg[i].title + "</p><span>" + data.msg[i].created_at + "</span></div></a>"+
									  "</li>"
						}
						$('.news_l ul').append(result);
						loadpage();
						// $(".dropload-noData").html("上滑加载更多<i></i>");
						// isScroll = 1;
					} else {
						loadpage();
					}
				},
				error: function(data) {
					console.log(data);
				}
			});
		}