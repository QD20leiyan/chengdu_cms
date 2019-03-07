$(function(){
	function $ajax(url,params,callback){
		$.ajax({
			url:url,
			type:"POST",
			data:params,
			dataType:"json",
			success:function(data){
				callback();
			}
		})
	}
})