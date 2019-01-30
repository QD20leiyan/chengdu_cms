<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_rw_user".
 *
 * @property integer $id
 * @property string $phone
 * @property integer $invite_num
 * @property integer $draw_num
 * @property integer $share_num
 * @property integer $draw_count
 * @property string $invite_img
 * @property integer $today_draw_count
 * @property integer $today_invite_count
 * @property string $me_invite_code
 * @property string $other_invite_code
 * @property string $name
 * @property string $address
 * @property string $tel
 * @property string $code
 * @property integer $draw_time
 * @property integer $draw_time_zs
 * @property integer $share_time
 * @property integer $updated_at
 * @property string $gift_ids
 * @property string $gift_code_id
 * @property integer $created_at
 */
class RwUserModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_rw_user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['phone'], 'required'],
            [['invite_num', 'draw_num', 'draw_count' , 'share_num' , 'today_draw_count', 'today_invite_count','draw_time_zs', 'draw_time', 'share_time', 'updated_at', 'created_at'], 'integer'],
            [['phone', 'tel', 'code'], 'string', 'max' => 11],
            [['invite_img'], 'string', 'max' => 150],
            [['me_invite_code'], 'string', 'max' => 10],
            [['name', 'gift_ids'], 'string', 'max' => 50],
            [['address', 'gift_code_id','other_invite_code'], 'string', 'max' => 255],
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
            'draw_num' => 'Draw Num',
            'draw_count' => 'Draw Count',
            'invite_img' => 'Invite Img',
            'today_draw_count' => 'Today Draw Count',
            'today_invite_count' => 'Today Invite Count',
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
            'gift_code_id' => 'Gift Code ID',
            'created_at' => 'Created At',
        ];
    }
}
