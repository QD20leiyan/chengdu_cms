<?php
/**
 * 图片页面
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\WapController;
use common\models\CategoryType;
use common\models\Content;


class ImageController extends WapController
{

    //档案馆
    public function actionIndex()
    {
        $_GET['id'] = Cms::getGetValue('id', 350);  //新闻动态
        $res = $this->ajaxGetList(500);
        $data['data'] = $res['msg'];
        $data['id'] = $_GET['id'];

        $data['role'] = $this->getRecommend('new_game_role');    //角色专题
        $data['gun'] = $this->getRecommend('new_gun_all');    //明枪管
        $data['map'] = $this->getRecommend('new_map_view');    //地图
        return $this->renderPartial('index.html', $data, $_GET['id']);
    }

}
