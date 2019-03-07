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

})
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
//上传图片
$(document).ready(function () {
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
})
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
//数据列表页面批量删除
$(document).ready(function () {
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
})
$(function(){
    $(".preview").click(function(){
        $('#image').attr('src',$(this).attr('rel'))
        $(".wrap").show();
        $(".mask").show();
    })
    $(".closetck").click(function(){
        $(".wrap").hide();
        $(".mask").hide();
    })
})
//清理缓存
function clearCache()
{
    $.get('/admin.php/site/clear',function(){
    });
    $.get('/site/clear',function(){
        alert('已清空缓存 ok.');
    });
}