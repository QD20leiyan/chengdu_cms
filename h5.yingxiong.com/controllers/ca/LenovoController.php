<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/26/026
 * Time: 14:17
 */
namespace app\controllers\ca;

use app\models\H5DataModel;
use common\Cms;
use common\components\H5BaseController;
use common\helpers\Utils;
use common\models\Gift;
use common\models\GiftActivityModel;
use common\models\GiftCode;
use common\models\h5\H5;

class LenovoController extends H5BaseController
{


    protected static $gift_arr=[
        '313'=>['name'=>'火神燃烧弹（7天）','id'=>1],
        '314'=>['name'=>'平底锅（7天）','id'=>2],
        '315'=>['name'=>'血狐猎弓（7天）','id'=>3],
        '316'=>['name'=>'暴烈骑士（7天）','id'=>4],
        '317'=>['name'=>'堕落护士（180天）','id'=>5],
        '318'=>['name'=>'三道杠（永久）','id'=>6],
        '319'=>['name'=>'联想手机','id'=>7],
        '320'=>['name'=>'感谢参与','id'=>8],
    ];
    protected static $gift_arr_=[
        '1'=>313,
        '2'=>314,
        '3'=>315,
        '4'=>316,
        '5'=>317,
        '6'=>318,
        '7'=>319,
        '8'=>320,
    ];
    //首页默认加载的数据（判断是否为分享数据）
    public function actionAjaxAutoData(){
        $info=Cms::getPostValue('info');
        $info=Utils::authcode($info,'DECODE');
        $me_info=json_decode($info,true);//自己的用户id

        $h5_id=Cms::getPostValue('h5_id');//h5的id
        Cms::setSession('ca_h5_lenovo_id',$h5_id);
        Cms::setSession('ca_h5_lenovo_openid',$me_info['openid']);

        $h5=H5::findOne($h5_id);

        $data=[
            'gift_ids'=>'',//中奖id  例如：,1,2,4
            'is_shiwu'=>0,//是否中实物  例如：1/0
            'name'=>'',//收货人
            'address'=>'',//收货地址
            'tel'=>'',//收货电话
            'code'=>'',//收货邮编
            'draw_num'=>'',//抽奖剩余次数
            'draw_count'=>'',//抽奖次数
        ];

        $user_data = H5DataModel::find()->where(['openid' => $me_info['openid'], 'h5_id' => $h5_id])->one();
        if (!$user_data) {
            $data['draw_num']=3;
            $user_data = new H5DataModel();
            $user_data->website_id = $h5->website_id;
            $user_data->h5_id = $h5->id;
            $user_data->openid = $me_info['openid'];
            $user_data->username = base64_encode($me_info['nickname']);
            $user_data->data = serialize($data);
            $user_data->created_at = time();
            $user_data->save();
        }
        $data=unserialize($user_data->data);
        $draw_num=$data['draw_num'];
        $draw_count=$data['draw_count'];
        $this->ajaxOutPut(['status' => 0, 'msg' => 'success', 'draw_count'=>$draw_count,'draw_num'=>$draw_num]);
    }


