<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_clqx_user".
 *
 * @property integer $id
 * @property string $phone
 * @property integer $invite_num
 * @property string $me_invite_code
 * @property string $other_invite_code
 * @property integer $login_at
 * @property integer $created_at
 */
class ClqxUserModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_clqx_user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['phone'], 'required'],
            [['invite_num', 'login_at', 'created_at'], 'integer'],
            [['phone'], 'string', 'max' => 11],
            [['me_invite_code', 'other_invite_code'], 'string', 'max' => 10],
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
            'me_invite_code' => 'Me Invite Code',
            'other_invite_code' => 'Other Invite Code',
            'login_at' => 'Login At',
            'created_at' => 'Created At',
        ];
    }
}
