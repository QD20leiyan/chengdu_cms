<?php 
//作为接口传输的时候认证的密钥
$valid_token = 'd49dea762267687eb2ca59498ce865';
//调用接口被允许的ip地址
$valid_ip = array('127.0.0.1','10.17.10.175','112.112.112.112','182.150.57.57', '182.150.27.61','182.149.164.82','110.185.214.207','14.196.93.177','182.149.165.249','118.113.201.52');
$client_token = $_GET['token'];
$client_ip = $_SERVER['REMOTE_ADDR'];
$fs = fopen('./auto_hook.log', 'a');
fwrite($fs, 'Request on ['.date("Y-m-d H:i:s").'] from ['.$client_ip.']'.PHP_EOL);
if ($client_token !== $valid_token)
{
    echo "error 10001";
    fwrite($fs, "Invalid token [{$client_token}]".PHP_EOL);
    exit(0);
}
if ( ! in_array($client_ip, $valid_ip))
{
    echo "error 10002";
    fwrite($fs, "Invalid ip [{$client_ip}]".PHP_EOL);
    exit(0);
}
$json = file_get_contents('php://input');
$data = json_decode($json, true);
fwrite($fs, 'Data: '.print_r($data, true).PHP_EOL);
fwrite($fs, '======================================================================='.PHP_EOL);
$fs and fclose($fs);
//这里也可以执行自定义的脚本文件update.sh，脚本内容可以自己定义。
//exec("/bin/sh /root/updategit.sh");

$res = system("cd  /data/wwwroot/dev.static.yingxiong.com/web/dev; /usr/bin/git fetch --all;/usr/bin/git reset --hard origin/master 2>&1");
var_dump($res);
echo "\n<br/>";

?>
