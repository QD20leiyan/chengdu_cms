<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\WapController;
use common\models\Category;
use yii\helpers\Json;


class ArticleController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $type=Cms::getGetValue('type');
            switch ($type){
                case 'xinwen' ://热门
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                    break;
                case 'gonggao' ://新闻
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                    break;
                case 'zhixun' ://公告
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZHIXUN']);
                    break;
                case 'huodong' ://活动
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                    break;
                default:
                    $categoryId =null;
            }
            $list = self::ajaxGetNews($categoryId, 12);
            $lists = array();
            if (isset($list['msg'])) {
                foreach ($list['msg'] as $key => $value) {
                    $arr = array(
                        'name' => $value['name'],
                        'title' => $value['title'],
                        'wapLinkUrl' => $value['wapLinkUrl'],
                        'time' => $value['created_at'],
                    );
                    $lists[] = $arr;
                }
            }
            $data['data'] = $lists;
            $data['type'] = $type;
            $testType = Cms::getGetValue('testType', 0);
            if ($testType == 1){
                pr($data, 1);
            }
            return $this->renderPartial('index.html',['data'=>$data], $categoryId);
    }

    //列表ajax
    public function actionAjaxList(){
        $type=Cms::getGetValue('type');
        $status=1;
        switch ($type){
            case 'xinwen' ://热门
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                break;
            case 'gonggao' ://新闻
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                break;
            case 'zhixun' ://公告
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZHIXUN']);
                break;
            case 'huodong' ://活动
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                break;
            default:
                $categoryId = null;
        }
        $list = self::ajaxGetNews($categoryId,12);
        $lists = array();
        if (isset($list['msg'])) {
            $status=0;
            foreach ($list['msg'] as $key => $value) {
                $arr = array(
                    'name' => $value['name'],
                    'title' => $value['title'],
                    'wapLinkUrl' => $value['wapLinkUrl'],
                    'time' => $value['created_at'],
                );
                $lists[] = $arr;
            }
        }
        $data['msg'] = $lists;
        $data['type'] = $type;
        $data['status'] = $status;
        echo Json::encode($data);
        exit;
    }

    //详情页
    public function actionDetail($id)
    {
        $detail = $this->getContentDetail($id);
        switch ($detail['category_id']) {
            case 425 ://热门
                $type = 'xinwen';
                break;
            case 426://公告
                $type = 'gonggao';
                break;
            case 427 ://资讯
                $type = 'zhixun';
                break;
            case 428 ://活动
                $type = 'huodong';
                break;
            default:
                $type = '';
        }

        $data['type']=$type;
        $data['detail']=$detail;
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('detail.html',$data,'',$id);
    }
    public function actionTest($name = '', $id = '')
    {
        if (!$name) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$name;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
    }

}
