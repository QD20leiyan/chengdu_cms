<?php
header('Access-Control-Allow-Origin:*');
/**
 * Created by PhpStorm.
 * User: lin.zhou
 * Date: 2017/12/6
 * Time: 14:59
 */
class api
{
    const FILTER = ['.', '..', 'runtime', 'rbac', 'vendor', '.git', '.gitignore', '.idea', 'assets', '.gitkeep', 'yii', 'yii.bat', 'db.php', '.svn'];
    public $cur_dir = '';
    public $path = '';
    public $copy_dir = '/data/wwwroot/dev.static.yingxiong.com/web/dev';
    public $to_dir = '/data/wwwroot/static.yingxiong.com/web';

    public function __construct()
    {
    }

    public function index()
    {
        if (!$_POST['path']) {
            echo json_encode(['status' => -1, 'msg' => '更新目录不能为空！']);exit;
        }
        $tree = $this->recurDir('../'.$_POST['path']);
        if ($tree) {
            array_multisort(array_column($tree, 'time'), SORT_DESC, $tree);
            echo json_encode(['status' => 0, 'msg' => $tree]);exit;
        } else {
            echo json_encode(['status' => -1, 'msg' => '该目录不存在']);exit;
        }
    }



    public function recurDir($pathName, $result = [], $id = 0, $pid = 0)
    {
        //判断传入的变量是否是目录
        if(!is_dir($pathName) || !is_readable($pathName)) {
            return false;
        }
        //取出目录中的文件和子目录名,使用scandir函数
        $allFiles = scandir($pathName);
        //遍历他们
        $children_id = 0;
        $node_id = $id;
        foreach($allFiles as $fileName) {
            $tmp = $fileName;
            //判断是否是.和..因为这两个东西神马也不是。。。
            if(in_array($fileName, array('.', '..'))) {
                continue;
            }
            if (in_array($fileName, self::FILTER)) {
                continue;
            }

            //路径加文件名
            $fullName = $pathName.'/'.$fileName;

            $updatedAt = date('Y-m-d H:i:s', filemtime($fullName));
            if ($updatedAt > date('Y-m-d H:i:s', time()-3600*24)) {
                $iconSkin = 'icon03';
            } else {
                $iconSkin = '';
            }

            //如果是目录的话就继续遍历这个目录
            if(is_dir($fullName)) {
                //将这个目录中的文件信息存入到数组中
                $node_id = ++$node_id;
                $result[$node_id] = [
                    'id' => $node_id,
                    'pId' => $pid,
                    'name' => $tmp.'----('.$updatedAt.')',
                    'dir' => str_replace(['../', './'], '', $fullName),
                    'time' => $updatedAt,
                    'iconSkin' => $iconSkin,
                    'fileName' => $tmp,
                ];
                $result = $this->recurDir($fullName, $result, $node_id.'00', $node_id);
            }else {
                $id = $pid ? $pid.$children_id : 11111+$children_id;
                $result[$id] = [
                    'id' => $id,
                    'pId' => $pid,
                    'name' => $tmp.'----('.$updatedAt.')',
                    'dir' => str_replace(['../', './'], '', $fullName),
                    'time' => $updatedAt,
                    'iconSkin' => $iconSkin,
                    'fileName' => $tmp,
                ];

                $this->updateTime($result, $pid, $updatedAt);
                $children_id++;
            }
        }
        return $result;
    }

    public function updateTime(&$result, $pid, $time)
    {
        if ($pid) {
            $result[$pid]['time'] = $result[$pid]['time'] > $time ? $result[$pid]['time'] : $time;
            $result[$pid]['name'] = $result[$pid]['fileName'].'----('.$result[$pid]['time'].')';

            if ($result[$pid]['time'] > date('Y-m-d H:i:s', time()-3600*24)) {
                $iconSkin = 'icon03';
            } else {
                $iconSkin = '';
            }
            $result[$pid]['iconSkin'] = $iconSkin;
            $this->updateTime($result, $result[$pid]['pId'], $time);
        }

    }

