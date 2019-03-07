var isLogin = false;
var isCan = false;
var link_url = window.location.href;
var link_top = false;
var link_str = "";
if(link_url.indexOf("diy") >= 0) {
	isCan = true;
	$(".module_top").show();
} else {
	isCan = false;
	$(".module_top").hide();
}
if(link_url.indexOf("/m/site/edit.html?diy=yes") >= 0) {
	$("#lo_wap").html("手机端");
} else {
	$("#lo_wap").html("电脑端");
}
var link_str = location.search;
$(".top").hover(function() {
	$(".pb_tc").show();
}, function() {
	$(".pb_tc").hide();
});
$(".kv").hover(function() {
	$(".pb_kv").show();
}, function() {
	$(".pb_kv").hide();
});
$(".content").hover(function() {
	$(".pb_con").show();
}, function() {
	$(".pb_con").hide();
});
$(".last").hover(function() {
	$(".pb_ts").show();
}, function() {
	$(".pb_ts").hide();
});
$(".m_news").hover(function() {
	$(".pb_news").show();
	$(".pb_kv").hide();
}, function() {
	$(".pb_news").hide();
	$(".pb_kv").show();
});
$(".pb_news").hover(function() {
	$(this).show();
	$(".pb_kv").hide();
}, function() {
	$(this).hide();
	$(".pb_kv").show();
});
$(".zj_footer").hover(function() {
	$(".pb_footer").show();
}, function() {
	$(".pb_footer").hide();
});
//点击切换是否新窗口打开
$("#bd_ul li,#se_ul li,.dh_ul li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
});
$(".img_ul").on("click", "li", function() {
	$(this).addClass("active");
	$(this).siblings().removeClass("active");
	$('input[name="nav_background_color"]').val('');
	$('.xs_color').css('background-color', '');
});
$(".img_ul").on("click", "li p", function() {
	var src = $(this).siblings("img").attr("src");
	$(".small_img img").attr("src", src);
	$(".big_img").show();
});
$("#lb_ul").on("click", "li p", function() {
	var src = $(this).siblings("img").attr("src");
	$(".small_img img").attr("src", src);
	$(".big_img").show();
});
$("#yl_tb").click(function() {
	$(".small_img img").attr("src", alt01 + "images/top.jpg");
	$(".big_img").show();
});
$("#yl_db").click(function() {
	$(".small_img img").attr("src", alt01 + "images/db.jpg");
	$(".big_img").show();
});
$(".big_img").click(function() {
	$(this).hide();
	$(this).find("p").hide();
});
$('#choose1').colpick({
	//				 flat:true,
	//				 layout:'hex',
	//				 submit:1,
	color: '',
	onSubmit: function(hsb, hex, rgb, el) {
		$('input[name="nav_background_color"]').val('#' + hex);
		$(el).colpickHide();
		$('.xs_color').css('background-color', '#' + hex);
		$("#dimg_ul li").removeClass("active");
	},
});
$('.xs_color').css('background-color', '');
$('#choose2').colpick({
	//				 flat:true,
	//				 layout:'hex',
	//				 submit:1,
	color: '',
	onSubmit: function(hsb, hex, rgb, el) {
		$('input[name="nav_background_hover_color"]').val('#' + hex);
		$(el).colpickHide();
		$('.xs_color01').css('background-color', '#' + hex);
	},
});
$('.xs_color01').css('background-color', '');
$('#choose_color_wap').colpick({
	//				 flat:true,
	//				 layout:'hex',
	//				 submit:1,
	color: '',
	onSubmit: function(hsb, hex, rgb, el) {
		$('input[name="nav_background_color_wap"]').val('#' + hex);
		$(el).colpickHide();
		$('.xs_color_wap01').css('background-color', '#' + hex);
	},
});
$('.xs_color_wap01').css('background-color', '');
$('#choose_color_bg').colpick({
	//				 flat:true,
	//				 layout:'hex',
	//				 submit:1,
	color: '',
	onSubmit: function(hsb, hex, rgb, el) {
		$('input[name="nav_background_color_bg"]').val('#' + hex);
		$(el).colpickHide();
		$('#xs_color_bg').css('background-color', '#' + hex);
	},
});
$('#xs_color_bg').css('background-color', '');
$('#choose_color_center').colpick({
	//				 flat:true,
	//				 layout:'hex',
	//				 submit:1,
	color: '',
	onSubmit: function(hsb, hex, rgb, el) {
		$('input[name="nav_background_color_center"]').val('#' + hex);
		$(el).colpickHide();
		$('#xs_color_center').css('background-color', '#' + hex);
	},
});
$('#xs_color_center').css('background-color', '');

function getIsLogin() {
	$.ajax({
		url: alt + "moduleapi/login/get-user-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			img_url = data.data.imgapi;
			if(data.status == 0) {
				isLogin = true;
				$(".after_denglu").text(data.data.admin_name).addClass("active");
				$(".before_denglu").removeClass("active");
				var html = "";
				for(var i in data.data.theme_list) {
					if(data.data.theme_list[i].id == 14 || data.data.theme_list[i].id == 15 || data.data.theme_list[i].id == 16) {
						html += '<li data-id=' + data.data.theme_list[i].id + '><a href="javascript:;"><p>' + data.data.theme_list[i].tplName + '</p></a></li>'
					}
				}
				$("#mu_ul").html(null).append(html);
				// 富文本编辑器
				// 关闭粘贴内容中的样式
				editor.customConfig.pasteFilterStyle = false;
				editor.customConfig.uploadImgServer = img_url;
				editor.customConfig.uploadFileName = 'file';
				// editor.customConfig.uploadImgShowBase64 = true;
				// editor.customConfig.debug = true;
				editor.customConfig.menus = [
					'head', // 标题
					'bold', // 粗体
					'fontSize', // 字号
					'fontName', // 字体
					'italic', // 斜体
					'underline', // 下划线
					'strikeThrough', // 删除线
					'foreColor', // 文字颜色
					'backColor', // 背景颜色
					'link', // 插入链接
					'list', // 列表
					'justify', // 对齐方式
					'quote', // 引用
					'emoticon', // 表情
					'image', // 插入图片
					'table', // 表格
					// 'video',  // 插入视频
					'code', // 插入代码
					'undo', // 撤销
					'redo' // 重复
				];
				editor.customConfig.showLinkImg = false; // 隐藏“网络图片”tab
				editor.customConfig.uploadImgTimeout = 50000;
				editor.customConfig.uploadImgHooks = {
					before: function(xhr, editor, files) {

					},
					success: function(xhr, editor, result) {

					},
					fail: function(xhr, editor, result) {

					},
					error: function(xhr, editor) {

					},
					timeout: function(xhr, editor) {

					},
					customInsert: function(insertImg, result, editor) {
						var url = result.cdn_url
						insertImg(url);
					}
				}
				editor.create();
			} else {
				isLogin = false;
				$(".tc_login").show();
			}
		},
		error: function() {}
	});
}

