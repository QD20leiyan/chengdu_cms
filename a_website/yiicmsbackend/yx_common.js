/**
 * Created by Administrator on 2015/4/10.
 */
//需要在所有js加载最后在加载
function openDialog(div,url) {
    $('#' + div).modal();
    $('#' + div + " .confirm").click(
        function () {
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function (e) {
                    if (e == '1') {
                        $('#' + div + " .cancel").click();
                    } else {
                        alert('未删除成功');
                    }
                    location.reload();
                }
            })
        }
    );
}
function deleteids(div,url){
	if($("#ids").val()=='') {alert('请选择一条记录！');return false;}
	$('#'+div).modal();
	$('#'+div +" .confirm").click(
		function(){
			$.ajax({
				url: url,
				data:{id:$("#ids").val()},
				type: "get",
				dataType: "json",
				success: function(e) {
					if(e=='1'){
						$('#'+div +" .cancel").click();
						alert('删除成功')
					}else if(e=='2'){
						alert('您选中的栏目有子栏目！不能删除');
					}else{
						alert('删除失败');
					}
					location.reload();
				}
			})
		}
	);
}
//数据封装
function handleData(data, isAdd) {
    var nameData = $("#GroupModel_mids").val();
    var arrayData = new Array();
    arrayData = nameData ? nameData.split(",") : arrayData;
    if (isAdd == true) {
        var t=$.inArray(data, arrayData);
        if(t==-1)arrayData.push(data);
    } else {
        var t=$.inArray(data, arrayData);
        if(t!=-1){arrayData.splice(t, 1);}
    }
    $("#GroupModel_mids").val(arrayData.join(','));
}
//排序
function ajaxSortTree(url,data){
    $.ajax({
        url: url,
        data:data,
        type: "get",
        dataType: "json",
        success: function(e) {
            if(e=='1'){
                alert('成功');
                location.reload();
            }else{
                alert('失败');
            }

        }
    })
}
//数据封装ids
function handleIds(data, isAdd) {
    var nameData = $("#ids").val();
    var arrayData = new Array();
    arrayData = nameData ? nameData.split(",") : arrayData;
    if (isAdd == true) {
        var t=$.inArray(data, arrayData);
        if(t==-1)arrayData.push(data);
    } else {
        var t=$.inArray(data, arrayData);
        if(t!=-1){arrayData.splice(t, 1);}
    }
    $("#ids").val(arrayData.join(','));
}

//清理缓存
function clearCache()
{
    $.get('/admin.php/site/clear',function(){
    });
    $.get('/site/clear',function(){
        alert('已清空缓存 ok.');
    });
}