    /**
     * 获取目录
     * @return bool
     */
    public function getDir()
    {
        $pathName = '..';
        //判断传入的变量是否是目录
        if(!is_dir($pathName) || !is_readable($pathName)) {
            return false;
        }

        //取出目录中的文件和子目录名,使用scandir函数
        $allFiles = scandir($pathName);
        $res = [];
        foreach ($allFiles as $v) {
            if (in_array($v, self::FILTER)) {
                continue;
            }
            $res[] = $v;
        }
        echo json_encode(['status' => 0, 'msg' => $res]);exit;
    }

    public function update()
    {
        $this->cur_dir = dirname(dirname(__FILE__));
        $cur_dir_to = str_replace($this->copy_dir, $this->to_dir, $this->cur_dir);
        $dirs = $_POST['dirs'];
        if (!$dirs || !is_array($dirs) || empty($dirs)) {
            echo json_encode(['status' => -1, 'msg' => '更新目录为空！']);
            exit;
        }
        $path = $this->cur_dir;
        $path_to = $cur_dir_to;

//pr($dirs, 1);
        foreach ($dirs as $dir) {
            if (!$dir) {
                continue;
            }

            $dir = str_replace(['../', './'], '', $dir);
            $file = $path."/".trim($dir, '/');

            $file_to = dirname($path_to."/".trim($dir, '/'));

//echo $file."<br/>\n".$file_to;exit;
            if (is_file($file) && file_exists($file)) {

                $res = system("mkdir -p $file_to");
//echo $res;exit;
                if (!$res) {
                    //echo json_encode(['status' => -1, 'msg' => '创建目录'.$file_to.'失败！']);
                    //exit;
                }

//                echo "cp -fR $file $file_to 2>&1";exit;
                $res = system("\\cp -fR $file $file_to 2>&1");
                if ($res) {
                    echo json_encode(['status' => -1, 'msg' => '更新文件'.$file.'失败1！']);
                    exit;
                }
            }
        }

        echo json_encode(['status' => 0, 'msg' => '更新成功！']);
        exit;
    }

}

/**
 * 树状打印数据所有元素
 *
 * @access public
 * @param array $array
 */
function print_rr($array = array()) {
    echo "<div align=\"left\">";
    echo "<pre>";
    print_r($array);
    echo "</pre>";
    echo "</div>";
}

function pr($array = array(),$exit = false,$dump=false){
    if($dump){
        var_dump($array);
    }else{
        print_rr($array);
    }
    if($exit){
        exit;
    }
}

//签名函数
function createSign($params)
{

    ksort($params);
    $sign = '';
    foreach ($params as $k => $v) {
        $sign .= "$k$v";
    }
    unset($k, $v);

    return strtoupper(md5($sign));
}


$api = new api();

//$_POST['action'] = 'index';
//$_POST['dirs'][] = 'czymf/1.0/common/css/common.css';
//
//$params['secret'] = '6d11a2df4adb503af983840640468ebb';
//$params['action'] = $_POST['action'];
//$_POST['sign'] = createSign($params);
//$_POST['path'] = 'czymf';
//测试----//


$action = $_POST['action'];
if (!$action) {
    echo json_encode(['status' => -1, 'msg' => 'action参数不能为空']);exit;
}

if (!$_POST['sign']) {
    echo json_encode(['status' => -1, 'msg' => '秘钥不能为空']);exit;
}

if ($action == 'index') {
    $path = $_POST['path'];
    if (!$path) {
        echo json_encode(['status' => -1, 'msg' => '需要更新的游戏外层目录不能为空！']);exit;
    }
}
$sign = $_POST['sign'];

$params['secret'] = '6d11a2df4adb503af983840640468ebb';
$params['action'] = $_POST['action'];

if ($sign !== createSign($params)) {
    echo json_encode(['status' => -1, 'msg' => '签名不对']);exit;
}


$api->$action();
