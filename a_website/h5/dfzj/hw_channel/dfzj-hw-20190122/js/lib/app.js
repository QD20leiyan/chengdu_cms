/**
 * Created by zWX399270 on 2018/4/11.
 */

function App(options){
    $.extend(this,{
        appList:[],
        newDownload:false, //新下载接口
        clickFlag:true,
        campaignId:options.campaignId||"",
        refreshApp:options.refreshApp||function(){}
    });
    this._init(options);
}
App.prototype={
    _init:function(){
        if(this.checkAppVersion()>=4){
            this.newDownload=true;
        }
        if(this.newDownload){
           this.refreshProgress();
        }
    },
    refreshProgress:function(){
        var that=this;
        window.hbs.on('refreshProgress',function(params){
            var appInfo=that.queryApp(that.appList,params.packageName);
            that.changeAppStatus(appInfo);
            // alert(JSON.stringify(params.packageName));
        });
    },
    queryApp:function(appList,packageName){
        for(var i=0,j=appList.length;i<j;i++){
            if(appList[i].pkgName==packageName){
                return appList[i];
            }
        }
        return null;
    },
    checkAppVersion:function(){
        if(window.HiSpaceObject){
            return (window.HiSpaceObject.getHiSpaceVersion)?(window.HiSpaceObject.getHiSpaceVersion()):null;
        }
    },

    checkIspay:function(itemData){

        if(itemData.isPay&&window.HiSpaceObject && window.HiSpaceObject.isOrderedPkg && itemData.pkgName){

            if(!window.HiSpaceObject.isOrderedPkg(itemData.pkgName)){//如果没有登录，我调这个接口会返回什么？
                return true;
            }

        }
        return false;
    },
    checkInstalled:function(apkPackageName){
        if(window.HiSpaceObject && window.HiSpaceObject.isInstalled && apkPackageName){
            return window.HiSpaceObject.isInstalled(apkPackageName)
        }
        return false;
    },
    getAppStatus:function(item){
        var vm = this;
        if(window.HiSpaceObject){
            var appStatusStr = window.HiSpaceObject.getAppStatus(item.pkgName);

            var appStatus = JSON.parse(appStatusStr);
            var btnStatus=this.getBtnText(item,appStatus);
            appStatus.btnStatus=btnStatus;
            return appStatus;
        }
    },
    changeAppStatus:function(item){
        var appStatus=this.getAppStatus(item);
       this.refreshApp(appStatus);
        return appStatus;
    },
    getBtnText:function(item,actionState){
        var that=this;
        var btnState={"text":"安装","disable":false};
        switch (actionState.status){
            case -2:
                if(this.checkIspay(item)){
                    btnState.text="¥"+(item.price/100).toFixed(2);
                    btnState.triggerFun=function(item){
                        that.downloadApp(item);
                    };
                    break;
                }else{
                    btnState.text='安装';
                    btnState.triggerFun=function(item){
                        that.downloadApp(item);
                    }
                    break;
                }
            case -1:
            case 0:
                btnState.text="打开";
                btnState.triggerFun=function(item){
                    that._launchApp(item);
                }
                break;
            case 1:
            case 2:
                btnState.text="安装";
                btnState.triggerFun=function(item){
                    that.downloadApp(item);
                }
                break;
            case 3:
            case 4:
                btnState.text="更新";
                btnState.triggerFun=function(item){
                    that.downloadApp(item);
                }
                break;
            case 5:
                btnState.text="0%";
                btnState.triggerFun=function(item){
                    that._pauseDownload(item);
                }
                break;
            case 6:
                btnState.text=actionState.progress+"%";
                btnState.triggerFun=function(item){
                    that._pauseDownload(item);
                }
                break;
            case 7:
                btnState.text="继续";
                btnState.triggerFun=function(item){
                    that.downloadApp(item);
                }
                break;
            case 8:
                btnState.text="100%";
                btnState.disable=true;
                btnState.triggerFun=null;
                break;
            case 9:
                btnState.text="继续";
                btnState.triggerFun=function(){
                    that.downloadApp(item);
                    that.showToast("您正在使用4G网络，请注意流量消耗哦");
                };
                break;
            case 10:
            case 11:
                btnState.text="安装中";
                btnState.disable=true;
                btnState.triggerFun=null;
                break;
            default:
                if(this.checkIspay(item)){
                    btnState.text="¥"+(item.price/100).toFixed(2);
                    btnState.triggerFun=function(item){
                        that.downloadApp(item);
                    };
                    break;
                }else{
                    if(!this.checkInstalled(item.pkgName)){
                        btnState.text='安装';
                        btnState.triggerFun=function(item){
                            that.downloadApp(item);
                        }
                        break;
                    }
                    btnState.text='打开';
                    btnState.triggerFun=function(item){
                        that._launchApp(item);
                    }
                    break;
                }
        }
        return btnState;
    },
    showToast:function(txt){
        if(window.HiSpaceObject){
            window.HiSpaceObject.showToast(txt);
        }
    },
    downloadApp:function(item){
        var rawUrl = item.url;
        if (rawUrl.indexOf('\?')<0) {
            rawUrl += '?';
        } else {
            rawUrl += '&';
        }
        var that=this;
        if(this.clickFlag) {
            this.clickFlag = false;
            setTimeout(function () {
                that.clickFlag = true;
            }, 500);
            var dInfo = {
                appid: item.appId || '',
                // downurl: item.url || '',
                downurl: (rawUrl + 'source=uoms_activity&subsource=' + that.campaignId || '') || '',
                sha256: item.sha256 || '',
                name: item.name || '',
                package: item.pkgName || '',
                detailId: item.detailId || '',
                size: item.size ? parseInt(item.size) : '',
                versionCode: item.versionCode ? item.versionCode.toString() : '',
                price: item.price ? (item.price / 100).toString() : '',
                productId: item.productId || '',
                icon:item.logo ||''
            }
            window.HiSpaceObject.download(JSON.stringify(dInfo));
        }
    },
    toDetailPage:function(item){
        var appId =new Object();
        appId.appDetailId= "app|" + item.appId;
        window.HiSpaceObject.toDetailPage(JSON.stringify(appId));
    },
    _launchApp:function(item){
        // var state = this.$store.state;
        //
        // if(state.queryParams.serviceType == 4){
        //     // 浮标环境
        //     window.HiSpaceObject.showToast('您已经在游戏中');
        // } else {
            // 非浮标环境
            window.HiSpaceObject.launchApp(item.pkgName, null, null);
        // }
    },

    _pauseDownload:function(item){
        var vm = this;
        var packageName = item.pkgName|| '';
        window.HiSpaceObject.pauseDownload(packageName);
    },
    _cancelDownload:function(){
        var vm = this;
        var packageName = this.itemData.apkPackageName || '';
        window.HiSpaceObject.cancelDownload(packageName);
        vm._getAppStatus();

    },


};