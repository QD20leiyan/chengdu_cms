<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cms_sszj_yuyue".
 *
 * @property integer $id
 * @property string $phone
 * @property integer $type
 * @property integer $school
 * @property integer $created_at
 */
class SszjYuyueModel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cms_sszj_yuyue';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [[ 'school', 'created_at'], 'integer'],
            [['phone'], 'string', 'max' => 12],
            [['type'], 'string', 'max' => 15],
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
            'type' => 'Type',
            'school' => 'School',
            'created_at' => 'Created At',
        ];
    }
}
