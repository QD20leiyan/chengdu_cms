/**
 * Created by Administrator on 2016/12/29 0029.
 */

/* --------------------------roleManage------------------------------ */

$(function(){
	/*authorization*/
	$("#sq_l li").click(function(){
		$(this).addClass("bgc1").siblings().removeClass("bgc1");
	});
	$("#sqBtn").click(function(){
		$("#sq_r").find(".list-group").append($("#sq_l").find(".list-group li.bgc1"));
		$("#sq_l").find(".list-group li.bgc1").remove();
		$("#sq_r li").removeClass("bgc1");
	});


	/*module permission*/
	$("#checkAll").click(function(){
		if($(this).prop('checked')){
			$(".moduleqx input").prop("checked",true);
		}else{
			$(".moduleqx input").prop("checked",false);
		}
	});

	$(".moduleqx-title").data("open","open");
	$(".moduleqx-title").click(function(){
		//alert(1);
		var isOpen = $(this).data("open");
		if(isOpen  === "open"){
			$(this).parent().next(".list-group").show();
			$(this).data("open","close");
		}else{
			$(this).parent().next(".list-group").hide();
			$(this).data("open","open");
		}
	});

	$(".mtFirst").click(function(){
		if($(this).prop('checked')){
			$(this).parent().next(".list-group").find("input").prop("checked",true);
		}else{
			$(this).parent().next(".list-group").find("input").prop("checked",false);
		}
	});
	/*全选与第一级判断*/
	$(".mtFirst").click(function(){
		if($(this).prop('checked')){
			$(this).checked = true;
		}else{
			$(this).checked = false;
		}
		/*所有都选中的时候让全选按钮选中*/
		$('#checkAll').prop('checked',allChecked($(".mtFirst")));
	});
	
	/*第一级与第二级判断*/
	$(".checkedTitle input").click(function(){
		if($(this).prop('checked')){
			$(this).checked = true;
		}else{
			$(this).checked = false;
		}
		$(this).parents(".moduleqx").find(".mtFirst").prop('checked',allChecked($(this).parents(".checkedTitle").find("input")));
	});
	
	/*全选与第二级判断*/
	$(".checkedTitle input").click(function(){
		if($(this).prop('checked')){
			$(this).checked = true;
		}else{
			$(this).checked = false;
		}
		$('#checkAll').prop('checked',allChecked($(".checkedTitle input")));
	});
	
	
	/*判断全选的条件*/
	function allChecked(checkEle){
   		for(var i=0;i<checkEle.length;i++){
   			if(!checkEle[i].checked){
   				return false;
   			}
   		}
   		return true;
   }
})
/* --------------------------addnote------------------------------ */



/* --------------------------analysisData------------------------------ */

$("#datelist li a").click(function(){
	$("#datelist li a").removeClass("active");
	$(this).addClass("active");
});

$("#dcList li a").click(function(){
	$("#dcList li a").removeClass("active");
	$(this).addClass("active");
	$(this).css("background","#fff");
});

$("#choose").click(function(){
	$(".mask").show();
});
$("#closemask").click(function(){
	$(".mask").hide();
});

//区
$(".maskList1 ul li").click(function(){
	$(this).addClass("select1").siblings("li").removeClass("select1");
});
//服
$(".maskList2 ul li").click(function(){
	$(this).addClass("select2").siblings("li").removeClass("select2");
});
$("#submitOk").click(function(){
	$(".mask").hide();
	console.log($(".maskList ul li").closest(".select1").text());
	console.log($(".maskList ul li").closest(".select2").text());
});
$("#submitCancel").click(function(){
	$(".mask").hide();
});
//区服选项卡
$("#maskList li").click(function(){
	$(".maskUl .maskList").css("display","none");
	$(".maskUl .maskList").eq($(this).index()).css("display","block");
	$("#maskList li").removeClass("active");
	$(this).addClass("active");
});

/* --------------------------userRight------------------------------ */
/*全选判断*/
$("#checkAll2").click(function(){
    if($(this).prop('checked')){
        $("#checkTable .checkbox-inline input").prop("checked",true);
    }else{
        $("#checkTable .checkbox-inline input").prop("checked",false);
    }
});
$("#checkTable .checkbox-inline input").click(function(){
	if($(this).prop('checked')){
		$(this).checked = true;
	}else{
		$(this).checked = false;
	}
	$('#checkAll2').prop('checked',allChecked($("#checkTable .checkbox-inline input")));
	function allChecked(checkEle){
   		for(var i=0;i<checkEle.length;i++){
   			if(!checkEle[i].checked){
   				return false;
   			}
   		}
   		return true;
   }
})
