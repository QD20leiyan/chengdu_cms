/**
 * Created by zWX399270 on 2017/1/16.
 * 本模块实现功能：
 * 1、通过参数创建视图模板；
 * 2、分享功能；（微信和客户端）
 * 3、带有data-id属性的增加点击事件；（微信和客户端）
 * 使用：
 * 1、可通过options参数或调取createBtns（items）方法实现创建模板的点击按键，需要传入id：dom节点id作为父元素；appId：游戏的appId，用于客户端或其他端口拉起游戏页面；btnStyle：按键的样式；
 * 2、调取downLoadGame(dom)实现带有data-id属性的元素激活可点击，dom：为data-id实现的范围；
 * 3、调取sharePage（dom）实现微信端和客户端分享的拉起；
 */
function Module(options){
    this.isHuawei=false;
    this.activityData={};
    this.campaignId="";
    this._init(options);
}
Module.prototype={
    _init:function(options) {
        this._disClient();
        if(this.isHuawei&&options&&options.campaignId){
            this.campaignId=options.campaignId;
            this._initData(options.campaignId);
        }
        if(options&&options.items){
            this.createBtns(options.items);
        }
    },
    _initData:function(campaignId){
        var that=this;
        // https://uowap.hicloud.com/uowap/campaign/detail?campaignId=2315
        //var data={"campaignDetail":{"appList":[{"allianceAppId":"10792850","androidVersion":"1.0.0","appDetailID":"app|C10792850","appId":"C10792850","author":"上海逸友网络信息技术有限公司","ctype":0,"currency":"","description":"","downCountDesc":"114 万次安装","download":"1136538","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/40ddeef25d3340628df492b77613773b.png","md5":"9F55673DBD8276AEF0C922A4927EF545","name":"三国志2017","openCount":0,"openCountDesc":"","pkgName":"com.game.sgz.huawei","rateNum":0,"releaseDate":"2017-08-24","size":"276800933","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/40/40ddeef25d3340628df492b77613773b/com.game.sgz.huawei.1710101613.apk?sign=mw@mw1507861296942","version":"1.0.0","versionCode":201},{"allianceAppId":"100066113","androidVersion":"1.2.56.666","appDetailID":"app|C100066113","appId":"C100066113","author":"深圳市腾讯计算机系统有限公司","ctype":0,"currency":"","description":"","downCountDesc":"75 万次安装","download":"743512","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/afe11ff0ccd24e0d824dd3d1d6fdd90e.png","md5":"3ABFA510C5838355E872EC195EE521EE","name":"乱世王者","openCount":0,"openCountDesc":"","pkgName":"com.tencent.tmgp.wec","rateNum":0,"releaseDate":"2017-10-10","size":"292825643","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/af/afe11ff0ccd24e0d824dd3d1d6fdd90e/com.tencent.tmgp.wec.1710101723.apk?sign=mw@mw1507861296944","version":"1.2.56.666","versionCode":1002056},{"allianceAppId":"10296352","androidVersion":"1.3.5","appDetailID":"app|C10296352","appId":"C10296352","author":"杭州网易雷火科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"156 万次安装","download":"1557896","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/fdaf244da83d4922918cb6ff73e2a216.png","md5":"18A065096F5C18009ABAF5ECDA263EA5","name":"率土之滨","openCount":0,"openCountDesc":"","pkgName":"com.netease.stzb.huawei","rateNum":0,"releaseDate":"2017-09-19","size":"244881402","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/fd/fdaf244da83d4922918cb6ff73e2a216/com.netease.stzb.huawei.1709181442.apk?sign=mw@mw1507861296945","version":"1.3.5","versionCode":94291},{"allianceAppId":"10796149","androidVersion":"1.5.4","appDetailID":"app|C10796149","appId":"C10796149","author":"互爱互动（北京）科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"168 万次安装","download":"1675713","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/3025e996da8946f08aba31eca559e5ab.png","md5":"6EB795B767AAA20FE1109004B79BD581","name":"胡莱三国2（秋祭盛典）","openCount":0,"openCountDesc":"","pkgName":"com.hoolai.hlsg2.huawei","rateNum":0,"releaseDate":"2017-09-27","size":"252362885","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/30/3025e996da8946f08aba31eca559e5ab/com.hoolai.hlsg2.huawei.1710101402.apk?sign=mw@mw1507861296946","version":"1.5.4","versionCode":139},{"allianceAppId":"10479187","androidVersion":"1.11.7","appDetailID":"app|C10479187","appId":"C10479187","author":"北京飞流九天科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"207 万次安装","download":"2064885","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/90de3182a647472f9f0c52eb0e3d736b.png","md5":"45B900AAD302EBA52DC9D15B7CCC4D5F","name":"三国群英传","openCount":0,"openCountDesc":"","pkgName":"com.kx.sgqyz.huawei","rateNum":0,"releaseDate":"2017-09-18","size":"231553618","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/90/90de3182a647472f9f0c52eb0e3d736b/com.kx.sgqyz.huawei.1709181143.apk?sign=mw@mw1507861296947","version":"1.11.7","versionCode":1011007},{"allianceAppId":"10652215","androidVersion":"1.4.4","appDetailID":"app|C10652215","appId":"C10652215","author":"海南尤达科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"76 万次安装","download":"758543","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/a080a26c8f594b4d8745237346979255.png","md5":"AFFD2612C8FF5A14F73C8AD6DF0D5E60","name":"正统三国","openCount":0,"openCountDesc":"","pkgName":"juedi.tatuyin.rxsg.huawei","rateNum":0,"releaseDate":"2017-09-25","size":"85504989","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/a0/a080a26c8f594b4d8745237346979255/juedi.tatuyin.rxsg.huawei.1709251038.apk?sign=mw@mw1507861296947","version":"1.4.4","versionCode":107795},{"allianceAppId":"10625194","androidVersion":"2.6.00","appDetailID":"app|C10625194","appId":"C10625194","author":"北京盛天上游网络技术有限公司","ctype":0,"currency":"","description":"","downCountDesc":"29 万次安装","download":"284223","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/6ddf72b8986249adbb345eb4e1fea861.png","md5":"AAB74BDC484B640F81FCB33CA02A52CD","name":"塔防三国志","openCount":0,"openCountDesc":"","pkgName":"com.shanggame.tssy.huawei","rateNum":0,"releaseDate":"2017-09-08","size":"119165597","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/6d/6ddf72b8986249adbb345eb4e1fea861/com.shanggame.tssy.huawei.1709081407.apk?sign=mw@mw1507861296948","version":"2.6.00","versionCode":2600},{"allianceAppId":"10328276","androidVersion":"14.3.0","appDetailID":"app|C10328276","appId":"C10328276","author":"心动网络股份有限公司","ctype":0,"currency":"","description":"","downCountDesc":"251 万次安装","download":"2504103","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/b9ef20a12be74ab2aea4d4d70894db10.png","md5":"0F1A045084C7AE932E767F48B340550C","name":"横扫千军","openCount":0,"openCountDesc":"","pkgName":"com.hsqj.huawei","rateNum":0,"releaseDate":"2017-08-12","size":"304879916","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/b9/b9ef20a12be74ab2aea4d4d70894db10/com.hsqj.huawei.1708112337.apk?sign=mw@mw1507861296948","version":"14.3.0","versionCode":61277}],"awardList":[{"awardId":6453,"awardName":"游戏券","awardType":7,"bigPic":"https://d168.g05.dbankcloud.com/dl/hiad/dd35217a-f1dd-4648-975a-7544802c5e1b.PNG","cost":100,"description":"1. 游戏券可在指定游戏中使用，充值时勾选“游戏券”即可。\n2. 游戏券有效期7天，请尽快使用，逾期失效。\n3. 进入华为游戏中心APP【我的】-【游戏券】可查询详情。","detailUrl":"/uoms/award/awardDetail.html?awardId=6453","midPic":"https://d168.g05.dbankcloud.com/dl/hiad/35ec0265-d91e-4f16-936d-a20a7efa890c.PNG","productId":"0401","serviceSelfType":"","smallPic":"https://d170.g05.dbankcloud.com/dl/hiad/dcaac334-74fd-4587-b5f7-62ae8cdd2ade.PNG","surplus":1,"usage":"","validTime":7,"value":100}],"awardNames":"游戏券","campaignStatus":0,"currTime":1507861296961,"description":"","endDate":1514649600000,"gameLevel":0,"name":"三国游戏精选专题","startDate":1507824000000,"type":2,"userMode":1},"campaignPartUser":0,"cycleTimes":0,"dayPartTimes":0,"dayTimes":0,"hisTimes":0,"rtnCode":0,"rtnDesc":"Query campaignDetail success.","topNum":0};
        $.ajax({
            url:"https://uowap.hicloud.com/uowap/campaign/detail",
            type:"GET",
            data:{campaignId:campaignId},
            success:function(data){
                var aData=(typeof data=="string"?JSON.parse(data):data).campaignDetail.appList;
                $.each(aData,function(index,item){
                    var isInstalled=item.isInstalled=that._isInstalled(item.pkgName);
                    if(isInstalled){
                        var isInstalledApp=$("*[data-id='"+item.appId+"']");
                        isInstalledApp.data("isInstalled",true);
                        isInstalledApp.children(".install").addClass("installed").html("打开");
                    }
                    that.activityData[item.appId]=item;
                });

            }
        })
        // this.activityData={"campaignDetail":{"appList":[{"allianceAppId":"10864526","androidVersion":"2.9.0","appDetailID":"app|C10864526","appId":"C10864526","author":"广州市漫灵软件有限公司","ctype":0,"currency":"","description":"","downCountDesc":"4 万次安装","download":"30167","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/f79efd49077f40acba9da8d9981e6ce3.png","md5":"6D18C7D053B936336B93EEE9E1F00FC6","name":"全职猎手","openCount":0,"openCountDesc":"","pkgName":"com.mlyx.qzls.huawei","rateNum":0,"releaseDate":"2017-07-12","size":"230306398","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/f7/f79efd49077f40acba9da8d9981e6ce3/com.mlyx.qzls.huawei.1707131007.apk?sign=mw@mw1507515605171","version":"2.9.0","versionCode":20},{"allianceAppId":"10334184","androidVersion":"1.0.7","appDetailID":"app|C10334184","appId":"C10334184","author":"成都简乐互动远景科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"78 万次安装","download":"772813","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/c9df4d80d375428faa01355dd2bbe0bb.png","md5":"1641EFD35632B3460E8824534684D26C","name":"超能继承者","openCount":0,"openCountDesc":"","pkgName":"com.npc.s80.huawei","rateNum":0,"releaseDate":"2016-12-28","size":"157827979","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/c9/c9df4d80d375428faa01355dd2bbe0bb/com.npc.s80.huawei.1612271812.apk?sign=mw@mw1507515605172","version":"1.0.7","versionCode":7},{"allianceAppId":"10274052","androidVersion":"2.13.060","appDetailID":"app|C10274052","appId":"C10274052","author":"奇创星动（北京）信息科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"73 万次安装","download":"721930","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/4c7182860de04904bca7bd674b798206.png","md5":"3944990168D8450AB2ED215FA276D812","name":"冒险王2","openCount":0,"openCountDesc":"","pkgName":"com.k7k7.mxw2.huawei","rateNum":0,"releaseDate":"2017-04-17","size":"201939181","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/4c/4c7182860de04904bca7bd674b798206/com.k7k7.mxw2.huawei.1704151747.apk?sign=mw@mw1507515605173","version":"2.13.060","versionCode":39},{"allianceAppId":"10221711","androidVersion":"3.0.0","appDetailID":"app|C10221711","appId":"C10221711","author":"上海巨人网络科技有限公司","ctype":0,"currency":"","description":"","downCountDesc":"62 万次安装","download":"616426","gameSign":"","isDisciplined":0,"isForceUpdate":0,"isPay":0,"isShelves":1,"logo":"http://appimg.hicloud.com/hwmarket/files/application/icon144/d28da9fe1321480f86236c896ae558f3.png","md5":"7E9CD85D77AEAF4C14EB1CC7B0789BD9","name":"大主宰","openCount":0,"openCountDesc":"","pkgName":"com.mztgame.dzz.huawei","rateNum":0,"releaseDate":"2016-12-02","size":"232547547","updateDesc":"","url":"http://appdlc.hicloud.com/dl/appdl/application/apk/d2/d28da9fe1321480f86236c896ae558f3/com.mztgame.dzz.huawei.1612011709.apk?sign=mw@mw1507515605174","version":"3.0.0","versionCode":37}],"awardList":[{"appId":"C10864526","awardId":5638,"awardName":"全职猎手 测试礼包","awardType":6,"bigPic":"https://d160.g03.dbankcloud.com/dl/hiad/05b483ce-759b-4292-acc2-1d6d127014c0.PNG","cost":10000,"description":"","detailUrl":"/uoms/award/awardDetail.html?awardId=5638","level":1,"midPic":"https://d172.g05.dbankcloud.com/dl/hiad/2d96527d-110a-4371-8656-ed9fb75ad494.PNG","productId":"0401","serviceSelfType":"","smallPic":"https://d172.g05.dbankcloud.com/dl/hiad/4887334d-e9f0-447a-b1c6-2ee714bccaab.PNG","surplus":20,"usage":"进入游戏-活动-兑换码-输入兑换码即可获得奖励（同类型礼包码，每个华为账号限兑换1次）","validEndTime":2017,"validStartTime":2017,"validTime":0,"value":10000},{"appId":"C10334184","awardId":5637,"awardName":"超能继承者 测试礼包","awardType":6,"bigPic":"https://d172.g05.dbankcloud.com/dl/hiad/b19fc1af-ece9-438b-8b22-aa76cbba0a05.PNG","cost":10000,"description":"","detailUrl":"/uoms/award/awardDetail.html?awardId=5637","level":1,"midPic":"https://d154.g03.dbankcloud.com/dl/hiad/bd29f571-abcd-4c47-bffe-911e05381ef1.PNG","productId":"0401","serviceSelfType":"","smallPic":"https://d160.g03.dbankcloud.com/dl/hiad/62762c0c-272d-4b82-aabc-ddfa6b178d74.PNG","surplus":19,"usage":"进入游戏-活动-兑换码-输入兑换码即可获得奖励（同类型礼包码，每个华为账号限兑换1次）","validEndTime":2017,"validStartTime":2017,"validTime":0,"value":10000},{"appId":"C10274052","awardId":5636,"awardName":"冒险王2 测试礼包","awardType":6,"bigPic":"https://d160.g03.dbankcloud.com/dl/hiad/042b0d31-d3fa-4f80-8631-1893bed99396.PNG","cost":10000,"description":"","detailUrl":"/uoms/award/awardDetail.html?awardId=5636","level":1,"midPic":"https://d164.g03.dbankcloud.com/dl/hiad/9e33d267-e5da-4429-8c7b-c0d54b8ea34c.PNG","productId":"0401","serviceSelfType":"","smallPic":"https://d167.g03.dbankcloud.com/dl/hiad/c56e8c54-257c-4c49-9e07-ad4d4cb054c0.PNG","surplus":20,"usage":"进入游戏-活动-兑换码-输入兑换码即可获得奖励（同类型礼包码，每个华为账号限兑换1次）","validEndTime":2017,"validStartTime":2017,"validTime":0,"value":10000},{"appId":"C10821619","awardId":5635,"awardName":"赤月裁决 测试礼包","awardType":6,"bigPic":"https://d175.g03.dbankcloud.com/dl/hiad/78794ec9-9c47-474a-adb9-69e478a818de.PNG","cost":10000,"description":"","detailUrl":"/uoms/award/awardDetail.html?awardId=5635","level":1,"midPic":"https://d172.g05.dbankcloud.com/dl/hiad/969480ca-28bd-4652-821f-b70f3e9c9980.PNG","productId":"0401","serviceSelfType":"","smallPic":"https://d164.g03.dbankcloud.com/dl/hiad/562cfe4e-dc06-4450-994b-95bde5903a16.PNG","surplus":20,"usage":"进入游戏-活动-兑换码-输入兑换码即可获得奖励（同类型礼包码，每个华为账号限兑换1次）","validEndTime":2017,"validStartTime":2017,"validTime":0,"value":10000},{"appId":"C10221711","awardId":5634,"awardName":"大主宰 测试礼包","awardType":6,"bigPic":"https://d168.g05.dbankcloud.com/dl/hiad/bbacbfb4-0564-4da0-aa95-c4139b27ab64.PNG","cost":10000,"description":"","detailUrl":"/uoms/award/awardDetail.html?awardId=5634","level":1,"midPic":"https://d160.g03.dbankcloud.com/dl/hiad/f32411f8-b9d1-4ae2-b6ca-024dc1d2c9af.PNG","productId":"0401","serviceSelfType":"","smallPic":"https://d175.g03.dbankcloud.com/dl/hiad/d05e10bb-3dc0-4896-8fc6-27af525f7af8.PNG","surplus":20,"usage":"进入游戏-活动-兑换码-输入兑换码即可获得奖励（同类型礼包码，每个华为账号限兑换1次）","validEndTime":2017,"validStartTime":2017,"validTime":0,"value":10000}],"awardNames":"全职猎手 测试礼包、超能继承者 测试礼包、冒险王2 测试礼包、赤月裁决 测试礼包、大主宰 测试礼包","campaignPic":"https://d160.g03.dbankcloud.com/dl/hiad/deaecd53-6235-41f2-9835-4aaf59fb807f.JPG","campaignStatus":0,"currTime":1507515605180,"description":"1. 首充指从未在游戏内充值的玩家，仅限活动期间内首充用户参与。\n2. 礼包内容：测试礼包码*1\n3. 礼包即时到账，获奖用户可进入游戏中心APP【我的】-【礼包】可查询礼包内容及有效期。","endDate":1507606339000,"gameLevel":1,"joinMode":"活动期间，新用户首次在本游戏内单笔充值6元起，即可获得该游戏专属礼包！ 每人限获得4次奖励。","name":"首充有礼","startDate":1502682019000,"type":7,"userMode":0},"campaignPartUser":0,"cycleTimes":0,"dayPartTimes":0,"dayTimes":0,"hisTimes":0,"rtnCode":0,"rtnDesc":"Query campaignDetail success.","topNum":0};

    },
    _isInstalled:function(pkgName){
        return window.HiSpaceObject.isInstalled(pkgName);
    },
    _createBtn:function(item){
        var parentDom = $( item.id);
        $.each(item.btnStyle,function(index,style){
            var template=$("<div class='module-btn'data-id='"+item.appId+"'></div>");
            parentDom.append(template);
            template.css(style);
        });
    },
    createBtns:function(items){
        var that=this;
        if($.isArray(items)){
            $.each(items,function(index,item){
                that._createBtn(item);
            });
        }else{
            that._createBtn(items);
        };
    },
    _disClient:function(){
        if(window.HiSpaceObject){
            this.isHuawei=true;
        }else{
            this.isHuawei=false;
        }
    },
    downLoadGame:function(dom){
        var that=this;
        $(dom).delegate("*[data-id]","click",function(){
            var id = $(this).data("id");
            var label = $(this).data("title");
            var pay=$(this).data("pay");
            var package=$(this).data("package");
            var category=$(this).parent().data("title");
            if(that.isHuawei) {
                _paq.push(['trackLink',category+"-"+label+"-app", 'link',pageId]);
                //_czc.push(["_trackEvent",category,"客户端",label]);
                var packageName =new Object();
                packageName.appDetailId= "app|" + id;
                //alert(JSON.stringify(packageName));
                window.HiSpaceObject.toDetailPage(JSON.stringify(packageName));
            } else {
                if(pay){
                    var ua = window.navigator.userAgent.toLowerCase();
                    //var ua = "android";
                        if(/Android (\d+\.\d+)/i.test(ua)){
                        if(/MicroMessenger/i.test(ua)){
                            that.showTip("images/browser.png");
                        }else{
                            window.location.href="market://details?id="+package;
                        }
                    }else{
                        _paq.push(['trackLink',category+"-"+label+"-other", 'link',pageId]);
                        //_czc.push(["_trackEvent",category,"其他",label]);
                        window.location.href ="http://a.vmall.com/app/"+id;
                    }
                }else{
                    _paq.push(['trackLink',category+"-"+label+"-other", 'link',pageId]);
                    //_czc.push(["_trackEvent",category,"其他",label]);
                    window.location.href ="http://a.vmall.com/app/"+id;
                }
            }
        })
            $(".install").click(function(e){
                var dom=$(this);
                var app=dom.parent();
                var pay=app.data("pay");
                var category=app.parent().data("title");
                var label = app.data("title");
                _paq.push(['trackLink',category+"-"+label+"-install", 'link',pageId]);
                if(that.isHuawei){
                    if($(this).hasClass("installing")){
                        return false;
                    }

                    var id=app.data("id");
                    var isInstalled=app.data("isInstalled");
                    var appInfo=that.activityData[id];
                    if(isInstalled){
                        window.HiSpaceObject.launchApp(appInfo.pkgName, null, null);
                        return false;
                    }else if(!pay){
                        var dInfo = {};
                        dInfo.url = (appInfo.url+'&source=uoms_activity&subsource=' + that.campaignId)|| '';
                        dInfo.extendName = 'invalid';
                        dInfo.name = appInfo.name || '';
                        dInfo.packageName = appInfo.pkgName || '';
                        dInfo.callerName = 'invalid';
                        dInfo.size = appInfo.size || '';
                        dInfo.iconUrl = appInfo.logo || '';
                        dInfo.version = appInfo.version || '';
                        dInfo.appId = appInfo.appId || '';
                        dInfo.md5 = appInfo.md5 || '';

                        //  __vm.$log('gameItem JSON.stringify(dInfo) : ' + (0, _stringify2.default)(dInfo));
                        window.HiSpaceObject.startDownload(JSON.stringify(dInfo));
                        dom.html("安装中");
                        // dom.attr("disabled", "disabled");
                        dom.addClass("installing");
                        that.checkInstalled(id,dom);
                        return false;
                    }
                }
            },false);

    },
    checkInstalled:function(id,dom){
        var that=this;
        var appInfo=this.activityData[id];
        if(that._isInstalled(appInfo.pkgName)){
            dom.addClass("installed").html("打开");
            // dom.removeAttr("disabled");
            dom.removeClass("installing");
            dom.parent().data("isInstalled",true);
            appInfo.isInstalled=true;
        }else{
            setTimeout(function(){that.checkInstalled(id,dom)},1000);
        }
    },
    sharePage:function(dom){
        var that=this;
        $(dom).on("click", function() {
            if(that.isHuawei) {
                _paq.push(['trackLink','share-H', 'link',pageId]);
                //_czc.push(["_trackEvent","分享","客户端"]);
                var title = $(this).data("title");
                var content = $(this).data("content");
                var pictureUrl = $(this).data("picture");
                var shareUrl = $(this).data("share");
                var hwJson = new Object();
                hwJson.shareMethod="Content"; //此处不变
                hwJson.title=title;
                hwJson.content=content;
                hwJson.pictureUrl=pictureUrl;
                hwJson.shareUrl=shareUrl;
                //alert(JSON.stringify(hwJson));
                window.HiSpaceObject.share(JSON.stringify(hwJson));
            } else {
                _paq.push(['trackLink','share-O', 'link',pageId]);
                //_czc.push(["_trackEvent","分享","其他"]);
               that.showTip("images/youshang.png");
            }
        });
    },
    showTip:function(src){
        $(".yst img").attr('src',src);
        $(".mongolia").show().off("click").on("click",function(){
            $(this).hide();
        });
    }
};