function imgUrl(param, e) {
	var result = e.currentTarget.files[0];
	var oData = new FormData();
	var content = $(param);
	oData.append("file", result);
	$.ajax({
		url: img_url,
		type: 'POST',
		cache: false, //不设置缓存
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		data: oData,
		dataType: 'json',
		success: function(data) {
			var html = "";
			html += '<li data-id=' + data.id + ' data-title=' + data.title + '><img src=' + data.cdn_url + ' /><i class="gou"></i><p>预览</p></li>'
			$(param).prepend(html);
			$(param).find("li").removeClass("active");
			$(param).find("li:nth-child(1)").addClass("active");
		},
		error: function() {
			console.log("Error！");
		}
	});
}
$("#d_bg_file").on('change', function(e) {
	imgUrl("#d_bg_ul", e);
});
$("#w_bg_file").on('change', function(e) {
	imgUrl("#wx_ul", e);
});
$("#we_file").on('change', function(e) {
	imgUrl("#ew_ul", e);
});
$("#q1_file").on('change', function(e) {
	imgUrl("#q1_ul", e);
});
$("#q2_file").on('change', function(e) {
	imgUrl("#q2_ul", e);
});
$("#sn_file").on('change', function(e) {
	imgUrl("#sn_ul", e);
});
$("#ba_file").on('change', function(e) {
	imgUrl("#ba_ul", e);
});
$("#file").on('change', function(e) {
	imgUrl("#img_ul", e);
});
$("#dg_file").on('change', function(e) {
	imgUrl("#gimg_ul", e);
});
$("#ew_file").on('change', function(e) {
	imgUrl("#aaimg_ul", e);
});
$("#ios_file").on('change', function(e) {
	imgUrl("#iosimg_ul", e);
});
$("#and_file").on('change', function(e) {
	imgUrl("#andimg_ul", e);
});
$("#tap_file").on('change', function(e) {
	imgUrl("#tapimg_ul", e);
});
$("#put_dh").on('change', function(e) {
	var result = e.currentTarget.files[0];
	var oData = new FormData();
	var content = $('#dimg_ul');
	oData.append("file", result);
	$.ajax({
		url: img_url,
		type: 'POST',
		cache: false, //不设置缓存
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		data: oData,
		dataType: 'json',
		success: function(data) {
			var html = "";
			html += '<li data-id=' + data.id + ' data-title=' + data.title + '><img src=' + data.cdn_url + ' /><i class="gou"></i><p>预览</p></li>'
			$("#dimg_ul").prepend(html);
			$("#dimg_ul li").removeClass("active");
			$("#dimg_ul li:nth-child(1)").addClass("active");
			$('.xs_color').css('background-color', '');
			$('input[name="nav_background_color"]').val("");
		},
		error: function() {
			console.log("Error！");
		}
	});
});
$("#wx_file").on('change', function(e) {
	imgUrl("#cimg_ul", e);
});
$("#ewm_file").on('change', function(e) {
	imgUrl("#aimg_ul", e);
});
$("#xn_file").on('change', function(e) {
	imgUrl("#eimg_ul", e);
});
$("#bd_file").on('change', function(e) {
	imgUrl("#fimg_ul", e);
});
$("#kv_file").on('change', function(e) {
	imgUrl("#qimg_ul", e);
});
$("#video_file").on('change', function(e) {
	imgUrl("#wimg_ul", e);
});
$("#yy_file").on('change', function(e) {
	imgUrl("#oimg_ul", e);
	$("#oimg_ul li").each(function(i, n) {
		if(i > 1) {
			$(n).hide();
		}
	});
});
$("#bg_file").on('change', function(e) {
	imgUrl("#pimg_ul", e);
});
$("#tj_file").on('change', function(e) {
	imgUrl("#kimg_ul", e);
});
$("#x_file").on('change', function(e) {
	imgUrl("#h_icon", e);
	$("#h_icon li").each(function(i, n) {
		if(i > 0) {
			$(n).hide();
		}
	});
});
$("#w_file").on('change', function(e) {
	imgUrl("#y_icon", e);
	$("#y_icon li").each(function(i, n) {
		if(i > 0) {
			$(n).hide();
		}
	});
});
$("#i_file").on('change', function(e) {
	imgUrl("#nimg_ul", e);
});
$("#m_file").on('change', function(e) {
	imgUrl("#rimg_ul", e);
});
$("#j_bg").on('change', function(e) {
	imgUrl("#zimg_ul", e);
});
$("#j_tc").on('change', function(e) {
	imgUrl("#ximg_ul", e);
});
$("#fr_file").on('change', function(e) {
	imgUrl("#fi_ul", e);
});
$("#se_file").on('change', function(e) {
	imgUrl("#si_ul", e);
});
$("#th_file").on('change', function(e) {
	imgUrl("#th_ul", e);
});
$("#fo_file").on('change', function(e) {
	imgUrl("#fo_ul", e);
});
$("#fi_file").on('change', function(e) {
	imgUrl("#ve_ul", e);
});
$("#tit_file").on('change', function(e) {
	imgUrl("#d_ul", e);
});
$("#tit1_file").on('change', function(e) {
	imgUrl("#s_ul", e);
});
$("#tit2_file").on('change', function(e) {
	imgUrl("#t_ul", e);
});
$("#te_file").on('change', function(e) {
	imgUrl("#te_ul", e);
});
$("#kd_file").on('change', function(e) {
	imgUrl("#kdimg_ul", e);
});
$("#wtap_file").on('change', function(e) {
	imgUrl("#wapimg_ul", e);
});
$("#news_vd_file").on('change', function(e) {
	var result = e.currentTarget.files[0];
	var oData = new FormData();
	var content = $("news_vd_ul");
	oData.append("file", result);
	$.ajax({
		url: img_url,
		type: 'POST',
		cache: false, //不设置缓存
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		data: oData,
		dataType: 'json',
		success: function(data) {
			var html = "";
			html += '<li data-id=' + data.id + ' data-title=' + data.title + '><img src=' + data.cdn_url + ' /><i class="gou"></i><p>预览</p></li>'
			$("#news_vd_ul").html(null).append(html);
			$("#news_vd_ul").find("li").removeClass("active");
			$("#news_vd_ul").find("li:nth-child(1)").addClass("active");
		},
		error: function() {
			console.log("Error！");
		}
	});
});
$("#bj_img_file").on('change', function(e) {
	var result = e.currentTarget.files[0];
	var oData = new FormData();
	var content = $("bj_img_ul");
	oData.append("file", result);
	$.ajax({
		url: img_url,
		type: 'POST',
		cache: false, //不设置缓存
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		data: oData,
		dataType: 'json',
		success: function(data) {
			var html = "";
			html += '<li data-id=' + data.id + ' data-title=' + data.title + '><img src=' + data.cdn_url + ' /><i class="gou"></i><p>预览</p></li>'
			$("#bj_img_ul").html(null).append(html);
			$("#bj_img_ul").find("li").removeClass("active");
			$("#bj_img_ul").find("li:nth-child(1)").addClass("active");
		},
		error: function() {
			console.log("Error！");
		}
	});
});
$("#ad_file").on('change', function(e) {
	var result = e.currentTarget.files[0];
	var oData = new FormData();
	var content = $('#lb_ul');
	oData.append("file", result);
	$.ajax({
		url: img_url,
		type: 'POST',
		cache: false, //不设置缓存
		processData: false, // 不处理数据
		contentType: false, // 不设置内容类型
		data: oData,
		dataType: 'json',
		success: function(data) {
			title4_url = data.cdn_url;
			title4_title = data.title;
			var html = "";
			html += '<li data-id=' + data.id + '><img src=' + data.cdn_url + ' /><i class="gou"></i><p>预览</p></li>'
			$("#lb_ul").prepend(html);
			$("#lb_ul li:nth-child(1)").addClass("active");
		},
		error: function() {
			console.log("Error！");
		}
	});
});
$("#li_file").on('change', function(e) {
	imgUrl("#pa_ul", e);
});
$("#bj_video_bg").on('change', function(e) {
	imgUrl("#ad_v_bg", e);
});
$("#news_bg_file").on('change', function(e) {
	imgUrl("#newsimg_ul", e);
});
//关闭弹窗
$(".t_close").click(function() {
	$(this).parent().parent().parent().hide();
	$(".set-control").hide();
});
//获取导航icon及标题
function getIcon() {
	$.ajax({
		url: alt + "moduleapi/nav/get-zd-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data.info.website_logo_img.img_log) {
				html += '<li data-id=' + data.data.info.website_logo_img.img_log[i].id + ' data-title=' + data.data.info.website_logo_img.img_log[i].name + '><img src=' + data.data.info.website_logo_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			}
			var str = '<li data-id=' + data.data.info.website_logo_img.id + ' data-title=' + data.data.info.website_logo_img.key + '><img src=' + data.data.info.website_logo_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#img_ul").html(null).append(str);
				$("#img_ul li").removeClass("active");
				$("#img_ul li:nth-child(1)").addClass("active");
			} else {
				$("#img_ul").html(null).append(html);
				$("#img_ul li").removeClass("active");
				$("#img_ul li:nth-child(1)").addClass("active");
			}
			$("#iframe").contents().find(".icon").attr("src", data.data.info.website_logo_img.value);
			$("#iframe").contents().find("#txt01").text(data.data.info.website_title.value);
			$("#iframe").contents().find("#txt02").text(data.data.info.website_sub_title.value);
			$("#iframe").contents().find("#txt01").attr("style", data.data.info.website_title_style.value);
			$("#iframe").contents().find("#txt02").attr("style", data.data.info.website_sub_title_style.value);
			$("#game_title").val(data.data.info.website_title.value);
			$("#game_title").attr("style", data.data.info.website_title_style.value);
			$("#game_sub_title").val(data.data.info.website_sub_title.value);
			$("#game_sub_title").attr("style", data.data.info.website_sub_title_style.value);
		},
		error: function() {

		}
	});
}
$("#t_sure").click(function() {
	var website_title = $("#game_title").val();
	var website_sub_title = $("#game_sub_title").val();
	if(website_title.length > 10) {
		alert("站点名不能超过10个字符");
		return;
	}
	if(website_sub_title.length > 15) {
		alert("游戏定位不能超过15个字符");
		return;
	}
	$.ajax({
		url: alt + "moduleapi/nav/update-zd",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"website_title": website_title,
			"website_title_style": $("#game_title").attr("style"),
			"website_sub_title": website_sub_title,
			"website_sub_title_style": $("#game_sub_title").attr("style"),
			"website_logo_img": $("#img_ul li.active img").attr("src"),
			"website_logo_img_log[0][name]": $("#img_ul li.active").attr("data-title"),
			"website_logo_img_log[0][img]": $("#img_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getIcon();
			}
		},
		error: function() {

		}
	});
});
//获取导航背景图及颜色
function getDh() {
	$.ajax({
		url: alt + "moduleapi/nav/get-background-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			var str = "";
			for(var i in data.data.info.nav_background_img.img_log) {
				html += '<li data-id=' + data.data.info.nav_background_img.img_log[i].id + ' data-title=' + data.data.info.nav_background_img.img_log[i].name + '><img src=' + data.data.info.nav_background_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			}
			if(data.data.info.nav_background_img.value == "" || data.data.info.nav_background_img.value == undefined) {
				$("#iframe").contents().find("#header").css("background", data.data.info.nav_background_color.value);
				$('.xs_color').css('background-color', data.data.info.nav_background_color.value);
				$('input[name="nav_background_color"]').val(data.data.info.nav_background_color.value);
			} else {
				str += '<li data-id=' + data.data.info.nav_background_img.id + ' data-title=' + data.data.info.nav_background_img.key + '><img src=' + data.data.info.nav_background_img.value + ' /><i class="gou"></i><p>预览</p></li>'
				$("#iframe").contents().find("#header").css({
					"background": 'url(' + data.data.info.nav_background_img.value + ')',
					"background-repeat": "no-repeat",
					"background-position": "center",
					"background-size": "100% 100%"
				});
			}
			if(html == "" || html == undefined) {
				$("#dimg_ul").html(null).append(str);
				$("#dimg_ul li").removeClass("active");
				$("#dimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#dimg_ul").html(null).append(html);
				$("#dimg_ul li").removeClass("active");
				$("#dimg_ul li:nth-child(1)").addClass("active");
			}
			if(data.data.info.nav_background_img.value == "" || data.data.info.nav_background_img.value == undefined) {
				$("#dimg_ul li:nth-child(1)").removeClass("active");
			}
		},
		error: function() {

		}
	});
}
$("#d_sure").click(function() {
	var src = $("#dimg_ul li.active img").attr("src");
	var title = $("#dimg_ul li.active").attr("data-title");
	var color = $('input[name="nav_background_color"]').val();
	var hcolor = $('input[name="nav_background_hover_color"]').val();
	if(src == undefined || src == "") {
		src = "undefined";
	}
	if(title == undefined || title == "") {
		title = "undefined";
	}
	if(color == undefined || color == "") {
		color = "undefined";
	}
	if(hcolor == undefined || hcolor == "") {
		hcolor = "undefined";
	}
	$.ajax({
		url: alt + "moduleapi/nav/update-background",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"nav_background_img": src,
			"nav_background_img_log[0][name]": title,
			"nav_background_img_log[0][img]": src,
			"nav_background_color": color,
			"nav_background_hover_color": hcolor
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getDh();
			}
		},
		error: function() {

		}
	});
});
//获取导航栏目信息
function getMenu() {
	$.ajax({
		url: alt + "moduleapi/nav/get-nav-menu-list",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			var bhtml = "";
			for(var i in data.data.list) {
				html += '<li data-dh="bj" data-id=' + data.data.list[i].id + ' data-href=' + data.data.list[i].target + ' data-url="' + data.data.list[i].url + '"><span>' + data.data.list[i].name + '</span><em class="bj">编辑</em></li>';
				bhtml += '<li data-id=' + data.data.list[i].id + ' data-href=' + data.data.list[i].target + '>' +
					'<a style=' + data.data.list[i].style + ' href=' + data.data.list[i].url + ' target=' + (data.data.list[i].target == 0 ? '_self' : '_bank') + '>' + data.data.list[i].name + '</a>' +
					'</li>'
			}
			$(".nav_box .nav_div").html(null).append(html);
			$(".top_ul").html(null).append(bhtml);
			$(".tab_select").html(null).append(bhtml);
			$(".nav_div li").click(function() {
				var index = $(this).index();
				$("#dh_bj>div").eq(index).addClass("active").siblings().removeClass("active");
				$("#dh_bj").show();
			});
			$("#menu1").val($(".nav_div li:nth-child(1) span").text());
			$("#url1").attr("data-id", $(".nav_div li:nth-child(1)").attr("data-id"))
			$("#url1").val($(".nav_div li:nth-child(1)").attr("data-url"));
			$("#menu1").attr("style", $(".top_ul li:nth-child(1) a").attr("style"));
			$("#menu2").val($(".nav_div li:nth-child(2) span").text());
			$("#menu2").attr("style", $(".top_ul li:nth-child(2) a").attr("style"));
			$("#menu2").attr("data-id", $(".nav_div li:nth-child(2)").attr("data-id"));
			$("#menu3").val($(".nav_div li:nth-child(3) span").text());
			$("#menu3").attr("style", $(".top_ul li:nth-child(3) a").attr("style"));
			$("#url3").val($(".nav_div li:nth-child(3)").attr("data-url"));
			$("#url3").attr("data-id", $(".nav_div li:nth-child(3)").attr("data-id"));
			if($(".nav_div li:nth-child(1)").attr("data-href") == 1) {
				$("#dh1_ul li:nth-child(2)").addClass("active");
				$("#dh1_ul li:nth-child(1)").removeClass("active");
			} else {
				$("#dh1_ul li:nth-child(2)").removeClass("active");
				$("#dh1_ul li:nth-child(1)").addClass("active");
			}
			if($(".nav_div li:nth-child(2)").attr("data-href") == 1) {
				$("#dh2_ul li:nth-child(2)").addClass("active");
				$("#dh2_ul li:nth-child(1)").removeClass("active");
			} else {
				$("#dh2_ul li:nth-child(2)").removeClass("active");
				$("#dh2_ul li:nth-child(1)").addClass("active");
			}
			if($(".nav_div li:nth-child(3)").attr("data-href") == 1) {
				$("#dh3_ul li:nth-child(2)").addClass("active");
				$("#dh3_ul li:nth-child(1)").removeClass("active");
			} else {
				$("#dh3_ul li:nth-child(2)").removeClass("active");
				$("#dh3_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击编辑栏目信息
$("#menu1_sure").click(function() {
	if($("#menu1").val().length > 4) {
		alert("栏目名称不能超过4个字");
		return;
	}
	$.ajax({
		url: alt + "moduleapi/nav/update-nav-menu",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"id": $("#url1").attr("data-id"),
			"name": $("#menu1").val(),
			"url": $("#url1").val(),
			"target": $("#dh1_ul li.active").attr("data-href"),
			"style": $("#menu1").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getMenu();
			}
		},
		error: function() {

		}
	});
});
//点击编辑栏目信息
$("#menu2_sure").click(function() {
	if($("#menu2").val().length > 4) {
		alert("栏目名称过长");
		return;
	}
	$.ajax({
		url: alt + "moduleapi/nav/update-nav-menu",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"id": $("#menu2").attr("data-id"),
			"name": $("#menu2").val(),
			"target": $("#dh2_ul li.active").attr("data-href"),
			"style": $("#menu2").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getMenu();
			}
		},
		error: function() {

		}
	});
});
//点击编辑栏目信息
$("#menu3_sure").click(function() {
	if($("#menu3").val().length > 4) {
		alert("栏目名称过长");
		return;
	}
	$.ajax({
		url: alt + "moduleapi/nav/update-nav-menu",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"id": $("#url3").attr("data-id"),
			"name": $("#menu3").val(),
			"url": $("#url3").val(),
			"target": $("#dh3_ul li.active").attr("data-href"),
			"style": $("#menu3").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getMenu();
			}
		},
		error: function() {

		}
	});
});
$(".b_table li[data-type] .bj").click(function() {
	var index = $(this).parent().index() - 1;
	$("#dh_tc").show();
	$("#dh_tc>div").eq(index).addClass("active").siblings().removeClass("active");
});
//$(".nav_box li[data-dh] .bj").click(function() {
//	var index = $(this).parent().index() - 1;
//	$("#dh_bj").show();
//	$("#dh_bj>div").eq(index).addClass("active").siblings().removeClass("active");
//});
$("#cl_sure").click(function() {
	$(".nav_tc").hide();
});
//点击查看自媒体大图
$(".b_table li[data-type] p").click(function() {
	var src = $(this).siblings("img").attr("src");
	$(".small_img img").attr("src", src);
	$(".big_img").show();
});
//获取自媒体信息
function getMedia() {
	$.ajax({
		url: alt + "moduleapi/nav/get-media-list",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#wx_ex").attr("src", data.data.list.media_wechat_icon.value);
			$("#w_icon").attr("src", data.data.list.media_wechat_img.value);
			$("#xl_url").text(data.data.list.media_sina_url.value);
			$("#xl_ex").attr("src", data.data.list.media_sina_icon.value);
			$("#baidu_url").text(data.data.list.media_baidu_url.value);
			$("#bd_ex").attr("src", data.data.list.media_baidu_icon.value);
		},
		error: function() {

		}
	});
}
//点击获取微信icon
function getWicon() {
	$.ajax({
		url: alt + "moduleapi/nav/get-media-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subGroup": "wechat"
		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data.info.media_wechat_icon.img_log) {
				html += '<li data-id=' + data.data.info.media_wechat_icon.img_log[i].id + ' data-title=' + data.data.info.media_wechat_icon.img_log[i].name + '><img src=' + data.data.info.media_wechat_icon.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.media_wechat_icon.id + ' data-title=' + data.data.info.media_wechat_icon.key + '><img src=' + data.data.info.media_wechat_icon.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#cimg_ul").html(null).append(str);
				$("#cimg_ul li").removeClass("active");
				$("#cimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#cimg_ul").html(null).append(html);
				$("#cimg_ul li").removeClass("active");
				$("#cimg_ul li:nth-child(1)").addClass("active");
			}
			var chtml = "";
			for(var i in data.data.info.media_wechat_img.img_log) {
				chtml += '<li data-id=' + data.data.info.media_wechat_img.img_log[i].id + ' data-title=' + data.data.info.media_wechat_img.img_log[i].name + '><img src=' + data.data.info.media_wechat_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var cstr = '<li data-id=' + data.data.info.media_wechat_img.id + ' data-title=' + data.data.info.media_wechat_img.key + '><img src=' + data.data.info.media_wechat_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#aimg_ul").html(null).append(cstr);
				$("#aimg_ul li").removeClass("active");
				$("#aimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#aimg_ul").html(null).append(chtml);
				$("#aimg_ul li").removeClass("active");
				$("#aimg_ul li:nth-child(1)").addClass("active");
			}
			$("#media_weixin").css({
				"background": 'url(' + data.data.info.media_wechat_icon.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "top"
			});
			$(".fl_wx img").attr("src", data.data.info.media_wechat_img.value);

		},
		error: function() {

		}
	});
};
//点击确定编辑微信
$("#wx_sure").click(function() {
	$.ajax({
		url: alt + "moduleapi/nav/update-media",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subGroup": "wechat",
			"media_wechat_icon": $("#cimg_ul li.active img").attr("src"),
			"media_wechat_icon_log[0][name]": $("#cimg_ul li.active").attr("data-title"),
			"media_wechat_icon_log[0][img]": $("#cimg_ul li.active img").attr("src"),
			"media_wechat_img": $("#aimg_ul li.active img").attr("src"),
			"media_wechat_img_log[0][name]": $("#aimg_ul li.active").attr("data-title"),
			"media_wechat_img_log[0][img]": $("#aimg_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				$("#dh_tc").hide();
				getWicon();
				getMedia();
			}
		},
		error: function() {

		}
	});
});
//点击获取新浪微博信息
function getWeibo() {
	$.ajax({
		url: alt + "moduleapi/nav/get-media-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subGroup": "sina"
		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data.info.media_sina_icon.img_log) {
				html += '<li data-id=' + data.data.info.media_sina_icon.img_log[i].id + ' data-title=' + data.data.info.media_sina_icon.img_log[i].name + '><img src=' + data.data.info.media_sina_icon.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.media_sina_icon.id + ' data-title=' + data.data.info.media_sina_icon.key + '><img src=' + data.data.info.media_sina_icon.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#eimg_ul").html(null).append(str);
				$("#eimg_ul li").removeClass("active");
				$("#eimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#eimg_ul").html(null).append(html);
				$("#eimg_ul li").removeClass("active");
				$("#eimg_ul li:nth-child(1)").addClass("active");
			}
			$("#xn_url").val(data.data.info.media_sina_url.value);
			if(data.data.info.media_sina_target.value == 1) {
				$("#media_sina").attr("target", "_blank");
				$("#se_ul li:nth-child(2)").addClass("active");
				$("#se_ul li:nth-child(1)").removeClass("active");
			} else {
				$("#media_sina").attr("target", "_self");
				$("#se_ul li:nth-child(1)").addClass("active");
				$("#se_ul li:nth-child(2)").removeClass("active");
			}
			$("#media_sina").attr("href", data.data.info.media_sina_url.value);
			$("#media_sina").css({
				"background": 'url(' + data.data.info.media_sina_icon.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "top"
			});
		},
		error: function() {

		}
	});
};
//点击确定编辑微博信息
$("#xn_sure").click(function() {
	var target = $("#se_ul li.active").attr("data-href");
	var x_url = $("#xn_url").val();
	$.ajax({
		url: alt + "moduleapi/nav/update-media",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subGroup": "sina",
			"media_sina_icon": $("#eimg_ul li.active img").attr("src"),
			"media_sina_icon_log[0][name]": $("#eimg_ul li.active").attr("data-title"),
			"media_sina_icon_log[0][img]": $("#eimg_ul li.active img").attr("src"),
			"media_sina_target": target,
			"media_sina_url": x_url
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				$("#dh_tc").hide();
				getWeibo();
			}
		},
		error: function() {

		}
	});
});
//获取百度贴吧信息
function getTieba() {
	$.ajax({
		url: alt + "moduleapi/nav/get-media-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subGroup": "baidu"
		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data.info.media_baidu_icon.img_log) {
				html += '<li data-id=' + data.data.info.media_baidu_icon.img_log[i].id + ' data-title=' + data.data.info.media_baidu_icon.img_log[i].name + '><img src=' + data.data.info.media_baidu_icon.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.media_baidu_icon.id + ' data-title=' + data.data.info.media_baidu_icon.key + '><img src=' + data.data.info.media_baidu_icon.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#fimg_ul").html(null).append(str);
				$("#fimg_ul li").removeClass("active");
				$("#fimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#fimg_ul").html(null).append(html);
				$("#fimg_ul li").removeClass("active");
				$("#fimg_ul li:nth-child(1)").addClass("active");
			}
			$("#bd_url").val(data.data.info.media_baidu_url.value);
			if(data.data.info.media_baidu_target.value == 1) {
				$("#media_baidu").attr("target", "_blank");
				$("#bd_ul li:nth-child(2)").addClass("active");
				$("#bd_ul li:nth-child(1)").removeClass("active");
			} else {
				$("#media_baidu").attr("target", "_self");
				$("#bd_ul li:nth-child(1)").addClass("active");
				$("#bd_ul li:nth-child(2)").removeClass("active");
			}
			$("#media_baidu").attr("href", data.data.info.media_baidu_url.value);
			$("#media_baidu").css({
				"background": 'url(' + data.data.info.media_baidu_icon.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "top"
			});
		},
		error: function() {

		}
	});
};
//点击确定编辑百度信息
$("#bd_sure").click(function() {
	var target = $("#bd_ul li.active").attr("data-href");
	var x_url = $("#bd_url").val();
	$.ajax({
		url: alt + "moduleapi/nav/update-media",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subGroup": "baidu",
			"media_baidu_icon": $("#fimg_ul li.active img").attr("src"),
			"media_baidu_icon_log[0][name]": $("#fimg_ul li.active").attr("data-title"),
			"media_baidu_icon_log[0][img]": $("#fimg_ul li.active img").attr("src"),
			"media_baidu_target": target,
			"media_baidu_url": x_url
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				$("#dh_tc").hide();
				getTieba();
			}
		},
		error: function() {

		}
	});
});
//获取wap预约按钮信息
function getWyy() {
	var nav = ["nav"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: nav,
		},
		success: function(respon) {
			var data = eval(respon);
			if(data.data.nav.info.nav_button_color_wap.value == "" || data.data.nav.info.nav_button_color_wap.value == undefined) {
				console.log(1);
			} else {
				$("#iframe").contents().find(".down_btn").attr("style", data.data.nav.info.nav_button_title_style_wap.value);
				$("#iframe").contents().find(".down_btn").css("background-color", data.data.nav.info.nav_button_color_wap.value);
				$("#iframe").contents().find(".down_btn").text(data.data.nav.info.nav_button_title_wap.value);
				$('.xs_color_wap01').css('background-color', data.data.nav.info.nav_button_color_wap.value);
				$('input[name="nav_background_color_wap"]').val(data.data.nav.info.nav_button_color_wap.value);
				$("#iframe").contents().find(".nav_top").css("background-color", data.data.nav.info.nav_more_button_background_color_wap.value);
				$("#iframe").contents().find(".nav_span").css("background-color", data.data.nav.info.nav_more_button_middel_color_wap.value);
				$('#xs_color_bg').css('background-color', data.data.nav.info.nav_more_button_background_color_wap.value);
				$('input[name="nav_background_color_bg"]').val(data.data.nav.info.nav_more_button_background_color_wap.value);
				$('#xs_color_center').css('background-color', data.data.nav.info.nav_more_button_middel_color_wap.value);
				$('input[name="nav_background_color_center"]').val(data.data.nav.info.nav_more_button_middel_color_wap.value);
			}
			$("#btt_txt").val(data.data.nav.info.nav_button_title_wap.value);
		},
		error: function() {

		}
	});
}
//点击确定编辑wap顶部预约按钮
$("#wap_yy").click(function() {
	var length = $("#btt_txt").val();
	if(length.length > 4) {
		alert("文字不能超过4个字！")
		return;
	}
	var nav = ["nav"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"nav_button_title_wap": $("#btt_txt").val(),
			"nav_button_title_style_wap": $("#btt_txt").attr("style"),
			"nav_button_color_wap": $('input[name="nav_background_color_wap"]').val(),
			group: nav
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getWyy();
			}
		},
		error: function() {

		}
	});
});
//点击编辑wap顶部更多按钮
$("#wap_more").click(function() {
	var nav = ["nav"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"nav_more_button_background_color_wap": $('input[name="nav_background_color_bg"]').val(),
			"nav_more_button_middel_color_wap": $('input[name="nav_background_color_center"]').val(),
			group: nav
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getWyy();
			}
		},
		error: function() {

		}
	});
});
//获取KV信息
function getKv() {
	var kvbackground = ["kv"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: kvbackground,
		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".top").css({
				"background": 'url(' + data.data.kv.info.kv_background_img_wap.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			var html = "";
			for(var i in data.data.kv.info.kv_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.kv.info.kv_background_img_wap.img_log[i].id + ' data-title=' + data.data.kv.info.kv_background_img_wap.img_log[i].name + '><img src=' + data.data.kv.info.kv_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.kv.info.kv_background_img_wap.id + ' data-title=' + data.data.kv.info.kv_background_img_wap.key + '><img src=' + data.data.kv.info.kv_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#qimg_ul").html(null).append(str);
				$("#qimg_ul li").removeClass("active");
				$("#qimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#qimg_ul").html(null).append(html);
				$("#qimg_ul li").removeClass("active");
				$("#qimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定编辑kv信息
$("#kv_sure").click(function() {
	var kvbackground = ["kv"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"kv_background_img_wap": $("#qimg_ul li.active img").attr("src"),
			"kv_background_img_wap_log[0][name]": $("#qimg_ul li.active").attr("data-title"),
			"kv_background_img_wap_log[0][img]": $("#qimg_ul li.active img").attr("src"),
			group: kvbackground
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getKv();
			}
		},
		error: function() {

		}
	});
});
//获取视频按钮信息
function getVideo() {
	$.ajax({
		url: alt + "moduleapi/kv/get-video-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".videoBtn").find("img").attr("src", data.data.info.kv_video_button_img.value);
			$("#iframe").contents().find(".videoBtn").attr("data-url", data.data.info.kv_video_url.value);
			$("#video_url").val(data.data.info.kv_video_url.value);
			var html = "";
			for(var i in data.data.info.kv_video_button_img.img_log) {
				html += '<li data-id=' + data.data.info.kv_video_button_img.img_log[i].id + ' data-title=' + data.data.info.kv_video_button_img.img_log[i].name + '><img src=' + data.data.info.kv_video_button_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.kv_video_button_img.id + ' data-title=' + data.data.info.kv_video_button_img.key + '><img src=' + data.data.info.kv_video_button_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#wimg_ul").html(null).append(str);
				$("#wimg_ul li").removeClass("active");
				$("#wimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#wimg_ul").html(null).append(html + str);
				$("#wimg_ul li").removeClass("active");
				$("#wimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定编辑视频信息
$("#video_sure").click(function() {
	var x_url = $("#video_url").val();
	$.ajax({
		url: alt + "moduleapi/kv/update-video",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"kv_video_button_img": $("#wimg_ul li.active img").attr("src"),
			"kv_video_button_img_log[0][name]": $("#wimg_ul li.active").attr("data-title"),
			"kv_video_button_img_log[0][img]": $("#wimg_ul li.active img").attr("src"),
			"kv_video_url": x_url,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getVideo();
			}
		},
		error: function() {

		}
	});
});
//获取预约模块信息
function getYy() {
	$.ajax({
		url: alt + "moduleapi/kv/get-yuyue-module-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find("#order").attr("src", data.data.info.kv_yuyue_module_botton_img.value);
			$("#iframe").contents().find("#yy_number").text(data.data.stat.count);
			$("#yy_count").val(data.data.stat.count);
			$("#yy_min").val(data.data.stat.rangeMin);
			$("#yy_max").val(data.data.stat.rangeMax);
			var html = "";
			for(var i in data.data.info.kv_yuyue_module_botton_img.img_log) {
				if(i < 3) {
					html += '<li data-id=' + data.data.info.kv_yuyue_module_botton_img.img_log[i].id + ' data-title=' + data.data.info.kv_yuyue_module_botton_img.img_log[i].name + '><img src=' + data.data.info.kv_yuyue_module_botton_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
				}
			};
			var str = '<li data-id=' + data.data.info.kv_yuyue_module_botton_img.id + ' data-title=' + data.data.info.kv_yuyue_module_botton_img.key + '><img src=' + data.data.info.kv_yuyue_module_botton_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#oimg_ul").html(null).append(str);
				$("#oimg_ul li").removeClass("active");
				$("#oimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#oimg_ul").html(null).append(html);
				$("#oimg_ul li").removeClass("active");
				$("#oimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改预约模块信息
$("#yy_sure").click(function() {
	var num = $("#yy_count").val();
	var rangeMin = $("#yy_min").val();
	var rangeMax = $("#yy_max").val();
	$.ajax({
		url: alt + "moduleapi/kv/update-yuyue-module",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"kv_yuyue_module_botton_img": $("#oimg_ul li.active img").attr("src"),
			"kv_yuyue_module_botton_img_log[0][name]": $("#oimg_ul li.active").attr("data-title"),
			"kv_yuyue_module_botton_img_log[0][img]": $("#oimg_ul li.active img").attr("src"),
			"num": num,
			"rangeMin": rangeMin,
			"rangeMax": rangeMax
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getYy();
			}
		},
		error: function() {

		}
	});
});
//获取预约弹窗信息
function getTc() {
	$.ajax({
		url: alt + "moduleapi/kv/get-yuyue-popup-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".co_con").css({
				"background": 'url(' + data.data.info.kv_yuyuepopup_background_img.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			$(".ios_text").text(data.data.info.kv_yuyuepopup_platform_ios.value);
			$("#iframe").contents().find(".ios_text").text(data.data.info.kv_yuyuepopup_platform_ios.value);
			$(".and_text").text(data.data.info.kv_yuyuepopup_platform_android.value);
			$("#iframe").contents().find(".and_text").text(data.data.info.kv_yuyuepopup_platform_android.value);
			$("#ios_text").val(data.data.info.kv_yuyuepopup_platform_ios.value);
			$("#and_text").val(data.data.info.kv_yuyuepopup_platform_android.value);
			$("#iframe").contents().find(".wx_icon").attr("src", data.data.info.kv_yuyuepopup_platform_no_select_icon.value);
			$("#iframe").contents().find(".yx_icon").attr("src", data.data.info.kv_yuyuepopup_platform_select_icon.value);
			$(".ios_text").attr("style", data.data.info.kv_yuyuepopup_platform_ios_style.value);
			$("#iframe").contents().find(".ios_text").attr("style", data.data.info.kv_yuyuepopup_platform_ios_style.value);
			$(".and_text").attr("style", data.data.info.kv_yuyuepopup_platform_android_style.value);
			$("#iframe").contents().find(".and_text").attr("style", data.data.info.kv_yuyuepopup_platform_android_style.value);
			var html = "";
			for(var i in data.data.info.kv_yuyuepopup_background_img.img_log) {
				html += '<li data-id=' + data.data.info.kv_yuyuepopup_background_img.img_log[i].id + ' data-title=' + data.data.info.kv_yuyuepopup_background_img.img_log[i].name + '><img src=' + data.data.info.kv_yuyuepopup_background_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.kv_yuyuepopup_background_img.id + ' data-title=' + data.data.info.kv_yuyuepopup_background_img.key + '><img src=' + data.data.info.kv_yuyuepopup_background_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#pimg_ul").html(null).append(str);
				$("#pimg_ul li").removeClass("active");
				$("#pimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#pimg_ul").html(null).append(html);
				$("#pimg_ul li").removeClass("active");
				$("#pimg_ul li:nth-child(1)").addClass("active");
			}
			var chtml = "";
			for(var i in data.data.info.kv_yuyuepopup_botton_img.img_log) {
				chtml += '<li data-id=' + data.data.info.kv_yuyuepopup_botton_img.img_log[i].id + ' data-title=' + data.data.info.kv_yuyuepopup_botton_img.img_log[i].name + '><img src=' + data.data.info.kv_yuyuepopup_botton_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var cstr = '<li data-id=' + data.data.info.kv_yuyuepopup_botton_img.id + ' data-title=' + data.data.info.kv_yuyuepopup_botton_img.key + '><img src=' + data.data.info.kv_yuyuepopup_botton_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(chtml == "" || chtml == undefined) {
				$("#kimg_ul").html(null).append(cstr);
				$("#kimg_ul li").removeClass("active");
				$("#kimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#kimg_ul").html(null).append(chtml);
				$("#kimg_ul li").removeClass("active");
				$("#kimg_ul li:nth-child(1)").addClass("active");
			}

			var dhtml = "";
			for(var i in data.data.info.kv_yuyuepopup_platform_select_icon.img_log) {
				dhtml += '<li data-id=' + data.data.info.kv_yuyuepopup_platform_select_icon.img_log[i].id + ' data-title=' + data.data.info.kv_yuyuepopup_platform_select_icon.img_log[i].name + '><img src=' + data.data.info.kv_yuyuepopup_platform_select_icon.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var dstr = '<li data-id=' + data.data.info.kv_yuyuepopup_platform_select_icon.id + ' data-title=' + data.data.info.kv_yuyuepopup_platform_select_icon.key + '><img src=' + data.data.info.kv_yuyuepopup_platform_select_icon.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(dhtml == "" || dhtml == undefined) {
				$("#h_icon").html(null).append(dstr);
				$("#h_icon li").removeClass("active");
				$("#h_icon li:nth-child(1)").addClass("active");
			} else {
				$("#h_icon").html(null).append(dhtml);
				$("#h_icon li").removeClass("active");
				$("#h_icon li:nth-child(1)").addClass("active");
			}

			var ehtml = "";
			for(var i in data.data.info.kv_yuyuepopup_platform_no_select_icon.img_log) {
				ehtml += '<li data-id=' + data.data.info.kv_yuyuepopup_platform_no_select_icon.img_log[i].id + ' data-title=' + data.data.info.kv_yuyuepopup_platform_no_select_icon.img_log[i].name + '><img src=' + data.data.info.kv_yuyuepopup_platform_no_select_icon.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var estr = '<li data-id=' + data.data.info.kv_yuyuepopup_platform_no_select_icon.id + ' data-title=' + data.data.info.kv_yuyuepopup_platform_no_select_icon.key + '><img src=' + data.data.info.kv_yuyuepopup_platform_no_select_icon.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(ehtml == "" || dhtml == undefined) {
				$("#y_icon").html(null).append(estr);
				$("#y_icon li").removeClass("active");
				$("#y_icon li:nth-child(1)").addClass("active");
			} else {
				$("#y_icon").html(null).append(ehtml);
				$("#y_icon li").removeClass("active");
				$("#y_icon li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改预约信息
$("#y_sure").click(function() {
	var ios = $("#ios_text").val();
	var and = $("#and_text").val();
	var style = $("#ios_text").attr("style");
	var style1 = $("#and_text").attr("style");
	if(ios.length > 5) {
		alert("文案不能超过5个字符");
		$("#ios_text").focus();
		return;
	}
	if(and.length > 5) {
		alert("文案不能超过5个字符");
		$("#and_text").focus();
		return;
	}
	$.ajax({
		url: alt + "moduleapi/kv/update-yuyue-popup",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"kv_yuyuepopup_background_img": $("#pimg_ul li.active img").attr("src"),
			"kv_yuyuepopup_background_img_log[0][name]": $("#pimg_ul li.active").attr("data-title"),
			"kv_yuyuepopup_background_img_log[0][img]": $("#pimg_ul li.active img").attr("src"),
			"kv_yuyuepopup_botton_img": $("#kimg_ul li.active img").attr("src"),
			"kv_yuyuepopup_botton_img_log[0][name]": $("#kimg_ul li.active").attr("data-title"),
			"kv_yuyuepopup_botton_img_log[0][img]": $("#kimg_ul li.active img").attr("src"),
			"kv_yuyuepopup_platform_select_icon": $("#h_icon li.active img").attr("src"),
			"kv_yuyuepopup_platform_select_icon_log[0][name]": $("#h_icon li.active").attr("data-title"),
			"kv_yuyuepopup_platform_select_icon_log[0][img]": $("#h_icon li.active img").attr("src"),
			"kv_yuyuepopup_platform_no_select_icon": $("#y_icon li.active img").attr("src"),
			"kv_yuyuepopup_platform_no_select_icon_log[0][name]": $("#y_icon li.active").attr("data-title"),
			"kv_yuyuepopup_platform_no_select_icon_log[0][img]": $("#y_icon li.active img").attr("src"),
			"kv_yuyuepopup_platform_ios": ios,
			"kv_yuyuepopup_platform_android": and,
			"kv_yuyuepopup_platform_ios_style": style,
			"kv_yuyuepopup_platform_android_style": style1,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getTc();
			}
		},
		error: function() {

		}
	});
});
//获取进度条模块信息
function getSecond() {
	var group = ["progress"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".ward_box").css({
				"background": 'url(' + data.data.progress.info.progress_background_img_wap.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			$("#iframe").contents().find(".con_txt").text(data.data.progress.info.progress_background_summary.value);
			$("#iframe").contents().find(".con_txt").attr("style", data.data.progress.info.progress_background_summary_style.value);
			$("#conduct").text(data.data.progress.info.progress_background_summary.value);
			$("#conduct").attr("style", data.data.progress.info.progress_background_summary_style.value);
			var html = "";
			for(var i in data.data.progress.info.progress_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.progress.info.progress_background_img_wap.img_log[i].id + ' data-title=' + data.data.progress.info.progress_background_img_wap.img_log[i].name + '><img src=' + data.data.progress.info.progress_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.progress.info.progress_background_img_wap.id + ' data-title=' + data.data.progress.info.progress_background_img_wap.key + '><img src=' + data.data.progress.info.progress_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#nimg_ul").html(null).append(str);
				$("#nimg_ul li").removeClass("active");
				$("#nimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#nimg_ul").html(null).append(html);
				$("#nimg_ul li").removeClass("active");
				$("#nimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改进度条背景图及文案
$("#jd_sure").click(function() {
	var num = $("#conduct").val();
	var group = ["progress"];
	if(num.length > 50) {
		alert("介绍文案不能超过50字~");
		return;
	}
	$.ajax({
		url: alt + "moduleapi/progress/update-background",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"progress_background_img_wap": $("#nimg_ul li.active img").attr("src"),
			"progress_background_img_wap_log[0][name]": $("#nimg_ul li.active").attr("data-title"),
			"progress_background_img_wap_log[0][img]": $("#nimg_ul li.active img").attr("src"),
			"progress_background_summary": num,
			"progress_background_summary_style": $("#conduct").attr("style"),
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getSecond();
			}
		},
		error: function() {

		}
	});
});
//获取进度条预约按钮
function getJimg() {
	$.ajax({
		url: alt + "moduleapi/progress/get-yuyue-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find("#jd_yy").find("img").attr("src", data.data.info.progress_yuyue_botton_img_wap.value);
			var html = "";
			for(var i in data.data.info.progress_yuyue_botton_img.img_log) {
				html += '<li data-id=' + data.data.info.progress_yuyue_botton_img_wap.img_log[i].id + ' data-title=' + data.data.info.progress_yuyue_botton_img_wap.img_log[i].name + '><img src=' + data.data.info.progress_yuyue_botton_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.progress_yuyue_botton_img_wap.id + ' data-title=' + data.data.info.progress_yuyue_botton_img_wap.key + '><img src=' + data.data.info.progress_yuyue_botton_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#rimg_ul").html(null).append(str);
				$("#rimg_ul li").removeClass("active");
				$("#rimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#rimg_ul").html(null).append(html);
				$("#rimg_ul li").removeClass("active");
				$("#rimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改进度条预约按钮
$("#bt_sure").click(function() {
	$.ajax({
		url: alt + "moduleapi/progress/update-yuyue",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"progress_yuyue_botton_img_wap": $("#rimg_ul li.active img").attr("src"),
			"progress_yuyue_botton_img_wap_log[0][name]": $("#rimg_ul li.active").attr("data-title"),
			"progress_yuyue_botton_img_wap_log[0][img]": $("#rimg_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getJimg();
			}
		},
		error: function() {

		}
	});
});
//获取进度条信息
function getJd() {
	var group = ["progress"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".line-nocolor").attr("src", data.data.progress.info.progress_bar_background_img_wap.value);
			$("#iframe").contents().find(".line-color").attr("src", data.data.progress.info.progress_bar_fill_img_wap.value);
			var html = "";
			for(var i in data.data.progress.info.progress_bar_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.progress.info.progress_bar_background_img_wap.img_log[i].id + ' data-title=' + data.data.progress.info.progress_bar_background_img_wap.img_log[i].name + '><img src=' + data.data.progress.info.progress_bar_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.progress.info.progress_bar_background_img_wap.id + ' data-title=' + data.data.progress.info.progress_bar_background_img_wap.key + '><img src=' + data.data.progress.info.progress_bar_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#zimg_ul").html(null).append(str);
				$("#zimg_ul li").removeClass("active");
				$("#zimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#zimg_ul").html(null).append(html);
				$("#zimg_ul li").removeClass("active");
				$("#zimg_ul li:nth-child(1)").addClass("active");
			}

			var bhtml = "";
			for(var i in data.data.progress.info.progress_bar_fill_img_wap.img_log) {
				bhtml += '<li data-id=' + data.data.progress.info.progress_bar_fill_img_wap.img_log[i].id + ' data-title=' + data.data.progress.info.progress_bar_fill_img_wap.img_log[i].name + '><img src=' + data.data.progress.info.progress_bar_fill_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var bstr = '<li data-id=' + data.data.progress.info.progress_bar_fill_img_wap.id + ' data-title=' + data.data.progress.info.progress_bar_fill_img_wap.key + '><img src=' + data.data.progress.info.progress_bar_fill_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(bhtml == "" || bhtml == undefined) {
				$("#ximg_ul").html(null).append(bstr);
				$("#ximg_ul li").removeClass("active");
				$("#ximg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#ximg_ul").html(null).append(bhtml);
				$("#ximg_ul li").removeClass("active");
				$("#ximg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击修改进度条信息
$("#ti_sure").click(function() {
	var group = ["progress"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"progress_bar_background_img_wap": $("#zimg_ul li.active img").attr("src"),
			"progress_bar_background_img_wap_log[0][name]": $("#zimg_ul li.active").attr("data-title"),
			"progress_bar_background_img_wap_log[0][img]": $("#zimg_ul li.active img").attr("src"),
			"progress_bar_fill_img_wap": $("#ximg_ul li.active img").attr("src"),
			"progress_bar_fill_img_wap_log[0][name]": $("#ximg_ul li.active").attr("data-title"),
			"progress_bar_fill_img_wap_log[0][img]": $("#ximg_ul li.active img").attr("src"),
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getJd();
			}
		},
		error: function() {

		}
	});
});
//获取进度条节点信息
function getJie() {
	$.ajax({
		url: alt + "moduleapi/progress/get-node-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find("#info1").attr("src", data.data.info.progress_node_1_img.value);
			$("#iframe").contents().find("#info_img1").html(data.data.info.progress_node_1_summary.value);
			$("#fr_value").val(data.data.info.progress_node_1_summary.value);
			$("#fr_num").val(data.data.info.progress_node_1_num.value);
			$("#iframe").contents().find("#info2").attr("src", data.data.info.progress_node_2_img.value);
			$("#iframe").contents().find("#info_img2").html(data.data.info.progress_node_2_summary.value);
			$("#se_value").val(data.data.info.progress_node_2_summary.value);
			$("#se_num").val(data.data.info.progress_node_2_num.value);
			$("#iframe").contents().find("#info3").attr("src", data.data.info.progress_node_3_img.value);
			$("#iframe").contents().find("#info_img3").html(data.data.info.progress_node_3_summary.value);
			$("#th_value").val(data.data.info.progress_node_3_summary.value);
			$("#th_num").val(data.data.info.progress_node_3_num.value);
			$("#iframe").contents().find("#info4").attr("src", data.data.info.progress_node_4_img.value);
			$("#iframe").contents().find("#info_img4").html(data.data.info.progress_node_4_summary.value);
			$("#fo_value").val(data.data.info.progress_node_4_summary.value);
			$("#fo_num").val(data.data.info.progress_node_4_num.value);
			$("#iframe").contents().find("#info5").attr("src", data.data.info.progress_node_5_img.value);
			$("#iframe").contents().find("#info_img5").html(data.data.info.progress_node_5_summary.value);
			$("#ve_value").val(data.data.info.progress_node_5_summary.value);
			$("#fi_num").val(data.data.info.progress_node_5_num.value);
			$("#fr_value").attr("style", data.data.info.progress_node_1_summary_style.value);
			$("#iframe").contents().find("#info_img1").attr("style", data.data.info.progress_node_1_summary_style.value);
			$("#se_value").attr("style", data.data.info.progress_node_2_summary_style.value);
			$("#iframe").contents().find("#info_img2").attr("style", data.data.info.progress_node_2_summary_style.value);
			$("#th_value").attr("style", data.data.info.progress_node_3_summary_style.value);
			$("#iframe").contents().find("#info_img3").attr("style", data.data.info.progress_node_3_summary_style.value);
			$("#fo_value").attr("style", data.data.info.progress_node_4_summary_style.value);
			$("#iframe").contents().find("#info_img4").attr("style", data.data.info.progress_node_4_summary_style.value);
			$("#ve_value").attr("style", data.data.info.progress_node_5_summary_style.value);
			$("#iframe").contents().find("#info_img5").attr("style", data.data.info.progress_node_5_summary_style.value);
			var html = "";
			for(var i in data.data.info.progress_node_1_img.img_log) {
				html += '<li data-id=' + data.data.info.progress_node_1_img.img_log[i].id + ' data-title=' + data.data.info.progress_node_1_img.img_log[i].name + '><img src=' + data.data.info.progress_node_1_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.progress_node_1_img.id + ' data-title=' + data.data.info.progress_node_1_img.key + '><img src=' + data.data.info.progress_node_1_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#fi_ul").html(null).append(str);
				$("#fi_ul li").removeClass("active");
				$("#fi_ul li:nth-child(1)").addClass("active");
			} else {
				$("#fi_ul").html(null).append(html);
				$("#fi_ul li").removeClass("active");
				$("#fi_ul li:nth-child(1)").addClass("active");
			}

			var bhtml = "";
			for(var i in data.data.info.progress_node_2_img.img_log) {
				bhtml += '<li data-id=' + data.data.info.progress_node_2_img.img_log[i].id + ' data-title=' + data.data.info.progress_node_2_img.img_log[i].name + '><img src=' + data.data.info.progress_node_2_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var bstr = '<li data-id=' + data.data.info.progress_node_2_img.id + ' data-title=' + data.data.info.progress_node_2_img.key + '><img src=' + data.data.info.progress_node_2_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(bhtml == "" || bhtml == undefined) {
				$("#si_ul").html(null).append(bstr);
				$("#si_ul li").removeClass("active");
				$("#si_ul li:nth-child(1)").addClass("active");
			} else {
				$("#si_ul").html(null).append(bhtml);
				$("#si_ul li").removeClass("active");
				$("#si_ul li:nth-child(1)").addClass("active");
			}

			var chtml = "";
			for(var i in data.data.info.progress_node_3_img.img_log) {
				chtml += '<li data-id=' + data.data.info.progress_node_3_img.img_log[i].id + ' data-title=' + data.data.info.progress_node_3_img.img_log[i].name + '><img src=' + data.data.info.progress_node_3_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var cstr = '<li data-id=' + data.data.info.progress_node_3_img.id + ' data-title=' + data.data.info.progress_node_3_img.key + '><img src=' + data.data.info.progress_node_3_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(chtml == "" || chtml == undefined) {
				$("#th_ul").html(null).append(cstr);
				$("#th_ul li").removeClass("active");
				$("#th_ul li:nth-child(1)").addClass("active");
			} else {
				$("#th_ul").html(null).append(chtml);
				$("#th_ul li").removeClass("active");
				$("#th_ul li:nth-child(1)").addClass("active");
			}

			var dhtml = "";
			for(var i in data.data.info.progress_node_4_img.img_log) {
				dhtml += '<li data-id=' + data.data.info.progress_node_4_img.img_log[i].id + ' data-title=' + data.data.info.progress_node_4_img.img_log[i].name + '><img src=' + data.data.info.progress_node_4_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var dstr = '<li data-id=' + data.data.info.progress_node_4_img.id + ' data-title=' + data.data.info.progress_node_4_img.key + '><img src=' + data.data.info.progress_node_4_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(dhtml == "" || dhtml == undefined) {
				$("#fo_ul").html(null).append(dstr);
				$("#fo_ul li").removeClass("active");
				$("#fo_ul li:nth-child(1)").addClass("active");
			} else {
				$("#fo_ul").html(null).append(dhtml);
				$("#fo_ul li").removeClass("active");
				$("#fo_ul li:nth-child(1)").addClass("active");
			}

			var ehtml = "";
			for(var i in data.data.info.progress_node_5_img.img_log) {
				ehtml += '<li data-id=' + data.data.info.progress_node_5_img.img_log[i].id + ' data-title=' + data.data.info.progress_node_5_img.img_log[i].name + '><img src=' + data.data.info.progress_node_5_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var estr = '<li data-id=' + data.data.info.progress_node_5_img.id + ' data-title=' + data.data.info.progress_node_5_img.key + '><img src=' + data.data.info.progress_node_5_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(ehtml == "" || ehtml == undefined) {
				$("#ve_ul").html(null).append(estr);
				$("#ve_ul li").removeClass("active");
				$("#ve_ul li:nth-child(1)").addClass("active");
			} else {
				$("#ve_ul").html(null).append(ehtml);
				$("#ve_ul li").removeClass("active");
				$("#ve_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定编辑进度条节点信息
$("#jie_sure").click(function() {
	var value1 = $("#fr_value").val();
	var value2 = $("#se_value").val();
	var value3 = $("#th_value").val();
	var value4 = $("#fo_value").val();
	var value5 = $("#ve_value").val();
	var num1 = $("#fr_num").val();
	var num2 = $("#se_num").val();
	var num3 = $("#th_num").val();
	var num4 = $("#fo_num").val();
	var num5 = $("#fi_num").val();
	$.ajax({
		url: alt + "moduleapi/progress/update-node",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"progress_node_1_img": $("#fi_ul li.active img").attr("src"),
			"progress_node_1_img_log[0][name]": $("#fi_ul li.active").attr("data-title"),
			"progress_node_1_img_log[0][img]": $("#fi_ul li.active img").attr("src"),
			"progress_node_2_img": $("#si_ul li.active img").attr("src"),
			"progress_node_2_img_log[0][name]": $("#si_ul li.active").attr("data-title"),
			"progress_node_2_img_log[0][img]": $("#si_ul li.active img").attr("src"),
			"progress_node_3_img": $("#th_ul li.active img").attr("src"),
			"progress_node_3_img_log[0][name]": $("#th_ul li.active").attr("data-title"),
			"progress_node_3_img_log[0][img]": $("#th_ul li.active img").attr("src"),
			"progress_node_4_img": $("#fo_ul li.active img").attr("src"),
			"progress_node_4_img_log[0][name]": $("#fo_ul li.active").attr("data-title"),
			"progress_node_4_img_log[0][img]": $("#fo_ul li.active img").attr("src"),
			"progress_node_5_img": $("#ve_ul li.active img").attr("src"),
			"progress_node_5_img_log[0][name]": $("#ve_ul li.active").attr("data-title"),
			"progress_node_5_img_log[0][img]": $("#ve_ul li.active img").attr("src"),
			"progress_node_1_summary": value1,
			"progress_node_2_summary": value2,
			"progress_node_3_summary": value3,
			"progress_node_4_summary": value4,
			"progress_node_5_summary": value5,
			"progress_node_1_num": num1,
			"progress_node_2_num": num2,
			"progress_node_3_num": num3,
			"progress_node_4_num": num4,
			"progress_node_5_num": num5,
			"progress_node_1_summary_style": $("#fr_value").attr("style"),
			"progress_node_2_summary_style": $("#se_value").attr("style"),
			"progress_node_3_summary_style": $("#th_value").attr("style"),
			"progress_node_4_summary_style": $("#fo_value").attr("style"),
			"progress_node_5_summary_style": $("#ve_value").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getJie();
			}
		},
		error: function() {

		}
	});
});
//获取底部下载信息
function getDown() {
	var group = ["download"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".down_btn").attr("href", data.data.download.info.download_website_url_wap.value);
			$("#iframe").contents().find(".yxyy").find("img").attr("src", data.data.download.info.download_website_img_wap.value);
			$("#iframe").contents().find(".yxyy").attr("href", data.data.download.info.download_website_url_wap.value);
			$("#iframe").contents().find(".k_top").attr("href", data.data.download.info.download_tap_url.value);
			$("#iframe").contents().find(".k_top").find("img").attr("src", data.data.download.info.download_tap_img_wap.value);
			$("#tap_down_url").val(data.data.download.info.download_tap_url.value);
			$("#gf_down_url").val(data.data.download.info.download_website_url_wap.value);
			var html = "";
			for(var i in data.data.download.info.download_website_img_wap.img_log) {
				html += '<li data-id=' + data.data.download.info.download_website_img_wap.img_log[i].id + ' data-title=' + data.data.download.info.download_website_img_wap.img_log[i].name + '><img src=' + data.data.download.info.download_website_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.download.info.download_website_img_wap.id + ' data-title=' + data.data.download.info.download_website_img_wap.key + '><img src=' + data.data.download.info.download_website_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#kdimg_ul").html(null).append(str);
				$("#kdimg_ul li").removeClass("active");
				$("#kdimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#kdimg_ul").html(null).append(html);
				$("#kdimg_ul li").removeClass("active");
				$("#kdimg_ul li:nth-child(1)").addClass("active");
			}

			var bhtml = "";
			for(var i in data.data.download.info.download_tap_img_wap.img_log) {
				bhtml += '<li data-id=' + data.data.download.info.download_tap_img_wap.img_log[i].id + ' data-title=' + data.data.download.info.download_tap_img_wap.img_log[i].name + '><img src=' + data.data.download.info.download_tap_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var bstr = '<li data-id=' + data.data.download.info.download_tap_img_wap.id + ' data-title=' + data.data.download.info.download_tap_img_wap.key + '><img src=' + data.data.download.info.download_tap_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(bhtml == "" || bhtml == undefined) {
				$("#wapimg_ul").html(null).append(bstr);
				$("#wapimg_ul li").removeClass("active");
				$("#wapimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#wapimg_ul").html(null).append(bhtml);
				$("#wapimg_ul li").removeClass("active");
				$("#wapimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改wap下载信息
$("#kdo_sure").click(function() {
	var group = ["download"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_website_url_wap": $("#gf_down_url").val(),
			"download_website_img_wap": $("#kdimg_ul li.active img").attr("src"),
			"download_website_img_wap_log[0][name]": $("#kdimg_ul li.active").attr("data-title"),
			"download_website_img_wap_log[0][img]": $("#kdimg_ul li.active img").attr("src"),
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getDown();
			}
		},
		error: function() {

		}
	});
});
//点击确定修改wapTap信息
$("#wt_sure").click(function() {
	var group = ["download"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_tap_url": $("#tap_down_url").val(),
			"download_tap_img_wap": $("#wapimg_ul li.active img").attr("src"),
			"download_tap_img_wap_log[0][name]": $("#wapimg_ul li.active").attr("data-title"),
			"download_tap_img_wap_log[0][img]": $("#wapimg_ul li.active img").attr("src"),
			group: group
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getDown();
			}
		},
		error: function() {

		}
	});
});
//点击确定修改下载信息
$("#d1_sure").click(function() {
	var title01 = $("#f_title01").val();
	var title02 = $("#f_title02").val();
	$.ajax({
		url: alt + "moduleapi/bottommedia/update-download",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"bottommedia_download_ewm": $("#d_ul li.active img").attr("src"),
			"bottommedia_download_ewm_log[0][name]": $("#d_ul li.active").attr("data-title"),
			"bottommedia_download_ewm_log[0][img]": $("#d_ul li.active img").attr("src"),
			"bottommedia_download_title": title01,
			"bottommedia_download_title_style": $("#f_title01").attr("style"),
			"bottommedia_download_sub_title": title02,
			"bottommedia_download_sub_title_style": $("#f_title02").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getDown();
			}
		},
		error: function() {

		}
	});
});
//获取底部微信信息
function getWdown() {
	$.ajax({
		url: alt + "moduleapi/bottommedia/get-wechat-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#w_ewm").attr("src", data.data.info.bottommedia_wechat_ewm.value);
			$("#w_title01").text(data.data.info.bottommedia_wechat_title.value);
			$("#w_title02").text(data.data.info.bottommedia_wechat_sub_title.value);
			$("#w_title01").attr("style", data.data.info.bottommedia_wechat_title_style.value);
			$("#w_title02").attr("style", data.data.info.bottommedia_wechat_sub_title_style.value);
			$("#s_title01").val(data.data.info.bottommedia_wechat_title.value);
			$("#s_title02").val(data.data.info.bottommedia_wechat_sub_title.value);
			$("#s_title01").attr("style", data.data.info.bottommedia_wechat_title_style.value);
			$("#s_title02").attr("style", data.data.info.bottommedia_wechat_sub_title_style.value);
			var html = "";
			for(var i in data.data.info.bottommedia_wechat_ewm.img_log) {
				html += '<li data-id=' + data.data.info.bottommedia_wechat_ewm.img_log[i].id + ' data-title=' + data.data.info.bottommedia_wechat_ewm.img_log[i].name + '><img src=' + data.data.info.bottommedia_wechat_ewm.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.bottommedia_wechat_ewm.id + ' data-title=' + data.data.info.bottommedia_wechat_ewm.key + '><img src=' + data.data.info.bottommedia_wechat_ewm.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#s_ul").html(null).append(str);
				$("#s_ul li").removeClass("active");
				$("#s_ul li:nth-child(1)").addClass("active");
			} else {
				$("#s_ul").html(null).append(html);
				$("#s_ul li").removeClass("active");
				$("#s_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改下载信息
$("#d2_sure").click(function() {
	var title01 = $("#s_title01").val();
	var title02 = $("#s_title02").val();
	$.ajax({
		url: alt + "moduleapi/bottommedia/update-wechat",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"bottommedia_wechat_ewm": $("#s_ul li.active img").attr("src"),
			"bottommedia_wechat_ewm_log[0][name]": $("#s_ul li.active").attr("data-title"),
			"bottommedia_wechat_ewm_log[0][img]": $("#s_ul li.active img").attr("src"),
			"bottommedia_wechat_title": title01,
			"bottommedia_wechat_title_style": $("#s_title01").attr("style"),
			"bottommedia_wechat_sub_title": title02,
			"bottommedia_wechat_sub_title_style": $("#s_title02").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getWdown();
			}
		},
		error: function() {

		}
	});
});
//获取底部QQ信息
function getQdown() {
	$.ajax({
		url: alt + "moduleapi/bottommedia/get-qq-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#q_ewm").attr("src", data.data.info.bottommedia_qq_ewm.value);
			$("#q_title01").text(data.data.info.bottommedia_qq_title.value);
			$("#q_title02").text(data.data.info.bottommedia_qq_sub_title.value);
			$("#q_title01").attr("style", data.data.info.bottommedia_qq_title_style.value);
			$("#q_title02").attr("style", data.data.info.bottommedia_qq_sub_title_style.value);
			$("#l_title01").val(data.data.info.bottommedia_qq_title.value);
			$("#l_title02").val(data.data.info.bottommedia_qq_sub_title.value);
			$("#l_title01").attr("style", data.data.info.bottommedia_qq_title_style.value);
			$("#l_title02").attr("style", data.data.info.bottommedia_qq_sub_title_style.value);
			var html = "";
			for(var i in data.data.info.bottommedia_qq_ewm.img_log) {
				html += '<li data-id=' + data.data.info.bottommedia_qq_ewm.img_log[i].id + ' data-title=' + data.data.info.bottommedia_qq_ewm.img_log[i].name + '><img src=' + data.data.info.bottommedia_qq_ewm.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.bottommedia_qq_ewm.id + ' data-title=' + data.data.info.bottommedia_qq_ewm.key + '><img src=' + data.data.info.bottommedia_qq_ewm.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#t_ul").html(null).append(str);
				$("#t_ul li").removeClass("active");
				$("#t_ul li:nth-child(1)").addClass("active");
			} else {
				$("#t_ul").html(null).append(html);
				$("#t_ul li").removeClass("active");
				$("#t_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定修改下载信息
$("#d3_sure").click(function() {
	var title01 = $("#l_title01").val();
	var title02 = $("#l_title02").val();
	$.ajax({
		url: alt + "moduleapi/bottommedia/update-qq",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"bottommedia_qq_ewm": $("#t_ul li.active img").attr("src"),
			"bottommedia_qq_ewm_log[0][name]": $("#t_ul li.active").attr("data-title"),
			"bottommedia_qq_ewm_log[0][img]": $("#t_ul li.active img").attr("src"),
			"bottommedia_qq_title": title01,
			"bottommedia_qq_title_style": $("#l_title01").attr("style"),
			"bottommedia_qq_sub_title": title02,
			"bottommedia_qq_sub_title_style": $("#l_title02").attr("style"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getQdown();
			}
		},
		error: function() {

		}
	});
});
//获取底部自媒体信息
function getFmedia() {
	var media = ["media"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			//底部背景图
			$("#iframe").contents().find(".official").css({
				"background": 'url(' + data.data.media.info.media_background_img_wap.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			var html = "";
			for(var i in data.data.media.info.media_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.media.info.media_background_img_wap.img_log[i].id + ' data-title=' + data.data.media.info.media_background_img_wap.img_log[i].name + '><img src=' + data.data.media.info.media_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.media.info.media_background_img_wap.id + ' data-title=' + data.data.media.info.media_background_img_wap.key + '><img src=' + data.data.media.info.media_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#d_bg_ul").html(null).append(str);
				$("#d_bg_ul li").removeClass("active");
				$("#d_bg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#d_bg_ul").html(null).append(html);
				$("#d_bg_ul li").removeClass("active");
				$("#d_bg_ul li:nth-child(1)").addClass("active");
			}
			//底部微信信息
			$("#iframe").contents().find(".gzh").css({
				"background": 'url(' + data.data.media.info.media_wechat_background_img_wap.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			$("#iframe").contents().find("#d_ewm").attr("src", data.data.media.info.media_wechat_img.value);
			var bhtml = "";
			for(var i in data.data.media.info.media_wechat_background_img_wap.img_log) {
				bhtml += '<li data-id=' + data.data.media.info.media_wechat_background_img_wap.img_log[i].id + ' data-title=' + data.data.media.info.media_wechat_background_img_wap.img_log[i].name + '><img src=' + data.data.media.info.media_wechat_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var bstr = '<li data-id=' + data.data.media.info.media_wechat_background_img_wap.id + ' data-title=' + data.data.media.info.media_wechat_background_img_wap.key + '><img src=' + data.data.media.info.media_wechat_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(bhtml == "" || bhtml == undefined) {
				$("#wx_ul").html(null).append(bstr);
				$("#wx_ul li").removeClass("active");
				$("#wx_ul li:nth-child(1)").addClass("active");
			} else {
				$("#wx_ul").html(null).append(bhtml);
				$("#wx_ul li").removeClass("active");
				$("#wx_ul li:nth-child(1)").addClass("active");
			}
			var chtml = "";
			for(var i in data.data.media.info.media_wechat_img.img_log) {
				chtml += '<li data-id=' + data.data.media.info.media_wechat_img.img_log[i].id + ' data-title=' + data.data.media.info.media_wechat_img.img_log[i].name + '><img src=' + data.data.media.info.media_wechat_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var cstr = '<li data-id=' + data.data.media.info.media_wechat_img.id + ' data-title=' + data.data.media.info.media_wechat_img.key + '><img src=' + data.data.media.info.media_wechat_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(chtml == "" || chtml == undefined) {
				$("#ew_ul").html(null).append(cstr);
				$("#ew_ul li").removeClass("active");
				$("#ew_ul li:nth-child(1)").addClass("active");
			} else {
				$("#ew_ul").html(null).append(chtml);
				$("#ew_ul li").removeClass("active");
				$("#ew_ul li:nth-child(1)").addClass("active");
			}
			//底部第一个QQ群信息
			$("#iframe").contents().find("#qq1").attr("href", data.data.media.info.media_qq_1_url.value);
			$("#iframe").contents().find("#qq_img1").attr("src", data.data.media.info.media_qq_1_icon_wap.value);
			$("#q1_url").val(data.data.media.info.media_qq_1_url.value);
			var dhtml = "";
			for(var i in data.data.media.info.media_qq_1_icon_wap.img_log) {
				dhtml += '<li data-id=' + data.data.media.info.media_qq_1_icon_wap.img_log[i].id + ' data-title=' + data.data.media.info.media_qq_1_icon_wap.img_log[i].name + '><img src=' + data.data.media.info.media_qq_1_icon_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var dstr = '<li data-id=' + data.data.media.info.media_qq_1_icon_wap.id + ' data-title=' + data.data.media.info.media_qq_1_icon_wap.key + '><img src=' + data.data.media.info.media_qq_1_icon_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(dhtml == "" || dhtml == undefined) {
				$("#q1_ul").html(null).append(dstr);
				$("#q1_ul li").removeClass("active");
				$("#q1_ul li:nth-child(1)").addClass("active");
			} else {
				$("#q1_ul").html(null).append(dhtml);
				$("#q1_ul li").removeClass("active");
				$("#q1_ul li:nth-child(1)").addClass("active");
			}
			//底部第二个QQ群信息
			$("#iframe").contents().find("#qq2").attr("href", data.data.media.info.media_qq_2_url.value);
			$("#iframe").contents().find("#qq_img2").attr("src", data.data.media.info.media_qq_2_icon_wap.value);
			$("#q2_url").val(data.data.media.info.media_qq_2_url.value);
			var ehtml = "";
			for(var i in data.data.media.info.media_qq_2_icon_wap.img_log) {
				ehtml += '<li data-id=' + data.data.media.info.media_qq_2_icon_wap.img_log[i].id + ' data-title=' + data.data.media.info.media_qq_2_icon_wap.img_log[i].name + '><img src=' + data.data.media.info.media_qq_2_icon_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var estr = '<li data-id=' + data.data.media.info.media_qq_2_icon_wap.id + ' data-title=' + data.data.media.info.media_qq_2_icon_wap.key + '><img src=' + data.data.media.info.media_qq_2_icon_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(ehtml == "" || ehtml == undefined) {
				$("#q2_ul").html(null).append(estr);
				$("#q2_ul li").removeClass("active");
				$("#q2_ul li:nth-child(1)").addClass("active");
			} else {
				$("#q2_ul").html(null).append(ehtml);
				$("#q2_ul li").removeClass("active");
				$("#q2_ul li:nth-child(1)").addClass("active");
			}
			//底部微博信息
			$("#iframe").contents().find("#wb").attr("href", data.data.media.info.media_sina_url.value);
			$("#iframe").contents().find("#wb_img").attr("src", data.data.media.info.media_sina_icon_wap.value);
			$("#sn_url").val(data.data.media.info.media_sina_url.value);
			var fhtml = "";
			for(var i in data.data.media.info.media_sina_icon_wap.img_log) {
				fhtml += '<li data-id=' + data.data.media.info.media_sina_icon_wap.img_log[i].id + ' data-title=' + data.data.media.info.media_sina_icon_wap.img_log[i].name + '><img src=' + data.data.media.info.media_sina_icon_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var fstr = '<li data-id=' + data.data.media.info.media_sina_icon_wap.id + ' data-title=' + data.data.media.info.media_sina_icon_wap.key + '><img src=' + data.data.media.info.media_sina_icon_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(fhtml == "" || fhtml == undefined) {
				$("#sn_ul").html(null).append(fstr);
				$("#sn_ul li").removeClass("active");
				$("#sn_ul li:nth-child(1)").addClass("active");
			} else {
				$("#sn_ul").html(null).append(fhtml);
				$("#sn_ul li").removeClass("active");
				$("#sn_ul li:nth-child(1)").addClass("active");
			}
			//获取底部贴吧信息
			$("#iframe").contents().find("#tb").attr("href", data.data.media.info.media_baidu_url.value);
			$("#iframe").contents().find("#tb_img").attr("src", data.data.media.info.media_baidu_icon_wap.value);
			$("#ba_url").val(data.data.media.info.media_baidu_url.value);
			var ghtml = "";
			for(var i in data.data.media.info.media_baidu_icon_wap.img_log) {
				ghtml += '<li data-id=' + data.data.media.info.media_baidu_icon_wap.img_log[i].id + ' data-title=' + data.data.media.info.media_baidu_icon_wap.img_log[i].name + '><img src=' + data.data.media.info.media_baidu_icon_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var gstr = '<li data-id=' + data.data.media.info.media_baidu_icon_wap.id + ' data-title=' + data.data.media.info.media_baidu_icon_wap.key + '><img src=' + data.data.media.info.media_baidu_icon_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(ghtml == "" || ghtml == undefined) {
				$("#ba_ul").html(null).append(gstr);
				$("#ba_ul li").removeClass("active");
				$("#ba_ul li:nth-child(1)").addClass("active");
			} else {
				$("#ba_ul").html(null).append(ghtml);
				$("#ba_ul li").removeClass("active");
				$("#ba_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定修改底部wap背景图
$("#off_bg").click(function() {
	var media = ['media'];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"media_background_img_wap": $("#d_bg_ul li.active img").attr("src"),
			"media_background_img_wap_log[0][name]": $("#d_bg_ul li.active").attr("data-title"),
			"media_background_img_wap_log[0][img]": $("#d_bg_ul li.active img").attr("src"),
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getFmedia();
			}
		},
		error: function() {

		}
	});
});
//点击确定修改底部微信信息
$("#dw_sure").click(function() {
	var media = ['media'];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"media_wechat_img": $("#ew_ul li.active img").attr("src"),
			"media_wechat_img_log[0][name]": $("#ew_ul li.active").attr("data-title"),
			"media_wechat_img_log[0][img]": $("#ew_ul li.active img").attr("src"),
			"media_wechat_background_img_wap": $("#wx_ul li.active img").attr("src"),
			"media_wechat_background_img_wap_log[0][name]": $("#wx_ul li.active").attr("data-title"),
			"media_wechat_background_img_wap_log[0][img]": $("#wx_ul li.active img").attr("src"),
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getFmedia();
			}
		},
		error: function() {

		}
	});
});
//点击确定修改第一个QQ群信息
$("#fi_sure").click(function() {
	var media = ['media'];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"media_qq_1_icon_wap": $("#q1_ul li.active img").attr("src"),
			"media_qq_1_icon_wap_log[0][name]": $("#q1_ul li.active").attr("data-title"),
			"media_qq_1_icon_wap_log[0][img]": $("#q1_ul li.active img").attr("src"),
			"media_qq_1_url": $("#q1_url").val(),
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getFmedia();
			}
		},
		error: function() {

		}
	});
});
//点击确定修改第二个QQ群信息
$("#ew_sure").click(function() {
	var media = ['media'];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"media_qq_2_icon_wap": $("#q2_ul li.active img").attr("src"),
			"media_qq_2_icon_wap_log[0][name]": $("#q2_ul li.active").attr("data-title"),
			"media_qq_2_icon_wap_log[0][img]": $("#q2_ul li.active img").attr("src"),
			"media_qq_2_url": $("#q2_url").val(),
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getFmedia();
			}
		},
		error: function() {

		}
	});
});
//点击修改底部微博信息
$("#sn_sure").click(function() {
	var media = ['media'];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"media_sina_icon_wap": $("#sn_ul li.active img").attr("src"),
			"media_sina_icon_wap_log[0][name]": $("#sn_ul li.active").attr("data-title"),
			"media_sina_icon_wap_log[0][img]": $("#sn_ul li.active img").attr("src"),
			"media_sina_url": $("#sn_url").val(),
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getFmedia();
			}
		},
		error: function() {

		}
	});
});
//点击修改底部贴吧信息
$("#ba_sure").click(function() {
	var media = ['media'];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"media_baidu_icon_wap": $("#ba_ul li.active img").attr("src"),
			"media_baidu_icon_wap_log[0][name]": $("#ba_ul li.active").attr("data-title"),
			"media_baidu_icon_wap_log[0][img]": $("#ba_ul li.active img").attr("src"),
			"media_baidu_url": $("#ba_url").val(),
			group: media
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getFmedia();
			}
		},
		error: function() {

		}
	});
});
//获取游戏特色背景图信息
function getTese() {
	var tese = ["tese"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: tese
		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find(".ts_play").css({
				"background": 'url(' + data.data.tese.info.tese_background_img_wap.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			var html = "";
			for(var i in data.data.tese.info.tese_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.tese.info.tese_background_img_wap.img_log[i].id + ' data-title=' + data.data.tese.info.tese_background_img_wap.img_log[i].name + '><img src=' + data.data.tese.info.tese_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.tese.info.tese_background_img_wap.id + ' data-title=' + data.data.tese.info.tese_background_img_wap.key + '><img src=' + data.data.tese.info.tese_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#te_ul").html(null).append(str);
				$("#te_ul li").removeClass("active");
				$("#te_ul li:nth-child(1)").addClass("active");
			} else {
				$("#te_ul").html(null).append(html);
				$("#te_ul li").removeClass("active");
				$("#te_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定修改游戏特色背景图
$("#ts_sure").click(function() {
	var tese = ["tese"]
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"tese_background_img_wap": $("#te_ul li.active img").attr("src"),
			"tese_background_img_wap_log[0][name]": $("#te_ul li.active").attr("data-title"),
			"tese_background_img_wap_log[0][img]": $("#te_ul li.active img").attr("src"),
			group: tese
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getTese();
			}
		},
		error: function() {

		}
	});
});
//获取游戏特色轮播图
function getTeseLb() {
	$.ajax({
		url: alt + "moduleapi/tese/get-lunbo-list",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			var bhtml = "";
			for(var i in data.data.data) {
				if(i < 5) {
					html += '<li data-id=' + data.data.data[i].id + '><img src=' + data.data.data[i].thumb + ' /><i class="gou"></i><p>预览</p></li>';
					bhtml += '<li class="swiper-slide" data-id=' + data.data.data[i].id + '><a href="javascript:;"><img class="images" src=' + data.data.data[i].thumb + ' /><i></i></a></li>';
				}
			};
			$("#iframe").contents().find("#swiper-wrapper").html(null).append(bhtml);
			$("#lb_ul").html(null).append(html);
			$("#lb_ul li").addClass("active");
			var dom = $("#iframe").contents().find(".swiper-container2");
			var pag = $("#iframe").contents().find(".swiper-pagination2");
			var swiper02 = new Swiper(dom, {
				pagination: pag,
				paginationClickable: true,
				effect: 'coverflow',
				slidesPerView: 3,
				centeredSlides: false,
				loop: true,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
				coverflow: {
					rotate: 0,
					stretch: -110,
					depth: 350,
					modifier: 1,
					slideShadows: false
				}
			});
			var mySwiper1 = new Swiper('.m_banner', {
				loop: true,
				autoplay: 4000,
				simulateTouch: false,
				paginationClickable: true,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
				pagination: '.swiper-pagination1',
			});
		},
		error: function() {

		}
	});
};
$("#lb_ul").on("click", "li", function() {
	if($(this).attr("class") == "active") {
		$(this).removeClass("active");
	} else {
		$(this).addClass("active");
	}
});
//点击确定修改轮播图信息
$("#lb_sure").click(function() {
	var newArray = [];
	var formData = new FormData();
	$("#lb_ul li.active").each(function(i, n) {
		formData.append('tese[][img]', $(n).children("img").attr("src"));
	});
	$.ajax({
		url: alt + "moduleapi/tese/update-lunbo",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: formData,
		traditional: true,
		processData: false,
		contentType: false,
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getTeseLb();
			}
		},
		error: function() {

		}
	});
});
//获取下载背景图
function getDownload() {
	$.ajax({
		url: alt + "moduleapi/download/get-background-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#d_code").css({
				"background": 'url(' + data.data.info.download_background_img.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			var html = "";
			for(var i in data.data.info.download_background_img.img_log) {
				html += '<li data-id=' + data.data.info.download_background_img.img_log[i].id + ' data-title=' + data.data.info.download_background_img.img_log[i].name + '><img src=' + data.data.info.download_background_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.download_background_img.id + ' data-title=' + data.data.info.download_background_img.key + '><img src=' + data.data.info.download_background_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#gimg_ul").html(null).append(str);
				$("#gimg_ul li").removeClass("active");
				$("#gimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#gimg_ul").html(null).append(html);
				$("#gimg_ul li").removeClass("active");
				$("#gimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定编辑下载背景图
$("#bg_sure").click(function() {
	$.ajax({
		url: alt + "moduleapi/download/update-background",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_background_img": $("#gimg_ul li.active img").attr("src"),
			"download_background_img_log[0][name]": $("#gimg_ul li.active").attr("data-title"),
			"download_background_img_log[0][img]": $("#gimg_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getDownload();
			}
		},
		error: function() {

		}
	});
});
//获取下载二维码
function getEwm() {
	$.ajax({
		url: alt + "moduleapi/download/get-ewm-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#g_ewm").attr("src", data.data.info.download_ewm_img.value);
			var html = "";
			for(var i in data.data.info.download_ewm_img.img_log) {
				html += '<li data-id=' + data.data.info.download_ewm_img.img_log[i].id + ' data-title=' + data.data.info.download_ewm_img.img_log[i].name + '><img src=' + data.data.info.download_ewm_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.download_ewm_img.id + ' data-title=' + data.data.info.download_ewm_img.key + '><img src=' + data.data.info.download_ewm_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#aaimg_ul").html(null).append(str);
				$("#aaimg_ul li").removeClass("active");
				$("#aaimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#aaimg_ul").html(null).append(html);
				$("#aaimg_ul li").removeClass("active");
				$("#aaimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定编辑下载二维码
$("#ewm_sure").click(function() {
	$.ajax({
		url: alt + "moduleapi/download/update-ewm",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_ewm_img": $("#aaimg_ul li.active img").attr("src"),
			"download_ewm_img_log[0][name]": $("#aaimg_ul li.active").attr("data-title"),
			"download_ewm_img_log[0][img]": $("#aaimg_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getEwm();
			}
		},
		error: function() {

		}
	});
});
//获取ios下载信息
function getIos() {
	$.ajax({
		url: alt + "moduleapi/download/get-ios-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#ios_img").attr("src", data.data.info.download_ios_img.value);
			$("#nios_url").attr("href", data.data.info.download_ios_url.value);
			$("#ios_url").val(data.data.info.download_ios_url.value);
			var html = "";
			for(var i in data.data.info.download_ios_img.img_log) {
				html += '<li data-id=' + data.data.info.download_ios_img.img_log[i].id + ' data-title=' + data.data.info.download_ios_img.img_log[i].name + '><img src=' + data.data.info.download_ios_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.download_ios_img.id + ' data-title=' + data.data.info.download_ios_img.key + '><img src=' + data.data.info.download_ios_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#iosimg_ul").html(null).append(str);
				$("#iosimg_ul li").removeClass("active");
				$("#iosimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#iosimg_ul").html(null).append(html);
				$("#iosimg_ul li").removeClass("active");
				$("#iosimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定编辑ios信息
$("#xz_sure").click(function() {
	var url = $("#ios_url").val();
	$.ajax({
		url: alt + "moduleapi/download/update-ios",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_ios_img": $("#iosimg_ul li.active img").attr("src"),
			"download_ios_img_log[0][name]": $("#iosimg_ul li.active").attr("data-title"),
			"download_ios_img_log[0][img]": $("#iosimg_ul li.active img").attr("src"),
			"download_ios_url": url,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getIos();
			}
		},
		error: function() {

		}
	});
});
//获取安卓下载信息
function getAnd() {
	$.ajax({
		url: alt + "moduleapi/download/get-android-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#and_img").attr("src", data.data.info.download_android_img.value);
			$("#nand_url").attr("href", data.data.info.download_android_url.value);
			$("#and_url").val(data.data.info.download_android_url.value);
			var html = "";
			for(var i in data.data.info.download_android_img.img_log) {
				html += '<li data-id=' + data.data.info.download_android_img.img_log[i].id + ' data-title=' + data.data.info.download_android_img.img_log[i].name + '><img src=' + data.data.info.download_android_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.download_android_img.id + ' data-title=' + data.data.info.download_android_img.key + '><img src=' + data.data.info.download_android_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#andimg_ul").html(null).append(str);
				$("#andimg_ul li").removeClass("active");
				$("#andimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#andimg_ul").html(null).append(html);
				$("#andimg_ul li").removeClass("active");
				$("#andimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定编辑安卓信息
$("#xz1_sure").click(function() {
	var url = $("#and_url").val();
	$.ajax({
		url: alt + "moduleapi/download/update-android",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_android_img": $("#andimg_ul li.active img").attr("src"),
			"download_android_img_log[0][name]": $("#andimg_ul li.active").attr("data-title"),
			"download_android_img_log[0][img]": $("#andimg_ul li.active img").attr("src"),
			"download_android_url": url,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getAnd();
			}
		},
		error: function() {

		}
	});
});
//获取tap下载信息
function getTap() {
	$.ajax({
		url: alt + "moduleapi/download/get-tap-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#tap_img").attr("src", data.data.info.download_tap_img.value);
			$("#ntap_url").attr("href", data.data.info.download_tap_url.value);
			$("#tap_url").val(data.data.info.download_tap_url.value);
			var html = "";
			for(var i in data.data.info.download_tap_img.img_log) {
				html += '<li data-id=' + data.data.info.download_tap_img.img_log[i].id + ' data-title=' + data.data.info.download_tap_img.img_log[i].name + '><img src=' + data.data.info.download_tap_img.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.download_tap_img.id + ' data-title=' + data.data.info.download_tap_img.key + '><img src=' + data.data.info.download_tap_img.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#tapimg_ul").html(null).append(str);
				$("#tapimg_ul li").removeClass("active");
				$("#tapimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#tapimg_ul").html(null).append(html);
				$("#tapimg_ul li").removeClass("active");
				$("#tapimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定编辑安卓信息
$("#xz2_sure").click(function() {
	var url = $("#tap_url").val();
	$.ajax({
		url: alt + "moduleapi/download/update-tap",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"download_tap_img": $("#tapimg_ul li.active img").attr("src"),
			"download_tap_img_log[0][name]": $("#tapimg_ul li.active").attr("data-title"),
			"download_tap_img_log[0][img]": $("#tapimg_ul li.active img").attr("src"),
			"download_tap_url": url,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getTap();
			}
		},
		error: function() {

		}
	});
});
//获取视频分类
function getVmenu() {
	$.ajax({
		url: alt + "moduleapi/category/get-video-list",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data) {
				html += '<li data-id=' + i + '>' + data.data[i] + '</li>';
			};
			$("#video_menu_ul").html(null).append(html);
			$("#bj_video_ul").html(null).append(html);
			$("#video_put").val($("#video_menu_ul li:nth-child(1)").text());
			$("#video_put").attr("data-id", $("#video_menu_ul li:nth-child(1)").attr("data-id"));
			$("#bj_video_put").val($("#video_menu_ul li:nth-child(1)").text());
			$("#bj_video_put").attr("data-id", $("#video_menu_ul li:nth-child(1)").attr("data-id"));
		},
		error: function() {

		}
	});
}
//获取视频背景图
function getVbg() {
	var videobackground = ["videobackground"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: videobackground
		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data.videobackground.info.videobackground_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.videobackground.info.videobackground_background_img_wap.img_log[i].id + ' data-title=' + data.data.videobackground.info.videobackground_background_img_wap.img_log[i].name + '><img src=' + data.data.videobackground.info.videobackground_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.videobackground.info.videobackground_background_img_wap.id + ' data-title=' + data.data.videobackground.info.videobackground_background_img_wap.key + '><img src=' + data.data.videobackground.info.videobackground_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			$("#iframe").contents().find(".ych").css({
				"background": 'url(' + data.data.videobackground.info.videobackground_background_img_wap.value + ')',
				"background-repeat": "no-repeat",
				"background-position": "center",
				"background-size": "100% 100%"
			});
			if(html == "" || html == undefined) {
				$("#ad_v_bg").html(null).append(str);
				$("#ad_v_bg li").removeClass("active");
				$("#ad_v_bg li:nth-child(1)").addClass("active");
			} else {
				$("#ad_v_bg").html(null).append(html);
				$("#ad_v_bg li").removeClass("active");
				$("#ad_v_bg li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
};
//点击确定上传视频背景图
$("#ad_v_sure").click(function() {
	var videobackground = ["videobackground"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"videobackground_background_img_wap": $("#ad_v_bg li.active img").attr("src"),
			"videobackground_background_img_wap_log[0][name]": $("#ad_v_bg li.active").attr("data-title"),
			"videobackground_background_img_wap_log[0][img]": $("#ad_v_bg li.active img").attr("src"),
			group: videobackground,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getVbg();
			}
		},
		error: function() {

		}
	});
});
//获取二级页面kv
function getNews() {
	var subpagekv = ["subpagekv"];
	$.ajax({
		url: alt + "moduleapi/common/get-config-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			group: subpagekv
		},
		success: function(respon) {
			var data = eval(respon);
			var html = "";
			for(var i in data.data.subpagekv.info.subpagekv_background_img_wap.img_log) {
				html += '<li data-id=' + data.data.subpagekv.info.subpagekv_background_img_wap.img_log[i].id + ' data-title=' + data.data.subpagekv.info.subpagekv_background_img_wap.img_log[i].name + '><img src=' + data.data.subpagekv.info.subpagekv_background_img_wap.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.subpagekv.info.subpagekv_background_img_wap.id + ' data-title=' + data.data.subpagekv.info.subpagekv_background_img_wap.key + '><img src=' + data.data.subpagekv.info.subpagekv_background_img_wap.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#newsimg_ul").html(null).append(str);
				$("#newsimg_ul li").removeClass("active");
				$("#newsimg_ul li:nth-child(1)").addClass("active");
			} else {
				$("#newsimg_ul").html(null).append(html);
				$("#newsimg_ul li").removeClass("active");
				$("#newsimg_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定上传二级页面背景图
$("#news_sure").click(function() {
	var subpagekv = ["subpagekv"];
	$.ajax({
		url: alt + "moduleapi/common/update-config",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"subpagekv_background_img_wap": $("#newsimg_ul li.active img").attr("src"),
			"subpagekv_background_img_wap_log[0][name]": $("#newsimg_ul li.active").attr("data-title"),
			"subpagekv_background_img_wap_log[0][img]": $("#newsimg_ul li.active img").attr("src"),
			group: subpagekv,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getNews();
			}
		},
		error: function() {

		}
	});
});
//获取视频列表
function getVlist() {
	$.ajax({
		url: alt + "moduleapi/content/get-video-list",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"page": 1,
			"alias": "video",
		},
		success: function(respon) {
			var data = eval(respon);
			if(data.status == 0) {
				var html = "";
				var bhtml = "";
				var chtml = "";
				for(var i in data.data) {
					if(data.data[i].status == 1) {
						html += '<li data-id=' + data.data[i].id + ' data-type=' + data.data[i].category_id + '>' +
							'<div class="list_img js_video_play" data-url=' + data.data[i].contentMessage + '>' +
							'<img src=' + data.data[i].thumb + ' alt="" /><i></i>' +
							'<a href="javascript:;" class="video_p"></a></div>' +
							'<div class="list_info"><div class="info_tl">' +
							'<p>' + data.data[i].title + '</p></div></div>' +
							'</li>';
					}
					bhtml += '<li data-id=' + data.data[i].id + ' data-type=' + data.data[i].category_id + ' data-url=' + data.data[i].contentMessage + ' data-title=' + data.data[i].title + '>' +
						'<div class="v_title">' + data.data[i].title + '</div>' +
						'<div class="v_center">' +
						'<img src=' + data.data[i].thumb + ' alt="" class="vd_img"/></div>' +
						'<div class="v_list">' +
						'<i class="v_bj">编辑</i>' +
						'<i class="v_delete">删除</i></div>' +
						'</li>';
					chtml += '<li class="swiper-slide" data-url=' + data.data[i].contentMessage + ' data-id=' + data.data[i].id + ' data-type=' + data.data[i].category_id + ' data-title=' + data.data[i].title + '>' +
						'<img src=' + data.data[i].thumb + ' alt="" />' +
						'</li>'
				};
				$("#iframe").contents().find(".sel_box1").html(null).append(html);
				$(".bj_video .bj_div").html(null).append(bhtml);
				$(".add_lunbo ul").html(null).append(chtml);
				var mySwiper2 = new Swiper(".tc_tu1", {
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					observer: true,
					observeParents: true,
					simulateTouch: false,
					onSlideChangeEnd: function() {
						var id = $(mySwiper2.slides[mySwiper2.activeIndex]).attr("data-id");
						$.ajax({
							url: alt + "moduleapi/content/get-video-info",
							type: 'POST',
							async: true,
							xhrFields: {
								withCredentials: true
							},
							data: {
								"id": id
							},
							success: function(respon) {
								var data = eval(respon);
								if(data.status == 0) {
									var _data = data.data.data;
									var categoryList = data.data.categoryList;
									var img_log = data.data.img_log;
									for(var key in categoryList) {
										//							if(_data.category_id == key) {
										$(".add_video .dropdown input").val(categoryList[key]);
										//							}
									}
									var html = "";
									for(var i in data.data.img_log) {
										html += '<li data-id=' + data.data.img_log[i].id + ' data-title=' + data.data.img_log[i].name + '><img src=' + data.data.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
									};
									$("#bj_img_ul").html(null).append(html);
									$("#bj_img_ul").find("li").removeClass("active");
									$("#bj_img_ul").find("li:nth-child(1)").addClass("active");
									$(".add_video .dropdown input").attr("data-id", _data.category_id); //文章分类
									$("#bj_video_title").val(_data.title);
									$("#bj_video_url").val(_data.body);
									$("#bj_video_sort").val(_data.sort);
								} else {
									alert(data.msg);
								}
							},
							error: function() {

							}
						});
					}
				});
				//点击删除视频
				$(".bj_video .bj_div").on("click", ".v_delete", function() {
					var id = $(this).parent().parent().attr("data-id");
					console.log(id);
					$.ajax({
						url: alt + "moduleapi/content/delete-content",
						type: 'POST',
						async: true,
						xhrFields: {
							withCredentials: true
						},
						data: {
							"id": id,
						},
						success: function(respon) {
							var data = eval(respon);
							if(data.status == 0) {
								$(this).parent().parent().remove();
								getVlist();
							}
						},
						error: function() {

						}
					});
				});
				//点击编辑视频
				$(".bj_video .bj_div").on("click", ".v_bj", function() {
					var index = $(this).parent().parent().index();
					var id = $(this).parent().parent().attr("data-id");
					mySwiper2.slideTo(index);
					$(".add_video").show();
					$.ajax({
						url: alt + "moduleapi/content/get-video-info",
						type: 'POST',
						async: true,
						xhrFields: {
							withCredentials: true
						},
						data: {
							"id": id
						},
						success: function(respon) {
							var data = eval(respon);
							if(data.status == 0) {
								var _data = data.data.data;
								var categoryList = data.data.categoryList;
								var img_log = data.data.img_log;
								for(var key in categoryList) {
									//							if(_data.category_id == key) {
									$(".add_video .dropdown input").val(categoryList[key]);
									//							}
								}
								var html = "";
								for(var i in data.data.img_log) {
									html += '<li data-id=' + data.data.img_log[i].id + ' data-title=' + data.data.img_log[i].name + '><img src=' + data.data.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
								};
								if(_data.status == 0) {
									$(".add_video .s_sel").removeClass("active");
									$("#bj_video_xs i").attr('value', '0');
									console.log(1);
								} else {
									$(".add_video .s_sel").addClass("active");
									$("#bj_video_xs i").attr('value', '1');
									console.log(2);
								}
								$("#bj_img_ul").html(null).append(html);
								$("#bj_img_ul").find("li").removeClass("active");
								$("#bj_img_ul").find("li:nth-child(1)").addClass("active");
								$(".add_video .dropdown input").attr("data-id", _data.category_id); //文章分类
								$("#bj_video_title").val(_data.title);
								$("#bj_video_url").val(_data.body);
								$("#bj_video_sort").val(_data.sort);
							} else {
								alert(data.msg);
							}
						},
						error: function() {

						}
					});
				});
			}
		},
		error: function() {

		}
	});
};
//点击确定编辑视频
$("#bj_video_sure").click(function() {
	var id = $(".tc_tu1 ul li.swiper-slide-active").attr("data-id");
	var category_id = $(".tc_tu1 ul li.swiper-slide-active").attr("data-type");
	var title = $("#bj_video_title").val();
	var sort = $("#bj_video_sort").val();
	var content = $("#bj_video_url").val();
	$.ajax({
		url: alt + "moduleapi/content/update-video",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"id": id,
			"category_id": category_id,
			"title": title,
			"sort": sort,
			"content": content,
			"status": $("#bj_video_xs i").attr("value"),
			"thumb": $("#bj_img_ul li.active img").attr("src"),
			"article_log[0][name]": $("#bj_img_ul li.active").attr("data-title"),
			"article_log[0][img]": $("#bj_img_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getVlist();
				videoInit();
			} else {
				alert(data.msg);
			}
		},
		error: function() {

		}
	});
});
//点击确定新增视频
$("#add_video_sure").click(function() {
	var url = $("#tap_url").val();
	$.ajax({
		url: alt + "moduleapi/content/create-video",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"category_id": $("#video_put").attr("data-id"),
			"title": $("#add_video_title").val(),
			"sort": $("#video_sort").val(),
			"content": $("#video_play_url").val(),
			"status": $("#video_xianshi i").attr("value"),
			"thumb": $("#news_vd_ul li.active img").attr("src"),
			"article_log[0][name]": $("#news_vd_ul li.active").attr("data-title"),
			"article_log[0][img]": $("#news_vd_ul li.active img").attr("src"),
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getVlist();
				videoInit();
			} else {
				alert(data.msg);
			}
		},
		error: function() {

		}
	});
});
$(".s_sel i").click(function() {
	var val = $(this).attr("value");
	if(val == 0) {
		$(this).parent().addClass("active");
		$(this).attr("value", "1");
	} else {
		$(this).parent().removeClass("active");
		$(this).attr("value", "0");
	}
})
//点击新增视频按钮
$("#add_vd").click(function() {
	$(".new_vd").show();
});
//点击切换模板
$(".tab_mb").click(function() {
	if($("#mu_ul").css("display") == "none") {
		$("#mu_ul").stop().slideDown();
		$(this).addClass("active");
		$("#pc_ul").stop().slideUp();
	} else {
		$("#mu_ul").stop().slideUp();
		$(this).removeClass("active");
	}
});
$("#pc_ul li").click(function() {
	var html = $(this).find("p").html();
	$("#lo_wap").html(html);
	$("#pc_ul").stop().slideUp();
})
$("#mu_ul").on("click", "li", function() {
	var id = $(this).attr("data-id");
	$(".big_img p").html("模板切换中...").show();
	$(".big_img img").hide();
	$(".big_img").show();
	$.ajax({
		url: alt + "moduleapi/change/index",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"id": id
		},
		success: function(respon) {
			var data = eval(respon);
			if(data.status == 0) {
				setTimeout(function() {
					location.reload();
				}, 3000);
			}
		},
		error: function() {

		}
	});
});
//点击切换不同端
$(".tab_pc").click(function() {
	if($("#pc_ul").css("display") == "none") {
		$("#pc_ul").stop().slideDown();
		$(this).addClass("active");
		$("#mu_ul").stop().slideUp();
	} else {
		$("#pc_ul").stop().slideUp();
		$(this).removeClass("active");
	}
});
//点击设置页面属性
$("#page_set_one").click(function() {
	$(".tc_property").show();
	$(".baocun").addClass("active");
	$("#add_ul li:nth-child(1)").addClass("active").siblings().removeClass("active");
	$("#pr_con>div:nth-child(1)").addClass("active").siblings().removeClass("active");
	getPageSet();
	getPubView();
});
$("#page_set_two").click(function() {
	$(".tc_property").show();
	$(".baocun").addClass("active");
	$("#add_ul li:nth-child(2)").addClass("active").siblings().removeClass("active");
	$("#pr_con>div:nth-child(2)").addClass("active").siblings().removeClass("active");
	getPageSet();
	getPubView();
});
//点击切换页面设置
$("#add_ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(this).parent().parent().siblings(".pr_con").children(".pr_con_div").eq(index).addClass("active");
	$(this).parent().parent().siblings(".pr_con").children(".pr_con_div").eq(index).siblings().removeClass("active");
});
$(".pr_put>.se_pub").click(function() {
	if($(this).hasClass("active")) {
		$(this).removeClass("active");
		$(this).attr("data-type", "0");
	} else {
		$(this).addClass("active");
		$(this).attr("data-type", "1");
	}
});
$(".baocun").click(function() {
	$(this).removeClass("active");
	$.ajax({
		url: "https://cms.yingxiong.com/site/del-html",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			alert("发布成功");
		},
		error: function() {
			alert("发布成功");
		}
	});
});
//获取页面设置信息
function getPageSet() {
	$.ajax({
		url: alt + "moduleapi/common/get-web-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#iframe").contents().find('meta[name="keywords"]').attr('content', data.data.info.web_key.value);
			$("#iframe").contents().find('meta[name="description"]').attr('content', data.data.info.web_desc.value);
			$("#iframe").contents().find("#lo_title").attr("content", data.data.info.web_title.value);
			$('#key_name').val(data.data.info.web_key.value);
			$('#des_name').val(data.data.info.web_desc.value);
			$("#web_name").val(data.data.info.web_title.value);
			var html = "";
			for(var i in data.data.info.web_icon.img_log) {
				html += '<li data-id=' + data.data.info.web_icon.img_log[i].id + ' data-title=' + data.data.info.web_icon.img_log[i].name + '><img src=' + data.data.info.web_icon.img_log[i].img + ' /><i class="gou"></i><p>预览</p></li>';
			};
			var str = '<li data-id=' + data.data.info.web_icon.id + ' data-title=' + data.data.info.web_icon.key + '><img src=' + data.data.info.web_icon.value + ' /><i class="gou"></i><p>预览</p></li>'
			if(html == "" || html == undefined) {
				$("#pa_ul").html(null).append(str);
				$("#pa_ul li").removeClass("active");
				$("#pa_ul li:nth-child(1)").addClass("active");
			} else {
				$("#pa_ul").html(null).append(html);
				$("#pa_ul li").removeClass("active");
				$("#pa_ul li:nth-child(1)").addClass("active");
			}
		},
		error: function() {

		}
	});
}
//点击确定修改页面信息
$("#p_sure").click(function() {
	var web_name = $("#web_name").val();
	var web_keywords = $("#key_name").val();
	var web_description = $("#des_name").val();
	$.ajax({
		url: alt + "moduleapi/common/update-web",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"web_icon": $("#pa_ul li.active img").attr("src"),
			"web_icon_log[0][name]": $("#pa_ul li.active").attr("data-title"),
			"web_icon_log[0][img]": $("#pa_ul li.active img").attr("src"),
			"web_title": web_name,
			"web_key": web_keywords,
			"web_desc": web_description,
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getPageSet();
			}
		},
		error: function() {

		}
	});
});
//获取页面公共组件信息
function getPubView() {
	$.ajax({
		url: alt + "moduleapi/common/get-public-info",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {

		},
		success: function(respon) {
			var data = eval(respon);
			$("#pub_dm").val(data.data.web_count);
			//			if(data.data.info.public_top_js.value == 1) {
			//				//				$("body").prepend('<script type="text/javascript" src="//cdnstatic.yingxiong.com/head/js/topbar.js"></script>');
			//				$(".pr_put>.se_pub:nth-child(1)").addClass("active");
			//				link_top = true;
			//			} else {
			//				//				$("body").html(null);
			//				$("#bg_top").css("margin-top", "48px");
			//				link_top = false;
			//			}
			if(data.data.info.public_button_js.value == 1) {
				$("#iframe").contents().find("#sf_di").append('<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>');
				$(".pr_put>.se_pub:nth-child(1)").addClass("active");
			} else {
				$("#iframe").contents().find("#sf_di").html(null);
			}
			$("#iframe").contents().find("#body").append(data.data.web_count);
		},
		error: function() {

		}
	});
}
//点击确定修改公共组件
$("#g_sure").click(function() {
	//	var pub_top = $(".pr_put>.se_pub:nth-child(1)").attr("data-type");
	var pub_footer = $(".pr_put>.se_pub:nth-child(1)").attr("data-type");
	var web_count = $("#pub_dm").val();
	$.ajax({
		url: alt + "moduleapi/common/update-public",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			//			"public_top_js": pub_top,
			"public_button_js": pub_footer,
			"web_count": web_count
		},
		success: function(respon) {
			var data = eval(respon);
			if(respon.status == 0) {
				alert("保存成功");
				getPubView();
			}
		},
		error: function() {

		}
	});
});
//点击登录
$(".tc_dl").click(function() {
	var admin_name = $("#u_count").val();
	var admin_pwd = $("#u_password").val();
	if(admin_name == "" || admin_name == undefined) {
		alert("用户名不能为空");
		return;
	}
	if(admin_pwd == "" || admin_pwd == undefined) {
		alert("密码不能为空");
		return;
	}
	$.ajax({
		url: alt + "moduleapi/login/index",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"admin_name": admin_name,
			"admin_pwd": admin_pwd,
		},
		success: function(data) {
			var data = eval(data);
			if(data.status == 0) {
				alert("登录成功");
				location.href = "/?diy=yse";
				getIsLogin();
			} else {
				alert(data.msg);
			}
		},
		error: function() {

		}
	});
});
$(".show-img-tc").click(function(e) {
	if(e.target == $(".show-img-tc")[0]) {
		$(".show-img-tc").hide();
	}
})
//左侧导航栏切换
$(".l_menu ul li").click(function() {
	var index = $(this).index();
	$(this).addClass("active").siblings().removeClass("active");
	$(this).parent().parent().siblings(".r_con").children(".r_con_div").eq(index).addClass("active");
	$(this).parent().parent().siblings(".r_kv").children(".r_con_div").eq(index).addClass("active");
	$(this).parent().parent().siblings(".r_kv").children(".r_con_div").eq(index).siblings().removeClass("active");
	$(this).parent().parent().siblings(".r_con").children(".r_con_div").eq(index).siblings().removeClass("active");
	$(".set-control").hide();
	$(".baocun").addClass("active");
	if($(this).html() == "新闻") {
		add_article(page, "", "zonghe");
		//获取文章分类 
		$ajax('/moduleapi/category/get-article-list', {}, function(data) {
			var list = data.data;
			article_type = data.data;
			var ele = "";
			for(var key in list) {
				ele += '<li data-id="' + key + '">' + list[key] + '</li>';
			}
			$(".article_tc .dropdown ul").append(ele);
			$(".article_tc .dropdown input").val(list[0]);
			$(".article_tc .dropdown input").attr("data-id", Object.keys(list)[0]);
		})
	} else if($(this).html() == "导航") {
		getDh();
		getMenu();
	} else if($(this).html() == "预约按钮") {
		getWyy();
		getJimg();
	} else if($(this).html() == "下载按钮") {
		getWyy();
	} else if($(this).html() == "视频按钮") {
		getVideo();
	} else if($(this).html() == "预约模块") {
		getYy();
	} else if($(this).html() == "预约弹窗") {
		getTc();
	} else if($(this).html() == "进度条") {
		getJd();
	} else if($(this).html() == "节点设置") {
		getJie();
	} else if($(this).html() == "轮播图") {
		getTeseLb();
	} else if($(this).html() == "官方下载" || $(this).html() == "tap下载") {
		getDown();
	} else if($(this).html() == "新闻KV") {
		getNews();
	}
});
//点击wap预览
$(".yulan").click(function() {
	var type = 'index';
	$.ajax({
		url: alt + "moduleapi/common/get-ewm",
		type: 'POST',
		async: true,
		xhrFields: {
			withCredentials: true
		},
		data: {
			"type": 'index',
			"url": '/m/index.html',
		},
		success: function(data) {
			var data = eval(data);
			if(data.status == 0) {
				$(".small_img img").attr("src", data.data);
				$(".small_img p").show();
				$(".big_img").show();
			} else {
				alert(data.msg);
			}
		},
		error: function() {

		}
	});
});

function initColor(obj, dom) {
	$(obj).colpick({
		// layout:'rgbhex',
		color: 'e028c8',
		colorScheme: 'dark',
		onSubmit: function(hsb, hex, rgb, el) {
			$(el).colpickHide();
			$(dom).css("color", '#' + hex);
			$(obj).css("background", '#' + hex);
		}
	})
};
var ele;
$(function() {
	$("#iframe").attr("src" , 'index.html' + link_str);
	$("#ios_text").focus(function() {
		$("#ios_control").show();
		initColor("#picker", "#ios_text");
		ele = "#ios_text";
		$("#and_control").hide();
	});
	$("#and_text").focus(function() {
		$("#and_control").show();
		initColor("#picker01", "#and_text");
		ele = "#and_text";
		$("#ios_control").hide();
	});
	$("#fr_value").focus(function() {
		$("#control_node1").show();
		initColor("#node1", "#fr_value");
		ele = "#fr_value";
		$("#control_node2").hide();
		$("#control_node3").hide();
		$("#control_node4").hide();
		$("#control_node5").hide();
	});
	$("#se_value").focus(function() {
		$("#control_node2").show();
		initColor("#node2", "#se_value");
		ele = "#se_value";
		$("#control_node1").hide();
		$("#control_node3").hide();
		$("#control_node4").hide();
		$("#control_node5").hide();
	});
	$("#th_value").focus(function() {
		$("#control_node3").show();
		initColor("#node3", "#th_value");
		ele = "#th_value";
		$("#control_node1").hide();
		$("#control_node2").hide();
		$("#control_node4").hide();
		$("#control_node5").hide();
	});
	$("#fo_value").focus(function() {
		$("#control_node4").show();
		initColor("#node4", "#fo_value");
		ele = "#fo_value";
		$("#control_node1").hide();
		$("#control_node2").hide();
		$("#control_node3").hide();
		$("#control_node5").hide();
	});
	$("#ve_value").focus(function() {
		$("#control_node5").show();
		initColor("#node5", "#ve_value");
		ele = "#ve_value";
		$("#control_node1").hide();
		$("#control_node2").hide();
		$("#control_node3").hide();
		$("#control_node4").hide();
	});
	$("#game_title").focus(function() {
		$("#title_control").show();
		$("#stitle_control").hide();
		initColor("#game_style", "#game_title");
		ele = "#game_title";
	});
	$("#game_sub_title").focus(function() {
		$("#stitle_control").show();
		$("#title_control").hide();
		initColor("#wgame_style", "#game_sub_title");
		ele = "#game_sub_title";
	});
	$("#f_title01").focus(function() {
		$("#control_down").show();
		initColor("#down1", "#f_title01");
		ele = "#f_title01";
		$("#control_down1").hide();
	});
	$("#f_title02").focus(function() {
		$("#control_down1").show();
		initColor("#down2", "#f_title02");
		ele = "#f_title02";
		$("#control_down").hide();
	});
	$("#s_title01").focus(function() {
		$("#control_wdown").show();
		initColor("#wdown", "#s_title01");
		ele = "#s_title01";
		$("#control_wdown1").hide();
	});
	$("#s_title02").focus(function() {
		$("#control_wdown1").show();
		initColor("#wdown1", "#s_title02");
		ele = "#s_title02";
		$("#control_wdown").hide();
	});
	$("#l_title01").focus(function() {
		$("#control_qdown").show();
		initColor("#qdown", "#l_title01");
		ele = "#l_title01";
		$("#control_qdown1").hide();
	});
	$("#l_title02").focus(function() {
		$("#control_qdown1").show();
		initColor("#qdown1", "#l_title02");
		ele = "#l_title02";
		$("#control_qdown").hide();
	});
	$("#conduct").focus(function() {
		$("#jd_control").show();
		initColor("#jd_down", "#conduct");
		ele = "#conduct";
	});
	$("#menu1").focus(function() {
		$("#link_one").show();
		initColor("#l_one", "#menu1");
		ele = "#menu1";
	});
	$("#menu2").focus(function() {
		$("#link_two").show();
		initColor("#l_two", "#menu2");
		ele = "#menu2";
	});
	$("#menu3").focus(function() {
		$("#link_three").show();
		initColor("#l_three", "#menu3");
		ele = "#menu3";
	});
	$("#btt_txt").focus(function() {
		$("#btn_color").show();
		initColor("#btn_style", "#btt_txt");
		ele = "#btt_txt";
	});
	// 加粗
	$(".bold").click(function() {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(ele).css("font-weight", "normal");
		} else {
			$(this).addClass("active");
			$(ele).css("font-weight", "bold");
		}
	})
	// 倾斜
	$(".lean").click(function() {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(ele).css("font-style", "normal");
		} else {
			$(this).addClass("active");
			$(ele).css("font-style", "italic");
		}
	})
	// 下划线
	$(".underline").click(function() {
		if($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(ele).css("text-decoration", "none");
		} else {
			$(this).addClass("active");
			$(ele).css("text-decoration", "underline");
		}
	})
	// 字体
	$(".font_family").click(function() {
		$(this).find("ul").toggle();
		$(this).siblings("div").find("ul").hide();
	});
	$(".font-list li").click(function(e) {
		var html = $(this).html();
		e.stopPropagation();
		$(this).parent().hide();
		$(this).parent().siblings("div").find("p").html(html);
		$(ele).css("font-family", $(this).attr("font-family"));
	});
	// 字号
	$(".font-size").click(function() {
		$(this).find("ul").toggle();
		$(this).siblings("div").find("ul").hide();
	})
	$(".font-list li").click(function(e) {
		var html = $(this).html();
		e.stopPropagation();
		$(this).parent().hide();
		$(this).parent().siblings("div").find("p").html(html);
		$(ele).css("font-size", $(this).attr("font-size") + 'px');
	})
});