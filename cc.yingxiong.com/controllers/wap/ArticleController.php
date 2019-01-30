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
use yii\captcha\Captcha;
use yii\data\ActiveDataProvider;
use yii\helpers\Json;


class ArticleController extends WapController
{

    //列表页
    public function actionIndex()
    {
        $captcha_img=Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

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
                    $categoryId = null;
            }
        }else{
            switch ($type){
                case 'xinwen' :
                    $categoryId = Cms::getGetValue('cid',92);
                    break;
                case 'gg' ://公告
                    $categoryId = Cms::getGetValue('cid',116);
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

                case 'faq' :
                    $categoryId = Cms::getGetValue('cid',90);
                    break;
                case 'zhanzheng' :
                    $categoryId = Cms::getGetValue('cid',91);
                    break;
                default:
                    $categoryId = null;
            }
        }
        if(in_array($categoryId,array(56,319,216,218,318))){
            $stype='gonglue';
            $banner = $this->getRecommend('wap_gonglue');    //首页banner
        }else{
            $stype='xinwen';
            $banner = $this->getRecommend('wap_xinwen');    //首页banner
        }
//        if($stype=='gonglue'){
//            $categoryId = Cms::getGetValue('cid',\Yii::$app->params['XSGL_GL']);
//        }else{
//            $categoryId = Cms::getGetValue('cid',\Yii::$app->params['REMEN']);
//        }
        if(Cms::getSession('language') == 'zh_cn') {
            $list = self::ajaxGetNews($categoryId, 11);
            $lists = array();
            if (isset($list['msg'])) {
                foreach ($list['msg'] as $key => $value) {
                    $arr = array(
                        'title' => $value['title'],
                        'linkUrl' => $value['wapLinkUrl'],
                        'time' => $value['created_at'],
                    );
                    $lists[] = $arr;
                }
            }
            $data['data'] = $lists;
            $data['type'] = $type;
            $data['banner'] = $banner;
            $data['stype'] = $stype;
            $testType = Cms::getGetValue('testType', 0);
            return $this->renderPartial('list.html',['data'=>$data,'captcha_img'=>$captcha_img,'language'=>Cms::getSession('language')], $categoryId);
        }else{
            $list = self::ajaxGetNews($categoryId,11);
            $data=array();
            if(isset($list['msg'])){
                foreach ($list['msg'] as $key=>$value){
                    $arr=array(
                        'title'=>$value['title'],
                        'linkUrl'=>$value['wapLinkUrl'],
                        'time'=>$value['created_at'],
                    );
                    $data[]=$arr;
                }
            }
            return $this->renderPartial('list_en.html',['data'=>$data,'language'=>Cms::getSession('language')], $categoryId);
        }
    }
    //列表ajax
    public function actionAjaxList(){
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
                    $categoryId = null;
            }
        }else{
            switch ($type){
                case 'xinwen' :
                    $categoryId = Cms::getGetValue('cid',92);
                    break;
                case 'gonglue' ://新闻类别
                    $categoryId = Cms::getGetValue('cid',215);
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
                    $categoryId = null;
            }
        }
        $data = self::ajaxGetNews($categoryId,11);
        echo Json::encode($data);
        exit;
    }
    //列表ajax
    public function actionAjax()
    {
        $type = Cms::getGetValue('type');
        if (Cms::getSession('language') == 'zh_cn') {//中文
            switch ($type) {
                case 'xinwen' ://新闻类别
                    $categoryId = Cms::getGetValue('cid', 63);
                    break;
                case 'gonglue' ://新闻类别
                    $categoryId = Cms::getGetValue('cid', 214);
                    break;
                case 'gg' ://公告
                    $categoryId = Cms::getGetValue('cid', 115);
                    break;
                case 'faq' :
                    $categoryId = Cms::getGetValue('cid', 56);
                    break;
                case 'zhanzheng' :
                    $categoryId = Cms::getGetValue('cid', 57);
                    break;
                default:
                    $categoryId = null;
            }
        } else {
            switch ($type) {
                case 'xinwen' :
                    $categoryId = Cms::getGetValue('cid', 92);
                    break;
                case 'gonglue' ://新闻类别
                    $categoryId = Cms::getGetValue('cid', 215);
                    break;
                case 'gg' ://公告
                    $categoryId = Cms::getGetValue('cid', 116);
                    break;
                case 'faq' :
                    $categoryId = Cms::getGetValue('cid', 90);
                    break;
                case 'zhanzheng' :
                    $categoryId = Cms::getGetValue('cid', 91);
                    break;
                default:
                    $categoryId = null;
            }
            $data = self::ajaxGetNews($categoryId, 11);
            echo Json::encode($data);
            exit;
        }
    }

    //详情页
    public function actionDetail()
    {
        $captcha_img=Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $id = Cms::getGetValue('id');
        $content = $this->getContentDetail($id);

        if (!$content) {
            $content == array();
        } else if (!key_exists('body', $content)) {
            $content = array_merge($content, array('body' => ''));
        }
        $data = [
            'data' => $content,
            'captcha_img' => $captcha_img,
            'language'=>Cms::getSession('language'),
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1) {
            pr($data, 1);
        }
        if(Cms::getSession('language') == 'zh_cn'){
            return $this->render('detail.html', $data,0,$id);

        }else{
            return $this->render('detail_en.html', $data,0,$id);
        }
    }
    //前端查看列表数据
    public function actionTest($type1 = '', $type= '')
    {
        if (!$type1) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type1;
        $id = Cms::getGetValue('type1', 0);
        if ($id) {
            $this->$action($type1);
        } else {
            $this->$action();
        }
    }

    //前端查看详情数据
    public function actionTest1($type = '', $id= '')
    {
        if (!$type) {
            echo '不存在';exit;
        }
        $_GET['testType'] = 1;
        $action = 'action'.$type;
        $id = Cms::getGetValue('id', 0);
        if ($id) {
            $this->$action($id);
        } else {
            $this->$action();
        }
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
        ];
        if ($testType == 1){
            pr($data, 1);
        }
        return $this->renderPartial('datum.html',$data,Yii::$app->params['TRIBE']);
    }

    //兵种展示
    public function actionArmy(){
        $type=Cms::getGetValue('type','');//筛选条件
        switch ($type){
            case 'rz':
                $category_id=Yii::$app->params['RENZHU'];break;
            case 'sz':
                $category_id=Yii::$app->params['SHENZHU'];break;
            case 'yz':
                $category_id=Yii::$app->params['YAOZHU'];break;
            default:
                $category_id=Yii::$app->params['ZHONGZHU'];break;
        }
        $armies = self::ajaxGetNews($category_id,9);
        $data = [];
        if ($armies['msg']) {
            foreach ($armies['msg'] as $key => $value) {
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
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        if(\Yii::$app->request->isAjax){
            echo json_encode($data);exit;
        }
        return $this->renderPartial('army.html',$data,Yii::$app->params['ZHONGZHU']);
    }
    //兵种ajax 分页
    public function actionAjaxArmy(){
        $type=Cms::getGetValue('type','all');//筛选条件
        switch ($type){
            case 'rz':
                $category_id=Yii::$app->params['RENZHU'];break;
            case 'sz':
                $category_id=Yii::$app->params['SHENZHU'];break;
            case 'yz':
                $category_id=Yii::$app->params['YAOZHU'];break;
            default:
                $category_id=Yii::$app->params['ZHONGZHU'];break;
        }
        $armies = self::ajaxGetNews($category_id,9);
        $data = [];
        $status=1;
        if ($armies['msg']) {
            foreach ($armies['msg'] as $key => $value) {
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
                $army['wapLinkUrl'] = '/m/armydetail/' . $stype . '/' . $value['id'];
                $data[] = $army;
            }
            $status=0;
        }
        $data=[
            'status'=>$status,
            'data'=>$data,
            'type'=>$type,
        ];
        $testType = Cms::getGetValue('testType', 0);
        if ($testType == 1){
            pr($data, 1);
        }
        echo json_encode($data);exit;
    }

    //兵种详情介绍
    public function actionArmyDetail(){
        $id=Cms::getGetValue('id');
        $type=Cms::getGetValue('type');
        if($id){
            $info=$this->getContentDetail($id);
            $info_= $this->parse_army_arr($info['body'],10);
            $info_['title']=$info['title'];
            $info_['thumb']=$info['thumb'];
            $data=[
                'data'=>$info_,
                'type'=>$type,
            ];
        }else{
            $data=[
                'data'=>'',
                'type'=>'',
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
        $grade=Cms::getGetValue('grade',7);//符文等级
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
        $list = $content->getContentLists($category_ids, 200,array('summary'=>$grade));
        $datas=[];
        if(!empty($list['data'])){
            foreach ($list['data'] as $key=>$value){
                $re=[
                    'id'=>$value['id'],
                    'title'=>$value['title'],
                    'thumb'=>$value['thumb'],
                    'type'=>$this->rune_type($value['category_id']),
                    'grade'=>$value['summary'],
                    'body'=>$value['contentMessage'],
                    'attribute'=>$this->parse_rune_arr($value['contentMessage']),
                ];
                $datas[]=$re;
            }
        }
        $testType = Cms::getGetValue('testType', 0);
        $data=[
            'data'=>$datas,
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

    //技能页面数据方法
    private function parse_skill_arr($content,$flag='') {
        $data=[];
        if($content){
            $thumb=strip_tags($content['thumb']);
            $title=strip_tags($content['title']);
            $re=explode(',',strip_tags($content['summary']));
            $price=isset($re[0])?$re[0]:'';
            $time=isset($re[1])?$re[1]:'';

            $peg = '/\[info](.*)\[video_img](.*)\[video](.*)/i';
            $info='';
            $video_img='';
            $video='';
            preg_match($peg,strip_tags($content['content_message']),$result);
//            pr($content,1);
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
//            pr($peg,1);
            preg_match($peg,$body,$result);
            unset($result[0]);
            foreach ($result as $key=>$value){
                if($key%2!==0){
                    if($value=='label'){//标签属性ID数组
                        $data[$value]=explode(',',$result[$key+1]);
                    } elseif($value=='images_'){//取出不同的兵类图片集
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
        $pre='/([\-|\+][\d+\.]+)/i';
        preg_match_all($pre,$content,$re);
        if($re && isset($re[1])){
            foreach ($re[1] as $key=>$value){
                if(count($re[1])==1){
                    $arr=$value;
                }else{
//                    var_dump($value);
                    $arr.=$value.',';
                }
            }
        }
        return $arr;
    }

}
