<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_h5_data".
 *
 * @property integer $id
 * @property integer $website_id
 * @property string $openid
 * @property string $username
 * @property string $phone
 * @property string $data
 * @property integer $h5_id
 * @property integer $created_at
 */
class H5DataModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_h5_data';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['website_id', 'h5_id', 'created_at'], 'integer'],
            [['data'], 'string'],
            [['openid'], 'string', 'max' => 150],
            [['username'], 'string', 'max' => 100],
            [['phone'], 'string', 'max' => 13],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'website_id' => 'Website ID',
            'openid' => 'Openid',
            'username' => 'username',
            'phone' => 'Phone',
            'data' => 'Data',
            'h5_id' => 'H5 ID',
            'created_at' => 'Created At',
        ];
    }
}
