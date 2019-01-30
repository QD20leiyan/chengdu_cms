<?php
/**
 * 视频页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\WapController;


class VideoController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id', 329);
        return $this->renderPartial('index.html', ['id' => $id], $id);
    }

    /**
     * ajax 获取列表
     */
    public function actionAjaxGetList()
    {
        $params = [];
        $title = Cms::getGetValue('title');
        if ($title) {
            $params['title'] = $title;
        }
        $data = $this->ajaxGetList(9, $params);
        $this->ajaxOutPut($data);
    }

    //详情页
    public function actionDetail()
    {
        $data['content'] = $this->articleDetail();
        $data['content']['day'] = floor((time() - strtotime($data['content']['created_at_formate']))/86400);
        return $this->renderPartial('detail.html',$data, 0, Cms::getGetValue('id'));
    }
}
