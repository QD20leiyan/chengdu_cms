<?php

/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/15
 * Time: 14:54
 */
class FriendLinkWidget extends CWidget
{
    public $template;

    function init()
    {
        parent::init();
        $view = $this->template ? $this->template : 'default';
        $this->render($view, array('link' => self::_getCache()));
    }

    private function _setCache()
    {
        $sql = "select name,url,logo,description from {{friendlink}} order by displayorder asc";
        $db = Yii::app()->db;
        $command = $db->createCommand($sql);
        $content = $command->queryAll();
        $cache = CJSON::encode($content);
        Yii::app()->cache->set('friendLink', $cache);
        return $cache;
    }

    private function _getCache()
    {
        $cache = Yii::app()->cache->get('friendLink');
        if (!$cache) {
            $cache = self::_setCache();
        }
        return CJSON::decode($cache);
    }
}