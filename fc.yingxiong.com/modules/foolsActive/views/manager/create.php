<?php
/* @var $this ModuleController */
/* @var $model ModuleModel */

$this->breadcrumbs=array(
    array('name'=>'礼包管理','url'=>Yii::app()->createUrl('gift/index')),
    array('name'=>'礼包管理')
);

?>


<?php $this->renderPartial('_form', array('model'=>$model,'name'=>'创建礼包')); ?>