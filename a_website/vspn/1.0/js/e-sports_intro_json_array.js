var baseurl=$("#main").data("src");
var intro_json_array = [
  { 
    gameAbbr:'kpl', title:'王者荣耀职业联赛', more_href:'http://pvp.qq.com/match/kpl/index.shtml', 
    logo_w:'198', logo_h:'188',
    imgs:[
      {src:baseurl + 'e-sports/detail/kpl/1.png'},
      {src:baseurl + 'e-sports/detail/kpl/2.png'},
      {src:baseurl + 'e-sports/detail/kpl/3.png'},
      {src:baseurl + 'e-sports/detail/kpl/4.png'},
      {src:baseurl + 'e-sports/detail/kpl/5.png'},
      {src:baseurl + 'e-sports/detail/kpl/6.png'}
    ], 
    introText:'王者荣耀职业联赛（简称KPL）是王者荣耀官方竞技赛事。全年分别为春季赛和秋季赛两个赛季，每个赛季分为常规赛、季后赛及总决赛三部分。量子体育VSPN作为KPL的承办方、商业赞助服务商及电视版权独家运营商，负责赛事的策划组织、转播制作、商业开发和电视大屏端传播。由麦当劳、vivo、浦发银行信用卡赞助的2018年KPL春季赛于3月21日重燃战火，12支战队被划入东部赛区与西部赛区，比赛地分别为上海与成都。东部与西部赛区将决出东部与西部冠军，他们将争夺最后的KPL春季赛冠军荣誉。东西对决，志竞巅峰。',
    events_array:[
      {title: '常规赛',start: '2018-03-21'},
      {title: '常规赛',start: '2018-03-22'},
      {title: '常规赛',start: '2018-03-23'},
      {title: '常规赛',start: '2018-03-24'},
      {title: '常规赛',start: '2018-03-25'},
      {title: '常规赛',start: '2018-03-28'},
      {title: '常规赛',start: '2018-03-29'},
      {title: '常规赛',start: '2018-03-30'},
      {title: '常规赛',start: '2018-03-31'},
      
      {title: '常规赛',start: '2018-04-01'},
      {title: '常规赛',start: '2018-04-04'},
      {title: '常规赛',start: '2018-04-05'},
      {title: '常规赛',start: '2018-04-06'},
      {title: '常规赛',start: '2018-04-07'},
      {title: '常规赛',start: '2018-04-08'},
      {title: '常规赛',start: '2018-04-11'},
      {title: '常规赛',start: '2018-04-12'},
      {title: '常规赛',start: '2018-04-13'},
      {title: '常规赛',start: '2018-04-14'},
      {title: '常规赛',start: '2018-04-15'},
      {title: '常规赛',start: '2018-04-18'},
      {title: '常规赛',start: '2018-04-19'},
      {title: '常规赛',start: '2018-04-20'},
      {title: '常规赛',start: '2018-04-21'},
      {title: '常规赛',start: '2018-04-22'},
      {title: '常规赛',start: '2018-04-25'},
      {title: '常规赛',start: '2018-04-26'},
      {title: '常规赛',start: '2018-04-27'},
      {title: '常规赛',start: '2018-04-28'},
      {title: '常规赛',start: '2018-04-29'},

      {title: '常规赛',start: '2018-05-02'},
      {title: '常规赛',start: '2018-05-03'},
      {title: '常规赛',start: '2018-05-04'},
      {title: '常规赛',start: '2018-05-05'},
      {title: '常规赛',start: '2018-05-06'},
      {title: '常规赛',start: '2018-05-09'},
      {title: '常规赛',start: '2018-05-10'},
      {title: '常规赛',start: '2018-05-11'},
      {title: '常规赛',start: '2018-05-12'},
      {title: '常规赛',start: '2018-05-13'},
      {title: '常规赛',start: '2018-05-16'},
      {title: '常规赛',start: '2018-05-17'},
      {title: '常规赛',start: '2018-05-18'},
      {title: '常规赛',start: '2018-05-19'},
      {title: '常规赛',start: '2018-05-20'},
      {title: '常规赛',start: '2018-05-23'},
      {title: '常规赛',start: '2018-05-24'},
      {title: '常规赛',start: '2018-05-25'},
      {title: '常规赛',start: '2018-05-26'},
      {title: '常规赛',start: '2018-05-27'},

    ]
  },
  { 
    gameAbbr:'cefl', title:'中国足球电竞联赛CEFL', more_href:'https://fo4.qq.com/cp/a20181012cefl/index.html',
    logo_w:'198', logo_h:'198',
    imgs:[
      {src:baseurl + 'e-sports/detail/cefl/1.jpg'},
      {src:baseurl + 'e-sports/detail/cefl/2.jpg'},
      {src:baseurl + 'e-sports/detail/cefl/3.jpg'},
      {src:baseurl + 'e-sports/detail/cefl/4.jpg'},
      {src:baseurl + 'e-sports/detail/cefl/5.png'}
    ],
    introText:'中国足球电子竞技联赛CEFL是由腾讯游戏、中国体育电子竞技联盟主办，联合数家国内足球俱乐部参与的电竞赛事。CEFL S3由FIFA Online 4、腾讯电竞、中国体育电子竞技联盟主办，量子体育VSPN承办，于9月15日-10月21日举行，共11支战队参加。S3赛季里，战队的组成模式将由“职业选手+球迷”变为全部是球迷的阵容，球迷选手们可以在电竞赛场延续对球队的热爱，用自己的付出带领球队登上荣耀之巅。热爱不独行，换我上场赢！',
    events_array:[
      {title: '常规赛',start: '2018-09-15'},
      {title: '常规赛',start: '2018-09-16'},

      {title: '常规赛',start: '2018-09-22'},
      {title: '常规赛',start: '2018-09-23'},

      {title: '常规赛',start: '2018-09-29'},
      {title: '常规赛',start: '2018-09-30'},

      {title: '常规赛',start: '2018-10-06'},
      {title: '常规赛',start: '2018-10-07'},

      {title: '常规赛',start: '2018-10-13'},
      {title: '常规赛',start: '2018-10-14'},

      {title: '半决赛',start: '2018-10-20'},
      {title: '决赛',start: '2018-10-21'},
    ]
  },
  { 
    gameAbbr:'ccgs', title:'皇室战争皇冠锦标赛—中国区秋季赛', more_href:'https://ccgs.cr.kunlun.com/', 
    logo_w:'198', logo_h:'188',
    imgs:[
      {src:baseurl + 'e-sports/detail/ccgs/1.png'},
      {src:baseurl + 'e-sports/detail/ccgs/2.png'},
      {src:baseurl + 'e-sports/detail/ccgs/3.png'},
      {src:baseurl + 'e-sports/detail/ccgs/4.png'},
      {src:baseurl + 'e-sports/detail/ccgs/5.png'},
      {src:baseurl + 'e-sports/detail/ccgs/6.png'}
    ],
    introText:'皇室战争皇冠锦标赛全球系列赛（简称CCGS）作为Supercell主办并推动的《皇室战争》官方全球电竞赛事，自2017年8月起在北美、拉美、欧洲、中国、日本、韩国、东南亚、ROW 8大赛区陆续开战，并将于年底在英国伦敦举行全球总决赛。其中，2017 CCGS中国区秋季赛由量子体育VSPN承办，作为CLO传奇公开赛升级版赛事，推出直通全球的赛事体系，三大晋级通道助中国区选手晋级皇冠锦标赛全球总决赛，争夺今年的皇冠锦标赛世界冠军荣誉和高达1,000,000美元的系列赛总奖金。',
    events_array:[
      {title: 'Week1线下周赛',start: '2017-09-01'},
      {title: 'Week1线下周赛',start: '2017-09-02'},
      {title: 'Week1线下周赛',start: '2017-09-03'},
      {title: 'Week2线下周赛',start: '2017-09-08'},
      {title: 'Week2线下周赛',start: '2017-09-09'},
      {title: 'Week2线下周赛',start: '2017-09-10'},
      {title: 'Week3线下周赛',start: '2017-09-15'},
      {title: 'Week3线下周赛',start: '2017-09-16'},
      {title: 'Week3线下周赛',start: '2017-09-17'},
      {title: 'Week4线下周赛',start: '2017-09-22'},
      {title: 'Week4线下周赛',start: '2017-09-23'},
      {title: 'Week4线下周赛',start: '2017-09-24'},
      {title: 'Week5线下周赛',start: '2017-09-29'},
      {title: 'Week5线下周赛',start: '2017-09-30'},

      {title: 'Week5线下周赛',start: '2017-10-01'},
      {title: 'Week6线下周赛',start: '2017-10-06'},
      {title: 'Week6线下周赛',start: '2017-10-07'},
      {title: 'Week6线下周赛',start: '2017-10-08'},
      {title: 'Week7线下周赛',start: '2017-10-13'},
      {title: 'Week7线下周赛',start: '2017-10-14'},
      {title: 'Week7线下周赛',start: '2017-10-15'},
      {title: 'Week8线下周赛',start: '2017-10-20'},
      {title: 'Week8线下周赛',start: '2017-10-21'},
      {title: 'Week8线下周赛',start: '2017-10-22'},

      {title: 'Week9决赛',start: '2017-11-03'},
      {title: 'Week9决赛',start: '2017-11-04'},
      {title: 'Week9决赛',start: '2017-11-05'},
      {title: 'Week10决赛',start: '2017-11-10'},
      {title: 'Week10决赛',start: '2017-11-11'},
      {title: 'Week10决赛',start: '2017-11-12'},
    ]
  },
  { 
    gameAbbr:'cf', title:'穿越火线双端职业联赛', more_href:'http://cf.qq.com/cfpl/s11/', 
    logo_w:'198', logo_h:'198',
    imgs:[
      {src:baseurl + 'e-sports/detail/cf/1.jpg'},
      {src:baseurl + 'e-sports/detail/cf/2.jpg'},
      {src:baseurl + 'e-sports/detail/cf/3.jpg'},
      {src:baseurl + 'e-sports/detail/cf/4.jpg'},
      {src:baseurl + 'e-sports/detail/cf/5.jpg'},
      {src:baseurl + 'e-sports/detail/cf/6.jpg'}
    ],
    introText:'穿越火线职业联赛（简称CFPL）、穿越火线：枪战王者职业联赛（简称CFML）是由腾讯游戏主办、量子体育VSPN承办的职业电竞联赛，全年分为春季赛和秋季赛两个赛季，每个赛季分为季前赛、常规赛、季后赛、总决赛四个阶段。CFPL自2012年举办以来，就以其专业的赛事体系、先进的直转播制作、成熟的俱乐部及选手运作、以及庞大的用户基数拔得FPS类电竞赛事头筹。CFML不仅继承了端游赛事的专业化及体系化，也在移动电竞领域发展道路上日趋成熟，成为当下最受欢迎的移动电竞赛事之一。',
    events_array:[
      {title: '季前赛',start: '2018-07-20'},
      {title: '季前赛',start: '2018-07-21'},
      {title: '季前赛',start: '2018-07-22'},

      {title: '季前赛(CFPL)',start: '2018-08-01'},
      {title: '季前赛',start: '2018-08-02'},
      {title: '季前赛',start: '2018-08-03'},
      {title: '季前赛',start: '2018-08-04'},
      {title: '季前赛',start: '2018-08-05'},

      {title: '常规赛(CFPL)',start: '2018-08-08'},
      {title: '常规赛(CFPL)',start: '2018-08-09'},
      {title: '常规赛',start: '2018-08-10'},
      {title: '常规赛',start: '2018-08-11'},
      {title: '常规赛',start: '2018-08-12'},

      {title: '常规赛(CFPL)',start: '2018-08-15'},
      {title: '常规赛(CFPL)',start: '2018-08-16'},
      {title: '常规赛',start: '2018-08-17'},
      {title: '常规赛',start: '2018-08-18'},
      {title: '常规赛',start: '2018-08-19'},

      {title: '常规赛(CFPL)',start: '2018-08-22'},
      {title: '常规赛(CFPL)',start: '2018-08-23'},
      {title: '常规赛',start: '2018-08-24'},
      {title: '常规赛',start: '2018-08-25'},
      {title: '常规赛',start: '2018-08-26'},

      {title: '常规赛(CFPL)',start: '2018-08-29'},
      {title: '常规赛(CFPL)',start: '2018-08-30'},
      {title: '常规赛',start: '2018-08-31'},
      {title: '常规赛',start: '2018-09-01'},
      {title: '常规赛',start: '2018-09-02'},

      {title: '常规赛',start: '2018-09-07'},
      {title: '常规赛',start: '2018-09-08'},
      {title: '常规赛',start: '2018-09-09'},

      {title: '全明星',start: '2018-09-15'},
      {title: '全明星',start: '2018-09-16'},

      {title: '季后赛(CFML)',start: '2018-09-21'},
      {title: '季后赛',start: '2018-09-22'},
      {title: '季后赛',start: '2018-09-23'},

      {title: '半决赛',start: '2018-10-01'},
      {title: '半决赛',start: '2018-10-02'},

      {title: '总决赛',start: '2018-10-20'},
    ],
    game_time:[
      {date: '2017-08-18',time:'19:00', team1:'AG龙珠', team2:'SV龙珠'},
      {date: '2017-09-02',time:'20:20', team1:'东方丽羽', team2:'PENTA'},
      {date: '2017-09-02',time:'21:40', team1:'汉宫龙珠', team2:'OPK'},
    ]
  },
  { 
    gameAbbr:'bpl', title:'球球大作战职业联赛', more_href:'', 
    logo_w:'198', logo_h:'198',
    imgs:[
      {src:baseurl + 'e-sports/detail/bpl/1.png'},
      {src:baseurl + 'e-sports/detail/bpl/2.png'},
      {src:baseurl + 'e-sports/detail/bpl/3.png'},
      {src:baseurl + 'e-sports/detail/bpl/4.png'},
      {src:baseurl + 'e-sports/detail/bpl/5.png'},
      {src:baseurl + 'e-sports/detail/bpl/6.png'}
    ],
    introText:'球球大作战职业联赛（简称BPL）是官方最高规格专业竞技联赛。2018全新的BPL职业联赛夏季赛和冬季赛将取代以往的春季赛和秋季赛，比赛周期也从往年的6周调整到8周。2018年BPL夏季赛由巨人网络和阿里体育联合主办， 量子体育VSPN承办，统一冰红茶独家冠名。夏季赛于6月15日在上海拉开战幕，16支战队将在新赛季中为梦寐以求的冠军荣誉奋战前行！',
    events_array:[
      {title: '循环赛',start: '2018-06-15'},
      {title: '循环赛',start: '2018-06-16'},
      {title: '循环赛',start: '2018-06-17'},
      {title: '循环赛',start: '2018-06-29'},
      {title: '循环赛',start: '2018-06-30'},
      {title: '循环赛',start: '2018-07-01'},
      {title: '循环赛',start: '2018-07-06'},
      {title: '循环赛',start: '2018-07-07'},
      {title: '循环赛',start: '2018-07-08'},
      {title: '循环赛',start: '2018-07-13'},
      {title: '循环赛',start: '2018-07-14'},
      {title: '循环赛',start: '2018-07-15'},
      {title: '循环赛',start: '2018-07-20'},
      {title: '循环赛',start: '2018-07-21'},
      {title: '循环赛',start: '2018-07-22'},
      {title: '季后赛',start: '2018-07-27'},
      {title: '季后赛',start: '2018-07-28'},
      {title: '季后赛',start: '2018-07-29'},
      {title: '季后赛',start: '2018-08-03'},
      {title: '季后赛',start: '2018-08-04'},
      {title: '决赛',start: '2018-08-05'}
    ]
  },
  { 
    gameAbbr:'pcpi', title:'PUBG CHINA PRO INVITATIONAL', more_href:'', 
    logo_w:'198', logo_h:'198',
    imgs:[
      {src:baseurl + 'e-sports/detail/pcpi/1.png'},
      {src:baseurl + 'e-sports/detail/pcpi/2.png'},
      {src:baseurl + 'e-sports/detail/pcpi/3.png'},
      {src:baseurl + 'e-sports/detail/pcpi/4.png'},
      {src:baseurl + 'e-sports/detail/pcpi/5.png'},
      {src:baseurl + 'e-sports/detail/pcpi/6.png'}
    ],
    introText:'PUBG CHINA PRO INVITATIONAL（简称PCPI）是由PUBG Corporation主办，量子体育VSPN承办的绝地求生中国区官方职业赛事，于2018年5月25日-6月3日在上海大宁量子光电竞中心正式开赛，40支队伍将在此展开角逐。赛事分为预赛和决赛两个阶段，预赛采用双败赛制，20支战队晋级决赛，决赛分为FPP和TPP两种模式，决赛各模式下的冠军战队将作为中国代表队参加7月在德国柏林举行的PUBG GLOBAL INVITATIONAL（PGI）。量子体育VSPN作为本次PCPI的承办方，投入了百人团队和一系列电竞直转播设备，为广大观众带精彩的赛事体验。',
    events_array:[
      {title: '预赛',start: '2018-05-25'},
      {title: '预赛',start: '2018-05-26'},
      {title: '预赛',start: '2018-05-27'},
      {title: '预赛',start: '2018-05-28'},
      {title: '预赛',start: '2018-05-29'},

      {title: '决赛（FPP）',start: '2018-05-31'},
      {title: '决赛（FPP）',start: '2018-06-01'},

      {title: '决赛（TPP）',start: '2018-06-02'},
      {title: '决赛（TPP）',start: '2018-06-03'},

    ]
  },
  { 
    gameAbbr:'lpl', title:'英雄联盟职业联赛', more_href:'http://lpl.qq.com/es/lpl/', 
    logo_w:'198', logo_h:'198',
    imgs:[
      {src:baseurl + 'e-sports/detail/lpl/1.png'},
      {src:baseurl + 'e-sports/detail/lpl/2.png'},
      {src:baseurl + 'e-sports/detail/lpl/3.png'},
      {src:baseurl + 'e-sports/detail/lpl/4.png'},
      {src:baseurl + 'e-sports/detail/lpl/5.png'},
      {src:baseurl + 'e-sports/detail/lpl/6.png'}
    ],
    introText:'英雄联盟职业联赛（简称LPL）是《英雄联盟》的国内职业联赛，目前分为常规赛、季后赛、升降级赛三部分。十二支战队将为赛季总冠军荣誉以及高额的赛事奖金继续展开争夺。常规赛将把LPL的12支队伍均分为两个小组，小组内将进行双循环比赛，不同小组间将进行单循环对抗。积分排名前八的战队将晋级季后赛，为赛季总冠军以及高额的赛事奖金继续展开争夺。另外，各队伍将根据积分与排名实力获得参加2017赛季世界总决赛的资格。量子体育VSPN作为2013-2015及2017年LPL联赛执行方，倾力打造电竞赛事，精彩在舞台绽放，热血在心中激荡！',
    events_array:[
      {title: '夏季赛常规赛',start: '2017-06-08'},
      {title: '夏季赛常规赛',start: '2017-06-09'},
      {title: '夏季赛常规赛',start: '2017-06-10'},
      {title: '夏季赛常规赛',start: '2017-06-11'},
      {title: '夏季赛常规赛',start: '2017-06-15'},
      {title: '夏季赛常规赛',start: '2017-06-16'},
      {title: '夏季赛常规赛',start: '2017-06-17'},
      {title: '夏季赛常规赛',start: '2017-06-18'},
      {title: '夏季赛常规赛',start: '2017-06-22'},
      {title: '夏季赛常规赛',start: '2017-06-23'},
      {title: '夏季赛常规赛',start: '2017-06-24'},
      {title: '夏季赛常规赛',start: '2017-06-25'},
      {title: '夏季赛常规赛',start: '2017-06-29'},
      {title: '夏季赛常规赛',start: '2017-06-30'},

      {title: '夏季赛常规赛',start: '2017-07-01'},
      {title: '夏季赛常规赛',start: '2017-07-02'},
      {title: '夏季赛常规赛',start: '2017-07-13'},
      {title: '夏季赛常规赛',start: '2017-07-14'},
      {title: '夏季赛常规赛',start: '2017-07-15'},
      {title: '夏季赛常规赛',start: '2017-07-16'},
      {title: '夏季赛常规赛',start: '2017-07-20'},
      {title: '夏季赛常规赛',start: '2017-07-21'},
      {title: '夏季赛常规赛',start: '2017-07-22'},
      {title: '夏季赛常规赛',start: '2017-07-23'},
      {title: '夏季赛常规赛',start: '2017-07-27'},
      {title: '夏季赛常规赛',start: '2017-07-28'},
      {title: '夏季赛常规赛',start: '2017-07-29'},
      {title: '夏季赛常规赛',start: '2017-07-30'},
      
      
      {title: '夏季赛常规赛',start: '2017-08-03'},
      {title: '夏季赛常规赛',start: '2017-08-04'},
      {title: '夏季赛常规赛',start: '2017-08-05'},
      {title: '夏季赛常规赛',start: '2017-08-06'},
      {title: '夏季赛常规赛',start: '2017-08-10'},
      {title: '夏季赛常规赛',start: '2017-08-11'},
      {title: '夏季赛常规赛',start: '2017-08-12'},
      {title: '夏季赛常规赛',start: '2017-08-13'},
      {title: '夏季赛常规赛',start: '2017-08-17'},
      {title: '夏季赛常规赛',start: '2017-08-18'},
      {title: '夏季赛常规赛',start: '2017-08-19'},
      {title: '夏季赛常规赛',start: '2017-08-20'},
      {title: '夏季赛季后赛',start: '2017-08-22'},
      {title: '夏季赛季后赛',start: '2017-08-23'},
      {title: '夏季赛季后赛',start: '2017-08-25'},
      {title: '夏季赛季后赛',start: '2017-08-26'},

      {title: '夏季赛总决赛',start: '2017-09-01'},
    ]
  },
  { 
    gameAbbr:'hpl', title:'HPL联赛', more_href:'http://www.17hpl.com', 
    logo_w:'198', logo_h:'198',
    imgs:[
      {src:baseurl + 'e-sports/detail/hpl/1.png'},
      {src:baseurl + 'e-sports/detail/hpl/2.png'},
      {src:baseurl + 'e-sports/detail/hpl/3.png'},
      {src:baseurl + 'e-sports/detail/hpl/4.png'},
      {src:baseurl + 'e-sports/detail/hpl/5.png'},
      {src:baseurl + 'e-sports/detail/hpl/6.png'}
    ],
    introText:'Hero Pro League（简称HPL）是由英雄互娱主办，量子体育VSPN承办的移动电竞赛事。比赛项目有《全民枪战2》《一起来飞车》《赤潮》等。同时HPL以其开放性，将陆续吸引多款产品的加入。HPL由线上赛、职业赛、海外赛以及总决赛组成，已成功举办两个赛季。2015赛季，HPL通过“线上+线下”的赛事体系，参与选手过亿，大小赛事众多场次。2016赛季，HPL在延续2015赛季的模式基础上，发展设立了移动电竞职业联赛，与多家渠道合作设立多个渠道联赛，累计发出超千万元奖金。',
    events_array:[
      {title: '第五届英雄联赛',start: '2017-08-26'},
      {title: '第五届英雄联赛',start: '2017-08-27'},

      {title: '第四赛季职业联赛',start: '2017-09-02'},
      {title: '第四赛季职业联赛',start: '2017-09-03'},
      {title: '第四赛季职业联赛',start: '2017-09-09'},
      {title: '第四赛季职业联赛',start: '2017-09-10'},
      {title: '第四赛季职业联赛',start: '2017-09-16'},
      {title: '第四赛季职业联赛',start: '2017-09-17'},
      {title: '第四赛季职业联赛',start: '2017-09-29'},
      {title: '第四赛季职业联赛',start: '2017-09-30'},
      {title: '第六届英雄联赛',start: '2017-09-23'},
      {title: '第六届英雄联赛',start: '2017-09-24'},

      {title: '第四赛季职业联赛',start: '2017-10-14'},
      {title: '第四赛季职业联赛',start: '2017-10-15'},
      {title: '第七届英雄联赛',start: '2017-10-21'},
      {title: '第七届英雄联赛',start: '2017-10-22'},
      {title: '第四赛季职业联赛',start: '2017-10-28'},
      {title: '第四赛季职业联赛',start: '2017-10-29'},

      {title: '第四赛季职业联赛',start: '2017-11-04'},
      {title: '第四赛季职业联赛',start: '2017-11-05'},
      {title: '第四赛季职业联赛',start: '2017-11-11'},
      {title: '第四赛季职业联赛',start: '2017-11-12'},
      {title: '第四赛季职业联赛',start: '2017-11-18'},
      {title: '第四赛季职业联赛',start: '2017-11-19'},
      {title: '第八届英雄联赛',start: '2017-11-25'},
      {title: '第八届英雄联赛',start: '2017-11-26'},

      {title: '晋级赛',start: '2017-12-23'},
      {title: '晋级赛',start: '2017-12-24'},

      {title: '总决赛',start: '2018-01-18'},
      {title: '总决赛',start: '2018-01-19'},
      {title: '总决赛',start: '2018-01-20'}
    ]
  }
];