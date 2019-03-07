var nowPop = '';
var winObj = $(window);
$(function(){
	$('#btn1').click(function(){
		showPop('pop_gg');
		$(this).addClass('btn1Hover');
	});
	$('#btn2').click(function(){
		showPop('pop_btn2');
		$(this).addClass('btn2Hover');
	});
	$('#btn3').click(function(){
		showPop('pop_btn3');
		$(this).addClass('btn3Hover');
	});
	$('#btn4').click(function(){
		showPop('pop_btn4');
		$(this).addClass('btn4Hover');
	});
	$('#btn5').click(function(){
		showPop('pop_btn5');
		$(this).addClass('btn5Hover');
	});
	$('#prizeBtn').click(function(){
		showPop('pop_prize');
	});
	$('.closeBtn').click(function(){
		hidePop();
	});
	function resize() {
		var ww = $(window).width();
		var ql = 933;
		if(ww>1150) {
			ql = 575+Math.min(500,ww*0.5-217);
		}
		$('#qrCon').css({'left':ql});
	}
	$(window).resize(function(){
		resize();
	});
	resize();
})
function hidePop() {
	$('.pop').hide();
	$('#btn1').removeClass('btn1Hover');
	$('#btn2').removeClass('btn2Hover');
	$('#btn3').removeClass('btn3Hover');
	$('#btn4').removeClass('btn4Hover');
	$('#btn5').removeClass('btn5Hover');
}
function showPop(p) {
	hidePop();
	var pd = $('#'+p);
	var pw = 1077;
	pd.css({"top":Math.max(0, (winObj.height()-pd.height())/2+$(document).scrollTop()),"left":(winObj.width()-1027)/2}).show();
	try{
		translateObj(pd.get(0),-1000,0);
		setTimeout(function(){
			translateObj(pd.get(0),0,500);
		},50);
	} catch(e){}
}
function translateObj(obj, ty,spd,ease) {
	var style = obj && obj.style;
	if (!style) return;
	if(!ease) {
		ease='ease-out';
	}
	style.webkitTransitionTimingFunction =
	style.transitionTimingFunction = ease;
	style.webkitTransitionDuration =
	style.transitionDuration = spd + 'ms';
	style.webkitTransform = 'translate(0px,'+ty+'px) translateZ(0)';
	style.msTransform =
	style.MozTransform =
	style.OTransform = 'translate(0px,'+ty+'px)';
}