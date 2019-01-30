<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/19/019
 * Time: 15:46
 */
namespace app\controllers\jws;

use app\models\H5DataModel;
use common\Cms;
use common\components\H5BaseController;
use common\components\phpexcel\PHPExcel;
use common\components\phpexcel\PHPExcel_IOFactory;
use common\models\h5\H5;
use PHPUnit\Util\Log\JSON;

class WorldCupController extends H5BaseController
{
    //登录
    public function actionAjaxLogin(){
        $type=Cms::getPostValue('type');//  ios、android
        $service_name=Cms::getPostValue('service_name');//  区服名字
        Cms::setSession('service_name_jws',$service_name);
        $name=Cms::getPostValue('name');//  角色名字
//        if(YII_DEMO==false && YII_DEV==false){
//            $file = trie_filter_load('words.dic');
//            $name = trie_filter_search_all($file,$name);  // 签名
//            if (!empty($name)) {
//                $this->ajaxOutPut(['status' => -1, 'msg' => '输入的内容含有敏感词，请重新编辑！']);
//            }
//            if (!isset($_POST['h5_id']) || $_POST['h5_id'] == null) {
//                $this->ajaxOutPut(['status' => -1, 'msg' => '缺少参数']);
//            }
//        }
        $h5_id = Cms::getPostValue('h5_id');//活动ID
        $username = base64_encode($name);//用户名
        $h5 = H5::findOne($h5_id);
        $h5_data= H5DataModel::find()->where(['website_id' => $h5->website_id, 'h5_id' => $h5->id])->andWhere(['username' => $username])->one();
        if(!$h5_data){
            $data=[
                'service_name'=>$service_name,
                'type'=>$type,
                'guess'=>[],
            ];
            $h5_data = new H5DataModel();
            $h5_data->data=serialize($data);
        }

        $h5_data->username=$username;
        $h5_data->website_id=$h5->website_id;
        $h5_data->h5_id=$h5->id;
//        $h5_data->created_at=time();
        $h5_data->save();
        Cms::setSession('jws_login_name',$username);
        Cms::setSession('h5_id',5);
        $this->ajaxOutPut(['status' => 0, 'msg' => self::data_($h5_data->data),'time'=>time()]);
    }

    //竞猜
    public function actionAjaxSaveData(){
        $this->_checkLogin();
        //竞猜时间 当天的12点到20点
        $start_time=strtotime(date('Y-m-d ').'12:00:00');
        $ent_time=strtotime(date('Y-m-d ').'20:00:00');
        if($start_time>time() || $ent_time<time()){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'竞猜时间为今日12:00-20:00']);
        }
        $h5_id = Cms::getSession('h5_id');//活动ID
        $guess_data=Cms::getPostValue('data',[]);
        $sum_time=['sum_data'=>date('Y-m-d H:i:s',time())];
        $guess_data=array_merge($guess_data,$sum_time);
        $h5 = H5::findOne($h5_id);
        $username=Cms::getSession('jws_login_name');
        $user=H5DataModel::find()->where(['website_id'=>$h5->website_id,'h5_id'=>$h5_id])->andWhere(['username'=>$username])->one();
        if($user){
            $data=unserialize($user->data);
            $data['service_name']=Cms::getSession('service_name_jws');;
            $data['guess']=array_merge([$guess_data],$data['guess']);
           if($user->created_at>strtotime(date('Y-m-d'))){
               $this->ajaxOutPut(['status'=>-1,'msg'=>'您今日已提交竞猜信息，请明日竞猜时间内再来']);
           }
           $user->data=serialize($data);
           $user->created_at=time();
           $user->save();
           $this->ajaxOutPut(['status'=>0,'msg'=>'success']);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录']);
        }
    }
    //获取用户信息
    public function actionAjaxGetUser(){
        $this->_checkLogin();
        $data=[];
        $username=Cms::getSession('jws_login_name');
        $h5_id = Cms::getSession('h5_id');//活动ID
        $user=H5DataModel::find()->where(['h5_id'=>$h5_id])->andWhere(['username'=>$username])->asArray()->one();
        if($user['data']){
            $guess=unserialize($user['data']);
            $data=$guess['guess'];
        }
        $this->ajaxOutPut(['status'=>0,'msg'=>$data,'time'=>time()]);
    }
    /**
     * 监测登录
     */
    private function _checkLogin()
    {
        $phone = Cms::getSession('jws_login_name');
        if (!$phone) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '请登录！']);
        }
    }
    //处理用户的信息
    private static function data_($data){
        $msg=[];
        $data=unserialize($data);
        if(isset($data['guess'])){
            $msg=$data['guess'];
        }
        return $msg;
    }

    //导数据
    public function actionExpWorld(){
        //导出时间
        $start_time=strtotime(date('Y-m-d 11:00:00'));
        $end_time=strtotime(date('Y-m-d 11:00:00',strtotime('+1 day')));
        if(time()>$start_time && time()<$end_time){
            $list=[];
            $all_data=H5DataModel::find()->where(['website_id'=>37,'h5_id'=>5])->asArray()->all();
            if($all_data){
                //投票数据时间
                $vote_start_time=strtotime(date('Y-m-d 12:00:00',strtotime('-1 day')));
                $vote_end_time=strtotime(date('Y-m-d 20:00:00',strtotime('-1 day')));
                foreach ($all_data as $value){
                    $data=unserialize($value['data']);
                    if($data){
                        $re=[];
                        foreach ($data['guess'] as $v){
                            if(strtotime($v['sum_data'])>=$vote_start_time && strtotime($v['sum_data'])<=$vote_end_time){
                                $re['username']=base64_decode($value['username']);
                                $re['type']=$data['type'];
                                $re['service_name']=$data['service_name'];
                                $re['match']=$v['one'].' VS '.$v['two'];
                                $re['is_guess']=$v[$v['is_guess']];
                                $re['created_at']=$v['sum_data'];
                            }else{
                                continue 1;
                            }
                            $list[]=$re;
                        }
                    }
                }
            }
            if(!$list){
                $this->ajaxOutPut(['暂未任何用户竞猜！']);
            }
            $filename='极无双'.date('Y-m-d',strtotime('-1 day')).'世界杯竞猜';
            header("Content-type:application/vnd.ms-excel");
            header("Content-Disposition:filename=".$filename.".xls");
            header('Cache-Control: max-age=0');

            $strexport="用户名\t手机系统\t服务器\t对阵双方\t胜利方\t竞猜时间\r";
            foreach ($list as $row){
                $strexport.=$row['username']."\t";
                $strexport.=$row['type']."\t";
                $strexport.=$row['service_name']."\t";
                $strexport.=$row['match']."\t";
                $strexport.=$row['is_guess']."\t";
                $strexport.=$row['created_at']."\r";
            }
            $strexport=iconv('UTF-8',"GBK//TRANSLIT",$strexport);
            exit($strexport);
        }else {
            $this->ajaxOutPut(['请在当天的11点到次日的11点操作！']);
        }
    }





    public function actionTes(){
//        $_POST['type']='ios';
//        $_POST['service_name']='无尽争霸';
//        $_POST['name']='测试账户';
//        $_POST['h5_id']=5;
//        $this->actionAjaxLogin();
        $this->actionExpWorld();
//        $this->actionAjaxGetUser();
        exit;
    }

}