<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use Yii;


class ArticleController extends PcController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_POST]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail()
    {
        $id=Cms::getGetValue('id');
        $data = $this->getContentDetail($id);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('detail.html',['data'=>$data]);
    }

    public function actionTest($type = '', $id = '')
    {
        if (!$type) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }

}
