<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_hero_wpzz".
 *
 * @property integer $id
 * @property string $user_id
 * @property string $user_name
 * @property integer $register_at
 * @property string $phone
 * @property integer $user_status
 * @property string $me_invite_code
 * @property string $other_invite_code
 * @property integer $lb_num
 * @property integer $today_invite_num
 * @property integer $invite_at
 * @property integer $invite_num
 * @property integer $draw_num
 * @property string $gift_ids
 * @property string $gift_code_ids
 * @property integer $login_at
 * @property string $name
 * @property string $address
 * @property string $tel
 * @property string $code
 * @property integer $created_at
 */
class HeroWpzzModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_hero_wpzz';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['register_at', 'user_status', 'lb_num', 'today_invite_num', 'invite_at', 'draw_num', 'login_at', 'created_at'], 'integer'],
            [['user_name'], 'string', 'max' => 20],
            [['me_invite_code'], 'string', 'max' => 10],
            [['gift_ids','gift_code_ids'], 'string', 'max' => 150],
            [['name'], 'string', 'max' => 50],
            [['address'], 'string', 'max' => 255],
            [['tel', 'code'], 'string', 'max' => 11],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'user_name' => 'User Name',
            'register_at' => 'Register At',
            'phone' => 'Phone',
            'user_status' => 'User Status',
            'me_invite_code' => 'Me Invite Code',
            'other_invite_code' => 'Other Invite Code',
            'lb_num' => 'Lb Num',
            'today_invite_num' => 'Today Invite Num',
            'invite_at' => 'Invite At',
            'invite_num' => 'Invite Num',
            'draw_num' => 'Draw Num',
            'draw_count' => 'Draw Count',
            'gift_ids' => 'Gift Ids',
            'gift_code_ids' => 'Gift Code Ids',
            'login_at' => 'Login At',
            'name' => 'Name',
            'address' => 'Address',
            'tel' => 'Tel',
            'code' => 'Code',
            'created_at' => 'Created At',
        ];
    }
}
