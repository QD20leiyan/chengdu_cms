$(function(){
	var index_w=$(".pic-num ul li").index();
	var index_l=$(".pic-num ul li").length;
	function move(){
		var li_width=$(".pic-num ul li").width()+20;
		var _left=li_width*index_w;
		$(".li_box ul").animate({left:-_left});
	}
	$(".i_next").click(function(){
		if(index_w>=index_l-3){
			index_w=index_l-3;
			$(".i_next").addClass("i_nexts");
			return;
		}
		$(".i_pre").removeClass("i_pres");
		index_w++;
		move();
	});
	$(".i_pre").click(function(){
		 $(".i_next").removeClass("i_nexts");
			 index_w--;
			 if(index_w==-1){
			index_w=0;
			$(".i_pre").addClass("i_pres");
			return;
		 }
		move();
	});
	var s_index = 0;
	var $wrap = $(".pic-num");
	$wrap.find("ul li").click(function() {
		var ss_index = $(this).index();
		$(".tck_con").show();
		$(".mask").show();
		var dis = ss_index - s_index;
		var sl = dis * 480;
		s_index = ss_index;
		$(".tck_m ul").animate({
				left: '-=' + sl
		});
	})
	$(".prevbtn").click(function() {
		if (s_index == 0) {
			return false;
		}else{
			s_index--;
			$(".tck_m ul").animate({
				 left: '+=480px'
			});
		}
	})
	$(".nextbtn").click(function() {
		var a= $(".tck_m ul li").length-1;
		if (s_index ==a ) {
			return false;
		}else{
			s_index++;
			$(".tck_m ul").animate({
					left: '-=480px'
			});
		}
	})
	$(".close").click(function() {
			$(".tck_con").hide();
			$(".mask").hide();
	})
	$(".go_btn").click(function(){
        var _thiz=$(this);
		var oCon=$('#comment_text').val();
        if(_thiz.attr('data-type')=="reply"){
           var strs=oCon.split(":");
            console.log(strs);
            if(strs[1]==''){
                _thiz.error_tck('发布失败');
                return false;
            }
        }
		$.ajax({
			type:'post',
			url:_thiz.attr("data-rel"),
			data:{'work_id':_thiz.attr("data-work_id"),'comment':oCon},
            dataType:'json',
			success:function(data){
                console.log(data);
                if(data.code==1){
             var li='<li  data-work_id="'+data.data.work_id+'" data-comment_id="'+data.data.comment_id+'" >'+
                    '<img src="'+data.data.avatar+'" alt="img" />'+
                    '<div class="dis_right">' +
                        '<div class="d_r_top">' +
                            '<h3>' +
                                '<span class="h_name">'+data.data.alias+'</span>' +
                                 '<span class="h_time">'+data.data.dateline+'</span>' +
                            '</h3>' +
                            '<p>' +
                            '<a class="js_hda" href="javascript:" data-rel="'+data.data.url_reply+'"><i class="ico01"></i>回复</a><a class="js_comment_del" data-rel="'+data.data.url_delete_comment+'" data-type="comment"><i class="ico02"></i>删除</a></p>'+
                            '<div class="clear"></div>' +
                        '</div>' +
                         '<p class="ar_p">'+data.data.content+'</p>' +
                    '</div>' +
                    '<div class="clear"></div>' +
                    '</li>';
                    $(".dis_ul ul").prepend(li);
                }else{
                    _thiz.error_tck('加载完毕');
                }

			}
		})
	});
	$(".list").on("click",".js_hda",function(){
		var text="回复@"+$(this).parents(".d_r_top").find(".h_name").html()+":";
        $(".go_btn").attr('data-type','reply');
        $('#comment_text').val(text).focus();
	})
	var top = $('.divi_r .hd ul').css('top');
	var oLi_height=$(".divi_r .hd ul li").height();
	var oLi_len=$(".divi_r .hd ul li").length;
	var timer=null;
	function time(){
		timer=setInterval(function(){
			  var _top=-oLi_height;
				$(".divi_r .hd ul").animate({
					top : _top
				},500,function(){
					$(this).css({top : "0px"}).find("li:first").appendTo(this);
				})
		},3000)
	}
	if(oLi_len<8){
		clearInterval(timer);
	}else{
		time();
		$(".divi_r .hd ul li").mouseover(function(){
			clearInterval(timer);
		});
		$(".divi_r .hd ul li").mouseout(function(){
			time()
		});
	}
	/*编辑器toolbar全局配置*/
var ask_editor_options = {
    toolbar: [
        ['style', ['bold', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture', 'hr']],
        ['view', ['fullscreen']]
    ],
    codemirror: {
        mode: 'text/html',
        htmlMode: true,
        lineNumbers: true,
        theme: 'monokai'
    }
};




})
