<?php
$params = [
    'website_id' => 26,

];
if(YII_DEV){
    $params = [
        'website_id' => 26,
        'RULES_ID'=>2559,
    ];
}else{
    $params = [
        'website_id' => 26,
        'RULES_ID'=>3014,
    ];
}
/* $params = array_merge(
		$params,
		require(__DIR__ . '/../../data/cache/cachedData.php')
); */

return $params;