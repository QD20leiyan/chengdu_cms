<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use app\models\SszjYuyueModel;
use common\Cms;
use common\components\PcController;
use common\widgets\commonMethod\CommonMethodController;

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

    //预约记录门派

    public function actionAjaxYuyue(){
         $school=Cms::getPostValue('school');//门派 1蜀山派 2 苍墟派
         $phone=Cms::getPostValue('phone');
         $type=Cms::getPostValue('type');
        $res = Cms::yuyue(Cms::IS_NEED_YZM, Cms::YUYUE,1);
        if($res['status']==0){
            $sszj_yuyue=new SszjYuyueModel();
            $sszj_yuyue->phone=$phone;
            $sszj_yuyue->school=$school;
            $sszj_yuyue->type=$type;
            $sszj_yuyue->created_at=time();
            $sszj_yuyue->save();
        }
        $this->ajaxOutPut($res);
    }

    //门派对应人数及百分比
    public function actionAjaxPer(){
        $model=SszjYuyueModel::find()->select(['count(*) as num','school'])->groupBy(['school'])->asArray()->all();
        $cxp=0;
        $ssp=0;
        foreach ($model as $k=>$v){
            if(isset($v['school'])){
                if($v['school']==1){
                    $ssp=$v['num'];
                }else{
                    $cxp=$v['num'];
                }
            }
        }
//        $count=$ssp+$cxp;
//        $count= $count==0?1:$count;
        $ssp_num=number_format(self::randomFloat(52,53),2);
        $cxp_num=100-$ssp_num;
        $data=[
            'ssp'=>
                ['num'=>$ssp,
                  'scale'=>$ssp_num
                ],
            'cxp'=> [
                'num'=>$cxp,
                'scale'=>$cxp_num
            ],
        ];
       $this->ajaxOutPut($data);
    }
    static function randomFloat($min, $max) {
        return $min + mt_rand() / mt_getrandmax() * ($max - $min);
    }

    public function actionTes(){
        $this->actionAjaxPer();
        exit;
    }
}
