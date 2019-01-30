<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
	<title>测试</title>
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>3.0/common/css/common.css?<?= VERSION?>">
	<link rel="stylesheet" href="<?php echo STATIC_DOMAIN?>3.0/m/css/pay.css?<?= VERSION?>">
</head>
<body>
	<div class="wrap wx_bg">
		<section class="main1 wx">
			<div class="banner"></div>
		</section>
		<section class="main2">
			<div class="nav">
				<span class="nav_active"></span>
				<span class="nav_prize"></span>
				<span class="nav_record"></span>
				<span class="nav_buy"></span>
			</div>
			<div class="kong"></div>
		</section>
		<section class="main3">

		</section>
		<section class="main4 wx_m4">
			<div class="gift">
				<div class="gift_inf">
					<img src="<?php echo STATIC_DOMAIN?>3.0/m/images/pay_wx_m4_qiang.png?<?= VERSION?>" alt="">
					<p>荣誉*100礼包</p>
				</div>
				<div class="gift_text">
					<p>每购买1个荣誉礼包礼包赠送1次抽奖机会,每天可获得5次抽奖机会</p>
					<h3>售价：2元</h3>
				</div>
				<a href="javascript:" class="gift_buy"></a>
			</div>
		</section>
		<section class="main5">
			<div class="record">

			</div>
		</section>
	</div>
	<!-- 活动规则 -->
	<div class="tack_active tack" style="display: none;">
		<div class="tack_activebg tack_bg">
			<i class="tack_close"></i>
			<div class="tack_activecon">

            </div>
		</div>
	</div>
	<!-- 奖励展示 -->
	<div class="tack_prize tack" style="display: none;">
		<div class="tack_prizebg tack_bg">
			<i class="tack_close"></i>
			<ul>

			</ul>
		</div>
	</div>
	<!-- 获奖记录 -->
	<div class="tack_record tack" style="display: none;">
		<div class="tack_recordbg tack_bg">
			<i class="tack_close"></i>
			<ul></ul>
		</div>
	</div>
	<!-- 购买 -->
	<div class="tack_pay tack" style="display: none;">
		<div class="tack_paybg tack_bg">
			<i class="tack_close"></i>
			<div class="tack_paycon">
				<div class="tack_pay_inf">
					<img src="<?php echo STATIC_DOMAIN?>3.0/m/images/pay_wx_m4_qiang.png?<?= VERSION?>" alt="">
					<p>荣誉*100礼包</p>
				</div>
				<div class="tack_pay_text">
					<p>
						<span>商品数量：</span>
						<span class="tack_pay_cou"></span>
						<input type="number" class="tack_pay_num" value="1">
						<span class="tack_pay_add"></span>
					</p>
					<p>支付：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="tack_pay_money">2</span>元</p>
					<div class="tack_pay_plat">
						<span class="tack_pay_weixin"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 抽中结果 -->
	<div class="tack_result tack" style="display: none;">
		<div class="tack_resultbg tack_bg">
			<i class="tack_close"></i>
			<div class="tack_resultcon">
				<p>抽中【<span class="where_gift"></span>】</p>
				<span class="tack_re_scan">查看奖励</span>
				<span class="tack_re_return">继续抽奖</span>
			</div>
		</div>
	</div>

	<!-- 购买记录 -->
	<div class="tack_bc tack" style="display: none;">
		<div class="tack_bcbg tack_bg">
			<i class="tack_close"></i>
			<div class="tack_bccon">
				<ul>
				   
				</ul>
			</div>
		</div>
	</div>
	
<script>
var curTime = '<?php echo date('Y-m-d H:i:s')?>';
</script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>3.0/common/js/jquery-1.11.2.min.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>3.0/m/js/jquery.fittext.js?<?= VERSION?>"></script>
<script type="text/javascript" src="<?php echo STATIC_DOMAIN?>3.0/m/js/pay_wx.js?<?= VERSION?>"></script>
<script type="text/javascript">
    var clickFlag = true;
	//调用微信JS api 支付
	function jsApiCall()
	{
		clickFlag = false
		
	    //获取订单信息
	    $.ajax({
	        url: '<?php echo Yii::$app->urlManager->createUrl('wxpay/set-order');?>',
	        data: {num:$('.tack_pay_num').val()},
	        method: 'POST',
	        success:function(data){
	        	//参数
	        	var data = eval('('+data+')');
	        	if(data.status == 0){
		        	var numTmp = data.data.num;
    	        	WeixinJSBridge.invoke(
            			'getBrandWCPayRequest',
            			data.data.jsapi,
            			function(res){

            				clickFlag = true;
            			    //回调JS
            				//alert(res.err_code)
            				//alert(res.err_desc)
            				//alert(res.err_msg)
            			    if(res.err_code){
                			    alert(res.err_desc)
            			        //err_desc err_msg
                			}else{
                			    //订单取消支付
                				if(res.err_msg == "get_brand_wcpay_request:ok") {

                					$('.tack_pay').hide();
                					var num = parseInt($('.prize_time').html());
                					$('.prize_time').html(num+parseInt(numTmp));

                					//及时发送奖品
                					$.ajax({
                				        url: '<?php echo Yii::$app->urlManager->createUrl('wxpay/send-code');?>',
                				        data: {num:$('.tack_pay_num').val()},
                				        method: 'POST',
                				        success:function(data){
                    				        
                				        }
                					})
                    			}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                    				$('.tack_pay').hide();
                        		}
                    		}
            				//WeixinJSBridge.log(res.err_msg);
            			}
            		);
	        	}else{
	        	    alert(data.msg);
		        }
		    }
		})
	}

	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	</script>
	
	<script>
	$(function(){
		
		$('html').fitText(2);

		//点击购买
        $(".gift_buy").click(function(){
            //if(checkTime()){
            //    alert('【活动已结束】');
            //    return false;
            //}
        	$('.tack_pay').show();
        })
        //开始购买
		$('.tack_pay_weixin').click(function(){
			if(clickFlag == true){
			    callpay();
			}
		})
	})
    </script>
</body>
</html>
