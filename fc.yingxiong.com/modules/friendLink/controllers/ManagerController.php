<?php

class ManagerController extends LoginedController
{
    public function actions(){
        return array('modify'=>array(
            'class'=>'application.admin.controllers.commonaction.ModifyAction',
        )
        );
    }
	public function actionIndex()
	{
        $dataProvider = new CActiveDataProvider('FriendLinkModel', array(
            'criteria'=>array(
                'order'=>'displayorder asc',
            ),
            'pagination' => array('pageSize' => Page::SIZE, 'pageVar' => 'page')
        ));
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
	}

    public function actionUpdate($id)
    {
        $model = FriendLinkModel::model()->findByPk($id);
        if(isset($_POST['FriendLinkModel'])){
            $model->attributes = $_POST['FriendLinkModel'];
            if($model->save()) {
                //更新缓存
                $this->showSuccess('更新成功',$this->createUrl('index'));
            }
        }
        $this->render('update', array('model' => $model));
    }

    public function actionCreate(){
        $model = new FriendLinkModel();
        if(isset($_POST['FriendLinkModel'])){
            $model->attributes = $_POST['FriendLinkModel'];
            if($model->save()) {
                //更新缓存
                $this->showSuccess('创建成功',$this->createUrl('index'));
            }
        }
        $this->render('create',array('model'=>$model));
    }

    public function actionDelete($id){
        $model = FriendLinkModel::model()->findByPk($id);
        if($model){
            $model->delete();
            echo 1;
        }
    }
}