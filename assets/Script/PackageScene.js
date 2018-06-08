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

        packagesScollView : {
            default : null,
            type : cc.ScrollView,
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

    },

    start () {

    },

    onClickSendEvent (event){
        this.senderLayer.active = true;
    },

    onClickSendOutEvent (event){
        if(this.minVauleEdit.string && this.maxValueEdit.string && this.costEdit.string){
            var list = this.timeToggle.getComponentsInChildren("cc.Toggle");
            for(let i in list){
                
            }
            G_Net.autoCall(G_Neb.airdropParcel,[],this.sendCallBack);
        }else{
            cc.log("short of para");
        }
    },

    onClickHistoryEvent (event){
        if(this.choosePage == this.pageType.history){
            return;
        }
        this.choosePage = this.pageType.history;

        G_Net.autoCall(G_Neb.getParcelData,[],this.getHistoryInfo);
    },

    onClickMineEvent (event){
        if(this.choosePage == this.pageType.mine){
            return;
        }
        this.choosePage = this.pageType.mine;
        G_Net.autoCall(G_Neb.getAssemblyInfo,[],this.getMineInfo);
    },

    onClickMarketEvent (event){
        if(this.choosePage == this.pageType.market){
            return;
        }
        this.choosePage = this.pageType.market;
        G_Net.autoCall(G_Neb.getParcelData_theLatest,[30],this.getMarketInfo);
    },

    onClickCloseSendLayer (event){
        this.senderLayer.active = false;
    },

    getMineInfo (jsonObj){
        cc.log(jsonObj)
        if(jsonObj == null){
            cc.log("new user")
        }
    },

    getHistoryInfo (jsonObj){
        cc.log(jsonObj)
        if(jsonObj.result){
            for(let i = 0 ; i < jsonObj.result.length ; i++){
                let data = jsonObj.result[i];


            }
        }
    },

    getPackageNode (info){
        let packageNode = cc.instantiate(this.packagePre);
        let packageContentLabel1 = packageNode.node.getChildByName("packageContentLabel1");
        packageContentLabel1.string = "";

        let packageContentLabel2 = packageNode.node.getChildByName("packageContentLabel2");
    },

    getMarketInfo (jsonObj){
        cc.log(jsonObj)
    },

    sendCallBack (){

    },

    // update (dt) {},
});
