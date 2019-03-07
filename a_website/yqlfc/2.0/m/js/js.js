$(function(){
	// 礼包
	$(".m_giftbtn").click(function(){
		$(".tck_gift").show();
	})
	$(".tck_gift_close").click(function(){
		$(".tck_gift").hide();
	})
	
})
 /**弹框**/
 // $('.i-video,.play-1,.kv i').on('click',function(e){
 //            $("#video_tck").show();
 //            $("#mask").show();
 //        })
$("#close").click(function(){
    $("#video_tck").hide();
    $("#mask").hide();
});
 $('.btn').on('click',function(e){
    $(".login").show();
    $("#mask").show();
})
$(".close-1").click(function(){
     $(".login").hide();
    $("#mask").hide();
});
// $('.vote-1 a').on('click',function(e){
//     $(".ballot").show();
//     $("#mask").show();
// })
$(".close-1").click(function(){
     $(".ballot").hide();
    $("#mask").hide();
});
