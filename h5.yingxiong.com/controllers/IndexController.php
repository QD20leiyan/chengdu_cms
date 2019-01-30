<?php
/**
 * h5 入口
 * User: lin.zhou
 * Date: 2018/3/14
 * Time: 15:01
 */

namespace app\controllers;


use common\models\h5\H5Data;
use common\Cms;
use common\components\HomeController;
use common\helpers\Utils;
use common\models\h5\H5;
use common\models\h5\H5UserCenter;
use common\models\h5\H5UserCenterData;
use common\models\Website;
use yii\web\BadRequestHttpException;

class IndexController extends HomeController
{
    public function actionIndex()
    {
        $error = 0;
        if (!Cms::getGetValue('alias') || !Cms::getGetValue('file')){
            $error = 1;
        } else {
            $h5 = H5::find()->where('name = :name AND alias = :alias', [':name' => $_GET['file'], ':alias' => $_GET['alias']])->asArray()->one();
            if (!$h5) {
                $error = 1;
            }
            Cms::setSession('h5_id', $h5['id']);
            Cms::setSession('h5_website_id', $h5['website_id']);
            if($h5['is_warrant']==1){
                $url = $this->_wxUrl();
                if(isset($_GET['invite_code'])){//针对分享码的操作
                    $callback_url = $url.'/index/'.$_GET['alias'].'/'.$_GET['file'].'.html?invite_code='.$_GET['invite_code'];
                }else{
                    $callback_url = $url.'/index/'.$_GET['alias'].'/'.$_GET['file'].'.html?';
                }
                $url='http://game.yingxiong.com/wechat/index.html?callback_url='.urlencode($callback_url);
                if(!Cms::getGetValue('info')) {
                    header("location:".$url);exit;
                }else{
                    $info=Cms::getGetValue('info');
                    $h5['info']=$info;
                    $info=Utils::authcode($info,'DECODE');
                    $h5['wx_info']=json_decode($info,true);

                    Cms::setSession('h5_wx_openid_'.$h5['id'], $h5['wx_info']['openid']);
                    Cms::setSession('h5_wx_info', $h5['wx_info']);

                    if ($h5['id'] >=  13) {
                        if ($h5['id'] < 15) {
                            $user = H5Data::updateUser($h5['website_id'], $h5['id'], $h5['wx_info']['openid'], $h5['wx_info']);
                        } else {    //新版
                            $user = H5UserCenter::getUserInfo($h5['id'], '', $h5['wx_info']['openid']);
                            if (!$user || empty($user)) {
                                $user = H5UserCenter::addUser($h5['id'], '', $h5['wx_info']['openid']);
                                H5UserCenterData::addData($h5['id'], $user['id'], $h5['wx_info']);
                            }
                        }
                        Cms::setSession('h5_user_id', $user['id']);
                    }
                }
            }
        }
        if ($error == 1) {
            throw new BadRequestHttpException();
        }
//        $h5_=[
//            'info' => 'ec40Zb4i4vocXgXYmHA3YIOuTOvDduJh_jq0/HCKVVC96YI55P9_tREkLzO37VpLXSIOXoa9HsWT_FtO3cj7P_ZGwe6OPeZli1wfGSrjg8uo56pxQWtk3ochgitQsFFVq_MFJ3gZyAIinw69TZTs1NxRLLPDGfPHtR5drw5WZBftXesGUZRMegHCX8p5thbWmSTlHD/tmkwkh5gKP_BHF8HR_Qz8D_XSTpnCCtMf6VcNLe88DCGrGgJxU9tX6SIC4z1WY/W3d1pTGKYGkmhdOTooxwz_HE/Ic251/LZ14sNEgmNGbpZ/MRzaaZh21SrdDqKhyR2D1_eGZcO_7pjyjxlyrCoLUdlDKBzsn58D3FanwcJg/d81fWGHXH6gfgs3YlokDCWsE570HPZTzF0GjP7DH1Y2PlxLYfTr/Qp4QmUigL3SK_zYUesF5NO49CjMW8gfPPRW',
//            'wx_info' => [
//                'openid' => 'oa0IfwUlnhj_nef5tVYuIi054vGE',
//                'nickname' => 'RealMadrid',
//                'sex' => 1,
//                'language' => 'zh_CN',
//                'city' => '达州',
//                'province' => '四川',
//                'country' => '中国',
//                'headimgurl' =>'http://thirdwx.qlogo.cn/mmopen/vi_32/Cp2W9EYay96fF7NLRrtgv17Ro3nOBbZY6CdsiaZwUiavuVAK2OpjF8IF8WdTXfsf87Ulj1lUrMUXMOLuBomyXL7g/132',
//                 'privilege' =>[]
//            ]
//        ];
//        $h5=array_merge($h5,$h5_);
//        var_dump($h5);exit;
        $view = '@app/views/'.$_GET['alias'].'/'.$_GET['file'].'.html';

        if (!file_exists(Cms::getAlias($view))) {
            echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        }

        Cms::setSession('sms_h5_website_id', $h5['website_id']);    //短信配置

        $params = [
            'websiteId' => $h5['website_id'],
            'h5Id' => $h5['id'],
        ];
        $paramsString = http_build_query($params);
        $h5['h5data'] = Cms::authcode($paramsString, 'ENCODE', 'Z80GIVj9JLorsC58');

        $website = Website::getWebsite($this->website_id);
        $h5['pvuvStat'] = $website['web_count'];
        return $this->renderPartial($view, $h5);
    }

    private function _wxUrl()
    {
        if (YII_DEV) {
            $url = 'http://h5.dev.yingxiong.com';
        } elseif (YII_DEMO) {
            $url = 'http://h5.demo.yingxiong.com';
        } else {
            $url = 'http://h5.yingxiong.com';
        }
        return $url;
    }

}