<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2018/12/19 0019
 * Time: 17:19
 */

namespace app\controllers\cg;


use backend\modules\newyear\models\H5NewyearMedia;
use backend\modules\newyear\models\H5NewyearMessage;
use backend\modules\newyear\models\H5NewyearPraiseLog;
use common\Cms;
use common\components\H5BaseController;
use common\models\h5\H5UserCenterData;

class YearController extends H5BaseController
{
    const SESSION_MEDIA_ID = 'media_id';
    public $mediaId = 0;

    public function actionIndex()
    {
        $id = Cms::getPostValue('invite_code', '');
        if (!$id) {
            $this->echoJson(7004);
        }
        $id = Cms::authcode($id, 'DECODE');
        $media = H5NewyearMedia::getOneById($id);
        if (!$media) {
            $this->echoJson(7005);
        }
        $data['media'] = $media['media'];
        Cms::setSession(self::SESSION_MEDIA_ID, $media['id']);
        $data['message'] = $this->_getMessage();
        $this->echoJson(0, '', $data);
    }

    /**
     * ajax 获取留言内容
     */
    public function actionGetMessage()
    {
        $this->_checkLogin();
        $_GET['page'] = Cms::getPostValue('page', 1);
        $data = $this->_getMessage();
        $this->echoJson(0, '', $data);
    }

    private function _getMessage()
    {
        $pageSize = 10;
        $model = new H5NewyearMessage();
        $dataProvider = $model->getMessages($pageSize);
        $messages = [];
        $page = Cms::getPostValue('page', 1);

        if ($dataProvider->getModels()) {
            if ($dataProvider->pagination) {
                $pageCount = ceil($dataProvider->pagination->totalCount/$pageSize);
            } else {
                $pageCount = 0;
            }

            if ($page > $pageCount) {
                return [];
            }
            $ids = [];
            foreach ($dataProvider->getModels() as $v) {
                $tmp = [];
                $tmp['id'] = $v['id'];
                $tmp['message'] = $v['message'];
                $tmp['praise_num'] = $v['praise_num'];
                $tmp['created_at'] = date('Y-m-d');
                $userData = H5UserCenterData::getData($this->h5Id, $v['h5_user_center_id']);
                if ($userData) {
                    $tmp['nickname'] = $userData['data']['nickname'];
                    $tmp['headimgurl'] = $userData['data']['headimgurl'];
                }
                $messages[] = $tmp;
                $ids[] = $v['id'];
            }

            $messageData = H5NewyearPraiseLog::getData($this->user['id'], $ids);
            foreach ($messages as &$v) {
                if (isset($messageData[$v['id']])) {
                    $v['is_praise'] = true;
                } else {
                    $v['is_praise'] = false;
                }
            }
        }
        return $messages;
    }

    /**
     * 保存留言
     */
    public function actionSaveMessage()
    {
        $this->_checkLogin();
        $message = Cms::getPostValue('message', '');
        if (!$message) {
            $this->echoJson(7006);
        }
        if (mb_strlen($message) >= 255) {
            $this->echoJson(7009);
        }
        $check = Cms::checkFilterWords($message);
        if ($check['status'] != 0) {
            $this->echoJson(1, $check['msg'].'，敏感词为：'.implode('，', $check['data']));
        }
        H5NewyearMessage::addLog($this->user['id'], $this->mediaId, $message);
        $this->echoJson(0);
    }

    /**
     * 点赞
     */
    public function actionPraise()
    {
        $this->_checkLogin();
        $id = Cms::getPostValue('id');
        if (!$id) {
            $this->echoJson(7007);
        }
        $check = H5NewyearPraiseLog::isPraise($this->user['id'], $id);
        if ($check) {
            $this->echoJson(7010);
        }
        $model = H5NewyearMessage::getOneById($id);
        if (!$model) {
            $this->echoJson(7008);
        }
        $model->praise_num = $model->praise_num + 1;
        $model->save();
        H5NewyearPraiseLog::addLog($this->user['id'], $id);
        $this->echoJson(0, '', $model->praise_num);
    }

    private function _checkLogin()
    {
        $this->mediaId = Cms::getSession(self::SESSION_MEDIA_ID);
        if (!$this->mediaId) {
            $this->echoJson(7005);
        }
        $media = H5NewyearMedia::getOneById($this->mediaId);
        if (!$media) {
            $this->echoJson(7005);
        }
    }
}