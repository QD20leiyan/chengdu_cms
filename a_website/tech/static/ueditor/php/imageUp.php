<?php
    session_start();
    header("Content-Type:text/html;charset=utf-8");
    error_reporting( E_ERROR | E_WARNING );
    date_default_timezone_set("Asia/chongqing");
    include "Uploader.class.php";
    include "./lib/Image.class.php";
    //上传配置
    $config = array(
        "savePath" => "upload/" ,             //存储文件夹
        "maxSize" => 1000 ,                   //允许的文件最大尺寸，单位KB
        "allowFiles" => array( ".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp" )  //允许的文件格式
    );
    //上传文件目录
    $Path = "../../../UeUpload/upload/";
    //背景保存在临时目录中
    $config[ "savePath" ] = $Path;
    $up = new Uploader( "upfile" , $config );
    $type = $_REQUEST['type'];
    $callback=$_GET['callback'];
    $info = $up->getFileInfo();

    //等比例缩率
    if($info['state']=="SUCCESS") {//暂时停用
        $dir = dirname(__FILE__).DIRECTORY_SEPARATOR;
        $thumb_path = $dir.$Path."thumb".DIRECTORY_SEPARATOR.date("Ymd").DIRECTORY_SEPARATOR;
        if ( !file_exists( $thumb_path ) ) {
            if ( !mkdir( $thumb_path , 0777 , true ) ) {
                return false;
            }
        }
        $img = new Image();
        $img->open($dir.$info['url']);
        $width = $img->width();
        $height = $img->height();
        //名字，缩略图
        $thumb_name = $info['name'];
        if($width<=$height) {//截取
            $img->thumb(250,250,3)->save($thumb_path.$thumb_name);
        }else{//放缩
            $img->thumb(250,250)->save($thumb_path.$thumb_name);
        }
        //开始对服务器上传
        $session  = $_SESSION;
        $thumbimgUrl = upserviceurl($thumb_path.$thumb_name);
        $_SESSION['mthumb'].=  $thumbimgUrl."|";
    }
    /**
     * 返回数据
     */
    if($callback) {
        echo '<script>'.$callback.'('.json_encode($info).')</script>';
    } else {
        //开始同步到指定的图片服务器
        $imgUrl = $info['url'];//源文件图片
        //模拟上传图片
        $url = upserviceurl($imgUrl);
        $info['url'] = $url;
        echo json_encode($info);
    }


    //开始模拟上传
    function upserviceurl($path) {
        require_once "ImageServiceHandle.php";
        $url = ImageServiceHandle::uploadUrl();
        $data = array(
            'file'=>new CURLFile(realpath($path))
        );
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true );
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $return_data = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($return_data,true);
        if($result['success']) {
            return $result['cdn_url'];
        } else {
            return "";
        }
    }