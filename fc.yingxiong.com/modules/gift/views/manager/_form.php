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
            <?php echo $form->labelEx($model,'send_content',array('class'=>'col-md-3 control-label')); ?>
            <div class="col-md-4">
                <?php echo $form->textArea($model,'send_content',array('class'=>'form-control')); ?><i>可用标签{code},代表礼包码</i>
            </div>
        <span class="help-block">
            <?php echo $form->error($model,'send_content'); ?>
        </span>
        </div>
	<div class="form-group">
		<?php echo $form->labelEx($model,'start_at',array('class'=>'col-md-3 control-label')); ?>
        <div class="col-md-4 date date-picker" data-date-format="yyyy-mm-dd">
		<?php echo $form->textField($model,'start_at',array('size'=>50,'maxlength'=>50,'class'=>'form-control input-circle','placeholder'=>"")); ?>
        </div>
        <span class="help-block">
		<?php echo $form->error($model,'start_at'); ?>
        </span>
	</div>
    <div class="form-group">
        <?php echo $form->labelEx($model,'end_at',array('class'=>'col-md-3 control-label')); ?>
        <div class="col-md-4 date date-picker" data-date-format="yyyy-mm-dd">
            <?php echo $form->textField($model,'end_at',array('size'=>50,'maxlength'=>50,'class'=>'form-control input-circle','placeholder'=>"")); ?>

        </div>
    <span class="help-block">
    <?php echo $form->error($model,'end_at'); ?>
    </span>
    </div>
    <div class="form-group">
        <?php echo $form->labelEx($model,'status',array('class'=>'col-md-3 control-label')); ?>
        <div class="col-md-4">
            <?php echo $form->checkBox($model,'status',array('size'=>50,'maxlength'=>50,'class'=>'form-control input-circle','placeholder'=>"")); ?>
        </div>
    <span class="help-block">
    <?php echo $form->error($model,'status'); ?>
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
    <script src="<?php echo Yii::app()->request->baseUrl; ?>/static/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <link href="<?php echo Yii::app()->request->baseUrl; ?>/static/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet"/>
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
