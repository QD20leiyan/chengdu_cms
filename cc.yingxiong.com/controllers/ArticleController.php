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
use common\models\CategoryType;
use common\models\Content;
use Symfony\Component\OptionsResolver\Exception\AccessException;
use Yii;
use common\Cms;
use yii\data\ActiveDataProvider;
use yii\widgets\LinkPager;


class ArticleController extends PcController
{

    /**新闻中心
     * @return string
     */
//    public function actionNews(){
//        if(\Yii::$app->language == 'zh_cn'){
//            $categoryId = Cms::getGetValue('cid',63);
//        }else{
//            $categoryId = Cms::getGetValue('cid',92);
//        }
//        $content = new Content();
//        $category_ids = self::getChildren($categoryId);
//        $list = $content->getContentLists($category_ids, 6);
//        $page = LinkPager::widget([
//            'pagination' => $list['page'],
//            'hideOnSinglePage' => false,
//            'firstPageLabel' => '首页',
//            'lastPageLabel' => '尾页',
//            'options' => ['class' => 'page'],
//            'nextPageLabel' => '下一页',
//            'prevPageLabel' => '上一页',
//            'maxButtonCount' => 7
//        ]);
//        $data = [
//            'data' => $list['data'],
//            'page' => $page,
//            'language'=>Yii::$app->language,
//        ];
//        $testType = Cms::getGetValue('testType', 0);
//        if ($testType == 1) {
//            pr($data, 1);
//        }
//
//        return $this->render('news.html', $data);
//    }



    public function actionIndex()
    {
        $data = $this->_list();
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            $data = $this->_list();
            pr($data, 1);
        }
        if(Cms::getSession('language') == 'zh_cn'){
            return $this->renderPartial('list.html', $data, $data['categoryId']);
        }else{
            return $this->renderPartial('list_en.html', $data, $data['categoryId']);
        }
    }

    public function actionAjaxList()
    {
        $data = $this->_list();
        $html = $this->renderPartial('ajax_list.html', $data);
        $this->ajaxOutPut(['status' => 0, 'msg' => $html]);
    }

    public function _list()
    {
        $type=Cms::getGetValue('type');
        if(Cms::getSession('language') == 'zh_cn'){//中文
            switch ($type){
                case 'remen' ://热门
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['REMEN']);
                    break;
                case 'xinwen' ://新闻
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XINWEN']);
                    break;
                case 'gg' ://公告
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['GONGGAO']);
                    break;
                case 'huodong' ://活动
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['HUODONG']);
                    break;
                case 'meiti' ://媒体
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['MEITI']);
                    break;

                case 'xsgl' ://新手攻略
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XSGL_GL']);
                    break;
                case 'jjgl' ://进阶攻略
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['JJGL_GL']);
                    break;
                case 'faq' ://FAQ问答
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['FAQ_GL']);
                    break;
                case 'trgs' ://同人故事
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['TRGS_GL']);
                    break;

                case 'zhanzheng' :
                    $categoryId = Cms::getGetValue('cid',\Yii::$app->params['ZHANZHENG']);
                    break;
                default:
                    $categoryId =null;
            }
        }else{
            switch ($type){
                case 'xinwen' :
                    $categoryId = Cms::getGetValue('cid',92);
                    break;

                case 'gonglue' ://游戏攻略
                    $categoryId = Cms::getGetValue('cid',215);
                    break;
                case 'xsgl' ://新手攻略
                    $categoryId = Cms::getGetValue('cid',217);
                    break;
                case 'jjgl' ://进阶攻略
                    $categoryId = Cms::getGetValue('cid',219);
                    break;

                case 'gg' ://公告
                    $categoryId = Cms::getGetValue('cid',116);
                    break;
                case 'faq' :
                    $categoryId = Cms::getGetValue('cid',90);
                    break;
                case 'zhanzheng' :
                    $categoryId = Cms::getGetValue('cid',91);
                    break;
                default:
                    exit('该网页找不到');
            }
        }
        if(in_array($categoryId,array(56,319,216,218,318))){
            $stype='gonglue';
            $right_list=$this->getContentArr(\Yii::$app->params['XINWEN'], 5);
            $banner = $this->getRecommend('pc_gonglue');    //首页banner
        }else{
            $stype='xinwen';
            $right_list=$this->getContentArr(\Yii::$app->params['XSGL_GL'], 5);
            $banner = $this->getRecommend('pc_xinwen');    //首页banner
        }
