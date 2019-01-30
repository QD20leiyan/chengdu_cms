<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/9/4
 * Time: 11:28
 */

namespace app\controllers;


use common\Cms;
use common\components\PcController;
use common\models\Content;
use common\models\Fragment;
use yii\data\Pagination;

class YchController extends PcController
{
    const TP = 'tp';
    const SP = 'sp';    // 视频
    const ZP = 'zp';    // 作品

    public $categoryIds = [656, 657, 658, 659];

    public function actionIndex()
    {
        $id = Cms::getGetValue('id');
        if (!in_array($id, $this->categoryIds)) {
            echo $this->renderPartial('@common/widgets/commonMethod/views/error');exit;
        }

        // 推荐位 ych_tp_1_1
        $fragment = Fragment::find()->where(['website_id' => $this->website_id])->andWhere(['like', 'code', 'ych'])->asArray()->all();
        $tj = [];
        $tjDesc = [];
        if ($fragment && !empty($fragment)) {
            foreach ($fragment as $v) {
                if (!$v['code']) {
                    continue;
                }
                $tmp = explode('_', trim($v['code']));
                if (count($tmp) != 4) {
                    continue;
                }
                if (!in_array($tmp[1], [self::TP, self::SP, self::ZP])) {
                    continue;
                }
                $v['type'] = $tmp[1];
                if (!key_exists($tmp[2], $tj)) {
                    $tj[$tmp[2]] = [];
                }
                if ($v['description']) {
                    $desc = Cms::parseConfigAttr($v['description']);
                    $tjDesc[$tmp[2]] = $desc;
                }
                $tj[$tmp[2]][] = $v;
            }
        }
        ksort($tj);

        $data['tj'] = $tj;
        $data['tjDesc'] = $tjDesc;

        $article = $this->ajaxGetList();
        if ($article['status'] == 0) {
            $article = $article['msg'];
            if ($article && !empty($article)) {
                foreach ($article as &$v) {
                    if (isset($v['body_ggtd'])) {
                        $v['images'] = Cms::getBodyImgs($v['body_ggtd']);
                    } else {
                        $v['images'] = [];
                    }
                }
            }
            $data['article'] = $article;
        } else {
            $data['article'] = [];
        }
        $data['category_id'] = $id;
        return $this->renderPartial('index.html', $data);
    }

    /**
     * ajax 获取文章列表
     */
    public function actionAjaxGetList()
    {
        $page_size = Cms::getGetValue('page_size', 9);
        $_GET['page'] = Cms::getGetValue('page', 1);
        $order = Cms::getGetValue('order', '');
        $params = $_GET;
        if ($order == 'rand') {
            $data = $this->ajaxGetList(200, $params, $order);
            shuffle($data['msg']);
            $count = 0;
        } else {
            $data = $this->ajaxGetList($page_size, $params, $order);
        }

        if ($data['status'] == 0) {
            if (!empty($data['msg'])) {
                foreach ($data['msg'] as &$v) {
                    if ($order == 'rand') {
                        if ($count >= $page_size) {
                            break;
                        }
                    }

                    if (isset($v['body_ggtd'])) {
                        $v['images'] = Cms::getBodyImgs($v['body_ggtd']);
                    } else {
                        $v['images'] = [];
                    }
                }
            }
        }
        $data['server_time'] = time();
        $this->ajaxOutPut($data);
    }

