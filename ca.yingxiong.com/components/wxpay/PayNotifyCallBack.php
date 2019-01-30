<?php
namespace app\components\wxpay;

use app\components\wxpay\lib\WxPayNotify;
use app\components\wxpay\lib\WxPayOrderQuery;
use app\components\wxpay\lib\WxPayApi;

class PayNotifyCallBack extends WxPayNotify
{
	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		//Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{
			return true;
		}
		return false;
	}
	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		//Log::DEBUG("call back:" . json_encode($data));
		$notfiyOutput = array();
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败";
			return false;
		}
		
		if($data['out_trade_no']){

		    /*
		    //判断订单是否存在
		    $order_info = WxpayOrderModel::model()->find("trade_no=:trade_no",array(":trade_no"=>$data['out_trade_no']));
		    
		    if ($order_info && $order_info['status'] == 0) {
		        //修改订单信息
		        $count = WxpayOrderModel::model()->updateAll(array(
		            'status'=>1,'update_time'=>date('Y-m-d H:i:s')),
		            'trade_no = :trade_no',
		            array(':trade_no' => $data['out_trade_no']));
		        
		        if($count > 0){
		            //增加抽奖次数 , 当天购买数量多少送多少,最多送5次抽奖
		            //中奖概率
		            //处理能赠送的抽奖次数
		            $openId = $order_info['openid'];
		            
		            $sql = "select count(id) as id from cms_user_prize where user_phone = '".$openId."' and date(add_time) = '".date('Y-m-d')."'";
                    $orderTotal = UserPrizeModel::model()->countBySql($sql);
                    if($orderTotal < 100){
                        
                        $num1 = 100 - $orderTotal;//当前还能增加的抽奖数量
                        $num2 = intval($order_info['amount']);//当前订单可以添加的抽奖次数
                        if($num1 > $num2){
                            $num = $num2;
                        }else{
                            $num = $num1;
                        }

                        $num = intval($num);
                        for($i=0;$i<$num;$i++){
                            $user_prize = new UserPrizeModel();
                            $user_prize->user_phone = $order_info['openid'];
                            $user_prize->add_time = date('Y-m-d H:i:s');
                            $user_prize->prize_id = $this->addUserPrize();
                            $user_prize->status = 0;
                            if($user_prize->save()>0){
                                
                            }else{
                                //@todo log
                                //print_r($user_prize->errors);
                            }
                        }
                    }
		        }else{
		            return false;
		        }
		        
		    }else{
		        //@todo 记录日志
		        return false;
		    }
		    */

		}
		
		return true;
	}
}
