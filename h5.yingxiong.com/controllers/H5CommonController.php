<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/8/008
 * Time: 17:09
 */

namespace app\controllers;


use common\components\H5BaseController;
use common\models\h5\H5Data;
use common\models\h5\H5DatiLog;
use common\models\h5\H5Dati;
use common\Cms;
use common\models\h5\H5;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;

class H5CommonController extends H5BaseController
{
    //保存数据（需要将H5活动的ID传来）
    public function actionAjaxSaveData()
    {
        //铭感词过滤
//        if (YII_DEV == false && YII_DEMO == false) {
//            $file = trie_filter_load('words.dic');
//            $name = trie_filter_search_all($file,Cms::getPostValue('user_name'));  // 签名
//            if (!empty($name)) {
//                $this->ajaxOutPut(['status' => -1, 'msg' => '输入的内容含有敏感词，请重新编辑！']);
//            }
//            if (!isset($_POST['h5_id']) || $_POST['h5_id'] == null) {
//                $this->ajaxOutPut(['status' => -1, 'msg' => '缺少参数']);
//            }
//        }
        $h5_id = Cms::getPostValue('h5_id');//活动ID
        $username = base64_encode(Cms::getPostValue('user_name'));//用户名
        $h5 = H5::findOne($h5_id);

        $is_repeat = Cms::getPostValue('is_repeat');//是否重复
        if ($is_repeat) {
            $h5_data = H5Data::find()->where(['website_id' => $h5->website_id, 'h5_id' => $h5->id])->andWhere(['username' => $username])->one();
            if(!$h5_data){
                $h5_data = new H5Data();
            }
        } else {
            $h5_data = new H5Data();
        }
        $h5_data->username=$username;
        $h5_data->website_id=$h5->website_id;
        $h5_data->h5_id=$h5->id;
//        $data=self::array_remove(Cms::getPostValue(),['user_name','h5_id','csrf_','is_repeat']);//去掉非数据的值
        $data=Cms::getPostValue('data');
        if($data && !is_array($data)){
            $data=explode(',',$data);
        }
        $h5_data->data=serialize($data);
        $h5_data->created_at=time();
        $h5_data->save();
        $this->ajaxOutPut(['status' => 0, 'msg' => 'success']);
    }

    public function array_remove($data,$delArr) {
        if(is_array($data)) {
            foreach($data as $key => $value) {
                if(in_array($key,$delArr)){
                    unset($data[$key]);
                }
            }
        }
        return $data;
    }

    /**
     * h5 公共答题
     * 获取题目
     */
    public function actionGetTi()
    {
        $this->_checkLogin();

        Cms::setSession('h5_dati_time', time());
        $h5Id = Cms::getSession('h5_id');
        $data = H5Dati::getTimu($h5Id, 12);

        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }

    /**
     * 检查题目是否正确
     */
    public function actionCheckTiAnswer()
    {
        $this->_checkLogin();

        $websiteId = Cms::getSession('h5_website_id');
        $h5Id = Cms::getSession('h5_id');

        $id = Cms::getPostValue('id');
        $option = Cms::getPostValue('option');

        $res = H5Dati::checkAnswer($h5Id, $id, $option);

        $statusLog = $res ? H5DatiLog::STATUS_RIGHT : H5DatiLog::STATUS_ERROR;
        $datiTime = Cms::getSession('h5_dati_time') ? Cms::getSession('h5_dati_time') : time();
        H5DatiLog::addLog(Cms::getSession('h5_user_id'), $h5Id, $id, $datiTime, $option, $statusLog);
        $status = $res ? 0 : -1;
        $this->ajaxOutPut(['status' => $status]);
    }

    /**
     * 检查登录
     */
    private function _checkLogin()
    {
        $h5Id = Cms::getSession('h5_id');
        $openId = Cms::getSession('h5_wx_openid_'.$h5Id);
        if (!$openId) {
            $this->ajaxOutPut(['status' => 1, 'msg' => '请重新登录']);
        }
    }

    /**
     * 获取h5 data
     * @return string
     */
    public function actionH5data()
    {
        return $this->renderPartial('h5data.html');
    }

    /**
     * h5 data 加密
     */
    public function actionSecret()
    {
        $secretKey = Cms::getGetValue('secretKey');
        $websiteId = Cms::getGetValue('websiteId');
        $h5Id = Cms::getGetValue('h5Id');
        $params = [
            'websiteId' => $websiteId,
            'h5Id' => $h5Id,
        ];
        $paramsString = http_build_query($params);
        $string = Cms::authcode($paramsString, 'ENCODE', $secretKey);
        $this->ajaxOutPut(['status' => 0, 'msg' => $string]);
    }

    /**
     * 针对页面加载的时候就需要获取微信信息
     */
    public function actionGetWxInfo()
    {
        $this->ajaxOutPut(['status' => 0, 'msg' => $this->wxInfo]);
    }

    /**
     * 检查敏感词
     */
    public function actionCheckFilter()
    {
        $words = Cms::getPostValue('words');
        if (!$words) {
            $this->echoJson(2);
        }
        $res = Cms::checkFilterWords($words);
        if ($res['status'] != 0) {
            $this->echoJson(1, $res['msg'].'敏感词为：'.implode('，', $res['data']));
        }
        $this->echoJson(0);
    }

    /**
     * 预约-不需要手机验证码
     */
    public function actionYuyueNoYzm()
    {
        $type = Cms::getPostValue('type');
        $phone = Cms::getPostValue('phone');
        if (!$type || !in_array($type, ['ios', 'android'])) {
            $this->echoJson(5);
        }
        if (!$phone || !Cms::checkPhone($phone)) {
            $this->echoJson(3);
        }
        $user = H5UserCenter::getUserInfo($this->h5Id, $phone);
        if ($user) {
            $this->echoJson(4);
        }
        $user = H5UserCenter::addUser($this->h5Id, $phone);
        H5UserCenterData::setUserInfo($this->h5Id, $user['id'], ['yuyueType' => $type]);
        $this->echoJson(0);
    }
}