    /**
     * 获取推荐位内容
     */
    public function actionGetFragment()
    {
        $code = Cms::getPostValue('code');
        if (!$code) {
            $this->ajaxOutPut(['status' => -1, 'msg' => 'code 不能为空！']);
        }
        $fragment = Fragment::find()->where(['website_id' => $this->website_id, 'code' => $code])->asArray()->one();
        if (!$fragment) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '该推荐位不存在！']);
        }
        if ($fragment['description']) {
            $desc = Cms::parseConfigAttr($fragment['description']);
            $fragment = array_merge($fragment, $desc);
        }

        $data['list'] = $this->getRecommend($code);
        $data['fragment'] = $fragment;
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }

    /**
     * 活动
     */
    public function actionActivity()
    {
        $data['data'] = $this->_getActivity();
        $data['server_time'] = date('Y.m.d');
        return $this->renderPartial('activity.html', $data);
    }

    public function actionGetActivity()
    {
        $data = $this->_getActivity();
        $this->ajaxOutPut(['status' => 0, 'msg' => $data, 'server_time' => date('Y.m.d')]);
    }

    private function _getActivity()
    {
        $_GET['id'] = 659;
        $article  = $this->ajaxGetList();
        $data  = $article['msg'];

        foreach ($data as &$v) {
            $v['linkUrl'] = '/ych/activity/'.$v['id'].'.html';
            $v['wapLinkUrl'] = '/m/ych/activity/'.$v['id'].'.html';
            if ($v['summary']) {
                $tmp = Cms::parseConfigAttr($v['summary']);
                $v = array_merge($v, $tmp);
            }
        }
        return $data;
    }

    /**
     * 活动列表需要判断活动 评选日期是否过期的服务器时间
     */
    public function actionGetServerTime()
    {
        $this->ajaxOutPut(['status' => 0, 'msg' => time()]);
    }

    /**
     * 活动详情
     */
    public function actionActivityDetail()
    {
        $id = Cms::getGetValue('id');
        $data = $this->getContentDetail($id);
        if ($data) {
            if ($data['category_id'] != 659) {
                $data = [];
            } elseif ($data['summary']) {
                $tmp = Cms::parseConfigAttr($data['summary']);
                $data = array_merge($data, $tmp);
            }
        }
        $data['server_time'] = date('Y.m.d');
        return $this->renderPartial('activity_detail.html', $data);
    }

    public function actionSearch()
    {
        return $this->renderPartial('search.html');
    }

    //搜索
    public function actionSearchWords()
    {
        $keywords = Cms::getPostValue('keywords');
        $page = Cms::getPostValue('page', 1);
        $_GET['page'] = $page;
        if (!$keywords) {
            $this->ajaxOutPut(['status' => -1, 'msg' => '搜索内容不能为空！']);
        }
        $data = Content::find()
            ->where(['website_id' => $this->website_id])
            ->andWhere(['in', 'category_id', [656, 657, 658, 659]])
            ->andWhere("title like :keywords or sub_title like :keywords", [':keywords' => '%'.$keywords.'%']);

        $authors = [];
        $procs = [];
        $count = $data->count();
        if ($count) {
            $page = new Pagination(['totalCount' =>$count, 'pageSize' => 9]);
            $pageCount = ceil($page->totalCount/$page->pageSize);
            if ($_GET['page'] <= $pageCount) {
                $model = $data->offset($page->offset)->limit($page->limit)->asArray()->all();
                foreach ($model as $v) {
                    $typeModel = Content::getTypeModel($v['category_type_id']);
                    $content = $typeModel->find()->where(['content_id' => $v['id']])->asArray()->one();
                    if ($content) {
                        $v['images'] = [];
                        if ($v['category_type_id'] == 'image') {
                            $v['body'] = $content['image_url'];
                        } elseif ($v['category_type_id'] == 'media') {
                            $v['body'] = $content['media_url'];
                        } else {
                            $v['body'] = $content['body'];
                            if ($v['body']) {
                                $v['images'] = Cms::getBodyImgs($v['body']);
                            }
                        }
                    }

                    if (strstr($v['title'], $keywords)) {
                        $procs[] = $v;
                    }
                    if (strstr($v['sub_title'], $keywords)) {
                        $authors[] = $v;
                    }
                }
            }
        }
        $data = [
            'authors' => $authors,
            'procs' => $procs
        ];
        $this->ajaxOutPut(['status' => 0, 'msg' => $data]);
    }
}