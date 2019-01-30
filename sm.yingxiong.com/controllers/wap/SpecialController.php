<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/8/24
 * Time: 11:25
 */

namespace app\controllers\wap;

use common\Cms;
use common\components\WapController;
use common\models\sm\SmDatiUser;

class SpecialController extends WapController
{
    /**
     * 鲲计划
     * @return string
     */
    public function actionKunPlan()
    {
        return $this->renderPartial('kun_plan.html');
    }

    /**
     * 答题页
     */
    public function actionDati()
    {
        return $this->renderPartial('dati.html');
    }

    /**
     * 分享页
     * @return string
     */
    public function actionDatiShare()
    {
        $id = Cms::getGetValue('id');
        if (!$id && !Cms::getSession('dati_phone')) {
            header('Location:/wap/special/dati.html');
            exit;
        }
        $user = SmDatiUser::findOne($id);
        return $this->renderPartial('dati_share.html', ['rank' => $user->rank, 'id' => $user->id]);

    }

    /**
     * 答题页试卷
     */
    public function actionDatiPage()
    {
        return $this->renderPartial('dati_page.html');
    }

    /**
     * 主播
     * @return string
     */
    public function actionZhubo()
    {
        $data['act'] = $this->getContentArr('368', 4);
        $data['cs'] = $this->getContentArr('370', 500);
        $data['hy'] = $this->getContentArr('371', 500);
        $data['dj'] = $this->getContentArr('372', 500);
        $data['qt'] = $this->getContentArr('373', 500);
        $data['yp'] = $this->getContentArr('485', 500);
        $data['lunbo'] = $this->getContentArr(380, 4);
        return $this->renderPartial('zhubo.html', $data, 69);
    }
}