<?php

/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 19:35
 */
class HandleController extends CController
{
    private $appid = 'wx8ab5370e12252776';
    private $secret = 'fd0c75ef5f2bb154b1b25d66a4d79963';
    /* private $appid='wx0c3037e0a311908e';
     private $secret='cb9577372e1f7e13d4a9c648d0c4ba7c';*/
    private $result = array('status' => 0, 'msg' => '');
    private $status = array(
        'l1' => '婊',
        'l2' => '一身膘',
        'l3' => '活儿好',
        'l4' => '蠢萌',
        'l5' => '美人计',
        'l6' => '瞎逼逼',
        'l7' => '假正经',
        'l8' => '能五杀',
        'l9' => '会喊麦',
        'l10' => '喝不吐',
        'l11' => '胸大',
        'l12' => '腿长',
        'l13' => '我有房',
        'l14' => '会P图',
        'l15' => '翘臀',
        'l16' => '装傻',
        'l17' => '嘴壮',
        'l18' => '种子多',
        'l19' => '才华',
        'l20' => '超扎心',
        'l21' => '领导力',
        'l22' => '不讲理',
        'l23' => '老司机',
        'l24' => '颜值'
    );
    public function actionIndex()
    {
        /* $openid='123123';
         $nickname='';
         $image_url='';*/
        $code = Yii::app()->request->getParam('code');
        if ($code) {
            $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $this->appid . '&secret=' . $this->secret . '&code=' . $code . '&grant_type=authorization_code';
            $result = Utils::sendHttpRequest($url);
            $result = CJSON::decode($result['content']);
            if (isset($result['access_token'])) {
                Yii::app()->session['access_token'] = $result['access_token'];
                Yii::app()->session['openid'] = $result['openid'];
            }
        }
        $access_token = Yii::app()->session['access_token'];
        $openid = Yii::app()->session['openid'];
        $this->_getInfo($access_token, $openid);
        $userInfo = Yii::app()->session['userinfo'];
        $openid = $userInfo['openid'];
        $nickname = $userInfo['nickname'];
        $image_url = $userInfo['headimgurl'];
        $notice = 'Wm3WZYTPz0wzccnW';
        $time = time();
        if (Yii::app()->request->isPostRequest) {
            $username = Yii::app()->request->getParam('username');
            $status = array_rand($this->status, 7);
            $pre = 0;
            foreach ($status as $k) {
                $level = rand(0, 5) * 20;
                if ($level > $pre) {
                    $max = $level;
                    $maxK = $k;
                }
                $result['data'][$k] = array('name' => $this->status[$k], 'value' => $level);
            }
            $result['data'][$maxK]['value'] = 200;
            $result['username'] = $username;

            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
//            $href_url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
            $uri = substr($_SERVER['REQUEST_URI'], 12);
            $href_url = "http://game.yingxiong.com/fc_wx/" . $uri;
            $signature = $this->_sign($href_url, $notice, $time);
            $model = FoolsActiveModel::model()->find('openid=:openid', array(':openid' => $openid));
            $model = $model ? $model : new FoolsActiveModel();
            $model->openid = $openid;
            $model->username = $username;
            $model->nickname = $nickname;
            $model->result = serialize($result['data']);
            $model->image_url = $image_url;
            $model->save();
            $shareUrl = $this->createAbsoluteUrl('handle/show', array('openid' => $openid));
            $shareTitle = '愚人节装逼指南：' . $result['username'] . '都靠什么骗人？';
            $shareDesc = '看看' . $result['username'] . '的骗人能力';
            $this->renderPartial('result', array('result' => $result, 'signature' => $signature, 'time' => $time, 'notice' => $notice, 'url' => $shareUrl, 'appid' => $this->appid, 'shareTitle' => $shareTitle, 'shareDesc' => $shareDesc));
            die();
        }
        //   $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $uri = substr($_SERVER['REQUEST_URI'], 12);
        $href_url = "http://game.yingxiong.com/fc_wx/" . $uri;
        $signature = $this->_sign($href_url, $notice, $time);
        $shareUrl = $this->createAbsoluteUrl('handle/show', array('openid' => $openid));
        $shareTitle = '愚人节装逼指南';
        $shareDesc = '看看你的骗人能力';
        $this->renderPartial('index', array('signature' => $signature, 'time' => $time, 'notice' => $notice, 'url' => $shareUrl, 'appid' => $this->appid, 'shareTitle' => $shareTitle, 'shareDesc' => $shareDesc));
    }

    public function actionShow()
    {
   	   $notice = 'Wm3WZYTPz0wzccnW';
        $time = time();
        $openid = Yii::app()->request->getParam('openid');
        $fool = FoolsActiveModel::model()->find('openid=:openid', array(':openid' => $openid));
        if ($fool) {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
            $href_url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
            $signature = $this->_sign($href_url, $notice, $time);
            $shareUrl = $this->createAbsoluteUrl('handle/show', array('openid' => $openid));
            $shareTitle = '愚人节装逼指南';
            $shareDesc = '看看你的骗人能力';
            $this->renderPartial('show', array('result' => $fool,'signature' => $signature, 'time' => $time, 'notice' => $notice, 'url' => $shareUrl, 'appid' => $this->appid, 'shareTitle' => $shareTitle, 'shareDesc' => $shareDesc));
        } else {
            $this->redirect('/foolsActive/handle/index');
        } 
   }

    private function _getInfo($access_token, $openid)
    {
        $url = 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN';
        $url = sprintf($url, $access_token, $openid);
        $result = Utils::sendHttpRequest($url);
        $result = CJSON::decode($result['content']);
        if (isset($result['errcode'])) {
            $REDIRECT_URI = 'http://game.yingxiong.com/fc_wx/';
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $this->appid . '&redirect_uri=' . $REDIRECT_URI . '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
            header("Location:" . $url);
        } else {
            Yii::app()->session['userinfo'] = $result;
        }
    }

    private function _sign($href_url, $notice, $time)
    {
        $signature = '';
//		echo $href_url;exit;
        $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s';
        $url = sprintf($url, $this->appid, $this->secret);
        $content = Utils::sendHttpRequest($url);
        $wx_result = CJSON::decode($content['content']);
        if (isset($wx_result['access_token'])) {
            $token = $wx_result['access_token'];
            $url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi';
            $url = sprintf($url, $token);
            $content = Utils::sendHttpRequest($url);
            $wx_result = CJSON::decode($content['content']);
            if (isset($wx_result['errcode']) && $wx_result['errcode'] == 0) {
                $ticket = $wx_result['ticket'];
                $str = "jsapi_ticket=$ticket&noncestr=$notice&timestamp=$time&url=$href_url";//echo $str;
                $signature = sha1($str);
            }
        }
        return $signature;
    }
}
