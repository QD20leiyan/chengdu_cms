<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/19/019
 * Time: 16:48
 */
namespace app\controllers\ddd;

use app\models\H5DataModel;
use common\Cms;
use common\components\H5BaseController;
use common\components\HomeController;
use common\helpers\Utils;
use common\models\h5\H5;

class DiscussController extends H5BaseController
{

    //首页默认加载的数据（判断是否为分享数据）
    public function actionAjaxAutoData(){
        $from_info=Cms::getPostValue('invite_code');//分享用户的id

        $info=Cms::getPostValue('info');
        $info=Utils::authcode($info,'DECODE');
        $me_info=json_decode($info,true);//自己的用户id

        $h5_id=Cms::getPostValue('h5_id');//h5的id
        Cms::setSession('ddd_h5_discuss_id',$h5_id);
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


        if($from_info && $me_info['openid']!=$from_info){//非自己分享的
           $user_data_=H5DataModel::find()->where(['openid'=>$from_info, 'h5_id' => $h5_id])->one();
           if(!$user_data_)
           {
               $this->ajaxOutPut(['status' => 1, 'msg' => '该邀请码无效']);
           }

           $from_user_name=base64_decode($user_data_->username);
           $data=self::_data($user_data_->data);
           $this->ajaxOutPut(['status'=>0,'msg'=>$data,'is_me'=>0,'username'=>$from_user_name]);
        }
        if($info){
           $data=self::_data($user_data->data);
           $this->ajaxOutPut(['status'=>0,'msg'=>$data,'is_me'=>1,'username'=>$me_info['nickname']]);
        }

    }

    //评论
    public function actionAjaxDiscuss(){
        $from_info=Cms::getPostValue('invite_code');//分享用户的id

        $is_anory=Cms::getPostValue('is_anory',0);//默认不匿名
        $h5_id=Cms::getSession('ddd_h5_discuss_id');

        $content=Cms::getPostValue('content');
        //内容铭感词过滤
//        if(YII_DEMO==false && YII_DEV==false){
//             $file = trie_filter_load('words.dic');
//             $content = trie_filter_search_all($file,$content);
//             if (!empty($content)) {
//                 $this->ajaxOutPut(['status' => -1, 'msg' => '输入的内容含有敏感词，请重新编辑！']);
//             }
//         }

        $info=Cms::getPostValue('info');
        $info=Utils::authcode($info,'DECODE');
        $me_info=json_decode($info,true);//自己的用户id

        if($me_info['openid']==$from_info){
            $this->ajaxOutPut(['status'=>-1,'msg'=>'自己不能评论自己']);
        }
        $user_data=H5DataModel::find()->where(['openid'=>$from_info,'h5_id'=>$h5_id])->one();
        if($user_data){
           $message=$user_data->data?unserialize($user_data->data):[];
           $re=[
               'nickname'=> base64_encode($me_info['nickname']),
               'headimgurl'=>$me_info['headimgurl'],
               'content'=>$content,
               'is_anory'=>$is_anory,
               'time'=>time(),
           ];
           $data=array_merge($message,[$re]);
           $user_data->data=serialize($data);
           $user_data->save();
           $this->ajaxOutPut(['status'=>0,'msg'=>'success']);
        }else{
            $this->ajaxOutPut(['status'=>-1,'msg'=>'参数丢失！']);
        }

    }

    // 处理评论数据
    private static function _data($data_){
        $data=[];
        $message=unserialize($data_);
        if($message){
            foreach ($message as $k=>$v){
                if($v['is_anory']){//匿名发言
                    $re['nickname']='匿名';
                    $re['headimgurl']='http://cdnimg01.yingxiong.com/M00/0B/60/ChpCl1sOin6EW05PAAAAAC9NnjU898.ico';
                    $re['content']=$v['content'];
                    $re['time']=$v['time'];
                }else{
                    $re['nickname']=base64_decode($v['nickname']);
                    $re['headimgurl']=$v['headimgurl'];
                    $re['content']=$v['content'];
                    $re['time']=$v['time'];
                }
                $data[]=$re;
            }
        }
        return $data;

    }

    public function actionTes()
    {
        $_POST['info']='6529DF8vs941IUrfPR0R4BnAyeg3LrGM6iAQ9wkY08U9GJzvNK26BwdIUbLNOCbFsSSUdRYQckZYyWm4D0HCPOJ5uhMYyox4Snw2emaicTjOJdXbN_RufQjr6P6in9rwQWRUkC0RFSVMitJON7__MjcpakY50qC1LflYJp5JQTvVLyNZFZZBb40EmnyIyX4Zl2PqReCnHP68f_aHOucGA2Zlp1clkx_pSAqMfEhaarqRgHT8UJ3N706DQf4cCktSr9Xq_/dszK936eyapB130e4mdjZEQ548PU3f8RVHGilINGFdn0oxqTnq45EYdrZiRdDjl6wfhhafXSvvWAOqEt_PK2s_z0XUNIqE8wS916_59hLF9sZi4u1QmOG8VIZfjf427tn6TRIXGdX1CI8nu4Kfjsyx6CM8TQ3JBnRvyL2yhYazlsVXxJRvB_yjNAFlj8lxFMi7';
        $_POST['invite_code']='57u05ZC+5bCU';
        $_POST['h5_id']=7;
        $_POST['content']='这是一条测试的内容';
        $_POST['is_aonry']=1;
        $this->actionAjaxAutoData();
//        $this->actionAjaxDiscuss();
        exit;


//        $info='c09aIUkdzmj5TvGNF8DNnQmseo3jKSPIzmxWNU5_bL5eKffnV7puT0Z7cvIpCdTj3ZS_XCAuSy_LznOdEE6MQSkTFcFcqMEpzWpWME_MXsLwxlb0Mex2EkR1uUcP1egoYMYebmCwDA93loyOsV8RC2GHSR8kE/Zibh_H7j6yGFUt/EKU/H2QJAnpN7/ERe5_aeRDsdiG67IG9HFA/I3hDiW0AUjDRIVLkjre1o5nw9thvk_FjQAG_90G7aokvtzqt4hwk9qcB6PDyPsORm4z87XvWdAnZFWK6hTJbhP_NRP1NBwkUH_MZiDJq3tji5Jm7treEPtatsFJNnM92TrNJIal33NKBOI6oXzHscShkaYmMe2_4cFLFnqnEwYjjhbcGRpiTabBfqPOL2X7OdfhUDOHuRgEmX9FM1hum9RSEJgdEJ4cNse44NnU_E1VqLAIkh57BUoP';
//        $info=Utils::authcode($info,'DECODE');
//        $wx_info=json_decode($info,true);
    }
}