<?php
/**
 * 文章
 *
 * @author Administrator
 *
 */

namespace app\controllers;


use common\components\PcController;
use common\models\Category;
use common\models\Content;
use common\Cms;
use yii\helpers\Json;
use yii\widgets\LinkPager;

class ArticleController extends PcController
{

    //列表页
    public function actionIndex()
    {
        $categoryId = Cms::getGetValue('cid', 64);
//        $type = Cms::getGetValue('type', 'all');
//        if ($type == 'xinwen') {
//            $categoryId = 65;
//        } else if ($type == 'gonggao') {
//            $categoryId = 66;
//        } else if ($type == 'huodong') {
//            $categoryId = 67;
//        } else if ($type == 'gonglue') {
//            $categoryId = 68;
//        }
        $_GET['categoryId'] = $categoryId;
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        return $this->render('index', [
            'data' => $list['data'],
            'page' => $list['page'],
            'cid' => $categoryId,
            'nowPage' => Cms::getGetValue('page'),
//            'type' => $type,
        ], $categoryId);
    }

    //详情页
    public function actionDetail($id)
    {
        $id = Cms::getGetValue('id');

        $content = $this->getContentDetail($id);
        if (!$content) {
            $content = array();
        } else if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        return $this->render('detail', [
            'data' => $content,
        ], 0, $id);
    }

    /**
     * 资料库
     */
    public function actionData()
    {
        $categoryId = Cms::getGetValue('id', 117);  //默认基础防具

        $data = $this->_getData($categoryId);
        $data['category_id'] = $categoryId;
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('data.html', $data, $categoryId);
    }

    /**
     * 获取资料库内容
     * @param $categoryId
     * @return array|\yii\db\ActiveRecord[]
     */
    private function _getData($categoryId)
    {
        if (!$categoryId) {
            return array();
        }

        if (in_array($categoryId, [117, 118, 119, 120, 121])) {
            $cat_dir = 'info/data';
        } else {
            $cat_dir = 'info/raiders';
        }

        $content = new Content();

        $data = Category::find()->where('id=:id', [':id' => $categoryId])->asArray()->one();
        if (empty($data)) {
            return array();
        } else if (in_array($data['id'], [119, 120])){    //如果是魔法攻略和生物攻略
            $list = $content->getContentLists($categoryId, 9);
            if (!empty($list['data'])) {
                foreach ($list['data'] as &$v) {
                    $v['sub_cat'] = array();
                    $v['linkUrl'] = Cms::getUrl('article/detail',array('id'=>$v['id'], 'add_time'=>$v['created_at'], 'cat_dir'=> $cat_dir));
                }
            }
            if (!empty($list['page'])) {
                $list['page'] = LinkPager::widget([
                    'pagination' => $list['page'],
                    'hideOnSinglePage' => false,
                    'firstPageLabel' => '首页',
                    'lastPageLabel' => '尾页',
                    'options' => ['class' => 'page'],
                    'nextPageLabel' => '下一页',
                    'prevPageLabel' => '上一页',
                    'maxButtonCount' => 7,
                ]);
            }
            return $list;
        }

        //第一层分类
        $data = Category::find()->where('parent_id=:parent_id', [':parent_id' => $categoryId])->asArray()->all();

        foreach ($data as $k => &$v) {
            //子分类
            $cat2 = Category::find()->where('parent_id=:parent_id', [':parent_id' => $v['id']])->asArray()->all();
            if (!empty($cat2)) {
                foreach ($cat2 as &$v1) {
                    //子分类中的文章列表
                    $list = $content->getContentLists($v1['id'], 100);
                    $tmp = array();
                    if (!empty($list['data'])) {
                        foreach ($list['data'] as $v2) {
                            $tmp[] = [
                                'id' => $v2['id'],
                                'title' => $v2['title'],
                                'linkUrl' => Cms::getUrl('article/detail',array('id'=>$v2['id'], 'add_time'=>$v2['created_at'], 'cat_dir'=> $cat_dir)),
                            ];
                        }
                    }
                    $v1['sub_content'] = $tmp;
                }

                $v['sub_cat'] = $cat2;
            } else {
                //子分类中的文章列表
                $list = $content->getContentLists($v['id'], 100);
                $tmp = array();
                if (!empty($list['data'])) {
                    foreach ($list['data'] as $v2) {

                        $tmp[] = [
                            'id' => $v2['id'],
                            'title' => $v2['title'],
                            'linkUrl' => Cms::getUrl('article/detail',array('id'=>$v2['id'], 'add_time'=>$v2['created_at'], 'cat_dir'=> $cat_dir)),
                        ];
                    }
                }
                $v['sub_cat'] = '';
                $v['sub_content'] = $tmp;
            }
        }
        $res['data'] = $data;
        return $res;
    }

