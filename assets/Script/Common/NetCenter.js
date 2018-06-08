window.G_Neb = {
    mail : {
        address : "n1uzUXzMAWLnE2R37LvDw3tNbCqVTrDqnRZ",
        funcName : "registerNickname",
    },

    userInfo : {
        address : "n1uzUXzMAWLnE2R37LvDw3tNbCqVTrDqnRZ",
        funcName : "getAssemblyInfo",
    },

    //=====================包裹=====================
    getParcelCount : {
        address : "n1suvnBrK7e2rDrDgg3GMbuLr52HjwijR2p",
        funcName : "getParcelCount",
    },

    getAssemblyInfo : {
        address : "n1suvnBrK7e2rDrDgg3GMbuLr52HjwijR2p",
        funcName : "getAssemblyInfo",
    },

    getParcelData : {
        address : "n1suvnBrK7e2rDrDgg3GMbuLr52HjwijR2p",
        funcName : "getParcelData",
    },

    getParcelData_theLatest : {
        address : "n1suvnBrK7e2rDrDgg3GMbuLr52HjwijR2p",
        funcName : "getParcelData_theLatest",
    },

    airdropParcel : {
        address : "n1suvnBrK7e2rDrDgg3GMbuLr52HjwijR2p",
        funcName : "airdropParcel",
    },

    lickParcel : {
        address : "n1suvnBrK7e2rDrDgg3GMbuLr52HjwijR2p",
        funcName : "lickParcel",
    },
};

window.G_Net = {
    callbackAddress : "NebPay.config.testnetUrl",
    serialNumberList : [],

    call (to, value, func, args){
        let g_nebPay = neb_require("nebpay");
        let nebPay = new g_nebPay();

        // goods: {        //Dapp端对当前交易商品的描述信息，app暂时不展示
        //     name: "",       //商品名称
        //         desc: "",       //描述信息
        //         orderId: "",    //订单ID
        //         ext: ""         //扩展字段
        // },
        // qrcode: {
        //     showQRCode: false,      //是否显示二维码信息
        //         container: undefined    //指定显示二维码的canvas容器，不指定则生成一个默认canvas
        // },
        //
        // // callback 是记录交易返回信息的交易查询服务器地址，
        // // 目前我们提供了主网和测试网交易查询服务器, 查询频率不能超过6次/分钟
        // //callback: NebPay.config.mainnetUrl,     //主网(默认为主网,可不写)
        // callback: NebPay.config.testnetUrl, //测试网
        //
        //     // listener: 指定一个listener函数来处理交易返回信息（仅用于浏览器插件，App钱包不支持listener）
        //     listener: undefined,
        //     // if use nrc20pay ,should input nrc20 params like name, address, symbol, decimals
        //     nrc20: undefined
        let options = {
            callback  : this.callbackAddress,
            qrcode: {
                showQRCode: false,      //是否显示二维码信息
                container: undefined    //指定显示二维码的canvas容器，不指定则生成一个默认canvas
            },
        };
        let argStr = this._dealArg(args);
        let serialNumber = nebPay.call(to, value, func, argStr, options);
        this.serialNumberList.push(serialNumber);
    },

    simulateCall (to, value, func, args){
        let g_nebPay = neb_require("nebpay");
        let nebPay = new g_nebPay();
        
        let options = {
            callback  : this.callbackAddress,
            qrcode: {
                showQRCode: false,      //是否显示二维码信息
                container: undefined    //指定显示二维码的canvas容器，不指定则生成一个默认canvas
            },
        };
        var argStr = this._dealArg(args);
        let serialNumber = nebPay.simulateCall(to, value, func, argStr, options);
        this.serialNumberList.push(serialNumber);
    },

    _dealArg : function(paraList){
        let str = JSON.stringify(paraList)
        return str;
    },

    registerNickname (str){
        this.call(G_Neb.mail.address,0,G_Neb.mail.funcName,[str])
    },

    getAssemblyInfo (){
        this.simulateCall(G_Neb.userInfo.address,0,G_Neb.userInfo.funcName,[])
    },

    autoCall : function(type,paraList){
        let callType = "";
        switch (type){
            case G_Neb.getParcelCount:
                callType = "simulateCall";
                break;
            case G_Neb.getAssemblyInfo:
                callType = "simulateCall";
                break;
            case G_Neb.getParcelData:
                callType = "simulateCall";
                break;
            case G_Neb.getParcelData_theLatest:
                callType = "simulateCall";
                break;
            case G_Neb.airdropParcel:
                callType = "call";
                break;
            case G_Neb.lickParcel:
                callType = "call";
                break;
        }
        this[callType](type.address,0,type.funcName,paraList);
    },


};