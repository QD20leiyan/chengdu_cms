<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_zhs_user".
 *
 * @property int $id
 * @property string $phone 手机号码
 * @property int $invite_num 邀请人数
 * @property int $draw_num 抽奖剩余次数
 * @property int $draw_count 抽奖总次数
 * @property string $invite_img 二维码图片
 * @property int $today_draw_count 当天抽奖次数
 * @property string $me_invite_code
 * @property string $other_invite_code
 * @property string $name 用户名
 * @property string $address 地址
 * @property string $tel 收件人电话
 * @property string $code 邮编
 * @property int $draw_time 抽奖时间
 * @property int $share_time 签到时间
 * @property int $updated_at
 * @property string $gift_ids 转盘礼包(实物与非实物）
 * @property int $created_at
 */
class ZhsUserModel extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cms_zhs_user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['phone'], 'required'],
            [['invite_num', 'draw_num', 'draw_count', 'today_draw_count', 'draw_time', 'share_time', 'updated_at', 'created_at'], 'integer'],
            [['phone', 'tel', 'code'], 'string', 'max' => 11],
            [['invite_img'], 'string', 'max' => 150],
            [['me_invite_code', 'other_invite_code'], 'string', 'max' => 10],
            [['name', 'gift_ids'], 'string', 'max' => 50],
            [['address'], 'string', 'max' => 255],
            [['phone'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'phone' => 'Phone',
            'invite_num' => 'Invite Num',
            'draw_num' => 'Draw Num',
            'draw_count' => 'Draw Count',
            'invite_img' => 'Invite Img',
            'today_draw_count' => 'Today Draw Count',
            'me_invite_code' => 'Me Invite Code',
            'other_invite_code' => 'Other Invite Code',
            'name' => 'Name',
            'address' => 'Address',
            'tel' => 'Tel',
            'code' => 'Code',
            'draw_time' => 'Draw Time',
            'share_time' => 'Share Time',
            'updated_at' => 'Updated At',
            'gift_ids' => 'Gift Ids',
            'created_at' => 'Created At',
        ];
    }
}
