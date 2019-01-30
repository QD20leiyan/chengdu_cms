<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\components\PcController;
use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;
use Yii;
use common\Cms;
use yii\helpers\Json;


class VideoController extends WapController
{

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        return $this->render('detail',['detail'=>$detail]);
    }

    /**
     * 视频列表页面
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index', [
            'defaultCid' => 40,
            'navTitle' => '',
        ], Cms::getGetValue('cid', 40));

        $categoryId = Cms::getGetValue('cid', 40);
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 2);

        return $this->render('index', [
            'data' => $list['data'],
            'page' => $list['page'],
            'cid' => $categoryId
        ], $categoryId);
    }

    /**
     * ajax加载视频列表
     */
    public function actionAjaxList()
    {
        $categoryId = Cms::getGetValue('cid', 40);
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 9);
        $pageCount = ceil($list['page']->totalCount/9);
        $page = Cms::getGetValue('page');
        if ($page > $pageCount) {
            echo Json::encode(array('status' => 0, 'msg' => []));
            exit;
        }
        echo Json::encode(array('status' => 0, 'msg' => $list['data']));
        exit;
    }
}
