/*
 * @通信网关
 * －监控管理命令传输
 * －派发数据模块变化事件
 * */
window.G_BCGateWay = {
    netWorkTimeOutTime : 10 * 1000,
    httpCommandType : {
        post : "POST",
        get : "GET",
    },

    BCCommand : function(pHandle, pUrl){
        this.strs = [];
        this.params = [];
        this.handle = pHandle;
        this.url = pUrl;
        this.setParam = function(str ,param){
            this.strs.push(str.toString());
            this.params.push(param);
        };
        this.addSignMd5 = function(){
            this.reorderJsonPara();
            var str = this.getJsonStr() + G_Con.app_key;

            var utilMd5 = require('../Common/MD5');

            var signStr = utilMd5.getMd5(str);
            this.setParam("sign",signStr);

            console.log("addSignMd5 : " + this.getJsonStr())
        };
        this.getJsonStr = function(){
            var str = "";
            for(var i in this.strs){
                str += this.strs[i];
                str += "=";
                str += this.params[i];
                str += "&";
            }
            str = str.substring(0,str.length-1);
            return str;
        };

        this.reorderJsonPara = function(){
            for(var i = 0 ; i < this.strs.length ; i++){
                for(var j = i ; j < this.strs.length ; j++){
                    var str1 = this.strs[i];
                    var str2 = this.strs[j];
                    if(str1 > str2){
                        var tempStr = this.strs[i]
                        this.strs[i] = this.strs[j];
                        this.strs[j] = tempStr;

                        var tempPara = this.params[i];
                        this.params[i] = this.params[j];
                        this.params[j] = tempPara;
                    }
                }
            }
        };
    },

    sendBCCommond : function(commond,type){
        // ShowMask(true,"加载中...")
        commond.addSignMd5();
        var sendType = type ? type : this.httpCommandType.post;
        this.httpRequest(commond.url,commond.handle,commond.getJsonStr(),sendType);
    },

    httpRequest : function(url, callBack, jsonStr,type) {
        cc.log("===========================");
        cc.log("网络传输：" + type);
        cc.log("网络传输：" + url);
        cc.log("网络传输：" + jsonStr);
        cc.log("===========================");

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function() {
            switch (xhr.readyState) {
                case 0:
                    console.log("请求没有发出，在调用open()函数之前为该状态。");
                    break;
                case 1:
                    console.log("请求已经建立但还没有发出，在调用send()函数之前为该状态。");

                    break;
                case 2:
                    console.log("请求已经发出正在处理中。");

                    break;
                case 3:
                    console.log("请求已经处理，响应中通常有部分数据可用，但是服务器还没有完成响应。");
                    break;
                case 4:
                    if (xhr.status == 200) {
                        // ShowMask(false)
                        console.log("响应已完成，可以访问服务器响应并使用它。");
                        //var jsonObj = GetJsonObj(xhr.responseText);
                        console.log(xhr.responseText);
                        var jsonObj = JSON.parse(xhr.responseText);
                        console.log(xhr.responseText);
                        callBack(jsonObj);

                    } else {
                        // ShowMask(false);
                        switch(parseInt(xhr.status)){
                            case 502:
                                console.log("502已断连.....");//消息提示;
                                break;
                            case 500:
                                console.log("500已断连.....");//消息提示;
                                break;
                            default:
                                console.log(xhr.status+"响应已完成，但回调失败。");
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        xhr.timeout = this.netWorkTimeOutTime;
        xhr.ontimeout = function(){
            cc.log("===========================");
            cc.log("请求超时");
            // ShowMask(false);
        };

        xhr.onerror = function(){
            cc.log("无法连接到服务器");
            // ShowMask(false);
        };

        xhr.open(type, url);

        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        cc.log("open success");
        xhr.send(jsonStr);
        cc.log("send success")
    }
};

