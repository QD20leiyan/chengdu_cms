var common = {};
common.$ajax = function(url,method,params,toast,type,callback){
    let promise = new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            data: params,
            dataType:"json",
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
                // console.log(res)
                //请求成功的状态=>200 && code码=>0  其它请求全为失败
                if (res.code === 0) {
                    //成功
                    resolve(res.data);
                } else{ //返回错误信息
                    if(toast){  // 根据 错误提示 做出回调
                        resolve(res.data);
                    }else{
                        reject(res.data);
                        alert(res.msg);
                    }
                }
            },
            error:function(XMLHttpRequest){
                if(XMLHttpRequest.status == 500){ // 500错误
                    if(type == 500){
                        console.log(XMLHttpRequest);
                        callback();
                    }
                    
                }   
            },
            fail: function (res) {
                reject(res);
                alert('网络错误，请稍后再试');
            },
            complete: function (res) {

            }
        })
    })
    return promise;
}
common.tips = function(msg){
    var _tips = '<div class="tips-wrap" style="width:100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.8);display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -webkit-flex;display: flex;justify-content: center;z-index:999999999;align-items:center;"><div class="tips" style="font-size: 24px;color:#fff;"></div></div>';
    var body = document.getElementsByTagName('body')[0];
    $('body').append(_tips);
    $(".tips-wrap .tips").html(msg);
}
common.add_script = function(speed,src){ //根据比例衰减用户
    if(speed && speed!= undefined &&  speed > 0){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);
    }
}
common.add_script(threshold,'http://cdnstatic.yingxiong.com/common/js/reduce.js');
