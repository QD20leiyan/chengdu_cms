<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_ddd3_user".
 *
 * @property integer $id
 * @property string $phone
 * @property integer $invite_num
 * @property integer $invite_count
 * @property string $invite_img
 * @property integer $today_invite_count
 * @property string $me_invite_code
 * @property string $other_invite_code
 * @property string $name
 * @property string $address
 * @property string $tel
 * @property string $code
 * @property integer $invite_at
 * @property integer $login_at
 * @property integer $created_at
 */
class Ddd3UserModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_ddd3_user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['phone'], 'required'],
            [['invite_num', 'invite_count', 'today_invite_count', 'invite_at', 'login_at', 'created_at'], 'integer'],
            [['phone', 'tel', 'code'], 'string', 'max' => 11],
            [['invite_img'], 'string', 'max' => 150],
            [['me_invite_code', 'other_invite_code'], 'string', 'max' => 10],
            [['name'], 'string', 'max' => 50],
            [['address'], 'string', 'max' => 255],
            [['phone'], 'unique'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'phone' => 'Phone',
            'invite_num' => 'Invite Num',
            'invite_count' => 'Invite Count',
            'invite_img' => 'Invite Img',
            'today_invite_count' => 'Today Invite Count',
            'me_invite_code' => 'Me Invite Code',
            'other_invite_code' => 'Other Invite Code',
            'name' => 'Name',
            'address' => 'Address',
            'tel' => 'Tel',
            'code' => 'Code',
            'invite_at' => 'Invite At',
            'login_at' => 'Login At',
            'created_at' => 'Created At',
        ];
    }
}
