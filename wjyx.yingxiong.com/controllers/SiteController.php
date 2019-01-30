<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\models\GameSubscribe;

class SiteController extends PcController
{
    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


    public function actionExcel(){
        $filename='wjyx'.date('Y-m-d');
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=".$filename.".xls");
        if($_GET){
            $start=Cms::getGetValue('start').':00:00';
            $end=Cms::getGetValue('end').':00:00';
            $data=GameSubscribe::find()->select('email,created_at')->where(['website_id'=>75])
                ->andWhere(['between', 'created_at',strtotime($start), strtotime($end)])->asArray()->all();
            if($data){
                $strexport="邮箱\t预约时间\r";
                foreach ($data as $row){
                    $strexport.=$row['email']."\t";
                    $strexport.=date('Y-m-d H:i:s',$row['created_at'])."\r";
                }
                $strexport=iconv('UTF-8',"GB2312//IGNORE",$strexport);
                exit($strexport);
            }
        }else{
            $data=GameSubscribe::find()->select('email,created_at')->where(['website_id'=>75])->asArray()->all();
            if($data){
                $strexport="邮箱\t预约时间\r";
                foreach ($data as $row){
                    $strexport.=$row['email']."\t";
                    $strexport.=date('Y-m-d H:i:s',$row['created_at'])."\r";
                }
                $strexport=iconv('UTF-8',"GB2312//IGNORE",$strexport);
                exit($strexport);
            }
        }
    }


}
