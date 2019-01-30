<?php

/**
 * This is the model class for table "{{gift_code}}".
 *
 * The followings are the available columns in table '{{gift_code}}':
 * @property integer $id
 * @property integer $gift_id
 * @property string $code
 * @property integer $type
 * @property string $phone
 * @property integer $send_at
 */
class GiftCodeModel extends CActiveRecord
{
    const  CODE_TYPE_DEFAULT = 0;//不限
    const CODE_TYPE_LEGAL = 1; //正版
    const CODE_TYPE_UNLEGAL = 2;//越狱

    public static $codeTypeList = array(
        self::CODE_TYPE_DEFAULT=>'不限',
        self::CODE_TYPE_LEGAL=>'正版',
        self::CODE_TYPE_UNLEGAL=>'混版'
    );

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return '{{gift_code}}';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('gift_id, type, send_at', 'numerical', 'integerOnly'=>true),
            array('code', 'length', 'max'=>32),
            array('phone', 'length', 'max'=>11),
            array('remark', 'length', 'max'=>200),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, gift_id, code, type, phone, send_at, remark', 'safe', 'on'=>'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id' => 'ID',
            'gift_id' => 'Gift',
            'code' => 'Code',
            'type' => '0：不限1：正版2：混版',
            'phone' => 'Phone',
            'send_at' => 'Send At',
            'remark' => '扩展信息'
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search()
    {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria=new CDbCriteria;

        $criteria->compare('id',$this->id);
        $criteria->compare('gift_id',$this->gift_id);
        $criteria->compare('code',$this->code,true);
        $criteria->compare('type',$this->type);
        $criteria->compare('phone',$this->phone,true);
        $criteria->compare('send_at',$this->send_at);
        $criteria->compare('remark',$this->remark,true);

        return new CActiveDataProvider($this, array(
            'criteria'=>$criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return GiftCodeModel the static model class
     */
    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }
}
