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

    // loveme
    brick_loveMe : {
        address : G_Con.brickUrl,
        funcName : "brick_loveMe",
    },

    // loveme
    brick_regist : {
        address : G_Con.brickUrl,
        funcName : "regist",
    },

    // loveme
    brick_checkRegist : {
        address : G_Con.brickUrl,
        funcName : "checkRegist",
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
    callbackAddress: "NebPay.config.mainnetUrl",
    serialNumberList: [],

    callType : {
        call : "call",
        get : "simulateCall",
    },
    isInit : false,
    init (){
        this.isInit = true;
        this.g_nebPay = nebPay_require("nebpay");
        this.nebPay = new this.g_nebPay();

        this.g_neb = nebulas_require("nebulas");
        this.neb = new this.g_neb.Neb();
        this.chainInfo = this.nasConfig.mainnet;
        this.neb.setRequest(new this.g_neb.HttpRequest(this.chainInfo.host));
    },

    call(to, value, func, args, callBack) {

        let options = {
            callback: this.callbackAddress,
            qrcode: {
                showQRCode: false,      //是否显示二维码信息
                container: undefined    //指定显示二维码的canvas容器，不指定则生成一个默认canvas
            },
            listener: callBack,
        };
        let argStr = this._dealArg(args);
        let serialNumber = this.nebPay.call(to, value, func, argStr, options);
        this.serialNumberList.push(serialNumber);

        G_Func.popTip("正在交易中");
    },

    simulateCall(to, value, func, args, callBack) {
        let options = {
            callback: this.callbackAddress,
            qrcode: {
                showQRCode: false,      //是否显示二维码信息
                container: undefined    //指定显示二维码的canvas容器，不指定则生成一个默认canvas
            },
            listener: callBack,
        };
        var argStr = this._dealArg(args);
        let serialNumber = this.nebPay.simulateCall(to, value, func, argStr, options);
        this.serialNumberList.push(serialNumber);
    },

    _dealArg: function (paraList) {
        let str = JSON.stringify(paraList)
        return str;
    },

    registerNickname(str) {
        this.call(G_Neb.mail.address, 0, G_Neb.mail.funcName, [str])
    },

    getAssemblyInfo() {
        this.simulateCall(G_Neb.userInfo.address, 0, G_Neb.userInfo.funcName, [])
    },

    autoCall: function (type, paraList, value, callBack) {
        if(!this.isInit){
            this.init();
        }
        let callType = "";
        switch (type) {
            //----------package----------
            case G_Neb.getParcelCount:
            case G_Neb.getAssemblyInfo:
            case G_Neb.getParcelData:
            case G_Neb.getParcelData_theLatest:
                callType = this.callType.get;
                break;
            case G_Neb.airdropParcel:
            case G_Neb.lickParcel:
            case G_Neb.soldOut:
                callType = this.callType.call;
                break;
            //----------package----------
            //----------bird----------
            case G_Neb.bird_getRankList:
                callType = this.callType.get;
                break;
            case G_Neb.bird_upload:
                callType = this.callType.call;
                break;
            //----------bird----------
            //----------dig----------
            case G_Neb.dig_getRankList:
            case G_Neb.dig_getNowDigMeter:
                callType = this.callType.get;
                break;
            case G_Neb.dig_upload:
                callType = this.callType.call;
                break;
            //----------dig----------
            //----------jump----------
            case G_Neb.jump_getRankList:
                callType = this.callType.get;
                break;
            case G_Neb.jump_upload:
                callType = this.callType.call;
                break;
            //----------jump----------
            //----------brickUrl----------
            case G_Neb.brick_getRankList:
            case G_Neb.brick_checkRegist:
                callType = this.callType.get;
                break;
            case G_Neb.brick_upload:
            case G_Neb.brick_loveMe:
            case G_Neb.brick_regist:
                callType = this.callType.call;
                break;
            //----------brickUrl----------
            //----------platform----------
            case G_Neb.platform_getADCfg:
            case G_Neb.platform_getGameCfg:
            case G_Neb.platform_getADData:
            case G_Neb.platform_getGameData:
            case G_Neb.platform_getAllData:
                callType = this.callType.get;
                break;
            case G_Neb.platform_supportGame:
                callType = this.callType.call;
                break;
            //----------platform----------

        }
        if(callType == this.callType.call){
            this[callType](type.address, value, type.funcName, paraList, callBack);
        }else if(callType == this.callType.get){
            this.get(type.address,type.funcName, paraList, callBack);
        }
    },


    nasConfig: {
        mainnet: {
            chainID: '1',
            host: "https://mainnet.nebulas.io",
            payHost: "https://pay.nebulas.io/api/mainnet/pay"
        },
        testnet: {
            chainID: '1001',
            host: "https://testnet.nebulas.io",
            payHost: "https://pay.nebulas.io/api/pay"
        }
    },

    get: function (address, func, args, callback) {
        let nasApi = this.neb.api;

        let argStr = this._dealArg(args);
        let dappAddress = address;
        nasApi.call({
            chainID: this.chainInfo.chainID,
            from: dappAddress,
            to: dappAddress,
            value: 0,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
                function: func,
                args: argStr
            }
        }).then(function (resp) {
            if (callback) callback(resp)
        })
    },
};