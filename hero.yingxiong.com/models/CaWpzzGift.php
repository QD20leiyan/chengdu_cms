<?php

namespace app\models;

use Yii;


class CaWpzzGift extends \yii\db\ActiveRecord
{

	const TYPE_GOLD = 0;//金币
	const TYPE_DIAMOND = 1;//钻石

	const STATUS_UNUSED 	= 0;//未使用
	const STATUS_USED 		= 1;//已使用
	
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_ca_wpzz_gift';
    }

}
