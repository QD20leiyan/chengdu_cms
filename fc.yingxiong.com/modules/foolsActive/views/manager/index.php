<?php
/* @var $this ModuleController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
    array('name'=>'礼包管理','url'=>'#'),
    array('name'=>'礼包列表')
);

?>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box purple">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>礼包码管理
                </div>
                <div class="actions">
                    <a class="btn btn-default btn-sm" href="<?php echo $this->createUrl('manager/create')?>">
                        <i class="fa fa-pencil"></i> 添加礼包码 </a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="table-scrollable">
                    <table class="table table-striped table-bordered table-hover">

                        <thead>
                        <tr>
                            <th style="width:300px !important" scope="col">
                                礼包名称
                            </th>
                            <th scope="col">
                                开始时间
                            </th>
                            <th scope="col">
                                结束时间
                            </th>
                            <th scope="col">
                                是否开启
                            </th>
                            <th scope="col">
                                添加时间
                            </th>
                            <th scope="col">
                                操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach($dataProvider->getData() as $k=>$v){?>
                            <tr>
                                <td>
                                    <?php echo $v['name'];?>
                                </td>
                                <td>
                                    <?php echo date('Y-m-d H:i:s',$v['start_at']);?>
                                </td>
                                <td>
                                    <?php echo date('Y-m-d H:i:s',$v['end_at']);?>
                                </td>
                                <td>
                                    <?php echo $v['status']?'<span class="label label-sm label-success">开启</span>':'<span class="label label-sm label-danger">未开启</span>';?>
                                </td>
                                <td>
                                    <?php echo date('Y-m-d H:i:s',$v['created_at']);?>
                                </td>
                               <td>
                                    <a class="edit" href="<?php echo $this->createUrl('manager/update/id/'.$v['id']);?>">
                                        Edit </a>

                                    <a class="delete" onclick="openDialog('deleteModal','<?php echo $this->createUrl('manager/delete/id/'.$v['id']);?>')" >
                                        Delete </a>

                                   <a class="list"  href="<?php echo $this->createUrl('manager/code/id/'.$v['id']);?>" >
                                       礼包码 </a>
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
