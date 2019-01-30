<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use common\Cms;

class ArticleController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $categoryId = Cms::getGetValue('id', 69);
        $arr = [70 => 'xinwen', 71 => 'gonggao', 72 => 'huodong', 74 => 'gonglue', 69 => 'zonghe'];

        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        return $this->render('index', [
            'data' => $list['data'],
            'page' => $list['page'],
            'cid' => $categoryId,
            'type' => $arr[$categoryId],
            'nowPage' => Cms::getGetValue('page'),
        ]);
    }

    //详情页
    public function actionDetail($id)
    {
        $aid = Cms::getGetValue('id');

        $content = $this->getContentDetail($aid);
        if (!$content) {
            $content == array();
        } else if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
//        pr($content, 1);
        return $this->render('detail', [
            'data' => $content,
        ]);
    }

}
