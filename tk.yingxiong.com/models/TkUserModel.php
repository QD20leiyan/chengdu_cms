<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_tk_user".
 *
 * @property integer $id
 * @property string $phone
 * @property integer $invite_num
 * @property integer $invite_at
 * @property string $me_invite_code
 * @property string $other_invite_code
 * @property string $guess_name
 * @property integer $guess_at
 * @property integer $created_at
 */
class TkUserModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_tk_user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['invite_num', 'guess_at', 'created_at','invite_at'], 'integer'],
            [['phone'], 'string', 'max' => 13],
            [['me_invite_code'], 'string', 'max' => 10],
            [['other_invite_code'], 'string', 'max' => 255],
            [['guess_name'], 'string', 'max' => 15],
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
            'guess_name' => 'Guess Name',
            'guess_at' => 'Guess At',
            'created_at' => 'Created At',
        ];
    }
}
