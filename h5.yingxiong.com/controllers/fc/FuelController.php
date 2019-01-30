<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/7/4/004
 * Time: 17:18
 */
namespace app\controllers\fc;

use app\models\H5DataModel;
use common\Cms;
use common\components\H5BaseController;
use common\components\UserDataController;

class FuelController extends H5BaseController
{

    //用户的登录
    public function actionAjaxLogin(){

        $h5_id=Cms::getPostValue('h5_id');//活动id
        $role_id=Cms::getPostValue('role_id');//角色id
        $service_id=Cms::getPostValue('service_id');//服务器ID
        $type=Cms::getPostValue('type','ios');//服务器ID

        $data=[
            'service_id'=>$service_id,
            'role_id'=>$role_id,
            'terrace'=>$type,//平台
            'guess'=>'',//竞猜助威数据 ['巴西':12,'比利时':10]
            'draw_num'=>5,
            'draw_at'=>time(),
        ];


        $category = [
            'gameid' => 6,
            'serverid' => $service_id,
            'rolename' =>'' ,
            'roleid' =>$role_id ,
        ];
        $content=UserDataController::provide($category);
        if(isset($content['code']) && $content['code']==0){
            $content=$content['data'];
            $username=base64_encode($content['rolename']);
            $user=H5DataModel::find()->where(['h5_id'=>$h5_id])->andWhere(['username'=>$username])->one();
            if(!$user){
                $user=new H5DataModel();
                $user->h5_id=$h5_id;
                $user->username=$username;
                $user->website_id=24;
                $user->data=serialize($data);
                $user->created_at=time();
                $user->save();
            }
            Cms::setSession('fuel_fc_name',$username);
            Cms::setSession('fuel_fc_h5_id',$h5_id);
            $guess=[];
            if($user->data){
                $data=unserialize($user->data);
                if($data['draw_at']<strtotime(date('Y-m-d'))){
                    $data['draw_num']=5;
                    $data['draw_at']=time();
                }
                $user->data=serialize($data);
                $guess=$data['guess'];
            }
            $draw_num=$data['draw_num'];
            $user->save();
           $data_=self::_getHelp($h5_id);

            $this->ajaxOutPut(['status'=>0,'msg'=>$guess,'max'=>self::_getMax($guess),'draw_num'=>$draw_num,'data_all'=>$data_]);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'角色信息有误！']);
        }
    }

    //刷新获取用户信息
    public function actionAjaxGetData(){
        $username=Cms::getSession('fuel_fc_name');
        $h5_id=Cms::getSession('fuel_fc_h5_id');
        //助威排行榜
        $data_=self::_getHelp($h5_id);

        $user=H5DataModel::find()->where(['h5_id'=>$h5_id])->andWhere(['username'=>$username])->one();
        if($user){
            $data=unserialize($user->data);
            $guess=$data['guess'];
            $draw_num=$data['draw_num'];
            $this->ajaxOutPut(['status'=>0,'msg'=>$guess,'max'=>self::_getMax($guess),'draw_num'=>$draw_num,'data_all'=>$data_]);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'未登录']);
        }
    }

    //用户助威
    public function actionAjaxHelp(){
        $username=Cms::getSession('fuel_fc_name');//已转换的用户名
        $h5_id=Cms::getSession('fuel_fc_h5_id');//活动id
        $help_name=Cms::getPostValue('help_name');//助威 国家名字

        if(empty($help_name)){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'请选择助威对象！']);
        }
        $user=H5DataModel::find()->where(['h5_id'=>$h5_id,'username'=>$username])->one();
        if(!$user){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'网络错误，请刷新页面！']);
        }
        $data=unserialize($user->data);
        if($data['draw_num']<=0){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'暂无助威机会']);
        }

        $data['draw_num']=$data['draw_num']-1;

        $draw_num=$data['draw_num'];
        $data['draw_at']=time();
        $guess=$data['guess'];
        if(isset($guess[$help_name])){
            $guess[$help_name]=$guess[$help_name]+1;
        }else{
            $guess[$help_name]=1;
        }

        $data['guess']=$guess;
        $user->data=serialize($data);
        $user->save();
        $data_=self::_getHelp($h5_id);
        $this->ajaxOutPut(['status'=>0,'msg'=>$guess,'max'=>self::_getMax($guess),'draw_num'=>$draw_num,'data_all'=>$data_]);
    }

    protected static function _getHelp($h5_id){
        //助威排行榜
        $all_user=H5DataModel::find()->where(['h5_id'=>$h5_id])->asArray()->all();
        $data_=[];
        if($all_user){
            foreach ($all_user as $k=>$v){
                $data=unserialize($v['data']);
                if($data['guess']) {
                    foreach ($data['guess'] as $ks => $vs) {
                        if($ks=='克罗地亚') {
                            $vs=$vs*16;
                        }else {
                            $vs = $vs * 10;
                        }
                        if (array_key_exists($ks, $data_)) {
                            $data_[$ks] += $vs;
                        } else {
                            $data_[$ks] = $vs;
                        }
                    }
                }
            }
        }
        return $data_;
    }

    protected static function _getMax($arr){
        $max='';
        if($arr){
            $t=max($arr);//获取最大的值
            $brr=array_flip($arr);//将数组键与值互换
            $max=$brr[$t];
        }
        return $max;
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


    //飞车助威全部数据
    public function actionExpAll(){
        //导出时间
        $list_data=[];
        $country_data=[];
        $all_data=H5DataModel::find()->where(['website_id'=>24,'h5_id'=>10])->asArray()->all();
        if($all_data){
            foreach ($all_data as $value){
                $data=unserialize($value['data']);
                if($data){
                    $re=[];
                    $re['username']=base64_decode($value['username']);
                    $guess=unserialize($value['data']);
                    $re['role_id']=$guess['role_id'];
                    $re['type']=$guess['terrace'];
                    if(isset($guess['guess']) && $guess['guess']) {
                        foreach ($guess['guess'] as $k => $v) {
                            $re[$k] = $v;
                            if (array_key_exists($k, $country_data)) {
                                $country_data[$k] += $v;
                            } else {
                                $country_data[$k] = $v;
                            }
                        }
                    }
                    $re['draw_at']=date('Y-m-d H:i:s',$guess['draw_at']);
                    $list_data[]=$re;
                }
            }
        }
        if(!$list_data){
            $this->ajaxOutPut(['暂未任何用户竞猜！']);
        }
        $filename='一起来飞车世界杯助威数据';
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=".$filename.".xls");
        header('Cache-Control: max-age=0');


        $strexport="\r各个国家助威的总票数\r法国\t巴西\t比利时\t乌拉圭\t俄罗斯\t瑞典\t克罗地亚\t英格兰\r";
        $strexport.=isset($country_data['法国'])?$country_data['法国']."\t":'0'."\t";
        $strexport.=isset($country_data['巴西'])?$country_data['巴西']."\t":'0'."\t";
        $strexport.=isset($country_data['比利时'])?$country_data['比利时']."\t":'0'."\t";
        $strexport.=isset($country_data['乌拉圭'])?$country_data['乌拉圭']."\t":'0'."\t";
        $strexport.=isset($country_data['俄罗斯'])?$country_data['俄罗斯']."\t":'0'."\t";
        $strexport.=isset($country_data['瑞典'])?$country_data['瑞典']."\t":'0'."\t";
        $strexport.=isset($country_data['克罗地亚'])?$country_data['克罗地亚']."\t":'0'."\t";
        $strexport.=isset($country_data['英格兰'])?$country_data['英格兰']."\t":'0'."\r";


        $strexport.="\r用户投票信息\r用户名\t角色ID\t手机平台\t法国\t巴西\t比利时\t乌拉圭\t俄罗斯\t瑞典\t克罗地亚\t英格兰\t最后一次助威时间\r";
        foreach ($list_data as $row){
            $strexport.=$row['username']."\t";
            $strexport.=$row['role_id']."\t";
            $strexport.=$row['type']."\t";
            $strexport.=isset($row['法国'])?$row['法国']."\t":'0'."\t";
            $strexport.=isset($row['巴西'])?$row['巴西']."\t":'0'."\t";
            $strexport.=isset($row['比利时'])?$row['比利时']."\t":'0'."\t";
            $strexport.=isset($row['乌拉圭'])?$row['乌拉圭']."\t":'0'."\t";
            $strexport.=isset($row['俄罗斯'])?$row['俄罗斯']."\t":'0'."\t";
            $strexport.=isset($row['瑞典'])?$row['瑞典']."\t":'0'."\t";
            $strexport.=isset($row['克罗地亚'])?$row['克罗地亚']."\t":'0'."\t";
            $strexport.=isset($row['英格兰'])?$row['英格兰']."\t":'0'."\t";
            $strexport.=$row['draw_at']."\r";
        }
        $strexport=iconv('UTF-8',"GBK//TRANSLIT",$strexport);
        exit($strexport);
    }



    public function actionTes(){

        $category = [
            'gameid' => 6,
            'serverid' => 40001,
            'rolename' =>'银石赛道' ,
            'roleid' =>'64574273' ,
        ];
        $content=UserDataController::provide($category);
        pr($content,1);


//        $_POST['role_id']=587889;
//        $_POST['service_id']=40001;
//        $_POST['h5_id']=10;
//
//        $this->actionAjaxLogin();


//        $_POST['help_name']='巴西';
//        $this->actionAjaxHelp();
        $this->actionAjaxGetData();
        exit;


    }

}