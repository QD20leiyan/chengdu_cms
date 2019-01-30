<?php
namespace app\modules\gift\controllers;

use common\Cms;
use common\components\PcController;
use common\models\VerifyCode;
use Yii;

class GameController extends PcController
{
    private $result = array('status' => 0,'msg'=>'');

    /**
     *
     * 获取礼包码
     * giftId = 5 目前老板飞车数据库中没有对应的礼包码，所以此action没有重构到YII2中
     *
     */
    public function actionCode()
    {
        $phone = Cms::getGetValue('phone');
        $code = Cms::getGetValue('code');


        $giftId = 5;
        $type = 0;
        $username = Cms::getGetValue('username', '');

        $checkCode = GiftCodeModel::model()->find('gift_id=:gift_id and type=:type and phone=:phone', array(':gift_id' => $giftId, ':type' => $type, ':phone'=>$phone));
        if(!$checkCode){
            $model = VerifyCodeModel::model()->find('phone=:phone and verify=:code', array(':phone' => $phone, ':code' => $code));
            $giftModel = GiftModel::model()->findByPk($giftId);
            if ($giftModel) {

                if ($model) {//验证码正确


                    $giftModel = GiftModel::model()->findByPk($giftId);
                    if ($giftModel) {
                        $code = GiftCodeModel::model()->find('gift_id=:gift_id and type=:type and send_at=0', array(':gift_id' => $giftId, ':type' => $type));
                        if ($code) {
                            $code->send_at = time();
                            $code->phone = $phone;
                            $code->remark = $username;
                            $code->save();

                            $this->result['status'] = 1;
                            $this->result['msg'] = $code->code;
                        } else {
                            $this->result['status'] = 7;
                            $this->result['msg'] ="礼包已领取完毕！" ;
                        }
                    }else{
                        $this->result['status'] = 9;
                        $this->result['msg'] ="请添加礼包类型！" ;
                    }

                } else {
                    //验证码有误
                    $this->result['status'] = 5;
                }
            }

        }else{
            $this->result['status'] = 1;
            $this->result['msg'] = $checkCode->code;
        }

        $json = json_encode($this->result);

        # JSON if no callback
        if( ! isset($_GET['callback']))
            exit($json);

            # JSONP if valid callback
            if($this->is_valid_callback($_GET['callback']))
                exit("{$_GET['callback']}($json)");

    }

    /**
     *
     * 发送短信
     *
     */
    public function actionSms()
    {
        $phone = Cms::getGetValue('phone');
        //随机生成验证码
        $verify = rand(1000, 9999);
        //查看是否已经发送过,无论是否成功注册
        $model = VerifyCode::find()->where('phone=:phone', array(':phone' => $phone))->one();
        if ($model) {
            if ($model->count >= 3)
                $this->result['status'] = 3;
            elseif ($model->created_at > time() - 30)//30秒内只能提交一次
            $this->result['status'] = 2;
            else {
                //重新发送验证码
                $model->verify = $verify;
                $model->created_at = time();
                $model->count += 1;
                $model->save();
                //发送短信
                $content = '验证码为:' . $verify . ',感谢参与《夏目的美丽日记》微信预约活动!';
                $smsResult = SmsUtils::sendSms($phone, $content);
                $this->result['status'] = 1;
                Cms::setSession('gift_verify_count', 0);
            }
        } else {
            $model = new VerifyCode();
            if ($model) {
                $model->verify = $verify;
                $model->phone = $phone;
                $model->created_at = time();
                $model->count = 1;
                $model->save();
                //发送短信
                $content = '验证码为:' . $verify . ',感谢参与《夏目的美丽日记》微信预约活动!';
                $smsResult = SmsUtils::sendSms($phone, $content);
                $this->result['status'] = 1;
                Cms::setSession('gift_verify_count', 0);
            }
        }

        $json = json_encode($this->result);

        # JSON if no callback
        if( ! isset($_GET['callback']))
            exit($json);

            # JSONP if valid callback
            if($this->is_valid_callback($_GET['callback']))
            exit("{$_GET['callback']}($json)");

    }

    private function is_valid_callback($subject)
        {
            $identifier_syntax
            = '/^[$_\p{L}][$_\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\x{200C}\x{200D}]*+$/u';

            $reserved_words = array('break', 'do', 'instanceof', 'typeof', 'case',
            'else', 'new', 'var', 'catch', 'finally', 'return', 'void', 'continue',
            'for', 'switch', 'while', 'debugger', 'function', 'this', 'with',
                'default', 'if', 'throw', 'delete', 'in', 'try', 'class', 'enum',
                    'extends', 'super', 'const', 'export', 'import', 'implements', 'let',
                    'private', 'public', 'yield', 'interface', 'package', 'protected',
                    'static', 'null', 'true', 'false');

        return preg_match($identifier_syntax, $subject)
        && ! in_array(mb_strtolower($subject, 'UTF-8'), $reserved_words);
    }

}