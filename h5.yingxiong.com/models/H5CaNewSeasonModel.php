<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_h5_ca_new_season".
 *
 * @property integer $id
 * @property string $name
 * @property string $openid
 * @property string $grade
 * @property integer $lottery_count
 * @property integer $lottery_num
 * @property integer $login_at
 * @property integer $share_num
 * @property integer $share_at
 * @property integer $is_full
 * @property string $open_gid
 */
class H5CaNewSeasonModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_h5_ca_new_season';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['lottery_count', 'lottery_num', 'login_at', 'share_num', 'share_at','is_full'], 'integer'],
            [['name'], 'string', 'max' => 100],
            [['openid'], 'string', 'max' => 100],
            [['grade'], 'string', 'max' => 255],
            [['open_gid'], 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'openid' => 'Openid',
            'open_gid' => 'Open Gid',
            'grade' => 'Grade',
            'is_full' => 'Is Full',
            'lottery_count' => 'Lottery Count',
            'lottery_num' => 'Lottery Num',
            'login_at' => 'Login At',
            'share_num' => 'Share Num',
            'share_at' => 'Share At',
        ];
    }
}
