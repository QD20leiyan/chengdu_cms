var mySwiper = new Swiper('.d_banner', {
	loop: true,
	pagination: '.swiper-pagination',
	effect: 'coverflow',
	slidesPerView: 3,
	centeredSlides: true,
	prevButton: '.swiper-button-prev',
	nextButton: '.swiper-button-next',
	coverflow: {
		rotate: 50,
		stretch: -100,
		depth: 200,
		modifier: 1,
		slideShadows: false
	},
	observer: true,
	observeParents: true,
});

var mySwiper = new Swiper('.z_banner', {
	loop: true,
	autoplay: 3000,
	prevButton: '.swiper-button-prev',
	nextButton: '.swiper-button-next',
	observer: true,
	observeParents: true,
});
var invite_code = "";
var isPic = false;
var baseId = 0;
var headImg = "";
var userUrl = "/hero/inv/get-user-info.html" + h5_jk_url;
var giftUrl = "/hero/inv/get-gift.html" + h5_jk_url;
var imgUrl = "/hero/inv/light.html" + h5_jk_url;
var addressUrl = "/hero/inv/save-address.html" + h5_jk_url;
var getImgUrl = "/hero/inv/get-wx-img.html" + h5_jk_url;
var share_url = "";
var w_info = "";
var txtArray = ["躺着就吃鸡！你也来试试？", "吃汉堡就能拿手机！你也来试试？", "吃鸡中奖两不误！你也来试试？", "直达天命圈！你也来试试？"];

