<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\Cms;
use common\components\WapController;

class SiteController extends WapController
{
    public $sessionLoginName;
    public $channelNum;

    public function beforeAction($action, $isNoLayout = 0)
    {
        $path = \Yii::$app->request->getPathInfo();
        if ($path) {
            $arr = explode('.', $path);
            if (count($arr) > 0) {
                if (preg_match('/cover(\d+)/', $arr['0'], $match)) {
                    Cms::setSession('channel_num', $match[1]);
                    if ($match[1] < 2 || $match[1] > 50) {
                        throw  new Exception('该页面不存在');
                    }
                }
            }
        }
        $channelName = Cms::getChannelName();
        $channelName = $channelName ? $channelName : Cms::getSession('channel_name');

        $this->channelNum = Cms::getSession('channel_num');
        $this->channelNum = $this->channelNum ? $this->channelNum : 1;
        if (!in_array($channelName, ['wapgw', 'pcgw'])) {
            $this->sessionLoginName = 'login_phone'.$channelName;
        } else {
            $this->sessionLoginName = $this->channelNum ?  'login_phone'.$this->channelNum : 'login_phone';
        }
        return parent::beforeAction($action, $isNoLayout);
    }

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        return $this->renderPartial('index.html');
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
