<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/9/6
 * Time: 15:07
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\WapController;
use common\models\Fragment;

class YchController extends WapController
{
    const TP = 'tp';
    const SP = 'sp';
    const ZP = 'zp';

    public $categoryIds = [656, 657, 658];

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
     * 活动
     */
    public function actionActivity()
    {
        $data['data'] = $this->_getActivity();
        $data['server_time'] = date('Y.m.d');
        return $this->renderPartial('activity.html', $data);
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
}