    //抽奖 每个微信号只有三次抽奖机会
    public function actionAjaxDraw(){
        $openid=Cms::getSession('ca_h5_lenovo_openid');//openid
        $h5_id=Cms::getSession('ca_h5_lenovo_id');//用户的openid

        //判断是否有人中实物
        $user_=H5DataModel::find()->where(['h5_id'=>$h5_id])->asArray()->all();
        $is_shiwu=0;
        foreach ($user_ as $k=>$v){
            $data=unserialize($v['data']);
            if($data['is_shiwu']==1){
                $is_shiwu=1;
            }
        }

        $user=H5DataModel::find()->where(['h5_id'=>$h5_id,'openid'=>$openid])->one();
        if($user && $user->data){
            $data=unserialize($user->data);
            if($data['draw_num']<=0){
                $this->ajaxOutPut(['status'=>-1,'msg'=>'暂无抽奖机会！']);
            }
            $gift_ids=array_filter(explode(',',$data['gift_ids']));
            if($is_shiwu && !in_array('319',$gift_ids)) $gift_ids=array_merge(['319',$gift_ids]);
            $res=self::_gift_code($openid,10,$gift_ids);
            if($res['status']==0 && $res['is_shiwu']==0){
                $data['gift_ids']=$data['gift_ids'].','.$res['gift_id'];
                $data['draw_num']= $data['draw_num']-1;
                $data['draw_count']= $data['draw_count']+1;
            }elseif($res['status']==0 && $res['is_shiwu']==1){//实物处理
                $data['gift_ids']=$data['gift_ids'].','.$res['gift_id'];
                $data['is_shiwu']=1;
                $data['draw_num']= $data['draw_num']-1;
                $data['draw_count']= $data['draw_count']+1;
            }else{
                $this->ajaxOutPut($res);
            }
            $draw_num=$data['draw_num'];
            $user->data=serialize($data);
            if($user->save()){
                $this->ajaxOutPut(['status'=>0,'msg'=>$res,'draw_num'=>$draw_num]);
            }

        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>'error']);
    }


    //填写收货地址
    public function actionAjaxAddress()
    {
        $openid=Cms::getSession('ca_h5_lenovo_openid');//openid
        $h5_id=Cms::getSession('ca_h5_lenovo_id');

        $user=H5DataModel::find()->where(['h5_id'=>$h5_id,'openid'=>$openid])->one();
        if($user){
            $data=unserialize($user->data);
            $data['name']=Cms::getPostValue('name');
            $data['address']=Cms::getPostValue('address');
            $data['tel']=Cms::getPostValue('tel');
            $data['code']=Cms::getPostValue('code');
            $user->data=serialize($data);
            $user->save();
            $this->ajaxOutPut(['status'=>0,'msg'=>'收货地址完善成功']);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'收货地址添加失败']);
        }
    }



    //领礼包
    private static function _gift_code($openid,$gift_id,$is_del=[]){
        $gift=GiftActivityModel::findOne($gift_id);
        $prize_arr=['320'=>500000];
        //排除谢谢参与
        if(in_array('320',$is_del)){
            unset($prize_arr['320']);
        }
        $arr=[];
        if($gift){
            $gift_words=unserialize($gift->gift_awards);
            if($gift_words) {
                foreach ($gift_words as $k) {
                    if ($is_del && in_array($k['gift'], $is_del)) continue;
                    $re['odds'] = $k['odds'];
                    $re['is_entity'] = $k['is_entity'];
                    $re['num'] = $k['num'];
                    $prize_arr[$k['gift']] = $k['odds'];
                    $arr[$k['gift']] = $re;
                }
            }
        }
        $id=self::_getRand($prize_arr);
       if(isset($arr[$id]['is_entity']) && $arr[$id]['is_entity']==1){
            $res=['status'=>0,'is_shiwu'=>1,'gift_id'=>$id,'msg'=>'','num'=>$arr[$id]['num']];
        }elseif($id==320) {
            $res=['status'=>0,'is_shiwu'=>0,'gift_id'=>$id,'msg'=>'谢谢参与'];
        }else{
            $gift = GiftCode::find()->where(['status' => 0, 'gift_id' => $id])->orderBy(['id' => SORT_ASC])->one();
            if (!$gift) {
                $res['status'] = -1;
                $res['msg'] = '很遗憾，礼包码已经全部领取完！';
            } else {
                $gift->openid = $openid;
                $gift->updated_at = date('Y-m-d H:i:s');
                $gift->status = 1;
                if ($gift->save()) {
                    $res['status'] = 0;
                    $res['is_shiwu'] = 0;
                    $res['gift_id'] = $id;
                    $res['msg'] = $gift->code;
                } else {
                    $res['status'] = -1;
                    $res['msg'] = '领取失败， 请重新领取！';
                }
            }
        }
        return $res;
    }


    public function actionAjaxMyCode(){
        $data=[];
        $openid=Cms::getSession('ca_h5_lenovo_openid');//openid
        $h5_id=Cms::getSession('ca_h5_lenovo_id');
        $my_gift=H5DataModel::find()->where(['h5_id'=>$h5_id,'openid'=>$openid])->one();

        if($my_gift && $my_gift['data']){
            $gift_data=[];
            $data_=unserialize($my_gift['data']);
            $gift_ids=array_filter(explode(',',$data_['gift_ids']));
            foreach ($gift_ids as $v){
                if($v==319){
                    $gift =Gift::findOne($v);
                    $re['name'] = $gift['name'];
                    $re['code'] = '';
                    $re['is_shiwu'] = 1;
                    $gift_data[] = $re;
                }else {
                    $gift = GiftCode::find()->where(['gift_id' => $v,'openid'=>$openid])->with('gift')->asArray()->one();
                    if ($gift) {
                        $re['name'] = $gift['gift']['name'];
                        $re['code'] = $gift['code'];
                        $re['is_shiwu'] = 0;
                        $gift_data[] = $re;
                    }
                }
            }
            $this->ajaxOutPut(['status'=>0,'msg'=>$gift_data]);
        }
        $this->ajaxOutPut(['status'=>-1,'msg'=>$data]);
    }


    /**
     * 获取随机数
     * @param $proArr
     * @return int|string
     */
    private static function _getRand($proArr) {
        $result = '';
        //概率数组的总概率精度
        $proSum = array_sum($proArr);
        //概率数组循环
        foreach ($proArr as $key => $proCur) {
            $randNum = mt_rand(1, $proSum);
            if ($randNum <= $proCur) {
                $result = $key;
                break;
            } else {
                $proSum -= $proCur;
            }
        }
        unset ($proArr);
        return $result;
    }

    //导数据
    public function actionExpWorld(){
        //导出时间
        $list=[];
        $all_data=H5DataModel::find()->where(['website_id'=>35,'h5_id'=>9])->asArray()->all();
        if($all_data){
            foreach ($all_data as $value){
                $gift_name='';
                $re['username']=base64_decode($value['username']);

                $data=unserialize($value['data']);
                if($data){
                   $gift_ids=array_filter(explode(',',$data['gift_ids']));
                   if($gift_ids) {
                       //礼包
                       foreach ($gift_ids as $k=>$v){
                           if($v==320) continue;
                           $gift_name.=self::$gift_arr[$v]['name'].'/';
                       }
                   }
                    $re['is_shiwu']=$data['is_shiwu'];
                    $re['name']=$data['name'];
                    $re['address']=$data['address'];
                    $re['tel']=$data['tel'];
                    $re['code']=$data['code'];
                    $re['gift_ids']=$gift_name;
                    $re['draw_count']=$data['draw_count'];
                }
                $re['created_at']=date('Y-m-d H:i:s',$value['created_at']);
                $list[]=$re;
            }
        }
        if(!$list){
            $this->ajaxOutPut(['暂未任何用户竞猜！']);
        }
        $filename='联想合力H5'.date('Y-m-d').'用户数据';
        header("Content-type:application/vnd.ms-excel");
        header("Content-Disposition:filename=".$filename.".xls");
        header('Cache-Control: max-age=0');

        $strexport="用户名\t是否抽到实物（0否 1 是）\t收货人\t收货地址\t电话\t邮编\t中奖礼包名\t抽奖次数\t创建时间\r";
        foreach ($list as $row){
            $strexport.=$row['username']."\t";
            $strexport.=$row['is_shiwu']."\t";
            $strexport.=$row['name']."\t";
            $strexport.=$row['address']."\t";
            $strexport.=$row['tel']."\t";
            $strexport.=$row['code']."\t";
            $strexport.=$row['gift_ids']."\t";
            $strexport.=$row['draw_count']."\t";
            $strexport.=$row['created_at']."\r";
        }
        $strexport=iconv('UTF-8',"GBK//TRANSLIT",$strexport);
        exit($strexport);
    }



    public function actionTes(){
//        $_POST['info']='af5eECtzvOsYg2qLJ7HeoWm6s6EW9/79vlgfhCgx6nys9551CjcuPveI7jay7FNu_0qKPyT9/48dcqc885z9VEfgXhcmUaqYvVOpYdx3aSACeIP5rtBM25BLJ8Sk9bFy/G1DMpclGN1VQ_3DXFsU84MoVMa0UKRE990QKz4yJgr_keeeemqKHlP8Rhe/DtxwZgGokjYe/k7UEfvR7szTky5pLtVHLaECyxWYAHdXZSy4Z46op0XYrxDm_nZ8ECUMICGB1mtkR7ehO3zsUY8Bn4uxFvKU7ok9T3Bz9sC8U6lSeeqh/CLrQUtMmpV9gbckk3v1JtDJTSuqhKoEkuaVX8AUxcxOUjgf3z3lm9HQJ2XndAClfO4PxzReNA';
//        $_POST['h5_id']=9;
//        $_POST['name']='温霜';
//        $_POST['address']='45';
//        $_POST['tel']='45';
//        $_POST['code']='45';
//        $this->actionAjaxAutoData();
        $this->actionAjaxDraw();
//        $this->actionAjaxAddress();
        $this->actionAjaxMyCode();
        exit;
    }




}