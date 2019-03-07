    var yy_num_dc1=false;
    var yy_num_dc2=false;
    var yy_num_dc3=false;
    var yy_num_dc4=false;
    var yy_num_dc5=false;
    var fx_num_dc1=false;
    var fx_num_dc2=false;
    var fx_num_dc3=false;
    var fx_num_dc4=false;
    var cz_num_cs1="";
    var cz_num_cs2="";
    var cz_num_cs3="";
    var peo_num="";
    var gift_id_code0="";
    var gift_id_code1="";
    var gift_id_code2="";
    var gift_id_code3="";
    var gift_id_code4="";
    var gift_id_code5="";
    var gift_id_code6="";
    var gift_id_code7="";
    var gift_id_code8="";
    var xt_fx1="";
    var xt_fx2="";
    var xt_fx3="";
    var xt_fx4="";
    var info_code="";
    var lb_code_fx="";
    function md_ym_sy1(){
    var num = 0;
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push("dfzj_inv_selfpage1");
                clearInterval(timer);
            }
        }, 500);
}

    function dfzj_inv_share(){
            HLog.event("dfzj_inv_share");
        }
function md_ym_sy2(){
    var num = 0;
        var timer = setInterval(function () {
            if (!window.HLog) {
                num++;
                if (num >= 10) {
                    clearInterval(timer);
                }
            } else {
                HLog.push("dfzj_inv_friendpage1");
                clearInterval(timer);
            }
        }, 500);
}
    // 微信信息
    function wx_o(){
        if(is_me_ == 1){
            share_url='http://h5.yingxiong.com/index/dfzj/inv.html?invite_code='+openid;
        }else{
            share_url='http://h5.yingxiong.com/index/dfzj/inv.html?invite_code='+invite_code;
        }
        var share_icon=$(".header").attr("data-icon");
        var share_title=$(".header").attr("data-title");
        var share_desc=$(".header").attr("data-desc");
        var share = {
            imgUrl      : "http:"+share_icon,
            shareTitle  : share_title,
            descContent : share_desc,
            lineLink    : share_url
        };
        wx.config({
            debug     : false,
            appId     : wx_conf.appId,
            timestamp : wx_conf.timestamp,
            nonceStr  : wx_conf.nonceStr,
            signature : wx_conf.signature,
            jsApiList : [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ]
        });
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                     dfzj_inv_share();
                }
            });
            wx.onMenuShareTimeline({
                title   : share.shareTitle,
                desc    : share.descContent,
                link    : share.lineLink,
                imgUrl  : share.imgUrl,
                success : function() {
                    dfzj_inv_share();
                }
            });

            wx.onMenuShareQQ({
                title: share.shareTitle,
                desc: share.descContent,
                link: share.lineLink,
                imgUrl: share.imgUrl,
                success : function() {
                    dfzj_inv_share();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        })
        }
     //判断邀请码
    function getPercent1(number1) {
    var percent =parseFloat(1-(parseInt(number1) / 20000).toFixed(2))*100;
    return percent;

};
function getPercent2(number2) {
    var percent =100 - parseFloat((parseInt(number2) / 50000).toFixed(2))*100;
    return percent;

};
    //判断邀请码
    function in_code(){
        invite_code = getQueryString('invite_code');
        if(invite_code=="" || invite_code==undefined){
            is_me_=1;
            invite_code=openid;
            wx_o();
        }else{
            is_me_=0;
            wx_o();
            invite_code=getQueryString('invite_code');
        }
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|s$)"); // 匹配目标参数
        var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
        if(result != null) {
            return decodeURIComponent(result[2]);
        } else {
            return null;
        }
    }
    //记录滚动效果
    function autoScroll(obj) {
        $(obj).animate({
            marginTop: "-1.34375rem"
        }, 1000, function() {
            $(this).css({
                marginTop: "0px"
            }).find("li:first").appendTo(this);
        });
    }
    //初始化
