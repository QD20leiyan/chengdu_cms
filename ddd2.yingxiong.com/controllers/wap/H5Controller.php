<?php
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/6/15
 * Time: 11:09
 */

namespace app\controllers\wap;

use common\Cms;
use common\components\PcController;
use common\helpers\Utils;
use Symfony\Component\Debug\Tests\Fixtures\CaseMismatch;
use yii\helpers\Json;

class H5Controller extends PcController
{
    public function actionIndex()
    {
        $result = Utils::sendHttpRequest('http://119.29.7.131:8111/GetServerListServlet', array(), 'GET');
        $result = json_decode($result['content'], true);
        if ($result['returnCode'] == 1) {
            $server = $result['data'];
        } else {
            $server = array();
        }
        Cms::statData('h5_pv', '弹弹岛2H5页面浏览量');
        return $this->renderPartial('index', [
            'server' => $server,
        ]);
    }

    /**
     * 登录
     */
    public function actionLogin()
    {
        $username = Cms::getPostValue('username');
        $serverName = Cms::getPostValue('serverName');
        if (!$serverName) {
            echo Json::encode(['status' => -1, 'msg' => '服务器不能为空！']);exit;
        }
        if (!$username) {
            echo Json::encode(['status' => -1, 'msg' => '游戏名不能为空！']);exit;
        }
        $params = ['playerName' => $username, 'serverName' => $serverName];
        $result = Utils::sendHttpRequest('http://119.29.7.131:8111/GetPlayerMessServlet?', $params, 'GET');
        $result = json_decode($result['content'], true);
        if ($result['result'] != 1) {
            echo Json::encode(['status' => -1, 'msg' => '角色不存在!']);exit;
        }
        $result['username'] = $username;
        $_SESSION['info'] = $result;
        Cms::statData('h5_login', 'h5页面登录');
        echo Json::encode(['status' => 0]);
        exit;
    }

    public function actionMain()
    {
        if (!key_exists('info', $_SESSION)) {
            return $this->redirect(['wap/h5/index']);
            exit;
        }
        $data = $_SESSION['info'];
        $friend = array();
        for ($i = 0; $i < count($data['friendNumAndName']); $i++) {
            $friend[$i] = ['name' => '', 'num' => 0];
            $tmp = array();
            $name = explode('|', $data['friendNumAndName'][$i], -1);
            $tmp['name'] = $name[0];
            $tmp['num'] = str_replace($tmp['name']."|", '', $data['friendNumAndName'][$i]);
            $friend[$i] = $tmp;
        }
        $sort = array();
        foreach ($friend as $k => $v) {
            $sort[$k] = $v['num'];
        }
        krsort($sort);
        $friendArr = array();
        foreach ($sort as $k => $v) {
            $friendArr[] = $friend[$k];
        }
        $data['friend'] = $friendArr;
        if ($data['marry'] == 1) {
            if ($data['sex'] == 0) {
                $data['man'] = $data['username'];
                $data['girl'] = $data['coupleName'];
            } else {
                $data['man'] = $data['coupleName'];
                $data['girl'] = $data['username'];
            }
        }
        if ($data['loveLevel'] >= 1 && $data['loveLevel'] <= 2) {
            $data['loveName'] = '白银夫妻';
        } else if ($data['loveLevel'] >= 3 && $data['loveLevel'] <= 4) {
            $data['loveName'] = '黄金夫妻';
        } else {
            $data['loveName'] = '铂金夫妻';
        }
        return $this->renderPartial('main', [
            'data' => $data,
        ]);
    }


    public function actionAjaxShare()
    {
        Cms::statData('h5_share', '弹弹岛2H5页面分享');
    }

    public function actionAjaxDownload()
    {
        Cms::statData('h5_download', '弹弹岛2下载功能');
    }
}