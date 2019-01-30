<?php
/**
 *
 * 微信支付控制器
 *
 * @author PeterZhang
 *
 */
namespace app\controllers;
use app\components\wxpay\PayNotifyCallBack;
use Yii;
use app\components\wxpay\JsApiPay;
use app\components\wxpay\lib\WxPayResults;
use app\components\wxpay\lib\WxPayUnifiedOrder;
use app\components\wxpay\lib\WxPayApi;
use app\components\wxpay\lib\WxPayConfig;
use yii\web\Controller;

class WxpayController extends Controller{

    public $enableCsrfValidation = false;

    public $wx_uid;
    
    private $redirect_url = 'http://ca.yingxiong.com/wxpay/index.html';
    
    private $wxappid = 'wx8ab5370e12252776';
    
    private $wxappsecret = 'fd0c75ef5f2bb154b1b25d66a4d79963';
    
    public function actionIndex(){
        /*
        if(isset(Yii::$app->session['wxuid'])){
            $this->redirect(array('wxpay/pay'));
            exit;
        }else{
            echo
            //①、获取用户openid
            $tools = new JsApiPay();
            $openId = $tools->GetOpenid();
            
            Yii::$app->session['wxuid'] = $openId;
            $this->redirect(array('wxpay/pay'));
        }*/
        Yii::$app->session['wxuid'] = 'o1Q9dwdFJLwaJGpwY6IKJB8Qfkas';
        $this->redirect(array('wxpay/pay'));

    }
    
    
    /**
     * 授传 《服务号》
     */
    private function getWxUserInfo(){
        
        $code = Yii::$app->request->getParam('code','');
        if (empty($code)) {
            
            $APPID = $this->wxappid;
            $REDIRECT_URI = $this->redirect_url;
            $scope='snsapi_base';
            //$scope='snsapi_userinfo';//需要授权
            $url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$APPID.'&redirect_uri='.urlencode($REDIRECT_URI).'&response_type=code&scope='.$scope.'#wechat_redirect';
        
            header("Location:".$url);
            exit;
            
        }else{
            
            $appid = $this->wxappid;
            $secret = $this->wxappsecret;
            
            $get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL,$get_token_url);
            curl_setopt($ch, CURLOPT_HEADER,0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
            $res = curl_exec($ch);
            curl_close($ch);
            
            //解析json
            $user_obj = json_decode($res,true);
            if (isset($user_obj['errcode'])) {
                return array('wxcode'=>0,'msg'=>'授权失败,请联系客服','result'=>$user_obj);
            }
            
            return $user_obj;
        }
        
    }
    
    //微信callback
    public function actionCallback(){
         
        $code = $_GET["code"];
        if (empty($code)) {
            
        }
    }
    
    /**
     * 微信支付页面
     */
    public function actionPay(){
        
        $openId = Yii::$app->session['wxuid'];
        if(!isset($openId)){
            $this->redirect(array('wxpay/index'));
            exit;
        }

        return $this->renderPartial('pay',[]);

        /*
        //获取用户抽奖次数
        //$sql = "select count(id) as id from cms_user_prize where user_phone = '".$openId."' and status=0 and date(add_time) = '".date('Y-m-d')."'";
        $sql = "select count(id) as id from cms_user_prize where user_phone = '".$openId."' and status=0 ";
        $orderTotal = UserPrizeModel::model()->countBySql($sql);
            
        //if($orderTotal)
        //$number = 0;
        $buyInfo = WxpayOrderModel::model()->findAll('openid=:openid',array(':openid'=> $openId));
        
        //其它玩家的获奖记录
        $buyOtherInfo = UserPrizeModel::model()->findAll(array('limit'=>5, 'condition'=>'user_phone!=:openid and status=:status','params'=> array(':openid'=> $openId,'status'=>1)));
        $prize_info = CommonMethod::getPosition('prize_info');
        
        $this->renderPartial('pay',array(
            //'jsApiParameters'=>$jsApiParameters,'editAddress'=>$editAddress,
            'active_rule'=> CommonMethod::getPosition('active_rule'),
            'awards_show'=> CommonMethod::getPosition('awards_show'),
            'prize_info' => $prize_info,
            'number' => $orderTotal,
            'buyInfo' =>$buyInfo,
            'buyOtherInfo' => $buyOtherInfo
        ));
        */
    }
    