function userinfo() {
	$.ajax({
		type: 'POST',
		url: "/dfzj/inv/get-user-info.html"+h5_jk_url,
		data: {"invite_code" : getQueryString("invite_code")},
        'dataType':'Json',
		success: function(data) {
			if(data.code == 0) {
                info_code=window.location.href.split('info=')[1];
				invite_code = getQueryString('invite_code');
				openid=data.data.openid;
				username=data.data.nickname;
                zm_nym=data.data.invLogs;
                var len=0;
                var len2=0;
                for(var i in data.data.invLogs){
                    len++;
                }
                for(var j in data.data.hurtLogs){
                    len2++;
                }
                zm_nym2=len;
                 in_code();
                 $("#zm_num").html(zm_nym2);
                 peo_num =len;
                if(is_me_==1){
                     
                    $("#user").html(username);
                    cz_num_cs1=String(data.data.num.getNum);
                cz_num_cs2=String(data.data.num.useNum);
                cz_num_cs3=String(cz_num_cs1 - cz_num_cs2);
                $("#cz_cs,#jg_jh").html(cz_num_cs3);
                gift_id_code0=data.data.giftCodeLog['380'];
                gift_id_code1=data.data.giftCodeLog['381'];
                gift_id_code2=data.data.giftCodeLog['382'];
                gift_id_code3=data.data.giftCodeLog['383'];
                gift_id_code4=data.data.giftCodeLog['384'];
                gift_id_code5=data.data.giftCodeLog['385'];
                gift_id_code6=data.data.giftCodeLog['386'];
                gift_id_code7=data.data.giftCodeLog['387'];
                gift_id_code8=data.data.giftCodeLog['388'];
                xt_fx1=String(data.data.attackTarget["1"].useBlood);
                xt_fx2=String(data.data.attackTarget["2"].useBlood);
                xt_fx3=String(data.data.attackTarget["3"].useBlood);
                xt_fx4=String(data.data.attackTarget["4"].useBlood);
                
                if(len2 > 0){
                    var result = '';
                        for(var i = 0; i < data.data.hurtLogs.length; i++) {
                            result += "<li><p>成功对防线"+data.data.hurtLogs[i].target+"造成<span class='shangh_num'>"+data.data.hurtLogs[i].hurt+"</span>点伤害。<span class='date_time'>"+data.data.hurtLogs[i].created_at+"</span></p></li>";
                        }
                         $(".jg_record ul").append(result);
                         if($(".jg_record ul li").length>1){
                            setInterval('autoScroll(".jg_record ul")', 1500);
                        }
                }else{
                    $(".jg_record ul").html('<li><p>暂无攻击数据</p></li>');
                }
                }else{
                    $("#user").html(data.data.nickname);
                }

                if(xt_fx1>=0){
                    $(".fx_one .xt_cd").css({
                        height: getPercent1(xt_fx1) + "%"
                    });
                    if(xt_fx1>=20000){
                       $(".fx_one .fx_gj").addClass("active");
                       fx_num_dc1=true;
                    }
                }
                if(xt_fx2>=0){
                    $(".fx_two .xt_cd").css({
                        height: getPercent1(xt_fx2) + "%"
                    });
                    if(xt_fx2>=20000){
                        $(".fx_two .fx_gj").addClass("active");
                        fx_num_dc1=true;
                        fx_num_dc2=true;
                    }
                }
                if(xt_fx3>=0){
                    $(".fx_three .xt_cd").css({
                        height: getPercent1(xt_fx3) + "%"
                    });
                    if(xt_fx3>=20000){
                        $(".fx_three .fx_gj").addClass("active");
                        fx_num_dc1=true;
                        fx_num_dc2=true;
                        fx_num_dc3=true;
                    }
                }
                if(xt_fx4>=0){
                    $(".dj_xt_cd").css({
                        height: getPercent2(xt_fx4) + "%"
                    });
                    if(xt_fx4>=50000){
                         $(".dj_zj_img").addClass("active");
                         fx_num_dc1=true;
                        fx_num_dc2=true;
                        fx_num_dc3=true;
                        fx_num_dc4=true;
                    }
                }
                if(peo_num == 0){
                   $('.jdt').css({
                    'width': '0%'
                   });
                }
                if(peo_num > 0 && peo_num <=50) {
                $('.jdt').css({
                    'width': '7.4%'
                });
                }
                if(peo_num > 50 && peo_num< 100) {
                $('.jdt').css({
                    'width': '11.4%'
                });
                }
                if(peo_num == 100) {
                     $('.jdt').css({
                        'width': '14.4%'
                    });
                    $(".xianshi .first").addClass("active");
                    yy_num_dc1 = true;
                }
                if(peo_num > 100 && peo_num<=150) {
                    $('.jdt').css({
                        'width': '23.4%'
                    });
                    $(".xianshi .first").addClass("active");
                    yy_num_dc1 = true;
                }
       
                if(peo_num > 150 && peo_num <200) {
                     $('.jdt').css({
                        'width': '32.4%'
                    });
                    $(".xianshi .first").addClass("active");
                    yy_num_dc1 = true;
                }
                if(peo_num == 200) {
                     $('.jdt').css({
                        'width': '37%'
                    });
                    $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                }
                if(peo_num > 200 && peo_num <= 250) {
                     $('.jdt').css({
                        'width': '46.4%'
                    });
                      $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                }
                if(peo_num > 250 && peo_num <300) {
                     $('.jdt').css({
                        'width': '54.4%'
                    });
                      $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                }
                if(peo_num == 300) {
                     $('.jdt').css({
                        'width': '60.4%'
                    });
                    $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    $(".xianshi .third").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                    yy_num_dc3 = true;
                }
                if(peo_num > 300 && peo_num <= 400) {
                     $('.jdt').css({
                        'width': '68%'
                    });
                     $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    $(".xianshi .third").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                    yy_num_dc3 = true;
                }
                if(peo_num > 400 && peo_num <500) {
                     $('.jdt').css({
                        'width': '77%'
                    });
                     $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    $(".xianshi .third").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                    yy_num_dc3 = true;
                }
                if(peo_num == 500) {
                 $('.jdt').css({
                    'width': '82%'
                });
                $(".xianshi .first").addClass("active");
                $(".xianshi .second").addClass("active");
                $(".xianshi .third").addClass("active");
                $(".xianshi .four").addClass("active");
                yy_num_dc1 = true;
                yy_num_dc2 = true;
                yy_num_dc3 = true;
                yy_num_dc4 = true;
            }
                if(peo_num > 500 && peo_num <=750) {
                     $('.jdt').css({
                        'width': '89%'
                    });
                      $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    $(".xianshi .third").addClass("active");
                    $(".xianshi .four").addClass("active");
                    yy_num_dc1 = true;
                yy_num_dc2 = true;
                yy_num_dc3 = true;
                yy_num_dc4 = true;
                }
                if(peo_num > 750 && peo_num <1000) {
                     $('.jdt').css({
                        'width': '96%'
                    });
                      $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    $(".xianshi .third").addClass("active");
                    $(".xianshi .four").addClass("active");
                    yy_num_dc1 = true;
                yy_num_dc2 = true;
                yy_num_dc3 = true;
                yy_num_dc4 = true;
                }

                if(peo_num >=1000) {
                    $(".jdt").css({
                        width: "100%"
                    })
                     $(".xianshi .first").addClass("active");
                    $(".xianshi .second").addClass("active");
                    $(".xianshi .third").addClass("active");
                    $(".xianshi .four").addClass("active");
                    $(".xianshi .five").addClass("active");
                    yy_num_dc1 = true;
                    yy_num_dc2 = true;
                    yy_num_dc3 = true;
                    yy_num_dc4 = true;
                    yy_num_dc5 = true;
                }
                if(is_me_==1){
                    $(".zm_cy").removeClass("active");
                    $(".chuzh_btn2").attr("href","javascript:;");
                    $(".chuzh_btn2").click(function(){
                        $(".wrap").removeClass("active");
                        $(".wrap2").addClass("active");
                         HLog.push("dfzj_inv_page2");
                    })
                    $(".chuzh_box .cz_num").show();
                      md_ym_sy1();
                }else{
                    $(".zm_cy").addClass("active");  
                    $(".chuzh_btn2").attr("href","http://h5.yingxiong.com/index/dfzj/inv.html?info="+info_code); 
                     $(".chuzh_btn2").click(function(){
                        HLog.event("dfzj_inv_czBtn_friend");
                     })
                    $(".wy_cz_btn").attr("href","http://h5.yingxiong.com/index/dfzj/inv.html?info="+info_code); 
                    // userinfo();  
                    $(".chuzh_box .cz_num").hide();
                    md_ym_sy2();

                }
				    var strArr = new Array();
				    if(is_me_==1){
				   	    for(var err in data.data.invLogs) {
						   var dm_li ="好友"+data.data.invLogs[err].name + "已为我助力";
						   strArr.push(dm_li);
				    	}
					}else{
						   	 for(var err in data.data.invLogs) {
							var dm_li ="好友"+data.data.invLogs[err].name + "已为他助力";
							strArr.push(dm_li);
						    }
				    }
				var colorArr = ['#fff', '#50f200', '#ffae00', '#00ccff', '#ff0018', '#fff', '#50f200', '#ffae00', '#00ccff', '#ff0018'];
				var toparr = [0,1,2,3,4,5,6];
				function danmufun() {
                    if(zm_nym2 > 0){
					var topindex = Math.floor(toparr.length * Math.random());
					var span = $('<span style="top:' + toparr[topindex] + 'rem;color:' + colorArr[Math.floor(colorArr.length * Math.random())] + ';">' + strArr[Math.floor(strArr.length * Math.random())] + '</span>');
					toparr.splice(topindex, 1);
					span.appendTo(".danmu").animate({
						left: -span.width() + "px"
					}, 10000, 'linear', function() {
						toparr.push(parseFloat($(this).css('top')) / parseFloat($('html').css('fontSize')));
						$(this).remove();
					});
					setTimeout(function() {
						danmufun();
					}, 1500 + Math.random() * 1000);
                }else{
                     $(".danmu").html('<span style="width:100%;text-align:center;color:#cecece;font-size:0.825rem;display:inline-block;left: 0;top: 0.2rem;">暂无好友助力</span>');
                }
               }
				danmufun();
			}
		},
		error: function() {
			alert("网络请求错误，请刷新页面");
		}
	});
}
function code_url1(code) {
    $.ajax({
        type: 'POST',
        url: "/dfzj/inv/get-inv-gift.html"+h5_jk_url,
        data: {'num': code},
        'dataType':'Json',
        success: function(data) {
        if(data.code == 0) {
            gift_id_code0=data.data.giftCodeLog['380'];
            gift_id_code1=data.data.giftCodeLog['381'];
            gift_id_code2=data.data.giftCodeLog['382'];
            gift_id_code3=data.data.giftCodeLog['383'];
            gift_id_code4=data.data.giftCodeLog['384'];
            $(".co_tips_code_jz1 .code_num1").html(data.data.code);
        }
       },
        error: function() {
            alert("网络请求错误，请刷新页面");
            $(".danmu").hide();
        }
    });
}
    //初始判断填写信息
    $(function() {
            // 埋点
            $(".icon").click(function(){
                HLog.event("dfzj_inv_icon");
            })
            $(".down_btn,.down_btn2").click(function(){
                HLog.event("dfzj_inv_download");
            })
            var  h5_wx=$(".h5_wx").html();
    		var  h5_data=$(".h5_data").html();
    		userinfo();
          
    		$(".xianshi .first").click(function(){
    			$(".co_tips_jl1 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
    			$(".co_tips_jl1 .co_form li.li2 img").attr("src",img_url+"images/ico12.png");
    			$(".co_tips_jl1 .co_form li.li3 img").attr("src",img_url+"images/ico13.png");
    			$(".co_tips_jl1 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
    			$(".co_tips_jl1 .jl_img img").attr("src",img_url+"images/ico2.png");
                 $(".co_tips_jl1 .jj_txt").html("成功进阶到上校后获得奖励");
                $(".co_tips_jl1 .co_form2 li.li1 p").html("金币*488");
                $(".co_tips_jl1 .co_form2 li.li2 p").html("燃油*200");
                $(".co_tips_jl1 .co_form2 li.li3 p").html("双倍银币卡*2");
                $(".co_tips_jl1 .co_form2 li.li4 p").html("五星成员凭证宝箱*1");
                $(".lq_btn1").removeClass("on2");
                $(".lq_btn1").removeClass("on3");
                $(".lq_btn1").removeClass("on4");
                $(".lq_btn1").removeClass("on5");
                $(".lq_btn1").addClass("on1");
                $(".co_tips_jl1").show();
                HLog.event("dfzj_inv_cz_shangxiao");

    		})
    		$(".xianshi .second").click(function(){
    			$(".co_tips_jl1 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
    			$(".co_tips_jl1 .co_form li.li2 img").attr("src",img_url+"images/ico12.png");
    			$(".co_tips_jl1 .co_form li.li3 img").attr("src",img_url+"images/ico23.png");
    			$(".co_tips_jl1 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
    			$(".co_tips_jl1 .jl_img img").attr("src",img_url+"images/ico3.png");
                $(".co_tips_jl1 .jj_txt").html("成功进阶到少将后获得奖励");
                $(".co_tips_jl1 .co_form2 li.li1 p").html("金币*688");
                $(".co_tips_jl1 .co_form2 li.li2 p").html("燃油*200");
                $(".co_tips_jl1 .co_form2 li.li3 p").html("双倍掉落卡*2");
                $(".co_tips_jl1 .co_form2 li.li4 p").html("五星成员凭证宝箱*2");
    			$(".lq_btn1").removeClass("on1");
                $(".lq_btn1").removeClass("on3");
                $(".lq_btn1").removeClass("on4");
                $(".lq_btn1").removeClass("on5");
                $(".lq_btn1").addClass("on2");
                $(".co_tips_jl1").show();
                HLog.event("dfzj_inv_cz_shaojiang");
    		})
    		$(".xianshi .third").click(function(){
    			$(".co_tips_jl1 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
    			$(".co_tips_jl1 .co_form li.li2 img").attr("src",img_url+"images/ico14.png");
    			$(".co_tips_jl1 .co_form li.li3 img").attr("src",img_url+"images/ico12.png");
    			$(".co_tips_jl1 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
    			$(".co_tips_jl1 .jl_img img").attr("src",img_url+"images/ico5.png");
                $(".co_tips_jl1 .jj_txt").html("成功进阶到中将后获得奖励");
                 $(".co_tips_jl1 .co_form2 li.li1 p").html("金币*1288");
                $(".co_tips_jl1 .co_form2 li.li2 p").html("小精炼宝箱*20");
                $(".co_tips_jl1 .co_form2 li.li3 p").html("燃油*200");
                $(".co_tips_jl1 .co_form2 li.li4 p").html("五星成员凭证宝箱*3");
                $(".lq_btn1").removeClass("on2");
                $(".lq_btn1").removeClass("on1");
                $(".lq_btn1").removeClass("on4");
                $(".lq_btn1").removeClass("on5");
                $(".lq_btn1").addClass("on3");
                $(".co_tips_jl1").show();
                HLog.event("dfzj_inv_cz_zhongjiang");
    		})
    		$(".xianshi .four").click(function(){
    			$(".co_tips_jl1 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
    			$(".co_tips_jl1 .co_form li.li2 img").attr("src",img_url+"images/ico24.png");
    			$(".co_tips_jl1 .co_form li.li3 img").attr("src",img_url+"images/ico12.png");
    			$(".co_tips_jl1 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
    			$(".co_tips_jl1 .jl_img img").attr("src",img_url+"images/ico1.png");
                $(".co_tips_jl1 .jj_txt").html("成功进阶到上将后获得奖励");
                $(".co_tips_jl1 .co_form2 li.li1 p").html("金币*2888");
                $(".co_tips_jl1 .co_form2 li.li2 p").html("晋升报告*20");
                $(".co_tips_jl1 .co_form2 li.li3 p").html("燃油*200");
                $(".co_tips_jl1 .co_form2 li.li4 p").html("小精炼宝箱*30");
                $(".lq_btn1").removeClass("on2");
                $(".lq_btn1").removeClass("on3");
                $(".lq_btn1").removeClass("on1");
                $(".lq_btn1").removeClass("on5");
                $(".lq_btn1").addClass("on4");
                $(".co_tips_jl1").show();
                HLog.event("dfzj_inv_cz_shangjiang");
    		})
    		$(".xianshi .five").click(function(){
    			$(".co_tips_jl1 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
    			$(".co_tips_jl1 .co_form li.li2 img").attr("src",img_url+"images/ico24.png");
    			$(".co_tips_jl1 .co_form li.li3 img").attr("src",img_url+"images/ico12.png");
    			$(".co_tips_jl1 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
    			$(".co_tips_jl1 .jl_img img").attr("src",img_url+"images/ico4.png");
                $(".co_tips_jl1 .jj_txt").html("成功进阶到元帅后获得奖励");
                $(".co_tips_jl1 .co_form2 li.li1 p").html("金币*4888");
                $(".co_tips_jl1 .co_form2 li.li2 p").html("晋升报告*30");
                $(".co_tips_jl1 .co_form2 li.li3 p").html("燃油*200");
                $(".co_tips_jl1 .co_form2 li.li4 p").html("小精炼宝箱*30");
                $(".lq_btn1").removeClass("on2");
                $(".lq_btn1").removeClass("on3");
                $(".lq_btn1").removeClass("on4");
                $(".lq_btn1").removeClass("on1");
                $(".lq_btn1").addClass("on5");
                $(".co_tips_jl1").show();
                HLog.event("dfzj_inv_cz_yuanshuai");
    		})
    		$(".co_tips_jl1").on("click",".lq_btn1.on1",function(){
                code_url1(1);
                if(yy_num_dc1){
                    $(".code_num1").html(gift_id_code0);
                   $(".co_tips_jl1").hide();
                   $(".my_code p img").attr("src",img_url+"images/ico2.png");
                   $(".co_tips_code_jz1").show();
                   HLog.event("dfzj_inv_sx_giftSuccess");
                }else{
                	$(".co_tips_jl1").hide();
                	$(".co_tips_zmcy p img").attr("src",img_url+"images/ico2.png");
                    $(".co_tips_zmcy").show();
                    HLog.event("dfzj_inv_sx_giftNull");
                }
    		})
    		$(".co_tips_jl1").on("click",".lq_btn1.on2",function(){
                code_url1(2);
                if(yy_num_dc2){
                   $(".code_num1").html(gift_id_code1);
                   $(".co_tips_jl1").hide();
                   $(".my_code p img").attr("src",img_url+"images/ico3.png");
                   $(".co_tips_code_jz1").show();
                   HLog.event("dfzj_inv_shaoj_giftSuccess");
                }else{
                	$(".co_tips_jl1").hide();
                	$(".co_tips_zmcy p img").attr("src",img_url+"images/ico3.png");
                    $(".co_tips_zmcy").show();
                    HLog.event("dfzj_inv_shaoj_giftNull");
                }
    		})
    		$(".co_tips_jl1").on("click",".lq_btn1.on3",function(){
                code_url1(3);
                if(yy_num_dc3){
                   $(".co_tips_jl1").hide();
                   $(".code_num1").html(gift_id_code2);
                   $(".my_code p img").attr("src",img_url+"images/ico5.png");
                   $(".co_tips_code_jz1").show();
                    HLog.event("dfzj_inv_zj_giftSuccess");
                }else{
                	$(".co_tips_jl1").hide();
                	$(".co_tips_zmcy p img").attr("src",img_url+"images/ico5.png");
                    $(".co_tips_zmcy").show();
                    HLog.event("dfzj_inv_zj_giftNull");
                }
    		})
    		$(".co_tips_jl1").on("click",".lq_btn1.on4",function(){
                code_url1(4);
                if(yy_num_dc4){
                   $(".code_num1").html(gift_id_code3);
                   $(".co_tips_jl1").hide();
                   $(".my_code p img").attr("src",img_url+"images/ico1.png");
                   $(".co_tips_code_jz1").show();
                   HLog.event("dfzj_inv_shangj_giftSuccess");
                }else{
                	$(".co_tips_jl1").hide();
                	$(".co_tips_zmcy p img").attr("src",img_url+"images/ico1.png");
                    $(".co_tips_zmcy").show();
                    HLog.event("dfzj_inv_shangj_giftNull");
                }
    		})
    		$(".co_tips_jl1").on("click",".lq_btn1.on5",function(){
                code_url1(5);
                if(yy_num_dc5){
                   $(".co_tips_jl1").hide();
                   $(".code_num1").html(gift_id_code4);
                   $(".my_code p img").attr("src",img_url+"images/ico4.png");
                   $(".co_tips_code_jz1").show();
                   HLog.event("dfzj_inv_ys_giftSuccess");
                }else{
                	$(".co_tips_jl1").hide();
                	$(".co_tips_zmcy p img").attr("src",img_url+"images/ico4.png");
                    $(".co_tips_zmcy").show();
                    HLog.event("dfzj_inv_ys_giftNull");
                }
    		});
    		new Clipboard('#tc13_copyBtnz');
    		new Clipboard('#tc14_copyBtnz');
    		new Clipboard('#tc15_copyBtnz');
    		$(".copy").click(function() {
  				alert("已复制");
                 HLog.event("dfzj_inv_code_copy");
            });
            //活动说明
            $(".hd_sm").click(function(){
            	$(".co_tip_sm1").show();
                 HLog.event("dfzj_inv_active_sm");
            })
            //招募船员
            $(".szm_btn").click(function(){
            	$(".co_tips_zmcy").hide();
            	$(".share_bg").show();
                HLog.event("dfzj_inv_zhaomuBtn");
            })
            $(".zm_cy").click(function(){
                if($(this).hasClass("active")){
                    $.ajax({
                        type: 'POST',
                        url: "/dfzj/inv/help.html"+h5_jk_url,
                        data: {"invite_code" : getQueryString("invite_code")},
                        'dataType':'Json',
                        success:function(data){
                            if(data.code == 0){
                                $(".co_tips_help2 p").html("<i></i>" + data.msg + "<i></i>");
                                $(".co_tips_help2").show();
                            }else{
                                alert(data.msg);
                            }
                        },
                        error:function(){
                            alert("网络请求失败，请重新刷新页面");
                        }
                    });

                HLog.event("dfzj_inv_zhaomuBtn");
                }else{
                    $(".share_bg").show();
                    HLog.event("dfzj_inv_helpBtn");

                }
            	
            })
            //分享页面
            $(".share_bg").click(function(){
            	$(this).hide();
                HLog.event("dfzj_inv_shareClose");
            })
            //说明2
            $(".quest_btn").click(function(){
                $(".co_tip_sm2").show();
                HLog.event("dfzj_inv_shuoming");
            })
            //进攻
            $(".jg_btn").click(function(){
                HLog.event("dfzj_inv_jingongBtn");
                    $.ajax({
                        type: 'POST',
                        url: "/dfzj/inv/attack.html"+h5_jk_url,
                        data: {},
                        'dataType':'Json',
                        success:function(data){
                            if(data.code == 0){
                                xt_fx1=String(data.data.attackTarget["1"].useBlood);
                                xt_fx2=String(data.data.attackTarget["2"].useBlood);
                                xt_fx3=String(data.data.attackTarget["3"].useBlood);
                                xt_fx4=String(data.data.attackTarget["4"].useBlood);
                                gift_id_code5=data.data.giftCodeLog['385'];
                                gift_id_code6=data.data.giftCodeLog['386'];
                                gift_id_code7=data.data.giftCodeLog['387'];
                                gift_id_code8=data.data.giftCodeLog['388'];
                                cz_num_cs1=String(data.data.num.getNum);
                                cz_num_cs2=String(data.data.num.useNum);
                                cz_num_cs3=String(cz_num_cs1 - cz_num_cs2);
                                $("#cz_cs,#jg_jh").html(cz_num_cs3);
                                if(xt_fx1>=0){
                                    $(".fx_one .xt_cd").css({
                                        height: getPercent1(xt_fx1) + "%"
                                    });
                                    if(xt_fx1>=20000){
                                       $(".fx_one .fx_gj").addClass("active");
                                       fx_num_dc1=true;
                                    }else{
                                        $(".huohua").removeClass("active");
                                        $(".huohua1").addClass("active");
                                        $(".fx_gj").removeClass("shake");
                                        $(".fx_one .fx_gj").addClass("shake");
                                        $(".dj_fxbt").removeClass("active");
                                        $(".fx_one").addClass("active");
                                        setTimeout(function() {
                                            $(".huohua1").removeClass("active");
                                            $(".fx_one .fx_gj").removeClass("shake");
                                            $(".fx_one").removeClass("active");
                                        },500);
                                    }
                                }
                                if(xt_fx2>=0){
                                    $(".fx_two .xt_cd").css({
                                        height: getPercent1(xt_fx2) + "%"
                                    });
                                    if(xt_fx2>=20000){
                                        $(".fx_two .fx_gj").addClass("active");
                                        fx_num_dc1=true;
                                        fx_num_dc2=true;
                                    }else{
                                        $(".huohua").removeClass("active");
                                        $(".huohua2").addClass("active");
                                        $(".fx_gj").removeClass("shake");
                                        $(".fx_two .fx_gj").addClass("shake");
                                        $(".dj_fxbt").removeClass("active");
                                        $(".fx_two").addClass("active");
                                        setTimeout(function() {
                                            $(".huohua2").removeClass("active");
                                            $(".fx_two .fx_gj").removeClass("shake");
                                            $(".fx_two").removeClass("active");
                                        },500);
                                    }
                                }
                                if(xt_fx3>=0){
                                    $(".fx_three .xt_cd").css({
                                        height: getPercent1(xt_fx3) + "%"
                                    });
                                    if(xt_fx3>=20000){

                                        $(".fx_three .fx_gj").addClass("active");
                                        fx_num_dc1=true;
                                        fx_num_dc2=true;
                                        fx_num_dc3=true;
                                    }else{
                                        $(".huohua").removeClass("active");
                                        $(".huohua3").addClass("active");
                                        $(".fx_gj").removeClass("shake");
                                        $(".fx_three .fx_gj").addClass("shake");
                                        $(".dj_fxbt").removeClass("active");
                                        $(".fx_three").addClass("active");
                                        setTimeout(function() {
                                            $(".huohua3").removeClass("active");
                                            $(".fx_three .fx_gj").removeClass("shake");
                                            $(".fx_three").removeClass("active");
                                        },500);
                                    }
                                }
                                if(xt_fx4>=0){
                                    $(".dj_xt_cd").css({
                                        height: getPercent2(xt_fx4) + "%"
                                    });
                                    if(xt_fx4>=50000){
                                         $(".dj_zj_img").addClass("active");
                                         fx_num_dc1=true;
                                        fx_num_dc2=true;
                                        fx_num_dc3=true;
                                        fx_num_dc4=true;
                                    }else{
                                        $(".huohua").removeClass("active");
                                        $(".dj_zj .huohua").addClass("active");
                                        setTimeout(function() {
                                            $(".dj_zj .huohua").removeClass("active");
                                        },500);
                                    }
                                }
                                if(len2 > 0){
                                    var result = '';
                                    for(var i = 0; i < data.data.hurtLogs.length; i++) {
                                        result += "<li><p>成功对防线"+data.data.hurtLogs[i].target+"造成<span class='shangh_num'>"+data.data.hurtLogs[i].hurt+"</span>点伤害。<span class='date_time'>"+data.data.hurtLogs[i].created_at+"</span></p></li>";
                                    }
                                    $(".jg_record ul").append(result);
                                     if($(".jg_record ul li").length>1){
                                        setInterval('autoScroll(".jg_record ul")', 1500);
                                    }
                                    }else{
                                        $(".jg_record ul").html('<li><p>暂无攻击数据</p></li>');
                                    }
                                alert(data.msg);
                            }else{
                                alert(data.msg);
                            }
                        },
                        error:function(){
                            alert("网络请求失败，请重新刷新页面");
                        }
                    });
            })
            //防线1
            $(".fx_one").click(function(){
                $(".co_tips_jl2 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
                $(".co_tips_jl2 .co_form li.li2 img").attr("src",img_url+"images/ico21.png");
                $(".co_tips_jl2 .co_form li.li3 img").attr("src",img_url+"images/ico23.png");
                $(".co_tips_jl2 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl2 .co_form2 li.li1 p").html("金币*488");
                $(".co_tips_jl2 .co_form2 li.li2 p").html("军需战舰宝箱*2");
                $(".co_tips_jl2 .co_form2 li.li3 p").html("双倍掉落卡*2");
                $(".co_tips_jl2 .co_form2 li.li4 p").html("小精炼宝箱*20");
                $(".co_tips_jl2 .co_con p span").html("成功攻破防线1");
                $(".lq_btn2").removeClass("on2");
                $(".lq_btn2").removeClass("on3");
                $(".lq_btn2").removeClass("on4");
                $(".lq_btn2").addClass("on1");
                $(".co_tips_jl2").show();
                HLog.event("dfzj_inv_fx1_click");
            })
            //防线2
            $(".fx_two").click(function(){
                $(".co_tips_jl2 .co_form li.li1 img").attr("src",img_url+"images/ico11.png");
                $(".co_tips_jl2 .co_form li.li2 img").attr("src",img_url+"images/ico21.png");
                $(".co_tips_jl2 .co_form li.li3 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl2 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
                 $(".co_tips_jl2 .co_form2 li.li1 p").html("金币*688");
                $(".co_tips_jl2 .co_form2 li.li2 p").html("军需战舰宝箱*3");
                $(".co_tips_jl2 .co_form2 li.li4 p").html("五星成员凭证宝箱*2");
                $(".co_tips_jl2 .co_form2 li.li3 p").html("小精炼宝箱*20");
                $(".co_tips_jl2 .co_con p span").html("成功攻破防线2");
                $(".lq_btn2").removeClass("on1");
                $(".lq_btn2").removeClass("on3");
                $(".lq_btn2").removeClass("on4");
                $(".lq_btn2").addClass("on2");
                $(".co_tips_jl2").show();
                HLog.event("dfzj_inv_fx2_click");
            })
            //防线3
            $(".fx_three").click(function(){
                $(".co_tips_jl2 .co_form li.li1 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl2 .co_form li.li2 img").attr("src",img_url+"images/ico11.png");
                $(".co_tips_jl2 .co_form li.li3 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl2 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl2 .co_form2 li.li1 p").html("小精炼宝箱*30");
                $(".co_tips_jl2 .co_form2 li.li2 p").html("金币*888");
                $(".co_tips_jl2 .co_form2 li.li3 p").html("改造宝箱*5");
                $(".co_tips_jl2 .co_form2 li.li4 p").html("五星成员凭证宝箱*2");
                $(".co_tips_jl2 .co_con p span").html("成功攻破防线3");
                $(".lq_btn2").removeClass("on2");
                $(".lq_btn2").removeClass("on1");
                $(".lq_btn2").removeClass("on4");
                $(".lq_btn2").addClass("on3");
                $(".co_tips_jl2").show();
                HLog.event("dfzj_inv_fx3_click");
            })
            $(".co_tips_jl2").on("click",".lq_btn2.on1",function(){
                if(fx_num_dc1){
                   $(".code_num3").html(gift_id_code5);
                   $(".co_tips_jl2").hide();
                   $(".co_tips_code_jz2 .info1 span").html('成功突破敌军防线1');
                   $(".co_tips_code_jz2").show();
                   HLog.event("dfzj_inv_fx1_giftsuccess");
                }else{
                    $(".co_tips_jl2").hide();
                    $(".co_tips_code_tp2 .info1").html("舰长，我们还未占领防线1！");
                    $(".co_tips_code_tp2 .info2 span").html(xt_fx1);
                    $(".co_tips_code_tp2").show();
                    HLog.event("dfzj_inv_fx1_giftnull");
                }
            })
             $(".co_tips_jl2").on("click",".lq_btn2.on2",function(){
                if(fx_num_dc2){
                   $(".code_num3").html(gift_id_code6);
                   $(".co_tips_jl2").hide();
                   $(".co_tips_code_jz2 .info1 span").html('成功突破敌军防线2');
                   $(".co_tips_code_jz2").show();
                   HLog.event("dfzj_inv_fx2_giftsuccess");

                }else{
                    $(".co_tips_jl2").hide();
                    $(".co_tips_code_tp2 .info1").html("舰长，我们还未占领防线2！");
                    $(".co_tips_code_tp2 .info2 span").html(xt_fx2);
                    $(".co_tips_code_tp2").show();
                    HLog.event("dfzj_inv_fx2_giftnull");
                }
            })
              $(".co_tips_jl2").on("click",".lq_btn2.on3",function(){
                if(fx_num_dc3){
                   $(".code_num3").html(gift_id_code7);
                   $(".co_tips_jl2").hide();
                   $(".co_tips_code_jz2 .info1 span").html('成功突破敌军防线3');
                   $(".co_tips_code_jz2 ").show();
                    HLog.event("dfzj_inv_fx3_giftsuccess");
                }else{
                    $(".co_tips_jl2").hide();
                    $(".co_tips_code_tp2 .info1").html("舰长，我们还未占领防线3！");
                    $(".co_tips_code_tp2 .info2 span").html(xt_fx3);
                    $(".co_tips_code_tp2").show();
                    HLog.event("dfzj_inv_fx3_giftnull");
                }
            })
            $(".co_tips_jl3").on("click",".lq_btn2.on4",function(){
                 if(fx_num_dc4){
                   $(".co_tips_code_jz2 .info1 span").html('成功突破敌军核心');
                   $(".code_num3").html(gift_id_code8);
                   $(".co_tips_jl3").hide();
                   $(".co_tips_code_jz2").show();
                   HLog.event("dfzj_inv_djhx_giftsuccess");
                }else{
                    $(".co_tips_jl3").hide();
                    $(".co_tips_code_tp3").show();
                    HLog.event("dfzj_inv_djhx_giftnull");
                }
            })
              $(".dj_zj_img").click(function(){
                 $(".co_tips_jl3 .co_form li.li1 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl3 .co_form li.li2 img").attr("src",img_url+"images/ico11.png");
                $(".co_tips_jl3 .co_form li.li3 img").attr("src",img_url+"images/ico24.png");
                $(".co_tips_jl3 .co_form li.li4 img").attr("src",img_url+"images/ico14.png");
                $(".co_tips_jl3 .co_form2 li.li1 p").html("改造宝箱*8");
                $(".co_tips_jl3 .co_form2 li.li2 p").html("金币*3888");
                $(".co_tips_jl3 .co_form2 li.li3 p").html("晋升报告*30");
                $(".co_tips_jl3 .co_form2 li.li4 p").html("五星成员凭证宝箱*3");
                  $(".co_tips_jl3").show();
                  $(".co_tips_jl3 .lq_btn2").removeClass("on1");
                  $(".co_tips_jl3 .lq_btn2").removeClass("on2");
                 $(".co_tips_jl3 .lq_btn2").removeClass("on3");
                 $(".co_tips_jl3 .lq_btn2").addClass("on4");
                 HLog.event("dfzj_inv_djhx_click");
              })
              
              $(".djhx2_btn,.jxgj_btn").click(function(){
                   $(".co_tips_code_tp3").hide();
                   $(".co_tips_code_tp2").hide();
                   HLog.event("dfzj_inv_tc_close");
              })
              $(".jg_board .return").click(function(){
            $(".wrap2").removeClass("active");
            $(".wrap").addClass("active");
            HLog.push("dfzj_inv_selfpage1");
        })

});