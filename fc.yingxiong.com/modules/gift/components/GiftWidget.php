<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:07
 */

class GiftWidget extends CWidget{

    public $giftId;
    public $template;

    function init(){
        Yii::import('frontend.modules.gift.models.GiftCodeModel');
        parent::init();
        $csrf = md5(Yii::app()->session->sessionID.$this->giftId);
        Yii::app()->session['csrf'] = $csrf;
        $view = $this->template?$this->template:'default';
        $this->render($view, array('csrf' => $csrf, 'giftId' => $this->giftId));
    }

}