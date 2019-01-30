<?php
if(YII_DEV){
$params = [
    'website_id' => 37,
    'ZONGHE' => 391,
    'XINWEN' => 397,
    'VIDEO' => 398,
    'GONGGAO' => 396,
    'HUODONG' => 395,
    'GONGLUE' => 394,
    'MEITI' => 394,
    'YINGHUA' => 390,
    'FENGYUN' => 392,
    'TEAM' => 387,
    'JUESE' => 386,
    'JANGJUN' => 385,
];
}else{
    $params = [
        'website_id' => 37,
        'ZONGHE' => 387,
        'XINWEN' => 393,
        'VIDEO' => 394,
        'GONGGAO' => 392,
        'HUODONG' => 391,
        'GONGLUE' => 390,
        'MEITI' => 389,
        'YINGHUA' => 390,
        'FENGYUN' => 388,
        'TEAM' => 383,
        'JUESE' => 382,
        'JANGJUN' => 381,
    ];
}
/* $params = array_merge(
		$params,
		require(__DIR__ . '/../../data/cache/cachedData.php')
); */

return $params;