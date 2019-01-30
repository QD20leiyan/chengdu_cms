<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/12/19/019
 * Time: 15:23
 */

namespace app\controllers;


use common\Cms;
use common\models\brdz\BrdzYuyueModel;
use common\widgets\commonMethod\CommonMethodController;
use yii\helpers\Json;

class CommonController extends CommonMethodController
{
    static function actionYy(){
       $phone=Cms::getPostValue('phone');
        if (!$phone || !Cms::checkPhone($phone)) {
            echo Json::encode(['status' => -1, 'msg' => '手机号格式不正确！']);
            exit;
        }
        $model=BrdzYuyueModel::find()->where(['phone'=>$phone])->one();
        if($model){
            echo Json::encode(['status' => -1, 'msg' => '该手机号码已预约']);
            exit;
        }else{
            $model=new BrdzYuyueModel();
            $model->phone=$phone;
            $model->created_at=time();
            $model->type=1;
            $model->save();
            echo Json::encode(['status' => 0, 'msg' => '恭喜您！预约游戏成功']);
            exit;
        }
    }

}