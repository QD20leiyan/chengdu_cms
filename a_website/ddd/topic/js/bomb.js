var _qq_cb_click = function () {
	var pv = new Image();
	pv.src = "http://ag.qq.com/ajax/reportUserAction?actiontype=click-download&frontoperation=feeds&index=1&platId=2&ch=003806&contentid="+_qqGamePack+"&pageId="+_CpId;
	document.getElementById("qq_launcher").appendChild(pv);
};

(function(){
	
	var pv = new Image();
	pv.src = "http://ag.qq.com/ajax/reportUserAction?actiontype=viewpage&frontoperation=feeds&index=1&platId=2&ch=003806&contentid="+_qqGamePack+"&pageId="+_CpId;
	document.getElementById("qq_launcher").appendChild(pv);

})();