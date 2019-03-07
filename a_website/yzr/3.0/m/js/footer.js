
var TopBarConFig = {
	isShowBan: {
        "ca.yingxiong.com": 1,
        "fc.yingxiong.com":1,
        "wctt.yingxiong.com": 1,
        "dfzj.yingxiong.com": 1,
        "moba.yingxiong.com":1,
        "y.yingxiong.com":1,
        "jws.yingxiong.com":1,
        "tnak.yingxiong.com":1,
        "ddd2.yingxiong.com": 1,
        "gf.yingxiong.com":0,
        "xm.yingxiong.com":1,
        "quan.yingxiong.com":0,
        "qtdl.yingxiong.com": 1,
        "xsg.yingxiong.com":0,
        "mx.yingxiong.com":0,      
    },
	content : '<div class="f_t"><ul><li><a href="http://kf.yingxiong.com/Mobile/checkOption?Gid='+kf_id+'">客服中心</a></li><li><a href="http://bbs.yingxiong.com/index/gameBbsLogin?id='+community_id+'" id="community">游戏社区</a></li></ul><div class="tel"><a href="tel:4009393333"><i></i>400-939-3333</a></div>	</div><p class="f_txt">COPY RIGHT   @2015-2016  ALL RIGHTS RESERVED</p><p class="f_link"><a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/'+wwwIcon_id+'" class="f_a01"><img src="./images/link_a1.png" alt=""></a><a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/'+gameIcon_id+'" class="f_a02"><img src="./images/link_a2.png" alt=""></a>英雄互娱版权所有</p>',
	link : './css/style.css'
};

! function () {
	var t = function (t) {
		return document.getElementById(t)
	}
	!new function () {
		var node = document.createElement("link");
		node.setAttribute("rel","stylesheet");
		node.setAttribute("href",TopBarConFig.link);
		$("html").append(node);
	}
	!new function () {
		var node = document.createElement("footer");
		node.id = "Hero-bar";
		node.innerHTML = TopBarConFig.content;
		$("html").append(node);
	}
}();
if (TopBarConFig.isShowBan[window.location.host]) {
	
}else{
	$("#community").attr("href","javascript:;")
	$("#community").click(function(){
		alert("敬请期待")
	})
}

