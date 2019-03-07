<?php

/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/4/24
 * Time: 17:40
 */
class ImageServiceHandle
{
    const URL = 'http://imgapi.yingxiong.com'; //192.168.101.193 www.imageservice.com
    const APP = 'yxschool';
    const SECRET = 'a857fc54697d9550f11e1eb9b0ce6545';
    const FILE_LIST = '/interface/filelist';
    const FILE_DELETE = '/interface/delete';
    const FILE_UPLOAD = '/interface/uploadFile';
    const UPLOAD_TYPE_IMAGE = 'image';
    const UPLOAD_TYPE_FILE = 'file';
    const UPLOAD_TYPE_VIDEO = 'video';
    const UPLOAD_TYPE_MP3 = 'mp3';


    public static function fileList($start, $pageSize = 15,$type='')
    {
        $codeArray = self::_setCode();
        $params = array(
            'type'=>$type,
            'app' => self::APP,
            'code' => self::authcode(json_encode($codeArray), 'ENCODE', self::SECRET),
            'start' => $start,
            'pageSize' => $pageSize,
            'datetime'=>$codeArray['datetime']);
        $uri = http_build_query($params);
        $url = self::URL . self::FILE_LIST . '?' . $uri;
        $result = self::sendHttpRequest($url);
        $data = $result['content'] ? json_encode($result['content']) : '';
        if(isset($data['data'])){
            return $data;
        }else{
            return array();
        }
    }

    public static function fileDelete($id)
    {
        $codeArray = self::_setCode();
        $params = array(
            'app' => self::APP,
            'code' => self::authcode(json_encode($codeArray), 'ENCODE', self::SECRET),
            'datetime' => $codeArray['datetime']);
        $uri = http_build_query($params);
        $url = self::URL . self::FILE_DELETE . '?' . $uri;
        $data = array('id' => $id);
        $result = self::sendHttpRequest($url, $data, 'POST');
        return $result['content'] ? json_encode($result['content']) : '';
    }

    public static function uploadUrl($thumb = array())
    {
        $thumbs = array();
        $codeArray = self::_setCode();
        if ($thumb) {
            foreach ($thumb as $t) {
                $thumbs[] = array('width' => $t['width'], 'height' => $t['height']);
            }
        }
        $codeArray['thumb'] = $thumbs;
        $params = array(
            'app' => self::APP,
            'code' => self::authcode(json_encode($codeArray), 'ENCODE', self::SECRET),
            'datetime' => $codeArray['datetime']);
        $uri = http_build_query($params);
        return self::URL . self::FILE_UPLOAD . '?'.$uri;
    }

    /**
     * 加密串解密前数组封装
     * @return array
     */
    private static function _setCode()
    {
        return array('sign' => self::_setSign(), 'datetime' => time());
    }

    /**
     * 签名
     * @return string
     */
    private static function _setSign()
    {
        return md5(self::APP . self::SECRET);
    }

    /**
     * 发送HTTP请求
     */
    private static function sendHttpRequest($url, $params = array(), $method = 'GET', $header = array(), $timeout = 5)
    {
        if (function_exists('curl_init')) {
            $ch = curl_init();
            if ($method == 'GET') {
                if (strpos($url, '?')) $url .= '&' . http_build_query($params);
                else $url .= '?' . http_build_query($params);

                curl_setopt($ch, CURLOPT_URL, $url);
            } elseif ($method == 'POST') {
                $post_data = is_array($params) ? http_build_query($params) : $params;
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
                curl_setopt($ch, CURLOPT_POST, true);
            }

            //https不验证证书
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            if (!empty($header)) {
                //curl_setopt($ch, CURLOPT_NOBODY,FALSE);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
                curl_setopt($ch, CURLINFO_HEADER_OUT, TRUE);
            }
            if ($timeout) curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
            $content = curl_exec($ch);
            $info = curl_getinfo($ch);
            $errors = curl_error($ch);

            return array('content' => $content, 'info' => $info, 'error' => $errors);
        } else {
            $data_string = http_build_query($params);
            $context = array(
                'http' => array('method' => $method,
                    'header' => 'Content-type: application/x-www-form-urlencoded' . "\r\n" .
                        'Content-length: ' . strlen($data_string),
                    'content' => $data_string)
            );
            $contextid = stream_context_create($context);
            $sock = fopen($url, 'r', false, $contextid);
            if ($sock) {
                $result = '';
                while (!feof($sock)) $result .= fgets($sock, 4096);
                fclose($sock);
            }
            return array('content' => $result);
        }
    }

    /**
     * 加密解密函数
     * @param $string
     * @param string $operation
     * @param string $key
     * @param int $expiry
     * @return string
     */
    private static function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0)
    {
        $codeKey = '4f6647577904fab5614dbf7385d1b0ed';
        $ckey_length = 4;
        $key = md5($key ? $key : $codeKey);
        $keya = md5(substr($key, 0, 16));
        $keyb = md5(substr($key, 16, 16));
        $string = $operation == 'DECODE' ? str_replace('_', '+', $string) : $string;
        $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length) : substr(md5(microtime()), -$ckey_length)) : '';

        $cryptkey = $keya . md5($keya . $keyc);
        $key_length = strlen($cryptkey);

        $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0) . substr(md5($string . $keyb), 0, 16) . $string;
        $string_length = strlen($string);

        $result = '';
        $box = range(0, 255);

        $rndkey = array();
        for ($i = 0; $i <= 255; $i++) {
            $rndkey[$i] = ord($cryptkey[$i % $key_length]);
        }

        for ($j = $i = 0; $i < 256; $i++) {
            $j = ($j + $box[$i] + $rndkey[$i]) % 256;
            $tmp = $box[$i];
            $box[$i] = $box[$j];
            $box[$j] = $tmp;
        }

        for ($a = $j = $i = 0; $i < $string_length; $i++) {
            $a = ($a + 1) % 256;
            $j = ($j + $box[$a]) % 256;
            $tmp = $box[$a];
            $box[$a] = $box[$j];
            $box[$j] = $tmp;
            $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
        }

        if ($operation == 'DECODE') {
            if ((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26) . $keyb), 0, 16)) {
                return substr($result, 26);
            } else {
                return '';
            }
        } else {
            return $keyc . str_replace(array('=', '+'), array('', '_'), base64_encode($result));
        }
    }
}