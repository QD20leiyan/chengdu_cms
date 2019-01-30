<?php
namespace app\controllers;


use common\components\PcController;
use common\models\CategoryType;
use common\models\Content;
use Yii;
use common\Cms;
use yii\widgets\LinkPager;


class FzController extends PcController
{
    //faq问答列表
    public function actionFaq(){
        if(\Yii::$app->language == 'zh_cn'){//中文
            $categoryId = Cms::getGetValue('cid', 56);
            $content = new Content();
            $category_ids = self::getChildren($categoryId);
            $list = $content->getContentLists($category_ids, 6,'cc');
        }else {//英文
            $categoryId = Cms::getGetValue('cid', 90);
            $content = new Content();
            $category_ids = self::getChildren($categoryId);
            $list = $content->getContentLists($category_ids, 6,'cc');
        }
        pr($list);
        $page = LinkPager::widget([
            'pagination' => $list['page'],
            'hideOnSinglePage' => false,
            'firstPageLabel' => '首页',
            'lastPageLabel' => '尾页',
            'options' => ['class' => 'page'],
            'nextPageLabel' => '下一页',
            'prevPageLabel' => '上一页',
            'maxButtonCount' => 7
        ]);
        $data = [
            'data' => $list['data'],
            'page' => $page,
            'cid' => $categoryId,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->render('faq.html', $data);
    }

    //战争列表
    public function actionZhanzheng(){
        if(\Yii::$app->language == 'zh_cn'){//中文
            $categoryId = Cms::getGetValue('cid', 57);
            $content = new Content();
            $category_ids = self::getChildren($categoryId);
            $list = $content->getContentLists($category_ids, 6,'cc');
        }else {//英文
            $categoryId = Cms::getGetValue('cid', 91);
            $content = new Content();
            $category_ids = self::getChildren($categoryId);
            $list = $content->getContentLists($category_ids, 6,'cc');

        }
        $page = LinkPager::widget([
            'pagination' => $list['page'],
            'hideOnSinglePage' => false,
            'firstPageLabel' => '首页',
            'lastPageLabel' => '尾页',
            'options' => ['class' => 'page'],
            'nextPageLabel' => '下一页',
            'prevPageLabel' => '上一页',
            'maxButtonCount' => 7
        ]);
        $data = [
            'data' => $list['data'],
            'page' => $page,
            'cid' => $categoryId,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }

        return $this->render('faq.html', $data);
    }


    //详情页
    public function actionDetail()
    {
        $id = Cms::getGetValue('id');
        $content = $this->getContentDetail($id);
        if (!$content) {
            $content == array();
        } else if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        $testType = Cms::getGetValue('testType', 0);
        $data = [
            'data' => $content,
        ];
        if ($testType == 1) {
            pr($data, 1);
        }
        pr($data, 1);
        return $this->render('fz.html', $data);
    }




}