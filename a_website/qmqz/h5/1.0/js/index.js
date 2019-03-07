$(function(){
	var uId = $("#uId").val();
	var serverId = $("#serverId").val();
	console.log(uId);
	// console.log(serverId);
	$.get({
		type:"get",
		url:"{myurl name='/h5/ca/ajax-login'}",
		data:{"roleId":uId,"serverId":serverId}
	}, 'json')

	$.get(url, {"roleId":uId,"serverId":serverId}, function(data){
		if (data.status == 0) {
			
		} else {
			alert(data.msg);
		}
	}, 'json');
})