$(document).ready(function () {
    $(".allchoose").bind("click",
        function() {
            var e=$(this).parents(".menuDiv").find("input.check");
            e.prop("checked", this.checked);

            var spans=$(this).parents(".menuDiv").find(".checker  span");

            var isAdd = false;
            if ($(this).attr("checked") == "checked")  isAdd = true;

            if(isAdd==true){
                spans.each(function(){
                    $(this).addClass('checked');
                });
            }else{
                spans.each(function(){
                    $(this).removeClass('checked');
                });
            }

            e.each(function(){
                handleData($(this).attr("id"),isAdd);
            });

        });
    $(".c-menu").click(function () {
        var id = $(this).attr('id');
        if ($(this).attr('checked') == 'checked') {
            var e = $(this).parents(".mwebFn");
            var p = e.find(".mwebFnchoosedt");
            if(p.attr("checked")!="checked") {
                p.attr("checked", "checked");
                p.parent('span').addClass('checked');
                handleData(p.attr("id"), true);
            }//添加父菜单

            handleData(id, true);//添加当前子菜单
        } else {
            //子菜单无选择则父菜单取消选择状态
            var isChecked = false;
            var e=$(this).parents(".webFn");
            var t=$(this).parents(".mwebFn").find(".mwebFnchoosedt");

            e.find(".c-menu").each(function () {
                if ($(this).attr("checked") == "checked") {
                    isChecked = true;
                }
            });
            if (isChecked == false) {
                t.removeAttr("checked");
                t.parent('span').removeClass('checked');
                handleData(t.attr("id"), false);//去掉父菜单
            }
            handleData(id, false);//去掉当前子菜单
        }
    });
    $(".mwebFnchoosedt").click(function () {
        var id = $(this).attr('id');
        var isChecked = false;
        var isAdd = false;
        if ($(this).attr('checked') == 'checked') {
            isChecked = true;
            isAdd = true;
        }
        handleData(id, isAdd);//添加(删除)父菜单

        $(this).parents(".mwebFn").find(".c-menu").each(function () {
            isChecked == true ? $(this).attr("checked", "checked") : $(this).removeAttr("checked");
            handleData($(this).attr("id"), isAdd);
        })
        $(this).parents(".mwebFn").find(".checker  span").each(function () {
            isChecked == true ?  $(this).addClass('checked') : $(this).removeClass('checked');
        })
    });

	//上传图片
	$('#image_upload').click(function(){
		e="http://cmgecms.com/admin.php?r=config/index";
		art.dialog.open(e, {
			id:'up_iframe',
			height: '80%',
			width: '80%',
			title: "选择图片",
			lock: true,
			ok:function(){ alert($("#kw").val());},
			cancel:true
		}, false);
	})
	
	//数据列表页面批量删除
	$('.head_ck').click(function(){
        if ($(this).attr("checked") == "checked")  isAdd = true;else isAdd=false;
        if(isAdd==true) {
            $('.body_ck').each(function () {
                var thiz = $(this);
                thiz.parents('.checker').find('span').addClass('checked');
                handleIds(thiz.val(),true);
            })
        }else{
            $('.body_ck').each(function () {
                var thiz = $(this);
                thiz.parents('.checker').find('span').removeClass('checked');
                handleIds(thiz.val(),false);
            })
        }
        $('#deleteModals').find(".modal-body").html("<p>确定要删除记录"+$("#ids").val()+"吗？</p>");

    })
    $('.body_ck').click(function() {
        if ($(this).attr("checked") == "checked")  isAdd = true; else isAdd = false;
        handleIds($(this).val(),isAdd);
        $('#deleteModals').find(".modal-body").html("<p>确定要删除记录"+$("#ids").val()+"吗？</p>");
    })
	
	$(".preview").click(function(){
        $('#image').attr('src',$(this).attr('rel'))
        $(".wrap").show();
        $(".mask").show();
    })
    $(".closetck").click(function(){
        $(".wrap").hide();
        $(".mask").hide();
    })
	
	//spinner
	var handleSpinners = function () {
        $('#spinner1').spinner();
        $('#spinner2').spinner({disabled: true});
        $('#spinner3').spinner({value:0, min: 0, max: 10});
        $('#spinner4').spinner({value:0, step: 5, min: 0, max: 200});
    }
	handleSpinners();
	
	//module 下拉选项
    $('.SelAction').change(function(){
        var sel = $(this).val();
		$(this).parent().siblings().find('input').val(sel);
    })
	
	var initEditables = function () {
		
		//$.fn.editable.defaults.mode = 'inline';
		
		//global settings
        $.fn.editable.defaults.inputclass = 'form-control';
        $.fn.editable.defaults.url = '/abc';
		$.fn.editable.defaults.send = 'haha';
		
		//可视编辑
		$('.yxtable .make-xedit').editable();
		
		//$('.yxtable .editable-submit').click(function (){
		//	
		//	alert(33)
		//})
	}
	initEditables();
	
	//开关设置
	$(".yxtable .make-switch").bootstrapSwitch({
        onText: "是",
        offText: "否",
        offColor: 'danger',
        onSwitchChange: function (event, state) {
            var id = $(this).parents("tr").attr('data-id');
            var field = [$(this).parents("td").attr('data-field')];
            var model = $(this).parents("tr").attr('data-model');
            var url = $(this).parents("td").attr('data-url');
            var value;
            state == true ? value = [1] : value = [0];
            $.ajax({
                url: url,
                data: {"id": id, "field": field, "model": model, "value": value},
                type: "post",
                dataType: "json",
                success: function (data) {
                    if (data.status == '1') {
                    	$().toastmessage('showToast', {
                            text     : '修改成功!',
                            sticky   : false,
                            position : 'top-center',
                            type     : 'success',
                            closeText: ''
                        });
                    	
                    } else {
                    	$().toastmessage('showToast', {
                            text     : data.msg,
                            sticky   : false,
                            position : 'top-center',
                            type     : 'info',
                            closeText: '',
                            close    : function () {
                                
                            }
                        });
                    }

                }
            })
        }
    })
	
	//批量删除
    $(".pachdelete").click(function () {
        var thiz=$(this);
        var A = [];
        $(".delecte_check").each(function () {
            if ($(this).parent().hasClass('checked')) {
                A.push($(this).val());
            }
        });
        var a = A.length > 0 ? true : false;
        if (a) {
            $(".model-delecte0").hide();
            $(".model-delecte1").show();
            $('#delecte-alert0').modal({keyboard: false});
            $('#delecte-alert0 .model-delecte1 .modal-body').html('你确定要删除id为' + A + '标题么');
            $(".model-delecte1 .queding").unbind("click");
            $(".model-delecte1 .queding").click(function () {
                deleterecords(thiz.attr('data-url'), A);
            })
        }else{
            $(".model-delecte1").hide();
            $('#delecte-alert0').modal({keyboard: false});
            $('#delecte-alert0 .model-delecte0').find("span").html('请选择一个');
        }
    });
    
    //单挑记录删除
    $('.singledelete').click(function(){
        var thiz=$(this);
        var A = [];
        var id=thiz.parents("tr").attr("data-id");
        A.push(id);
        $("#delete-modal .model-delete0").hide();
        $("#delete-modal .model-delete1").show();
        $('#delete-modal').modal({keyboard: false});
        $('#delete-modal .model-delete1 .modal-body').html('你确定要删除此数据吗？');
        $("#delete-modal .model-delete1 .queding").unbind("click");
        $("#delete-modal .model-delete1 .queding").click(function(){
            deleterecords(thiz.attr('data-url'), A);
        })
    })
    
    //删除当条数据
    $('.deleteRowData').click(function(){
    	var thiz=$(this);
        var id = thiz.parents("tr").attr("data-id");
        $(".model-delecte0").hide();
        $(".model-delecte1").show();
        $('#delecte-alert0').modal({keyboard: false});
        $('#delecte-alert0 .model-delecte1 .modal-body').html('你确定要删除此数据吗？');
        $(".model-delecte1 .queding").unbind("click");
        $(".model-delecte1 .queding").click(function(){
        	deleteAjaxData(thiz.attr('data-url'), id);
        })
    	
    })
    
    /**
     * 删除记录ajax
     */
    function deleteAjaxData(url,id){
        $.ajax({
            type: 'POST',
            url: url,
            data: {'id': id },
            dataType: 'json',
            error: function(XMLHttpRequest) {
            	$("#delecte-alert0").modal('hide');
            	
            	$().toastmessage('showToast', {
                    text     : XMLHttpRequest.responseText,
                    sticky   : false,
                    position : 'top-right',
                    type     : 'warning',
                    closeText: '',
                    close    : function () {}
                });
            },
            success:function(data){
                if(data.code==1){
                	if($.isArray(id)){
                		for(var i=0;i< id.length;i++){
                			$("tr[data-id="+id[i]+"]").remove();
                        }
                	}else{
                		$("tr[data-id="+id+"]").remove();
                	}
                	
                	$().toastmessage('showToast', {
                        text     : '删除成功!',
                        sticky   : false,
                        position : 'top-right',
                        type     : 'success',
                        closeText: ''
                    });
                }
                $("#delecte-alert0").modal('hide');
            }
        })
    }
    
    /**
     * 批量删除数据
     */
    $('#batchDelete').click(function(){
    	var thiz=$(this);
        var ids = [];
        $(".delecte_check").each(function () {
            if ($(this).parent().hasClass('checked')) {
            	ids.push($(this).val());
            }
        });
        var a = ids.length > 0 ? true : false;
        if (a) {
            $(".model-delecte0").hide();
            $(".model-delecte1").show();
            $('#delecte-alert0').modal({keyboard: false});
            $('#delecte-alert0 .model-delecte1 .modal-body').html('你确定要删除id为' + ids + '的数据吗？');
            $(".model-delecte1 .queding").unbind("click");
            $(".model-delecte1 .queding").click(function () {
            	deleteAjaxData(thiz.attr('data-url'), ids);
            })
        }else{
            $(".model-delecte1").hide();
            $('#delecte-alert0').modal({keyboard: false});
            $('#delecte-alert0 .model-delecte0').find("span").html('请选择一个删除!');
        }
    })
	
	//删除记录
	function deleterecords(url,A){
		$.ajax({
			type: 'POST',
			url: url,
			data: { 'id': A },
			dataType: 'json',
			error: function(XMLHttpRequest) {
				
				$().toastmessage('showToast', {
					text     : XMLHttpRequest.responseText,
					sticky   : false,
					position : 'top-right',
					type     : 'info',
					closeText: '',
					close    : function () {
					}
				})
			},
			success:function(data){
				if(data.code==1){
					for(var i=0;i< A.length;i++){
						$("tr[data-id="+A[i]+"]").remove();
					}
					$().toastmessage('showToast', {
						text     : data.msg,
						sticky   : false,
						position : 'top-center',
						type     : 'success',
						closeText: '',
						close    : function () {
						}
					});
				}else{
					$().toastmessage('showToast', {
						text     : data.msg,
						sticky   : false,
						position : 'top-right',
						type     : 'info',
						closeText: '',
						close    : function () {
						}
					})
				}
				$("#delete-modal").modal('hide');
			}
		})
	}
})