//        $stype=$this->actionStype($categoryId);
        $content = new Content();
        $category_ids = self::getChildren($categoryId);
        $list = $content->getContentLists($category_ids, 10);
        if(!empty($list['data'])){
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
                'banner' => $banner,
                'page' => $page,
                'language'=>Cms::getSession('language'),
                'style'=>$stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
                'tag'=>1,//方便前端识别页面
                'version'=>VERSION,
                'type'=>$type,
                'right_list'=>$right_list,
            ];
        }else{
            $data=[
                'language'=> Cms::getSession('language'),
                'style'=> $stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
                'tag'=> 1,//方便前端识别页面
                'data' => [],
                'version'=>VERSION,
                'right_list'=>$right_list,
                'type'=>$type,
                'banner' => $banner,
            ];
        }
        $data['categoryId'] = $categoryId;
        return $data;
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
        if(in_array($content['category_id'],array(56,319,216,218,318))){
            $type='gonglue';
            $right_list=$this->getContentArr(\Yii::$app->params['XSGL_GL'], 5);
            $banner = $this->getRecommend('pc_gonglue');    //首页banner
        }else{
            $type='xinwen';
            $right_list=$this->getContentArr(\Yii::$app->params['XINWEN'], 5);
            $banner = $this->getRecommend('pc_xinwen');    //首页banner
        }
        $stype=$this->actionStype($content['category_id']);
        $data = [
            'right_list'=>$right_list,
            'data' => $content,
            'banner' => $banner,
            'language'=>Cms::getSession('language'),
            'style'=>$stype,//方便前端选中 头部导航栏 某一个栏目 如:新闻资讯
            'type'=>$type,
            'tag'=>'detail',//方便前端识别本页面是详情页
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        if(Cms::getSession('language') == 'zh_cn'){
            return $this->renderPartial('detail.html', $data, 0, $id);

        }else{
            return $this->renderPartial('detail_en.html', $data, 0, $id);
        }
    }


    private function actionStype($categoryId){
        if($categoryId == \Yii::$app->params['FAQ_GL'] || $categoryId == 90){
            $stype='faq';
        }elseif ($categoryId == 57|| $categoryId == 91){
            $stype='zhanzheng';
        }else if ($categoryId == \Yii::$app->params['REMEN']) {
            $stype='remen';
        }elseif ($categoryId == 63|| $categoryId == 92 || $categoryId == 115|| $categoryId == 116){
            $stype='xinwen';
        }elseif ($categoryId == \Yii::$app->params['GONGGAO']||$categoryId == 116){
            $stype='gonggao';
        }else if ($categoryId == \Yii::$app->params['MEITI']) {
            $stype='meiti';
        }else if ($categoryId == \Yii::$app->params['HUODONG']) {
            $stype='huodong';
        }else if ($categoryId == \Yii::$app->params['XSGL_GL']|| $categoryId == 217) {
            $stype='xsgl';
        }  else if ($categoryId == \Yii::$app->params['TRGS_GL']) {
            $stype='trgs';
        } else if ($categoryId == \Yii::$app->params['JJGL_GL']|| $categoryId == 219) {
            $stype='jjgl';
        }else if ($categoryId == 115|| $categoryId == 116) {
            $stype='gg';
        }
        return $stype;
    }


    /**********************************************************资料库**************************************************************/

    //技能展示
    public function actionDatum(){
        $datas= $content=$this->getContentArr(Yii::$app->params['TRIBE']);
        $data['rz']=[];
        $data['sz']=[];
        $data['yz']=[];
        foreach ($datas as $key=>$value){
            //人族技能
            if($value['parent_id']==\Yii::$app->params['R_TRIBE']){
                if($value['category_id']==\Yii::$app->params['R_TFJN']){        //天赋技能
                    $rz_info=$this->parse_skill_arr($value);
                    $data['rz']['tfjn'][]=$rz_info;
                }if($value['category_id']==\Yii::$app->params['R_ZHGJN']){       //指挥官技能
                    $rz_info=$this->parse_skill_arr($value);
                    $data['rz']['zhgjn'][]=$rz_info;
                }
            }
            //神族
            if($value['parent_id']==Yii::$app->params['S_TRIBE']){
                if($value['category_id']==Yii::$app->params['S_TFJN']){
                    $rz_info=$this->parse_skill_arr($value);
                    $data['sz']['tfjn'][]=$rz_info;
                }if($value['category_id']==Yii::$app->params['S_ZHGJN']){
                    $rz_info=$this->parse_skill_arr($value);
                    $data['sz']['zhgjn'][]=$rz_info;
                }
            }
            if($value['parent_id']==Yii::$app->params['Y_TRIBE']){
                if($value['category_id']==Yii::$app->params['Y_TFJN']){
                    $rz_info=$this->parse_skill_arr($value);
                    $data['yz']['tfjn'][]=$rz_info;
                }if($value['category_id']==Yii::$app->params['Y_ZHGJN']){
                    $rz_info=$this->parse_skill_arr($value);
                    $data['yz']['zhgjn'][]=$rz_info;
                }
            }
        }
        $testType = Cms::getGetValue('testType', 0);

        $data=[
            'data'=>$data,
            'style'=>'zlk',
        ];
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('datum.html',$data,Yii::$app->params['TRIBE']);
    }

    //兵种展示
    public function actionArmy(){
        /* 111111： 第一位 种族类型 二位 兵种类型 三位 攻击类型 四位 兵种特性 五位 特殊效果 六位 攻击范围*/
        $type=Cms::getGetValue('type','111111');//筛选条件

        if($type!=='111111') {//有筛选条件
            $arr = str_split($type);
            $str = [];
            foreach ($arr as $key => $value) {
                if ($key == 0) {
                    switch ($value) {
                        case '2':
                            $r = '[zzxz]rz';
                            break;
                        case '3':
                            $r = '[zzxz]sz';
                            break;
                        case '4':
                            $r = '[zzxz]yz';
                            break;
                        default:
                            $r = '';
                            break;
                    }
                    $str[]= $r;
                } elseif ($key == 1) {
                    switch ($value) {
                        case '2':
                            $r = '[bzlx]qp';
                            break;
                        case '3':
                            $r = '[bzlx]fz';
                            break;
                        case '4':
                            $r = '[bzlx]sc';
                            break;
                        default:
                            $r = '';
                            break;
                    }
                    $str[]= $r;
                } elseif ($key == 2) {
                    switch ($value) {
                        case '2':
                            $r = '[gjlx]jz';
                            break;
                        case '3':
                            $r = '[gjlx]yc';
                            break;
                        default:
                            $r = '';
                            break;
                    }
                    $str[]= $r;
                } elseif ($key == 3) {
                    switch ($value) {
                        case '2':
                            $r = '[bztx]jx';
                            break;
                        case '3':
                            $r = '[bztx]sw';
                            break;
                        default:
                            $r = '';
                            break;
                    }
                    $str[]= $r;
                } elseif ($key == 4) {
                    switch ($value) {
                        case '2':
                            $r = '[tsxg]ys';
                            break;
                        case '3':
                            $r = '[tsxg]fy';
                            break;
                        case '4':
                            $r = '[tsxg]ysfy';
                            break;
                        default:
                            $r = '';
                            break;
                    }
                    $str[]=$r;
                } elseif ($key == 5) {
                    switch ($value) {
                        case '2':
                            $r = '[gjfw]dk';
                            break;
                        case '3':
                            $r = '[gjfw]dd';
                            break;
                        case '4':
                            $r = '[gjfw]dkjg';
                            break;
                        default:
                            $r = '';
                            break;
                    }
                    $str[]= $r;
                }
            }
            $arr=array_filter($str);
            $query = Content::find()->where(['like','summary',$arr])->orderBy(['sort' => SORT_DESC,'created_at'=>SORT_DESC]);
            $armie = new ActiveDataProvider([
                'query' => $query,
                'pagination' => [
                    'pageSize' => 21,
                ],
            ]);
            $armies=$armie->getModels();
            $page = LinkPager::widget([
                'pagination' => $armie->pagination,
                'hideOnSinglePage' => false,
                'firstPageLabel' => '首页',
                'lastPageLabel' => '尾页',
                'options' => ['class' => 'page'],
                'nextPageLabel' => '下一页',
                'prevPageLabel' => '上一页',
                'maxButtonCount' => 7
            ]);
        }else{//全部条件
            $content = new Content();
            $category_ids = self::getChildren(Yii::$app->params['ZHONGZHU']);
            $armie = $content->getContentLists($category_ids, 21);
            if($armie['page']) {
                $page = LinkPager::widget([
                    'pagination' => $armie['page'],
                    'hideOnSinglePage' => false,
                    'firstPageLabel' => '首页',
                    'lastPageLabel' => '尾页',
                    'options' => ['class' => 'page'],
                    'nextPageLabel' => '下一页',
                    'prevPageLabel' => '上一页',
                    'maxButtonCount' => 7
                ]);
            }else{
                $page='';
            }
            $armies=$armie['data'];
        }
        $data = [];
        if ($armies) {
            foreach ($armies as $key => $value) {
                if ($value['category_id'] == \Yii::$app->params['RENZHU']) {
                    $stype = 'rz';
                } elseif ($value['category_id'] == \Yii::$app->params['SHENZHU']) {
                    $stype = 'sz';
                } elseif ($value['category_id'] == \Yii::$app->params['YAOZHU']) {
                    $stype = 'yz';
                } else {
                    $stype = 'all';
                }
                $army['id'] = $value['id'];
                $army['title'] = $value['title'];
                $army['thumb'] = $value['thumb'];
                $army['linkUrl'] = '/armydetail/' . $stype . '/' . $value['id'];
                $army['wapLinkUrl'] = 'm/armydetail/' . $stype . '/' . $value['id'];
                $data[] = $army;
            }
        }

        $data=[
            'data'=>$data,
            'page'=>$page,
            'style'=>'zlk',
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        if(Yii::$app->request->isAjax){
            echo json_encode($data);exit;
        }
        return $this->renderPartial('army.html',$data,Yii::$app->params['ZHONGZHU']);
    }
    //兵种详情介绍
    public function actionArmyDetail(){
        $id=Cms::getGetValue('id');
        $type=Cms::getGetValue('type');
        switch ($type){
            case 'rz':
                $style = 1;
                break;
            case 'sz':
                $style = 2;
                break;
            case 'yz':
                $style = 3;
                break;
            default:
                $style = 0;
                break;
        }
        if($id){
            $info=$this->getContentDetail($id);
            $info_= $this->parse_army_arr($info['body'],10);
            $info_['title']=$info['title'];
            $info_['thumb']=$info['thumb'];
            $data=[
                'data'=>$info_,
                'type'=>$style,
                'style'=>'zlk',
            ];
        }else{
            $data=[
                'data'=>'',
                'type'=>'',
                'style'=>'zlk',
            ];
        }

        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('army_detail.html',$data,'',$id);
    }

    //符文
    public function actionRune(){
        $type=Cms::getGetValue('type','');//符文类型
        $grade=Cms::getGetValue('grade','');//符文等级
        switch ($type){
            case 1:
                $category_id=Yii::$app->params['RED_RUNE'];break;
            case 2:
                $category_id=Yii::$app->params['BLUE_RUNE'];break;
            case 3:
                $category_id=Yii::$app->params['GREEN_RUNE'];break;
            case 4:
                $category_id=Yii::$app->params['CORE_RUNE'];break;
            default:
                $category_id=Yii::$app->params['ALL_RUNE'];break;
        }
        $category_ids = self::getChildren($category_id);
        $content = new Content();
        if($grade){
            $list = $content->getContentLists($category_ids, 200,array('summary'=>$grade));
        }else{
            $list = $content->getContentLists($category_ids, 200);
        }
        $datas=[];
        if(!empty($list['data'])) {
            foreach ($list['data'] as $key => $value) {
                $re = [
                    'id' => $value['id'],
                    'title' => $value['title'],
                    'thumb' => $value['thumb'],
                    'type' => $this->rune_type($value['category_id']),
                    'grade' => $value['summary'],
                    'body' => $value['contentMessage'],
                    'attribute' => $this->parse_rune_arr($value['contentMessage']),
                ];
                $datas[] = $re;
            }
        }
        $testType = Cms::getGetValue('testType', 0);
        $data=[
            'data'=>$datas,
            'style'=>'zlk',
        ];
        if(\Yii::$app->request->isAjax){
            echo json_encode($data);exit;
        }
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('rune.html',$data,Yii::$app->params['ALL_RUNE']);
    }

    private function rune_type($types){
        $type='';
        if($types){
            switch ($types){
                case Yii::$app->params['RED_RUNE']:
                    $type=1;break;
                case Yii::$app->params['BLUE_RUNE']:
                    $type=2;break;
                case Yii::$app->params['GREEN_RUNE']:
                    $type=3;break;
                case Yii::$app->params['CORE_RUNE']:
                    $type=4;break;
            }
        }
        return $type;
    }

    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }
    //技能页面数据方法
    private function parse_skill_arr($content,$flag='') {
        $data=[];
        if($content){
            $thumb=strip_tags($content['thumb']);
            $title=strip_tags($content['title']);
            $re=explode(',',strip_tags($content['summary']));
            $price=isset($re[0])?$re[0]:'';
            $time=isset($re[1])?$re[1]:'';

            $peg = '/\[info](.*)\[video_img](.*)\[video](.*)/iu';
            $info='';
            $video_img='';
            $video='';
            preg_match($peg,strip_tags($content['content_message']),$result);
//            pr($result,1);
            if(isset($result[1]) && !empty($result[1])){
                $info=$result[1];
            }
            if(isset($result[2])&& !empty($result[2])){
                $video_img=$result[2];
            }
            if(isset($result[3])&& !empty($result[3])){
                $video=strip_tags($result[3]);
            }
            $data=[
                'thumb'=>$thumb,
                'title'=>$title,
                'price'=>$price,
                'time'=>$time,
                'info'=>$info,
                'video_img'=>$video_img,
                'video'=>$video,
            ];
        }
        return $data;
    }
    //兵种详情页面数据方法
    private function parse_army_arr($content,$num){
        $data=[];
        if($content){
            $body=strip_tags($content, ",;\r\n");
            $peg_start="/";
            for($i=0;$i<$num;$i++){
                $peg_start.='\[(\w+)\](.*)';
            }
            $peg=$peg_start.'/i';
            preg_match($peg,$body,$result);
            unset($result[0]);
            foreach ($result as $key=>$value){
                if($key%2!==0){
                    if($value=='images_'){//取出不同的兵类图片集
                        $p= explode('#',$result[$key+1]);
                        if($p){
                            foreach ($p as $kk=>$vk){
                                $re=explode(',',$vk);
                                $soldier['title']=isset($re[0])?$re[0]:'';
                                $soldier['info']=isset($re[1])?$re[1]:'';
                                $soldier['img']=isset($re[2])?$re[2]:'';
                                $data[$result[$key]][]=$soldier;
                            }
                        }
                    } elseif($value=='skill'){//技能介绍
                        $p= explode('#',$result[$key+1]);
                        if(isset($p)){
                            foreach ($p as $sk=>$sv){
                                $re=explode('+',$sv);
                                $skill['title']=isset($re[0])?$re[0]:'';
                                $skill['label']=isset($re[1])?$re[1]:'';
                                $skill['value']=isset($re[2])?$re[2]:'';
                                $skill['info']=isset($re[3])?$re[3]:'';
                                $data[$value][]=$skill;
                            }
                        }
                    }elseif ($value=='way'){//对阵技巧
                        $p= explode('#',$result[$key+1]);
                        if(isset($p)){
                            foreach ($p as $sk=>$sv){
                                $re=explode('+',$sv);
                                $data[$value][]=isset($re)?$re:'';
                            }
                        }
                    }elseif($value=='up_skill'){//升级属性
                        $p= explode('#',$result[$key+1]);
                        if(isset($p)){
                            foreach ($p as $sk=>$sv){
                                $re=explode('+',$sv);
                                $data[$value][]=isset($re)?$re:'';
                            }
                        }
                    }elseif($value=='routine'){//兵种故事
                        $data[$value]=$result[$key+1];
                    }else{
                        $data[$result[$key]]=$result[$key+1];
                    }
                }
            }
        }
        return $data;
    }
    //符文的属性值
    private function parse_rune_arr($content){
        $arr='';
        $pre='/([\-|\+][\d+\.]+[\%|点])/iu';
        preg_match_all($pre,$content,$re);
        if($re && isset($re[1])){
            foreach ($re[1] as $key=>$value){
                if(count($re[1])==1){
                    $arr=$value;
                }else{
                    $arr.=$value.',';
                }
            }
        }
        return $arr;
    }
}
