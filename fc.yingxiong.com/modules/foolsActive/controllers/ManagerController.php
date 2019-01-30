<?php

class ManagerController extends LoginedController
{
    public function actionIndex()
    {
        $dataProvider = new CActiveDataProvider('GiftModel', array(
            'pagination' => array('pageSize' => Page::SIZE, 'pageVar' => 'page')
        ));
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    public function actionUpdate($id)
    {
        $model = GiftModel::model()->findByPk($id);
        if(isset($_POST['GiftModel'])){
            $model->attributes = $_POST['GiftModel'];
            $model->start_at = strtotime($model->start_at);
            $model->end_at = strtotime($model->end_at);
            if($model->save()) {
                $this->showSuccess('更新成功',$this->createUrl('index'));
            }
        }
        $model->start_at = date('Y-m-d H:i:s',$model->start_at);
        $model->end_at = date('Y-m-d H:i:s',$model->end_at);
        $this->render('update', array('model' => $model));
    }

    public function actionCreate(){
        $model = new GiftModel();
        if(isset($_POST['GiftModel'])){
            $model->attributes = $_POST['GiftModel'];
            $model->start_at = strtotime($model->start_at);
            $model->end_at = strtotime($model->end_at);
            if($model->save()) {
                $this->showSuccess('创建成功',$this->createUrl('index'));
            }
        }
        $this->render('create',array('model'=>$model));
    }

    public function actionDelete($id){
        $model = GiftModel::model()->findByPk($id);
        if($model){
            $model->delete();
            GiftCodeModel::model()->deleteAll('gift_id=:gift_id',array(':gift_id'=>$id));
            echo 1;
        }
    }
    public function actionCode($id){
        $giftInfo = GiftModel::model()->findByPk($id);
        $criteria = new CDbCriteria();
        $criteria->addCondition('gift_id=:gift_id');
        $criteria->params=array(':gift_id'=>$id);
        $dataProvider = new CActiveDataProvider('GiftCodeModel', array(
            'criteria'=>$criteria,
            'pagination' => array('pageSize' => Page::SIZE, 'pageVar' => 'page')
        ));
        $this->render('code',array( 'dataProvider' => $dataProvider,'giftInfo'=>$giftInfo));
    }

    public function actionCodeImport()
    {
        set_time_limit(0);
        $giftId = Yii::app()->request->getParam('giftId');
        $type = Yii::app()->request->getParam('type');
        $file = $_FILES;
        if ($file && $giftId && isset(GiftCodeModel::$codeTypeList[$type])) {
            $handle = @fopen($_FILES["file"]["tmp_name"], "r");
            if ($handle) {
                while (!feof($handle)) {
                    $code = fgets($handle, 4096);
                    //入库
                    $CodeModel = new GiftCodeModel();
                    $CodeModel->gift_id = $giftId;
                    $CodeModel->type=  $type;
                    $CodeModel->code = trim($code);
                    $CodeModel->save();
                }
                fclose($handle);
            }
        //    @unlink($tmpFile);
            $msg = "导入成功!";
        } else {
            $msg = '提交错误';
        }
        echo $msg;
    }

    public function actionCodeExport($id){
        $sql = "select code,type from {{gift_code}} where gift_id=$id and phone is null";
        $command  = Yii::app()->db->createCommand($sql);
      //  $arrHeader = array(array('code', '类型(' . GiftCodeModel::CODE_TYPE_DEFAULT . ':不限' . GiftCodeModel::CODE_TYPE_LEGAL . ':正版' . GiftCodeModel::CODE_TYPE_UNLEGAL . ':越狱)','手机号码','领取时间'));
        $arrHeader = array(array('code', '类型(' . GiftCodeModel::CODE_TYPE_DEFAULT . ':不限' . GiftCodeModel::CODE_TYPE_LEGAL . ':正版' . GiftCodeModel::CODE_TYPE_UNLEGAL . ':越狱)'));
        $list = $command->queryAll();
        $arrExcelInfo = array_merge($arrHeader, $list);
        $objPHPExcel = new PHPExcel();
        $objPHPExcel ->getActiveSheet()->fromArray(
            $arrExcelInfo, // 赋值的数组
            NULL, // 忽略的值,不会在excel中显示
            'A1' // 赋值的起始位置
        );
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="剩余礼包码.xlsx"');
        header('Cache-Control: max-age=0');
        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, "Excel2007");
        $objWriter->save('php://output');
        $objPHPExcel->disconnectWorksheets();
        unset($objPHPExcel);
    }

    public function actionCodeDelete($id){
        GiftCodeModel::model()->deleteByPk($id);
        echo 1;
    }

    public function actionCodeTruncate($id){
        GiftCodeModel::model()->deleteAll('gift_id=:gift_id',array(':gift_id'=>$id));
        $this->showSuccess('删除成功');
    }
}