<?php
if(YII_DEV){
    $params = [
        'website_id' => 57,
        'ZUIXIN'=>404,
        'XINWEN'=>405,
        'GONGLUE'=>406,
        'VIDEO_COVER'=>407,
    ];
}else{
    $params = [
        'website_id' => 57,
        'ZUIXIN'=>410,
        'XINWEN'=>411,
        'GONGLUE'=>412,
        'VIDEO_COVER'=>413,
    ];
}
/* $params = array_merge(
		$params,
		require(__DIR__ . '/../../data/cache/cachedData.php')
); */

return $params;