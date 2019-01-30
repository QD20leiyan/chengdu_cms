<?php
/**
 * 图片页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\components\PcController;
use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;
use common\Cms;
use yii\helpers\Url;
use yii\helpers\Json;


class ImageController extends WapController
{

    //列表页
    public function actionIndex()
    {

        $dataProvider = $this->getPageList(Content::class,['category_type_id'=>CategoryType::TYPE_IMAGE]);
        return $this->render('index', ['dataProvider'=>$dataProvider]);
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

    public function actionList()
    {
        $content = new Content();

        $category_id = Cms::getGetValue('id', 102);
        $category_ids = self::getChildren($category_id);
        $list = $content->getContentLists($category_ids, 9);

        return $this->render('list', [
            'data' => $list['data'],
            'page' => $list['page'],
//            'type' => $type,
            'id' => $category_id
        ]);
    }

    public function actionAjaxList()
    {
        $content = new Content();
        $category_id = Cms::getGetValue('id', 102);
        $category_ids = self::getChildren($category_id);
        $list = $content->getContentLists($category_ids, 9);
        $page = Cms::getGetValue('page');

        $pageCount = ceil($list['page']->totalCount/9);

        if ($page > $pageCount) {
            echo Json::encode(array('status' => 0, 'msg' => []));
            exit;
        }
        foreach ($list['data'] as $k => $v) {
            $list['data'][$k]['created_at'] = date('m/d', $list['data'][$k]['created_at']);
            $list['data'][$k]['url'] = Url::to(['m/site/details', 'id' => $v['id']]);
        }
        echo Json::encode(array('status' => 0, 'msg' => $list['data']));
        exit;
    }

}
