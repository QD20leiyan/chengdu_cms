<?php
/**
 * 首页
 *
 * @author Administrator
 *
 */

namespace app\controllers\wap;


use app\controllers\ArmsController;
use app\controllers\CommonController;
use common\Cms;
use common\components\WapController;
use common\models\Category;
use common\models\hero\HeroUser;
use yii\captcha\Captcha;

class SiteController extends WapController
{

    public function actionCover()
    {
        $invite_all=CommonController::actionCount();
        $captcha_img = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'site/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);

        $data=[
            'num'=>$invite_all,
        ];

        $user_code = Cms::getGetValue('code');   //微信扫描二维码
        if ($user_code) {
            $model = HeroUser::find()->where('me_invite_code = :invite_code', [':invite_code' => $user_code])->one();
            if ($model) {
                $start_time = strtotime(date('Y-m-d').' 00:00:00');
                if ($model->updated_at < $start_time || $model->count == 0 ) {
                    $model->count = 1;  //如果是当天第一次邀请人则计数为1
                    $model->num = $model->num+2;    //翻牌次数+2
                    $model->updated_at = time();
                } else if ($model->count == 1){ //每天分享达到2次以上，则翻牌次数不增加
                    $model->count = $model->count+1;    //每天的邀请人数+1
                    $model->num = $model->num+1;    //翻牌次数+1
                }

                $model->save();
            }

            Cms::setSession('invite_code', $user_code);
        }

        $data['kv_video'] = $this->getRecommend('kv_video', 1);    //首页推荐视频
        $data['kv_video'] = $data['kv_video'][0]['url'];
        $data['captcha_img'] =$captcha_img;
        return $this->renderPartial('cover.html',$data);
    }

    public function actionIndex()
    {
        $data = array();
        $data['zx'] = $this->getContentArr(419, 6);    //最新
        $data['xw'] = $this->getContentArr(421, 6);    //新闻
        $data['gg'] = $this->getContentArr(422, 6);    //公告
        $data['hd'] = $this->getContentArr(420, 6);    //活动
        $data['gl'] = $this->getContentArr(423, 6);    //攻略

        $data['wanfa'] = $this->getRecommend('wanfa', 10);
        $data['kv_video'] = $this->getRecommend('kv_video', 1);    //首页推荐视频
        $data['kv_video'] = $data['kv_video'][0]['url'];
        $data['captcha_img'] = Captcha::widget(['name'=>'captcha-img','captchaAction'=>'commonMethod/captcha','imageOptions'=>['id'=>'captcha-img', 'title'=>'换一个', 'style'=>'cursor:pointer;'],'template'=>'{image}']);
        $data['arms']=self::_getArms();
        return $this->renderPartial('index.html', $data);
    }
    //武器展示数据
    public function _getArms(){
        $type=[];
        $ids=array_unique($this->getChildren(447));
        foreach ($ids as $key=>$value){
            $model=Category::find()->where(['id'=>$value])->one();
            $va['title']=($value==447)?'所有武器':$model->name;
            $va['id']=$model->id;
            $type[]=$va;
        }
        $data_info=$this->getContentArr(447);    //最新
        $data=[];
        if($data_info){
            foreach ($data_info as $key=>$value){
                $va['title']=$value['title'];
                $va['sub_title']=$value['sub_title'];
                $va['summary']=$value['summary'];
                $va['content']=ArmsController::parse_skill_arr(($value['content_message']));
                $data[]=$va;
            }
        }
        $info=[
            'type'=>$type,
            'data'=>$data,
        ];
        return $info;
    }
    public function actionError()
    {
        return $this->render('error');
    }


}
