<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use app\controllers\VerifyController;
use common\components\PcController;
use common\components\WapController;
use common\models\Category;
use common\models\Content;
use common\models\GameSubscribe;
use common\models\sm\SmDirectModel;
use common\models\sm\SmUserVoteModel;
use common\models\Website;
use Yii;
use common\Cms;
use yii\helpers\Json;


class ArticleController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $categoryId = Cms::getGetValue('cid', 64);
        $type = Cms::getGetValue('type', 'all');
        if ($type == 'xinwen') {
            $categoryId = 65;
        } else if ($type == 'gonggao') {
            $categoryId = 66;
        } else if ($type == 'huodong') {
            $categoryId = 67;
        } else if ($type == 'gonglue') {
            $categoryId = 68;
        }
        $_GET['categoryId'] = $categoryId;
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        return $this->render('index', [
            'data' => $list['data'],
            'page' => $list['page'],
            'cid' => $categoryId,
            'nowPage' => Cms::getGetValue('page'),
            'type' => $type,
        ], $categoryId);
    }

    /**
     * 新闻列表
     * @return string
     */
    public function actionAjaxNews()
    {
        $content = new Content();
        $categoryId = Cms::getGetValue('cid');
        $cidArr = [1 => 35, 2 => 38, 3 => 36, 4 => 39, 5 => 37];
        if (key_exists($categoryId, $cidArr)) {
            $categoryId = $cidArr[$categoryId];
        }
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        $pageCount = ceil($list['page']->totalCount/11);
        $page = Cms::getGetValue('page');
        if ($page > $pageCount) {
            echo Json::encode(array('status' => 0, 'msg' => []));
            exit;
        }
        foreach ($list['data'] as $k => $v) {
            $list['data'][$k]['created_at'] = date('m/d', $list['data'][$k]['created_at']);

            $id = $v['old_id'] ? $v['old_id'] : $v['id'];
            $category = Category::findOne($v['category_id']);
            $url = Cms::getUrl('wap/detail',array('aid'=>$id,'add_time'=>$v['created_at'],'cat_dir'=>$category['url_alias'],"#"=>"detail"));
            $list['data'][$k]['url'] = $url;
        }
        echo Json::encode(array('status' => 0, 'msg' => $list['data']));
        exit;
    }

    /**新闻详情
     * @return string
     */
    public function actionDetail()
    {
        $id = Cms::getGetValue('id');
        $content = $this->getContentDetail($id);
        if ($content && !key_exists('body', $content)) {
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

            $pageCount = ceil($list['page']->totalCount/9);
            $page = Cms::getGetValue('page');
            if ($page > $pageCount) {
                return ['data' => ''];
            }
            if (!empty($list['data'])) {
                foreach ($list['data'] as &$v) {
                    $v['sub_cat'] = array();
                    $v['linkUrl'] = Cms::getUrl('wap/detail',array('id'=>$v['id'], 'add_time'=>$v['created_at'], 'cat_dir'=> $cat_dir));
                }
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
                                'linkUrl' => Cms::getUrl('wap/detail',array('id'=>$v2['id'], 'add_time'=>$v2['created_at'], 'cat_dir'=> $cat_dir))
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
                            'linkUrl' => Cms::getUrl('wap/detail',array('id'=>$v2['id'], 'add_time'=>$v2['created_at'], 'cat_dir'=> $cat_dir))
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

    public function actionAjaxData()
    {
        $categoryId = Cms::getGetValue('id', 117);  //默认基础防具

        $data = $this->_getData($categoryId);
        $data['category_id'] = $categoryId;

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        echo Json::encode(['status' => 0, 'msg' => $data]);exit;
    }

    /**
     * 获取资料详情
     */
    public function actionDataDetail()
    {
        $content = $this->_newsDetail();

        return $this->renderPartial('data_detail.html', $content, 0, Cms::getGetValue('id'));
    }

    //攻略
    public function actionRaiders()
    {
        $categoryId = Cms::getGetValue('id', 132);  //默认基础防具

        $_GET['categoryId'] = $categoryId;
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        if (!empty($list['data'])) {
            foreach ($list['data'] as &$v) {
                $v['linkUrl'] = Cms::getUrl('wap/detail',array('id'=>$v['id'], 'add_time'=>$v['created_at'], 'cat_dir'=> 'info/raiders'));
            }
        }
        $data = [
            'data' => $list['data'],
            'page' => $list['page'],
            'cid' => $categoryId,
            'nowPage' => Cms::getGetValue('page'),
        ];

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }

        return $this->renderPartial('raiders.html', $data, $categoryId);
    }

    //攻略
    public function actionAjaxGetRaiders()
    {
        $content = new Content();
        $categoryId = Cms::getGetValue('id', 132);  //默认基础防具

        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 11);
        $pageCount = ceil($list['page']->totalCount/9);
        $page = Cms::getGetValue('page');
        if ($page > $pageCount) {
            echo Json::encode(array('status' => 0, 'msg' => []));
            exit;
        }
        foreach ($list['data'] as $k => $v) {
            $list['data'][$k]['created_at'] = date('m/d', $list['data'][$k]['created_at']);

            $category = Category::findOne($v['category_id']);
            $url = Cms::getUrl('wap/detail',array('id'=>$v['id'], 'add_time'=>$v['created_at'], 'cat_dir'=> 'info/raiders'));
            $list['data'][$k]['linkUrl'] = $url;
        }
        echo Json::encode(array('status' => 0, 'msg' => $list['data']));
        exit;
    }

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

    /***********************主播投票页面**********************/

    //主播显示的列表及票数列表
    public function actionVote(){
        $vote_user=SmDirectModel::find()->orderBy('sort desc')->asArray()->all();
        $max_poll=SmDirectModel::find()->max('poll');
        if(YII_DEV) {
            $rules = $this->getContentDetail('2555');
        }else{
            $rules = $this->getContentDetail('2982');
        }
        $is_login='';
        $poll='';
        if(isset(Yii::$app->session['user'])){
            $is_login = Yii::$app->session['user'];
            $user_model=SmUserVoteModel::find()->where(['phone'=>Yii::$app->session['user'],'website_id'=>$this->website_id])->one();
            if($user_model) {
                $poll=$user_model->candidate_id;
            }
        }
        $data=[];
        if(empty($max_poll)){
            $max_poll=0;
        }
        if($vote_user){
//            if(time()>=1514735999){
//                foreach ($vote_user as $key=>$value){
//                    if($value['id']==9){
//                        $vote_user[$key]['poll']=$max_poll+22;
//                    }
//                }
//            }
            $data['data']=$vote_user;
            if($max_poll>10000){
                $data['max_poll']=$max_poll+10000;
            }else{
                $data['max_poll']=$max_poll+100;
            }
        }else{
            $data['max_poll']=100;
        }
        $data['rules']=isset($rules['body'])?$rules['body']:'';
        $data['is_login']=$is_login;
        $data['poll']=$poll;
//        pr($data,1);
        return $this->renderPartial('vote.html',$data);
    }

    /***********************主播报名页面**********************/
    //主播报名
    public function actionOrder(){
        $rules=$this->getContentDetail(Yii::$app->params['RULES_ID']);
        $data=VerifyController::parse_skill_arr($rules);;
        $link='/m/info/2017/0919/1160.html';
        $data['wapLink']=$link;
        return $this->renderPartial('order.html',$data);
    }
}
