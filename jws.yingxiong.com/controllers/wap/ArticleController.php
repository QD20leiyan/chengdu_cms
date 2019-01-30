<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use common\Cms;
use common\components\PcController;
use common\components\WapController;
use common\models\Content;
use Yii;
use yii\helpers\Json;


class ArticleController extends WapController
{
    //列表页
    public function actionList()
    {
        $type=Cms::getGetValue('type');
        switch ($type){
            case 'zx' ://最新
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZONGHE']);
                break;
            case 'xw' ://新闻
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                break;
            case 'gg' ://公告
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                break;
            case 'hd' ://活动
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                break;
            case 'gl' ://媒体
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGLUE']);
                break;
            default:
                $categoryId =null;
        }
        $list = self::ajaxGetNews($categoryId, 11);
        $lists = array();
        if (isset($list['msg'])) {
            foreach ($list['msg'] as $key => $value) {
//                pr($value,1);
                $arr = array(
                    'name' => $value['name'],
                    'title' => $value['title'],
                    'sub_title' => $value['sub_title'],
                    'thumb' => $value['thumb'],
                    'linkUrl' => $value['wapLinkUrl'],
                    'time' => $value['created_at'],
                    'summary' => $value['summary'],
                );
                $lists[] = $arr;
            }
        }
        $data['data'] = $lists;
        $data['type'] = $type;
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('list.html',['data'=>$data,'language'=>Cms::getSession('language')], $categoryId);
    }

    //列表ajax
    public function actionAjaxList(){
        $type=Cms::getGetValue('type');
        switch ($type){
            case 'zx' ://最新
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZONGHE']);
                break;
            case 'xw' ://新闻
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                break;
            case 'gg' ://公告
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                break;
            case 'hd' ://活动
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                break;
            case 'gl' ://媒体
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGLUE']);
                break;
            case 'fy' ://无双风云
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['FENGYUN']);
                break;
            case 'jjd' ://将军殿
                $categoryId = Cms::getGetValue('cid',\Yii::$app->params['JANGJUN']);
                break;
            default:
                $categoryId =null;
        }
        $data = self::ajaxGetNews($categoryId,100);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        echo Json::encode($data);
        exit;
    }


    //详情页
    public function actionDetail()
    {
        $id  =Cms::getGetValue('id');
        $data=$this->getContentDetail($id);
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('detail.html',['data'=>$data],'',$id);
    }

    /**角色
     * @param string $type1
     * @param string $id
     */
    public function actionRole(){
        //角色数据
        $data=[];
        $role_all=$this->getContentArr(\Yii::$app->params['JUESE'],100);
        if($role_all) {
            foreach ($role_all as $key => $value) {
                $skill=$this->parse_jws_attr($value['summary']);//技能
                $info=$this->parse_jws_attr(strip_tags($value['content_message']),1);//详情
                $role['id']=$value['id'];
                $role['title']=$value['title'];
                $role['created_at']=$value['created_at'];
                $role['redirect_url']=$value['thumb'];
                $role['info']=$info;
                $role['skill']=$skill;
                $data[]=$role;
            }
        }
        $data_info=array(
            'data'=>$data,
        );
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data_info, 1);
        }
        return $this->renderPartial('roles.html',$data_info,\Yii::$app->params['JUESE']);
    }
    
    //将军殿
    public function actionHeroList(){
        $categoryId = \Yii::$app->params['JANGJUN'];
        $list = self::ajaxGetNews($categoryId, 11);
        $lists = array();
        if (isset($list['msg'])) {
            foreach ($list['msg'] as $key => $value) {
                $array =explode('[#]', trim($value['summary']));
                $arr = array(
                    'frame' =>$key==0?1:2,
                    'title' => $value['title'],
                    'sub_title' => $value['sub_title'],
                    'thumb' => $value['thumb'],
                    'time' => $value['created_at'],
                    'canal' => isset($array[0])?$array[0]:'',
                    'enounce' => isset($array[1])?$array[1]:'',
                );
                $lists[] = $arr;
            }
        }
        $data['data'] = $lists;
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        return $this->renderPartial('hero.html',$data,$categoryId);
    }

    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }
}
