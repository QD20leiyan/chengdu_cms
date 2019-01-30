<?php
if(YII_DEV) {
    $params = [
        'website_id' => 63,
        'ZUIXIN' => 409,
        'XINWEN' => 410,
        'GONGLUE' => 411,
        'VIDEO_COVER' => 412,

    ];
}else{
    $params = [
        'website_id' => 63,
        'ZUIXIN' => 415,
        'XINWEN' => 416,
        'GONGLUE' => 417,
        'VIDEO_COVER' => 418,

    ];
}
/* $params = array_merge(
		$params,
		require(__DIR__ . '/../../data/cache/cachedData.php')
); */

return $params;