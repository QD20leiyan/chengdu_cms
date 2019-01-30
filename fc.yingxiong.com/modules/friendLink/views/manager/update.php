<?php
/* @var $this ModuleController */
/* @var $model ModuleModel */

$this->breadcrumbs=array(
    array('name'=>'友情链接管理','url'=>Yii::app()->createUrl('friendLink')),
    array('name'=>'更新友情链接')
);

?>


<?php $this->renderPartial('_form', array('model'=>$model)); ?>