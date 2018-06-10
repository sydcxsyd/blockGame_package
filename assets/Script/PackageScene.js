// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        choosePage : {
            default : 0,
            visible : false,
        },

        pageType : {
            default : null,
            visible : false,
        },

        packagePre : {
            default : null,
            type : cc.Prefab,
        },

        packageBigPre : {
            default : null,
            type : cc.Prefab,
        },

        packagesScollView : {
            default : null,
            type : cc.ScrollView,
        },


        mineSelectImg : {
            default: null,
            type: cc.SpriteFrame
        },

        historySelectImg : {
            default: null,
            type: cc.SpriteFrame
        },

        marketSelectImg : {
            default: null,
            type: cc.SpriteFrame
        },

        mineNormalImg : {
            default: null,
            type: cc.SpriteFrame
        },

        historyNormalImg : {
            default: null,
            type: cc.SpriteFrame
        },

        marketNormalImg : {
            default: null,
            type: cc.SpriteFrame
        },

        //-------------send pack-------------
        senderLayer : {
            default : null,
            type : cc.Node,
        },

        minVauleEdit : {
            default : null,
            type : cc.EditBox,
        },

        maxValueEdit : {
            default : null,
            type : cc.EditBox,
        },

        costEdit : {
            default : null,
            type : cc.EditBox,
        },

        timeToggle : {
            default : null,
            type : cc.ToggleContainer,
        },

    },

    ctor (){
        this.pageType = {
            mine : 1,
            history : 2,
            market : 3,
        };

    },

    onLoad (){
        this.getPackageInfo();
        this.choosePage = this.pageType.market;
        this.reloadPage();
        this.schedule(this.getPackageInfo,10);
    },

    getPackageInfo (){
        this.getMine();
        this.getPackage();
    },

    start () {

    },

    onClickSendEvent (event){
        this.senderLayer.active = true;
    },

    onClickSendOutEvent (event){
        if(this.minVauleEdit.string && this.maxValueEdit.string && this.costEdit.string
            && (Number(this.minVauleEdit.string) <=  Number(this.maxValueEdit.string))){
            let list = this.timeToggle.getComponentsInChildren("cc.Toggle");
            let index = i;
            for(let i in list){
                let toggle = list[i];
                if(toggle.isChecked){
                    index = parseInt(i);
                    break;
                }
            }
            let min = Number(this.minVauleEdit.string);
            let max = Number(this.maxValueEdit.string);
            let cost = Number(this.costEdit.string);
            let date = new Date();
            let hourList = [6,12,24,48,72,24 * 12];
            let time = parseInt(date.getTime()/1000);
            time = time + (3600 * hourList[index]);
            G_Net.autoCall(G_Neb.airdropParcel,[min,max,cost,time],max,this.sendCallBack);
        }else{
            cc.log("short of para");
        }
    },

    onClickHistoryEvent (event){
        if(this.choosePage == this.pageType.history){
            return;
        }
        this.choosePage = this.pageType.history;
        this.reloadPage();
    },

    onClickMineEvent (event){
        if(this.choosePage == this.pageType.mine){
            return;
        }
        this.choosePage = this.pageType.mine;
        this.reloadPage();
    },

    onClickMarketEvent (event){
        if(this.choosePage == this.pageType.market){
            return;
        }
        this.choosePage = this.pageType.market;
        this.reloadPage();
    },

    onClickCloseSendLayer (event){
        this.senderLayer.active = false;
    },

    getMine (){
        G_Net.autoCall(G_Neb.getAssemblyInfo,[],0,this.getMineInfo.bind(this));
    },

    getPackage (){
        G_Data.lastUpdateDate = new Date();
        G_Net.autoCall(G_Neb.getParcelData,[100000],0,this.getAllPackageInfo.bind(this));
    },

    getMineInfo (jsonObj){
        cc.log("getMineInfo : " + jsonObj);
        if(jsonObj == null){
            cc.log("new user")
        }
        if(jsonObj.result){
            G_Data.userDataObj = JSON.parse(jsonObj.result);
            this.reloadPage();
        }
    },

    getAllPackageInfo (jsonObj){
        cc.log("getAllPackageInfo : " + jsonObj);
        if(jsonObj.result){
            G_Data.packageDataObj = {};
            let result = JSON.parse(jsonObj.result);
            for(let i in result){
                let dataObj = result[i];
                G_Data.packageDataObj[dataObj.parid] = dataObj;
            }
            this.reloadPage();
        }
    },

    reloadBtnType (){
        let myPackageBtn = cc.find("downdi/myPackageBtn",this.node).getComponent(cc.Button);
        let historyBtn = cc.find("downdi/historyBtn",this.node).getComponent(cc.Button);
        let marketBtn = cc.find("downdi/marketBtn",this.node).getComponent(cc.Button);

        if(this.choosePage == this.pageType.mine){
            myPackageBtn.normalSprite = this.mineSelectImg;
            historyBtn.normalSprite = this.historyNormalImg;
            marketBtn.normalSprite = this.marketNormalImg;
        }else if(this.choosePage == this.pageType.history){
            myPackageBtn.normalSprite = this.mineNormalImg;
            historyBtn.normalSprite = this.historySelectImg;
            marketBtn.normalSprite = this.marketNormalImg;
        }else if(this.choosePage == this.pageType.market){
            myPackageBtn.normalSprite = this.mineNormalImg;
            historyBtn.normalSprite = this.historyNormalImg;
            marketBtn.normalSprite = this.marketSelectImg;
        }
    },

    reloadPage (){
        this.reloadBtnType();
        if(!G_Data.packageDataObj || !G_Data.userDataObj){
            return;
        }

        let content = this.packagesScollView.content;
        content.removeAllChildren();
        let index = 0;
        let headLabel = this.node.getChildByName("headLabel").getComponent(cc.RichText);
        let headStr = "";
        if(this.choosePage == this.pageType.mine){
            // for(let xx = 1 ; xx < 30 ; xx++){
            for(let i in G_Data.userDataObj.lsAirdropParcel){
                let packageId = G_Data.userDataObj.lsAirdropParcel[i];
                let data = G_Data.packageDataObj[packageId];
                let node = this.getPackageNode(data);
                cc.log(node);
                node.parent = content;
                index ++;
            }
            // }
        }else if(this.choosePage == this.pageType.history){
            for(let i in G_Data.userDataObj.lsLickParcel){
                let packageId = G_Data.userDataObj.lsLickParcel[i];
                let data = G_Data.packageDataObj[packageId];
                let node = this.getPackageNode(data);
                cc.log(node);
                node.parent = content;
            }
            // "#9bc022"
        }else if(this.choosePage == this.pageType.market){
            for(let i in G_Data.packageDataObj){
                let data = G_Data.packageDataObj[i];
                let node = this.getPackageNode(data);
                cc.log(node);
                node.parent = content;
                node.setOpacityModifyRGB(true);
                if(data.parstatus == G_Con.packageState.enable){
                    node.color = cc.color(255,255,255);
                }else{
                    node.color = cc.color(200,200,200);
                }
            }
        }
        headStr = "已舔包裹" + G_Data.userDataObj.lsLickParcel.length + "个，";
        headStr = headStr + "花费舔包门票" + "<color=#9bc022>" + (G_Data.userDataObj.totalLickParcel_ticketCost/G_Con.bigNum) + "</c>" +"NAS，";
        headStr = headStr + "共开出" + "<color=#9bc022>" + (G_Data.userDataObj.totalLickParcel_finalPrices/G_Con.bigNum) + "</c>" +"NAS";
        headLabel.string = headStr;

        headStr = headStr + "\n待舔包裹" + this.getEnablePackageNum() + "个，";
        headStr = headStr + "最后更新于 : " + G_Data.lastUpdateDate.toLocaleString();

        headLabel.string = headStr;
        content.height = index/3 * 330 + 330 * 0.5;
    },

    getEnablePackageNum (){
        let index = 0;
        for(let i in G_Data.packageDataObj) {
            let data = G_Data.packageDataObj[i];
            if(data.parstatus == G_Con.packageState.enable){
                index++;
            }
        }
        return index;
    },

    getPackageNode (data){
        let packageNode = cc.instantiate(this.packagePre);
        let pageName = packageNode.getChildByName("pageName").getComponent("cc.Label");
        pageName.string = data.parid + "号包裹";

        let packageContentLabel1 = packageNode.getChildByName("packageContentLabel1").getComponent("cc.Label");
        packageContentLabel1.string = data.ticket_prices/G_Con.bigNum;

        let packageContentLabel2 = packageNode.getChildByName("packageContentLabel2").getComponent("cc.Label");
        packageContentLabel2.string = data.cost_min/G_Con.bigNum + "-" + (data.cost_max/G_Con.bigNum);

        packageNode.package_data = data;
        packageNode.on(cc.Node.EventType.TOUCH_END,function(Event){
            this.createNewBig(Event.currentTarget.package_data);
        },this);

        if(data.parstatus == G_Con.packageState.enable){
            let timeFuc = function (dt) {
                let endTime = this.package_data.recycle_time;
                let nowDate = new Date();
                let nowTime = parseInt(nowDate.getTime()/1000);
                let leftSecond = endTime - nowTime;
                let packageContentLabel3 = this.getChildByName("packageContentLabel3").getComponent("cc.Label");

                if(leftSecond < 0){
                    packageContentLabel3.string = "已过期";
                }else{
                    if(leftSecond / 3600 > 24){
                        packageContentLabel3.string = "剩余：" + parseInt(leftSecond / (3600 * 24)) + "天";
                    }else{
                        packageContentLabel3.string = "剩余：" + G_Func.formatSeconds(leftSecond);
                    }
                }
            }.bind(packageNode);
            packageNode.getComponent(cc.Component).schedule(timeFuc,1)
            timeFuc();
        }else if(data.parstatus == G_Con.packageState.eaten){
            let packageContentLabel3 = packageNode.getChildByName("packageContentLabel3").getComponent("cc.Label");
            packageContentLabel3.string = "实际获得：" + data.final_prices/G_Con.bigNum;
        }else if(data.parstatus == G_Con.packageState.outDate){
            let packageContentLabel3 = packageNode.getChildByName("packageContentLabel3").getComponent("cc.Label");
            packageContentLabel3.string = "已过期";
        }

        return packageNode;
    },

    createNewBig (data){
        let packageNode = cc.instantiate(this.packageBigPre);
        packageNode.getComponent("PopPackage").setData(data);
        packageNode.parent = this.node;
    },

    getMarketInfo (jsonObj){
        cc.log(jsonObj)
    },

    sendCallBack (){

    },

    // update (dt) {},
});
