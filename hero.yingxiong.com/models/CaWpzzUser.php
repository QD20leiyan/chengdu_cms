<?php

namespace app\models;

use Yii;


class CaWpzzUser extends \yii\db\ActiveRecord
{
    const PUBLIC_BETA_TIME    = '2018-7-5 11:00:00';//公测时间

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_ca_wpzz_user';
    }


    public static function login($phone)
    {
        $userInfo = self::find()->where(['phone'=> $phone])->one();
        if ($userInfo) {
            return $userInfo;
        }else{
            $obj = new self();
            $obj->phone = $phone;
            $obj->created_at = time();
            return $obj->save();
        }
    }

}
