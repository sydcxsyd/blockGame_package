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
    //## 当前所有包裹的数量（全部的）
    getParcelCount : {
        address : G_Con.packageUrl,
        funcName : "getParcelCount",
    },

    //## 获取我的个人信息
    getAssemblyInfo : {
        address : G_Con.packageUrl,
        funcName : "getAssemblyInfo",
    },

    //## 获取所有包裹数据
    getParcelData : {
        address : G_Con.packageUrl,
        funcName : "getParcelData",
    },

    //## 获取最新的包裹数据
    getParcelData_theLatest : {
        address : G_Con.packageUrl,
        funcName : "getParcelData_theLatest",
    },
    //## 发布包裹
    airdropParcel : {
        address : G_Con.packageUrl,
        funcName : "airdropParcel",
    },

    // ## 舔包裹
    lickParcel : {
        address : G_Con.packageUrl,
        funcName : "lickParcel",
    },
    // ## 下架
    soldOut : {
        address : G_Con.packageUrl,
        funcName : "soldOut",
    },

    //=====================bird=====================
    // upload
    bird_upload : {
        address : G_Con.birdUrl,
        funcName : "upload",
    },

    // 获取排行榜
    bird_getRankList : {
        address : G_Con.birdUrl,
        funcName : "getRankList",
    },

    //=====================dig=====================
    // upload
    dig_upload : {
        address : G_Con.digUrl,
        funcName : "upload",
    },

    // 获取当前
    dig_getNowDigMeter : {
        address : G_Con.digUrl,
        funcName : "getNowDigMeter",
    },

    // 获取排行榜
    dig_getRankList : {
        address : G_Con.digUrl,
        funcName : "getRankList",
    },

    //=====================jump=====================
    // upload
    jump_upload : {
        address : G_Con.jumpUrl,
        funcName : "upload",
    },

    // 获取排行榜
    jump_getRankList : {
        address : G_Con.jumpUrl,
        funcName : "getRankList",
    },

    //=====================brick=====================
    // upload
    brick_upload : {
        address : G_Con.brickUrl,
        funcName : "upload",
    },

    // 获取排行榜
    brick_getRankList : {
        address : G_Con.brickUrl,
        funcName : "getRankList",
    },

    // 获取排行榜
    brick_loveMe : {
        address : G_Con.brickUrl,
        funcName : "loveMe",
    },

    //=====================platform=====================
    // 点赞游戏
    // 参数1：游戏ID
    platform_supportGame : {
        address : G_Con.platformUrl,
        funcName : "supportGame",
    },

    // 获得指定广告类型的资源
    // 参数1：广告类型（英文）
    platform_getADCfg : {
        address : G_Con.platformUrl,
            funcName : "getADCfg",
    },

    // 获得指定游戏类型的资源
    // 参数1：游戏类型（英文）
    platform_getGameCfg : {
        address : G_Con.platformUrl,
            funcName : "getGameCfg",
    },

    // 批量获取广告的详情数据
    // 参数1：广告ID列表，多个ID用 '|' 作分隔符
    platform_getADData : {
        address : G_Con.platformUrl,
            funcName : "getADData",
    },

    // 批量获取游戏的详情数据
    // 参数1：游戏ID列表，多个ID用 '|' 作分隔符
    platform_getGameData : {
        address : G_Con.platformUrl,
            funcName : "getGameData",
    },

    // 批量获取游戏的详情数据
    // 参数1：游戏ID列表，多个ID用 '|' 作分隔符
    platform_getAllData : {
        address : G_Con.platformUrl,
        funcName : "getAllData",
    },

    //=====================robot=====================
    robotUrl_createRobot : {
        address : G_Con.robotUrl,
        funcName : "createRobot",
    },

    robotUrl_getUserData : {
        address : G_Con.robotUrl,
        funcName : "getUserData",
    },

    robotUrl_getHistory : {
        address : G_Con.robotUrl,
        funcName : "getHistory",
    },

    robotUrl_powerUp : {
        address : G_Con.robotUrl,
        funcName : "powerUp",
    },

    robotUrl_growUp : {
        address : G_Con.robotUrl,
        funcName : "growUp",
    },

    robotUrl_destory : {
        address : G_Con.robotUrl,
        funcName : "destory",
    },

    robotUrl_randomFight : {
        address : G_Con.robotUrl,
        funcName : "randomFight",
    },
};

window.G_Net = {
    // callbackAddress : "NebPay.config.testnetUrl",
    callbackAddress : "NebPay.config.mainnetUrl",
    serialNumberList : [],

    call (to, value, func, args,callBack){
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
            listener : callBack,
        };
        let argStr = this._dealArg(args);
        let serialNumber = nebPay.call(to, value, func, argStr, options);
        this.serialNumberList.push(serialNumber);

        G_Func.popTip("正在交易中");
    },

    simulateCall (to, value, func, args,callBack){
        let g_nebPay = neb_require("nebpay");
        let nebPay = new g_nebPay();
        
        let options = {
            callback  : this.callbackAddress,
            qrcode: {
                showQRCode: false,      //是否显示二维码信息
                container: undefined    //指定显示二维码的canvas容器，不指定则生成一个默认canvas
            },
            listener : callBack,
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

    autoCall : function(type,paraList,value,callBack){
        let callType = "";
        switch (type){
            //----------package----------
            case G_Neb.getParcelCount:
            case G_Neb.getAssemblyInfo:
            case G_Neb.getParcelData:
            case G_Neb.getParcelData_theLatest:
                callType = "simulateCall";
                break;
            case G_Neb.airdropParcel:
            case G_Neb.lickParcel:
            case G_Neb.soldOut:
                callType = "call";
                break;
            //----------package----------
            //----------bird----------
            case G_Neb.bird_getRankList:
                callType = "simulateCall";
                break;
            case G_Neb.bird_upload:
                callType = "call";
                break;
            //----------bird----------
            //----------dig----------
            case G_Neb.dig_getRankList:
            case G_Neb.dig_getNowDigMeter:
                callType = "simulateCall";
                break;
            case G_Neb.dig_upload:
                callType = "call";
                break;
            //----------dig----------
            //----------jump----------
            case G_Neb.jump_getRankList:
                callType = "simulateCall";
                break;
            case G_Neb.jump_upload:
                callType = "call";
                break;
            //----------jump----------
            //----------brickUrl----------
            case G_Neb.brick_getRankList:
                callType = "simulateCall";
                break;
            case G_Neb.brick_upload:
                callType = "call";
                break;
            //----------brickUrl----------
            //----------platform----------
            case G_Neb.platform_getADCfg:
            case G_Neb.platform_getGameCfg:
            case G_Neb.platform_getADData:
            case G_Neb.platform_getGameData:
            case G_Neb.platform_getAllData:
                callType = "simulateCall";
                break;
            case G_Neb.platform_supportGame:
                callType = "call";
                break;
            //----------platform----------

        }
        this[callType](type.address,value,type.funcName,paraList,callBack);
    },
};