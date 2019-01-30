<?php
if(YII_DEV) {
    $params = [
        'website_id' => 35,
        'SSYG' => 408,
    ];
}else{
    $params = [
        'website_id' => 35,
        'SSYG' => 414,
    ];
}
/* $params = array_merge(
		$params,
		require(__DIR__ . '/../../data/cache/cachedData.php')
); */

return $params;