    public function actionAjaxGetData()
    {
        $categoryId = Cms::getGetValue('id', 117);  //默认基础防具

        $data = $this->_getData($categoryId);
        $data['category_id'] = $categoryId;

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }

        ob_start();
        return $this->renderPartial('ajax_get_data.html', $data);
        $data = ob_get_contents();
        ob_end_clean();

        echo Json::encode(['status' => 0, 'msg' => $data]);exit;
    }


    /**
     * 获取资料详情
     */
    public function actionDataDetail()
    {
        $content = $this->_newsDetail();

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($content, 1);
        }
        return $this->renderPartial('data_detail.html', $content, 0, Cms::getGetValue('id'));
    }

    //攻略
    public function actionRaiders()
    {
        $categoryId = Cms::getGetValue('id', 132);  //默认基础防具

        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        if (!empty($list['data'])) {
            foreach ($list['data'] as &$v) {
                $v['linkUrl'] = Cms::getUrl('article/detail',array('id'=>$v['id'], 'add_time'=>$v['created_at'], 'cat_dir'=> 'info/raiders'));
            }
        }
        if (!empty($list['page'])) {
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
        } else {
            $page = '';
        }

        $data = [
            'data' => $list['data'],
            'page' => $page,
            'cid' => $categoryId,
            'nowPage' => Cms::getGetValue('page'),
        ];

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('raiders.html', $data, $categoryId);

    }

//    //攻略
//    public function actionAjaxGetRaiders()
//    {
//        $categoryId = Cms::getGetValue('id', 132);  //默认基础防具
//
//        $content = new Content();
//        $category_ids = self::getChildren($categoryId);
//        $list = $content->getContentLists($category_ids, 11);
//
//        $data = [
//            'data' => $list['data'],
//            'page' => $list['page'],
//            'cid' => $categoryId,
//            'nowPage' => Cms::getGetValue('page'),
//        ];
//
//        $testType = Cms::getGetValue('testType', 0);
//        if ($testType == 1) {
//            pr($data, 1);
//        }
//
//        echo Json::encode(['status' => 0, 'msg' => $data]);exit;
//
//    }

    /**
     * 获取攻略详情
     */
    public function actionRaidersDetail()
    {
        $content = $this->_newsDetail();

        return $this->renderPartial('raiders_detail.html', $content, 0, Cms::getGetValue('id'));
    }

    private function _newsDetail()
    {
        $id = Cms::getGetValue('id');

        $content = $this->getContentDetail($id);
        if (!$content) {
            $content = array();
        } else if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        $cageGory = Category::findOne($content['category_id']);
        //不在顶级分类里面
        $topIndex = [117,118,119,120,121,132,135,138,139,140];
        if (!empty($cageGory) && !in_array($cageGory['id'], $topIndex)) {

            $content['parent_thumb'] = $cageGory['thumb'];
            $cageGory = Category::findOne($cageGory['parent_id']);
            if (!empty($cageGory) && !in_array($cageGory['id'], $topIndex)) {
                $content['parent_thumb'] = $cageGory['thumb'];
            }
        }
        $content['parent_thumb'] = isset($content['parent_thumb']) ? $content['parent_thumb'] : '';
        $topCate = $this->_getTopCate($content['category_id']);
        $content['top_category_id'] = $topCate['top_category_id'];
        $content['top_name'] = $topCate['top_name'];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($content, 1);
        }

        return $content;

    }

    /**
     * 获取顶级分类详情
     * @param $category_id
     * @return array
     */
    private function _getTopCate($category_id)
    {
        $cageGory = Category::findOne($category_id);
        //不在顶级分类里面
        $topIndex = [117,118,119,120,121,132,135,138,139,140];
        if (!empty($cageGory)) {
            if (!in_array($cageGory['id'], $topIndex)) {
                return $this->_getTopCate($cageGory['parent_id']);
            } else {
                return ['top_category_id' => $cageGory['id'], 'top_name' => $cageGory['name']];
            }
        } else {
            return ['top_category_id' => '', 'top_name' => ''];
        }
    }

    //主播报名
    public function actionOrder(){
        $rules=$this->getContentDetail(\Yii::$app->params['RULES_ID']);
        $data=VerifyController::parse_skill_arr($rules);
        $link='/info/2017/0919/1160.html';
        $data['link']=$link;
        return $this->renderPartial('order.html',$data);
    }

}
