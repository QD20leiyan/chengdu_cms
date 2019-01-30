<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_sm_fashion".
 *
 * @property int $id
 * @property string $account_id 大厅ID
 * @property string $user_name 用户名
 * @property int $register_at 注册时间
 * @property string $me_invite_code 我的邀请码
 * @property string $other_invite_code 我邀请的人 用逗号隔开
 * @property int $phone 手机号码
 * @property int $user_status 用户状态 1 新用户 2 老用户 3 求助的好友
 * @property string $created_at
 * @property string $patch
 * @property string $gift_ids 中奖的ID
 */
class SmFashionModel extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cms_sm_fashion';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['register_at', 'user_status'], 'integer'],
            [['user_name'], 'string', 'max' => 20],
            [['me_invite_code', 'gift_ids'], 'string', 'max' => 10],
            [['other_invite_code'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'account_id' => 'Account ID',
            'user_name' => 'User Name',
            'register_at' => 'Register At',
            'me_invite_code' => 'Me Invite Code',
            'other_invite_code' => 'Other Invite Code',
            'phone' => 'Phone',
            'user_status' => 'User Status',
            'created_at' => 'Created At',
            'gift_ids' => 'Gift Ids',
        ];
    }
}
