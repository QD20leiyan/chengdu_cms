<?php
/* @var $this ModuleController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
    array('name'=>'礼包管理','url'=>array('/gift/manager/index')),
    array('name'=>'礼包码列表')
);

?>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box purple">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>《<?php echo $giftInfo->name?>》礼包码列表
                </div>
                <div class="actions">
                    <a href="#" class="btn btn-default btn-sm" id="import">
                        <i class=""></i> 导入 </a>
                    <a href="#" class="btn btn-default btn-sm" id="export">
                        <i class=""></i> 导出未领取 </a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="table-scrollable">
                    <table class="table table-striped table-bordered table-hover">

                        <thead>
                        <tr>
                            <th style="width:300px !important" scope="col">
                                ID
                            </th>
                            <th scope="col">
                                code
                            </th>
                            <th scope="col">
                                版本
                            </th>
                            <th scope="col">
                                是否领取
                            </th>
                            <th scope="col">
                                领取时间
                            </th>
                            <th scope="col">
                                领取手机号码
                            </th>
                            <th scope="col">
                                操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php $page = Yii::app()->request->getParam('page', 1);
                        $i = ($page - 1) * Page::SIZE;?>
                        <?php foreach($dataProvider->getData() as $k=>$v){
                            $i++;?>
                            <tr>
                                <td>
                                    <?php echo $i;?>
                                </td>
                                <td>
                                    <?php echo $v['code'];?>
                                </td>
                                <td>
                                    <?php echo GiftCodeModel::$codeTypeList[$v['type']];?>
                                </td>
                                <td>
                                    <?php echo $v['phone']?'<span class="label label-sm label-success">是</span>':'<span class="label label-sm label-danger">否</span>';?>
                                </td>
                                <td>
                                    <?php echo $v['send_at']?date('Y-m-d H:i:s',$v['send_at']):'';?>
                                </td>
                                <td>
                                    <?php echo $v['phone'];?>
                                </td>
                               <td>
                                    <a class="delete" onclick="openDialog('deleteModal','<?php echo $this->createUrl('manager/codeDelete/id/'.$v['id']);?>')" >
                                        Delete </a>
                                </td>
                            </tr>
                        <?php } ?>
                        </tbody>
                    </table>

                </div>
                <div class="row">
                    <div class="col-md-5 col-sm-12"><div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite"><?php echo $dataProvider->getPagination()->pageSize?>条/页；共<?php echo $dataProvider->getPagination()->pageCount?>页；<?php echo $dataProvider->getPagination()->itemCount?>条</div></div>
                    <div class="col-md-7 col-sm-12">
                        <div class="dataTables_paginate paging_bootstrap_full_number" id="sample_1_paginate">
                            <?php $this->widget('CLinkPager', Page::go($dataProvider->getPagination())) ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<link href="<?php echo Yii::app()->baseUrl;?>/static/admin/layout/css/ace-file-upload.css" rel="stylesheet" type="text/css"/>
<script src="<?php echo Yii::app()->baseUrl?>/static/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script>
    $().ready(function(){
        $("#import").click(function () {
            bootbox.dialog({
                    title: "导入礼包码",
                    message: '<div class="row"> ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal" id="myform"  method="post" ' +
                    'action="<?php echo $this->createUrl('manager/codeImport')?>" ' +
                    'enctype="multipart/form-data"> ' +
                    '<div class="form-group"> ' +
                    '<div class="col-md-8"> ' +
                    '<input type="file" id="id-input-file-2" name="code"/>' +
                    '<input type="hidden" name="giftId" value="<?=$giftInfo->id?>" />' +
                    '<div class="col-md-8"> ' +
                    '<select name="type" id="type" class="form-control">' +
                        <?php foreach(GiftCodeModel::$codeTypeList as $v=>$n){?>
                        '<option value="<?php echo $v?>"><?php echo $n?></option>'+
                        <?php }?>
                    '</select>' +
                    '</div>'+
                    '<div class="col-md-8"> ' +
                    '<i>仅支持txt格式文件,参考格式<a target="_blank" href="upload/eg.txt">查看</a></i></div> ' +
                    '</div>'+
                    '</form> </div> </div>',
                    buttons: {
                        success: {
                            label: "导入",
                            className: "btn-success",
                            callback: function () {
                                var file = $('input[type=file]')[0].files[0];
                                if(!file){
                                    alert('请选择文件');
                                    return;
                                }
                                var data = new FormData($(this).parents("form").get(0));
                                data.append('file', file);
                                data.append('type', $('#type').val());
                                data.append('giftId', $('input[name=giftId]').val());
                                $.ajax({
                                    type: 'POST',
                                    url: '<?php echo $this->createUrl('manager/codeImport')?>',
                                    data: data,
                                    /**
                                     *必须false才会自动加上正确的Content-Type
                                     */
                                    contentType: false,
                                    /**
                                     * 必须false才会避开jQuery对 formdata 的默认处理
                                     * XMLHttpRequest会对 formdata 进行正确的处理
                                     */
                                    processData: false
                                }).then(function (msg) {
                                    //remove loading
                                    $(".bootbox").remove();
                                    $(".modal-backdrop").remove();
                                    //doneCal
                                    alert(msg);
                                    window.location.href = '';
                                }, function () {
                                    //failCal
                                    alert('failed');
                                });

                            }
                        }
                    }
                }
            );
            $('#id-input-file-2').ace_file_input({
                no_file: '请选择导入码 ...',
                btn_choose: '选择',
                btn_change: '取消',
                droppable: false,
                onchange: null,
                thumbnail: false, //| true | large
                whitelist: 'text',
                before_change: function(files, dropped) {
                    var file = files[0];
                    if(file.type!='text/plain'){
                        alert('格式有误');
                        return false;
                    }
                    return true;
                }
            });
        });
        $("#export").click(function(){
            var url = '<?php echo $this->createUrl("manager/codeExport/id/".$giftInfo->id)?>';
            window.open(url);
        });
        $("#truncate").click(function(){
            bootbox.confirm('确认要清空？',function(result){
                if(result){
                    window.location = '<?php echo $this->createUrl("manager/codeTruncate/id/".$giftInfo->id)?>';
                }
            })
        });
    })
</script>