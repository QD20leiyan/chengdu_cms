<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_h5_ca_new_season_share".
 *
 * @property integer $id
 * @property string $openid
 * @property string $open_gid
 * @property integer $share_at
 */
class H5CaNewSeasonShareModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_h5_ca_new_season_share';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['share_at'], 'integer'],
            [['openid'], 'string', 'max' => 100],
            [['open_gid'], 'string', 'max' => 150],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'openid' => 'Openid',
            'open_gid' => 'Open Gid',
            'share_at' => 'Share At',
        ];
    }
}
