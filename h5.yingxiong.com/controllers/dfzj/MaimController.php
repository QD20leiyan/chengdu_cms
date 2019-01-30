<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/21/021
 * Time: 15:33
 */
namespace app\controllers\dfzj;

use app\models\H5DataModel;
use common\Cms;
use common\components\H5BaseController;
use common\helpers\Utils;
use common\models\GiftCode;
use common\models\h5\H5;

class MaimController extends H5BaseController
{
    //首页默认加载的数据（判断是否为分享数据）
    public function actionAjaxAutoData(){
        $from_info=Cms::getPostValue('invite_code');//分享用户的id

        $info=Cms::getPostValue('info');
        $info=Utils::authcode($info,'DECODE');
        $me_info=json_decode($info,true);//自己的用户id

        $h5_id=Cms::getPostValue('h5_id');//h5的id
        Cms::setSession('dfzj_h5_discuss_id',$h5_id);

        $h5=H5::findOne($h5_id);

        $user_data = H5DataModel::find()->where(['openid' => $me_info['openid'], 'h5_id' => $h5_id])->one();
        if (!$user_data) {
            $user_data = new H5DataModel();
            $user_data->website_id = $h5->website_id;
            $user_data->h5_id = $h5->id;
            $user_data->openid = $me_info['openid'];
            $user_data->username = base64_encode($me_info['nickname']);
            $user_data->created_at = time();
            $user_data->save();
        }


        if($info) {
            if ($from_info && $me_info['openid'] != $from_info) {//非自己分享的
                $user_data_ = H5DataModel::find()->where(['openid' => $from_info, 'h5_id' => $h5_id])->one();
                $from_user_name = base64_decode($user_data_->username);
                //通过openid查找用户姓名
                $data = array_filter(explode(',', $user_data_->data));
                $this->ajaxOutPut(['status' => 0, 'msg' => self::_nickname($data, $h5_id), 'is_me' => 0, 'username' => $from_user_name, 'help_num' => count($data), 'wxInfo' => $this->wxInfo]);
            } else {
                $data = array_filter(explode(',', $user_data->data));
                //助力好友人数等于10人这自动领礼包
                $help_num = count($data);
                $code = '';
                if ($help_num >= 10) {
                    $res = self::_gift_code($me_info['openid'], 312);
                    if ($res['status'] == 0) {
                        $code = $res['msg'];
                    }
                }
                $this->ajaxOutPut(['status' => 0, 'msg' => self::_nickname($data, $h5_id), 'is_me' => 1, 'code' => $code, 'username' => $me_info['nickname'], 'help_num' => count($data), 'wxInfo' => $this->wxInfo]);
            }
        }
    }

    //还有助力
    public  function actionAjaxFriendHelp(){

        //分享的用户id
        $invite_code=Cms::getPostValue('invite_code');
        //用户自己授权的信息
        $info=Cms::getPostValue('info');
        $info=Utils::authcode($info,'DECODE');
        $me_info=json_decode($info,true);//自己的用户id

        $h5_id=Cms::getSession('dfzj_h5_discuss_id');

        $from_user=H5DataModel::find()->where(['h5_id'=>$h5_id,'openid'=>$invite_code])->one();

        $data=$from_user->data?array_filter(explode(',',$from_user->data)):[];

        if($me_info['openid']==$invite_code){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'自己不能为自己助力哦！']);
        }
        //判断用户是否助力过
        if(in_array($me_info['openid'],$data)){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'您已经为好友助力了！']);
        }
       $from_user->data=$from_user->data.','.$me_info['openid'];
       $from_user->save();
       $this->ajaxOutPut(['status'=>0,'msg'=>'success','help_num'=>count(array_filter(explode(',',$from_user->data)))]);
    }

    //领礼包
    private static function _gift_code($openid,$gift_id){
        $exist_phone = GiftCode::find()->where(['openid'=>$openid,'gift_id'=>$gift_id])->one();
        if ($exist_phone) {
            $res['status'] = 0;
            $res['msg'] = $exist_phone->code;
        } else {
            $gift = GiftCode::find()->where(['status' => 0, 'gift_id' => $gift_id])->orderBy(['id' => SORT_ASC])->one();
            if (!$gift) {
                $res['status'] = -1;
                $res['msg'] = '很遗憾，礼包码已经全部领取完！';
            } else {
                $gift->openid = $openid;
                $gift->updated_at = date('Y-m-d H:i:s');
                $gift->status = 1;
                if ($gift->save()) {
                    $res['status'] = 0;
                    $res['msg'] = $gift->code;
                } else {
                    $res['status'] = -1;
                    $res['msg'] = '领取失败， 请重新领取！';
                }
            }
        }
        return $res;
    }

    //我的礼包
    public function actionAjaxMyCode(){

        $info=Cms::getPostValue('info');
        $info=Utils::authcode($info,'DECODE');
        $me_info=json_decode($info,true);//自己的用户id

        $my_code=GiftCode::find()->where(['gift_id'=>312,'openid'=>$me_info['openid']])->asArray()->one();
        if($my_code){
            $this->ajaxOutPut(['status'=>0,'msg'=>$my_code['code']]);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'您还未领取礼包！']);
        }
    }
    private static function _nickname($data,$h5_id){
        $name=[];
        if($data){
            foreach ($data as $k){
                $user_name=H5DataModel::find()->where(['h5_id'=>$h5_id,'openid'=>$k])->asArray()->one();
                $name[]=base64_decode($user_name['username']);
            }
        }
        return $name;
    }


    public function actionTes()
    {
        $this->actionAjaxMyCode();
        $this->actionAjaxAutoData();
        $this->actionAjaxFriendHelp();
        exit;
    }

}