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


class ArticleController extends WapController
{
    //列表页
    public function actionIndex()
    {
        $id = Cms::getGetValue('id', 319);
        return $this->renderPartial('index.html', ['category_id' => $id], $id);
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
        $data['content'] = $this->articleDetail(1);
        return $this->renderPartial('detail.html',$data, 0, Cms::getGetValue('id'));
    }

    /**赛事*/
    public function actionContest(){
        //特色玩法
        $ts_play=$this->getRecommend('new_game_camp');
        $video=$this->getRecommend('kv_video',1);
        $play_img=array();
        if($ts_play){
            foreach ($ts_play as $k=>$kv){
                $re['img']=$kv['thumb'];
                $re['title']=$kv['title'];
                $re['url']=$kv['url'];
                $play_img[]=$re;
            }
        }
//        pr($play_img,1);
        //全部赛事
        $list=$this->getContentArr(\Yii::$app->params['SSYG'],18);
        $re=[];
        $ing=[];
        $end=[];
        if($list){
            foreach($list as $key=>$value){
                $day=1;
                if($value['sub_title'])$day=$value['sub_title'];
                $end_time=$value['created_at']+$day*60*60*24;

                $v['title']=$value['title'];
                $v['img']=$value['thumb'];
                $v['summary']=$value['summary'];
                $v['start_time']=date('Y/m/d',$value['created_at']);
                $v['end_time']=date('Y/m/d',$end_time);
                $v['link_pc']=$value['linkUrl'];
                $v['link_wap']=$value['wapLinkUrl'];

                if($value['created_at']<=time() && $end_time>=time()){
                    $ing[]=$v;
                    $type='ing';
                }elseif($value['created_at']<=time()){
                    $end[]=$v;
                    $type='end';
                }else{
                    $ed[]=$v;
                    $type='ed';
                }
                $v['type']=$type;
                $re[]=$v;
            }
        }
        $data=array(
            'data'=>$re,
            'ing'=>$ing,
            'end'=>$end,
            'video'=>$video,
            'play_img'=>$play_img
        );
        return $this->renderPartial('contest',$data);
    }

}
