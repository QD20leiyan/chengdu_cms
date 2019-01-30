<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/3/21/021
 * Time: 17:27
 */

namespace app\controllers;


use common\Cms;
use common\components\HomeController;
use common\components\PcController;
use common\models\Category;

class ArmsController extends HomeController
{
    //数据方法
    public static function parse_skill_arr($content,$flag='') {
        $peg = '/\[pc_big_img](.*)\[pc_small_img](.*)\[wap_img](.*)\[label](.*)\[attribute](.*)/iu';
        $pc_big_img='';
        $pc_small_img='';
        $wap_img='';
        $label='';
        $attribute='';
        preg_match($peg,strip_tags($content),$result);
        if(isset($result[1]) && !empty($result[1])){
            $pc_big_img=$result[1];
        }
        if(isset($result[2])&& !empty($result[2])){
            $pc_small_img=$result[2];
        }
        if(isset($result[3])&& !empty($result[3])){
            $wap_img=$result[3];
        }
        if(isset($result[4])&& !empty($result[4])){
            $label=explode(',',strip_tags($result[4]));
        }
        if(isset($result[5])&& !empty($result[5])){
            $attribute=strip_tags($result[5]);
        }
        $data=[
            'pc_big_img'=>$pc_big_img,
            'pc_small_img'=>$pc_small_img,
            'wap_img'=>$wap_img,
            'label'=>$label,
            'attribute'=>$attribute,
        ];
        return $data;
    }

    //ajax 武器列表
    public function actionAjaxGetArms(){
        $id=Cms::getPostValue('id');
        $data_info=$this->getContentArr($id);
        $data=[];
        if($data_info){
            foreach ($data_info as $key=>$value){
                $va['title']=$value['title'];
                $va['sub_title']=$value['sub_title'];
                $va['summary']=$value['summary'];
                $va['content']=$this->parse_skill_arr(($value['content_message']));
                $data[]=$va;
            }
        }
        echo $this->ajaxOutPut($data);
    }

}