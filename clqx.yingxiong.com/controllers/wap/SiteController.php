<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;

use common\components\WapController;
use yii\captcha\Captcha;

class SiteController extends WapController
{

    public function actionCover()
    {
        return $this->renderPartial('cover.html');
    }

    public function actionIndex()
    {
        $data['role'] = $this->getContentArr(714, 100);
        if ($data['role'] && !empty($data['role'])) {
            foreach ($data['role'] as &$v) {
                $v['sub'] = $this->parse_jws_attr($v['summary']);
            }
        }
        return $this->renderPartial('index.html', $data);
    }

    public function actionError()
    {
        return $this->render('error');
    }


}
