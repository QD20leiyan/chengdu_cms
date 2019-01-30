<?php
if(YII_DEV) {
    $params = [
        'website_id' => 28,
        'QQZL' => 355,//全球战力
        'HZMT' => 356,//合作媒体
        //攻略
        'FAQ_GL' => 56,//FAQ问啊
        'TRGS_GL' => 318,//同人故事
        'XSGL_GL' => 216,//新手攻略
        'JJGL_GL' => 218,//进阶攻略

        //新闻
        'REMEN' => 348,//热门
        'XINWEN' => 63,//新闻
        'GONGGAO' => 115,//公告
        'HUODONG' => 317,//活动
        'MEITI' => 349,//媒体

        //兵种技能
        'TRIBE'=>340,//所有技能
        'R_TRIBE'=>341,//人族
        'R_TFJN'=>374, //天赋
        'R_ZHGJN'=>375,//指挥官
        'S_TRIBE'=>342,//神族
        'S_TFJN'=>376,
        'S_ZHGJN'=>377,
        'Y_TRIBE'=>343,//妖族
        'Y_TFJN'=>378,
        'Y_ZHGJN'=>379,

        //种族
        'ZHONGZHU'=>381,
        'RENZHU'=>382,
        'SHENZHU'=>383,
        'YAOZHU'=>384,

        //视频
        'VIDEO_NEW' => 58,//最新
        'VIDEO_OFF' => 59,//官方视频
        'VIDEO_PLAYER' => 62,//玩家 解说视频
        'VIDEO_JINGCAI' => 60,//精彩赛事

        //符文
        'ALL_RUNE'=>399,
        'RED_RUNE'=>400,
        'BLUE_RUNE'=>401,
        'GREEN_RUNE'=>402,
        'CORE_RUNE'=>403,
        'ZHANZHENG' => 57,//英雄学员

        //线上
//        //兵种技能
//        'TRIBE' => 340,//所有技能
//        'R_TRIBE' => 341,//人族
//        'R_TFJN' => 395, //天赋
//        'R_ZHGJN' => 396,//指挥官
//        'S_TRIBE' => 342,//神族
//        'S_TFJN' => 397,
//        'S_ZHGJN' => 398,
//        'Y_TRIBE' => 343,//妖族
//        'Y_TFJN' => 399,
//        'Y_ZHGJN' => 400,
//
//        //种族
//        'ZHONGZHU' => 401,
//        'RENZHU' => 402,
//        'SHENZHU' => 403,
//        'YAOZHU' => 404,
//
//        //符文
//        'ALL_RUNE' => 405,
//        'RED_RUNE' => 406,
//        'BLUE_RUNE' => 407,
//        'GREEN_RUNE' => 408,
//        'CORE_RUNE' => 409,


    ];
}else{
    $params = [
        'website_id' => 28,
        'QQZL' => 355,//全球战力
        'HZMT' => 356,//合作媒体
        //攻略
        'FAQ_GL' => 56,//FAQ问啊
        'TRGS_GL' => 318,//同人故事
        'XSGL_GL' => 216,//新手攻略
        'JJGL_GL' => 218,//进阶攻略

        //新闻
        'REMEN' => 348,//热门
        'XINWEN' => 63,//新闻
        'GONGGAO' => 115,//公告
        'HUODONG' => 317,//活动
        'MEITI' => 349,//媒体

        //兵种技能
//    'TRIBE'=>340,//所有技能
//    'R_TRIBE'=>341,//人族
//        'R_TFJN'=>374, //天赋
//        'R_ZHGJN'=>375,//指挥官
//    'S_TRIBE'=>342,//神族
//        'S_TFJN'=>376,
//        'S_ZHGJN'=>377,
//    'Y_TRIBE'=>343,//妖族
//        'Y_TFJN'=>378,
//        'Y_ZHGJN'=>379,

        //种族
//    'ZHONGZHU'=>381,
//    'RENZHU'=>382,
//    'SHENZHU'=>383,
//    'YAOZHU'=>384,

        //视频
        'VIDEO_NEW' => 58,//最新
        'VIDEO_OFF' => 59,//官方视频
        'VIDEO_PLAYER' => 62,//玩家 解说视频
        'VIDEO_JINGCAI' => 60,//精彩赛事

        //符文
//    'ALL_RUNE'=>399,
//    'RED_RUNE'=>400,
//    'BLUE_RUNE'=>401,
//    'GREEN_RUNE'=>402,
//    'CORE_RUNE'=>403,
        'ZHANZHENG' => 57,//英雄学员

        //线上
        //兵种技能
        'TRIBE' => 340,//所有技能
        'R_TRIBE' => 341,//人族
        'R_TFJN' => 395, //天赋
        'R_ZHGJN' => 396,//指挥官
        'S_TRIBE' => 342,//神族
        'S_TFJN' => 397,
        'S_ZHGJN' => 398,
        'Y_TRIBE' => 343,//妖族
        'Y_TFJN' => 399,
        'Y_ZHGJN' => 400,

        //种族
        'ZHONGZHU' => 401,
        'RENZHU' => 402,
        'SHENZHU' => 403,
        'YAOZHU' => 404,

        //符文
        'ALL_RUNE' => 405,
        'RED_RUNE' => 406,
        'BLUE_RUNE' => 407,
        'GREEN_RUNE' => 408,
        'CORE_RUNE' => 409,


    ];
}
/* $params = array_merge(
		$params,
		require(__DIR__ . '/../../data/cache/cachedData.php')
); */

return $params;