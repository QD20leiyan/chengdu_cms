<?php
/* @var $this ModuleController */
/* @var $model ModuleModel */

$this->breadcrumbs=array(
    array('name'=>'礼包管理','url'=>Yii::app()->createUrl('gift/index')),
    array('name'=>'创建礼包')
);

?>


<?php $this->renderPartial('_form', array('model'=>$model)); ?>