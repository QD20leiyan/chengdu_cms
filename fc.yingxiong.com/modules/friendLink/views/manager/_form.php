<?php
/* @var $this ModuleController */
/* @var $model ModuleModel */
/* @var $form CActiveForm */
?>
<div class="portlet box green">
    <div class="portlet-title">
        <div class="caption">
            <i class="fa fa-gift"></i>
        </div>
        <div class="tools">
            <a class="collapse" href="javascript:;" data-original-title="" title="">
            </a>
            <a class="reload" href="javascript:;" data-original-title="" title="">
            </a>
        </div>
    </div>
<div class=" portlet-body form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'module-model-form',
    'htmlOptions'=>array('class'=>'form-horizontal'),
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>
    <div class="form-body">

	<?php echo $form->errorSummary($model); ?>

	<div class="form-group">
		<?php echo $form->labelEx($model,'name',array('class'=>'col-md-3 control-label')); ?>
        <div class="col-md-4">
            <?php echo $form->textField($model,'name',array('class'=>'form-control')); ?>
        </div>
        <span class="help-block">
            <?php echo $form->error($model,'name'); ?>
        </span>
	</div>
        <div class="form-group">
            <?php echo $form->labelEx($model,'url',array('class'=>'col-md-3 control-label')); ?>
            <div class="col-md-4">
                <?php echo $form->textField($model,'url',array('class'=>'form-control')); ?>
            </div>
        <span class="help-block">
            <?php echo $form->error($model,'url'); ?>
        </span>
        </div>
        <div class="form-group">
            <?php echo $form->labelEx($model,'displayorder',array('class'=>'col-md-3 control-label')); ?>
            <div class="col-md-4">
                <?php echo $form->textField($model,'displayorder',array('class'=>'form-control')); ?>
            </div>
        <span class="help-block">
            <?php echo $form->error($model,'displayorder'); ?>
        </span>
        </div>
        <div class="form-group">
            <?php echo $form->labelEx($model,'description',array('class'=>'col-md-3 control-label')); ?>
            <div class="col-md-4">
                <?php echo $form->textField($model,'description',array('class'=>'form-control')); ?>
            </div>
        <span class="help-block">
            <?php echo $form->error($model,'description'); ?>
        </span>
        </div>
        <div class="form-group">
            <?php echo $form->labelEx($model,'logo',array('class'=>'col-md-3 control-label')); ?>
            <div class="col-md-4">
                <!-- Begin: life time stats -->
                <?php
                $this->widget('backend.extensions.baiduUeditor.UeditorWidget',
                    array(
                        'id'=>'imageId',//容器的id 唯一的[必须配置]
                        'name'=>'FriendLinkModel[logo]',//post到后台接收的name [必须配置]
                        'inputId'=>'imageInputId',//post到后台接收的input ID [file image 时必须配置]
                        'content'=>$model->logo,//初始化内容 [可选的]
                        'class'=>'form-control form-control01',
                        'btnClass'=>'btn blue',
                        'type'=>'image',
                        //配置选项，[可选的]
                        //将ueditor的配置项以数组键值对的方式传入,具体查看ueditor.config.js
                        //不要配置serverUrl(即使配置也会被覆盖)程序会自动处理后端url
                        'config'=>array(
                            // 'toolbars'=>array(array('fullscreen', 'source', '|')),//toolbars注意是嵌套两个数组
                            'lang'=>'zh-cn'
                        )
                    )
                );
                ?>
                <!-- End: life time stats -->
            </div>
            <script>
                var uploadUrl = '<?php echo ImageServiceHandle::uploadUrl();?>'
            </script>
        <span class="help-block">
            <?php echo $form->error($model,'logo'); ?>
        </span>
        </div>
   </div>
    <div class="form-actions">
        <div class="row">
            <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-circle blue" type="submit"> <?php echo $model->isNewRecord ? 'Create' : 'Save'; ?></button>
                <button class="btn btn-circle default" type="button">Cancel</button>
            </div>
        </div>
    </div>
<?php $this->endWidget(); ?>
    <script src="<?php echo BACKEND_STATIC_DOMAIN;?>global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <link href="<?php echo BACKEND_STATIC_DOMAIN; ?>global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet"/>
</div><!-- form -->
</div>
<script>
    $().ready(function(){
        $('#GiftModel_start_at').datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            language: 'zh',
            pickDate: true,
            pickTime: true,
            hourStep: 1,
            minuteStep: 15,
            secondStep: 30,
            inputMask: true
        });
        $('#GiftModel_end_at').datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            language: 'zh',
            pickDate: true,
            pickTime: true,
            hourStep: 1,
            minuteStep: 15,
            secondStep: 30,
            inputMask: true
        });
    })
</script>
