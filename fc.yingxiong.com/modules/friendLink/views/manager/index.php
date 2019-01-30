<?php
/* @var $this ModuleController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
    array('name'=>'友情链接管理','url'=>'#'),
    array('name'=>'友情链接列表')
);

?>

<div class="row">
    <div class="col-md-12">
        <div class="portlet box purple">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>友情链接管理
                </div>
                <div class="actions">
                    <a class="btn btn-default btn-sm" href="<?php echo $this->createUrl('manager/create')?>">
                        <i class="fa fa-pencil"></i> 添加链接 </a>
                </div>
            </div>
            <div class="portlet-body">
                <div class="table-scrollable">
                    <table class="table table-striped table-bordered table-hover">

                        <thead>
                        <tr>
                            <th scope="col">
                                排序
                            </th>
                            <th style="width:200px !important" scope="col">
                                站点名称
                            </th>
                            <th scope="col">
                                站点URL
                            </th>
                            <th scope="col">
                                站点描述
                            </th>
                            <th scope="col">
                                logo
                            </th>
                            <th scope="col">
                                操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php foreach($dataProvider->getData() as $k=>$v){?>
                            <tr class="popData" data-id="<?php echo $v['id'];?>" data-mod="FriendLinkModel" data-url="<?php echo Yii::app()->createUrl('friendLink/manager/modify')?>">
                                <td class="popDialog" data-key="displayorder">
                                    <?php echo $v['displayorder'];?>
                                </td>
                                <td class="popDialog" data-key="name">
                                    <?php echo $v['name'];?>
                                </td>
                                <td class="popDialog" data-key="url" data-type="url">
                                    <a href="<?php echo $v['url'];?>"> <?php echo $v['url'];?></a>
                                </td>
                                <td class="popDialog" data-key="description">
                                    <?php echo $v['description'];?>
                                </td>
                                <td class="popDialog" data-key="logo" data-type="image">
                                    <?php echo $v['logo'] ? '<img src="' . $v["logo"] . '" width="88px" height="31px">' : '' ?>
                                </td>
                               <td>
                                    <a class="edit" href="<?php echo $this->createUrl('manager/update/id/'.$v['id']);?>">
                                        Edit </a>

                                    <a class="delete" onclick="openDialog('deleteModal','<?php echo $this->createUrl('manager/delete/id/'.$v['id']);?>')" >
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