function getImg() {
	$.get(getImgUrl, {}, function(data) {
		if(data.code == 0) {
			$(".last_tou img").attr("src", data.data.cdn_img);
		} else {
			$(".message_body p").html(data.msg);
			$(".message").show();
		}
	}, "json");
}
//初始化登录状态判断
function isLogin() {
	$.post(userUrl, {
		"invite_code" : getQueryString("invite_code"),
	}, function(data) {
		if(data.code == 0) {
			if(data.data.is_invalid){
                $('.js_load').find('p').text('活动已过期');
                return
			} else{
                $('.js_load').fadeOut(200);
			}

			var msg = data.data;
			baseId = msg.gift_id;
			getQueryString("invite_code");
			headImg = msg.cdn_img;
			invite_code = getQueryString('invite_code');
			if(invite_code == "" || invite_code == undefined) {
				$(".my_page").show();
				$(".other_page").hide();
				$(".last_tou img").attr("src", msg.wxInfo.headimgurl);
				$(".l_tou p").html(msg.wxInfo.nickname);
				share_url = "http://h5.yingxiong.com/index/hero/inv.html?invite_code=" + msg.wxInfo.openid;
			} else if(invite_code != "" && msg.inviteUser == "" || msg.inviteUser == undefined || msg.inviteUser.length < 0){
				window.location.href = "http://h5.yingxiong.com/index/hero/inv.html?info=" + wxinfo;
			} else {
				$(".t_pic").attr("src", msg.inviteUser.headimgurl);
				$(".w_name").html(msg.inviteUser.nickname);
				$(".my_page").hide();
				$(".other_page").show();
				share_url = "http://h5.yingxiong.com/index/hero/inv.html?invite_code=" + invite_code;
			}
			wxShare();
			if(headImg != "") {
				$(".last_tou img").attr("src", headImg);
			}
			$(".d_title span").html(msg.wxInfo.nickname);
			var index = Math.floor((Math.random() * txtArray.length));
			$(".rondom p").html(txtArray[index]);
			if(baseId == 351) {
				$(".l_img").attr("src", alt + "images/img07.png" + c_number);
			} else if(baseId == 352) {
				$(".l_img").attr("src", alt + "images/img02.png" + c_number);
			} else if(baseId == 353) {
				$(".l_img").attr("src", alt + "images/img01.png" + c_number);
			} else if(baseId == 354) {
				$(".l_img").attr("src", alt + "images/img08.png" + c_number);
			} else if(baseId == 355) {
				$(".l_img").attr("src", alt + "images/img09.png" + c_number);
			} else if(baseId == 356) {
				$(".l_img").attr("src", alt + "images/img06.png" + c_number);
			} else if(baseId == 357) {
				$(".l_img").attr("src", alt + "images/img10.png" + c_number);
			} else if(baseId == 358) {
				$(".l_img").attr("src", alt + "images/img04.png" + c_number);
			} else if(baseId == 359) {
				$(".l_img").attr("src", alt + "images/img11.png" + c_number);
			} else if(baseId == 360) {
				$(".l_img").attr("src", alt + "images/img12.png" + c_number);
			} else if(baseId == 361) {
				$(".l_img").attr("src", alt + "images/img03.png" + c_number);
			} else if(baseId == 362) {
				$(".l_img").attr("src", alt + "images/img_05.png" + c_number);
			} else if(baseId == 363) {
				$(".l_img").attr("src", alt + "images/img005.png" + c_number);
			}
			var li_pic = msg.pt_id;
			if(li_pic.length < 0){
				$(".pintu li").removeClass("active");
			} else {
				for(var o in li_pic) {
					$(".pintu li").each(function(i, n) {
						var p = i + 1;
						if(li_pic[o] == p) {
							$(n).addClass("active");
						}
					});
				}
			}
			var two_pic = msg.inviteUser.pt_id;
			if(two_pic){
				if(two_pic.length < 0){
					$(".pintu_two li").removeClass("active");
				} else {
					for(var o in two_pic) {
						$(".pintu_two li").each(function(i, n) {
							var p = i + 1;
							if(two_pic[o] == p) {
								$(n).addClass("active");
							}
						});
					};
				}
			}
			if(li_pic.length < 6) {
				$(".kv_btn").removeClass("active");
				$("#tu_num").html(li_pic.length);
				console.log(li_pic.length);
				isPic = false;
			} else {
				$(".kv_btn").addClass("active");
				isPic = true;
			}
            //虚拟物品
            if(data.data.gift_id>=358){
                $('.kv_btn').addClass('active');
                isPic = true;
            }

		} else {

		}
	}, "json");
};
//点击点亮拼图提示
$(".chance_btn").click(function() {
    if(isPic) {
        $.get(giftUrl, {}, function(data) {
            showDialog(data);
        }, "json");
    } else {
        $(".fail").show();
    }
});
function showDialog(data){
    if(data.code == 0) {
        var msg = data.data;
        baseId = msg.gift_id;
        if(baseId == 351) {
            $("#sw_img").attr("src", alt + "images/img07.png");
            $("#sw_name").html("Motorola P30 手机");
            $('.addr-gift-text').text('Motorola P30 手机');
            $(".l_img").attr("src", alt + "images/img07.png" + c_number);
            $(".dizhi").show();
            // $(".y_dizhi").show();
        } else if(baseId == 352) {
            $("#sw_img").attr("src", alt + "images/img02.png");
            $("#sw_name").html("巴塞利斯蛇雷蛇鼠标");
            $('.addr-gift-text').text('巴塞利斯蛇雷蛇鼠标');
            $(".l_img").attr("src", alt + "images/img02.png" + c_number);
            $(".dizhi").show();
            // $(".y_dizhi").show();
        } else if(baseId == 353) {
            $("#sw_img").attr("src", alt + "images/img01.png");
            $("#sw_name").html("DRACONITE帽子");
            $('.addr-gift-text').text('DRACONITE帽子');
            $(".l_img").attr("src", alt + "images/img01.png" + c_number);
            $(".dizhi").show();
            // $(".y_dizhi").show();
        } else if(baseId == 354) {
            $("#sw_img").attr("src", alt + "images/img08.png");
            $("#sw_name").html("初弎项链");
            $('.addr-gift-text').text('初弎项链');
            $(".l_img").attr("src", alt + "images/img08.png" + c_number);
            $(".dizhi").show();
            // $(".y_dizhi").show();
        } else if(baseId == 355) {
            $("#sw_img").attr("src", alt + "images/img09.png");
            $("#sw_name").html("coexistence单肩包");
            $('.addr-gift-text').text('coexistence单肩包');
            $(".l_img").attr("src", alt + "images/img09.png" + c_number);
            $(".dizhi").show();
            // $(".y_dizhi").show();
        } else if(baseId == 356) {
            $("#sw_img").attr("src", alt + "images/06.png");
            $("#sw_name").html("王牌周边体恤");
            $('.addr-gift-text').text('王牌周边体恤');
            $(".l_img").attr("src", alt + "images/img06.png" + c_number);
            $(".dizhi").show();
        } else if(baseId == 357) {
            $("#sw_img").attr("src", alt + "images/img10.png");
            $("#sw_name").html("王牌周边空投");
            $('.addr-gift-text').text('王牌周边空投');
            $(".l_img").attr("src", alt + "images/img10.png" + c_number);
            $(".dizhi").show();
        } else if(baseId == 358) {
            $("#kl_img").attr("src", alt + "images/img04.png");
            $("#kl_name").html("DRACONITE优惠卷（无门槛—20）");
            $('.d_desc').text('请收下（超值优惠券），明日继续领奖！');
            $(".kl_txt").html("€zdceb1fDuwe€");
            $(".l_img").attr("src", alt + "images/img04.png" + c_number);
            $(".k_dizhi").show();
        } else if(baseId == 359) {
            $("#kl_img").attr("src", alt + "images/img11.png");
            $("#kl_name").html("初弎优惠卷（无门槛—20）");
            $('.d_desc').text('请收下（超值优惠券），明日继续领奖！');
            $(".kl_txt").html("€xrl0b1fFj2W€");
            $(".l_img").attr("src", alt + "images/img11.png" + c_number);
            $(".k_dizhi").show();
        } else if(baseId == 360) {
            $("#kl_img").attr("src", alt + "images/img12.png");
            $("#kl_name").html("coexistence优惠卷（无门槛—20）");
            $('.d_desc').text('请收下（超值优惠券），明日继续领奖！');
            $(".kl_txt").html("€lwzLb1fFBc5€");
            $(".l_img").attr("src", alt + "images/img12.png" + c_number);
            $(".k_dizhi").show();
        } else if(baseId == 361) {
            $("#wp_img").attr("src", alt + "images/img03.png");
            $("#wp_name").html("游戏礼包码");
            $('.d_desc').html('请收下《王牌战争》吃鸡大礼包<br>明日继续领奖！');
            $(".wp_code").html(msg.code);
            $(".l_img").attr("src", alt + "images/img03.png" + c_number);
            $(".x_dizhi").show();
        } else if(baseId == 362) {
            $("#yh_img").attr("src", alt + "images/img_05.png");
            $("#yh_name").html("汉堡王优惠券K37");
            $('.d_desc').text('请收下（超值优惠券），明日继续领奖！');
            $(".l_img").attr("src", alt + "images/img_05.png" + c_number);
            $(".y_dizhi").show();
        } else if(baseId == 363) {
            $("#yh_img").attr("src", alt + "images/img005.png");
            $("#yh_name").html("汉堡王优惠券K38");
            $('.d_desc').text('请收下（超值优惠券），明日继续领奖！');
            $(".l_img").attr("src", alt + "images/img005.png" + c_number);
            $(".y_dizhi").show();
        }
    } else {
    	$('.fail').show();
        // $(".message_body p").html(data.msg);
        // $(".message").show();
    }
}
//点击关闭按钮关闭弹窗
$(".close").click(function() {
	$(this).parent().parent().hide();
});
//点击确定关闭弹窗
$(".make_sure").click(function() {
	$(this).parent().parent().parent().hide();
});
//点击邀请好友助力按钮提示分享
$(".invite_btn").click(function() {
	$("#share_img").show();
})
$("#share_img").click(function() {
	$(this).hide();
});
$(".open_share").click(function (){
	$("#share_img").show();
	$(".fail").hide();
});
//点击分享中奖信息按钮判断状况
$(".share_btn").click(function() {
	//全部点亮跳转最后截屏
	if(isPic && baseId != "") {
		if(headImg == "") {
			getImg();
		}
		$(".js_load").show();
		$(".my_page").hide();
		$(".other_page").hide();
		$(".last_page").show();
		$('.baocun').show();
		$("body,html").css("overflow" , "hidden");
		setTimeout(function() {
			var canvas2 = document.createElement("canvas");
			let _canvas = document.querySelector('#last_page');
			var w = parseInt(window.getComputedStyle(_canvas).width);
			var h = parseInt(window.getComputedStyle(_canvas).height);
			canvas2.width = w * 4;
			canvas2.height = h * 4;
			canvas2.style.width = w + "px";
			canvas2.style.height = h + "px";
			var context = canvas2.getContext("2d");
			context.scale(4, 4);
			html2canvas(_canvas, {
				canvas: canvas2,
				useCORS: true
			}).then(function(canvas) {
				$(".js_load").hide();
				$("#z_img").attr("src", canvas.toDataURL("data:image/jpeg"));
			});
		}, 3000);
	} else if(isPic && baseId == "") {
		if(headImg == "") {
			getImg();
		}
		$.get(giftUrl, {}, function(data) {
			if(data.code == 0) {
				var msg = data.data;
				if(msg.gift_id == 351) {
					$(".l_img").attr("src", alt + "images/img07.png" + c_number);
				} else if(msg.gift_id == 352) {
					$(".l_img").attr("src", alt + "images/img02.png" + c_number);
				} else if(msg.gift_id == 353) {
					$(".l_img").attr("src", alt + "images/img01.png" + c_number);
				} else if(msg.gift_id == 354) {
					$(".l_img").attr("src", alt + "images/img08.png" + c_number);
				} else if(msg.gift_id == 355) {
					$(".l_img").attr("src", alt + "images/img09.png" + c_number);
				} else if(msg.gift_id == 356) {
					$(".l_img").attr("src", alt + "images/img06.png" + c_number);
				} else if(msg.gift_id == 357) {
					$(".l_img").attr("src", alt + "images/img10.png" + c_number);
				} else if(msg.gift_id == 358) {
					$(".l_img").attr("src", alt + "images/img04.png" + c_number);
				} else if(msg.gift_id == 359) {
					$(".l_img").attr("src", alt + "images/img11.png" + c_number);
				} else if(msg.gift_id == 360) {
					$(".l_img").attr("src", alt + "images/img12.png" + c_number);
				} else if(msg.gift_id == 361) {
					$(".l_img").attr("src", alt + "images/img03.png" + c_number);
				} else if(msg.gift_id == 362) {
					$(".l_img").attr("src", alt + "images/img_05.png" + c_number);
				} else if(msg.gift_id == 363) {
					$(".l_img").attr("src", alt + "images/img005.png" + c_number);
				}
				$(".js_load").show();
				$(".my_page").hide();
				$(".other_page").hide();
				$(".last_page").show();
				$("body,html").css("overflow" , "hidden");
				setTimeout(function() {
					var canvas2 = document.createElement("canvas");
					let _canvas = document.querySelector('#last_page');
					var w = parseInt(window.getComputedStyle(_canvas).width);
					var h = parseInt(window.getComputedStyle(_canvas).height);
					canvas2.width = w * 4;
					canvas2.height = h * 4;
					canvas2.style.width = w + "px";
					canvas2.style.height = h + "px";
					var context = canvas2.getContext("2d");
					context.scale(4, 4);
					html2canvas(_canvas, {
						canvas: canvas2,
						useCORS: true
					}).then(function(canvas) {
						$(".js_load").hide();
						$("#z_img").attr("src", canvas.toDataURL("data:image/jpeg"));
					});
				}, 3000);
			}
		}, "json");
	} else {
		$(".fail").show();
	}
});
//点击帮他点亮按钮
$(".help").click(function() {
	$.post(imgUrl, {
		"invite_code": invite_code,
	}, function(data) {
		if(data.code == 0) {
			var index = data.data.pt_id - 1;
			$(".pintu_two li").eq(index).addClass("active");
		} else {
			$(".message_body p").html(data.msg);
			$(".message").show();
		}
	}, "json");
});
//点击帮他扩散按钮
$(".kuosan").click(function() {
	$("#share_img").show();
});
//点击我也要抢
$(".qiang").click(function() {
	// window.location.href = "http://h5.yingxiong.com/index/hero/inv.html?info=" + wxinfo;
    $('.tips-dialog').show();
});
//点击复制口令
$("#tc11_copyBtnz").click(function() {
	alert("已复制");
});
//点击复制兑换码
$("#tc12_copyBtnz").click(function() {
	alert("已复制");
});
//点击填写地址按钮弹出地址弹框
$(".tianxie").click(function() {
	$(".dizhi").hide();
	$(".address").show();
});
//填写地址请求
$("#add_sure").click(function() {
	var name = $("#name").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	if(name == "" || name == undefined) {
		alert("姓名不能为空");
		return;
	}
	if(phone == "" || phone == undefined) {
		alert("手机号不能为空");
		return;
	}
	if(phone.length != 11) {
		alert("请输入正确的手机号");
		return;
	}
	if(address == "" || address == undefined) {
		alert("地址不能为空");
		return;
	}
	$.post(addressUrl, {
		"name": name,
		"phone": phone,
		"address": address
	}, function(data) {
		if(data.code == 0) {
			alert("提交成功");
			$(".address").hide();
		} else {
			alert(data.msg);
		}
	}, "json");
});
window.onload = function() {
     //    $(".js_load").fadeOut(200);
};
$(function() {
    isLogin();
	//初始化复制分享链接
	new Clipboard('#tc11_copyBtnz');
	new Clipboard('#tc12_copyBtnz');
});