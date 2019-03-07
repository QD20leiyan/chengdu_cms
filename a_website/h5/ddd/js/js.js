var is_vote = 0;
var  h5_wx=$(".h5_wx").html();
var  h5_data=$(".h5_data").html();
function autoScroll(obj) {
	var length = $(obj).find("li").length;
	if(length > 3){
		$(obj).find("ul").animate({
			marginTop: "-4.1875rem"
		}, 1000 , function (){
			$(this).css({
				marginTop : "0"
			}).find("li:first").appendTo(this);
		})
	}
}
var base = {
	isLogin: false,
	sendYy: false,
	sendMark: false,
	sendLogin: false,
	sendLoginOut: false,
	luckyNumber: 0,
	phone: 0,
	id: 0,
};
var srf = $("meta[name='csrf-token']").attr("content");
$(function() {
	danmu();

	//弹幕
	function danmu() {
		var strArr = ['小镇姑娘', '爱的初体验',
			'爱你', '朋克', '最佳损友', '快走，很多人想打你，我断后', '快走吧，你没看贴吧多少人想杀策划的吗？',
			'老哥，这泼冒充都可以。', '还有多办一点事吧……这么多人 反馈意见不要敷衍了事',
			'黑骑39火光好亮 帮忙消一下，太亮了，看不清'
		];
		var colorArr = ['#D42700', '#78101E', '#009ABB', '#50B748', '#EB5D0F'];
		var toparr = [6, 6.8, 7.6, 8.4, 9.2, 10, 10.8, 11.6, 12.4, 13.2, 14, 14.8, 15.6, 16.4, 17.2];

		function danmufun() {
			var topindex = Math.floor(toparr.length * Math.random());
			var span = $('<span style="top:' + toparr[topindex] + 'rem;color:' + colorArr[Math.floor(colorArr.length * Math.random())] + ';">' + strArr[Math.floor(strArr.length * Math.random())] + '</span>');
			toparr.splice(topindex, 1);
			span.appendTo(".dm").animate({
				left: -span.width() + "px"
			}, 10000, 'linear', function() {
				toparr.push(parseFloat($(this).css('top')) / parseFloat($('html').css('fontSize')));
				$(this).remove();
			});
			setTimeout(function() {
				danmufun();
			}, 1000 + Math.random() * 1000);
		}
		danmufun();
	}
	//邀请朋友--微信分享
	$(".look_btn").click(function() {
		$(".share_bg").removeClass("hidden");
	});
	$(".list_img i").click(function (){
		$(".share_bg").removeClass("hidden");
	});
	$(".share_bg").click(function() {
		$(".share_bg").addClass("hidden");
	});
})