    /**
     * 
     * 异步回调验证
     * 
     */
    public function actionNotify() {
       /*
        $data = array (
  'appid' => 'wx60b5b6d86789bb67',
  'attach' => '全民枪战强化点礼包购买',
  'bank_type' => 'CFT',
  'cash_fee' => '1',
  'fee_type' => 'CNY',
  'is_subscribe' => 'Y',
  'mch_id' => '1282904101',
  'nonce_str' => '9pp037zg5e664ar91z1mhybml8mnn00q',
  'openid' => 'o1Q9dwdFJLwaJGpwY6IKJB8Qfkas',
  'out_trade_no' => '1282904101201605251626084529',
  'result_code' => 'SUCCESS',
  'return_code' => 'SUCCESS',
  'sign' => '1B83719B7D8516408F054ADAD85E5ABB',
  'time_end' => '20160525162614',
  'total_fee' => '1',
  'trade_type' => 'JSAPI',
  'transaction_id' => '4007112001201605256288534116'
);
*/
        //file_put_contents('jinbaomei',var_export($GLOBALS['HTTP_RAW_POST_DATA'],true));
        $notify = new PayNotifyCallBack();
        $notify->Handle(false);
        //$notify->NotifyProcess($data,$msg);
        
        echo $notify->GetReturn_code();
    }

    /**
     *
     * 同步回调验证
     * 
     */
    public function actionReturn($arr = array()) {
        $notify = new WxPayResults();
        if (empty($arr)) {
            $arr = $_GET;
        }
        $notify->FromArray($arr);
        if ($notify->CheckSign() == true) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    
    /**
     * 获取订单信息
     */
    public function actionSetOrder(){

        //@todo
        //$price = $num * 1 ;
        try{
            //下订单到系统
            //order_id, openid, trade_no, product_id, unit, amount, price, created_time, update_time,status
            $tools = new JsApiPay();
            $trade_no = WxPayConfig::MCHID.date("YmdHis").rand(1000,9999);

            $openId = Yii::$app->session['wxuid'];
            //o1Q9dwdFJLwaJGpwY6IKJB8Qfkas

            if(true){
                //②、统一下单
                $input = new WxPayUnifiedOrder();
                $input->SetBody("全民枪战荣誉礼包购买");
                $input->SetAttach("全民枪战荣誉礼包购买");
                $input->SetOut_trade_no($trade_no);
                $input->SetTotal_fee(100); //分
                $input->SetTime_start(date("YmdHis"));
                $input->SetTime_expire(date("YmdHis", time() + 600));
                $input->SetGoods_tag("全民枪战荣誉礼包");
                $input->SetNotify_url("http://ca.yingxiong.com/wxpay/notify.html");
                $input->SetTrade_type("JSAPI");
                $input->SetOpenid($openId);

                $order = WxPayApi::unifiedOrder($input);

                //echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
                $jsApiParameters = $tools->GetJsApiParameters($order);

                //获取共享收货地址js函数参数
                //$editAddress = $tools->GetEditAddressParameters();

                //③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
                /**
                 * 注意：
                 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
                 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
                 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
                 */

                $ret['data'] = array('jsapi' => json_decode($jsApiParameters));
                $ret['status'] = 0;

            }else{
                //下单失败
                //$ret['msg'] = $wxorder->errors;
            }
        }catch (\Exception $e){
            //$ret['msg'] = $e->errors;
        }

        echo json_encode($ret);
        exit;
    }
}
