var message_url='/site/ajax-log.html';//留言记录
var send_url='/site/ajax-comment.html';//发表留言
var message_info = '';

var username= '';
var user_img= '';
function getNowFormatDate() 
  { 
     //获取当前月
      var myDate = new Date();
      var month=myDate.getMonth()+1;
      //获取当前日
      var date=myDate.getDate(); 
      var h=myDate.getHours(); 
      var m=myDate.getMinutes();
      var CurrentDate = ""; 
     //初始化时间 
     if (month >= 10 ) 
     { 
      CurrentDate += month + "-"; 
     } 
     else
     { 
      CurrentDate += "0" + month + "-"; 
     } 
     if (date >= 10 ) 
     { 
      CurrentDate += date ; 
     } 
     else
     { 
      CurrentDate += "0" + date; 
     } 
     if (h >= 10 ) 
     { 
      CurrentDate +=" "+ h + ":"; 
     } 
     else
     { 
      CurrentDate +=" "+ "0" + h + ":"; 
     } if (m >= 10 ) 
     { 
      CurrentDate += m ; 
     } 
     else
     { 
      CurrentDate += "0" + m; 
     } 
     return CurrentDate; 
  } 
//获取的时间就会补零 
var time = getNowFormatDate();
function init(){
	$.ajax({
        'url':message_url,
       	'data':{},
       	'type':'GET',
       	'dataType':'Json',
       	success:function(data){
       	    if(data.status==0){
       	    	var result = '';
        	    for(var i = data.data.length - 1; i > -1 ; i--) {
                username =data.data[i].username;
                user_img = data.data[i].img_url;
                replay = data.data[i].reply;
                if (!replay || replay == null) {
                    replay = '我们已经收到您的留言，感谢您的关注！';
                }
        	      result += "<div class='dialogue_board'><img src='" + user_img + "' alt='' class='user_pic'><div class='user_dialogue'><h4>" + username + "</h4><p class='creat_date'>" + data.data[i].created_at + "</p><p class='dia_info'>" + data.data[i].comment + "</p></div></div><div class='xiaoyin_board'><div class='res_board'><div class='auto_response'><p class='xiaoyin'>小隐回复：</p><p class='resp_info'>" + replay+"</p></div></div></div>";
        	    }
        	    $('.wrap').append(result);
        	}else{
        	  	alert(data.masg);
          }
        }
	})
}
function add_message(){
  var message_info = $(".message").val();
  $.ajax({
        'url':message_url,
        'data':{},
        'type':'GET',
        'dataType':'Json',
        success:function(data){
            if(data.status==0){
              var result = '';
                result += "<div class='dialogue_board'><img src='" + data.msg.img_url + "' alt='' class='user_pic'><div class='user_dialogue'><h4>" + data.msg.username + "</h4><p class='creat_date'>" + data.msg.created_at + "</p><p class='dia_info'>" + message_info + "</p></div></div><div class='xiaoyin_board'><div class='res_board'><div class='auto_response'><p class='xiaoyin'>小隐回复：</p><p class='resp_info'>我们已经收到您的留言，感谢您的关注！</p></div></div></div>";
              $('.wrap').append(result);
              
              scrollToEnd();
          }else{
              alert(data.masg);
          }
        }
  })
}
function scrollToEnd(){//滚动到底部
  $('html, body').animate({scrollTop: $(document).height()}, 300); 
  return false; 
}
$(function(){
    init();
    $(".send").click(function(){
      var message_info = $(".message").val();
    	$.ajax({
        	'url':send_url,
       		'data':{'content':message_info},
       		'type':'POST',
       		'dataType':'Json',
       		success:function(data){
            if(data.status == 0){
              // add_message();
              // console.log(message_info);
              $(".message").val("");

            var result = '';
            result += "<div class='dialogue_board'><img src='" + data.msg.img_url + "' alt='' class='user_pic'><div class='user_dialogue'><h4>" + data.msg.username + "</h4><p class='creat_date'>" + data.msg.created_at + "</p><p class='dia_info'>" + message_info + "</p></div></div><div class='xiaoyin_board'><div class='res_board'><div class='auto_response'><p class='xiaoyin'>小隐回复：</p><p class='resp_info'>我们已经收到您的留言，感谢您的关注！</p></div></div></div>";
            $('.wrap').append(result);

            scrollToEnd();

            }else if (data.status == -1){
        		  alert(data.msg);
          }else{
              alert(data.msg);
            }
          }
  		});
	});
})